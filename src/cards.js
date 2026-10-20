// カタログの定義。順番どおりに並び、通し番号は CSS カウンターで自動採番される。
// 既存カードは cards.extracted.json から取り込み、必要なところだけ上書きする。
const X = require('./cards.extracted.json');
const k = (id, over = {}) => {
  if (!X[id]) throw new Error('extracted card not found: ' + id);
  return { ...X[id], ...over };
};

module.exports = [
  {
    id: 'cat-hero', letter: 'A', en: 'Hero', title: 'ヒーロー・見出し', accent: 'pink',
    lead: 'ファーストビューと見出しの登場。最初の 1 秒で「動くサイトだ」と伝える。',
    cards: [
      {
        id: 'text-reveal', accent: 'sky', title: 'マスクで現れる見出し', en: 'Text Reveal',
        tags: ['overflow: hidden', 'translate', '行ごとに遅延'],
        stage: `<div class="stage stage-reveal" aria-hidden="true">
  <h2 class="fx-reveal"><span><i>ふわっと、</i></span><span><i>はじまる。</i></span><span><i>CSS MOTION</i></span></h2>
</div>`,
        desc: 'ヒーロー見出しの定番。各行を <code>overflow: hidden</code> の窓で包み、中の文字を下から上へ。窓があるので文字が「浮き出る」ように見える。行ごとに 0.12 秒ずつ遅らせる。',
      },
      {
        id: 'heading-underline', accent: 'lavender', title: '見出しと下線の登場', en: 'Section Heading',
        tags: ['3 段の遅延', 'scaleX', 'transform-origin'],
        stage: `<div class="stage stage-hul" aria-hidden="true">
  <div class="fx-hul"><small>SERVICE</small><strong>できること</strong><i></i></div>
</div>`,
        desc: '英字ラベル → 見出し → 下線の順に 0.15 秒ずつ遅らせて出す。下線は <code>scaleX</code> を左起点で伸ばす。セクション見出しにそのまま使える構成。',
      },
      k('typewriter', { accent: 'lemon' }),
      k('kinetic'),
      k('gradient-text', { accent: 'pink' }),
      k('marker', { accent: 'lemon' }),
      k('countup', { accent: 'lavender' }),
      k('wave-text', { accent: 'mint', title: 'ゆらゆら文字', desc: '上下の往復を文字ごとに位相ずらし。<code>animation-delay</code> を負にすると最初から波の形で始まる。ローディング中のテキストや、ロゴのアクセントに。' }),
      k('zoom-blur'),
      k('subtitle', { title: 'シネマ風タイトル', en: 'Cinematic Title' }),
    ],
  },
  {
    id: 'cat-buttons', letter: 'B', en: 'Button', title: 'ボタン・リンク', accent: 'blue',
    lead: 'ホバーの気持ちよさ。実装は <code>:hover</code> と <code>transition</code> だけで、デモの自動再生は不要。',
    cards: [
      {
        id: 'btn-fill', accent: 'pink', title: '背景がスライドするボタン', en: 'Fill Slide',
        tags: [':hover', '::before', 'translate'],
        stage: `<div class="stage stage-btnfill" aria-hidden="true">
  <a class="fx-btn fill">お問い合わせ</a>
</div>`,
        desc: '<code>::before</code> で作った色の板を左から滑り込ませ、同時に文字色を白に。板は <code>-101%</code> から始めると 1px の隙間が出ない。抜ける時は右へ通り抜ける。',
      },
      {
        id: 'btn-shine', accent: 'lavender', title: '光が走るボタン', en: 'Shine Sweep',
        tags: ['::after', 'rotate', 'translate %'],
        stage: `<div class="stage stage-btnshine" aria-hidden="true">
  <a class="fx-btn shine">ダウンロード</a>
</div>`,
        desc: '細い白のグラデーションを 20° 傾けて、左から右へ一瞬通す。ボタン本体は <code>overflow: hidden</code>。CTA ボタンに「触ってほしい感」を足す定番。',
      },
      {
        id: 'btn-arrow', accent: 'mint', title: '矢印が前に出るボタン', en: 'Arrow Nudge',
        tags: [':hover b', 'translate', '色の変化'],
        stage: `<div class="stage stage-btnarrow" aria-hidden="true">
  <a class="fx-btn arrow">もっと見る <b>→</b></a>
</div>`,
        desc: '矢印だけを 1〜2cqi 前へ出す。「この先に進める」というメッセージになる。背景色の変化を同時に入れると反応が分かりやすい。',
      },
      {
        id: 'btn-gradient-border', accent: 'lemon', title: '回るグラデーション枠', en: 'Gradient Border',
        tags: ['@property', 'conic-gradient', 'padding-box / border-box'],
        stage: `<div class="stage stage-btngb" aria-hidden="true">
  <a class="fx-btn gb">PREMIUM</a>
</div>`,
        desc: '背景を 2 枚重ねる。内側は白（<code>padding-box</code>）、外側は <code>conic-gradient</code>（<code>border-box</code>）で枠だけグラデにする。角度を <code>@property</code> で登録すると回せる。',
      },
      {
        id: 'link-underline', accent: 'pink', title: '伸びる下線リンク', en: 'Underline Grow',
        tags: ['scaleX', 'transform-origin 切替', ':hover'],
        stage: `<div class="stage stage-links" aria-hidden="true">
  <nav class="fx-links"><a>Home</a><a>Works</a><a>About</a></nav>
</div>`,
        desc: '入る時は左から伸び、抜ける時は右へ縮む。<code>:hover</code> で <code>transform-origin</code> を左に、通常時は右にしておくだけで往復が変わる。',
      },
      {
        id: 'nav-indicator', accent: 'lavender', title: '動くナビの選択枠', en: 'Nav Indicator',
        tags: ['translate %', '行き過ぎ', 'タブ切替'],
        stage: `<div class="stage stage-navind" aria-hidden="true">
  <div class="fx-nav"><i></i><span style="--i:0">Home</span><span style="--i:1">Menu</span><span style="--i:2">Shop</span><span style="--i:3">News</span></div>
</div>`,
        desc: '選択枠を 1 枚だけ置いて、選ばれた項目の位置へ <code>translate</code> で滑らせる。項目幅が等しければ <code>calc(index * 100%)</code> で済む。タブ UI にも。',
      },
      k('heart', { accent: 'pink' }),
      k('badge', { accent: 'sky' }),
    ],
  },
  {
    id: 'cat-cards', letter: 'C', en: 'Card & Image', title: 'カード・画像', accent: 'mint',
    lead: 'ギャラリーや記事一覧のホバー。写真は <code>overflow: hidden</code> の箱の中で動かす。',
    cards: [
      {
        id: 'card-lift', accent: 'sky', title: '浮き上がるカード', en: 'Card Lift',
        tags: ['translate', 'box-shadow', ':hover'],
        stage: `<div class="stage stage-cardlift" aria-hidden="true">
  <div class="fx-cards">
    <div class="fx-card-ui"><div class="ph fx-photo"></div><div class="tx"><b></b><b></b></div></div>
    <div class="fx-card-ui"><div class="ph fx-photo"></div><div class="tx"><b></b><b></b></div></div>
    <div class="fx-card-ui"><div class="ph fx-photo"></div><div class="tx"><b></b><b></b></div></div>
  </div>
</div>`,
        desc: '少し浮いて、影が伸びる。2〜3cqi の移動と影の広がりを同時に。影は <code>box-shadow</code> を直接動かすと重いので、本番では <code>::after</code> の影を <code>opacity</code> で出す方法も。',
      },
      {
        id: 'img-zoom', accent: 'pink', title: '写真ズームとキャプション', en: 'Image Zoom',
        tags: ['scale', 'overflow: hidden', 'キャプション'],
        stage: `<div class="stage stage-imgzoom" aria-hidden="true">
  <div class="fx-zoomcard"><div class="ph fx-photo"></div><div class="cap">春のおでかけ特集</div></div>
</div>`,
        desc: '箱は固定で、中の写真だけ 1.08 倍に。同時にキャプションが下から出る。ズームは 0.6 秒とゆっくりめにすると上品。',
      },
      {
        id: 'img-reveal', accent: 'lavender', title: '板が通り過ぎて写真が出る', en: 'Image Reveal',
        tags: ['clip-path: inset()', '板で隠す', 'cubic-bezier'],
        stage: `<div class="stage stage-imgreveal" aria-hidden="true">
  <div class="fx-rv"><div class="ph fx-photo"></div><div class="block"></div></div>
</div>`,
        desc: '色の板が左から右へ通り過ぎ、板に完全に隠れた瞬間に写真を表示する。スクロールで画像を見せる時の定番。板の色をサイトのアクセントに。',
      },
      {
        id: 'tilt', accent: 'sky', title: '3D チルト', en: 'Tilt Card',
        tags: ['perspective', 'rotateX / rotateY', 'translateZ'],
        stage: `<div class="stage stage-tilt" aria-hidden="true">
  <div class="fx-persp"><div class="fx-tilt"><div class="ph fx-photo"></div><div class="glare"></div><div class="tx">TILT</div></div></div>
</div>`,
        desc: 'マウスの位置に合わせてカードを傾ける演出の CSS 側。文字を <code>translateZ</code> で手前に浮かせ、光のハイライトを逆方向に動かすと立体感が増す。本番では角度を JS で入れる。',
      },
      k('flip-card', { accent: 'peach' }),
    ],
  },
  {
    id: 'cat-enter', letter: 'D', en: 'Scroll', title: '登場・スクロール', accent: 'lavender',
    lead: '出てきて、しばらく居て、去る。スクロール連動は <code>animation-timeline</code> で JS 不要。',
    cards: [
      k('fade-up', { accent: 'sky' }),
      k('pop-in', { accent: 'peach' }),
      k('slide-in', { accent: 'mint' }),
      k('spin-in', { accent: 'pink' }),
      {
        id: 'scroll-reveal', accent: 'lavender', title: 'スクロールで現れる', en: 'Scroll Reveal',
        tags: ['animation-timeline: view()', 'animation-range', 'JS 不要'],
        stage: `<div class="stage stage-scrollreveal" aria-hidden="true">
  <div class="fx-phone"><div class="fx-page">
    <div class="it" style="--i:0"></div><div class="it" style="--i:1"></div><div class="it" style="--i:2"></div>
    <div class="it" style="--i:3"></div><div class="it" style="--i:4"></div><div class="it" style="--i:5"></div>
  </div></div>
</div>`,
        desc: '画面に入った要素をふわっと出す。<code>animation-timeline: view()</code> を使うと、要素が見え始めてからの進み具合がそのままアニメーションの進み具合になる。このページのカード自体にも適用しています（対応ブラウザのみ）。',
      },
      {
        id: 'scroll-progress', accent: 'mint', title: '読了プログレスバー', en: 'Scroll Progress',
        tags: ['animation-timeline: scroll()', 'scaleX', 'position: fixed'],
        stage: `<div class="stage stage-scrollprog" aria-hidden="true">
  <div class="fx-prog"></div>
  <div class="fx-doc"><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div>
</div>`,
        desc: 'ページ上部の細いバーが、スクロール量に合わせて伸びる。<code>animation-timeline: scroll(root)</code> で、ページ全体のスクロールをタイムラインにする。このページの上端にも付けてあります。',
      },
      k('clouds', { accent: 'sky', title: 'パララックス（雲）', en: 'Parallax Layers' }),
      {
        id: 'scroll-hint', accent: 'pink', title: 'スクロールの誘導', en: 'Scroll Hint',
        tags: ['ease-in-out', 'opacity', 'ヒーロー下部'],
        stage: `<div class="stage stage-scrollhint" aria-hidden="true">
  <div class="fx-mouse"><i></i><span>SCROLL</span></div>
</div>`,
        desc: 'ヒーローの下に置く「下に続きます」の合図。マウスのホイールが下へ流れて消える動きと、矢印の上下を同じ周期で。1.6 秒くらいが落ち着く。',
      },
    ],
  },
  {
    id: 'cat-ui', letter: 'E', en: 'UI Parts', title: 'ナビ・UI 部品', accent: 'peach',
    lead: '開閉、通知、フォーム。状態の切り替えは <code>.open</code> などのクラスで。',
    cards: [
      {
        id: 'hamburger', accent: 'pink', title: 'ハンバーガー → ×', en: 'Hamburger',
        tags: ['rotate', 'translate', '3 本の線'],
        stage: `<div class="stage stage-burger" aria-hidden="true">
  <div class="fx-burger"><i></i><i></i><i></i></div>
</div>`,
        desc: '上下の線を中央へ寄せて ±45° 回し、真ん中の線を消す。<code>.open</code> を付け外しするだけで往復する。少し行き過ぎるカーブにすると「カチッ」と決まる。',
      },
      {
        id: 'accordion', accent: 'sky', title: 'アコーディオン', en: 'Accordion',
        tags: ['grid-template-rows: 0fr → 1fr', 'min-height: 0', 'FAQ'],
        stage: `<div class="stage stage-acc" aria-hidden="true">
  <div class="fx-acc">
    <div class="q">送料はかかりますか？<i></i></div>
    <div class="a"><div><p>5,000 円以上のご注文で送料無料です。それ未満は全国一律 500 円です。</p></div></div>
  </div>
</div>`,
        desc: '高さ <code>auto</code> は補間できないが、<code>grid-template-rows</code> の <code>0fr → 1fr</code> なら補間できる。中身の要素に <code>min-height: 0; overflow: hidden</code> が必要。',
      },
      {
        id: 'dropdown', accent: 'lavender', title: 'ドロップダウン', en: 'Dropdown',
        tags: ['transform-origin: top', 'scale + opacity', '項目を遅延'],
        stage: `<div class="stage stage-dropdown" aria-hidden="true">
  <div class="fx-dd"><div class="tg">Menu ▾</div><div class="menu"><b style="--i:0">プロフィール</b><b style="--i:1">設定</b><b style="--i:2">ログアウト</b></div></div>
</div>`,
        desc: 'ボタンの下から少し縮んだ状態で出て、項目が上から順に 0.06 秒ずつ遅れて現れる。<code>transform-origin</code> を左上にすると「そこから生えた」感じに。',
      },
      {
        id: 'modal', accent: 'pink', title: 'モーダル', en: 'Modal / Dialog',
        tags: ['backdrop', 'scale .92 → 1', '@starting-style'],
        stage: `<div class="stage stage-modal" aria-hidden="true">
  <div class="fx-backdrop"></div>
  <div class="fx-modal"><strong>メールを送信しました</strong><p>確認メールをご確認ください。</p><b>OK</b></div>
</div>`,
        desc: '背景を暗くしながら、本体は少し小さい位置から拡大して出す。<code>&lt;dialog&gt;</code> なら <code>@starting-style</code> と <code>transition</code> だけで「開く時」のアニメーションが書ける（コード参照）。',
      },
      {
        id: 'toast', accent: 'mint', title: 'トースト通知', en: 'Toast',
        tags: ['translate 120%', '残り時間バー', '自動で消える'],
        stage: `<div class="stage stage-toast" aria-hidden="true">
  <div class="fx-toast"><i>✓</i>保存しました</div>
</div>`,
        desc: '右下から滑り込み、残り時間のバーが縮んで、また右へ去る。入る時だけ少し行き過ぎると気持ちいい。バーは <code>::after</code> の <code>scaleX</code>。',
      },
      {
        id: 'tooltip', accent: 'lavender', title: 'ツールチップ', en: 'Tooltip',
        tags: ['transform-origin: bottom', 'border でしっぽ', ':hover'],
        stage: `<div class="stage stage-tooltip" aria-hidden="true">
  <div class="fx-tipwrap"><div class="tg">?</div><div class="fx-tip">ヘルプを表示します</div></div>
</div>`,
        desc: 'しっぽの根元を支点に、少し縮んだ状態から出す。しっぽは <code>border</code> 4 辺のうち上だけ色を付けた三角。<code>:hover</code> と <code>transition</code> だけで動く。',
      },
      {
        id: 'checkbox', accent: 'pink', title: 'チェックボックスと取り消し線', en: 'Checkbox',
        tags: ['scale 0 → 1', '行き過ぎ', '::after で線'],
        stage: `<div class="stage stage-check" aria-hidden="true">
  <div class="fx-todo">
    <label style="--i:0"><span class="box"><i></i></span>牛乳を買う</label>
    <label style="--i:1"><span class="box"><i></i></span>原稿を送る</label>
    <label style="--i:2"><span class="box"><i></i></span>お風呂に入る</label>
  </div>
</div>`,
        desc: 'チェックマークは L 字の枠線を 45° 回したもの。0 から行き過ぎて 1 に戻ると「ぽんっ」と入る。取り消し線は <code>::after</code> を左から伸ばす。',
      },
      {
        id: 'form-shake', accent: 'lavender', title: '入力エラーの揺れ', en: 'Form Error',
        tags: ['translate 左右', 'border-color', 'エラー文の表示'],
        stage: `<div class="stage stage-form" aria-hidden="true">
  <div class="fx-field"><div class="in">メールアドレス</div><div class="err">メールアドレスの形式が正しくありません</div></div>
</div>`,
        desc: '左右に 2 往復して止まる 0.4 秒の揺れ。枠線を赤くして、エラー文を上から少し降ろす。<code>.invalid</code> を付けた時に 1 回だけ再生する。',
      },
      k('toggle', { accent: 'mint' }),
      k('dots-loader', { accent: 'peach' }),
      k('ring-loader', { accent: 'lavender' }),
      k('shimmer', { accent: 'lemon' }),
      k('progress', { accent: 'mint' }),
    ],
  },
  {
    id: 'cat-trans', letter: 'F', en: 'Transition', title: '画面転換', accent: 'pink',
    lead: 'ページ遷移やスライドの切り替え。覆い隠している瞬間に中身を差し替えるのが共通のコツ。',
    cards: [
      k('wipe', { accent: 'sky' }),
      k('eyecatch', {
        accent: 'lavender', title: '丸ワイプ（アイリス）', en: 'Iris Wipe',
        tags: ['clip-path: circle()', '止め', 'nth-child'],
        stage: `<div class="stage stage-eyecatch" aria-hidden="true">
  <div class="fx-ec-bg"></div>
  <div class="fx-ec-logo"><small>LOADING</small><strong>NEXT</strong></div>
  <div class="fx-ec-dots"><i></i><i></i><i></i></div>
</div>`,
        desc: '<code>clip-path: circle()</code> を 0% から 75% まで広げるだけで丸ワイプ。ローディング画面やページ遷移のオーバーレイに。ロゴは少し行き過ぎて止まり、点が 1 個ずつ灯る。',
      }),
      k('halftone', { accent: 'pink' }),
      k('blinds', { accent: 'lemon' }),
      k('curtain', { accent: 'pink' }),
      k('slices', { accent: 'peach' }),
      k('cutin'),
    ],
  },
  {
    id: 'cat-bg', letter: 'G', en: 'Background', title: '背景', accent: 'yellow',
    lead: '主役の後ろでずっと動いているもの。要素を増やさず background で描くのがコツ。',
    cards: [
      {
        id: 'aurora', accent: 'lavender', title: 'オーロラ（ぼかした光）', en: 'Aurora',
        tags: ['filter: blur()', '親でまとめてぼかす', 'alternate'],
        stage: `<div class="stage stage-aurora" aria-hidden="true">
  <div class="fx-aurora"><i></i><i></i><i></i><i></i></div>
  <div class="fx-label">AURORA</div>
</div>`,
        desc: 'ヒーロー背景の定番。大きな丸を 4 つ置き、親要素ごと <code>filter: blur()</code> でぼかして、それぞれ別の位相でゆっくり動かす。ぼかしは重いので丸の数は少なめに。',
      },
      k('gradient-flow', { accent: 'pink' }),
      {
        id: 'blob', accent: 'pink', title: '流れるブロブ', en: 'Morphing Blob',
        tags: ['border-radius 8 値', 'rotate', '流体'],
        stage: `<div class="stage stage-blob" aria-hidden="true">
  <div class="fx-blob"></div>
  <div class="fx-label">BLOB</div>
</div>`,
        desc: '<code>border-radius</code> の 8 つの値をキーフレームで変えるだけで、形がぬるぬる変わる。ゆっくり回転させると変化が複雑に見える。写真のマスクにも。',
      },
      {
        id: 'grid-move', accent: 'sky', title: '流れるグリッド', en: 'Moving Grid',
        tags: ['linear-gradient 2 層', 'background-position', 'mask で減衰'],
        stage: `<div class="stage stage-gridbg" aria-hidden="true">
  <div class="fx-gridbg"></div>
  <div class="fx-label">GRID</div>
</div>`,
        desc: '縦線と横線のグラデーションを重ねて方眼にし、<code>background-position</code> をタイル 1 枚分だけ斜めに動かす。<code>mask</code> で端を薄くすると背景になじむ。',
      },
      k('stripes', { accent: 'peach' }),
      {
        id: 'marquee', accent: 'lemon', title: 'マーキー（流れるタグ）', en: 'Marquee',
        tags: ['2 セット並べる', 'translate -50%', 'mask で両端'],
        stage: `<div class="stage stage-marquee" aria-hidden="true">
  <div class="fx-marquee"><div class="track">
    <b>#CSS</b><b>#Motion</b><b>#Pastel</b><b>#Design</b><b>#Kirara</b>
    <b>#CSS</b><b>#Motion</b><b>#Pastel</b><b>#Design</b><b>#Kirara</b>
  </div></div>
</div>`,
        desc: '同じ内容を 2 セット並べ、ちょうど 1 セット分（<code>-50%</code>）動かして戻すと継ぎ目なく流れる。<code>padding-right</code> を <code>gap</code> と同じにするのがポイント。',
      },
      k('twinkle', { accent: 'lavender' }),
      k('waves', {
        accent: 'sky',
        stage: `<div class="stage stage-waves" aria-hidden="true">
  <div class="fx-water w1"></div>
  <div class="fx-water w2"></div>
</div>`,
        desc: '巨大な角丸四角（<code>border-radius: 42%</code>）をゆっくり回すと、上の縁が波打って見える定番。2 枚を逆回転で重ねると複雑に。セクションの区切りや足元に。',
      }),
      k('bubbles', { accent: 'sky' }),
    ],
  },
  {
    id: 'cat-fx', letter: 'H', en: 'Effect & 3D', title: 'エフェクト・3D', accent: 'orange',
    lead: 'キャンペーンやゲーム系サイト向け。かっこいい方は暗いステージで振り切ります。',
    cards: [
      k('focus-lines'),
      k('slash'),
      k('shockwave'),
      k('hit'),
      k('henshin'),
      k('glitch'),
      k('sparkle', {
        accent: 'lemon',
        stage: `<div class="stage stage-sparkle" aria-hidden="true">
  <div class="fx-label">✦ NEW ✦</div>
  <i class="fx-spark" style="--x:18; --y:14; --d:0"></i>
  <i class="fx-spark" style="--x:80; --y:12; --d:.6"></i>
  <i class="fx-spark" style="--x:72; --y:44; --d:1.1"></i>
  <i class="fx-spark" style="--x:14; --y:42; --d:.3"></i>
  <i class="fx-spark" style="--x:50; --y:8;  --d:1.4"></i>
  <i class="fx-spark" style="--x:86; --y:30; --d:.9"></i>
</div>`,
      }),
      k('confetti', { accent: 'pink' }),
      k('snow', {
        accent: 'sky',
        stage: `<div class="stage stage-snow" aria-hidden="true">
  <div class="fx-snow"></div>
  <div class="fx-snowhill"></div>
</div>`,
      }),
      k('petals', {
        accent: 'pink', title: '舞う花びら（パーティクル）', en: 'Particles',
        stage: `<div class="stage stage-petals" aria-hidden="true">
  <div class="fx-petal" style="--x: 8;  --d: 0;   --s: 1"><i></i></div>
  <div class="fx-petal" style="--x: 24; --d: 2.1; --s: .8"><i></i></div>
  <div class="fx-petal" style="--x: 38; --d: 4.3; --s: 1.1"><i></i></div>
  <div class="fx-petal" style="--x: 55; --d: 1.2; --s: .9"><i></i></div>
  <div class="fx-petal" style="--x: 70; --d: 3.4; --s: 1"><i></i></div>
  <div class="fx-petal" style="--x: 84; --d: 5.2; --s: .7"><i></i></div>
  <div class="fx-petal" style="--x: 94; --d: 2.8; --s: 1.2"><i></i></div>
</div>`,
      }),
      k('cube', { accent: 'lavender' }),
      k('flap', { accent: 'pink' }),
    ],
  },
];
