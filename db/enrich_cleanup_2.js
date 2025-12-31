const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1103: {
    japanese: '今（いま）やってるところだよ。／取り掛かって（とりかかって）います。',
    chinese: '我正忙着呢。(wǒ zhèng máng zhe ne) / 马上好。(mǎ shàng hǎo)',
    spanish: 'Estoy en ello. / Estoy trabajando en eso.',
    vietnamese: 'Tôi đang làm đây. / Đang xử lý rồi.'
  },
  1104: {
    japanese: '彼女（かのじょ）は衝撃（しょうげき）の事実（じじつ）を明かし（あかし）た。／爆弾（ばくだん）発言（はつげん）をした。',
    chinese: '她丢下了一个重磅炸弹。(tā diū xià le yí gè zhòng bàng zhà dàn) / 惊人消息。(jīng rén xiāo xi)',
    spanish: 'Ella soltó una bomba. / Dio una noticia impactante.',
    vietnamese: 'Cô ấy đã gây sốc. / Tung ra một tin động trời.'
  },
  1109: {
    japanese: '即座（そくざ）に。／いきなり。',
    chinese: '一开始就。(yì kāi shǐ jiù) / 马上。(mǎ shàng)',
    spanish: 'De entrada. / Desde el primer momento.',
    vietnamese: 'Ngay lập tức. / Ngay từ đầu.'
  },
  1110: {
    japanese: '初日（しょにち）から。／最初（さいしょ）からずっと。',
    chinese: '从第一天起。(cóng dì yī tiān qǐ) / 打一上来。(dǎ yì shàng lái)',
    spanish: 'Desde el primer día. / Desde un principio.',
    vietnamese: 'Ngay từ ngày đầu. / Từ thuở ban đầu.'
  },
  1113: {
    japanese: 'しっかりしろ。／ちゃんと立て直し（たてなおし）なさい。',
    chinese: '振作起来。(zhèn zuò qǐ lái) / 像点样儿。(xiàng diǎnr yàngr)',
    spanish: 'Ponte las pilas. / Organízate.',
    vietnamese: 'Chấn chỉnh lại đi. / Hãy hành động cho đúng mực.'
  },
  1115: {
    japanese: 'だらだらするな。／もたもたしないで。',
    chinese: '别磨蹭。(bié mó ceng) / 别拖后腿。(bié tuō hòu tuǐ)',
    spanish: 'No te demores. / No arrastres los pies.',
    vietnamese: 'Đừng có lề mề. / Đừng trì hoãn nữa.'
  },
  1116: {
    japanese: 'やめろ！／いい加減（いいかげん）にしろ！',
    chinese: '够了！(gòu le) / 别闹了！(bié nào le)',
    spanish: '¡Basta ya! / ¡Corta con eso!',
    vietnamese: 'Thôi đi! / Dừng lại ngay!'
  },
  1117: {
    japanese: '何（なに）しに来（き）たの？／どうしてここへ？',
    chinese: '什么风把你吹来了？(shén me fēng bǎ nǐ chuī lái le) / 来干嘛？(lái gàn má)',
    spanish: '¿Qué te trae por aquí? / ¿A qué vienes?',
    vietnamese: 'Làn gió nào đưa bạn đến đây vậy? / Có việc gì mà đến đây?'
  },
  1118: {
    japanese: '君（きみ）次第（しだい）だ。／ボールは君のコートにある。',
    chinese: '现在轮到你了。(xiàn zài lún dào nǐ le) / 看你的了。(kàn nǐ de le)',
    spanish: 'La pelota está en tu tejado. / Te toca decidir a ti.',
    vietnamese: 'Quyết định tùy thuộc vào bạn. / Đến lượt bạn rồi đó.'
  },
  1119: {
    japanese: 'そんな日（ひ）は来（こ）ないよ。／まさかあり得ない（ありえない）。',
    chinese: '这辈子都没戏。(zhè bèi zi dōu méi xì) / 想得美。(xiǎng de měi)',
    spanish: 'Eso no lo verán mis ojos. / El día que las vacas vuelen.',
    vietnamese: 'Còn lâu nhé. / Đừng có mơ.'
  },
  1120: {
    japanese: '必死（ひっし）に戦って（たたかって）いる。／激しく（はげしく）争って（あらそって）いる。',
    chinese: '拼死拼活。(pīn sǐ pīn huó) / 争个你死我活。(zhēng gè nǐ sǐ wǒ huó)',
    spanish: 'Están luchando con uñas y dientes. / Estás peleando a muerte.',
    vietnamese: 'Họ đang đấu tranh quyết liệt. / Chiến đấu bằng mọi giá.'
  },
  1121: {
    japanese: '見事（みごと）に合格（ごうかく）した。／楽々（らくらく）パスした。',
    chinese: '高分通过。(gāo fēn tōng guò) / 漂亮地赢了。(piào liang de yíng le)',
    spanish: 'Pasé con nota excelente. / Aprobé con honores.',
    vietnamese: 'Tôi đã vượt qua một cách xuất sắc. / Đỗ đạt vẻ vang.'
  },
  1125: {
    japanese: '備え（そなえ）あれば憂い（うれい）なし。／後（あと）で後悔（こうかい）するよりはいい。',
    chinese: '小心没大错。(xiǎo xīn méi dà cuò) / 稳着点儿。(wěn zhe diǎnr)',
    spanish: 'Más vale prevenir que lamentar. / Mejor estar seguro.',
    vietnamese: 'Thà cẩn thận còn hơn hối hận. / Cẩn tắc vô áy náy.'
  },
  1126: {
    japanese: '本当（ほんとう）にその通り（とおり）だよ！／全（まった）く同感（どうかん）だ。',
    chinese: '谁说不是呢！(shuí shuō bú shì ne) / 还要你说！(hái yào nǐ shuō)',
    spanish: '¡Y que lo digas! / ¡No me digas nada!',
    vietnamese: 'Tôi hiểu mà! / Bạn không cần phải nói tôi cũng biết.'
  },
  1127: {
    japanese: '奥（おく）さんにひどく叱ら（しから）れた。／奥さんに油（あぶら）を絞（しぼ）られた。',
    chinese: '他老婆把他臭骂了一顿。(tā lǎo po bǎ tā chòu mà le yí dùn) / 挨训了。(ái xùn le)',
    spanish: 'Su mujer lo puso de vuelta y media. / Su esposa le cantó las cuarenta.',
    vietnamese: 'Vợ anh ta đã mắng anh ta một trận tơi bời. / Bị vợ sạc cho một trận.'
  },
  1128: {
    japanese: '噂（うわさ）を広めて（ひろめて）ください。／みんなに知らせ（しらせ）て。',
    chinese: '请传个话。(qǐng chuán gè huà) / 宣扬一下。(xuān yáng yí xià)',
    spanish: 'Por favor, corre la voz. / Pásalo.',
    vietnamese: 'Làm ơn hãy truyền tin này đi. / Lan tỏa thông tin giúp tôi.'
  },
  1129: {
    japanese: '言い（いい）にくいことなんだけど。／残念（ざんねん）ながらお知らせ（しらせ）しなければ。',
    chinese: '虽然不想告诉你，但……(suī rán bù xiǎng gào su nǐ, dàn...) / 说句你不爱听的。(shuō jù nǐ bú ài tīng de)',
    spanish: 'Lamento ser yo quien te lo diga, pero. / Odio darte malas noticias, pero.',
    vietnamese: 'Tôi rất tiếc phải nói điều này, nhưng. / Chẳng đặng đừng tôi mới phải nói.'
  },
  1130: {
    japanese: '私（わたし）には関係（かんけい）ない。／どうでもいいよ。',
    chinese: '我才不管呢。(wǒ cái bù guǎn ne) / 随它去。(suí tā qù)',
    spanish: 'Por lo que a mí respecta. / Me trae sin cuidado.',
    vietnamese: 'Mặc kệ tôi. / Chẳng liên quan gì đến tôi.'
  },
  1131: {
    japanese: '気（き）にするな。／心配（しんぱい）しないで。',
    chinese: '别往心里去。(bié wǎng xīn lǐ qù) / 没事儿。(méi shì r)',
    spanish: 'No te preocupes por eso. / No te rayes.',
    vietnamese: 'Đừng bận tâm. / Đừng lo lắng quá.'
  },
  1132: {
    japanese: '嘘（うそ）じゃないよ。／本当（ほんとう）のことだ。',
    chinese: '一点儿不假。(yì diǎnr bù jiǎ) / 没骗你。(méi piàn nǐ)',
    spanish: 'Te lo juro, no es mentira. / Es la pura verdad.',
    vietnamese: 'Không nói dối đâu. / Thật lòng đấy.'
  },
  1133: {
    japanese: 'どこからともなく人（ひと）が湧き（わき）出て（でて）きた。／急（きゅう）に人だかりができた。',
    chinese: '人们不知从哪儿都冒出来了。(rén men bù zhī cóng nǎr dōu mào chū lái le) / 突然涌现。(tū rán yǒng xiàn)',
    spanish: 'La gente salió de debajo de las piedras. / Aparecieron de la nada.',
    vietnamese: 'Người ta ở đâu kéo đến đông nghịt. / Đột nhiên xuất hiện khắp nơi.'
  },
  1134: {
    japanese: '体（からだ）が覚え（おぼえ）ているよ。／一度（いちど）覚え（おぼえ）れば忘（わす）れない。',
    chinese: '这就像骑自行车一样。(zhè jiù xiàng qí zì xíng chē yí yàng) / 忘不了。(wàng bù liǎo)',
    spanish: 'Es como montar en bici. / No se olvida nunca.',
    vietnamese: 'Giống như đi xe đạp thôi. / Làm một lần là nhớ mãi.'
  },
  1135: {
    japanese: 'この本（ほん）を熟読（じゅくどく）した。／詳しく（くわしく）調べ（しらべ）た。',
    chinese: '我仔细阅读了这本书。(wǒ zǐ xì yuè dú le zhè běn shū) / 啃书。(kěn shū)',
    spanish: 'He devorado este libro. / Lo he leído con lupa.',
    vietnamese: 'Tôi đã nghiên cứu kỹ cuốn sách này. / Đọc đi đọc lại nhiều lần.'
  },
  1138: {
    japanese: '失態（しったい）を演じ（えんじ）た。／大失敗（だいしっぱい）をした。',
    chinese: '他犯了个大错。(tā fàn le gè dà cuò) / 搞砸了。(gǎo zá le)',
    spanish: 'Cometió una pifia. / Metió la pata.',
    vietnamese: 'Anh ta đã phạm sai lầm ngớ ngẩn. / Một cú hố nặng.'
  },
  1139: {
    japanese: 'お金（かね）が腐る（くさる）ほどある。／湯水（ゆみず）のようにお金（かね）を使う（つかう）。',
    chinese: '他钱多得没处烫。(tā qián duō de méi chù tàng) / 土豪。(tǔ háo)',
    spanish: 'Le sobra el dinero. / Tiene dinero para quemar.',
    vietnamese: 'Tiền tiêu không hết. / Đại gia thứ thiệt.'
  },
  1140: {
    japanese: '胸（むね）がいっぱいになった。／感極（かんきわ）まって言葉（ことば）に詰まっ（つまっ）た。',
    chinese: '我哽咽了。(wǒ gěng yè le) / 心里酸酸的。(xīn lǐ suān suān de)',
    spanish: 'Se me hizo un nudo en la garganta. / Me emocioné muchísimo.',
    vietnamese: 'Tôi đã nghẹn ngào. / Xúc động không thốt nên lời.'
  },
  1141: {
    japanese: '動か（うごか）ないよりはましだ。／何（なに）もしないよりいい。',
    chinese: '动比不动强。(dòng bǐ bú dòng qiáng) / 别闲着。(bié xián zhe)',
    spanish: 'Mejor moverse que quedarse quieto. / Algo es algo.',
    vietnamese: 'Thà động đậy còn hơn đứng yên. / Có đi có hơn.'
  },
  1142: {
    japanese: '仕事（しごと）のコツを覚え（おぼえ）なきゃ。／やり方（かた）を学（まな）ぶ。',
    chinese: '你得摸门道。(nǐ děi mō mén dào) / 入门。(rù mén)',
    spanish: 'Tienes que aprender cómo va esto. / Hay que aprender el oficio.',
    vietnamese: 'Bạn phải học cách làm việc. / Làm quen với công việc.'
  },
  1143: {
    japanese: '彼（かれ）は恩着せがましい（おんきせがましい）。／状況（じょうきょう）を最大限（さいだいげん）に利用（りよう）している。',
    chinese: '他在得寸进尺。(tā zài dé cùn jìn chǐ) / 借题发挥。(jiè tí fā huī)',
    spanish: 'Se está aprovechando. / Le está sacando el jugo.',
    vietnamese: 'Anh ta đang lợi dụng tình hình. / Làm quá vấn đề.'
  },
  1144: {
    japanese: 'いいところ取り（どり）はできないよ。／好き（すき）なものだけ選ぶ（えらぶ）のはダメだ。',
    chinese: '你不能挑肥拣瘦。(nǐ bù néng tiāo féi jiǎn shòu) / 别光挑好的。(bié guāng tiāo hǎo de)',
    spanish: 'No puedes elegir solo lo bueno. / No se puede ser selectivo.',
    vietnamese: 'Đừng có mà kén cá chọn canh. / Không được chỉ chọn cái tốt.'
  },
  1145: {
    japanese: '図星（ずぼし）だね。／核心（かくしん）を突い（つい）たね。',
    chinese: '你一针见血。(nǐ yì zhēn jiàn xiě) / 说正着了。(shuō zhèng zháo le)',
    spanish: 'Le diste en el clavo. / Diste en la diana.',
    vietnamese: 'Bạn đã nói trúng phóc. / Đánh trúng tim đen.'
  },
  1146: {
    japanese: '名前（なまえ）なんて関係（かんけい）ない。／名（な）が何（なに）を語る（かたる）というのか。',
    chinese: '名字有什么关系？(míng zi yǒu shén me guān xi) / 虚名而已。(xū míng ér yǐ)',
    spanish: '¿Qué importa el nombre? / El nombre no hace a la persona.',
    vietnamese: 'Tên gọi thì có nghĩa lý gì? / Quan trọng là bản chất.'
  },
  1147: {
    japanese: '彼（かれ）は有言実行（ゆうげんじっこう）だ。／口（くち）先（さき）だけじゃない。',
    chinese: '他是个实干家。(tā shì gè shí gàn jiā) / 说到做到。(shuō dào zuò dào)',
    spanish: 'Él predica con el ejemplo. / Hace lo que dice.',
    vietnamese: 'Anh ta nói được làm được. / Không chỉ nói suông.'
  },
  1148: {
    japanese: 'その時（とき）が来（き）たら考え（かんがえ）よう。／明日は明日の風が吹く。',
    chinese: '到那个时候再说吧。(dào nà gè shí hou zài shuō ba) / 走一步看一步。(zǒu yí bù kàn yí bù)',
    spanish: 'Ya cruzaremos ese puente cuando lleguemos. / No nos adelantemos.',
    vietnamese: 'Đến đâu hay đến đó. / Chuyện gì đến sẽ đến.'
  },
  1149: {
    japanese: '落ち着く（おちつく）のを待と（まと）う。／様子（ようす）を見（み）よう。',
    chinese: '等尘埃落定再说。(děng chén āi luò dìng zài shuō) / 消停消停。(xiāo ting xiāo ting)',
    spanish: 'Dejemos que las cosas se calmen. / Vamos a esperar a que baje la marea.',
    vietnamese: 'Hãy đợi mọi chuyện lắng xuống. / Chờ xem thế nào đã.'
  },
  1152: {
    japanese: '調子（ちょうし）に乗り（のり）すぎるな。／運（うん）を使い果たす（つかいはたす）な。',
    chinese: '别得意忘形。(bié dé yì wàng xíng) / 见好就收。(jiàn hǎo jiù shōu)',
    spanish: 'No tientes a la suerte. / No abuses de tu fortuna.',
    vietnamese: 'Đừng có mà lấn tới. / Đừng tham quá.'
  },
  1153: {
    japanese: 'もう限界（げんかい）だ。／堪忍袋（かんにんぶくろ）の緒（お）が切れ（きれ）た。',
    chinese: '我已经到极限了。(wǒ yǐ jīng dào jí xiàn le) / 忍无可忍。(rěn wú kě rěn)',
    spanish: 'Estoy al límite. / Ya no puedo más.',
    vietnamese: 'Tôi đã hết kiên nhẫn rồi. / Đến giới hạn rồi.'
  },
  1154: {
    japanese: '世間（せけん）は狭い（せまい）ね。／奇遇（きぐう）だね。',
    chinese: '世界真小。(shì jiè zhēn xiǎo) / 真是冤家路窄。(zhēn shì yuān jiā lù zhǎi)',
    spanish: 'El mundo es un pañuelo. / Qué casualidad.',
    vietnamese: 'Thế giới thật nhỏ bé. / Thật là trùng hợp.'
  },
  1155: {
    japanese: '危ない（あぶない）状況（じょうきょう）だよ。／薄氷（はくひょう）を履（ふ）む思い（おもい）だ。',
    chinese: '你在如履薄冰。(nǐ zài rú lǚ bó bīng) / 处境危险。(chǔ jìng wēi xiǎn)',
    spanish: 'Te la estás jugando. / Estás caminando por la cuerda floja.',
    vietnamese: 'Bạn đang mạo hiểm đấy. / Đang ở tình thế nguy hiểm.'
  },
  1157: {
    japanese: '念（ねん）には念（ねん）を。／注意（ちゅうい）しすぎることはない。',
    chinese: '小心驶得万年船。(xiǎo xīn shǐ de wàn nián chuán) / 多留个心眼。(duō liú gè xīn yǎn)',
    spanish: 'Toda precaución es poca. / Nunca se es demasiado precavido.',
    vietnamese: 'Cẩn thận không bao giờ là thừa. / Phải thật dè chừng.'
  },
  1158: {
    japanese: 'これでおしまいだ。／完成（かんせい）だ。',
    chinese: '大功告成。(dà gōng gào chéng) / 齐活儿。(qí huór)',
    spanish: 'Y con esto terminamos. / colorín colorado.',
    vietnamese: 'Thế là xong rồi. / Kết thúc tại đây.'
  },
  1159: {
    japanese: '早とちり（はやとちり）しないで。／決め（きめ）つけないで。',
    chinese: '别过早下结论。(bié guò zǎo xià jié lùn) / 别瞎猜。(bié xiā cāi)',
    spanish: 'No saques conclusiones precipitadas. / No te adelantes.',
    vietnamese: 'Đừng có vội kết luận. / Đừng có suy diễn.'
  },
  1160: {
    japanese: '私（わたし）にぴったりだ。／ちょうど好み（このみ）だ。',
    chinese: '正合我意。(zhèng hé wǒ yì) / 正是我的菜。(zhèng shì wǒ de cài)',
    spanish: 'Es justo lo mío. / Me viene como anillo al dedo.',
    vietnamese: 'Đúng là sở trường của tôi. / Hợp ý tôi lắm.'
  },
  1162: {
    japanese: '私（わたし）にふさわしい。／これがいい。',
    chinese: '这是给我的。(zhè shì gěi wǒ de) / 我看中了。(wǒ kàn zhòng le)',
    spanish: 'Esto es para mí. / Me lo pido.',
    vietnamese: 'Cái này dành cho tôi. / Tôi chọn cái này.'
  },
  1163: {
    japanese: '可能性（かのうせい）は無限（むげん）だ。／限界（げんかい）はない。',
    chinese: '前途无量。(qián tú wú liàng) / 没准儿。(méi zhǔnr)',
    spanish: 'El cielo es el límite. / No hay fronteras.',
    vietnamese: 'Không có giới hạn nào cả. / Tương lai rộng mở.'
  },
  1166: {
    japanese: '待ち時間（まちじかん）はどれくらい？／何分（なんぷん）待ちですか？',
    chinese: '要等多久？(yào děng duō jiǔ) / 几点能到？(jǐ diǎn néng dào)',
    spanish: '¿Cuánto hay que esperar? / ¿Qué demora tiene?',
    vietnamese: 'Phải đợi bao lâu vậy? / Chờ bao lâu thì đến lượt?'
  },
  1167: {
    japanese: 'お手洗い（おてあらい）に行って（いって）くる。／生理（せいり）現象（げんしょう）だ。',
    chinese: '我要去方便一下。(wǒ yào qù fāng biàn yí xià) / 内急。(nèi jí)',
    spanish: 'La naturaleza llama. / Tengo que ir al baño.',
    vietnamese: 'Tôi phải đi giải quyết nỗi buồn. / Có nhu cầu tự nhiên.'
  },
  1168: {
    japanese: 'そこで降ろして（おろして）ください。／あそこで停めて（とめて）。',
    chinese: '在那儿把我放下来。(zài nàr bǎ wǒ fàng xià lái) / 就那儿停。(jiù nàr tíng)',
    spanish: 'Déjame allí. / Déjame en esa esquina.',
    vietnamese: 'Hãy cho tôi xuống ở đó. / Thả tôi xuống chỗ kia.'
  },
  1169: {
    japanese: '実物（じつぶつ）の方（ほう）が素敵（すてき）だね。／写真（しゃしん）よりずっといい。',
    chinese: '你本人更漂亮。(nǐ běn rén gèng piào liang) / 上相。(shàng xiàng)',
    spanish: 'Te ves mejor en persona. / Ganas mucho en vivo.',
    vietnamese: 'Bạn ở ngoài nhìn đẹp hơn. / Nhìn trực tiếp thích hơn.'
  },
  1170: {
    japanese: '同じ（おなじ）ものを2つ（ふたつ）ください。／2つにお願い（おねがい）します。',
    chinese: '请给我两个。(qǐng gěi wǒ liǎng gè) / 见者有份。(jiàn zhě yǒu fèn)',
    spanish: 'Póngame dos, por favor. / Que sean dos.',
    vietnamese: 'Cho tôi hai cái nhé. / Hai suất như vậy đi.'
  },
  1171: {
    japanese: '声（こえ）を抑えて（おさえて）。／静か（しずか）にして。',
    chinese: '小点儿声。(xiǎo diǎnr shēng) / 别嚷嚷。(bié rāng rang)',
    spanish: 'Baja la voz. / No hables tan alto.',
    vietnamese: 'Nói khẽ thôi. / Giữ yên lặng chút đi.'
  },
  1173: {
    japanese: '一（ひと）晩（ばん）中（じゅう）寝返り（ねがえり）を打って（うって）いた。／まんじりともしなかった。',
    chinese: '我整晚翻来覆去。(wǒ zhěng wǎn fān lái fù qù) / 失眠了。(shī mián le)',
    spanish: 'Me pasé la noche dando vueltas. / No pude pegar ojo.',
    vietnamese: 'Tôi đã trằn trọc cả đêm. / Cứ xoay người mãi không ngủ được.'
  },
  1174: {
    japanese: 'ダンスがとても下手（へた）だ。／不器用（ぶきよう）だ。',
    chinese: '我完全不会跳舞。(wǒ wán quán bú huì tiào wǔ) / 笨手笨脚。(bèn shǒu bèn jiǎo)',
    spanish: 'Soy un patoso bailando. / Tengo dos pies izquierdos.',
    vietnamese: 'Tôi nhảy tệ lắm. / Vụng về như gà mắc tóc.'
  },
  1175: {
    japanese: '顔（かお）に吹き出物（ふきでもの）ができた。／肌（はだ）が荒れて（あれて）いる。',
    chinese: '我脸上起痘了。(wǒ liǎn shàng qǐ dòu le) / 爆痘。(bào dòu)',
    spanish: 'Me están saliendo granos. / Tengo un brote en la cara.',
    vietnamese: 'Mặt tôi đang bị nổi mụn. / Da dẻ chán quá.'
  },
  1176: {
    japanese: '休み（やすみ）が欲しい（ほしい）。／休暇（きゅうか）を取り（とり）たい。',
    chinese: '我想歇几天。(wǒ xiǎng xiē jǐ tiān) / 调休。(tiáo xiū)',
    spanish: 'Quiero tomarme un tiempo libre. / Necesito vacaciones.',
    vietnamese: 'Tôi muốn nghỉ phép một thời gian. / Muốn nghỉ ngơi chút.'
  },
  1177: {
    japanese: '手先（てさき）が不器用（ぶきよう）だ。／工作（こうさく）が苦手（にがて）だ。',
    chinese: '我手不巧。(wǒ shǒu bù qiǎo) / 没活儿。(méi huór)',
    spanish: 'No se me dan bien las manualidades. / Soy un manazas.',
    vietnamese: 'Tôi không khéo tay lắm. / Vụng về với mấy thứ đồ đạc.'
  },
  1178: {
    japanese: '鼻血（はなぢ）が出た（でた）。／鼻血が止まら（とまら）ない。',
    chinese: '我流鼻血了。(wǒ liú bí xiě le) / 上火。(shàng huǒ)',
    spanish: 'Me sangra la nariz. / Tengo una hemorragia nasal.',
    vietnamese: 'Tôi bị chảy máu cam. / Máu mũi tự dưng chảy.'
  },
  1179: {
    japanese: 'くたくただ。／疲れ果て（つかれはて）た。',
    chinese: '我累惨了。(wǒ lèi cǎn le) / 瘫了。(tān le)',
    spanish: 'Estoy reventado. / Estoy agotado.',
    vietnamese: 'Tôi mệt lử rồi. / Mệt đứt hơi.'
  },
  1182: {
    japanese: 'イライラする。／鼻（はな）につく。',
    chinese: '这让我心烦。(zhè ràng wǒ xīn fán) / 闹心。(nào xīn)',
    spanish: 'Me fastidia. / Me saca de quicio.',
    vietnamese: 'Điều đó làm tôi khó chịu. / Thấy bực mình thật.'
  },
  1183: {
    japanese: '私（わたし）の知る限り（しるかぎり）では。／心当たり（こころあたり）はない。',
    chinese: '据我所知不是。(jù wǒ suǒ zhī bú shì) / 没听说。(méi tīng shuō)',
    spanish: 'Que yo sepa, no. / No me consta.',
    vietnamese: 'Theo tôi biết thì không phải. / Tôi không nghe nói vậy.'
  },
  1184: {
    japanese: '見込み（みこみ）がない。／どうしようもない。',
    chinese: '没救了。(méi jiù le) / 瞎耽误功夫。(xiā dān wu gōng fu)',
    spanish: 'Es una causa perdida. / No tiene remedio.',
    vietnamese: 'Vô phương cứu chữa. / Hết hy vọng rồi.'
  },
  1187: {
    japanese: '猛勉強（もうべんきょう）する。／机（つくえ）に向かう（むかう）。',
    chinese: '开夜车。(kāi yè chē) / 钻研。(zuān yán)',
    spanish: 'Hincar los codos. / ponerse a estudiar.',
    vietnamese: 'Mài mông trên ghế nhà trường. / Học hành chăm chỉ.'
  },
  1190: {
    japanese: 'わかる？／バレてる？',
    chinese: '你看出来了？(nǐ kàn chū lái le) / 露馅儿了？(lòu xiànr le)',
    spanish: '¿Se nota? / ¿Te das cuenta?',
    vietnamese: 'Bạn nhận ra à? / Có lộ liễu quá không?'
  },
  1191: {
    japanese: 'うぬぼれている。／自信（じしん）過剰（かじょう）だ。',
    chinese: '他自我感觉良好。(tā zì wǒ gǎn jué liáng hǎo) / 得色。(dè se)',
    spanish: 'Es un creído. / Se lo tiene muy creído.',
    vietnamese: 'Anh ta quá tự cao. / Lúc nào cũng coi mình là nhất.'
  },
  1192: {
    japanese: 'ご存知（ぞんじ）ですか？／心当たり（こころあたり）はありますか？',
    chinese: '你凑巧知道吗？(nǐ còu qiǎo zhī dào ma) / 打听一下。(dǎ ting yí xià)',
    spanish: '¿De casualidad lo sabes? / ¿Sabes algo por un casual?',
    vietnamese: 'Bạn có tình cờ biết không? / Liệu bạn có biết chút gì không?'
  },
  1193: {
    japanese: '太る（ふとる）よ。／カロリーが高い（たかい）。',
    chinese: '这容易长胖。(zhè róng yì zhǎng pàng) / 油水大。(yóu shuǐ dà)',
    spanish: 'Eso engorda. / Tiene muchas calorías.',
    vietnamese: 'Cái này béo lắm đấy. / Ăn vào là tăng cân đó.'
  },
  1194: {
    japanese: '彼女（かのじょ）によろしく。／安否（あんぴ）を伝え（つたえ）て。',
    chinese: '替我向她问好。(tì wǒ xiàng tā wèn hǎo) / 带个好儿。(dài gè hǎor)',
    spanish: 'Dale mis recuerdos. / Salúdala de mi parte.',
    vietnamese: 'Cho tôi gửi lời hỏi thăm cô ấy. / Nhắn giúp tôi lời chào.'
  },
  1195: {
    japanese: '最高（さいこう）のおめかしだね。／ばっちり決まって（きまって）いる。',
    chinese: '穿得真帅。(chuān de zhēn shuài) / 盛装打扮。(shèng zhuāng dǎ bàn)',
    spanish: 'Vas de punta en blanco. / Dressed to kill.',
    vietnamese: 'Diện đồ đẹp quá. / Ăn mặc chất lừ.'
  },
  1196: {
    japanese: '勝手（かって）でしょ。／私（わたし）の自由（じゆう）だ。',
    chinese: '因为我乐意。(yīn wèi wǒ lè yì) / 我显摆。(wǒ xiǎn bai)',
    spanish: 'Porque puedo. / Porque me da la gana.',
    vietnamese: 'Vì tôi thích thế. / Tại tôi có quyền mà.'
  },
  1199: {
    japanese: '人当たり（ひとあたり）がいい。／社交（しゃこう）的（てき）だ。',
    chinese: '人缘儿好。(rén yuánr hǎo) / 挺会来事儿。(tǐng huì lái shìr)',
    spanish: 'Se le da bien la gente. / Es muy sociable.',
    vietnamese: 'Giao thiệp tốt. / Khéo léo với mọi người.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 2 updated.');
