const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1401: {
    japanese: '熱心（ねっしん）に。／熱狂（ねっきょう）的に。',
    chinese: '热忱地。(rè chén de) / 极其。(jí qí)',
    spanish: 'Zealously. / Zelosamente.',
    vietnamese: 'Sốt sắng. / Hết mình.'
  },
  1402: {
    japanese: 'しきりに。／切望（せつぼう）して。',
    chinese: '渴望地。(kě wàng de) / 急着。(jí zhe)',
    spanish: 'Eagerly. / Ansiosamente.',
    vietnamese: 'Hăm hở. / Thiết tha.'
  },
  1403: {
    japanese: '進ん（すすん）で。／快（こころよ）く。',
    chinese: '乐意地。(lè yì de) / 甘愿。(gān yuàn)',
    spanish: 'De buena gana. / Voluntariamente.',
    vietnamese: 'Một cách tự nguyện. / Sẵn lòng.'
  },
  1404: {
    japanese: '直ちに（ただちに）。／すぐさま。',
    chinese: '爽快地。(shuǎng kuài de) / 随时。(suí shí)',
    spanish: 'Readily. / Prontamente.',
    vietnamese: 'Ngay lập tức. / Sẵn sàng.'
  },
  1405: {
    japanese: '喜んで（よろこんで）。／快（こころよ）く。',
    chinese: '乐意地。(lè yì de) / 没问题。(méi wèn tí)',
    spanish: 'Con gusto. / Encantado.',
    vietnamese: 'Một cách vui vẻ. / Sẵn lòng.'
  },
  1406: {
    japanese: '幸せ（しあわせ）に。／満足（まんぞく）そうに。',
    chinese: '幸福地。(xìng fú de) / 开心。(kāi xīn)',
    spanish: 'Happily. / Felizmente.',
    vietnamese: 'Hạnh phúc. / Mãn nguyện.'
  },
  1407: {
    japanese: '喜ば（よろこば）しいことに。／嬉（うれ）しさ全開（ぜんかい）で。',
    chinese: '喜悦地。(xǐ yuè de) / 兴高采烈。(xìng gāo cǎi liè)',
    spanish: 'Joyfully. / Alegremente.',
    vietnamese: 'Vui sướng. / Hân hoan.'
  },
  1408: {
    japanese: '陽気（ようき）に。／楽し（たのし）く。',
    chinese: '欢快地。(huān kuài de) / 热闹。(rè nao)',
    spanish: 'Merrily. / Alegremente.',
    vietnamese: 'Vui nhộn. / Hớn hở.'
  },
  1409: {
    japanese: '機嫌（きげん）よく。／楽し（たのし）げに。',
    chinese: '愉快地。(yú kuài de) / 笑呵呵。(xiào hē hē)',
    spanish: 'Cheerfully. / Alegremente.',
    vietnamese: 'Tươi tỉnh. / Hăng hái.'
  },
  1411: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  },
  1412: {
    japanese: '明白（めいはく）に。／ありのままに。',
    chinese: '明白地。(míng bai de) / 讲实话。(jiǎng shí huà)',
    spanish: 'Plainly. / Claramente.',
    vietnamese: 'Rõ rành rành. / Một cách đơn giản.'
  },
  1413: {
    japanese: '明らかに（あきらかに）。／当然（とうぜん）。',
    chinese: '显然地。(xiǎn rán de) / 摆明了。(bǎi míng le)',
    spanish: 'Obviamente. / Claramente.',
    vietnamese: 'Hiển nhiên. / Rõ như ban ngày.'
  },
  1417: {
    japanese: 'オープンに。／公家（おおやけ）に。',
    chinese: '公开地。(gōng kāi de) / 敞开说。(chǎng kāi shuō)',
    spanish: 'Abiertamente. / Sin reservas.',
    vietnamese: 'Một cách cởi mở. / Công khai.'
  },
  1418: {
    japanese: '自由（じゆう）に。／思い（おもい）のままに。',
    chinese: '自由地。(zì yóu de) / 随便。(suí biàn)',
    spanish: 'Libremente. / Con libertad.',
    vietnamese: 'Một cách tự do. / Thoải mái.'
  },
  1420: {
    japanese: '気前（きまえ）よく。／たっぷり。',
    chinese: '慷慨地。(kāng kǎi de) / 大方。(dà fāng)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Hào phóng. / Một cách rộng lượng.'
  },
  1426: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 管用。(guǎn yòng)',
    spanish: 'Efectivamente. / Con resultados.',
    vietnamese: 'Hiệu quả. / Có tác động.'
  },
  1427: {
    japanese: '効率（こうりつ）的（てき）に。／手際（てぎわ）よく。',
    chinese: '利索地。(lì suǒ de) / 省事儿。(shěng shì r)',
    spanish: 'Eficientemente. / Con agilidad.',
    vietnamese: 'Năng suất. / Khoa học.'
  },
  1428: {
    japanese: '成功（せいこう）して。／順調（じゅんちょう）に。',
    chinese: '顺利地。(shùn lì de) / 成了。(chéng le)',
    spanish: 'Successfully. / Con éxito.',
    vietnamese: 'Một cách thành công. / Thuận buồm xuôi gió.'
  },
  1430: {
    japanese: '強く（つよく）。／猛烈（もうれつ）に。',
    chinese: '强烈地。(qiáng liè de) / 硬气。(yìng qi)',
    spanish: 'Fuertemente. / Con firmeza.',
    vietnamese: 'Bền vững. / Rất khỏe.'
  },
  1431: {
    japanese: '断固（だんこ）として。／しっかりと。',
    chinese: '坚定地。(jiān dìng de) / 死死地。(sǐ sǐ de)',
    spanish: 'Firmemente. / Con firmeza.',
    vietnamese: 'Chắc chắn. / Một cách dứt khoát.'
  },
  1433: {
    japanese: '安全（あんぜん）に。／無事（ぶじ）に。',
    chinese: '安全地。(ān quán de) / 稳当地。(wěn dang de)',
    spanish: 'Seguramente. / Sin peligro.',
    vietnamese: 'Một cách an toàn. / Bình an.'
  },
  1435: {
    japanese: '適切（てきせつ）に。／ちゃんと。',
    chinese: '恰当地。(qià dāng de) / 到位。(dào wèi)',
    spanish: 'Properly. / Adecuadamente.',
    vietnamese: 'Một cách thỏa đáng. / Đâu vào đấy.'
  },
  1436: {
    japanese: 'ふさわしく。／適切（てきせつ）に。',
    chinese: '适当地。(shì dàng de) / 合适。(hé shì)',
    spanish: 'Appropriately. / Adecuadamente.',
    vietnamese: 'Một cách phù hợp. / Ưng ý.'
  },
  1442: {
    japanese: '正直（しょうじき）に。／ありのままに。',
    chinese: '老实说。(lǎo shí shuō) / 坦诚。(tǎn chéng)',
    spanish: 'Honestly. / Sinceramente.',
    vietnamese: 'Nói thiệt là. / Thật thà.'
  },
  1444: {
    japanese: '真実（しんじつ）。／誠（まこと）に。',
    chinese: '真实地。(zhēn shí de) / 实在。(shí zài)',
    spanish: 'Verdaderamente. / De veras.',
    vietnamese: 'Thật lòng. / Một cách chân chính.'
  },
  1448: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  },
  1455: {
    japanese: '熱心（ねっしん）に。／やる気（き）満々（まんまん）で。',
    chinese: '热情地。(rè qíng de) / 劲头十足。(jìn tóu shí zú)',
    spanish: 'Enthusiastically. / Entusiastamente.',
    vietnamese: 'Nhiệt tình. / Hào hứng.'
  },
  1461: {
    japanese: '強力（きょうりょく）に。／力強く（ちからづよく）。',
    chinese: '强力地。(qiáng lì de) / 够劲儿。(gòu jìn r)',
    spanish: 'Poderosamente. / Con fuerza.',
    vietnamese: 'Mạnh mẽ. / Có uy lực.'
  },
  1468: {
    japanese: '広く（ひろく）。／広範囲（こうはんい）に。',
    chinese: '广泛地。(guǎng fàn de) / 到处。(dào chù)',
    spanish: 'Ampliamente. / Por todas partes.',
    vietnamese: 'Rộng rãi. / Khắp nơi.'
  },
  1469: {
    japanese: '大まかに（おおまかに）。／幅広（はばひろ）く。',
    chinese: '宽广地。(kuān guǎng de) / 全面。(quán miàn)',
    spanish: 'Broadly. / Extensamente.',
    vietnamese: 'Một cách bao quát. / Rộng khắp.'
  },
  1471: {
    japanese: '世界（せかい）的（てき）に。／地球（ちきゅう）規模（きぼ）で。',
    chinese: '全球地。(quán qiú de) / 满世界。(mǎn shì jiè)',
    spanish: 'Globalmente. / A nivel mundial.',
    vietnamese: 'Toàn cầu. / Đi khắp hành tinh.'
  },
  1472: {
    japanese: '国内（こくない）で。／家庭（かてい）内（ない）で。',
    chinese: '国内地。(guó nèi de) / 家里。(jiā lǐ)',
    spanish: 'Domésticamente. / En casa.',
    vietnamese: 'Nội địa. / Trong nước.'
  },
  1473: {
    japanese: '地元（じもと）で。／その土地（とち）で。',
    chinese: '本地地。(běn dì de) / 身边。(shēn biān)',
    spanish: 'Localmente. / En el lugar.',
    vietnamese: 'Tại chỗ. / Địa phương.'
  },
  1476: {
    japanese: '内部（ないぶ）で。／心（こころ）の中（なか）で。',
    chinese: '内部地。(nèi bù de) / 里面。(lǐ miàn)',
    spanish: 'Internamente. / Hacia dentro.',
    vietnamese: 'Nội bộ. / Bên trong.'
  },
  1477: {
    japanese: '外部（がいぶ）で。／外見（がいけん）上（じょう）。',
    chinese: '外部地。(wài bù de) / 外面。(wài miàn)',
    spanish: 'Externamente. / Hacia fuera.',
    vietnamese: 'Ngoại cảnh. / Bên ngoài.'
  },
  1478: {
    japanese: '精神（せいしん）的に（てきに）。／神聖（しんせい）に。',
    chinese: '精神上。(jīng shén shàng) / 圣洁。(shèng jié)',
    spanish: 'Spiritually. / Espiritualmente.',
    vietnamese: 'Về tâm linh. / Linh thiêng.'
  },
  1479: {
    japanese: '精神（せいしん）的に（てきに）。／頭（あたま）の中（なか）で。',
    chinese: '心理上。(xīn lǐ shàng) / 脑子里。(nǎo zi lǐ)',
    spanish: 'Mentally. / Mentalmente.',
    vietnamese: 'Về mặt trí óc. / Trong tâm trí.'
  },
  1480: {
    japanese: '身体（しんたい）的に（てきに）。／肉体（にくたい）的（てき）に。',
    chinese: '身体上。(shēn tǐ shàng) / 体力。(tǐ lì)',
    spanish: 'Physically. / Físicamente.',
    vietnamese: 'Về thể chất. / Thân thể.'
  },
  1481: {
    japanese: '心理（しんり）的に（てきに）。／精神（せいしん）状態（じょうたい）として。',
    chinese: '心理上。(xīn lǐ shàng) / 精神上的。(jīng shén shàng de)',
    spanish: 'Psychologically. / Psicológicamente.',
    vietnamese: 'Về mặt tâm lý. / Một cách tinh thần.'
  },
  1482: {
    japanese: '感情（かんじょう）的（てき）に。／心情（しんじょう）として。',
    chinese: '情感上。(qíng gǎn shàng) / 情绪化。(qíng xù huà)',
    spanish: 'Emotionally. / Emocionalmente.',
    vietnamese: 'Về mặt tình cảm. / Một cách cảm xúc.'
  },
  1483: {
    japanese: '社会（しゃかい）的に（てきに）。／付き合い（つきあい）で。',
    chinese: '社交上。(shè jiāo shàng) / 应酬。(yìng chou)',
    spanish: 'Socially. / Socialmente.',
    vietnamese: 'Về mặt xã hội. / Một cách giao thiệp.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1401-1400 updated.');
