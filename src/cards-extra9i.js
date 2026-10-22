// 追加分その 9i：見出し 2 本、UI 部品 3 本
const liq = 'LIQUID'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');
const gooSvg = `<svg aria-hidden="true"><filter id="goo-liq"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="g"/><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>`;
const kanCol = (title, items, extra = '') => `<div class="col"><h4>${title}</h4>${items.map((c) => `<i class="it" style="--c:${c}"></i>`).join('')}${extra}</div>`;

module.exports = {
  'cat-hero': [
    {
      id: 'liquid-text', accent: 'pink', title: '液体のように溶ける文字', en: 'Liquid Text',
      tags: ['SVG の gooey フィルター', 'feColorMatrix でアルファ強調', '文字を --i で揺らす'],
      stage: `<div class="stage stage-liquid" aria-hidden="true">\n  <div class="fx-liq">${gooSvg}<div class="w">${liq}</div><i class="drop"></i></div>\n</div>`,
      desc: '文字同士が近づくとくっつき、上から落ちた滴が文字に溶け込む。SVG フィルターでぼかしてからアルファを強調すると、近い形がつながって液体に見える。',
    },
    {
      id: 'type-overlap', accent: 'lavender', title: '重なって動くタイポ', en: 'Overlapping Type',
      tags: ['輪郭 + 塗りの 2 語', 'mix-blend-mode: multiply', '逆方向に alternate'],
      stage: `<div class="stage stage-overlap" aria-hidden="true">\n  <div class="fx-ovl"><b class="o">DESIGN</b><b class="f">MOTION</b></div>\n</div>`,
      desc: '輪郭だけの語と塗りの語が重なって、逆方向にゆっくり行き来する。重なった部分は <code>mix-blend-mode</code> で色が変わり、紙に刷ったような雰囲気になる。',
    },
  ],
  'cat-ui': [
    {
      id: 'kanban-drag', accent: 'blue', title: 'カンバンのドラッグ移動', en: 'Kanban Drag',
      tags: ['持ち上げは scale + 影', '点線の置き場所', '隙間は height で開閉'],
      stage: `<div class="stage stage-kanban" aria-hidden="true">\n  <div class="fx-kan">${kanCol('TO DO', ['#c9b8ff'], '<i class="gap from"></i><i class="it" style="--c:#8fd0ff"></i>')}${kanCol('DOING', ['#6fd3b3'], '<i class="gap to"></i><i class="it" style="--c:#f5c542"></i>')}${kanCol('DONE', ['#ff9ec4', '#c9b8ff'])}<i class="mv"></i></div>\n</div>`,
      desc: 'カードを持ち上げると少し傾いて影が濃くなり、隣の列に点線の置き場所が開く。離すとそこに収まり、元の列の隙間が閉じる。隙間は <code>height</code> の補間で十分。',
    },
    {
      id: 'step-form', accent: 'pink', title: 'ステップ付きフォーム', en: 'Step Form',
      tags: ['track を translate', '線は scaleX', '番号は --i で点灯'],
      stage: `<div class="stage stage-sform" aria-hidden="true">\n  <div class="fx-sform"><div class="prog"><i class="ln"></i><b data-n="1" style="--i:0">基本</b><b data-n="2" style="--i:1">住所</b><b data-n="3" style="--i:2">確認</b></div><div class="panes"><div class="track"><div class="pane"><i></i><i class="s"></i></div><div class="pane"><i></i><i></i></div><div class="pane"><span class="ok"></span></div></div></div><div class="btn">次へ</div></div>\n</div>`,
      desc: '「次へ」を押すと入力欄が左へ流れて次のステップになり、上の番号と線が進む。パネルは横に並べた 1 本のトラックを <code>translate</code> するだけ。',
    },
    {
      id: 'inline-edit', accent: 'mint', title: 'その場で編集', en: 'Inline Edit',
      tags: ['クリックで入力欄に', '✓ で保存して緑に', '追加分は clip-path'],
      stage: `<div class="stage stage-iedit" aria-hidden="true">\n  <div class="fx-iedit"><div class="lb">TITLE</div><div class="row"><div class="txt"><span>旅行の計画<span class="add">（春）</span></span></div><div class="ic"><i class="ok"></i></div></div></div>\n</div>`,
      desc: '鉛筆を押すと文字がそのまま入力欄になり、文字を足して ✓ を押すと一瞬緑に光って保存される。ページ遷移なしで直せる編集 UI の基本形。',
    },
  ],
};
