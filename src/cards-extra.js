// 追加分のカード。キーはカテゴリ id、値はそのカテゴリ末尾に足すカードの配列。
module.exports = {
  'cat-hero': [
    {
      id: 'blur-letters', accent: 'sky', title: 'ぼかしから現れる文字', en: 'Blur In',
      tags: ['filter: blur()', '--i で遅延', 'opacity'],
      stage: `<div class="stage stage-blurtext" aria-hidden="true">
  <div class="fx-blurtext"><span style="--i:0">ぼ</span><span style="--i:1">ん</span><span style="--i:2">や</span><span style="--i:3">り</span><span style="--i:4">、</span><span style="--i:5">く</span><span style="--i:6">っ</span><span style="--i:7">き</span><span style="--i:8">り</span></div>
</div>`,
      desc: '1 文字ずつ、ぼやけた状態からピントが合う。<code>filter: blur()</code> と透明度を同時に動かし、0.08 秒ずつずらす。キャッチコピーの登場に。',
    },
    {
      id: 'odometer', accent: 'lavender', title: '回転する数字（オドメーター）', en: 'Odometer',
      tags: ['overflow: hidden', 'translate', '--to で目標'],
      stage: `<div class="stage stage-odo" aria-hidden="true">
  <div class="fx-odo">
    <div class="d" style="--i:0"><b style="--to:1"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></b></div>
    <span class="sep">,</span>
    <div class="d" style="--i:1"><b style="--to:2"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></b></div>
    <div class="d" style="--i:2"><b style="--to:5"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></b></div>
    <div class="d" style="--i:3"><b style="--to:0"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></b></div>
  </div>
</div>`,
      desc: '0〜9 を縦に並べた列を、窓の中で目標の数字まで滑らせる。桁ごとに少し遅らせると「カラカラ」と回る感じに。<code>--to</code> に止めたい数字を入れるだけ。',
    },
  ],
  'cat-buttons': [
    {
      id: 'btn-ripple', accent: 'mint', title: '押した時のリップル', en: 'Ripple',
      tags: [':active', '::after', 'scale 0 → 12'],
      stage: `<div class="stage stage-btnripple" aria-hidden="true">
  <a class="fx-btn ripple">送信する</a>
</div>`,
      desc: 'マテリアルデザインの波紋。中央の小さな丸を 12 倍まで広げながら消す。実装は <code>:active::after</code> に 0.5 秒のアニメーションを 1 回だけ。',
    },
    {
      id: 'btn-pulse', accent: 'pink', title: '鼓動する CTA', en: 'Pulse CTA',
      tags: ['box-shadow 波紋', '2 つの animation', 'alternate'],
      stage: `<div class="stage stage-btnpulse" aria-hidden="true">
  <a class="fx-btn pulse">今すぐ登録</a>
</div>`,
      desc: '押してほしいボタンに。<code>box-shadow</code> の広がりで波紋、<code>translate</code> の往復でふわふわ。2 つのアニメーションをカンマで同時に付ける。',
    },
    {
      id: 'btn-icon-spin', accent: 'sky', title: 'アイコンが回るボタン', en: 'Icon Spin',
      tags: ['rotate', '+ → ×', '行き過ぎ'],
      stage: `<div class="stage stage-btnicon" aria-hidden="true">
  <a class="fx-btn icon"><b>+</b>追加する</a>
</div>`,
      desc: '「+」を 225° 回すと「×」になる。追加ボタンが閉じるボタンに変わる時や、FAB のメニュー展開に。回しすぎてから戻るカーブで「カチッ」と。',
    },
    {
      id: 'btn-swap-text', accent: 'lavender', title: '文字が入れ替わるボタン', en: 'Text Swap',
      tags: ['2 枚重ね', 'translate 100%', 'overflow: hidden'],
      stage: `<div class="stage stage-btnswap" aria-hidden="true">
  <a class="fx-btn swap"><span>カートに入れる</span><span>今すぐ購入 →</span></a>
</div>`,
      desc: '同じ場所に 2 つの文字を重ね、ホバーで上の文字を上へ、下に待機していた文字を定位置へ。ボタンは <code>overflow: hidden</code> ではみ出しを隠す。',
    },
    {
      id: 'btn-offset', accent: 'pink', title: 'ベタ影に沈むボタン', en: 'Offset Shadow',
      tags: ['box-shadow 0 blur', 'translate', 'ポップ'],
      stage: `<div class="stage stage-btnoffset" aria-hidden="true">
  <a class="fx-btn offset">くわしく見る</a>
</div>`,
      desc: 'ぼかしなしの影をずらして置き、ホバーで影の方へ本体を沈める。影を短くするのと移動を同時に。ポップなサイトやステッカー風 UI に。',
    },
  ],
  'cat-cards': [
    {
      id: 'img-overlay', accent: 'lavender', title: 'ホバーで情報オーバーレイ', en: 'Hover Overlay',
      tags: ['opacity', '文字を遅らせる', 'transition-delay'],
      stage: `<div class="stage stage-imgoverlay" aria-hidden="true">
  <div class="fx-ov"><div class="ph fx-photo"></div><div class="ol"><strong>カフェの朝</strong><b>記事を読む</b></div></div>
</div>`,
      desc: '写真の上に半透明の幕とタイトル、ボタン。幕はフェード、文字は少し下から。ボタンだけ <code>transition-delay</code> を 0.05 秒付けると順番に出る。',
    },
    {
      id: 'gallery-expand', accent: 'sky', title: '広がるギャラリー', en: 'Expanding Gallery',
      tags: ['flex: 1 → 3', 'hue-rotate', ':hover'],
      stage: `<div class="stage stage-gallery" aria-hidden="true">
  <div class="fx-gal"><div class="ph fx-photo" style="--i:0"></div><div class="ph fx-photo" style="--i:1"></div><div class="ph fx-photo" style="--i:2"></div><div class="ph fx-photo" style="--i:3"></div></div>
</div>`,
      desc: '横に並んだ写真のうち、触った 1 枚だけ広がる。<code>flex</code> の値は補間できるので <code>transition: flex .5s</code> で動く。作品一覧やメニューに。',
    },
    {
      id: 'compare', accent: 'mint', title: 'ビフォー・アフター', en: 'Compare Slider',
      tags: ['clip-path: inset()', 'grayscale', 'range と連動'],
      stage: `<div class="stage stage-compare" aria-hidden="true">
  <div class="fx-cmp">
    <div class="ph fx-photo before"></div>
    <div class="ph fx-photo after"></div>
    <div class="handle"></div>
    <span class="tag l">BEFORE</span><span class="tag r">AFTER</span>
  </div>
</div>`,
      desc: '同じ位置に 2 枚重ね、上の 1 枚を <code>clip-path: inset()</code> で左から切る。本番は <code>&lt;input type="range"&gt;</code> の値を CSS 変数に流せば JS 数行で動く。',
    },
    {
      id: 'card-fan', accent: 'pink', title: '扇状に広がるカード', en: 'Card Fan',
      tags: ['transform-origin 下', 'rotate', '重ね順'],
      stage: `<div class="stage stage-fan" aria-hidden="true">
  <div class="fx-fan"><div class="c">A</div><div class="c">B</div><div class="c">C</div></div>
</div>`,
      desc: '重ねたカードの支点をカードの下側に置き、左右へ ±18° 回す。カードゲーム風のギャラリーや、プランの比較に。',
    },
    {
      id: 'ken-burns', accent: 'sky', title: 'ゆっくり寄る写真', en: 'Ken Burns',
      tags: ['scale 1 → 1.18', '12 秒', 'transform-origin'],
      stage: `<div class="stage stage-kb" aria-hidden="true">
  <div class="fx-kb fx-photo"></div>
  <div class="fx-kb-text">ゆっくり寄る写真</div>
</div>`,
      desc: 'ヒーロー写真を 10 秒以上かけてほんの少し拡大・移動する。止まっている写真より「生きている」感じになる。<code>transform-origin</code> で寄る先を決める。',
    },
  ],
  'cat-enter': [
    {
      id: 'stats-count', accent: 'lavender', title: '実績の数字が増える', en: 'Stats Counter',
      tags: ['@property', 'counter()', '--to で目標'],
      stage: `<div class="stage stage-stats" aria-hidden="true">
  <div class="fx-stats">
    <div style="--i:0; --to:120"><b data-suffix="+"></b><small>PROJECTS</small></div>
    <div style="--i:1; --to:98"><b data-suffix="%"></b><small>SATISFACTION</small></div>
    <div style="--i:2; --to:12"><b data-suffix="yrs"></b><small>EXPERIENCE</small></div>
  </div>
</div>`,
      desc: '「実績」セクションの定番。カウントアップを 3 つ並べ、0.25 秒ずつ遅らせる。目標値は <code>--to</code>、単位は <code>data-suffix</code> で HTML 側から。',
    },
    {
      id: 'timeline', accent: 'pink', title: 'タイムラインが伸びる', en: 'Timeline',
      tags: ['scaleX', '--i で遅延', '流れの説明'],
      stage: `<div class="stage stage-timeline" aria-hidden="true">
  <div class="fx-tl">
    <div class="line"><i></i></div>
    <div class="steps">
      <div class="st" style="--i:0"><b>1</b><small>ご相談</small></div>
      <div class="st" style="--i:1"><b>2</b><small>設計</small></div>
      <div class="st" style="--i:2"><b>3</b><small>制作</small></div>
      <div class="st" style="--i:3"><b>4</b><small>公開</small></div>
    </div>
  </div>
</div>`,
      desc: '線が左から伸び、それを追いかけて項目がぽんぽんと出る。線の速さと項目の遅延をそろえるのがコツ。「ご利用の流れ」に。',
    },
    {
      id: 'header-shrink', accent: 'sky', title: '縮むヘッダー', en: 'Shrinking Header',
      tags: ['height', 'font-size', 'スクロールで .small'],
      stage: `<div class="stage stage-header" aria-hidden="true">
  <div class="fx-hd"><b>LOGO</b><span>Home Works About</span></div>
  <div class="fx-hd-doc"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
</div>`,
      desc: 'スクロールしたらヘッダーが細くなり、ロゴも小さくなる。<code>height</code> と <code>font-size</code> に <code>transition</code> を付け、スクロール量で <code>.small</code> を付け外し。',
    },
    {
      id: 'back-to-top', accent: 'pink', title: 'トップへ戻るボタン', en: 'Back to Top',
      tags: ['translate', 'opacity', '行き過ぎ'],
      stage: `<div class="stage stage-btt" aria-hidden="true">
  <div class="fx-btt-doc"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="fx-btt"></div>
</div>`,
      desc: '一定以上スクロールしたら右下からひょこっと出る。下から少し行き過ぎて止まると気持ちいい。消える時は同じ道を戻る。',
    },
  ],
  'cat-ui': [
    {
      id: 'tabs', accent: 'pink', title: 'タブ切り替え', en: 'Tabs',
      tags: ['下線が移動', 'パネルのスライド', '--i で同期'],
      stage: `<div class="stage stage-tabs" aria-hidden="true">
  <div class="fx-tabs">
    <div class="bar"><span style="--i:0">概要</span><span style="--i:1">仕様</span><span style="--i:2">レビュー</span><i></i></div>
    <div class="panes"><div style="--i:0"><b></b><b></b><b></b></div><div style="--i:1"><b></b><b></b><b></b></div><div style="--i:2"><b></b><b></b><b></b></div></div>
  </div>
</div>`,
      desc: '下線は 1 本だけ用意して選択位置へ滑らせ、パネルは古いものが左へ抜けて新しいものが右から入る。下線と文字色とパネルの 3 つを同じタイミングで。',
    },
    {
      id: 'search-expand', accent: 'lavender', title: '開く検索ボックス', en: 'Search Expand',
      tags: ['width', 'overflow: hidden', ':focus-within'],
      stage: `<div class="stage stage-search" aria-hidden="true">
  <div class="fx-search"><i></i><span>キーワードで検索</span></div>
</div>`,
      desc: '虫めがねだけの丸いボタンが、横に伸びて入力欄になる。プレースホルダーは少し遅れてフェード。<code>:focus-within</code> なら JS なしで開ける。',
    },
    {
      id: 'rating', accent: 'lemon', title: '星レーティング', en: 'Star Rating',
      tags: ['color', 'scale 1.35', '--i で順番'],
      stage: `<div class="stage stage-rating" aria-hidden="true">
  <div class="fx-rate"><i style="--i:0">★</i><i style="--i:1">★</i><i style="--i:2">★</i><i style="--i:3">★</i><i style="--i:4">★</i></div>
</div>`,
      desc: '星が左から順に色づき、点く瞬間だけ少し大きくなる。レビューの表示や、入力時のフィードバックに。',
    },
    {
      id: 'pager-dots', accent: 'sky', title: 'スライダーとドット', en: 'Carousel Dots',
      tags: ['translate %', 'width 2.4 → 7cqi', '現在位置'],
      stage: `<div class="stage stage-pager" aria-hidden="true">
  <div class="fx-slides"><div class="track"><div class="ph fx-photo"></div><div class="ph fx-photo"></div><div class="ph fx-photo"></div></div></div>
  <div class="fx-pager"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i></div>
</div>`,
      desc: 'スライドの移動に合わせて、現在のドットだけ横に伸びる。伸びるドットは「今どこか」が一目で分かる。',
    },
    {
      id: 'floating-label', accent: 'mint', title: 'フローティングラベル', en: 'Floating Label',
      tags: [':focus-within', 'translate + scale', 'transform-origin'],
      stage: `<div class="stage stage-flabel" aria-hidden="true">
  <div class="fx-fl"><div class="box"><label>メールアドレス</label><div class="val">hello@example.com</div></div></div>
</div>`,
      desc: 'フォーカスするとラベルが枠線の上へ逃げて小さくなり、入力が始まる。ラベルの背景を白にして枠線を隠す。<code>:focus-within</code> と <code>.filled</code> で制御。',
    },
    {
      id: 'submit-state', accent: 'mint', title: '送信 → 読込 → 完了', en: 'Submit States',
      tags: ['3 状態', 'width で丸に', 'grid-area 重ね'],
      stage: `<div class="stage stage-submit" aria-hidden="true">
  <div class="fx-sub"><span class="t">送信する</span><span class="sp"></span><span class="ok"></span></div>
</div>`,
      desc: 'ボタンが丸く縮んでスピナーになり、緑に変わってチェックが出る。文字・スピナー・チェックを同じ場所に重ね、状態クラスで切り替える。',
    },
    {
      id: 'ring-progress', accent: 'pink', title: 'リング型プログレス', en: 'Ring Progress',
      tags: ['conic-gradient', '@property', 'counter()'],
      stage: `<div class="stage stage-ringprog" aria-hidden="true">
  <div class="fx-ring-p"></div>
</div>`,
      desc: '<code>conic-gradient</code> の境目を <code>--n</code>% で動かし、内側を白い丸で抜くとリングになる。数字は同じ <code>--n</code> を <code>counter()</code> で表示。',
    },
    {
      id: 'drawer', accent: 'lavender', title: 'サイドドロワー', en: 'Side Drawer',
      tags: ['translate -100%', 'シェード', '項目を遅延'],
      stage: `<div class="stage stage-drawer" aria-hidden="true">
  <div class="fx-dr-page"><div class="hd"><i></i></div><div class="bd"><b></b><b></b><b></b></div></div>
  <div class="fx-dr-shade"></div>
  <div class="fx-dr"><b style="--i:0">MENU</b><b style="--i:1">ホーム</b><b style="--i:2">作品</b><b style="--i:3">お問い合わせ</b></div>
</div>`,
      desc: 'スマホのメニュー。左からパネルが滑り込み、背景が暗くなり、項目が上から順に現れる。閉じる時は逆再生。',
    },
    {
      id: 'theme-switch', accent: 'lemon', title: 'ライト / ダーク切替', en: 'Theme Switch',
      tags: ['background-color', 'inset box-shadow で月', 'transition'],
      stage: `<div class="stage stage-theme" aria-hidden="true">
  <div class="fx-theme"><div class="sw"><i></i></div><div class="lbl">LIGHT / DARK</div></div>
</div>`,
      desc: 'ノブが太陽から月に変わりながら移動し、ページ全体の色も切り替わる。月は <code>box-shadow: inset</code> で欠けを作る。色は <code>transition</code> で滑らかに。',
    },
  ],
  'cat-trans': [
    {
      id: 'slide-over', accent: 'sky', title: 'ページが上に重なる', en: 'Slide Over',
      tags: ['translate 100%', '下は少し奥へ', 'brightness'],
      stage: `<div class="stage stage-slideover" aria-hidden="true">
  <div class="fx-scene a under">A</div>
  <div class="fx-scene b over">B</div>
</div>`,
      desc: 'スマホの画面遷移風。新しいページが右から重なり、下のページは少し左へ下がって暗くなる。戻る時はその逆。',
    },
    {
      id: 'zoom-trans', accent: 'lavender', title: 'ズームで切り替え', en: 'Zoom Transition',
      tags: ['scale', 'blur', 'opacity'],
      stage: `<div class="stage stage-zoomtrans" aria-hidden="true">
  <div class="fx-scene a zout">A</div>
  <div class="fx-scene b zin">B</div>
</div>`,
      desc: '古い画面が縮んでぼけながら消え、新しい画面が少し大きい状態から等倍に落ち着く。奥行きのある切り替えに。',
    },
    {
      id: 'crossfade', accent: 'pink', title: 'クロスフェード', en: 'Crossfade',
      tags: ['opacity', '--i で遅延', 'ループの重なり'],
      stage: `<div class="stage stage-xfade" aria-hidden="true">
  <div class="fx-xf"><div class="ph fx-photo" style="--i:0"></div><div class="ph fx-photo" style="--i:1"></div><div class="ph fx-photo" style="--i:2"></div></div>
</div>`,
      desc: '写真を 3 枚重ねて順にフェード。前の消える区間と次の現れる区間を重ねると、途切れない。ヒーローのスライドショーに。',
    },
    {
      id: 'tiles', accent: 'pink', title: 'タイルで覆う', en: 'Tile Wipe',
      tags: ['grid 4×3', 'scale 0 → 1', '--i = 行 + 列'],
      stage: `<div class="stage stage-tiles" aria-hidden="true">
  <div class="fx-scene a">A</div>
  <div class="fx-scene b swap">B</div>
  <div class="fx-tiles">
    <i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i>
    <i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i>
    <i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i>
  </div>
</div>`,
      desc: '12 枚のタイルが左上から斜めに広がって画面を覆い、裏で差し替えて、また斜めに消える。<code>--i</code> を「行 + 列」にすると斜めの波になる。',
    },
  ],
  'cat-bg': [
    {
      id: 'dots-bg', accent: 'pink', title: '動く水玉', en: 'Polka Dots',
      tags: ['radial-gradient 2 層', 'background-position', 'タイル 1 枚分'],
      stage: `<div class="stage stage-dotsbg" aria-hidden="true">
  <div class="fx-dotsbg"></div>
  <div class="fx-label">DOTS</div>
</div>`,
      desc: '大小 2 層の水玉を半分ずらして重ね、斜めに流す。2 層目を 1.5 倍速にすると奥行きが出る。',
    },
    {
      id: 'bokeh', accent: 'lavender', title: '光の玉が浮かぶ', en: 'Bokeh',
      tags: ['filter: blur()', '--s で大きさ', '負の delay'],
      stage: `<div class="stage stage-bokeh" aria-hidden="true">
  <i class="fx-bokeh" style="--x:8;  --s:6;  --b:0;  --d:0"></i>
  <i class="fx-bokeh" style="--x:20; --s:10; --b:.8; --d:2.5"></i>
  <i class="fx-bokeh" style="--x:36; --s:4;  --b:.2; --d:5"></i>
  <i class="fx-bokeh" style="--x:50; --s:12; --b:1.2; --d:1.2"></i>
  <i class="fx-bokeh" style="--x:62; --s:5;  --b:0;  --d:6.3"></i>
  <i class="fx-bokeh" style="--x:76; --s:8;  --b:.6; --d:3.8"></i>
  <i class="fx-bokeh" style="--x:90; --s:6;  --b:.3; --d:7"></i>
</div>`,
      desc: 'ふわっとした光の玉がゆっくり上る。大きい玉ほどぼかしを強くすると、ピントが外れた奥の光に見える。ヒーローの上に薄く重ねて。',
    },
    {
      id: 'wave-divider', accent: 'pink', title: '波のセクション区切り', en: 'Wave Divider',
      tags: ['radial-gradient 半円', 'repeat-x', '1 周期分動かす'],
      stage: `<div class="stage stage-wavediv" aria-hidden="true">
  <div class="fx-wd-top"></div>
  <div class="fx-wd"></div>
  <div class="fx-wd-text">SECTION</div>
</div>`,
      desc: 'セクションの境目を波にする。下向きの半円と、半周期ずらした上向きの半円を重ねると波形になり、横に流せば動く。',
    },
  ],
  'cat-fx': [
    {
      id: 'confetti-burst', accent: 'lemon', title: '紙吹雪バースト', en: 'Confetti Burst',
      tags: ['rotate で方向', '--r で距離', 'translate'],
      stage: `<div class="stage stage-cburst" aria-hidden="true">
  <div class="fx-cb">
    <i style="--i:0; --r:26; --c:#ff8fb8"></i><i style="--i:1; --r:20; --c:#ffd45e"></i><i style="--i:2; --r:30; --c:#8fd0ff"></i>
    <i style="--i:3; --r:22; --c:#9fe3cd"></i><i style="--i:4; --r:28; --c:#c9b8ff"></i><i style="--i:5; --r:18; --c:#ff8fb8"></i>
    <i style="--i:6; --r:26; --c:#ffd45e"></i><i style="--i:7; --r:21; --c:#8fd0ff"></i><i style="--i:8; --r:30; --c:#9fe3cd"></i>
    <i style="--i:9; --r:24; --c:#c9b8ff"></i><i style="--i:10; --r:19; --c:#ff8fb8"></i><i style="--i:11; --r:27; --c:#ffd45e"></i>
  </div>
  <div class="fx-cb-btn">Thanks!</div>
</div>`,
      desc: 'ボタンを押した瞬間に紙片が放射状に飛ぶ。各片の向きは <code>rotate: calc(var(--i) * 30deg)</code>、距離は <code>--r</code>。「いいね」や完了のご褒美に。',
    },
    {
      id: 'stamp', accent: 'pink', title: 'スタンプがドン', en: 'Stamp',
      tags: ['scale 3 → 1', 'mask でかすれ', 'カメラシェイク'],
      stage: `<div class="stage stage-stamp" aria-hidden="true">
  <div class="fx-cam"><div class="fx-stamp">合格</div></div>
</div>`,
      desc: '大きく薄い状態から一気に縮んで押印、画面が少し揺れる。<code>mask</code> の放射グラデーションでインクのかすれを作る。合格・完売・承認の表示に。',
    },
    {
      id: 'neon', accent: 'lavender', tone: 'cool', title: 'ネオンサイン', en: 'Neon Sign',
      tags: ['text-shadow 4 段', 'ちらつき', 'steps 風'],
      stage: `<div class="stage stage-neon cool" aria-hidden="true">
  <div class="fx-neon">OPEN</div>
</div>`,
      desc: '白い文字に、色付きの <code>text-shadow</code> を 4 段重ねて発光させる。キーフレームの 1% だけ消すと、ネオン管のちらつきになる。',
    },
  ],
};
