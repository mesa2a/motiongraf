// 追加分その 9g：エフェクト 4 本、背景 3 本
const sedgeItems = ['#ff8fb8', '#8fd0ff', '#c9b8ff', '#6fd3b3', '#f5c542', '#ff8fb8', '#8fd0ff', '#c9b8ff', '#6fd3b3']
  .map((c, i) => `<b style="--c:${c}">項目 ${i + 1}</b>`).join('');
const leaves = [[6, 8, 26, -20], [30, 2, 22, 15], [60, 4, 30, -35], [78, 30, 24, 20], [10, 60, 28, 40], [48, 70, 26, -10], [80, 70, 22, 30]]
  .map(([x, y, s, r], i) => `<i class="leaf" style="--x:${x}%; --y:${y}%; --s:${s}cqi; --r:${r}deg; --i:${i}"></i>`).join('');

module.exports = {
  'cat-fx': [
    {
      id: 'blur-up', accent: 'pink', title: '画像のブラーアップ読み込み', en: 'Blur-up Loading',
      tags: ['小さい画像を blur で拡大', '本画像を opacity で重ねる', 'LQIP'],
      stage: `<div class="stage stage-blurup" aria-hidden="true">\n  <div class="fx-blurup"><i class="lq"></i><i class="hq"></i><div class="bar"></div></div>\n</div>`,
      desc: 'ぼけたプレースホルダーが先に出て、本画像が読み込まれるとピントが合うように切り替わる。20px 程度の小さな画像を拡大してぼかし、本画像を上に重ねて <code>opacity</code> で出す。',
    },
    {
      id: 'success-check-draw', accent: 'mint', title: '成功チェックが描かれる', en: 'Success Check',
      tags: ['円 → チェックの順', 'pathLength="1"', '最後に少し弾む'],
      stage: `<div class="stage stage-chk" aria-hidden="true">\n  <div class="fx-chk"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" pathLength="1"/><path d="M15 27 L23 35 L38 18" pathLength="1"/></svg><div class="msg">送信しました</div></div>\n</div>`,
      desc: '円が一筆で描かれ、続けてチェックが描かれて、最後に少し弾んでメッセージが出る。SVG に <code>pathLength="1"</code> を付ければ、長さを測らずに stroke-dashoffset を 1 → 0 にするだけ。',
    },
    {
      id: 'scroll-edge-shadow', accent: 'lavender', title: 'スクロール端の影', en: 'Scroll Edge Shadow',
      tags: ['続きがある側だけ影', '::before / ::after', 'scrollTop で opacity'],
      stage: `<div class="stage stage-sedge" aria-hidden="true">\n  <div class="fx-sedge"><div class="ls">${sedgeItems}</div></div>\n</div>`,
      desc: 'リストの上下に「まだ続きがある」ことを示す影を出し、端に着いたら消す。最初は下だけ、途中は上下、最後は上だけ。影は疑似要素 2 つで、opacity を scrollTop から決める。',
    },
    {
      id: 'focus-ring-pulse', accent: 'pink', title: 'フォーカスリングの波紋', en: 'Focus Ring Pulse',
      tags: [':focus-visible', 'box-shadow 2 重', '外側だけ広がって消える'],
      stage: `<div class="stage stage-focus" aria-hidden="true">\n  <div class="fx-focus"><div class="f"><label>お名前</label><div class="in" style="--i:0"></div></div><div class="f"><label>メール</label><div class="in" style="--i:1"></div></div><div class="f"><label>メッセージ</label><div class="in" style="--i:2"></div></div></div>\n</div>`,
      desc: 'Tab でフォーカスが移るたびに、枠がピンクになって外側の輪が一度だけ広がって消える。<code>box-shadow</code> を 2 重にして外側だけ広げると、アクセシビリティを損なわずに目立たせられる。',
    },
  ],
  'cat-bg': [
    {
      id: 'starfield-parallax', accent: 'blue', tone: 'cool', title: '流れる星空の 3 層パララックス', en: 'Starfield Parallax',
      tags: ['radial-gradient の点', '3 層で速度差', '公倍数ぶん動かしてループ'],
      stage: `<div class="stage stage-starp cool" aria-hidden="true">\n  <div class="fx-starp"><i class="l1"></i><i class="l2"></i><i class="l3"></i><div class="moon"></div></div>\n</div>`,
      desc: '遠くの星はゆっくり、近くの星は速く流れて奥行きが出る。星は小さな radial-gradient の繰り返しで、1 層に間隔の違う 2 パターンを重ねると格子に見えにくい。',
    },
    {
      id: 'grid-glow-pulse', accent: 'pink', tone: 'cool', title: '格子を走る光', en: 'Grid Glow',
      tags: ['同じ格子を 2 枚', 'mask-position を動かす', 'drop-shadow で発光'],
      stage: `<div class="stage stage-ggrid cool" aria-hidden="true">\n  <div class="fx-ggrid"><i class="base"></i><i class="glow a"></i><i class="glow b"></i></div>\n</div>`,
      desc: '薄い格子の上を、ピンクと水色の光がゆっくり走って線を照らす。明るい色の格子を丸い mask で切り抜き、<code>mask-position</code> を動かすだけ。',
    },
    {
      id: 'paper-shadow', accent: 'yellow', title: '紙に落ちる木漏れ日の影', en: 'Paper Shadow',
      tags: ['葉の形は border-radius', 'blur + multiply', 'alternate で揺れる'],
      stage: `<div class="stage stage-paper" aria-hidden="true">\n  <div class="fx-paper"><div class="note">Dear friend,<small>やわらかい光と影の演出。カードの上にも影が落ちる。</small></div>${leaves}</div>\n</div>`,
      desc: '紙の上に葉の影がゆらゆらと落ちる。葉はぼかした角丸の形で、<code>mix-blend-mode: multiply</code> にすると下のカードの上にも自然に影が落ちる。',
    },
  ],
};
