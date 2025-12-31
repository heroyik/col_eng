const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  899: {
    japanese: '2分（にふん）に満た（みた）ない。／あと少し（すこし）で2分。',
    chinese: '差两分钟。(chà liǎng fēn zhōng) / 差一点就两分钟了。(chà yì diǎn jiù liǎng fēn zhōng)',
    spanish: 'A falta de dos minutos. / Casi dos minutos.',
    vietnamese: 'Thiếu hai phút nữa. / Gần hai phút.'
  },
  998: {
    japanese: '最高（さいこう）に幸せ（しあわせ）。／雲（くも）の上（うえ）にいる気分（きぶん）。',
    chinese: '乐不可支。(lè bù kě zhī) / 像在云端一样。(xiàng zài yún duān yí yàng)',
    spanish: 'Estoy en el séptimo cielo. / Estoy felicísimo.',
    vietnamese: 'Vui như trên mây. / Hạnh phúc tột cùng.'
  },
  999: {
    japanese: '彼女（かのじょ）は喉（のど）が渇い（かわい）ていた。／彼女は喉から手（て）が出る（でる）ほど欲しかっ（ほしかっ）た。',
    chinese: '她渴了。(tā kě le) / 她很渴望。(tā hěn kě wàng)',
    spanish: 'Ella tenía sed. / Estaba sedienta.',
    vietnamese: 'Cô ấy đã khát. / Cô ấy khao khát.'
  },
  1003: {
    japanese: '臨機応変（りんきおうへん）にやろう。／その場（ば）の状況（じょうきょう）で決め（きめ）よう。',
    chinese: '见机行事。(jiàn jī háng shì) / 到时候再说。(dào shí hou zài shuō)',
    spanish: 'Improvisemos. / Vamos viendo sobre la marcha.',
    vietnamese: 'Tùy cơ ứng biến. / Đến đâu hay đến đó.'
  },
  1004: {
    japanese: 'その話（はなし）は持ち出さ（もちださ）ないで。／口（くち）にすらしないで。',
    chinese: '连提都别提。(lián tí dōu bié tí) / 别说这事儿。(bié shuō zhè shì r)',
    spanish: 'Ni lo menciones. / No saques el tema.',
    vietnamese: 'Đừng có mà nhắc tới. / Đừng đề cập chuyện đó.'
  },
  1016: {
    japanese: 'これが問題（もんだい）の核心（かくしん）だ。／これが一番（いちばん）重要（じゅうよう）な点（てん）だ。',
    chinese: '这是问题的核心。(zhè shì wèn tí de hé xīn) / 重点在这儿。(zhòng diǎn zài zhèr)',
    spanish: 'Este es el meollo del asunto. / Esto es lo esencial.',
    vietnamese: 'Đây là mấu chốt của vấn đề. / Điểm cốt lõi là đây.'
  },
  1017: {
    japanese: '私（わたし）を誰（だれ）だと思っ（おもっ）ているんだ？／私を馬鹿（ばか）にしているのか？',
    chinese: '你把我当成谁了？(nǐ bǎ wǒ dàng chéng shuí le) / 你以为我是谁？(nǐ yǐ wéi wǒ shì shuí)',
    spanish: '¿Quién te crees que soy? / ¿Por quién me tomas?',
    vietnamese: 'Anh nghĩ tôi là ai chứ? / Coi thường tôi à?'
  },
  1020: {
    japanese: '結局（けっきょく）のところ。／最後（さいご）には。',
    chinese: '说到底。(shuō dào dǐ) / 归根结底。(guī gēn jié dǐ)',
    spanish: 'Al fin y al cabo. / Al final del día.',
    vietnamese: 'Cuối cùng thì. / Chung quy lại.'
  },
  1021: {
    japanese: '彼（かれ）は元気（げんき）いっぱいだった。／彼はとても活発（かっぱつ）だった。',
    chinese: '他精力充沛。(tā jīng lì chōng pèi) / 他非常有活力。(tā fēi cháng yǒu huó lì)',
    spanish: 'Él estaba lleno de energía. / Tenía mucha vitalidad.',
    vietnamese: 'Anh ấy tràn đầy năng lượng. / Rất hăng hái.'
  },
  1025: {
    japanese: '彼ら（かれら）は実現（じつげん）不可能な（ふかのうな）約束（やくそく）をした。／彼らはできもしないことを言っ（いっ）た。',
    chinese: '他们漫天许愿。(tā men màn tiān xǔ yuàn) / 乱开空头支票。(luàn kāi kōng tóu zhī piào)',
    spanish: 'Prometieron el oro y el moro. / Hicieron promesas imposibles.',
    vietnamese: 'Họ hứa hươu hứa vượn. / Hứa những điều không tưởng.'
  },
  1026: {
    japanese: '彼（かれ）は順調（じゅんちょう）だ。／彼は予定（よてい）通り（どおり）に進ん（すすん）でいる。',
    chinese: '他在轨道上。(tā zài guǐ dào shàng) / 进展顺利。(jìn zhǎn shùn lì)',
    spanish: 'Él va por buen camino. / Está encaminado.',
    vietnamese: 'Anh ấy đang đi đúng hướng. / Đang tiến triển tốt.'
  },
  1027: {
    japanese: 'それほど悪く（わるく）はない。／見かけ（みかけ）ほどひどくない。',
    chinese: '没看起来那么糟。(méi kàn qǐ lái nà me zāo) / 还行。(hái xíng)',
    spanish: 'No es tan malo como parece. / Podría ser peor.',
    vietnamese: 'Không tệ như vẻ ngoài đâu. / Vẫn còn ổn chán.'
  },
  1028: {
    japanese: '落ち着い（おちつい）て。／緊張（きんちょう）をほぐして。',
    chinese: '别紧张。(bié jǐn zhāng) / 放松点儿。(fàng sōng diǎnr)',
    spanish: 'Calma tus nervios. / Tranquilízate.',
    vietnamese: 'Bình tĩnh lại đi. / Đừng lo lắng quá.'
  },
  1029: {
    japanese: 'それは元気づけ（げんきづけ）になった。／それは励み（はげみ）になった。',
    chinese: '这是一剂强心针。(zhè shì yí jì qiáng xīn zhēn) / 令人振奋。(lìng rén zhèn fèn)',
    spanish: 'Fue una inyección de energía. / Fue un gran estímulo.',
    vietnamese: 'Đó là một sự khích lệ lớn. / Tiếp thêm sức mạnh.'
  },
  1030: {
    japanese: 'それが運（うん）の尽き（つき）だ。／世（よ）の中（なか）そんなものだ。',
    chinese: '这就是生活。(zhè jiù shì shēng huó) / 没办法的事。(méi bàn fǎ de shì)',
    spanish: 'Así son las cosas. / Así es la vida.',
    vietnamese: 'Đời là thế đó. / Chuyện thường tình thế thôi.'
  },
  1031: {
    japanese: 'それは朗報（ろうほう）だ。／聞い（きい）て嬉しい（うれしい）話（はなし）だ。',
    chinese: '这对我来说是好消息。(zhè duì wǒ lái shuō shì hǎo xiāo xi) / 悦耳动听。(yuè ěr dòng tīng)',
    spanish: 'Eso es música para mis oídos. / Me encanta oír eso.',
    vietnamese: 'Đó là tin vui nhất tôi từng nghe. / Nghe sướng tai thật.'
  },
  1032: {
    japanese: '彼（かれ）は自分（じぶん）の役割（やくわり）を果たして（はたして）いなかった。／彼はサボっていた。',
    chinese: '他没有尽到责任。(tā méi yǒu jìn dào zé rèn) / 他在偷懒。(tā zài tōu lǎn)',
    spanish: 'Él no estaba haciendo su parte. / No cumplía con su deber.',
    vietnamese: 'Anh ta không làm tròn trách nhiệm. / Không đóng góp gì cả.'
  },
  1035: {
    japanese: '波（なみ）に乗っ（のっ）ているね。／絶好調（ぜっこうちょう）だね。',
    chinese: '你现在手气正旺。(nǐ xiàn zài shǒu qì zhèng wàng) / 进展神速。(jìn zhǎn shén sù)',
    spanish: 'Estás en racha. / Te va de maravilla.',
    vietnamese: 'Bạn đang gặp vận đỏ đấy. / Đang trên đà thắng lợi.'
  },
  1036: {
    japanese: '契約（けいやく）が破談（はだん）になった。／取引（とりひき）が失敗（しっぱい）した。',
    chinese: '交易泡汤了。(jiāo yì pào tāng le) / 没谈成。(méi tán chéng)',
    spanish: 'El trato se fue al traste. / El acuerdo fracasó.',
    vietnamese: 'Thỏa thuận đã đổ bể. / Hợp đồng thất bại.'
  },
  1037: {
    japanese: '彼（かれ）とけんかした。／彼と仲違い（なかたがい）した。',
    chinese: '我和他闹翻了。(wǒ hé tā nào fān le) / 吵架了。(chǎo jià le)',
    spanish: 'Tuve un altercado con él. / Me peleé con él.',
    vietnamese: 'Tôi đã cãi nhau với anh ấy. / Mất lòng với nhau.'
  },
  1038: {
    japanese: 'それほど難しい（むずかしい）ことではない。／誰（だれ）にでもできることだ。',
    chinese: '这又不是什么高科技。(zhè yòu bú shì shén me gāo kē jì) / 没那么难。(méi nà me nán)',
    spanish: 'No es ciencia aeroespacial. / No es tan difícil.',
    vietnamese: 'Không phải chuyện gì cao siêu đâu. / Dễ như ăn kẹo ấy mà.'
  },
  1039: {
    japanese: '私（わたし）たちが代わり（かわり）にやらなければならない。／穴埋め（あなうめ）をしなければならない。',
    chinese: '我们得收拾残局。(wǒ men děi shōu shi cán jú) / 补位。(bǔ wèi)',
    spanish: 'Todos tenemos que arrimar el hombro. / Hay que cubrir el hueco.',
    vietnamese: 'Chúng ta phải gánh vác thay phần việc đó. / Bù đắp thiếu sót.'
  },
  1040: {
    japanese: '思い切っ（おもいきっ）てやってみた。／危うさ（あやうさ）を顧みず（かえりみず）に行動（こうどう）した。',
    chinese: '不顾一切地去做了。(bú gù yì qiè de qù zuò le) / 豁出去了。(huō chū qù le)',
    spanish: 'Mandé la prudencia al garete. / Me arriesgué sin pensar.',
    vietnamese: 'Tôi đã liều một phen. / Chẳng màng hậu quả.'
  },
  1042: {
    japanese: '口下手（くちべた）だ。／言葉（ことば）で表現（ひょうげん）するのが苦手（にがて）だ。',
    chinese: '我不擅长言辞。(wǒ bù shàn cháng yán cí) / 笨嘴拙舌。(bèn zuǐ zhuō shé)',
    spanish: 'No se me dan bien las palabras. / Me cuesta expresarme.',
    vietnamese: 'Tôi không giỏi ăn nói. / Vụng chèo khéo chống.'
  },
  1043: {
    japanese: 'へとへとだ。／限界（げんかい）ギリギリだ。',
    chinese: '我精疲力尽了。(wǒ jīng pí lì jìn le) / 强撑着呢。(qiáng chēng zhe ne)',
    spanish: 'Estoy bajo mínimos. / Estoy exhausto.',
    vietnamese: 'Tôi đang cạn kiệt sức lực. / Cố quá sức rồi.'
  },
  1044: {
    japanese: '私（わたし）が決める（きめる）。／私に権限（けんげん）がある。',
    chinese: '我说了算。(wǒ shuō le suàn) / 我是当家的。(wǒ shì dāng jiā de)',
    spanish: 'Yo mando aquí. / Yo tomo las decisiones.',
    vietnamese: 'Tôi là người quyết định. / Tôi nắm quyền.'
  },
  1047: {
    japanese: '彼女（かのじょ）は私（わたし）を溺愛（できあい）した。／彼女は私をとても可愛がっ（かわいがっ）た。',
    chinese: '她非常溺爱我。(tā fēi cháng nì ài wǒ) / 心疼我。(xīn téng wǒ)',
    spanish: 'Ella me adoraba. / Me mimaba muchísimo.',
    vietnamese: 'Bà ấy cưng chiều tôi hết mực. / Rất yêu thương tôi.'
  },
  1048: {
    japanese: '最初（さいしょ）から自分（じぶん）で作っ（つくっ）た。／手作り（てづくり）だ。',
    chinese: '我从零开始做的。(wǒ cóng líng kāi shǐ zuò de) / 亲手做的。(qīn shǒu zuò de)',
    spanish: 'Lo hice desde cero. / Lo hice yo mismo.',
    vietnamese: 'Tôi tự làm từ con số không. / Tự tay làm hết.'
  },
  1049: {
    japanese: '私（わたし）のお株（おかぶ）を奪わ（うばわ）ないで。／私の見せ場（みせば）を取ら（とら）ないで。',
    chinese: '别抢我的风头。(bié qiǎng wǒ de fēng tou) / 别盖过我。(bié gài guò wǒ)',
    spanish: 'No me quites el protagonismo. / No me robes el crédito.',
    vietnamese: 'Đừng có cướp công của tôi. / Đừng làm lu mờ tôi.'
  },
  1050: {
    japanese: '彼（かれ）は黙り込ん（だまりこん）だ。／彼は口（くち）を閉ざし（とざし）た。',
    chinese: '他突然闭嘴了。(tā tū rán bì zuǐ le) / 守口如瓶。(shǒu kǒu rú píng)',
    spanish: 'Él se cerró en banda. / Se quedó callado.',
    vietnamese: 'Anh ta im như thóc. / Câm như hến.'
  },
  1051: {
    japanese: '爆買い（ばくがい）したい気分（きぶん）だ。／お金（かね）を使いまくり（つかいまくり）たい。',
    chinese: '我想大买特买一通。(wǒ xiǎng dà mǎi tè mǎi yì tōng) / 挥霍一番。(huī huò yì fān)',
    spanish: 'Me iría de compras a lo loco. / Gastaría a manos llenas.',
    vietnamese: 'Tôi muốn đi mua sắm xả láng. / Tiêu xài vung vít.'
  },
  1052: {
    japanese: '藪蛇（やぶへび）になりたくない。／厄介（やっかい）なことになりたくない。',
    chinese: '我不想捅马蜂窝。(wǒ bù xiǎng tǒng mǎ fēng wō) / 别惹麻烦。(bié rě má fan)',
    spanish: 'No quiero abrir la caja de Pandora. / No quiero meterme en líos.',
    vietnamese: 'Tôi không muốn rước họa vào thân. / Đừng bới lông tìm vết.'
  },
  1056: {
    japanese: '見かけ（みかけ）とは違う（ちがう）。／誤解（ごかい）しないで。',
    chinese: '不是你想的那样。(bú shì nǐ xiǎng de nà yàng) / 只是误会。(zhǐ shì wù huì)',
    spanish: 'No es lo que parece. / No te equivoques.',
    vietnamese: 'Không phải như anh thấy đâu. / Đừng có hiểu lầm.'
  },
  1057: {
    japanese: 'やめられない楽しみ（たのしみ）は何（なに）？／自分（じぶん）だけの密か（みそか）な楽しみは？',
    chinese: '你有什么小癖好吗？(nǐ yǒu shén me xiǎo pǐ hào ma) / 偷偷享受的事。(tōu tōu xiǎng shòu de shì)',
    spanish: '¿Cuál es tu placer culpable? / ¿Qué te gusta aunque te dé vergüenza?',
    vietnamese: 'Sở thích tội lỗi của bạn là gì? / Thú vui thầm kín là gì?'
  },
  1058: {
    japanese: 'ハズレを引い（ひい）た。／運（うん）が悪かっ（わるかっ）た。',
    chinese: '我没抽到好签。(wǒ méi chōu dào hǎo qiān) / 我倒霉。(wǒ dǎo méi)',
    spanish: 'Me tocó la peor parte. / Me tocó bailar con la más fea.',
    vietnamese: 'Tôi đã bốc phải quẻ xấu. / Đen đủ đường.'
  },
  1059: {
    japanese: '彼女（かのじょ）は本当（ほんとう）に史上（しじょう）最高（さいこう）だ。／彼女は天才（てんさい）だ。',
    chinese: '她真的是历史第一。(tā zhēn de shì lì shǐ dì yī) / 太牛了。(tài niú le)',
    spanish: 'Ella es de verdad la mejor de todos los tiempos. / Es una fiera.',
    vietnamese: 'Cô ấy thực sự là người giỏi nhất. / Đỉnh của chóp luôn.'
  },
  1060: {
    japanese: '複雑（ふくざつ）な心境（しんきょう）だ。／色々（いろいろ）な感情（かんじょう）が入り交じっ（はいりまじっ）ている。',
    chinese: '我心情很复杂。(wǒ xīn qíng hěn fù zá) / 五味杂陈。(wǔ wèi zá chén)',
    spanish: 'Tengo sentimientos encontrados. / Estoy muy confundido.',
    vietnamese: 'Tôi đang có những cảm xúc lẫn lộn. / Tâm trạng rối bời.'
  },
  1061: {
    japanese: 'もっとひどいのも見（み）てきた。／これくらいなら大丈夫（だいじょうぶ）だ。',
    chinese: '我还见过更糟的。(wǒ hái jiàn guò gèng zāo de) / 这算啥。(zhè suàn shá)',
    spanish: 'He visto cosas peores. / Esto no es nada.',
    vietnamese: 'Tôi đã từng thấy những thứ tệ hơn. / Thế này đã là gì.'
  },
  1062: {
    japanese: 'この紅茶（こうちゃ）、変（へん）な味（あじ）がする。／このお茶（ちゃ）、おかしい。',
    chinese: '这茶味道怪怪的。(zhè chá wèi dào guài guài de) / 不对劲儿。(bú duì jìnr)',
    spanish: 'El té sabe raro. / Este té tiene un sabor extraño.',
    vietnamese: 'Trà này vị lạ quá. / Có gì đó không ổn.'
  },
  1063: {
    japanese: 'それは破格（はかく）の安さ（やすさ）だ。／お買い得（かいどく）だ。',
    chinese: '太划算了。(tài huá suàn le) / 捡了个大便宜。(jiǎn le gè dà pián yi)',
    spanish: 'Es una ganga. / Es un chollo.',
    vietnamese: 'Rẻ như cho ấy mà. / Một món hời lớn.'
  },
  1064: {
    japanese: '今（いま）が決断（けつだん）の時（とき）だ。／今決め（きめ）なければならない。',
    chinese: '现在是做决定的时候了。(xiàn zài shì zuò jué dìng de shí hou le) / 就看现在的了。(jiù kàn xiàn zài de le)',
    spanish: 'Este es el momento de decidir. / Ahora o nunca.',
    vietnamese: 'Bây giờ là lúc phải quyết định. / Không thể chần chừ nữa.'
  },
  1065: {
    japanese: 'ぶっつけ本番（ほんばん）でやった。／準備（じゅんび）なしで乗り切っ（のりきっ）た。',
    chinese: '我就是临场发挥的。(wǒ jiù shì lín chǎng fā huī de) / 现上轿现扎耳朵眼儿。(xiàn shàng jiào xiàn zhā ěr duo yǎnr)',
    spanish: 'Lo improvisé sobre la marcha. / Me lo inventé en el momento.',
    vietnamese: 'Tôi chỉ làm đại thôi. / Tùy cơ ứng biến.'
  },
  1068: {
    japanese: '一層（いっそう）努力（どりょく）した。／期待（きたい）以上（いじょう）のことをした。',
    chinese: '我们多做了一些。(wǒ men duō zuò le yì xiē) / 特外出力。(tè wài chū lì)',
    spanish: 'Hicimos un esfuerzo extra. / Fuimos más allá de lo esperado.',
    vietnamese: 'Chúng tôi đã nỗ lực thêm một chút. / Vượt mức mong đợi.'
  },
  1069: {
    japanese: '彼ら（かれら）を拒絶（きょぜつ）した。／彼らをお釈放（しゃほう）した。',
    chinese: '我把他们封杀了。(wǒ bǎ tā men fēng shā le) / 绝交了。(jué jiāo le)',
    spanish: 'Los cancelé. / Los borré de mi lista.',
    vietnamese: 'Tôi đã tẩy chay họ. / Cắt đứt quan hệ rồi.'
  },
  1070: {
    japanese: '仕事（しごと）に追わ（おわ）れていた。／仕事が山積み（やまづみ）だった。',
    chinese: '我工作忙得不可开交。(wǒ gōng zuò máng de bù kě kāi jiāo) / 忙死了。(máng sǐ le)',
    spanish: 'Estaba hasta arriba de trabajo. / Estaba desbordado.',
    vietnamese: 'Tôi đã ngập đầu trong công việc. / Bận túi bụi.'
  },
  1071: {
    japanese: 'とても安い（やすい）。／二束三文（にそくさんもん）だ。',
    chinese: '便宜得很。(pián yi de hěn) / 白菜价。(bái cài jià)',
    spanish: 'Es baratísimo. / Cuesta cuatro perras.',
    vietnamese: 'Rẻ như bèo. / Giá rẻ như cho.'
  },
  1073: {
    japanese: '嫌（いや）ならやめろ。／これしかない。',
    chinese: '要么接受，不要拉倒。(yào me jiē shòu, bú yào lā dǎo) / 就这么多。(jiù zhè me duō)',
    spanish: 'Lo tomas o lo dejas. / Es lo que hay.',
    vietnamese: 'Chấp nhận hoặc từ bỏ. / Chỉ có bấy nhiêu thôi.'
  },
  1074: {
    japanese: '恥（はじ）をかきたくない。／面目（めんぼく）を失い（うしない）たくくない。',
    chinese: '我不想丢脸。(wǒ bù xiǎng diū liǎn) / 别出洋相。(bié chū yáng xiàng)',
    spanish: 'No quiero quedar en ridículo. / No quiero que me saquen los colores.',
    vietnamese: 'Tôi không muốn bị mất mặt. / Đừng làm trò cười.'
  },
  1075: {
    japanese: '岐路（きろ）に立た（たた）されている。／大きな（おおきな）分かれ道（わかれみち）にいる。',
    chinese: '我处在十字路口。(wǒ chǔ zài shí zì lù kǒu) / 面临选择。(miàn lín xuǎn zé)',
    spanish: 'Estoy en una encrucijada. / Estoy en un punto crítico.',
    vietnamese: 'Tôi đang ở ngã ba đường. / Đang đứng trước những lựa chọn.'
  },
  1076: {
    japanese: '私（わたし）は何（なに）も隠さ（かくさ）ない。／隠し事（かくしごと）のない人間（にんげん）だ。',
    chinese: '我这人很坦诚。(wǒ zhè rén hěn tǎn chéng) / 没什么好瞒的。(méi shén me hǎo mán de)',
    spanish: 'Soy un libro abierto. / Soy una persona transparente.',
    vietnamese: 'Tôi là người thẳng thắn. / Chẳng giấu giếm điều gì.'
  },
  1077: {
    japanese: 'ちょっとした騒動（そうどう）があった。／小競り合い（こぜりあい）があった。',
    chinese: '闹了一点小别扭。(nào le yì diǎn xiǎo bié niu) / 乱哄哄的。(luàn hōng hōng de)',
    spanish: 'Hubo un pequeño lío. / Hubo un poco de jaleo.',
    vietnamese: 'Đã có một chút lộn xộn. / Một cuộc cãi vã nhỏ.'
  },
  1078: {
    japanese: '期待（きたい）に応え（こたえ）られなかった。／役不足（やくぶそく）だった。',
    chinese: '他们没能达到要求。(tā men méi néng dá dào yāo qiú) / 不够格。(bú gòu gé)',
    spanish: 'Los chicos no dieron la talla. / No estuvieron a la altura.',
    vietnamese: 'Mấy đứa trẻ không làm được việc. / Không đạt yêu cầu.'
  },
  1082: {
    japanese: '彼（かれ）は真っ赤な（まっかな）嘘（うそ）をついている。／彼は平気（へいき）で嘘をつく。',
    chinese: '他睁眼说瞎话。(tā zhēng yǎn shuō xiā huà) / 满嘴谎言。(mǎn zuǐ huǎng yán)',
    spanish: 'Está mintiendo descaradamente. / Miente más que habla.',
    vietnamese: 'Hắn ta nói dối như cuội. / Nói dối trắng trợn.'
  },
  1083: {
    japanese: '他（ほか）に適当な（てきとうな）言葉（ことば）が見当たら（みあたら）ないが。／言葉は悪い（わるい）が。',
    chinese: '找不到更好的词。(zhǎo bú dào gèng hǎo de cí) / 说句不好听的。(shuō jù bù hǎo tīng de)',
    spanish: 'A falta de una palabra mejor. / Por no decir otra cosa.',
    vietnamese: 'Vì thiếu từ ngữ thích hợp hơn. / Nói cách khác là.'
  },
  1084: {
    japanese: '出発（しゅっぱつ）の時間（じかん）だ。／さあ、行こ（いこ）う。',
    chinese: '该动身了。(gāi dòng shēn le) / 走起。(zǒu qǐ)',
    spanish: 'Es hora de ponerse en marcha. / Vamos moviéndonos.',
    vietnamese: 'Đến lúc phải đi rồi. / Lên đường thôi.'
  },
  1085: {
    japanese: 'その意気（いき）だ！／いいぞ！',
    chinese: '这就对了！(zhè jiù duì le) / 好样儿的！(hǎo yàng r de)',
    spanish: '¡Ese es el espíritu! / ¡Así se habla!',
    vietnamese: 'Đúng là thế đấy! / Cố lên như vậy nhé!'
  },
  1086: {
    japanese: '回復（かいふく）に向かって（むかって）いる。／良（よ）くなってきている。',
    chinese: '我正在好转。(wǒ zhèng zài hǎo zhuàn) / 养病呢。(yǎng bìng ne)',
    spanish: 'Me estoy recuperando. / Estoy en vías de curación.',
    vietnamese: 'Tôi đang hồi phục. / Đang dần khỏe lại.'
  },
  1087: {
    japanese: '納得（なっとく）したよ。／君（きみ）の勝ち（かち）だ。',
    chinese: '你说服我了。(nǐ shuō fú wǒ le) / 我买了。(wǒ mǎi le)',
    spanish: 'Me has convencido. / Compro la idea.',
    vietnamese: 'Bạn đã thuyết phục được tôi. / Tôi đồng ý.'
  },
  1088: {
    japanese: '理解（りかい）できない。／さっぱりわかならい。',
    chinese: '我没法理解。(wǒ méi fǎ lǐ jiě) / 搞不懂。(gǎo bù dǒng)',
    spanish: 'No me cabe en la cabeza. / No logro entenderlo.',
    vietnamese: 'Tôi không thể hiểu nổi điều đó. / Thật không thể tin được.'
  },
  1089: {
    japanese: 'なんて優しい（やさしい）の。／とても親切（しんせつ）ですね。',
    chinese: '你真好。(nǐ zhēn hǎo) / 太贴心了。(tài tiē xīn le)',
    spanish: 'Es muy amable de tu parte. / Qué detalle tan bonito.',
    vietnamese: 'Bạn thật là tốt bụng. / Bạn thật ngọt ngào.'
  },
  1090: {
    japanese: '解決（かいけつ）してみせる。／何とか（なんとか）する。',
    chinese: '我会搞定的。(wǒ huì gǎo dìng de) / 走着瞧。(zǒu zhe qiáo)',
    spanish: 'Ya lo resolveré. / Ya buscaré la forma.',
    vietnamese: 'Tôi sẽ giải quyết được thôi. / Tôi sẽ tìm cách.'
  },
  1091: {
    japanese: 'モバイル技術（ぎじゅつ）が主役（しゅやく）になりつつある。／モバイルが主流（しゅりゅう）だ。',
    chinese: '移动技术正走向舞台中心。(yí dòng jì shù zhèng zǒu xiàng wǔ tái zhōng xīn) / 重点在手机上。(zhòng diǎn zài shǒu jī shàng)',
    spanish: 'La tecnología móvil está cobrando protagonismo. / El móvil es ahora lo principal.',
    vietnamese: 'Công nghệ di động đang trở thành tâm điểm. / Xu hướng chính hiện nay.'
  },
  1092: {
    japanese: '彼（かれ）は無惨な（むざんな）真実（しんじつ）を暴く（あばく）だろう。／彼は真実をさらけ出す。',
    chinese: '他将揭露丑恶的真相。(tā jiāng jiē lù chǒu è de zhēn xiàng) / 拆穿谎言。(chāi chuān huǎng yán)',
    spanish: 'Él sacará a la luz la cruda realidad. / Desnudará la verdad.',
    vietnamese: 'Anh ta sẽ phơi bày sự thật phũ phàng. / Vạch trần sự dối trá.'
  },
  1096: {
    japanese: '待ち遠（まちどお）しい。／早く（はやく）その日が来てほしい。',
    chinese: '我恨不得那天马上就到。(wǒ hèn bù dé nà tiān mǎ shàng jiù dào) / 等不及了。(děng bù jí le)',
    spanish: 'No veo la hora de que llegue el día. / Se me hace eterna la espera.',
    vietnamese: 'Tôi nóng lòng chờ đợi ngày đó. / Mong sao ngày đó mau đến.'
  },
  1097: {
    japanese: '彼（かれ）には影響力（えいきょうりょく）がある。／彼は力（ちから）を持っている。',
    chinese: '他很有影响力。(tā hěn yǒu yǐng xiǎng lì) / 他有后台。(tā yǒu hòu tái)',
    spanish: 'Él tiene mucha influencia. / Tiene peso político.',
    vietnamese: 'Anh ấy có tầm ảnh hưởng. / Có thế lực lắm đấy.'
  },
  1098: {
    japanese: '彼（かれ）は跡形（あとかた）もなく消えた（きえた）。／彼は煙（けむり）のように消え去っ（きえさっ）た。',
    chinese: '他消失得无影无踪。(tā xiāo shī de wú yǐng wú zōng) / 人间蒸发。(rén jiān zhēng fā)',
    spanish: 'Él se esfumó como por arte de magia. / Desapareció por completo.',
    vietnamese: 'Anh ta đã biến mất không để lại dấu vết. / Biến mất vào hư vô.'
  },
  1099: {
    japanese: '話（はなし）を逸らさ（そらさ）ないで。／話題（わだい）を変え（かえ）ないで。',
    chinese: '别转移话题。(bié zhuǎn yí huà tí) / 别打岔。(bié dǎ chà)',
    spanish: 'No cambies de tema. / No desvíes la conversación.',
    vietnamese: 'Đừng có đánh trống lảng. / Đừng đổi chủ đề.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 1 updated.');
