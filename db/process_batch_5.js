
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_5_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_5.json';

const translations = {
  401: "Anda, vete ya / Venga, tira",
  402: "¿Por qué no me atreví a decirlo? / ¿Por qué no fui capaz de decirlo?",
  403: "Come hasta hartarte / Ponte las botas",
  404: "Situación crítica / Incierto",
  405: "Me sentía muy angustiado / Estaba muy preocupado",
  406: "¿Qué dices? Me he perdido / ¿Cómo? No te sigo",
  407: "Ojalá / Ya me gustaría",
  408: "Ni de coña / Ni hablar",
  409: "Hacer la previa / Beber antes de salir",
  410: "Nacido y criado / De aquí de toda la vida",
  411: "Música para mis oídos / Qué gusto oír eso",
  412: "Ve al grano / Déjate de rodeos",
  413: "Llego 20 minutos tarde / Se me ha hecho tarde 20 minutos",
  414: "Que te pillen / Ser descubierto",
  415: "Cuéntame qué pasó ese día paso a paso / Explícame ese día",
  416: "¿Cúal es el truco? / ¿Qué tramas?",
  417: "Perdió los papeles / Explotó",
  418: "Cómplice / Compinche",
  419: "Visitar a alguien / Ir a ver a alguien",
  420: "No lo llevo encima / No lo tengo aquí",
  421: "La cola empieza allí atrás / A la cola",
  422: "Cortar / Romper",
  423: "O todo o nada / A lo grande o nada",
  424: "Fui impulsivo / Me precipité",
  425: "Te ves demacrado / Estás en los huesos",
  426: "Cantar como un canario / Irse de la lengua",
  427: "Comérselo todo / Arruinar a alguien comiendo",
  428: "Le está carcomiendo por dentro / Le consume por dentro",
  429: "Me lo imaginaba / Típico",
  430: "Poner a parir a alguien / Echar una bronca monumental",
  431: "De una forma u otra / Sea como sea",
  432: "Giros inesperados / Altibajos",
  433: "Recompensar generosamente / Pagar muy bien",
  434: "Hacer de tripas corazón / Tragar con ello",
  435: "A toda costa / Cueste lo que cueste",
  436: "Tal cual, de la nada / Una sorpresa total",
  437: "Desmoronándose / Cayéndose a pedazos",
  438: "Pensar con claridad / Pensar bien",
  439: "Migraña / Jaqueca",
  440: "Dejar a alguien fuera / Excluir",
  441: "No sabría decirte / Ni idea",
  442: "No te alteres / No te sofoques",
  443: "¿Lo llevas a mi habitación? / ¿Me lo subes al cuarto?",
  444: "Tomaré lo mismo / Lo mismo para mí",
  445: "Llevaba tiempo queriendo decirte / Quería comentarte algo",
  446: "¿Quieres otro? / ¿Te apetece otro?",
  447: "Compadecerse de / Entender a",
  448: "¿Cuánto tiempo ha pasado? / ¿Cuánto hace?",
  449: "¿Cómo has estado? / ¿Qué tal te ha ido?",
  450: "Caso atípico / Excepción",
  451: "Me vendría bien / Necesito un poco de",
  452: "Tener mano para / Dársele bien",
  453: "Tienes un don natural / Has nacido para esto",
  454: "Tienes labia / Qué bien hablas",
  455: "Me salió natural / Me salió solo",
  456: "Dámelo a ojo / Haz un cálculo aproximado",
  457: "Eres muy disciplinado / Tienes mucha fuerza de voluntad",
  458: "Me da escalofríos / Se me pone la piel de gallina",
  459: "Cogí la costumbre de / Me acostumbré a",
  460: "Déjame compensarte / Deja que te lo compense",
  461: "Me encuentro mal / Estoy pocho",
  462: "Explotar / Ponerse hecho una furia",
  463: "No hay nada mejor / Inmejorable",
  464: "Dejarlo de golpe / Cortar por lo sano",
  465: "Legítimo / De verdad",
  466: "No es rival para mí / No tiene nada que hacer contra mí",
  467: "Con calma / Despacito",
  468: "Ok / Vale / Oki doki",
  469: "Psé / Ni fú ni fá",
  470: "Tiene sentido / Cuadra",
  471: "El aire está mal / Hay mucha contaminación",
  472: "Un tío tranquilo / Un tío relajado",
  473: "Esto servirá / Con esto bastará",
  474: "Todo el tinglado / El pack completo",
  475: "Chupado / Pan comido",
  476: "Resentido / Tiene una espinita clavada",
  477: "Actitud arisca / Borde",
  478: "Me lo dicen mucho / Típico comentario",
  479: "Hazla en vertical / Saca la foto en vertical",
  480: "Troll / Provocador",
  481: "Estoy flipando / Me estoy volviendo loco",
  482: "¿Abrís hoy? / ¿Está abierto hoy?",
  483: "Pasando una fase / Es una etapa",
  484: "Se le pasará con la edad / Ya madurará",
  485: "Público / Audiencia",
  486: "Gorrón / Chupasangre",
  487: "¡Hace un frío que pela! / ¡Te congelas ahí fuera!",
  488: "Que da que pensar / Profundo",
  489: "Desembucha o calla para siempre / Cuéntalo todo o chitón",
  490: "Canceló el proyecto / Suspendió el proyecto",
  491: "Hoy me salto la dieta / Es mi día libre de dieta",
  492: "Me costó dormir / No pegué ojo",
  493: "Me lo pasé genial / Me lo pasé bomba",
  494: "Ni idea / No sé",
  495: "Las chicas... / Mujeres...",
  496: "Invito yo / Pago yo",
  497: "Hace calor par ser noviembre / Está templado para noviembre",
  498: "Está bien por el precio / Buena calidad-precio",
  499: "Solo pienso en voz alta / Hablo por hablar",
  500: "No le des tantas vueltas / No busques tres pies al gato"
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
