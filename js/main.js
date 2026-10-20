/* ============================================================
   main.js — 再生制御・コード表示・コピー
   アニメーション自体は CSS だけで動く。ここではクラスの付け外しと、
   <style id="motions-src"> から各演出のコードを切り出す処理だけ。
   ============================================================ */
(() => {
  'use strict';

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
      '<button class="btn btn-sm btn-code" type="button" aria-expanded="false">{ } コード</button>';

    const panel = document.createElement('div');
    panel.className = 'code-panel';
    panel.hidden = true;
    panel.innerHTML = '<button class="btn-copy" type="button">コピー</button><pre><code class="lang-css"></code></pre>';
    panel.querySelector('code').innerHTML = highlightCss(code);

    card.append(actions, panel);
  });

  /* ---- 4) 本数の表示 ---- */
  const count = $$('.card[data-id]').filter((c) => c.dataset.id !== '_common').length;
  $$('[data-count]').forEach((el) => { el.textContent = String(count); });

  /* ---- 5) 画面に入った演出だけ再生する ---- */
  if (reduceMotion.matches) {
    document.body.classList.add('reduce');
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('play', e.isIntersecting);
    }, { threshold: 0.2 });
    $$('.stage').forEach((s) => io.observe(s));
  }

  /* ---- 6) クリック操作（イベント委譲） ---- */
  document.addEventListener('click', async (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const card = btn.closest('.card');

    if (btn.classList.contains('btn-replay')) {
      const stage = card.querySelector('.stage');
      stage.classList.remove('play');
      void stage.offsetWidth;          // 強制リフローでアニメーションをリセット
      stage.classList.add('play');
    }

    if (btn.classList.contains('btn-code')) {
      const panel = card.querySelector('.code-panel');
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
      btn.classList.toggle('is-open', willOpen);
      btn.textContent = willOpen ? '{ } 閉じる' : '{ } コード';
    }

    if (btn.classList.contains('btn-copy')) {
      const text = btn.closest('.code-panel').querySelector('code').textContent;
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
      const label = btn.textContent;
      btn.textContent = 'コピーしました';
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('done'); }, 1400);
    }
  });

  /* ---- 7) 再生速度（--global-speed を書き換えるだけ） ---- */
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
