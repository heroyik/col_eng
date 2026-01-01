
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_11_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_11.json';

// Dictionary of manual translations for Batch 11 (IDs 1001-1100)
// Format: ID: "Spanish Expression 1 / Spanish Expression 2"
const translations = {
1001: "Pero hay un giro. / Pero hay una sorpresa.",
1002: "Ya salimos del peligro. / Ya pasamos lo peor.",
1003: "Vamos viendo. / Improvisemos.",
1004: "Ni lo menciones. / Ni hables de eso.",
1005: "Comes con los ojos. / Te serviste demasiado.",
1006: "No se le acerca ni un poco. / No tiene comparación.",
1007: "No te culpo. / Yo hubiera hecho lo mismo.",
1008: "Que eso no te moleste. / No le hagas caso.",
1009: "Estoy a tu servicio. / ¿En qué te puedo ayudar?",
1010: "Ella es muy tranquila. / Ella no se pone nerviosa.",
1011: "Él es muy sencillo. / Él tiene los pies en la tierra.",
1012: "Tenemos que hablar del problema. / Hay que solucionar esto.",
1013: "¿Cuántos años crees que tengo? / ¿Qué edad me echas?",
1014: "Me hizo famoso. / Me dio a conocer.",
1015: "Se venden como pan caliente. / Se están vendiendo muy rápido.",
1016: "Este es el punto clave. / Esto es lo más importante.",
1017: "¿Quién te crees que soy? / ¿Por quién me tomas?",
1018: "Se salió de control. / Todo se complicó rápido.",
1019: "Se hizo viral rápido. / Se volvió muy popular.",
1020: "A fin de cuentas. / Al final del día.",
1021: "Tenía mucha energía. / Estaba muy animado.",
1022: "Es un hueso duro de roer. / Es un problema difícil.",
1023: "Vamos a chismear. / Vamos a platicar un rato.",
1024: "No bajes la guardia. / Mantente alerta.",
1025: "Prometieron la luna y las estrellas. / Prometieron demasiado.",
1026: "Va por buen camino. / Lo está haciendo bien.",
1027: "No es tan malo como parece. / No es para tanto.",
1028: "Calma los nervios. / Tranquilízate.",
1029: "Fue un gran impulso. / Fue justo lo que necesitábamos.",
1030: "Así son las cosas. / Así es la vida.",
1031: "Me alegra oír eso. / Qué buena noticia.",
1032: "No estaba haciendo su parte. / Era una carga.",
1033: "No me lo trago. / No lo creo.",
1034: "Me arreglé mucho. / Me puse guapa.",
1035: "Estás en racha. / Te está yendo súper bien.",
1036: "El trato se cayó. / No se hizo el negocio.",
1037: "Me peleé con él. / Dejé de hablarme con él.",
1038: "No es ciencia nuclear. / No es tan difícil.",
1039: "Tenemos que cubrir el trabajo. / Hay que echarle ganas entre todos.",
1040: "Me arriesgué. / No lo pensé dos veces.",
1041: "La belleza es superficial. / Lo que importa es lo de adentro.",
1042: "No soy bueno con las palabras. / Me cuesta expresarme.",
1043: "No puedo más. / Estoy agotado.",
1044: "Yo soy el que manda. / Yo decido aquí.",
1045: "Tengo mariposas en el estómago. / Estoy muy nervioso.",
1046: "Te dejaron en visto. / Te ignoraron.",
1047: "Me consentía mucho. / Me mimaba.",
1048: "Lo hice desde cero. / Lo hice yo mismo.",
1049: "No me robes el protagonismo. / No me opaques.",
1050: "Se quedó callado. / No dijo ni pío.",
1051: "Gastaría sin control. / Compraría de todo.",
1052: "No quiero abrir la caja de Pandora. / No quiero meter la pata.",
1053: "Yo invito. / Va por mi cuenta.",
1054: "¡Reacciona! / ¡Despierta!",
1055: "Nos metiste en este lío. / Es tu culpa que estemos así.",
1056: "No es lo que parece. / No pienses mal.",
1057: "¿Cuál es tu gusto culposo? / ¿Qué es lo que te gusta en secreto?",
1058: "Me tocó bailar con la más fea. / Me tocó la peor parte.",
1059: "Ella es la mejor de la historia. / Es una leyenda.",
1060: "Tengo sentimientos encontrados. / No sé cómo sentirme.",
1061: "He visto cosas peores. / No está tan mal.",
1062: "El té sabe raro. / El té tiene un sabor extraño.",
1063: "Es una ganga. / Está regalado.",
1064: "Es hora de decidir. / Tienes que decidir ya.",
1065: "Lo improvisé. / Lo hice al aventón.",
1066: "Hoy rompo la dieta. / Hoy como lo que quiera.",
1067: "Me quedé sin palabras. / No sé qué decir.",
1068: "Hicimos un esfuerzo extra. / Dimos más del cien.",
1069: "Los cancelé. / Ya no me junto con ellos.",
1070: "Estaba hasta el cuello de trabajo. / Tenía muchísima chamba.",
1071: "Está baratísimo. / Cuesta casi nada.",
1072: "Estás en tu casa. / Siéntete cómodo.",
1073: "Tómalo o déjalo. / Es mi última oferta.",
1074: "No quiero quedar en ridículo. / No quiero pasar vergüenza.",
1075: "Estoy en una encrucijada. / No sé qué camino tomar.",
1076: "Soy un libro abierto. / No tengo secretos.",
1077: "Hubo un pequeño alboroto. / Hubo un lío.",
1078: "Los chicos no dieron la talla. / No estuvieron a la altura.",
1079: "Qué lindo detalle de tu parte. / Gracias por decir eso.",
1080: "No tienes ninguna oportunidad. / Es imposible que ganes.",
1081: "Por fin entendió. / Ya le cayó el veinte.",
1082: "Miente con todos los dientes. / Es un mentiroso de primera.",
1083: "A falta de una palabra mejor. / Por no decir otra cosa.",
1084: "Es hora de moverse. / Vámonos.",
1085: "¡Esa es la actitud! / ¡Así se habla!",
1086: "Me estoy recuperando. / Ya voy mejor.",
1087: "Me convenciste. / Trato hecho.",
1088: "No me cabe en la cabeza. / No lo entiendo.",
1089: "Qué tierno de tu parte. / Eres un amor.",
1090: "Ya veré qué hago. / Yo lo resuelvo.",
1091: "La tecnología móvil es lo principal. / Los celulares son lo de hoy.",
1092: "Él dirá la cruda verdad. / Él destapará la olla.",
1093: "No dejaré piedra sin mover. / Haré hasta lo imposible.",
1094: "Me voy al gimnasio. / Ya me voy a entrenar.",
1095: "La cosa es esta. / El punto es este.",
1096: "Ya quiero que llegue ese día. / No puedo esperar.",
1097: "Él tiene influencia. / Él es pesado.",
1098: "Se esfumó. / Desapareció del mapa.",
1099: "No cambies el tema. / No te desvíes.",
1100: "Soy optimista. / Veo el vaso medio lleno."
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
