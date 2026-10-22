// 追加分その 9r：見出し 1 本、UI 2 本、背景 1 本、トランジション 1 本
const flag = 'FLUTTER'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');
const vu = [[.7, 1.1], [.95, .9], [.6, 1.3], [.85, 1.0], [.5, 1.2], [.9, .8], [.75, 1.15], [.95, .95], [.65, 1.25], [.8, 1.05]]
  .map(([p, t], i) => `<i style="--i:${i}; --peak:${p}; --t:${t}"></i>`).join('');
const emo = ['👍', '❤️', '😂', '🎉', '😮'].map((e, i) => `<i style="--i:${i}"${i === 3 ? ' class="sel"' : ''}>${e}</i>`).join('');
const flakes = Array.from({ length: 28 }, (_, i) => `<i class="flake" style="--x:${(i * 37) % 100}%; --s:${1 + (i % 3) * .5}cqi; --t:${5 + (i % 4)}; --d:${(i * 1.3) % 7}; --w:${(i % 5) - 2}"></i>`).join('');

module.exports = {
  'cat-hero': [
    {
      id: 'flag-text', accent: 'blue', title: '旗のようにはためく文字', en: 'Flag Text',
      tags: ['translate + rotate の波', '--i × -.12s の位相', '周期は短め'],
      stage: `<div class="stage stage-flag" aria-hidden="true">\n  <div class="fx-flag">${flag}</div>\n</div>`,
      desc: '文字が風を受けた旗のように、波を打ちながら上下に揺れる。文字ごとに位相をずらした上下と傾きだけで、布のうねりに見える。',
    },
  ],
  'cat-ui': [
    {
      id: 'volume-meter', accent: 'mint', tone: 'cool', title: '音量メーターのバー', en: 'VU Meter',
      tags: ['scaleY で高さ', '緑→黄→赤の背景', '目盛りは ::after'],
      stage: `<div class="stage stage-vumeter cool" aria-hidden="true">\n  <div class="fx-vu">${vu}</div>\n</div>`,
      desc: '音に合わせて跳ねるレベルメーター。バーは緑・黄・赤のグラデーションを下から見せ、高さは scaleY で変える。目盛りの切れ目は疑似要素の縞。',
    },
    {
      id: 'emoji-reaction', accent: 'pink', title: '絵文字リアクションのピッカー', en: 'Emoji Reactions',
      tags: ['下から弾んで出る', '絵文字は --i で順に', '選ぶと吹き出しに付く'],
      stage: `<div class="stage stage-emoji" aria-hidden="true">\n  <div class="fx-emo"><div class="pick">${emo}</div><div class="msg">今日のランチどうする？<span class="re">🎉 1</span></div></div>\n</div>`,
      desc: 'メッセージを長押しするとピッカーが下から弾んで出て、絵文字が順に並ぶ。選ぶとその絵文字が少し大きくなり、吹き出しの下にリアクションが付く。',
    },
  ],
  'cat-bg': [
    {
      id: 'snow-pile', accent: 'blue', tone: 'cool', title: '雪の降り積もり', en: 'Snow Pile',
      tags: ['雪は落とすだけ', '積もりは scaleY', '周期を長く'],
      stage: `<div class="stage stage-snowpile cool" aria-hidden="true">\n  <div class="fx-snowp">${flakes}<i class="tree"></i><i class="pile"></i><i class="pile b"></i></div>\n</div>`,
      desc: '雪が降り続け、地面と木の上にゆっくり雪が積もっていく。積もりは山なりの白い帯を scaleY で伸ばすだけで、周期を長くすると「積もっていく」感じになる。',
    },
  ],
  'cat-trans': [
    {
      id: 'crane-fold', accent: 'lavender', title: '折り紙のように畳まれる', en: 'Paper Fold',
      tags: ['4 枚を中心の角で折る', 'rotate3d の対角軸', '順に 0.15s 遅らせる'],
      stage: `<div class="stage stage-crane" aria-hidden="true">\n  <div class="fx-scene b craneb">B</div>\n  <div class="fx-crane"><div class="q tl">A</div><div class="q tr"></div><div class="q bl"></div><div class="q br"></div></div>\n</div>`,
      desc: '画面を 4 つに分けた紙が、中心の角を軸に対角線で順に折り畳まれて消え、次の画面が現れる。折る軸は <code>rotate3d</code> で対角線を指定する。',
    },
  ],
};
