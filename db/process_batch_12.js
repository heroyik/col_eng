
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_12_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_12.json';

// Dictionary of manual translations for Batch 12 (IDs 1101-1200)
// Format: ID: "Spanish Expression 1 / Spanish Expression 2"
const translations = {
1101: "El dinero no crece en los árboles. / El dinero cuesta ganarlo.",
1102: "Vamos a agarrarle el ritmo. / Vamos a meternos en ambiente.",
1103: "Estoy en eso. / Lo estoy trabajando.",
1104: "Soltó una bomba. / Dio una noticia impactante.",
1105: "Estaba en un dilema. / No sabía qué hacer.",
1106: "Es lo que hay. / Así son las cosas.",
1107: "Me pasé la noche en vela. / No dormí en toda la noche.",
1108: "Tiene un corazón de oro. / Es un pan de Dios.",
1109: "De entrada. / Desde el principio.",
1110: "Desde el primer día. / Desde el comienzo.",
1111: "Esto es pan comido. / Es súper fácil.",
1112: "Habla por ti. / Eso lo dirás tú.",
1113: "Ponte las pilas. / Organízate.",
1114: "No me afecta. / Me da igual.",
1115: "No te tardes tanto. / No le des tantas vueltas.",
1116: "¡Ya párale! / ¡Basta ya!",
1117: "¿Qué te trae por aquí? / ¿Qué haces aquí?",
1118: "La decisión es tuya. / Ahora te toca a ti.",
1119: "Eso nunca pasará. / ¡Ni lo sueñes!",
1120: "Están luchando con uñas y dientes. / Están peleando a muerte.",
1121: "Pasé con honores. / Me fue excelente.",
1122: "No quiero hacer un escándalo. / No quiero armar un show.",
1123: "Me mató de risa. / Me hizo reír muchísimo.",
1124: "Para que lo sepas. / Que te quede claro.",
1125: "Mejor prevenir que lamentar. / Más vale prevenir.",
1126: "¡Dímelo a mí! / ¡Ni me digas!",
1127: "Su esposa le puso una regañada. / Su mujer lo regañó feo.",
1128: "Por favor corre la voz. / Pásale el dato a todos.",
1129: "Odio decirte esto, pero... / Siento ser yo quien te lo diga, pero...",
1130: "Por mí, lo que sea. / Me da exactamente lo mismo.",
1131: "No te preocupes. / Tranki, no pasa nada.",
1132: "Te lo juro por mi vida. / Es la pura verdad.",
1133: "Salió gente hasta debajo de las piedras. / Apareció gente de la nada.",
1134: "Es como andar en bici, no se olvida. / Lo que bien se aprende no se olvida.",
1135: "Me devoré este libro. / Leí este libro con lupa.",
1136: "Ya era hora. / Ya nos tardamos.",
1137: "No quiero buscarle la quinta pata al gato. / No nos pongamos detallistas.",
1138: "Metió la pata. / Cometió un error garrafal.",
1139: "Tiene dinero para tirar para arriba. / Le sobra la plata.",
1140: "Se me hizo un nudo en la garganta. / Me puse sentimental.",
1141: "Peor es nada. / Algo es algo.",
1142: "Tienes que agarrarle la onda. / Tienes que aprender cómo funciona esto.",
1143: "Le está sacando el jugo. / Se está aprovechando.",
1144: "No puedes escoger solo lo bueno. / Tienes que aceptar todo, no solo lo que te gusta.",
1145: "Diste en el clavo. / Acertaste.",
1146: "¿Qué importa el nombre? / El nombre es lo de menos.",
1147: "Él demuestra con hechos. / Él cumple lo que dice.",
1148: "Ya nos preocuparemos de eso cuando llegue el momento. / Cada cosa a su tiempo.",
1149: "Deja que se calmen las aguas. / Esperemos a que pase el alboroto.",
1150: "Era duro como una piedra. / No tenía compasión.",
1151: "Tienes todo para triunfar. / Tienes madera de campeón.",
1152: "No tientes a la suerte. / No abuses de tu suerte.",
1153: "Estoy al límite. / Ya no aguanto más.",
1154: "El mundo es un pañuelo. / ¡Qué pequeño es el mundo!",
1155: "Estás en la cuerda floja. / Te la estás jugando.",
1156: "Voy a intentarlo. / Le voy a dar una oportunidad.",
1157: "Toda precaución es poca. / Nunca se es demasiado cuidadoso.",
1158: "¡Esto se acabó! / ¡Misión cumplida!",
1159: "No saques conclusiones precipitadas. / No te adelantes a los hechos.",
1160: "Es justo lo mío. / Me viene como anillo al dedo.",
1161: "Se te nota en la cara. / Tu cara lo dice todo.",
1162: "Esto es para mí. / Esto me queda perfecto.",
1163: "El cielo es el límite. / No hay límites.",
1164: "La práctica hace al maestro. / Practicando se aprende.",
1165: "Me operé de la vista. / Me hice la cirugía láser.",
1166: "¿Cuánto es la espera? / ¿Cuánto tiempo hay que esperar?",
1167: "La naturaleza llama. / Tengo que ir al baño.",
1168: "Déjame ahí. / Bájame ahí.",
1169: "Te ves mejor en persona. / En persona eres más guapo/a.",
1170: "¿Me das dos, por favor? / Que sean dos, por favor.",
1171: "Baja la voz. / Habla más bajito.",
1172: "Camina para que se te pase. / Sal a caminar un rato.",
1173: "Di vueltas en la cama toda la noche. / No pegué el ojo en toda la noche.",
1174: "Tengo dos pies izquierdos. / Soy muy torpe para bailar.",
1175: "Me están saliendo granos. / Tengo la cara brotada.",
1176: "Quiero tomarme un tiempo libre. / Necesito unas vacaciones.",
1177: "No soy bueno con las manos. / Soy torpe para las manualidades.",
1178: "Me está sangrando la nariz. / Tengo hemorragia nasal.",
1179: "Estoy hecho polvo. / Estoy reventado.",
1180: "No tengo oído musical. / Canto fatal.",
1181: "Ha sido una locura. / He estado a mil por hora.",
1182: "Me molesta. / Me fastidia.",
1183: "Que yo sepa, no. / No tengo entendido eso.",
1184: "Caso perdido. / No tiene remedio.",
1185: "¡Qué nostalgia! / ¡Eso me trae recuerdos!",
1186: "Soy una tumba. / Mis labios están sellados.",
1187: "A estudiar se ha dicho. / Ponerse a estudiar.",
1188: "Me fui. / Me quedé en blanco.",
1189: "¿Venden Nike? / ¿Tienen Nike aquí?",
1190: "¿Se nota? / ¿Te das cuenta?",
1191: "Se cree mucho. / Es un creído.",
1192: "¿De casualidad sabes...? / ¿Por casualidad sabes...?",
1193: "Eso engorda. / Tiene muchas calorías.",
1194: "Salúdala de mi parte. / Mándale mis saludos.",
1195: "Vestido para matar. / Estás despampanante.",
1196: "Porque puedo. / Porque quiero y puedo.",
1197: "Porque sí. / Nomás porque sí.",
1198: "El que llega primero, se lo queda. / Por orden de llegada.",
1199: "Bueno con la gente. / Tiene don de gentes.",
1200: "Lo presiento en los huesos. / Tengo una corazonada."
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
