
const fs = require('fs');
const inputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_6_input.json';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_6.json';

const translations = {
  501: "Considerar una idea / Darle vueltas a una idea",
  502: "Rentable / Buena relación calidad-precio",
  503: "Esta intriga es brutal / Esto se está poniendo interesante",
  504: "¿En qué piensas? / ¿Qué se te pasa por la cabeza?",
  505: "Alterarse / Sofocarse",
  506: "¿Qué prisa hay? / ¿Por qué tanta prisa?",
  507: "¿Por qué tardan tanto? / ¿Qué es lo que retrasa todo?",
  508: "Lo has conseguido / Te ha salido bien",
  509: "Podría ser peor / Menos mal",
  510: "Cuéntamelo / Suéltalo",
  511: "Estoy a tope con esto / Estoy decidido",
  512: "El lado bueno es / Lo positivo es",
  513: "Estoy en racha / Me sale todo",
  514: "Ya he incluido tus sugerencias / Ya he puesto lo que dijiste",
  515: "Tocarse los huevos / Perder el tiempo",
  516: "Te va a marear / Te va a tomar el pelo",
  517: "Estoy por aquí / Ando cerca",
  518: "En mi opinión / Para mí",
  519: "Abrígate / Mantente caliente",
  520: "Fresquito / Agradablemente fresco",
  521: "Pisarte el terreno / Inmiscuirse",
  522: "Tomar algo de pie / Una copa rápida",
  523: "Lo dice todo / Es muy revelador",
  524: "Habla por sí solo / Se explica solo",
  525: "Fue una ganga / Estaba tirado de precio",
  526: "Deberíamos hacer acopio, es un chollazo / Hay que cargar, está regalado",
  527: "¿Qué está bueno aquí? / ¿Qué recomiendas?",
  528: "Hacer gráficos / Trazar gráficas",
  529: "Instalar paquetes / Instalar librerías",
  530: "Guardar imágenes / Salvar fotos",
  531: "Acceder a las imágenes / Ver las fotos",
  532: "Ni se me pasó por la cabeza / Ni lo pensé",
  533: "Estar deshabilitado / No funcionar",
  534: "No funcionará / No va a servir",
  535: "No lo intentes / Ni pruebes",
  536: "Formato de salida deseado / Cómo quieres que quede",
  537: "Tener prioridad / Ir primero",
  538: "Pasar de las normas / Ignorar las pautas",
  539: "Títulos claros y lógicos / Encabezados bien puestos",
  540: "Haz párrafos cortos / Que no sean tochos",
  541: "Tochos de texto / Bloques de texto densos",
  542: "Puntos / Viñetas / Listas con puntos",
  543: "Condescendiente / Altivo",
  544: "Listas numeradas / Puntos con números",
  545: "Puntos clave / Lo más importante / Conclusiones",
  546: "Ideas agrupadas / Conceptos juntos",
  547: "Listas sin orden / Listas con viñetas",
  548: "Listas ordenadas / Listas numeradas",
  549: "Tener sentido lógico / Fluir bien",
  550: "Escanear y pillar lo importante rápido / Leer por encima y entenderlo",
  551: "Legibilidad / Que se lea bien",
  552: "Mantener todas las citas / No borres las referencias",
  553: "Incluir citas / Meter referencias",
  554: "Paternalista / Tratar con superioridad",
  555: "Al principio de los párrafos / Al empezar el párrafo",
  556: "Citar las fuentes / Mencionar de dónde viene",
  557: "Delante de los títulos / Antes de los encabezados",
  558: "¿Qué pasa? / ¿Qué hay?",
  559: "¡Cuánto tiempo! / Dichosos los ojos",
  560: "No pasa nada / Tranqui / Sin problema",
  561: "Tómate tu tiempo / Sin prisas",
  562: "Lo pillo / Entendido / Lo tengo",
  563: "No estoy seguro / No lo tengo claro",
  564: "Déjame mirar / Voy a comprobarlo",
  565: "Creído / Chulo / Engreído",
  566: "Suena bien / Me parece bien",
  567: "Espera un segundo / Un momento",
  568: "Ahora vuelvo / Vuelvo enseguida",
  569: "Me tengo que ir / Me piro",
  570: "Estoy en camino / Voy para allá",
  571: "Por cierto... / A propósito...",
  572: "Que yo sepa / Hasta donde yo sé",
  573: "O sea... / Quiero decir... / A ver...",
  574: "Supongo que sí / Imagino",
  575: "Me parece bien / Por mí vale",
  576: "Despertar espiritual / Modo zen",
  577: "¿Por qué no? / ¡Claro!",
  578: "¡Qué guay! / ¡Es la caña! / ¡Genial!",
  579: "Qué pena / Qué mala pata",
  580: "¿Me estás tomando el pelo? / ¿Es broma?",
  581: "Es broma / Solo bromeaba",
  582: "Por si acaso / Por si las moscas",
  583: "Olvídalo / Da igual / No importa",
  584: "Tú decides / Lo que tú quieras / Depende de ti",
  585: "Paso / No me apunto",
  586: "No es para tanto / No es gran cosa",
  587: "Más vale tarde que nunca",
  588: "Estamos en contacto / No te pierdas",
  589: "Tómatelo con calma / Cuídate (despedida)",
  590: "Ha pasado tiempo / Hace mucho",
  591: "Crucemos los dedos / ¡Suerte!",
  592: "¡Bien por ti! / ¡Me alegro!",
  593: "Qué suerte tienes / Dichoso tú",
  594: "Bueno saberlo / Está bien saberlo",
  595: "Gracias de todos modos / Gracias igual",
  596: "¿Qué quieres decir? / ¿A qué te refieres?",
  597: "¿De qué hablas? / ¿Qué dices?",
  598: "¿Qué pasa? / ¿Por qué estamos parados?",
  599: "No me malinterpretes / No me entiendas mal",
  600: "Sin rencores / De buen rollo"
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
