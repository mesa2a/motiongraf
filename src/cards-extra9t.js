// 追加分その 9t：見出し 3 本、ボタン 4 本、カード 4 本（300 本へ向けて）
const gather = 'GATHER'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');
const gfItems = ['p', 'v', 'p', 'p', 'v', 'p', 'v', 'p'].map((k, i) => `<i class="${k}" style="--c:${['#ffd3e3', '#d7eeff', '#e8e0ff', '#d9f5ea', '#ffe9c7'][i % 5]}"></i>`).join('');

module.exports = {
  'cat-hero': [
    {
      id: 'text-stroke-draw', accent: 'pink', title: '文字の輪郭が線で描かれる', en: 'Stroke Draw',
      tags: ['SVG の <text>', 'stroke-dashoffset', '描き終わったら fill'],
      stage: `<div class="stage stage-tstroke" aria-hidden="true">\n  <div class="fx-tstroke"><svg viewBox="0 0 400 120"><text x="200" y="92" text-anchor="middle">DRAW</text></svg></div>\n</div>`,
      desc: '文字の輪郭が一筆書きのように描かれ、描き終わると中が塗られる。SVG の文字に大きめの dasharray を与えて dashoffset を 0 へ動かすだけ。',
    },
    {
      id: 'letter-gather', accent: 'blue', title: '文字が左右から集まる', en: 'Letter Gather',
      tags: ['奇数は左・偶数は右から', 'blur も一緒に取る', '--i × .05s'],
      stage: `<div class="stage stage-gather" aria-hidden="true">\n  <div class="fx-gather">${gather}</div>\n</div>`,
      desc: '文字が左右交互の方向から中央へ集まって並ぶ。文字ごとに向きを変えるだけで「寄ってくる」感じになる。ぼかしも一緒に取ると空気感が出る。',
    },
    {
      id: 'vertical-text', accent: 'yellow', title: '縦書きの見出しが上から現れる', en: 'Vertical Text',
      tags: ['writing-mode: vertical-rl', 'clip-path で上から', '添えの線は scaleY'],
      stage: `<div class="stage stage-vtext" aria-hidden="true">\n  <div class="fx-vtext"><small>二〇二六年 春</small><i class="ln"></i><h2>はじまりの季節</h2></div>\n</div>`,
      desc: '縦書きの見出しが上から下へ開いて現れ、添えの線が伸びる。日本語サイトの和風セクションに。<code>writing-mode</code> にしても clip-path はそのまま使える。',
    },
  ],
  'cat-buttons': [
    {
      id: 'btn-jelly-press', accent: 'pink', title: 'ぷるんと押せるボタン', en: 'Jelly Press',
      tags: ['scale x y を交互に', ':active で縮める', '離した時に 1 回だけ'],
      stage: `<div class="stage stage-jelly" aria-hidden="true">\n  <div class="fx-jelly">押してみて</div>\n</div>`,
      desc: '押すと縮み、離すとゼリーのように横に伸びて縦に縮んでを繰り返しながら落ち着く。scale の x と y を逆に動かすだけで弾力が出る。',
    },
    {
      id: 'btn-gradient-shift', accent: 'lavender', title: 'グラデーションが流れるボタン', en: 'Gradient Shift',
      tags: ['background-size 300%', 'background-position を動かす', '先頭色を末尾にも'],
      stage: `<div class="stage stage-gshift" aria-hidden="true">\n  <div class="fx-gshift">はじめる</div>\n</div>`,
      desc: 'ホバーでボタンのグラデーションがゆっくり横に流れる。背景を 3 倍の幅にして位置を動かすだけ。先頭の色を末尾にも置くと継ぎ目が出ない。',
    },
    {
      id: 'link-external', accent: 'blue', title: '外部リンクの矢印が飛ぶ', en: 'External Link',
      tags: ['↗ を 2 本重ねる', '右上へ抜けて左下から', 'overflow: hidden'],
      stage: `<div class="stage stage-extlink" aria-hidden="true">\n  <div class="fx-extlink">ドキュメントを見る<span class="ar"><i>↗</i><i>↗</i></span></div>\n</div>`,
      desc: 'ホバーで矢印が右上へ飛び出し、左下から次の矢印が入ってくる。外部リンクの「別の場所へ行く」感じを矢印の動きだけで伝える。',
    },
    {
      id: 'btn-close-draw', accent: 'mint', title: '× が線で描かれる閉じるボタン', en: 'Close Draw',
      tags: ['2 本の線を順に scaleX', 'hover で 90° 回る', 'transform-origin: 0 50%'],
      stage: `<div class="stage stage-closex" aria-hidden="true">\n  <div class="fx-closex"><i></i><i></i></div>\n</div>`,
      desc: 'モーダルを開くと × が 2 本の線で順に描かれ、ホバーで 90° 回る。描かれる動きがあるだけで「閉じられる」ことが伝わりやすい。',
    },
  ],
  'cat-cards': [
    {
      id: 'card-holo-shine', accent: 'lavender', tone: 'cool', title: 'ホログラムのように光るカード', en: 'Holo Card',
      tags: ['虹色の帯を screen で', 'rotateX / Y と同期', 'pointermove で動かす'],
      stage: `<div class="stage stage-holocard cool" aria-hidden="true">\n  <div class="fx-holocard"><b></b><b></b><b></b></div>\n</div>`,
      desc: 'トレーディングカードのように、傾けると虹色の光沢が表面を走る。虹色の帯を <code>mix-blend-mode: screen</code> で重ね、傾きと一緒に位置を動かす。',
    },
    {
      id: 'grid-filter', accent: 'blue', title: 'フィルタで項目が詰まる', en: 'Grid Filter',
      tags: ['width 0 + margin で畳む', 'scale 0 と opacity', 'flex が隙間を詰める'],
      stage: `<div class="stage stage-gfilter" aria-hidden="true">\n  <div class="fx-gfilter"><div class="bar"><span>すべて</span><span>写真</span><span>動画</span></div><div class="items">${gfItems}</div></div>\n</div>`,
      desc: '「写真」を選ぶと動画の項目が縮んで消え、残りの項目が滑らかに詰まる。消える側の幅と余白を 0 にするだけで、並び直しは flex に任せられる。',
    },
    {
      id: 'card-to-modal', accent: 'pink', title: 'カードが広がってモーダルになる', en: 'Card to Modal',
      tags: ['left / top / width / height を補間', '背景は後から暗く', 'View Transition でも'],
      stage: `<div class="stage stage-c2m" aria-hidden="true">\n  <div class="fx-c2m"><div class="sm" style="left:12%"><div class="ph fx-photo"></div><b></b><b></b></div><div class="sm" style="left:66%"><div class="ph fx-photo"></div><b></b><b></b></div><div class="shade"></div><div class="big"><div class="ph fx-photo"></div><div class="tx"><b class="t"></b><b></b><b class="more"></b><b class="more"></b><b class="more"></b></div></div></div>\n</div>`,
      desc: 'クリックしたカードがその場から画面いっぱいに広がって詳細になり、閉じると元の位置へ戻る。位置と大きさを補間するだけで「つながっている」感じが出る。',
    },
    {
      id: 'img-color-hover', accent: 'mint', title: 'モノクロからカラーになる写真', en: 'Color on Hover',
      tags: ['filter: grayscale(1 → 0)', '少し寄せる', 'キャプションは下から'],
      stage: `<div class="stage stage-gray" aria-hidden="true">\n  <div class="fx-gray"><div class="ph fx-photo"></div><span class="cap">Spring Collection</span></div>\n</div>`,
      desc: 'モノクロの写真がホバーで色づき、少し寄って、キャプションが下から出る。ギャラリーの一覧で「選ばれた」ことを伝える定番。',
    },
  ],
};
