// src/ から index.html を生成する。  使い方: node src/build.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
// 公開先の URL（例: node src/build.js --site https://example.com/motion/）。指定すると og:url と og:image を絶対 URL にする
const siteArg = process.argv.find((a, i) => process.argv[i - 1] === '--site') || '';
const site = siteArg ? siteArg.replace(/\/?$/, '/') : '';
// 新しめの機能を使うブロックに注記を付ける（検出は CSS の文字列から）
const FEATURES = [
  ['@property', /@property\s+--/, '登録カスタムプロパティ。Chrome 85+ / Safari 16.4+ / Firefox 128+'],
  ['animation-timeline', /animation-timeline\s*:/, 'スクロール連動アニメーション。Chrome 115+。未対応では動かない（代替は JS）'],
  ['backdrop-filter', /backdrop-filter\s*:/, 'Chrome 76+ / Safari 9+（-webkit-）/ Firefox 103+'],
  ['mask', /(^|[^-\w])(-webkit-)?mask(-image|-composite|-position|-size)?\s*:/m, 'CSS マスク。Chrome 120+ はプレフィックスなしで可。古い Chrome は -webkit-mask'],
  ['color-mix', /color-mix\(/, 'Chrome 111+ / Safari 16.2+ / Firefox 113+'],
  ['SVG フィルター', /filter\s*:\s*url\(#/, 'インライン SVG のフィルター参照。ほぼ全ブラウザで可、ただし重い'],
];
const supportOf = (css) => FEATURES.filter(([, re]) => re.test(css)).map(([name, , note]) => `<li title="${note}">${name}</li>`).join('');
// カタログから外すカテゴリ（戻したい時はここから消す）
const EXCLUDE = [];
const sections = require('./cards.js').filter((s) => !EXCLUDE.includes(s.id));
sections.forEach((s, i) => { s.letter = String.fromCharCode(65 + i); });   /* A, B, C… を並び順で振り直す */
// 追加分（cards-extra.js）を各カテゴリの末尾に足す
const extra = {};
for (const f of fs.readdirSync(__dirname).filter((f) => /^cards-extra.*\.js$/.test(f)).sort()) {
  for (const [secId, cards] of Object.entries(require('./' + f))) (extra[secId] = extra[secId] || []).push(...cards);
}
for (const [secId, cards] of Object.entries(extra)) {
  const sec = sections.find((s) => s.id === secId);
  if (!sec) { if (EXCLUDE.includes(secId)) continue; throw new Error(`カテゴリがありません: ${secId}`); }
  sec.cards.push(...cards);
}
// 2026-10-22 の棚卸しで外したカード（重複、または Web デザインでの使いどころが薄いもの）。
// ソースと CSS は残してあるので、戻したいときはここから消すだけ。「→」は代わりに残したカード。
const EXCLUDE_IDS = [
  // 重複（同じ技法・同じ見た目）
  'heart', 'like-counter',       // → like-burst（ハート + 数字 + 波紋をまとめて見せる）
  'countup',                     // → stats-count（同じ @property + counter()）
  'tracking-in',                 // → subtitle（letter-spacing + blur は同じ。レターボックス付き）
  'flag-text',                   // → wave-text（上下の波。旗は rotate を足しただけ）
  'btn-icon-spin',               // → fab-menu（+ → × の回転を含む）
  'btn-3d',                      // → btn-offset（影で浮く／沈む）
  'btn-liquid-confirm',          // → submit-state（丸くなってチェックの流れは同じ）
  'btn-split-text',              // → btn-letter-swap（文字の入れ替わりはこちらが実用的）
  'slider-tooltip',              // → range（値の吹き出し付きスライダーは既にあった）
  'skeleton-swap',               // → load-more（スケルトン → 中身の差し替えを含む）
  'img-caption-rise',            // → img-zoom / img-overlay（ホバーでキャプションは 2 本で足りる）
  'paper-curl',                  // → card-corner-fold（角のめくれ）
  'cloud-shadows',               // → paper-shadow（流れる影）
  'breathing-grid',              // → grid-move / grid-glow-pulse（格子は 2 本で足りる）
  'fireflies',                   // → bokeh（光る玉）
  'eyecatch',                    // → ripple-mask（中心からの丸ワイプ）
  'split-doors',                 // → curtain（左右に開く）
  'blinds-diag',                 // → blinds（回しただけ）
  'tiles',                       // → mosaic（タイルで覆う。ランダム順のほうが応用しやすい）
  'dot-dissolve',                // → halftone（点で溶ける）
  'jigsaw',                      // → shatter（割れて飛ぶ）
  'zoom-rotate-trans',           // → zoom-trans（回転を足しただけ）
  'card-deck-flip',              // → book-flip（束をめくる）
  'text-disintegrate',           // → text-crumble（文字が崩れる）
  'confetti',                    // → confetti-land / confetti-burst
  'snowflakes',                  // → snow（軽い）/ snow-pile（積もる）
  'petals',                      // → sakura-storm
  'storm',                       // → rain + lightning + screen-shake の合わせ技。単品があれば足りる
  // Web デザインでの使いどころが薄い（飾りとしての面白さだけ）
  'clouds', 'wind', 'bloom',
];
for (const sec of sections) sec.cards = sec.cards.filter((c) => !EXCLUDE_IDS.includes(c.id));

// 1) CSS ブロックを集める（ファイル内に /* @@ id */ があれば複数、なければファイル名が id）
const blocks = {};
const dir = path.join(__dirname, 'blocks');
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.css')).sort()) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const re = /\/\*\s*@@\s*([\w-]+)\s*\*\//g;
  let m, prev = null, found = false;
  while ((m = re.exec(src))) { found = true; if (prev) blocks[prev.id] = src.slice(prev.end, m.index).trim(); prev = { id: m[1], end: re.lastIndex }; }
  if (prev) blocks[prev.id] = src.slice(prev.end).trim();
  if (!found) blocks[f.replace(/\.css$/, '')] = src.trim();
}

// 2) カードの HTML
const esc = (s) => s;
const indent = (s, n) => s.split('\n').map((l) => ' '.repeat(n) + l).join('\n');
let count = 0;
const used = ['_common'];
const catalog = sections.map((sec) => {
  const cards = sec.cards.map((c) => {
    if (!blocks[c.id]) throw new Error(`CSS ブロックがありません: ${c.id}`);
    if (used.includes(c.id)) throw new Error(`id が重複しています: ${c.id}`);
    used.push(c.id);
    count++;
    const tone = c.tone === 'cool' ? ' data-tone="cool"' : '';
    const stage = c.stage.replace(/\n\s*\n/g, '\n');
    return `      <article class="card" id="m-${c.id}" data-id="${c.id}"${tone} style="--accent: var(--${c.accent})">
        <header class="card-head">
          <span class="card-no" data-no="${String(count).padStart(3, '0')}"></span>
          <h3 class="card-title">${esc(c.title)}<small>${esc(c.en)}</small></h3>
          <ul class="card-tags">${c.tags.map((t) => `<li>${t}</li>`).join('')}</ul>${supportOf(blocks[c.id]) ? `\n          <ul class="card-support" aria-label="使っている新しめの機能">${supportOf(blocks[c.id])}</ul>` : ''}
        </header>
${indent(stage, 8)}
        <p class="card-desc">${c.desc}</p>
      </article>`;
  }).join('\n\n');
  return `  <!-- ===== ${sec.letter} ${sec.title} ===== -->
  <section class="cat" id="${sec.id}" style="--accent: var(--${sec.accent})">
    <div class="cat-head">
      <h3 class="cat-title"><b>${sec.letter}</b>${sec.en || ''}<small>${sec.title}</small><span class="cat-count"><em data-cat-shown>${sec.cards.length}</em> / ${sec.cards.length}</span></h3>
      <p class="cat-lead">${sec.lead}</p>
      <button class="cat-toggle" type="button" aria-expanded="true" aria-controls="${sec.id}-grid"><span>閉じる</span></button>
    </div>
    <div class="grid" id="${sec.id}-grid">

${cards}

    </div>
  </section>`;
}).join('\n\n');

const catnav = sections.map((s) => `    <a href="#${s.id}" style="--c: var(--${s.accent})">${s.en || s.title}<small>${s.cards.length}</small></a>`).join('\n');

// 3) <style> はカードの順に並べる（未使用ブロックは末尾に残す）
const order = used.concat(Object.keys(blocks).filter((id) => !used.includes(id)));
const style = order.map((id) => `/* @@ ${id} */\n${blocks[id]}`).join('\n\n');
const unused = order.filter((id) => !used.includes(id) && !EXCLUDE_IDS.includes(id));
if (unused.length) console.warn('未使用の CSS ブロック:', unused.join(', '));

// 4) テンプレートに流し込む
let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
html = html.replace(/\{\{STYLE\}\}/g, () => style)
  .replace(/\{\{CATALOG\}\}/g, () => catalog)
  .replace(/\{\{CATNAV\}\}/g, () => catnav)
  .replace(/\{\{COUNT\}\}/g, String(count))
  .replace(/\{\{SECTIONS\}\}/g, String(sections.length))
  .replace(/\{\{OG_IMAGE\}\}/g, site ? site + 'img/og.png' : 'img/og.png')
  .replace(/^.*\{\{OG_URL\}\}.*\n/m, site ? `<meta property="og:url" content="${site}">\n` : '');
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`index.html を生成しました: ${count} 本 / ${sections.length} カテゴリ${site ? '（公開 URL: ' + site + '）' : ''}`);
