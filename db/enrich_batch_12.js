const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  701: {
    japanese: '大胆（だいたん）に。／不敵（ふてき）に。',
    chinese: '大胆地。(dà dǎn de) / 奔放。(bēn fàng)',
    spanish: 'Audazmente. / Con osadía.',
    vietnamese: 'Một cách táo bạo. / Gan dạ.'
  },
  702: {
    japanese: '誇らしげ（ほこらしげ）に。／堂々（どうどう）と。',
    chinese: '自豪地。(zì háo de) / 挺起胸膛。(tǐng qǐ xiōng táng)',
    spanish: 'Orgullosamente. / Con orgullo.',
    vietnamese: 'Một cách tự hào. / Hiên ngang.'
  },
  703: {
    japanese: '傲慢（ごうまん）に。／横柄（おうへい）に。',
    chinese: '傲慢地。(ào màn de) / 目中无人。(mù zhōng wú rén)',
    spanish: 'Arrogantemente. / Con prepotencia.',
    vietnamese: 'Một cách ngạo mạn. / Kiêu căng.'
  },
  704: {
    japanese: '高飛車（たかびしゃ）に。／見下し（みくだし）て。',
    chinese: '傲慢地。(ào màn de) / 趾高气扬。(zhǐ gāo qì yáng)',
    spanish: 'Alteaneramente. / Con altivez.',
    vietnamese: 'Một cách kiêu kỳ. / Trịnh thượng.'
  },
  705: {
    japanese: '軽蔑（けいべつ）して。／鼻（はな）であしらって。',
    chinese: '蔑视地。(miè shì de) / 不屑。(bú xiè)',
    spanish: 'Desdeñosamente. / Con desprecio.',
    vietnamese: 'Khinh khỉnh. / Một cách coi thường.'
  },
  706: {
    japanese: 'あざけるように。／馬鹿（ばか）にして。',
    chinese: '嘲笑地。(cháo xiào de) / 挖苦。(wā ku)',
    spanish: 'Burlonamente. / En son de mofa.',
    vietnamese: 'Chế giễu. / Mang tính cợt nhả.'
  },
  707: {
    japanese: '皮肉（ひにく）たっぷりに。／あてこすり。',
    chinese: '讥笑地。(jī xiào de) / 阴阳怪气。(yīn yáng guài qì)',
    spanish: 'Sarcásticamente. / Con sarcasmo.',
    vietnamese: 'Một cách mỉa mai. / Châm chọc.'
  },
  708: {
    japanese: '皮肉（ひにく）にも。／反語（はんご）的（てき）に。',
    chinese: '具有讽刺意味地。(jù yǒu fěng cì yì wèi de) / 讽刺。(fěng cì)',
    spanish: 'Irónicamente. / Por ironía.',
    vietnamese: 'Đầy trớ trêu. / Mang tính mỉa mai.'
  },
  709: {
    japanese: '冷笑（れいしょう）的（てき）に。／ひねくれて。',
    chinese: '愤世嫉俗地。(fèn shì jí sú de) / 冷嘲热讽。(lěng cháo rè fěng)',
    spanish: 'Cínicamente. / Con cinismo.',
    vietnamese: 'Hoài nghi nhân sinh. / Một cách cay độc.'
  },
  710: {
    japanese: '懐疑（かいぎ）的（てき）に。／疑っ（うたがっ）て。',
    chinese: '怀疑地。(huái yí de) / 不信。(bú xìn)',
    spanish: 'Escépticamente. / Con escepticismo.',
    vietnamese: 'Một cách hoài nghi. / Bán tín bán nghi.'
  },
  711: {
    japanese: '疑（うたが）わしげに。／不確実（ふかくじつ）に。',
    chinese: '怀疑地。(huái yí de) / 拿不准。(ná bù zhǔn)',
    spanish: 'Dudosamente. / Con dudas.',
    vietnamese: 'Đầy nghi ngờ. / Do dự.'
  },
  712: {
    japanese: '疑わし（うたがわし）げに。／怪（あや）しんで。',
    chinese: '起疑心地。(qǐ yí xīn de) / 疑神疑鬼。(yí shén yí guǐ)',
    spanish: 'Sospechosamente. / Con recelo.',
    vietnamese: 'Một cách khả nghi. / Đáng ngờ.'
  },
  713: {
    japanese: '用心深く（ようじんぶかく）。／警戒（けいかい）して。',
    chinese: '戒备地。(jiè bèi de) / 提防。(dī fang)',
    spanish: 'Cautelosamente. / Con cautela.',
    vietnamese: 'Một cách thận trọng. / Cảnh giác.'
  },
  714: {
    japanese: '慎重（しんちょう）に。／用心（ようじん）して。',
    chinese: '小心翼翼地。(xiǎo xīn yì yì de) / 谨慎。(jǐn shèn)',
    spanish: 'Cautosamente. / Con precaución.',
    vietnamese: 'Một cách cẩn mật. / Thận trọng.'
  },
  715: {
    japanese: '注意（ちゅうい）深く（ぶかく）。／丹念（たんねん）に。',
    chinese: '仔细地。(zǐ xì de) / 留神。(liú shén)',
    spanish: 'Cuidadosamente. / Con esmero.',
    vietnamese: 'Một cách cẩn thận. / Tỉ mỉ.'
  },
  716: {
    japanese: '賢明（けんめい）に。／慎重（しんちょう）に。',
    chinese: '审慎地。(shěn shèn de) / 稳妥。(wěn tuǒ)',
    spanish: 'Prudentemente. / Con buen juicio.',
    vietnamese: 'Một cách khôn ngoan. / Thận trọng.'
  },
  717: {
    japanese: '慎み（つつしみ）深く（ぶかく）。／目立た（めだた）ないように。',
    chinese: '谨慎地。(jǐn shèn de) / 低调。(dī diào)',
    spanish: 'Discretamente. / Sin llamar la atención.',
    vietnamese: 'Một cách kín đáo. / Khéo léo.'
  },
  718: {
    japanese: '賢く（かしこく）。／知恵（ちえ）を絞（しぼ）って。',
    chinese: '精明地。(jīng míng de) / 明智。(míng zhì)',
    spanish: 'Sabiamente. / Con sabiduría.',
    vietnamese: 'Khôn ngoan. / Một cách thông thái.'
  },
  719: {
    japanese: '思慮（しりょ）深く（ぶかく）。／思いやり（おもいやり）を持って。',
    chinese: '周到地。(zhōu dào de) / 体贴。(tǐ tiē)',
    spanish: 'Pensativamente. / Consideradamente.',
    vietnamese: 'Trầm ngâm. / Một cách chu đáo.'
  },
  720: {
    japanese: '深く（ふかく）。／心（こころ）の底（そこ）から。',
    chinese: '深深地。(shēn shēn de) / 彻底。(chè dǐ)',
    spanish: 'Profundamente. / Muy hondo.',
    vietnamese: 'Một cách sâu sắc. / Rất nhiều.'
  },
  721: {
    japanese: '心（こころ）から深く（ふかく）。／重大（じゅうだい）に。',
    chinese: '深切地。(shēn qiè de) / 极其。(jí qí)',
    spanish: 'Profundamente. / Enormemente.',
    vietnamese: 'Sâu thẳm. / Một cách uyên thâm.'
  },
  722: {
    japanese: '実質（じっしつ）的（てき）に。／かなり。',
    chinese: '实质上。(shí zhì shàng) / 相当地。(xiāng dāng de)',
    spanish: 'Sustancialmente. / En gran medida.',
    vietnamese: 'Về mặt thực tế. / Một cách đáng kể.'
  },
  723: {
    japanese: 'かなり。／意味深（いみしん）に。',
    chinese: '显着地。(xiǎn zhù de) / 重要地。(zhòng yào de)',
    spanish: 'Significativamente. / Notablemente.',
    vietnamese: 'Một cách đáng lưu ý. / Quan trọng.'
  },
  724: {
    japanese: 'かなり。／相当（そうとう）に。',
    chinese: '相当地。(xiāng dāng de) / 颇。(pō)',
    spanish: 'Considerablemente. / Bastante.',
    vietnamese: 'Đáng kể. / Khá là nhiều.'
  },
  725: {
    japanese: '目（め）に見（み）えて。／著しく（いちじるしく）。',
    chinese: '明显地。(míng xiǎn de) / 看得出。(kàn de chū)',
    spanish: 'Notoriamente. / Visiblemente.',
    vietnamese: 'Một cách dễ thấy. / Rõ rệt.'
  },
  726: {
    japanese: '著しく（いちじるしく）。／際立っ（きわだっ）て。',
    chinese: '显而易见地。(xiǎn ér yì jiàn de) / 明显。(míng xiǎn)',
    spanish: 'Marcadamente. / Notablemente.',
    vietnamese: 'Một cách rõ nét. / Khác biệt hẳn.'
  },
  727: {
    japanese: 'はっきりと。／明白（めいはく）に。',
    chinese: '清晰地。(qīng xī de) / 明白。(míng bai)',
    spanish: 'Claramente. / Sin lugar a dudas.',
    vietnamese: 'Một cách rõ ràng. / Thông suốt.'
  },
  728: {
    japanese: '明らかに（あきらかに）。／当然（とうぜん）。',
    chinese: '显而易见。(xiǎn ér yì jiàn) / 显然。(xiǎn rán)',
    spanish: 'Obviamente. / Por supuesto.',
    vietnamese: 'Hiển nhiên. / Rõ sờ sờ ra đó.'
  },
  729: {
    japanese: '明白（めいはく）に。／証拠（しょうこ）から見て。',
    chinese: '显然地。(xiǎn rán de) / 看样子。(kàn yàng zi)',
    spanish: 'Evidentemente. / Al parecer.',
    vietnamese: 'Rõ ràng là. / Có vẻ là vậy.'
  },
  730: {
    japanese: '一目（いちもく）瞭然（りょうぜん）で。／明白（めいはく）に。',
    chinese: '显而易见地。(xiǎn ér yì jiàn de) / 显然。(xiǎn rán)',
    spanish: 'Manifiestamente. / Patentemente.',
    vietnamese: 'Một cách hiển nhiên. / Biểu hiện rõ.'
  },
  731: {
    japanese: '疑（うたが）いなく。／確実（かくじつ）に。',
    chinese: '无疑地。(wú yí de) / 肯定。(kěn dìng)',
    spanish: 'Indudablemente. / Sin duda.',
    vietnamese: 'Chắc chắn không nghi ngờ. / Rõ ràng.'
  },
  732: {
    japanese: '紛（まぎ）れもなく。／異論（いろん）の余地（よち）なく。',
    chinese: '无可争辩地。(wú kě zhēng biàn de) / 确实。(què shí)',
    spanish: 'Indiscutiblemente. / Sin discusión.',
    vietnamese: 'Không thể bàn cãi. / Tuyệt đối đúng.'
  },
  733: {
    japanese: '間違い（まちがい）なく。／絶対（ぜったい）に。',
    chinese: '毫无疑问。(háo wú yí wèn) / 绝对。(jué duì)',
    spanish: 'Inquestionablemente. / A ciencia cierta.',
    vietnamese: 'Không còn nghi ngờ gì nữa. / Chắc chắn.'
  },
  734: {
    japanese: '疑（うたが）う余地（よち）なく。／確信（かくしん）を持って。',
    chinese: '毫无疑问。(háo wú yí wèn) / 铁定。(tiě dìng)',
    spanish: 'Sin ninguna duda. / Más allá de toda duda.',
    vietnamese: 'Vượt trên mọi nghi ngờ. / Tuyệt đối tin tưởng.'
  },
  735: {
    japanese: '確かに（たしかに）。／間違い（まちがい）なく。',
    chinese: '肯定地。(kěn dìng de) / 准保。(zhǔn bǎo)',
    spanish: 'Con certeza. / Por seguro.',
    vietnamese: 'Một cách chắc chắn. / Chắc như đinh đóng cột.'
  },
  736: {
    japanese: '確かに（たしかに）。／もちろん。',
    chinese: '诚然。(chéng rán) / 当然。(dāng rán)',
    spanish: 'Sin duda. / Por supuesto.',
    vietnamese: 'Chắc chắn là vậy. / Đương nhiên rồi.'
  },
  737: {
    japanese: '実（じつ）は。／実際（じっさい）には。',
    chinese: '事实上。(shì shí shàng) / 其实。(qí shí)',
    spanish: 'De hecho. / En realidad.',
    vietnamese: 'Thực tế là. / Thật ra thì.'
  },
  738: {
    japanese: '事実（じじつ）上（じょう）。／実情（じつじょう）を言（い）えば。',
    chinese: '事实上。(shì shí shàng) / 说到底。(shuō dào dǐ)',
    spanish: 'En realidad. / De hecho.',
    vietnamese: 'Trên thực tế. / Điểm mấu chốt là.'
  },
  739: {
    japanese: '現実（げんじつ）には。／実際（じっさい）のところ。',
    chinese: '现实中。(xiàn shí zhōng) / 实际上。(shí jì shàng)',
    spanish: 'En la realidad. / Verdaderamente.',
    vietnamese: 'Trong thực tế. / Thực chất là.'
  },
  740: {
    japanese: '実際（じっさい）に。／本当は（ほんとうは）。',
    chinese: '实际上。(shí jì shàng) / 居然。(jū rán)',
    spanish: 'Realmente. / De hecho.',
    vietnamese: 'Thực sự. / Thực ra.'
  },
  741: {
    japanese: '本当（ほんとう）に。／全（まった）く。',
    chinese: '确实。(què shí) / 的确。(dí què)',
    spanish: 'En verdad. / Ciertamente.',
    vietnamese: 'Quả thực. / Thật sự.'
  },
  742: {
    japanese: '真実（しんじつ）。／誠（まこと）に。',
    chinese: '真实地。(zhēn shí de) / 实在。(shí zài)',
    spanish: 'Verdaderamente. / De veras.',
    vietnamese: 'Thật lòng. / Một cách chân chính.'
  },
  743: {
    japanese: '誠（まこと）に。／間違い（まちがい）なく。',
    chinese: '确实。(què shí) / 真的。(zhēn de)',
    spanish: 'En verdad. / Ciertamente.',
    vietnamese: 'Quả thật là. / Chân thực.'
  },
  744: {
    japanese: '嘘（うそ）偽り（いつわり）なく。／正直（しょうじき）に。',
    chinese: '如实地。(rú shí de) / 说实话。(shuō shí huà)',
    spanish: 'Fielmente. / Con la verdad por delante.',
    vietnamese: 'Một cách trung thực. / Đúng như sự thật.'
  },
  745: {
    japanese: '正直（しょうじき）に。／ありのままに。',
    chinese: '老实说。(lǎo shí shuō) / 坦诚。(tǎn chéng)',
    spanish: 'Honestamente. / Sinceramente.',
    vietnamese: 'Nói thiệt là. / Thật thà.'
  },
  746: {
    japanese: '本当（ほんとう）に。／マジで。',
    chinese: '真的吗？(zhēn de ma) / 的确。(dí què)',
    spanish: 'De verdad. / Realmente.',
    vietnamese: 'Thật á? / Thật sự luôn.'
  },
  747: {
    japanese: '本気（ほんき）で。／真剣（しんけん）に。',
    chinese: '认真地。(rèn zhēn de) / 说正经的。(shuō zhèng jing de)',
    spanish: 'En serio. / Seriamente.',
    vietnamese: 'Một cách nghiêm túc. / Không giỡn đâu.'
  },
  748: {
    japanese: '厳か（おごそか）に。／真摯（しんし）に。',
    chinese: '庄严地。(zhuāng yán de) / 肃穆。(sù mù)',
    spanish: 'Solemnemente. / Con solemnidad.',
    vietnamese: 'Linh thiêng. / Một cách trang trọng.'
  },
  749: {
    japanese: '真面目（まじめ）に。／心（こころ）から。',
    chinese: '切心地。(qiè xīn de) / 诚恳地。(chéng kěn de)',
    spanish: 'Ardientemente. / Con sinceridad.',
    vietnamese: 'Tha thiết. / Một cách sốt sắng.'
  },
  750: {
    japanese: '厳（おごそ）かに。／重大（じゅうだい）に。',
    chinese: '严肃地。(yán sù de) / 庄重。(zhuāng zhòng)',
    spanish: 'Gravemente. / Con seriedad.',
    vietnamese: 'Nghiêm trọng. / Trầm trọng.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 701-750 updated.');
