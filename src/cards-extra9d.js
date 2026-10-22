// 追加分その 9d：トランジション 3 本、エフェクト 4 本
module.exports = {
  'cat-trans': [
    {
      id: 'fab-expand', accent: 'pink', title: 'ボタンが画面に広がる', en: 'FAB Expand',
      tags: ['scale(24) で覆う', 'ボタン色 = 次画面の色', '覆ってから中身を出す'],
      stage: `<div class="stage stage-fabx" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-fabx"><span>+</span></div>\n  <div class="fx-scene b fabb">B</div>\n</div>`,
      desc: '右下の丸いボタンが押されると、その色が画面全体に広がって次の画面になる。ボタンを <code>scale</code> で大きくするだけなので、clip-path を使うより軽い。',
    },
    {
      id: 'card-pull', accent: 'lavender', title: 'カードのように引き出す', en: 'Card Pull',
      tags: ['前の画面は奥へ', 'rotateY で厚み', 'brightness で暗く'],
      stage: `<div class="stage stage-cpull" aria-hidden="true">\n  <div class="fx-scene a pullback">A</div>\n  <div class="fx-scene b pullin">B</div>\n</div>`,
      desc: '今の画面が少し奥へ引っ込んで暗くなり、次の画面がカードのように右から引き出される。親に <code>perspective</code> を付けて、入ってくる側を少し <code>rotateY</code> すると厚みが出る。',
    },
    {
      id: 'page-tear', accent: 'blue', title: '紙が破れる', en: 'Page Tear',
      tags: ['ギザギザの clip-path 2 枚', '左右に倒して落とす', 'drop-shadow で紙の縁'],
      stage: `<div class="stage stage-tear" aria-hidden="true">\n  <div class="fx-tear-b">B</div>\n  <div class="fx-tear l">A</div>\n  <div class="fx-tear r">A</div>\n</div>`,
      desc: '画面が真ん中からビリッと破れて、左右に倒れながら落ちると次の画面が現れる。同じ画面を 2 枚重ねてギザギザの <code>polygon()</code> で切り分け、破れる瞬間に小さく揺らす。',
    },
  ],
  'cat-fx': [
    {
      id: 'text-trail', accent: 'pink', tone: 'cool', title: '文字の残像', en: 'Motion Trail',
      tags: ['同じ文字を 4 枚重ねる', '--i × 60ms 遅らせる', 'alternate で往復'],
      stage: `<div class="stage stage-trail cool" aria-hidden="true">\n  <div class="fx-trail"><i>SWIFT</i><i style="--i:1">SWIFT</i><i style="--i:2">SWIFT</i><i style="--i:3">SWIFT</i><i style="--i:4">SWIFT</i></div>\n</div>`,
      desc: '動く文字の後ろに薄い残像が尾を引く。同じ文字を数枚重ね、同じアニメーションを少しずつ遅らせるだけ。遅れが大きい枚ほど薄くする。',
    },
    {
      id: 'glass-block', accent: 'blue', title: '曇りガラスのブロック', en: 'Frosted Glass',
      tags: ['backdrop-filter: blur()', 'saturate で色を濃く', '反射のハイライト'],
      stage: `<div class="stage stage-glass" aria-hidden="true">\n  <div class="fx-glass-bg">GLASS</div>\n  <div class="fx-glass"></div>\n</div>`,
      desc: '半透明のガラス板が文字や図形の上を通り、後ろがぼけて見える。<code>backdrop-filter</code> の要素を動かすだけで、背景側には何もしなくてよい。',
    },
    {
      id: 'extrude-text', accent: 'pink', tone: 'cool', title: '押し出し 3D 文字', en: 'Extruded Text',
      tags: ['text-shadow を 9 段', '段ごとに暗く', 'rotateY で揺らす'],
      stage: `<div class="stage stage-extrude cool" aria-hidden="true">\n  <div class="fx-ext"><b>BOLD</b></div>\n</div>`,
      desc: '文字に厚みがあるように見せる。<code>text-shadow</code> を少しずつずらして暗くしながら積むと押し出しになり、全体を <code>rotateY</code> で揺らすと立体感が出る。',
    },
    {
      id: 'vignette-pulse', accent: 'pink', tone: 'cool', title: '画面端の警告ビネット', en: 'Vignette Pulse',
      tags: ['box-shadow: inset', 'opacity だけ脈打つ', 'ゲームの HP 警告'],
      stage: `<div class="stage stage-vig cool" aria-hidden="true">\n  <div class="fx-vig"><b>LOW HP</b></div>\n</div>`,
      desc: '画面の縁が赤く脈打って危険を知らせる。内側の <code>box-shadow</code> を 1 枚置き、<code>opacity</code> だけを動かすので軽い。エラーや残り時間の警告にも。',
    },
  ],
};
