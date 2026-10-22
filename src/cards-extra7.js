// 追加分その 7：UI 部品 4 本、ボタン 2 本
// カレンダー：3 週分（1〜21）。9〜18 を範囲選択
const days = Array.from({ length: 21 }, (_, i) => {
  const d = i + 1; const inRange = d >= 9 && d <= 18; const edge = d === 9 || d === 18;
  return `<i${inRange ? ` class="in${edge ? ' edge' : ''}" style="--k:${d - 9}"` : ''}>${d}</i>`;
}).join('');
const drum = (arr) => arr.map((v) => `<i>${v}</i>`).join('');

module.exports = {
  'cat-ui': [
    {
      id: 'range-select', accent: 'pink', title: 'カレンダーの範囲選択', en: 'Date Range',
      tags: ['--k で距離', '始点・終点は別色', 'カーソルの軌道'],
      stage: `<div class="stage stage-rangesel" aria-hidden="true">\n  <div class="fx-rs">${days}</div>\n  <div class="fx-rs-cur"></div>\n</div>`,
      desc: '始点の日から終点の日までドラッグすると、通った日が順に色づく。始点からの距離 <code>--k</code> で遅延を付け、両端だけ濃い色に。',
    },
    {
      id: 'time-drum', accent: 'lavender', title: 'タイムピッカーのドラム', en: 'Time Drum',
      tags: ['mask で上下をぼかす', '7cqi 刻みで止める', 'cubic-bezier の減速'],
      stage: `<div class="stage stage-drum" aria-hidden="true">\n  <div class="fx-drum">\n    <div class="col h"><div class="band"></div><b>${drum(['07', '08', '09', '10', '11', '12'])}</b></div>\n    <span class="sep">:</span>\n    <div class="col m"><div class="band"></div><b>${drum(['00', '10', '20', '30', '40', '50', '00'])}</b></div>\n  </div>\n</div>`,
      desc: '数字の列が回って止まる。列の上下を <code>mask</code> でぼかすと円筒に見える。止まる位置は 1 段の高さの倍数にして、減速カーブで吸い付かせる。',
    },
    {
      id: 'upload', accent: 'blue', title: 'ファイルアップロード', en: 'File Upload',
      tags: ['width と counter() の同期', '完了でチェック', 'カードごと登場'],
      stage: `<div class="stage stage-upload" aria-hidden="true">\n  <div class="fx-up"><div class="ic"></div><div class="nm">photo_0421.jpg</div><div class="pct"></div><div class="bar"><i></i></div><div class="ok">✓</div></div>\n</div>`,
      desc: 'ファイルの行が現れ、バーと％が同じカーブで進み、100% で％がチェックに変わる。バーの幅と数字を同じキーフレーム割合で動かすのがコツ。',
    },
    {
      id: 'add-to-cart', accent: 'pink', title: 'カートへ飛ぶ', en: 'Add to Cart',
      tags: ['親子で放物線', 'scale で小さく', 'バッジの繰り上げ'],
      stage: `<div class="stage stage-cart" aria-hidden="true">\n  <div class="fx-ct-prod fx-photo"><b></b><b></b></div>\n  <div class="fx-fly"><i class="fx-photo"></i></div>\n  <div class="fx-ct-btn">カートに入れる</div>\n  <div class="fx-ct-cart">🛒<div class="fx-ct-badge"><span>2</span><span>3</span></div></div>\n</div>`,
      desc: '商品のコピーが小さくなりながら放物線を描いてカートへ飛び、カートが弾んでバッジの数が増える。横移動を親、上下を子に分けると放物線になる。',
    },
  ],
  'cat-buttons': [
    {
      id: 'dial', accent: 'lavender', title: '円形ダイヤル', en: 'Dial',
      tags: ['conic-gradient の弧', '--n から全部決める', 'rotate の指針'],
      stage: `<div class="stage stage-dial" aria-hidden="true">\n  <div class="fx-dial"><div class="knob"></div><div class="val"></div></div>\n</div>`,
      desc: '音量のようなつまみ。弧の塗り・指針の角度・中央の数字がすべて 1 つの <code>--n</code> から計算されるので、JS は角度から <code>--n</code> を出すだけでよい。',
    },
    {
      id: 'slide-unlock', accent: 'mint', title: 'スライドして確定', en: 'Slide to Confirm',
      tags: ['knob の translate', '文字に光を通す', '端で色が変わる'],
      stage: `<div class="stage stage-unlock" aria-hidden="true">\n  <div class="fx-su"><span class="txt">スライドして確定</span><span class="txt done">確定しました</span><div class="knob">›</div></div>\n</div>`,
      desc: 'つまみを右端まで引くと緑に変わって文字が切り替わる。待機中の文字は <code>background-clip: text</code> で光を通して「引ける」ことを示す。',
    },
  ],
};
