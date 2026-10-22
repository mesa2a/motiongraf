// 追加分その 9v：トランジション 3 本、背景 3 本、エフェクト 3 本（300 本へ向けて）
const tiles = Array.from({ length: 18 }, (_, i) => `<i style="--i:${(i % 6) + Math.floor(i / 6)}"></i>`).join('');
const gooSvg = `<svg aria-hidden="true"><filter id="goo-lava"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="g"/><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>`;
const lava = [[12, 14, 9, 0, 3], [30, 10, 7, 2, -2], [52, 16, 11, 4, 1], [72, 9, 8, 1, -3], [86, 12, 6, 3, 2]]
  .map(([x, s, t, d, w]) => `<i style="--x:${x}%; --s:${s}cqi; --t:${t}; --d:${d}; --w:${w}"></i>`).join('');
const drops = Array.from({ length: 18 }, (_, i) => `<i class="d" style="--x:${(i * 53) % 100}%; --s:${1.2 + (i % 4) * .7}cqi; --t:${6 + (i % 5) * 2}; --d:${(i * 1.7) % 9}"></i>`).join('');
const sine = (y, c) => `<path style="--c:${c}" d="M0 ${y} Q 50 ${y - 30} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y} T 500 ${y} T 600 ${y} T 700 ${y} T 800 ${y}"/>`;
const sineSvg = `<svg viewBox="0 0 800 160" preserveAspectRatio="none">${sine(80, '#f3aabb')}${sine(80, '#bccbee')}${sine(80, '#d9c6f0')}</svg>`;
const fw = (x, y, c, d) => `<i class="r" style="--x:${x}%; --y:${y}cqi; --d:${d}"></i><div class="b" style="--x:${x}%; --y:${y}cqi">${Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}; --c:${c}; --d:${d}"></i>`).join('')}</div>`;
const fireworks = fw(30, 16, '#ff8fb8', 0) + fw(68, 12, '#f5c542', 1.3) + fw(50, 22, '#8fd0ff', 2.5);
const blips = [[62, 30, .08], [36, 60, .42], [70, 68, .3], [28, 36, .7]].map(([x, y, a]) => `<i style="--x:${x}%; --y:${y}%; --a:${a}"></i>`).join('');

module.exports = {
  'cat-trans': [
    {
      id: 'flip-tiles', accent: 'blue', title: 'タイルが裏返って切り替わる', en: 'Flip Tiles',
      tags: ['6×3 の rotateY', '裏面に次の色', '--i = 行 + 列'],
      stage: `<div class="stage stage-fliptiles" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-fliptiles">${tiles}</div>\n  <div class="fx-scene b ftb">B</div>\n</div>`,
      desc: '画面がタイルに分かれて左上から順に裏返り、裏面の色で次の画面になる。表と裏は疑似要素で作り、めくり終わってから中身を出す。',
    },
    {
      id: 'drop-bounce', accent: 'pink', title: '次の画面が落ちてきて弾む', en: 'Drop Bounce',
      tags: ['translate -110% → 0', '着地で 2 回バウンド', '下の画面は少しつぶす'],
      stage: `<div class="stage stage-dropb" aria-hidden="true">\n  <div class="fx-scene a dropba">A</div>\n  <div class="fx-scene b dropbb">B</div>\n</div>`,
      desc: '次の画面が上から落ちてきて、着地で 2 回小さく弾んで止まる。下の画面を着地の瞬間だけつぶすと重さが出る。',
    },
    {
      id: 'cube-pages', accent: 'lavender', title: '立方体の面として回る', en: 'Cube Pages',
      tags: ['translateZ(-50cqi) で奥に', '右の面に次の画面', 'rotateY(-90deg)'],
      stage: `<div class="stage stage-cubep" aria-hidden="true">\n  <div class="fx-cubep"><div class="f a">A</div><div class="f b">B</div></div>\n</div>`,
      desc: '画面が立方体の正面で、回転すると右の面に貼った次の画面が正面に来る。箱を画面幅の半分だけ奥に置くのがコツ。',
    },
  ],
  'cat-bg': [
    {
      id: 'lava-lamp', accent: 'pink', tone: 'cool', title: '溶岩ランプ', en: 'Lava Lamp',
      tags: ['gooey フィルター', '底の溜まりから上がる', '周期と遅延をばらす'],
      stage: `<div class="stage stage-lava cool" aria-hidden="true">\n  <div class="fx-lava">${gooSvg}<div class="pool"></div>${lava}</div>\n</div>`,
      desc: '底の溜まりから玉がゆっくり上がり、ちぎれてまた沈む。SVG の gooey フィルターで玉同士と溜まりがくっつく。',
    },
    {
      id: 'rain-drops', accent: 'blue', tone: 'cool', title: '窓ガラスの雨粒', en: 'Rain Drops',
      tags: ['雫は radial-gradient', '外の明かりは blur', '落ちる速さをばらす'],
      stage: `<div class="stage stage-rdrops cool" aria-hidden="true">\n  <div class="fx-rdrops"><div class="city"></div>${drops}</div>\n</div>`,
      desc: '窓ガラスの雫がゆっくり伝い落ち、外のぼけた明かりが揺れて見える。雫はハイライト付きの楕円で、たまに速く落ちるものを混ぜる。',
    },
    {
      id: 'sine-lines', accent: 'lavender', title: '流れる正弦波の線', en: 'Sine Lines',
      tags: ['SVG の path を 2 倍幅で', '1 周期ぶん translate', '線ごとに上下の揺れ'],
      stage: `<div class="stage stage-sine" aria-hidden="true">\n  <div class="fx-sine">${sineSvg}</div>\n</div>`,
      desc: '細い波線が 3 本、少しずつ違う揺れで横に流れる。SVG を 2 倍幅にして 1 周期ぶん動かすと継ぎ目が出ない。',
    },
  ],
  'cat-fx': [
    {
      id: 'fireworks', accent: 'pink', tone: 'cool', title: '花火', en: 'Fireworks',
      tags: ['上がってから 12 方向へ', 'rotate → translateY', '--d で打ち上げをずらす'],
      stage: `<div class="stage stage-fw cool" aria-hidden="true">\n  <div class="fx-fw">${fireworks}</div>\n</div>`,
      desc: '火が上がり、頂点で 12 方向に火花が広がって落ちながら消える。3 発を少しずつずらして打ち上げる。キャンペーンの達成演出などに。',
    },
    {
      id: 'radar', accent: 'mint', tone: 'cool', title: 'レーダーの掃引', en: 'Radar Sweep',
      tags: ['conic-gradient の扇', '点は角度に合わせて点灯', 'ゆっくり消す'],
      stage: `<div class="stage stage-radar cool" aria-hidden="true">\n  <div class="fx-radar">${blips}</div>\n</div>`,
      desc: '扇形の光が一周し、通った位置の点が光ってゆっくり消える。点の点灯タイミングは角度を遅延に換算する。検索中・探索中の演出に。',
    },
    {
      id: 'map-pin', accent: 'pink', title: '地図のピンが落ちる', en: 'Map Pin',
      tags: ['落ちて 1 回弾む', '楕円の波紋', 'ラベルは遅れて'],
      stage: `<div class="stage stage-mappin" aria-hidden="true">\n  <div class="fx-mappin"><div class="rg"></div><div class="pin"></div><div class="lb">現在地</div></div>\n</div>`,
      desc: 'ピンが上から落ちて 1 回弾み、足元に楕円の波紋が広がってラベルが出る。地図の位置表示や店舗一覧の選択に。',
    },
  ],
};
