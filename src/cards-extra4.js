// 追加分その 4：転換 4 本、エフェクト 5 本
const AB = (extraA = '', extraB = '') => `<div class="fx-scene a${extraA}">A</div>\n  <div class="fx-scene b${extraB}">B</div>`;
let seed = 23; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

// ガラスの破片：中心から縁の 8 点へ扇形に
const shards = (() => {
  const pts = [[0, 0], [50, 0], [100, 0], [100, 50], [100, 100], [50, 100], [0, 100], [0, 50]];
  return pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    const cx = (50 + p[0] + q[0]) / 3, cy = (50 + p[1] + q[1]) / 3;   /* 重心の方向へ飛ばす */
    const dx = ((cx - 50) * 1.2).toFixed(0), dy = ((cy - 50) * 1.2).toFixed(0), r = (rnd() * 120 - 60).toFixed(0);
    return `<div class="fx-scene a fx-shard" style="--p: 50% 50%, ${p[0]}% ${p[1]}%, ${q[0]}% ${q[1]}%; --dx:${dx}; --dy:${dy}; --r:${r}; --d:${i}">A</div>`;
  }).join('\n  ');
})();

// ジグソー：4×3 のピースをばらばらの方向へ
const jigsaw = (() => {
  const out = [];
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    const dx = ((col - 1.5) * 30 + rnd() * 10).toFixed(0), dy = ((row - 1) * 30 + rnd() * 10 - 5).toFixed(0), r = (rnd() * 90 - 45).toFixed(0), d = Math.floor(rnd() * 8);
    out.push(`<div class="fx-scene a fx-jig" style="--row:${row}; --col:${col}; --dx:${dx}; --dy:${dy}; --r:${r}; --d:${d}">A</div>`);
  }
  return out.join('\n  ');
})();

// 紙吹雪の着地：14 枚
const colors = ['#f3aabb', '#f5d98c', '#bccbee', '#b5e4d1', '#d9c6f0', '#f4b38d'];
const confettiLand = Array.from({ length: 14 }, (_, i) => `<i class="fx-cl" style="--x:${(6 + i * 6.5).toFixed(0)}; --d:${Math.floor(rnd() * 12)}; --r:${(rnd() * 60 + 60).toFixed(0)}; --c:${colors[i % colors.length]}"></i>`).join('');

// 雪の結晶：10 個
const flakes = Array.from({ length: 10 }, () => `<i class="fx-flake" style="--x:${(rnd() * 100).toFixed(0)}; --s:${(2 + rnd() * 4).toFixed(1)}; --d:${(rnd() * 7).toFixed(1)}"><i></i></i>`).join('');

module.exports = {
  'cat-trans': [
    {
      id: 'book-flip', accent: 'blue', title: 'ページ束めくり', en: 'Book Flip',
      tags: ['表と裏の 2 面', 'transform-origin: left', '--i で順番'],
      stage: `<div class="stage stage-book" aria-hidden="true">\n  <div class="fx-persp"><div class="fx-book">\n    <div class="side l">B</div><div class="side r">A</div>\n    <div class="pg" style="--i:2"><b class="f">A</b><b class="k">B</b></div>\n    <div class="pg" style="--i:1"><b class="f">A</b><b class="k">B</b></div>\n    <div class="pg" style="--i:0"><b class="f">A</b><b class="k">B</b></div>\n  </div></div>\n</div>`,
      desc: '本の右ページが背表紙を軸に 1 枚ずつ左へめくれる。各ページは表と裏の 2 面を持ち、裏は最初から <code>rotateY(180deg)</code>。上のページから順に遅らせる。',
    },
    {
      id: 'shatter', accent: 'lavender', title: 'ガラスが割れる', en: 'Shatter',
      tags: ['polygon の破片 8 枚', '重心の方向へ', '白フラッシュ'],
      stage: `<div class="stage stage-shatter" aria-hidden="true">\n  <div class="fx-scene b">B</div>\n  ${shards}\n  <div class="fx-flash"></div>\n</div>`,
      desc: '今の画面を中心から 8 枚の三角形に切り分け、一瞬光ってから、それぞれ外側へ飛びつつ落ちる。破片の形と飛ぶ向きはビルド時に計算している。',
    },
    {
      id: 'jigsaw', accent: 'pink', title: 'ジグソー分割', en: 'Jigsaw',
      tags: ['inset() の格子', '12 ピース', '乱数の方向'],
      stage: `<div class="stage stage-jigsaw" aria-hidden="true">\n  <div class="fx-scene b">B</div>\n  ${jigsaw}\n</div>`,
      desc: '画面を 4×3 のピースに切り、ばらばらの方向へ回りながら散らす。ピースの切り出しは <code>inset()</code> を行・列の番号から計算。',
    },
    {
      id: 'concentric', accent: 'pink', title: '同心円の多重ワイプ', en: 'Concentric Wipe',
      tags: ['circle() 4 層', '0.18 秒ずつ', '色の輪'],
      stage: `<div class="stage stage-concentric" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-cc c1"></div><div class="fx-cc c2"></div><div class="fx-cc c3"></div>\n  <div class="fx-scene b cc4">B</div>\n</div>`,
      desc: '色の違う円を 3 枚、少しずつ遅らせて広げ、最後に次の画面の円が追いつく。輪が重なって見えるのは遅延の分だけ半径がずれているから。',
    },
  ],
  'cat-fx': [
    {
      id: 'storm', accent: 'lavender', tone: 'cool', title: '嵐', en: 'Storm',
      tags: ['雨 + 稲光 + 揺れ', '合わせ技', 'steps(1)'],
      stage: `<div class="stage stage-storm cool" aria-hidden="true">\n  <div class="fx-cam">\n    <div class="fx-st-rain"></div>\n    <div class="fx-st-bolt b1" style="--x:30%"></div><div class="fx-st-bolt b2" style="--x:72%"></div>\n  </div>\n  <div class="fx-flash"></div>\n</div>`,
      desc: '雨・稲光・画面の揺れを 1 つのステージに重ねた合わせ技。稲光のタイミングに揺れを同期させる。要素はそれぞれ単独の演出と同じ作り。',
    },
    {
      id: 'rainbow', accent: 'yellow', title: '虹', en: 'Rainbow',
      tags: ['radial-gradient の輪', 'conic-gradient の mask', '@property で角度'],
      stage: `<div class="stage stage-rainbow" aria-hidden="true">\n  <div class="fx-rb"></div>\n  <div class="fx-rb-cloud l"></div><div class="fx-rb-cloud r"></div>\n</div>`,
      desc: '同心円のグラデーションで 6 色の輪を描き、上半分だけ見せる。<code>conic-gradient</code> のマスクの角度を 0° から 180° へ動かすと、左の雲から右の雲へ虹が架かる。',
    },
    {
      id: 'bubble-pop', accent: 'blue', title: 'シャボン玉が割れる', en: 'Bubble Pop',
      tags: ['inset の box-shadow', '膨らんで消える', 'しずくが放射'],
      stage: `<div class="stage stage-bpop" aria-hidden="true">\n  <div class="fx-bp"><div class="ball"></div><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n</div>`,
      desc: 'ゆらゆら上ったシャボン玉が、ひと回り膨らんで一瞬で消え、6 粒のしずくが飛ぶ。膜の虹色は内側の <code>box-shadow</code> 2 つで。',
    },
    {
      id: 'confetti-land', accent: 'pink', title: '紙吹雪の着地', en: 'Confetti Landing',
      tags: ['ease-in で落下', '小さく跳ねる', '着地後は止め'],
      stage: `<div class="stage stage-cland" aria-hidden="true">\n  ${confettiLand}\n</div>`,
      desc: '落ちた紙吹雪が床で小さく跳ねて、横向きに倒れたまま残る。落下は加速、跳ねは減速で、キーフレームごとに <code>animation-timing-function</code> を切り替える。',
    },
    {
      id: 'snowflakes', accent: 'blue', title: '雪の結晶', en: 'Snowflakes',
      tags: ['棒 3 本で 6 方向', '::before / ::after を回す', '落ちながら回転'],
      stage: `<div class="stage stage-flakes" aria-hidden="true">\n  ${flakes}\n</div>`,
      desc: '白い棒を 60° ずつ 3 本重ねると六方の結晶になる。落下と回転を別のアニメーションにして、大きさと速さを <code>--s</code> <code>--d</code> でばらつかせる。',
    },
  ],
};
