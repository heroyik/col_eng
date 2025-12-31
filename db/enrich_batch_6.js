const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  251: {
    japanese: 'ともかく。／いずれにしても。',
    chinese: '无论如何。(wú lùn rú hé) / 总之。(zǒng zhī)',
    spanish: 'En cualquier caso. / De todas formas.',
    vietnamese: 'Dù sao đi nữa. / Dù thế nào.'
  },
  252: {
    japanese: 'どっちにしろ。／どんな場合（ばあい）でも。',
    chinese: '不管怎样。(bù guǎn zěn yàng) / 总之。(zǒng zhī)',
    spanish: 'En todo caso. / Sea como sea.',
    vietnamese: 'Dù trong trường hợp nào. / Bất kể thế nào.'
  },
  253: {
    japanese: 'どうであれ。／事情（じじょう）がどうなろうと。',
    chinese: '不管是什么情况。(bù guǎn shì shén me qíng kuàng) / 无论如何。(wú lùn rú hé)',
    spanish: 'Sea cual sea el caso. / En cualquier situación.',
    vietnamese: 'Bất kể tình hình ra sao. / Dù chuyện gì xảy ra.'
  },
  254: {
    japanese: '何（なに）が何（なん）でも。／是（ぜ）が非（ひ）でも。',
    chinese: '无论如何。(wú lùn rú hé) / 不管怎样。(bù guǎn zěn yàng)',
    spanish: 'Pase lo que pase. / Sin importar qué.',
    vietnamese: 'Dù bất cứ chuyện gì. / Dù có thế nào đi nữa.'
  },
  255: {
    japanese: '〜に関（かか）わらず。／不問（ふもん）にして。',
    chinese: '不管。(bù guǎn) / 不顾。(bú gù)',
    spanish: 'Independientemente. / A pesar de todo.',
    vietnamese: 'Bất kể. / Mặc kệ.'
  },
  256: {
    japanese: 'とにかく。／何（なん）とかして。',
    chinese: '不管怎样。(bù guǎn zěn yàng) / 反正。(fǎn zhèng)',
    spanish: 'De todos modos. / Sea como fuere.',
    vietnamese: 'Dù sao thì. / Thế nào cũng được.'
  },
  257: {
    japanese: 'とにかく。／それより。',
    chinese: '反正。(fǎn zhèng) / 总之。(zǒng zhī)',
    spanish: 'De todas formas. / En fin.',
    vietnamese: 'Dù sao. / Mà thôi.'
  },
  258: {
    japanese: 'ところで。／ついでに言（い）えば。',
    chinese: '顺便说一下。(shùn biàn shuō yí xià) / 对了。(duì le)',
    spanish: 'Por cierto. / A propósito.',
    vietnamese: 'Nhân tiện. / À mà này.'
  },
  259: {
    japanese: 'ついでながら。／ちなみに。',
    chinese: '顺便。(shùn biàn) / 偶然地。(ǒu rán de)',
    spanish: 'Incidentalmente. / Dicho de paso.',
    vietnamese: 'Tiện thể. / Ngẫu nhiên là.'
  },
  260: {
    japanese: '話（はなし）は変わり（かわり）ますが。／別（べつ）の視点（してん）で。',
    chinese: '换个话题。(huàn gè huà tí) / 另外。(lìng wài)',
    spanish: 'Cambiando de tema. / En otro orden de cosas.',
    vietnamese: 'Sang một chuyện khác. / Nói về chuyện khác.'
  },
  261: {
    japanese: '話題（わだい）を変え（かえ）て。／話（はなし）をそらして。',
    chinese: '转移话题。(zhuǎn yí huà tí) / 换个说法。(huàn gè shuō fǎ)',
    spanish: 'Cambiando de asunto. / Para cambiar de tema.',
    vietnamese: 'Đổi chủ đề. / Chuyển sang chuyện khác.'
  },
  262: {
    japanese: 'そう言（い）えば。／それに関（かん）して。',
    chinese: '说到这个。(shuō dào zhè ge) / 提起来。(tí qǐ lái)',
    spanish: 'Hablando de lo cual. / A propósito de eso.',
    vietnamese: 'Nhắc mới nhớ. / Nói đến chuyện đó.'
  },
  263: {
    japanese: '思い出し（おもいだし）ているうちに。／忘れ（わすれ）ないうちに。',
    chinese: '趁还没忘。(chèn hái méi wàng) / 想起来的时候。(xiǎng qǐ lái de shí hou)',
    spanish: 'Mientras me acuerdo. / Antes de que se me pase.',
    vietnamese: 'Nhân lúc còn nhớ. / Trong khi tôi còn đang nhớ.'
  },
  264: {
    japanese: '忘れ（わすれ）ないうちに。／とりあえず言（い）っておくよ。',
    chinese: '趁还没忘。(chèn hái méi wàng) / 赶紧说。(gǎn jǐn shuō)',
    spanish: 'Antes de que se me olvide. / Para que no se me olvide.',
    vietnamese: 'Trước khi tôi quên. / Để tôi nói luôn kẻo quên.'
  },
  265: {
    japanese: '補足（ほそく）ですが。／余談（よだん）ですが。',
    chinese: '顺便提一句。(shùn biàn tí yí jù) / 补充一点。(bǔ chōng yì diǎn)',
    spanish: 'Como nota al margen. / Como comentario adicional.',
    vietnamese: 'Nói thêm một chút. / Chú thích thêm là.'
  },
  266: {
    japanese: '（括弧（かっこ）書き（がき）的に）／ちなみに。',
    chinese: '顺带。(shùn dài) / 括注。(kuò zhù)',
    spanish: 'Entre paréntesis. / Incidentalmente.',
    vietnamese: 'Nói ngoài lề một chút. / Mở ngoặc là.'
  },
  267: {
    japanese: '補足（ほそく）として。／ついでに。',
    chinese: '顺便说。(shùn biàn shuō) / 插入一点。(chā rù yì diǎn)',
    spanish: 'A modo de paréntesis. / Abriendo un paréntesis.',
    vietnamese: 'Nhân tiện nói thêm. / Để bổ sung thêm.'
  },
  268: {
    japanese: '話（はなし）が逸れ（それ）ますが。／脱線（だっせん）して。',
    chinese: '扯远了。(chě yuǎn le) / 跑题。(pǎo tí)',
    spanish: 'Para divagar un poco. / Me estoy desviando.',
    vietnamese: 'Lạc đề một chút. / Nói ra ngoài lề.'
  },
  269: {
    japanese: '本題（ほんだい）に戻る（もどる）と。／要（よう）するに。',
    chinese: '言归正传。(yán guī zhèng zhuàn) / 回到正题。(huí dào zhèng tí)',
    spanish: 'Volviendo al tema. / Retomando el hilo.',
    vietnamese: 'Quay lại vấn đề chính. / Trở lại chuyện lúc nãy.'
  },
  270: {
    japanese: '本題（ほんだい）に戻っ（もどっ）て。／やり直（なお）して。',
    chinese: '回到话题上来。(huí dào huà tí shàng lái) / 还是刚才那件事。(hái shì gāng cái nà jiàn shì)',
    spanish: 'Para volver al asunto. / Retomando el tema.',
    vietnamese: 'Trở lại chủ đề. / Quay về chuyện cũ.'
  },
  271: {
    japanese: 'とにかく、さっきの続き（つづき）だけど。／話（はなし）を戻（もど）すと。',
    chinese: '总之，刚才说到哪儿了。(zǒng zhī, gāng cái shuō dào nǎr le) / 接着说。(jiē zhe shuō)',
    spanish: 'En fin, como iba diciendo. / Volviendo a lo anterior.',
    vietnamese: 'Dù sao thì, như tôi đang nói. / Trở lại chuyện đang nói dở.'
  },
  272: {
    japanese: '話（はなし）を戻（もど）すけど。／さっき言（い）った通（どお）り。',
    chinese: '回到刚才的话话题。(huí dào gāng cái de huà huà tí) / 还是那句话。(hái shì nà jù huà)',
    spanish: 'Volviendo a lo que decía. / Retomando mis palabras.',
    vietnamese: 'Quay lại điều tôi vừa nói. / Trở về ý lúc nãy.'
  },
  273: {
    japanese: '再開（さいかい）する。／続き（つづき）から。',
    chinese: '继续。(jì xù) / 恢复。(huī fù)',
    spanish: 'Resumiendo. / Reanudando.',
    vietnamese: 'Tiếp tục. / Bắt đầu lại.'
  },
  274: {
    japanese: '中断（ちゅうだん）したところから始（はじ）める。／続き（つづき）を。',
    chinese: '从刚才中断的地方继续。(cóng gāng cái zhōng duàn de dì fang jì xù) / 接着来。(jiē zhe lái)',
    spanish: 'Para retomar donde lo dejamos. / Continuando desde el final.',
    vietnamese: 'Bắt đầu từ chỗ tạm dừng. / Tiếp tục từ lúc nãy.'
  },
  275: {
    japanese: 'どこまで話（はな）したっけ？／何（なに）言（い）ってた？',
    chinese: '我说到哪儿了？(wǒ shuō dào nǎr le) / 刚才在说什么？(gāng cái zài shuō shén me)',
    spanish: '¿Por dónde iba? / ¿Qué estaba diciendo?',
    vietnamese: 'Tôi đang nói đến đâu rồi nhỉ? / Lúc nãy tôi nói gì ấy nhỉ?'
  },
  276: {
    japanese: '前（まえ）に言（い）ったように。／さっき触（ふ）れた通（どお）り。',
    chinese: '就像我刚才提到的。(jiù xiàng wǒ gāng cái tí dào de) / 之前说过。(zhī qián shuō guò)',
    spanish: 'Como mencioné antes. / Como ya dije.',
    vietnamese: 'Như tôi đã nói lúc trước. / Như tôi vừa đề cập.'
  },
  277: {
    japanese: '既（すで）に述（の）べた通（どお）り。／前述（ぜんじゅつ）のよう。',
    chinese: '正如之前所说。(zhèng rú zhī qián suǒ shuō) / 已经说过了。(yǐ jīng shuō guò le)',
    spanish: 'Como se declaró anteriormente. / Según lo dicho.',
    vietnamese: 'Như đã khẳng định trước đó. / Đúng như lời đã nói.'
  },
  278: {
    japanese: '前（まえ）にも言（い）った通（どお）り。／私（わたし）が言（い）ったように。',
    chinese: '就像我说的。(jiù xiàng wǒ shuō de) / 我说过吧。(wǒ shuō guò ba)',
    spanish: 'Como yo decía. / Lo que te dije.',
    vietnamese: 'Như tôi đã nói. / Giống như lời tôi bảo.'
  },
  279: {
    japanese: '上（うえ）に書い（かい）た通（どお）り。／記述（きじゅつ）の通（どお）り。',
    chinese: '如上所述。(rú shàng suǒ shù) / 上面提到的。(shàng miàn tí dào de)',
    spanish: 'Como se indicó arriba. / Según la nota anterior.',
    vietnamese: 'Như đã ghi chú bên trên. / Theo như nội dung trên.'
  },
  280: {
    japanese: '繰り（くり）返（かえ）しになるけど。／もう一度（いちど）言（い）うよ。',
    chinese: '重复一遍。(chóng fù yí biàn) / 再说一次。(zài shuō yí cì)',
    spanish: 'Para repetir. / Reitero.',
    vietnamese: 'Để nhắc lại một lần nữa. / Tôi xin được lặp lại.'
  },
  281: {
    japanese: '結論（けつろん）として。／最後（さいご）に。',
    chinese: '最后。(zuì hòu) / 结论是。(jié lùn shì)',
    spanish: 'En conclusión. / Para terminar.',
    vietnamese: 'Để kết luận. / Tóm lại là.'
  },
  282: {
    japanese: '締めくくり（しめくくり）に。／最後（さいご）に言（い）えば。',
    chinese: '最后。(zuì hòu) / 结束语。(jié shù yǔ)',
    spanish: 'Para concluir. / En resumidas cuentas.',
    vietnamese: 'Để kết thúc. / Thay lời kết.'
  },
  283: {
    japanese: '要約（ようやく）すると。／まとめると。',
    chinese: '总结一下。(zǒng jié yí xià) / 综上所述。(zōng shàng suǒ shù)',
    spanish: 'Para resumir. / En resumen.',
    vietnamese: 'Để tóm lược lại. / Tổng kết lại thì.'
  },
  284: {
    japanese: '要約（ようやく）すると。／手短（てみじか）に言（い）えば。',
    chinese: '概要。(gài yào) / 总之。(zǒng zhī)',
    spanish: 'En resumen. / En síntesis.',
    vietnamese: 'Nói tóm tắt. / Một cách vắn tắt.'
  },
  285: {
    japanese: 'まとめると。／締め（しめ）に。',
    chinese: '总而言之。(zǒng ér yán zhī) / 总结。(zǒng jié)',
    spanish: 'Resumiendo. / Haciendo un balance.',
    vietnamese: 'Tổng hợp lại. / Đúc kết lại.'
  },
  286: {
    japanese: '手短（てみじか）に言（い）うと。／簡潔（かんけつ）に。',
    chinese: '简而言之。(jiǎn ér yán zhī) / 简短地。(jiǎn duǎn de)',
    spanish: 'Brevemente. / En pocas palabras.',
    vietnamese: 'Một cách ngắn gọn. / Vắn tắt thôi.'
  },
  287: {
    japanese: '手短（てみじか）に。／要点（ようてん）だけ言（い）うと。',
    chinese: '简短说。(jiǎn duǎn shuō) / 三言两语。(sān yán liǎng yǔ)',
    spanish: 'En breve. / Sucintamente.',
    vietnamese: 'Nói nhanh thôi. / Sơ lược là.'
  },
  288: {
    japanese: '要（よう）するに。／ひと言（こと）で言（い）えば。',
    chinese: '简而言之。(jiǎn ér yán zhī) / 一言以蔽之。(yī yán yǐ bì zhī)',
    spanish: 'En pocas palabras. / En resumidas cuentas.',
    vietnamese: 'Nói một cách dễ hiểu nhất. / Tóm lại trong một từ.'
  },
  289: {
    japanese: 'かいつまんで言（い）うと。／手短（てみじか）な話（はなし）。',
    chinese: '长话短说。(cháng huà duǎn shuō) / 简单说。(jiǎn dān shuō)',
    spanish: 'Para abreviar. / Para no alargar el cuento.',
    vietnamese: 'Nói ngắn gọn cho dễ hiểu. / Chuyện dài nói ngắn lại.'
  },
  290: {
    japanese: '基本（きほん）的（てき）には。／要（よう）は。',
    chinese: '基本上。(jī běn shàng) / 大体上。(dà tǐ shàng)',
    spanish: 'Básicamente. / Fundamentalmente.',
    vietnamese: 'Về cơ bản. / Cốt yếu là.'
  },
  291: {
    japanese: '全体（ぜんたい）的（てき）に。／総括（そうかつ）して。',
    chinese: '总的来说。(zǒng de lái shuō) / 全面地。(quán miàn de)',
    spanish: 'En general. / Globalmente.',
    vietnamese: 'Tính chung lại. / Nhìn chung.'
  },
  292: {
    japanese: '一般（いっぱん）的（てき）に言（い）えば。／概（おおむ）ね。',
    chinese: '一般而言。(yì bān ér yán) / 大体上。(dà tǐ shàng)',
    spanish: 'En líneas generales. / Por lo común.',
    vietnamese: 'Nói một cách tổng quát. / Thông thường thì.'
  },
  293: {
    japanese: '概（おおむ）ね。／全（ぜん）般（ぱん）的（てき）に。',
    chinese: '大体上。(dà tǐ shàng) / 总体上。(zǒng tǐ shàng)',
    spanish: 'En general. / Por lo pronto.',
    vietnamese: 'Nhìn chung là. / Đại thể là.'
  },
  294: {
    japanese: '大部分（だいぶぶん）は。／ほとんどの場合（ばあい）。',
    chinese: '在很大程度上。(zài hěn dà chéng dù shàng) / 主要是。(zhǔ yào shì)',
    spanish: 'En su mayor parte. / Principalmente.',
    vietnamese: 'Phần lớn là. / Đa số trường hợp.'
  },
  295: {
    japanese: '全（ぜん）体（たい）を通（とお）して。／概（おおむ）ね。',
    chinese: '总体而言。(zǒng tǐ ér yán) / 全面来看。(quán miàn lái kàn)',
    spanish: 'En conjunto. / En su totalidad.',
    vietnamese: 'Tựu trung lại. / Xét về tổng thể.'
  },
  296: {
    japanese: '一般（いっぱん）に。／世（よ）間（けん）一般（いっぱん）では。',
    chinese: '一般地。(yì bān de) / 普遍。(pǔ biàn)',
    spanish: 'En general. / Comúnmente.',
    vietnamese: 'Nói chung. / Phổ biến là.'
  },
  297: {
    japanese: '全体（ぜんたい）一丸（いちがん）となって。／ひとまとめに。',
    chinese: '作为整体。(zuò wéi zhěng tǐ) / 全部。(quán bù)',
    spanish: 'Como un todo. / En bloque.',
    vietnamese: 'Như một khối thống nhất. / Toàn bộ.'
  },
  298: {
    japanese: '結局（けっきょく）。／色々（いろいろ）あったけど。',
    chinese: '总而言之。(zǒng ér yán zhī) / 全部。(quán bù)',
    spanish: 'En total. / A fin de cuentas.',
    vietnamese: 'Sau tất cả. / Tóm lại mọi chuyện.'
  },
  299: {
    japanese: '締めくくる（しめくくる）と。／まとめとして。',
    chinese: '总结一下。(zǒng jié yí xià) / 收尾。(shōu wěi)',
    spanish: 'Para terminar. / Concluyendo.',
    vietnamese: 'Để kết thúc lại. / Gói gọn lại.'
  },
  300: {
    japanese: '最後（さいご）に。／いよいよ。',
    chinese: '最后。(zuì hòu) / 终于。(zhōng yú)',
    spanish: 'Finalmente. / Por fin.',
    vietnamese: 'Cuối cùng. / Sau cùng.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 251-300 updated.');
