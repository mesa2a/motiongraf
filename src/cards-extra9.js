// 追加分その 9：ボタン 4 本、UI 部品 4 本
const letters = (w) => w.split('').map((l, i) => `<b style="--i:${i}"><span data-l="${l}">${l}</span></b>`).join('');
const stars = Array.from({ length: 8 }, (_, i) => `<i style="--i:${i}"></i>`).join('');

module.exports = {
  'cat-buttons': [
    {
      id: 'btn-download', accent: 'blue', title: 'ダウンロード進行ボタン', en: 'Download Progress',
      tags: ['塗りと counter() の同期', '矢印 → チェック', '完了で緑'],
      stage: `<div class="stage stage-dl" aria-hidden="true">\n  <div class="fx-dl"><i class="fill"></i><span class="icn"><i class="ar"></i><i class="ok"></i></span><span class="txt"><b class="lb">ダウンロード</b><b class="pct"></b></span></div>\n</div>`,
      desc: '押すとボタンの中を左から塗りが進み、文字が％に変わる。100% で矢印がチェックに、ボタンが緑になる。塗りの幅と数字は同じキーフレーム割合で動かす。',
    },
    {
      id: 'toggle-3state', accent: 'lavender', title: '3 状態トグル', en: 'Three-state Toggle',
      tags: ['オフ → 読込中 → オン', 'つまみが中央で待つ', 'スピナーはつまみの中'],
      stage: `<div class="stage stage-t3" aria-hidden="true">\n  <div class="fx-t3"><i class="knob"><b class="spin"></b><b class="ok"></b></i></div>\n</div>`,
      desc: 'サーバーの応答を待つトグル。押すとつまみが中央で止まってスピナーが回り、成功したら右端へ行って緑のチェックになる。失敗なら左へ戻すだけでよい。',
    },
    {
      id: 'btn-letter-swap', accent: 'pink', title: '文字が 1 字ずつ入れ替わるボタン', en: 'Letter Swap',
      tags: ['文字ごとに 2 段', 'translate -100%', '--i × .05s の遅延'],
      stage: `<div class="stage stage-lswap" aria-hidden="true">\n  <div class="fx-ls">${letters('EXPLORE')}</div>\n</div>`,
      desc: 'ホバーで文字が 1 字ずつ上に転がって、下から同じ文字が入ってくる。各文字を高さ 1em の枠に入れ、<code>::after</code> で同じ文字を下に置いて 2 段ごと動かす。',
    },
    {
      id: 'btn-star-burst', accent: 'yellow', title: '星が散るお気に入りボタン', en: 'Star Burst',
      tags: ['clip-path の星形', 'rotate → translateY で放射', '8 個を --i で'],
      stage: `<div class="stage stage-stars" aria-hidden="true">\n  <div class="fx-sb"><span class="st">${stars}</span>お気に入り</div>\n</div>`,
      desc: '押すと灰色の星が黄色に弾み、小さな星が 8 方向に散る。小さな星は <code>rotate()</code> してから <code>translateY()</code> する順番がポイントで、逆にすると全部同じ方向へ飛ぶ。',
    },
  ],
  'cat-ui': [
    {
      id: 'context-menu', accent: 'pink', title: 'コンテキストメニュー', en: 'Context Menu',
      tags: ['クリック位置が原点', 'transform-origin: 0 0', 'ハイライトが滑る'],
      stage: `<div class="stage stage-ctx" aria-hidden="true">\n  <div class="fx-cm-page"><b></b><b></b><b></b></div>\n  <div class="fx-cm-pt"></div>\n  <div class="fx-cm"><i></i><b>コピー</b><b>リンクを開く</b><b>名前を変更</b><b class="danger">削除</b></div>\n</div>`,
      desc: '右クリックした点から左上を原点にメニューが広がり、ホバーのハイライトが行の間を滑って、選ぶと閉じる。メニューの位置は <code>e.clientX / clientY</code> をそのまま入れる。',
    },
    {
      id: 'drop-zone', accent: 'lavender', title: 'ドロップ領域', en: 'Drop Zone',
      tags: ['dragenter で枠が反応', 'ファイルが吸い込まれる', 'ラベルの差し替え'],
      stage: `<div class="stage stage-drop" aria-hidden="true">\n  <div class="fx-dz"><div class="cloud"></div><div class="lb"><span>ここにファイルをドロップ</span><span>1 個のファイルを追加しました</span></div></div>\n  <div class="fx-dz-file"><b></b><b></b></div>\n</div>`,
      desc: 'ファイルを引きずって枠に入ると、枠がピンクに反応して少し膨らむ。離すとファイルが縮んで左下のサムネイル位置に収まり、ラベルが変わる。',
    },
    {
      id: 'tour-spotlight', accent: 'blue', title: 'ツアーガイドのスポットライト', en: 'Tour Spotlight',
      tags: ['穴 1 個を動かす', 'box-shadow 0 0 0 200cqi', 'inset を補間'],
      stage: `<div class="stage stage-tour" aria-hidden="true">\n  <div class="fx-tour-app"><div class="hd"></div><div class="srch"></div><div class="sd"><b style="top:5cqi"></b><b style="top:11cqi"></b><b style="top:17cqi"></b><div class="nb"></div></div><div class="cd" style="left:28cqi"></div><div class="cd" style="left:54cqi"></div></div>\n  <div class="fx-tour-hole"></div>\n  <div class="fx-tour-tip"><span style="--i:0" data-n="1/3">ここで検索できます</span><span style="--i:1" data-n="2/3">最近の項目はこちら</span><span style="--i:2" data-n="3/3">新規作成はこのボタン</span></div>\n</div>`,
      desc: '初回案内の演出。画面を暗くして、注目させたい要素だけ穴を開け、穴が次の要素へ滑っていく。穴は 1 つの要素の巨大な <code>box-shadow</code> で作り、位置と大きさを補間する。',
    },
    {
      id: 'sidebar-collapse', accent: 'mint', title: 'サイドバーの折りたたみ', en: 'Sidebar Collapse',
      tags: ['width 24 → 9cqi', 'ラベルは nowrap で隠す', '本文が自動で広がる'],
      stage: `<div class="stage stage-sidebar" aria-hidden="true">\n  <div class="fx-sbar"><div class="side"><div class="it on"><i></i><span>ホーム</span></div><div class="it"><i></i><span>プロジェクト</span></div><div class="it"><i></i><span>メンバー</span></div><div class="it"><i></i><span>設定</span></div><div class="tg"></div></div><div class="main"><b></b><b></b><b></b><b></b><b></b><b></b></div></div>\n</div>`,
      desc: '「‹」を押すとサイドバーがアイコンだけの幅に縮み、ラベルが消え、本文の列が自動で広がる。ラベルは折り返さないようにしておけば、幅の補間だけで自然に見える。',
    },
  ],
};
