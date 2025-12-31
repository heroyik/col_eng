const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  301: {
    japanese: '要約（ようやく）すると。／まとめ。',
    chinese: '总而言之。(zǒng ér yán zhī) / 总结。(zǒng jié)',
    spanish: 'Para resumir. / En conclusión.',
    vietnamese: 'Để tóm gọn lại. / Kết luận là.'
  },
  302: {
    japanese: '手短（てみじか）に。／簡単に（かんたんに）。',
    chinese: '简单地说。(jiǎn dān de shuō) / 简短。(jiǎn duǎn)',
    spanish: 'Brevemente. / En pocas palabras.',
    vietnamese: 'Nói ngắn gọn. / Một cách sơ lược.'
  },
  303: {
    japanese: '手短（てみじか）に言（い）えば。／簡潔（かんけつ）に。',
    chinese: '简言之。(jiǎn yán zhī) / 简短。(jiǎn duǎn)',
    spanish: 'En resumen. / En breve.',
    vietnamese: 'Tóm tắt là. / Vắn tắt.'
  },
  304: {
    japanese: '詰（つ）まるところ。／単刀直入（たんとうちょくにゅう）に。',
    chinese: '一句话。(yí jù huà) / 简单说。(jiǎn dān shuō)',
    spanish: 'En pocas palabras. / En resumidas cuentas.',
    vietnamese: 'Nói ngắn gọn cho dễ hiểu. / Tóm lại là.'
  },
  305: {
    japanese: '話（はなし）を端折（はしょ）って言（い）うと。／手短（てみじか）に言（い）えば。',
    chinese: '长话短说。(cháng huà duǎn shuō) / 简单来讲。(jiǎn dān lái jiǎng)',
    spanish: 'Para abreviar. / Para no alargar el cuento.',
    vietnamese: 'Tóm cái váy lại là. / Chuyện dài nói ngắn.'
  },
  306: {
    japanese: '基本（きほん）的（てき）には。／大体（だいたい）。',
    chinese: '基本上。(jī běn shàng) / 主要是。(zhǔ yào shì)',
    spanish: 'Básicamente. / Fundamentalmente.',
    vietnamese: 'Căn bản là. / Về cơ bản.'
  },
  307: {
    japanese: '全体（ぜんたい）的（てき）な印象（いんしょう）として。／総じて（そうじて）。',
    chinese: '总体看来。(zǒng tǐ kàn lái) / 总的来说。(zǒng de lái shuō)',
    spanish: 'En general. / Globalmente.',
    vietnamese: 'Nhìn chung. / Tổng quát mà nói.'
  },
  308: {
    japanese: '一般的（いっぱんてき）に言（い）えば。／概（おおむ）ね。',
    chinese: '一般来说。(yì bān lái shuō) / 大体上。(dà tǐ shàng)',
    spanish: 'En líneas generales. / Por lo común.',
    vietnamese: 'Thường thì. / Nói chung là vậy.'
  },
  309: {
    japanese: '全（ぜん）般（ぱん）的（てき）に。／概（おおむ）ね。',
    chinese: '总的来说。(zǒng de lái shuō) / 大致。(dà zhì)',
    spanish: 'Por lo general. / En líneas generales.',
    vietnamese: 'Đại thể là. / Nhìn rộng ra thì.'
  },
  310: {
    japanese: '大部分（だいぶぶん）は。／ほとんどは。',
    chinese: '在很大程度上。(zài hěn dà chéng dù shàng) / 大部分。(dà bù fen)',
    spanish: 'En su mayor parte. / Principalmente.',
    vietnamese: 'Phần lớn. / Đa số.'
  },
  311: {
    japanese: '全体（ぜんたい）を通（とお）して。／概（おおむ）ね。',
    chinese: '总体而言。(zǒng tǐ ér yán) / 整体来看。(zhěng tǐ lái kàn)',
    spanish: 'En conjunto. / En resumidas cuentas.',
    vietnamese: 'Xét trên tổng thể. / Tóm lại cả quá trình.'
  },
  312: {
    japanese: '一般（いっぱん）に。／世（よ）間（けん）並（な）み。',
    chinese: '通常。(tōng cháng) / 普遍。(pǔ biàn)',
    spanish: 'En general. / Por norma.',
    vietnamese: 'Nói chung là. / Phổ quát.'
  },
  313: {
    japanese: '全体（ぜんたい）として。／ひとまとまり。',
    chinese: '作为一个整体。(zuò wéi yí gè zhěng tǐ) / 全部。(quán bù)',
    spanish: 'Como un todo. / En bloque.',
    vietnamese: 'Như một khối. / Toàn bộ cục diện.'
  },
  314: {
    japanese: '結局（けっきょく）。／総合（そうごう）的（てき）に。',
    chinese: '总而言之。(zǒng ér yán zhī) / 全部。(quán bù)',
    spanish: 'En total. / Considerando todo.',
    vietnamese: 'Tất tần tật. / Chung quy lại.'
  },
  315: {
    japanese: '締めくくり（しめくくり）に。／最後（さいご）に。',
    chinese: '最后。(zuì hòu) / 总结。(zǒng jié)',
    spanish: 'Para envolver. / Para finalizar.',
    vietnamese: 'Để gói gọn lại. / Chốt lại vấn đề.'
  },
  316: {
    japanese: '最後（さいご）に。／ついに。',
    chinese: '最终。(zuì zhōng) / 终于。(zhōng yú)',
    spanish: 'Finalmente. / Por último.',
    vietnamese: 'Cuối cùng thì. / Sau cùng.'
  },
  317: {
    japanese: 'まず初めに（はじめに）。／第一（だいいち）に。',
    chinese: '首先。(shǒu xiān) / 第一。(dì yī)',
    spanish: 'En primer lugar. / Antes que nada.',
    vietnamese: 'Đầu tiên là. / Trước hết.'
  },
  318: {
    japanese: 'まずはここから。／手始め（てはじめ）に。',
    chinese: '首先。(shǒu xiān) / 开始。(kāi shǐ)',
    spanish: 'Para empezar. / De entrada.',
    vietnamese: 'Để bắt đầu. / Trước tiên.'
  },
  319: {
    japanese: '最初（さいしょ）は。／暫定的（ざんていてき）に。',
    chinese: '初步。(chū bù) / 起初。(qǐ chū)',
    spanish: 'Inicialmente. / Al principio.',
    vietnamese: 'Lúc ban đầu. / Khởi điểm.'
  },
  320: {
    japanese: '何（なに）よりまず。／最（さい）優先（ゆうせん）。',
    chinese: '首要地。(shǒu yào de) / 最重要的。(zuì zhòng yào de)',
    spanish: 'Ante todo. / Primero y principal.',
    vietnamese: 'Quan trọng nhất là. / Trước nhất và trên hết.'
  },
  321: {
    japanese: 'まずは。／口開（くちあ）けに。',
    chinese: '先开始。(xiān kāi shǐ) / 对于新手来说。(duì yú xīn shǒu lái shuō)',
    spanish: 'Para empezar. / De momento.',
    vietnamese: 'Để bắt đầu nhé. / Trước mắt là.'
  },
  322: {
    japanese: '真っ先に（まっさきに）。／そもそも。',
    chinese: '起初。(qǐ chū) / 本来。(běn lái)',
    spanish: 'En primer lugar. / De buenas a primeras.',
    vietnamese: 'Ngay từ đầu. / Trước tiên hết.'
  },
  323: {
    japanese: '手始め（てはじめ）に。／導入（どうにゅう）として。',
    chinese: '开始。(kāi shǐ) / 第一步。(dì yī bù)',
    spanish: 'Para arrancar. / Empezando con.',
    vietnamese: 'Để khởi động. / Ngay lúc bắt đầu.'
  },
  324: {
    japanese: '第一（だいいち）に。／まず。',
    chinese: '第一。(dì yī) / 首先。(shǒu xiān)',
    spanish: 'Primero. / En primer lugar.',
    vietnamese: 'Thứ nhất. / Một là.'
  },
  325: {
    japanese: '第二（だいに）に。／次（つぎ）に。',
    chinese: '第二。(dì èr) / 其次。(qí cì)',
    spanish: 'Segundo. / En segundo lugar.',
    vietnamese: 'Thứ hai. / Hai là.'
  },
  326: {
    japanese: '第三（だいさん）に。／さらに。',
    chinese: '第三。(dì sān) / 再次。(zài cì)',
    spanish: 'Tercero. / En tercer lugar.',
    vietnamese: 'Thứ ba. / Ba là.'
  },
  327: {
    japanese: '次（つぎ）に。／続い（つづい）て。',
    chinese: '接下来。(jiē xià lái) / 其次。(qí cì)',
    spanish: 'A continuación. / El siguiente.',
    vietnamese: 'Tiếp theo. / Kế tiếp.'
  },
  328: {
    japanese: 'その後（ご）。／それから。',
    chinese: '然后。(rán hòu) / 接着。(jiē zhe)',
    spanish: 'Entonces. / Luego.',
    vietnamese: 'Sau đó. / Thế rồi.'
  },
  329: {
    japanese: 'その後（ご）。／結果（けっか）として。',
    chinese: '随后。(suí hòu) / 接下来的。(jiē xià lái de)',
    spanish: 'Posteriormente. / Seguidamente.',
    vietnamese: 'Sau này. / Tiếp theo đó.'
  },
  330: {
    japanese: '事後（じご）に。／後々（のちのち）。',
    chinese: '事后。(shì hòu) / 后来。(hòu lái)',
    spanish: 'Después. / Más tarde.',
    vietnamese: 'Sau chuyện đó. / Về sau.'
  },
  331: {
    japanese: '後で（あとで）。／いずれ。',
    chinese: '晚点。(wǎn diǎn) / 以后。(yǐ hòu)',
    spanish: 'Tarde. / Más adelante.',
    vietnamese: 'Lát nữa. / Về sau này.'
  },
  332: {
    japanese: 'それに続い（つづい）て。／二の足（にのあし）。',
    chinese: '紧接着。(jǐn jiē zhe) / 之后。(zhī hòu)',
    spanish: 'Siguiendo a eso. / Tras aquello.',
    vietnamese: 'Theo sau đó. / Tiếp nối chuyện đó.'
  },
  333: {
    japanese: 'その後（ご）。／次（つぎ）は。',
    chinese: '之后。(zhī hòu) / 然后。(rán hòu)',
    spanish: 'Después de eso. / Acto seguido.',
    vietnamese: 'Sau khi xong việc đó. / Đoạn sau.'
  },
  334: {
    japanese: 'その間（あいだ）に。／一方で（いっぽうで）。',
    chinese: '与此同时。(yǔ cǐ tóng shí) / 期间。(qī jiān)',
    spanish: 'Mientras tanto. / Entretanto.',
    vietnamese: 'Trong khi đó. / Trong lúc này.'
  },
  335: {
    japanese: '同時（どうじ）に。／合わせ（あわせ）て。',
    chinese: '同时。(tóng shí) / 也要。(yě yào)',
    spanish: 'Al mismo tiempo. / A la vez.',
    vietnamese: 'Cùng lúc. / Đồng thời.'
  },
  336: {
    japanese: '一斉（いっせい）に。／同時（どうじ）並行（へいこう）で。',
    chinese: '同步。(tóng bù) / 同时地。(tóng shí de)',
    spanish: 'Simultáneamente. / Al unísono.',
    vietnamese: 'Cùng một lúc. / Một cách đồng bộ.'
  },
  337: {
    japanese: '当座（とうざ）の間（あいだ）。／暫定（ざんてい）的（てき）に。',
    chinese: '暂时。(zàn shí) / 与此同时。(yǔ cǐ tóng shí)',
    spanish: 'Entretanto. / Por ahora.',
    vietnamese: 'Trong thời gian chờ đợi. / Tạm thời lúc này.'
  },
  338: {
    japanese: '同時（どうじ）に行（おこな）われる。／並行（へいこう）して。',
    chinese: '并行。(bìng xíng) / 同时地。(tóng shí de)',
    spanish: 'Concurrentemente. / Al mismo tiempo.',
    vietnamese: 'Song song với đó. / Đồng thời tiến hành.'
  },
  339: {
    japanese: '同時（どうじ）に。／一斉（いっせい）に。',
    chinese: '同步地。(tóng bù de) / 同时。(tóng shí)',
    spanish: 'De forma simultánea. / Al par.',
    vietnamese: 'Một cách đồng thời. / Cùng lúc luôn.'
  },
  340: {
    japanese: '現（げん）段階（だんかい）では。／ここに来（き）て。',
    chinese: '此时此刻。(cǐ shí cǐ kè) / 这会儿。(zhè huì er)',
    spanish: 'En este punto. / Llegados a este momento.',
    vietnamese: 'Tại thời điểm này. / Ngay lúc này đây.'
  },
  341: {
    japanese: 'あの時（とき）。／その昔（むかし）。',
    chinese: '在那时。(zài nà shí) / 以前。(yǐ qián)',
    spanish: 'Aquel entonces. / Por aquel tiempo.',
    vietnamese: 'Hồi ấy. / Ngày đó.'
  },
  342: {
    japanese: '当時（とうじ）。／その時（とき）。',
    chinese: '当时。(dāng shí) / 那会儿。(nà huì er)',
    spanish: 'En ese momento. / Por entonces.',
    vietnamese: 'Vào lúc đó. / Thời điểm ấy.'
  },
  343: {
    japanese: '古（ふる）き良（よ）き時代（じだい）。／当（とう）時（じ）。',
    chinese: '在那些日子里。(zài nà xiē rì zi lǐ) / 当年。(dāng nián)',
    spanish: 'En aquellos tiempos. / En aquella época.',
    vietnamese: 'Những ngày đó. / Thời bấy giờ.'
  },
  344: {
    japanese: '以前（いぜん）は。／かつては。',
    chinese: '以前。(yǐ qián) / 原来。(yuán lái)',
    spanish: 'Antiguamente. / Anteriormente.',
    vietnamese: 'Thuở trước. / Trước kia.'
  },
  345: {
    japanese: '以前（いぜん）に。／前（まえ）もって。',
    chinese: '之前。(zhī qián) / 原先。(yuán xiān)',
    spanish: 'Previamente. / Con anterioridad.',
    vietnamese: 'Sẵn rồi. / Đã làm trước đó.'
  },
  346: {
    japanese: '早い（はやい）段階（だんかい）で。／さっき。',
    chinese: '早点儿。(zǎo diǎnr) / 刚才。(gāng cái)',
    spanish: 'Más temprano. / Previamente.',
    vietnamese: 'Sớm hơn. / Lúc sớm.'
  },
  347: {
    japanese: '今（いま）まで。／ここまでは。',
    chinese: '直到现在。(zhí dào xiàn zài) / 目前。(mù qián)',
    spanish: 'Hasta ahora. / Hasta este momento.',
    vietnamese: 'Cho đến tận bây giờ. / Từ trước đến nay.'
  },
  348: {
    japanese: 'これまでのところ。／今（いま）のところ。',
    chinese: '目前为止。(mù qián wèi zhǐ) / 到现在。(dào xiàn zài)',
    spanish: 'Hasta el momento. / Por ahora.',
    vietnamese: 'Cho tới nay. / Hiện tại vẫn ổn.'
  },
  349: {
    japanese: 'これまでは。／今（いま）に至（いた）るまで。',
    chinese: '迄今。(qì jīn) / 至今。(zhì jīn)',
    spanish: 'Hasta la fecha. / Hasta ahora.',
    vietnamese: 'Từ bấy đến nay. / Cho đến thời điểm này.'
  },
  350: {
    japanese: 'まだ。／現（げん）時点（じてん）では。',
    chinese: '尚。(shàng) / 还。(hái)',
    spanish: 'Aún. / Todavía.',
    vietnamese: 'Vẫn chưa. / Tính đến lúc này.'
  },
  351: {
    japanese: 'これからは。／今（いま）後（ご）。',
    chinese: '从今往后。(cóng jīn wǎng hòu) / 以后。(yǐ hòu)',
    spanish: 'De ahora en adelante. / A partir de ahora.',
    vietnamese: 'Từ giờ trở đi. / Kể từ nay.'
  },
  352: {
    japanese: '以後（いご）。／これからずっと。',
    chinese: '从此。(cóng cǐ) / 今后。(jīn hòu)',
    spanish: 'De aquí en adelante. / En lo sucesivo.',
    vietnamese: 'Kể từ đây. / Từ nay về sau.'
  },
  353: {
    japanese: '今後（こんご）。／これ以降（いこう）。',
    chinese: '今后。(jīn hòu) / 以后。(yǐ hòu)',
    spanish: 'En el futuro. / De ahora en adelante.',
    vietnamese: 'Sau này. / Kể từ đây.'
  },
  354: {
    japanese: '将来（しょうらい）。／これからの時代（じだい）。',
    chinese: '未来。(wèi lái) / 以后。(yǐ hòu)',
    spanish: 'En el futuro. / Por venir.',
    vietnamese: 'Trong tương lai. / Mai này.'
  },
  355: {
    japanese: 'いずれ。／結局（けっきょく）は。',
    chinese: '最终。(zuì zhōng) / 迟早。(chí zǎo)',
    spanish: 'Con el tiempo. / Al final.',
    vietnamese: 'Cuối cùng thì. / Thế nào cũng đến lúc.'
  },
  356: {
    japanese: '究極（きゅうきょく）的（てき）には。／最後（さいご）には。',
    chinese: '终极。(zhōng jí) / 最终。(zuì zhōng)',
    spanish: 'En última instancia. / Al final.',
    vietnamese: 'Chung quy lại. / Sau cùng hết.'
  },
  357: {
    japanese: 'すぐに。／間もなく（まもなく）。',
    chinese: '很快。(hěn kuài) / 一会儿。(yí huì er)',
    spanish: 'Pronto. / En seguida.',
    vietnamese: 'Sắp rồi. / Một lát nữa thôi.'
  },
  358: {
    japanese: '手短（てみじか）に。／すぐに。',
    chinese: '不久。(bù jiǔ) / 很快。(hěn kuài)',
    spanish: 'Brevemente. / En poco tiempo.',
    vietnamese: 'Trong thời gian ngắn. / Chẳng bao lâu nữa.'
  },
  359: {
    japanese: 'そのうち。／近（ちか）いうちに。',
    chinese: '不久。(bù jiǔ) / 很快。(hěn kuài)',
    spanish: 'Dentro de poco. / No tardando mucho.',
    vietnamese: 'Sẽ sớm thôi. / Không lâu nữa đâu.'
  },
  360: {
    japanese: '今（いま）すぐ。／一瞬（いっしゅん）で。',
    chinese: '马上。(mǎ shàng) / 瞬间。(shùn jiān)',
    spanish: 'En un momento. / Un segundo.',
    vietnamese: 'Trong chốc lát. / Trong tích tắc.'
  },
  361: {
    japanese: 'しばらくしたら。／後で（あとで）。',
    chinese: '过会儿。(guò huì er) / 一会儿。(yí huì er)',
    spanish: 'Dentro de un rato. / En un tiempo.',
    vietnamese: 'Một lúc nữa. / Sau một thời gian ngắn.'
  },
  362: {
    japanese: '今（いま）にも。／すぐそこ。',
    chinese: '随时。(suí shí) / 马上。(mǎ shàng)',
    spanish: 'En cualquier momento. / Ya mismo.',
    vietnamese: 'Bất cứ lúc nào. / Ngay bây giờ đây.'
  },
  363: {
    japanese: '迅速（じんそく）に。／即座（そくざ）に。',
    chinese: '赶紧。(gǎn jǐn) / 及时。(jí shí)',
    spanish: 'Prontamente. / Sin demora.',
    vietnamese: 'Nhanh chóng. / Một cách kịp thời.'
  },
  364: {
    japanese: '即座（そくざ）に。／直ちに（ただちに）。',
    chinese: '立即。(lì jí) / 马上。(mǎ shàng)',
    spanish: 'Inmediatamente. / En el acto.',
    vietnamese: 'Ngay lập tức. / Tức thì.'
  },
  365: {
    japanese: '一斉（いっせい）に。／すぐ。',
    chinese: '立刻。(lì kè) / 同时。(tóng shí)',
    spanish: 'De inmediato. / A la vez.',
    vietnamese: 'Ngay tức khắc. / Một lần duy nhất.'
  },
  366: {
    japanese: '今（いま）すぐ。／即座（そくざ）に。',
    chinese: '马上。(mǎ shàng) / 立刻。(lì kè)',
    spanish: 'Ahora mismo. / En seguida.',
    vietnamese: 'Ngay bây giờ. / Làm luôn bây giờ.'
  },
  367: {
    japanese: '直ちに（ただちに）。／真っ（まっ）すぐ。',
    chinese: '直接。(zhí jiē) / 马上。(mǎ shàng)',
    spanish: 'Derecho. / De inmediato.',
    vietnamese: 'Thẳng tiến. / Làm liền không nghỉ.'
  },
  368: {
    japanese: '瞬時（しゅんじ）に。／即座（そくざ）に。',
    chinese: '瞬间。(shùn jiān) / 很快地。(hěn kuài de)',
    spanish: 'Al instante. / Instantáneamente.',
    vietnamese: 'Trong tích tắc. / Một cách tức thời.'
  },
  369: {
    japanese: '遅滞（ちたい）なく。／すぐに。',
    chinese: '毫不拖延。(háo bù tuō yán) / 及时。(jí shí)',
    spanish: 'Sin dilación. / Sin demora.',
    vietnamese: 'Không chậm trễ. / Làm ngay không hoãn.'
  },
  370: {
    japanese: 'やがて。／そのうち。',
    chinese: '到时。(dào shí) / 在适当的时候。(zài shì dàng de shí hou)',
    spanish: 'A su debido tiempo. / En su momento.',
    vietnamese: 'Đến đúng lúc. / Theo trình tự thời gian.'
  },
  371: {
    japanese: '間に合っ（まにあっ）て。／やがて。',
    chinese: '及时。(jí shí) / 准时。(zhǔn shí)',
    spanish: 'A tiempo. / Con el tiempo.',
    vietnamese: 'Kịp lúc. / Đúng thời điểm.'
  },
  372: {
    japanese: '不意に（ふいに）。／出し抜け（だしぬけ）に。',
    chinese: '突然之间。(tū rán zhī jiān) / 猛地。(měng de)',
    spanish: 'De repente. / De pronto.',
    vietnamese: 'Đột nhiên. / Bất thình lình.'
  },
  373: {
    japanese: '急（きゅう）に。／突如（とつじょ）。',
    chinese: '忽然。(hū rán) / 突然。(tū rán)',
    spanish: 'De repente. / Súbitamente.',
    vietnamese: 'Bỗng nhiên. / Một cách đột ngột.'
  },
  374: {
    japanese: '藪（やぶ）から棒（ぼう）に。／いきなり。',
    chinese: '冷不丁。(lěng bù dīng) / 突然。(tū rán)',
    spanish: 'De la nada. / Inesperadamente.',
    vietnamese: 'Từ trên trời rơi xuống. / Bất ngờ không tưởng.'
  },
  375: {
    japanese: '心当（こころあ）たりなく。／意外（いがい）にも。',
    chinese: '出乎意料。(chū hū yì liào) / 没想到。(méi xiǎng dào)',
    spanish: 'Inesperadamente. / De forma imprevista.',
    vietnamese: 'Một cách bất ngờ. / Ngoài dự tính.'
  },
  376: {
    japanese: 'ぶっきらぼうに。／急（きゅう）に。',
    chinese: '唐突。(táng tū) / 戛然而止。(jiá rán ér zhǐ)',
    spanish: 'Abruptamente. / Bruscamente.',
    vietnamese: 'Đột ngột dừng lại. / Một cách thô lỗ.'
  },
  377: {
    japanese: '徐々（じょじょ）に。／段階（だんかい）的（てき）に。',
    chinese: '逐渐。(zhú jiàn) / 渐渐。(jiàn jiàn)',
    spanish: 'Gradualmente. / Poco a poco.',
    vietnamese: 'Dần dần. / Một cách từ từ.'
  },
  378: {
    japanese: '一（いち）歩（ぽ）一（いち）歩（ぽ）。／着実（ちゃくじつ）に。',
    chinese: '循序渐进。(xún xù jiàn jìn) / 一步一步。(yí bù yí bù)',
    spanish: 'Paso a paso. / Gradualmente.',
    vietnamese: 'Từng bước một. / Chầm chậm mà chắc.'
  },
  379: {
    japanese: '少し（すこし）ずつ。／徐々（じょじょ）に。',
    chinese: '一点点。(yì diǎndiǎn) / 逐渐。(zhú jiàn)',
    spanish: 'Poco a poco. / Gradualmente.',
    vietnamese: 'Từng chút một. / Dần dà.'
  },
  380: {
    japanese: '少し（すこし）ずつ。／断片（だんぺん）的（てき）に。',
    chinese: '一点点。(yì diǎndiǎn) / 零碎地。(líng suì de)',
    spanish: 'Poco a poco. / Por partes.',
    vietnamese: 'Góp nhặt từng tí. / Chút một thôi.'
  },
  381: {
    japanese: 'じわじわと。／少し（すこし）ずつ。',
    chinese: '一点点。(yì diǎndiǎn) / 缓慢地。(huǎn màn de)',
    spanish: 'Centímetro a centímetro. / Lentamente.',
    vietnamese: 'Từng tấc một. / Cực kỳ chậm rãi.'
  },
  382: {
    japanese: '時（とき）が経つ（たつ）につれて。／月日（つきひ）とともに。',
    chinese: '随着时间的推移。(suí zhe shí jiān de tuī yí) / 慢慢地。(màn màn de)',
    spanish: 'Con el tiempo. / Según pasa el tiempo.',
    vietnamese: 'Theo thời gian. / Qua năm tháng.'
  },
  383: {
    japanese: '着実（ちゃくじつ）に。／絶（た）えず。',
    chinese: '稳步。(wěn bù) / 持续地。(chí xù de)',
    spanish: 'Constantemente. / Regularmente.',
    vietnamese: 'Một cách đều đặn. / Vững vàng.'
  },
  384: {
    japanese: '絶（た）えず。／いつも。',
    chinese: '总是一样。(zǒng shì yí yàng) / 经常。(jīng cháng)',
    spanish: 'Constantemente. / Continuamente.',
    vietnamese: 'Luôn luôn. / Liên tục không nghỉ.'
  },
  385: {
    japanese: '継続（けいぞく）的（てき）に。／ぶっ通（とお）しで。',
    chinese: '连续。(lián xù) / 一直。(yì zhí)',
    spanish: 'Continuamente. / Sin parar.',
    vietnamese: 'Một cách liên tục. / Không ngớt.'
  },
  386: {
    japanese: '永遠（えいえん）に。／絶（た）えることなく。',
    chinese: '永远。(yǒng yuǎn) / 无休止地。(wú xiū zhǐ de)',
    spanish: 'Perpetuamente. / Para siempre.',
    vietnamese: 'Vĩnh viễn. / Mãi mãi không dứt.'
  },
  387: {
    japanese: 'ひっきりなしに。／絶（た）え間（ま）なく。',
    chinese: '不停地。(bù tíng de) / 没完没了。(méi wán méi liǎo)',
    spanish: 'Incesantemente. / Sin tregua.',
    vietnamese: 'Không ngừng nghỉ. / Dồn dập.'
  },
  388: {
    japanese: '定期的（ていきてき）に。／規則（きそく）的（てき）に。',
    chinese: '定期。(dì qī) / 按时。(àn shí)',
    spanish: 'Regularmente. / Con frecuencia.',
    vietnamese: 'Đều đặn. / Một cách định kỳ.'
  },
  389: {
    japanese: '周期（しゅうき）的（てき）に。／節目（ふしめ）ごとに。',
    chinese: '阶段性地。(jiē duàn xìng de) / 偶尔。(ǒu ěr)',
    spanish: 'Periódicamente. / De vez en cuando.',
    vietnamese: 'Theo chu kỳ. / Từng giai đoạn.'
  },
  390: {
    japanese: '頻繁（ひんぱん）に。／しょっちゅう。',
    chinese: '频繁。(pín fán) / 经常。(jīng cháng)',
    spanish: 'Frecuentemente. / A menudo.',
    vietnamese: 'Thường xuyên. / Luôn miệng luôn tay.'
  },
  391: {
    japanese: 'よく。／しばしば。',
    chinese: '经常。(jīng cháng) / 老。(lǎo)',
    spanish: 'A menudo. / Muchas veces.',
    vietnamese: 'Hay làm vậy. / Thường là thế.'
  },
  392: {
    japanese: '時々（ときどき）。／たまに。',
    chinese: '偶尔。(ǒu ěr) / 有时候。(yǒu shí hou)',
    spanish: 'Ocasionalmente. / De vez en cuando.',
    vietnamese: 'Thỉnh thoảng. / Đôi khi.'
  },
  393: {
    japanese: 'いつか。／ある時（とき）。',
    chinese: '某个时候。(mǒu gè shí hou) / 改天。(gǎi tiān)',
    spanish: 'En algún momento. / Alguna vez.',
    vietnamese: 'Một lúc nào đó. / Khi nào đấy.'
  },
  394: {
    japanese: 'たまに。／時々（ときどき）。',
    chinese: '不时地。(bù shí de) / 偶尔。(ǒu ěr)',
    spanish: 'De vez en cuando. / Cada tanto.',
    vietnamese: 'Lúc có lúc không. / Bập bõm.'
  },
  395: {
    japanese: '折（おり）りに触（ふ）れて。／たまに。',
    chinese: '不时。(bù shí) / 断断续续。(duàn duàn xù xù)',
    spanish: 'De vez en cuando. / Esporádicamente.',
    vietnamese: 'Từng thời điểm. / Lâu lâu một lần.'
  },
  396: {
    japanese: 'ちょくちょく。／たまに。',
    chinese: '偶尔地。(ǒu ěr de) / 隔三差五。(gé sān chà wǔ)',
    spanish: 'Cada cierto tiempo. / Periódicamente.',
    vietnamese: 'Thường thường. / Hay hay.'
  },
  397: {
    japanese: 'ごくたまに。／忘（わす）れた頃（ころ）に。',
    chinese: '偶尔。(ǒu ěr) / 好不容易才一次。(hǎo bù róng yì cáiyí cì)',
    spanish: 'De higos a brevas. / Muy de vez en cuando.',
    vietnamese: 'Hiếm khi. / Năm thì mười họa.'
  },
  398: {
    japanese: 'めったに〜ない。／稀（まれ）だ。',
    chinese: '很少。(hěn shǎo) / 难得。(nán dé)',
    spanish: 'Casi nunca. / Rara vez.',
    vietnamese: 'Ít khi. / Hiếm hoi lắm.'
  },
  399: {
    japanese: '稀（まれ）に。／珍（めずら）しい。',
    chinese: '罕见。(hǎn jiàn) / 极少。(jí shǎo)',
    spanish: 'Raramente. / En raras ocasiones.',
    vietnamese: 'Thế giới ít khi thấy. / Cực kỳ hiếm.'
  },
  400: {
    japanese: 'ほとんど〜ない。／かろうじて。',
    chinese: '几乎不。(jī fǔ bù) / 勉强。(miǎn qiǎng)',
    spanish: 'Apenas. / Escasamente.',
    vietnamese: 'Hầu như không. / Chỉ vừa đủ.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 301-400 updated.');
