const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  401: {
    japanese: 'ほとんど〜ない。／およそ〜ない。',
    chinese: '几乎不。(jī fǔ bù) / 简直没法。(jiǎn zhí méi fǎ)',
    spanish: 'Apenas. / Casi nada.',
    vietnamese: 'Hầu như không. / Coi bộ khó.'
  },
  402: {
    japanese: '滅多に（めったに）〜ない。／稀（まれ）にしか〜ない。',
    chinese: '极少。(jí shǎo) / 基本上不。(jī běn shàng bù)',
    spanish: 'Casi nunca. / Muy raras veces.',
    vietnamese: 'Hiếm khi nào. / Cực kỳ ít khi.'
  },
  403: {
    japanese: 'かろうじて。／やっと。',
    chinese: '勉强。(miǎn qiǎng) / 差一点。(chà yì diǎn)',
    spanish: 'Apenas. / Por los pelos.',
    vietnamese: 'Vừa vặn. / Suýt soát.'
  },
  404: {
    japanese: 'ただ〜だけ。／ちょうど。',
    chinese: '就。(jiù) / 只是。(zhǐ shì)',
    spanish: 'Solo. / Justo.',
    vietnamese: 'Cũng chỉ là. / Vừa mới.'
  },
  405: {
    japanese: 'ほとんど〜ない。／僅か（わずか）に。',
    chinese: '几乎没有。(jī fǔ méi yǒu) / 寥寥无几。(liáo liao wú jǐ)',
    spanish: 'Casi ninguno. / Escasamente algo.',
    vietnamese: 'Gần như không thấy. / Chẳng còn mấy.'
  },
  406: {
    japanese: '決して（けっして）〜ない。／一度（いちど）も〜ない。',
    chinese: '从不。(cóng bù) / 绝不。(jué bù)',
    spanish: 'Nunca. / Jamás.',
    vietnamese: 'Không bao giờ. / Tuyệt đối không.'
  },
  407: {
    japanese: 'どうしても〜ない。／決して（けっして）そうではない。',
    chinese: '决不。(jué bù) / 并不是。(bìng bú shì)',
    spanish: 'De ninguna manera. / Para nada.',
    vietnamese: 'Bằng bất cứ giá nào cũng không. / Chắc chắn không.'
  },
  408: {
    japanese: 'どんな理由（りゆう）があっても〜ない。／断固（だんこ）拒否（きょひ）。',
    chinese: '决不可以。(jué bù kě yǐ) / 绝不。(jué bù)',
    spanish: 'Bajo ningún concepto. / Por nada del mundo.',
    vietnamese: 'Không vì lý do gì mà. / Tuyệt đối không được.'
  },
  409: {
    japanese: 'いかなる点（てん）でも〜ない。／全く（まったく）ない。',
    chinese: '绝不。(jué bù) / 毫无疑问不。(háo wú yí wèn bù)',
    spanish: 'De ningún modo. / En absoluto.',
    vietnamese: 'Không đời nào. / Chẳng thể nào.'
  },
  410: {
    japanese: '全く（まったく）〜ない。／少し（すこし）も〜ない。',
    chinese: '一点也不。(yì diǎn yě bù) / 根本不。(gēn běn bù)',
    spanish: 'Para nada. / En absoluto.',
    vietnamese: 'Không một chút nào. / Chẳng có gì cả.'
  },
  411: {
    japanese: '微塵（みじん）も〜ない。／ちっとも。',
    chinese: '丝毫不。(sī háo bù) / 一点儿也不。(yì diǎnr yě bù)',
    spanish: 'Ni lo más mínimo. / En absoluto.',
    vietnamese: 'Không mảy may. / Một tí cũng không.'
  },
  412: {
    japanese: 'それどころか。／程（ほど）遠（とお）い。',
    chinese: '远非如此。(yuǎn fēi rú cǐ) / 差得远呢。(chà de yuǎn ne)',
    spanish: 'Ni mucho menos. / Lejos de eso.',
    vietnamese: 'Càng không phải vậy. / Còn xa mới tới.'
  },
  413: {
    japanese: '冗談（じょうだん）じゃない。／無理（むり）だ。',
    chinese: '没门儿。(méi ménr) / 不行。(bù xíng)',
    spanish: 'Ni hablar. / De ninguna manera.',
    vietnamese: 'Không đời nào. / Còn lâu nhé.'
  },
  414: {
    japanese: 'どんな状況（じょうきょう）でも〜ない。／絶対（ぜったい）禁止（きんし）。',
    chinese: '在任何情况下都不。(zài rèn hé qíng kuàng xià dōu bù) / 绝不。(jué bù)',
    spanish: 'Bajo ninguna circunstancia. / Jamás.',
    vietnamese: 'Không vì bất cứ điều gì. / Tuyệt đối cấm.'
  },
  415: {
    japanese: '命（いのち）に代（か）えても〜ない。／断（ことわ）る。',
    chinese: '绝不。(jué bù) / 打死也不。(dǎ sǐ yě bù)',
    spanish: 'Ni por asomo. / Por nada de este mundo.',
    vietnamese: 'Có chết cũng không. / Đừng hòng.'
  },
  416: {
    japanese: '絶対（ぜったい）に〜ない。／断言（だんげん）する。',
    chinese: '肯定不。(kěn dìng bù) / 绝对不行。(jué duì bù xíng)',
    spanish: 'Definitivamente no. / Con seguridad no.',
    vietnamese: 'Chắc chắn là không. / Một lời là không.'
  },
  417: {
    japanese: '断固（だんこ）として拒否（きょひ）。／全然（ぜんぜん）だめ。',
    chinese: '绝对不。(jué duì bù) / 当然不。(dāng rán bù)',
    spanish: 'Absolutamente no. / Rotundamente no.',
    vietnamese: 'Tuyệt đối không. / Hoàn toàn không.'
  },
  418: {
    japanese: '見込（みこ）みなし。／可能性（かのうせい）ゼロ。',
    chinese: '没机会。(méi jī huì) / 没戏。(yǒu xì)',
    spanish: 'Ni una posibilidad. / Imposible.',
    vietnamese: 'Không có cửa. / Chẳng có hy vọng gì.'
  },
  419: {
    japanese: '論外（ろんがい）だ。／話し（はなし）にならない。',
    chinese: '不可能。(bù kě néng) / 没商量。(méi shāng liang)',
    spanish: 'Fuera de toda cuestión. / Impensable.',
    vietnamese: 'Không bàn cãi nữa. / Miễn bàn.'
  },
  420: {
    japanese: '残念（ざんねん）ながら〜ない。／期待（きたい）に沿（そ）えない。',
    chinese: '恐怕不行。(kǒng pà bù xíng) / 遗憾。(yí hàn)',
    spanish: 'Me temo que no. / Lamentablemente no.',
    vietnamese: 'E là không được rồi. / Phải từ chối thôi.'
  },
  421: {
    japanese: 'そうは思（おも）わない。／否定的（ひていてき）だ。',
    chinese: '我不这么认为。(wǒ bù zhè me rèn wéi) / 我看未必。(wǒ kàn wèi bì)',
    spanish: 'No lo creo. / No me parece.',
    vietnamese: 'Tôi không nghĩ vậy. / Tôi cho là không.'
  },
  422: {
    japanese: '疑（うたが）わしい。／怪（あや）しいな。',
    chinese: '我看悬。(wǒ kàn xuán) / 怀疑。(huái yí)',
    spanish: 'Lo dudo. / No estoy seguro.',
    vietnamese: 'Tôi nghi lắm. / Chưa chắc đâu.'
  },
  423: {
    japanese: '私（わたし）が知（し）る限（かぎ）りではない。／聞（き）いてないな。',
    chinese: '我不知道。(wǒ bù zhī dào) / 没听说过。(méi tīng shuō guò)',
    spanish: 'No que yo sepa. / No estoy al tanto.',
    vietnamese: 'Tôi không biết chuyện đó. / Hình như là không.'
  },
  424: {
    japanese: '心当（こころあ）たりがない。／知（し）らない。',
    chinese: '据我所知不是这样。(jù wǒ suǒ zhī bú shì zhè yàng) / 没听说。(méi tīng shuō)',
    spanish: 'No para mí información. / Desconozco eso.',
    vietnamese: 'Ngoài tầm hiểu biết của tôi. / Tôi không nghe nói.'
  },
  425: {
    japanese: 'いや、特（とく）に。／そうでもないよ。',
    chinese: '那倒没有。(nà dào méi yǒu) / 其实不然。(qí shí bù rán)',
    spanish: 'No, la verdad es que no. / Realmente no.',
    vietnamese: 'Không, không hẳn vậy. / Thực sự là không.'
  },
  426: {
    japanese: 'そうとは言（い）い切（き）れない。／言い過ぎ（いいすぎ）だ。',
    chinese: '我可没那么说。(wǒ kě méi nà me shuō) / 未必吧。(wèi bì ba)',
    spanish: 'Yo no diría eso. / Me parece excesivo.',
    vietnamese: 'Tôi không nói như vậy. / Nói thế thì hơi quá.'
  },
  427: {
    japanese: '全然（ぜんぜん）違う（ちがう）。／かけ離（はな）れている。',
    chinese: '差远了。(chà yuǎn le) / 根本不是一回事。(gēn běn bú shì yì huí shì)',
    spanish: 'Lejos de ello. / Para nada.',
    vietnamese: 'Còn khuya nhé. / Khác biệt hoàn toàn.'
  },
  428: {
    japanese: '正反対（せいはんたい）だ。／逆（ぎゃく）だよ。',
    chinese: '恰恰相反。(qià qià xiāng fǎn) / 反着呢。(fǎn zhe ne)',
    spanish: 'Todo lo contrario. / Al revés.',
    vietnamese: 'Hoàn toàn ngược lại. / Trái ngược hẳn luôn.'
  },
  429: {
    japanese: '〜以外（いがい）なら何（なに）でも。／決して（けっして）〜ではない。',
    chinese: '绝不是。(jué bú shì) / 除了...什么都行。(chú le... shén me dōu xíng)',
    spanish: 'Cualquier cosa menos eso. / Nada más lejos de la realidad.',
    vietnamese: 'Cái gì cũng được trừ cái đó. / Tuyệt đối không phải.'
  },
  430: {
    japanese: '概（おおむ）ね。／全（ぜん）般（ぱん）的（てき）に。',
    chinese: '总的来说。(zǒng de lái shuō) / 大体上。(dà tǐ shàng)',
    spanish: 'Por lo general. / En líneas generales.',
    vietnamese: 'Nói chung. / Đại thể là vậy.'
  },
  431: {
    japanese: '一般（いっぱん）的（てき）に言（い）えば。／通常（つうじょう）。',
    chinese: '通常。(tōng cháng) / 一般而言。(yì bān ér yán)',
    spanish: 'En términos generales. / Por lo común.',
    vietnamese: 'Nhìn chung mà nói. / Thói đời thường là.'
  },
  432: {
    japanese: '全体（ぜんたい）を通（とお）して見（み）れば。／概（おおむ）ね。',
    chinese: '总体说来。(zǒng tǐ shuō lái) / 全部来看。(quán miàn lái kàn)',
    spanish: 'En conjunto. / Globalmente.',
    vietnamese: 'Xét chung lại. / Tóm lại là thế.'
  },
  433: {
    japanese: '一般（いっぱん）に。／普遍（ふへん）的（てき）に。',
    chinese: '普及。(pǔ jí) / 一般地。(yì bān de)',
    spanish: 'En general. / Normalmente.',
    vietnamese: 'Nói chung. / Phổ quát.'
  },
  434: {
    japanese: '大部分（だいぶぶん）は。／ほとんど。',
    chinese: '多半。(duō bàn) / 绝大多数。(jué dà duō shù)',
    spanish: 'En su mayor parte. / Por lo general.',
    vietnamese: 'Đa phần. / Hầu hết là.'
  },
  435: {
    japanese: '主（おも）に。／第一（だいいち）に。',
    chinese: '主要是。(zhǔ yào shì) / 核心。(hé xīn)',
    spanish: 'Principalmente. / Fundamentalmente.',
    vietnamese: 'Chủ yếu. / Là chính.'
  },
  436: {
    japanese: 'ほとんど。／大半（たいはん）。',
    chinese: '大多。(dà duō) / 几乎。(jī fǔ)',
    spanish: 'Casi siempre. / En su mayoría.',
    vietnamese: 'Phần lớn là. / Gần như vậy.'
  },
  437: {
    japanese: '圧倒（あっとう）的（てき）に。／優勢（ゆうせい）だ。',
    chinese: '占优势地。(zhàn yōu shì de) / 主要是。(zhǔ yào shì)',
    spanish: 'Predominantemente. / Sobre todo.',
    vietnamese: 'Chiếm ưu thế. / Áp đảo.'
  },
  438: {
    japanese: '主（おも）に。／特（とく）に。',
    chinese: '首要地。(shǒu yào de) / 专门。(zhuān mén)',
    spanish: 'Especialmente. / Principalmente.',
    vietnamese: 'Cốt lõi là. / Quan trọng nhất.'
  },
  439: {
    japanese: '主（おも）に。／根本（こんぽん）的（てき）に。',
    chinese: '原本。(yuán běn) / 首要地。(shǒu yào de)',
    spanish: 'Primordialmente. / De entrada.',
    vietnamese: 'Trước nhất là. / Điểm chính yếu.'
  },
  440: {
    japanese: '本質（ほんしつ）的（てき）な。／実質（じっしつ）的に（てきに）。',
    chinese: '本质上。(běn zhì shàng) / 基本上。(jī běn shàng)',
    spanish: 'Esencialmente. / En el fondo.',
    vietnamese: 'Về bản chất. / Cốt yếu.'
  },
  441: {
    japanese: '根本（こんぽん）的（てき）に。／基本的（きほんてき）。',
    chinese: '从根本上讲。(cóng gēn běn shàng jiǎng) / 基础。(jī chǔ)',
    spanish: 'Fundamentalmente. / Básicamente.',
    vietnamese: 'Một cách căn bản. / Cốt tử.'
  },
  442: {
    japanese: '基本（きほん）的（てき）には。／要（よう）は。',
    chinese: '根本还是。(gēn běn hái shì) / 原则上。(yuán zé shàng)',
    spanish: 'Básicamente. / En resumen.',
    vietnamese: 'Nói chung là. / Đơn giản là.'
  },
  443: {
    japanese: '要（よう）するに。／実質（じっしつ）的（てき）には。',
    chinese: '实质上。(shí zhì shàng) / 换句话说。(huàn jù huà shuō)',
    spanish: 'En esencia. / En el fondo.',
    vietnamese: 'Về thực chất. / Điểm mấu chốt là.'
  },
  444: {
    japanese: '本心（ほんしん）では。／根（ね）は。',
    chinese: '内心深处。(nèi xīn shēn chù) / 底子。(dǐ zi)',
    spanish: 'En el fondo. / De corazón.',
    vietnamese: 'Từ tận đáy lòng. / Thực tâm.'
  },
  445: {
    japanese: '原則（げんそく）として。／理念（りねん）的（てき）には。',
    chinese: '原则上。(yuán zé shàng) / 理论上。(lǐ lùn shàng)',
    spanish: 'En principio. / Por regla general.',
    vietnamese: 'Về nguyên tắc. / Trên lý thuyết.'
  },
  446: {
    japanese: '理論（りろん）上（じょう）は。／理屈（りくつ）では。',
    chinese: '理论上。(lǐ lùn shàng) / 纸上谈兵。(zhǐ shàng tán bīng)',
    spanish: 'Teóricamente. / En el papel.',
    vietnamese: 'Trên phương diện lý thuyết. / Nói trên giấy.'
  },
  447: {
    japanese: '仮定（かてい）の話（はなし）では。／もしもの場合（ばあい）。',
    chinese: '假设性地。(jiǎ shè xìng de) / 假定。(jiǎ dìng)',
    spanish: 'Hipotéticamente. / Supuestamente.',
    vietnamese: 'Giả định là vậy. / Trong trường hợp giả thuyết.'
  },
  448: {
    japanese: '厳密（げんみつ）に言（い）えば。／正確（せいかく）には。',
    chinese: '严格来说。(yán gé lái shuō) / 说实在的。(shuō shí zài de)',
    spanish: 'Para ser exactos. / Hablando en plata.',
    vietnamese: 'Nói cho đúng thì. / Chi li ra.'
  },
  449: {
    japanese: '技術（ぎじゅつ）的（てき）には。／専門（せんもん）的（てき）には。',
    chinese: '技术层面上。(jì shù céng miàn shàng) / 说白了。(shuō bái le)',
    spanish: 'Técnicamente. / Formalmente.',
    vietnamese: 'Về kỹ thuật mà nói. / Trên danh nghĩa.'
  },
  450: {
    japanese: '法律（ほうりつ）的（てき）には。／法（ほう）に則っ（のっとっ）て。',
    chinese: '法律上。(fǎ lǜ shàng) / 合法地。(hé fǎ de)',
    spanish: 'Legalmente. / Conforme a la ley.',
    vietnamese: 'Về mặt pháp lý. / Theo đúng luật.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 401-450 updated.');
