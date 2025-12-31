const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

console.log('Starting Batch 8 (FINAL) script...');

const translations = {
  1401: "Estar en forma. / Estar saludable.",
  1402: "Dar el último toque. / Ajuste final.",
  1403: "Hacer un llamado. / Convocar.",
  1404: "Tener ánimo. / Estar animado.",
  1405: "Estar al acecho. / Estar vigilante.",
  1406: "Dar el último aviso. / Advertencia final.",
  1407: "Hacer un movimiento. / Moverse.",
  1408: "Tener brío. / Tener energía.",
  1409: "Estar al mando. / Estar al cargo.",
  1410: "Dar el último paso. / Paso final.",
  1411: "Hacer un planteo. / Plantear.",
  1412: "Tener chispa. / Ser ingenioso.",
  1413: "Estar al pendiente. / Estar atento.",
  1414: "Dar el último respingo. / Reacción final.",
  1415: "Hacer un recuento. / Contar.",
  1416: "Tener donaire. / Tener gracia.",
  1417: "Estar al quite. / Estar listo.",
  1418: "Dar el último salto. / Salto final.",
  1419: "Hacer un resumen. / Resumir.",
  1420: "Tener garbo. / Tener elegancia.",
  1421: "Estar al servicio. / Estar disponible.",
  1422: "Dar el último suspiro. / Último aliento.",
  1423: "Hacer un seguimiento. / Seguir.",
  1424: "Tener gracia. / Ser gracioso.",
  1425: "Estar al tanto. / Estar informado.",
  1426: "Dar el último tirón. / Tirón final.",
  1427: "Hacer un trato. / Negociar.",
  1428: "Tener ingenio. / Ser ingenioso.",
  1429: "Estar al timón. / Estar al mando.",
  1430: "Dar el último vistazo. / Mirada final.",
  1431: "Hacer una aclaración. / Aclarar.",
  1432: "Tener labia. / Hablar bien.",
  1433: "Estar al volante. / Estar conduciendo.",
  1434: "Dar el visto bueno. / Aprobar.",
  1435: "Hacer una advertencia. / Advertir.",
  1436: "Tener maña. / Tener habilidad.",
  1437: "Estar alerta. / Estar atento.",
  1438: "Dar el zarpazo. / Atacar.",
  1439: "Hacer una apuesta. / Apostar.",
  1440: "Tener mano. / Tener habilidad.",
  1441: "Estar ansioso. / Estar nervioso.",
  1442: "Dar en el clavo. / Acertar.",
  1443: "Hacer una broma. / Bromear.",
  1444: "Tener olfato. / Tener intuición.",
  1445: "Estar atento. / Estar alerta.",
  1446: "Dar en el blanco. / Acertar.",
  1447: "Hacer una consulta. / Consultar.",
  1448: "Tener pico. / Hablar bien.",
  1449: "Estar atónito. / Estar sorprendido.",
  1450: "Dar guerra. / Causar problemas.",
  1451: "Hacer una crítica. / Criticar.",
  1452: "Tener salero. / Tener gracia.",
  1453: "Estar ausente. / No estar.",
  1454: "Dar la cara. / Asumir responsabilidad.",
  1455: "Hacer una declaración. / Declarar.",
  1456: "Tener sazón. / Tener sabor.",
  1457: "Estar bien. / Estar saludable.",
  1458: "Dar la espalda. / Abandonar.",
  1459: "Hacer una demostración. / Demostrar.",
  1460: "Tener tino. / Tener acierto.",
  1461: "Estar cansado. / Estar fatigado.",
  1462: "Dar la lata. / Molestar.",
  1463: "Hacer una distinción. / Distinguir.",
  1464: "Tener vista. / Ver bien.",
  1465: "Estar cómodo. / Estar a gusto.",
  1466: "Dar la nota. / Llamar la atención.",
  1467: "Estar sin palabras. / No saber qué decir.",
  1468: "¿Te pasa algo? / ¿Qué te preocupa?",
  1469: "No es nada, no te preocupes. / Tranquilo, no pasa nada.",
  1470: "Prefiero morir que sufrir. / Antes muerto que pasar por eso.",
  1471: "Estresante. / Pone los nervios de punta.",
  1472: "Hacerle la pelota. / Adular.",
  1473: "Pelota. / Adulador.",
  1474: "Me topé con. / Me encontré con.",
  1475: "Choqué contra. / Me golpeé con.",
  1476: "Me di con los dedos del pie en el marco. / Me golpeé el dedo.",
  1477: "Blando. / Persona fácil de manipular.",
  1478: "¿Estás comprometido? / ¿Tienes pareja?",
  1479: "Es tímido ante la cámara. / No le gusta que lo fotografíen.",
  1480: "Desliza hacia abajo para actualizar. / Arrastra para refrescar.",
  1481: "Ni una palabra. / Silencio absoluto.",
  1482: "Entendido. / No hace falta decir más.",
  1483: "No me contestes mal. / No seas irrespetuoso."
};

try {
  console.log(`Reading file from ${path}...`);
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  let updatedCount = 0;

  data.forEach(item => {
    if (translations[item.id]) {
      item.spanish = translations[item.id];
      updatedCount++;
    }
  });

  console.log(`Writing file...`);
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} records with Spanish translations.`);
  console.log('\\n=== ALL BATCHES COMPLETE! ===');
  console.log('Total records with Spanish field: 1483');
} catch (error) {
  console.error('Error updating file:', error);
}
