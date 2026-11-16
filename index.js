// Mise à jour : la version de NeoDex, la recherche de mises à jour et les plugins à mettre à jour.
// Plugin système : il utilise le pont de NeoDex (neo) pour lire la version et lancer la mise à jour ; NeoDex ne l'ouvre que s'il est signé.
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast, newTab } = ctx.host;
  ctx.host.addStyle(`.muWrap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,1.2vw,22px);align-items:start}
.muWrap>.muHero,.muWrap>.muActC{grid-column:1/-1}
@media (max-width:900px){.muWrap{grid-template-columns:1fr}}
.muWrap .muHero{display:flex;flex-direction:row;gap:18px;align-items:center;padding:18px}
.muHero img{width:clamp(72px,5.5vw,104px);height:clamp(72px,5.5vw,104px);image-rendering:pixelated}
.muVer{font-size:clamp(30px,2.4vw,44px);line-height:1.1}.muWrap .hint,.muWrap .muRows,.muWrap .muList{font-size:clamp(14px,.95vw,17px)}
.muOk{color:#7fe08a}.muNew{color:#ffd166}
.muWrap .muRows{display:grid;grid-template-columns:auto 1fr;gap:6px 18px;padding:14px 18px}
.muRows b{text-align:right}
.muWrap .muAct{display:flex;flex-direction:row;gap:10px;flex-wrap:wrap;align-items:center;padding:14px 18px}
.muProg{height:14px;background:var(--bg2,#241a38);border:2px solid var(--line,#3a3448);width:100%}.muProg i{display:block;height:100%;background:#3fb8c8;width:0}
.muWrap .muList{display:flex;flex-direction:column;gap:6px;padding:0 18px 16px}
.muList div{display:flex;gap:10px;align-items:center;justify-content:space-between}`);
  const btn = (label, run, main) => { const b = el('button', 'btn px' + (main ? ' main' : ''), label); b.onclick = () => Promise.resolve(run(b)).catch(e => toast(String(e.message || e).replace(/^.*Error: /, ''), true)); return b; };
  const head = el('div', 'agHead'); head.append(el('span', 'label', 'Mise à jour'));
  const wrap = el('div', 'muWrap');
  view.replaceChildren(el('div', 'appWrap wide')); const app = view.firstChild; app.append(head, wrap);
  async function draw() {
    const info = await neo.appInfo().catch(() => ({ version: '?', packaged: false }));
    const upd = info.packaged ? await neo.appUpdateState().catch(() => null) : null;
    const hero = el('div', 'sysCard px muHero'), img = el('img'); img.src = ctx.icon; img.alt = '';
    const t = el('div'), ver = el('div', 'muVer', 'NeoDex ' + info.version), st = el('div', 'hint', '');
    t.append(ver, st); hero.append(img, t);
    const rows = el('div', 'sysCard px muRows');
    for (const [k, v] of [['Version', info.version], ['Moteur', 'Electron ' + (info.electron || '?')], ['Installation', info.packaged ? 'installée : mises à jour automatiques' : 'copie de développement']]) rows.append(el('span', 'hint', k), el('b', '', v));
    const act = el('div', 'muAct'), plug = el('div', 'muList'), box = el('div', 'sysCard px');
    const showUpd = u => {
      act.replaceChildren();
      if (u?.state === 'available') { st.textContent = 'NeoDex ' + u.version + ' est disponible.'; st.className = 'hint muNew'; act.append(btn('TÉLÉCHARGER ET REDÉMARRER', b => { b.disabled = true; return neo.appInstallUpdate(); }, true)); }
      else if (u?.state === 'downloading') { st.textContent = 'Téléchargement : ' + (u.percent || 0) + ' %'; const g = el('div', 'muProg'), i = el('i'); i.style.width = (u.percent || 0) + '%'; g.append(i); act.append(g); }
      else if (u?.state === 'ready') st.textContent = 'Prête : redémarrage…';
      else if (u?.state === 'error') { st.textContent = 'Mise à jour impossible : ' + (u.message || 'réseau indisponible'); act.append(btn('RÉESSAYER', check, true)); }
      else { st.textContent = info.packaged ? 'Dernière vérification : à l\'instant ou au lancement.' : 'Version de développement : pas de mise à jour automatique.'; st.className = 'hint'; }
      if (!act.children.length || u?.state === 'none') act.append(btn('VÉRIFIER LES MISES À JOUR', check, !u || u.state !== 'available'));
      act.append(btn('NOTES DE VERSION', () => newTab('https://github.com/NDesumeur/neodex-releases/releases')));
    };
    async function check() {
      st.textContent = 'Recherche en cours…'; const r = await neo.appCheckUpdate();
      if (r.state === 'none') { st.textContent = 'NeoDex est à jour (' + r.version + ').'; st.className = 'hint muOk'; } else if (r.state === 'dev') st.textContent = 'Version de développement : pas de mise à jour automatique.'; else showUpd(r);
      plugins();
    }
    async function plugins() {
      plug.replaceChildren();
      try {
        const list = await neo.pluginsList(), d = await neo.pluginsDiscover(), up = d.approved.filter(a => list.find(p => p.id === a.id && p.version !== a.version));
        box.firstChild?.remove(); const h = el('div', 'label', up.length ? up.length + ' plugin(s) à mettre à jour' : 'Tous tes plugins sont à jour'); h.style.padding = '14px 18px 8px'; box.prepend(h);
        for (const a of up) { const r = el('div'); r.append(el('span', '', a.name + ' · ' + list.find(p => p.id === a.id).version + ' → ' + a.version)); plug.append(r); }
        if (up.length) plug.append(btn('OUVRIR NEOSTORE', () => newTab('neodex:store'), true));
      } catch { box.firstChild?.remove(); const h = el('div', 'hint', 'Plugins : catalogue indisponible.'); h.style.padding = '14px 18px'; box.prepend(h); }
    }
    showUpd(upd); if (upd?.state === 'available' || upd?.state === 'error' || !info.packaged) { /* déjà affiché */ }
    // le titre d'abord : plugins() remplace le premier enfant de la carte (avant, c'était la liste elle-même)
    const h0 = el('div', 'hint', 'Recherche des mises à jour des plugins…'); h0.style.padding = '14px 18px 8px';
    box.append(h0, plug); const card = el('div', 'sysCard px muActC'); card.append(act);
    wrap.replaceChildren(hero, rows, box, card);  // en grand écran : la version et les plugins côte à côte, les boutons dessous plugins();
  }
  const off = neo.onAppUpdate?.(u => { if (view.isConnected) draw(); });
  ctx.onOpen(draw);
  ctx.onClose?.(() => { try { off?.(); } catch {} });
}
