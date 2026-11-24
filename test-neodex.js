// lancé par le test « local » de NeoDex : la page Mise à jour (seul le bouton du retour en arrière est cliqué, sans effet ici) met la version et les plugins côte à côte en grand écran, rien ne déborde
module.exports = async ({ pj, sleep }) => {
  let ok = false; for (let i = 0; i < 20 && !(ok = await pj(`!!document.querySelector('.muRows')`)); i++) await sleep(300);
  await sleep(800);
  const r = await pj(`(() => { const a = document.querySelector('.muRows').getBoundingClientRect(), b = document.querySelector('.muList').closest('.sysCard').getBoundingClientRect();
    return { side: Math.abs(a.top - b.top) < 4 && b.left > a.right, w: innerWidth, ver: parseFloat(getComputedStyle(document.querySelector('.muVer')).fontSize),
      over: [...document.querySelectorAll('.appWrap *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).length }; })()`);
  if (!ok) throw new Error('page vide');
  if (r.over) throw new Error(r.over + ' élément(s) débordent à droite');
  if (r.w >= 1400 && !r.side) throw new Error('version et plugins pas côte à côte en grand écran : ' + JSON.stringify(r));
  // revenir en arrière : dans cette copie de développement, la liste dit clairement que ça ne marche que dans NeoDex installé
  await pj(`[...document.querySelectorAll('.muAct button')].find(b => /REVENIR|GO BACK/.test(b.textContent)).click(), 0`); await sleep(800);
  const back = await pj(`document.querySelector('.muBack').textContent`);
  if (!/développement|development/.test(back)) throw new Error('retour en arrière : ' + back);
  await sleep(800);
  return (r.side ? 'côte à côte' : 'l’un sous l’autre') + ', version en ' + r.ver + ' px, REVENIR À UNE VERSION PRÉCÉDENTE répond (copie de développement : refus expliqué)';
};
