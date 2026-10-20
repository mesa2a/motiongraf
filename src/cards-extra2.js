// 追加分その 2：画面転換とエフェクト
const AB = (extraA = '', extraB = '') => `<div class="fx-scene a${extraA}">A</div>\n  <div class="fx-scene b${extraB}">B</div>`;

// モザイク用：8×5 のタイルに擬似ランダムな順番を振る
const mosaicTiles = (() => {
  const n = 40; const order = Array.from({ length: n }, (_, i) => i);
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return order.map((d) => `<i style="--d:${d}"></i>`).join('');
})();

module.exports = {
  'cat-trans': [
    {
      id: 'circle-corner', accent: 'blue', title: '角から広がる円', en: 'Circle from Corner',
      tags: ['clip-path: circle()', 'at 0 0', '中心も補間'],
      stage: `<div class="stage stage-circ" aria-hidden="true">\n  ${AB('', ' circ')}\n</div>`,
      desc: '左上の点から円が広がって次の画面になり、右下へ縮んで消える。<code>circle()</code> の中心位置も補間されるので、開く角と閉じる角を変えられる。',
    },
    {
      id: 'diamond', accent: 'lavender', title: 'ひし形ワイプ', en: 'Diamond Wipe',
      tags: ['polygon 4 頂点', '中心から外へ'],
      stage: `<div class="stage stage-diamond" aria-hidden="true">\n  ${AB('', ' diamond')}\n</div>`,
      desc: '中心に潰した 4 頂点を、上下左右へ画面の外まで押し出す。頂点は画面の外に置いてよい。閉じる時はまた中心へ。',
    },
    {
      id: 'split-doors', accent: 'pink', title: '観音開き', en: 'Split Doors',
      tags: ['clip-path: inset()', '2 枚に複製', 'translate'],
      stage: `<div class="stage stage-doors" aria-hidden="true">\n  <div class="fx-scene b">B</div>\n  <div class="fx-scene a fx-door l">A</div>\n  <div class="fx-scene a fx-door r">A</div>\n</div>`,
      desc: '今の画面を 2 枚複製し、左半分と右半分を <code>inset()</code> で切り出して左右へ開く。文字も真ん中で割れるので「扉が開く」ように見える。',
    },
    {
      id: 'page-turn', accent: 'blue', title: 'ページめくり', en: 'Page Turn',
      tags: ['rotateY -180deg', 'transform-origin: left', 'backface-visibility'],
      stage: `<div class="stage stage-pageturn" aria-hidden="true">\n  <div class="fx-scene b">B</div>\n  <div class="fx-persp"><div class="fx-scene a fx-pt">A</div></div>\n</div>`,
      desc: '今の画面を左端を軸に裏返す。裏向きになったら <code>backface-visibility: hidden</code> で消え、下の画面が残る。<code>perspective</code> を持つ箱の中で回す。',
    },
    {
      id: 'mosaic', accent: 'pink', title: 'モザイク', en: 'Mosaic',
      tags: ['8×5 のタイル', '--d でランダム順', 'scale 0 → 1'],
      stage: `<div class="stage stage-mosaic" aria-hidden="true">\n  ${AB('', ' swap')}\n  <div class="fx-mosaic">${mosaicTiles}</div>\n</div>`,
      desc: 'タイルがばらばらの順番で現れて画面を埋め、裏で差し替えて、ばらばらに消える。順番は HTML 側の <code>--d</code> で決める（ビルド時に擬似乱数で振っている）。',
    },
    {
      id: 'glitch-trans', accent: 'lavender', tone: 'cool', title: 'グリッチ切り替え', en: 'Glitch Transition',
      tags: ['steps(1)', 'inset() の帯', '3 色のレイヤー'],
      stage: `<div class="stage stage-gt cool" aria-hidden="true">\n  ${AB('', ' swap')}\n  <div class="fx-gl c1"></div><div class="fx-gl c2"></div><div class="fx-gl c3"></div>\n</div>`,
      desc: '切り替わる瞬間だけ、色付きの帯が数コマ飛び飛びに走る。帯は <code>inset()</code> で横に切った 3 枚のレイヤーを <code>steps(1)</code> で点滅させるだけ。',
    },
    {
      id: 'light-leak', accent: 'yellow', title: '光漏れ', en: 'Light Leak',
      tags: ['mix-blend-mode: screen', 'filter: blur()', '通過中に差し替え'],
      stage: `<div class="stage stage-leak" aria-hidden="true">\n  ${AB('', ' swap')}\n  <div class="fx-leak"></div>\n</div>`,
      desc: 'フィルムの光漏れ風。暖色の光の帯を <code>screen</code> で重ねて左から右へ通し、いちばん明るい瞬間に画面を差し替える。',
    },
    {
      id: 'ripple-mask', accent: 'blue', title: '波紋で広がる', en: 'Ripple Reveal',
      tags: ['clip-path: circle()', '輪が先行', 'scale 60'],
      stage: `<div class="stage stage-ripple" aria-hidden="true">\n  ${AB('', ' ripple')}\n  <div class="fx-rp r1"></div><div class="fx-rp r2"></div>\n</div>`,
      desc: '中心から円が広がるのと同時に、白い輪を 2 本先行させると水面の波紋に見える。輪は小さな円を <code>scale</code> で 60 倍に。',
    },
    {
      id: 'push', accent: 'pink', title: '押し出し', en: 'Push',
      tags: ['2 枚が同時に移動', 'translate 100%', 'スライド切替'],
      stage: `<div class="stage stage-push" aria-hidden="true">\n  ${AB(' pushout', ' pushin')}\n</div>`,
      desc: '新しい画面が右から入ってきて、古い画面を左へ押し出す。2 枚を同じカーブ・同じ時間で動かすのがコツ。スライドショーの基本。',
    },
    {
      id: 'flip-scene', accent: 'lavender', title: '画面ごと裏返す', en: 'Flip Scene',
      tags: ['preserve-3d', 'backface-visibility', 'rotateY 180deg'],
      stage: `<div class="stage stage-flipscene" aria-hidden="true">\n  <div class="fx-persp"><div class="fx-flip3d">${AB()}</div></div>\n</div>`,
      desc: 'カードフリップの画面版。表に A、裏に B を貼った板を回す。<code>perspective</code> の値を小さくするほど奥行きが強く出る。',
    },
    {
      id: 'fold', accent: 'pink', title: '折りたたみ', en: 'Fold',
      tags: ['4 枚のパネル', 'origin を交互に', 'rotateY ±90deg'],
      stage: `<div class="stage stage-fold" aria-hidden="true">\n  <div class="fx-scene a">A</div>\n  <div class="fx-persp"><div class="fx-fold"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i></div></div>\n  <div class="fx-fold-label">B</div>\n</div>`,
      desc: '地図を広げるように、縦 4 枚のパネルが左から順に開く。パネルの支点を左右交互にして、±90° から 0° へ。',
    },
    {
      id: 'curtain-up', accent: 'pink', title: '幕が上がる', en: 'Curtain Up',
      tags: ['scaleY', 'transform-origin: top', 'スカラップの裾'],
      stage: `<div class="stage stage-curtainup" aria-hidden="true">\n  ${AB('', ' swap')}\n  <div class="fx-cu"></div><div class="fx-valance"></div>\n</div>`,
      desc: '舞台の幕。縦縞の布を <code>scaleY</code> で上へ縮めると、裾のスカラップごと持ち上がる。上がりきっている間に裏を差し替える。',
    },
  ],
  'cat-fx': [
    {
      id: 'rain', accent: 'blue', title: '雨', en: 'Rain',
      tags: ['線のタイル', 'skewX で斜めに', 'background-position'],
      stage: `<div class="stage stage-rain" aria-hidden="true">\n  <div class="fx-rain"></div>\n  <div class="fx-rain-ground"></div>\n</div>`,
      desc: '細い縦線のタイルを 2 層、速さを変えて下へ流す。要素ごと <code>skewX</code> で傾けると風のある雨になる。粒の要素は 1 つも作らない。',
    },
    {
      id: 'lightning', accent: 'lavender', tone: 'cool', title: '稲光', en: 'Lightning',
      tags: ['clip-path で稲妻', 'steps(1) の点滅', '白フラッシュ'],
      stage: `<div class="stage stage-lightning cool" aria-hidden="true">\n  <div class="fx-bolt"></div>\n  <div class="fx-flash"></div>\n</div>`,
      desc: '稲妻は <code>polygon()</code> で描いた白い形。<code>steps(1)</code> で数コマだけ出して、同時に画面全体を白くする。間を長く取るほど「来た！」感が出る。',
    },
    {
      id: 'fireflies', accent: 'yellow', title: 'ホタル', en: 'Fireflies',
      tags: ['box-shadow の発光', '2 つの animation', '負の delay'],
      stage: `<div class="stage stage-fireflies" aria-hidden="true">\n  <i class="fx-ff" style="--x:12; --y:30; --d:0"></i><i class="fx-ff" style="--x:28; --y:18; --d:1.3"></i><i class="fx-ff" style="--x:44; --y:40; --d:2.6"></i><i class="fx-ff" style="--x:60; --y:22; --d:.7"></i><i class="fx-ff" style="--x:72; --y:44; --d:3.4"></i><i class="fx-ff" style="--x:86; --y:28; --d:1.9"></i><i class="fx-ff" style="--x:20; --y:48; --d:4.2"></i><i class="fx-ff" style="--x:52; --y:12; --d:2.2"></i>\n</div>`,
      desc: '黄色い点に <code>box-shadow</code> で光をまとわせ、ゆっくり漂いながら明滅させる。漂う動きと明滅を別のアニメーションにして周期をずらす。',
    },
    {
      id: 'shooting-star', accent: 'blue', title: '流れ星', en: 'Shooting Star',
      tags: ['gradient の尾', 'rotate 30deg', 'ease-in'],
      stage: `<div class="stage stage-shooting" aria-hidden="true">\n  <i class="fx-ss" style="--x:70; --y:4;  --d:0"></i><i class="fx-ss" style="--x:95; --y:14; --d:1.6"></i><i class="fx-ss" style="--x:50; --y:0;  --d:3.1"></i>\n</div>`,
      desc: '透明から白へのグラデーションを 30° 傾け、傾きに沿って斜め下へ走らせる。先端に光る点を付ける。<code>ease-in</code> で加速させると落ちていく感じに。',
    },
    {
      id: 'speedlines-h', accent: 'orange', tone: 'cool', title: '横の流線', en: 'Speed Lines',
      tags: ['4 層の線', 'background-position-x', 'skewX の文字'],
      stage: `<div class="stage stage-speedlines cool" aria-hidden="true">\n  <div class="fx-slh"></div>\n  <div class="fx-slh-text">GO!!</div>\n</div>`,
      desc: '長さの違う横線を 4 層、それぞれタイル 1 枚分だけ左へ流すとスピード感が出る。文字は少し傾けて小刻みに揺らす。',
    },
    {
      id: 'screen-shake', accent: 'pink', title: '画面の揺れ', en: 'Screen Shake',
      tags: ['小刻み → 大きく → 減衰', 'translate + rotate', '.fx-cam'],
      stage: `<div class="stage stage-quake" aria-hidden="true">\n  <div class="fx-cam"><div class="fx-quake-text">ドドド…</div></div>\n</div>`,
      desc: '揺れの基本形。最初は小刻みに、次に大きく、最後は減衰して元の位置へ。画面全体を包む要素を揺らすと「カメラ」の揺れになる。',
    },
    {
      id: 'camera-flash', accent: 'yellow', title: 'カメラのフラッシュ', en: 'Camera Flash',
      tags: ['白フラッシュ', '周辺減光', 'filter で写真っぽく'],
      stage: `<div class="stage stage-camflash" aria-hidden="true">\n  <div class="fx-cf-photo fx-photo"></div>\n  <div class="fx-flash"></div>\n  <div class="fx-cf-frame"></div>\n</div>`,
      desc: 'パシャッと光って、一瞬止まって、少し色あせた「撮れた写真」になる。フラッシュのあとに <code>filter</code> と周辺減光を乗せるのがポイント。',
    },
    {
      id: 'spotlight', accent: 'lavender', tone: 'cool', title: 'スポットライト', en: 'Spotlight',
      tags: ['mask: radial-gradient', 'mask-size 200%', 'mask-position'],
      stage: `<div class="stage stage-spot cool" aria-hidden="true">\n  <div class="fx-spot">SHOW TIME</div>\n</div>`,
      desc: '暗い画面の一部だけ丸く照らす。マスクを要素の 2 倍の大きさにしておき、<code>mask-position</code> を動かすと光の位置が変わる。',
    },
    {
      id: 'scanlines', accent: 'blue', tone: 'cool', title: '走査線', en: 'Scanlines',
      tags: ['repeating-linear-gradient', '明るい帯が流れる', 'ちらつき'],
      stage: `<div class="stage stage-scan cool" aria-hidden="true">\n  <div class="fx-scan-text">SIGNAL</div>\n  <div class="fx-scan"></div>\n  <div class="fx-scan-band"></div>\n</div>`,
      desc: 'ブラウン管風。細い横縞を重ね、明るい帯を上から下へ流し、文字をたまにちらつかせる。レトロなゲーム風サイトに。',
    },
    {
      id: 'smoke', accent: 'blue', title: '煙', en: 'Smoke',
      tags: ['filter: blur()', '広がりながら薄く', '負の delay'],
      stage: `<div class="stage stage-smoke" aria-hidden="true">\n  <i class="fx-smoke" style="--x:-6; --d:0"></i><i class="fx-smoke" style="--x:4; --d:1.2"></i><i class="fx-smoke" style="--x:-2; --d:2.4"></i><i class="fx-smoke" style="--x:8; --d:3.6"></i><i class="fx-smoke" style="--x:0; --d:4.3"></i>\n</div>`,
      desc: 'ぼかした灰色の丸を、上るにつれて大きく薄くする。5 個を位相ずらしで回すと途切れない煙になる。湯気やコーヒーの演出にも。',
    },
    {
      id: 'charge', accent: 'lavender', tone: 'cool', title: 'エネルギーチャージ', en: 'Charge',
      tags: ['外周から中心へ', 'ease-in で加速', '集まったら爆発'],
      stage: `<div class="stage stage-charge cool" aria-hidden="true">\n  <div class="fx-ch"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i><i style="--i:7"></i><i style="--i:8"></i><i style="--i:9"></i><i style="--i:10"></i><i style="--i:11"></i></div>\n  <div class="fx-ch-core"></div>\n  <div class="fx-ch-ring"></div>\n  <div class="fx-flash"></div>\n</div>`,
      desc: '紙吹雪バーストの逆再生。12 個の光が外周から中心へ加速しながら集まり、芯が一度縮んでから弾ける。溜め → 解放の形。',
    },
    {
      id: 'countdown', accent: 'orange', tone: 'cool', title: 'カウントダウン', en: 'Countdown',
      tags: ['grid-area で重ねる', '--i で 1 秒ずつ', 'scale 2.2 → 1'],
      stage: `<div class="stage stage-countdown cool" aria-hidden="true">\n  <div class="fx-cd-ring"></div>\n  <div class="fx-cd"><b style="--i:0">3</b><b style="--i:1">2</b><b style="--i:2">1</b><b class="go" style="--i:3">GO!</b></div>\n</div>`,
      desc: '3、2、1、GO! を同じ場所に重ね、1 秒ずつ遅らせて順番に出す。大きい状態から等倍に収まる動きで「ドン」と置く。',
    },
    {
      id: 'lens-flare', accent: 'yellow', title: 'レンズフレア', en: 'Lens Flare',
      tags: ['光源と同じ線上', '--k で位置', 'alternate'],
      stage: `<div class="stage stage-flare" aria-hidden="true">\n  <div class="fx-flare"><i class="streak"></i><i class="sun"></i><i style="--s:3; --k:1"></i><i style="--s:6; --k:2.2"></i><i style="--s:2; --k:3"></i><i style="--s:9; --k:4.4"></i><i style="--s:4; --k:5.6"></i></div>\n</div>`,
      desc: '光源から対角線上に、大きさの違う丸い光を並べる。光源ごと動かすと、丸も同じ線上を動いてレンズのゴーストに見える。',
    },
    {
      id: 'wind', accent: 'blue', title: '風', en: 'Wind',
      tags: ['border-top の弧', '左→右', '負の delay'],
      stage: `<div class="stage stage-wind" aria-hidden="true">\n  <i class="fx-wind" style="--y:10; --d:0"></i><i class="fx-wind" style="--y:24; --d:.8"></i><i class="fx-wind" style="--y:36; --d:1.6"></i><i class="fx-wind" style="--y:46; --d:.4"></i>\n</div>`,
      desc: '角丸の要素に上の線だけ引くと弧になる。それを左から右へすっと通すと風の線。4 本を位相ずらしで。',
    },
  ],
};
