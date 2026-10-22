// 追加分その 9c：見出し 4 本、背景 3 本
const sf = 'MOTION'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');
const scrChars = ['#', '7', 'K', '%', 'X', '2', '@', 'R', '9', 'W', '&', '4'];
const scr = 'LAUNCH'.split('').map((l, i) => {
  const dummy = Array.from({ length: 4 }, (_, k) => scrChars[(i * 3 + k * 5) % scrChars.length]).join('<br>');
  return `<b style="--i:${i}"><i data-l="${l}">${dummy}</i></b>`;
}).join('');
const dots = Array.from({ length: 8 }, (_, y) => Array.from({ length: 14 }, (_, x) => `<i style="--d:${x + y}"></i>`).join('')).join('');
const shapes = [
  ['c', 8, 14, 7, 0], ['t', 78, 10, 8, -15], ['s', 88, 62, 6, 20], ['r', 14, 66, 9, 0], ['x', 60, 76, 6, 10], ['c', 40, 8, 4, 0], ['s', 30, 82, 4, 35], ['r', 92, 30, 5, 0], ['t', 70, 42, 5, 30],
].map(([k, x, y, s, r], i) => `<i class="sh ${k}" style="--x:${x}%; --y:${y}%; --s:${s}cqi; --r:${r}deg; --i:${i}"></i>`).join('');

module.exports = {
  'cat-hero': [
    {
      id: 'split-flip', accent: 'blue', title: '文字が順に起き上がる見出し', en: 'Split Flip',
      tags: ['rotateX(-90deg) → 0', 'perspective', '--i × .08s'],
      stage: `<div class="stage stage-splitflip" aria-hidden="true">\n  <div class="fx-sf">${sf}</div>\n</div>`,
      desc: '寝ていた文字が 1 字ずつ手前に起き上がる。文字を span で分割して <code>rotateX</code> を回し、親に <code>perspective</code> を付けると奥行きが出る。行き過ぎて戻るカーブで弾ませる。',
    },
    {
      id: 'scramble-text', accent: 'pink', tone: 'cool', title: 'スクランブルから整う文字', en: 'Scramble Text',
      tags: ['4 段のダミー文字', 'steps(4) で送る', '最後の段が本物'],
      stage: `<div class="stage stage-scramble cool" aria-hidden="true">\n  <div class="fx-scr">${scr}</div>\n</div>`,
      desc: '記号や数字がパラパラ入れ替わって、1 字ずつ本当の文字に落ち着く。各文字の窓の中にダミーを 4 段積み、<code>steps()</code> で 1 段ずつ送って最後の段で止める。JS でランダムにすればもっと本物らしくなる。',
    },
    {
      id: 'outline-fill', accent: 'lavender', title: '輪郭文字が満ちる', en: 'Outline Fill',
      tags: ['-webkit-text-stroke', 'background-clip: text', 'clip-path で下から'],
      stage: `<div class="stage stage-outline" aria-hidden="true">\n  <div class="fx-of"><span class="o">Hello!</span><span class="f">Hello!</span></div>\n</div>`,
      desc: '輪郭だけの文字に、下からグラデーションの塗りが満ちていく。輪郭の文字と塗りの文字を同じ位置に重ね、塗りの側を <code>clip-path</code> で下から開く。',
    },
    {
      id: 'word-rotate', accent: 'pink', title: '単語が入れ替わる見出し', en: 'Word Rotate',
      tags: ['単語を同じマスに重ねる', '周期 = 単語数 × 2s', '上へ抜けて下から入る'],
      stage: `<div class="stage stage-wordrot" aria-hidden="true">\n  <div class="fx-wr">Make it <span class="w"><i style="--i:0">move</i><i style="--i:1">pop</i><i style="--i:2">shine</i></span></div>\n</div>`,
      desc: '文の一部の単語だけが、上へ抜けて下から次の単語が入る形で入れ替わる。単語を同じマスに重ね、周期を「単語数 × 1 語の表示時間」にして遅延をずらす。',
    },
  ],
  'cat-bg': [
    {
      id: 'dot-wave-grid', accent: 'lavender', title: '波打つドットのグリッド', en: 'Dot Wave',
      tags: ['--d = x + y', '負の遅延', 'scale と色を同時に'],
      stage: `<div class="stage stage-dotwave" aria-hidden="true">\n  <div class="fx-dw">${dots}</div>\n</div>`,
      desc: 'ドットの格子を斜めの波が通り抜けていく。各ドットの遅延を「列 + 行」の番号で決めるだけで対角線の波になる。遅延をマイナスにしておけば最初から波の形で始まる。',
    },
    {
      id: 'noise-grain', accent: 'blue', tone: 'cool', title: 'フィルムの粒子', en: 'Film Grain',
      tags: ['SVG feTurbulence', 'data URI の背景', 'steps(1) で位置を飛ばす'],
      stage: `<div class="stage stage-grain cool" aria-hidden="true">\n  <div class="fx-grain"><div class="t">GRAIN</div></div>\n</div>`,
      desc: '暗い背景にフィルムのようなざらつきを乗せる。粒は SVG の <code>feTurbulence</code> を data URI にして敷き、位置を <code>steps(1)</code> でランダムに飛ばすと「動いている粒」になる。',
    },
    {
      id: 'floating-shapes', accent: 'mint', title: '漂う幾何学シェイプ', en: 'Floating Shapes',
      tags: ['--x --y --s --r で配置', 'alternate で往復', '十字は gradient 2 本'],
      stage: `<div class="stage stage-shapes" aria-hidden="true">\n  <div class="fx-shapes">${shapes}<div class="ttl">Hello</div></div>\n</div>`,
      desc: '丸・三角・四角・輪・十字がゆっくり浮き沈みしながら回る。配置はカスタムプロパティで渡し、キーフレームは 1 本だけ。位相は負の遅延でばらす。',
    },
  ],
};
