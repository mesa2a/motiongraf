/* ============================================================
   main.js — 再生制御・コード表示・コピー・検索・お気に入り・折りたたみ
   アニメーション自体は CSS だけで動く。ここではクラスの付け外しと、
   <style id="motions-src"> から各演出のコードを切り出す処理、
   それにカタログを探しやすくする UI だけ。
   ============================================================ */
(() => {
  'use strict';

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  /* localStorage は使えない環境（プライベートモードなど）でも落ちないように */
  const store = {
    get(key, fallback) { try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 保存できなくても動く */ } },
  };

  /* ---- 1) <style> を「@@ id」コメントで区切って id → CSS の辞書にする ---- */
  const src = (document.getElementById('motions-src') || {}).textContent || '';
  const blocks = {};
  {
    const re = /\/\*\s*@@\s*([\w-]+)\s*\*\//g;
    let m, prev = null;
    while ((m = re.exec(src))) {
      if (prev) blocks[prev.id] = src.slice(prev.end, m.index).trim();
      prev = { id: m[1], end: re.lastIndex };
    }
    if (prev) blocks[prev.id] = src.slice(prev.end).trim();
  }

  /* ---- 2) stage の HTML を整形して取り出す ---- */
  function stageHtml(stage) {
    const clone = stage.cloneNode(true);
    clone.removeAttribute('aria-hidden');
    const lines = clone.outerHTML.split('\n').filter((l) => l.trim() !== '');
    const indents = lines.slice(1).map((l) => l.match(/^\s*/)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l, i) => (i === 0 ? l : l.slice(min))).join('\n');
  }

  /* ---- 3) カードごとにボタンとコードパネルを生成 ---- */
  const favs = new Set(store.get('motion-favs', []));   /* Set は追加順を保つので、この順がお気に入りの並び順 */
  const codeOf = new Map();
  const COMMON = /\b(fx-flash|fx-cam|fx-scene|fx-persp|fx-label|fx-btn|fx-photo|fx-card-ui)\b/;
  $$('.card[data-id]').forEach((card) => {
    const id = card.dataset.id;
    const stage = card.querySelector('.stage');
    const isCommon = id === '_common';
    let code = '';
    if (stage && !isCommon) {
      const html = stageHtml(stage);
      code += '/* HTML\n' + html + ' */\n';
      if (COMMON.test(html)) code += '/* .stage やデモ用ボタンなどの土台は「共通パーツ」の CSS も一緒に */\n';
      code += '\n';
    }
    code += blocks[id] || '/* コードが見つかりません */';

    const actions = document.createElement('div');
    actions.className = 'card-actions';
    actions.innerHTML =
      (stage && !isCommon ? '<button class="btn btn-sm btn-replay" type="button">▶ もういちど</button>' : '') +
      '<button class="btn btn-sm btn-code" type="button" aria-expanded="false">{ } コード</button>' +
      (isCommon ? '' : `<button class="btn btn-sm btn-fav" type="button" aria-pressed="${favs.has(id)}">${favs.has(id) ? '♥' : '♡'} お気に入り</button>` +
        '<button class="btn btn-sm btn-share" type="button" title="このカードへのリンクをコピー">⤴ リンク</button>' +
        (stage ? '<button class="btn btn-sm btn-big" type="button" title="デモを大きく見る">⤢ 大きく</button>' : ''));

    const panel = document.createElement('div');
    panel.className = 'code-panel';
    panel.hidden = true;
    panel.innerHTML = '<button class="btn-copy" type="button">コピー</button><pre><code class="lang-css"></code></pre>';
    codeOf.set(card, code);   /* ハイライトは重いので、パネルを開いたときに初めて行う */

    card.append(actions, panel);

    /* 検索用のテキスト（タイトル・英名・タグ・説明・id） */
    if (!isCommon) {
      card.classList.toggle('is-fav', favs.has(id));
      card.dataset.search = [
        id, card.querySelector('.card-title')?.textContent, ...$$('.card-tags li', card).map((l) => l.textContent), card.querySelector('.card-desc')?.textContent,
      ].join(' ').toLowerCase();
    }
  });

  /* ---- 4) 本数の表示 ---- */
  const cards = $$('.card[data-id]').filter((c) => c.dataset.id !== '_common');

  /* ---- 4b) 似ている演出：タグと英名の単語が共通するカードを 3 本まで ---- */
  {
    /* タグ・英名は「語」に分ける。説明文からはカタカナ語と英数字の語（translate、clip-path など）だけを拾う */
    const STOP = new Set(['css', 'html', 'js', 'the', 'and', 'with', 'for', 'to', 'of', 'in', 'on', 'cqi', 'calc', 'var', 'animation', 'キーフレーム', 'アニメーション', 'デモ', 'ボタン', 'カード', 'クリック', 'ホバー', 'スクロール', 'ページ', 'サイト', 'ユーザー']);
    const tok = (s) => s.toLowerCase().split(/[^a-z0-9ぁ-んァ-ヶ一-龠ー\-]+/).filter((w) => w.length >= 2 && !STOP.has(w) && !/^(の|で|を|に|は|と|が|から|まで|だけ|ごと|と同時に)$/.test(w));
    const descWords = (s) => (s.toLowerCase().match(/[a-z][a-z0-9\-]{2,}|[ァ-ヶー]{3,}/g) || []).filter((w) => !STOP.has(w));
    const info = cards.map((c) => {
      const tags = $$('.card-tags li', c).map((l) => l.textContent);
      const en = c.querySelector('.card-title small')?.textContent || '';
      const desc = c.querySelector('.card-desc')?.textContent || '';
      return { c, tags: new Set(tags.map((t) => t.trim().toLowerCase())), words: new Set(tok(tags.join(' ') + ' ' + en)), dwords: new Set(descWords(desc)), cat: c.closest('.cat')?.id };
    });
    info.forEach((a) => {
      const scored = [];
      for (const b of info) {
        if (b === a) continue;
        let s = 0;
        for (const t of a.tags) if (b.tags.has(t)) s += 3;
        for (const w of a.words) if (b.words.has(w)) s += 1;
        let d = 0;
        for (const w of a.dwords) if (b.dwords.has(w) || b.words.has(w)) d += .5;
        s += Math.min(d, 2);   /* 説明文の一致は最大 2 点まで */
        if (b.cat === a.cat) s += .5;
        if (s >= 2) scored.push([s, b]);
      }
      scored.sort((x, y) => y[0] - x[0]);
      const top = scored.slice(0, 3);
      if (!top.length) return;
      const box = document.createElement('p');
      box.className = 'card-related';
      box.innerHTML = '似ている: ' + top.map(([, b]) => {
        const no = b.c.querySelector('.card-no')?.dataset.no || '';
        const title = b.c.querySelector('.card-title')?.firstChild?.textContent?.trim() || b.c.dataset.id;
        return `<a href="#m-${b.c.dataset.id}"><b>${no}</b>${title}</a>`;
      }).join('');
      a.c.querySelector('.card-actions').before(box);
    });
  }
  $$('[data-count]').forEach((el) => { el.textContent = String(cards.length); });
  const updateFavCount = () => $$('[data-fav-count]').forEach((el) => { el.textContent = String(favs.size); });
  updateFavCount();

  /* ---- 5) 画面に入った演出だけ再生する ---- */
  if (reduceMotion.matches) {
    document.body.classList.add('reduce');
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('play', e.isIntersecting);
    }, { threshold: 0.2 });
    $$('.stage').forEach((s) => io.observe(s));
  }

  /* ---- 6) 検索・絞り込み ---- */
  const q = document.getElementById('q');
  const clearBtn = document.querySelector('.tool-clear');
  const favBtn = document.getElementById('tool-fav');
  const coolBtn = document.getElementById('tool-cool');
  const noResults = document.querySelector('.no-results');
  const state = { q: '', fav: false, cool: false, sort: 'std' };

  function applyFilter() {
    const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    cards.forEach((card) => {
      const ok = terms.every((t) => card.dataset.search.includes(t))
        && (!state.fav || favs.has(card.dataset.id))
        && (!state.cool || card.dataset.tone === 'cool');
      card.hidden = !ok;
      if (ok) shown++;
    });
    $$('.cat').forEach((cat) => {
      const n = $$('.card:not([hidden])', cat).length;
      cat.classList.toggle('is-empty', n === 0);
      const el = cat.querySelector('[data-cat-shown]');
      if (el) el.textContent = String(n);
    });
    $$('[data-shown]').forEach((el) => { el.textContent = String(shown); });
    if (noResults) noResults.hidden = shown > 0;
    document.body.classList.toggle('is-filtering', terms.length > 0 || state.fav || state.cool);
    if (clearBtn) clearBtn.hidden = !state.q;
    if (favBtn) favBtn.setAttribute('aria-pressed', String(state.fav));
    if (coolBtn) coolBtn.setAttribute('aria-pressed', String(state.cool));
    syncUrl();
  }

  /* 並び替え（カテゴリの中だけで入れ替える。番号は固定なので順番が変わっても追える） */
  const sortSel = document.getElementById('sort');
  function applySort() {
    const mode = state.sort;
    const key = (c) => Number(c.querySelector('.card-no')?.dataset.no || 0);
    $$('.grid').forEach((grid) => {
      const list = $$('.card', grid);
      const order = [...favs];
      const favIdx = (c) => { const i = order.indexOf(c.dataset.id); return i < 0 ? Infinity : i; };
      list.sort((a, b) => {
        if (mode === 'fav') { const d = favIdx(a) - favIdx(b); if (d) return d; }
        return mode === 'new' ? key(b) - key(a) : key(a) - key(b);
      });
      list.forEach((c) => grid.appendChild(c));
    });
    if (sortSel) sortSel.value = mode;
    syncUrl();
  }
  sortSel?.addEventListener('change', () => { state.sort = sortSel.value; applySort(); });

  /* 検索語と絞り込みを URL に反映する（?q=…&fav=1&cool=1&sort=…）。共有やリロードで復元できる */
  function syncUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.fav) p.set('fav', '1');
    if (state.cool) p.set('cool', '1');
    if (state.sort && state.sort !== 'std') p.set('sort', state.sort);
    const qs = p.toString();
    const url = location.pathname + (qs ? '?' + qs : '') + location.hash;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, '', url);
  }
  {
    const p = new URLSearchParams(location.search);
    state.q = (p.get('q') || '').trim();
    state.fav = p.get('fav') === '1';
    state.cool = p.get('cool') === '1';
    state.sort = ['fav', 'new'].includes(p.get('sort')) ? p.get('sort') : 'std';
    if (q) q.value = state.q;
  }

  if (q) {
    let timer = 0;
    q.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = q.value.trim(); applyFilter(); }, 120);
    });
    q.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { q.value = ''; state.q = ''; applyFilter(); } });
    /* 「/」で検索にフォーカス（入力中は除く） */
    document.addEventListener('keydown', (ev) => {
      if (ev.key !== '/' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      ev.preventDefault();
      q.focus();
      q.select();
    });
  }
  clearBtn?.addEventListener('click', () => { q.value = ''; state.q = ''; applyFilter(); q.focus(); });
  favBtn?.addEventListener('click', () => { state.fav = !state.fav; applyFilter(); });
  coolBtn?.addEventListener('click', () => { state.cool = !state.cool; applyFilter(); });

  /* お気に入りの書き出し（番号・タイトル・リンクのリストをコピー） */
  document.getElementById('tool-export')?.addEventListener('click', async (ev) => {
    const btn = ev.currentTarget;
    const base = location.href.replace(/[?#].*$/, '');
    const lines = cards.filter((c) => favs.has(c.dataset.id)).map((c) => {
      const no = c.querySelector('.card-no')?.dataset.no || '';
      const title = c.querySelector('.card-title')?.firstChild?.textContent?.trim() || c.dataset.id;
      return `${no} ${title}  ${base}#m-${c.dataset.id}`;
    });
    const text = lines.length ? `CSS MOTION GRAPHICS お気に入り（${lines.length} 本）\n` + lines.join('\n') : 'お気に入りはまだありません';
    await copyText(text);
    const label = btn.textContent;
    btn.textContent = lines.length ? 'コピーしました' : 'お気に入りなし';
    setTimeout(() => { btn.textContent = label; }, 1400);
  });

  /* お気に入りの CSS をまとめて 1 ファイルにダウンロード（共通パーツ + 各ブロック、HTML はコメントで） */
  document.getElementById('tool-bundle')?.addEventListener('click', (ev) => {
    const btn = ev.currentTarget;
    const picked = cards.filter((c) => favs.has(c.dataset.id));
    if (!picked.length) { flash(btn, 'お気に入りなし'); return; }
    const parts = [
      `/* CSS MOTION GRAPHICS — お気に入り ${picked.length} 本（${new Date().toISOString().slice(0, 10)}）*/`,
      '/* cqi は .stage（container-type: inline-size）の幅の 1%。自分のサイトでは px / rem に読み替えてください */',
      '',
      '/* ===== 共通パーツ ===== */',
      blocks._common || '',
    ];
    picked.forEach((c) => {
      const title = c.querySelector('.card-title')?.firstChild?.textContent?.trim() || c.dataset.id;
      const stage = c.querySelector('.stage');
      parts.push('', `/* ===== ${c.querySelector('.card-no')?.dataset.no || ''} ${title} (${c.dataset.id}) ===== */`);
      if (stage) parts.push('/* HTML\n' + stageHtml(stage) + ' */');
      parts.push(blocks[c.dataset.id] || '');
    });
    const blob = new Blob([parts.join('\n') + '\n'], { type: 'text/css' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'css-motion-favorites.css';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    flash(btn, `${picked.length} 本を保存`);
  });
  function flash(btn, text) {
    const label = btn.textContent;
    btn.textContent = text;
    setTimeout(() => { btn.textContent = label; }, 1400);
  }

  /* キーボードでカードを移動：j / k で次・前、c コード、f お気に入り、r もういちど、l リンク */
  let cur = -1;
  cards.forEach((c) => { c.tabIndex = -1; });
  function visibleCards() { return cards.filter((c) => !c.hidden && !c.closest('.cat')?.classList.contains('is-collapsed')); }
  function focusCard(card) {
    $$('.card.is-focus').forEach((c) => c.classList.remove('is-focus'));
    card.classList.add('is-focus');
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const t = ev.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    const list = visibleCards();
    if (!list.length) return;
    const focused = document.activeElement?.closest?.('.card');
    if (focused) cur = list.indexOf(focused);
    if (ev.key === 'j' || ev.key === 'k') {
      ev.preventDefault();
      cur = ev.key === 'j' ? Math.min(cur + 1, list.length - 1) : Math.max(cur - 1, 0);
      focusCard(list[cur]);
      return;
    }
    const card = list[cur];
    if (!card || !focused) return;
    const click = (sel) => card.querySelector(sel)?.click();
    if (ev.key === 'c' || ev.key === 'Enter') { ev.preventDefault(); click('.btn-code'); }
    if (ev.key === 'f') { ev.preventDefault(); click('.btn-fav'); }
    if (ev.key === 'r') { ev.preventDefault(); click('.btn-replay'); }
    if (ev.key === 'l') { ev.preventDefault(); click('.btn-share'); }
  });
  document.addEventListener('focusout', (ev) => {
    const card = ev.target?.closest?.('.card');
    if (card && !card.contains(ev.relatedTarget)) card.classList.remove('is-focus');
  });

  /* お気に入りの並び替え（ダイアログ内でドラッグ、または ▲▼） */
  const favDlg = document.getElementById('favlist');
  function favCards() { return [...favs].map((id) => cards.find((c) => c.dataset.id === id)).filter(Boolean); }
  function renderFavList() {
    const ul = favDlg.querySelector('ul');
    const list = favCards();
    ul.innerHTML = list.length ? list.map((c, i) => {
      const no = c.querySelector('.card-no')?.dataset.no || '';
      const title = c.querySelector('.card-title')?.firstChild?.textContent?.trim() || c.dataset.id;
      return `<li draggable="true" data-id="${c.dataset.id}"><span class="fav-grip" aria-hidden="true">⋮⋮</span><b>${no}</b><span class="fav-title">${title}</span><span class="fav-btns"><button type="button" class="fav-up" aria-label="上へ" ${i === 0 ? 'disabled' : ''}>▲</button><button type="button" class="fav-down" aria-label="下へ" ${i === list.length - 1 ? 'disabled' : ''}>▼</button><button type="button" class="fav-del" aria-label="外す">×</button></span></li>`;
    }).join('') : '<li class="fav-empty">お気に入りはまだありません。カードの ♡ で追加できます。</li>';
  }
  function setFavOrder(ids) {
    favs.clear();
    ids.forEach((id) => favs.add(id));
    store.set('motion-favs', ids);
    renderFavList();
    if (state.sort === 'fav') applySort();
  }
  document.getElementById('tool-favlist')?.addEventListener('click', () => { if (favDlg?.showModal) { renderFavList(); favDlg.showModal(); } });
  favDlg?.addEventListener('click', (ev) => {
    if (ev.target === favDlg) { favDlg.close(); return; }
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.classList.contains('btn-modal-close')) { favDlg.close(); return; }
    const li = b.closest('li[data-id]');
    if (!li) return;
    const ids = [...favs];
    const i = ids.indexOf(li.dataset.id);
    if (b.classList.contains('fav-up') && i > 0) [ids[i - 1], ids[i]] = [ids[i], ids[i - 1]];
    if (b.classList.contains('fav-down') && i < ids.length - 1) [ids[i + 1], ids[i]] = [ids[i], ids[i + 1]];
    if (b.classList.contains('fav-del')) {
      ids.splice(i, 1);
      const card = cards.find((c) => c.dataset.id === li.dataset.id);
      const fb = card?.querySelector('.btn-fav');
      if (fb) { fb.setAttribute('aria-pressed', 'false'); fb.textContent = '♡ お気に入り'; }
      card?.classList.remove('is-fav');
      updateFavCount();
      if (state.fav) applyFilter();
    }
    setFavOrder(ids);
  });
  {
    let dragging = null;
    favDlg?.addEventListener('dragstart', (ev) => { dragging = ev.target.closest('li[data-id]'); if (dragging) { dragging.classList.add('is-dragging'); ev.dataTransfer.effectAllowed = 'move'; } });
    favDlg?.addEventListener('dragover', (ev) => {
      const over = ev.target.closest('li[data-id]');
      if (!dragging || !over || over === dragging) return;
      ev.preventDefault();
      const r = over.getBoundingClientRect();
      over.parentNode.insertBefore(dragging, ev.clientY < r.top + r.height / 2 ? over : over.nextSibling);
    });
    favDlg?.addEventListener('drop', (ev) => { ev.preventDefault(); });
    favDlg?.addEventListener('dragend', () => {
      if (!dragging) return;
      dragging.classList.remove('is-dragging');
      dragging = null;
      setFavOrder($$('li[data-id]', favDlg).map((li) => li.dataset.id));
    });
  }

  /* おまかせ：表示中のカードから 1 本選んでスクロールし、少しのあいだ強調する */
  document.getElementById('tool-random')?.addEventListener('click', () => {
    const pool = cards.filter((c) => !c.hidden && !c.closest('.cat')?.classList.contains('is-collapsed'));
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    $$('.card.is-pick').forEach((c) => c.classList.remove('is-pick'));
    pick.classList.add('is-pick');
    pick.scrollIntoView({ block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    setTimeout(() => pick.classList.remove('is-pick'), 2600);
  });

  /* テーマ切り替え（初期値は <head> のインラインスクリプトで反映済み） */
  const themeBtn = document.getElementById('theme');
  themeBtn?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('motion-theme', next);
  });

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
  }

  /* ---- 7) カテゴリの折りたたみ（状態を保存） ---- */
  const collapsed = new Set(store.get('motion-collapsed', []));
  function setCollapsed(cat, on) {
    cat.classList.toggle('is-collapsed', on);
    const btn = cat.querySelector('.cat-toggle');
    if (btn) { btn.setAttribute('aria-expanded', String(!on)); btn.querySelector('span').textContent = on ? '開く' : '閉じる'; }
    if (on) collapsed.add(cat.id); else collapsed.delete(cat.id);
  }
  $$('.cat').forEach((cat) => setCollapsed(cat, collapsed.has(cat.id)));
  const saveCollapsed = () => store.set('motion-collapsed', [...collapsed]);
  if (state.sort !== 'std') applySort();
  applyFilter();   /* URL から復元した状態を反映 */
  document.getElementById('tool-open')?.addEventListener('click', () => { $$('.cat').forEach((c) => setCollapsed(c, false)); saveCollapsed(); });
  document.getElementById('tool-close')?.addEventListener('click', () => { $$('.cat').forEach((c) => setCollapsed(c, true)); saveCollapsed(); });

  /* ---- 7b) デモを大きく見るモーダル ---- */
  const modal = document.getElementById('preview');
  function openPreview(card) {
    if (!modal || typeof modal.showModal !== 'function') return;
    const stage = card.querySelector('.stage');
    if (!stage) return;
    const holder = modal.querySelector('.modal-stage');
    holder.innerHTML = '';
    const clone = stage.cloneNode(true);
    clone.classList.remove('play');
    holder.appendChild(clone);
    modal.querySelector('[data-modal-no]').textContent = card.querySelector('.card-no')?.dataset.no || '';
    modal.querySelector('[data-modal-title]').textContent = card.querySelector('.card-title')?.firstChild?.textContent?.trim() || '';
    modal.querySelector('[data-modal-en]').textContent = card.querySelector('.card-title small')?.textContent || '';
    modal.showModal();
    requestAnimationFrame(() => clone.classList.add('play'));
  }
  modal?.addEventListener('click', (ev) => {
    if (ev.target === modal) modal.close();   /* 背景クリックで閉じる */
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.classList.contains('btn-modal-close')) modal.close();
    if (b.classList.contains('btn-modal-replay')) {
      const s = modal.querySelector('.stage');
      if (s) { s.classList.remove('play'); void s.offsetWidth; s.classList.add('play'); }
    }
  });
  modal?.addEventListener('close', () => { modal.querySelector('.modal-stage').innerHTML = ''; });

  /* 「似ている」や共有リンクでカードに飛んだら、少し強調する */
  function highlightHash() {
    const m = location.hash.match(/^#m-([\w-]+)$/);
    if (!m) return;
    const card = document.getElementById('m-' + m[1]);
    if (!card) return;
    $$('.card.is-pick').forEach((c) => c.classList.remove('is-pick'));
    card.hidden = false;
    card.classList.add('is-pick');
    setTimeout(() => card.classList.remove('is-pick'), 2600);
  }
  window.addEventListener('hashchange', highlightHash);
  highlightHash();

  /* ---- 8) クリック操作（イベント委譲） ---- */
  document.addEventListener('click', async (ev) => {
    /* タグをクリックしたら、そのタグで検索 */
    const tag = ev.target.closest('.card-tags li');
    if (tag && q) {
      q.value = tag.textContent.trim();
      state.q = q.value;
      applyFilter();
      document.querySelector('.cat-tools')?.scrollIntoView({ block: 'start' });
      return;
    }

    const btn = ev.target.closest('button');
    if (!btn) return;
    const card = btn.closest('.card');

    if (btn.classList.contains('cat-toggle')) {
      const cat = btn.closest('.cat');
      setCollapsed(cat, !cat.classList.contains('is-collapsed'));
      saveCollapsed();
    }

    if (btn.classList.contains('btn-replay')) {
      const stage = card.querySelector('.stage');
      stage.classList.remove('play');
      void stage.offsetWidth;          // 強制リフローでアニメーションをリセット
      stage.classList.add('play');
    }

    if (btn.classList.contains('btn-code')) {
      const panel = card.querySelector('.code-panel');
      if (!panel.dataset.ready) {
        panel.querySelector('code').innerHTML = highlightCss(codeOf.get(card) || '');
        panel.dataset.ready = '1';
      }
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
      btn.classList.toggle('is-open', willOpen);
      btn.textContent = willOpen ? '{ } 閉じる' : '{ } コード';
    }

    if (btn.classList.contains('btn-fav')) {
      const id = card.dataset.id;
      const on = !favs.has(id);
      if (on) favs.add(id); else favs.delete(id);
      store.set('motion-favs', [...favs]);
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = (on ? '♥' : '♡') + ' お気に入り';
      card.classList.toggle('is-fav', on);
      updateFavCount();
      if (state.sort === 'fav') applySort();
      if (state.fav) applyFilter();
    }

    if (btn.classList.contains('btn-big')) openPreview(card);

    if (btn.classList.contains('btn-share')) {
      await copyText(location.href.replace(/[?#].*$/, '') + '#m-' + card.dataset.id);
      const label = btn.textContent;
      btn.textContent = 'コピーしました';
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('done'); }, 1400);
    }

    if (btn.classList.contains('btn-copy')) {
      await copyText(btn.closest('.code-panel').querySelector('code').textContent);
      const label = btn.textContent;
      btn.textContent = 'コピーしました';
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('done'); }, 1400);
    }
  });

  /* ---- 8b) Service Worker（http(s) で配信したときだけ。file:// では登録しない） ---- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
  }

  /* ---- 9) 再生速度（--global-speed を書き換えるだけ） ---- */
  const speed = document.getElementById('speed');
  if (speed) {
    speed.addEventListener('change', () => {
      document.documentElement.style.setProperty('--global-speed', speed.value);
    });
  }

  /* ---- 簡易シンタックスハイライト ---- */
  function esc(s) { return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  function highlightCss(code) {
    let out = esc(code);
    out = out.replace(/\/\*[\s\S]*?\*\//g, (m) => `<span class="c">${m}</span>`);
    out = out.replace(/(^|[{;\n][ \t]*)(--?[\w-]+)([ \t]*:)/g, (_, a, p, c) => `${a}<span class="p">${p}</span>${c}`);
    out = out.replace(/^([^\n{}]*?)([ \t]*\{)/gm, (_, s, b) => (s.trim() ? `<span class="s">${s}</span>${b}` : `${s}${b}`));
    out = out.replace(/(?<![\w-])(-?\d*\.?\d+)(px|%|s|ms|deg|em|rem|cqi|cqw|vw|vh|fr)?(?![\w-])/g, (_, n, u = '') => `<span class="n">${n}${u}</span>`);
    return out;
  }
  function highlightJs(code) {
    let out = esc(code);
    out = out.replace(/\/\/[^\n]*/g, (m) => `<span class="c">${m}</span>`);
    out = out.replace(/'[^'\n]*'/g, (m) => `<span class="n">${m}</span>`);
    out = out.replace(/\b(const|let|function|for|of|new|return|void)\b/g, '<span class="p">$1</span>');
    return out;
  }
  $$('.step pre code.lang-css').forEach((el) => { el.innerHTML = highlightCss(el.textContent); });
  $$('.step pre code.lang-js').forEach((el) => { el.innerHTML = highlightJs(el.textContent); });
})();
