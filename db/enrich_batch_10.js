const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  501: {
    japanese: '主（おも）に。／何（なに）よりも。',
    chinese: '核心地。(hé xīn de) / 主要是。(zhǔ yào shì)',
    spanish: 'Primordialmente. / Principalmente.',
    vietnamese: 'Quan trọng nhất là. / Chủ yếu là.'
  },
  502: {
    japanese: '主（おも）に。／とりわけ。',
    chinese: '首要地。(shǒu yào de) / 专门。(zhuān mén)',
    spanish: 'Especialmente. / Principalmente.',
    vietnamese: 'Bậc nhất. / Điểm chính.'
  },
  503: {
    japanese: '大体（だいたい）は。／主要（しゅよう）な。',
    chinese: '大部分。(dà bù fen) / 大多。(dà duō)',
    spanish: 'En su mayoría. / Principalmente.',
    vietnamese: 'Đa phần. / Chủ yếu là vậy.'
  },
  504: {
    japanese: 'ほとんど。／大抵（たいてい）。',
    chinese: '多半。(duō bàn) / 几乎。(jī fǔ)',
    spanish: 'Casi siempre. / Por lo general.',
    vietnamese: 'Hầu như. / Đa số trường hợp.'
  },
  505: {
    japanese: '主要（しゅよう）に。／主（おも）な目的（もくてき）で。',
    chinese: '原则上。(yuán zé shàng) / 主要是。(zhǔ yào shì)',
    spanish: 'Principalmente. / Fundamentalmente.',
    vietnamese: 'Căn bản là. / Mục đích chính là.'
  },
  506: {
    japanese: '独占（どくせん）的（てき）に。／専用（せんよう）の。',
    chinese: '独家地。(dújiā de) / 专门。(zhuān mén)',
    spanish: 'Exclusivamente. / Únicamente.',
    vietnamese: 'Độc quyền. / Duy nhất.'
  },
  507: {
    japanese: '〜だけ。／ただ一つの。',
    chinese: '仅。(jǐn) / 只是。(zhǐ shì)',
    spanish: 'Solo. / Únicamente.',
    vietnamese: 'Chỉ có. / Duy nhất chỉ là.'
  },
  508: {
    japanese: '単独（たんどく）で。／唯一（ゆいいつ）の理由（りゆう）で。',
    chinese: '仅仅。(jǐn jǐn) / 完全是因为。(wán quán shì yīn wèi)',
    spanish: 'Únicamente. / Exclusivamente.',
    vietnamese: 'Chỉ vì một lẽ. / Duy nhất.'
  },
  509: {
    japanese: '単（たん）に。／〜にすぎない。',
    chinese: '仅仅。(jǐn jǐn) / 不过是。(bú guò shì)',
    spanish: 'Meramente. / Simplemente.',
    vietnamese: 'Chỉ đơn thuần là. / Chẳng qua là.'
  },
  510: {
    japanese: 'ちょうど。／ただ。',
    chinese: '就是。(jiù shì) / 刚好。(gāng hǎo)',
    spanish: 'Solo. / Precisamente.',
    vietnamese: 'Cũng chỉ là. / Vừa khéo.'
  },
  511: {
    japanese: '単純（たんじゅん）に。／簡単に（かんたんに）。',
    chinese: '简单地。(jiǎn dān de) / 没什么大不了。(méi shén me dà bù liǎo)',
    spanish: 'Simplemente. / Llanamente.',
    vietnamese: 'Một cách đơn giản. / Cứ cho là vậy.'
  },
  512: {
    japanese: '正確（せいかく）に。／きっかり。',
    chinese: '准确地。(zhǔn què de) / 到位。(dào wèi)',
    spanish: 'Precisamente. / Exactamente.',
    vietnamese: 'Một cách chính xác. / Đúng chuẩn.'
  },
  513: {
    japanese: 'まさに。／そのまま。',
    chinese: '确确实实。(què què shí shí) / 刚好。(gāng hǎo)',
    spanish: 'Exactamente. / Justo.',
    vietnamese: 'Chính xác là. / Không sai một li.'
  },
  514: {
    japanese: '文字（もじ）通り（どおり）。／誇張（こちょう）なしに。',
    chinese: '字面意思。(zì miàn yì si) / 确实。(què shí)',
    spanish: 'Literalmente. / Al pie de la letra.',
    vietnamese: 'Theo đúng nghĩa đen. / Không sai một chữ.'
  },
  515: {
    japanese: '一（いち）言（ごん）一（いち）句（く）そのまま。／逐語（ちくご）的（てき）に。',
    chinese: '原话。(yuán huà) / 一字不差。(yí zì bù chā)',
    spanish: 'Verbatim. / Palabra por palabra.',
    vietnamese: 'Nguyên văn. / Từng chữ một.'
  },
  516: {
    japanese: '一（いち）言（ごん）一（いち）句（く）。／逐語（ちくご）訳（やく）。',
    chinese: '逐字逐句。(zhú zì zhú jù) / 原封不动。(yuán fēng bú dòng)',
    spanish: 'Palabra por palabra. / Al pie de la letra.',
    vietnamese: 'Từ này sang từ khác. / Theo sát con chữ.'
  },
  517: {
    japanese: '忠実（ちゅうじつ）に。／規則（きそく）通り（どおり）に。',
    chinese: '严格执行。(yán gé zhí xíng) / 丝毫不差。(sī háo bù chā)',
    spanish: 'Al pie de la letra. / Estrictamente.',
    vietnamese: 'Làm đúng y như vậy. / Tuân thủ nghiêm ngặt.'
  },
  518: {
    japanese: '厳格（げんかく）に。／厳（きび）しく。',
    chinese: '严格地。(yán gé de) / 严肃。(yán sù)',
    spanish: 'Estrictamente. / Rígidamente.',
    vietnamese: 'Một cách khắt khe. / Nghiêm chỉnh.'
  },
  519: {
    japanese: '徹底（てってい）的（てき）に。／妥協（だきょう）なく。',
    chinese: '严密地。(yán mì de) / 准确地。(zhǔn què de)',
    spanish: 'Rigorosamente. / A conciencia.',
    vietnamese: 'Chặt chẽ. / Một cách tỉ mỉ.'
  },
  520: {
    japanese: '詳細（しょうさい）に。／詳しく（くわしく）。',
    chinese: '详细地。(xiáng xì de) / 明摆着。(míng bǎi zhe)',
    spanish: 'En detalle. / Pormenorizadamente.',
    vietnamese: 'Một cách chi tiết. / Đi sâu vào vấn đề.'
  },
  521: {
    japanese: '徹底（てってい）的（てき）に。／漏（も）れなく。',
    chinese: '统统。(tǒng tǒng) / 彻底。(chè dǐ)',
    spanish: 'A fondo. / Completamente.',
    vietnamese: 'Thấu đáo. / Cặn kẽ.'
  },
  522: {
    japanese: '包括（ほうかつ）的（てき）に。／総合（そうごう）的（てき）に。',
    chinese: '广泛。(guǎng fàn) / 综合性地。(zōng hé xìng de)',
    spanish: 'Integralmente. / Exhaustivamente.',
    vietnamese: 'Một cách toàn diện. / Bao quát.'
  },
  523: {
    japanese: '網羅（もうら）的（てき）に。／余（よ）すところなく。',
    chinese: '详尽。(xiáng jìn) / 一点不剩。(yì diǎn bú shèng)',
    spanish: 'Exhaustivamente. / Sin dejarse nada.',
    vietnamese: 'Một cách triệt để. / Khám phá hết.'
  },
  524: {
    japanese: '広範（こうはん）に。／幅広（はばひろ）く。',
    chinese: '大面积地。(dà miàn jī de) / 广泛。(guǎng fàn)',
    spanish: 'Extensamente. / Ampliamente.',
    vietnamese: 'Một cách sâu rộng. / Lan tỏa.'
  },
  525: {
    japanese: '大まかに（おおまかに）。／幅広（はばひろ）く。',
    chinese: '大致。(dà zhì) / 整个儿。(zhěng gèr)',
    spanish: 'A grandes rasgos. / Ampliamente.',
    vietnamese: 'Một cách tổng thể. / Bao quát chung.'
  },
  526: {
    japanese: '広く（ひろく）。／あちこちで。',
    chinese: '广为流传。(guǎng wéi liú chuán) / 到处。(dào chù)',
    spanish: 'Ampliamente. / Por todas partes.',
    vietnamese: 'Rộng rãi. / Khắp nơi.'
  },
  527: {
    japanese: '普遍（ふへん）的（てき）に。／例外（れいがい）なく。',
    chinese: '普遍地。(pǔ biàn de) / 到处都有。(dào chù dōu yǒu)',
    spanish: 'Universalmente. / En todo el mundo.',
    vietnamese: 'Một cách phổ biến. / Khắp năm châu.'
  },
  528: {
    japanese: '至（いた）る所（ところ）で。／どこにでも。',
    chinese: '随处可见。(suí chù kě jiàn) / 到处。(dào chù)',
    spanish: 'En todas partes. / Por doquier.',
    vietnamese: 'Mọi nơi mọi lúc. / Khắp đầu đường xó chợ.'
  },
  529: {
    japanese: '世界（せかい）的（てき）に。／地球（ちきゅう）規模（きぼ）で。',
    chinese: '全球性地。(quán qiú xìng de) / 范围内。(fàn wéi nèi)',
    spanish: 'Globalmente. / A nivel mundial.',
    vietnamese: 'Trên toàn thế giới. / Quy mô toàn cầu.'
  },
  530: {
    japanese: '地元（じもと）で。／局所（きょくしょ）的（てき）に。',
    chinese: '地方上。(dì fāng shàng) / 身边。(shēn biān)',
    spanish: 'Localmente. / En la zona.',
    vietnamese: 'Tại địa phương. / Ở quanh đây.'
  },
  531: {
    japanese: '国内（こくない）で。／家庭（かてい）内（ない）で。',
    chinese: '国内。(guó nèi) / 家门口。(jiā mén kǒu)',
    spanish: 'Domésticamente. / En el país.',
    vietnamese: 'Trong nước. / Nội địa.'
  },
  532: {
    japanese: '内部（ないぶ）で。／中（なか）で。',
    chinese: '内部。(nèi bù) / 里面。(lǐ miàn)',
    spanish: 'Internamente. / Hacia dentro.',
    vietnamese: 'Bên trong bộ máy. / Nội bộ.'
  },
  533: {
    japanese: '外部（がいぶ）で。／外側（そとがわ）に。',
    chinese: '外部。(wài bù) / 外面。(wài miàn)',
    spanish: 'Externamente. / Hacia fuera.',
    vietnamese: 'Bên ngoài. / Ngoại cảnh.'
  },
  534: {
    japanese: '公（おおやけ）に。／人前（ひとまえ）で。',
    chinese: '公开地。(gōng kāi de) / 大家伙儿面前。(dà jiā huǒ r miàn qián)',
    spanish: 'Públicamente. / A la vista de todos.',
    vietnamese: 'Công khai. / Trước mặt mọi người.'
  },
  535: {
    japanese: 'ひそかに。／個人的（こじんてき）に。',
    chinese: '私下里。(sī xià lǐ) / 偷偷。(tōu tōu)',
    spanish: 'Privadamente. / En privado.',
    vietnamese: 'Riêng tư. / Chuyện cá nhân.'
  },
  536: {
    japanese: '秘密（ひみつ）裏（り）に。／こっそりと。',
    chinese: '秘密地。(mì mì de) / 偷偷摸摸。(tōu tōu mō mō)',
    spanish: 'Secretamente. / A escondidas.',
    vietnamese: 'Lén lút. / Giấu giếm.'
  },
  537: {
    japanese: '極秘（ごくひ）に。／内密（ないみつ）に。',
    chinese: '保密地。(bǎo mì de) / 绝对机密。(jué duì jī mì)',
    spanish: 'Confidencialmente. / En confianza.',
    vietnamese: 'Một cách bảo mật. / Tin cẩn.'
  },
  538: {
    japanese: '公然（こうぜん）と。／隠（かく）さずに。',
    chinese: '大张旗鼓地。(dà zhāng qí gǔ de) / 亮亮相。(liàng liàng xiàng)',
    spanish: 'Abiertamente. / Sin tapujos.',
    vietnamese: 'Một cách cởi mở. / Không giấu giếm.'
  },
  539: {
    japanese: '相互（そうご）に。／お互（たが）いに。',
    chinese: '共同地。(gòng tóng de) / 互相。(hù xiāng)',
    spanish: 'Mutuamente. / Recíprocamente.',
    vietnamese: 'Lẫn nhau. / Có qua có lại.'
  },
  540: {
    japanese: '共同（きょうどう）で。／連名（れんめい）で。',
    chinese: '联合地。(lián hé de) / 一起。(yì qǐ)',
    spanish: 'Conjuntamente. / De común acuerdo.',
    vietnamese: 'Chung sức. / Cùng hợp tác.'
  },
  541: {
    japanese: '集団（しゅうだん）で。／まとめて。',
    chinese: '集体。(jí tǐ) / 合起来。(hé qǐ lái)',
    spanish: 'Colectivamente. / En grupo.',
    vietnamese: 'Mang tính tập thể. / Toàn bộ nhóm.'
  },
  542: {
    japanese: '別々（べつべつ）に。／離（はな）れて。',
    chinese: '分开地。(fēn kāi de) / 单独。(dān dú)',
    spanish: 'Por separado. / Individualmente.',
    vietnamese: 'Riêng rẽ. / Tách biệt.'
  },
  543: {
    japanese: '個々（ここ）に。／一人（ひとり）ずつ。',
    chinese: '个别地。(gè bié de) / 每个人。(měi gè rén)',
    spanish: 'Individualmente. / De uno en uno.',
    vietnamese: 'Cá thể. / Từng người một.'
  },
  544: {
    japanese: 'それぞれ。／各々（おのおの）。',
    chinese: '各。(gè) / 分别。(fēn bié)',
    spanish: 'Respectivamente. / A cada uno.',
    vietnamese: 'Tương ứng. / Lần lượt theo thứ tự.'
  },
  545: {
    japanese: '連続（れんぞく）して。／次（つぎ）から次（つぎ）へと。',
    chinese: '接连地。(jiē lián de) / 陆续。(lù xù)',
    spanish: 'Sucesivamente. / En cadena.',
    vietnamese: 'Bám đuôi nhau. / Kế tiếp liên tục.'
  },
  546: {
    japanese: '交互（こうご）に。／交代（こうたい）で。',
    chinese: '轮流地。(lún liú de) / 交替。(jiāo tì)',
    spanish: 'Alternativamente. / Por turnos.',
    vietnamese: 'Thay phiên nhau. / Đổi chỗ.'
  },
  547: {
    japanese: '無（む）作為（さくい）に。／出（で）たらめに。',
    chinese: '随机地。(suí jī de) / 瞎蒙。(xiā mēng)',
    spanish: 'Aleatoriamente. / Al azar.',
    vietnamese: 'Ngẫu nhiên. / Chọn đại.'
  },
  548: {
    japanese: '独断（どくだん）で。／勝手（かって）に。',
    chinese: '武断地。(wǔ duàn de) / 随便想的。(suí biàn xiǎng de)',
    spanish: 'Arbitrariamente. / Porque sí.',
    vietnamese: 'Một cách độc đoán. / Tùy hứng.'
  },
  549: {
    japanese: '意図（いと）的（てき）に。／わざと。',
    chinese: '刻意地。(kè yì de) / 准备好的。(zhǔn bèi hǎo de)',
    spanish: 'Deliberadamente. / Aposta.',
    vietnamese: 'Cố tình làm vậy. / Có tính toán.'
  },
  550: {
    japanese: '故意（こい）に。／狙（ねら）って。',
    chinese: '蓄意地。(xù yì de) / 故意。(gù yì)',
    spanish: 'Intencionadamente. / A propósito.',
    vietnamese: 'Có ý đồ. / Cố ý làm.'
  },
  551: {
    japanese: '目的（もくてき）意識（いしき）を持って。／毅然（きぜん）と。',
    chinese: '有针对性地。(yǒu zhēn duì xìng de) / 专程。(zhuān chéng)',
    spanish: 'Con determinación. / A sabiendas.',
    vietnamese: 'Một cách quyết đoán. / Có chủ đích.'
  },
  552: {
    japanese: 'わざと。／意図（いと）的に（てきに）。',
    chinese: '故意的。(gù yì de) / 特地。(tè dì)',
    spanish: 'A propósito. / Porque quería.',
    vietnamese: 'Cố tình. / Mục đích rõ ràng.'
  },
  553: {
    japanese: '偶然（ぐぜん）に。／たまたま。',
    chinese: '碰巧。(pèng qiǎo) / 意外。(yì wài)',
    spanish: 'Por accidente. / Por casualidad.',
    vietnamese: 'Một cách tình cờ. / Ngẫu nhiên.'
  },
  554: {
    japanese: '誤っ（あやまっ）て。／うっかり。',
    chinese: '不小心。(bù xiǎo xīn) / 出错。(chū cuò)',
    spanish: 'Accidentalmente. / Sin querer.',
    vietnamese: 'Vô tình thôi. / Lỡ tay.'
  },
  555: {
    japanese: '意図（いと）せず。／知（し）らず知（し）らず。',
    chinese: '无意中。(wú yì zhōng) / 没想通。(méi xiǎng tōng)',
    spanish: 'Sin intención. / Involuntariamente.',
    vietnamese: 'Không cố ý. / Chẳng định trước.'
  },
  556: {
    japanese: '不注意（ふちゅうい）から。／うっかりと。',
    chinese: '疏忽。(shū hu) / 没留神。(méi liú shén)',
    spanish: 'Inadvertidamente. / Por descuido.',
    vietnamese: 'Sơ suất thôi. / Chẳng may quên mất.'
  },
  557: {
    japanese: '無意識（むいしき）に。／知（し）らずに。',
    chinese: '下意识地。(xià yì shí de) / 不知不觉。(bù zhī bù jué)',
    spanish: 'Inconscientemente. / Sin darse cuenta.',
    vietnamese: 'Trong vô thức. / Chẳng hề hay biết.'
  },
  558: {
    japanese: '本能（ほんのう）的（てき）に。／直感（ちょっかん）で。',
    chinese: '出于本能。(chū yú běn néng) / 直觉。(zhí jué)',
    spanish: 'Instintivamente. / Por instinto.',
    vietnamese: 'Theo bản năng. / Phản xạ tự nhiên.'
  },
  559: {
    japanese: '自発（じはつ）的（てき）に。／自然（しぜん）と。',
    chinese: '自发地。(zì fā de) / 临时起意。(lín shí qǐ yì)',
    spanish: 'Espontáneamente. / De forma natural.',
    vietnamese: 'Tự nhiên như nhiên. / Bộc phát.'
  },
  560: {
    japanese: '自動（じどう）的（てき）に。／勝手（かって）に。',
    chinese: '自动地。(zì dòng de) / 顺理成章。(shùn lǐ chéng zhāng)',
    spanish: 'Automáticamente. / De forma automática.',
    vietnamese: 'Một cách tự động. / Máy móc.'
  },
  561: {
    japanese: '機械（きかい）的（てき）に。／無（む）機質（きしつ）に。',
    chinese: '生搬硬套。(shēng bān yìng tào) / 呆板。(dāi bǎn)',
    spanish: 'Mecánicamente. / Por inercia.',
    vietnamese: 'Như một cái máy. / Vô hồn.'
  },
  562: {
    japanese: '体系（たいけい）的（てき）に。／整然（せいぜん）と。',
    chinese: '系统地。(xì tǒng de) / 理顺。(lǐ shùn)',
    spanish: 'Sistemáticamente. / Con orden.',
    vietnamese: 'Một cách hệ thống. / Bài bản.'
  },
  563: {
    japanese: '几帳面（きちょうめん）に。／論理（ろんり）的（てき）に。',
    chinese: '有条不紊地。(yǒu tiáo bù wěn de) / 讲究方法。(jiǎng jiu fāng fǎ)',
    spanish: 'Metódicamente. / Paso a paso.',
    vietnamese: 'Có phương pháp. / Rất ngăn nắp.'
  },
  564: {
    japanese: '論理（ろんり）的（てき）に。／理屈（りくつ）で。',
    chinese: '逻辑严密地。(luó ji yán mì de) / 说得通。(shuō de tōng)',
    spanish: 'Lógicamente. / Con lógica.',
    vietnamese: 'Một cách lô-gich. / Hợp lý.'
  },
  565: {
    japanese: '合理的（ごうりてき）に。／冷静（れいせい）に。',
    chinese: '理性地。(lǐ xìng de) / 合乎情理。(hé hū qíng lǐ)',
    spanish: 'Racionalmente. / Con juicio.',
    vietnamese: 'Theo lẽ phải. / Sáng suốt.'
  },
  566: {
    japanese: '直感（ちょっかん）的（てき）に。／なんとなく。',
    chinese: '凭借直觉。(píng jiè zhí jué) / 一看就懂。(yí kàn jiù dǒng)',
    spanish: 'Intuitivamente. / Por corazonada.',
    vietnamese: 'Bằng trực giác. / Nhìn là hiểu ngay.'
  },
  567: {
    japanese: '主観（しゅかん）的（てき）に。／自分（じぶん）なりに。',
    chinese: '主观地。(zhǔ guān de) / 片面。(piàn miàn)',
    spanish: 'Subjetivamente. / Según lo veo.',
    vietnamese: 'Theo ý chí cá nhân. / Chủ quan.'
  },
  568: {
    japanese: '客観（きゃっかん）的（てき）に。／公平（こうへい）に。',
    chinese: '客观地。(kè guān de) / 公正。(gōng zhèng)',
    spanish: 'Objetivamente. / Con imparcialidad.',
    vietnamese: 'Một cách khách quan. / Công tâm.'
  },
  569: {
    japanese: '正式（せいしき）に。／改（あらた）まって。',
    chinese: '正式地。(zhèng shì de) / 走流程。(zǒu liú chéng)',
    spanish: 'Formalmente. / De etiqueta.',
    vietnamese: 'Một cách trang trọng. / Đúng nghi thức.'
  },
  570: {
    japanese: '非（ひ）公式（こうしき）に。／ざっくばらんに。',
    chinese: '非正式地。(fēi zhèng shì de) / 随便。(suí biàn)',
    spanish: 'Informalmente. / De estar por casa.',
    vietnamese: 'Thân mật. / Không câu nệ.'
  },
  571: {
    japanese: '公式（こうしき）に。／公（おおやけ）のものとして。',
    chinese: '官方地。(guān fāng de) / 权威。(quán wēi)',
    spanish: 'Oficialmente. / De forma oficial.',
    vietnamese: 'Chính thức. / Công nhận rộng rãi.'
  },
  572: {
    japanese: '非（ひ）公式（こうしき）に。／内密（ないみつ）に。',
    chinese: '非官方。(fēi guān fāng) / 传闻。(chuán wén)',
    spanish: 'Unofficially. / Extraoficialmente.',
    vietnamese: 'Chưa chính thức. / Nghe đồn là.'
  },
  573: {
    japanese: '実際（じっさい）に。／現実（げんじつ）的（てき）に。',
    chinese: '切合实际地。(qiè hé shí jì de) / 靠谱。(kào pǔ)',
    spanish: 'Prácticamente. / De forma realista.',
    vietnamese: 'Thực tế mà nói. / Khá khả thi.'
  },
  574: {
    japanese: '実際（じっさい）に。／効果（こうか）的（てき）に。',
    chinese: '有效地。(yǒu xiào de) / 算是。(suàn shì)',
    spanish: 'Efectivamente. / De hecho.',
    vietnamese: 'Một cách hiệu quả. / Có tác dụng thực sự.'
  },
  575: {
    japanese: '効率（こうりつ）的（てき）に。／無駄（むだ）なく。',
    chinese: '高效地。(gāo xiào de) / 办事儿利索。(bàn shì r lì suǒ)',
    spanish: 'Eficientemente. / Con rapidez.',
    vietnamese: 'Có năng suất. / Tiết kiệm thời gian.'
  },
  576: {
    japanese: '生産（せいさん）的（てき）に。／実り（みのり）多い（おおい）。',
    chinese: '富有成效地。(fù yǒu chéng xiào de) / 充实。(chōng shí)',
    spanish: 'Productivamente. / Con provecho.',
    vietnamese: 'Một cách hiệu quả. / Sinh lời.'
  },
  577: {
    japanese: '建設（けんせつ）的（てき）に。／前（まえ）向き（むき）に。',
    chinese: '建设性地。(jiàn shè xìng de) / 有帮助。(yǒu bāng zhù)',
    spanish: 'Constructivamente. / De forma positiva.',
    vietnamese: 'Trên tinh thần xây dựng. / Tích cực.'
  },
  578: {
    japanese: '肯定（こうてい）的（てき）に。／積極（せっきょく）的に。',
    chinese: '积极地。(jī jí de) / 好。(hǎo)',
    spanish: 'Positivamente. / Con optimismo.',
    vietnamese: 'Một cách lạc quan. / Tốt đẹp.'
  },
  579: {
    japanese: '否定（ひてい）的（てき）に。／消極（しょうきょく）的に。',
    chinese: '消极地。(xiāo jí de) / 不行。(bù xíng)',
    spanish: 'Negativamente. / De forma adversa.',
    vietnamese: 'Tiêu cực. / Không hay cho lắm.'
  },
  580: {
    japanese: '楽観（らっかん）的（てき）に。／能天気（のうてんき）に。',
    chinese: '乐观地。(lè guān de) / 心大。(xīn dà)',
    spanish: 'Optimistamente. / Por el lado bueno.',
    vietnamese: 'Yêu đời. / Luôn hướng về phía trước.'
  },
  581: {
    japanese: '悲観（ひかん）的（てき）に。／暗（くら）く考（かんが）える。',
    chinese: '悲观地。(bēi guān de) / 没底儿。(méi dǐ r)',
    spanish: 'Pesimistamente. / Con pesimismo.',
    vietnamese: 'Bi quan. / Nhìn đời qua màu đen.'
  },
  582: {
    japanese: '現実（げんじつ）的（てき）に。／シビアに。',
    chinese: '务实地。(wù shí de) / 说真的。(shuō zhēn de)',
    spanish: 'Realistamente. / Con los pies en el suelo.',
    vietnamese: 'Một cách thực tế. / Không mơ mộng.'
  },
  583: {
    japanese: '正確（せいかく）に。／間違い（まちがい）なく。',
    chinese: '精确地。(jīng què de) / 到位。(dào wèi)',
    spanish: 'Exactamente. / Fielmente.',
    vietnamese: 'Chính xác. / Sai lệch không đáng kể.'
  },
  584: {
    japanese: '正しく（ただしく）。／適切（てきせつ）に。',
    chinese: '正确地。(zhèng què de) / 没错。(méi cuò)',
    spanish: 'Correctamente. / Bien hecho.',
    vietnamese: 'Một cách đúng đắn. / Chuẩn không cần chỉnh.'
  },
  585: {
    japanese: '緻密（ちみつ）に。／詳細（しょうさい）に。',
    chinese: '严丝合缝。(yán sī hé fèng) / 精准。(jīng zhǔn)',
    spanish: 'Precisamente. / Exactamente.',
    vietnamese: 'Gần như hoàn hảo. / Rất tỉ mỉ.'
  },
  586: {
    japanese: 'ミスなく。／完璧（かんぺき）に。',
    chinese: '无误。(wú wù) / 满分。(mǎn fēn)',
    spanish: 'Sin errores. / Impecablemente.',
    vietnamese: 'Không tì vết. / Sạch lỗi.'
  },
  587: {
    japanese: '欠点（けってん）なく。／鮮やか（あざやか）に。',
    chinese: '毫无瑕疵地。(háo wú xiá cī de) / 绝了。(jué le)',
    spanish: 'Impecablemente. / Sin fallos.',
    vietnamese: 'Hoàn mỹ. / Không chê vào đâu được.'
  },
  588: {
    japanese: '大体（だいたい）。／大ざっぱに。',
    chinese: '大概。(dà gài) / 马马虎虎。(mǎ mǎ hū hū)',
    spanish: 'A ojo. / Aproximadamente.',
    vietnamese: 'Khoảng quãng đó. / Sơ sơ.'
  },
  589: {
    japanese: 'およそ。／大凡（おおよそ）。',
    chinese: '大约。(dà yuē) / 将近。(jiāng jìn)',
    spanish: 'Aproximadamente. / Cerca de.',
    vietnamese: 'Xấp xỉ. / Ước tính.'
  },
  590: {
    japanese: '大体（だいたい）。／ほぼ。',
    chinese: '差不多。(chà bù duō) / 左右。(zuǒ yòu)',
    spanish: 'Más o menos. / Por ahí.',
    vietnamese: 'Khoảng đó. / Tầm tầm.'
  },
  591: {
    japanese: '〜（の）あたり。／だいたい。',
    chinese: '周围。(zhōu wéi) / 大概。(dà gài)',
    spanish: 'Alrededor de. / Cerca.',
    vietnamese: 'Vòng quanh đó. / Phảng phất.'
  },
  592: {
    japanese: '〜について。／およそ。',
    chinese: '大概。(dà gài) / 约。(yuē)',
    spanish: 'Sobre. / Cerca de.',
    vietnamese: 'Về điều gì đó. / Khoảng.'
  },
  593: {
    japanese: '（年代（ねんだい）などが）およそ。／〜頃（ごろ）。',
    chinese: '大约。(dà yuē) / 约于。(yuē yú)',
    spanish: 'Hacia. / Aproximadamente en.',
    vietnamese: 'Vào khoảng thời gian. / Ước chừng năm đó.'
  },
  594: {
    japanese: '推定（すいてい）で。／推（お）し量（はか）るに。',
    chinese: '可以估量地。(kě yǐ gū liáng de) / 算计。(suàn ji)',
    spanish: 'Estimablemente. / Según cálculos.',
    vietnamese: 'Có thể ước lượng được. / Đo lường được.'
  },
  595: {
    japanese: 'たくましく。／無骨（ぶこつ）に。',
    chinese: '坚固地。(jiān gù de) / 粗犷。(cū guàng)',
    spanish: 'Robustamente. / Con dureza.',
    vietnamese: 'Mạnh mẽ. / Cứng cáp.'
  },
  596: {
    japanese: '激しく（はげしく）。／暴力（ぼうりょく）的に（てきに）。',
    chinese: '猛烈地。(měng liè de) / 暴力。(bào lì)',
    spanish: 'Violentamente. / Con fuerza.',
    vietnamese: 'Một cách hung hãn. / Dữ dội.'
  },
  597: {
    japanese: '猛烈（もうれつ）に。／激（はげ）しく。',
    chinese: '凶狠地。(xiōng hěn de) / 激烈。(jī liè)',
    spanish: 'Ferozmente. / Con furia.',
    vietnamese: 'Mãnh liệt. / Quyết liệt.'
  },
  598: {
    japanese: '精力（せいりょく）的（てき）に。／力強く（ちからづよく）。',
    chinese: '蓬勃地。(péng bó de) / 有力。(yǒu lì)',
    spanish: 'Vigorosamente. / Con brío.',
    vietnamese: 'Một cách mãnh liệt. / Sung sức.'
  },
  599: {
    japanese: '活発（かっぱつ）に。／エネルギッシュに。',
    chinese: '充满活力地。(chōng mǎn huó lì de) / 精神焕发。(jīng shén huàn fā)',
    spanish: 'Enérgicamente. / Con ganas.',
    vietnamese: 'Tràn đầy năng lượng. / Năng nổ.'
  },
  600: {
    japanese: '情熱（じょうねつ）を込（こ）めて。／熱心（ねっしん）に。',
    chinese: '充满激情地。(chōng mǎn jī qíng de) / 热爱。(rè ài)',
    spanish: 'Apasionadamente. / Con pasión.',
    vietnamese: 'Bằng tất cả tâm huyết. / Say mê.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 501-600 updated.');
