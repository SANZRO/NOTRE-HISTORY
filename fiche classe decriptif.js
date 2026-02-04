/* ========= FICHE : Classe ========= */

/* ========= FICHE : Avalon ========= */
function openAvalonModal() {
  const contentHTML = `
    <h4>Avalon (of ?) <small style="opacity:.7">[🆕]</small></h4>
    <p class="mono"><strong>Condition d’obtention</strong> : Aucune</p>

    <h4>Détails</h4>
    <div class="mono">
      <ul style="padding-left:18px; list-style:disc;">
        <li><strong>Mode Bar</strong></li><br>

        <li>
          <strong>Lvl 2 — (?) Unlock</strong> : permet au personnage de se Mod.  
          Augmente les stats (💪🦵🪖) de 20 pts.  
          Le personnage gagne un % de Mode Bar à chaque attaque réussie.
        </li><br>

        <li>
          <strong>Lvl 3 — (?) Manifestation</strong> : le personnage appelle son (?) à la réalité.  
          Augmente les boosts (💪🦵🪖) à 40 pts.
        </li><br>

        <li>
          <strong>Lvl 5 — (?) Hazard</strong> : le personnage déchaîne les capacités de son (?) de façon incontrôlée.  
          Les dégâts infligés par (?) deviennent des dégâts (⛑️).
        </li><br>

        <li>
          <strong>Lvl 7 — Ultime (?)</strong> : le personnage libère le plein potentiel de son (?) de façon totalement contrôlée.  
          Sur un 17 au dé (20), le Mod est amélioré temporairement et donne  
          +40 (💪🦵🧠🪖) pts et +150 (🩷).
        </li><br>

        <li>
          <strong>Drain</strong> : chaque action consomme 5% de Mode Bar.
        </li><br>

        <li>
          <strong>Gain de Mode Bar</strong> :<br>
          - M1 = +2%<br>
          - Tech Phy = +5%<br>
          - Sort = +5%<br>
          - Ult Phy = +15%<br>
          - Ult Mag = +10%<br>
          - Parry = +3%<br>
          - Veski = +3%<br>
          - Gilga Draft = +20%
        </li>
      </ul>
    </div>
  `;

  openModal('Avalon — Pool de Talents', contentHTML);
}

/* ========= FICHE : GilgaCrit ========= */
function openGilgaCritModal() {
  const contentHTML = `
    <h4>GilgaCrit (Supp)</h4>
    <p class="mono"><strong>Conditions d’obtention</strong> :<br>
      - Réussir 5 Gilga Draft en 1 combat<br>
      - Faire 15 Gilga Draft en 1 combat<br>
      - Faire 50 Gilga Draft sur toute une run
    </p>

    <h4>Détails</h4>
    <div class="mono">
      <ul style="padding-left:18px; list-style:disc;">

        <li>
          <strong>Obtention</strong> : Gagne un dé (6) de chance de faire un Gilga Draft.
        </li><br>

        <li>
          <strong>Lvl 2 — Critical Strike</strong> :  
          Les Gilga Draft du personnage infligent +100% dmg.  
          Si une attaque perfore la défense adverse, le Gilga Draft inflige +200% dmg.
        </li><br>

        <li>
          <strong>Lvl 3 — Critical Mastery</strong> :  
          Si un ennemi est physiquement Stun, la prochaine atk/tech physique du personnage sur cet ennemi sera automatiquement Gilga Draftée.  
          Tous les boosts de dmg non (⚔️❤️) sont convertis en dmg(❤️) supplémentaires.
        </li><br>

        <li>
          <strong>Lvl 5 — Ki Mark</strong>
        </li><br>

        <li>
          <strong>Lvl 7 — Collector</strong> :  
          Pour chaque Gilga Draft donné, un effet aléatoire est appliqué au receveur.  
          Si l’effet ne peut pas être activé, le receveur subit +50 dmg(❤️).
        </li><br>

        <li>
          <strong>✳️ Percepteur</strong> :  
          Condition : avoir eu les 4 effets de Collector en 1 combat.<br>
          Si un ennemi est à 10% ou moins, la prochaine atk/tech(❤️) le **ONE SHOT** et applique un effet de Collector à toute personne sur la map.  
          Tous les ennemis tués sous Percepteur donnent leur EXP uniquement au personnage.
        </li>

      </ul>
    </div>
  `;

  openModal('GilgaCrit — Pool de Talents', contentHTML);
}

/* ========= FICHE : Chaser ========= */
function openChaserModal() {
  const contentHTML = `
    <h4>Chaser <small style="opacity:.7">[🆕]</small></h4>
    <p class="mono"><strong>Condition d’obtention</strong> : Aucune</p>

    <h4>Détails</h4>
    <div class="mono">
      <ul style="padding-left:18px; list-style:disc;">

        <li>
          <strong>Obtention — Preying Sens</strong> :  
          Le personnage choisit un Sens (👅 👂 👁️ 👃 🤚) qui passe directement à Max (6).
        </li><br>

        <li>
          <strong>Lvl 2 — Pry</strong> :  
          Pour chaque 25% (🩷) perdu dans la zone → le personnage gagne +20 (🦵).  
          Pour chaque 20% (🩷) perdu par le personnage → baisse son taux de M1 de 1.
        </li><br>

        <li>
          <strong>Lvl 3 — Haunt Mark</strong> :  
          Le personnage désigne une cible à chasser pendant 3 jours.  
          Toute personne marquée voit sa def(🛡️) réduite de 50% contre les attaques du personnage.
        </li><br>

        <li>
          <strong>Lvl 5 — Howling</strong> :  
          Réduit la def(🛡️) de toute personne dans la zone de 50%, y compris lui-même,  
          pour un 15 au dé (20).
        </li><br>

        <li>
          <strong>Lvl 7 — Finish Touch</strong> :  
          Tous les échecs critiques dans la zone appliquent un Finish Touch.  
          Si le personnage attaque(❤️) une cible marquée, il inflige +20% (🩷🤍) de dmg(❤️).
        </li>

      </ul>
    </div>
  `;

  openModal('Chaser — Pool de Talents', contentHTML);
}
