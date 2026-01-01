
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_7_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_7.json';

const translations = {
  601: "No tengo ganas / No estoy de humor",
  602: "No puedo evitarlo / Es superior a mí",
  603: "Cuantos más, mejor / Cuantos más seamos, mejor lo pasaremos",
  604: "Yo me encargo / Déjamelo a mí",
  605: "Soy todo oídos / Te escucho",
  606: "No veo la hora / Me muero de ganas",
  607: "Faltó poco / Por los pelos",
  608: "Ahí lo tienes / Eso es / Muy bien",
  609: "Te equivocas de persona / Llamas a la puerta equivocada",
  610: "Aquí vamos / Ya estamos otra vez",
  611: "Cuanto antes / Lo antes posible",
  612: "No tengo ni idea / Ni puñetera idea",
  613: "No es lo mío / No me va",
  614: "Vayamos al grano / Vamos a lo importante",
  615: "Llego tarde / Voy con retraso",
  616: "Se me pasó / Se me olvidó por completo",
  617: "Me muero de hambre / Estoy canino",
  618: "Estoy lleno / No puedo más",
  619: "Vamos a picar algo / Vamos a comer algo",
  620: "Vale la pena esperar / Merece la espera",
  621: "¡Venga ya! / ¡No me fastidies!",
  622: "Ni de coña / Ni hablar",
  623: "Depende / Según se mire",
  624: "Nunca se sabe / Quién sabe",
  625: "Te aviso / Te digo algo",
  626: "Espero que sirva / Espero haber ayudado",
  627: "Te lo agradezco / Se agradece",
  628: "Ese es el plan / Esa es la idea",
  629: "El tiempo dirá / Ya se verá",
  630: "Vale la pena intentarlo / Por probar no perdemos nada",
  631: "Todo el tinglado / El pack completo",
  632: "Empecemos / Vamos a ello",
  633: "Eso me recuerda... / Por cierto, eso me hace pensar...",
  634: "Te vuelvo a decir / Te contesto luego",
  635: "Mantenme informado / Avísame de cualquier cosa",
  636: "Avísame / Dime algo",
  637: "Sin duda / Ni lo dudes",
  638: "Jajaja / Me parto",
  639: "¡Dios mío! / ¡Madre mía!",
  640: "Ahora vuelvo / Vuelvo en un plis",
  641: "Luego hablamos / Hablamos luego",
  642: "Clavado / Lo bordaste",
  643: "Ni idea / No sé",
  644: "Para tu información / Por si te interesa",
  645: "Culpa mía / Fallo mío",
  646: "Qué asco / Qué mal rollo",
  647: "Cont. / Sigue",
  648: "Pan comido / Está chupado",
  649: "Yo igual / Lo mismo dig",
  650: "Todo oídos / Te escucho",
  651: "¡Ánimo! / Arriba ese ánimo",
  652: "Manazas / Torpe",
  653: "Me mantengo en mis trece / Lo sostengo",
  654: "Ir a lo fácil / Hacer ñapas",
  655: "No saques el tema / Ni lo mentes",
  656: "Estoy de los nervios / Estoy al límite",
  657: "Ir con pies de plomo / Andar con cuidado",
  658: "Quedarse en nada / Perder fuerza",
  659: "Distanciarse / Alejarse",
  660: "Tú precisamente / Precisamente tú",
  661: "Se te han adelantado / Voy muy por delante",
  662: "¡Qué casualidad! / ¿Cuáles son las probabilidades?",
  663: "Puntual / Respetuoso con el tiempo",
  664: "Ollvídalo / Retiro lo dicho",
  665: "No pilla las indirectas / No se entera",
  666: "Por si sirve de algo / Si te consuela",
  667: "Contestar mal / Ponerse borde",
  668: "Ponerme en un compromiso / Dejarme en evidencia",
  669: "Comida reconfortante / Capricho",
  670: "Invito yo / Pago yo",
  671: "Pagar a medias / Dividir la cuenta",
  672: "Cerrado / Exclusivo (en plan grupo)",
  673: "Caballa curada / Caballa en salazón",
  674: "Quedarse en la cama / Dormir hasta tarde",
  675: "Me quedé dormido / Se me pegaron las sábanas",
  676: "Subestimar / Menospreciar",
  677: "Crédulo / Se lo traga todo",
  678: "Pesado / Harto",
  679: "Rebotado / Picado",
  680: "Siento no basta / Con perdón no se arregla",
  681: "Ya es toda una mujer / Cómo ha crecido",
  682: "Cógelo con pinzas / No te lo creas todo",
  683: "Pensando en voz alta / Solo divagaba",
  684: "Ídem / Lo mismo digo",
  685: "Yo no firmé para esto / Esto no es lo que habíamos hablado",
  686: "No valgo para esto / No estoy hecho para esto",
  687: "Qué fastidio / Qué bajón",
  688: "Me saca de quicio / Me pone de los nervios",
  689: "Dame algo de crédito / Reconócemelo",
  690: "Verme en / Encontrarme en",
  691: "Si alguna vez te apetece... / Si te dan ganas de...",
  692: "Mantener el rumbo / Que no se desmadre",
  693: "Deja de quejarte / A llorar a la llorería",
  694: "Yo cargo con el muerto / Me comeré el marrón",
  695: "Estoy dudando entre A y B / No sé si A o B",
  696: "Consultarlo con la almohada / Pensarlo bien",
  697: "Tienes agallas / Tienes morro",
  698: "Guárdatelo / Chitón",
  699: "El que sabe, sabe / Si lo pillas, lo pillas",
  700: "Solo estoy mirando"
};

try {
  const data = fs.readFileSync(inputPath, 'utf8');
  let records = JSON.parse(data);

  records = records.map(record => {
    if (translations[record.id]) {
      record.spanish = translations[record.id];
    }
    return record;
  });

  fs.writeFileSync(outputPath, JSON.stringify(records, null, 2), 'utf8');
  console.log(`Successfully processed ${records.length} records.`);
} catch (err) {
  console.error('Error:', err);
}
