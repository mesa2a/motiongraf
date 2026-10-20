// 追加分その 3：転換 4 本、エフェクト 6 本
const AB = (extraA = '', extraB = '') => `<div class="fx-scene a${extraA}">A</div>\n  <div class="fx-scene b${extraB}">B</div>`;

// 桜吹雪：28 枚を擬似乱数で散らす
const sakura = (() => {
  let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: 28 }, () => {
    const x = Math.round(rnd() * 110 - 20), d = (rnd() * 4).toFixed(1), s = (0.6 + rnd() * 0.7).toFixed(2);
    return `<i class="fx-sk${rnd() < .3 ? ' w' : ''}" style="--x:${x}; --d:${d}; --s:${s}"><i></i></i>`;
  }).join('');
})();

module.exports = {
  'cat-trans': [
    {
      id: 'stripe-wipe', accent: 'pink', title: '斜め帯の多段ワイプ', en: 'Stripe Wipe',
      tags: ['skewX', '帯ごとに遅延', 'translateX 800%'],
      stage: `<div class="stage stage-stripewipe" aria-hidden="true">\n  ${AB('', ' swap')}\n  <div class="fx-sw"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n</div>`,
      desc: '斜めの帯 6 本が左から順に流れ込んで画面を覆い、右へ抜けていく。帯は flex で並べて <code>skewX</code> で傾け、遅延を 0.07 秒ずつ。',
    },
    {
      id: 'chroma-zoom', accent: 'lavender', tone: 'cool', title: '色収差ズーム', en: 'Chromatic Zoom',
      tags: ['mix-blend-mode: screen', 'RGB 3 枚', 'scale 1.6 → 1'],
      stage: `<div class="stage stage-chroma cool" aria-hidden="true">\n  <div class="fx-cz"><span class="r">NEXT</span><span class="g">NEXT</span><span class="b">NEXT</span></div>\n</div>`,
      desc: '赤・緑・青の 3 枚を別方向からズームインさせ、ぴったり重なると <code>screen</code> 合成で白くなる。重なる前のズレが色収差に見える。',
    },
    {
      id: 'dot-dissolve', accent: 'blue', title: 'ドットディゾルブ', en: 'Dot Dissolve',
      tags: ['mask 3 層', '@property', '網目をずらす'],
      stage: `<div class="stage stage-dissolve" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-scene b fx-dd l1">B</div><div class="fx-scene b fx-dd l2">B</div><div class="fx-scene b fx-dd l3">B</div>\n</div>`,
      desc: '次の画面を 3 枚重ね、それぞれ大きさと位置の違う網点マスクで少しずつ遅らせて広げる。重ね合わせるとランダムに溶け込むように見える。',
    },
    {
      id: 'iris', accent: 'lavender', title: '絞り', en: 'Iris',
      tags: ['polygon 8 頂点', '中心へ絞る', '古い画面が閉じる'],
      stage: `<div class="stage stage-iris" aria-hidden="true">\n  <div class="fx-scene b">B</div>\n  <div class="fx-scene a iris">A</div>\n</div>`,
      desc: 'カメラの絞りのように八角形が中心へ閉じ、下の画面が残る。今の画面を上に置いて切り抜くのがポイント。開く時はその逆。',
    },
  ],
  'cat-fx': [
    {
      id: 'sakura-storm', accent: 'pink', title: '桜吹雪', en: 'Sakura Storm',
      tags: ['28 枚を乱数で', '親子で分担', '裏返りは scale'],
      stage: `<div class="stage stage-sakura" aria-hidden="true">\n  ${sakura}\n</div>`,
      desc: '花びらを大量に、右へ流されながら落とす。位置・遅延・大きさはビルド時の擬似乱数。子要素の <code>scale: 1 .6</code> で花びらが裏返るように見せる。',
    },
    {
      id: 'water-shimmer', accent: 'blue', title: '水面のゆらめき', en: 'Water Shimmer',
      tags: ['mix-blend-mode: overlay', 'filter: blur()', 'skewX の揺れ'],
      stage: `<div class="stage stage-water" aria-hidden="true">\n  <div class="fx-wt-text">POOL</div>\n  <div class="fx-caustic c1"></div><div class="fx-caustic c2"></div>\n</div>`,
      desc: 'ぼかした光の斑を <code>overlay</code> で 2 層重ね、逆方向にゆっくり動かすと水面の光に。文字は <code>skewX</code> と <code>scaleY</code> でわずかに揺らす。',
    },
    {
      id: 'text-fire', accent: 'orange', tone: 'cool', title: '燃える文字', en: 'Fire Text',
      tags: ['background-clip: text', 'background-position', 'drop-shadow'],
      stage: `<div class="stage stage-fire cool" aria-hidden="true">\n  <div class="fx-fire"><span>FIRE</span></div>\n  <i class="fx-ember" style="--x:30; --dx:2; --d:0"></i><i class="fx-ember" style="--x:42; --dx:-3; --d:.7"></i><i class="fx-ember" style="--x:55; --dx:1; --d:1.3"></i><i class="fx-ember" style="--x:66; --dx:-2; --d:.4"></i><i class="fx-ember" style="--x:48; --dx:3; --d:1.8"></i>\n</div>`,
      desc: '炎色のグラデーションを縦 2 倍にして文字で切り抜き、位置を上下させると揺らめく。<code>drop-shadow</code> を 2 段で発光、火の粉は小さな点を上へ。',
    },
    {
      id: 'text-freeze', accent: 'blue', title: '凍る文字', en: 'Freeze Text',
      tags: ['color の変化', '霜がせり上がる', '結晶が --d で順に'],
      stage: `<div class="stage stage-freeze" aria-hidden="true">\n  <div class="fx-frz">FROZEN</div>\n  <div class="fx-frost"></div>\n  <i class="fx-ice" style="--x:18; --y:16; --d:0"></i><i class="fx-ice" style="--x:80; --y:14; --d:1"></i><i class="fx-ice" style="--x:70; --y:42; --d:2"></i><i class="fx-ice" style="--x:22; --y:40; --d:3"></i><i class="fx-ice" style="--x:50; --y:8; --d:4"></i>\n</div>`,
      desc: '文字が震えてから氷色に変わり、下から霜がせり上がって結晶が順に現れる。震えは小さな <code>translate</code> を数コマ。',
    },
    {
      id: 'hologram', accent: 'blue', tone: 'cool', title: 'ホログラム', en: 'Hologram',
      tags: ['走査線', 'steps(1) のちらつき', 'attr() の帯'],
      stage: `<div class="stage stage-holo cool" aria-hidden="true">\n  <div class="fx-holo-beam"></div>\n  <div class="fx-holo-base"></div>\n  <div class="fx-holo" data-text="HELLO">HELLO</div>\n</div>`,
      desc: '台座からの光に浮かぶ文字。走査線を重ね、たまに暗くし、ピンクの帯が一瞬ずれる。上下にゆっくり浮かせると投影っぽい。',
    },
    {
      id: 'bloom', accent: 'pink', title: '花が咲く', en: 'Bloom',
      tags: ['transform-origin 根元', 'rotate で 5 枚', '行き過ぎ'],
      stage: `<div class="stage stage-bloom" aria-hidden="true">\n  <div class="fx-bloom-stem"></div>\n  <div class="fx-bloom"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><b></b></div>\n</div>`,
      desc: '花弁 5 枚を根元を支点に 72° ずつ置き、少し行き過ぎてから開く。最後に中心が「ぽん」。全体をゆっくり揺らすと風に揺れる花に。',
    },
  ],
};
