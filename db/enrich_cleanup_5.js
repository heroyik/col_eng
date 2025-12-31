const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1350: {
    japanese: '胸（むね）を張れる（はれる）。／誇り（ほこり）に思える（おもえる）。',
    chinese: '我可以抬头挺胸。(wǒ kě yǐ tái tóu tǐng xiōng) / 问心无愧。(wèn xīn wú kuì)',
    spanish: 'Puedo llevar la cabeza muy alta. / Puedo caminar con orgullo.',
    vietnamese: 'Tôi có thể ngẩng cao đầu. / Tự hào về bản thân.'
  },
  1351: {
    japanese: 'それだけあれば十分（じゅうぶん）だ。／もう結構（けっこう）だ。',
    chinese: '这正是我需要的。(zhè zhèng shì wǒ xū yào de) / 齐了。(qí le)',
    spanish: 'Eso es todo lo que necesito. / Con eso tengo suficiente.',
    vietnamese: 'Đó là tất cả những gì tôi cần. / Thế là đủ rồi.'
  },
  1352: {
    japanese: '髪（かみ）を整えて（ととのえて）いるんだ。／セットしてるの。',
    chinese: '我在弄头发。(wǒ zài nòng tóu fa) / 做造型。(zuò zào xíng)',
    spanish: 'Me estoy peinando. / Me estoy arreglando el pelo.',
    vietnamese: 'Tôi đang làm tóc. / Đang sửa sang lại đầu tóc.'
  },
  1353: {
    japanese: '100ドル（どる）札（さつ）を崩して（くずして）くれる？／お釣り（おつり）ある？',
    chinese: '你能换开一百张吗？(nǐ néng huàn kāi yì bǎi zhāng ma) / 零钱。(líng qián)',
    spanish: '¿Tienes cambio de cien? / ¿Me puedes cambiar un billete de cien?',
    vietnamese: 'Bạn có thể đổi cho tôi tờ 100 đô không? / Có tiền lẻ 100 không?'
  },
  1355: {
    japanese: '疎遠（そえん）になった。／心（こころ）が離れ（はなれ）た。',
    chinese: '我们疏远了。(wǒ men shū yuǎn le) / 不再像以前那样了。(bú zài xiàng yǐ qián nà yàng le)',
    spanish: 'Nos hemos distanciado. / Nos hemos vuelto extraños.',
    vietnamese: 'Chúng ta đã xa mặt cách lòng. / Không còn thân thiết như xưa.'
  },
  1357: {
    japanese: 'しっかりして！／落ち着い（おちつい）て！',
    chinese: '振作点儿！(zhèn zuò diǎnr) / 冷静点儿！(lěng jìng diǎnr)',
    spanish: '¡Cálmate! / ¡Ponte las pilas!',
    vietnamese: 'Hãy bình tĩnh lại đi! / Chỉnh đốn lại bản thân đi!'
  },
  1358: {
    japanese: 'つい（つい）ていってもいい？／一緒（いっしょ）に行ける（いける）？',
    chinese: '我能跟着你吗？(wǒ néng gēn zhe nǐ ma) / 凑个热闹。(còu gè rè nao)',
    spanish: '¿Te puedo acompañar? / ¿Me dejas ir contigo?',
    vietnamese: 'Tôi có thể đi cùng không? / Cho tôi theo với nhé?'
  },
  1359: {
    japanese: '面倒（めんどう）だ。／手間（てま）がかかる。',
    chinese: '这太麻烦了。(zhè tài má fan le) / 费劲儿。(fèi jìnr)',
    spanish: 'Es un engorro. / Es un fastidio.',
    vietnamese: 'Thật là phiền phức. / Rắc rối quá.'
  },
  1360: {
    japanese: '今のところ順調（じゅんちょう）だよ。／問題（もんだい）ない。',
    chinese: '目前为止一切都好。(mù qián wéi zhǐ yí qiè dōu hǎo) / 挺顺利。(tǐng shùn lì)',
    spanish: 'De momento todo va bien. / Hasta ahora, sin problemas.',
    vietnamese: 'Cho đến giờ vẫn ổn. / Mọi chuyện vẫn tốt lành.'
  },
  1361: {
    japanese: '全然（ぜんぜん）変わら（かわら）ないね。／昔（むかし）のままだ。',
    chinese: '你一点儿也没变。(nǐ yì diǎnr yě méi biàn) / 还那样。(hái nà yàng)',
    spanish: 'No has cambiado nada. / Estás igual que siempre.',
    vietnamese: 'Bạn chẳng thay đổi chút nào. / Vẫn y như xưa.'
  },
  1363: {
    japanese: '最高（さいこう）だね！／頑張（がんば）れ！',
    chinese: '太棒了！(tài bàng le) / 摇滚起来！(yáo gǔn qǐ lái)',
    spanish: '¡A tope! / ¡Sigue así!',
    vietnamese: 'Quá đỉnh! / Cứ thế mà phát huy nhé!'
  },
  1364: {
    japanese: 'つい（つい）ていくのが大変（たいへん）だ。／取り残さ（とりのこさ）れそうだ。',
    chinese: '很难跟上。(hěn nán gēn shàng) / 费劲。(fèi jìn)',
    spanish: 'Es difícil mantener el ritmo. / Me cuesta seguir el paso.',
    vietnamese: 'Thật khó để theo kịp. / Đuổi theo mệt bở hơi tai.'
  },
  1365: {
    japanese: '私（わたし）もだよ。／同じ（おなじ）だね。',
    chinese: '我也一样。(wǒ yě yí yàng) / 彼此彼此。(bǐ cǐ bǐ cǐ)',
    spanish: 'Ya somos dos. / Estamos en el mismo barco.',
    vietnamese: 'Tôi cũng vậy. / Chúng ta cùng cảnh ngộ.'
  },
  1366: {
    japanese: 'よしよし。／泣か（なか）ないで。',
    chinese: '好啦好啦。(hǎo la hǎo la) / 别难过。(bié nán guò)',
    spanish: 'Bueno, ya está. / No llores, ya pasó.',
    vietnamese: 'Ngoan nào. / Đừng khóc nữa mà.'
  },
  1367: {
    japanese: '無駄（むだ）だった。／骨折り損（ほねおりぞん）のくたびれ儲け（もうけ）だ。',
    chinese: '全白忙活了。(quán bái máng huó le) / 没戏。(méi xì)',
    spanish: 'Fue todo en vano. / No sirvió para nada.',
    vietnamese: 'Uổng công vô ích. / Đổ sông đổ biển hết rồi.'
  },
  1368: {
    japanese: '時間（じかん）がなかったんだ。／間に合わ（まにあわ）なかった。',
    chinese: '没时间了。(méi shí jiān le) / 来不及。(lái bù jí)',
    spanish: 'No hubo tiempo. / No dio tiempo a nada.',
    vietnamese: 'Không có thời gian. / Chẳng kịp làm gì cả.'
  },
  1369: {
    japanese: '困って（こまって）いるんだ。／板挟み（いたばさみ）だ。',
    chinese: '我很纠结。(wǒ hěn jiū jié) / 左右为难。(zuǒ yòu wéi nán)',
    spanish: 'Estoy en un aprieto. / Estoy en un compromiso.',
    vietnamese: 'Tôi đang gặp khó khăn. / Đang trong tình thế tiến thoái lưỡng nan.'
  },
  1370: {
    japanese: '彼（かれ）はいつも忙しく（いそがしく）している。／休ま（やすま）ないね。',
    chinese: '他总是忙个不停。(tā zǒng shì máng gè bù tíng) / 连轴转。(lián zhóu zhuàn)',
    spanish: 'Él siempre está de un lado para otro. / No para quieto.',
    vietnamese: 'Anh ấy luôn chân luôn tay. / Lúc nào cũng bận rộn.'
  },
  1374: {
    japanese: '言葉遣い（ことばづかい）が悪くて（わるくて）失礼（しつれい）。／口（くち）が滑っ（すべっ）た。',
    chinese: '原谅我说粗话。(yuán liàng wǒ shuō cū huà) / 冒犯了。(mào fàn le)',
    spanish: 'Perdona mi lenguaje. / Perdón por las palabrotas.',
    vietnamese: 'Xin lỗi vì cách ăn nói của tôi. / Thứ lỗi cho tôi nếu có lỡ lời.'
  },
  1377: {
    japanese: '何の（なんの）価値（かち）もない。／重要（じゅうよう）じゃない。',
    chinese: '这没分量。(zhè méi fèn liàng) / 说不上话。(shuō bù shàng huà)',
    spanish: 'No tiene ningún peso. / No tiene importancia.',
    vietnamese: 'Không có giá trị gì cả. / Chẳng có sức nặng nào hết.'
  },
  1379: {
    japanese: 'この話（はなし）はやめよう。／話題（わだい）を変え（かえ）て。',
    chinese: '别提这事儿了。(bié tí zhè shì r le) / 打住。(dǎ zhù)',
    spanish: 'Deja el tema. / Olvida el asunto.',
    vietnamese: 'Bỏ qua chuyện đó đi. / Đừng nhắc lại nữa.'
  },
  1381: {
    japanese: '送って（おくって）くれてありがとう。／家（いえ）まで感謝（かんしゃ）だよ。',
    chinese: '谢谢你送我回家。(xiè xie nǐ sòng wǒ huí jiā) / 麻烦了。(má fan le)',
    spanish: 'Gracias por acompañarme a casa. / Gracias por traerme.',
    vietnamese: 'Cảm ơn vì đã đưa tôi về nhà. / Làm phiền bạn quá.'
  },
  1382: {
    japanese: '噂（うわさ）をすれば影（かげ）！／ちょうど噂（うわさ）していたところだよ。',
    chinese: '说曹操，曹操到。(shuō cáo cāo, cáo cāo dào) / 真准。(zhēn zhǔn)',
    spanish: '¡Hablando del rey de Roma! / ¡Mira quién aparece!',
    vietnamese: 'Vừa nhắc tào tháo, tào tháo đến ngay! / Thật là thiêng quá đi mà.'
  },
  1383: {
    japanese: '表（おもて）か裏（うら）か！／コイントスで決め（きめ）よう。',
    chinese: '正面还是反面？(zhèng miàn hái shì fǎn miàn) / 听天由命。(tīng tiān yóu mìng)',
    spanish: '¿Cara o cruz? / ¡A ver qué sale!',
    vietnamese: 'Sấp hay ngửa đây? / Hên xui nhé!'
  },
  1384: {
    japanese: '効き（きき）始めて（はじめて）きた。／少し（すこし）ずつ。',
    chinese: '刚开始见效。(gāng kāi shǐ jiàn xiào) / 起了点作用。(qǐ le diǎn zuò yòng)',
    spanish: 'Está empezando a hacer efecto. / Apenas se nota.',
    vietnamese: 'Đang bắt đầu có tác dụng rồi. / Mới thấm đấy.'
  },
  1385: {
    japanese: '自分（じぶん）を出して（だして）いこう。／一歩（いっぽ）踏み出し（ふみだし）て。',
    chinese: '展现你自己。(zhǎn xiàn nǐ zì jǐ) / 豁出去。(huō chū qù)',
    spanish: 'Muéstrate tal como eres. / Lánzate al mundo.',
    vietnamese: 'Hãy thể hiện bản thân đi. / Đừng có ngại ngùng.'
  },
  1386: {
    japanese: '頼（たよ）れるのは君（きみ）だけだ。／君（きみ）しかいないんだ。',
    chinese: '我只有你了。(wǒ zhǐ yǒu nǐ le) / 孤家寡人。(gū jiā guǎ rén)',
    spanish: 'Eres todo lo que tengo. / Solo te tengo a ti.',
    vietnamese: 'Tôi chỉ còn mỗi bạn thôi. / Bạn là chỗ dựa duy nhất của tôi.'
  },
  1388: {
    japanese: '考える（かんがえる）までもないでしょ。／当たり前（あたりまえ）だよ。',
    chinese: '有什么好想的？(yǒu shén me hǎo xiǎng de) / 明摆着。(míng bǎi zhe)',
    spanish: '¿Qué hay que pensar? / No hay nada que meditar.',
    vietnamese: 'Có gì mà phải suy nghĩ chứ? / Rõ rành rành ra đó rồi.'
  },
  1390: {
    japanese: '三つ子（みつご）の魂（たましい）百（ひゃく）まで。／癖（くせ）はなかなか抜け（ぬけ）ない。',
    chinese: '江山易改，本性难移。(jiāng shān yì gǎi, běn xìng nán yí) / 老毛病。(lǎo máo bìng)',
    spanish: 'Genio y figura hasta la sepultura. / Las viejas costumbres no cambian.',
    vietnamese: 'Giang sơn dễ đổi, bản tính khó dời. / Chứng nào tật nấy.'
  },
  1391: {
    japanese: 'これ、思って（おもって）る通りの（とおりの）もの？／まさかあれか？',
    chinese: '这是我想的那个吗？(zhè shì wǒ xiǎng de nà gè ma) / 没看错吧？(méi kàn cuò ba)',
    spanish: '¿Es lo que yo creo? / ¿No será lo que estoy pensando?',
    vietnamese: 'Có phải cái mà tôi đang nghĩ không? / Đúng là nó rồi hả?'
  },
  1392: {
    japanese: '流れ（ながれ）に任せ（まかせ）よう。／そのままいこう。',
    chinese: '随大流吧。(suí dà liú ba) / 顺其自然。(shùn qí zì rán)',
    spanish: 'Déjate llevar. / Sigue la corriente.',
    vietnamese: 'Cứ thuận theo tự nhiên đi. / Đừng cưỡng lại làm gì.'
  },
  1394: {
    japanese: 'この親（おや）にしてこの子（こ）あり。／そっくりだね。',
    chinese: '有其父必有其子。(yǒu qí fù bì yǒu qí zǐ) / 一模一样。(yì mú yì yàng)',
    spanish: 'De tal palo, tal astilla. / Como el padre, así el hijo.',
    vietnamese: 'Cha nào con nấy. / Giống hệt như đúc.'
  },
  1395: {
    japanese: 'まだ終わって（おわって）ないよ。／話（はなし）はこれからだ。',
    chinese: '我们还没完呢。(wǒ men hái méi wán ne) / 没完没了。(méi wán méi liǎo)',
    spanish: 'Aún no hemos terminado aquí. / Esto no ha acabado.',
    vietnamese: 'Chúng ta vẫn chưa xong đâu. / Chuyện vẫn còn dài.'
  },
  1396: {
    japanese: 'ダメもとでやってみよう。／いちかばちかだ。',
    chinese: '豁出去了。(huō chū qù le) / 听天由命。(tīng tiān yóu mìng)',
    spanish: 'De perdidos al río. / Vamos a probar suerte.',
    vietnamese: 'Liều một phen xem sao. / Đằng nào cũng thế.'
  },
  1397: {
    japanese: '今（いま）しかない。／今（いま）やらなきゃいつやる。',
    chinese: '机不可失，时不再来。(jī bù kě shī, shí bú zài lái) / 赶紧的。(gǎn jǐn de)',
    spanish: 'Ahora o nunca. / Es el momento.',
    vietnamese: 'Bây giờ hoặc không bao giờ. / Cơ hội ngàn năm có một.'
  },
  1398: {
    japanese: '一睡（いっすい）もできなかった。／まんじりともしなかった。',
    chinese: '我整晚没合眼。(wǒ zhěng wǎn méi hé yǎn) / 失眠了。(shī mián le)',
    spanish: 'No he pegado ojo en toda la noche. / No he dormido ni un segundo.',
    vietnamese: 'Tôi đã không ngủ được một chút nào. / Thức trắng đêm luôn.'
  },
  1399: {
    japanese: '今日（きょう）はつい（つい）てないだけ。／今日（きょう）はダメな日（ひ）なんだ。',
    chinese: '我只是今天有点背。(wǒ zhǐ shì jīn tiān yǒu diǎn bèi) / 没劲。(méi jìn)',
    spanish: 'Solo estoy teniendo un mal día. / Hoy no es mi mejor momento.',
    vietnamese: 'Hôm nay chỉ là một ngày tồi tệ thôi. / Xui xẻo quá mà.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 5 updated.');
