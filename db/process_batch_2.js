
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_2_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_2.json';

const translations = {
  101: "¿Te enteraste de la oferta de trabajo de Mark? / ¿Supiste lo del nuevo curro de Mark?",
  102: "Paquete de beneficios / Prestaciones",
  103: "Difícil de decir / Está por ver",
  104: "Si estuvieras en mi lugar / Ponte en mi piel",
  105: "Esto es prioritario / Esto va antes que nada",
  106: "¿Te suena? / ¿Te dice algo?",
  107: "Ya era hora / Llevaba tiempo pendiente",
  108: "Época dorada / En sus mejores tiempos",
  109: "No hace falta disculparse / No te preocupes, no pasa nada",
  110: "Madura un poco / Deja de comportarte como un crío",
  111: "Suele contestar rápido / No suele tardar en responder",
  112: "Beneficio de la duda / Darle un voto de confianza",
  113: "Despejar la mente / Olvidarse de los problemas",
  114: "Ponte en mi lugar / Ponte en mis zapatos",
  115: "Pasar desapercibido / No llamar la atención",
  116: "Céntrate en lo tuyo / A lo tuyo",
  117: "Ya he pasado por eso / Me conozco esa historia",
  118: "Por las risas / Por diversión",
  119: "El coso ese / El chisme",
  120: "Explícamelo paso a paso / Guíame",
  121: "Dar la vuelta / Rotación",
  122: "Sigue así / No te rindas",
  123: "Me he peinado / He ido a la peluquería",
  124: "Hace un siglo / Hace tiempo que no nos vemos",
  125: "Hace una eternidad / Cuánto tiempo",
  126: "Defraudar a alguien / Dejar tirado a alguien",
  127: "Te has saltado mucho / Te has pasado tres pueblos",
  128: "Fijar esta posición en '&&&ahora&&&&' / Marcar este punto como actual",
  129: "Solucionar / Arreglar",
  130: "Desconectar / Dejar de pensar en ello",
  131: "Se me escapa / No me entero de nada",
  132: "Me supera / Es demasiado para mí",
  133: "Empatados / A la par",
  134: "Estamos en paz / Cuentas saldadas",
  135: "Suéltalo / Cuéntamelo todo",
  136: "Cóbrame / Hazme la cuenta",
  137: "Fuera de nuestro alcance / Nos queda grande",
  138: "Estoy al borde del colapso / Me va a dar algo",
  139: "Dejarlo para luego / Procrastinar",
  140: "No me lo quito de la cabeza / Le he estado dando vueltas",
  141: "Sopesar los pros y los contras / Valorar lo bueno y lo malo",
  142: "Volver a la normalidad / Reconducir la situación",
  143: "¿Qué te carcome? / ¿Qué te ronda por la cabeza?",
  144: "Un fuerte aplauso para ella / Aplaudan fuerte",
  145: "¿Cómo te va? / ¿Qué tal todo?",
  146: "Me apunto / Cuenten conmigo",
  147: "No podré ir / Me viene fatal",
  148: "No hay mal que por bien no venga / Una bendición disfrazada",
  149: "Lo dejamos para otro día / Te lo debo para la próxima",
  150: "Tú decides / Lo que tú quieras",
  151: "¿Cuándo empieza el embarque? / ¿A qué hora embarcamos?",
  152: "¿El vuelo sale a su hora? / ¿Va en hora el avión?",
  153: "¿Me puede dar ventanilla? / ¿Puedo pedir asiento de ventana?",
  154: "¿Cuánto dura el vuelo? / ¿Cuánto tiempo de vuelo es?",
  155: "¿Dónde está el baño más cercano? / ¿El servicio, por favor?",
  156: "Estoy esperando para embarcar / Estoy en la puerta de embarque",
  157: "¿Qué hiciste el finde? / ¿Qué tal el fin de semana?",
  158: "Cárguelo a mi habitación / Póngalo a mi cuenta",
  159: "Indeciso / No lo tengo claro",
  160: "Cárgalo a mi tarjeta / Pago con tarjeta",
  161: "A la habitación, por favor / Apúntalo a mi cuarto",
  162: "Espacioso / Es amplio",
  163: "Tienes muy buen gusto / Qué buen gusto tienes",
  164: "Impecable / Perfecto",
  165: "¿Me disculpan? / ¿Puedo retirarme un momento?",
  166: "En las nubes / Estás en la parra",
  167: "Librarse de una buena / Esquivar una bala",
  168: "Empollando a última hora / Estudiar a marchas forzadas",
  169: "Así se hace / Muy bien hecho",
  170: "Emborracharse / Ponerse hasta arriba",
  171: "¡Me lo pido! / ¡Mío!",
  172: "Me pido copiloto / Voy delante",
  173: "¡Copiloto! / ¡Me pido alante!",
  174: "Tocar el gordo / Dar en el clavo",
  175: "Comí más con los ojos que con la boca / Se me fueron los ojos",
  176: "No doy abasto / Tengo demasiadas cosas entre manos",
  177: "¡Vamos allá! / ¡Arrancamos!",
  178: "Cuenta, cuenta / Vamos a cotillear",
  179: "Dejar a alguien vendido / Echar a los leones",
  180: "A mis espaldas / En mi haber",
  181: "Deja de curiosear / No seas cotilla",
  182: "Podría escuchar esto todo el día / No me canso de escucharlo",
  183: "Escúchame un momento / Déjame explicarte",
  184: "Riquísimo / Está de muerte",
  185: "Nadie / Ni el tato",
  186: "Solo por curiosidad / Por saber...",
  187: "Aquí está / Lo encontré",
  188: "Vale la pena cada bocado / Está para chuparse los dedos",
  189: "Vale cada céntimo / Merece la pena pagar por ello",
  190: "Imitación / Falsificación",
  191: "Mira esto / Flipa con esto",
  192: "Déjate de rollos / Ve al grano",
  193: "Razón para cortar / Eso sí que no",
  194: "Depende de ti / Todo tuyo",
  195: "Me apunto / Juego",
  196: "Aprendí solo / Soy autodidacta",
  197: "Lo que haga falta / Cueste lo que cueste",
  198: "Llevo toda la semana tomando el sol / Me he estado bronceando",
  199: "Teleadicto / Vago de sofá",
  200: "No dejes que te afecte / Pasa de ello"
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
