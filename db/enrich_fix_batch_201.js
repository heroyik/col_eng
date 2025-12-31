const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  201: {
    japanese: '気づい（きづい）たら〜にいた。／いつの間（ま）にか〜にいた。',
    chinese: '不知不觉发现自己在...(bù zhī bù jué fā xiàn zì jǐ zài...) / 发现自己陷入了...(fā xiàn zì jǐ xiàn rù le...)',
    spanish: 'Me encontré en... / Acabé en...',
    vietnamese: 'Thấy mình đang ở... / Tự nhiên lại thấy mình ở...'
  },
  202: {
    japanese: 'ざっと目（め）を通（とお）す。／流（なが）し読（よ）みする。',
    chinese: '浏览一下。(liú lǎn yí xià) / 略读。(lüè dú)',
    spanish: 'Echar un vistazo rápido. / Leer por encima.',
    vietnamese: 'Đọc lướt qua. / Xem qua loa.'
  },
  203: {
    japanese: 'それならそれでいい。／仕方（しかた）ないね。',
    chinese: '那就这样吧。(nà jiù zhè yàng ba) / 顺其自然。(shùn qí zì rán)',
    spanish: 'Pues que así sea. / Amén.',
    vietnamese: 'Vậy thì cứ thế đi. / Đành chịu vậy.'
  },
  204: {
    japanese: 'お似合（にあ）いだね。／運命（うんめい）の二人（ふたり）だ。',
    chinese: '天造地设的一对。(tiān zào dì shè de yí duì) / 绝配。(jué pèi)',
    spanish: 'Están hechos el uno para el otro. / Son tal para cual.',
    vietnamese: 'Trời sinh một cặp. / Sinh ra là để dành cho nhau.'
  },
  205: {
    japanese: '始（はじ）め良（よ）ければ全（すべ）て良（よ）し。／最初（さいしょ）が肝心（かんじん）。',
    chinese: '良好的开端是成功的一半。(liáng hǎo de kāi duān shì chéng gōng de yí bàn) / 开个好头很重要。(kāi gè hǎo tóu hěn zhòng yào)',
    spanish: 'Buen principio, la mitad está hecha. / Empezar bien es medio camino.',
    vietnamese: 'Đầu xuôi đuôi lọt. / Khởi đầu tốt là xong một nửa rồi.'
  },
  206: {
    japanese: 'ゴマをする。／おだてる。',
    chinese: '拍马屁。(pāi mǎ pì) / 讨好某人。(tǎo hǎo mǒu rén)',
    spanish: 'Hacer la pelota a alguien. / Adular a alguien.',
    vietnamese: 'Nịnh bợ ai đó. / Tâng bốc ai đó.'
  },
  207: {
    japanese: '広告（こうこく）に騙（だま）された。／宣伝（せんでん）に乗せ（のせ）られた。',
    chinese: '被广告骗了。(bèi guǎng gào piàn le) / 信了广告的邪。(xìn le guǎng gào de xié)',
    spanish: 'Me dejé llevar por el anuncio. / El anuncio me engañó.',
    vietnamese: 'Bị quảng cáo lừa. / Tin vào quảng cáo quá.'
  },
  208: {
    japanese: 'ひょっとして。／もしかして。',
    chinese: '碰巧。(pèng qiǎo) / 该不会是...(gāi bú huì shì...)',
    spanish: '¿Por casualidad...? / ¿De casualidad...?',
    vietnamese: 'Có khi nào... / Liệu có phải là...'
  },
  209: {
    japanese: '胃腸（いちょう）が弱（よわ）いんです。／すぐお腹（なか）を壊（こわ）すんです。',
    chinese: '我肠胃不好。(wǒ cháng wèi bù hǎo) / 我胃口比较弱。(wǒ wèi kǒu bǐ jiào ruò)',
    spanish: 'Tengo el estómago delicado. / Me cae mal la comida fácilmente.',
    vietnamese: 'Bụng dạ tôi yếu lắm. / Tôi hay bị đau bụng.'
  },
  210: {
    japanese: '一気（いっき）に飲（の）んで！／飲み干（ほ）して！',
    chinese: '干了！(gān le) / 一口闷！(yì kǒu mēn)',
    spanish: '¡Bébetelo todo! / ¡De un trago!',
    vietnamese: 'Uống cạn đi! / Dô 100% nào!'
  },
  211: {
    japanese: '追（お）い討（う）ちをかけないで。／痛（いた）いところを突（つ）かないで。',
    chinese: '别伤口上撒盐了。(bié shāng kǒu shàng sǎ yán le) / 别哪壶不开提哪壶。(bié nǎ hú bù kāi tí nǎ hú)',
    spanish: 'No me lo restriegues. / No hurgues en la herida.',
    vietnamese: 'Đừng xát muối vào nỗi đau nữa. / Đừng nhắc lại chuyện đó nữa.'
  },
  212: {
    japanese: '彼（かれ）はあなたに気（き）があるよ。／あなたのこと好（す）きみたいよ。',
    chinese: '他对你有意思。(tā duì nǐ yǒu yì si) / 他喜欢你。(tā xǐ huan nǐ)',
    spanish: 'Siente algo por ti. / Le gustas.',
    vietnamese: 'Anh ấy có tình cảm với bạn đấy. / Hắn kết bạn rồi.'
  },
  213: {
    japanese: '恋（こい）に落（お）ちる。／騙（だま）される。',
    chinese: '爱上...(ài shàng...) / 上當。(shàng dàng)',
    spanish: 'Enamorarse de. / Caer en la trampa.',
    vietnamese: 'Phải lòng ai đó. / Bị mắc lừa.'
  },
  214: {
    japanese: '微妙（びみょう）だね。／怪（あや）しいね。',
    chinese: '有点悬。(yǒu diǎn xuán) /不太确定。(bú tài què dìng)',
    spanish: 'Dudoso. / No está claro.',
    vietnamese: 'Mập mờ quá. / Không chắc chắn lắm.'
  },
  215: {
    japanese: '見（み）よ！／ご覧（らん）あれ！',
    chinese: '看哪！(kàn na) / 注视。(zhù shì)',
    spanish: '¡Contemplad! / ¡Mirad!',
    vietnamese: 'Hãy nhìn xem! / Chiêm ngưỡng đi!'
  },
  216: {
    japanese: '成績（せいせき）優秀（ゆうしゅう）者（しゃ）リスト。／優等生（ゆうとうせい）。',
    chinese: '院长嘉许名单。(yuàn zhǎng jiā xǔ míng dān) / 优秀学生名单。(yōu xiù xué shēng míng dān)',
    spanish: 'Lista del decano. / Lista de honor.',
    vietnamese: 'Danh sách sinh viên xuất sắc. / Bảng vàng danh dự.'
  },
  217: {
    japanese: '騙（だま）そうとしても無駄（むだ）だよ。／ズルしようとするな。',
    chinese: '别想糊弄我。(bié xiǎng hù nong wǒ) / 别想耍花招。(bié xiǎng shuǎ huā zhāo)',
    spanish: 'No intentes engañarme. / No te pases de listo.',
    vietnamese: 'Đừng hòng lừa tôi. / Đừng giở trò khôn lỏi.'
  },
  218: {
    japanese: 'ドッキリでした！／騙（だま）されたね！',
    chinese: '被整了。(bèi zhěng le) / 恶作剧成功。(è zuò jù chéng gōng)',
    spanish: 'Te gastaron una broma. / Caíste en la broma.',
    vietnamese: 'Bị chơi khăm rồi. / Ăn cú lừa rồi nhé.'
  },
  219: {
    japanese: '急（いそ）いで！／スピード上（あ）げて！',
    chinese: '踩油门！(cǎi yóu mén) / 快点！(kuài diǎn)',
    spanish: '¡Písale! / ¡Acelera!',
    vietnamese: 'Đạp ga đi! / Nhanh lên chút nào!'
  },
  220: {
    japanese: '玉（たま）の輿（こし）狙（ねら）い。／お金（かね）目当（めあ）ての人（ひと）。',
    chinese: '拜金女。(bài jīn nǚ) / 傍大款的人。(bàng dà kuǎn de rén)',
    spanish: 'Cazafortunas. / Interesada.',
    vietnamese: 'Kẻ đào mỏ. / Người tham tiền.'
  },
  221: {
    japanese: '口（くち）ばっかりだね。／言（い）うだけ番長（ばんちょう）だ。',
    chinese: '光说不做。(guāng shuō bú zuò) / 只会耍嘴皮子。(zhǐ huì shuǎ zuǐ pí zi)',
    spanish: 'Eres puro bla bla bla. / Mucho ruido y pocas nueces.',
    vietnamese: 'Chỉ được cái mồm miệng. / Nói thì hay lắm.'
  },
  222: {
    japanese: '賛成（さんせい）です。／同意（どうい）します。',
    chinese: '我同意。(wǒ tóng yì) / 我赞成。(wǒ zàn chéng)',
    spanish: 'Estoy de acuerdo con eso. / Apoyo eso.',
    vietnamese: 'Tôi đồng ý vói điều đó. / Tôi tán thành.'
  },
  223: {
    japanese: '手（て）が離（はな）せません。／手（て）一杯（いっぱい）です。',
    chinese: '我忙不過來。(wǒ máng bu guò lái) / 我手头全是事。(wǒ shǒu tóu quán shì shì)',
    spanish: 'Tengo las manos ocupadas. / No doy abasto.',
    vietnamese: 'Tay tôi đang bận. / Tôi bận túi bụi.'
  },
  224: {
    japanese: '軽（かる）い接触（せっしょく）事故（じこ）。／へこんだ程度（ていど）の事故（じこ）。',
    chinese: '小擦挂。(xiǎo cā guà) / 轻微追尾。(qīng wēi zhuī wěi)',
    spanish: 'Un pequeño choque. / Un golpe leve en el coche.',
    vietnamese: 'Va quẹt nhỏ. / Tai nạn xe nhẹ.'
  },
  225: {
    japanese: 'サボっている場合（ばあい）じゃない。／怠（なま）けてなんかいられない。',
    chinese: '我不能偷懒。(wǒ bù néng tōu lǎn) / 我没时间松懈。(wǒ méi shí jiān sōng xiè)',
    spanish: 'No puedo permitirme el lujo de vaguear. / No puedo dormirme en los laureles.',
    vietnamese: 'Tôi không thể lười biếng được. / Không được phép chểnh mảng.'
  },
  226: {
    japanese: '臨機応変（りんきおうへん）にやろう。／流（なが）れに任（まか）せよう。',
    chinese: '见机行事。(jiàn jī xíng shì) / 到时候再说。(dào shí hou zài shuō)',
    spanish: 'Improvisaremos. / Veremos sobre la marcha.',
    vietnamese: 'Tùy cơ ứng biến. / Tới đâu hay tới đó.'
  },
  227: {
    japanese: '自分（じぶん）のこと言（い）ってるんでしょ。／同類（どうるい）だから分（わ）かるんだね。',
    chinese: '彼此彼此。(bǐ cǐ bǐ cǐ) / 你也是一路货色。(nǐ yě shì yí lù huò sè)',
    spanish: 'Mira quién habla. / El burro hablando de orejas.',
    vietnamese: 'Chó chê mèo lắm lông. / Cậu cũng thế còn gì.'
  },
  228: {
    japanese: '口コミ（くちコミ）で。／人（ひと）づてに。',
    chinese: '口口相传。(kǒu kǒu xiāng chuán) / 听别人说的。(tīng bié rén shuō de)',
    spanish: 'De boca en boca. / Por el boca a boca.',
    vietnamese: 'Truyền miệng. / Nghe đồn.'
  },
  229: {
    japanese: '吐（は）き気（け）がする。／気持（きも）ち悪（わる）い。',
    chinese: '我想吐。(wǒ xiǎng tù) / 我有点恶心。(wǒ yǒu diǎn ě xin)',
    spanish: 'Tengo náuseas. / Me siento revuelto.',
    vietnamese: 'Tôi thấy buồn nôn. / Thấy nôn nao trong người.'
  },
  230: {
    japanese: '一息（ひといき）つく。／呼吸（こきゅう）を整（ととの）える。',
    chinese: '喘口气。(chuǎn kǒu qì) / 歇会儿。(xiē huìr)',
    spanish: 'Recuperar el aliento. / Tomar un respiro.',
    vietnamese: 'Lấy lại hơi. / Nghỉ xả hơi một chút.'
  },
  231: {
    japanese: '新（あたら）しい靴（くつ）を履（は）き慣（な）らす。',
    chinese: '磨合新鞋。(mó hé xīn xié) / 穿新鞋适应一下。(chuān xīn xié shì yìng yí xià)',
    spanish: 'Estrenar zapatos. / Domar los zapatos nuevos.',
    vietnamese: 'Đi cho quen giày mới. / Làm mềm giày mới.'
  },
  232: {
    japanese: '気（き）晴（は）らしになる。／忘（わす）れさせてくれる。',
    chinese: '转移注意力。(zhuǎn yí zhù yì lì) / 让你不去想那些事。(ràng nǐ bú qù xiǎng nà xiē shì)',
    spanish: 'Despejar la mente. / Distraerse de las cosas.',
    vietnamese: 'Làm khuây khỏa đầu óc. / Quên đi muộn phiền.'
  },
  233: {
    japanese: '冷（つめ）たくあしらう。／よそよそしくする。',
    chinese: '冷落某人。(lěng luò mǒu rén) / 不理不睬。(bù lǐ bù cǎi)',
    spanish: 'Hacer el vacío. / Ignorar fríamente.',
    vietnamese: 'Tỏ thái độ lạnh nhạt. / Ngó lơ ai đó.'
  },
  234: {
    japanese: '気（き）にしてないよ。／悪（わる）く思（おも）ってないよ。',
    chinese: '我不介意。(wǒ bú jiè yì) / 没放在心上。(méi fàng zài xīn shàng)',
    spanish: 'No me lo tomo a mal. / Sin resentimientos.',
    vietnamese: 'Không để bụng đâu. / Không sao cả.'
  },
  235: {
    japanese: 'もっとよく考（かんが）えればよかった。／考（かんが）えが足（た）りなかった。',
    chinese: '早该想到这一点的。(zǎo gāi xiǎng dào zhè yì diǎn de) / 当初应该深思熟虑。(dāng chū yīng gāi shēn sī shú lǜ)',
    spanish: 'Debería haberlo pensado mejor. / Tendría que haberle dado una pensada.',
    vietnamese: 'Lẽ ra phải suy nghĩ kỹ hơn. / Đáng nhẽ phải tính đến chuyện đó.'
  },
  236: {
    japanese: '詮索（せんさく）したくないけど。／根掘（ねほ）り葉掘（はほ）り聞（き）きたくないけど。',
    chinese: '我不想打探隐私。(wǒ bù xiǎng dǎ tàn yǐn sī) / 我不想多嘴。(wǒ bù xiǎng duō zuǐ)',
    spanish: 'No quiero ser entrometido. / No quiero husmear.',
    vietnamese: 'Tôi không muốn tót mách đâu. / Không muốn soi mói đời tư đâu.'
  },
  237: {
    japanese: '上手（うまい）いこと言って（いって）人（ひと）にやらせる。／トム・ソーヤーのような真似（マネ）をする。',
    chinese: '骗别人帮你干活。(piàn bié rén bāng nǐ gàn huó) / 耍滑头。(shuǎ huá tóu)',
    spanish: 'Engañar a alguien para que haga tu trabajo. / Hacer un Tom Sawyer.',
    vietnamese: 'Dụ người khác làm hộ. / Khôn lỏi kiểu Tom Sawyer.'
  },
  238: {
    japanese: '失（うしな）うものは何（なに）もない。／ダメ元（もと）だ。',
    chinese: '没什么可失去的。(méi shén me kě shī qù de) / 豁出去了。(huō chū qù le)',
    spanish: 'No hay nada que perder. / Nada que perder.',
    vietnamese: 'Có gì để mất đâu. / Chẳng mất mát gì cả.'
  },
  239: {
    japanese: '食（た）べきれないほど取（と）ってしまった。／目（め）が卑（いや）しかったね。',
    chinese: '眼大肚皮小。(yǎn dà dù pí xiǎo) / 贪多嚼不烂。(tān duō jiáo bú làn)',
    spanish: 'Comes con los ojos. / Te serviste más de lo que podías comer.',
    vietnamese: 'No bụng đói con mắt. / Lấy nhiều hơn mức ăn được.'
  },
  240: {
    japanese: '口（くち）ではなんとでも言（い）える。／言（い）うのは簡単（かんたん）だ。',
    chinese: '说起来容易。(shuō qǐ lái róng yì) / 空谈误国。(kōng tán wù guó)',
    spanish: 'Hablar es barato. / Del dicho al hecho hay mucho trecho.',
    vietnamese: 'Nói thì dễ. / Nói mồm ai chẳng nói được.'
  },
  241: {
    japanese: '理想（りそう）的（てき）な条件（じょうけん）が揃（そろ）っている。／完璧（かんぺき）な相手（あいて）だ。',
    chinese: '完美组合。(wán měi zǔ hé) / 各方面都很完美。(gè fāng miàn dōu hěn wán měi)',
    spanish: 'Lo tiene todo. / Es el paquete completo.',
    vietnamese: 'Có đầy đủ mọi thứ. / Hoàn hảo từ A đến Z.'
  },
  242: {
    japanese: '直感（ちょっかん）に従（したが）って。／自分（じぶん）の勘（かん）を信（しん）じて。',
    chinese: '跟着感觉走。(gēn zhe gǎn jué zǒu) / 相信你的直觉。(xiāng xìn nǐ de zhí jué)',
    spanish: 'Hazle caso a tu instinto. / Sigue tu corazonada.',
    vietnamese: 'Nghe theo trực giác đi. / Tin vào linh tính của mình xem.'
  },
  243: {
    japanese: '胸（むね）がドキドキしている。／ときめいている。',
    chinese: '我心跳加速。(wǒ xīn tiào jiā sù) / 小鹿乱撞。(xiǎo lù luàn zhuàng)',
    spanish: 'El corazón me palpita. / Tengo un vuelco en el corazón.',
    vietnamese: 'Tim tôi đang đập thình thịch. / Lòng tôi xao xuyến quá.'
  },
  244: {
    japanese: '気持（きも）ちが冷（さ）める。／感情（かんじょう）が薄（うす）れる。',
    chinese: '感情淡了。(gǎn qíng dàn le) / 感觉没了。(gǎn jué méi le)',
    spanish: 'Los sentimientos se desvanecen. / La chispa se apaga.',
    vietnamese: 'Tình cảm phai nhạt dần. / Hết cảm xúc rồi.'
  },
  245: {
    japanese: '蒸（む）し返（かえ）さないで。／自慢（じまん）しないで（勝（か）ち誇（ほこ）るな）。',
    chinese: '别再提了。(bié zài tí le) / 别显摆了。(bié xiǎn bai le)',
    spanish: 'No me lo restriegues. / Deja de echar sal en la herida.',
    vietnamese: 'Đừng có xát muối vào tim tôi nữa. / Đừng nhắc đi nhắc lại nữa.'
  },
  246: {
    japanese: 'それが証拠（しょうこ）だ。／〜ということだね。',
    chinese: '这说明...(zhè shuō míng...) / 足以此证明...(zú yǐ cǐ zhèng míng...)',
    spanish: 'Eso demuestra que... / Ahí tienes la prueba.',
    vietnamese: 'Điều đó chứng tỏ là... / Thế mới biết là...'
  },
  247: {
    japanese: '精神力（せいしんりょく）で乗（の）り越（こ）える。／気（き）の持（も）ちようだ。',
    chinese: '精神战胜物质。(jīng shén zhàn shèng wù zhì) / 意志力。(yì zhì lì)',
    spanish: 'La mente sobre la materia. / Es cuestión de mentalidad.',
    vietnamese: 'Tư tưởng thông suốt thì việc gì cũng xong. / Quan trọng là ý chí.'
  },
  248: {
    japanese: 'アイデアを出し合（あ）う。／壁（かべ）打（う）ちさせてもらう。',
    chinese: '和你交流一下想法。(hé nǐ jiāo liú yí xià xiǎng fǎ) / 跟你碰碰点子。(gēn nǐ pèng peng diǎn zi)',
    spanish: 'Intercambiar ideas contigo. / Rebotar ideas contigo.',
    vietnamese: 'Trao đổi ý tưởng với bạn. / Cùng nhau thảo luận xem sao.'
  },
  249: {
    japanese: '所属（しょぞく）意識（いしき）。／居場所（いばしょ）がある感（かん）じ。',
    chinese: '归属感。(guī shǔ gǎn) / 认同感。(rèn tóng gǎn)',
    spanish: 'Sentido de pertenencia. / Sentirse parte de algo.',
    vietnamese: 'Cảm giác thuộc về nơi này. / Cảm giác thân thuộc.'
  },
  250: {
    japanese: '自分（じぶん）を甘（あま）やかす。／贅沢（ぜいたく）する。',
    chinese: '犒劳自己。(kào láo zì jǐ) / 宠爱自己。(chǒng ài zì jǐ)',
    spanish: 'Mimarme. / Consentirme.',
    vietnamese: 'Nuông chiều bản thân. / Tự thưởng cho mình.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 201-250 updated with CORRECT translations.');
