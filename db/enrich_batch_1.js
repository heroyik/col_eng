const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  11: {
    japanese: '他（ほか）に選（えら）びようがない。／これしかない。',
    chinese: '别无选择。(bié wú xuǎn zé) / 没有其他办法。(méi yǒu qí tā bàn fǎ)',
    spanish: 'Sin otra opción. / No hay más remedio.',
    vietnamese: 'Không còn lựa chọn nào khác. / Đành phải vậy thôi.'
  },
  12: {
    japanese: 'せっかく話（はなし）が出（で）たから。／ついでに言（い）うと。',
    chinese: '既然你提到了。(jì rán nǐ tí dào le) / 说起这个。(shuō qǐ zhè ge)',
    spanish: 'Ya que lo mencionas. / Aprovechando que lo dices.',
    vietnamese: 'Nhân tiện bạn nhắc đến. / Sẵn tiện đang nói chuyện này.'
  },
  13: {
    japanese: 'ただ流（なが）しているだけ。／身（み）が入（はい）らない。',
    chinese: '只是在敷衍。(zhǐ shì zài fū yǎn) / 走个过场。(zǒu gè guò chǎng)',
    spanish: 'Solo sigo la corriente. / Estoy en piloto automático.',
    vietnamese: 'Chỉ làm cho có thôi. / Đang làm việc không có tâm.'
  },
  14: {
    japanese: 'すぐ後悔（こうかい）するタイプじゃない。／前（まえ）を向（む）くほうだ。',
    chinese: '我不是那种容易后悔的人。(wǒ bú shì nà zhǒng róng yì hòu huǐ de rén) / 我很少后悔。(wǒ hěn shǎo hòu huǐ)',
    spanish: 'No soy de los que se arrepienten fácilmente. / No miro atrás.',
    vietnamese: 'Tôi không phải kiểu người dễ hối hận. / Tôi ít khi hối tiếc về những gì đã qua.'
  },
  15: {
    japanese: '回転（かいてん）寿司（ずし）。／お寿司（すし）のトレイン。',
    chinese: '回转寿司。(huí zhuǎn shòu sī) / 传送带寿司。(chuán sòng dài shòu sī)',
    spanish: 'Sushi de cinta transportadora. / Sushi giratorio.',
    vietnamese: 'Sushi băng chuyền. / Sushi chạy trên băng chuyền.'
  },
  16: {
    japanese: 'パクチー。／コリアンダー。',
    chinese: '香菜。(xiāng cài) / 芫荽。(yán suī)',
    spanish: 'Cilantro. / Culantro.',
    vietnamese: 'Rau mùi. / Ngò rí.'
  },
  17: {
    japanese: '突然（とつぜん）に。／前触（まえぶ）れもなく。',
    chinese: '出乎意料地。(chū hū yì liào de) / 突然间。(tū rán jiān)',
    spanish: 'De la nada. / De repente.',
    vietnamese: 'Bất thình lình. / Bỗng dưng.'
  },
  18: {
    japanese: '邪魔（じゃま）しないようにする。／もう行（い）くね。',
    chinese: '我不打扰你了。(wǒ bù dă rǎo nǐ le) / 先不打搅了。(xiān bù dă jiǎo le)',
    spanish: 'Te dejo en paz. / Me quito de en medio.',
    vietnamese: 'Tôi không làm phiền bạn nữa. / Để tôi đi cho bạn tập trung.'
  },
  19: {
    japanese: '大（おお）きな拍手（はくしゅ）を送（おく）ってください。／盛大（せいだい）に。',
    chinese: '请大家掌声鼓励。(qǐng dà jiā zhăng shēng gǔ lì) / 给点掌声。(gěi diăn zhăng shēng)',
    spanish: 'Pido un gran aplauso para... / Un fuerte aplauso para...',
    vietnamese: 'Cho một tràng pháo tay thật lớn. / Hãy nhiệt tình ủng hộ bằng một tràng pháo tay.'
  },
  20: {
    japanese: 'あんたにそんなこと言（い）われる筋合（すじあ）いはない。／どの口（くち）が言（い）う？',
    chinese: '你凭什么这么说？(nǐ píng shén me zhè me shuō) / 你是谁啊？(nǐ shì shuí a)',
    spanish: '¿Quién eres tú para decir eso? / ¿Con qué derecho lo dices?',
    vietnamese: 'Bạn là ai mà dám nói thế? / Bạn lấy tư cách gì mà nói vậy?'
  },
  21: {
    japanese: '行（い）く前（まえ）に誤解（ごかい）を解（と）いておこう。／スッキリさせたい。',
    chinese: '走之前先把误会说清楚。(zǒu zhī qián xiān bǎ wù huì shuō qīng chu) / 消除误会。(xiāo chú wù huì)',
    spanish: 'Aclaremos cualquier malentendido antes de irnos. / Vamos a dejar las cosas claras.',
    vietnamese: 'Hãy giải quyết mọi hiểu lầm trước khi đi. / Làm rõ mọi chuyện rồi hãy đi.'
  },
  22: {
    japanese: 'ただそう言（い）いたいだけ。／独（ひと）り言（ごと）だよ。',
    chinese: '我只是说说而已。(wǒ zhǐ shì shuō shuō ér yǐ) / 随便说说。(suí biàn shuō shuō)',
    spanish: 'Solo decía. / Es un decir.',
    vietnamese: 'Tôi chỉ nói vậy thôi. / Ý tôi là thế thôi.'
  },
  23: {
    japanese: '気分（きぶん）屋（や）なんだ。／感情（かんじょう）の起伏（きふく）が激（はげ）しい。',
    chinese: '我情绪化。(wǒ qíng xù huà) / 喜怒无常。(xǐ nù wú cháng)',
    spanish: 'Soy muy temperamental. / Tengo muchos cambios de humor.',
    vietnamese: 'Tôi là người hay thay đổi tâm trạng. / Tôi khá thất thường.'
  },
  24: {
    japanese: '調子（ちょうし）が悪（わる）い。／また始まった（はじまった）。',
    chinese: '出故障了。(chū gù zhàng le) / 又在闹情绪了。(yòu zài nào qíng xù le)',
    spanish: 'Está dando problemas. / Está fallando.',
    vietnamese: 'Đang bị lỗi rồi. / Lại giở quẻ rồi.'
  },
  25: {
    japanese: 'それは不便（ふべん）だね。／面倒（めんどう）くさい。',
    chinese: '那太不方便了。(nà tài bù fāng biàn le) / 真麻烦。(zhēn má fan)',
    spanish: 'Eso es muy inconveniente. / Qué molestia.',
    vietnamese: 'Thật là bất tiện. / Phiền phức quá.'
  },
  26: {
    japanese: '人生（じんせい）を謳歌（おうか）する。／精一杯（せいいっぱい）生（い）きる。',
    chinese: '充实地生活。(chōng shí dì shēng huó) / 活出精彩。(huó chū jīng căi)',
    spanish: 'Vivir la vida al máximo. / Disfrutar cada momento.',
    vietnamese: 'Sống hết mình với cuộc đời. / Tận hưởng cuộc sống trọn vẹn.'
  },
  27: {
    japanese: '食（た）べすぎて動（うご）けない。／食（く）い倒（だお）れ。',
    chinese: '饭后困。(fàn hòu kùn) / 吃太撑了想睡觉。(chī tài chēng le xiăng shuì jiào)',
    spanish: 'Coma alimenticio. / Estar empachado.',
    vietnamese: 'Buồn ngủ sau khi ăn. / Ăn no quá hóa lú.'
  },
  28: {
    japanese: 'いいプランだね。／それでいこう。',
    chinese: '听起来不错。(tīng qǐ lái bú cuò) / 就这么办。(jiù zhè me bàn)',
    spanish: 'Me parece un plan. / De acuerdo.',
    vietnamese: 'Nghe có vẻ ổn đấy. / Quyết định thế đi.'
  },
  29: {
    japanese: '一過（いっか）性（せい）の反応（はんのう）じゃない。／慎重（しんちょう）に考（かんが）えたんだ。',
    chinese: '这不是冲动的反应。(zhè bú shì chōng dòng de făn yìng) / 经过深思熟虑의。(jīng guò shēn sī shú lǜ de)',
    spanish: 'No es una reacción impulsiva. / Es una decisión meditada.',
    vietnamese: 'Đây không phải là phản ứng bốc đồng. / Tôi đã suy nghĩ kỹ rồi mới làm.'
  },
  30: {
    japanese: '適当（てきとう）にやってるわけじゃない。／本気（ほんき）だよ.',
    chinese: '不是在走过场。(bú shì zài zǒu guò chǎng) / 我是认真的。(wǒ shì rèn zhēn de)',
    spanish: 'No estoy solo siguiendo la corriente. / Lo hago con ganas.',
    vietnamese: 'Không phải là làm cho có đâu. / Tôi đang nỗ lực thật sự đấy.'
  },
  31: {
    japanese: '本気（ほんき）だよ。／冗談（じょうだん）じゃない。',
    chinese: '我是认真的。(wǒ shì rèn zhēn de) / 没开玩笑。(méi kāi wán xiào)',
    spanish: 'Hablo en serio. / No estoy bromeando.',
    vietnamese: 'Tôi nói nghiêm túc đấy. / Tôi không đùa đâu.'
  },
  32: {
    japanese: '夕食（ゆうしょく）どう？／一緒（いっしょ）に食（た）べる？',
    chinese: '想一起吃晚饭吗？(xiăng yì qǐ chī wăn fàn ma) / 吃晚饭吗？(chī wăn fàn ma)',
    spanish: '¿Te apetece cenar? / ¿Cenamos juntos?',
    vietnamese: 'Cậu có muốn đi ăn tối không? / Tối nay đi ăn nhé?'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch updated successfully.');
