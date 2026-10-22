// 追加分その 8：ボタン 5 本、UI 部品 4 本
module.exports = {
  'cat-buttons': [
    {
      id: 'btn-undo', accent: 'lavender', title: 'カウントダウン付き取り消し', en: 'Undo Countdown',
      tags: ['conic-gradient の残り時間', 'counter() の秒数', '押すと緑に'],
      stage: `<div class="stage stage-undo" aria-hidden="true">\n  <div class="fx-ud"><div class="msg"><span>メッセージを削除しました</span><span>元に戻しました</span></div><div class="btn"><i class="ring"></i>取り消す</div></div>\n</div>`,
      desc: '削除のトーストに「取り消す」を付け、残り秒数を弧と数字で見せる。残り 2 秒で押すと緑の「元に戻しました」に変わって消える。弧と数字は 1 つの要素の <code>--a</code> と <code>--n</code> で動かす。',
    },
    {
      id: 'segmented', accent: 'blue', title: 'セグメントコントロール', en: 'Segmented Control',
      tags: ['白いつまみ 1 個', 'translate で移動', '--i で文字色'],
      stage: `<div class="stage stage-seg" aria-hidden="true">\n  <div class="fx-seg"><i></i><b style="--i:0">日</b><b style="--i:1">週</b><b style="--i:2">月</b></div>\n</div>`,
      desc: 'iOS 風の切り替え。白いつまみは 1 個だけ置いて <code>translate</code> で滑らせ、選ばれた文字だけ濃くする。行き過ぎて戻るカーブで「吸い付く」感じに。',
    },
    {
      id: 'like-burst', accent: 'pink', title: 'いいねの連打', en: 'Like Burst',
      tags: ['タップごとに +1', '波紋は ::after', 'counter() で数字'],
      stage: `<div class="stage stage-likeb" aria-hidden="true">\n  <div class="fx-lb"><b class="heart">♥</b><span class="num"></span><i class="up" style="--i:0"></i><i class="up" style="--i:1"></i><i class="up" style="--i:2"></i></div>\n</div>`,
      desc: 'ハートを連打すると、そのたびに跳ねて波紋が広がり、「+1」が浮かんで数字が増える。数字は <code>--n</code> を整数で動かして <code>counter()</code> で表示。',
    },
    {
      id: 'btn-play-pause', accent: 'blue', title: '再生 ⇄ 一時停止のモーフ', en: 'Play / Pause Morph',
      tags: ['clip-path: polygon', '点の数をそろえる', '2 本の棒で三角'],
      stage: `<div class="stage stage-playpause" aria-hidden="true">\n  <div class="fx-pp"><i></i><i></i></div>\n</div>`,
      desc: '三角の再生アイコンが 2 本の棒に割れて一時停止になり、また三角に戻る。棒 2 本を左右半分の三角として描き、<code>polygon()</code> の点の数をそろえると形が補間される。',
    },
    {
      id: 'btn-split-share', accent: 'pink', title: 'シェアボタンの分裂', en: 'Split Share',
      tags: ['scaleX で消える本体', '--i × 14cqi に散る', '遅延で順番'],
      stage: `<div class="stage stage-share" aria-hidden="true">\n  <div class="fx-sp"><div class="pill">シェア</div><i style="--i:-1; --d:0; --c:#8fd0ff">X</i><i style="--i:0; --d:1; --c:#ff8fb8">in</i><i style="--i:1; --d:2; --c:#6fd3b3">f</i></div>\n</div>`,
      desc: '押すと「シェア」の本体が横に縮んで消え、代わりに SNS の丸いアイコンが中央から左右へ散る。アイコンは同じ場所に重ねておき、<code>--i</code> で散る距離を決める。',
    },
  ],
  'cat-ui': [
    {
      id: 'typing-indicator', accent: 'pink', title: '入力中インジケーター', en: 'Typing Indicator',
      tags: ['点 3 つの bounce', '同じ吹き出しが広がる', 'grid-area で重ねる'],
      stage: `<div class="stage stage-typing" aria-hidden="true">\n  <div class="fx-ti-me">今どこ？</div>\n  <div class="fx-ti"><div class="dots"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i></div><span>今から向かいます！</span></div>\n</div>`,
      desc: '相手が入力中のあいだ点が 3 つ跳ね、メッセージが届くと同じ吹き出しが横に広がって本文に変わる。点と本文を同じマスに重ねると差し替えが自然。',
    },
    {
      id: 'copy-feedback', accent: 'mint', title: 'コピー完了のフィードバック', en: 'Copy Feedback',
      tags: ['アイコン → チェック', 'ツールチップが浮く', '1.5 秒で戻す'],
      stage: `<div class="stage stage-copy" aria-hidden="true">\n  <div class="fx-cp"><span><span class="k">npm</span> i motion-css</span><div class="btn"><i class="ic"></i><i class="ok"></i><span class="tip">コピーしました</span></div></div>\n</div>`,
      desc: 'コードの横のコピーボタン。押すと四角 2 枚のアイコンが緑のチェックに変わり、「コピーしました」が上に浮かんで、しばらくして元に戻る。',
    },
    {
      id: 'tag-input', accent: 'lavender', title: 'タグ入力', en: 'Tag Input',
      tags: ['Enter でチップ化', 'max-width 0 で畳む', '隣が自然に詰まる'],
      stage: `<div class="stage stage-tags" aria-hidden="true">\n  <div class="fx-tg"><b class="chip del">CSS<i>×</i></b><b class="chip">motion<i>×</i></b><b class="chip new">anime<i>×</i></b><span class="q">anime</span></div>\n</div>`,
      desc: '文字を打って Enter するとチップになって並び、× を押すとそのチップが縮んで隣が詰まる。チップの出入りは <code>max-width</code> と padding を 0 にするだけで、flex が隙間を埋めてくれる。',
    },
    {
      id: 'command-palette', accent: 'blue', title: 'コマンドパレット', en: 'Command Palette',
      tags: ['上から落ちて開く', 'grid-template-rows 1fr → 0fr', '一致行だけ残る'],
      stage: `<div class="stage stage-cmd" aria-hidden="true">\n  <div class="fx-cmd-shade"></div>\n  <div class="fx-cmd"><div class="in"><span class="q">set</span><span class="kbd">⌘K</span></div><div class="ls"><b class="hit"><span>Settings</span></b><b class="x"><span>Share link</span></b><b class="hit"><span>Set theme</span></b><b class="x"><span>Sync now</span></b><b class="x"><span>Sign out</span></b></div></div>\n</div>`,
      desc: '⌘K で上から落ちてくるパレット。文字を打つと一致しない行が高さ 0 に畳まれ、残った先頭行がハイライトされる。行の折りたたみは <code>grid-template-rows</code> の補間で。',
    },
  ],
};
