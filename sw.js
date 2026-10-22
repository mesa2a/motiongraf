/* Service Worker — オフラインでも開けるように、同じオリジンのファイルをキャッシュする。
   http(s) で配信したときだけ登録される（file:// では動かない）。
   CACHE の名前を変えると古いキャッシュが捨てられる。ビルドのたびに index.html は更新されるので、
   ネットワーク優先（取れたらキャッシュ更新、取れなければキャッシュ）にしている。 */
const CACHE = 'css-motion-v1';
const PRECACHE = ['./', './index.html', './css/style.css', './js/main.js', './manifest.json', './img/icon-192.png', './img/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;   /* フォントなど外部はブラウザに任せる */
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then((hit) => hit || caches.match('./index.html')))
  );
});
