
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_3_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_3.json';

const translations = {
  201: "Acabar en / Encontrarse en",
  202: "Echar un vistazo / Leer por encima",
  203: "Que así sea / Pues nada",
  204: "Hechos el uno para el otro / Son tal para cual",
  205: "El buen comienzo es la mitad del trabajo / Empezar bien es tener medio camino hecho",
  206: "Hacer la pelota / Dar coba",
  207: "Me creí el anuncio / Me la colaron con el anuncio",
  208: "Por casualidad / De casualidad",
  209: "Tengo el estómago delicado / Soy de estómago flojo",
  210: "Bébetelo de un trago / ¡Fondo!",
  211: "No me lo restriegues / No hurgues en la herida",
  212: "Le gustas / Siente algo por ti",
  213: "Enamorarse de / Caer en la trampa",
  214: "Dudoso / No me convence",
  215: "¡Mirad! / ¡Contemplad!",
  216: "Lista del decano / Cuadro de honor",
  217: "No intentes jugármela / No te quedes conmigo",
  218: "Te la han colado / Has picado",
  219: "Písale / Dale caña",
  220: "Cazafortunas / Interesada",
  221: "Eres puro bla bla bla / Mucho ruido y pocas nueces",
  222: "Me parece bien / Estoy de acuerdo",
  223: "Estoy a tope / No doy abasto",
  224: "Pequeño choque / Golpe sin importancia",
  225: "No puedo permitirme el lujo de vaguear / Tengo que ponerme las pilas",
  226: "Improvisar / Ver sobre la marcha",
  227: "Mira quién fue a hablar / Le dijo la sartén al cazo",
  228: "Por el boca a boca / De oídas",
  229: "Me siento mareado / Tengo náuseas",
  230: "Recuperar el aliento / Tomar aire",
  231: "Estrenando zapatos / Domando los zapatos",
  232: "Distraerse / Olvidar las penas",
  233: "Hacer el vacío / Ignorar olímpicamente",
  234: "No te preocupes / No hay problema",
  235: "Debí haberlo pensado mejor / Me precipité",
  236: "No quiero ser cotilla / No quiero meterme donde no me llaman",
  237: "Engañar a alguien para que haga tu trabajo / Liar a otro",
  238: "Nada que perder / Por probar que no quede",
  239: "Comiste con los ojos / Se te fueron los ojos",
  240: "Las palabras se las lleva el viento / Del dicho al hecho hay un trecho",
  241: "Lo tiene todo / Es el pack completo",
  242: "Sigue tu instinto / Haz caso a tu corazonada",
  243: "Me palpita el corazón / Tengo mariposas en el estómago",
  244: "Los sentimientos se apagan / La chispa se pierde",
  245: "Deja de restregármelo / Ya vale de regodearse",
  246: "Eso demuestra que / Para que veas",
  247: "El poder de la mente / Todo está en la cabeza",
  248: "Intercambiar ideas contigo / Comentar unas ideas contigo",
  249: "Sentido de pertenencia / Sentirse parte de algo",
  250: "Mimarme / Darme un capricho",
  251: "Mimarme / Darme un gusto",
  252: "Está hecho polvo / Es muy cutre",
  253: "Nada mal / No está nada mal",
  254: "Suena cursi / Suena ñoño",
  255: "Puede parecer obvio / Suena de cajón",
  256: "Mira quién habla / Mira quién fue a hablar",
  257: "Voy con la hora pegada / Ando mal de tiempo",
  258: "Cuestión de tiempo / Es solo esperar",
  259: "El tiempo corre / Se acaba el tiempo",
  260: "Tu mejor opción / Lo mejor que puedes hacer",
  261: "No soy persona hoy / Hoy no estoy católico",
  262: "Espabila / Céntrate",
  263: "Baja de las nubes / Pon los pies en la tierra",
  264: "Se acercan las fechas límite / Los plazos se echan encima",
  265: "Haciendo malabares con todo / Tengo mil cosas a la vez",
  266: "De aire libre / Amante de la naturaleza",
  267: "¿Me pillas? / ¿Me entiendes?",
  268: "Reunión familiar / Evento familiar",
  269: "Córrete un poco / Hazme sitio",
  270: "Mantén la compostura / No pierdas los papeles",
  271: "Mantén la calma / No te alteres",
  272: "Hace un día precioso / Hace muy bueno",
  273: "No te lo creas tanto / No te vengas arriba",
  274: "Deja de dar la lata / Deja de incordiar",
  275: "Adelante / Sírvete tú mismo",
  276: "Consultártelo / Comentártelo antes",
  277: "Redactando / Escribiendo el borrador",
  278: "Es lo mismo / Tanto monta, monta tanto",
  279: "No montes un numerito / No des el espectáculo",
  280: "No la pagues conmigo / Yo no tengo la culpa",
  281: "Qué rencoroso / Qué picado",
  282: "Vienen cosas buenas / Lo mejor está por llegar",
  283: "Te estás saliendo / Lo estás petando",
  284: "La has clavado / Lo bordaste",
  285: "Alucinante / Te vuela la cabeza",
  286: "Felpudo / Se deja pisotear",
  287: "Me pillaste desprevenido / Me agarraste en frío",
  288: "Exmujer / Exesposa",
  289: "Aún me falta mucho / Me queda un largo camino",
  290: "Queda mucho trecho / Falta mucho",
  291: "Escúchate un poco / ¿Te oyes lo que dices?",
  292: "Afrontar las consecuencias / Apechugar",
  293: "No puedo con la vida / Me da algo",
  294: "Depresión otoñal / Bajón de otoño",
  295: "La ilusión es la solución / Vivir en los mundos de Yupi",
  296: "¡Venga! / ¡Dale!",
  297: "Ni de broma / Ni hablar",
  298: "Sal a que te dé el aire / Pisa la calle un poco",
  299: "Finge hasta que lo consigas / Créetelo hasta que sea verdad",
  300: "Tomando un café / Disfrutando del café"
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
