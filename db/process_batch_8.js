
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_8_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_8.json';

const translations = {
  701: ["Cuida esa boca", "Ojo con lo que dices"],
  702: ["Echarse para atrás", "Rajarse"],
  703: ["Son como la noche y el día", "Nada que ver"],
  704: ["Búscate una vida", "Haz algo de provecho"],
  705: ["Pasa página", "No le des más vueltas"],
  706: ["La gente no cambia", "Genio y figura hasta la sepultura"],
  707: ["¡Es mi canción!", "Me encanta esto"],
  708: ["Vivir a través de ti", "Vivirlo como si fuera yo"],
  709: ["¿Cuánto es la dolorosa?", "¿De cuánto estamos hablando?"],
  710: ["Nací así", "Es mi naturaleza"],
  711: ["Al final del día", "En resumidas cuentas"],
  712: ["No busques problemas", "No le busques tres pies al gato"],
  713: ["Vamos viendo", "Ya veremos qué pasa"],
  714: ["Está chupado", "Es pan comido"],
  715: ["Ahora que lo pienso", "Pensándolo bien"],
  716: ["Habla bien de mí", "Échame un cable con eso"],
  717: ["Estoy reventado", "Estoy hecho polvo"],
  718: ["Me pasó por encima", "Me trató como un trapo"],
  719: ["No seas tan duro contigo mismo", "Tente paciencia"],
  720: ["Se pone de malas si tiene hambre", "El hambre lo pone insoportable"],
  721: ["Se me ocurrió de la nada", "Me vino a la mente"],
  722: ["Viene de familia", "Lo llevamos en la sangre"],
  723: ["De tal palo, tal astilla", "Hijo de tigre, pintito"],
  724: ["De la nada", "Sin previo aviso"],
  725: ["Una vez a las quinientas", "Muy de vez en cuando"],
  726: ["Qué descaro aparecer por aquí", "Hay que tener cara"],
  727: ["Dicho esto, ten cuidado", "Aun así, ándate con ojo"],
  728: ["Me da escalofríos", "Se me pone la piel de gallina"],
  729: ["Me sonó a cuento chino", "Suena un poco exagerado"],
  730: ["Estoy a un paso de comprarlo", "Casi, casi me lo llevo"],
  731: ["¿Por quién me tomas?", "¿Me ves cara de tonto?"],
  732: ["Se me fue la mano", "Me dejé llevar"],
  733: ["No soy de arrepentirme", "Lo hecho, hecho está"],
  734: ["Le entra por uno y le sale por el otro", "Como hablarle a la pared"],
  735: ["Dame tu mejor precio", "¿En cuánto me lo dejas?"],
  736: ["No nací ayer", "No soy tonto"],
  737: ["Lo dejamos para otra", "¿Te parece si lo posponemos?"],
  738: ["Ya está otra vez...", "Ya empezó con lo mismo"],
  739: ["Es mi humilde opinión", "Yo solo digo..."],
  740: ["Escúchame bien", "Léeme los labios"],
  741: ["No me lo vi venir", "Me tomó por sorpresa"],
  742: ["Soy joven de espíritu", "El corazón no envejece"],
  743: ["No me quito la sensación de encima", "Tengo un mal presentimiento"],
  744: ["Lee el ambiente", "Ubícate un poco"],
  745: ["Lo recomiendo muchísimo", "Tienes que probarlo sí o sí"],
  746: ["¿Pillas la indirecta?", "¿Te das cuenta?"],
  747: ["Utensilios de cocina", "Cosas para la cocina"],
  748: ["Cotorra", "Habla hasta por los codos"],
  749: ["Más o menos", "Aproximadamente"],
  750: ["Hicimos buenas migas", "Hubo química al instante"],
  751: ["Es un partidazo", "Es un tesoro"],
  752: ["Trágate el orgullo", "Baja la cabeza esta vez"],
  753: ["Volverse loco", "Perder los papeles"],
  754: ["Reservado", "No suelta prenda"],
  755: ["Lo primero es lo primero", "Antes que nada"],
  756: ["Mejor amigo", "Colega del alma"],
  757: ["Tengo un mal día", "Hoy no es mi día"],
  758: ["Me arrepentí de comprarlo", "Culpa del comprador"],
  759: ["Ya que estás en eso", "Aprovechando el viaje"],
  760: ["Disfruta un poco", "Date un gusto"],
  761: ["Y mira tú por dónde", "Quién lo diría"],
  762: ["Al pie de la letra", "Como anillo al dedo"],
  763: ["Son dos gotas de agua", "Es su vivo retrato"],
  764: ["Incómodo", "Fuera de lugar"],
  765: ["Más feliz que una lombriz", "En el séptimo cielo"],
  766: ["Doble moral", "La ley del embudo"],
  767: ["Cuesta un ojo de la cara", "Vale un riñón"],
  768: ["De una pieza", "Sano y salvo"],
  769: ["Me dejaron plantado", "No apareció"],
  770: ["Indeciso", "Ni chicha ni limoná"],
  771: ["La fuerza del hábito", "La costumbre"],
  772: ["Me quedé mudo", "Sin palabras"],
  773: ["Me dio el bajón", "Quedé noqueado por la comida"],
  774: ["¿Me copias?", "¿Me entiendes?"],
  775: ["¡A comer!", "¡Ataca!"],
  776: ["No te precipites", "Piénsalo en frío"],
  777: ["Lleguemos a un acuerdo medio", "Ni para ti, ni para mí"],
  778: ["No hace falta ni decirlo", "Es obvio"],
  779: ["En buenas manos", "Bien cuidado"],
  780: ["Dame un respiro", "No seas tan pesado"],
  781: ["No me lo saco de la cabeza", "He estado pensando en ello"],
  782: ["¿En qué piensas?", "Dime qué te pasa por la cabeza"],
  783: ["Poner dinero", "Cooperar"],
  784: ["Echar una mano", "Colaborar"],
  785: ["Un aplauso para ella", "Démosle crédito"],
  786: ["Primera noticia que tengo", "Ni enterado estaba"],
  787: ["¿Eres corto o qué?", "¿No te da la cabeza?"],
  788: ["Estoy frito", "Estoy acabado"],
  789: ["Me saca de quicio", "Me pone de los nervios"],
  790: ["Yo me encargo", "Yo lo arreglo"],
  791: ["¿Te suena?", "¿Te recuerda a algo?"],
  792: ["Debí pensarlo mejor", "No lo medité bien"],
  793: ["Amiga del alma", "Mi inseparable"],
  794: ["Mejor vete yendo", "Será mejor que arranques"],
  795: ["Sentido de pertenencia", "Sentirse como en casa"],
  796: ["Una imagen vale más que mil palabras", "Ya lo verás"],
  797: ["Explícamelo despacito", "Desglósamelo"],
  798: ["Con razón...", "No me extraña"],
  799: ["Al contrario", "Más bien todo lo opuesto"],
  800: ["Mejor aún", "O mejor todavía"]
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
  console.log(`Successfully processed Batch 8. Updated ${updatedCount} records. Output saved to ${outputBatchPath}`);

} catch (err) {
  console.error('Error processing Batch 8:', err);
}
