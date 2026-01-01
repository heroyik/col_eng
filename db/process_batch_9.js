
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_9_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_9.json';

const translations = {
  801: ["Me tiene frito mi hermana", "Puse de los nervios a mi hermana"],
  802: ["Algo no me cuadra", "Me siento raro"],
  803: ["No soy yo mismo", "Ando un poco perdido"],
  804: ["Tu mejor opción", "Lo más seguro es..."],
  805: ["Ando corto de tiempo", "El reloj corre"],
  806: ["No me da el cuero", "No puedo con esto"],
  807: ["Va a sonar cursi", "Sonará empalagoso"],
  808: ["No está nada mal", "Se deja ver"],
  809: ["Un spa para que me mimen", "Un día de relax"],
  810: ["Se me escapó", "Se me salió sin querer"],
  811: ["Agridulce", "Una de cal y una de arena"],
  812: ["No te creas tanto", "Bájale los humos"],
  813: ["Deja de dar la lata", "No me agobies"],
  814: ["Házte el gusto", "Tú mismo"],
  815: ["Consultártelo", "Comentártelo"],
  816: ["He estado liado", "Ando a mil"],
  817: ["No te vas a morir", "Sobrevivirás"],
  818: ["Tomar bajo el ala", "Apadrinar"],
  819: ["Para nada", "En balde"],
  820: ["Te debo una", "Estoy en deuda"],
  821: ["Hay rollo entre ellos", "Ahí hay tema"],
  822: ["Aclarar las cosas", "Limpiar el ambiente"],
  823: ["Estorbar", "Meterse en medio"],
  824: ["Con los nervios de punta", "Inquieto"],
  825: ["¡Tío!", "¡Macho!"],
  826: ["Ya huele a primavera", "La primavera está en el aire"],
  827: ["Es una locura", "Qué fuerte"],
  828: ["¡Inocente!", "Día de los Inocentes"],
  829: ["A mis espaldas", "Por la espalda"],
  830: ["Salúdame a ~", "Dale recuerdos a ~"],
  831: ["Sin ofender", "No te lo tomes a mal"],
  832: ["¿Me sigues?", "¿Me explico?"],
  833: ["Relájate", "Bájale un cambio"],
  834: ["Matrícula", "Lo que cuesta la carrera"],
  835: ["Un día sí y uno no", "Día por medio"],
  836: ["Chivarse", "Acusar"],
  837: ["Pasarse", "Exagerar"],
  838: ["Tener bronca con", "Tener problemas con"],
  839: ["Ir tirando", "Sobrevivir"],
  840: ["Conmovido", "Emocionado"],
  841: ["Mantecoso", "Suave como la mantequilla"],
  842: ["Quedarse frito", "Dar una cabezada"],
  843: ["Por los pelos", "Casi no la cuento"],
  844: ["En otro color", "De otro tono"],
  845: ["Cacharro", "Salió malo"],
  846: ["Para llevar", "Una cajita"],
  847: ["No tragar con eso", "No estar por la labor"],
  848: ["Cortar el rollo", "Interrumpir"],
  849: ["Es lo que hay", "Así son las cosas"],
  850: ["¡Suéltalo ya!", "Desembucha"],
  851: ["Falleció y lo incineraron", "Murió y fue cremado"],
  852: ["Depresión otoñal", "Bajón de otoño"],
  853: ["Espera un momento", "No te muevas"],
  854: ["En paro", "Buscando curro"],
  855: ["Restregarlo", "Echar sal en la herida"],
  856: ["Soso", "Desabrido"],
  857: ["Tragárselo todo", "Creérselo todo"],
  858: ["A la vuelta de la esquina", "Ya mismo llega"],
  859: ["Algo", "Más o menos"],
  860: ["Dar por sentado", "No valorar"],
  861: ["Para siempre", "Definitivamente"],
  862: ["Tomárselo a pecho", "Sentirse aludido"],
  863: ["Dejarlo para el último momento", "Procrastinar hasta el final"],
  864: ["Pegajoso", "Empalagoso"],
  865: ["Me importa un pimiento", "Me da igual"],
  866: ["No lo gafes", "No llames al mal tiempo"],
  867: ["Cierra el pico", "Deja de parlotear"],
  868: ["Cumple con todo", "Lo tiene todo"],
  869: ["Apúntalo antes de que se me olvide", "Anótalo ya"],
  870: ["Despreocupado", "Como si nada"],
  871: ["Ha sido increíble", "Parece mentira"],
  872: ["Pasar la noche en vela", "Quemarse las pestañas"],
  873: ["Hacer vibrar el corazón", "Acelerar el pulso"],
  874: ["¿Estoy alucinando?", "¿Me estoy montando una película?"],
  875: ["No puedo", "Imposible"],
  876: ["¿Inviertes en bolsa?", "¿Juegas a la bolsa?"],
  877: ["La bolsa", "El mercado de valores"],
  878: ["Lograrlo", "Sacarlo adelante"],
  879: ["Te lo juro", "Va en serio"],
  880: ["Encaja perfecto", "Es justo lo que buscaba"],
  881: ["Estoy currando", "Estoy en horario de trabajo"],
  882: ["Lo tengo borroso", "No me acuerdo bien"],
  883: ["Tengo el sueño ligero", "Me despierto con nada"],
  884: ["Soy algo tímido", "Me da corte"],
  885: ["No me gustan las fotos", "Me da vergüenza la cámara"],
  886: ["Está como nuevo", "Impecable"],
  887: ["Tienen mucho en común", "Son tal para cual"],
  888: ["Típico de ti", "No podías ser otro"],
  889: ["Cuídate mucho", "No te descuides"],
  890: ["¡Dale!", "¡A por ello!"],
  891: ["Menuda pieza", "Es un personaje"],
  892: ["No te fallaré", "No te decepcionaré"],
  893: ["Te he estado buscando", "Llevo rato llamándote"],
  894: ["Fue un golpe de suerte", "Fue pura chiripa"],
  895: ["No te guardes las cosas", "Desahógate"],
  896: ["No tengas vergüenza", "Sin miedo"],
  897: ["Te estoy cogiendo cariño", "Me estás ganando"],
  898: ["Me quedé trabajando hasta tarde", "Trasnoché trabajando"],
  899: ["Menos de dos minutos", "Casi dos minutos"],
  900: ["Sería lo ideal", "En el mejor de los casos"]
};

try {
  const data = fs.readFileSync(inputBatchPath, 'utf8');
  const batch = JSON.parse(data);

  if (batch.length !== 100) {
    throw new Error('Batch file should contain exactly 100 records.');
  }

  let updatedCount = 0;

  batch.forEach(record => {
    if (translations[record.id]) {
        // Format: "Expression 1 / Expression 2"
        record.spanish = translations[record.id].join(' / ');
        updatedCount++;
    } else {
        console.warn(`Warning: No translation found for ID ${record.id}`);
    }
  });

  fs.writeFileSync(outputBatchPath, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`Successfully processed Batch 9. Updated ${updatedCount} records. Output saved to ${outputBatchPath}`);

} catch (err) {
  console.error('Error processing Batch 9:', err);
}
