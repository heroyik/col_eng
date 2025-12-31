const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  151: {
    japanese: '搭乗（とうじょう）は何（なん）時（じ）からですか？／いつから乗（の）れますか？',
    chinese: '什么时候登机？(shén me shí hou dēng jī) / 几点开始登机？(jǐ diǎn kāi shǐ dēng jī)',
    spanish: '¿Cuándo es el embarque? / ¿A qué hora empezamos a embarcar?',
    vietnamese: 'Khi nào bắt đầu lên máy bay? / Giờ khởi hành là lúc nào vậy?'
  },
  152: {
    japanese: '予定（よてい）通（どお）りですか？／遅（おく）れはないですか？',
    chinese: '航班准点吗？(háng bān zhǔn diǎn ma) / 会延迟吗？(huì yán chí ma)',
    spanish: '¿El vuelo sale a tiempo? / ¿Hay algún retraso?',
    vietnamese: 'Chuyến bay có đúng giờ không? / Có bị hoãn chuyến không ạ?'
  },
  153: {
    japanese: 'いい考え（かんがえ）があるよ。／こうしよう。',
    chinese: '我有个主意。(wǒ yǒu gè zhǔ yi) / 听我说。(tīng wǒ shuō)',
    spanish: 'Te voy a decir una cosa. / Mira lo que vamos a hacer.',
    vietnamese: 'Tôi có ý này. / Nghe tôi nói thế này nhé.'
  },
  154: {
    japanese: 'よろしければ。／お好（この）みなら。',
    chinese: '如果你愿意的话。(rú guǒ nǐ yuàn yì de huà) / 随你便。(suí nǐ biàn)',
    spanish: 'Si quieres. / Si te parece bien.',
    vietnamese: 'Nếu bạn thích. / Nếu bạn muốn như vậy.'
  },
  155: {
    japanese: 'ある意味（いみ）では。／見方（みかた）によっては。',
    chinese: '某种程度上说。(mǒu zhǒng chéng dù shàng shuō) / 说起来。(shuō qǐ lái)',
    spanish: 'En cierto modo. / De alguna manera.',
    vietnamese: 'Theo một cách nào đó. / Ở một khía cạnh nào đấy.'
  },
  156: {
    japanese: 'いくつかの点（てん）で。／部分（ぶぶん）的（てき）には。',
    chinese: '在某些方面。(zài mǒu xiē fāng miàn) / 挺像的。(tǐng xiàng de)',
    spanish: 'En algunos aspectos. / De algunas formas.',
    vietnamese: 'Ở vài góc độ. / Trong một số trường hợp.'
  },
  157: {
    japanese: '言い換えれば（いいかえれば）。／つまり。',
    chinese: '换句话说。(huàn jù huà shuō) / 也就是说。(yě jiù shì shuō)',
    spanish: 'En otras palabras. / O sea.',
    vietnamese: 'Nói cách khác. / Tức là thế này.'
  },
  158: {
    japanese: 'すなわち。／要（よう）するに。',
    chinese: '就是说。(jiù shì shuō) / 正是。(zhèng shì)',
    spanish: 'Es decir. / Esto es.',
    vietnamese: 'Có nghĩa là. / Nói đúng ra là.'
  },
  159: {
    japanese: 'いわば。／例（たと）えて言（い）えば。',
    chinese: '可以说。(kě yǐ shuō) / 所谓。(suǒ wèi)',
    spanish: 'Por así decirlo. / Como quien dice.',
    vietnamese: 'Có thể nói là. / Ví như là.'
  },
  160: {
    japanese: '厳密（げんみつ）に言（い）えば。／正確（せいかく）には。',
    chinese: '严格来说。(yán gé lái shuō) / 说实话。(shuō shí huà)',
    spanish: 'Estrictamente hablando. / Para ser exactos.',
    vietnamese: 'Nói một cách chính xác. / Chi li ra mà nói.'
  },
  161: {
    japanese: '実（じつ）は。／実際（じっさい）のところ。',
    chinese: '事实上。(shì shí shàng) / 其实。(qí shí)',
    spanish: 'De hecho. / En realidad.',
    vietnamese: 'Thực tế là. / Thật ra thì.'
  },
  162: {
    japanese: 'そういえば。／考（かんが）えてみると。',
    chinese: '想起来了。(xiǎng qǐ lái le) / 说起来。(shuō qǐ lái)',
    spanish: 'Ahora que lo pienso. / Pensándolo bien.',
    vietnamese: 'Nghĩ lại thì. / Sực nhớ ra là.'
  },
  163: {
    japanese: '回想（かいそう）すると。／あの時（とき）を思（おも）い出（だ）すと。',
    chinese: '回想起来。(huí xiǎng qǐ lái) / 以前。(yǐ qián)',
    spanish: 'Recordando. / Mirando hacia atrás.',
    vietnamese: 'Nghĩ về hồi đó. / Hồi tưởng lại.'
  },
  164: {
    japanese: '振り返って（ふりかえって）みると。／過去（かこ）を想（おも）う。',
    chinese: '回头看。(huí tóu kàn) / 往事。(wǎng shì)',
    spanish: 'Echando la vista atrás. / Al mirar al pasado.',
    vietnamese: 'Nhìn lại chặng đường đã qua. / Xem lại quá khứ.'
  },
  165: {
    japanese: 'やっぱり。／考（かんが）え直（なお）すと。',
    chinese: '转念一想。(zhuǎn niàn yì xiǎng) / 还是...吧。(hái shì... ba)',
    spanish: 'Pensándolo mejor. / Cambiando de opinión.',
    vietnamese: 'Suy nghĩ lại thì. / Đổi ý rồi.'
  },
  166: {
    japanese: '総合（そうごう）的（てき）に判断（はんだん）すると。／全（ぜん）体（たい）を通（とお）して。',
    chinese: '综合考虑。(zōng hé kǎo lǜ) / 全面来看。(quán miàn lái kàn)',
    spanish: 'Teniéndolo todo en cuenta. / Considerando todo.',
    vietnamese: 'Xét một cách toàn diện. / Sau khi cân nhắc mọi thứ.'
  },
  167: {
    japanese: 'あらゆる要素（ようそ）を考慮（こうりょ）して。／全（ぜん）部（ぶ）含（ふく）めて。',
    chinese: '把所有因素都考虑在内。(bǎ suǒ yǒu yīn sù dōu kǎo lǜ zài nèi) / 考虑到。(kǎo lǜ dào)',
    spanish: 'Tomando todo en consideración. / Analizando cada detalle.',
    vietnamese: 'Tính đến mọi khía cạnh. / Sau khi tính toán hết mọi việc.'
  },
  168: {
    japanese: '結局（けっきょく）のところ。／最後（さいご）には。',
    chinese: '归根结底。(guī gēn jié dǐ) / 到头来。(dào tóu lái)',
    spanish: 'Al fin y al cabo. / Al final del día.',
    vietnamese: 'Cuối cùng thì. / Chung quy lại là.'
  },
  169: {
    japanese: '最後（さいご）の最後（さいご）には。／詰（つ）まるところ。',
    chinese: '说到底。(shuō dào dǐ) / 最终。(zuì zhōng)',
    spanish: 'En última instancia. / Cuando todo está dicho y hecho.',
    vietnamese: 'Sau tất cả mọi chuyện. / Kết luận lại là.'
  },
  170: {
    japanese: '私（わたし）に言（い）わせれば。／私（わたし）としては。',
    chinese: '就我而言。(jiù wǒ ér yán) / 在我看来。(zài wǒ kàn lái)',
    spanish: 'Por lo que a mí respecta. / En cuanto a mí.',
    vietnamese: 'Đối với cá nhân tôi. / Về phần mình.'
  },
  171: {
    japanese: '私（わたし）の意見（いけん）では。／私（わたし）の考（かんが）え。',
    chinese: '依我看。(yī wǒ kàn) / 我的意见是。(wǒ de yì jiàn shì)',
    spanish: 'En mi opinión. / A mi parecer.',
    vietnamese: 'Theo ý kiến của tôi. / Tôi nghĩ là.'
  },
  172: {
    japanese: '私（わたし）の知（し）る限（かぎ）り。／知（し）っていること。',
    chinese: '据我所知。(jù wǒ suǒ zhī) / 了解到的信息。(liǎo jiě dào de xìn xī)',
    spanish: 'Que yo sepa. / Según tengo entendido.',
    vietnamese: 'Theo những gì tôi biết. / Theo sự hiểu biết của tôi.'
  },
  173: {
    japanese: '私（わたし）が把握（はあく）している範囲（はんい）では。／わかっているのは。',
    chinese: '就我了解的情况。(jiù wǒ liǎo jiě de qíng kuàng) / 据知。(jù zhī)',
    spanish: 'Hasta donde yo sé. / Por lo que sé.',
    vietnamese: 'Nội trong tầm hiểu biết của tôi. / Biết được là.'
  },
  174: {
    japanese: '知（し）り得（え）る限（かぎ）り。／おそらく。',
    chinese: '据我所能了解的。(jù wǒ suǒ néng liǎo jiě de) / 也许。(yě xǔ)',
    spanish: 'Por todo lo que sé. / A juzgar por lo que sé.',
    vietnamese: 'Biết đâu đấy. / Có lẽ là vậy.'
  },
  175: {
    japanese: '間違っ（まちがっ）ていたら指摘（してき）して。／正（ただ）してほしいんだけど。',
    chinese: '如果我错了请纠正。(rú guǒ wǒ cuò le qǐng jiū zhèng) / 请指正。(qǐng zhǐ zhèng)',
    spanish: 'Corrígeme si me equivoco. / Si no estoy en lo cierto, dímelo.',
    vietnamese: 'Sửa cho tôi nếu tôi nói sai nhé. / Nếu tôi nhầm thì nhắc tôi với.'
  },
  176: {
    japanese: 'もし勘違（かんちが）いでなければ。／正（ただ）しければ。',
    chinese: '如果没有弄错的话。(rú guǒ méi yǒu nòng cuò de huà) / 没记错的话。(méi jì cuò de huà)',
    spanish: 'Si no me equivoco. / Salvo error por mi parte.',
    vietnamese: 'Nếu tôi không nhầm. / Nếu trí nhớ của tôi còn tốt.'
  },
  177: {
    japanese: '間違っ（まちがっ）ているかもしれないけど。／自信（じしん）はないけど。',
    chinese: '也许我错了，但...(yě xǔ wǒ cuò le, dàn...) / 也不一定。(yě bù yí dìng)',
    spanish: 'Igual me equivoco, pero... / Puede que falle, pero...',
    vietnamese: 'Có thể tôi sai, nhưng mà... / Tôi có thể nhầm, nhưng...'
  },
  178: {
    japanese: 'そんな予感（よかん）がする。／気（き）がする。',
    chinese: '我有种感觉。(wǒ yǒu zhǒng gǎn jué) / 直觉告诉我。(zhí jué gào su wǒ)',
    spanish: 'Tengo la sensación de que... / Me da la impresión.',
    vietnamese: 'Tôi có cảm giác là... / Hình như là vậy.'
  },
  179: {
    japanese: '私（わたし）の推測（すいそく）では。／たぶん。',
    chinese: '我的猜测是。(wǒ de cāi cè shì) / 或者是。(huò zhě shì)',
    spanish: 'Mi apuesta es que... / Yo diría que...',
    vietnamese: 'Dự đoán của tôi là... / Tôi đoán là.'
  },
  180: {
    japanese: '十中八九（じゅっちゅうはっく）。／おそらく。',
    chinese: '很可能。(hěn kě néng) / 八成。(bā chéng)',
    spanish: 'Lo más probable es que... / Las probabilidades son que...',
    vietnamese: 'Nhiều khả năng là. / Tỷ lệ cao là vậy.'
  },
  181: {
    japanese: '高（たか）い確率（かくりつ）で。／まず間違（まちが）いなく。',
    chinese: '极有可能。(jí yǒu kě néng) / 差不多。(chà bù duō)',
    spanish: 'Lo más seguro. / Muy probablemente.',
    vietnamese: 'Rất có thể. / Khả năng cao nhất.'
  },
  182: {
    japanese: '十中八九（じゅっちゅうはっく）。／まず大体（だいたい）。',
    chinese: '全凭运气。(quán píng yùn qi) / 没准儿。(méi zhǔnr)',
    spanish: 'Con toda probabilidad. / Lo más factible.',
    vietnamese: 'Trong mọi khả năng. / Gần như chắc chắn.'
  },
  183: {
    japanese: 'かなり見込（みこ）みがある。／いい線（せん）いってる。',
    chinese: '很有机会。(hěn yǒu jī huì) / 有戏。(yǒu xì)',
    spanish: 'Hay muchas posibilidades. / Tiene buena pinta.',
    vietnamese: 'Có cơ hội tốt đấy. / Khả năng thành công cao.'
  },
  184: {
    japanese: 'まず間違（まちが）いない。／確実（かくじつ）だ。',
    chinese: '准没错。(zhǔn méi cuò) / 板上钉钉。(bǎn shàng dìng dīng)',
    spanish: 'Es una apuesta segura. / No hay pérdida.',
    vietnamese: 'Chắc chắn là vậy. / Cá là như thế luôn.'
  },
  185: {
    japanese: '驚（おどろ）かないよ。／あり得（え）る話（はなし）だ。',
    chinese: '我并不意外。(wǒ bìng bù yì wài) / 意料之中。(yì liào zhī zhōng)',
    spanish: 'No me extrañaría si... / No me sorprendería.',
    vietnamese: 'Tôi cũng không ngạc nhiên đâu. / Chuyện thường thôi mà.'
  },
  186: {
    japanese: '驚（おどろ）くには当たらない（あたらない）。／当然（とうぜん）だ。',
    chinese: '难怪。(nán guài) / 怪不得。(guài bù dé)',
    spanish: 'Con razón. / No es de extrañar que...',
    vietnamese: 'Thảo nào. / Hèn chi mà như vậy.'
  },
  187: {
    japanese: '道理（どうり）で。／なるほど。',
    chinese: '难怪。(nán guài) / 怪不得。(guài bù dé)',
    spanish: 'No me extraña. / Lógico.',
    vietnamese: 'Ả, hèn gì. / Hiểu tại sao rồi.'
  },
  188: {
    japanese: '不思議（ふしぎ）ではない。／わずかな驚（おどろ）きもない。',
    chinese: '不足为奇。(bù zú wéi qí) / 没什么大惊小怪的。(méi shén me dà jīng xiǎo guài de)',
    spanish: 'Casi nada. / Poco de extrañar.',
    vietnamese: 'Chẳng có gì lạ. / Điều hiển nhiên thôi.'
  },
  189: {
    japanese: '間違い（まちがい）なく。／疑（うたが）いようがない。',
    chinese: '无疑。(wú yí) / 肯定。(kěn dìng)',
    spanish: 'Sin duda. / Sin asomo de duda.',
    vietnamese: 'Không nghi ngờ gì nữa. / Chắc chắn rồi.'
  },
  190: {
    japanese: '疑（うたが）いもなく。／絶対（ぜったい）に。',
    chinese: '毫无疑问。(háo wú yí wèn) / 确凿。(què záo)',
    spanish: 'Sin ninguna duda. / Indudablemente.',
    vietnamese: 'Hoàn toàn không nghi ngờ. / Tuyệt đối tin tưởng.'
  },
  191: {
    japanese: '一片（いっぺん）の疑（うたが）いもない。／完璧（かんぺき）だ。',
    chinese: '无可置疑。(wú kě zhì yí) / 绝对可靠。(jué duì kě kào)',
    spanish: 'Más allá de toda duda. / Sin sombra de duda.',
    vietnamese: 'Không một chút nghi ngờ. / Rõ rành rành luôn.'
  },
  192: {
    japanese: '勘違（かんちが）いしないで。／はっきりさせておくよ。',
    chinese: '别搞错了。(bié gǎo cuò le) / 认清楚。(rèn qīng chu)',
    spanish: 'No te confundas. / No te equivoques.',
    vietnamese: 'Đừng có lầm tưởng. / Hãy nhớ cho kỹ này.'
  },
  193: {
    japanese: 'それはそれとして。／たとえそうであっても。',
    chinese: '即便如此。(jí biàn rú cǐ) / 话虽如此。(huà suī rú cǐ)',
    spanish: 'Sea como fuere. / Dicho lo cual.',
    vietnamese: 'Dù có như vậy đi chăng nữa. / Cho dù là thế.'
  },
  194: {
    japanese: 'そうは言（い）っても。／とはいえ。',
    chinese: '虽说如此。(suī shuō rú cǐ) / 但是。(dàn shì)',
    spanish: 'Dicho esto. / No obstante.',
    vietnamese: 'Nói thì nói vậy nhưng... / Tuy nhiên.'
  },
  195: {
    japanese: 'と言（い）うものの。／前（まえ）の言葉（ことば）を受（う）けて。',
    chinese: '既然这么说了。(jì rán zhè me shuō le) / 话说回来。(huà shuō huí lái)',
    spanish: 'Habiendo dicho eso. / Con todo.',
    vietnamese: 'Dù đã nói như vậy. / Mặc dù vậy.'
  },
  196: {
    japanese: 'それでも。／やはり。',
    chinese: '即使这样。(jí shǐ zhè yàng) / 依然。(yī rán)',
    spanish: 'Aun así. / Con todo y con eso.',
    vietnamese: 'Cho dù vậy. / Vẫn cứ là như thế.'
  },
  197: {
    japanese: 'それでもやはり。／同様（どうよう）に。',
    chinese: '还是那样。(hái shì nà yàng) / 一样。(yí yàng)',
    spanish: 'Dá lo mismo. / A pesar de todo.',
    vietnamese: 'Cũng như vậy thôi. / Vẫn y hệt thế.'
  },
  198: {
    japanese: '全く（まったく）同（おな）じだ。／変（か）わらない。',
    chinese: '还是一样。(hái shì yí yàng) / 照旧。(zhào jiù)',
    spanish: 'Exactamente igual. / De la misma forma.',
    vietnamese: 'Vẫn y như cũ. / Không khác gì cả.'
  },
  199: {
    japanese: 'それにもかかわらず。／全（ぜん）てを考慮（こうりょ）しても。',
    chinese: '尽管如此。(jǐn guǎn rú cǐ) / 总之。(zǒng zhī)',
    spanish: 'Con todo. / Pese a todo.',
    vietnamese: 'Bất kể những điều đó. / Dù có thế nào.'
  },
  200: {
    japanese: 'それにもかかわらず。／依然（いぜん）として。',
    chinese: '尽管如此。(jǐn guǎn rú cǐ) / 还是。(hái shì)',
    spanish: 'No obstante. / Sin embargo.',
    vietnamese: 'Tuy nhiên. / Thế nhưng.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 151-200 updated.');
