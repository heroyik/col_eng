const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  451: {
    japanese: '事実（じじつ）上（じょう）。／実質（じっしつ）的（てき）には。',
    chinese: '实际上。(shí zhì shàng) / 几乎。(jī fǔ)',
    spanish: 'Virtualmente. / Prácticamente.',
    vietnamese: 'Hầu như là. / Trên thực tế.'
  },
  452: {
    japanese: '現実（げんじつ）的（てき）には。／ほとんど。',
    chinese: '实际。(shí jì) / 几乎。(jī fǔ)',
    spanish: 'Prácticamente. / Casi.',
    vietnamese: 'Thực tế mà nói. / Gần như.'
  },
  453: {
    japanese: 'ほとんど。／もう少し（すこし）で。',
    chinese: '几乎。(jī fǔ) / 差一点儿。(chà yì diǎnr)',
    spanish: 'Casi. / Por poco.',
    vietnamese: 'Suýt nữa. / Hầu như.'
  },
  454: {
    japanese: 'ほとんど。／ほぼ。',
    chinese: '差不多。(chà bù duō) / 几乎。(jī fǔ)',
    spanish: 'Casi. / Cerca de.',
    vietnamese: 'Gần như. / Xấp xỉ.'
  },
  455: {
    japanese: '〜も同然（どうぜん）だ。／ほとんど全（ぜん）て。',
    chinese: '几乎。(jī fǔ) / 差一点就。(chà yì diǎn jiù)',
    spanish: 'Casi todo. / Poco menos que.',
    vietnamese: 'Gần như là. / Hầu như tất cả.'
  },
  456: {
    japanese: '多かれ（おおかれ）少なかれ（すくなかれ）。／大体（だいたい）。',
    chinese: '或多或少。(huò duō huò shǎo) / 差不多。(chà bù duō)',
    spanish: 'Más o menos. / Aproximadamente.',
    vietnamese: 'Ít nhiều gì đó. / Khoảng chừng.'
  },
  457: {
    japanese: '多少（たしょう）。／やや。',
    chinese: '有些。(yǒu xiē) / 挺。(tǐng)',
    spanish: 'Algo. / Un poco.',
    vietnamese: 'Hơi hơi. / Một chút.'
  },
  458: {
    japanese: 'わずかに。／少し（すこし）だけ。',
    chinese: '轻微地。(qīng wēi de) / 稍微。(shāo wēi)',
    spanish: 'Ligeramente. / Un poco.',
    vietnamese: 'Mỏng manh. / Một chút xíu.'
  },
  459: {
    japanese: 'ある程度（ていど）。／ある点（てん）までは。',
    chinese: '在某种程度上。(zài mǒu zhǒng chéng dù shàng) / 有点儿。(yǒu diǎnr)',
    spanish: 'Hasta cierto punto. / En alguna medida.',
    vietnamese: 'Trong một chừng mực nào đó. / Ở mức độ nhất định.'
  },
  460: {
    japanese: 'ある程度（ていど）まで。／部分（ぶぶん）的（てき）には。',
    chinese: '在一定程度上。(zài yí dìng chéng dù shàng) / 还行。(hái xíng)',
    spanish: 'En cierto grado. / Hasta un punto.',
    vietnamese: 'Trong một phạm vi nhất định. / Ở mức độ nào đó.'
  },
  461: {
    japanese: 'いくらか。／ある程度（ていど）。',
    chinese: '在某种程度上。(zài mǒu zhǒng chéng dù shàng) / 多少。(duō shǎo)',
    spanish: 'En cierta medida. / Algo.',
    vietnamese: 'Ở một vài khía cạnh. / Trong một mức độ nhất định.'
  },
  462: {
    japanese: '部分（ぶぶん）的（てき）に。／不（ふ）完全（かんぜん）ながら。',
    chinese: '部分地。(bù fen de) / 不完全。(bù wán quán)',
    spanish: 'Parcialmente. / En parte.',
    vietnamese: 'Một phần thôi. / Không hoàn toàn.'
  },
  463: {
    japanese: '限定（げんてい）的（てき）な範囲（はんい）で。／わずかに。',
    chinese: '在有限的范围内。(zài yǒu xiàn de fàn wéi nèi) / 只有一点。(zhǐ yǒu yì diǎn)',
    spanish: 'Hasta cierto límite. / De forma limitada.',
    vietnamese: 'Trong phạm vi hẹp. / Ở mức độ hạn chế.'
  },
  464: {
    japanese: '比例（ひれい）して。／バランスよく。',
    chinese: '按比例地。(àn bǐ lì de) / 相应地。(xiāng yìng de)',
    spanish: 'Proporcionalmente. / En proporción.',
    vietnamese: 'Một cách tương ứng. / Theo tỷ lệ.'
  },
  465: {
    japanese: '比較的（ひかくてき）。／相対（そうたい）的に（てきに）。',
    chinese: '比较。(bǐ jiào) / 相对地。(xiāng duì de)',
    spanish: 'Relativamente. / En comparación.',
    vietnamese: 'Tương đối. / Khá là.'
  },
  466: {
    japanese: '比較（ひかく）すると。／相対（そうたい）的（てき）に。',
    chinese: '相比之下。(xiāng bǐ zhī xià) / 相对而言。(xiāng duì ér yán)',
    spanish: 'Comparativamente. / Por comparación.',
    vietnamese: 'So với cái khác. / Mang tính tương đối.'
  },
  467: {
    japanese: '適度（てきど）に。／控えめ（ひかえめ）に。',
    chinese: '适度地。(shì dù de) / 还可以。(hái kě yǐ)',
    spanish: 'Moderadamente. / Con moderación.',
    vietnamese: 'Vừa phải. / Điều độ.'
  },
  468: {
    japanese: '合理（ごうり）的（てき）に。／それなりに。',
    chinese: '合理地。(hé lǐ de) / 还算挺。(hái suàn tǐng)',
    spanish: 'Razonablemente. / De forma aceptable.',
    vietnamese: 'Hợp lý thôi. / Chấp nhận được.'
  },
  469: {
    japanese: 'かなり。／それなりに。',
    chinese: '相当。(xiāng dāng) / 挺。(tǐng)',
    spanish: 'Bastante. / Justamente.',
    vietnamese: 'Khá là. / Tương đối tốt.'
  },
  470: {
    japanese: 'かなり。／相当（そうとう）に。',
    chinese: '相当。(xiāng dāng) / 很。(hěn)',
    spanish: 'Bastante. / Completamente.',
    vietnamese: 'Khá tuyệt. / Rất tốt.'
  },
  471: {
    japanese: 'かなり。／結構（けっこう）。',
    chinese: '挺。(tǐng) / 很。(hěn)',
    spanish: 'Bastante. / Muy.',
    vietnamese: 'Khá đấy. / Đẹp phết.'
  },
  472: {
    japanese: 'むしろ。／かなりの程度（ていど）。',
    chinese: '相当。(xiāng dāng) / 宁愿。(nìng yuàn)',
    spanish: 'Más bien. / Bastante.',
    vietnamese: 'Đúng hơn là. / Khá đấy chứ.'
  },
  473: {
    japanese: 'とても。／非常（ひじょう）に。',
    chinese: '很。(hěn) / 非常。(fēi cháng)',
    spanish: 'Muy. / Mucho.',
    vietnamese: 'Rất. / Cực kỳ.'
  },
  474: {
    japanese: '極めて（きわめて）。／極端（きょくたん）に。',
    chinese: '极其。(jí qí) / 非常。(fēi cháng)',
    spanish: 'Extremadamente. / En grado sumo.',
    vietnamese: 'Vô cùng. / Hết sức.'
  },
  475: {
    japanese: '高度（こうど）に。／非常（ひじょう）に。',
    chinese: '高度。(gāo dù) / 非常。(fēi cháng)',
    spanish: 'Altamente. / Muy.',
    vietnamese: 'Rất cao. / Một cách sâu sắc.'
  },
  476: {
    japanese: '非常（ひじょう）に。／度（ど）を越（こ）して。',
    chinese: '极大地。(jí dà de) / 非常。(fēi cháng)',
    spanish: 'Excesivamente. / Sumamente.',
    vietnamese: 'Cực kỳ. / Quá mức.'
  },
  477: {
    japanese: '特（とく）に。／とりわけ。',
    chinese: '尤其是。(yóu qí shì) / 格外。(gé wài)',
    spanish: 'Particularmente. / Especialmente.',
    vietnamese: 'Đặc biệt là. / Riêng biệt.'
  },
  478: {
    japanese: '特（とく）に。／格別（かくべつ）に。',
    chinese: '特别。(tè bié) / 尤其。(yóu qí)',
    spanish: 'Especialmente. / Sobre todo.',
    vietnamese: 'Nhất là. / Đặc biệt trân trọng.'
  },
  479: {
    japanese: '異常（いじょう）に。／並（なみ）外（はず）れて。',
    chinese: '异常地。(yì cháng de) / 特别。(tè bié)',
    spanish: 'Inusualmente. / Fuera de lo común.',
    vietnamese: 'Khác thường. / Một cách kỳ lạ.'
  },
  480: {
    japanese: '例外（れいがい）的（てき）に。／非常（ひじょう）に。',
    chinese: '杰出地。(jié chū de) / 特别。(tè bié)',
    spanish: 'Excepcionalmente. / Extraordinariamente.',
    vietnamese: 'Ngoại lệ luôn. / Hiếm thấy.'
  },
  481: {
    japanese: '並（なみ）外（はず）れて。／驚（おどろ）くほど。',
    chinese: '非凡。(fēi fán) / 特别。(tè bié)',
    spanish: 'Extraordinariamente. / Increíblemente.',
    vietnamese: 'Phi thường. / Một cách phi phàm.'
  },
  482: {
    japanese: '注目（ちゅうもく）すべき。／素晴らしい（すばらしい）。',
    chinese: '显著地。(xiǎn zhù de) / 棒极了。(bàng jí le)',
    spanish: 'Notable. / Destacable.',
    vietnamese: 'Đáng chú ý. / Rất ra gì và này nọ.'
  },
  483: {
    japanese: '驚（おどろ）くほど。／意外（いがい）にも。',
    chinese: '令人惊讶地。(lìng rén jīng yà de) / 竟然。(jìng rán)',
    spanish: 'Sorprendentemente. / Curiosamente.',
    vietnamese: 'Bất ngờ thay. / Thật ngạc nhiên.'
  },
  484: {
    japanese: '驚（おどろ）くほど。／見事（みごと）に。',
    chinese: '令人惊艳地。(lìng rén jīng yàn de) / 太给力了。(tài gěi lì le)',
    spanish: 'Asombrosamente. / Maravillosamente.',
    vietnamese: 'Thật kinh ngạc. / Tuyệt vời ông mặt trời.'
  },
  485: {
    japanese: '信（しん）じられないほど。／とてつもなく。',
    chinese: '难以置信地。(nán yǐ zhì xìn de) / 特别。(tè bié)',
    spanish: 'Increíblemente. / De locos.',
    vietnamese: 'Không thể tin nổi. / Quá mức tưởng tượng.'
  },
  486: {
    japanese: 'ひどく。／猛烈（もうれつ）に。',
    chinese: '极其。(jí qí) / 真够呛。(zhēn gòu qiàng)',
    spanish: 'Terriblemente. / Fatal.',
    vietnamese: 'Rất tệ. / Kinh khủng khiếp.'
  },
  487: {
    japanese: 'ひどく。／大変（たいへん）に。',
    chinese: '非常。(fēi cháng) / 糟糕。(zāo gāo)',
    spanish: 'Horriblemente. / Pésimamente.',
    vietnamese: 'Quá tệ. / Dở tệ luôn.'
  },
  488: {
    japanese: '明らかに（あきらかに）。／断固（だんこ）として。',
    chinese: '果断地。(guǒ duàn de) / 显然。(xiǎn rán)',
    spanish: 'Decididamente. / Claramente.',
    vietnamese: 'Một cách quyết đoán. / Rõ ràng là.'
  },
  489: {
    japanese: '間違い（まちがい）なく。／確実（かくじつ）に。',
    chinese: '肯定地。(kěn dìng de) / 绝对。(jué duì)',
    spanish: 'Definitivamente. / Sin duda.',
    vietnamese: 'Chắc chắn rồi. / Không bàn cãi.'
  },
  490: {
    japanese: '絶対（ぜったい）に。／断固（だんこ）として。',
    chinese: '绝对。(jué duì) / 肯定。(kěn dìng)',
    spanish: 'Absolutamente. / Totalmente.',
    vietnamese: 'Tuyệt đối. / Hoàn toàn luôn.'
  },
  491: {
    japanese: '完全に（かんぜんに）。／全く（まったく）。',
    chinese: '完全。(wán quán) / 全部。(quán bù)',
    spanish: 'Totalmente. / Por completo.',
    vietnamese: 'Tổng cộng. / Toàn bộ luôn.'
  },
  492: {
    japanese: '完全に（かんぜんに）。／そっくり。',
    chinese: '彻底。(chè dǐ) / 完全。(wán quán)',
    spanish: 'Completamente. / Totalmente.',
    vietnamese: 'Hoàn toàn. / Triệt để.'
  },
  493: {
    japanese: '全（ぜん）て。／すっかり。',
    chinese: '完全。(wán quán) / 统统。(tǒng tǒng)',
    spanish: 'Enteramente. / Íntegramente.',
    vietnamese: 'Toàn bộ. / Toàn diện.'
  },
  494: {
    japanese: '純粋（じゅんすい）に。／単（たん）に。',
    chinese: '纯粹。(chún cuì) / 只是。(zhǐ shì)',
    spanish: 'Puramente. / Simplemente.',
    vietnamese: 'Đơn thuần là. / Tinh khiết.'
  },
  495: {
    japanese: '丸（まる）ごと。／完全に（かんぜんに）。',
    chinese: '全盘。(quán pán) / 彻底。(chè dǐ)',
    spanish: 'Totalmente. / Plenamente.',
    vietnamese: 'Trọn vẹn. / Toàn tâm toàn ý.'
  },
  496: {
    japanese: '徹底（てってい）的（てき）に。／漏（も）れなく。',
    chinese: '彻底。(chè dǐ) / 仔仔细细。(zǐ zǐ xì xì)',
    spanish: 'A fondo. / Minuciosamente.',
    vietnamese: 'Một cách thấu đáo. / Tỉ mỉ.'
  },
  497: {
    japanese: '全く（まったく）もって。／完全に（かんぜんに）。',
    chinese: '完全。(wán quán) / 简直。(jiǎn zhí)',
    spanish: 'Totalmente. / Absolutamente.',
    vietnamese: 'Hoàn toàn. / Tuyệt đối.'
  },
  498: {
    japanese: '絶対（ぜったい）に。／無（む）条件（じょうけん）に。',
    chinese: '绝对地。(jué duì de) / 无疑。(wú yí)',
    spanish: 'En absoluto. / Sin reservas.',
    vietnamese: 'Chắc như đinh đóng cột. / Tuyệt đối.'
  },
  499: {
    japanese: '完璧（かんぺき）に。／申し分（もうしぶん）なく。',
    chinese: '完美。(wán měi) / 十全十美。(shí quán shí měi)',
    spanish: 'Perfectamente. / Sin fallas.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  500: {
    japanese: '十分に（じゅうぶんに）。／全（ぜん）て。',
    chinese: '地。(de) / 充分地。(chōng fèn de)',
    spanish: 'Plenamente. / Totalmente.',
    vietnamese: 'Đầy đủ. / Trọn vẹn.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 451-500 updated.');
