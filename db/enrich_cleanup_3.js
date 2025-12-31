const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1203: {
    japanese: '控えめ（ひかえめ）だね。／地味（じみ）だね。',
    chinese: '他挺低调的。(tā tǐng dī diào de) / 不显山露水。(bù xiǎn shān lù shuǐ)',
    spanish: 'Él es muy discreto. / No le gusta llamar la atención.',
    vietnamese: 'Anh ấy rất khiêm tốn. / Không thích phô trương.'
  },
  1204: {
    japanese: '盛り上がって（もりあがって）るね！／ヤバいね！',
    chinese: '太火爆了。(tài huǒ bào le) / 嗨翻了。(hāi fān le)',
    spanish: 'Esto está que arde. / Está genial.',
    vietnamese: 'Thật là hào hứng. / Không khí tuyệt vời quá.'
  },
  1207: {
    japanese: 'どうしてここへ？／何（なに）かあった？',
    chinese: '什么风把你吹来了？(shén me fēng bǎ nǐ chuī lái le) / 来干嘛？(lái gàn má)',
    spanish: '¿Qué te trae por aquí? / ¿A qué vienes?',
    vietnamese: 'Làn gió nào đưa bạn đến đây vậy? / Có việc gì mà đến đây?'
  },
  1208: {
    japanese: '変（へん）な勘（かん）違い（ちがい）をするな。／おかしなこと考えるなよ。',
    chinese: '别动歪脑筋。(bié dòng wāi nǎo jīn) / 别瞎想。(bié xiā xiǎng)',
    spanish: 'No te hagas ideas raras. / No pienses mal.',
    vietnamese: 'Đừng có mà nghĩ bậy. / Đừng có suy diễn linh tinh.'
  },
  1209: {
    japanese: 'コーヒーはあんまり飲ま（のま）ないんだ。／コーヒー派（は）じゃない。',
    chinese: '我不怎么喝咖啡。(wǒ bù zěn me hē kā fēi) / 对咖啡没兴趣。(duì kā fēi méi xìng qù)',
    spanish: 'No soy muy de café. / El café no es lo mío.',
    vietnamese: 'Tôi không thích cà phê lắm. / Không phải fan của cà phê.'
  },
  1210: {
    japanese: '話（はなし）が見えない（みえない）。／理解（りかい）できない。',
    chinese: '我没听懂。(wǒ méi tīng dǒng) / 跟不上。(gēn bù shàng)',
    spanish: 'No te sigo. / No entiendo por dónde vas.',
    vietnamese: 'Tôi không theo kịp. / Tôi không hiểu ý bạn.'
  },
  1211: {
    japanese: '香水（こうすい）つけてる？／いい匂い（におい）がするね。',
    chinese: '你喷香水了吗？(nǐ pēn xiāng shuǐ le ma) / 真香。(zhēn xiāng)',
    spanish: '¿Llevas perfume? / Hueles muy bien.',
    vietnamese: 'Bạn xịt nước hoa à? / Có mùi hương gì vậy?'
  },
  1212: {
    japanese: 'もっと大事（だいじ）な用（よう）がある。／それどころじゃない。',
    chinese: '我有更重要的事要做。(wǒ yǒu gèng zhòng yào de shì yào zuò) / 顾不上这些。(gù bú shàng zhè xiē)',
    spanish: 'Tengo asuntos más importantes que atender. / Tengo otros problemas más gordos.',
    vietnamese: 'Tôi còn nhiều việc quan trọng hơn phải làm. / Có việc lớn hơn cần giải quyết.'
  },
  1213: {
    japanese: '手（て）がいっぱいだ。／忙しくて（いそがしくて）手が回ら（まわら）ない。',
    chinese: '我忙得不可开交。(wǒ máng de bù kě kāi jiāo) / 腾不开手。(téng bù kāi shǒu)',
    spanish: 'Tengo las manos ocupadas. / Estoy a tope.',
    vietnamese: 'Tôi đang bận túi bụi. / Không hở ra được chút nào.'
  },
  1214: {
    japanese: 'どうしてそんなことに？／ありえない。',
    chinese: '怎么会这样？(zěn me huì zhè yàng) / 怎么可能？(zěn me kě néng)',
    spanish: '¿Cómo puede ser? / ¿Cómo es posible?',
    vietnamese: 'Làm sao có thể như vậy được? / Sao lại thế?'
  },
  1215: {
    japanese: 'どっちも同じ（おなじ）ことだ。／似たり寄ったり（にたりよったり）だ。',
    chinese: '大同小异。(dà tóng xiǎo yì) / 半斤八两。(bàn jīn bā liǎng)',
    spanish: 'Es lo mismo. / Tanto monta, monta tanto.',
    vietnamese: 'Cũng như nhau cả thôi. / Kẻ tám lạng người nửa cân.'
  },
  1216: {
    japanese: 'つい（つい）てない日（ひ）だ。／厄日（やくび）だ。',
    chinese: '今天真倒霉。(jīn tiān zhēn dǎo méi) / 诸事不顺。(zhū shì bú shùn)',
    spanish: 'No es mi día. / Hoy no doy una.',
    vietnamese: 'Hôm nay không phải ngày của tôi. / Đen đủ đường.'
  },
  1217: {
    japanese: '全然（ぜんぜん）違う（ちがう）よ。／ほど遠い（ほどとおい）。',
    chinese: '差得远呢。(chà de yuǎn ne) / 根本不是。(gēn běn bú shì)',
    spanish: 'Ni de lejos. / Nada de eso.',
    vietnamese: 'Còn lâu mới thế. / Không hề như vậy đâu.'
  },
  1218: {
    japanese: '奇遇（きぐう）だね！／会え（あえ）て嬉しい（うれしい）よ。',
    chinese: '真巧啊！(zhēn qiǎo a) / 居然在这儿碰到你。(jū rán zài zhèr pèng dào nǐ)',
    spanish: '¡Qué casualidad encontrarte aquí! / ¡Pero bueno, qué sorpresa!',
    vietnamese: 'Thật là trùng hợp khi gặp bạn ở đây! / Ồ, bạn cũng ở đây sao?'
  },
  1219: {
    japanese: '思い（おもい）もよらなかった。／考え（かんがえ）もしなかった。',
    chinese: '我从没想过那个。(wǒ cóng méi xiǎng guò nà gè) / 没想到。(méi xiǎng dào)',
    spanish: 'Nunca se me habría ocurrido. / Ni lo había pensado.',
    vietnamese: 'Tôi chưa bao giờ nghĩ đến điều đó. / Thật là một ý tưởng mới mẻ.'
  },
  1222: {
    japanese: '単刀直入（たんとうちょくにゅう）に言っ（いっ）て。／要点（ようてん）を言っ（いっ）て。',
    chinese: '开门见山吧。(kāi mén jiàn shān ba) / 说重点。(shuō zhòng diǎn)',
    spanish: 'Ve al grano. / No te andes por las ramas.',
    vietnamese: 'Đi thẳng vào vấn đề đi. / Đừng vòng vo nữa.'
  },
  1223: {
    japanese: 'いちいち言わ（いわ）なきゃわからない？／察して（さっして）よ。',
    chinese: '还要我细说吗？(hái yào wǒ xì shuō ma) / 你还不明白吗？(nǐ hái bù míng bai ma)',
    spanish: '¿Tengo que deletreártelo? / ¿Me tengo que explicar mejor?',
    vietnamese: 'Tôi có phải nói rõ ràng ra không? / Bạn vẫn chưa hiểu sao?'
  },
  1224: {
    japanese: '彼女（かのじょ）には通じ（つうじ）ない。／話（はなし）が通ら（とおら）ない。',
    chinese: '我没法跟她沟通。(wǒ méi fǎ gēn tā gōu tōng) / 讲不通。(jiǎng bù tōng)',
    spanish: 'No logro hacerme entender con ella. / No hay forma de que me escuche.',
    vietnamese: 'Tôi không thể nói chuyện được với cô ấy. / Cô ấy chẳng thèm nghe tôi.'
  },
  1225: {
    japanese: '適当（てきとう）に当て（あて）てみて。／勘（かん）で言っ（いっ）てみて。',
    chinese: '瞎猜一个吧。(xiā cāi yí gè ba) / 猜猜看。(cāi cāi kàn)',
    spanish: 'Adivina. / Di lo primero que se te ocurra.',
    vietnamese: 'Đoán đại đi. / Thử đoán xem nào.'
  },
  1228: {
    japanese: '雑談（ざつだん）してるだけだよ。／おしゃべりしてただけ。',
    chinese: '就是随便聊聊。(jiù shì suí biàn liáo liáo) / 闲扯。(xián chě)',
    spanish: 'Solo estamos charlando. / Estamos de palique.',
    vietnamese: 'Chỉ là tán gẫu thôi mà. / Nói chuyện phiếm chút thôi.'
  },
  1229: {
    japanese: '僅差（きんさ）で勝っ（かっ）た。／危うく（あやうく）勝っ（かっ）た。',
    chinese: '险胜。(xiǎn shèng) / 差一点就输了。(chà yì diǎn jiù shū le)',
    spanish: 'Ganamos por los pelos. / Ganamos por la mínima.',
    vietnamese: 'Thắng sát nút. / Suýt chút nữa là thua rồi.'
  },
  1230: {
    japanese: '君（きみ）の責任（せきにん）だ。／君のせいだよ。',
    chinese: '那是你的事。(nà shì nǐ de shì) / 赖你。(lài nǐ)',
    spanish: 'Eso es cosa tuya. / Es tu responsabilidad.',
    vietnamese: 'Đó là việc của bạn. / Lỗi tại bạn đấy.'
  },
  1232: {
    japanese: '何（なに）を気取って（きどって）るの？／お洒落（おしゃれ）してどこ行く（いく）の？',
    chinese: '穿这么整齐干嘛？(chuān zhè me zhěng qí gàn má) / 打扮。(dǎ ban)',
    spanish: '¿A qué viene tanto arreglo? / ¿Por qué vas tan elegante?',
    vietnamese: 'Sao hôm nay diện thế? / Có dịp gì mà ăn mặc đẹp vậy?'
  },
  1233: {
    japanese: '格安（かくやす）で買っ（かっ）た。／二束三文（にそくさんもん）で手（て）に入れた。',
    chinese: '我没花多少钱就买到了。(wǒ méi huā duō shǎo qián jiù mǎi dào le) / 捡了个便宜。(jiǎn le gè pián yi)',
    spanish: 'Lo compré por una miseria. / Me costó cuatro perras.',
    vietnamese: 'Tôi đã mua nó với giá rẻ bèo. / Mua được món hời.'
  },
  1236: {
    japanese: '君（きみ）のおかげで最高（さいこう）の一（いち）日（にち）になった。／嬉しい（うれしい）よ。',
    chinese: '你让我今天过得很开心。(nǐ ràng wǒ jīn tiān guò de hěn kāi xīn) / 多亏了你。(duō kuī le nǐ)',
    spanish: 'Me has alegrado el día. / Me has hecho el día.',
    vietnamese: 'Bạn đã làm ngày hôm nay của tôi thêm ý nghĩa. / Thật tuyệt vời.'
  },
  1237: {
    japanese: '世間（せけん）は狭い（せまい）ね。／なんて奇遇（きぐう）なんだ。',
    chinese: '世界真小。(shì jiè zhēn xiǎo) / 真是缘分。(zhēn shì yuán fèn)',
    spanish: '¡Qué pequeño es el mundo! / El mundo es un pañuelo.',
    vietnamese: 'Thế giới thật nhỏ bé. / Thật là trùng hợp.'
  },
  1239: {
    japanese: '散らかって（ちらかって）てごめんね。／汚い（きたない）けど。',
    chinese: '不好意思，屋里太乱了。(bù hǎo yì si, wū lǐ tài luàn le) / 没收拾。(méi shōu shi)',
    spanish: 'Perdona el desorden. / Perdona que esté todo por medio.',
    vietnamese: 'Xin lỗi vì sự lộn xộn này. / Nhà cửa chưa dọn kịp.'
  },
  1240: {
    japanese: 'みんな君（きみ）を褒めて（ほめて）いるよ。／評判（ひょうばん）がいいね。',
    chinese: '大家都很看好你。(dà jiā dōu hěn kàn hǎo nǐ) / 有口皆碑。(yǒu kǒu jiē bēi)',
    spanish: 'Todo el mundo habla muy bien de ti. / Tienes muy buena prensa.',
    vietnamese: 'Mọi người đều đánh giá cao bạn. / Ai cũng khen ngợi bạn hết.'
  },
  1243: {
    japanese: 'たまには顔（かお）を見せて（みせて）。／音信（おんしん）不通（ふつう）にならないで。',
    chinese: '常联系。(cháng lián xì) / 别不理人。(bié bù lǐ rén)',
    spanish: 'No seas un extraño. / No nos pierdas la pista.',
    vietnamese: 'Đừng quên liên lạc nhé. / Thỉnh thoảng nhớ ghé thăm.'
  },
  1244: {
    japanese: '返品（へんぴん）不可（ふか）。／売り切り（うりきり）だ。',
    chinese: '售出概不退换。(shòu chū gài bù tuì huàn) / 一锤子买卖。(yì chuí zi mǎi mài)',
    spanish: 'No se admiten devoluciones. / Todas las ventas son definitivas.',
    vietnamese: 'Hàng mua rồi miễn đổi trả. / Không hoàn tiền lại đâu.'
  },
  1246: {
    japanese: 'こういうことだよ。／条件（じょうけん）はこうだ。',
    chinese: '情况是这样的。(qíng kuàng shì zhè yàng de) / 这么办。(zhè me bàn)',
    spanish: 'Este es el plan. / Estas son las condiciones.',
    vietnamese: 'Chuyện là thế này. / Thỏa thuận như vậy đi.'
  },
  1247: {
    japanese: '雑談（ざつだん）はこれくらいにして。／おしゃべりは終わり（おわり）。',
    chinese: '废话少说。(fèi huà shǎo shuō) / 入正题。(rù zhèng tí)',
    spanish: 'Basta de charla. / Al grano.',
    vietnamese: 'Thôi đừng tán gẫu nữa. / Quay lại việc chính đi.'
  },
  1248: {
    japanese: 'やり遂げ（やりとげ）られるよ。／成功（せいこう）させよう。',
    chinese: '我们能搞定。(wǒ men néng gǎo dìng) / 行得通。(xíng de tōng)',
    spanish: 'Podemos lograrlo. / Lo sacaremos adelante.',
    vietnamese: 'Chúng ta có thể làm được. / Sẽ thành công thôi.'
  },
  1249: {
    japanese: '約束（やくそく）するよ。／誓って（ちかって）もいい。',
    chinese: '我向你保证。(wǒ xiàng nǐ bǎo zhèng) / 说话算数。(shuō huà suàn shù)',
    spanish: 'Te doy mi palabra. / Tienes mi promesa.',
    vietnamese: 'Tôi hứa với bạn đấy. / Tôi cam đoan với bạn.'
  },
  1250: {
    japanese: '時間（じかん）切れ（ぎれ）だ。／時間終了（しゅうりょう）。',
    chinese: '时间到了。(shí jiān dào le) / 到点了。(dào diǎnr)',
    spanish: 'Se acabó el tiempo. / Tiempo fuera.',
    vietnamese: 'Hết giờ rồi. / Đến giờ rồi.'
  },
  1251: {
    japanese: 'どこかでお会い（おあい）しましたか？／見覚え（みおぼえ）があるんだけど。',
    chinese: '我是不是在哪儿见过你？(wǒ shì bú shì zài nǎr jiàn guò nǐ) / 面熟。(miàn shú)',
    spanish: '¿Te conozco de algo? / ¿Nos conocemos?',
    vietnamese: 'Tôi có gặp bạn ở đâu chưa nhỉ? / Nhìn bạn quen lắm.'
  },
  1253: {
    japanese: '悪く（わるく）思わ（おもわ）ないで。／個人（こじん）的（てき）な感情（かんじょう）はないよ。',
    chinese: '别往心里去。(bié wǎng xīn lǐ qù) / 没针对你。(méi zhēn duì nǐ)',
    spanish: 'No te lo tomes como algo personal. / No es nada contra ti.',
    vietnamese: 'Đừng để tâm nhé. / Không có ý gì đâu.'
  },
  1254: {
    japanese: 'そういうものだよ。／仕方（しかた）がない。',
    chinese: '就是这么回事。(jiù shì zhè me huí shì) / 认命吧。(rèn mìng ba)',
    spanish: 'Así son las cosas. / Es lo que hay.',
    vietnamese: 'Đời là thế mà. / Chuyện thường thôi.'
  },
  1255: {
    japanese: '馬鹿（ばか）げてる。／おかしなこと言わ（いわ）ないで。',
    chinese: '别逗了。(bié dòu le) / 荒唐。(huāng táng)',
    spanish: 'No seas ridículo. / No digas tonterías.',
    vietnamese: 'Đừng có mà nực cười thế. / Vớ vẩn quá.'
  },
  1256: {
    japanese: '振ら（ふら）れちゃった。／失恋（しつれん）した。',
    chinese: '我被甩了。(wǒ bèi shuǎi le) / 吹了。(chuī le)',
    spanish: 'Me han dejado. / Me han dado la patada.',
    vietnamese: 'Tôi bị đá rồi. / Thất tình rồi.'
  },
  1257: {
    japanese: 'やっとわかったよ。／腑（ふ）に落ち（おち）た。',
    chinese: '现在明白了。(xiàn zài míng bai le) / 开窍了。(kāi qiào le)',
    spanish: 'Ahora tiene sentido. / Ahora lo entiendo.',
    vietnamese: 'Bây giờ thì hiểu rồi. / Hóa ra là vậy.'
  },
  1258: {
    japanese: 'さっさと済ませ（すませ）よう。／早く（はやく）終わら（おわら）せよう。',
    chinese: '快点儿干完吧。(kuài diǎnr gàn wán ba) / 了事。(liǎo shì)',
    spanish: 'Acabemos con esto de una vez. / Vamos a quitárnoslo de encima.',
    vietnamese: 'Làm cho xong quách đi. / Kết thúc nhanh thôi.'
  },
  1259: {
    japanese: '残念（ざんねん）だね。／気の毒（きのどく）に。',
    chinese: '真可惜。(zhēn kě xī) / 遗憾。(yí hàn)',
    spanish: 'Qué lástima. / Es una pena.',
    vietnamese: 'Thật là đáng tiếc. / Chia buồn nhé.'
  },
  1261: {
    japanese: 'わかってる？／つい（つい）てきてる？',
    chinese: '听明白了吗？(tīng míng bai le ma) / 懂我的意思吗？(dǒng wǒ de yì si ma)',
    spanish: '¿Me sigues? / ¿Estás conmigo?',
    vietnamese: 'Bạn có hiểu ý tôi không? / Có đang nghe tôi nói không?'
  },
  1262: {
    japanese: 'お節介（おせっかい）はやめて。／君（きみ）には関係（かんけい）ない。',
    chinese: '少管闲事。(shǎo guǎn xián shì) / 关你什么事。(guān nǐ shén me shì)',
    spanish: 'Métete en tus asuntos. / No te metas de donde no te llaman.',
    vietnamese: 'Đừng có xía vào việc của người khác. / Lo việc của bạn đi.'
  },
  1264: {
    japanese: '私（わたし）には一切（いっさい）関係（かんけい）ない。／関わり（かかわり）たくない。',
    chinese: '这事儿跟我没关系。(zhè shì r gēn wǒ méi guān xi) / 撇清。(piē qīng)',
    spanish: 'Yo no tengo nada que ver con eso. / No me mezcles en esto.',
    vietnamese: 'Tôi không liên quan gì đến chuyện đó. / Chẳng dính dáng gì đến tôi.'
  },
  1265: {
    japanese: '遠慮（えんりょ）しておくよ。／見送り（みおくり）ます。',
    chinese: '我不去了。(wǒ bú qù le) / 没劲儿。(méi jìnr)',
    spanish: 'Creo que paso. / No me apetece.',
    vietnamese: 'Tôi xin kiếu nhé. / Chắc là tôi không tham gia đâu.'
  },
  1267: {
    japanese: '外（そと）の空気（くうき）を吸って（すって）くる。／ちょっと外（そと）へ。',
    chinese: '我去透透气。(wǒ qù tòu tòu qì) / 出去会儿。(chū qù huìr)',
    spanish: 'Tengo que tomar un poco el aire. / Voy a que me dé el viento.',
    vietnamese: 'Tôi phải ra ngoài hít thở không khí. / Ra ngoài cho thoáng chút.'
  },
  1271: {
    japanese: '全く（まったく）休（やす）めない。／不運（ふうん）が続く（つづく）。',
    chinese: '我真倒霉。(wǒ zhēn dǎo méi) / 没个消停。(méi gè xiāo ting)',
    spanish: 'No gano para disgustos. / No tengo un respiro.',
    vietnamese: 'Tôi chẳng được nghỉ ngơi chút nào. / Toàn gặp chuyện xui xẻo.'
  },
  1273: {
    japanese: 'やっぱりね。／そうなると思って（おもって）たよ。',
    chinese: '我就知道。(wǒ jiù zhī dào) / 果不其然。(guǒ bù qí rán)',
    spanish: 'Lo sabía. / Ya me lo imaginaba.',
    vietnamese: 'Tôi biết ngay mà. / Đúng như tôi dự đoán.'
  },
  1274: {
    japanese: '今（いま）のは取り消す（とりけす）よ。／言い（いい）直す（なおす）ね。',
    chinese: '我收回刚才的话。(wǒ shōu huí gāng cái de huà) / 不说了。(bù shuō le)',
    spanish: 'Retiro lo dicho. / Me desdigo.',
    vietnamese: 'Tôi rút lại lời nói đó. / Coi như tôi chưa nói gì nhé.'
  },
  1277: {
    japanese: 'ジャジャーン！／見て（みて）！',
    chinese: '当当当当！(dāng dāng dāng dāng) / 瞧！(qiáo)',
    spanish: '¡Tachán! / ¡Aquí lo tienes!',
    vietnamese: 'Tén tèn! / Nhìn này!'
  },
  1279: {
    japanese: 'どう思う（おもう）？／どうする？',
    chinese: '你觉得怎么样？(nǐ jué de zěn me yàng) / 怎么说？(zěn me shuō)',
    spanish: '¿Qué me dices? / ¿Qué te parece?',
    vietnamese: 'Bạn thấy sao? / Bạn ý kiến gì không?'
  },
  1283: {
    japanese: '自分（じぶん）を責め（せめ）ないで。／落ち込ま（おちこま）ないで。',
    chinese: '别责怪自己。(bié zé guài zì jǐ) / 宽心点儿。(kuān xīn diǎnr)',
    spanish: 'No te culpes. / No seas tan duro contigo mismo.',
    vietnamese: 'Đừng tự trách mình nữa. / Đừng có dằn vặt bản thân.'
  },
  1284: {
    japanese: '浮気（うわき）された。／裏切ら（うらぎら）れた。',
    chinese: '他对我出轨了。(tā duì wǒ chū guǐ le) / 劈腿。(pī tuǐ)',
    spanish: 'Me puso los cuernos. / Me fue infiel.',
    vietnamese: 'Anh ta đã phản bội tôi. / Đã ngoại tình rồi.'
  },
  1285: {
    japanese: 'もう終わり（おわり）だ。／最悪（さいあく）だ。',
    chinese: '我完蛋了。(wǒ wán dàn le) / 栽了。(zāi le)',
    spanish: 'Estoy fastidiado. / La he fastidiado bien.',
    vietnamese: 'Tôi tiêu rồi. / Hỏng bét hết cả rồi.'
  },
  1286: {
    japanese: '大げさ（おおげさ）だよ。／ドラマチックすぎるよ。',
    chinese: '你也太夸张了。(nǐ yě tài kuā zhāng le) / 戏精。(xì jīng)',
    spanish: 'Eres un dramático. / No hagas tanto drama.',
    vietnamese: 'Bạn làm quá vấn đề rồi. / Cứ như đang đóng kịch ấy.'
  },
  1287: {
    japanese: '身の程知らず（みのほどしらず）だよ。／君（きみ）の手（て）には負え（おえ）ない。',
    chinese: '你高攀不起。(nǐ gāo pān bù qǐ) / 没那个本事。(méi nà gè běn shi)',
    spanish: 'Está fuera de tu alcance. / Juegas en otra liga.',
    vietnamese: 'Bạn không đủ đẳng cấp đâu. / Vượt quá khả năng rồi.'
  },
  1288: {
    japanese: '安心（あんしん）したよ。／ホッとした。',
    chinese: '我松了一口气。(wǒ sōng le yì kǒu qì) / 踏实了。(tā shi le)',
    spanish: 'Qué alivio. / Me he quedado mucho más tranquilo.',
    vietnamese: 'Tôi thấy nhẹ người quá. / Thật là nhẹ nhõm.'
  },
  1289: {
    japanese: '彼（かれ）は君（きみ）に夢中（むちゅう）だよ。／君にぞっこんだ。',
    chinese: '他为你着迷。(tā wèi nǐ zháo mí) / 迷上了。(mí shàng le)',
    spanish: 'Él está loco por ti. / Le traes de cabeza.',
    vietnamese: 'Anh ấy phát điên vì bạn. / Đang mê mẩn bạn lắm.'
  },
  1290: {
    japanese: '時間（じかん）はどうかな？／時間はあるかな？',
    chinese: '我们时间还够吗？(wǒ men shí jiān hái gòu ma) / 几点了？(jǐ diǎn le)',
    spanish: '¿Cómo vamos de tiempo? / ¿Tenemos tiempo?',
    vietnamese: 'Thời gian thế nào rồi nhỉ? / Còn nhiều thời gian không?'
  },
  1291: {
    japanese: 'おべっか（おべっか）は使わ（つかわ）ないで。／機嫌（きげん）取り（とり）はやめて。',
    chinese: '别拍我马屁。(bié pāi wǒ mǎ pì) / 讨好。(tǎo hǎo)',
    spanish: 'No intentes darme jabón. / No intentes hacerme la pelota.',
    vietnamese: 'Đừng có mà nịnh bợ tôi. / Đừng có tâng bốc quá đà.'
  },
  1292: {
    japanese: '君（きみ）に気（き）があるんだ。／好き（すき）なんだ。',
    chinese: '我对你有感觉。(wǒ duì nǐ yǒu gǎn jué) / 动情了。(dòng qíng le)',
    spanish: 'Siento algo por ti. / Me gustas.',
    vietnamese: 'Tôi có cảm tình với bạn. / Tôi thích bạn thật lòng.'
  },
  1294: {
    japanese: '君たち（きみたち）は本当（ほんとう）にお似合い（におにあい）だね。／ベストカップルだ。',
    chinese: '你们真是天生一对。(nǐ men zhēn shì tiān shēng yí duì) / 般配。(bān pèi)',
    spanish: 'Estáis hechos el uno para el otro. / Hacéis una pareja ideal.',
    vietnamese: 'Hai bạn thật đẹp đôi. / Đúng là trời sinh một cặp.'
  },
  1295: {
    japanese: '好き（すき）にしろよ。／勝手（かって）にすれば。',
    chinese: '随你的便。(suí nǐ de biàn) / 爱怎么着怎么着。(ài zěn me zhāo zěn me zhāo)',
    spanish: 'Haz lo que quieras. / Como gustes.',
    vietnamese: 'Tùy bạn thôi. / Muốn làm gì thì làm.'
  },
  1296: {
    japanese: 'これで十分（じゅうぶん）だね。／うまくいったね。',
    chinese: '这就可以了。(zhè jiù kě yǐ le) / 齐了。(qí le)',
    spanish: 'Con eso bastará. / Eso debería ser suficiente.',
    vietnamese: 'Chắc là thế này được rồi. / Thế là xong việc.'
  },
  1297: {
    japanese: 'ちょっと身なり（みなり）を整えて（ととのえて）くる。／洗面所（せんめんじょ）に行ってくる。',
    chinese: '我去梳洗一下。(wǒ qù shū xǐ yí xià) / 打扮打扮。(dǎ ban dǎ ban)',
    spanish: 'Voy a retocarme un poco. / Voy a refrescarme.',
    vietnamese: 'Tôi đi tút tát lại chút. / Đi vệ sinh cá nhân tý.'
  },
  1298: {
    japanese: '前後（ぜんご）逆（ぎゃく）に着（き）てるよ。／裏返し（うらがえし）だよ。',
    chinese: '你衣服穿反了。(nǐ yī fu chuān fǎn le) / 倒着。(dào zhe)',
    spanish: 'Te lo has puesto al revés. / Lo llevas del revés.',
    vietnamese: 'Bạn mặc ngược áo rồi kìa. / Trái vế rồi đó.'
  },
  1299: {
    japanese: '夕食（ゆうしょく）までに帰って（かえって）くる？／夕食（ゆうしょく）いる？',
    chinese: '你回来吃晚饭吗？(nǐ huí lái chī wǎn fàn ma) / 饭点儿准时到吗？(fàn diǎnr zhǔn shí dào ma)',
    spanish: '¿Estarás para la cena? / ¿Cenas en casa?',
    vietnamese: 'Tối nay bạn có về ăn cơm không? / Có nhà ăn tối không?'
  },
  1300: {
    japanese: 'あいにく在庫（ざいこ）切れ（ぎれ）です。／もうありません。',
    chinese: '恐怕没货了。(kǒng pà méi huò le) / 断货。(duàn huò)',
    spanish: 'Me temo que no nos queda stock. / Se ha agotado.',
    vietnamese: 'Rất tiếc là chúng tôi đã hết hàng. / Không còn hàng sẵn rồi.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 3 updated.');
