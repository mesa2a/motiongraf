// 追加分その 9q：ボタン 1 本、カード 1 本、トランジション 1 本、エフェクト 1 本
const row = [['#ff9ec4', '#ffd3a8'], ['#8fd0ff', '#c9b8ff'], ['#c9b8ff', '#ff9ec4'], ['#9fe3cd', '#8fd0ff'], ['#ffd3a8', '#ff9ec4']]
  .map(([a, b], i) => `<div class="c" style="--c1:${a}; --c2:${b}; --k:${i - 2}"></div>`).join('');
const blades = Array.from({ length: 6 }, (_, i) => `<i style="--i:${i}"></i>`).join('');

module.exports = {
  'cat-buttons': [
    {
      id: 'btn-split-text', accent: 'pink', title: '文字が上下に割れるボタン', en: 'Split Text',
      tags: ['同じ文字を 2 枚重ねる', 'clip-path で上下半分', '逆方向にずらす'],
      stage: `<div class="stage stage-splitbtn" aria-hidden="true">\n  <div class="fx-sptxt"><span class="top">EXPLORE</span><span class="bot">EXPLORE</span></div>\n</div>`,
      desc: 'ホバーで文字が上下に割れて、上は左、下は右へ少しずれる。同じ文字を 2 枚重ねて clip-path で半分ずつ見せるだけ。下半分の色を変えると効く。',
    },
  ],
  'cat-cards': [
    {
      id: 'card-row-tilt', accent: 'blue', title: 'スクロールで角度が変わるカード列', en: 'Row Tilt',
      tags: ['中央からの距離 --k', 'rotateY(--k × 38deg)', 'perspective は親に'],
      stage: `<div class="stage stage-rowtilt" aria-hidden="true">\n  <div class="fx-rowtilt">${row}</div>\n</div>`,
      desc: '横に並んだカードが、中央に近いものは正面を向き、端のものほど斜めを向く。横スクロールで列が流れると角度が連続的に変わる。カバーフロー風の見せ方。',
    },
  ],
  'cat-trans': [
    {
      id: 'shutter-trans', accent: 'lavender', title: 'カメラのシャッター', en: 'Shutter',
      tags: ['羽根 6 枚を rotate で配置', 'translate で閉じる', '閉じたら差し替え'],
      stage: `<div class="stage stage-shutter" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-scene b shutterb">B</div>\n  <div class="fx-shutter">${blades}</div>\n</div>`,
      desc: 'カメラの絞り羽根のように 6 枚の三角が中心へ閉じて画面を覆い、開くと次の画面になる。羽根は 60° ずつ回して並べ、閉じる動きは translate だけ。',
    },
  ],
  'cat-fx': [
    {
      id: 'lens-magnify', accent: 'pink', title: 'レンズで文字が拡大される', en: 'Lens Magnify',
      tags: ['レンズの中に同じ文字', '移動ぶん逆に動かす', 'scale(1.6)'],
      stage: `<div class="stage stage-lens" aria-hidden="true">\n  <div class="fx-lens"><div class="t">MAGNIFY</div><div class="glass"><div class="t">MAGNIFY</div></div></div>\n</div>`,
      desc: '丸いレンズが文字の上を通ると、中の文字が 1.6 倍に拡大されて見える。レンズの中に同じ文字を置き、レンズの移動量に倍率を掛けて逆方向に動かすと位置が合う。',
    },
  ],
};
