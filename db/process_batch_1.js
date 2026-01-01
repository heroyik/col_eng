
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_1_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_1.json';

const translations = {
  1: "Me saca tres años / Iba tres cursos por delante",
  2: "Es tres años menor que yo / Iba tres cursos por detrás",
  3: "Ni de lejos / Estás muy equivocado",
  4: "Guárdame el sitio / No dejes que nadie se siente ahí",
  5: "Huevos de corral / Huevos camperos",
  6: "Tengo un presentimiento / Me da buena espina (o mala espina)",
  7: "Un metomentodo / Un cotilla",
  8: "Ni me hables de su novio / Mejor no toquemos ese tema",
  9: "No se puede hacer nada / Es inevitable",
  10: "Por necesidad / No quedó más remedio",
  11: "No tenía otra opción / Fue lo único que pude hacer",
  12: "Ya que lo mencionas / Hablando de eso",
  13: "Lo hago por inercia / Lo hago sin ganas",
  14: "No soy de los que se arrepienten fácilmente / No suelo mirar atrás",
  15: "Sushi giratorio / Sushi de cinta",
  16: "Cilantro / Culantro",
  17: "De la nada / Inesperadamente",
  18: "Te dejo tranquilo / No te molesto más",
  19: "Un fuerte aplauso para / Démosle un gran aplauso a",
  20: "Tengo algo que comentar / Hay algo que quiero hablar contigo",
  21: "¿Quién eres tú para decir eso? / Mira quién habla",
  22: "Aclaremos las cosas antes de irnos / Vamos a resolver el malentendido",
  23: "Solo lo digo / Es un comentario, nada más",
  24: "Soy muy temperamental / Tengo muchos altibajos emocionales",
  25: "Está fallando / Me está dando problemas",
  26: "Es muy inoportuno / Qué molestia",
  27: "Vivir la vida al máximo / Disfrutar a tope",
  28: "Me ha dado el mal del puerco / Estoy que exploto de lleno",
  29: "Me parece bien / Trato hecho",
  30: "No es una reacción impulsiva / Lo he pensado bien",
  31: "No es solo por cumplir / Lo hago de verdad",
  32: "Voy en serio / No estoy bromeando",
  33: "¿Te apuntas a cenar? / ¿Te hace una cena?",
  34: "Ojalá pudiera / Me encantaría, pero no puedo",
  35: "Parejas / Medias naranjas",
  36: "Dalo por hecho / Claro que sí",
  37: "Yo me encargo / Déjamelo a mí",
  38: "Aquí tienes / Aquí está",
  39: "Aplaudir / Elogiar",
  40: "Escúchame bien / Léeme los labios",
  41: "Tengo el espíritu joven / Soy joven de corazón",
  42: "Irse a pique / Salir mal",
  43: "¿Te ha comido la lengua el gato? / ¿Por qué estás tan callado?",
  44: "No se me quita la sensación / Tengo el presentimiento",
  45: "Te lo recomiendo mucho / No te lo puedes perder",
  46: "Pon el móvil en silencio / Quítale el sonido al móvil",
  47: "La responsabilidad es mía / Yo asumo las consecuencias",
  48: "Tengo la agenda llena / No tengo huecos",
  49: "Hoy tengo el día a tope / Estoy completísimo hoy",
  50: "Estaba a tope / No tenía ni un minuto libre",
  51: "Amigo del barrio / Colega de la zona",
  52: "Soy joven de espíritu / Llevo un niño dentro",
  53: "Dispara / Soy todo oídos",
  54: "Hasta el mejor escribano echa un borrón / Cualquiera se equivoca",
  55: "Patearse la calle / Hacer el trabajo de campo",
  56: "¿Y ahora qué? / ¿Cuál es el plan?",
  57: "¿Que de dónde soy? Esta es mi tierra / Soy de aquí de toda la vida",
  58: "Esto es una locura / Es de locos",
  59: "Indignante / Es una vergüenza",
  60: "Te lo concedo / En eso tienes razón",
  61: "Se me fue el santo al cielo trabajando / Me lié con el trabajo",
  62: "Me vendría bien un café / Necesito café urgente",
  63: "Tengo el cerebro frito / No me da la cabeza para más",
  64: "¿Para qué molestarse? / No merece la pena",
  65: "Desconectar / Relajarse",
  66: "¿A que no sabes qué? / ¿Adivina qué?",
  67: "De antemano / Con antelación",
  68: "Entrar demasiado fuerte / Ser demasiado intenso",
  69: "Me dejó alucinado / Me quedé de piedra",
  70: "He sido un pesado últimamente / He dado mucho la lata",
  71: "Pasar por / Atravesar",
  72: "No hace falta ni decirlo / Es obvio",
  73: "Me gusta que / Valoro que",
  74: "Pase lo que pase / Sí o sí",
  75: "Por mi experiencia / Según lo que he vivido",
  76: "Tragarme mis palabras / Admitir mi error",
  77: "Estar a la altura de mis expectativas / Cumplir con lo que esperaba",
  78: "Es adictivo / No puedes comer solo uno",
  79: "Nunca tuve oportunidad / No tenía nada que hacer",
  80: "Debí haberlo visto venir / Era de esperar",
  81: "¿Cómo te encuentras hoy? / ¿Qué tal estás hoy?",
  82: "Estar cabreado con / Estar molesto con",
  83: "Investigar a fondo / Examinar",
  84: "¿Cuál es el truco? / ¿Dónde está la trampa?",
  85: "No hace falta que me regales nada / No tenías que molestarte",
  86: "Me estoy tratando el hombro / Estoy yendo a rehabilitación del hombro",
  87: "La coronilla / La parte superior de la cabeza",
  88: "Estoy hecho un lío / No sé qué decidir",
  89: "En el limbo / En punto muerto",
  90: "Es legal / Es de fiar",
  91: "Es un partidazo / Es un chollo de tío",
  92: "No te lo tomes a la tremenda / No te enfades por eso",
  93: "No me arrepiento de mucho / No tengo grandes remordimientos",
  94: "Crisis de los cuarenta / Crisis de la mediana edad",
  95: "No seas tan dramático / No montes un numerito",
  96: "No me vengas con lloriqueos / A llorar a la llorería",
  97: "Me he quedado sin palabras / No sé qué decir",
  98: "¿Te has dado cuenta de eso? / ¿Pillaste eso?",
  99: "Señales sociales / Indirectas sociales",
  100: "¿Te percataste de eso? / ¿Lo captaste?"
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
