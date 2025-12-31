const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  153: {
    japanese: '窓際（まどぎわ）の席（せき）をお願（ねが）いできますか？／窓側（まどがわ）の席（せき）は空（あ）いていますか？',
    chinese: '我可以要一个靠窗的座位吗？(wǒ kě yǐ yào yí gè kào chuāng de zuò wèi ma) / 有靠窗的位子吗？(yǒu kào chuāng de wèi zi ma)',
    spanish: '¿Me puede dar un asiento de ventana? / ¿Queda algún asiento junto a la ventana?',
    vietnamese: 'Cho tôi ngồi ghế gần cửa sổ được không? / Có còn chỗ cạnh cửa sổ không?'
  },
  154: {
    japanese: 'フライト時間（じかん）はどのくらいですか？／どれくらいかかりますか？',
    chinese: '飞行时间是多久？(fēi xíng shí jiān shì duō jiǔ) /我们要飞多久？(wǒ men yào fēi duō jiǔ)',
    spanish: '¿Cuánto dura el vuelo? / ¿Cuánto tiempo vamos a volar?',
    vietnamese: 'Chuyến bay kéo dài bao lâu? / Bay mất bao nhiêu tiếng vậy?'
  },
  155: {
    japanese: '一番（いちばん）近（ちか）いトイレはどこですか？／トイレはどこにありますか？',
    chinese: '最近的洗手间在哪里？(zuì jìn de xǐ shǒu jiān zài nǎ lǐ) / 请问厕所在哪儿？(qǐng wèn cè suǒ zài nǎr)',
    spanish: '¿Dónde está el baño más cercano? / ¿Por dónde queda el servicio?',
    vietnamese: 'Nhà vệ sinh gần nhất ở đâu? / Cho tôi hỏi toilet ở đâu vậy?'
  },
  156: {
    japanese: '搭乗（とうじょう）を待（ま）っています。／今（いま）、搭乗（とうじょう）待（ま）ちです。',
    chinese: '我正在等候登机。(wǒ zhèng zài děng hòu dēng jī) / 我在等登机。(wǒ zài děng dēng jī)',
    spanish: 'Estoy esperando para embarcar. / Estoy esperando el embarque.',
    vietnamese: 'Tôi đang đợi lên máy bay. / Đang chờ đến giờ bay.'
  },
  157: {
    japanese: '先週（せんしゅう）の週末（しゅうまつ）は何（なに）をしていましたか？／週末（しゅうまつ）はどう過（す）ごしましたか？',
    chinese: '你上个周末做了什么？(nǐ shàng gè zhōu mò zuò le shén me) /哪怕周末怎么过的？(nǐ de zhōu mò zěn me guò de)',
    spanish: '¿Qué hiciste el fin de semana pasado? / ¿Cómo pasaste el fin de semana?',
    vietnamese: 'Cuối tuần rồi bạn làm gì? / Bạn đã làm gì vào cuối tuần trước?'
  },
  158: {
    japanese: '部屋（へや）付（づ）けにしてください。／部屋（へや）の代金（だいきん）と一緒（いっしょ）に払（はら）います。',
    chinese: '请记在我的房账上。(qǐng jì zài wǒ de fáng zhàng shàng) / 挂在我的房间账上。(guà zài wǒ de fáng jiān zhàng shàng)',
    spanish: 'Cárguelo a mi habitación, por favor. / Póngalo en mi cuenta de la habitación.',
    vietnamese: 'Ghi nợ vào phòng của tôi nhé. / Tính tiền vào phòng tôi.'
  },
  159: {
    japanese: '迷（まよ）っています。／どっちつかずの状態（じょうたい）です。',
    chinese: '我还在犹豫。(wǒ hái zài yóu yù) / 我还没决定。(wǒ hái méi jué dìng)',
    spanish: 'Estoy indeciso. / Aún no me he decidido.',
    vietnamese: 'Tôi vẫn đang phân vân. / Vẫn chưa quyết định được.'
  },
  160: {
    japanese: 'カードで払（はら）います。／カードでお願（ねが）いします。',
    chinese: '刷我的卡。(shuā wǒ de kǎ) / 用卡支付。(yòng kǎ zhī fù)',
    spanish: 'Póngalo en mi tarjeta. / Cobrélo de mi tarjeta.',
    vietnamese: 'Thanh toán bằng thẻ của tôi. / Quẹt thẻ của tôi nhé.'
  },
  161: {
    japanese: '部屋（へや）付（づ）けにしてください。／チェックアウトの時（とき）に払（はら）います。',
    chinese: '记在我房间账上。(jì zài wǒ fáng jiān zhàng shàng) / 算在房费里。(suàn zài fáng fèi lǐ)',
    spanish: 'Cárgalo a mi habitación. / Anótalo a mi cuarto.',
    vietnamese: 'Tính vào tiền phòng giúp tôi. / Ghi vào hóa đơn phòng.'
  },
  162: {
    japanese: '広々（ひろびろ）としていますね。／ゆったりしています。',
    chinese: '很宽敞。(hěn kuān chang) / 空间很大。(kōng jiān hěn dà)',
    spanish: 'Es muy espacioso. / Hay mucho espacio.',
    vietnamese: 'Rộng rãi quá. / Không gian thoáng đãng thật.'
  },
  163: {
    japanese: '趣味（しゅみ）がいいですね。／センスがいいですね。',
    chinese: '你的品味很好。(nǐ de pǐn wèi hěn hǎo) / 你很有眼光。(nǐ hěn yǒu yǎn guāng)',
    spanish: 'Tienes muy buen gusto. / ¡Qué buen gusto tienes!',
    vietnamese: 'Bạn có gu thẩm mỹ tốt thật. / Mắt nhìn của bạn tuyệt đấy.'
  },
  164: {
    japanese: '申（もう）し分（ぶん）ないです。／完璧（かんぺき）です。',
    chinese: '无可挑剔。(wú kě tiāo tì) / 完美无瑕。(wán měi wú xiá)',
    spanish: 'Impecable. / No tiene ni un fallo.',
    vietnamese: 'Không chê vào đâu được. / Hoàn hảo.'
  },
  165: {
    japanese: '中座（ちゅうざ）してもいいですか？／失礼（しつれい）してもよろしいですか？',
    chinese: '我可以失陪一下吗？(wǒ kě yǐ shī péi yí xià ma) / 我能先离开一会吗？(wǒ néng xiān lí kāi yí huì ma)',
    spanish: '¿Puedo retirarme? / Disculpen, ¿puedo salir un momento?',
    vietnamese: 'Tôi xin phép ra ngoài một chút được không? / Xin lỗi, tôi có thể đi vắng chốc lát không?'
  },
  166: {
    japanese: '上の空（うえのそら）だね。／心（こころ）ここに在（あ）らずだね。',
    chinese: '心不在焉。(xīn bú zài yān) / 魂不守舍。(hún bù shǒu shè)',
    spanish: 'Estás en las nubes. / Estás distraído.',
    vietnamese: 'Đầu óc để trên mây. / Đang mơ màng gì thế.'
  },
  167: {
    japanese: '危機（きき）一髪（いっぱつ）で助（たす）かりました。／際（きわ）どいところでした。',
    chinese: '躲过一劫。(duǒ guò yì jié) / 幸免于难。(xìng miǎn yú nàn)',
    spanish: 'Me libré por los pelos. / Esquivé una bala.',
    vietnamese: 'Thoát nạn trong gang tấc. / May mà tránh được.'
  },
  168: {
    japanese: '詰（つ）め込（こ）み勉強（べんきょう）をしています。／一夜漬（いちやづ）けをしています。',
    chinese: '正在临时抱佛脚。(zhèng zài lín shí bào fó jiǎo) / 正在突击复习。(zhèng zài tū jī fù xí)',
    spanish: 'Estoy estudiando a última hora. / Me estoy empollando todo.',
    vietnamese: 'Đang học nhồi nhét. / Học gạo để thi.'
  },
  169: {
    japanese: 'その調子（ちょうし）！／よくやった！',
    chinese: '做得好！(zuò de hǎo) / 加油！(jiā yóu)',
    spanish: '¡Así se hace! / ¡Muy bien!',
    vietnamese: 'Làm tốt lắm! / Cứ thế mà phát huy nhé!'
  },
  170: {
    japanese: '泥酔（でいすい）しました。／べろべろに酔（よ）っ払（ぱら）いました。',
    chinese: '喝得烂醉。(hē de làn zuì) / 喝挂了。(hē guà le)',
    spanish: 'Me emborraché muchísimo. / Se puso hasta atrás.',
    vietnamese: 'Say bí tỉ luôn. / Say không biết trời đất gì.'
  },
  171: {
    japanese: 'これ予約（よやく）！／これ私の！',
    chinese: '这是我的！(zhè shì wǒ de) / 我要这个！(wǒ yào zhè ge)',
    spanish: '¡Me lo pido! / ¡Mío!',
    vietnamese: 'Xí phần nhé! / Cái này của tôi!'
  },
  172: {
    japanese: '助手席（じょしゅせき）に座（すわ）ります。／前（まえ）に乗（の）ります。',
    chinese: '我要坐前排。(wǒ yào zuò qián pái) / 我坐副驾驶。(wǒ zuò fù jià shǐ)',
    spanish: 'Me siento delante. / Voy en el asiento del copiloto.',
    vietnamese: 'Tôi ngồi ghế trước nhé. / Để tôi ngồi kế tài xế.'
  },
  173: {
    japanese: '助手席（じょしゅせき）ゲット！／前（まえ）の席（せき）！',
    chinese: '副驾驶是我的！(fù jià shǐ shì wǒ de) / 我坐前面！(wǒ zuò qián miàn)',
    spanish: '¡Copiloto! / ¡Me pido delante!',
    vietnamese: 'Xí ghế trước! / Ghế phụ là của tôi!'
  },
  174: {
    japanese: '大当（おおあ）たりしました。／大成功（だいせいこう）しました。',
    chinese: '中大奖了。(zhòng dà jiǎng le) / 走了大运。(zǒu le dà yùn)',
    spanish: 'Me tocó el gordo. / Fue un golpe de suerte.',
    vietnamese: 'Trúng số độc đắc rồi. / Vớ bở rồi.'
  },
  175: {
    japanese: '食（た）べきれないほど頼（たの）んでしまいました。／欲張（よくば）りすぎました。',
    chinese: '眼大肚子小。(yǎn dà dù zi xiǎo) / 我高估了自己的食量。(wǒ gāo gū le zì jǐ de shí liàng)',
    spanish: 'Comí más con los ojos que con la boca. / Me pasé pidiendo comida.',
    vietnamese: 'No bụng đói con mắt. / Tham ăn quá mức rồi.'
  },
  176: {
    japanese: '手（て）一杯（いっぱい）です。／やるべきことが多（おお）すぎます。',
    chinese: '我忙得不可开交。(wǒ máng de bù kě kāi jiāo) / 我事情太多了。(wǒ shì qing tài duō le)',
    spanish: 'Tengo mucho entre manos. / Estoy hasta arriba de cosas.',
    vietnamese: 'Tôi bận tối mắt tối mũi. / Nhiều việc phải lo quá.'
  },
  177: {
    japanese: 'さあ、行（い）こうか。／始（はじ）めよう。',
    chinese: '我们可以走了。(wǒ men kě yǐ zǒu le) / 开始吧。(kāi shǐ ba)',
    spanish: '¡Vamos allá! / ¡En marcha!',
    vietnamese: 'Đi thôi nào. / Bắt đầu thôi.'
  },
  178: {
    japanese: '噂話（うわさばなし）をしよう。／ぶっちゃけ話（ばなし）しようよ。',
    chinese: '聊聊八卦吧。(liáo liao bā guà ba) / 说说闲话。(shuō shuo xián huà)',
    spanish: 'Vamos a cotillear. / Cuéntamelo todo.',
    vietnamese: 'Tám chuyện chút đi. / Ngồi xuống buôn chuyện nào.'
  },
  179: {
    japanese: '誰（だれ）かを犠牲（ぎせい）にする。／責任（せきにん）をなすりつける。',
    chinese: '让某人背黑锅。(ràng mǒu rén bēi hēi guō) / 把某人推出去顶罪。(bǎ mǒu rén tuī chū qù dǐng zuì)',
    spanish: 'Traicionar a alguien. / Dejar a alguien a los pies de los caballos.',
    vietnamese: 'Đổ vỏ cho người khác. / Bán đứng ai đó.'
  },
  180: {
    japanese: '経験（けいけん）済（ず）みです。／実績（じっせき）があります。',
    chinese: '我已经掌握了。(wǒ yǐ jīng zhǎng wò le) / 我有这方面的经验。(wǒ yǒu zhè fāng miàn de jīng yàn)',
    spanish: 'Tengo experiencia en eso. / Lo tengo en mi haber.',
    vietnamese: 'Đã có kinh nghiệm rồi. / Đã bỏ túi được kinh nghiệm này.'
  },
  181: {
    japanese: '詮索（せんさく）しないで。／お節介（せっかい）はやめて。',
    chinese: '别多管闲事。(bié duō guǎn xián shì) / 不要太八卦。(bú yào tài bā guà)',
    spanish: 'Deja de curiosear. / No seas metomentodo.',
    vietnamese: 'Đừng có tò mò quá. / Bớt soi mói đi.'
  },
  182: {
    japanese: 'いくらでも聞（き）いていられます。／ずっと聞（き）いていたい。',
    chinese: '我可以听上一整天。(wǒ kě yǐ tīng shàng yì zhěng tiān) / 百听不厌。(bǎi tīng bú yàn)',
    spanish: 'Podría escuchar esto todo el día. / No me canso de escucharlo.',
    vietnamese: 'Nghe cả ngày cũng không chán. / Tôi có thể nghe mãi chuyện này.'
  },
  183: {
    japanese: '最後（さいご）まで聞（き）いて。／話（はなし）を聞（き）いてよ。',
    chinese: '听我说完。(tīng wǒ shuō wán) / 听我解释。(tīng wǒ jiě shì)',
    spanish: 'Escúchame hasta el final. / Déjame explicarte.',
    vietnamese: 'Nghe tôi nói hết đã. / Để tôi giải thích nào.'
  },
  184: {
    japanese: 'すごく美味（おい）しい。／絶品（ぜっぴん）です。',
    chinese: '超级好吃。(chāo jí hǎo chī) / 美味极了。(měi wèi jí le)',
    spanish: 'Está riquísimo. / Delicioso.',
    vietnamese: 'Ngon tuyệt cú mèo. / Ngon quá đi mất.'
  },
  185: {
    japanese: '誰（だれ）もいないよ。／誰（だれ）も〜ない。',
    chinese: '没人。(méi rén) / 没有任何人。(méi yǒu rèn hé rén)',
    spanish: 'Nadie. / Ninguna persona.',
    vietnamese: 'Không có ai cả. / Chẳng có ma nào.'
  },
  186: {
    japanese: 'ちょっと興味（きょうみ）があるんだけど。／好奇心（こうきしん）から聞（き）くんだけど。',
    chinese: '只是出于好奇。(zhǐ shì chū yú hào qí) / 随便问问。(suí biàn wèn wen)',
    spanish: 'Solo por curiosidad. / Curiosidad, nada más.',
    vietnamese: 'Chỉ tò mò chút thôi. / Hỏi cho biết vậy thôi.'
  },
  187: {
    japanese: 'はい、どうぞ。／ここにあります。',
    chinese: '给你。(gěi nǐ) / 在这儿。(zài zhèr)',
    spanish: 'Aquí tienes. / Aquí está.',
    vietnamese: 'Của bạn đây. / Nó đây này.'
  },
  188: {
    japanese: '食（た）べる価値（かち）があるよ。／一口（ひとくち）一口（ひとくち）が最高（さいこう）だ。',
    chinese: '每一口都值得。(měi yì kǒu dōu zhí de) / 太好吃了。(tài hǎo chī le)',
    spanish: 'Vale la pena cada bocado. / Está para chuparse los dedos.',
    vietnamese: 'Đáng đồng tiền bát gạo. / Ngon từng miếng một.'
  },
  189: {
    japanese: 'お金（かね）を払（はら）う価値（かち）がある。／高（たか）くても納得（なっとく）だ。',
    chinese: '物有所值。(wù yǒu suǒ zhí) / 每一分钱都花得值。(měi yì fēn qián dōu huā de zhí)',
    spanish: 'Vale cada centavo. / Merece la pena el precio.',
    vietnamese: 'Đáng từng xu. / Tiền nào của nấy.'
  },
  190: {
    japanese: '偽物（にせもの）。／パクリ商品（しょうひん）。',
    chinese: '山寨货。(shān zhài huò) / 仿制品。(fǎng zhì pǐn)',
    spanish: 'Es una imitación. / Es una copia barata.',
    vietnamese: 'Hàng nhái. / Đồ giả.'
  },
  191: {
    japanese: 'これを見（み）てよ。／聞（き）いて驚（おどろ）くなよ。',
    chinese: '快看这个。(kuài kàn zhè ge) / 瞧瞧这个。(qiáo qiao zhè ge)',
    spanish: 'Mira esto. / Fíjate en esto.',
    vietnamese: 'Nhìn cái này xem. / Xem đây này.'
  },
  192: {
    japanese: 'ふざけるのはやめて。／寝言（ねごと）は言（い）わないで。',
    chinese: '别废话了。(bié fèi huà le) / 少来这一套。(shǎo lái zhè yí tào)',
    spanish: 'Déjate de tonterías. / Al grano.',
    vietnamese: 'Bớt nói nhảm đi. / Đừng có vòng vo nữa.'
  },
  193: {
    japanese: '決定的（けっていてき）な障害（しょうがい）。／取引（とりひき）中止（ちゅうし）の原因（げんいん）。',
    chinese: '破坏交易的因素。(pò huài jiāo yì de yīn sù) / 这是一个底线。(zhè shì yí gè dǐ xiàn)',
    spanish: 'Es un factor decisivo. / Es algo inaceptable para mí.',
    vietnamese: 'Điều không thể chấp nhận được. / Yếu tố phá vỡ thỏa thuận.'
  },
  194: {
    japanese: '君（きみ）次第（しだい）だ。／あなたが決（き）めて。',
    chinese: '这取决于你。(zhè qǔ jué yú nǐ) /看你的了。(kàn nǐ de le)',
    spanish: 'Depende de ti. / Tú decides.',
    vietnamese: 'Tùy thuộc vào bạn đấy. / Quyết định là ở bạn.'
  },
  195: {
    japanese: 'やるよ！／是非（ぜひ）やりたい。',
    chinese: '我愿意。(wǒ yuàn yì) / 算我一个。(suàn wǒ yí gè)',
    spanish: 'Me apunto. / Cuenten conmigo.',
    vietnamese: 'Tôi tham gia. / Chơi luôn.'
  },
  196: {
    japanese: '独学（どくがく）で学（まな）びました。／自分（じぶん）で勉強（べんきょう）しました。',
    chinese: '我是自学的。(wǒ shì zì xué de) / 我自学成才。(wǒ zì xué chéng cái)',
    spanish: 'Aprendí por mi cuenta. / Soy autodidacta.',
    vietnamese: 'Tôi tự học đấy. / Tự mày mò thôi.'
  },
  197: {
    japanese: '何（なに）が何（なん）でも。／どんな犠牲（ぎせい）を払（はら）っても。',
    chinese: '不惜一切代价。(bù xī yí qiè dài jià) / 无论如何。(wú lùn rú hé)',
    spanish: 'Cueste lo que cueste. / Sea como sea.',
    vietnamese: 'Bằng mọi giá. / Dù có phải làm gì đi nữa.'
  },
  198: {
    japanese: '今週（こんしゅう）はずっと日焼（ひや）けしてました。／ずっと日光浴（にっこうよく）してたよ。',
    chinese: '我这周都在美黑。(wǒ zhè zhōu dōu zài měi hēi) / 我晒了一周的太阳。(wǒ shài le yì zhōu de tài yáng)',
    spanish: 'Me he estado bronceando toda la semana. / Llevo toda la semana tomando el sol.',
    vietnamese: 'Tôi phơi nắng cả tuần nay. / Nhuộm da cả tuần rồi.'
  },
  199: {
    japanese: 'ダラダラしている人（ひと）。／テレビばかり見（み）ている人（ひと）。',
    chinese: '电视迷。(diàn shì mí) / 整天躺在沙发上的人。(zhěng tiān tǎng zài shā fā shàng de rén)',
    spanish: 'Teleadicto. / Persona sedentaria.',
    vietnamese: 'Kẻ lười biếng. / Người suốt ngày dán mắt vào tivi.'
  },
  200: {
    japanese: '気（き）にしないで。／くよくよしないで。',
    chinese: '别往心里去。(bié wǎng xīn lǐ qù) / 别受影响。(bié shòu yǐng xiǎng)',
    spanish: 'No dejes que te afecte. / No le des importancia.',
    vietnamese: 'Đừng để bụng chuyện đó. / Đừng để nó làm bạn buồn.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 153-200 updated with CORRECT translations.');
