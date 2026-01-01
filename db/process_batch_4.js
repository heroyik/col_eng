
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_4_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_4.json';

const translations = {
  301: "Me ignoró por completo / Hizo como que no me veía",
  302: "Mira quién fue a hablar / Le dijo la sartén al cazo",
  303: "No cortes el rollo / No seas aguafiestas",
  304: "¿Has adelgazado? / ¿Bajaste de peso?",
  305: "Es muy grasiento / Tiene mucha grasa",
  306: "Conectamos enseguida / Hicimos buenas migas rápido",
  307: "Avisé que estaba enfermo / Me reporté enfermo",
  308: "Reducir / Recortar",
  309: "Escabullirse de / Salir a hurtadillas",
  310: "Liar a alguien con... / Emparejar con",
  311: "Ya estamos otra vez / Vuelta a empezar",
  312: "No quiero obligarte / No quiero presionarte",
  313: "Tiene gracia que lo digas tú / Mira quién habla",
  314: "¡Así se habla! / ¡Ahora sí!",
  315: "No vendas la piel del oso antes de cazarlo / No cantes victoria antes de tiempo",
  316: "¿Qué te parece? / ¿Te gusta?",
  317: "Dar una fiesta / Montar una fiesta",
  318: "No le des tantas vueltas / No busques tres pies al gato",
  319: "Por preguntar no pasa nada / No pierdes nada por preguntar",
  320: "Me parto de risa / Me mata de risa",
  321: "Preferiría que no / Mejor no",
  322: "Exigente / Tiquismiquis",
  323: "Me importas / Me preocupo por ti",
  324: "No te hagas ilusiones / No esperes demasiado",
  325: "Un trasto / Una persona difícil",
  326: "¿Cómo lo diría? / ¿Cómo explicarlo?",
  327: "Sacrificar al perro / Poner a dormir al perro",
  328: "Pelota con los de arriba, tirano con los de abajo / Falso",
  329: "Un trasto inútil / Un regalo envenenado",
  330: "Crujiente por fuera, tierno por dentro",
  331: "Salió de la nada / Apareció de repente",
  332: "Escarlata / Rojo intenso",
  333: "Ponme al día / Cuéntame qué ha pasado",
  334: "Me asaltaron / Me atracaron",
  335: "No me malinterpretes / Escúchame",
  336: "Icónico / Mítico",
  337: "Hay corriente / Entra aire",
  338: "Masajista",
  339: "Es frustrante / Desespera",
  340: "Tranquilo / Discreto",
  341: "No llames la atención / No des el cante",
  342: "Refugio / Lugar seguro",
  343: "No seas exagerado / No te pases",
  344: "Estoy agotado / Estoy hecho polvo",
  345: "Te lo mereces / Te está bien empleado",
  346: "Me apunto / Cuenten conmigo",
  347: "Qué fastidio / Qué bajón",
  348: "Es una bocazas / Se va de la lengua",
  349: "Torpe / Manazas",
  350: "Una cosa llevó a la otra / La cosa se lió",
  351: "¿Pero qué demonios haces? / ¿Qué narices estás haciendo?",
  352: "Tomar el sol / Disfrutar del sol",
  353: "Lo pillé con las manos en la masa / Lo pesqué in fraganti",
  354: "No puedo resistirme a una caña con este calor / Una cerveza de grifo entra sola hoy",
  355: "¿Y tú qué? / ¿Y tú?",
  356: "Eso es justo lo que necesito / Me viene de perlas",
  357: "Etapas de la vida / Cambios vitales",
  358: "Hacer la pelota / Adulador",
  359: "Buen partido para casarse / Madera de marido",
  360: "Me lío / Confundo las cosas",
  361: "Me está empezando a gustar / Le estoy cogiendo el gusto",
  362: "¿Quién lo hubiera dicho? / ¿Quién lo iba a imaginar?",
  363: "Un listo / Un pillastre",
  364: "Cautivador / Fascinante",
  365: "Mejores amigos / Inseparables",
  366: "Traición / Puñalada trapera",
  367: "Intentarlo / Probar suerte",
  368: "Eso es lo mío, no lo tuyo / Zapatero a tus zapatos",
  369: "Desapareció del mapa / Hizo bomba de humo",
  370: "Sin duda alguna / Indudablemente",
  371: "Al parecer / Por lo visto",
  372: "Por mi cuenta / Solo",
  373: "Un desastre total / Una catástrofe",
  374: "Carabina / Acompañante responsable",
  375: "Liberarse / Escapar",
  376: "Suena muy preparado / Suena a guion",
  377: "Finiquito / Indemnización por despido",
  378: "Deja de lloriquear / No me vengas con cuentos",
  379: "No te hagas el tonto / No te hagas el inocente",
  380: "Perfil bajo / Pasar desapercibido",
  381: "Los fideos están pasados / La pasta está aguada",
  382: "Gané un premio en el concurso de arte",
  383: "La niña de mis ojos / Mi ojito derecho",
  384: "Se me ha dormido la pierna / Tengo la pierna entumecida",
  385: "Yo no lo elegí / No fue elección mía",
  386: "Tengo mucho lío / Estoy hasta arriba de trabajo",
  387: "Empezamos desde ahí / Seguimos a partir de ahí",
  388: "Tienes la bragueta abierta / Se te ha bajado la cremallera",
  389: "La pizza no juzga / La pizza te quiere igual",
  390: "Será mejor que me vaya / Me tengo que ir yendo",
  391: "No puedes irte así como así / No puedes largarte sin más",
  392: "Piénsalo bien / Medítalo",
  393: "Poco me imaginaba / Ni me imaginaba",
  394: "Escena post-créditos",
  395: "Intacto / Entero",
  396: "Qué aleatorio / Qué ocurrencia más rara",
  397: "Recién casados",
  398: "De izquierdas / Progresista",
  399: "Técnicamente hablando / En rigor",
  400: "Me duele admitirlo / Odio reconocerlo"
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
