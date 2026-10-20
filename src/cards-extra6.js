// 追加分その 6：UI 部品 7 本、ボタン 2 本
const month = (sel) => Array.from({ length: 35 }, (_, i) => `<i${sel.includes(i) ? ' class="sel"' : ''}></i>`).join('');

module.exports = {
  'cat-ui': [
    {
      id: 'datepicker', accent: 'lavender', title: '日付ピッカーの月送り', en: 'Date Picker',
      tags: ['2 枚のグリッド', 'translate で入替', 'steps(1) の見出し'],
      stage: `<div class="stage stage-dp" aria-hidden="true">\n  <div class="fx-dp">\n    <div class="hd"><b>‹</b><div class="t"><span>2026 / 04</span><span>2026 / 05</span></div><b class="nx">›</b></div>\n    <div class="months"><div class="m">${month([3, 10, 17])}</div><div class="m">${month([8, 9, 22])}</div></div>\n  </div>\n</div>`,
      desc: '「›」を押すと今月のグリッドが左へ抜け、翌月が右から入る。見出しの年月は 2 枚重ねて <code>steps(1)</code> で一瞬で差し替える。',
    },
    {
      id: 'notif-stack', accent: 'blue', title: '通知の積み上げ', en: 'Notification Stack',
      tags: ['1 本のキーフレーム', '1 秒ずつ遅延', '段ごとに translate'],
      stage: `<div class="stage stage-notif" aria-hidden="true">\n  <div class="fx-nt"><div class="n" style="--i:0; --c:#ff8fb8"><i></i>新しいメッセージ</div><div class="n" style="--i:1; --c:#8fd0ff"><i></i>アップロード完了</div><div class="n" style="--i:2; --c:#6fd3b3"><i></i>3 件のいいね</div></div>\n</div>`,
      desc: '新しい通知が上から入り、前のものが 1 段ずつ押し下げられて、最後は消える。全部同じキーフレームで、遅延だけ 1 秒ずつ変える。',
    },
    {
      id: 'pull-refresh', accent: 'pink', title: 'プルダウンリフレッシュ', en: 'Pull to Refresh',
      tags: ['引っ張る → 回る → 戻る', 'height 0 → 9cqi', '新しい項目'],
      stage: `<div class="stage stage-pull" aria-hidden="true">\n  <div class="fx-pr-phone"><div class="fx-pr-spin"></div><div class="fx-pr-list"><div class="it new"></div><div class="it"></div><div class="it"></div><div class="it"></div><div class="it"></div></div></div>\n</div>`,
      desc: 'リストを下に引くとスピナーが現れ、戻ったあと先頭に新しい項目が「にゅっ」と増える。新項目は高さ 0 から伸ばす。',
    },
    {
      id: 'bottom-sheet', accent: 'lavender', title: 'ボトムシート', en: 'Bottom Sheet',
      tags: ['translate 100% → 45% → 0', 'スナップ', 'シェード'],
      stage: `<div class="stage stage-sheet" aria-hidden="true">\n  <div class="fx-sh-page"><b></b><b></b><b></b></div>\n  <div class="fx-sh-shade"></div>\n  <div class="fx-sh"><b></b><b></b><b></b><b></b></div>\n</div>`,
      desc: 'スマホの下から出るパネル。半分の高さで一度止まり（スナップ）、さらに引き上げると全開になる。つまみは <code>::before</code>。',
    },
    {
      id: 'swipe-delete', accent: 'pink', title: 'スワイプで削除', en: 'Swipe to Delete',
      tags: ['translate で横滑り', 'grid-template-rows 1fr → 0fr', '下が詰まる'],
      stage: `<div class="stage stage-swipe" aria-hidden="true">\n  <div class="fx-sd">\n    <div class="row"><div><div class="it"><i></i>買い物に行く</div></div></div>\n    <div class="row target"><div><div class="bg">削除</div><div class="it"><i></i>メールを返す</div></div></div>\n    <div class="row"><div><div class="it"><i></i>本を読む</div></div></div>\n  </div>\n</div>`,
      desc: '項目を左へ滑らせると赤い「削除」が見え、さらに滑らせると項目が消えて下の行が詰まる。高さは <code>grid-template-rows</code> で補間。',
    },
    {
      id: 'reorder', accent: 'blue', title: 'ドラッグで並べ替え', en: 'Reorder',
      tags: ['scale + 影で持ち上げ', '相手が席を譲る', 'translate'],
      stage: `<div class="stage stage-reorder" aria-hidden="true">\n  <div class="fx-ro"><div class="it shift">タスク A</div><div class="it drag">タスク B</div><div class="it">タスク C</div></div>\n</div>`,
      desc: '2 番目の項目が持ち上がって 1 番目の上へ移り、1 番目が下へ席を譲る。持ち上げは <code>scale</code> と影の強さで、移動は <code>translate</code> で。',
    },
    {
      id: 'pager-fly', accent: 'pink', title: 'ページ送り', en: 'Pagination',
      tags: ['動く丸 1 個', '--i で文字色', '矢印のタップ'],
      stage: `<div class="stage stage-pager2" aria-hidden="true">\n  <div class="fx-pg"><b class="arr">‹</b><div class="nums"><i></i><b style="--i:0">1</b><b style="--i:1">2</b><b style="--i:2">3</b><b style="--i:3">4</b><b style="--i:4">5</b></div><b class="arr r">›</b></div>\n</div>`,
      desc: '現在ページを示す丸が、数字の下を滑って移動する。丸は 1 個だけ置き、数字の文字色は遅延付きのキーフレームで白に切り替える。',
    },
  ],
  'cat-buttons': [
    {
      id: 'long-press', accent: 'pink', title: '長押しで進むゲージ', en: 'Long Press',
      tags: ['conic-gradient', '@property', '押下で縮む'],
      stage: `<div class="stage stage-longpress" aria-hidden="true">\n  <div class="fx-lp"><div class="core">長押し<span class="ok"></span></div></div>\n</div>`,
      desc: '押している間だけ外周のゲージが満ちて、満ちたら緑のチェックに変わる。誤操作を防ぎたい「削除」や「送信」に。',
    },
    {
      id: 'magnetic', accent: 'blue', title: '磁石ボタン', en: 'Magnetic Button',
      tags: ['JS でマウス座標', 'ボタン 0.25 倍', '文字 0.4 倍'],
      stage: `<div class="stage stage-magnet" aria-hidden="true">\n  <div class="fx-mg"><span>Follow me</span></div>\n  <div class="fx-cursor"></div>\n</div>`,
      desc: 'カーソルが近づくとボタンが少し吸い寄せられ、文字はさらに少し動く。CSS は <code>translate</code> の受け皿で、座標は JS で計算する（デモでは軌道を再現）。',
    },
  ],
};
