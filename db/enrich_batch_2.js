const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  33: {
    japanese: '夕食（ゆうしょく）どう？／一緒（いっしょ）に食（た）べる？',
    chinese: '晚上想一起吃饭吗？(wǎn shang xiǎng yì qǐ chī fàn ma) / 约个晚饭？(yuē gè wǎn fàn)',
    spanish: '¿Te apetece cenar? / ¿Cenamos hoy?',
    vietnamese: 'Tối nay đi ăn không? / Đi ăn tối với tôi nhé.'
  },
  34: {
    japanese: 'そうしたいのは山々（やまやま）だけど。／残念（ざんねん）ながら。',
    chinese: '我也想去。(wǒ yě xiǎng qù) / 可惜我去不了。(kě xī wǒ qù bù liǎo)',
    spanish: 'Ojalá pudiera. / Me encantaría, pero no puedo.',
    vietnamese: 'Tôi cũng muốn lắm. / Giá mà tôi đi được.'
  },
  35: {
    japanese: '大切（たいせつ）なパートナー。／相棒（あいぼう）。',
    chinese: '另一半。(lìng yí bàn) / 伴侣。(bàn lǚ)',
    spanish: 'Pareja. / Media naranja.',
    vietnamese: 'Người thương. / Nửa kia.'
  },
  36: {
    japanese: 'もちろんだよ。／了解（りょうかい）。',
    chinese: '没问题。(méi wèn tí) / 当然了。(dāng rán le)',
    spanish: 'Claro que sí. / Por supuesto.',
    vietnamese: 'Tất nhiên rồi. / Chuyện nhỏ mà.'
  },
  37: {
    japanese: '任（まか）せて。／分（わ）かった。',
    chinese: '我帮你。(wǒ bāng nǐ) / 包在我身上。(bāo zài wǒ shēn shang)',
    spanish: 'Yo te ayudo. / Lo tengo controlado.',
    vietnamese: 'Tôi lo được. / Cứ để tôi giúp cho.'
  },
  38: {
    japanese: 'はい、どうぞ。／ここにあります。',
    chinese: '给你。(gěi nǐ) / 拿好了。(ná hǎo le)',
    spanish: 'Aquí tiene. / Aquí está.',
    vietnamese: 'Của bạn đây. / Đây nhé.'
  },
  39: {
    japanese: '拍手（はくしゅ）。／称賛（しょうさん）する。',
    chinese: '喝彩。(hè cǎi) / 夸奖。(kuā jiǎng)',
    spanish: 'Aplaudir. / Felicitar.',
    vietnamese: 'Vỗ tay. / Khen ngợi.'
  },
  40: {
    japanese: 'よーく聞（き）いて。／はっきり言（い）うよ。',
    chinese: '听清楚了。(tīng qīng chu le) / 仔细听。(zǐ xì tīng)',
    spanish: 'Escucha bien. / Lee mis labios.',
    vietnamese: 'Nghe cho kỹ này. / Nhìn môi tôi mà nghe cho rõ.'
  },
  41: {
    japanese: '気（き）持（も）ちは若（わか）い。／心（こころ）は青春（せいしゅん）。',
    chinese: '心态年轻。(xīn tài nián qīng) / 童心未泯。(tóng xīn wèi mǐn)',
    spanish: 'Joven de espíritu. / Me siento joven.',
    vietnamese: 'Tâm hồn còn trẻ. / Trẻ mãi không già.'
  },
  42: {
    japanese: '悪（わる）くなる。／ダメになる。',
    chinese: '变糟了。(biàn zāo le) / 完蛋了。(wán dàn le)',
    spanish: 'Irse todo al traste. / Empeorar.',
    vietnamese: 'Trở nên tồi tệ. / Hỏng bét hết rồi.'
  },
  43: {
    japanese: 'どうしたの？／黙（だま）り込（こ）んじゃって。',
    chinese: '怎么不说话了？(zěn me bù shuō huà le) / 哑巴了？(yǎ ba le)',
    spanish: '¿Te ha comido la lengua el gato? / ¿Por qué tan callado?',
    vietnamese: 'Sao im re thế? / Mèo ăn mất lưỡi rồi à?'
  },
  44: {
    japanese: 'この嫌（いや）な予感（よかん）が消（き）えない。／胸（むね）騒（ざわ）ぎがする。',
    chinese: '感觉挥之不去。(gǎn jué huī zhī bù qù) / 总觉得不对劲。(zǒng jué de bú duì jìn)',
    spanish: 'No puedo quitarme esta sensación. / Tengo un mal pálpito.',
    vietnamese: 'Không xua tan được cảm giác này. / Cứ thấy bất an thế nào ấy.'
  },
  45: {
    japanese: '超（ちょう）おすすめ。／激（げき）推（お）し。',
    chinese: '强烈推荐。(qiáng liè tuī jiàn) / 真的绝了。(zhēn de jué le)',
    spanish: 'Lo recomiendo de verdad. / Te lo super recomiendo.',
    vietnamese: 'Cực kỳ đề cử. / Highly recommend luôn.'
  },
  46: {
    japanese: '携帯（けいたい）はマナーモードに。／静（しず）かにして。',
    chinese: '手机调成静音。(shǒu jī tiáo chéng jìng yīn) / 关掉声音。(guān diào shēng yīn)',
    spanish: 'Pon el móvil en silencio. / Silencia el teléfono.',
    vietnamese: 'Để điện thoại im lặng. / Tắt chuông điện thoại đi.'
  },
  47: {
    japanese: '責任（せきにん）は私（わたし）が取（と）る。／ここが最後（さいご）だ。',
    chinese: '我也负责。(wǒ yě fù zé) / 责任全在我。(zé rèn quán zài wǒ)',
    spanish: 'Yo me hago cargo. / La responsabilidad termina aquí.',
    vietnamese: 'Tôi sẽ chịu trách nhiệm. / Trách nhiệm dừng lại ở đây.'
  },
  48: {
    japanese: '予約（よやく）がいっぱい。／動（うご）けない。',
    chinese: '预约满了。(yù yuē mǎn le) / 没位子了。(méi wèi zi le)',
    spanish: 'Tengo la agenda llena. / Estoy a tope.',
    vietnamese: 'Lịch đã kín hết. / Không còn chỗ trống.'
  },
  49: {
    japanese: '今日（きょう）は予定（よてい）が詰（つ）まってる。／余裕（よゆう）がない。',
    chinese: '今天日程很满。(jīn tiān rì chéng hěn mǎn) / 忙死了。(máng sǐ le)',
    spanish: 'Tengo el día completo. / Mi horario está a tope hoy.',
    vietnamese: 'Hôm nay bận tối mắt. / Lịch trình dày đặc.'
  },
  50: {
    japanese: '予定（よてい）が一杯（いっぱい）だった。／多忙（たぼう）だった。',
    chinese: '那天我预约满了。(nà tiān wǒ yù yuē mǎn le) / 太挤了。(tài jǐ le)',
    spanish: 'Estaba hasta los topes. / No tenía ni un hueco.',
    vietnamese: 'Lúc đó tôi bị kín lịch. / Bận không kịp thở luôn.'
  },
  51: {
    japanese: 'ご近所（きんじょ）付（づ）き合（あ）いの友達（ともだち）。／近（ちか）くの友人（ゆうじん）。',
    chinese: '邻居朋友。(lín jū péng yǒu) / 住得近的朋友。(zhù de jìn de péng yǒu)',
    spanish: 'Amigo del barrio. / Vecino amigo.',
    vietnamese: 'Bạn hàng xóm. / Bạn cùng khu phố.'
  },
  52: {
    japanese: '心（こころ）はいつまでも若（わか）い。／若（わか）々（わか）しい。',
    chinese: '心态永远年轻。(xīn tài yǒng yuǎn nián qīng) / 不服老。(bù fú lǎo)',
    spanish: 'Me siento joven por dentro. / Alma joven.',
    vietnamese: 'Tâm hồn luôn trẻ trung. / Trẻ mãi không già.'
  },
  53: {
    japanese: 'どんどん話（はな）して。／どうぞ。',
    chinese: '尽管说吧。(jǐn guǎn shuō ba) / 随便问。(suí biàn wèn)',
    spanish: 'Adelante. / Dispara, te escucho.',
    vietnamese: 'Cứ tự nhiên nói đi. / Tôi nghe đây.'
  },
  54: {
    japanese: '猿（さる）も木（き）から落（お）ちる。／誰（だれ）にでも失敗（しっぱい）はある。',
    chinese: '人有失手。(rén yǒu shī shǒu) / 谁都有犯错的时候。(shuí dōu yǒu fàn cuò de shí hou)',
    spanish: 'Incluso los mejores fallan. / Errar es humano.',
    vietnamese: 'Nhân vô thập toàn. / Ai cũng có lúc sai sót.'
  },
  55: {
    japanese: '足（あし）を使（つか）う仕事（しごと）。／地道（じみち）な努力（どりょく）。',
    chinese: '拼命跑。(pīn mìng pǎo) / 腿脚活儿。(tuǐ jiǎo huó er)',
    spanish: 'Darle a la suela. / Hacer el trabajo de campo.',
    vietnamese: 'Chạy đôn chạy đáo. / Công việc cần vận động nhiều.'
  },
  56: {
    japanese: 'さあ、どうする？／次（つぎ）は何（なに）？',
    chinese: '现在该怎么办？(xiàn zài gāi zěn me bàn) / 然后呢？(rán hòu ne)',
    spanish: '¿Y ahora qué? / ¿Cuál es el plan?',
    vietnamese: 'Giờ tính sao? / Rồi giờ thế nào nữa?'
  },
  57: {
    japanese: 'ここが我（わ）が家（や）だ。／故郷（ふるさと）なんだ。',
    chinese: '这是我们的地盘。(zhè shì wǒ men de dì pán) / 我们的土地。(wǒ men de tǔ dì)',
    spanish: 'Esta es nuestra tierra. / Aquí es donde pertenezco.',
    vietnamese: 'Đây là mảnh đất của chúng tôi. / Đây là quê hương chúng tôi.'
  },
  58: {
    japanese: 'あり得（え）ない。／めちゃくちゃだ。',
    chinese: '疯了吧。(fēng le ba) / 简直不可思议。(jiǎn zhí bù kě sī yì)',
    spanish: 'Esto es una locura. / Es de locos.',
    vietnamese: 'Thật điên rồ. / Chuyện này kinh khủng thật.'
  },
  59: {
    japanese: 'とんでもない。／非常識（ひじょうしき）だ。',
    chinese: '太过分了。(tài guò fèn le) / 离谱。(lí pǔ)',
    spanish: 'Indignante. / Atroz.',
    vietnamese: 'Quá quắt thật. / Không thể chấp nhận được.'
  },
  60: {
    japanese: 'それは認（みと）めるよ。／一理（いちり）ある。',
    chinese: '这点我承认。(zhè diǎn wǒ chéng rèn) / 我服了你这点。(wǒ fú le nǐ zhè diǎn)',
    spanish: 'Te lo reconozco. / Ahí tienes razón.',
    vietnamese: 'Tôi công nhận điều đó. / Tôi đồng ý với cậu điểm này.'
  },
  61: {
    japanese: '仕事（しごと）に夢中（むちゅう）だった。／没頭（ぼっとう）していた。',
    chinese: '工作太投入了。(gōng zuò tài tóu rù le) / 忙忘了时间。(máng wàng le shí jiān)',
    spanish: 'Me dejé llevar por el trabajo. / Estaba absorto trabajando.',
    vietnamese: 'Tôi mải mê công việc quá. / Bị cuốn vào việc quá mức.'
  },
  62: {
    japanese: 'コーヒーを入（い）れたいな。／飲（の）みたいな。',
    chinese: '想喝咖啡。(xiǎng hē kā fēi) / 来点咖啡吧。(lái diǎn kā fēi ba)',
    spanish: 'Me vendría bien un café. / Me apetece un café.',
    vietnamese: 'Muốn uống cà phê quá. / Làm cốc cà phê thôi.'
  },
  63: {
    japanese: '頭（あたま）がパンクした。／疲（つか）れ果（は）てた。',
    chinese: '脑子糊了。(nǎo zi hú le) / 脑细胞死光了。(nǎo xì bāo sǐ guāng le)',
    spanish: 'Tengo el cerebro frito. / No puedo pensar más.',
    vietnamese: 'Đầu óc mệt bấn loạn. / Não hết hoạt động nổi rồi.'
  },
  64: {
    japanese: 'わざわざどうして？／無駄（むだ）だよ。',
    chinese: '何必呢？(hé bì ne) / 费那个劲干嘛？(fèi nà ge jìn gàn ma)',
    spanish: '¿Para qué molestarse? / ¿A qué viene eso?',
    vietnamese: 'Sao phải bận tâm? / Việc gì phải khổ thế?'
  },
  65: {
    japanese: 'リラックスする。／くつろぐ。',
    chinese: '放松一下。(fàng sōng yí xià) / 歇会儿。(xiē huì er)',
    spanish: 'Desconectar. / Relajarse.',
    vietnamese: 'Thư giãn. / Giải tỏa căng thẳng.'
  },
  66: {
    japanese: '当（あ）ててみて。／なんだと思（おも）う？',
    chinese: '你猜怎么着？(nǐ cāi zěn me zhāo) / 猜猜看。(cāi cāi kàn)',
    spanish: '¿A que no sabes qué? / ¿Sabes una cosa?',
    vietnamese: 'Đoán xem nào? / Cậu biết gì không?'
  },
  67: {
    japanese: '事前（じぜん）に。／あらかじめ。',
    chinese: '事先。(shì xiān) / 提前。(tí qián)',
    spanish: 'De antemano. / Con antelación.',
    vietnamese: 'Trước đó. / Làm sẵn từ trước.'
  },
  68: {
    japanese: '押（お）しが強（つよ）すぎる。／威圧（いあつ）的（てき）だ。',
    chinese: '太强势了。(tài qiǎng shì le) / 咄咄逼人。(duō duō bī rén)',
    spanish: 'Parecer muy agresivo. / Ser muy intenso.',
    vietnamese: 'Nói chuyện gay gắt quá. / Tỏ ra quá mạnh mẽ.'
  },
  69: {
    japanese: '圧倒（あっとう）された。／感動（かんどう）した。',
    chinese: '惊呆了。(jīng dāi le) / 震撼。(zhèn hàn)',
    spanish: 'Alucinado. / Impresionado.',
    vietnamese: 'Bị choáng ngợp. / Rất ấn tượng.'
  },
  70: {
    japanese: '最近（さいきん）厄介（やっかい）者（もの）だったね。／迷惑（めいわく）かけた。',
    chinese: '我最近挺烦人的。(wǒ zuì jìn tǐng fán rén de) / 添麻烦了。(tiān má fan le)',
    spanish: 'He sido un pesado últimamente. / He estado dando la lata.',
    vietnamese: 'Dạo này tôi hơi phiền. / Gần đây tôi như gánh nặng.'
  },
  71: {
    japanese: '目（め）を通（とお）す。／経（へ）る。',
    chinese: '经历。(jīng lì) / 检查一下。(jiǎn chá yí xià)',
    spanish: 'Pasar por. / Revisar.',
    vietnamese: 'Trải qua. / Xem qua.'
  },
  72: {
    japanese: '言（い）うまでもない。／当然（とうぜん）だ。',
    chinese: '不言而喻。(bù yán ér yù) / 不用多说。(bú yòng duō shuō)',
    spanish: 'Sobra decirlo. / No hace falta decir que...',
    vietnamese: 'Không cần phải nói. / Hiển nhiên rồi.'
  },
  73: {
    japanese: '〜という点（てん）が好（す）きだ。／いいと思（おモ）う。',
    chinese: '我喜欢这一点。(wǒ xǐ huan zhè yì diǎn) / 挺好的。(tǐng hǎo de)',
    spanish: 'Me gusta que... / Valoro el hecho de que...',
    vietnamese: 'Tôi thích điểm là... / Tôi đánh giá cao việc...'
  },
  74: {
    japanese: '何（なに）があっても。／どうしても。',
    chinese: '无论如何。(wú lùn rú hé) / 不管怎样。(bù guǎn zěn yàng)',
    spanish: 'Pase lo que pase. / Cueste lo que cueste.',
    vietnamese: 'Bất chấp mọi chuyện. / Dù có chuyện gì đi nữa.'
  },
  75: {
    japanese: '経験（けいけん）から言（い）えば。／私（わたし）が見（み）てきた限（かぎ）り。',
    chinese: '根据我的经验。(gēn jù wǒ de jīng yàn) / 在我看来。(zài wǒ kàn lái)',
    spanish: 'Según mi experiencia. / Por lo que he vivido.',
    vietnamese: 'Theo kinh nghiệm của tôi. / Những gì tôi đã trải qua.'
  },
  76: {
    japanese: '前言（ぜんげん）を撤回（てっかい）する。／悪（わる）かった。',
    chinese: '自食其言。(zì shí qí yán) / 收回前言。(shōu huí qián yán)',
    spanish: 'Retractarse. / Admitir el error.',
    vietnamese: 'Rút lại lời đã nói. / Thừa nhận mình sai.'
  },
  77: {
    japanese: '期待（きたい）に応（こた）える。／満足（まんぞく）させる。',
    chinese: '达到预期。(dá dào yù qī) / 符合期待。(fú hé qī dài)',
    spanish: 'Estar a la altura. / Cumplir las expectativas.',
    vietnamese: 'Đáp ứng kỳ vọng. / Làm hài lòng mong đợi.'
  },
  78: {
    japanese: '食（た）べだしたら止（と）まらない。／病（や）みつきになる。',
    chinese: '吃不够。(chī bú gòu) / 越吃越想吃。(yuè chī yuè xiǎng chī)',
    spanish: 'Vicioso. / No puedo parar de comer.',
    vietnamese: 'Ăn là ghiền. / Càng ăn càng thấy ngon.'
  },
  79: {
    japanese: '最初（さいしょ）から勝ち（かち）目（め）はなかった。／勝負（しょうぶ）にならなかった。',
    chinese: '根本没机会。(gēn běn méi jī huì) / 毫无胜算。(háo wú shèng suàn)',
    spanish: 'No tuve ninguna oportunidad. / Estaba perdido desde el principio.',
    vietnamese: 'Không có cửa thắng. / Ngay từ đầu đã không có hy vọng.'
  },
  80: {
    japanese: 'こうなることは分（わ）かっていたはずだ。／予想（よそう）できた。',
    chinese: '我早该料到的。(wǒ zǎo gāi liào dào de) / 不出所料。(bù chū suǒ liào)',
    spanish: 'Debí haberlo visto venir. / Era de esperar.',
    vietnamese: 'Lẽ ra phải biết trước chứ. / Đúng như dự đoán.'
  },
  81: {
    japanese: '今日（きょう）の気分（きぶん）はどう？／調子（ちょうし）はどうだい？',
    chinese: '今天感觉如何？(jīn tiān gǎn jué rú hé) / 你好点了吗？(nǐ hǎo diǎn le ma)',
    spanish: '¿Cómo te encuentras hoy? / ¿Qué tal el ánimo today?',
    vietnamese: 'Hôm nay thấy thế nào? / Sức khỏe ổn chứ?'
  },
  82: {
    japanese: '〜に腹（はら）が立（た）つ。／イラつかせる。',
    chinese: '生某人的气。(shēng mǒu rén de qì) / 恼火。(nǎo huǒ)',
    spanish: 'Estar enfadado con. / Estar de uñas con alguien.',
    vietnamese: 'Bực mình với... / Giận sôi người với...'
  },
  83: {
    japanese: '精査（せいさ）する。／確（たし）かめる。',
    chinese: '审查。(shěn chá) / 调查。(diào chá)',
    spanish: 'Investigar. / Verificar antecedentes.',
    vietnamese: 'Kiểm tra kỹ. / Xác minh thông tin.'
  },
  84: {
    japanese: '裏（うら）に何（なに）かあるの？／落（お）とし穴（あな）は？',
    chinese: '有什么猫腻吗？(yǒu shén me māo nì ma) / 圈套？(quān tào)',
    spanish: '¿Dónde está el truco? / ¿Cuál es la trampa?',
    vietnamese: 'Có âm mưu gì không? / Có điều kiện gì ẩn giấu không?'
  },
  85: {
    japanese: '手ぶらで来（き）て。／気（き）を使（つか）わないで。',
    chinese: '不用带东西。(bú yòng dài dōng xi) / 别客气。(bié kè qi)',
    spanish: 'No hace falta que me traigas nada. / Ven con las manos vacías.',
    vietnamese: 'Không cần mua quà đâu. / Cứ đến tay không là được rồi.'
  },
  86: {
    japanese: '肩（かた）の治療（ちりょう）を受（う）けている。／リハビリ中（ちゅう）だ。',
    chinese: '我在治肩膀。(wǒ zài zhì jiān băng) / 治疗中。(zhì liáo zhōng)',
    spanish: 'Estoy tratándome el hombro. / Estoy en rehabilitación.',
    vietnamese: 'Đang điều trị vai. / Đang đi vật lý trị liệu.'
  },
  87: {
    japanese: '頭（あたま）のてっぺん。／正（しょう）頭（とう）部（ぶ）。',
    chinese: '头顶。(tóu dǐng) / 天灵盖。(tiān líng gài)',
    spanish: 'Coronilla. / Cima de la cabeza.',
    vietnamese: 'Đỉnh đầu. / Chỗ xoáy tóc.'
  },
  88: {
    japanese: '迷（まよ）っている。／板（いた）挟（ばさ）みだ。',
    chinese: '纠结。(jiū jié) / 犹豫不决。(yóu yù bù jué)',
    spanish: 'Estoy muy indeciso. / Me debato entre dos opciones.',
    vietnamese: 'Rất phân vân. / Đang đấu tranh tư tưởng.'
  },
  89: {
    japanese: '宙（ちゅう）ぶらりんな状態（じょうたい）。／不安定（ふあんてい）だ。',
    chinese: '悬而未决。(xuán ér wèi jué) / 不确定。(bù què dìng)',
    spanish: 'En el limbo. / En un estado de incertidumbre.',
    vietnamese: 'Đang lơ lửng. / Tình trạng chưa rõ ràng.'
  },
  90: {
    japanese: '本物（ほんもの）だ。／信頼（しんらい）できる。',
    chinese: '靠谱。(kào pǔ) / 真的很有实力。(zhēn de hěn yǒu shí lì)',
    spanish: 'Es un fiera. / Es el de verdad.',
    vietnamese: 'Thứ thiệt luôn. / Đáng tin cậy đấy.'
  },
  91: {
    japanese: 'すごいいい男（おとこ）。／逃（に）してはいけない人（ひと）。',
    chinese: '金龟婿。(jīn guī xù) / 极品。(jí pǐn)',
    spanish: 'Es un partidazo. / Un gran partido.',
    vietnamese: 'Hàng hiếm đấy. / Người đáng để trân trọng.'
  },
  92: {
    japanese: 'へそを曲（ま）げないで。／怒（おこ）らないで。',
    chinese: '别生气。(bié shēng qì) / 不要闹情绪。(bú yào nào qíng xù)',
    spanish: 'No te pongas así. / No te piques.',
    vietnamese: 'Đừng có dỗi. / Đừng có nóng nảy thế.'
  },
  93: {
    japanese: 'そんなに後悔（こうかい）していない。／前（まえ）を向（む）いている。',
    chinese: '没怎么后悔。(méi zěn me hòu huǐ) / 不太在意。(bú tài zài yì)',
    spanish: 'No me arrepiento de mucho. / No miro atrás con pena.',
    vietnamese: 'Không hối hận mấy. / Không nuối tiếc nhiều.'
  },
  94: {
    japanese: '中（ちゅう）年（ねん）の危機（きき）。／人生（じんせい）の曲（ま）がり角（かど）。',
    chinese: '中年危机。(zhōng nián wēi jī) / 人生坎儿。(rén shēng kǎn er)',
    spanish: 'Crisis de los cuarenta. / Crisis económica o personal.',
    vietnamese: 'Khủng hoảng tuổi trung niên. / Giai đoạn xáo trộn tâm lý.'
  },
  95: {
    japanese: '大（おお）げさにしないで。／騒（さわ）ぎすぎ。',
    chinese: '别这么抓马。(bié zhè me zhuā mǎ) / 大惊小怪。(dà jīng xiǎo guài)',
    spanish: 'No seas tan dramático. / No hagas un mundo de la nada.',
    vietnamese: 'Đừng làm quá lên. / Đừng có diễn sâu quá.'
  },
  96: {
    japanese: '泣（な）き言（ごと）を言（い）わないで。／甘（あま）えるな。',
    chinese: '别跟我装可怜。(bié gēn wǒ zhuāng kě lián) / 少来这套。(shǎo lái zhè tào)',
    spanish: 'No me vengas con lloros. / A otro perro con ese hueso.',
    vietnamese: 'Đừng có than vãn. / Đừng có giả vờ đáng thương.'
  },
  97: {
    japanese: '言葉（ことば）を失（うしな）う。／呆然（ぼうぜん）とする。',
    chinese: '无语。(wú yǔ) / 哑口无言。(yǎ kǒu wú yán)',
    spanish: 'Me he quedado sin palabras. / Estoy mudo.',
    vietnamese: 'Cạn lời luôn. / Không còn gì để nói.'
  },
  98: {
    japanese: '気づい（きづい）た？／分か（わか）った？',
    chinese: '看出来了吗？(kàn chū lái le ma) / 懂我的意思吗？(dǒng wǒ de yì si ma)',
    spanish: '¿Lo pillaste? / ¿Te diste cuenta?',
    vietnamese: 'Có nhận ra không? / Có nắm bắt được không?'
  },
  99: {
    japanese: '空気（くうき）を読（よ）む。／社会的（しゃかいてき）合図（あいず）。',
    chinese: '懂眼色。(dǒng yǎn sè) / 社交流量。(shè jiāo liú liàng)',
    spanish: 'Captar las señales sociales. / Leer el ambiente.',
    vietnamese: 'Biết nhìn người. / Nhận biết các tín hiệu xã hội.'
  },
  100: {
    japanese: '気づい（きづい）た？／感じ取っ（かんじとっ）た？',
    chinese: '留意到了吗？(liú yì dào le ma) / 察觉了吗？(chá jué le ma)',
    spanish: '¿Notaste eso? / ¿Te percataste?',
    vietnamese: 'Có để ý thấy không? / Có cảm nhận được không?'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 33-100 updated.');
