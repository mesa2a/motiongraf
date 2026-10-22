// 追加分その 9e：カード・画像 4 本、背景 3 本
const cap = 'Sakura Street'.split('').map((l, i) => `<span><b style="--i:${i}">${l === ' ' ? '&nbsp;' : l}</b></span>`).join('');
const pstack = [['#8fd0ff', '#c9b8ff', 30, 20, 1], ['#ff9ec4', '#ffd3a8', 42, 36, 2], ['#9fe3cd', '#8fd0ff', 20, 48, 3]]
  .map(([a, b, x, y, k]) => `<div class="p" style="--c1:${a}; --c2:${b}; --x:${x}%; --y:${y}%; --k:${k}"></div>`).join('');
const slices = Array.from({ length: 6 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
const topo = Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}; --s:${30 + i * 16}cqi"></i>`).join('');
const orbs = [['#ff9ec4', 10, 18, 12], ['#8fd0ff', 70, 10, 16], ['#c9b8ff', 40, 55, 9], ['#9fe3cd', 82, 60, 11], ['#ffd3a8', 22, 66, 7]]
  .map(([c, x, y, s], i) => `<i style="--c:${c}; --x:${x}%; --y:${y}%; --s:${s}cqi; --i:${i}"></i>`).join('');

module.exports = {
  'cat-cards': [
    {
      id: 'img-caption-rise', accent: 'pink', title: 'キャプションが文字ごとに立ち上がる', en: 'Caption Rise',
      tags: ['文字ごとの窓', 'transition-delay × --i', '下側を暗くする'],
      stage: `<div class="stage stage-icap" aria-hidden="true">\n  <div class="fx-icap"><div class="ph fx-photo"></div><div class="sh"></div><div class="cap">${cap}</div></div>\n</div>`,
      desc: 'ホバーで写真が少し寄り、下が暗くなって、キャプションの文字が 1 字ずつ下から立ち上がる。文字を overflow: hidden の窓に入れて translate するだけ。',
    },
    {
      id: 'photo-parallax-stack', accent: 'blue', title: '写真の重なりのパララックス', en: 'Parallax Stack',
      tags: ['--pmx / --pmy を JS で', '--k で動く量の差', '@property で補間'],
      stage: `<div class="stage stage-pstack" aria-hidden="true">\n  <div class="fx-pstack">${pstack}<i class="cur"></i></div>\n</div>`,
      desc: 'マウスの位置に合わせて、重なった写真が手前ほど大きくずれる。JS は中心からの距離を 2 つの変数に入れるだけで、各写真は <code>--k</code> 倍して動く。',
    },
    {
      id: 'card-corner-fold', accent: 'lavender', title: '角が折れるカード', en: 'Corner Fold',
      tags: ['clip-path で角を切る', '::after の三角', '--f の 1 変数'],
      stage: `<div class="stage stage-cfold" aria-hidden="true">\n  <div class="fx-cfold-w"><span class="back">SALE</span><div class="fx-cfold"><div class="ph fx-photo"></div><b></b><b></b><b></b></div></div>\n</div>`,
      desc: '右上の角が折れていて、ホバーすると大きくめくれて裏のピンクと文字が見える。切り落としの polygon と折れた三角の大きさを、同じ変数 <code>--f</code> で決める。',
    },
    {
      id: 'img-slice-flip', accent: 'mint', title: 'スライスが裏返って別の写真に', en: 'Slice Flip',
      tags: ['6 枚の rotateY', 'background-position で 1 枚に', 'backface-visibility'],
      stage: `<div class="stage stage-islice" aria-hidden="true">\n  <div class="fx-islice">${slices}</div>\n</div>`,
      desc: '写真が縦 6 枚のスライスに分かれ、端から順に裏返って別の写真になる。各スライスの背景をずらして 1 枚に見せ、表と裏を <code>::before</code> と <code>::after</code> に持たせる。',
    },
  ],
  'cat-bg': [
    {
      id: 'topo-lines', accent: 'lavender', title: '流れる等高線', en: 'Topographic Lines',
      tags: ['border-radius の揺れ', '7 本の同心', '負の遅延'],
      stage: `<div class="stage stage-topo" aria-hidden="true">\n  <div class="fx-topo">${topo}</div>\n</div>`,
      desc: '地図の等高線のような輪がゆっくりうねる。ゆがんだ楕円を 7 つ重ね、border-radius を揺らすだけ。遅延をずらすと線ごとに違う動きになる。',
    },
    {
      id: 'light-rays', accent: 'yellow', title: 'ゆっくり回る光線', en: 'Light Rays',
      tags: ['repeating-conic-gradient', 'mask で下を消す', '2 枚を逆回転'],
      stage: `<div class="stage stage-rays" aria-hidden="true">\n  <div class="fx-lrays"><div class="ttl">Morning</div></div>\n</div>`,
      desc: '上の一点から広がる光の筋がゆっくり回る。扇形の繰り返しグラデーションを mask で下に向かって消し、2 枚を逆方向に回すと光がちらつく。',
    },
    {
      id: 'glossy-orbs', accent: 'blue', title: '漂う光沢の球', en: 'Glossy Orbs',
      tags: ['radial-gradient のハイライト', 'color-mix で影色', 'alternate で浮き沈み'],
      stage: `<div class="stage stage-orbs" aria-hidden="true">\n  <div class="fx-orbs">${orbs}</div>\n</div>`,
      desc: 'つやのある球がふわふわと浮き沈みする。ハイライトを左上にずらした radial-gradient と内側の影で球に見せ、色は変数 1 つから <code>color-mix()</code> で作る。',
    },
  ],
};
