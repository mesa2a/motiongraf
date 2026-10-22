// 追加分その 9b：カード・画像 5 本、スクロール 3 本
const cstack = [['#8fd0ff', '#c9b8ff'], ['#ff9ec4', '#ffd3a8'], ['#9fe3cd', '#8fd0ff']]
  .map(([a, b], i) => `<div class="c" style="--i:${i}; --c1:${a}; --c2:${b}"><b></b><b></b></div>`).join('');
const crs = [['#c9b8ff', '#ff9ec4'], ['#8fd0ff', '#c9b8ff'], ['#ff9ec4', '#ffd3a8'], ['#9fe3cd', '#8fd0ff'], ['#ffd3a8', '#ff9ec4']]
  .map(([a, b]) => `<div class="it" style="--c1:${a}; --c2:${b}"></div>`).join('');
const secs = [['おすすめ', '#ff8fb8'], ['新着', '#8fd0ff'], ['ランキング', '#c9b8ff']];

module.exports = {
  'cat-cards': [
    {
      id: 'card-push-up', accent: 'pink', title: '本文が画像を押し上げるカード', en: 'Push-up Card',
      tags: ['本文を translate で上へ', '画像は少し寄る', 'ボタンは遅れて出る'],
      stage: `<div class="stage stage-cardpush" aria-hidden="true">\n  <div class="fx-cpu"><div class="img fx-photo"></div><div class="body"><b></b><b></b><b></b><span class="more">詳しく見る</span></div></div>\n</div>`,
      desc: 'ホバーで本文のパネルが上がって画像を押し上げ、隠れていたボタンが遅れて現れる。画像側も少しだけ寄せると「押された」感じが出る。',
    },
    {
      id: 'card-stack-swipe', accent: 'blue', title: '積み重なったカードのめくり', en: 'Stack Swipe',
      tags: ['負の遅延で段を配る', '1 本のキーフレーム', 'z-index も動かす'],
      stage: `<div class="stage stage-stack" aria-hidden="true">\n  <div class="fx-cst">${cstack}</div>\n</div>`,
      desc: '先頭のカードが右へ飛んで消え、後ろのカードが 1 段ずつ前に出てくる。3 枚とも同じキーフレームで、遅延をマイナス 3 秒ずつずらすだけで輪になる。',
    },
    {
      id: 'img-split', accent: 'lavender', title: '左右に割れる画像', en: 'Split Image',
      tags: ['clip-path: inset で半分', '2 枚を逆方向へ', '間に文字'],
      stage: `<div class="stage stage-isplit" aria-hidden="true">\n  <div class="fx-isp"><div class="h l fx-photo"></div><div class="h r fx-photo"></div><span class="t">VIEW</span></div>\n</div>`,
      desc: 'ホバーで画像が真ん中から左右に割れ、隙間に文字が浮かぶ。同じ画像を 2 枚重ねて <code>clip-path</code> で半分ずつ見せ、逆方向に動かす。',
    },
    {
      id: 'card-glow-follow', accent: 'pink', title: 'カーソルを追う光', en: 'Cursor Glow',
      tags: ['--gx / --gy を JS で', 'radial-gradient の中心', 'mask で縁だけ光らせる'],
      stage: `<div class="stage stage-glow" aria-hidden="true">\n  <div class="fx-cgl"><b></b><b></b><b></b><i class="cur"></i></div>\n</div>`,
      desc: 'カーソルの位置にピンクの光が追いかけてきて、縁も同じ位置だけ光る。JS はカード内の座標を％にして <code>--gx</code> と <code>--gy</code> に入れるだけ。',
    },
    {
      id: 'card-expand-detail', accent: 'mint', title: '横に広がる詳細パネル', en: 'Expand Detail',
      tags: ['grid-template-columns 0fr → 1fr', '中身は遅れてフェード', 'クリックで .open'],
      stage: `<div class="stage stage-cardex" aria-hidden="true">\n  <div class="fx-cex"><div class="main"><div class="ph fx-photo"></div><b></b><b></b><span class="btn">詳細</span></div><div class="dt"><div><b></b><b></b><b></b><b></b><span class="buy">カートに入れる</span></div></div></div>\n</div>`,
      desc: '「詳細」を押すとカードの右側が伸びて詳細パネルが現れる。列の幅を <code>0fr → 1fr</code> で補間し、中身は少し遅れてフェードさせると自然。',
    },
  ],
  'cat-enter': [
    {
      id: 'sticky-heading', accent: 'blue', title: '固定見出しの差し替え', en: 'Sticky Heading',
      tags: ['position: sticky', '次の見出しが押し上げる', '--i で切り替え'],
      stage: `<div class="stage stage-sticky" aria-hidden="true">\n  <div class="fx-sth"><div class="hd">${secs.map(([t, c], i) => `<span style="--i:${i}; --c:${c}">${t}</span>`).join('')}</div><div class="pg">${secs.map(([, c]) => `<div class="sec" style="--c:${c}"><b></b><b></b><b></b></div>`).join('')}</div></div>\n</div>`,
      desc: 'スクロールしても見出しが上に貼り付き、次のセクションに入ると見出しが押し上げられて入れ替わる。本番は各見出しを <code>position: sticky</code> にすれば CSS だけで済む。',
    },
    {
      id: 'carousel-center', accent: 'pink', title: '中央が大きくなるカルーセル', en: 'Center Carousel',
      tags: ['トラックを translate', '中央だけ scale 1', 'alternate で往復'],
      stage: `<div class="stage stage-carousel" aria-hidden="true">\n  <div class="fx-crs">${crs}</div>\n</div>`,
      desc: '横に並んだカードが流れ、中央に来たものだけ大きく濃くなる。本番は <code>scroll-snap</code> のトラックにして、中央の要素だけに <code>.on</code> を付ける。',
    },
    {
      id: 'scroll-steps', accent: 'lavender', title: 'スクロールで進むステップ', en: 'Scroll Steps',
      tags: ['線は scaleY', '番号は到達で点灯', '--i × 2s'],
      stage: `<div class="stage stage-steps" aria-hidden="true">\n  <div class="fx-sst"><div class="nav"><i class="fill"></i><span class="n" style="--i:0">1</span><span class="n" style="--i:1">2</span><span class="n" style="--i:2">3</span><span class="n" style="--i:3">4</span></div><div class="pg"><div><b style="--c:#ffe3ef"></b><b style="--c:#d7eeff"></b><b style="--c:#e8e0ff"></b><b style="--c:#d9f5ea"></b></div></div></div>\n</div>`,
      desc: '本文を読み進めるにつれて左のステップの線が伸び、番号が順に点灯する。線は <code>scaleY</code>、番号はセクションの到達で色を変える。',
    },
  ],
};
