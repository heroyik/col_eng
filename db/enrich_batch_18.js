const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1101: {
    japanese: '正直（しょうじき）に。／ありのまま。',
    chinese: '诚实地。(chéng shí de) / 说实话。(shuō shí huà)',
    spanish: 'Honestamente. / Con franqueza.',
    vietnamese: 'Một cách trung thực. / Thật lòng.'
  },
  1102: {
    japanese: '心（こころ）から。／誠実（せいじつ）に。',
    chinese: '真诚地。(zhēn chéng de) / 真心。(zhēn xīn)',
    spanish: 'Sinceramente. / De corazón.',
    vietnamese: 'Chân thành. / Từ đáy lòng.'
  },
  1105: {
    japanese: '単（たん）に。／ありのままに。',
    chinese: '简单地。(jiǎn dān de) / 就是。(jiù shì)',
    spanish: 'Simplemente. / Meramente.',
    vietnamese: 'Một cách đơn giản. / Chỉ vậy thôi.'
  },
  1106: {
    japanese: '手短（てみじか）に。／簡潔（かんけつ）に。',
    chinese: '简短地。(jiǎn duǎn de) / 说来话短。(shuō lái huà duǎn)',
    spanish: 'Brevemente. / En pocas palabras.',
    vietnamese: 'Một cách vắn tắt. / Ngắn gọn.'
  },
  1107: {
    japanese: '間もなく（まもなく）。／近いうちに（ちかいうちに）。',
    chinese: '不久地。(bù jiǔ de) / 马上。(mǎ shàng)',
    spanish: 'En breve. / Pronto.',
    vietnamese: 'Sắp tới. / Ngay thôi.'
  },
  1108: {
    japanese: '速やか（すみやか）に。／急（いそ）いで。',
    chinese: '快地。(kuài de) / 利索。(lì suǒ)',
    spanish: 'Rápidamente. / Con rapidez.',
    vietnamese: 'Một cách nhanh chóng. / Lẹ làng.'
  },
  1111: {
    japanese: '直ちに（ただちに）。／今（いま）すぐ。',
    chinese: '立刻地。(lì kè de) / 立马。(lì mǎ)',
    spanish: 'Inmediatamente. / Al instante.',
    vietnamese: 'Ngay lập tức. / Tức thì.'
  },
  1112: {
    japanese: '迅速（じんそく）に。／即座（そくざ）に。',
    chinese: '及时地。(jí shí de) / 赶紧。(gǎn jǐn)',
    spanish: 'Prontamente. / Sin demora.',
    vietnamese: 'Kịp thời. / Nhanh nhảu.'
  },
  1114: {
    japanese: '急速（きゅうそく）に。／どんどん。',
    chinese: '迅速地。(xùn sù de) / 飞快。(fēi kuài)',
    spanish: 'Rápidamente. / Velozmente.',
    vietnamese: 'Mau lẹ. / Một cách hỏa tốc.'
  },
  1122: {
    japanese: '強大（きょうだい）に。／力強く（ちからづよく）。',
    chinese: '强大地。(qiáng dà de) / 够劲儿。(gòu jìn r)',
    spanish: 'Poderosamente. / Con gran poder.',
    vietnamese: 'Có uy lực. / Mạnh mẽ.'
  },
  1123: {
    japanese: '強く（つよく）。／激（はげ）しく。',
    chinese: '强烈地。(qiáng liè de) / 硬气。(yìng qi)',
    spanish: 'Fuertemente. / Con firmeza.',
    vietnamese: 'Kiên cố. / Mạnh bạo.'
  },
  1124: {
    japanese: '断固（だんこ）として。／しっかりと。',
    chinese: '坚定地。(jiān dìng de) / 死死地。(sǐ sǐ de)',
    spanish: 'Firmemente. / Con firmeza.',
    vietnamese: 'Chắc chắn. / Một cách dứt khoát.'
  },
  1136: {
    japanese: '注意（ちゅうい）深く（ぶかく）。／入念（にゅうねん）に。',
    chinese: '仔细地。(zǐ xì de) / 留神。(liú shén)',
    spanish: 'Cuidadosamente. / Con cuidado.',
    vietnamese: 'Một cách cẩn thận. / Tỉ mỉ.'
  },
  1137: {
    japanese: '用心深く（ようじんぶかく）。／警戒（けいかい）して。',
    chinese: '谨慎地。(jǐn shèn de) / 悠着点儿。(yōu zhe diǎnr)',
    spanish: 'Cautelosamente. / Con precaución.',
    vietnamese: 'Thận trọng. / Cảnh giác.'
  },
  1150: {
    japanese: '礼儀（れいぎ）正しく（ただしく）。／丁寧（ていねい）に。',
    chinese: '礼貌地。(lǐ mào de) / 客气。(kè qi)',
    spanish: 'Políticamente. / Con cortesía.',
    vietnamese: 'Nhã nhặn. / Lịch sự.'
  },
  1151: {
    japanese: '優しく（やさしく）。／穏やか（おだやか）に。',
    chinese: '温柔地。(wēn róu de) / 斯文。(sī wen)',
    spanish: 'Gentilmente. / Con delicadeza.',
    vietnamese: 'Nhẹ nhàng. / Điềm đạm.'
  },
  1156: {
    japanese: '友好（ゆうこう）的に（てきに）。／親しみ（したしみ）やすく。',
    chinese: '友好地。(yǒu hǎo de) / 和气。(hé qi)',
    spanish: 'Amistosamente. / En son de paz.',
    vietnamese: 'Thân thiện. / Một cách hữu hảo.'
  },
  1161: {
    japanese: '熱心（ねっしん）に。／意欲（いよく）的（てき）に。',
    chinese: '热情地。(rè qíng de) / 积极。(jī jí)',
    spanish: 'Entusiastamente. / Con entusiasmo.',
    vietnamese: 'Hăng hái. / Nhiệt tình.'
  },
  1164: {
    japanese: '進ん（すすん）で。／快（こころよ）く。',
    chinese: '乐意地。(lè yì de) / 甘愿。(gān yuàn)',
    spanish: 'De buena gana. / Voluntariamente.',
    vietnamese: 'Sẵn lòng. / Tự nguyện.'
  },
  1165: {
    japanese: '直ちに（ただちに）。／すぐさま。',
    chinese: '爽快地。(shuǎng kuài de) / 随叫随到。(suí jiào suí dào)',
    spanish: 'Readily. / Al instante.',
    vietnamese: 'Ngay lập tức. / Sẵn sàng.'
  },
  1172: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 明摆着。(míng bǎi zhe)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ rành rành. / Một cách minh bạch.'
  },
  1180: {
    japanese: '気前（きまえ）よく。／寛大（かんだい）に。',
    chinese: '慷慨地。(kāng kǎi de) / 敞开供应。(chǎng kāi gōng yìng)',
    spanish: 'Liberalmente. / Abundantemente.',
    vietnamese: 'Rộng rãi. / Phóng khoáng.'
  },
  1181: {
    japanese: '気前（きまえ）よく。／たっぷり。',
    chinese: '大方地。(dà fāng de) / 够意思。(gòu yì si)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Hào phóng. / Một cách rộng lượng.'
  },
  1185: {
    japanese: '適切（てきせつ）に。／十分（じゅうぶん）に。',
    chinese: '恰当地。(qià dāng de) / 够用。(gòu yòng)',
    spanish: 'Adecuadamente. / Bien.',
    vietnamese: 'Thỏa đáng. / Đầy đủ.'
  },
  1186: {
    japanese: '満足（まんぞく）に。／十分（じゅうぶん）に。',
    chinese: '满意地。(mǎn yì de) / 交代得过去。(jiāo dài de guò qù)',
    spanish: 'Satisfactoriamente. / Con éxito.',
    vietnamese: 'Hài lòng. / Một cách mãn nguyện.'
  },
  1188: {
    japanese: '効率（こうりつ）的（てき）に。／手際（てぎわ）よく。',
    chinese: '高效地。(gāo xiào de) / 省事儿。(shěng shì r)',
    spanish: 'Eficientemente. / Con agilidad.',
    vietnamese: 'Năng suất. / Một cách khoa học.'
  },
  1189: {
    japanese: '効果（こうか）的（てき）に。／実効（じっこう）性（せい）のある。',
    chinese: '有效地。(yǒu xiào de) / 见效。(jiàn xiào)',
    spanish: 'Efectivamente. / Con éxito.',
    vietnamese: 'Một cách hiệu quả. / Có tác động.'
  },
  1197: {
    japanese: '広く（ひろく）。／広範囲（こうはんい）に。',
    chinese: '广泛地。(guǎng fàn de) / 到处。(dào chù)',
    spanish: 'Ampliamente. / Por todas partes.',
    vietnamese: 'Rộng rãi. / Khắp nơi.'
  },
  1198: {
    japanese: '大まかに（おおまかに）。／幅広（はばひろ）く。',
    chinese: '宽广地。(kuān guǎng de) / 全面。(quán miàn)',
    spanish: 'Broadly. / Extensamente.',
    vietnamese: 'Một cách bao quát. / Rộng khắp.'
  },
  1200: {
    japanese: '世界（せかい）的（てき）に。／地球（ちきゅう）規模（きぼ）で。',
    chinese: '全球地。(quán qiú de) / 满世界。(mǎn shì jiè)',
    spanish: 'Globalmente. / A nivel mundial.',
    vietnamese: 'Toàn cầu. / Đi khắp hành tinh.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1101-1200 updated.');
