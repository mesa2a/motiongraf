// 追加分その 9l：背景 2 本、UI 部品 3 本
const shadows = [[10, 70, 40, 0], [45, 48, 55, 14], [70, 90, 70, 30]].map(([y, w, t, d]) => `<i class="sh" style="--y:${y}%; --w:${w}cqi; --t:${t}; --d:${d}"></i>`).join('');
const casc = `<div class="fx-casc"><i class="hl"></i><b>新規作成</b><b class="has">書き出し<div class="sub s1"><i class="hl"></i><b>PNG</b><b class="has">PDF<div class="sub s2"><b>高画質</b><b>軽量</b></div></b><b>SVG</b></div></b><b>設定</b></div>`;
const swatches = ['#ff8fb8', '#8fd0ff', '#c9b8ff', '#6fd3b3'].map((c, i) => `<i style="--c:${c}; --i:${i}"></i>`).join('');
const lmore = `<div class="it" style="--c:#ff9ec4"></div><div class="it" style="--c:#8fd0ff"></div><div class="sk"></div><div class="it new" style="--c:#c9b8ff; --i:0"><div><i></i></div></div><div class="it new" style="--c:#6fd3b3; --i:1"><div><i></i></div></div><div class="btn">もっと読む</div>`;

module.exports = {
  'cat-bg': [
    {
      id: 'cloud-shadows', accent: 'yellow', title: '流れる雲の影', en: 'Cloud Shadows',
      tags: ['ぼかした楕円を multiply', '幅と速度を変えて 3 つ', '負の遅延で分散'],
      stage: `<div class="stage stage-cshadow" aria-hidden="true">\n  <div class="fx-cshadow"><div class="ground"></div>${shadows}</div>\n</div>`,
      desc: '晴れた日の地面のように、雲の影がゆっくり左から右へ流れて明るさが変わる。ぼかした楕円を乗算で重ねるだけで、上のカードにも影が落ちる。',
    },
    {
      id: 'vinyl-rings', accent: 'lavender', title: '回るレコード盤', en: 'Vinyl Spin',
      tags: ['repeating-radial-gradient', '反射は conic-gradient', 'ラベルごと回す'],
      stage: `<div class="stage stage-vinyl" aria-hidden="true">\n  <div class="fx-vinyl"></div>\n</div>`,
      desc: '溝のある黒い盤がゆっくり回る。溝だけでは回転が見えないので、反射の帯とラベルを一緒に回す。音楽系のセクションの背景やローディングに。',
    },
  ],
  'cat-ui': [
    {
      id: 'menu-cascade', accent: 'pink', title: '多段のドロップダウン', en: 'Cascading Menu',
      tags: ['子は親の右に absolute', 'ハイライトが滑る', '段ごとに遅れて開く'],
      stage: `<div class="stage stage-casc" aria-hidden="true">\n  ${casc}\n</div>`,
      desc: '項目にホバーすると右に 2 段目が開き、さらにその項目から 3 段目が開く。ハイライトは 1 つの要素を滑らせ、サブメニューは少し縮んだ状態から出すと軽い。',
    },
    {
      id: 'swatch-pick', accent: 'blue', title: 'カラースウォッチの選択', en: 'Swatch Picker',
      tags: ['輪とチェックが弾む', 'プレビューは background を補間', '--i で順に'],
      stage: `<div class="stage stage-swatch" aria-hidden="true">\n  <div class="fx-swatch"><div class="prev"></div><div class="row">${swatches}</div></div>\n</div>`,
      desc: '色の丸を選ぶと外側の輪とチェックが弾んで出て、上のプレビューの色がなめらかに変わる。商品のカラー選択や、テーマ色の設定に。',
    },
    {
      id: 'load-more', accent: 'lavender', title: 'もっと読む → 追加', en: 'Load More',
      tags: ['スケルトンのシマー', 'grid-template-rows 0fr → 1fr', '--i で順に伸びる'],
      stage: `<div class="stage stage-lmore" aria-hidden="true">\n  <div class="fx-lmore">${lmore}</div>\n</div>`,
      desc: '「もっと読む」を押すとスケルトンが光りながら待ち、届いた項目が高さ 0 から順に伸びて並ぶ。ページ送りの代わりに使う無限読み込みの基本形。',
    },
  ],
};
