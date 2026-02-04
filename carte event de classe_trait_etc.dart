card.addEventListener('click', () => {
  const key = normalizeText(text);

  // 1) D'abord : essayer d'ouvrir un TALENT via la table
  if (tryOpenTalentByKey(key)) return;

  // 2) Sinon : routes existantes (races / classes...)
  if (key.includes('beastman')) openBeastmanModal();
  else if (key.includes('kadmerian')) openKadmerianModal();
  else if (key.includes('seishin')) openSeishinModal();
  else if (key.includes('dunkel')) openDunkelModal();
  else if (key.includes('geant')) openGeantModal();
  else if (key.includes('qoog')) openQoogModal();
  else if (key.includes('lizardman')) openLizardmanModal();
  else if (key.includes('chitine')) openChitineModal();
  else if (key.includes('samshioune')) openSamshiouneModal();
  else if (key.includes('riviera')) openRivieraModal();
  else if (key.includes('witch')) openWitchModal();
  else if (key.includes('manifest')) openManifestModal();
  else if (key.includes('vampire')) openVampireModal();
  else if (key.includes('driade')) openDriadeModal();
  else if (key.includes('dokaebi')) openDokaebiModal();
  else if (key.includes('ouga')) openOugaModal();
  else if (key.includes('undead')) openUndeadModal();
  else if (key.includes('shinobi')) openShinobiModal();
  // else if (key.includes('deep sea')) openDeepSeaModal();
  else if (key.includes('elf')) openElfModal();
  else if (key.includes('yaugestor')) openYaungestorModal(); // <- vérifie l'orthographe de ta fonction
  else if (key.includes('oni')) openOniModal();
  else if (key.includes('aid')) openAidModal();
  else if (key.includes('volture')) openVoltureModal();
  else if (key.includes('emporium')) openEmporiumModal();
  else if (key.includes('humain')) openHumainModal();
  // else if (key.includes('fishman')) openFishmanModal();
  else if (key.includes('hymne')) openHymneModal();
  // else if (key.includes('taz')) openTazModal();
});




/* ===================== ROUTAGE TALENTS ===================== */
const TALENT_ROUTES = {
  'force': openforceModal,
  'agiliter': openAgiliterModal,
  'fortidude': openFortidudeModal,
  'auto-dodge': openAutoDodgeModal,
  'aura farm': openAuraFarmModal,
  'tank passive': openTankPassiveModal,
  'charisme': openCharismeModal,
  'inteligeance': openInteligeanceModal, // orthographe telle que donnée
  'gilga drafting passive': openGilgaDraftingPassiveModal,
  'gilga draft': openGilgaDraftModal,
  'health passive': openHealthPassiveModal,
  'm1 passive': openM1PassiveModal,
  'willpower': openWillpowerModal,
  'ki passive': openKiPassiveModal,
  'chi': openChiModal
};
