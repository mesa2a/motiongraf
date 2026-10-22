// 追加分その 9p：ボタン 1 本、UI 2 本、エフェクト 1 本
const dis = 'VANISH'.split('').map((l, i) => `<b style="--i:${i}">${l}</b>`).join('');

module.exports = {
  'cat-buttons': [
    {
      id: 'btn-liquid-confirm', accent: 'pink', title: '液体のように変形して確定', en: 'Liquid Confirm',
      tags: ['border-radius を 4 隅ばらばらに', 'width / height も同時に', 'cubic-bezier(.3, 1.6, …)'],
      stage: `<div class="stage stage-lqbtn" aria-hidden="true">\n  <div class="fx-lqbtn"><span class="txt">確定する</span><i class="ok"></i></div>\n</div>`,
      desc: '押すとボタンがぷるんとつぶれ、液体のように縮んで緑の丸になり、チェックが出る。border-radius の 4 隅を不揃いに動かし、大きく行き過ぎるカーブにするのがコツ。',
    },
  ],
  'cat-ui': [
    {
      id: 'slider-tooltip', accent: 'lavender', title: '値が吹き出しで追従するスライダー', en: 'Slider Tooltip',
      tags: ['--sv の 1 変数', 'counter() で数値', 'ドラッグ中だけ表示'],
      stage: `<div class="stage stage-sltip" aria-hidden="true">\n  <div class="fx-sltip"><div class="rail"><i class="fill"></i><i class="knob"></i><span class="tip"></span></div></div>\n</div>`,
      desc: 'つまみを引くと、上の吹き出しが一緒に動いて今の値を見せる。塗り・つまみ・吹き出しの位置と数字が、すべて 1 つの変数から決まる。',
    },
    {
      id: 'password-reveal', accent: 'blue', title: 'パスワードの表示切り替え', en: 'Password Reveal',
      tags: ['目のアイコンに斜線', '●●● と文字を重ねる', 'opacity + translate'],
      stage: `<div class="stage stage-pwrv" aria-hidden="true">\n  <div class="fx-pwrv"><div class="lb">PASSWORD</div><div class="in"><div class="v"><span class="dots">●●●●●●●●</span><span class="txt">sakura2026</span></div><div class="eye"><i></i></div></div></div>\n</div>`,
      desc: '目のアイコンを押すと ●●● がふっと文字に変わり、目に斜線が引かれる。本番は input の type を切り替えるだけだが、文字の入れ替えを少しだけ動かすと丁寧に見える。',
    },
  ],
  'cat-fx': [
    {
      id: 'text-disintegrate', accent: 'pink', tone: 'cool', title: '文字が粒子に崩れて消える', en: 'Disintegrate',
      tags: ['文字ごとに blur + translate', '--i で散る向き', '粒は ::after'],
      stage: `<div class="stage stage-disint cool" aria-hidden="true">\n  <div class="fx-disint"><div class="w">${dis}</div></div>\n</div>`,
      desc: '文字が端から順にぼやけて上へ散り、小さな粒を残して消える。文字ごとに散る向きを変えると自然。消えたあと少し待って戻る。',
    },
  ],
};
