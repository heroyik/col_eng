const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1302: {
    japanese: '気前（きまえ）よく。／たっぷり。',
    chinese: '慷慨地。(kāng kǎi de) / 没说的。(méi shuō de)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Hào phóng. / Một cách rộng lượng.'
  },
  1303: {
    japanese: '豊富（ほうふ）に。／潤沢（じゅんたく）に。',
    chinese: '丰富地。(fēng fù de) / 绰绰有余。(chuò chuò yǒu yú)',
    spanish: 'Abundantemente. / De sobra.',
    vietnamese: 'Phong phú. / Một cách dư dả.'
  },
  1305: {
    japanese: '十分（じゅうぶん）に。／足りる（たりる）だけ。',
    chinese: '充分地。(chōng fèn de) / 够用。(gòu yòng)',
    spanish: 'Suficientemente. / Con suficiencia.',
    vietnamese: 'Đầy đủ. / Vừa khéo.'
  },
  1307: {
    japanese: '満足（まんぞく）のいくように。／十分（じゅうぶん）に。',
    chinese: '满地。(mǎn de) / 够意思。(gòu yì si)',
    spanish: 'Satisfactoriamente. / Bien.',
    vietnamese: 'Thỏa đáng. / Vừa lòng đẹp ý.'
  },
  1311: {
    japanese: '成功（せいこう）して。／順調（じゅんちょう）に。',
    chinese: '顺利地。(shùn lì de) / 成了。(chéng le)',
    spanish: 'Successfully. / Con éxito.',
    vietnamese: 'Một cách thành công. / Thuận buồm xuôi gió.'
  },
  1314: {
    japanese: '豊か（ゆたか）に。／たっぷり。',
    chinese: '富足地。(fù zú de) / 油水多。(yóu shuǐ duō)',
    spanish: 'Ricamente. / Abundantemente.',
    vietnamese: 'Giàu có. / Một cách phong phú.'
  },
  1315: {
    japanese: '華やか（はなやか）に。／立派（りっぱ）に。',
    chinese: '辉煌地。(huī huáng de) / 精彩。(jīng cǎi)',
    spanish: 'Espléndidamente. / De maravilla.',
    vietnamese: 'Rực rỡ. / Lộng lẫy.'
  },
  1319: {
    japanese: '優秀（ゆうしゅう）に。／抜きん出（ぬきんで）て。',
    chinese: '杰出地。(jié chū de) / 优秀。(yōu xiù)',
    spanish: 'Excellently. / De forma sobresaliente.',
    vietnamese: 'Giỏi giang. / Ưu tú.'
  },
  1320: {
    japanese: '完璧（かんぺき）に。／理想（りそう）的（てき）に。',
    chinese: '完美地。(wán měi de) / 没治了。(méi zhì le)',
    spanish: 'Perfectamente. / Sin fallos.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  1324: {
    japanese: '適切（てきせつ）に。／ちゃんと。',
    chinese: '恰当地。(qià dāng de) / 到位。(dào wèi)',
    spanish: 'Properly. / Adecuadamente.',
    vietnamese: 'Một cách thỏa đáng. / Đâu vào đấy.'
  },
  1327: {
    japanese: '正確（せいかく）に。／精密（せいみつ）に。',
    chinese: '精确地。(jīng què de) / 到位。(dào wèi)',
    spanish: 'Precisamente. / Exactamente.',
    vietnamese: 'Chính xác. / Một cách chi li.'
  },
  1328: {
    japanese: 'まさに。／そのまま。',
    chinese: '确切地。(què qiè de) / 刚好。(gāng hǎo)',
    spanish: 'Exactamente. / Justo.',
    vietnamese: 'Chính xác là. / Không sai một li.'
  },
  1339: {
    japanese: '徹底（てってい）的（てき）に。／細部（さいぶ）まで。',
    chinese: '彻底地。(chè dǐ de) / 仔细。(zǐ xì)',
    spanish: 'A fondo. / Minuciosamente.',
    vietnamese: 'Một cách thấu đáo. / Cặn kẽ.'
  },
  1340: {
    japanese: '完全に（かんぜんに）。／全（まった）く。',
    chinese: '完全地。(wán quán de) / 全部。(quán bù)',
    spanish: 'Completamente. / Por entero.',
    vietnamese: 'Hoàn toàn. / Đầy đủ.'
  },
  1345: {
    japanese: '絶対（ぜったい）に。／完全に（かんぜんに）。',
    chinese: '绝对地。(jué duì de) / 当然。(dāng rán)',
    spanish: 'Absolutamente. / Sin duda.',
    vietnamese: 'Tuyệt đối. / Hoàn toàn.'
  },
  1347: {
    japanese: '完全に（かんぜんに）。／十分に（じゅうぶんに）。',
    chinese: '充分地。(chōng fèn de) / 完全。(wán quán)',
    spanish: 'Plenamente. / Totalmente.',
    vietnamese: 'Đầy đủ. / Trọn vẹn.'
  },
  1354: {
    japanese: '機嫌（きげん）よく。／楽し（たのし）げに。',
    chinese: '愉快地。(yú kuài de) / 笑呵呵。(xiào hē hē)',
    spanish: 'Cheerfully. / Alegremente.',
    vietnamese: 'Tươi tỉnh. / Hăng hái.'
  },
  1356: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  },
  1362: {
    japanese: '公家（おおやけ）に。／人前（ひとまえ）で。',
    chinese: '公开地。(gōng kāi de) / 当众。(dāng zhòng)',
    spanish: 'Públicamente. / A la vista de todos.',
    vietnamese: 'Công khai. / Trước mặt mọi người.'
  },
  1371: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 管用。(guǎn yòng)',
    spanish: 'Efectivamente. / Con resultados.',
    vietnamese: 'Hiệu quả. / Có tác động.'
  },
  1372: {
    japanese: '効率（こうりつ）的（てき）に。／手際（てぎわ）よく。',
    chinese: '利索地。(lì suǒ de) / 省事儿。(shěng shì r)',
    spanish: 'Eficientemente. / Con agilidad.',
    vietnamese: 'Năng suất. / Khoa học.'
  },
  1373: {
    japanese: '成功（せいこう）して。／順調（じゅんちょう）に。',
    chinese: '顺利地。(shùn lì de) / 成了。(chéng le)',
    spanish: 'Successfully. / Con éxito.',
    vietnamese: 'Một cách thành công. / Thuận buồm xuôi gió.'
  },
  1375: {
    japanese: '強く（つよく）。／猛烈（もうれつ）に。',
    chinese: '强烈地。(qiáng liè de) / 硬气。(yìng qi)',
    spanish: 'Fuertemente. / Con firmeza.',
    vietnamese: 'Bền vững. / Rất khỏe.'
  },
  1376: {
    japanese: '断固（だんこ）として。／しっかりと。',
    chinese: '坚定地。(jiān dìng de) / 死死地。(sǐ sǐ de)',
    spanish: 'Firmemente. / Con firmeza.',
    vietnamese: 'Chắc chắn. / Một cách dứt khoát.'
  },
  1378: {
    japanese: '安全（あんぜん）に。／無事（ぶじ）に。',
    chinese: '安全地。(ān quán de) / 稳当地。(wěn dang de)',
    spanish: 'Seguramente. / Sin peligro.',
    vietnamese: 'Một cách an toàn. / Bình an.'
  },
  1380: {
    japanese: '適切（てきせつ）に。／ちゃんと。',
    chinese: '恰当地。(qià dāng de) / 到位。(dào wèi)',
    spanish: 'Properly. / Adecuadamente.',
    vietnamese: 'Một cách thỏa đáng. / Đâu vào đấy.'
  },
  1387: {
    japanese: '正直（しょうじき）に。／ありのままに。',
    chinese: '老实说。(lǎo shí shuō) / 坦诚。(tǎn chéng)',
    spanish: 'Honestly. / Sinceramente.',
    vietnamese: 'Nói thiệt là. / Thật thà.'
  },
  1389: {
    japanese: '真実（しんじつ）。／誠（まこと）に。',
    chinese: '真实地。(zhēn shí de) / 实在。(shí zài)',
    spanish: 'Verdaderamente. / De veras.',
    vietnamese: 'Thật lòng. / Một cách chân chính.'
  },
  1393: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  },
  1400: {
    japanese: '熱心（ねっしん）に。／やる気（き）満々（まんまん）で。',
    chinese: '热情地。(rè qíng de) / 劲头十足。(jìn tóu shí zú)',
    spanish: 'Enthusiastically. / Entusiastamente.',
    vietnamese: 'Nhiệt tình. / Hào hứng.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1301-1400 updated.');
