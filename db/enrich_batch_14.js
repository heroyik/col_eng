const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  801: {
    japanese: 'ゆっくりと。／時間をかけて（じかんをかけて）。',
    chinese: '慢慢地。(màn màn de) / 悠着点儿。(yōu zhe diǎnr)',
    spanish: 'Lentamente. / Despacio.',
    vietnamese: 'Một cách chậm rãi. / Thong thả.'
  },
  802: {
    japanese: '徐々（じょじょ）に。／段階（だんかい）を追っ（おっ）て。',
    chinese: '逐渐地。(zhú jiàn de) / 渐渐。(jiàn jiàn)',
    spanish: 'Gradualmente. / Poco a poco.',
    vietnamese: 'Dần dần. / Từ từ.'
  },
  803: {
    japanese: '一（いち）歩（ぽ）ずつ。／着実（ちゃくじつ）に。',
    chinese: '循序渐进地。(xún xù jiàn jìn de) / 一步一个脚印。(yí bù yí gè jiǎo yìn)',
    spanish: 'Paso a paso. / Debidamente.',
    vietnamese: 'Từng bước một. / Chầm chậm mà chắc.'
  },
  804: {
    japanese: '少し（すこし）ずつ。／じわじわと。',
    chinese: '一点点地。(yì diǎn diǎn de) / 慢慢来。(màn màn lái)',
    spanish: 'Poco a poco. / Por partes.',
    vietnamese: 'Từng tí một. / Chút một.'
  },
  805: {
    japanese: '少し（すこし）ずつ。／徐々（じょじょ）に。',
    chinese: '逐渐地。(zhú jiàn de) / 慢火炖。(màn huǒ dùn)',
    spanish: 'Poco a poco. / Gradualmente.',
    vietnamese: 'Dần dà. / Từng chút một thôi.'
  },
  806: {
    japanese: 'ますます。／いよいよ。',
    chinese: '日益地。(rì yì de) / 越发。(yuè fā)',
    spanish: 'Cada vez más. / En aumento.',
    vietnamese: 'Ngày càng tăng. / Càng ngày càng.'
  },
  807: {
    japanese: '進歩（しんぽ）的に（てきに）。／着実（ちゃくじつ）に。',
    chinese: '进步地。(jìn bù de) / 稳步前进。(wěn bù qián jìn)',
    spanish: 'Progresivamente. / En adelante.',
    vietnamese: 'Một cách tịnh tiến. / Dần dần phát triển.'
  },
  808: {
    japanese: '着実（ちゃくじつ）に。／絶（た）えず。',
    chinese: '稳步地。(wěn bù de) / 持续。(chí xù)',
    spanish: 'Constantemente. / Regularmente.',
    vietnamese: 'Đều đặn. / Vững vàng.'
  },
  809: {
    japanese: '絶（た）えず。／いつも。',
    chinese: '总是一样。(zǒng shì yí yàng) / 经常。(jīng cháng)',
    spanish: 'Constantemente. / Continuamente.',
    vietnamese: 'Luôn như vậy. / Liên tục không đổi.'
  },
  810: {
    japanese: '継続（けいぞく）的（てき）に。／休み（やすみ）なく。',
    chinese: '连续地。(lián xù de) / 一直。(yì zhí)',
    spanish: 'Continuamente. / Sin parar.',
    vietnamese: 'Một cách liên tục. / Xuyên suốt.'
  },
  811: {
    japanese: '絶（た）え間（ま）なく。／永遠（えいえん）に。',
    chinese: '无休止地。(wú xiū zhǐ de) / 没完。(méi wán)',
    spanish: 'Sin cesar. / Incesantemente.',
    vietnamese: 'Không ngừng nghỉ. / Dứt khoát không dừng.'
  },
  812: {
    japanese: 'ひっきりなしに。／絶（た）えず。',
    chinese: '不停地。(bù tíng de) / 老是。(lǎo shi)',
    spanish: 'Incesantemente. / Sin tregua.',
    vietnamese: 'Dồn dập. / Không dứt.'
  },
  813: {
    japanese: '永久（えいきゅう）に。／果（は）てしなく。',
    chinese: '永恒地。(yǒng héng de) / 没完没了。(méi wán méi liǎo)',
    spanish: 'Perpetuamente. / Para siempre.',
    vietnamese: 'Vĩnh viễn. / Mãi mãi.'
  },
  814: {
    japanese: '永遠（えいえん）に。／不朽（ふきゅう）の。',
    chinese: '永远地。(yǒng yuǎn de) / 万岁。(wàn suì)',
    spanish: 'Eternamente. / Por los siglos.',
    vietnamese: 'Ngàn thu. / Mãi mãi không phai.'
  },
  815: {
    japanese: '永遠に（えいえんに）。／いつまでも。',
    chinese: '永远。(yǒng yuǎn) / 一辈子。(yí bèi zi)',
    spanish: 'Para siempre. / Por toda la vida.',
    vietnamese: 'Mãi mãi. / Cho đến tận cùng.'
  },
  816: {
    japanese: '果（は）てしなく。／無限（むげん）に。',
    chinese: '无止境地。(wú zhǐ jìng de) / 没完。(méi wán)',
    spanish: 'Sin fin. / Interminablemente.',
    vietnamese: 'Vô tận. / Không có điểm dừng.'
  },
  817: {
    japanese: '際限（さいげん）なく。／広大（こうだい）に。',
    chinese: '无限地。(wú xiàn de) / 天大地大。(tiān dà dì dà)',
    spanish: 'Ilimitadamente. / Sin fronteras.',
    vietnamese: 'Bao la. / Không biên giới.'
  },
  818: {
    japanese: '無限（むげん）に。／際限（さいげん）なく。',
    chinese: '无穷地。(wú qióng de) / 极大地。(jí dà de)',
    spanish: 'Infinitamente. / Eternamente.',
    vietnamese: 'Vô cực. / Mênh mông vô tận.'
  },
  819: {
    japanese: '膨大（ぼうだい）に。／非常（ひじょう）に。',
    chinese: '极大地。(jí dà de) / 海量。(hǎi liàng)',
    spanish: 'Inmensamente. / Enormemente.',
    vietnamese: 'Rất nhiều. / Một cách bao la.'
  },
  820: {
    japanese: '莫大（ばくだい）に。／巨大（きょだい）に。',
    chinese: '巨大地。(jù dà de) / 特大。(tè dà)',
    spanish: 'Enormemente. / Grandemente.',
    vietnamese: 'Khổng lồ. / Một cách to lớn.'
  },
  821: {
    japanese: '大部分（だいぶぶん）は。／実（じつ）に。',
    chinese: '在很大程度上。(zài hěn dà chéng dù shàng) / 主要是。(zhǔ yào shì)',
    spanish: 'En gran parte. / Sobre todo.',
    vietnamese: 'Phần lớn là. / Đa số.'
  },
  822: {
    japanese: '大いに（おおいに）。／非常（ひじょう）に。',
    chinese: '极大地。(jí dà de) / 很。(hěn)',
    spanish: 'Grandemente. / Mucho.',
    vietnamese: 'Rất nhiều. / Một cách to lớn.'
  },
  823: {
    japanese: '高度（こうど）に。／非常（ひじょう）に。',
    chinese: '高度。(gāo dù) / 特别。(tè bié)',
    spanish: 'Altamente. / Muy.',
    vietnamese: 'Cấp độ cao. / Rất chi là.'
  },
  824: {
    japanese: '極めて（きわめて）。／極端（きょくたん）に。',
    chinese: '极其地。(jí qí de) / 极端。(jí duān)',
    spanish: 'Extremadamente. / Sumamente.',
    vietnamese: 'Vô cùng. / Hết sức.'
  },
  825: {
    japanese: 'ひどく。／猛烈（もうれつ）に。',
    chinese: '极度地。(jí dù de) / 真够受的。(zhēn gòu shòu de)',
    spanish: 'Terriblemente. / Fatal.',
    vietnamese: 'Rất tệ. / Kinh khủng.'
  },
  826: {
    japanese: 'ひどく。／大変（たいへん）に。',
    chinese: '非常地。(fēi cháng de) / 糟糕。(zāo gāo)',
    spanish: 'Horriblemente. / Pésimamente.',
    vietnamese: 'Dở tệ. / Quá oải.'
  },
  827: {
    japanese: '恐（おそ）ろしく。／ひどく。',
    chinese: '惨地。(cǎn de) / 吓死人。(xià sǐ rén)',
    spanish: 'Espantosamente. / Atrozmente.',
    vietnamese: 'Kinh hoàng. / Đáng sợ.'
  },
  828: {
    japanese: '衝撃（しょうげき）的（てき）に。／驚（おどろ）くほど。',
    chinese: '令人震惊地。(lìng rén zhèn jīng de) / 居然。(jū rán)',
    spanish: 'Escandalosamente. / Sorprendentemente.',
    vietnamese: 'Gây sốc. / Kinh ngạc.'
  },
  829: {
    japanese: '仰天（ぎょうてん）するほど。／ひどく。',
    chinese: '大跌眼镜地。(dà diē yǎn jìng de) / 吓坏了。(xià huài le)',
    spanish: 'Pavorosamente. / De forma espantosa.',
    vietnamese: 'Kinh khủng. / Thật kinh tởm.'
  },
  830: {
    japanese: 'ひどく。／嫌（いや）な感じ（かんじ）で。',
    chinese: '糟糕地。(zāo gāo de) / 特别差。(tè bié chà)',
    spanish: 'Horriblemente. / Muy mal.',
    vietnamese: 'Rất dở. / Tệ hại.'
  },
  831: {
    japanese: 'ひどく。／へたに。',
    chinese: '差劲地。(chà jìn de) / 很坏。(hěn huài)',
    spanish: 'Malamente. / Gravemente.',
    vietnamese: 'Rất tệ. / Thiếu sót nhiều.'
  },
  832: {
    japanese: '不十分（ふじゅうぶん）に。／乏（とぼ）しく。',
    chinese: '贫乏地。(pín fá de) / 穷得可以。(qióng de kě yǐ)',
    spanish: 'Pobremente. / Mal.',
    vietnamese: 'Nghèo nàn. / Một cách yếu kém.'
  },
  833: {
    japanese: '弱々しく（よわよわしく）。／かすかに。',
    chinese: '虚弱地。(xū ruò de) / 没劲儿。(méi jìn r)',
    spanish: 'Débilmente. / Sin fuerza.',
    vietnamese: 'Một cách yếu ớt. / Mong manh.'
  },
  834: {
    japanese: '弱々しく（よわよわしく）。／力（ちから）なく。',
    chinese: '软弱地。(ruǎn ruò de) / 无力地。(wú lì de)',
    spanish: 'Feblemente. / Sin vigor.',
    vietnamese: 'Yếu ớt. / Bạc nhược.'
  },
  835: {
    japanese: 'かすかに。／ぼんやりと。',
    chinese: '微弱地。(wēi ruò de) / 隐隐约约。(yǐn yǐn yuē yuē)',
    spanish: 'Tenuemente. / Ligeramente.',
    vietnamese: 'Thấp thoáng. / Mờ nhạt.'
  },
  836: {
    japanese: 'ほの暗く（ほのぐらく）。／はっきりとしない。',
    chinese: '昏暗地。(hūn àn de) / 看不清。(kàn bù qīng)',
    spanish: 'Tenuemente. / Oscuramente.',
    vietnamese: 'Tù mù. / Một cách mờ ảo.'
  },
  837: {
    japanese: '曖昧（あいまい）に。／世（よ）に知（し）られず。',
    chinese: '模糊地。(mó hu de) / 没名气。(méi míng qi)',
    spanish: 'Oscuramente. / Confusamente.',
    vietnamese: 'Một cách mơ hồ. / Ít người biết đến.'
  },
  838: {
    japanese: '漠然（ばくぜん）と。／ぼんやりと。',
    chinese: '大概。(dà gài) / 意思模糊。(yì si mó hu)',
    spanish: 'Vagamente. / Sin precisión.',
    vietnamese: 'Một cách mơ hồ. / Mông lung.'
  },
  839: {
    japanese: 'はっきりしない。／区別（くべつ）がつかない。',
    chinese: '模糊不清地。(mó hu bù qīng de) / 听不真切。(tīng bù zhēn qiè)',
    spanish: 'Confusamente. / Indistintamente.',
    vietnamese: 'Không rõ ràng. / Lờ mờ.'
  },
  840: {
    japanese: '霞ん（かすん）だ。／ぼんやりした。',
    chinese: '朦胧地。(méng lóng de) / 雾蒙蒙。(wù méng méng)',
    spanish: 'Nublado. / Borroso.',
    vietnamese: 'Mơ màng. / Như có sương mù.'
  },
  841: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 肯定。(kěn dìng)',
    spanish: 'Claramente. / Sin dudas.',
    vietnamese: 'Rõ ràng. / Rành rọt.'
  },
  842: {
    japanese: '明るく（あかるく）。／鮮明（せんめい）に。',
    chinese: '明亮地。(míng liàng de) / 灿烂。(càn làn)',
    spanish: 'Brillantemente. / Con claridad.',
    vietnamese: 'Sáng lạng. / Rực rỡ.'
  },
  843: {
    japanese: '鮮やか（あざやか）に。／生き生き（いきいき）と。',
    chinese: '生动地。(shēng dòng de) / 历历在目。(lì lì zài mù)',
    spanish: 'Vívidamente. / Con viveza.',
    vietnamese: 'Sống động. / Một cách sinh động.'
  },
  844: {
    japanese: '鋭く（ふるどく）。／急激（きゅうげき）に。',
    chinese: '锐利地。(ruì lì de) / 突然。(tū rán)',
    spanish: 'Afiladamente. / Bruscamente.',
    vietnamese: 'Sắc bén. / Một cách đột ngột.'
  },
  845: {
    japanese: 'はっきりと。／明確（めいかく）に。',
    chinese: '清晰地。(qīng xī de) / 截然不同。(jié rán bù tóng)',
    spanish: 'Claramente. / Distintamente.',
    vietnamese: 'Một cách riêng biệt. / Rõ nét.'
  },
  846: {
    japanese: '明白（めいはく）に。／ありのままに。',
    chinese: '平易地。(píng yì de) / 一眼就看穿。(yì yǎn jiù kàn chuān)',
    spanish: 'Llanamente. / Claramente.',
    vietnamese: 'Rõ rành rành. / Một cách đơn giản.'
  },
  847: {
    japanese: '明らかに（あきらかに）。／言うまでもなく（いうまでもなく）。',
    chinese: '显而易见地。(xiǎn ér yì jiàn de) / 摆明了。(bǎi míng le)',
    spanish: 'Obviamente. / Claramente.',
    vietnamese: 'Hiển nhiên. / Rõ như ban ngày.'
  },
  848: {
    japanese: '見たところ。／明らかに（あきらかに）。',
    chinese: '显然地。(xiǎn rán de) / 看来。(kàn lái)',
    spanish: 'Evidentemente. / Aparentemente.',
    vietnamese: 'Dễ thấy. / Có vẻ là.'
  },
  849: {
    japanese: '透き通っ（すきとおっ）て。／見え透い（みえすい）て。',
    chinese: '透明地。(tòu míng de) / 一目了然。(yí mutes liǎo rán)',
    spanish: 'Transparentemente. / De forma clara.',
    vietnamese: 'Trong suốt. / Một cách minh bạch.'
  },
  850: {
    japanese: 'オープンに。／隠（かく）さずに。',
    chinese: '公开地。(gōng kāi de) / 敞开说。(chǎng kāi shuō)',
    spanish: 'Abiertamente. / Sin reservas.',
    vietnamese: 'Một cách cởi mở. / Công khai.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 801-850 updated.');
