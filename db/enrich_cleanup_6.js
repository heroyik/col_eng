const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  1410: {
    japanese: '用事（ようじ）を済ませる（すませる）。／あちこち回る（まわる）。',
    chinese: '办点杂事。(bàn diǎn zá shì) / 跑腿儿。(pǎo tuǐr)',
    spanish: 'Hacer unos recados. / Hacer unas diligencias.',
    vietnamese: 'Đi làm mấy việc lặt vặt. / Chạy việc nảy việc nọ.'
  },
  1414: {
    japanese: '良い（よい）一日（いちにち）を。／じゃあね。',
    chinese: '祝你一天愉快。(zhù nǐ yì tiān yú kuài) / 走好。(zǒu hǎo)',
    spanish: 'Que tengas un buen día. / Que te vaya bien.',
    vietnamese: 'Chúc một ngày tốt lành. / Đi nhé.'
  },
  1415: {
    japanese: 'さっぱりわからない。／お手上げ（おてあげ）だ。',
    chinese: '考住我了。(kǎo zhù wǒ le) / 没准儿。(méi zhǔnr)',
    spanish: 'Ni idea. / No tengo ni la más remota idea.',
    vietnamese: 'Tôi chịu thôi. / Chẳng biết gì luôn.'
  },
  1416: {
    japanese: 'ドキッとした。／心臓（しんぞう）が止まる（とまる）かと思った。',
    chinese: '我的心跳漏了一拍。(wǒ de xīn tiào lòu le yì pāi) / 吓了一跳。(xià le yí gè tiào)',
    spanish: 'Se me dio un vuelco el corazón. / Me dio un vuelco el corazón.',
    vietnamese: 'Tim tôi như thắt lại. / Giật thót cả mình.'
  },
  1419: {
    japanese: '声（こえ）に出して（だして）。／はっきりと。',
    chinese: '大声说出来。(dà shēng shuō chū lái) / 念出声来。(niàn chū shēng lái)',
    spanish: 'En voz alta. / Para que se oiga.',
    vietnamese: 'Nói to thành tiếng. / Nói oang oang ra.'
  },
  1421: {
    japanese: '気楽（きらく）にいこう。／リラックスして。',
    chinese: '放轻松。(fàng qīng sōng) / 别太紧张。(bié tài jǐn zhāng)',
    spanish: 'Relájate. / Tómatelo con calma.',
    vietnamese: 'Thoải mái đi nào. / Cứ thư giãn đi.'
  },
  1422: {
    japanese: '何（なに）でも。／ありとあらゆるもの。',
    chinese: '只要你能说出来的都有。(zhǐ yào nǐ néng shuō chū lái de dōu yǒu) / 应有尽有。(yīng yǒu jìn yǒu)',
    spanish: 'Lo que quieras. / De todo lo que se te ocurra.',
    vietnamese: 'Bất cứ thứ gì bạn muốn. / Kể ra thì không thiếu thứ gì.'
  },
  1423: {
    japanese: 'どんな不幸（ふこう）にも幸い（さいわい）はある。／やまない雨（あめ）はない。',
    chinese: '塞翁失马，焉知非福。(sài wēng shī mǎ, yān zhī fēi fú) / 苦尽甘来。(kǔ jìn gān lái)',
    spanish: 'No hay mal que por bien no venga. / Después de la tormenta siempre llega la calma.',
    vietnamese: 'Trong cái rủi có cái may. / Sau cơn mưa trời lại sáng.'
  },
  1424: {
    japanese: '手（て）を広げ（ひろげ）すぎた。／余裕（よゆう）がなかった。',
    chinese: '我力不从心。(wǒ lì bù cóng xīn) / 忙不过来。(máng bú guò lái)',
    spanish: 'Estaba abarcando demasiado. / Tenía demasiados frentes abiertos.',
    vietnamese: 'Tôi đã ôm đồm quá nhiều việc. / Phân thân không kịp.'
  },
  1425: {
    japanese: '私（わたし）がついているよ。／任せて（まかせて）。',
    chinese: '我挺你。(wǒ tǐng nǐ) / 有我呢。(yǒu wǒ ne)',
    spanish: 'Te cubro las espaldas. / Estoy contigo.',
    vietnamese: 'Tôi luôn ủng hộ bạn. / Có tôi ở đây rồi.'
  },
  1429: {
    japanese: '現れる（あらわれる）。／顔（かお）を出す（だす）。',
    chinese: '露面。(lòu miàn) / 到場。(dào chǎng)',
    spanish: 'Aparecer. / Presentarse.',
    vietnamese: 'Xuất hiện. / Có mặt.'
  },
  1432: {
    japanese: '吃る（どもる）。／言葉（ことば）に詰まる（つまる）。',
    chinese: '结巴。(jiē ba) / 说话不利索。(shuō huà bú lì suǒ)',
    spanish: 'Tartamudear. / Balbucear.',
    vietnamese: 'Nói lắp. / Ngắc ngứ.'
  },
  1434: {
    japanese: '社交（しゃこう）的（てき）な人（ひと）。／顔（かお）が広い（ひろい）人。',
    chinese: '交际花。(jiāo jì huā) / 社交达人。(shè jiāo dá rén)',
    spanish: 'Una persona muy sociable. / Un alma de la fiesta.',
    vietnamese: 'Người thích giao thiệp. / Người của công chúng.'
  },
  1437: {
    japanese: '社会（しゃかい）的（てき）責任（せきにん）。／社会的使命（しめい）。',
    chinese: '社会责任。(shè huì zé rèn) / 公民义务。(gōng mín yì wù)',
    spanish: 'Responsabilidad social. / Deber cívico.',
    vietnamese: 'Trách nhiệm xã hội. / Nghĩa vụ công dân.'
  },
  1438: {
    japanese: '社会（しゃかい）的（てき）規範（きはん）。／世間（せけん）の常識（じょうしき）。',
    chinese: '社会规范。(shè huì guī fàn) / 世人常理。(shì rén cháng lǐ)',
    spanish: 'Normas sociales. / Lo que dicta la sociedad.',
    vietnamese: 'Quy chuẩn xã hội. / Những chuẩn mực chung.'
  },
  1439: {
    japanese: 'もう一（ひと）踏ん張り（ふんばり）する。／期待（きたい）以上（いじょう）のことをする。',
    chinese: '百尺竿头更进一步。(bǎi chǐ gān tóu gèng jìn yí bù) / 多努力一点。(duō nǔ lì yì diǎn)',
    spanish: 'Hacer un esfuerzo extra. / Ir más allá de lo esperado.',
    vietnamese: 'Nỗ lực thêm một chút nữa. / Vượt qua cả kỳ vọng.'
  },
  1440: {
    japanese: '口火（くちび）を切る（きる）。／物事（ものごと）を始める（はじめる）。',
    chinese: '先走一步。(xiān zǒu yí bù) / 带个头儿。(dài gè tóur)',
    spanish: 'Poner las cosas en marcha. / Empezar el movimiento.',
    vietnamese: 'Bắt đầu triển khai. / Làm cho mọi thứ chuyển động.'
  },
  1441: {
    japanese: '試し（ためし）にやってみる。／挑戦（ちょうせん）する。',
    chinese: '试一下。(shì yí xià) / 闯一闯。(chuǎng yì chuǎng)',
    spanish: 'Intentarlo. / Darle una oportunidad.',
    vietnamese: 'Thử một phen xem sao. / Làm thử xem thế nào.'
  },
  1443: {
    japanese: '軌道（きどう）に乗る（のる）。／本格（ほんかく）的（てき）に始まる（はじまる）。',
    chinese: '开始起步。(kāi shǐ qǐ bù) / 步入正轨。(bù rù zhèng guǐ)',
    spanish: 'Despegar. / Empezar a funcionar.',
    vietnamese: 'Bắt đầu cất cánh. / Đi vào hoạt động chính thức.'
  },
  1445: {
    japanese: '当分（とうぶん）の間（あいだ）。／差し当たり（さしあたり）。',
    chinese: '暂时。(zàn shí) / 先这么着。(xiān zhè me zhe)',
    spanish: 'Por el momento. / Por ahora.',
    vietnamese: 'Trong thời gian này. / Tạm thời là vậy.'
  },
  1446: {
    japanese: '趣（おもむき）を変えて（かえて）。／気分（きぶん）転換（てんかん）に。',
    chinese: '换个花样。(huàn gè huā yàng) / 调节一下。(tiáo jié yí xià)',
    spanish: 'Para variar. / Para cambiar un poco.',
    vietnamese: 'Để thay đổi không khí. / Làm gì đó khác đi.'
  },
  1447: {
    japanese: '時々（ときどき）。／たまに。',
    chinese: '偶尔。(ǒu ěr) / 时不时地。(shí bù shí de)',
    spanish: 'De vez en cuando. / Cada tanto.',
    vietnamese: 'Thỉnh thoảng. / Đôi khi.'
  },
  1449: {
    japanese: '圧倒（あっとう）的（てき）な迫力（はくりょく）。／自然（しぜん）の力（ちから）。',
    chinese: '大自然的力量。(dà zì rán de lì liàng) / 不可阻挡。(bù kě zǔ dǎng)',
    spanish: 'Una fuerza de la naturaleza. / Algo imparable.',
    vietnamese: 'Sức mạnh của tự nhiên. / Một cá tính mạnh mẽ.'
  },
  1450: {
    japanese: '意志（いし）の力（ちから）。／強い（つよい）信念（しんねん）。',
    chinese: '意志力。(yì zhì lì) / 毅力。(yì lì)',
    spanish: 'Fuerza de voluntad. / Poder de la mente.',
    vietnamese: 'Sức mạnh ý chí. / Quyết tâm sắt đá.'
  },
  1451: {
    japanese: 'カリスマ性（せい）。／人柄（ひとがら）の強さ（つよさ）。',
    chinese: '人格魅力。(rén gé mèi lì) / 魄力。(pò lì)',
    spanish: 'Fuerza de personalidad. / Carisma.',
    vietnamese: 'Sức hút cá nhân. / Bản lĩnh con người.'
  },
  1452: {
    japanese: '衝撃（しょうげき）の強さ（つよさ）。／影響（えいきょう）力（りょく）。',
    chinese: '冲击力。(chōng jī lì) / 震撼。(zhèn hàn)',
    spanish: 'Fuerza de impacto. / La potencia del golpe.',
    vietnamese: 'Sức mạnh va chạm. / Tầm ảnh hưởng lớn.'
  },
  1453: {
    japanese: 'アレルギーが出て（でて）るんだ。／鼻（はな）がむずむずする。',
    chinese: '我的过敏反应犯了。(wǒ de guò mǐn fǎn yìng fàn le) / 过敏。(guò mǐn)',
    spanish: 'Se me están activando las alergias. / Tengo un brote de alergia.',
    vietnamese: 'Bệnh dị ứng của tôi lại tái phát rồi. / Đang bị dị ứng hành hạ.'
  },
  1454: {
    japanese: '放っておいて（ほうっておいて）。／干渉（かんしょう）しないで。',
    chinese: '别烦我。(bié fán wǒ) / 别管我。(bié guǎn wǒ)',
    spanish: 'Déjame en paz. / No me des la lata.',
    vietnamese: 'Đừng có làm phiền tôi nữa. / Để tôi yên đi.'
  },
  1456: {
    japanese: 'ドアの枠（わく）に肘（ひじ）をぶつけちゃった。／痛（いた）い！',
    chinese: '我刚把胳膊肘撞在门框上了。(wǒ gāng bǎ gē bo zhǒu zhuàng zài mén kuàng shàng le) / 磕了一下。(kē le yí xià)',
    spanish: 'Me acabo de dar un golpe en el codo con el marco de la puerta. / ¡Ay, mi codo!',
    vietnamese: 'Tôi vừa đập khuỷu tay vào khung cửa. / Đau điếng cả người.'
  },
  1457: {
    japanese: '君（きみ）には根性（こんじょう）があるね。／気骨（きこつ）がある。',
    chinese: '你有韧劲儿。(nǐ yǒu rèn jìnr) / 骨气。(gǔ qì)',
    spanish: 'Tienes casta. / Tienes coraje.',
    vietnamese: 'Bạn có bản lĩnh đấy. / Thật là kiên cường.'
  },
  1458: {
    japanese: '根性（こんじょう）があるね。／度胸（どきょう）がある。',
    chinese: '你有胆量。(nǐ yǒu dǎn liàng) / 带劲。(dài jìn)',
    spanish: 'Tienes agallas. / Tienes valor.',
    vietnamese: 'Bạn thật có gan. / Rất dũng cảm.'
  },
  1459: {
    japanese: 'グルメなんだ。／食べる（たべる）のが大好き（だいすき）。',
    chinese: '我是个吃货。(wǒ shì gè chī huò) / 美食家。(měi shí jiā)',
    spanish: 'Soy un comidista. / Me encanta la buena mesa.',
    vietnamese: 'Tôi là một tâm hồn ăn uống. / Tín đồ ẩm thực chính hiệu.'
  },
  1460: {
    japanese: 'これが最後（さいご）の決定（けってい）打（だ）だ。／もう我慢（がまん）できない。',
    chinese: '这是最后一根稻草。(zhè shì zuì hòu yì gēn dào cǎo) / 忍无可忍。(rěn wú kě rěn)',
    spanish: 'Es la gota que colma el vaso. / Ya no aguanto más.',
    vietnamese: 'Đây là giọt nước tràn ly. / Không thể nhẫn nhịn thêm được nữa.'
  },
  1462: {
    japanese: 'ありそうかな。／たぶんね。',
    chinese: '看来挺象那么回事的。(kàn lái tǐng xiàng nà me huí shì de) / 没准儿。(méi zhǔnr)',
    spanish: 'Parece bastante probable. / Hay muchas posibilidades.',
    vietnamese: 'Có vẻ khá khả thi đấy. / Chắc là vậy rồi.'
  },
  1463: {
    japanese: 'ちょっと誇張（こちょう）されてるみたいだ。／大げさ（おおげさ）だ。',
    chinese: '那好像有点儿夸张。(nà hǎo xiàng yǒu diǎnr kuā zhāng) / 吹牛。(chuī niú)',
    spanish: 'Parecía un poco exagerado. / Me pareció que se pasaba un poco.',
    vietnamese: 'Có vẻ hơi quá lời rồi đấy. / Thổi phồng vấn đề quá.'
  },
  1464: {
    japanese: '優柔不断（ゆうじゅうふだん）。／はっきりしない。',
    chinese: '优柔寡断。(yōu róu guǎ duàn) / 磨叽。(mò ji)',
    spanish: 'Irresoluto. / Que no se decide.',
    vietnamese: 'Thiếu quyết đoán. / Cứ lờ đờ nửa vời.'
  },
  1465: {
    japanese: '秘密（ひみつ）にしておいて。／伏せて（ふせて）おいて。',
    chinese: '保密。(bǎo mì) / 别张扬。(bié zhāng yáng)',
    spanish: 'Mantenlo en secreto. / No digas nada a nadie.',
    vietnamese: 'Hãy giữ kín chuyện này nhé. / Đừng để lộ ra ngoài.'
  },
  1466: {
    japanese: '後悔（こうかい）するタイプじゃないんだ。／過去（かこ）は振り返ら（ふりかえら）ない。',
    chinese: '我不是那种会后悔的人。(wǒ bú shì nà zhǒng huì hòu huǐ de rén) / 没遗憾。(méi yí hàn)',
    spanish: 'No soy de los que se arrepienten de nada. / No suelo mirar atrás.',
    vietnamese: 'Tôi không phải kiểu người hay hối tiếc. / Chuyện đã qua cứ để nó qua đi.'
  },
  1467: {
    japanese: '言葉（ことば）が見つかり（みつかり）ません。／感極（かんきわ）まって話せない。',
    chinese: '我词穷了。(wǒ cí qióng le) / 无话可说。(wú huà kě shuō)',
    spanish: 'Me faltan las palabras. / No encuentro las palabras.',
    vietnamese: 'Tôi không biết phải nói gì hơn. / Cạn lời trước tình huống này.'
  },
  1470: {
    japanese: '苦しむ（くるしむ）くらいなら死ん（しん）だほうがましだ。／そんなの嫌（いや）だ。',
    chinese: '宁死不屈。(níng sǐ bù qū) / 我受不了那个。(wǒ shòu bù liǎo nà gè)',
    spanish: 'Prefiero morir que sufrir. / Antes muerte que tal calvario.',
    vietnamese: 'Thà chết còn hơn phải chịu khổ. / Không thể sống trong đau đớn như vậy.'
  },
  1474: {
    japanese: 'ばったり会っ（あっ）た：／偶然（ぐうぜん）遭遇（そうぐう）した。',
    chinese: '偶遇：(ǒu yù) / 碰到了：(pèng dào le)',
    spanish: 'Encontrarse con: / Tropezar con:',
    vietnamese: 'Tình cờ gặp: / Chạm mặt bất ngờ:'
  },
  1475: {
    japanese: 'ぶつかった：／接触（せっしょく）した。',
    chinese: '撞上了：(zhuàng shàng le) / 磕到了：(kē dào le)',
    spanish: 'Chocar contra: / Golpearse contra:',
    vietnamese: 'Va phải: / Đâm sầm vào:'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Cleanup Batch 6 updated.');
