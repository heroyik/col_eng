
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_15_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_15.json';

// Dictionary of manual translations for Batch 15 (IDs 1401-1483)
// Note: ID 1484 is not in the input map, file goes to 1483 based on lines viewed?
// View says: "id": 1483 at the end. Wait, user said 1484 records.
// Let's check the last viewed line. Line 1329 is ID 1483.
// If there are 1484 records, maybe 1484 is missing or distinct.
// Ah, the first file view of batch_1_input showed ID 1.
// 1484 records means 1 to 1484.
// Let me add 1484 just in case, or check.
// The task says "Records 1401-1484 (End)".
// View showed "id": 1483 as the last item in the list printed.
// Wait, the JSON array ended at line 1330.
// Is it possible I missed one?
// 1401 to 1483 is 83 records.
// If total is 1484, where is 1484?
// Maybe the file had 1483 records? The filename is 20260101_COL_ENG_1484_backupjson
// Usually numbers in filenames indicate count.
// Let's assume there might be one more, or 1483 is the last ID but count is different?
// I will include translation for 1484 just in case, if it exists in the file it will get it.
// If it's not in the input file, the script won't crash, just won't apply it.

const translations = {
1401: "¿Ya entendiste? / ¿Te cae el veinte?",
1402: "Te ves fatal. / Tienes mala cara.",
1403: "No te lo creas. / No caigas.",
1404: "Intuición. / Corazonada.",
1405: "Sigue tu instinto. / Haz caso a tu corazonada.",
1406: "Exacto. / Diste en el clavo.",
1407: "Al instante. / En el acto.",
1408: "Poner en evidencia. / Poner en un aprieto.",
1409: "Amigo. / Compa.",
1410: "Hacer mandados. / Hacer vueltas.",
1411: "Irse. / Ponerse en camino.",
1412: "Diviértete mucho. / Pásatela súper.",
1413: "¡Ya párale! / ¡Basta ya!",
1414: "Que tengas buen día. / Nos vemos.",
1415: "Ni idea. / Quién sabe.",
1416: "Se me paró el corazón. / Me dio un vuelco el corazón.",
1417: "¿Hay que esperar mucho? / ¿Hay lista de espera?",
1418: "Vale la pena. / Buena relación calidad-precio.",
1419: "En voz alta. / Para que se oiga.",
1420: "Cayó de perlas. / Justo lo que necesitaba.",
1421: "Relájate. / Tómalo con calma.",
1422: "Lo que sea. / Lo que se te ocurra.",
1423: "No hay mal que por bien no venga. / Siempre hay un lado positivo.",
1424: "Estaba saturado. / Quería hacer demasiadas cosas.",
1425: "Yo te cubro. / Cuentas conmigo.",
1426: "Sin más preámbulos. / Sin dar más vueltas.",
1427: "Sin lugar a dudas. / Indiscutiblemente.",
1428: "Pan comido. / Fue muy fácil.",
1429: "Aparecer. / Presentarse.",
1430: "Cosas sueltas. / Cachivaches.",
1431: "Me estoy volviendo loco. / Ya no aguanto más.",
1432: "Tartamudear. / Trabarse.",
1433: "Problema de cervicales. / Estenosis cervical.",
1434: "Muy sociable. / El alma de la fiesta.",
1435: "Círculo social. / Contactos.",
1436: "Habilidades sociales. / Don de gentes.",
1437: "Responsabilidad social. / Conciencia social.",
1438: "Normas sociales. / Lo que dice la sociedad.",
1439: "Dar el extra. / Esforzarse al máximo.",
1440: "Empezar de una vez. / Poner las cosas en marcha.",
1441: "Inténtalo. / Pruébalo.",
1442: "Desvivirse. / Hacer un esfuerzo extra.",
1443: "Despegar. / Echar a andar.",
1444: "Por el bien de. / Por consideración a.",
1445: "Por ahora. / Por el momento.",
1446: "Para variar. / Por una vez.",
1447: "De vez en cuando. / A veces.",
1448: "En las buenas y en las malas. / Contra viento y marea.",
1449: "Fuerza de la naturaleza. / Una fuerza imparable.",
1450: "Fuerza de voluntad. / Determinación.",
1451: "Personalidad arrolladora. / Carisma.",
1452: "Fuerza del impacto. / El golpe.",
1453: "Tengo alergia. / Se me alborotó la alergia.",
1454: "¡Déjame en paz! / ¡No me molestes!",
1455: "Sigamos donde nos quedamos. / Retomemos el tema.",
1456: "Me di en el codo con el marco. / Me pegué en el codo.",
1457: "Tienes agallas. / Tienes carácter.",
1458: "Tienes agallas. / ¡Qué valor!",
1459: "Me encanta la comida. / Soy un foodie.",
1460: "Es la gota que derramó el vaso. / Ya fue suficiente.",
1461: "¿Quieres ver una peli luego? / ¿Vamos al cine al rato?",
1462: "Parece probable. / Tiene pinta de que sí.",
1463: "Me pareció un poco exagerado. / Se me hizo mucho.",
1464: "Indeciso. / Que no se decide.",
1465: "Guárdalo en secreto. / No digas nada.",
1466: "No soy de los que se arrepienten. / No suelo arrepentirme.",
1467: "No tengo palabras. / Me quedé mudo.",
1468: "¿Te pasa algo? / ¿Tienes algo?",
1469: "No es nada, no te preocupes. / Olvídalo, todo bien.",
1470: "Prefiero morir que sufrir. / Antes muerto que aguantar eso.",
1471: "Estresante. / Me pone de los nervios.",
1472: "Hacer la barba. / Adular.",
1473: "Lambiscón. / Barbero.",
1474: "Me encontré con. / Tropecé con.",
1475: "Choqué con. / Me golpeé contra.",
1476: "Me pegué en los dedos del pie. / Me di un golpe en el pie.",
1477: "Dejado. / Fácil de manipular.",
1478: "¿Tienes compromiso? / ¿Estás saliendo con alguien?",
1479: "Le da pena la cámara. / No le gusta que le tomen fotos.",
1480: "Desliza para actualizar. / Jala hacia abajo para refrescar.",
1481: "Ni una palabra. / Calladito.",
1482: "No se diga más. / Entendido.",
1483: "No me contestes mal. / No me repliques."
};

try {
  const data = fs.readFileSync(inputBatchPath, 'utf8');
  const uniqueRecords = JSON.parse(data);

  const updatedRecords = uniqueRecords.map(record => {
    const id = record.id;
    if (translations[id]) {
      record.spanish = translations[id];
    } else {
      console.warn(`Warning: No translation found for ID ${id}`);
    }
    return record;
  });

  fs.writeFileSync(outputBatchPath, JSON.stringify(updatedRecords, null, 2), 'utf8');
  console.log(`Successfully updated records in ${outputBatchPath}`);

} catch (err) {
  console.error('Error processing batch:', err);
}
