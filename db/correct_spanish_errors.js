const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

console.log('Correcting verified incorrect Spanish translations...\n');

// Corrections for verified incorrect translations from sample verification
const corrections = {
  200: "No te lo tomes a pecho. / No le des importancia.",
  400: "Me cuesta admitirlo. / No quiero reconocerlo.",
  600: "Sin rencores. / Todo bien entre nosotros.",
  800: "Mejor aún. / Incluso mejor.",
  1000: "Es muy fácil. / No tiene complicación.",
  1050: "Se cerró en banda. / No soltó prenda.",
  1100: "Soy optimista. / Veo el vaso medio lleno.",
  1150: "Era duro como el acero. / No tenía compasión.",
  1200: "Lo presiento. / Tengo un presentimiento.",
  1250: "Se acabó el tiempo. / Tiempo cumplido.",
  1300: "Me temo que no hay existencias. / Se nos agotó.",
  1350: "Puedo ir con la frente alta. / No tengo nada que ocultar.",
  1400: "No hablas en serio. / Me estás tomando el pelo.",
  1425: "Te cubro las espaldas. / Cuento contigo.",
  1450: "Fuerza de voluntad. / Determinación férrea.",
  1475: "Me di contra. / Choqué con."
};

try {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  let correctedCount = 0;

  data.forEach(item => {
    if (corrections[item.id]) {
      console.log(`Correcting ID ${item.id}: "${item.primary}"`);
      console.log(`  OLD: ${item.spanish}`);
      console.log(`  NEW: ${corrections[item.id]}`);
      item.spanish = corrections[item.id];
      correctedCount++;
    }
  });

  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n✅ Successfully corrected ${correctedCount} translations.`);
  console.log('\nNext step: Validate remaining batches systematically.');

} catch (error) {
  console.error('Error during correction:', error);
}
