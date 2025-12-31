const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1201: {
    japanese: '国内（こくない）で。／家庭（かてい）内（ない）で。',
    chinese: '国内地。(guó nèi de) / 家里。(jiā lǐ)',
    spanish: 'Domésticamente. / En casa.',
    vietnamese: 'Nội địa. / Trong nước.'
  },
  1202: {
    japanese: '地元（じもと）で。／その土地（とち）で。',
    chinese: '本地地。(běn dì de) / 身边。(shēn biān)',
    spanish: 'Localmente. / En el lugar.',
    vietnamese: 'Tại chỗ. / Địa phương.'
  },
  1205: {
    japanese: '内部（ないぶ）で。／心（こころ）の中（なか）で。',
    chinese: '内部地。(nèi bù de) / 里面。(lǐ miàn)',
    spanish: 'Internamente. / Hacia dentro.',
    vietnamese: 'Nội bộ. / Bên trong.'
  },
  1206: {
    japanese: '外部（がいぶ）で。／外見（がいけん）上（じょう）。',
    chinese: '外部地。(wài bù de) / 外面。(wài miàn)',
    spanish: 'Externamente. / Hacia fuera.',
    vietnamese: 'Ngoại cảnh. / Bên ngoài.'
  },
  1220: {
    japanese: '正式（せいしき）に。／形式（けいしき）的（てき）に。',
    chinese: '正式地。(zhèng shì de) / 书面。(shū miàn)',
    spanish: 'Formalmente. / De forma oficial.',
    vietnamese: 'Một cách chính thức. / Trang trọng.'
  },
  1221: {
    japanese: '非（ひ）公式（こうしき）に。／略式（りゃくしき）で。',
    chinese: '非正式地。(fēi zhèng shì de) / 随便点儿。(suí biàn diǎnr)',
    spanish: 'Informalmente. / De manera informal.',
    vietnamese: 'Không chính thức. / Thân mật.'
  },
  1226: {
    japanese: '故意（こい）に。／あえて。',
    chinese: '故意地。(gù yì de) / 存心。(cún xīn)',
    spanish: 'Deliberadamente. / A propósito.',
    vietnamese: 'Cố tình. / Một cách có chủ đích.'
  },
  1227: {
    japanese: '意図（いと）的（てき）に。／狙っ（ねらっ）て。',
    chinese: '有意地。(yǒu yì de) / 摆明了。(bǎi míng le)',
    spanish: 'Intencionalmente. / Con intención.',
    vietnamese: 'Một cách cố ý. / Có ý định.'
  },
  1231: {
    japanese: '同時（どうじ）に。／一緒（いっしょ）のタイミングで。',
    chinese: '同时地。(tóng shí de) / 一块儿。(yí kuàir)',
    spanish: 'Simultáneamente. / Al mismo tiempo.',
    vietnamese: 'Đồng thời. / Cùng lúc.'
  },
  1234: {
    japanese: 'たまに。／時々（ときどき）。',
    chinese: '偶尔地。(ǒu ěr de) / 隔三差五。(gé sān chà wǔ)',
    spanish: 'Ocasionalmente. / De vez en cuando.',
    vietnamese: 'Thỉnh thoảng. / Đôi khi.'
  },
  1235: {
    japanese: 'めったに〜ない。／まれ。',
    chinese: '罕见地。(hǎn jiàn de) / 少有。(shǎo yǒu)',
    spanish: 'Raramente. / Rara vez.',
    vietnamese: 'Hiếm khi. / Rất ít khi.'
  },
  1238: {
    japanese: '頻繁（ひんぱん）に。／しょっちゅう。',
    chinese: '频繁地。(pín fán de) / 经常。(jīng cháng)',
    spanish: 'Frecuentemente. / A menudo.',
    vietnamese: 'Thường xuyên. / Luôn luôn.'
  },
  1241: {
    japanese: '永久（えいきゅう）的に。／ずっと。',
    chinese: '永久地。(yǒng jiǔ de) / 铁定。(tiě dìng)',
    spanish: 'Permanentemente. / Para siempre.',
    vietnamese: 'Vĩnh viễn. / Lâu dài.'
  },
  1242: {
    japanese: '一時（いちじ）的に。／当面（とうめん）の間（あいだ）。',
    chinese: '临时地。(lín shí de) / 凑合。(còu he)',
    spanish: 'Temporalmente. / Por el momento.',
    vietnamese: 'Tạm thời. / Trong chốc lát.'
  },
  1245: {
    japanese: '直ちに（ただちに）。／今（いま）すぐ。',
    chinese: '立刻地。(lì kè de) / 马上。(mǎ shàng)',
    spanish: 'Inmediatamente. / Al instante.',
    vietnamese: 'Ngay lập tức. / Tức thì.'
  },
  1252: {
    japanese: '徐々（じょじょ）に。／少し（すこし）ずつ。',
    chinese: '逐渐地。(zhú jiàn de) / 慢慢来。(màn màn lái)',
    spanish: 'Gradualmente. / Poco a poco.',
    vietnamese: 'Dần dần. / Từ từ.'
  },
  1260: {
    japanese: '鋭く（ふるどく）。／急激（きゅうげき）に。',
    chinese: '锐利地。(ruì lì de) / 猛。(měng)',
    spanish: 'Sharply. / Bruscamente.',
    vietnamese: 'Sắc bén. / Một cách đột ngột.'
  },
  1263: {
    japanese: '密接（みっせつ）に。／きめ細かく。',
    chinese: '紧密地。(jǐn mì de) / 仔细着点儿。(zǐ xì zhe diǎnr)',
    spanish: 'Estrechamente. / De cerca.',
    vietnamese: 'Chặt chẽ. / Một cách sát sao.'
  },
  1266: {
    japanese: '断固（だんこ）として。／しっかりと。',
    chinese: '坚定地。(jiān dìng de) / 死死地。(sǐ sǐ de)',
    spanish: 'Firmemente. / Con fuerza.',
    vietnamese: 'Chắc chắn. / Một cách kiên định.'
  },
  1268: {
    japanese: '安全（あんぜん）に。／無事（ぶじ）に。',
    chinese: '安全地。(ān quán de) / 稳当地。(wěn dang de)',
    spanish: 'Seguramente. / Sin peligro.',
    vietnamese: 'Một cách an toàn. / Bình an.'
  },
  1269: {
    japanese: '正しく（ただしく）。／正確（せいかく）に。',
    chinese: '正确地。(zhèng què de) / 没错儿。(méi cuò r)',
    spanish: 'Correctamente. / Bien.',
    vietnamese: 'Một cách chính xác. / Đúng đắn.'
  },
  1270: {
    japanese: '適切（てきせつ）に。／ちゃんと。',
    chinese: '恰当地。(qià dāng de) / 到位。(dào wèi)',
    spanish: 'Properly. / Adecuadamente.',
    vietnamese: 'Một cách thỏa đáng. / Đâu vào đấy.'
  },
  1272: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 管用。(guǎn yòng)',
    spanish: 'Efectivamente. / Con éxito.',
    vietnamese: 'Hiệu quả. / Có tác dụng.'
  },
  1275: {
    japanese: '完全に（かんぜんに）。／丸（まる）ごと。',
    chinese: '完全地。(wán quán de) / 统统。(tǒng tǒng)',
    spanish: 'Completamente. / Por entero.',
    vietnamese: 'Hoàn toàn. / Một cách trọn vẹn.'
  },
  1276: {
    japanese: 'すっかり。／そっくりそのまま。',
    chinese: '全部地。(quán bù de) / 干干净净。(gān gān jìng jìng)',
    spanish: 'Enteramente. / Íntegramente.',
    vietnamese: 'Toàn bộ. / Một cách triệt để.'
  },
  1278: {
    japanese: '全く（まったく）。／すっかり。',
    chinese: '统统。(tǒng tǒng) / 彻底。(chè dǐ)',
    spanish: 'Totalmente. / Por completo.',
    vietnamese: 'Tổng cộng. / Toàn bộ luôn.'
  },
  1280: {
    japanese: '絶対（ぜったい）に。／完全に（かんぜんに）。',
    chinese: '绝对地。(jué duì de) / 没错。(méi cuò)',
    spanish: 'Absolutamente. / Sin duda.',
    vietnamese: 'Tuyệt đối. / Một cách hoàn toàn.'
  },
  1281: {
    japanese: '完璧（かんぺき）に。／申し分（もうしぶん）なく。',
    chinese: '完美地。(wán měi de) / 十全十美。(shí quán shí měi)',
    spanish: 'Perfectamente. / Sin fallos.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  1282: {
    japanese: '完全に（かんぜんに）。／十分に（じゅうぶんに）。',
    chinese: '充分地。(chōng fèn de) / 完全。(wán quán)',
    spanish: 'Plenamente. / Totalmente.',
    vietnamese: 'Đầy đủ. / Trọn vẹn.'
  },
  1293: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1201-1300 updated.');
