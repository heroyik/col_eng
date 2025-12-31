const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  101: {
    japanese: 'マークのオファー、聞（き）いた？／転職（てんしょく）するんだって。',
    chinese: '听说了吗？(tīng shuō le ma) / 那个工作邀请。(nà ge gōng zuò yāo qǐng)',
    spanish: '¿Te has enterado de la oferta de Mark? / Mark ha recibido una oferta.',
    vietnamese: 'Nghe tin Mark được mời làm việc chưa? / Mark sắp chuyển việc đấy.'
  },
  102: {
    japanese: '福利（ふくり）厚生（こうせい）。／待遇（たいぐう）パッケージ。',
    chinese: '福利待遇。(fú lì dài yù) / 员工福利。(yuán gōng fú lì)',
    spanish: 'Paquete de beneficios. / Prestaciones laborales.',
    vietnamese: 'Chế độ đãi ngộ. / Gói phúc lợi.'
  },
  103: {
    japanese: '何（なん）とも言（い）えない。／判断（はんだん）が難（むずか）しい。',
    chinese: '不好说。(bù hǎo shuō) / 很难讲。(hěn nán jiǎng)',
    spanish: 'Es difícil de decir. / No sabría decirte.',
    vietnamese: 'Khó nói lắm. / Chưa biết thế nào mà lần.'
  },
  104: {
    japanese: 'もしあなたが私（わたし）の立場（たちば）なら。／私（わたし）になって考（かんが）えてみて。',
    chinese: '要是你在我的立场。(yào shi nǐ zài wǒ de lì chǎng) / 换做是你。(huàn zuò shì nǐ)',
    spanish: 'Si estuvieras en mi lugar. / En mi piel.',
    vietnamese: 'Nếu bạn ở trong hoàn cảnh của tôi. / Đặt mình vào vị trí của tôi đi.'
  },
  105: {
    japanese: 'これが最（さい）優先（ゆうせん）だ。／まずこれから。',
    chinese: '这必须排在第一位。(zhè bì xū pái zài dì yī wèi) / 第一要务。(dì yī yào wù)',
    spanish: 'Esto es lo primero. / Tiene prioridad absoluta.',
    vietnamese: 'Cái này phải ưu tiên hàng đầu. / Việc này là quan trọng nhất.'
  },
  106: {
    japanese: 'ピンとくる？／聞き（き）覚（おぼ）えがある？',
    chinese: '有印象吗？(yǒu yìn xiàng ma) / 听着耳熟吗？(tīng zhe ěr shú ma)',
    spanish: '¿Te suena? / ¿Te dice algo?',
    vietnamese: 'Nghe quen không? / Có gợi nhớ gì không?'
  },
  107: {
    japanese: 'やっとだね。／もっと早（はや）くすべきだった。',
    chinese: '早就该这样了。(zǎo jiù gāi zhè yàng le) / 迟到了很久。(chí dào le hěn jiǔ)',
    spanish: 'Ya era hora. / Hace mucho que debería haber pasado.',
    vietnamese: 'Đáng lẽ phải làm lâu rồi. / Quá trễ rồi đấy.'
  },
  108: {
    japanese: '全盛（ぜんせい）期（き）。／一番（いちばん）輝（かがや）いていた頃（ころ）。',
    chinese: '全盛时期。(quán shèng shí qī) / 黄金时代。(huáng jīn shí dài)',
    spanish: 'Apogeo. / Época dorada.',
    vietnamese: 'Thời hoàng kim. / Thời kỳ rực rỡ nhất.'
  },
  109: {
    japanese: '謝（あやま）らなくていいよ。／気（き）にしないで。',
    chinese: '不用道歉。(bú yòng dào qiàn) / 没事儿。(méi shì er)',
    spanish: 'No hace falta que te disculpes. / No te preocupes.',
    vietnamese: 'Không cần xin lỗi đâu. / Không có gì đâu mà.'
  },
  110: {
    japanese: '大人（おとな）になれよ。／しっかりしろ。',
    chinese: '成熟点儿。(chéng shú diǎnr) / 懂点儿事吧。(dǒng diǎnr shì ba)',
    spanish: 'Madura de una vez. / ¡Hazte mayor!',
    vietnamese: 'Lớn rồi, trưởng thành lên đi. / Đừng có con nít thế.'
  },
  111: {
    japanese: '返信（へんしん）が早（はや）い。／レスポンスがいい。',
    chinese: '他回复得很快。(tā huí fù de hěn kuài) / 办事效率高。(bàn shì xiào lǜ gāo)',
    spanish: 'Suele responder rápido. / Está muy atento a los mensajes.',
    vietnamese: 'Anh ấy thường phản hồi rất nhanh. / Liên lạc với anh ấy rất dễ.'
  },
  112: {
    japanese: '善意（ぜんい）に解釈（かいしゃく）する。／信（しん）じてみる。',
    chinese: '姑且相信。(gū qiě xiāng xìn) / 往好处想。(wǎng hǎo chù xiǎng)',
    spanish: 'Dar el beneficio de la duda. / Creer sin pruebas.',
    vietnamese: 'Tạm tin tưởng. / Cứ cho là như vậy đi.'
  },
  113: {
    japanese: '気（き）分（ぶん）転換（てんかん）する。／忘（わす）れさせる。',
    chinese: '散散心。(sàn sàn xīn) / 转移注意力。(zhuǎn yí zhù yì lì)',
    spanish: 'Distraerse. / Despejar la mente.',
    vietnamese: 'Giải khuây. / Quên đi muộn phiền.'
  },
  114: {
    japanese: '私（わたし）の立場（たちば）になってみて。／代（か）わってみてよ。',
    chinese: '设身处地为我想想。(shè shēn chǔ dì wèi wǒ xiǎng xiǎng) / 换位思考。(huàn wèi sī kǎo)',
    spanish: 'Ponte en mis zapatos. / Imagina que eres yo.',
    vietnamese: 'Đặt mình vào vị trí của tôi đi. / Hãy thử làm tôi một lần xem.'
  },
  115: {
    japanese: '目（め）立（だ）たないようにする。／低（ひく）い姿勢（しせい）を保（たも）つ。',
    chinese: '保持低调。(bǎo chí dī diào) / 隐姓埋名。(yǐn xìng mái míng)',
    spanish: 'Mantener un perfil bajo. / No llamar la atención.',
    vietnamese: 'Sống kín tiếng. / Giữ thái độ khiêm tốn.'
  },
  116: {
    japanese: '自分（じぶん）のことに集中（しゅうちゅう）しろ。／余計（よけい）なことはするな。',
    chinese: '管好你自己的事。(guǎn hǎo nǐ zì jǐ de shì) / 做好本职工作。(zuò hǎo běn zhí gōng zuò)',
    spanish: 'Céntrate en lo tuyo. / Haz lo que te toca.',
    vietnamese: 'Hãy tập trung vào việc của mình đi. / Lo việc của mình cho tốt đã.'
  },
  117: {
    japanese: '経験（けいけん）済（ず）みだよ。／分（わ）かってる。',
    chinese: '我也经历过。(wǒ yě jīng lì guò) / 老生常谈。(lǎo shēng cháng tán)',
    spanish: 'Ya he pasado por eso. / Ya me lo conozco.',
    vietnamese: 'Tôi trải qua rồi. / Chuyện này tôi rành quá mà.'
  },
  118: {
    japanese: '楽（たの）しみのために。／面白（おもしろ）半分（はんぶん）で。',
    chinese: '为了好玩。(wèi le hǎo wán) / 乐呵乐呵。(lè hē lè hē)',
    spanish: 'Por la risa. / Solo por diversión.',
    vietnamese: 'Cho vui thôi. / Để giải trí thôi.'
  },
  119: {
    japanese: 'あれ、何（なん）だっけ。／例（れい）のブツ。',
    chinese: '那个叫什么来着。(nà ge jiào shén me lái zhe) / 那个玩意儿。(nà ge wán yì er)',
    spanish: 'El cacharro ese. / La cosita esa.',
    vietnamese: 'Cái đồ vật đó. / Cái thứ kia kìa.'
  },
  120: {
    japanese: '順（じゅん）を追（お）って説明（せつめい）して。／ガイドして。',
    chinese: '帮我理一遍。(bāng wǒ lǐ yí biàn) / 详细给我讲讲。(xiáng xì gěi wǒ jiǎng jiǎng)',
    spanish: 'Explícame paso a paso. / Llévame de la mano.',
    vietnamese: 'Hướng dẫn tôi đi. / Giải thích từng bước cho tôi.'
  },
  121: {
    japanese: 'ひっくり返（かえ）す。／引き（ひき）渡（わた）す。',
    chinese: '翻转。(fān zhuǎn) / 营业额。(yíng yè é)',
    spanish: 'Dar la vuelta. / Facturación.',
    vietnamese: 'Lật ngược lại. / Doanh thu.'
  },
  122: {
    japanese: 'そのまま続けて（つづけて）。／頑張（がんば）って。',
    chinese: '坚持下去。(jiān chí xià qù) / 继续努力。(jì xù nǔ lì)',
    spanish: 'Sigue así. / No lo dejes.',
    vietnamese: 'Cứ tiếp tục nhé. / Đừng bỏ cuộc.'
  },
  123: {
    japanese: '髪（かみ）を切（き）った。／ヘアスタイルを変（か）えた。',
    chinese: '我理发了。(wǒ lǐ fà le) / 做头发了。(zuò tóu fa le)',
    spanish: 'Me he arreglado el pelo. / He ido a la peluquería.',
    vietnamese: 'Tôi mới làm tóc. / Cắt tóc mới rồi này.'
  },
  124: {
    japanese: '久し（ひさし）ぶり。／しばらく会（あ）ってなかったね。',
    chinese: '好久不见。(hǎo jiǔ bú jiàn) / 挺长时间没见了。(tǐng cháng shí jiān méi jiàn le)',
    spanish: 'Hacía tiempo. / Ha pasado un rato.',
    vietnamese: 'Lâu rồi không gặp. / Cũng được một thời gian rồi nhỉ.'
  },
  125: {
    japanese: '何（なん）年（ねん）ぶりだろう。／本当（ほんとう）に久し（ひさし）ぶり。',
    chinese: '几年没见了。(jǐ nián méi jiàn le) / 太久了。(tài jiǔ le)',
    spanish: 'Hacía siglos. / Una eternidad.',
    vietnamese: 'Cả thế kỷ rồi. / Lâu lắm rồi mới gặp.'
  },
  126: {
    japanese: 'がっかりさせる。／失望（しつぼう）させる。',
    chinese: '让人失望。(ràng rén shī wàng) / 掉链子。(diào liàn zi)',
    spanish: 'Decepcionar. / Fallar a alguien.',
    vietnamese: 'Làm thất vọng. / Để ai đó phải buồn.'
  },
  127: {
    japanese: 'サボりすぎだよ。／言（い）うことを聞（き）け。',
    chinese: '你偷懒太多了。(nǐ tōu lǎn tài duō le) / 别不听话。(bié bù tīng huà)',
    spanish: 'Has faltado demasiado. / No me ignores.',
    vietnamese: 'Bạn bỏ bê quá nhiều rồi. / Đừng có phớt lờ lời tôi nói.'
  },
  128: {
    japanese: 'ここを「今（いま）」に設定（せってい）して。／現在（げんざい）時刻（じこく）。',
    chinese: '设置成现在。(shè zhì chéng xiàn zài) / 时间戳。(shí jiān chuō)',
    spanish: 'Pon esta posición en "ahora". / Marca el tiempo actual.',
    vietnamese: 'Đặt vị trí này là bây giờ. / Đánh dấu thời gian hiện tại.'
  },
  129: {
    japanese: '片付（かたづ）ける。／解決（かいけつ）する。',
    chinese: '整理。(zhěng lǐ) / 处理好。(chǔ lǐ hǎo)',
    spanish: 'Organizar. / Solucionar.',
    vietnamese: 'Sắp xếp lại. / Giải quyết ổn thỏa.'
  },
  130: {
    japanese: '忘（わす）れさせてくれる。／気（き）晴（は）らしになる。',
    chinese: '让我忘掉烦恼。(ràng wǒ wàng diào fán nǎo) / 放松身心。(fàng sōng shēn xīn)',
    spanish: 'Me ayuda a desconectar. / Olvidar los problemas.',
    vietnamese: 'Giúp tôi thư thái đầu óc. / Quên đi mọi chuyện.'
  },
  131: {
    japanese: '私（わたし）を飛（と）び越（こ）えて。／上（うえ）に報告（ほうこく）したね。',
    chinese: '越级了。(yuè jí le) / 没跟我商量。(méi gēn wǒ shāng liang)',
    spanish: 'Me diste un puente. / Fuiste por encima de mi cabeza.',
    vietnamese: 'Bạn đã vượt mặt tôi. / Đi báo cáo cấp trên mà không qua tôi.'
  },
  132: {
    japanese: '私（わたし）には難（むずか）しすぎる。／理解（りかい）不能（ふのう）だ。',
    chinese: '太深奥了。(tài shēn ào le) / 听不懂。(tīng bù dǒng)',
    spanish: 'Me viene grande. / Está por encima de mis posibilidades.',
    vietnamese: 'Quá tầm với của tôi. / Tôi không hiểu gì cả.'
  },
  133: {
    japanese: '引き分け（ひきわけ）。／お互（たが）い様（さま）。',
    chinese: '平手。(píng shǒu) / 扯平了。(chě píng le)',
    spanish: 'Empatados. / Estamos en paz.',
    vietnamese: 'Hòa nhau rồi. / Huề rồi nhé.'
  },
  134: {
    japanese: 'きっかり。／計算（けいさん）通（どお）り。',
    chinese: '两清了。(liǎng qīng le) / 公平交易。(gōng píng jiāo yì)',
    spanish: 'En paz. / Ni tú me debes ni yo te debo.',
    vietnamese: 'Công bằng nhé. / Sòng phẳng luôn.'
  },
  135: {
    japanese: '全部（ぜんぶ）言（い）って。／話（はな）して。',
    chinese: '尽管说吧。(jǐn guǎn shuō ba) / 全部告诉我。(quán bù gào su wǒ)',
    spanish: 'Suéltalo ya. / Cuéntamelo todo.',
    vietnamese: 'Cứ nói ra đi. / Có gì cứ thổ lộ hết đi.'
  },
  136: {
    japanese: 'お会計（かいけい）して。／打（う）って。',
    chinese: '买单。(mǎi dān) / 结账。(jié zhàng)',
    spanish: 'Cóbramelo. / Pasa el ticket.',
    vietnamese: 'Thanh toán cho tôi. / Tính tiền nhé.'
  },
  137: {
    japanese: '高嶺（たかね）の花（はな）。／私（わたし）たちには無理（むり）だ。',
    chinese: '高攀不起。(gāo pān bù qǐ) / 档次太高。(dàng cì tài gāo)',
    spanish: 'Fuera de nuestro alcance. / No es de nuestra liga.',
    vietnamese: 'Quá tầm với. / Tầng lớp khác rồi.'
  },
  138: {
    japanese: 'パニック。／メンタルがおかしくなる。',
    chinese: '精神崩溃。(jīng shén bēng kuì) / 崩了。(bēng le)',
    spanish: 'Tener una crisis nerviosa. / Estar al borde de un ataque.',
    vietnamese: 'Khủng hoảng tinh thần. / Bị sốc tâm lý.'
  },
  139: {
    japanese: '先延ばし（さきのばし）にする。／ぐずぐずする。',
    chinese: '拖延。(tuō yán) / 磨洋工。(mó yáng gōng)',
    spanish: 'Procrastinar. / Dejarlo para mañana.',
    vietnamese: 'Trì hoãn. / Lề mề quá.'
  },
  140: {
    japanese: 'ずっと気（き）になっていた。／頭（あたま）から離（はな）れない。',
    chinese: '一直惦记着。(yì zhí diàn jì zhe) / 记在心里。(jì zài xīn lǐ)',
    spanish: 'Lo he tenido en mente. / Le he estado dando vueltas.',
    vietnamese: 'Cứ luẩn quẩn trong đầu. / Thấy bận lòng mãi.'
  },
  141: {
    japanese: '善（ぜん）し悪（あ）しを考（かんが）える。／比較（ひかえつ）する。',
    chinese: '权衡利弊。(quán héng lì bì) / 仔细考虑。(zǐ xì kǎo lǜ)',
    spanish: 'Sopesar los pros y los contras. / Analizar ventajas y desventajas.',
    vietnamese: 'Cân nhắc lợi hại. / Tính toán thiệt hơn.'
  },
  142: {
    japanese: '軌道（きどう）に戻（もど）す。／やり直（なお）す。',
    chinese: '回归正轨。(huí guī zhèng guǐ) / 纠正方向。(jiū zhèng fāng xiàng)',
    spanish: 'Encarrilar las cosas. / Volver al buen camino.',
    vietnamese: 'Đưa mọi thứ trở lại quỹ đạo. / Chỉnh đốn lại.'
  },
  143: {
    japanese: 'どうしたの？／何（なに）に悩（なや）んでいるの？',
    chinese: '在烦什么呢？(zài fán shén me ne) / 怎么闷闷不乐的？(zěn me mèn mèn bú lè de)',
    spanish: '¿Qué te pasa? / ¿Qué te reconcome?',
    vietnamese: 'Có chuyện gì vậy? / Điều gì đang làm bạn phiền lòng thế?'
  },
  144: {
    japanese: '彼女（かのじょ）に盛大（せいだい）な拍手（はくしゅ）を。／称賛（しょうさん）しよう。',
    chinese: '给她点掌声。(gěi tā diǎn zhǎng shēng) / 大力支持。(dà lì zhī chí)',
    spanish: 'Un fuerte aplauso para ella. / Ovaciónenla.',
    vietnamese: 'Cho cô ấy một tràng pháo tay thật lớn. / Hãy cổ vũ cô ấy nhiệt tình lên.'
  },
  145: {
    japanese: '調子（ちょうし）はどう？／元気（げんき）？',
    chinese: '怎么样？(zěn me yàng) / 最近好吗？(zuì jìn hǎo ma)',
    spanish: '¿Cómo va todo? / ¿Qué tal todo?',
    vietnamese: 'Dạo này sao rồi? / Thế nào rồi?'
  },
  146: {
    japanese: '賛成（さんせい）。／喜（よろこ）んで。',
    chinese: '我也去。(wǒ yě qù) / 算我一个。(suàn wǒ yí gè)',
    spanish: 'Me apunto. / Cuenten conmigo.',
    vietnamese: 'Tôi đồng ý. / Tôi cũng tham gia nữa.'
  },
  147: {
    japanese: '行（い）けない。／都合（つごう）が悪（わる）い。',
    chinese: '去不了。(qù bù liǎo) / 没法参加。(méi fǎ cān jiā)',
    spanish: 'No puedo ir. / No voy a poder estar.',
    vietnamese: 'Tôi không đi được. / Tiếc quá, tôi bận mất rồi.'
  },
  148: {
    japanese: '不幸（ふこう）中（ちゅう）の幸（さいわ）い。／結果（けっか）オーライ。',
    chinese: '塞翁失马。(sài wēng shī mǎ) / 因祸得福。(yīn huò dé fú)',
    spanish: 'No hay mal que por bien no venga. / Golpe de suerte inesperado.',
    vietnamese: 'Trong cái rủi có cái may. / Hết cơn bĩ cực đến hồi thái lai.'
  },
  149: {
    japanese: 'また今度（こんど）にして。／延期（えんき）しよう。',
    chinese: '下次吧。(xià cì ba) / 改天。(gǎi tiān)',
    spanish: 'Lo dejamos para la próxima. / Lo posponemos.',
    vietnamese: 'Hẹn dịp khác nhé. / Thôi để lần sau nha.'
  },
  150: {
    japanese: 'あなた次第（しだい）だ。／任（まか）せるよ。',
    chinese: '看你的。(kàn nǐ de) / 你决定吧。(nǐ jué dìng ba)',
    spanish: 'Depende de ti. / Tú decides.',
    vietnamese: 'Tùy bạn thôi. / Bạn tự quyết đi.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 101-150 updated.');
