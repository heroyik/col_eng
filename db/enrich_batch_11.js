const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  601: {
    japanese: '熱心（ねっしん）に。／やる気（き）満々（まんまん）で。',
    chinese: '热情地。(rè qíng de) / 劲头十足。(jìn tóu shí zú)',
    spanish: 'Entusiastamente. / Con entusiasmo.',
    vietnamese: 'Một cách nhiệt tình. / Hào hứng.'
  },
  602: {
    japanese: '熱狂（ねっきょう）的に（てきに）。／熱（あつ）く。',
    chinese: '热忱地。(rè chén de) / 极其。(jí qí)',
    spanish: 'Zelosamente. / Con fervor.',
    vietnamese: 'Một cách sốt sắng. / Hết mình.'
  },
  603: {
    japanese: '切熱（せつねつ）に。／今（いま）か今（いま）かと。',
    chinese: '渴望地。(kě wàng de) / 迫不及待。(pò bù jí dài)',
    spanish: 'Ansiosamente. / Con ganas.',
    vietnamese: 'Một cách háo hức. / Đang mong đợi.'
  },
  604: {
    japanese: '喜んで（よろこんで）。／快（こころよ）く。',
    chinese: '乐意地。(lè yì de) / 自愿。(zì yuàn)',
    spanish: 'De buena gana. / Voluntariamente.',
    vietnamese: 'Sẵn lòng. / Một cách tự nguyện.'
  },
  605: {
    japanese: '快（こころよ）く。／二（に）つ返知（へんじ）で。',
    chinese: '爽快地。(shuǎng kuài de) / 随时。(suí shí)',
    spanish: 'Prontamente. / Sin problemas.',
    vietnamese: 'Sẵn sàng. / Ngay lập tức.'
  },
  606: {
    japanese: '喜んで（よろこんで）。／嬉（うれ）しそうに。',
    chinese: '高兴地。(gāo xìng de) / 乐呵。(lè hē)',
    spanish: 'Con gusto. / Encantado.',
    vietnamese: 'Vui vẻ nhận lời. / Rất hân hạnh.'
  },
  607: {
    japanese: '幸せ（しあわせ）に。／満足（まんぞく）そうに。',
    chinese: '幸福地。(xìng fú de) / 开心。(kāi xīn)',
    spanish: 'Felizmente. / Con alegría.',
    vietnamese: 'Một cách hạnh phúc. / Mãn nguyện.'
  },
  608: {
    japanese: '喜ば（よろこば）しいことに。／嬉（うれ）しさ全開（ぜんかい）で。',
    chinese: '喜悦地。(xǐ yuè de) / 兴高采烈。(xìng gāo cǎi liè)',
    spanish: 'Alegremente. / Con júbilo.',
    vietnamese: 'Vui sướng. / Hân hoan.'
  },
  609: {
    japanese: '機嫌（きげん）よく。／楽し（たのし）げに。',
    chinese: '愉快地。(yú kuài de) / 笑呵呵。(xiào hē hē)',
    spanish: 'Alegremente. / Con buen humor.',
    vietnamese: 'Tươi tỉnh. / Một cách hăng hái.'
  },
  610: {
    japanese: '陽気（ようき）に。／楽し（たのし）く。',
    chinese: '欢快地。(huān kuài de) / 热闹。(rè nao)',
    spanish: 'Alegremente. / Con regocijo.',
    vietnamese: 'Vui nhộn. / Hớn hở.'
  },
  611: {
    japanese: '気楽（きらく）に。／朗（ほが）らかに。',
    chinese: '轻松愉快地。(qīng sōng yú kuài de) / 舒心。(shū xīn)',
    spanish: 'Alegremente. / Sin preocupaciones.',
    vietnamese: 'Thảnh thơi. / Một cách nhẹ nhàng.'
  },
  612: {
    japanese: '嬉（うれ）々（きき）として。／大（だい）喜び（よろこび）で。',
    chinese: '欣喜地。(xīn xǐ de) / 幸灾乐祸。(xìng zāi lè huò)',
    spanish: 'Con alborozo. / Jubilosamente.',
    vietnamese: 'Hả hê. / Vui sướng ra mặt.'
  },
  613: {
    japanese: '至福（しふく）の面持ち（おももち）で。／この上（うえ）なく。',
    chinese: '极乐。(jí lè) / 幸福极了。(xìng fú jí le)',
    spanish: 'Dichosamente. / En la gloria.',
    vietnamese: 'Trong niềm hạnh phúc vô biên. / Sung sướng tột độ.'
  },
  614: {
    japanese: '心地（ここち）よく。／感じ（かんじ）よく。',
    chinese: '愉快地。(yú kuài de) / 舒服。(shū fú)',
    spanish: 'Agradablemente. / De forma amena.',
    vietnamese: 'Dễ chịu. / Một cách thú vị.'
  },
  615: {
    japanese: '快（こころよ）く。／納得（なっとく）のいくように。',
    chinese: '惬意地。(qiè yì de) / 顺眼。(shùn yǎn)',
    spanish: 'Agradablemente. / Con agrado.',
    vietnamese: 'Vừa ý. / Thỏa đáng.'
  },
  616: {
    japanese: '満足（まんぞく）げに。／甘んじ（あまんじ）て。',
    chinese: '心满意足地。(xīn mǎn yì zú de) / 踏实。(tā shi)',
    spanish: 'Contento. / Satisfecho.',
    vietnamese: 'Hài lòng. / Một cách thỏa mãn.'
  },
  617: {
    japanese: '満足（まんぞく）のいくように。／十分（じゅうぶん）に。',
    chinese: '圆满地。(yuán mǎn de) / 够意思。(gòu yì si)',
    spanish: 'Satisfactoriamente. / Bien.',
    vietnamese: 'Thỏa đáng. / Vừa lòng đẹp ý.'
  },
  618: {
    japanese: '優雅（ゆうが）に。／しとやかに。',
    chinese: '优雅地。(yōu yǎ de) / 大方。(dà fāng)',
    spanish: 'Con gracia. / Elegantemente.',
    vietnamese: 'Một cách duyên dáng. / Thanh thoát.'
  },
  619: {
    japanese: '上品（じょうひん）に。／粋（いき）に。',
    chinese: '高雅地。(gāo yǎ de) / 讲究。(jiǎng jiu)',
    spanish: 'Elegantemente. / Con clase.',
    vietnamese: 'Một cách lịch thiệp. / Tao nhã.'
  },
  620: {
    japanese: '美しく（うつくしく）。／見事（みごと）に。',
    chinese: '漂亮地。(piào liang de) / 精湛。(jīng zhàn)',
    spanish: 'Bellamente. / Hermosamente.',
    vietnamese: 'Đẹp đẽ. / Tuyệt vời.'
  },
  621: {
    japanese: '華やか（はなやか）に。／立派（りっぱ）に。',
    chinese: '辉煌地。(huī huáng de) / 精彩。(jīng cǎi)',
    spanish: 'Espléndidamente. / De maravilla.',
    vietnamese: 'Rực rỡ. / Một cách lộng lẫy.'
  },
  622: {
    japanese: '壮大（そうだい）に。／堂々（どうどう）と。',
    chinese: '宏伟地。(hóng wěi de) / 气派。(qì pài)',
    spanish: 'Magníficamente. / Grandiosamente.',
    vietnamese: 'Một cách tráng lệ. / Vĩ đại.'
  },
  623: {
    japanese: '盛大（せいだい）に。／立派（りっぱ）に。',
    chinese: '宏大。(hóng dà) / 隆重。(lóng zhòng)',
    spanish: 'Grandiosamente. / Con pompa.',
    vietnamese: 'Hùng vĩ. / Một cách uy nghi.'
  },
  624: {
    japanese: '最高（さいこう）に。／素晴らしく（すばらしく）。',
    chinese: '极好地。(jí hǎo de) / 顶呱呱。(dǐng guā guā)',
    spanish: 'Superbiamente. / Excelente.',
    vietnamese: 'Tuyệt hảo. / Xuất sắc.'
  },
  625: {
    japanese: '素晴らしく（すばらしく）。／驚（おどろ）くほど。',
    chinese: '绝佳。(jué jiā) / 太棒了。(tài bàng le)',
    spanish: 'Maravillosamente. / Estupendamente.',
    vietnamese: 'Kỳ diệu. / Thật là tuyệt.'
  },
  626: {
    japanese: '驚（おどろ）くほど素晴らしく（すばらしく）。／驚異（きょうい）的（てき）に。',
    chinese: '奇迹般地。(qí jì bān de) / 神了。(shén le)',
    spanish: 'Maravillosamente. / Asombrosamente.',
    vietnamese: 'Kỳ lạ thay. / Một cách thần kỳ.'
  },
  627: {
    japanese: '優秀（ゆうしゅう）に。／抜きん出（ぬきんで）て。',
    chinese: '杰出地。(jié chū de) / 优秀。(yōu xiù)',
    spanish: 'Excelentemente. / De forma sobresaliente.',
    vietnamese: 'Giỏi giang. / Một cách ưu tú.'
  },
  628: {
    japanese: '完璧（かんぺき）に。／理想（りそう）的（てき）に。',
    chinese: '完美地。(wán měi de) / 没治了。(méi zhì le)',
    spanish: 'Perfectamente. / Sin fallas.',
    vietnamese: 'Hoàn hảo. / Tuyệt đối chính xác.'
  },
  629: {
    japanese: '非（ひ）の打ち（うち）どころなく。／鮮やか（あざやか）に。',
    chinese: '毫无瑕疵地。(háo wú xiá cī de) / 圆满。(yuán mǎn)',
    spanish: 'Sin tacha. / Impecablemente.',
    vietnamese: 'Không tì vết. / Sạch sành sanh.'
  },
  630: {
    japanese: '申し分（もうしぶん）なく。／端正（たんせい）に。',
    chinese: '无可挑剔地。(wú kě tiāo tì de) / 地道。(dì dao)',
    spanish: 'Impecablemente. / Irreprochablemente.',
    vietnamese: 'Một cách chuẩn mực. / Không chê vào đâu được.'
  },
  631: {
    japanese: '適切（てきせつ）に。／十分（じゅうぶん）に。',
    chinese: '充分地。(chōng fèn de) / 还算凑合。(hái suàn còu he)',
    spanish: 'Adecuadamente. / Lo suficiente.',
    vietnamese: 'Một cách thỏa đáng. / Đủ xài.'
  },
  632: {
    japanese: '十分（じゅうぶん）に。／余裕（よゆう）を持って。',
    chinese: '足够地。(zú gòu de) / 撑得起。(chēng de qǐ)',
    spanish: 'Suficientemente. / Con suficiencia.',
    vietnamese: 'Một cách đầy đủ. / Sung túc.'
  },
  633: {
    japanese: '有能（ゆうのう）に。／そつなく。',
    chinese: '胜任地。(shèng rèn de) / 够格。(gòu gé)',
    spanish: 'Competentemente. / Con pericia.',
    vietnamese: 'Có năng lực. / Thạo việc.'
  },
  634: {
    japanese: '効果（こうか）的（てき）に。／有効（ゆうこう）に。',
    chinese: '有效地。(yǒu xiào de) / 管用。(guǎn yòng)',
    spanish: 'Efectivamente. / Con resultados.',
    vietnamese: 'Một cách hiệu quả. / Có tác động.'
  },
  635: {
    japanese: '効率（こうりつ）的（てき）に。／手際（てぎわ）よく。',
    chinese: '利索地。(lì suǒ de) / 省事儿。(shěng shì r)',
    spanish: 'Eficientemente. / Con agilidad.',
    vietnamese: 'Có năng suất. / Khoa học.'
  },
  636: {
    japanese: '実力（じつりょく）。／能力（のうりょく）。',
    chinese: '本事。(běn shi) / 能力。(néng lì)',
    spanish: 'Capacidad. / Potencial.',
    vietnamese: 'Khả năng. / Bản lĩnh.'
  },
  637: {
    japanese: '強力（きょうりょく）に。／力強く（ちからづよく）。',
    chinese: '强力地。(qiáng lì de) / 够劲儿。(gòu jìn r)',
    spanish: 'Poderosamente. / Con fuerza.',
    vietnamese: 'Một cách mạnh mẽ. / Có uy lực.'
  },
  638: {
    japanese: '強く（つよく）。／猛烈（もうれつ）に。',
    chinese: '强烈地。(qiáng liè de) / 硬气。(yìng qi)',
    spanish: 'Fuertemente. / Con firmeza.',
    vietnamese: 'Một cách bền vững. / Rất khỏe.'
  },
  639: {
    japanese: '凄まじく（すさまじく）。／力（ちから）任（まか）せに。',
    chinese: '威猛地。(wēi měng de) / 狠心地。(hěn xīn de)',
    spanish: 'Poderosamente. / Con gran vigor.',
    vietnamese: 'Mạnh bạo. / Một cách dữ dội.'
  },
  640: {
    japanese: '強制的（きょうせいてき）に。／力（ちから）を込め（こめ）て。',
    chinese: '有力地。(yǒu lì de) / 强硬。(qiáng yìng)',
    spanish: 'Por la fuerza. / Con convicción.',
    vietnamese: 'Một cách cưỡng ép. / Có sức ép.'
  },
  641: {
    japanese: '強烈（きょうれつ）に。／激（はげ）しく。',
    chinese: '强烈地。(qiáng liè de) / 猛。(měng)',
    spanish: 'Intensamente. / En grado sumo.',
    vietnamese: 'Một cách dữ dội. / Quyết liệt.'
  },
  642: {
    japanese: '厳（きび）しく。／ひどく。',
    chinese: '严厉地。(yán lì de) / 够呛。(gòu qiàng)',
    spanish: 'Severamente. / Duramente.',
    vietnamese: 'Nghiêm trọng. / Khắt khe.'
  },
  643: {
    japanese: '厳（きび）しく。／辛辣（しんらつ）に。',
    chinese: '冷酷地。(lěng kù de) / 刺耳。(cì ěr)',
    spanish: 'Dura y secamente. / Cruelmente.',
    vietnamese: 'Một cách cay nghiệt. / Khó khăn.'
  },
  644: {
    japanese: '雑（ざつ）に。／荒っぽく（あらっぽく）。',
    chinese: '粗鲁地。(cū lǔ de) / 毛糙。(máo cao)',
    spanish: 'Bruscamente. / De forma tosca.',
    vietnamese: 'Một cách thô lỗ. / Sơ sài.'
  },
  645: {
    japanese: '失礼（しつれい）に。／無（む）作法（さほう）に。',
    chinese: '没礼貌地说。(méi lǐ mào de shuō) / 冒犯。(mào fàn)',
    spanish: 'Groseramente. / Con mala educación.',
    vietnamese: 'Bất lịch sự. / Một cách khiếm nhã.'
  },
  646: {
    japanese: '丁寧（ていねい）に。／礼儀（れいぎ）正しく（ただしく）。',
    chinese: '客气地。(kè qi de) / 礼貌。(lǐ mào)',
    spanish: 'Educadamente. / Con cortesía.',
    vietnamese: 'Một cách lịch sự. / Nhã nhặn.'
  },
  647: {
    japanese: '丁重（ていちょう）に。／礼儀（れいぎ）正しく（ただしく）。',
    chinese: '恭敬地。(gōng jìng de) / 周到。(zhōu dào)',
    spanish: 'Cortésmente. / Con amabilidad.',
    vietnamese: 'Hết sức lễ phép. / Chu đáo.'
  },
  648: {
    japanese: '敬意（けいい）を払っ（はらっ）て。／うやうやしく。',
    chinese: '尊敬地。(zūn jìng de) / 有礼有节。(yǒu lǐ yǒu jié)',
    spanish: 'Respetuosamente. / Con respeto.',
    vietnamese: 'Một cách tôn trọng. / Kính cẩn.'
  },
  649: {
    japanese: '謙虚（けんきょ）に。／卑下（ひげ）して。',
    chinese: '谦虚地。(qiān xū de) / 低声下气。(dī shēng xià qì)',
    spanish: 'Humildemente. / Con modestia.',
    vietnamese: 'Một cách khiêm tốn. / Nhún nhường.'
  },
  650: {
    japanese: '控えめ（ひかえめ）に。／気（き）どらずに。',
    chinese: '低调地。(dī diào de) / 不讲究排场。(bù jiǎng jiu pái chǎng)',
    spanish: 'Modestamente. / Sencillamente.',
    vietnamese: 'Giản dị. / Một cách khiêm tốn.'
  },
  651: {
    japanese: '恥ずかし（はずかし）そうに。／内気（うちき）に。',
    chinese: '腼腆地。(miǎn tiǎn de) / 害羞。(hài xiū)',
    spanish: 'Tímidamente. / Con timidez.',
    vietnamese: 'Một cách e thẹn. / Ngượng ngùng.'
  },
  652: {
    japanese: 'おどおどと。／臆病（おくびょう）に。',
    chinese: '胆怯地。(dǎn qiè de) / 畏畏缩缩。(wèi wèi suō suō)',
    spanish: 'Temerosamente. / Con miedo.',
    vietnamese: 'Rụt rè. / Nhút nhát.'
  },
  653: {
    japanese: '恐る（おそる）恐る（おそる）。／びくびくしながら。',
    chinese: '害怕地。(hài pà de) / 胆战心惊。(dǎn zhàn xīn jīng)',
    spanish: 'Con miedo. / Pavorosamente.',
    vietnamese: 'Sợ hãi. / Một cách kinh hoàng.'
  },
  654: {
    japanese: '心配（しんぱい）そうに。／切実（せつじつ）に。',
    chinese: '焦急地。(jiāo jí de) / 担心地。(dān xīn de)',
    spanish: 'Ansiosamente. / Con inquietud.',
    vietnamese: 'Lo lắng. / Một cách bồn chồn.'
  },
  655: {
    japanese: '緊張（きんちょう）して。／落ち着か（おちつか）ない様子（ようす）で。',
    chinese: '紧张地。(jǐn zhāng de) / 局促不安。(jú cù bù ān)',
    spanish: 'Nerviosamente. / Con nervios.',
    vietnamese: 'Hồi hộp. / Có chút lo âu.'
  },
  656: {
    japanese: '冷静（れいせい）に。／落ち着い（おちつい）て。',
    chinese: '淡定地。(dàn dìng de) / 从容。(cóng róng)',
    spanish: 'Calmadamente. / Con calma.',
    vietnamese: 'Bình tĩnh. / Một cách điềm đạm.'
  },
  657: {
    japanese: '静か（しずか）に。／ひっそりと。',
    chinese: '悄悄地。(qiāo qiāo de) / 没动静。(méi dòng jing)',
    spanish: 'Silenciosamente. / Con sigilo.',
    vietnamese: 'Lặng lẽ. / Một cách yên tĩnh.'
  },
  658: {
    japanese: '平和（へいわ）に。／穏やか（おだやか）に。',
    chinese: '和平地。(hé píng de) / 安稳。(ān wěn)',
    spanish: 'Pacíficamente. / En paz.',
    vietnamese: 'Yên bình. / Hòa bình.'
  },
  659: {
    japanese: '穏やか（おだやか）に。／清らか（きよらか）に。',
    chinese: '安详地。(ān xiáng de) / 从容不迫。(cóng róng bú pò)',
    spanish: 'Serenamente. / Con serenidad.',
    vietnamese: 'Thanh thản. / Một cách bình thản.'
  },
  660: {
    japanese: '辛抱強く（しんぼうづよく）。／じっと。',
    chinese: '耐心地。(nài xīn de) / 沉住气。(chén zhù qì)',
    spanish: 'Pacientemente. / Con paciencia.',
    vietnamese: 'Kiên nhẫn. / Một cách nhẫn nại.'
  },
  661: {
    japanese: '泰然（たいぜん）自若（じじゃく）として。／揺るぎな（ゆるぎな）く。',
    chinese: '坚定地。(jiān dìng de) / 始终如一。(shǐ zhōng rú yī)',
    spanish: 'Firme e inquebrantable. / Con constancia.',
    vietnamese: 'Kiên định. / Trước sau như một.'
  },
  662: {
    japanese: '毅然（きぜん）として。／決然（けつぜん）と。',
    chinese: '坚决地。(jiān jué de) / 斩钉截铁。(zhǎn dīng jié tiě)',
    spanish: 'Resueltamente. / Con resolución.',
    vietnamese: 'Quyết liệt. / Một cách dứt khoát.'
  },
  663: {
    japanese: '固い（かたい）決意（けつい）を持って。／断固（だんこ）として。',
    chinese: '下定决心。(xià dìng jué xīn) / 毅然。(yì rán)',
    spanish: 'Determinadamente. / Con decisión.',
    vietnamese: 'Kiên quyết. / Quyết chí.'
  },
  664: {
    japanese: '勇敢（ゆうかん）に。／勇ましく（いさましく）。',
    chinese: '英勇地。(yīng yǒng de) / 胆大。(dǎn dà)',
    spanish: 'Bravamente. / Con valentía.',
    vietnamese: 'Dũng cảm. / Can trường.'
  },
  665: {
    japanese: '勇気（ゆうき）を持って。／果敢（かかん）に。',
    chinese: '大胆地。(dà dǎn de) / 豁出去了。(huō chū qù le)',
    spanish: 'Valientemente. / Con coraje.',
    vietnamese: 'Đầy bản lĩnh. / Không sợ hãi.'
  },
  666: {
    japanese: '恐れ（おそれ）を知ら（しら）ず。／大胆（だいたん）に。',
    chinese: '无畏地。(wú wèi de) / 一身是胆。(yì shēn shì dǎn)',
    spanish: 'Intrépidamente. / Sin miedo.',
    vietnamese: 'Vô úy. / Chẳng ngại ngần gì.'
  },
  667: {
    japanese: '大胆（だいたん）に。／不敵（ふてき）に。',
    chinese: '奔放地。(bēn fàng de) / 胆子肥。(dǎn zi féi)',
    spanish: 'Audazmente. / Con osadía.',
    vietnamese: 'Táo bạo. / Một cách gan dạ.'
  },
  668: {
    japanese: '思い切っ（おもいきっ）て。／危険（きけん）を顧み（かえりみ）ず。',
    chinese: '冒险地。(mào xiǎn de) / 胆大包天。(dǎn dà bāo tiān)',
    spanish: 'Atrevidamente. / Con arrojo.',
    vietnamese: 'Liều lĩnh. / Thách thức.'
  },
  669: {
    japanese: '英雄（えいゆう）的に（てきに）。／華々しく（はなばなしく）。',
    chinese: '英雄般地。(yīng xióng bān de) / 壮烈。(zhuàng liè)',
    spanish: 'Heroicamente. / Como un héroe.',
    vietnamese: 'Một cách anh hùng. / Hào hùng.'
  },
  670: {
    japanese: '勇ましく（いさましく）。／堂々（どうどう）と。',
    chinese: '勇敢地。(yǒng gǎn de) / 不屈。(bù qū)',
    spanish: 'Valerosamente. / Con valor.',
    vietnamese: 'Dũng mãnh. / Một cách ngoan cường.'
  },
  671: {
    japanese: '気高く（けだかく）。／崇高（すうこう）に。',
    chinese: '高尚地。(gāo shàng de) / 气派。(qì pài)',
    spanish: 'Noblemente. / Con nobleza.',
    vietnamese: 'Cao quý. / Một cách thanh cao.'
  },
  672: {
    japanese: '優しく（やさしく）。／穏やか（おだやか）に。',
    chinese: '温和地。(wēn hé de) / 斯文。(sī wen)',
    spanish: 'Gentilmente. / Con delicadeza.',
    vietnamese: 'Nhẹ nhàng. / Một cách lịch thiệp.'
  },
  673: {
    japanese: 'そっと。／柔らか（やわらか）に。',
    chinese: '轻轻地。(qīng qīng de) / 柔和。(róu hé)',
    spanish: 'Suavemente. / Quedo.',
    vietnamese: 'Khẽ khàng. / Một cách êm ái.'
  },
  674: {
    japanese: '穏やか（おだやか）に。／控えめ（ひかえめ）に。',
    chinese: '稍微。(shāo wēi) / 温和。(wēn hé)',
    spanish: 'Levemente. / Con suavidad.',
    vietnamese: 'Ôn hòa. / Nhè nhẹ.'
  },
  675: {
    japanese: '優しく（やさしく）。／慈しみ（いつくしみ）を持って。',
    chinese: '温柔地。(wēn róu de) / 细心照顾。(xì xīn zhào gù)',
    spanish: 'Tiernamente. / Con cariño.',
    vietnamese: 'Dịu dàng. / Âu yếm.'
  },
  676: {
    japanese: '愛（あい）を込め（こめ）て。／深い（ふかい）愛情（あいじょう）で。',
    chinese: '慈爱地。(cí ài de) / 疼爱。(téng ài)',
    spanish: 'Amorosamente. / Con amor.',
    vietnamese: 'Đầy yêu thương. / Trìu mến.'
  },
  677: {
    japanese: '慈しみ（いつくしみ）深く（ぶかく）。／懐かし（なつかし）そうに。',
    chinese: '深情地。(shēn qíng de) / 溺爱。(nì ài)',
    spanish: 'Cariñosamente. / Con afecto.',
    vietnamese: 'Thân thương. / Một cách trìu mến.'
  },
  678: {
    japanese: '心（こころ）から。／真心（まごころ）を込め（こめ）て。',
    chinese: '热诚地。(rè chéng de) / 亲切。(qīn qiè)',
    spanish: 'Cordialmente. / Sinceramente.',
    vietnamese: 'Một cách thân ái. / Chân tình.'
  },
  679: {
    japanese: '心（こころ）底（そこ）から。／たっぷり。',
    chinese: '衷心地。(zhōng xīn de) / 痛快。(tòng kuài)',
    spanish: 'De corazón. / Con ganas.',
    vietnamese: 'Hết lòng. / Chân thành.'
  },
  680: {
    japanese: '暖かく（あたたかく）。／親身（しんみ）になって。',
    chinese: '温暖地。(wēn nuǎn de) / 热情招待。(rè qíng zhāo dài)',
    spanish: 'Cálidamente. / Con calidez.',
    vietnamese: 'Nồng ấm. / Niềm nở.'
  },
  681: {
    japanese: '慈愛（じあい）に満ち（みち）て。／優しく（やさしく）。',
    chinese: '亲密地。(qīn mì de) / 亲热。(qīn rè)',
    spanish: 'Afectuosamente. / Con afecto.',
    vietnamese: 'Trìu mến. / Thân mật.'
  },
  682: {
    japanese: '親しみ（したしみ）やすく。／仲良く（なかよく）。',
    chinese: '友好地。(yǒu hǎo de) / 和气。(hé qi)',
    spanish: 'Amistosamente. / Con amistad.',
    vietnamese: 'Thân thiện. / Một cách hữu hảo.'
  },
  683: {
    japanese: '親切（しんせつ）に。／思いやり（おもいやり）を持って。',
    chinese: '善良地。(shàn liáng de) / 心地好。(xīn dì hǎo)',
    spanish: 'Bondadosamente. / Con bondad.',
    vietnamese: 'Nhân từ. / Một cách tử tế.'
  },
  684: {
    japanese: '親切（しんせつ）に。／快（こころよ）く。',
    chinese: '亲切地。(qīn qiè de) / 那就多谢了。(nà jiù duō xiè le)',
    spanish: 'Amablemente. / Por favor.',
    vietnamese: 'Một cách tử tế. / Tận tụy.'
  },
  685: {
    japanese: '気前（きまえ）よく。／惜しみ（おしみ）なく。',
    chinese: '慷慨地。(kāng kǎi de) / 大方。(dà fāng)',
    spanish: 'Generosamente. / Con generosidad.',
    vietnamese: 'Hào phóng. / Rộng rãi.'
  },
  686: {
    japanese: '寛大（かんだい）に。／太腹（ふとっぱら）に。',
    chinese: '宽宏大量地。(kuān hóng dà liàng de) / 没说的。(méi shuō de)',
    spanish: 'Magnánimamente. / Con grandeza.',
    vietnamese: 'Một cách độ lượng. / Khoan dung.'
  },
  687: {
    japanese: '無欲（むよく）に。／自分（じぶん）を後回し（あとまわし）にして。',
    chinese: '无私地。(wú sī de) / 一心大公。(yì xīn dà gōng)',
    spanish: 'Abnegadamente. / Sin egoísmo.',
    vietnamese: 'Quên mình. / Vị tha.'
  },
  688: {
    japanese: '利他（りた）的に（てきに）。／社会（しゃかい）貢献（こうけん）の心（こころ）で。',
    chinese: '利他地。(lì tā de) / 乐善好施。(lè shàn hào shī)',
    spanish: 'Altruistamente. / Por los demás.',
    vietnamese: 'Lòng nhân ái. / Luôn vì người khác.'
  },
  689: {
    japanese: '慈悲（じひ）深く（ぶかく）。／慈善（じぜん）のために。',
    chinese: '慈悲。(cí bēi) / 行善。(xíng shàn)',
    spanish: 'Caritativamente. / Por caridad.',
    vietnamese: 'Lòng từ thiện. / Bao dung.'
  },
  690: {
    japanese: '感謝（かんしゃ）の気持ち（きもち）で。／有難（ありがた）く。',
    chinese: '感激地。(gǎn jī de) / 谢谢您。(xiè xiè nín)',
    spanish: 'Agradecidamente. / Con gratitud.',
    vietnamese: 'Với lòng biết ơn. / Cảm kích.'
  },
  691: {
    japanese: '有難（ありがた）いことに。／感謝（かんしゃ）して。',
    chinese: '谢天谢地地。(xiè tiān xiè dì de) / 多亏了。(duō kuī le)',
    spanish: 'Afortunadamente. / Menos mal.',
    vietnamese: 'Ơn trời. / May mắn thay.'
  },
  692: {
    japanese: 'ありがたく。／価値（かち）を認めて（みとめて）。',
    chinese: '赞赏地。(zàn shǎng de) / 领情。(lǐng qíng)',
    spanish: 'Apreciativamente. / Con aprecio.',
    vietnamese: 'Một cách trân trọng. / Cảm kích.'
  },
  693: {
    japanese: '心（こころ）から。／誠実（せいじつ）に。',
    chinese: '真心地。(zhēn xīn de) / 说真的。(shuō zhēn de)',
    spanish: 'Sinceramente. / De verdad.',
    vietnamese: 'Chân thành. / Từ đáy lòng.'
  },
  694: {
    japanese: '正直（しょうじき）に。／ありのままに。',
    chinese: '老实说。(lǎo shí shuō) / 坦诚。(tǎn chéng)',
    spanish: 'Honestamente. / Con franqueza.',
    vietnamese: 'Thật thà. / Một cách trung thực.'
  },
  695: {
    japanese: '真実（しんじつ）を告（つ）げて。／正確（せいかく）に。',
    chinese: '如实地。(rú shí de) / 没错儿。(méi cuò r)',
    spanish: 'Verídicamente. / Con la verdad.',
    vietnamese: 'Đúng sự thật. / Chính xác là vậy.'
  },
  696: {
    japanese: '遠慮（えんりょ）なく。／腹（はら）を割っ（わっ）て。',
    chinese: '坦白地。(tǎn bái de) / 直爽。(zhí shuǎng)',
    spanish: 'Cándidamente. / Con sinceridad.',
    vietnamese: 'Thẳng thắn. / Không giấu giếm.'
  },
  697: {
    japanese: '率直（そっちょく）に。／包み隠さ（つつみかくさ）ず。',
    chinese: '坦率地。(tǎn shuài de) / 有话直说。(yǒu huà zhí shuō)',
    spanish: 'Francamente. / Sinceramente.',
    vietnamese: 'Một cách bộc trực. / Thành thật mà nói.'
  },
  698: {
    japanese: '明白（めいはく）に。／ありのままに。',
    chinese: '清楚地。(qīng chu de) / 简明扼要。(jiǎn míng è yào)',
    spanish: 'Claramente. / Sin adornos.',
    vietnamese: 'Rõ rành rành. / Một cách dễ hiểu.'
  },
  699: {
    japanese: '単純（たんじゅん）に。／ありのままに。',
    chinese: '简简单单地。(jiǎn jiǎn dān dān de) / 就是。(jiù shì)',
    spanish: 'Simplemente. / De forma sencilla.',
    vietnamese: 'Đơn giản là. / Chỉ vậy thôi.'
  },
  700: {
    japanese: '謙虚（けんきょ）に。／地味（じみ）に。',
    chinese: '谦虚地。(qiān xū de) / 没啥了不起。(méi shá liǎo bù qǐ)',
    spanish: 'Modestamente. / Con humildad.',
    vietnamese: 'Một cách khiêm tốn. / Không phô trương.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 601-700 updated.');
