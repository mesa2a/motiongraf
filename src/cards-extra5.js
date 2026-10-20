// 追加分その 5：ボタン 7 本、UI 部品 8 本
module.exports = {
  'cat-buttons': [
    {
      id: 'btn-3d', accent: 'pink', title: '立体ボタン', en: '3D Press',
      tags: ['box-shadow 0 1.2cqi', ':active', 'translate で沈む'],
      stage: `<div class="stage stage-btn3d" aria-hidden="true">\n  <a class="fx-btn b3d">スタート</a>\n</div>`,
      desc: 'ぼかしなしの影を下に置いて厚みにし、押すと本体が下がって影が縮む。<code>:active</code> だけで成立する、いちばん手軽な「押した感」。',
    },
    {
      id: 'btn-draw', accent: 'pink', title: '枠線が描かれるボタン', en: 'Border Draw',
      tags: ['::before / ::after', 'width → height', 'transition-delay'],
      stage: `<div class="stage stage-btndraw" aria-hidden="true">\n  <a class="fx-btn draw">くわしく</a>\n</div>`,
      desc: '2 つの疑似要素にそれぞれ 2 辺ずつ線を持たせ、横に伸びてから縦に伸ばす。<code>transition-delay</code> で縦を後回しにすると一筆書きに見える。',
    },
    {
      id: 'btn-bounce-text', accent: 'lavender', title: '文字が順に跳ねるボタン', en: 'Bounce Letters',
      tags: ['span 分割', 'transition-delay', '行き過ぎ'],
      stage: `<div class="stage stage-btnbounce" aria-hidden="true">\n  <a class="fx-btn bounce"><span style="--i:0">も</span><span style="--i:1">っ</span><span style="--i:2">と</span><span style="--i:3">見</span><span style="--i:4">る</span></a>\n</div>`,
      desc: '文字を 1 つずつ <code>span</code> にして、ホバー時に 0.04 秒ずつ遅れて跳ねさせる。遊び心のあるサイトのメインボタンに。',
    },
    {
      id: 'btn-liquid', accent: 'mint', title: '液体が満ちるボタン', en: 'Liquid Fill',
      tags: ['角丸四角を回す', 'top を動かす', 'z-index: -1'],
      stage: `<div class="stage stage-btnliquid" aria-hidden="true">\n  <a class="fx-btn liquid">注文する<i></i><i class="w2"></i></a>\n</div>`,
      desc: 'ボタンの中に大きな角丸四角を 2 枚沈めておき、回しながら上げると波打つ水面になる。<code>overflow: hidden</code> のボタンの中で動かす。',
    },
    {
      id: 'btn-neon', accent: 'blue', tone: 'cool', title: 'ネオンボタン', en: 'Neon Button',
      tags: ['box-shadow 多段', 'text-shadow', '点灯前のちらつき'],
      stage: `<div class="stage stage-btnneon cool" aria-hidden="true">\n  <a class="fx-btn neon">ENTER</a>\n</div>`,
      desc: '枠と文字を同じ色で光らせ、ホバーで塗りつぶして外側の発光を強くする。点灯の直前に一瞬暗くするとネオン管らしい。',
    },
    {
      id: 'btn-skew', accent: 'pink', title: '斜めに塗るボタン', en: 'Skew Fill',
      tags: ['skewX(-25deg)', 'inset: -1cqi', 'translateX 130%'],
      stage: `<div class="stage stage-btnskew" aria-hidden="true">\n  <a class="fx-btn skew">エントリー</a>\n</div>`,
      desc: '斜めに傾けた板が左から入って塗りつぶし、右へ抜ける。板はボタンより一回り大きくしておくと、傾けても角に隙間が出ない。',
    },
    {
      id: 'fab-menu', accent: 'pink', title: 'FAB メニュー展開', en: 'FAB Menu',
      tags: ['+ → ×', '--tx / --ty で配置', '行き過ぎ'],
      stage: `<div class="stage stage-fab" aria-hidden="true">\n  <div class="fx-fab"><div class="main">+</div><i style="--i:0; --tx:-16; --ty:0">✎</i><i style="--i:1; --tx:-11.3; --ty:-11.3">♡</i><i style="--i:2; --tx:0; --ty:-16">☆</i></div>\n</div>`,
      desc: '右下の丸ボタンを押すと「+」が「×」に回り、小さなボタンが扇状に飛び出す。それぞれの行き先は <code>--tx</code> <code>--ty</code> で指定。',
    },
  ],
  'cat-ui': [
    {
      id: 'chips', accent: 'lavender', title: '選択チップ', en: 'Filter Chips',
      tags: ['padding-left で余白', '::before のチェック', '.on'],
      stage: `<div class="stage stage-chips" aria-hidden="true">\n  <div class="fx-chips"><span style="--i:0">写真</span><span style="--i:1">イラスト</span><span style="--i:2">動画</span><span style="--i:3">音楽</span><span style="--i:4">ゲーム</span><span style="--i:5">料理</span></div>\n</div>`,
      desc: '選ぶと色が付き、左にチェックが生えて文字がずれる。チェックの分だけ <code>padding-left</code> を増やすと自然に広がる。',
    },
    {
      id: 'stepper', accent: 'pink', title: '数量ステッパー', en: 'Stepper',
      tags: ['数字の窓', 'translate で繰り上げ', 'ボタンを沈める'],
      stage: `<div class="stage stage-stepper" aria-hidden="true">\n  <div class="fx-stp"><b>−</b><div class="n"><i>1</i><i>2</i><i>3</i></div><b class="plus">+</b></div>\n</div>`,
      desc: '＋を押すたびに数字が上へ繰り上がる。数字を縦に並べた列を窓の中で動かす（オドメーターと同じ仕組み）。押したボタンは一瞬沈める。',
    },
    {
      id: 'range', accent: 'blue', title: 'レンジスライダー', en: 'Range Slider',
      tags: ['width / left', 'counter() の吹き出し', 'alternate'],
      stage: `<div class="stage stage-range" aria-hidden="true">\n  <div class="fx-rng"><div class="fill"></div><div class="knob"></div><div class="tip"></div></div>\n</div>`,
      desc: 'つまみの位置に合わせて塗りと吹き出しの数字が動く。本番は <code>&lt;input type="range"&gt;</code> の値を CSS 変数に流して 3 つを同期させる。',
    },
    {
      id: 'like-counter', accent: 'pink', title: 'いいね数が増える', en: 'Like Counter',
      tags: ['ハートの弾み', '数字の窓', '繰り上がり'],
      stage: `<div class="stage stage-likec" aria-hidden="true">\n  <div class="fx-lk"><span class="h">♥</span><div class="c"><i>128</i><i>129</i></div></div>\n</div>`,
      desc: 'ハートがピンクに弾むと同時に、隣の数字が上へ繰り上がる。数字は窓の中で 2 段の列を動かす。',
    },
    {
      id: 'pw-strength', accent: 'mint', title: 'パスワードの強さ', en: 'Password Strength',
      tags: ['steps() の入力', 'バー 4 本', '--c で色'],
      stage: `<div class="stage stage-pw" aria-hidden="true">\n  <div class="fx-pw"><div class="in"><span>••••••••••</span></div><div class="bars"><i style="--i:0; --c:#ff8fab"></i><i style="--i:1; --c:#f9b58a"></i><i style="--i:2; --c:#f5d98c"></i><i style="--i:3; --c:#6fd3b3"></i></div><div class="lbl">パスワードの強さ</div></div>\n</div>`,
      desc: '入力が進むにつれてバーが赤 → 橙 → 黄 → 緑と 1 本ずつ点く。バーは色を <code>--c</code> で持ち、点灯のタイミングだけ遅らせる。',
    },
    {
      id: 'otp', accent: 'lavender', title: '認証コード入力', en: 'OTP Input',
      tags: ['attr() で数字', 'フォーカスの輪', '--i で順番'],
      stage: `<div class="stage stage-otp" aria-hidden="true">\n  <div class="fx-otp"><i style="--i:0" data-n="4"></i><i style="--i:1" data-n="8"></i><i style="--i:2" data-n="2"></i><i style="--i:3" data-n="9"></i><i style="--i:4" data-n="1"></i><i style="--i:5" data-n="7"></i></div>\n</div>`,
      desc: '6 つの枠にフォーカスの輪が順に移り、数字が「ぽん」と入る。数字は <code>data-n</code> を <code>attr()</code> で表示。',
    },
    {
      id: 'avatars', accent: 'blue', title: 'アバターが重なって出る', en: 'Avatar Stack',
      tags: ['margin-left: -3cqi', '白い縁', '--i で順番'],
      stage: `<div class="stage stage-avatars" aria-hidden="true">\n  <div class="fx-av"><i style="--i:0; --c:#ff8fb8">A</i><i style="--i:1; --c:#8fd0ff">K</i><i style="--i:2; --c:#c9b8ff">M</i><i style="--i:3; --c:#6fd3b3">S</i><i style="--i:4; --c:#4b4a5e">+3</i></div>\n</div>`,
      desc: '参加者のアイコンが左から順に「ぽん」と重なって並ぶ。白い縁を付けて重なりを分かりやすく。最後は「+3」で残りを表す。',
    },
    {
      id: 'skeleton-swap', accent: 'yellow', title: 'スケルトン → 中身', en: 'Skeleton to Content',
      tags: ['2 層を重ねる', 'opacity の入れ替え', '--i で順番'],
      stage: `<div class="stage stage-skswap" aria-hidden="true">\n  <div class="fx-sks"><div class="ph"><div class="sk"></div><div class="ct" style="--i:0"></div></div><div class="ln"><div class="sk"></div><div class="ct" style="--i:1"></div></div><div class="ln"><div class="sk"></div><div class="ct" style="--i:2"></div></div><div class="ln s"><div class="sk"></div><div class="ct" style="--i:3"></div></div></div>\n</div>`,
      desc: '読み込み中のスケルトンが、本物の中身にふわっと置き換わる。同じ枠にスケルトンと中身を重ねておき、透明度を入れ替えるだけ。',
    },
  ],
};
