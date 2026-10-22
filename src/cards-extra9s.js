// 追加分その 9s：見出し 1 本、UI 1 本（300 本目まで）
const blk = ['S', 'T', 'A', 'C', 'K'].map((l, i) => `<b style="--i:${i}; --c:${['#ff8fb8', '#8fd0ff', '#c9b8ff', '#6fd3b3', '#f5c542'][i]}">${l}</b>`).join('');

module.exports = {
  'cat-hero': [
    {
      id: 'block-stack-text', accent: 'yellow', title: '積み木のように積まれる文字', en: 'Block Stack',
      tags: ['上から落とす', '着地で scale(1.12, .82)', '--i × .14s'],
      stage: `<div class="stage stage-blocks" aria-hidden="true">\n  <div class="fx-blk">${blk}</div>\n</div>`,
      desc: '色つきのブロックに乗った文字が、左から順に上から落ちてきて並ぶ。着地の瞬間に少しつぶすと重さが出る。落ちる側は加速、つぶれてから戻る側は減速で。',
    },
  ],
  'cat-ui': [
    {
      id: 'notification-snooze', accent: 'lavender', title: '通知のスヌーズ', en: 'Snooze Swipe',
      tags: ['右へ滑らせると下に「あとで」', 'しきい値で飛ばす', 'トースト → 戻る'],
      stage: `<div class="stage stage-snooze" aria-hidden="true">\n  <div class="fx-snz"><div class="under">あとで</div><div class="ntf"><i>🔔</i><div><b>ミーティングの 10 分前です</b><small>14:50 ・ 3 階 会議室 B</small></div></div><div class="toast">1 時間後にもう一度お知らせします</div></div>\n</div>`,
      desc: '通知を右へ滑らせると下から「あとで」が見え、離すと通知が飛んでトーストが出て、少ししてから戻ってくる。スワイプで削除の「消さない版」。',
    },
  ],
};
