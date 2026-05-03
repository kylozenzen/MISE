// ── library.js ───────────────────────────────────────────────────────────────
// Recipe library: render, search, filter

function renderLibrary(filter = '') {
  const content = document.getElementById('library-content');
  const q = filter.toLowerCase();
  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(q) ||
    (r.tags || []).some(t => t.toLowerCase().includes(q))
  );

  if (!filtered.length && !recipes.length) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">🍽️</div>
        <h3>No recipes yet</h3>
        <p>Tap + to add your first recipe by pasting text or filling out a form.</p>
      </div>`;
    return;
  }

  if (!filtered.length) {
    content.innerHTML = `<div class="empty-state"><p style="color:var(--text-muted)">No recipes match "${filter}"</p></div>`;
    return;
  }

  let html = '<div class="library-grid">';
  filtered.forEach((r, i) => { html += recipeCardHTML(r, i); });
  html += '</div>';
  content.innerHTML = html;
}

function recipeCardHTML(r, i) {
  const hasMacros = r.macros && (r.macros.cal || r.macros.protein);
  const tagsHTML  = (r.tags || []).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('');
  const macroTag  = hasMacros ? `<span class="tag macro">${r.macros.cal}cal</span>` : '';
  return `
    <div class="recipe-card" onclick="openDetail('${r.id}')" style="animation-delay:${i * 40}ms">
      <div class="recipe-card-emoji">${r.emoji || '🍳'}</div>
      <div class="recipe-card-title">${r.title}</div>
      <div class="recipe-card-meta">
        ${macroTag}${tagsHTML}
        ${r.servings ? `<span class="tag">×${r.servings}</span>` : ''}
      </div>
    </div>`;
}

function filterRecipes(val) {
  renderLibrary(val);
}
