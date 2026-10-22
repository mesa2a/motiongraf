// 追加分その 9o：トランジション 2 本、背景 2 本
module.exports = {
  'cat-trans': [
    {
      id: 'droplet-trans', accent: 'pink', title: '水滴が落ちて広がる', en: 'Droplet',
      tags: ['滴は加速で落ちる', '着地でつぶれる', '円を scale(16) で広げる'],
      stage: `<div class="stage stage-droplet" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-drop"></div>\n  <div class="fx-drop-ring"></div>\n  <div class="fx-scene b dropb">B</div>\n</div>`,
      desc: '上から水滴が落ちてきて、着地した点から円が広がって次の画面になる。滴は着地で少しつぶしてから消すと、液体らしさが出る。',
    },
    {
      id: 'scroll-unroll', accent: 'lavender', title: '巻物のように開く', en: 'Unroll',
      tags: ['clip-path: inset の左右', '芯は translate', '両側へ同時に'],
      stage: `<div class="stage stage-unroll" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-unroll">B</div>\n  <div class="fx-unroll-bar l"></div>\n  <div class="fx-unroll-bar r"></div>\n</div>`,
      desc: '中央の芯が左右に転がって、巻物を開くように次の画面が現れる。見える範囲は inset の左右を 50% → 0 に、芯は同じ速さで外へ動かす。',
    },
  ],
  'cat-bg': [
    {
      id: 'kaleidoscope', accent: 'pink', tone: 'cool', title: '万華鏡', en: 'Kaleidoscope',
      tags: ['repeating-conic-gradient × 3', '層ごとに速さを変える', 'mask で縁を消す'],
      stage: `<div class="stage stage-kaleido cool" aria-hidden="true">\n  <div class="fx-kal"></div>\n</div>`,
      desc: '12 分割の扇を 3 層重ね、違う速さで回すと万華鏡のように模様が入れ替わる。中心だけ見せる mask で縁を消すと落ち着く。',
    },
    {
      id: 'breathing-grid', accent: 'blue', title: 'ゆっくり呼吸する格子', en: 'Breathing Grid',
      tags: ['background-size を変数で', '@property で補間', '周りは radial で消す'],
      stage: `<div class="stage stage-bgrid" aria-hidden="true">\n  <div class="fx-bgrid"></div>\n</div>`,
      desc: '方眼の格子がゆっくり広がったり縮んだりして呼吸しているように見える。格子の間隔を登録した変数にして補間するだけ。',
    },
  ],
};
