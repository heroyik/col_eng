
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_14_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_14.json';

// Dictionary of manual translations for Batch 14 (IDs 1301-1400)
// Format: ID: "Spanish Expression 1 / Spanish Expression 2"
const translations = {
1301: "Buena idea. / Bien pensado.",
1302: "Estamos en las mismas. / Estoy igual que tú.",
1303: "Qué conmovedor. / Qué tierno.",
1304: "Me dejaste sin palabras. / No sé qué decir.",
1305: "No sé nada. / No tengo ni idea.",
1306: "¿En qué me quedé? / ¿De qué estaba hablando?",
1307: "¿Vamos a almorzar? / ¿Quieres ir a comer?",
1308: "Pasé una mala noche. / No dormí nada bien.",
1309: "Esto no puede estar pasando. / No me lo puedo creer.",
1310: "¡Así se habla! / ¡Ahora sí nos entendemos!",
1311: "Tienes toda la razón. / En eso no te equivocas.",
1312: "No creo que pase. / Lo dudo mucho.",
1313: "Que yo sepa, no. / No tengo noticias de eso.",
1314: "¡Sobre mi cadáver! / ¡Ni lo sueñes!",
1315: "Espero que todo salga bien. / Tengo fe en que saldrá bien.",
1316: "¡Me apunto! / ¡Yo le entro!",
1317: "¡No me digas! / ¡Increíble!",
1318: "¿Les molesta si los acompaño? / ¿Puedo sentarme con ustedes?",
1319: "¿A quién le importa? / ¿Qué más da?",
1320: "No me corresponde a mí. / No es asunto mío.",
1321: "Sigue a tu corazón. / Haz lo que sientas.",
1322: "Yo que tú, no lo haría. / Yo en tu lugar, no lo haría.",
1323: "Haz tu trabajo. / Dedícate a lo tuyo.",
1324: "Es todo o nada. / Nos la jugamos toda.",
1325: "Pórtate bien. / Compórtate.",
1326: "¿Y yo qué gano? / ¿Qué saco yo de esto?",
1327: "¡Qué vergüenza! / ¡Debería darte pena!",
1328: "Mira quién habla. / El burro hablando de orejas.",
1329: "Tú te lo buscaste. / Te lo ganaste a pulso.",
1330: "¡Te lo mereces! / ¡Eso te pasa por listo!",
1331: "Aprendes rápido. / Agarras la onda rápido.",
1332: "No lo arruines. / No la riegues.",
1333: "Pues que así sea. / Ni modo.",
1334: "¡Cuida esa boca! / ¡No hables así!",
1335: "No quiero tener nada que ver. / No me metan en eso.",
1336: "No te metas, por favor. / No interrumpas.",
1337: "Prepárate. / Agárrate fuerte.",
1338: "Digamos que estamos a mano. / Lo dejamos en paz.",
1339: "Es cosa de hombres. / Cosas de chicos.",
1340: "Se va a aprovechar de nosotros. / Nos va a gorronear.",
1341: "Lo mismo va para ti. / Aplícate el cuento.",
1342: "Oríllate aquí. / Déjame aquí.",
1343: "Súbete. / Entra.",
1344: "¿Vas para allá? / ¿Vamos por el mismo lado?",
1345: "No tiene pérdida. / Lo vas a ver luego luego.",
1346: "Estoy atorado en el tráfico. / Hay mucho tráfico.",
1347: "No me alcanza. / No tengo dinero para eso.",
1348: "Hablaló con tu jefe. / Díselo a tu jefe.",
1349: "¿Te recorres tantito? / ¿Me haces un campito?",
1350: "Puedo ir con la frente en alto. / No tengo nada de qué avergonzarme.",
1351: "Eso es todo lo que necesito. / Con eso tengo.",
1352: "Me estoy peinando. / Me estoy arreglando el pelo.",
1353: "¿Tienes cambio de cien? / ¿Me puedes cambiar un billete de cien?",
1354: "¡Qué imaginación tienes! / Tienes mucha imaginación.",
1355: "Nos hemos distanciado. / Cada quien tomó su camino.",
1356: "Estoy agotado. / Me siento sin fuerzas.",
1357: "¡Contrólate! / ¡Reacciona!",
1358: "¿Puedo ir con ustedes? / ¿Me puedo apuntar?",
1359: "Es un lío. / Es una lata.",
1360: "Hasta ahora, todo bien. / Por el momento, todo va bien.",
1361: "No has cambiado nada. / Estás igualito.",
1362: "Estoy pasando desapercibido. / No quiero llamar la atención.",
1363: "¡Genial! / ¡Dale con todo!",
1364: "Está difícil seguir el ritmo. / Cuesta trabajo mantenerse al día.",
1365: "Ya somos dos. / Estamos igual.",
1366: "Ya, ya. / Tranquilo, todo va a estar bien.",
1367: "Fue para nada. / Todo fue en vano.",
1368: "No hubo tiempo. / No alcanzó el tiempo.",
1369: "Estoy en un aprieto. / Estoy en problemas.",
1370: "Siempre anda de un lado para el otro. / No para nunca.",
1371: "Aquí huele mal. / Algo me huele raro.",
1372: "Me muero de hambre. / Tengo un hambre que no veo.",
1373: "No me están entendiendo. / Se les está yendo el punto.",
1374: "Perdón por la palabrota. / Disculpen mi vocabulario.",
1375: "Hablemos claro. / Vamos al grano.",
1376: "Iré al grano. / Seré directo.",
1377: "Eso no tiene importancia. / No pesa nada.",
1378: "Descansa un rato. / Relájate.",
1379: "Cambia de tema. / Ya déjalo así.",
1380: "Todo está en el aire. / No hay nada seguro todavía.",
1381: "Gracias por acompañarme a casa. / Gracias por llevarme.",
1382: "¡Hablando del rey de Roma! / ¡Mira quién llegó!",
1383: "¡Águila o sol! / ¡Cara o cruz!",
1384: "Aquí descansando. / Relajándome en casa.",
1385: "¡Lánzate! / ¡Arriésgate!",
1386: "Eres todo lo que tengo. / No tengo a nadie más que a ti.",
1387: "Me lo imaginaba. / Era de esperarse.",
1388: "¿Qué hay que pensar? / ¡No lo pienses más!",
1389: "No está en mis manos. / Ya no depende de mí.",
1390: "Las viejas costumbres tardan en morir. / Genio y figura hasta la sepultura.",
1391: "¿Es lo que creo que es? / ¿Es eso lo que pienso?",
1392: "Solo síguele la corriente. / Déjate llevar.",
1393: "Le entra por un oído y le sale por el otro. / No hace caso.",
1394: "De tal palo, tal astilla. / Hijo de tigre, pintito.",
1395: "Aún no terminamos. / Esto no se ha acabado.",
1396: "Aquí voy. / ¡A ver qué pasa!",
1397: "Es ahora o nunca. / Es el momento.",
1398: "No pegué el ojo. / No dormí nada.",
1399: "Solo estoy teniendo un mal día. / Hoy no es mi día.",
1400: "No puedes hablar en serio. / ¿Es broma, verdad?"
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
