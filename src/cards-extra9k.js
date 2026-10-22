// 追加分その 9k：トランジション 2 本、エフェクト 3 本
const deck = [3, 2, 1, 0].map((i) => `<div class="fx-deck" style="--i:${i}">A</div>`).join('');
const circles = [[20, 30], [70, 20], [45, 70], [85, 65], [10, 80]].map(([x, y], i) => `<i style="--x:${x}%; --y:${y}%; --i:${i}"></i>`).join('');
const sparks = Array.from({ length: 10 }, (_, i) => `<i style="--i:${i + 1}; --c:${['#ff8fb8', '#f5c542', '#8fd0ff', '#c9b8ff'][i % 4]}"></i>`).join('');
// 5 × 5 のドット絵「M」
const M = ['#...#', '##.##', '#.#.#', '#...#', '#...#'];
let n = 0;
const dots = M.flatMap((row, y) => row.split('').map((ch, x) => {
  if (ch !== '#') return '';
  const a = (n * 137) % 360; const r = 22 + (n * 7) % 18; n++;
  const dx = Math.round(Math.cos(a * Math.PI / 180) * r), dy = Math.round(Math.sin(a * Math.PI / 180) * r);
  return `<i style="--x:${x}; --y:${y}; --dx:${dx}cqi; --dy:${dy}cqi; --i:${n}"></i>`;
})).join('');

module.exports = {
  'cat-trans': [
    {
      id: 'card-deck-flip', accent: 'blue', title: 'カードの束がめくれる', en: 'Deck Flip',
      tags: ['同じ画面を 4 枚重ねる', '左端を軸に rotateY', '--i × .18s'],
      stage: `<div class="stage stage-deck" aria-hidden="true">\n  <div class="fx-scene b deckb">B</div>\n  ${deck}\n</div>`,
      desc: '前の画面がトランプの束のように 1 枚ずつ左へめくれて、次の画面が現れる。同じ画面を数枚重ねて、少しずつ暗くしておくと厚みが出る。',
    },
    {
      id: 'multi-circle', accent: 'pink', title: '複数の円が同時に広がる', en: 'Multi Circle',
      tags: ['5 点から scale(14)', '--i で少しずらす', '覆ってから中身'],
      stage: `<div class="stage stage-mcirc" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-mcirc">${circles}</div>\n  <div class="fx-scene b mcircb">B</div>\n</div>`,
      desc: '画面のあちこちから円が同時に広がって重なり、次の画面に変わる。円の数と位置を変えるだけで表情が変わる。クリック位置を起点にしてもよい。',
    },
  ],
  'cat-fx': [
    {
      id: 'text-glare', accent: 'pink', tone: 'cool', title: '文字に走る光', en: 'Text Glare',
      tags: ['background-clip: text', 'background-position を動かす', '周期を長く'],
      stage: `<div class="stage stage-glare cool" aria-hidden="true">\n  <div class="fx-glare"><b data-t="GLARE">GLARE</b></div>\n</div>`,
      desc: '暗い文字の上を、斜めの光が一瞬だけ走り抜ける。文字の形に切り抜いた細いグラデーションを左外から右外へ動かすだけ。ロゴやキャッチコピーの飾りに。',
    },
    {
      id: 'spark-trail', accent: 'yellow', title: 'カーソルの軌跡にきらめき', en: 'Spark Trail',
      tags: ['同じ軌道を遅延でなぞる', '4 つ星の clip-path', '出てすぐ消える'],
      stage: `<div class="stage stage-strail" aria-hidden="true">\n  <div class="fx-strail">${sparks}<i class="cur"></i></div>\n</div>`,
      desc: 'カーソルが動いた跡に小さな星が生まれて消える。本番は pointermove のたびに星を置くだけ。デモでは同じ軌道を少しずつ遅らせてなぞっている。',
    },
    {
      id: 'particles-logo', accent: 'pink', tone: 'cool', title: '粒子が集まってロゴになる', en: 'Particle Logo',
      tags: ['--x --y が最終位置', '--dx --dy が散らばり', '--i で集まる順'],
      stage: `<div class="stage stage-pdots cool" aria-hidden="true">\n  <div class="fx-pdots">${dots}</div>\n</div>`,
      desc: '散らばっていた粒が集まって文字の形になり、しばらくしてまた散る。最終位置をドット絵の座標で、開始位置をずらし量で渡すので、形を変えるのはデータだけ。',
    },
  ],
};
