const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  751: {
    japanese: '厳格（げんかく）に。／厳（きび）しく。',
    chinese: '严格地。(yán gé de) / 严肃。(yán sù)',
    spanish: 'Estrictamente. / Rígidamente.',
    vietnamese: 'Nghiêm khắc. / Một cách chặt chẽ.'
  },
  752: {
    japanese: '厳（きび）しく。／ひどく。',
    chinese: '冷酷地。(lěng kù de) / 狠心。(hěn xīn)',
    spanish: 'Duramente. / Con dureza.',
    vietnamese: 'Một cách cay nghiệt. / Khắc nghiệt.'
  },
  753: {
    japanese: 'ひどく。／重大（じゅうだい）に。',
    chinese: '严厉地。(yán lì de) / 严重。(yán zhòng)',
    spanish: 'Severamente. / Gravemente.',
    vietnamese: 'Nghiêm trọng. / Một cách dữ dội.'
  },
  754: {
    japanese: '厳（きび）しく。／緻密（ちみつ）に。',
    chinese: '严密地。(yán mì de) / 准确地。(zhǔn què de)',
    spanish: 'Rigorosamente. / A conciencia.',
    vietnamese: 'Khắt khe. / Một cách tỉ mỉ.'
  },
  755: {
    japanese: '厳格（げんかく）に。／いかめしく。',
    chinese: '严厉地。(yán lì de) / 刚强。(gāng qiáng)',
    spanish: 'Sternly. / Con severidad.',
    vietnamese: 'Nghiêm nghị. / Một cách cương quyết.'
  },
  756: {
    japanese: '質素（しっそ）に。／厳（きび）しく。',
    chinese: '简朴地。(jiǎn pǔ de) / 苦行。(kǔ xíng)',
    spanish: 'Austeramente. / Con sencillez.',
    vietnamese: 'Khắc khổ. / Một cách giản dị.'
  },
  757: {
    japanese: '思い切っ（おもいきっ）て。／抜本（ばっぽん）的に（てきに）。',
    chinese: '彻底地。(chè dǐ de) / 猛烈。(měng liè)',
    spanish: 'Drásticamente. / Radicalmente.',
    vietnamese: 'Một cách quyết liệt. / Mạnh tay.'
  },
  758: {
    japanese: '劇（げき）的（てき）に。／劇的（げきてき）に。',
    chinese: '戏剧性地。(xì jù xìng de) / 极其。(jí qí)',
    spanish: 'Dramáticamente. / Espectacularmente.',
    vietnamese: 'Một cách kịch tính. / Đáng kinh ngạc.'
  },
  759: {
    japanese: '根本（こんぽん）的に（てきに）。／過激（かげき）に。',
    chinese: '根本上。(gēn běn shàng) / 激进。(jī jìn)',
    spanish: 'Radicalmente. / De raíz.',
    vietnamese: 'Một cách căn bản. / Triệt để.'
  },
  760: {
    japanese: '完全に（かんぜんに）。／全（まった）く。',
    chinese: '完全地。(wán quán de) / 全部。(quán bù)',
    spanish: 'Completamente. / Por entero.',
    vietnamese: 'Hoàn toàn. / Đầy đủ.'
  },
  761: {
    japanese: 'すっかり。／そっくりそのまま。',
    chinese: '全部地。(quán bù de) / 统统。(tǒng tǒng)',
    spanish: 'Enteramente. / Íntegramente.',
    vietnamese: 'Toàn bộ. / Một cách trọn vẹn.'
  },
  762: {
    japanese: '全（ぜん）て。／丸（まる）ごと。',
    chinese: '完全地。(wán quán de) / 统统。(tǒng tǒng)',
    spanish: 'Ítegramente. / De cabo a rabo.',
    vietnamese: 'Trọn vẹn. / Toàn bộ cục diện.'
  },
  763: {
    japanese: '全く（まったく）。／すっかり。',
    chinese: '统统。(tǒng tǒng) / 彻底。(chè dǐ)',
    spanish: 'Totalmente. / Por completo.',
    vietnamese: 'Tổng cộng. / Toàn bộ luôn.'
  },
  764: {
    japanese: '全く（まったく）もって。／完全に（かんぜんに）。',
    chinese: '完全。(wán quán) / 简直。(jiǎn zhí)',
    spanish: 'Completamente. / Absolutamente.',
    vietnamese: 'Cực kỳ. / Tuyệt đối.'
  },
  765: {
    japanese: '絶対（ぜったい）に。／完全に（かんぜんに）。',
    chinese: '绝对地。(jué duì de) / 当然。(dāng rán)',
    spanish: 'Absolutamente. / Sin duda.',
    vietnamese: 'Tuyệt đối. / Hoàn toàn.'
  },
  766: {
    japanese: '完璧（かんぺき）に。／申し分（もうしぶん）なく。',
    chinese: '完美地。(wán měi de) / 十全十美。(shí quán shí měi)',
    spanish: 'Perfectamente. / Sin fallos.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  767: {
    japanese: '完全に（かんぜんに）。／十分に（じゅうぶんに）。',
    chinese: '充分地。(chōng fèn de) / 完全。(wán quán)',
    spanish: 'Plenamente. / Totalmente.',
    vietnamese: 'Đầy đủ. / Trọn vẹn.'
  },
  768: {
    japanese: '徹底（てってい）的（てき）に。／細部（さいぶ）まで。',
    chinese: '彻底地。(chè dǐ de) / 仔细。(zǐ xì)',
    spanish: 'A fondo. / Minuciosamente.',
    vietnamese: 'Một cách thấu đáo. / Cặn kẽ.'
  },
  769: {
    japanese: '網羅（もうら）的（てき）に。／出し切（だしき）って。',
    chinese: '详尽地。(xiáng jìn de) / 全部。(quán bù)',
    spanish: 'Exhaustivamente. / Sin dejarse nada.',
    vietnamese: 'Một cách triệt để. / Khám phá hết.'
  },
  770: {
    japanese: '包括（ほうかつ）的（てき）に。／全部（ぜんぶ）まとめて。',
    chinese: '综合地。(zōng hé de) / 普遍。(pǔ biàn)',
    spanish: 'Integralmente. / Exhaustivamente.',
    vietnamese: 'Một cách toàn diện. / Bao quát.'
  },
  771: {
    japanese: '広範囲（こうはんい）に。／広く（ひろく）。',
    chinese: '广泛地。(guǎng fàn de) / 大面积。(dà miàn jī)',
    spanish: 'Extensamente. / Ampliamente.',
    vietnamese: 'Một cách rộng khắp. / Lan tỏa.'
  },
  772: {
    japanese: '幅広（はばひろ）く。／いたる所（ところ）で。',
    chinese: '广为流传。(guǎng wéi liú chuán) / 到处。(dào chù)',
    spanish: 'Ampliamente. / Por todas partes.',
    vietnamese: 'Một cách phổ biến. / Khắp nơi.'
  },
  773: {
    japanese: '大まかに（おおまかに）。／幅広（はばひろ）く。',
    chinese: '大致地。(dà zhì de) / 广泛。(guǎng fàn)',
    spanish: 'A grandes rasgos. / Extensamente.',
    vietnamese: 'Nói chung. / Một cách bao quát.'
  },
  774: {
    japanese: '普遍（ふへん）的（てき）に。／宇宙（うちゅう）レベルで。',
    chinese: '普遍地。(pǔ biàn de) / 到处都一样。(dào chù dōu yí yàng)',
    spanish: 'Universalmente. / En todo el mundo.',
    vietnamese: 'Khắp vạn vật. / Mọi lúc mọi nơi.'
  },
  775: {
    japanese: '至（いた）る所（ところ）に。／どこにでも。',
    chinese: '随处可见。(suí chù kě jiàn) / 普遍。(pǔ biàn)',
    spanish: 'Por todas partes. / Ubicuamente.',
    vietnamese: 'Có mặt khắp nơi. / Mọi ngóc ngách.'
  },
  776: {
    japanese: '地球（ちゅうきゅう）規模（きぼ）で。／世界（せかい）的（てき）に。',
    chinese: '全球性地。(quán qiú xìng de) / 范围内。(fàn wéi nèi)',
    spanish: 'Globalmente. / A nivel mundial.',
    vietnamese: 'Toàn cầu. / Đi khắp thế giới.'
  },
  777: {
    japanese: '地域（ちいき）的（てき）に。／地方（ちほう）ごとに。',
    chinese: '区域性地。(qū yù xìng de) / 局部。(jú bù)',
    spanish: 'Regionalmente. / Por zonas.',
    vietnamese: 'Theo vùng miền. / Mang tính khu vực.'
  },
  778: {
    japanese: '地元（じもと）で。／その土地（とち）で。',
    chinese: '地方上。(ì fāng shàng) / 身边。(shēn biān)',
    spanish: 'Localmente. / En el lugar.',
    vietnamese: 'Tại chỗ. / Ở địa phương.'
  },
  779: {
    japanese: '国内（こくない）で。／家庭（かてい）的（てき）に。',
    chinese: '国内地。(guó nèi de) / 家里。(jiā lǐ)',
    spanish: 'Domésticamente. / En el país.',
    vietnamese: 'Nội địa. / Trong nước.'
  },
  780: {
    japanese: '内部（ないぶ）で。／心（こころ）の中（なか）で。',
    chinese: '内部地。(nèi bù de) / 里面。(lǐ miàn)',
    spanish: 'Internamente. / Hacia dentro.',
    vietnamese: 'Nội bộ. / Bên trong.'
  },
  781: {
    japanese: '外部（がいぶ）で。／外側（そとがわ）に。',
    chinese: '外部地。(wài bù de) / 外面。(wài miàn)',
    spanish: 'Externamente. / Hacia fuera.',
    vietnamese: 'Ngoại cảnh. / Bên ngoài.'
  },
  782: {
    japanese: '公家（おおやけ）に。／人前（ひとまえ）で。',
    chinese: '公开地。(gōng kāi de) / 当众。(dāng zhòng)',
    spanish: 'Públicamente. / A la vista de todos.',
    vietnamese: 'Công khai. / Trước mặt mọi người.'
  },
  783: {
    japanese: 'ひそかに。／個人的（こじんてき）に。',
    chinese: '私下地。(sī xià de) / 偷偷。(tōu tōu)',
    spanish: 'Privadamente. / En privado.',
    vietnamese: 'Riêng tư. / Kín đáo.'
  },
  784: {
    japanese: '秘密（ひみつ）裏（り）に。／こっそりと。',
    chinese: '秘密地。(mì mì de) / 没告诉别人。(méi gào su bié rén)',
    spanish: 'Secretamente. / A escondidas.',
    vietnamese: 'Lén lút. / Giữ bí mật.'
  },
  785: {
    japanese: '機密（きみつ）として。／内内（ないない）で。',
    chinese: '保密地。(bǎo mì de) / 绝对机密。(jué duì jī mì)',
    spanish: 'Confidencialmente. / En confianza.',
    vietnamese: 'Cẩn mật. / Tin cậy.'
  },
  786: {
    japanese: '暗黙（あんもく）に。／それとなく。',
    chinese: '含蓄地。(hán xù de) / 默认。(mò rèn)',
    spanish: 'Implícitamente. / Sin decirlo.',
    vietnamese: 'Ngầm định. / Ý tại ngôn ngoại.'
  },
  787: {
    japanese: '明白（めいはく）に。／はっきりと。',
    chinese: '明确地。(míng què de) / 直接说。(zhí jiē shuō)',
    spanish: 'Explícitamente. / Claramente.',
    vietnamese: 'Rõ ràng. / Không úp mở.'
  },
  788: {
    japanese: '直接（ちょくせつ）的に（てきに）。／直通（ちょくつう）で。',
    chinese: '直接地。(zhí jiē de) / 亲口。(qīn kǒu)',
    spanish: 'Directamente. / Sin rodeos.',
    vietnamese: 'Trực tiếp. / Thẳng thắn.'
  },
  789: {
    japanese: '間接（かんせつ）的に（てきに）。／遠回し（とおまわし）に。',
    chinese: '间接地。(jiàn jiē de) / 绕弯子。(rào wān zi)',
    spanish: 'Indirectamente. / Por rodeos.',
    vietnamese: 'Gián tiếp. / Vòng vo.'
  },
  790: {
    japanese: '率直（そっちょく）に。／単刀直入（たんとうちょくにゅう）に。',
    chinese: '自白。(zì bái) / 有话直说。(yǒu huà zhí shuō)',
    spanish: 'Directamente. / Sin tapujos.',
    vietnamese: 'Thẳng tuột. / Không vòng vo.'
  },
  791: {
    japanese: 'ぶっきらぼうに。／露骨（ろこつ）に。',
    chinese: '直率地。(zhí shuài de) / 不客气。(bú kè qi)',
    spanish: 'Tajantemente. / Sin rodeos.',
    vietnamese: 'Một cách thô thiển. / Huỵch toẹt.'
  },
  792: {
    japanese: '不意に（ふいに）。／いきなり。',
    chinese: '突然地。(tū rán de) / 猛地。(měng de)',
    spanish: 'Abruptamente. / De golpe.',
    vietnamese: 'Bất thình lình. / Đột ngột ngắt quãng.'
  },
  793: {
    japanese: '急（きゅう）に。／前触れ（まえぶれ）なく。',
    chinese: '突然地。(tū rán de) / 猛然。(měng rán)',
    spanish: 'De repente. / Súbitamente.',
    vietnamese: 'Bỗng nhiên. / Một cách đột ngột.'
  },
  794: {
    japanese: '即座（そくざ）に。／一瞬（いっしゅん）で。',
    chinese: '立即地。(lì jí de) / 瞬间。(shùn jiān)',
    spanish: 'Al instante. / Instantáneamente.',
    vietnamese: 'Ngay tức thì. / Trong tích tắc.'
  },
  795: {
    japanese: '直ちに（ただちに）。／今（いま）すぐ。',
    chinese: '马上。(mǎ shàng) / 立刻。(lì kè)',
    spanish: 'Inmediatamente. / En el acto.',
    vietnamese: 'Ngay lập tức. / Tức khắc.'
  },
  796: {
    japanese: '迅速（じんそく）に。／即座（そくざ）に。',
    chinese: '及时地。(jí shí de) / 赶紧。(gǎn jǐn)',
    spanish: 'Prontamente. / Sin demora.',
    vietnamese: 'Kịp thời. / Nhanh chóng.'
  },
  797: {
    japanese: '速やか（すみやか）に。／どんどん。',
    chinese: '飞快地。(fēi kuài de) / 动作快。(dòng zuò kuài)',
    spanish: 'Velozmente. / Con rapidez.',
    vietnamese: 'Nhanh nhảu. / Tốc hành.'
  },
  798: {
    japanese: '急速（きゅうそく）に。／すごい勢い（いきおい）で。',
    chinese: '迅速地。(xùn sù de) / 飞速。(fēi sù)',
    spanish: 'Rápidamente. / Velozmente.',
    vietnamese: 'Một cách mau lẹ. / Cấp tốc.'
  },
  799: {
    japanese: '早く（はやく）。／サッと。',
    chinese: '快地。(kuài de) / 动作利索。(dòng zuò lì suǒ)',
    spanish: 'Rápidamente. / Con agilidad.',
    vietnamese: 'Nhanh lên. / Một cách nhanh chóng.'
  },
  800: {
    japanese: '速く（はやく）。／一気（いっき）に。',
    chinese: '快速地。(kuài sù de) / 赶快。(gǎn kuài)',
    spanish: 'Rápido. / Veloz.',
    vietnamese: 'Chạy nhanh. / Tốc độ.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 751-800 updated.');
