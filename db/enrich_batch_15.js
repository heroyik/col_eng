const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  851: {
    japanese: '自由（じゆう）に。／思い（おもい）のままに。',
    chinese: '自由地。(zì yóu de) / 随便。(suí biàn)',
    spanish: 'Libremente. / Con libertad.',
    vietnamese: 'Một cách tự do. / Thoải mái.'
  },
  852: {
    japanese: '寛大（かんだい）に。／惜しみ（おしみ）なく。',
    chinese: '慷慨地。(kāng kǎi de) / 大量。(dà liàng)',
    spanish: 'Liberalmente. / Abundantemente.',
    vietnamese: 'Một cách rộng rãi. / Phóng khoáng.'
  },
  853: {
    japanese: '気前（きまえ）よく。／たっぷり。',
    chinese: '慷慨地。(kāng kǎi de) / 大方。(dà fāng)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Hào phóng. / Một cách rộng lượng.'
  },
  854: {
    japanese: '贅沢（ぜいたく）に。／ふんだんに。',
    chinese: '奢华地。(shē huá de) / 大手大脚。(dà shǒu dà jiǎo)',
    spanish: 'Pródigamente. / Con lujo.',
    vietnamese: 'Xa hoa. / Một cách phung phí.'
  },
  855: {
    japanese: 'ふんだんに。／過度（かど）に。',
    chinese: '滔滔不绝地。(tāo tāo bù jué de) / 大量。(dà liàng)',
    spanish: 'Profusamente. / En abundancia.',
    vietnamese: 'Dồi dào. / Một cách tràn trề.'
  },
  856: {
    japanese: '豊富（ほうふ）に。／潤沢（じゅんたく）に。',
    chinese: '丰富地。(fēng fù de) / 绰绰有余。(chuò chuò yǒu yú)',
    spanish: 'Abundantemente. / De sobra.',
    vietnamese: 'Phong phú. / Một cách dư dả.'
  },
  857: {
    japanese: 'たっぷり。／存分（ぞんぶん）に。',
    chinese: '丰沛地。(fēng pèi de) / 大把。(dà bǎ)',
    spanish: 'Plenamente. / En cantidad.',
    vietnamese: 'Sung túc. / Đầy đủ.'
  },
  858: {
    japanese: 'おびただしく。／多量（たりょう）に。',
    chinese: '多产地。(duō chǎn de) / 巨量。(jù liàng)',
    spanish: 'Copiosamente. / En abundancia.',
    vietnamese: 'Một cách dồi dào. / Nhiều vô kể.'
  },
  859: {
    japanese: '十分（じゅうぶん）に。／足りる（たりる）だけ。',
    chinese: '充分地。(chōng fèn de) / 够用。(gòu yòng)',
    spanish: 'Suficientemente. / Con suficiencia.',
    vietnamese: 'Đầy đủ. / Vừa khéo.'
  },
  860: {
    japanese: '適切（てきせつ）に。／それなりに。',
    chinese: '恰当地。(qià dāng de) / 还凑合。(hái còu he)',
    spanish: 'Adecuadamente. / Lo necesario.',
    vietnamese: 'Một cách thỏa đáng. / Đủ xài.'
  },
  861: {
    japanese: '控えめ（ひかえめ）に。／節約（せつやく）して。',
    chinese: '克制地。(kè zhì de) / 省着点儿用。(shěng zhe diǎnr yòng)',
    spanish: 'Frugalmente. / Con moderación.',
    vietnamese: 'Tiết kiệm. / Một cách dè xẻn.'
  },
  862: {
    japanese: 'ほとんど〜ない。／かろうじて。',
    chinese: '勉强地。(miǎn qiǎng de) / 几乎不。(jī fǔ bù)',
    spanish: 'Escasamente. / Apenas.',
    vietnamese: 'Hiếm khi. / Gần như không.'
  },
  863: {
    japanese: 'ほとんど〜ない。／およそ〜ない。',
    chinese: '几乎不。(jī fǔ bù) / 简直。(jiǎn zhí)',
    spanish: 'Apenas. / Con dificultad.',
    vietnamese: 'Hầu như không. / Coi bộ khó.'
  },
  864: {
    japanese: 'かろうじて。／やっと。',
    chinese: '勉强地。(miǎn qiǎng de) / 差一点。(chà yì diǎn)',
    spanish: 'Apenas. / Por los pelos.',
    vietnamese: 'Suýt soát. / Vừa vặn.'
  },
  865: {
    japanese: '単（たん）に。／〜にすぎない。',
    chinese: '仅仅地。(jǐn jǐn de) / 不过。(bú guò)',
    spanish: 'Meramente. / Simplemente.',
    vietnamese: 'Chỉ đơn thuần là. / Chẳng qua là.'
  },
  866: {
    japanese: '〜だけ。／ただ一つの。',
    chinese: '只地。(zhǐ de) / 仅地。(jǐn de)',
    spanish: 'Solo. / Únicamente.',
    vietnamese: 'Chỉ có. / Duy nhất.'
  },
  867: {
    japanese: '単独（たんどく）に。／ただそれだけ。',
    chinese: '独力地。(dú lì de) / 全靠。(quán kào)',
    spanish: 'Únicamente. / Exclusivamente.',
    vietnamese: 'Chỉ vì một lẽ. / Duy nhất.'
  },
  868: {
    japanese: '独占（どくせん）的（てき）に。／専用（せんよう）の。',
    chinese: '独占地。(dú zhàn de) / 专门。(zhuān mén)',
    spanish: 'Exclusivamente. / Solo.',
    vietnamese: 'Độc quyền. / Riêng biệt.'
  },
  869: {
    japanese: '独特（どくとく）に。／唯一（ゆいいつ）無二（むに）の。',
    chinese: '独特地。(dú tè de) / 别出心裁。(bié chū xīn cái)',
    spanish: 'Únicamente. / De forma singular.',
    vietnamese: 'Một cách độc đáo. / Duy nhất.'
  },
  870: {
    japanese: '特（とく）に。／とりわけ。',
    chinese: '格外地。(gé wài de) / 特别。(tè bié)',
    spanish: 'Particularmente. / Especialmente.',
    vietnamese: 'Đặc biệt là. / Riêng biệt.'
  },
  871: {
    japanese: '特（とく）に。／格別（かくべつ）に。',
    chinese: '专门地。(zhuān mén de) / 尤其。(yóu qí)',
    spanish: 'Especialmente. / Sobre todo.',
    vietnamese: 'Nhất là. / Đặc biệt.'
  },
  872: {
    japanese: '具体（ぐたい）的（てき）に。／明確（めいかく）に。',
    chinese: '具体地。(jù tǐ de) / 专门。(zhuān mén)',
    spanish: 'Específicamente. / En concreto.',
    vietnamese: 'Một cách cụ thể. / Rõ ràng.'
  },
  873: {
    japanese: '明確（めいかく）に。／わざわざ。',
    chinese: '特意地。(tè yì de) / 明确。(míng què)',
    spanish: 'Expresamente. / Claramente.',
    vietnamese: 'Cố ý. / Một cách rõ rệt.'
  },
  874: {
    japanese: '明白（めいはく）に。／はっきりと。',
    chinese: '明确地。(míng què de) / 直接说。(zhí jiē shuō)',
    spanish: 'Explícitamente. / Sin rodeos.',
    vietnamese: 'Một cách minh bạch. / Không úp mở.'
  },
  875: {
    japanese: '正確（せいかく）に。／精密（せいみつ）に。',
    chinese: '精确地。(jīng què de) / 到位。(dào wèi)',
    spanish: 'Precisamente. / Exactamente.',
    vietnamese: 'Chính xác. / Một cách chi li.'
  },
  876: {
    japanese: 'まさに。／そのまま。',
    chinese: '确切地。(què qiè de) / 刚好。(gāng hǎo)',
    spanish: 'Exactamente. / Justo.',
    vietnamese: 'Chính xác là. / Không sai một li.'
  },
  877: {
    japanese: '文字（もじ）通り（どおり）。／誇張（こちょう）なしに。',
    chinese: '字面意思地。(zì miàn yì si de) / 的确。(dí què)',
    spanish: 'Literalmente. / Al pie de la letra.',
    vietnamese: 'Theo đúng nghĩa đen. / Một cách xác thực.'
  },
  878: {
    japanese: '事実（じじつ）上（じょう）。／実質（じっしつ）的に（てきに）。',
    chinese: '几乎。(jī fǔ) / 实际上。(shí jì shàng)',
    spanish: 'Virtualmente. / Casi.',
    vietnamese: 'Gần như. / Thật ra là.'
  },
  879: {
    japanese: '実際（じっさい）に。／現実（げんじつ）的に（てきに）。',
    chinese: '实际上。(shí jì shàng) / 基本上。(jī běn shàng)',
    spanish: 'Prácticamente. / Casi todo.',
    vietnamese: 'Thực tế. / Gần như vậy.'
  },
  880: {
    japanese: '本質（ほんしつ）的に（てきに）。／要（よう）は。',
    chinese: '本质地。(běn zhì de) / 基本上。(jī běn shàng)',
    spanish: 'Esencialmente. / En esencia.',
    vietnamese: 'Về cốt lõi. / Căn bản.'
  },
  881: {
    japanese: '根本（こんぽん）的に（てきに）。／徹底（てってい）的（てき）に。',
    chinese: '根本地。(gēn běn de) / 基础地。(jī chǔ de)',
    spanish: 'Fundamentalmente. / Radicalmente.',
    vietnamese: 'Một cách cơ bản. / Cốt tử.'
  },
  882: {
    japanese: '基本（きほん）的に（てきに）。／普通（ふつう）は。',
    chinese: '基本上。(jī běn shàng) / 总体。(zǒng tǐ)',
    spanish: 'Básicamente. / En general.',
    vietnamese: 'Nói chung là. / Đơn giản là.'
  },
  883: {
    japanese: '本能（ほんのう）的に（てきに）。／直感（ちょっかん）で。',
    chinese: '本能地。(běn néng de) / 直觉。(zhí jué)',
    spanish: 'Instintivamente. / Por instinto.',
    vietnamese: 'Theo bản năng. / Phản xạ tự nhiên.'
  },
  884: {
    japanese: '直感的（ちょっかんてき）に。／なんとなく。',
    chinese: '凭直觉地。(píng zhí jué de) / 一看就懂。(yí kàn jiù dǒng)',
    spanish: 'Intuitivamente. / Por corazonada.',
    vietnamese: 'Bằng trực giác. / Nhạy cảm.'
  },
  885: {
    japanese: '自発（じはつ）的に（てきに）。／自然（しぜん）と。',
    chinese: '自发地。(zì fā de) / 临时起意。(lín shí qǐ yì)',
    spanish: 'Espontáneamente. / De forma natural.',
    vietnamese: 'Tự nhiên. / Bộc phát.'
  },
  886: {
    japanese: '自動（じどう）的に（てきに）。／勝手（かって）に。',
    chinese: '自动地。(zì dòng de) / 顺理成章。(shùn lǐ chéng zhāng)',
    spanish: 'Automáticamente. / De forma mecánica.',
    vietnamese: 'Một cách tự động. / Máy móc.'
  },
  887: {
    japanese: '機械（きかい）的に（てきに）。／無（む）機質（きしつ）に。',
    chinese: '机械地。(jī xiè de) / 呆板。(dāi bǎn)',
    spanish: 'Mecánicamente. / Por rutina.',
    vietnamese: 'Như cái máy. / Vô hồn.'
  },
  888: {
    japanese: '体系（たいけい）的に（てきに）。／秩序（ちつじょ）立て（だて）て。',
    chinese: '系统地。(xiàng tǒng de) / 理顺。(lǐ shùn)',
    spanish: 'Sistemáticamente. / Con orden.',
    vietnamese: 'Một cách hệ thống. / Bài bản.'
  },
  889: {
    japanese: '几帳面（きちょうめん）に。／計画（けいかく）的に（てきに）。',
    chinese: '有条不紊地。(yǒu tiáo bù wěn de) / 讲究方法。(jiǎng jiu fāng fǎ)',
    spanish: 'Metódicamente. / Paso a paso.',
    vietnamese: 'Có phương pháp. / Một cách ngăn nắp.'
  },
  890: {
    japanese: '論理（ろんり）的に（てきに）。／理（り）にかなった。',
    chinese: '逻辑严密地。(luó ji yán mì de) / 说得通。(shuō de tōng)',
    spanish: 'Lógicamente. / Con lógica.',
    vietnamese: 'Một cách lô-gich. / Hợp lý.'
  },
  891: {
    japanese: '合理的（ごうりてき）に。／冷静（れいせい）に。',
    chinese: '理性地。(lǐ xìng de) / 明白。(míng bai)',
    spanish: 'Racionalmente. / Con juicio.',
    vietnamese: 'Đúng theo lẽ phải. / Sáng suốt.'
  },
  892: {
    japanese: '妥当（だとう）に。／納得（なっとく）のいくように。',
    chinese: '放心地。(fàng xīn de) / 讲理。(jiǎng lǐ)',
    spanish: 'Razonablemente. / Dentro de lo normal.',
    vietnamese: 'Hợp lý thôi. / Chấp nhận được.'
  },
  893: {
    japanese: '分別（ふんべつ）を持って。／賢明（けんめい）に。',
    chinese: '明智地。(míng zhì de) / 懂事。(dǒng shì)',
    spanish: 'Sensatamente. / Con sensatez.',
    vietnamese: 'Một cách khôn ngoan. / Có chiều sâu.'
  },
  894: {
    japanese: '賢く（かしこく）。／知恵（ちえ）深く（ぶかく）。',
    chinese: '聪明地。(cōng míng de) / 做得对。(zuò de duì)',
    spanish: 'Sabiamente. / Con sabiduría.',
    vietnamese: 'Khôn ngoan. / Một cách thông thái.'
  },
  895: {
    japanese: '慎重（しんちょう）に。／用意（ようい）周到（しゅうとう）に。',
    chinese: '审慎地。(shěn shèn de) / 稳健。(wěn jiàn)',
    spanish: 'Prudentemente. / Con cautela.',
    vietnamese: 'Một cách thận trọng. / Cảnh giác.'
  },
  896: {
    japanese: '注意（ちゅうい）深く（ぶかく）。／入念（にゅうねん）に。',
    chinese: '地。(de) / 仔细心。(zǐ xì xīn)',
    spanish: 'Cuidadosamente. / Con cuidado.',
    vietnamese: 'Một cách cẩn thận. / Cẩn mật.'
  },
  897: {
    japanese: '用心深く（ようじんぶかく）。／念（ねん）には念（ねん）を入れ（いれ）て。',
    chinese: '地。(de) / 小心谨慎。(xiǎo xīn jǐn shèn)',
    spanish: 'Cautelosamente. / Con precaución.',
    vietnamese: 'Thận trọng. / Có tính toán.'
  },
  898: {
    japanese: '警戒（けいかい）して。／用心（ようじん）深く（ぶかく）。',
    chinese: '警惕地。(jǐng tì de) / 提防。(dī fang)',
    spanish: 'Warily. / Con recelo.',
    vietnamese: 'Một cách dè chừng. / Cảnh giác cao độ.'
  },
  900: {
    japanese: '嫉妬（しっと）深く（ぶかく）。／執着（しゅうちゃく）して。',
    chinese: '嫉妒地。(jí dù de) / 眼红。(yǎn hóng)',
    spanish: 'Celosamente. / Con envidia.',
    vietnamese: 'Một cách ghen tị. / Đầy đố kỵ.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 851-900 updated.');
