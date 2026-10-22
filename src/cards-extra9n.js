// 追加分その 9n：UI 部品 3 本、エフェクト 2 本
const presize = `<div class="fx-presize"><div class="side"><b></b><b></b><b></b><b></b><div class="handle"></div></div><div class="main"><i></i><i></i><i></i><i></i><i></i><i></i></div><i class="cur"></i></div>`;
const ftree = `<div class="fx-ftree"><div class="n n1 f"><i></i>src</div><div class="kids k1"><div><div class="n n2 f"><i></i>blocks</div><div class="kids k2"><div><div class="n d">hero.css</div><div class="n d">buttons.css</div></div></div><div class="n d">build.js</div></div></div><div class="n d">index.html</div></div>`;
const chat = ['今日ありがとう！', '次は来週かな', 'また連絡するね'].map((t, i) => `<div class="m" style="--i:${i}">${t}</div>`).join('');

module.exports = {
  'cat-ui': [
    {
      id: 'panel-resize', accent: 'lavender', title: 'サイドパネルのリサイズ', en: 'Panel Resize',
      tags: ['width をドラッグで', 'min-width: 0 で並び直す', 'つまみが光る'],
      stage: `<div class="stage stage-presize" aria-hidden="true">\n  ${presize}\n</div>`,
      desc: '境目のつまみを引くとサイドパネルの幅が変わり、本文のカードが自動で並び直す。本文側に <code>min-width: 0</code> と <code>auto-fill</code> のグリッドを使うのがコツ。',
    },
    {
      id: 'file-tree', accent: 'blue', title: 'ファイルツリーの開閉', en: 'File Tree',
      tags: ['grid-template-rows 0fr → 1fr', '矢印は rotate', '入れ子も同じ仕組み'],
      stage: `<div class="stage stage-ftree" aria-hidden="true">\n  ${ftree}\n</div>`,
      desc: 'フォルダを押すと矢印が回って中身がにゅっと開き、入れ子のフォルダも同じように開く。高さ auto の開閉は <code>grid-template-rows</code> の補間でできる。',
    },
    {
      id: 'chat-read', accent: 'pink', title: '既読が順に付く', en: 'Read Receipts',
      tags: ['吹き出しは --i で順に', '既読は ::after', '上から順に点く'],
      stage: `<div class="stage stage-chat" aria-hidden="true">\n  <div class="fx-chat">${chat}</div>\n</div>`,
      desc: '送ったメッセージが順に並び、相手が読むと「既読」が上から順にすっと付く。既読のしるしは吹き出しの <code>::after</code> にして、遅延だけずらす。',
    },
  ],
  'cat-fx': [
    {
      id: 'paper-curl', accent: 'yellow', title: '紙の角がめくれる', en: 'Paper Curl',
      tags: ['::before が下の色', '::after が紙の裏', '--c で大きさ'],
      stage: `<div class="stage stage-curl" aria-hidden="true">\n  <div class="fx-curl"><b></b><b></b><b></b><b></b></div>\n</div>`,
      desc: 'カードの右下の角が少しめくれていて、ホバーで大きくめくれる。下の背景色を見せる三角と、紙の裏を描く三角の 2 つの疑似要素で作り、大きさは変数 1 つ。',
    },
    {
      id: 'ink-bleed', accent: 'lavender', title: 'インクがにじんで現れる文字', en: 'Ink Bleed',
      tags: ['親に contrast(18)', '子の blur を 3cqi → 0', '縁がにじむ'],
      stage: `<div class="stage stage-ink" aria-hidden="true">\n  <div class="fx-ink"><b>Ink</b></div>\n</div>`,
      desc: 'にじんだインクの染みが、じわっと縮んで文字になる。親に強い <code>contrast()</code> を掛け、子の <code>blur()</code> を大きい値から 0 へ動かすと、ぼけの縁がインクのにじみに変わる。',
    },
  ],
};
