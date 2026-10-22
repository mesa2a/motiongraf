// 追加分その 9f：スクロール 4 本、見出し 3 本
const simgImgs = [['#8fd0ff', '#c9b8ff'], ['#ff9ec4', '#ffd3a8'], ['#9fe3cd', '#8fd0ff']].map(([a, b]) => `<i style="--c1:${a}; --c2:${b}"></i>`).join('');
const simgTxt = ['#8fd0ff', '#ff9ec4', '#9fe3cd'].map((c) => `<b class="h" style="--c:${c}"></b><b></b><b></b><b class="s"></b>`).join('');
const smqBlocks = (n) => Array.from({ length: n }, () => '<b></b>').join('');
const sbgSecs = [['Spring', '#ff6fa8'], ['Summer', '#5fb4ef'], ['Autumn', '#9b7fd6']].map(([t, c]) => `<div class="sec" style="--c:${c}"><b>${t}</b><i></i><i></i><i></i></div>`).join('');
const ldrawSvg = `<svg viewBox="0 0 120 90" aria-hidden="true"><circle cx="92" cy="24" r="9" pathLength="1" style="--i:0; --c:#f5c542"/><path d="M4 78 L28 38 L44 60 L64 22 L84 54 L96 42 L116 78" pathLength="1" style="--i:1; --c:#8fa8ff"/><path d="M4 86 Q 18 80 32 86 T 60 86 T 88 86 T 116 86" pathLength="1" style="--i:2; --c:#ff8fb8"/></svg>`;
const ldrawPg = Array.from({ length: 16 }, () => '<b></b>').join('');
const bands = [['モーションは', '#ffd3e3'], ['意味を運ぶ', '#d7eeff'], ['CSS だけで', '#e8e0ff']].map(([t, c], i) => `<div class="ln" style="--i:${i}; --c:${c}"><span>${t}</span></div>`).join('');
const cwave = 'COLORFUL'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');

module.exports = {
  'cat-enter': [
    {
      id: 'sticky-image', accent: 'blue', title: '画像が固定されて本文が流れる', en: 'Sticky Image',
      tags: ['position: sticky', '見出しごとに画像を差し替え', 'opacity のクロスフェード'],
      stage: `<div class="stage stage-simg" aria-hidden="true">\n  <div class="fx-simg"><div class="img">${simgImgs}</div><div class="txt"><div>${simgTxt}</div></div></div>\n</div>`,
      desc: '左の画像は貼り付いたまま、右の本文だけがスクロールする。見出しが変わるたびに画像がクロスフェードで差し替わる。画像の列は <code>position: sticky</code>、差し替えは IntersectionObserver で。',
    },
    {
      id: 'scroll-marquee-speed', accent: 'pink', title: 'スクロールで走るマーキー', en: 'Scroll-driven Marquee',
      tags: ['--sy をスクロール量に', '横移動 = --sy × 2.4', 'animation-timeline: scroll()'],
      stage: `<div class="stage stage-smq" aria-hidden="true">\n  <div class="fx-smq"><div class="pg">${smqBlocks(2)}<div class="mq">MOTION ✦ MOTION ✦ MOTION ✦ MOTION ✦ MOTION</div>${smqBlocks(4)}</div><div class="track"><i class="thumb"></i></div></div>\n</div>`,
      desc: 'スクロールしたぶんだけ横の文字列が走り、止まれば止まる。縦のスクロール量を変数 1 つに入れて、本文は上へ、マーキーは横へ倍率を変えて動かす。',
    },
    {
      id: 'section-bg-change', accent: 'lavender', title: 'セクションごとに背景色が変わる', en: 'Section Background',
      tags: ['IntersectionObserver', 'background の transition', '季節で色を変える'],
      stage: `<div class="stage stage-sbg" aria-hidden="true">\n  <div class="fx-sbg"><div class="pg">${sbgSecs}</div></div>\n</div>`,
      desc: 'スクロールして次のセクションに入ると、ページ全体の背景色がゆっくり混ざって変わる。各セクションに色を持たせ、見えたら body の背景に反映するだけ。',
    },
    {
      id: 'line-draw-scroll', accent: 'yellow', title: '読み進めると線画が描かれる', en: 'Scroll Line Draw',
      tags: ['pathLength="1"', 'stroke-dashoffset 1 → 0', '--i で順番に'],
      stage: `<div class="stage stage-ldraw" aria-hidden="true">\n  <div class="fx-ldraw">${ldrawSvg}<div class="pg"><div>${ldrawPg}</div></div></div>\n</div>`,
      desc: '本文を読み進めるにつれて、横の線画が太陽・山・波の順に描かれていく。SVG の path に <code>pathLength="1"</code> を付ければ、長さを測らずに <code>stroke-dashoffset</code> を 1 → 0 にするだけで描ける。',
    },
  ],
  'cat-hero': [
    {
      id: 'tracking-in', accent: 'blue', title: '文字の間隔が広がって現れる', en: 'Tracking In',
      tags: ['letter-spacing -.5em → .3em', 'blur と opacity', '映画のタイトル風'],
      stage: `<div class="stage stage-track" aria-hidden="true">\n  <div class="fx-trackin">WELCOME</div>\n</div>`,
      desc: '重なっていた文字がほどけるように左右へ広がりながら、ぼけが取れて現れる。<code>letter-spacing</code> を負から正へ動かすだけで映画のタイトルのようになる。',
    },
    {
      id: 'band-reveal', accent: 'pink', title: '帯が引かれて文字が出る', en: 'Band Reveal',
      tags: ['clip-path: inset の帯', '覆った瞬間に文字', '行ごとに --i'],
      stage: `<div class="stage stage-band" aria-hidden="true">\n  <div class="fx-band">${bands}</div>\n</div>`,
      desc: '色の帯が左から走って文字を覆い、右へ抜けると文字が残る。帯は <code>clip-path: inset()</code> の右端と左端を順に動かして「入って抜ける」を 1 つの疑似要素で作る。',
    },
    {
      id: 'color-wave-text', accent: 'lavender', title: '色が波のように変わる文字', en: 'Color Wave',
      tags: ['文字ごとに --i', '負の遅延', '色と translate を同時に'],
      stage: `<div class="stage stage-cwave" aria-hidden="true">\n  <div class="fx-cwave">${cwave}</div>\n</div>`,
      desc: 'ピンク・ラベンダー・水色が文字の上を波のように流れ、文字も少し浮く。文字ごとに負の遅延をずらすだけで、最初から波の形で始まる。',
    },
  ],
};
