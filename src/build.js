// src/ から index.html を生成する。  使い方: node src/build.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
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
    return `      <article class="card" data-id="${c.id}"${tone} style="--accent: var(--${c.accent})">
        <header class="card-head">
          <span class="card-no"></span>
          <h3 class="card-title">${esc(c.title)}<small>${esc(c.en)}</small></h3>
          <ul class="card-tags">${c.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        </header>
${indent(stage, 8)}
        <p class="card-desc">${c.desc}</p>
      </article>`;
  }).join('\n\n');
  return `  <!-- ===== ${sec.letter} ${sec.title} ===== -->
  <section class="cat" id="${sec.id}" style="--accent: var(--${sec.accent})">
    <div class="cat-head">
      <h3 class="cat-title"><b>${sec.letter}</b>${sec.en || ''}<small>${sec.title}</small></h3>
      <p class="cat-lead">${sec.lead}</p>
    </div>
    <div class="grid">

${cards}

    </div>
  </section>`;
}).join('\n\n');

const catnav = sections.map((s) => `    <a href="#${s.id}" style="--c: var(--${s.accent})">${s.en || s.title}</a>`).join('\n');

// 3) <style> はカードの順に並べる（未使用ブロックは末尾に残す）
const order = used.concat(Object.keys(blocks).filter((id) => !used.includes(id)));
const style = order.map((id) => `/* @@ ${id} */\n${blocks[id]}`).join('\n\n');
const unused = order.filter((id) => !used.includes(id));
if (unused.length) console.warn('未使用の CSS ブロック:', unused.join(', '));

// 4) テンプレートに流し込む
let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
html = html.replace(/\{\{STYLE\}\}/g, () => style)
  .replace(/\{\{CATALOG\}\}/g, () => catalog)
  .replace(/\{\{CATNAV\}\}/g, () => catnav)
  .replace(/\{\{COUNT\}\}/g, String(count));
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`index.html を生成しました: ${count} 本 / ${sections.length} カテゴリ`);
