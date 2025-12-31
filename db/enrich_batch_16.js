const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  901: {
    japanese: '寛大（かんだい）に。／太腹（ふとっぱら）に。',
    chinese: '慷慨地。(kāng kǎi de) / 大方。(dà fāng)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Một cách rộng rãi. / Phóng khoáng.'
  },
  902: {
    japanese: '太腹（ふとっぱら）に。／広い（ひろい）心（こころ）で。',
    chinese: '宽宏大量地。(kuān hóng dà liàng de) / 没说的。(méi shuō de)',
    spanish: 'Magnánimamente. / Con grandeza.',
    vietnamese: 'Một cách độ lượng. / Hào hiệp.'
  },
  903: {
    japanese: '気高く（けだかく）。／崇高（すうこう）に。',
    chinese: '高尚地。(gāo shàng de) / 气派。(qì pài)',
    spanish: 'Noblemente. / Con nobleza.',
    vietnamese: 'Một cách cao quý. / Thanh cao.'
  },
  904: {
    japanese: '優雅（ゆうが）に。／しとやかに。',
    chinese: '优雅地。(yōu yǎ de) / 大方。(dà fāng)',
    spanish: 'Con gracia. / Elegantemente.',
    vietnamese: 'Một cách duyên dáng. / Thanh thoát.'
  },
  905: {
    japanese: '上品（じょうひん）に。／洗練（せんれん）されて。',
    chinese: '高雅地。(gāo yǎ de) / 讲究。(jiǎng jiu)',
    spanish: 'Elegantemente. / Con clase.',
    vietnamese: 'Một cách lịch thiệp. / Tao nhã.'
  },
  906: {
    japanese: '美しく（うつくしく）。／見事（みごと）に。',
    chinese: '漂亮地。(piào liang de) / 精湛。(jīng zhàn)',
    spanish: 'Hermosamente. / Bellamente.',
    vietnamese: 'Đẹp đẽ. / Tuyệt hảo.'
  },
  907: {
    japanese: '華やか（はなやか）に。／立派（りっぱ）に。',
    chinese: '辉煌地。(huī huáng de) / 精彩。(jīng cǎi)',
    spanish: 'Espléndidamente. / De maravilla.',
    vietnamese: 'Rực rỡ. / Lộng lẫy.'
  },
  908: {
    japanese: '壮大（そうだい）に。／堂々（どうどう）と。',
    chinese: '宏伟地。(hóng wěi de) / 气派。(qì pài)',
    spanish: 'Magníficamente. / Grandiosamente.',
    vietnamese: 'Một cách tráng lệ. / Vĩ đại.'
  },
  909: {
    japanese: '盛大（せいだい）に。／立派（りっぱ）に。',
    chinese: '宏大。(hóng dà) / 隆重。(lóng zhòng)',
    spanish: 'Grandiosamente. / Con pompa.',
    vietnamese: 'Hùng vĩ. / Uy nghi.'
  },
  910: {
    japanese: '最高（さいこう）に。／申し分（もうしぶん）なく。',
    chinese: '极好地。(jí hǎo de) / 顶呱呱。(dǐng guā guā)',
    spanish: 'Superbiamente. / Excelente.',
    vietnamese: 'Tuyệt hảo. / Xuất sắc.'
  },
  911: {
    japanese: '素晴らしく（すばらしく）。／驚（おどろ）くほど。',
    chinese: '绝佳。(jué jiā) / 太棒了。(tài bàng le)',
    spanish: 'Maravillosamente. / Estupendamente.',
    vietnamese: 'Kỳ diệu. / Thật là tuyệt.'
  },
  912: {
    japanese: '驚（おどろ）くほど素晴らしく（すばらしく）。／驚（おどろ）くべき。',
    chinese: '奇迹般地。(qí jì bān de) / 神了。(shén le)',
    spanish: 'Maravillosamente. / Increíblemente.',
    vietnamese: 'Kỳ lạ. / Một cách thần kỳ.'
  },
  913: {
    japanese: '優秀（ゆうしゅう）に。／抜きん出（ぬきんで）て。',
    chinese: '杰出地。(jié chū de) / 优秀。(yōu xiù)',
    spanish: 'Excelentemente. / De forma sobresaliente.',
    vietnamese: 'Giỏi giang. / Ưu tú.'
  },
  914: {
    japanese: '完璧（かんぺき）に。／理想（りそう）的（てき）に。',
    chinese: '完美地。(wán měi de) / 没治了。(méi zhì le)',
    spanish: 'Perfectamente. / Sin fallos.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  915: {
    japanese: '非（ひ）の打ち（うち）どころなく。／鮮やか（あざやか）に。',
    chinese: '毫无瑕疵地。(háo wú xiá cī de) / 圆满。(yuán mǎn)',
    spanish: 'Sin tacha. / Impecablemente.',
    vietnamese: 'Không tì vết. / Sạch sành sanh.'
  },
  916: {
    japanese: '申し分（もうしぶん）なく。／端正（たんせい）に。',
    chinese: '无可挑剔地。(wú kě tiāo tì de) / 地道。(dì dao)',
    spanish: 'Impecablemente. / Irreprochablemente.',
    vietnamese: 'Một cách chuẩn mực. / Không chê vào đâu được.'
  },
  917: {
    japanese: '適切（てきせつ）に。／十分（じゅうぶん）に。',
    chinese: '充分地。(chōng fèn de) / 还算凑合。(hái suàn còu he)',
    spanish: 'Adecuadamente. / Lo suficiente.',
    vietnamese: 'Thỏa đáng. / Đủ xài.'
  },
  918: {
    japanese: '十分（じゅうぶん）に。／余裕（よゆう）を持って。',
    chinese: '足够地。(zú gòu de) / 撑得起。(chēng de qǐ)',
    spanish: 'Suficientemente. / Con suficiencia.',
    vietnamese: 'Một cách đầy đủ. / Sung túc.'
  },
  919: {
    japanese: '満足（まんぞく）のいくように。／十分（じゅうぶん）に。',
    chinese: '圆满地。(yuán mǎn de) / 够意思。(gòu yì si)',
    spanish: 'Satisfactoriamente. / Bien.',
    vietnamese: 'Thỏa đáng. / Vừa lòng đẹp ý.'
  },
  920: {
    japanese: '有能（ゆうのう）に。／そつなく。',
    chinese: '胜任地。(shèng rèn de) / 够格。(gòu gé)',
    spanish: 'Competentemente. / Con pericia.',
    vietnamese: 'Có năng lực. / Thạo việc.'
  },
  921: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 管用。(guǎn yòng)',
    spanish: 'Efectivamente. / Con resultados.',
    vietnamese: 'Hiệu quả. / Có tác động.'
  },
  922: {
    japanese: '効率（こうりつ）的（てき）に。／手際（てぎわ）よく。',
    chinese: '利索地。(lì suǒ de) / 省事儿。(shěng shì r)',
    spanish: 'Eficientemente. / Con agilidad.',
    vietnamese: 'Năng suất. / Khoa học.'
  },
  923: {
    japanese: '強力（きょうりょく）に。／力強く（ちからづよく）。',
    chinese: '强力地。(qiáng lì de) / 够劲儿。(gòu jìn r)',
    spanish: 'Poderosamente. / Con fuerza.',
    vietnamese: 'Mạnh mẽ. / Có uy lực.'
  },
  924: {
    japanese: '強く（つよく）。／猛烈（もうれつ）に。',
    chinese: '强烈地。(qiáng liè de) / 硬气。(yìng qi)',
    spanish: 'Fuertemente. / Con firmeza.',
    vietnamese: 'Bền vững. / Rất khỏe.'
  },
  925: {
    japanese: '凄まじく（すさまじく）。／力（ちから）任（まか）せに。',
    chinese: '威猛地。(wēi měng de) / 狠心地。(hěn xīn de)',
    spanish: 'Poderosamente. / Con gran vigor.',
    vietnamese: 'Mạnh bạo. / Dữ dội.'
  },
  926: {
    japanese: '強制的（きょうせいてき）に。／力（ちから）を込め（こめ）て。',
    chinese: '有力地。(yǒu lì de) / 强硬。(qiáng yìng)',
    spanish: 'Por la fuerza. / Con convicción.',
    vietnamese: 'Cưỡng ép. / Có sức ép.'
  },
  927: {
    japanese: '強烈（きょうれつ）に。／激（はげ）しく。',
    chinese: '强烈地。(qiáng liè de) / 猛。(měng)',
    spanish: 'Intensamente. / En grado sumo.',
    vietnamese: 'Dữ dội. / Quyết liệt.'
  },
  928: {
    japanese: '厳（きび）しく。／ひどく。',
    chinese: '严厉地。(yán lì de) / 够呛。(gòu qiàng)',
    spanish: 'Severamente. / Duramente.',
    vietnamese: 'Trầm trọng. / Khắt khe.'
  },
  929: {
    japanese: '厳（きび）しく。／辛辣（しんらつ）に。',
    chinese: '冷酷地。(lěng kù de) / 刺耳。(cì ěr)',
    spanish: 'Dura y secamente. / Cruelmente.',
    vietnamese: 'Cay nghiệt. / Khó khăn.'
  },
  930: {
    japanese: '雑（ざつ）に。／荒っぽく（あらっぽく）。',
    chinese: '粗鲁地。(cū lǔ de) / 毛糙。(máo cao)',
    spanish: 'Bruscamente. / De forma tosca.',
    vietnamese: 'Thô lỗ. / Sơ sài.'
  },
  931: {
    japanese: '失礼（しつれい）に。／無（む）作法（さほう）に。',
    chinese: '没礼貌地说。(méi lǐ mào de shuō) / 冒犯。(mào fàn)',
    spanish: 'Groseramente. / Con mala educación.',
    vietnamese: 'Bất lịch sự. / Khiếm nhã.'
  },
  932: {
    japanese: '丁寧（ていねい）に。／礼儀（れいぎ）正しく（ただしく）。',
    chinese: '客气地。(kè qi de) / 礼貌。(lǐ mào)',
    spanish: 'Educadamente. / Con cortesía.',
    vietnamese: 'Lịch sự. / Nhã nhặn.'
  },
  933: {
    japanese: '丁重（ていちょう）に。／礼儀（れいぎ）正しく（ただしく）。',
    chinese: '恭敬地。(gōng jìng de) / 周到。(zhōu dào)',
    spanish: 'Cortésmente. / Amablemente.',
    vietnamese: 'Hết sức lễ phép. / Chu đáo.'
  },
  934: {
    japanese: '敬意（けいい）を払っ（はらっ）て。／うやうやしく。',
    chinese: '尊敬地。(zūn jìng de) / 有礼有节。(yǒu lǐ yǒu jié)',
    spanish: 'Respetuosamente. / Con respeto.',
    vietnamese: 'Tôn trọng. / Kính cẩn.'
  },
  935: {
    japanese: '謙虚（けんきょ）に。／卑下（ひげ）して。',
    chinese: '谦虚地。(qiān xū de) / 低声下气。(dī shēng xià qì)',
    spanish: 'Humildemente. / Con modestia.',
    vietnamese: 'Khiêm tốn. / Nhún nhường.'
  },
  936: {
    japanese: '控えめ（ひかえめ）に。／目立た（めだた）ないように。',
    chinese: '低调地。(dī diào de) / 简朴。(jiǎn pǔ)',
    spanish: 'Modestamente. / Sencillamente.',
    vietnamese: 'Giản dị. / Không phô trương.'
  },
  937: {
    japanese: '恥ずかし（はずかし）そうに。／内気（うちき）に。',
    chinese: '腼腆地。(miǎn tiǎn de) / 害羞。(hài xiū)',
    spanish: 'Tímidamente. / Con timidez.',
    vietnamese: 'E thẹn. / Ngượng ngùng.'
  },
  938: {
    japanese: 'おどおどと。／臆病（おくびょう）に。',
    chinese: '胆怯地。(dǎn qiè de) / 畏畏缩缩。(wèi wèi suō suō)',
    spanish: 'Temerosamente. / Con miedo.',
    vietnamese: 'Rụt rè. / Nhút nhát.'
  },
  939: {
    japanese: '恐る（おそる）恐る（おそる）。／びくびくしながら。',
    chinese: '害怕地。(hài pà de) / 胆战心惊。(dǎn zhàn xīn jīng)',
    spanish: 'Con miedo. / Pavorosamente.',
    vietnamese: 'Sợ hãi. / Kinh hoàng.'
  },
  940: {
    japanese: '心配（しんぱい）そうに。／切実（せつじつ）に。',
    chinese: '焦急地。(jiāo jí de) / 担心地。(dān xīn de)',
    spanish: 'Ansiosamente. / Con inquietud.',
    vietnamese: 'Lo lắng. / Bồn chồn.'
  },
  941: {
    japanese: '緊張（きんちょう）して。／落ち着か（おちつか）ない様子（ようす）で。',
    chinese: '紧张地。(jǐn zhāng de) / 局促不安。(jú cù bù ān)',
    spanish: 'Nerviosamente. / Con nervios.',
    vietnamese: 'Hồi hộp. / Lo âu.'
  },
  942: {
    japanese: '冷静（れいせい）に。／落ち着い（おちつい）て。',
    chinese: '淡定地。(dàn dìng de) / 从容。(cóng róng)',
    spanish: 'Calmadamente. / Con calma.',
    vietnamese: 'Bình tĩnh. / Điềm đạm.'
  },
  943: {
    japanese: '静か（しずか）に。／ひっそりと。',
    chinese: '悄悄地。(qiāo qiāo de) / 没动静。(méi dòng jing)',
    spanish: 'Silenciosamente. / Con sigilo.',
    vietnamese: 'Lặng lẽ. / Yên tĩnh.'
  },
  944: {
    japanese: '平和（へいわ）に。／穏やか（おだやか）に。',
    chinese: '和平地。(hé píng de) / 安稳。(ān wěn)',
    spanish: 'Pacíficamente. / En paz.',
    vietnamese: 'Yên bình. / Hòa bình.'
  },
  945: {
    japanese: '穏やか（おだやか）に。／清らか（きよらか）に。',
    chinese: '安详地。(ān xiáng de) / 从容不迫。(cóng róng bú pò)',
    spanish: 'Serenamente. / Con serenidad.',
    vietnamese: 'Thanh thản. / Bình thản.'
  },
  946: {
    japanese: '辛抱強く（しんぼうづよく）。／じっと。',
    chinese: '耐心地。(nài xīn de) / 沉住气。(chén zhù qì)',
    spanish: 'Pacientemente. / Con paciencia.',
    vietnamese: 'Kiên nhẫn. / Nhẫn nại.'
  },
  947: {
    japanese: '揺るぎな（ゆるぎな）く。／泰然（たいぜん）自若（じじゃく）として。',
    chinese: '坚定地。(jiān dìng de) / 始终如一。(shǐ zhōng rú yī)',
    spanish: 'Firme e inquebrantable. / Con constancia.',
    vietnamese: 'Kiên định. / Trước sau như một.'
  },
  948: {
    japanese: '毅然（きぜん）として。／決然（けつぜん）と。',
    chinese: '坚决地。(jiān jué de) / 斩钉截铁。(zhǎn dīng jié tiě)',
    spanish: 'Resueltamente. / Con resolución.',
    vietnamese: 'Quyết liệt. / Dứt khoát.'
  },
  949: {
    japanese: '固い（かたい）決意（けつい）を持って。／断固（だんこ）として。',
    chinese: '下定决心。(xià dìng jué xīn) / 毅然。(yì rán)',
    spanish: 'Determinadamente. / Con decisión.',
    vietnamese: 'Kiên quyết. / Quyết chí.'
  },
  950: {
    japanese: '勇敢（ゆうかん）に。／勇ましく（いさましく）。',
    chinese: '英勇地。(yīng yǒng de) / 胆大。(dǎn dà)',
    spanish: 'Bravamente. / Con valentía.',
    vietnamese: 'Dũng cảm. / Can trường.'
  },
  951: {
    japanese: '勇気（ゆうき）を持って。／果敢（かかん）に。',
    chinese: '大胆地。(dà dǎn de) / 豁出去了。(huō chū qù le)',
    spanish: 'Valientemente. / Con coraje.',
    vietnamese: 'Bản lĩnh. / Không sợ hãi.'
  },
  952: {
    japanese: '恐れ（おそれ）を知ら（しら）ず。／大胆（だいたん）に。',
    chinese: '无畏地。(wú wèi de) / 一身是胆。(yì shēn shì dǎn)',
    spanish: 'Intrépidamente. / Sin miedo.',
    vietnamese: 'Vô úy. / Chẳng ngại ngần gì.'
  },
  953: {
    japanese: '大胆（だいたん）に。／不敵（ふてき）に。',
    chinese: '奔放地。(bēn fàng de) / 胆子肥。(dǎn zi féi)',
    spanish: 'Boldly. / Audazmente.',
    vietnamese: 'Táo bạo. / Gan dạ.'
  },
  954: {
    japanese: '思い切っ（おもいきっ）て。／危険（きけん）を返りみ（かえりみ）ず。',
    chinese: '冒险地。(mào xiǎn de) / 胆大包天。(dǎn dà bāo tiān)',
    spanish: 'Daringly. / Atrevidamente.',
    vietnamese: 'Liều lĩnh. / Thách thức.'
  },
  955: {
    japanese: '英雄（えいゆう）的に（てきに）。／華々しく（はなばなしく）。',
    chinese: '英雄般地。(yīng xióng bān de) / 壮烈。(zhuàng liè)',
    spanish: 'Heroicamente. / Como un héroe.',
    vietnamese: 'Anh hùng. / Hào hùng.'
  },
  956: {
    japanese: '勇ましく（いさましく）。／堂々（どうどう）と。',
    chinese: '勇敢地。(yǒng gǎn de) / 不屈。(bù qū)',
    spanish: 'Valerosamente. / Con valor.',
    vietnamese: 'Dũng mãnh. / Ngoan cường.'
  },
  957: {
    japanese: '気高く（けだかく）。／崇高（すうこう）に。',
    chinese: '高尚地。(gāo shàng de) / 气派。(qì pài)',
    spanish: 'Noblemente. / Con nobleza.',
    vietnamese: 'Cao quý. / Thanh cao.'
  },
  958: {
    japanese: '優しく（やさしく）。／穏やか（おだやか）に。',
    chinese: '温柔地。(wēn róu de) / 斯文。(sī wen)',
    spanish: 'Gentilmente. / Con delicadeza.',
    vietnamese: 'Nhẹ nhàng. / Lịch thiệp.'
  },
  959: {
    japanese: 'そっと。／柔らか（やわらか）に。',
    chinese: '轻轻地。(qīng qīng de) / 柔和。(róu hé)',
    spanish: 'Suavemente. / Quedo.',
    vietnamese: 'Khẽ khàng. / Êm ái.'
  },
  960: {
    japanese: '穏やか（おだやか）に。／控えめ（ひかえめ）に。',
    chinese: '稍微。(shāo wēi) / 温和。(wēn hé)',
    spanish: 'Levemente. / Con suavidad.',
    vietnamese: 'Ôn hòa. / Nhè nhẹ.'
  },
  961: {
    japanese: '優しく（やさしく）。／慈しみ（いつくしみ）を持って。',
    chinese: '温柔地。(wēn róu de) / 细心照顾。(xì xīn zhào gù)',
    spanish: 'Tiernamente. / Con cariño.',
    vietnamese: 'Dịu dàng. / Âu yếm.'
  },
  962: {
    japanese: '愛（あい）を込め（こめ）て。／深い（ふかい）愛情（あいじょう）で。',
    chinese: '慈爱地。(cí ài de) / 疼爱。(téng ài)',
    spanish: 'Amorosamente. / Con amor.',
    vietnamese: 'Yêu thương. / Trìu mến.'
  },
  963: {
    japanese: '慈しみ（いつくしみ）深く（ぶかく）。／懐かし（なつかし）そうに。',
    chinese: '深情地。(shēn qíng de) / 溺爱。(nì ài)',
    spanish: 'Cariñosamente. / Con afecto.',
    vietnamese: 'Thân thương. / Trìu mến.'
  },
  964: {
    japanese: '心（こころ）から。／真心（まごころ）を込め（こめ）て。',
    chinese: '热诚地。(rè chéng de) / 亲切。(qīn qiè)',
    spanish: 'Cordialmente. / Sinceramente.',
    vietnamese: 'Thân ái. / Chân tình.'
  },
  965: {
    japanese: '心（こころ）底（そこ）から。／たっぷり。',
    chinese: '衷心地。(zhōng xīn de) / 痛快。(tòng kuài)',
    spanish: 'Heartily. / De corazón.',
    vietnamese: 'Hết lòng. / Chân thành.'
  },
  966: {
    japanese: '暖かく（あたたかく）。／親身（しんみ）になって。',
    chinese: '温暖地。(wēn nuǎn de) / 热情招待。(rè qíng zhāo dài)',
    spanish: 'Warmly. / Cálidamente.',
    vietnamese: 'Nồng ấm. / Niềm nở.'
  },
  967: {
    japanese: '慈愛（じあい）に満ち（みち）て。／優しく（やさしく）。',
    chinese: '亲密地。(qīn mì de) / 亲热。(qīn rè)',
    spanish: 'Affectionately. / Cariñosamente.',
    vietnamese: 'Trìu mến. / Thân mật.'
  },
  968: {
    japanese: '親しみ（したしみ）やすく。／仲良く（なかよく）。',
    chinese: '友好地。(yǒu hǎo de) / 和气。(hé qi)',
    spanish: 'Friendly. / Amistosamente.',
    vietnamese: 'Thân thiện. / Hữu hảo.'
  },
  969: {
    japanese: '親切（しんせつ）に。／思いやり（おもいやり）を持って。',
    chinese: '亲切地。(qīn qiè de) / 好心。(hǎo xīn)',
    spanish: 'Kindly. / Amablemente.',
    vietnamese: 'Tử tế. / Tận tụy.'
  },
  970: {
    japanese: '気前（きまえ）よく。／惜しみ（おしみ）なく。',
    chinese: '慷慨地。(kāng kǎi de) / 大方。(dà fāng)',
    spanish: 'Generously. / Con generosidad.',
    vietnamese: 'Hào phóng. / Rộng rãi.'
  },
  971: {
    japanese: '寛大（かんだい）に。／太腹（ふとっぱら）に。',
    chinese: '宽宏大量地。(kuān hóng dà liàng de) / 没说的。(méi shuō de)',
    spanish: 'Magnanimously. / Magnánimamente.',
    vietnamese: 'Độ lượng. / Khoan dung.'
  },
  972: {
    japanese: '無欲（むよく）に。／自分（じぶん）を後回し（あとまわし）にして。',
    chinese: '无私地。(wú sī de) / 一心大公。(yì xīn dà gōng)',
    spanish: 'Selflessly. / Abnegadamente.',
    vietnamese: 'Quên mình. / Vị tha.'
  },
  973: {
    japanese: '利他（りた）的に（てきに）。／社会（しゃかい）貢献（こうけん）の心（こころ）で。',
    chinese: '利他地。(lì tā de) / 乐善好施。(lè shàn hào shī)',
    spanish: 'Altruistically. / Altruistamente.',
    vietnamese: 'Lòng nhân ái. / Vì người khác.'
  },
  974: {
    japanese: '慈悲（じひ）深く（ぶかく）。／慈善（じぜん）のために。',
    chinese: '慈善地。(cí shàn de) / 行善。(xíng shàn)',
    spanish: 'Charitably. / Caritativamente.',
    vietnamese: 'Từ thiện. / Bao dung.'
  },
  975: {
    japanese: '感謝（かんしゃ）の気持ち（きもち）で。／有難（ありがた）く。',
    chinese: '感激地。(gǎn jī de) / 谢谢您。(xiè xiè nín)',
    spanish: 'Gratefully. / Agradecidamente.',
    vietnamese: 'Với lòng biết ơn. / Cảm kích.'
  },
  976: {
    japanese: '有難（ありがた）いことに。／感謝（かんしゃ）して。',
    chinese: '谢天谢地地。(xiè tiān xiè dì de) / 多亏了。(duō kuī le)',
    spanish: 'Thankfully. / Afortunadamente.',
    vietnamese: 'Ơn trời. / May mắn thay.'
  },
  977: {
    japanese: 'ありがたく。／価値（かち）を認めて（みとめて）。',
    chinese: '赞赏地。(zàn shǎng de) / 领情。(lǐng qíng)',
    spanish: 'Appreciatively. / Apreciativamente.',
    vietnamese: 'Trân trọng. / Cảm kích.'
  },
  978: {
    japanese: '心（こころ）から。／誠実（せいじつ）に。',
    chinese: '真心地。(zhēn xīn de) / 说真的。(shuō zhēn de)',
    spanish: 'Sincerely. / Sinceramente.',
    vietnamese: 'Chân thành. / Từ đáy lòng.'
  },
  979: {
    japanese: '正直（しょうじき）に。／ありのままに。',
    chinese: '老实地。(lǎo shí de) / 坦诚。(tǎn chéng)',
    spanish: 'Honestly. / Honestamente.',
    vietnamese: 'Thật thà. / Trung thực.'
  },
  980: {
    japanese: '真実（しんじつ）を告（つ）げて。／正確（せいかく）に。',
    chinese: '如实地。(rú shí de) / 没错儿。(méi cuò r)',
    spanish: 'Truthfully. / Verídicamente.',
    vietnamese: 'Đúng sự thật. / Chính xác là vậy.'
  },
  981: {
    japanese: '遠慮（えんりょ）なく。／腹（はら）を割っ（わっ）て。',
    chinese: '坦白地。(tǎn bái de) / 直爽。(zhí shuǎng)',
    spanish: 'Candidly. / Cándidamente.',
    vietnamese: 'Thẳng thắn. / Không giấu giếm.'
  },
  982: {
    japanese: '率直（そっちょく）に。／包み隠さ（つつみかくさ）ず。',
    chinese: '坦率地。(tǎn shuài de) / 有话直说。(yǒu huà zhí shuō)',
    spanish: 'Frankly. / Francamente.',
    vietnamese: 'Bộc trực. / Thành thật mà nói.'
  },
  983: {
    japanese: '明白（めいはく）に。／ありのままに。',
    chinese: '明白地。(míng bai de) / 简明扼要。(jiǎn míng è yào)',
    spanish: 'Plainly. / Claramente.',
    vietnamese: 'Rõ rành rành. / Dễ hiểu.'
  },
  984: {
    japanese: '単純（たんじゅん）に。／ありのままに。',
    chinese: '简单地。(jiǎn dān de) / 就是。(jiù shì)',
    spanish: 'Simply. / Simplemente.',
    vietnamese: 'Đơn giản là. / Chỉ vậy thôi.'
  },
  985: {
    japanese: '謙虚（けんきょ）に。／地味（じみ）に。',
    chinese: '谦虚地。(qiān xū de) / 没啥了不起。(méi shá liǎo bù qǐ)',
    spanish: 'Modestly. / Con humildad.',
    vietnamese: 'Khiêm tốn. / Không phô trương.'
  },
  986: {
    japanese: '機嫌（きげん）よく。／楽し（たのし）げに。',
    chinese: '愉快地。(yú kuài de) / 笑呵呵。(xiào hē hē)',
    spanish: 'Cheerfully. / Alegremente.',
    vietnamese: 'Tươi tỉnh. / Hăng hái.'
  },
  987: {
    japanese: '幸せ（しあわせ）に。／満足（まんぞく）そうに。',
    chinese: '幸福地。(xìng fú de) / 开心。(kāi xīn)',
    spanish: 'Happily. / Felizmente.',
    vietnamese: 'Hạnh phúc. / Mãn nguyện.'
  },
  988: {
    japanese: '喜ば（よろこば）しいことに。／嬉（うれ）しさ全開（ぜんかい）で。',
    chinese: '喜悦地。(xǐ yuè de) / 兴高采烈。(xìng gāo cǎi liè)',
    spanish: 'Joyfully. / Alegremente.',
    vietnamese: 'Vui sướng. / Hân hoan.'
  },
  989: {
    japanese: '陽気（ようき）に。／楽し（たのし）く。',
    chinese: '欢快地。(huān kuài de) / 热闹。(rè nao)',
    spanish: 'Merrily. / Alegremente.',
    vietnamese: 'Vui nhộn. / Hớn hở.'
  },
  990: {
    japanese: '気楽（きらく）に。／朗（ほが）らかに。',
    chinese: '轻松愉快地。(qīng sōng yú kuài de) / 舒心。(shū xīn)',
    spanish: 'Lightheartedly. / Alegremente.',
    vietnamese: 'Thảnh thơi. / Nhẹ nhàng.'
  },
  991: {
    japanese: '嬉（うれ）々（きき）として。／大（だい）喜び（よろこび）で。',
    chinese: '欣喜地。(xīn xǐ de) / 幸灾乐祸。(xìng zāi lè huò)',
    spanish: 'Gleefully. / Con alborozo.',
    vietnamese: 'Hả hê. / Vui sướng ra mặt.'
  },
  992: {
    japanese: '至福（しふく）の面持ち（おももち）で。／この上（うえ）なく。',
    chinese: '极乐。(jí lè) / 幸福极了。(xìng fú jí le)',
    spanish: 'Blissfully. / Dichosamente.',
    vietnamese: 'Sung sướng tột độ. / Niềm hạnh phúc vô biên.'
  },
  993: {
    japanese: '心地（ここち）よく。／感じ（かんじ）よく。',
    chinese: '愉快地。(yú kuài de) / 舒服。(shū fú)',
    spanish: 'Pleasantly. / Agradablemente.',
    vietnamese: 'Dễ chịu. / Thú vị.'
  },
  994: {
    japanese: '快（こころよ）く。／納得（なっとく）のいくように。',
    chinese: '惬意地。(qiè yì de) / 顺眼。(shùn yǎn)',
    spanish: 'Agreeably. / Agradablemente.',
    vietnamese: 'Vừa ý. / Thỏa đáng.'
  },
  995: {
    japanese: '満足（まんぞく）げに。／甘んじ（あまんじ）て。',
    chinese: '心满意足地。(xīn mǎn yì zú de) / 踏实。(tā shi)',
    spanish: 'Contentedly. / Contento.',
    vietnamese: 'Hài lòng. / Thỏa mãn.'
  },
  996: {
    japanese: '熱心（ねっしん）に。／やる気（き）満々（まんまん）で。',
    chinese: '热情地。(rè qíng de) / 劲头十足。(jìn tóu shí zú)',
    spanish: 'Enthusiastically. / Entusiastamente.',
    vietnamese: 'Nhiệt tình. / Hào hứng.'
  },
  997: {
    japanese: '熱狂（ねっきょう）的に（てきに）。／熱（あつ）く。',
    chinese: '热忱地。(rè chén de) / 极其。(jí qí)',
    spanish: 'Zealously. / Zelosamente.',
    vietnamese: 'Sốt sắng. / Hết mình.'
  },
  1000: {
    japanese: '快（こころよ）く。／二（に）つ返知（へんじ）で。',
    chinese: '爽快地。(shuǎng kuài de) / 随时。(suí shí)',
    spanish: 'Readily. / Prontamente.',
    vietnamese: 'Sẵn sàng. / Ngay lập tức.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 910-1000 updated.');
