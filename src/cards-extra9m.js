// 追加分その 9m：見出し 2 本、カード 2 本
const domino = 'DOMINO'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');
const col = (k, items) => `<div class="col" style="--k:${k}">${items.map(([h, c]) => `<i style="--h:${h}cqi; --c:${c}"></i>`).join('')}</div>`;
const mason = col(1, [[16, '#ffd3e3'], [24, '#d7eeff'], [18, '#e8e0ff'], [22, '#d9f5ea']])
  + col(.45, [[22, '#e8e0ff'], [14, '#ffe9c7'], [26, '#ffd3e3'], [18, '#d7eeff']])
  + col(1.3, [[18, '#d9f5ea'], [26, '#ffd3e3'], [16, '#d7eeff'], [24, '#e8e0ff']]);
const pane = (cls, c, inner = "") => `<div class="p ${cls}" style="--c:${c}"><div class="ph fx-photo"></div><b></b><b></b><b></b>${inner}</div>`;

module.exports = {
  'cat-hero': [
    {
      id: 'domino-text', accent: 'pink', title: 'ドミノのように倒れる文字', en: 'Domino Text',
      tags: ['transform-origin: 100% 100%', '倒れるのは加速', '起きるのは弾む'],
      stage: `<div class="stage stage-domino" aria-hidden="true">\n  <div class="fx-domino">${domino}</div>\n</div>`,
      desc: '文字が右下の角を軸に、左から順にパタパタと倒れて、しばらくして順に起き上がる。倒れる側は加速、起きる側は行き過ぎて戻るカーブにする。',
    },
    {
      id: 'water-text', accent: 'blue', tone: 'cool', title: '文字の中で揺れる水面', en: 'Water Text',
      tags: ['波の SVG を background-clip: text', '2 枚を逆向きに流す', '水位は縦位置'],
      stage: `<div class="stage stage-wtext cool" aria-hidden="true">\n  <div class="fx-wtext"><b data-t="WATER">WATER</b></div>\n</div>`,
      desc: '文字の中で水面が揺れ、ゆっくり水位が上がり下がりする。波の形の SVG を文字の形に切り抜き、横に流しながら縦位置を動かす。2 枚を逆向きに流すと奥行きが出る。',
    },
  ],
  'cat-cards': [
    {
      id: 'masonry-shift', accent: 'lavender', title: 'スクロールでずれるマソンリー', en: 'Masonry Shift',
      tags: ['列ごとに --k', '中央だけ遅く', '@property で補間'],
      stage: `<div class="stage stage-mason" aria-hidden="true">\n  <div class="fx-mason">${mason}</div>\n</div>`,
      desc: 'スクロールすると 3 列のカードがそれぞれ違う速さで動き、中央の列だけ遅れてずれる。スクロール量を変数に入れ、列ごとの倍率を掛けるだけ。',
    },
    {
      id: 'origami-card', accent: 'mint', title: '折り紙のように開くカード', en: 'Origami Card',
      tags: ['preserve-3d の入れ子', '右端を軸に rotateY', '折り目の影'],
      stage: `<div class="stage stage-origami" aria-hidden="true">\n  <div class="fx-ori">${pane('p1', '#ff8fb8')}${pane('p2', '#8fd0ff', pane('p3', '#6fd3b3'))}</div>\n</div>`,
      desc: '三つ折りのカードが、2 枚目、3 枚目の順にパタンと開く。各面を前の面の右端に置いて rotateY で開き、折り目側に影を付けると紙らしくなる。',
    },
  ],
};
