
const fs = require('fs');

const inputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_10_input.json';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_batch_10.json';

const translations = {
  901: ["Totalmente de acuerdo.", "Ni que lo digas."],
  902: ["Tengo memoria de pez.", "Se me va la olla."],
  903: ["Invita la casa.", "Es cortesía de la casa."],
  904: ["Deberías pedir una segunda opinión.", "Mejor que preguntes a otro."],
  905: ["No tienes rival.", "Eres el mejor, sin duda."],
  906: ["No me tomes el pelo.", "¡Venga ya, no bromees!"],
  907: ["Estoy indeciso.", "No sé qué hacer."],
  908: ["Se te ha ido la olla.", "No te enteras de nada."],
  909: ["Que quede entre nosotros.", "Esto no sale de aquí."],
  910: ["Ya sabes cómo va esto.", "Ya te sabes el rollo."],
  911: ["Ha sido una montaña rusa.", "Ha habido de todo."],
  912: ["Te admiro mucho.", "Eres un ejemplo para mí."],
  913: ["Está sobrevalorado.", "No es para tanto."],
  914: ["Resumiendo.", "En pocas palabras."],
  915: ["No soy rencoroso.", "No guardo rencor."],
  916: ["Ahora mismo no caigo.", "No me viene a la cabeza."],
  917: ["Estoy harto.", "Ya no aguanto más."],
  918: ["Tengo mucho lío.", "Estoy hasta arriba de cosas."],
  919: ["Me oriento fatal.", "Soy un desastre con las direcciones."],
  920: ["¿Cómo lo llevas?", "¿Qué tal estás aguantando?"],
  921: ["Solo tienes que hacerlo.", "Lánzate y hazlo."],
  922: ["¿Qué tienes pensado?", "¿Qué se te pasa por la cabeza?"],
  923: ["No seas así.", "Venga, no te pongas así."],
  924: ["Pongámonos en marcha.", "Vamos a empezar ya."],
  925: ["Cuesta un ojo de la cara.", "Vale un riñón."],
  926: ["No lo hagas por cumplir.", "Ponle ganas."],
  927: ["Me lo has quitado de la boca.", "Justo iba a decir eso."],
  928: ["Te has pasado.", "Te has pasado de la raya."],
  929: ["Él sabe de lo que habla.", "Es un hacha en lo suyo."],
  930: ["¡Aguanta!", "¡No te rindas!"],
  931: ["Tienes que dejar ese hábito.", "Corta con eso ya."],
  932: ["Has dado en el clavo.", "Lo has clavado."],
  933: ["Ya no tengo la cabeza como antes.", "Estoy perdiendo facultades."],
  934: ["Me han timado.", "Me han estafado."],
  935: ["Estoy por ahí.", "Ando de un lado para otro."],
  936: ["No me lo quito de la cabeza.", "Le doy muchas vueltas."],
  937: ["No te engañes.", "Abre los ojos."],
  938: ["No es camino de rosas.", "No es nada fácil."],
  939: ["Déjalo estar.", "Olvídalo ya."],
  940: ["Entra en razón.", "Recupera el juicio."],
  941: ["Por hoy ya está bien.", "Dejémoslo por hoy."],
  942: ["Compórtate como un adulto.", "A ver si maduras."],
  943: ["No me he enterado de nada.", "Se me escapa."],
  944: ["¿Abrís hoy?", "¿Estáis abiertos?"],
  945: ["No hagas un mundo de ello.", "No le des tanta importancia."],
  946: ["En resumidas cuentas.", "Total, que..."],
  947: ["No te vayas de la lengua.", "No sueltes prenda."],
  948: ["¿Estáis abiertos?", "¿Seguís atendiendo?"],
  949: ["Estaré atento.", "No le quitaré ojo."],
  950: ["Te apoyo en todo.", "Estoy contigo a muerte."],
  951: ["Ya estamos otra vez.", "Otra vez con lo mismo."],
  952: ["Me lo imaginaba.", "No me extraña."],
  953: ["Pues claro.", "Obvio."],
  954: ["Deja de darme la lata.", "No me rayes más."],
  955: ["Ya he pasado por eso.", "Sé lo que es."],
  956: ["Estamos en cuadro.", "Somos cuatro gatos hoy."],
  957: ["Ese es el tema.", "Ahí está la cosa."],
  958: ["Intrigante.", "Curioso."],
  959: ["Pasa a cada rato.", "Es el pan de cada día."],
  960: ["No hay pruebas contundentes.", "No hay nada definitivo."],
  961: ["Estoy picado.", "Estoy molesto."],
  962: ["Mejor no quieras saberlo.", "No preguntes."],
  963: ["Fascinante.", "Increíble."],
  964: ["Me pilló un atasco.", "Me quedé atrapado en el tráfico."],
  965: ["Eso es harina de otro costal.", "Eso ya es otra historia."],
  966: ["Da que pensar.", "Te hace reflexionar."],
  967: ["Te doy mi palabra.", "Te lo prometo."],
  968: ["Es una larga historia.", "Tiene mucha miga."],
  969: ["Hay que romper moldes.", "Tenemos que innovar."],
  970: ["¡A eso me refiero!", "¡Así se habla!"],
  971: ["El mal ya está hecho.", "Ya no tiene remedio."],
  972: ["No puedo estar quieto.", "Me subo por las paredes."],
  973: ["Mejor eso que nada.", "Algo es algo."],
  974: ["Nos conocemos de hace mil años.", "Somos viejos amigos."],
  975: ["Céntrate.", "No te despistes."],
  976: ["Era muy exigente.", "Daba mucha guerra."],
  977: ["Lo dejé de golpe.", "Corté por lo sano."],
  978: ["Me trae recuerdos.", "Qué nostalgia."],
  979: ["Ubícate.", "Ponte las pilas."],
  980: ["Dame una cifra aproximada.", "Dime algo a ojo."],
  981: ["¿Qué te dice tu instinto?", "¿Qué calculas tú?"],
  982: ["Es un dolor de cabeza.", "Es un engorro."],
  983: ["Me mantiene alerta.", "No me deja relajarme."],
  984: ["Me deja alucinado.", "Es una pasada."],
  985: ["Tengo debilidad por ello.", "Caigo fácil en eso."],
  986: ["Te seré sincero.", "Te voy a hablar claro."],
  987: ["Se lo buscaron.", "Se lo merecían."],
  988: ["Te ahorro los detalles.", "No te aburro con los detalles."],
  989: ["Las malas noticias vuelan.", "Lo malo se sabe rápido."],
  990: ["¿Por qué esa cara larga?", "¿Qué te pasa?"],
  991: ["¿Qué celebramos?", "¿A qué viene esto?"],
  992: ["¿Qué pasa?", "¿Cuál es el problema?"],
  993: ["Se lo pasó bomba.", "Disfrutó como un enano."],
  994: ["Rellena este formulario.", "Completa esto."],
  995: ["No me suena.", "Ni idea."],
  996: ["Lo dejaron en stand by.", "Quedó aparcado."],
  997: ["Me he perdido.", "No te sigo."],
  998: ["Estoy en una nube.", "Estoy que no quepo en mí de gozo."],
  999: ["Buscaba casito.", "Estaba desesperada por atención."],
  1000: ["No tiene misterio.", "Está chupado."]
};

try {
  const data = fs.readFileSync(inputBatchPath, 'utf8');
  const batch = JSON.parse(data);

  batch.forEach(record => {
    if (translations[record.id]) {
      record.spanish = translations[record.id].join(' / ');
    }
  });

  fs.writeFileSync(outputBatchPath, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`Successfully processed Batch 10. Saved to ${outputBatchPath}`);
} catch (err) {
  console.error('Error processing Batch 10:', err);
}
