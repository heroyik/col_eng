
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_13_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_13.json';

// Dictionary of manual translations for Batch 13 (IDs 1201-1300)
// Format: ID: "Spanish Expression 1 / Spanish Expression 2"
const translations = {
1201: "Pidamos algo de comer. / Pidamos a domicilio.",
1202: "Salud. / Jesús.",
1203: "Él es muy tranquilo. / Él mantiene un perfil bajo.",
1204: "¡Está increíble! / ¡Está que arde!",
1205: "Tengo una corazonada. / Me late que...",
1206: "Lo tengo en la punta de la lengua. / Ya casi me acuerdo.",
1207: "¿Qué te trae por aquí? / ¿Qué haces aquí?",
1208: "No te hagas ideas raras. / No malinterpretes las cosas.",
1209: "No soy muy cafetero. / No me gusta tanto el café.",
1210: "No te sigo. / No entiendo lo que dices.",
1211: "¿Te pusiste perfume? / ¿Hueles a perfume?",
1212: "Tenemos cosas más importantes que hacer. / Tenemos asuntos más grandes que atender.",
1213: "Estoy ocupadísimo. / No doy abasto.",
1214: "¿Cómo puede ser? / ¿Cómo es posible?",
1215: "Da lo mismo. / Es la misma gata pero revolcada.",
1216: "No es mi día. / Hoy no doy una.",
1217: "Ni de lejos. / Nada que ver.",
1218: "¡Qué sorpresa verte aquí! / ¡Mira quién está aquí!",
1219: "Nunca lo había pensado. / No se me había ocurrido.",
1220: "¿Vas a hacer mandados? / ¿Vas a salir a hacer cosas?",
1221: "Hice lo mejor que pude. / Di todo de mí.",
1222: "Ve al grano. / No te andes con rodeos.",
1223: "¿Te lo tengo que explicar con peras y manzanas? / ¿Quieres que te lo deletree?",
1224: "No logro que me entienda. / No hay manera de convencerla.",
1225: "Adivina. / Echa un cálculo.",
1226: "Ya no seas indeciso. / Decídete de una vez.",
1227: "¡Pues demándame! / ¿Y qué?",
1228: "Solo platicando. / Solo charlando un poco.",
1229: "Ganamos por un pelo. / Ganamos de milagro.",
1230: "Eso es cosa tuya. / Es tu responsabilidad.",
1231: "Estoy totalmente fuera de forma. / Estoy oxidado.",
1232: "¿Por qué tan elegante? / ¿A dónde vas tan guapo?",
1233: "Lo compré regalado. / Me costó una nada.",
1234: "¡Estuvo cerca! / ¡Nos salvamos de milagro!",
1235: "Igualmente. / Lo mismo digo.",
1236: "Me alegraste el día. / Me hiciste el día.",
1237: "El mundo es un pañuelo. / Qué pequeño es el mundo.",
1238: "No me lo esperaba. / Esto sí que no lo vi venir.",
1239: "Perdón por el desorden. / Disculpa el tiradero.",
1240: "Todos hablan maravillas de ti. / Tienes muy buena fama.",
1241: "Ponte en mis zapatos. / Ponte en mi lugar.",
1242: "¿Dónde te habías metido? / ¿Dónde has estado?",
1243: "No te pierdas. / Mantente en contacto.",
1244: "No se aceptan devoluciones. / Las ventas son finales.",
1245: "No fue mi intención. / No quise hacerlo.",
1246: "El trato es este. / Así está la cosa.",
1247: "Basta de charla. / Menos plática y más acción.",
1248: "Podemos lograrlo. / Podemos sacar esto adelante.",
1249: "Te doy mi palabra. / Te lo prometo.",
1250: "Se acabó el tiempo. / Tiempo fuera.",
1251: "Es pan comido. / Está facilísimo.",
1252: "Me quedé en blanco. / Se me fue la onda.",
1253: "Te debo una. / Estoy en deuda contigo.",
1254: "No me cuadra. / Algo no encaja.",
1255: "Vamos a medias. / Pagamos mitad y mitad.",
1256: "Me estás tomando el pelo. / Me estás bromeando.",
1257: "Mantén la cabeza en alto. / No te desanimes.",
1258: "Es ahora o nunca. / No hay otra oportunidad.",
1259: "Déjalo ya. / Olvídalo.",
1260: "Estoy harto. / Ya me cansé.",
1261: "No tiene sentido. / Es ilógico.",
1262: "Piénsalo bien. / Medítalo antes de actuar.",
1263: "Es un secreto a voces. / Todo el mundo lo sabe.",
1264: "No me malinterpretes. / No me tomes a mal.",
1265: "Estoy sin blanca. / No tengo ni un quinto.",
1266: "A otro perro con ese hueso. / No te creo nada.",
1267: "Más claro, ni el agua. / Está clarísimo.",
1268: "Se me pegaron las sábanas. / Me quedé dormido.",
1269: "Me importa un bledo. / Me da igual.",
1270: "No hay mal que por bien no venga. / Todo pasa por algo.",
1271: "Tirar la toalla. / Rindirse.",
1272: "Hacer de tripas corazón. / Sacar fuerzas de flaqueza.",
1273: "Empezar con el pie derecho. / Empezar bien.",
1274: "Costar un ojo de la cara. / Ser carísimo.",
1275: "Estar en las nubes. / Estar distraído.",
1276: "Dar en el blanco. / Acertar.",
1277: "Ser pan comido. / Ser muy fácil.",
1278: "Tomar el toro por los cuernos. / Afrontar el problema.",
1279: "Estar entre la espada y la pared. / Estar en un dilema.",
1280: "Darle la vuelta a la tortilla. / Cambiar la situación.",
1281: "No todo lo que brilla es oro. / Las apariencias engañan.",
1282: "Matar dos pájaros de un tiro. / Hacer dos cosas a la vez.",
1283: "Más vale tarde que nunca. / Mejor tarde.",
1284: "En boca cerrada no entran moscas. / Mejor quedarse callado.",
1285: "Camarón que se duerme se lo lleva la corriente. / Si te descuidas, pierdes.",
1286: "A caballo regalado no se le mira el diente. / Acepta los regalos sin quejarte.",
1287: "Quien mucho abarca poco aprieta. / No trates de hacer todo a la vez.",
1288: "Dime con quién andas y te diré quién eres. / Las compañías definen quién eres.",
1289: "Ojos que no ven, corazón que no siente. / Si no lo veo, no me duele.",
1290: "Perro que ladra no muerde. / Mucho ruido y pocas nueces.",
1291: "El que ríe al último, ríe mejor. / La victoria final es la que cuenta.",
1292: "Hierba mala nunca muere. / Los malos siempre duran.",
1293: "Al mal tiempo, buena cara. / Sé positivo ante los problemas.",
1294: "No hay peor sordo que el que no quiere oír. / Es inútil hablar con quien no quiere escuchar.",
1295: "Cría cuervos y te sacarán los ojos. / La ingratitud duele.",
1296: "Del dicho al hecho hay mucho trecho. / Decir es fácil, hacer es difícil.",
1297: "El hábito no hace al monje. / La ropa no define a la persona.",
1298: "Aunque la mona se vista de seda, mona se queda. / No se puede ocultar lo que uno es.",
1299: "Más sabe el diablo por viejo que por diablo. / La experiencia vale más.",
1300: "A palabras necias, oídos sordos. / Ignora los comentarios tontos."
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
