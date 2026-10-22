// 追加分その 9h：カード 4 本、トランジション 4 本
const strips = Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
const word = (w) => w.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');

module.exports = {
  'cat-cards': [
    {
      id: 'price-swap', accent: 'pink', title: '価格が裏返るプランカード', en: 'Price Swap',
      tags: ['月額 ⇄ 年額を rotateX', 'backface-visibility', 'バッジが弾む'],
      stage: `<div class="stage stage-price" aria-hidden="true">\n  <div class="fx-price"><div class="hd">Basic<span class="bg">2 か月おトク</span></div><div class="pr"><span class="m">¥980<small>/月</small></span><span class="y">¥9,800<small>/年</small></span></div><ul><li></li><li></li><li></li></ul><div class="btn">はじめる</div></div>\n</div>`,
      desc: 'ホバー（または年払いトグル）で見出しが色づき、価格が裏返って年額に変わり、「おトク」バッジが弾んで出る。価格は 2 つを同じマスに重ねて <code>rotateX</code> で入れ替える。',
    },
    {
      id: 'mask-morph', accent: 'lavender', title: '丸いアバターが写真に広がる', en: 'Shape Morph',
      tags: ['border-radius 50% → 2.5cqi', 'width / height も同時に', '名前が下へ逃げる'],
      stage: `<div class="stage stage-mmorph" aria-hidden="true">\n  <div class="fx-mmorph"><div class="ph fx-photo"></div><div class="nm">Mio Sakura<small>Illustrator</small></div></div>\n</div>`,
      desc: '丸いアバターがホバーで角丸の写真に広がり、名前が下へ逃げて色づく。丸と四角の間は <code>border-radius</code> と大きさを同時に補間すれば滑らかにつながる。',
    },
    {
      id: 'card-img-swap', accent: 'blue', title: 'ホバーで写真が入れ替わるカード', en: 'Image Swap',
      tags: ['2 枚を横に並べて translate', 'ドットの切り替え', 'overflow: hidden'],
      stage: `<div class="stage stage-imgswap" aria-hidden="true">\n  <div class="fx-iswap"><div class="ph"><i class="a fx-photo"></i><i class="b"></i><div class="dots"><b></b><b></b></div></div><b></b><b></b><b></b></div>\n</div>`,
      desc: '商品カードでよくある、ホバーで 2 枚目の写真にスライドする動き。1 枚目を左へ、2 枚目を右から同時に動かし、下のドットも一緒に切り替える。',
    },
    {
      id: 'card-3d-layers', accent: 'mint', title: '層が浮き上がる 3D カード', en: '3D Layers',
      tags: ['preserve-3d', '子ごとに translateZ', 'opacity は使わない'],
      stage: `<div class="stage stage-layers" aria-hidden="true">\n  <div class="fx-layers"><div class="ph fx-photo"></div><b class="t"></b><b></b><span class="btn">詳しく見る</span></div>\n</div>`,
      desc: 'ホバーでカードが少し傾き、写真・見出し・ボタンがそれぞれ違う高さに浮く。子要素を <code>translateZ</code> で持ち上げるだけで、手前のものほど大きく動いて立体に見える。',
    },
  ],
  'cat-trans': [
    {
      id: 'blinds-diag', accent: 'pink', title: '斜めのブラインド', en: 'Diagonal Blinds',
      tags: ['帯の親を rotate', '--i × 50ms', '畳むときは origin を下に'],
      stage: `<div class="stage stage-blindsd" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-blindsd">${strips}</div>\n  <div class="fx-scene b bdtext">B</div>\n</div>`,
      desc: '斜めの帯が端から順に伸びて画面を覆い、次の画面が出てから帯が畳まれる。帯の親ごと回転させれば、帯自体は普通の縦の scale で済む。',
    },
    {
      id: 'zoom-rotate-trans', accent: 'lavender', title: '回りながらズームで切り替え', en: 'Zoom Rotate',
      tags: ['scale + rotate + blur', '入る側は逆回転から', 'opacity で重ねる'],
      stage: `<div class="stage stage-zrot" aria-hidden="true">\n  <div class="fx-scene a zrout">A</div>\n  <div class="fx-scene b zrin">B</div>\n</div>`,
      desc: '前の画面が拡大しながら少し回ってぼけて消え、次の画面が小さく逆に回った状態から戻ってくる。回転は 20° 程度に抑えると酔わない。',
    },
    {
      id: 'text-crumble', accent: 'pink', tone: 'cool', title: '文字が崩れて次の文字になる', en: 'Text Crumble',
      tags: ['落ちる側は ease-in', '集まる側は ease-out', '--i で回転をばらす'],
      stage: `<div class="stage stage-crumble cool" aria-hidden="true">\n  <div class="fx-crumble"><div class="w w1">${word('HELLO')}</div><div class="w w2">${word('WORLD')}</div></div>\n</div>`,
      desc: '前の単語の文字が重力で落ちながら回り、次の単語の文字が下から集まってくる。落ちる側は加速、集まる側は減速のカーブにすると自然。',
    },
    {
      id: 'clock-wipe', accent: 'blue', title: '時計回りワイプ', en: 'Clock Wipe',
      tags: ['conic-gradient の mask', '@property で角度', '針は演出用'],
      stage: `<div class="stage stage-clock" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-scene b clockb">B</div>\n  <div class="fx-clock-hand"></div>\n</div>`,
      desc: '時計の針が一周するように、次の画面が扇形に広がって切り替わる。<code>conic-gradient</code> の mask の角度を 0 → 360° にするだけ。角度は <code>@property</code> で登録しておくと補間できる。',
    },
  ],
};
