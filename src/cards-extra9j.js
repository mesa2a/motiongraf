// 追加分その 9j：ボタン 4 本、スクロール 3 本
const panes = [['01', '#fff0f6'], ['02', '#eaf6ff'], ['03', '#f4f0ff'], ['04', '#eefaf5']];
const hs = panes.map(([t, c]) => `<div class="pn" style="--c:${c}">${t}</div>`).join('');
const secs = [['Intro', '#fff0f6'], ['Works', '#eaf6ff'], ['About', '#f4f0ff'], ['Contact', '#eefaf5']];
const sd = secs.map(([t, c]) => `<div class="sec" style="--c:${c}">${t}</div>`).join('');
const dots = secs.map(([t], i) => `<i style="--i:${i}" data-l="${t.toUpperCase()}"></i>`).join('');

module.exports = {
  'cat-buttons': [
    {
      id: 'btn-expand-label', accent: 'pink', title: 'ラベルが伸びるアイコンボタン', en: 'Expanding Icon Button',
      tags: ['width 11 → 38cqi', 'ラベルは遅れてフェード', 'overflow: hidden'],
      stage: `<div class="stage stage-bel" aria-hidden="true">\n  <div class="fx-bel"><span class="ic">♥</span><span class="lb">お気に入りに追加</span></div>\n</div>`,
      desc: 'アイコンだけの丸いボタンが、ホバーで横に伸びてラベルを見せる。幅を補間するだけで、ラベルは少し遅れてフェードさせると文字が詰まって見えない。',
    },
    {
      id: 'btn-nudge', accent: 'lavender', title: '注目を促す揺れ', en: 'Attention Nudge',
      tags: ['長い周期で一瞬だけ', 'rotate ±3deg', '輪が広がる'],
      stage: `<div class="stage stage-nudge" aria-hidden="true">\n  <div class="fx-nudge">今すぐ申し込む</div>\n</div>`,
      desc: 'CTA ボタンが数秒に一度だけ小さく身震いして、輪が広がる。周期を長くして静止時間を多めに取ると、うるさくならずに視線だけ集められる。',
    },
    {
      id: 'btn-border-progress', accent: 'mint', title: '縁を一周する進行', en: 'Border Progress',
      tags: ['conic-gradient + mask', '@property で角度', '一周したら緑'],
      stage: `<div class="stage stage-bprog" aria-hidden="true">\n  <div class="fx-bprog"><span class="lbl">保存する</span><span class="done">保存しました</span></div>\n</div>`,
      desc: '押すとボタンの縁をピンクの線が一周し、回り切ったら緑になって文字が変わる。縁だけを見せる mask と、角度を登録した変数で線を進める。',
    },
    {
      id: 'btn-corner-cut', accent: 'pink', tone: 'cool', title: '角を斜めに切ったボタン', en: 'Corner Cut',
      tags: ['clip-path: polygon', '--c で切れ込み', '文字間も広がる'],
      stage: `<div class="stage stage-ccut cool" aria-hidden="true">\n  <div class="fx-ccut">ENTER</div>\n</div>`,
      desc: '左上と右下を斜めに切ったボタン。ホバーで切れ込みが深くなり、文字間が広がって光が走る。切れ込みの大きさは変数 1 つで決めている。',
    },
  ],
  'cat-enter': [
    {
      id: 'horizontal-scroll-section', accent: 'blue', title: '縦スクロールで横に流れる', en: 'Horizontal Scroll',
      tags: ['sticky の窓', 'translateX(-300%)', 'animation-timeline: scroll()'],
      stage: `<div class="stage stage-hscroll" aria-hidden="true">\n  <div class="fx-hscroll"><div class="view"><div class="track">${hs}</div></div><div class="bar"><i class="thumb"></i></div></div>\n</div>`,
      desc: '縦にスクロールすると、貼り付いた窓の中でパネルが横に流れる。高さを 400vh にしたセクションに sticky の窓を置き、スクロール量でトラックを横に動かす。',
    },
    {
      id: 'parallax-heading', accent: 'pink', title: '見出しのパララックス', en: 'Parallax Heading',
      tags: ['--py × --k', '奥ほど遅く', '@property で補間'],
      stage: `<div class="stage stage-phead" aria-hidden="true">\n  <div class="fx-phead"><b class="bgt">SUMMER</b><i class="sh1"></i><i class="sh2"></i><div class="ttl">夏のおしらせ<small>奥の大きな文字はゆっくり、手前のカードは速く動く</small></div><div class="bar"><i></i></div></div>\n</div>`,
      desc: 'スクロールすると、奥の大きな文字はゆっくり、図形は中くらい、手前のカードは速く動いて奥行きが出る。スクロール量を 1 つの変数に入れ、層ごとに倍率を掛ける。',
    },
    {
      id: 'scroll-dots-nav', accent: 'lavender', title: '右端の進捗ドット', en: 'Scroll Dots Nav',
      tags: ['IntersectionObserver', 'ドットは scale で強調', 'ラベルは ::after'],
      stage: `<div class="stage stage-sdots" aria-hidden="true">\n  <div class="fx-sdots"><div class="pg">${sd}</div><div class="nav">${dots}</div></div>\n</div>`,
      desc: 'ページ右端に固定したドットが、見えているセクションに合わせて大きくなり、ラベルが横に出る。セクションの出入りを監視して、対応するドットに .on を付ける。',
    },
  ],
};
