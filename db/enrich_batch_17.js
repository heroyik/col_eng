const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1001: {
    japanese: '喜んで（よろこんで）。／快（こころよ）く。',
    chinese: '乐意地。(lè yì de) / 没问题。(méi wèn tí)',
    spanish: 'Con gusto. / Encantado.',
    vietnamese: 'Một cách vui vẻ. / Sẵn lòng.'
  },
  1002: {
    japanese: '上機嫌（じょうきげん）で。／朗（ほが）らかに。',
    chinese: '愉快地。(yú kuài de) / 笑逐颜开。(xiào zhú yán kāi)',
    spanish: 'Alegremente. / Con alegría.',
    vietnamese: 'Tươi tỉnh. / Một cách hăng hái.'
  },
  1005: {
    japanese: '安らか（やすらか）に。／穏やか（おだやか）に。',
    chinese: '安详地。(ān xiáng de) / 太平。(tài píng)',
    spanish: 'Pacíficamente. / En paz.',
    vietnamese: 'Một cách hòa bình. / Yên ổn.'
  },
  1006: {
    japanese: '静か（しずか）に。／平穏（へいおん）に。',
    chinese: '宁静地。(níng jìng de) / 悠然。(yōu rán)',
    spanish: 'Tranquilamente. / Con sosiego.',
    vietnamese: 'Phẳng lặng. / Một cách thanh thản.'
  },
  1007: {
    japanese: '穏やか（おだやか）に。／うららかに。',
    chinese: '恬静地。(tián jìng de) / 从容。(cóng róng)',
    spanish: 'Serenamente. / Con calma.',
    vietnamese: 'Thanh thản. / Một cách bình thản.'
  },
  1008: {
    japanese: '落ち着い（おちつい）て。／冷静（れいせい）に。',
    chinese: '平心静气地。(píng xīn jìng qì de) / 淡定。(dàn dìng)',
    spanish: 'Calmadamente. / Con tranquilidad.',
    vietnamese: 'Một cách bình tĩnh. / Tĩnh tâm.'
  },
  1009: {
    japanese: '静か（しずか）に。／ひっそりと。',
    chinese: '静静地。(jìng jìng de) / 没动静。(méi dòng jing)',
    spanish: 'Quietamente. / En silencio.',
    vietnamese: 'Yên lặng. / Một cách nhẹ nhàng.'
  },
  1010: {
    japanese: '黙り込んで（だまりこんで）。／沈黙（ちんもく）を守り（まもり）ながら。',
    chinese: '默默地。(mò mò de) / 不作声。(bù zuò shēng)',
    spanish: 'Silenciosamente. / En silencio.',
    vietnamese: 'Âm thầm. / Một cách lặng lẽ.'
  },
  1011: {
    japanese: '音（おと）もなく。／忍び足（しのびあし）で。',
    chinese: '悄然地。(qiǎo rán de) / 没声儿。(méi shēng r)',
    spanish: 'Sin ruido. / Silenciosamente.',
    vietnamese: 'Không tiếng động. / Một cách êm ru.'
  },
  1012: {
    japanese: '聞き取れ（ききとれ）ないほど。／かすかに。',
    chinese: '听不见地。(tīng bú jiàn de) / 蚊子叫。(wén zi jiào)',
    spanish: 'Inaudiblemente. / En voz muy baja.',
    vietnamese: 'Không thể nghe thấy. / Cực kỳ nhỏ.'
  },
  1013: {
    japanese: '弱々しく（よわよわしく）。／かすかに。',
    chinese: '微弱地。(wēi ruò de) / 隐约。(yǐn yuē)',
    spanish: 'Tenuemente. / Débilmente.',
    vietnamese: 'Một cách yếu ớt. / Thấp thoáng.'
  },
  1014: {
    japanese: '薄暗く（うすぐらく）。／はっきりとしない。',
    chinese: '暗淡地。(àn dàn de) / 看不明。(kàn bù míng)',
    spanish: 'Tenuemente. / Oscuramente.',
    vietnamese: 'Tù mù. / Mờ nhạt.'
  },
  1015: {
    japanese: '漠然（ばくぜん）と。／ぼんやりと。',
    chinese: '含糊地。(hán hu de) / 没个准儿。(méi gè zhǔnr)',
    spanish: 'Vagamente. / Sin claridad.',
    vietnamese: 'Một cách mơ hồ. / Mông lung.'
  },
  1018: {
    japanese: '秘密（ひみつ）に。／こっそりと。',
    chinese: '悄悄地。(qiāo qiāo de) / 偷摸。(tōu mō)',
    spanish: 'Secretamente. / En secreto.',
    vietnamese: 'Một cách bí mật. / Lén lút.'
  },
  1019: {
    japanese: '忍び足（しのびあし）で。／こっそりと。',
    chinese: '鬼鬼祟祟地。(guǐ guǐ suì suì de) / 打掩护。(dǎ yǎn hù)',
    spanish: 'Sigilosamente. / A hurtadillas.',
    vietnamese: 'Một cách vụng trộm. / Lén lút.'
  },
  1022: {
    japanese: '個人的（こじんてき）に。／内密（ないみつ）に。',
    chinese: '私下地。(sī xià de) / 关起门来。(guān qǐ mén lái)',
    spanish: 'Privadamente. / En privado.',
    vietnamese: 'Riêng tư. / Một cách cá nhân.'
  },
  1023: {
    japanese: '機密（きみつ）として。／内内（ないない）で。',
    chinese: '保密地。(bǎo mì de) / 绝对机密。(jué duì jî mì)',
    spanish: 'Confidencialmente. / En confianza.',
    vietnamese: 'Một cách tín mật. / Cẩn trọng.'
  },
  1024: {
    japanese: '個人的（こじんてき）に。／直々（じきじき）に。',
    chinese: '亲身地。(qīn shēn de) / 亲自。(qīn zì)',
    spanish: 'Personalmente. / Directamente.',
    vietnamese: 'Một cách đích thân. / Cá nhân.'
  },
  1033: {
    japanese: '簡単（かんたん）に。／たやすく。',
    chinese: '轻而易举地。(qīng ér yì jǔ de) / 没问题。(méi wèn tí)',
    spanish: 'Fácilmente. / Sin esfuerzo.',
    vietnamese: 'Một cách dễ dàng. / Đơn giản.'
  },
  1034: {
    japanese: '直ちに（ただちに）。／すぐさま。',
    chinese: '顺当地。(shùn dang de) / 随时。(suí shí)',
    spanish: 'Readily. / Al instante.',
    vietnamese: 'Sẵn lòng. / Ngay lập tức.'
  },
  1041: {
    japanese: '見事（みごと）に。／豪華（ごうか）に。',
    chinese: '灿烂地。(càn làn de) / 精彩。(jīng cǎi)',
    spanish: 'Espléndidamente. / De modo magnífico.',
    vietnamese: 'Một cách rực rỡ. / Tuyệt vời.'
  },
  1045: {
    japanese: '優秀（ゆうしゅう）に。／見事（みごと）に。',
    chinese: '出色地。(chū sè de) / 极好。(jí hǎo)',
    spanish: 'Excelentemente. / De forma excelente.',
    vietnamese: 'Một cách xuất sắc. / Giỏi giang.'
  },
  1046: {
    japanese: '完璧（かんぺき）に。／理想（りそう）的（てき）に。',
    chinese: '十全十美地。(shí quán shí měi de) / 到位。(dào wèi)',
    spanish: 'Perfectamente. / Por completo.',
    vietnamese: 'Một cách hoàn hảo. / Không sai một li.'
  },
  1053: {
    japanese: '正確（せいかく）に。／緻密（ちみつ）に。',
    chinese: '准确地。(zhǔn què de) / 不差毫厘。(bù chà háo lí)',
    spanish: 'Exactamente. / Precise.',
    vietnamese: 'Một cách chính xác. / Đúng đắn.'
  },
  1054: {
    japanese: '精密（せいみつ）に。／まさに。',
    chinese: '精密地。(jīng mì de) / 到位。(dào wèi)',
    spanish: 'Precisamente. / Justo.',
    vietnamese: 'Chi tiết. / Một cách chính xác.'
  },
  1055: {
    japanese: '正確（せいかく）に。／ちょうど。',
    chinese: '确切地。(què qiè de) / 刚好。(gāng hǎo)',
    spanish: 'Exactamente. / Justo así.',
    vietnamese: 'Đúng chóc. / Không sai tí nào.'
  },
  1066: {
    japanese: '徹底（てってい）的（てき）に。／隅々（すみずみ）まで。',
    chinese: '透彻地。(tòu chè de) / 彻底。(chè dǐ)',
    spanish: 'Thoroughly. / A conciencia.',
    vietnamese: 'Một cách thấu đáo. / Cặn kẽ.'
  },
  1067: {
    japanese: '完全に（かんぜんに）。／丸（まる）ごと。',
    chinese: '全部地。(quán bù de) / 统统。(tǒng tǒng)',
    spanish: 'Completamente. / Por completo.',
    vietnamese: 'Hoàn toàn. / Đầy đủ.'
  },
  1072: {
    japanese: '絶対（ぜったい）に。／完全に（かんぜんに）。',
    chinese: '绝对地。(jué duì de) / 当然。(dāng rán)',
    spanish: 'Absolutamente. / Sin duda.',
    vietnamese: 'Tuyệt đối. / Một cách hoàn toàn.'
  },
  1079: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 见效。(jiàn xiào)',
    spanish: 'Efectivamente. / Con éxito.',
    vietnamese: 'Một cách hiệu quả. / Có tác động.'
  },
  1080: {
    japanese: '効率（こうりつ）的（てき）に。／スピーディーに。',
    chinese: '高效地。(gāo xiào de) / 没废话。(méi fèi huà)',
    spanish: 'Eficientemente. / Con rapidez.',
    vietnamese: 'Năng suất. / Một cách trôi chảy.'
  },
  1081: {
    japanese: '成功（せいこう）して。／順調（じゅんちょう）に。',
    chinese: '顺利地。(shùn lì de) / 成了。(chéng le)',
    spanish: 'Exitosamente. / Con éxito.',
    vietnamese: 'Một cách thành công. / Thuận buồm xuôi gió.'
  },
  1093: {
    japanese: '確か（たしか）に。／間違い（まちがい）なく。',
    chinese: '肯定地。(kěn dìng de) / 准保。(zhǔn bǎo)',
    spanish: 'Ciertamente. / Por supuesto.',
    vietnamese: 'Chắc chắn. / Rõ ràng.'
  },
  1094: {
    japanese: '確か（たしか）に。／きっと。',
    chinese: '定会地。(dìng huì de) / 肯定是。(kěn dìng shì)',
    spanish: 'Seguramente. / Sin duda.',
    vietnamese: 'Chắc là. / Coi bộ đúng.'
  },
  1095: {
    japanese: '間違い（まちがい）なく。／断固（だんこ）として。',
    chinese: '明确地。(míng què de) / 绝对。(jué duì)',
    spanish: 'Definitivamente. / En absoluto.',
    vietnamese: 'Rõ ràng là vậy. / Chắc như đinh đóng cột.'
  },
  1100: {
    japanese: '隠（かく）さずに。／公家（おおやけ）に。',
    chinese: '敞开地。(chǎng kāi de) / 当众。(dāng zhòng)',
    spanish: 'Abiertamente. / En público.',
    vietnamese: 'Công khai. / Một cách cởi mở.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 1001-1100 updated.');
