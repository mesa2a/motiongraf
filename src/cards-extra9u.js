// 追加分その 9u：スクロール 5 本、UI 7 本（300 本へ向けて）
const stLines = ['読み進めると、', '文字が左から', '色づいていく。'].map((t, i) => `<b style="--i:${i}">${t}</b>`).join('');
const blocks = (n, cols) => Array.from({ length: n }, (_, i) => `<i style="--c:${cols[i % cols.length]}"></i>`).join('');
const tabs = ['ホーム', '検索', 'お気に入り', '設定'].map((t, i) => `<div class="t" style="--i:${i}"><i></i><span>${t}</span></div>`).join('');

module.exports = {
  'cat-enter': [
    {
      id: 'scroll-text-fill', accent: 'pink', title: '読んだところまで文字が色づく', en: 'Scroll Text Fill',
      tags: ['background-clip: text', 'background-position 100% → 0', '行ごとに range をずらす'],
      stage: `<div class="stage stage-stfill" aria-hidden="true">\n  <div class="fx-stfill">${stLines}<div class="bar"><i></i></div></div>\n</div>`,
      desc: 'スクロールに合わせて、文章が左から順に濃い色に塗られていく。薄い色と濃い色の 2 色グラデーションを文字で切り抜き、位置を動かすだけ。',
    },
    {
      id: 'scroll-zoom-settle', accent: 'blue', title: '画面いっぱいの画像が縮んで収まる', en: 'Zoom Settle',
      tags: ['inset を補間', 'border-radius も一緒に', '本文は下から'],
      stage: `<div class="stage stage-zsettle" aria-hidden="true">\n  <div class="fx-zsettle"><div class="img fx-photo"></div><div class="body"><b></b><b></b><b></b></div></div>\n</div>`,
      desc: 'ファーストビューいっぱいの写真が、スクロールすると縮んで角丸のカードに収まり、本文が下から現れる。画像の inset と角丸を同時に補間する。',
    },
    {
      id: 'stacking-cards', accent: 'lavender', title: 'カードが重なって積まれる', en: 'Stacking Cards',
      tags: ['position: sticky を段違いに', '下のカードは少し縮める', '3cqi ずつずらす'],
      stage: `<div class="stage stage-stackc" aria-hidden="true">\n  <div class="fx-stackc"><div class="c c1" style="--c:#ff8fb8"><b></b><b></b><b></b></div><div class="c c2" style="--c:#8fd0ff"><b></b><b></b><b></b></div><div class="c c3" style="--c:#6fd3b3"><b></b><b></b><b></b></div></div>\n</div>`,
      desc: 'スクロールすると次のカードが下から上がってきて前のカードの上に重なり、少しずつずれて積まれる。各カードを段違いの sticky にするだけで JS は不要。',
    },
    {
      id: 'scroll-skew', accent: 'mint', title: 'スクロールの速さで傾く', en: 'Velocity Skew',
      tags: ['速度を skewY に', '止まると 0 へ', 'clamp で上限'],
      stage: `<div class="stage stage-sskew" aria-hidden="true">\n  <div class="fx-sskew"><div class="ls">${blocks(8, ['#e8e0ff', '#ffd3e3', '#d7eeff', '#d9f5ea'])}</div></div>\n</div>`,
      desc: '速くスクロールするとリストが進行方向に傾き、止まると戻る。速度（スクロール量の差分）を skewY に渡すだけで、慣性のある手触りになる。',
    },
    {
      id: 'footer-reveal', accent: 'pink', title: '本文の下からフッターが現れる', en: 'Footer Reveal',
      tags: ['フッターを fixed で下に', '本文に margin-bottom', 'シートが持ち上がる'],
      stage: `<div class="stage stage-frev" aria-hidden="true">\n  <div class="fx-frev"><div class="foot"><b></b><b></b><b></b></div><div class="sheet"><b></b><b></b><b></b><b></b></div></div>\n</div>`,
      desc: 'ページの最後で本文のシートが持ち上がり、下に隠れていたフッターが現れる。フッターを固定して本文の下に余白を取るだけで、スクロールが自然に演出になる。',
    },
  ],
  'cat-ui': [
    {
      id: 'char-counter', accent: 'pink', title: '文字数カウンターと上限の警告', en: 'Character Counter',
      tags: ['counter() で数字', '上限で赤くなって揺れる', 'steps() の入力'],
      stage: `<div class="stage stage-ccount" aria-hidden="true">\n  <div class="fx-ccount"><div class="ta"><span>今日は天気がよかったので、公園まで散歩に出かけました。桜がきれい</span><div class="cnt"></div></div></div>\n</div>`,
      desc: '入力に合わせて文字数が増え、上限を超えた瞬間に赤くなって揺れる。数字は変数と <code>counter()</code> で出し、超えたときだけ短い揺れを入れる。',
    },
    {
      id: 'chat-send', accent: 'blue', title: '送信した吹き出しが飛んでいく', en: 'Chat Send',
      tags: ['入力欄から複製を飛ばす', '着いたら本物を追加', 'transform-origin: 右下'],
      stage: `<div class="stage stage-csend" aria-hidden="true">\n  <div class="fx-csend"><div class="log"><div class="m">今から向かうね</div><div class="m new">10 分くらいで着く！</div></div><div class="in"><span>10 分くらいで着く！</span><div class="btn">↑</div></div><div class="fly">10 分くらいで着く！</div></div>\n</div>`,
      desc: '送信ボタンを押すと入力欄の文字が吹き出しになって上へ飛び、リストの末尾に着地する。複製を飛ばして着いた瞬間に本物を追加すると自然。',
    },
    {
      id: 'status-ping', accent: 'mint', title: 'オンライン状態の点', en: 'Status Ping',
      tags: ['輪が脈打つ', '退席で灰色に', 'ステータス文を差し替え'],
      stage: `<div class="stage stage-ping" aria-hidden="true">\n  <div class="fx-ping"><div class="av"><i></i></div><div class="tx"><b>Mio Sakura</b><span><em>オンライン</em><em>退席中</em></span></div></div>\n</div>`,
      desc: 'アバターの緑の点が静かに脈打ち、退席になると灰色に変わって脈が止まる。輪は疑似要素の scale と opacity だけ。',
    },
    {
      id: 'todo-add', accent: 'lavender', title: 'TODO の追加と完了', en: 'Todo Add & Done',
      tags: ['追加は 0fr → 1fr', '完了はチェック → 取り消し線', '最後に薄く'],
      stage: `<div class="stage stage-todol" aria-hidden="true">\n  <div class="fx-todol"><div class="it done"><div><div class="row"><i></i><span>牛乳を買う</span></div></div></div><div class="it"><div><div class="row"><i></i><span>原稿を送る</span></div></div></div><div class="it new"><div><div class="row"><i></i><span>散歩に行く</span></div></div></div></div>\n</div>`,
      desc: '新しい項目が高さ 0 からにゅっと増え、完了した項目はチェックが付いて取り消し線が伸び、薄くなる。リスト操作の基本 3 つをまとめた形。',
    },
    {
      id: 'cookie-banner', accent: 'pink', title: 'Cookie バナー', en: 'Cookie Banner',
      tags: ['下から translate', '同意で下へ戻す', 'localStorage に保存'],
      stage: `<div class="stage stage-cookie" aria-hidden="true">\n  <div class="fx-cookie"><div class="pg"><b></b><b></b><b></b><b></b></div><div class="bn"><span>より良い体験のために Cookie を使用します。</span><div class="ok">同意する</div></div></div>\n</div>`,
      desc: 'ページ下から同意バナーが少し弾んで現れ、「同意する」で下へ戻って消える。出入りは translate だけにして、本文を押し上げないようにする。',
    },
    {
      id: 'fullscreen-menu', accent: 'pink', title: '全画面メニューが丸く広がる', en: 'Fullscreen Menu',
      tags: ['clip-path: circle() をボタンの位置から', '項目は --i で順に', 'ハンバーガーは × に'],
      stage: `<div class="stage stage-fsmenu" aria-hidden="true">\n  <div class="fx-fsmenu"><div class="pg"><b></b><b></b><b></b><b></b></div><div class="ov"><span style="--i:0">HOME</span><span style="--i:1">WORKS</span><span style="--i:2">ABOUT</span><span style="--i:3">CONTACT</span></div><div class="hb"><i></i><i></i><i></i></div></div>\n</div>`,
      desc: 'ハンバーガーを押すと、その位置から円が広がって全画面のメニューになり、項目が順に浮かぶ。閉じるときは円が縮んで戻る。',
    },
    {
      id: 'tab-bar', accent: 'blue', title: 'モバイルの下タブバー', en: 'Bottom Tab Bar',
      tags: ['背景の pill が滑る', '選択アイコンは持ち上がる', 'ラベルは選択時だけ'],
      stage: `<div class="stage stage-tabbar" aria-hidden="true">\n  <div class="fx-tabbar"><div class="pill"></div>${tabs}</div>\n</div>`,
      desc: 'スマホ下部のタブバー。選択の背景が横に滑り、選ばれたアイコンが少し持ち上がってラベルが出る。アイコンと背景を分けて動かすと軽く見える。',
    },
  ],
};
