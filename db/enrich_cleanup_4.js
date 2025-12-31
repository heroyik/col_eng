const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1301: {
    japanese: 'いい判断（はんだん）だ。／名案（めいあん）だね。',
    chinese: '好主意。(hǎo zhǔ yi) / 选得好。(xuǎn de hǎo)',
    spanish: 'Buena decisión. / Bien pensado.',
    vietnamese: 'Quyết định đúng đắn đấy. / Hay lắm.'
  },
  1304: {
    japanese: '言葉（ことば）が出ない（でない）。／絶句（ぜっく）したよ。',
    chinese: '我无语了。(wǒ wú yǔ le) / 没话说了。(méi huà shuō le)',
    spanish: 'Me he quedado sin palabras. / No sé qué decir.',
    vietnamese: 'Tôi không thốt nên lời. / Cạn lời luôn.'
  },
  1306: {
    japanese: '何（なに）の話（はなし）をしていたっけ？／どこまで話し（はなし）たかな？',
    chinese: '我刚才说到哪儿了？(wǒ gāng cái shuō dào nǎr le) / 跑题了。(pǎo tí le)',
    spanish: '¿Por dónde iba? / ¿Qué estaba diciendo?',
    vietnamese: 'Tôi đang nói đến đâu rồi nhỉ? / Vừa nãy nói gì ấy nhỉ?'
  },
  1308: {
    japanese: '大変（たいへん）な夜（よ）だった。／散々（さんざん）な目（め）にあった。',
    chinese: '我过了一个糟糕的夜晚。(wǒ guò le yí gè zāo gāo de yè wǎn) / 挺累的。(tǐng lèi de)',
    spanish: 'Tuve una noche difícil. / Pasé una mala noche.',
    vietnamese: 'Tôi đã có một đêm tồi tệ. / Một đêm vất vả.'
  },
  1309: {
    japanese: 'こんなのありえない。／信じ（しんじ）られない。',
    chinese: '这不可能发生。(zhè bù kě néng fā shēng) / 没准儿。(méi zhǔnr)',
    spanish: 'Esto no puede estar pasando. / No me lo creo.',
    vietnamese: 'Chuyện này không thể nào xảy ra được. / Thật không thể tin nổi.'
  },
  1310: {
    japanese: 'その調子（ちょうし）だ。／やっと話（はなし）が通じ（つうじ）た。',
    chinese: '这才对嘛。(zhè cái duì ma) / 听你的。(tīng nǐ de)',
    spanish: 'Así me gusta. / Ahora sí que nos entendemos.',
    vietnamese: 'Đúng rồi đấy. / Vậy mới được chứ.'
  },
  1312: {
    japanese: 'そうはならないよ。／あり得ない（ありえない）話だ。',
    chinese: '我看不出那会发生。(wǒ kàn bù chū nà huì fā shēng) / 没戏。(méi xì)',
    spanish: 'No veo que eso vaya a pasar. / No lo veo claro.',
    vietnamese: 'Tôi không thấy chuyện đó sẽ xảy ra đâu. / Khó mà thành sự thực.'
  },
  1313: {
    japanese: '私（わたし）の知る限り（しるかぎり）ではないね。／聞い（きい）ていないよ。',
    chinese: '据我所知没有。(jù wǒ suǒ zhī méi yǒu) / 没听说。(méi tīng shuō)',
    spanish: 'Que yo sepa, no. / No tengo noticia de ello.',
    vietnamese: 'Tôi không nghe nói vậy. / Theo tôi biết thì không.'
  },
  1316: {
    japanese: '賛成（さんせい）だよ。／乗っ（のっ）た！',
    chinese: '我参加。(wǒ cān jiā) / 算我一个。(suàn wǒ yí gè)',
    spanish: 'Me apunto. / Cuenta conmigo.',
    vietnamese: 'Tôi tham gia. / Cho tôi một suất.'
  },
  1317: {
    japanese: 'まさか。／ありえない。',
    chinese: '不可能。(bù kě néng) / 没门儿。(méi ménr)',
    spanish: 'Ni hablar. / De ninguna manera.',
    vietnamese: 'Không đời nào. / Đừng có mơ.'
  },
  1318: {
    japanese: 'ご一緒（いっしょ）してもいい？／混ぜ（まぜ）てくれる？',
    chinese: '不介意我加入吧？(bú jiè yì wǒ jiā rù ba) / 凑个热闹。(còu gè rè nao)',
    spanish: '¿Te importa if si me uno? / ¿Puedo sentarme con vosotros?',
    vietnamese: 'Tôi tham gia cùng được không? / Cho tôi nhập hội nhé?'
  },
  1321: {
    japanese: '心の（こころの）ままに。／君（きみ）の気持ち（きもち）を信じて（しんじて）。',
    chinese: '听从你的内心。(tīng cóng nǐ de nèi xīn) / 随心所欲。(suí xīn suǒ yù)',
    spanish: 'Sigue a tu corazón. / Haz lo que te dicte el corazón.',
    vietnamese: 'Hãy nghe theo tiếng gọi con tim. / Làm theo ý mình muốn.'
  },
  1322: {
    japanese: '私（わたし）ならやめておくよ。／感心（かんしん）しないな。',
    chinese: '我要是你就不会那么做。(wǒ yào shì nǐ jiù bú huì nà me zuò) / 别犯傻。(bié fàn shǎ)',
    spanish: 'Yo que tú no lo haría. / Si fuera tú, no lo haría.',
    vietnamese: 'Nếu là tôi thì tôi sẽ không làm thế. / Khuyên bạn không nên làm vậy.'
  },
  1323: {
    japanese: 'ちゃんと仕事（しごと）しろ。／責任（せきにん）を果たせ（はたせ）。',
    chinese: '做好你份内的事。(zuò hǎo nǐ fèn nèi de shì) / 尽职尽责。(jìn zhí jìn zé)',
    spanish: 'Haz tu trabajo. / Cumple con tu deber.',
    vietnamese: 'Làm việc của anh đi. / Hãy làm tròn bổn phận.'
  },
  1325: {
    japanese: '行儀（ぎょうぎ）よくしなさい。／大人しく（おとなしく）して。',
    chinese: '规矩点儿。(guī ju diǎnr) / 别捣乱。(bié dǎo luàn)',
    spanish: 'Compórtate. / Pórtate bien.',
    vietnamese: 'Hãy cư xử cho đúng mực. / Đừng có quậy phá.'
  },
  1326: {
    japanese: '私（わたし）に何の（なんの）得（とく）があるの？／見返り（みかえり）は何？',
    chinese: '我有什么好处？(wǒ yǒu shén me hǎo chu) / 怎么补偿我？(zěn me bǔ cháng wǒ)',
    spanish: '¿Qué saco yo de esto? / ¿Qué hay para mí?',
    vietnamese: 'Tôi được lợi gì trong chuyện này? / Có quyền lợi gì cho tôi không?'
  },
  1329: {
    japanese: '自業自得（じごうじとく）だね。／君（きみ）が招い（まねい）たことだ。',
    chinese: '你自己找的。(nǐ zì jǐ zhǎo de) / 活该。(huó gāi)',
    spanish: 'Tú te lo has buscado. / Te lo buscaste solito.',
    vietnamese: 'Bạn tự chuốc lấy thôi. / Do bạn cả đấy.'
  },
  1330: {
    japanese: 'ざまあみろ！／自業自得（じごうじとく）だ。',
    chinese: '活该！(huó gāi) / 报应。(bào yìng)',
    spanish: '¡Te está bien empleado! / ¡Te lo mereces!',
    vietnamese: 'Đáng đời lắm! / Cho chừa cái tội đó đi.'
  },
  1331: {
    japanese: '飲み込み（のみこみ）が早い（はやい）ね。／すぐ理解（りかい）したね。',
    chinese: '你领悟得挺快。(nǐ lǐng wù de tǐng kuài) / 聪明。(cōng ming)',
    spanish: 'Pillas las cosas rápido. / Aprendes enseguida.',
    vietnamese: 'Bạn tiếp thu nhanh đấy. / Hiểu vấn đề nhanh thật.'
  },
  1332: {
    japanese: '台無し（だいなし）にするな。／失敗（しっぱい）しないで。',
    chinese: '别搞砸了。(bié gǎo zá le) / 稳住了。(wěn zhù le)',
    spanish: 'No lo estropees. / No metas la pata.',
    vietnamese: 'Đừng có mà làm hỏng chuyện. / Đừng để đổ bể nhé.'
  },
  1333: {
    japanese: 'それならそれでいい。／仕方（しかた）がない。',
    chinese: '那就这样吧。(nà jiù zhè yàng ba) / 随它去。(suí tā qù)',
    spanish: 'Que así sea pues. / Pues sea así.',
    vietnamese: 'Nếu vậy thì đành vậy. / Đành chấp nhận thôi.'
  },
  1334: {
    japanese: '言葉（ことば）に気をつけろ（きをつけろ）！／口（くち）を慎め（つつしめ）。',
    chinese: '嘴放干净点儿！(zuǐ fàng gān jìng diǎnr) / 注意分寸。(zhù yì fēn cùn)',
    spanish: '¡Cuida tu lenguaje! / ¡Vigila lo que dices!',
    vietnamese: 'Cẩn thận lời ăn tiếng nói! / Đừng có ăn nói hàm hồ.'
  },
  1335: {
    japanese: '関わり（かかわり）たくない。／お断り（おことわり）だ。',
    chinese: '我不想掺和。(wǒ bù xiǎng chān huo) / 没我的份儿。(méi wǒ de fènr)',
    spanish: 'No quiero saber nada de eso. / No quiero participar.',
    vietnamese: 'Tôi không muốn liên quan. / Đừng lôi tôi vào chuyện này.'
  },
  1336: {
    japanese: '口出し（くちだし）しないで。／口（くち）を挟ま（はさま）ないで。',
    chinese: '请别插嘴。(qǐng bié chā zuǐ) / 别打岔。(bié dǎ chà)',
    spanish: 'Por favor, no te metas. / No interrumpas.',
    vietnamese: 'Làm ơn đừng có xen vào. / Đừng có hớt lẻo.'
  },
  1337: {
    japanese: '覚悟（かくご）しろ。／心（こころ）して。',
    chinese: '做好心理准备。(zuò hǎo xīn lǐ zhǔn bèi) / 悠着点儿。(yōu zhe diǎnr)',
    spanish: 'Prepárate para lo que viene. / Ármate de valor.',
    vietnamese: 'Hãy chuẩn bị tinh thần đi. / Sẵn sàng chưa?'
  },
  1338: {
    japanese: '貸し借り（かしかり）なしにしよう。／お互い様（おたがいさま）だ。',
    chinese: '咱们扯平了。(zán men chě píng le) / 两不相欠。(liǎng bù xiāng qiàn)',
    spanish: 'Estamos en paz. / Quedamos en tablas.',
    vietnamese: 'Chúng ta huề nhau nhé. / Coi như không ai nợ ai.'
  },
  1341: {
    japanese: '君（きみ）も同じ（おなじ）だよ。／お互い様（おたがいさま）だね。',
    chinese: '你也一样。(nǐ yě yí yàng) / 彼此彼此。(bǐ cǐ bǐ cǐ)',
    spanish: 'Lo mismo te digo. / Igualmente para ti.',
    vietnamese: 'Bạn cũng vậy thôi. / Chúng ta giống nhau cả.'
  },
  1342: {
    japanese: 'ここに停めて（とめて）。／車（くるま）を寄せて（よせて）。',
    chinese: '就在这儿靠边停车。(jiù zài zhèr kào biān tíng chē) / 停一下。(tíng yí xià)',
    spanish: 'Para aquí mismo. / Oríllate aquí.',
    vietnamese: 'Hãy tấp xe vào đây. / Cho tôi xuống chỗ này.'
  },
  1343: {
    japanese: '乗っ（のっ）て。／早く（はやく）入り（はいり）な。',
    chinese: '快上车。(kuài shàng chē) / 进来吧。(jìn lái ba)',
    spanish: 'Sube. / Súbete al coche.',
    vietnamese: 'Lên xe đi. / Vào đây nào.'
  },
  1344: {
    japanese: '同じ（おなじ）方向（ほうこう）かな？／乗っ（のっ）ていく？',
    chinese: '顺路吗？(shùn lù ma) / 捎带手。(shāo dài shǒu)',
    spanish: '¿Vas para el mismo sitio? / ¿Te llevo?',
    vietnamese: 'Có cùng đường không? / Có đi nhờ xe không?'
  },
  1346: {
    japanese: '渋滞（じゅうたい）に巻き込ま（まきこま）れている。／道（みち）が混んで（こんで）いる。',
    chinese: '我堵车了。(wǒ dǔ chē le) / 没地儿挪。(méi dìr nuó)',
    spanish: 'Estoy atrapado en el tráfico. / Hay un atasco del quince.',
    vietnamese: 'Tôi đang bị tắc đường. / Kẹt xe quá chừng.'
  },
  1348: {
    japanese: '上司（じょうし）に相談（そうだん）して。／ボスと話し（はなし）なさい。',
    chinese: '去跟你的老板说吧。(qù gēn nǐ de lǎo bǎn shuō ba) / 找头儿。(zhǎo tóur)',
    spanish: 'Consúltalo con tu jefe. / Hable con su superior.',
    vietnamese: 'Hãy trao đổi với sếp của bạn. / Đi mà hỏi cấp trên ấy.'
  },
  1349: {
    japanese: '少し（すこし）避け（よけ）てくれる？／詰め（つめ）てくれる？',
    chinese: '你能挪动一下吗？(nǐ néng nuó dòng yí xià ma) / 让让。(ràng rang)',
    spanish: '¿Te puedes mover un poco? / ¿Te podrías correr un poquito?',
    vietnamese: 'Bạn có thể nhường một chút không? / Xê ra một tý được không?'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 4 updated.');
