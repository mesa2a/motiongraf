# CSS MOTION GRAPHICS

Web デザインでそのまま使える CSS モーションのカタログ。JavaScript はクラスの付け外しとコード表示にだけ使っています。

`index.html` をブラウザで開くだけで動きます（フォントは Google Fonts を読み込むためオンライン推奨）。

## 構成

```
index.html        生成物（src/ から build.js で作る。直接編集しない）
css/style.css     ページ全体のデザイン
js/main.js        再生制御・コード表示・コピー
src/
  build.js        index.html を生成する   → node src/build.js
  template.html   ページの骨組み（ヒーロー、コツ、使い方、フッター）
  cards.js        カタログの定義（カテゴリ、カードの順番、説明文、デモの HTML）
  cards-extra.js  追加分のカード（カテゴリ id ごとの配列。各カテゴリ末尾に足される）
  blocks/*.css    演出の CSS。ファイル名が id、または /* @@ id */ で複数まとめて書ける
  cards.extracted.json  旧版から取り込んだカード情報（cards.js から参照）
```

## 演出を追加する

1. `src/blocks/` に CSS を書く。`.stage.play` の下でだけアニメーションが動くようにし、時間は `calc(Xs / var(--speed))`、寸法は `cqi` で書く。
2. `src/cards.js` の該当カテゴリに `{ id, accent, title, en, tags, stage, desc }` を追加する。`id` は CSS ブロックの id と同じにする。
3. `node src/build.js` を実行する。通し番号と本数は自動で更新される。

## カテゴリを外す / 戻す

`src/build.js` の先頭にある `EXCLUDE` 配列に入れたカテゴリ id はカタログから外れる（CSS ブロックは残る）。いまは `cat-ui`（ナビ・UI 部品）を外している。戻したい時は配列から消して、`src/blocks/` に UI 用の CSS ブロック（git の履歴から復元）を置く。

## 約束ごと

- `.stage` は 16:9 の `container-type: inline-size`。`1cqi` = 箱の幅の 1%。
- ホバー系は「実装用の `:hover` + `transition`」と「デモ用の自動再生 `@keyframes`」を両方書き、後者には `/* ---- デモ用の自動再生 ---- */` と注記する。
- かっこいい系（暗いステージ）は `tone: 'cool'` にし、stage のクラスに `cool` を足す。
- `prefers-reduced-motion: reduce` のときは自動再生せず、「もういちど」を押した時だけ動く。
