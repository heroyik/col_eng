const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const batch = {
  201: {
    japanese: '対照（たいしょう）的（てき）に。／逆（ぎゃく）に。',
    chinese: '相比之下。(xiāng bǐ zhī xià) / 相反。(xiāng fǎn)',
    spanish: 'Por el contrario. / En contraste.',
    vietnamese: 'Ngược lại với điều đó. / Đối lập hoàn toàn.'
  },
  202: {
    japanese: '逆（ぎゃく）に。／あべこべに。',
    chinese: '反过来。(fǎn guò lái) / 倒。(dào)',
    spanish: 'A la inversa. / Por contra.',
    vietnamese: 'Ngược lại. / Ngược đời là.'
  },
  203: {
    japanese: 'その反面（はんめん）。／一方で（いっぽうで）。',
    chinese: '另一方面。(lìng yì fāng miàn) / 而。(ér)',
    spanish: 'Por otro lado. / Por otra parte.',
    vietnamese: 'Mặt khác. / Ở một khía cạnh khác.'
  },
  204: {
    japanese: 'それどころか。／むしろ。',
    chinese: '相反。(xiāng fǎn) / 反而。(fǎn ér)',
    spanish: 'Al contrario. / De lo contrario.',
    vietnamese: 'Trái lại. / Ngược lại hẳn luôn.'
  },
  205: {
    japanese: '〜とは違っ（ちがっ）て。／似（に）ていない。',
    chinese: '不像。(bú xiàng) / 不同于。(bù tóng yú)',
    spanish: 'A diferencia de. / Al revés que.',
    vietnamese: 'Không giống như. / Khác hẳn với.'
  },
  206: {
    japanese: '〜に反対（はんたい）して。／対立（たいりつ）して。',
    chinese: '反对。(fǎn duì) / 对立。(duì lì)',
    spanish: 'Opuesto a. / En contra de.',
    vietnamese: 'Đối lập với. / Phản đối lại.'
  },
  207: {
    japanese: '〜というよりは。／むしろ。',
    chinese: '与其说。(yǔ qí shuō) / 宁愿。(nìng yuàn)',
    spanish: 'Más que. / Antes que.',
    vietnamese: 'Thay vì là. / Đúng hơn là.'
  },
  208: {
    japanese: '〜の代わりに（かわりに）。／〜ではなく。',
    chinese: '代替。(dài tì) / 而不是。(ér bú shì)',
    spanish: 'En lugar de. / En vez de.',
    vietnamese: 'Thay vì. / Thay cho.'
  },
  209: {
    japanese: 'あるいは。／代案（だいあん）としては。',
    chinese: '或者。(huò zhě) / 另外的选择。(lìng wài de xuǎn zé)',
    spanish: 'Como alternativa. / Alternativamente.',
    vietnamese: 'Hoặc là. / Một lựa chọn khác là.'
  },
  210: {
    japanese: 'さもなければ。／別（べつ）の方法（ほうほう）で。',
    chinese: '否则。(fǒu zé) / 要不然。(yào bù rán)',
    spanish: 'De lo contrario. / Si no.',
    vietnamese: 'Nếu không thì. / Bằng không thì.'
  },
  211: {
    japanese: '〜はさておき。／〜を除（のぞ）いて。',
    chinese: '除此以外。(chú cǐ yǐ wài) / 撇开。(piē kāi)',
    spanish: 'Aparte de. / Dejando a un lado.',
    vietnamese: 'Ngoại trừ cái đó ra. / Ngoài chuyện đó ra.'
  },
  212: {
    japanese: '〜は別（べつ）として。／離（はな）れて。',
    chinese: '撇开不谈。(piē kāi bù tán) / 此外。(cǐ wài)',
    spanish: 'Independientemente de. / Aislado de.',
    vietnamese: 'Tách biệt với. / Ngoài ra.'
  },
  213: {
    japanese: '〜を除（のぞ）いては。／以外（いがい）は。',
    chinese: '除了。(chú le) / 除去。(chú qù)',
    spanish: 'Excepto por. / Salvo.',
    vietnamese: 'Ngoại trừ. / Trừ phi.'
  },
  214: {
    japanese: '〜を超（こ）えて。／〜の先（さき）に。',
    chinese: '超出。(chāo chū) / 越过。(yuè guò)',
    spanish: 'Más allá de. / Por encima de.',
    vietnamese: 'Vượt xa khỏi. / Vượt qua cả.'
  },
  215: {
    japanese: '〜以外（いがい）の。／〜を除（のぞ）く。',
    chinese: '除了...之外。(chú le... zhī wài) / 其它。(qí tā)',
    spanish: 'Aparte de. / Además de.',
    vietnamese: 'Khác với. / Ngoài cái này ra.'
  },
  216: {
    japanese: '〜に加えて（くわえて）。／さらに。',
    chinese: '除此之外。(chú cǐ zhī wài) / 加上。(jiā shàng)',
    spanish: 'Además de. / Adicionalmente a.',
    vietnamese: 'Thêm vào đó. / Cộng thêm việc.'
  },
  217: {
    japanese: '〜と一緒に（いっしょに）。／〜を伴っ（ともなっ）て。',
    chinese: '还有。(hái yǒu) / 伴随着。(bàn suí zhe)',
    spanish: 'Junto con. / A la par que.',
    vietnamese: 'Cùng với. / Đi kèm với.'
  },
  218: {
    japanese: '〜と共に（ともに）。／一緒（いっしょ）に。',
    chinese: '一起。(yì qǐ) / 共同。(gòng tóng)',
    spanish: 'En compañía de. / Junto a.',
    vietnamese: 'Cùng nhau. / Kết hợp với.'
  },
  219: {
    japanese: '〜と相（あい）まって。／〜と結（むす）びついて。',
    chinese: '加上。(jiā shàng) / 配合。(pèi hé)',
    spanish: 'Sumado a. / En combinación con.',
    vietnamese: 'Kết hợp với. / Đi đôi với.'
  },
  220: {
    japanese: '言うまでもなく（いうまでもなく）。／さらには。',
    chinese: '更不用说。(gèng bú yòng shuō) / 何况。(hé kuàng)',
    spanish: 'Por no mencionar. / Ni qué decir tiene.',
    vietnamese: 'Chưa kể đến. / Đừng nói tới chuyện.'
  },
  221: {
    japanese: '〜について言（い）えば。／〜は言うまでもなし（いうまでもなし）。',
    chinese: '且不说。(qiě bù shuō) / 更别提。(gèng bié tí)',
    spanish: 'Por no decir nada de. / Sin hablar de.',
    vietnamese: 'Chẳng cần phải nói đến. / Miễn bàn tới.'
  },
  222: {
    japanese: 'ましてや。／〜どころか。',
    chinese: '更不必说。(gèng bú bì shuō) / 何况。(hé kuàng)',
    spanish: 'Mucho menos. / Y ni hablar de...',
    vietnamese: 'Huống chi là. / Nói gì đến.'
  },
  223: {
    japanese: '同様（どうよう）に。／〜もまた。',
    chinese: '还有。(hái yǒu) / 也。(yě)',
    spanish: 'Así como. / Al igual que.',
    vietnamese: 'Cũng như là. / Cả cái này nữa.'
  },
  224: {
    japanese: 'さらに。／その上（うえ）。',
    chinese: '此外。(cǐ wài) / 进而。(jìn ér)',
    spanish: 'Además. / Es más.',
    vietnamese: 'Hơn nữa. / Thêm vào đó.'
  },
  225: {
    japanese: 'さらに。／また。',
    chinese: '而且。(ér qiě) / 并且。(bìng qiě)',
    spanish: 'Asimismo. / Por otra parte.',
    vietnamese: 'Vả lại. / Lại còn.'
  },
  226: {
    japanese: 'なお。／さらに言（い）えば。',
    chinese: '更有甚者。(gèng yǒu shèn zhě) / 关键是。(guān jiàn shì)',
    spanish: 'Lo que es más. / Y por si fuera poco.',
    vietnamese: 'Và hơn hết là. / Có một điều quan trọng nữa là.'
  },
  227: {
    japanese: 'プラス。／おまけに。',
    chinese: '加上。(jiā shàng) / 还有。(hái yǒu)',
    spanish: 'Además. / Plus.',
    vietnamese: 'Cộng thêm. / Thêm nữa là.'
  },
  228: {
    japanese: 'また。／同様（どうよう）に。',
    chinese: '也。(yě) / 还有。(hái yǒu)',
    spanish: 'También. / Igualmente.',
    vietnamese: 'Cũng. / Lại còn.'
  },
  229: {
    japanese: '同様（どうよう）に。／同（おな）じように。',
    chinese: '同样地。(tóng yàng de) / 照样。(zhào yàng)',
    spanish: 'Del mismo modo. / Igualmente.',
    vietnamese: 'Tương tự như vậy. / Cũng giống thế.'
  },
  230: {
    japanese: '似（に）たように。／同様（どうよう）に。',
    chinese: '类似地。(lèi sì de) / 差不多。(chà bù duō)',
    spanish: 'De forma similar. / Parecidamente.',
    vietnamese: 'Một cách tương tự. / Gần giống như vậy.'
  },
  231: {
    japanese: '同様（どうよう）の理由（りゆう）で。／同（おな）じく。',
    chinese: '出于同样的原因。(chū yú tóng yàng de yuán yīn) / 同样。(tóng yàng)',
    spanish: 'Por la misma regla de tres. / Del mismo modo.',
    vietnamese: 'Cũng vì lẽ đó. / Cùng một logic như vậy.'
  },
  232: {
    japanese: '同じ（おなじ）やり方（かた）で。／同（おな）じように。',
    chinese: '以同样的方式。(yǐ tóng yàng de fāng shì) / 也。(yě)',
    spanish: 'De la misma manera. / Del mismo modo.',
    vietnamese: 'Theo cùng một cách. / Y chang như vậy.'
  },
  233: {
    japanese: '例えば（たとえば）。／例（れい）を挙げ（あげ）れば。',
    chinese: '例如。(lì rú) / 比方说。(bǐ fāng shuō)',
    spanish: 'Por ejemplo. / Pongamos por caso.',
    vietnamese: 'Chẳng hạn như. / Ví dụ như.'
  },
  234: {
    japanese: '例（れい）を挙（あ）げると。／例えば（たとえば）。',
    chinese: '举个例子。(jǔ gè lì zi) / 比如。(bǐ rú)',
    spanish: 'Por ejemplo. / Verbi gratia.',
    vietnamese: 'Ví dụ tiêu biểu là. / Như là.'
  },
  235: {
    japanese: '〜といった。／例えば（たとえば）〜など。',
    chinese: '比如。(bǐ rú) / 诸如。(zhū rú)',
    spanish: 'Tal como. / Como.',
    vietnamese: 'Kiểu như. / Những thứ như.'
  },
  236: {
    japanese: '〜を含（ふく）む。／〜など。',
    chinese: '包括。(bāo kuò) / 包含。(bāo hán)',
    spanish: 'Incluyendo. / Con.',
    vietnamese: 'Bao gồm cả. / Tính luôn cả.'
  },
  237: {
    japanese: 'すなわち。／つまり。',
    chinese: '即。(jí) / 也就是。(yě jiù shì)',
    spanish: 'A saber. / Es decir.',
    vietnamese: 'Đó là. / Cụ thể tên là.'
  },
  238: {
    japanese: '特（とく）に。／とりわけ。',
    chinese: '尤其是。(yóu qí shì) / 特别是。(tè bié shì)',
    spanish: 'En particular. / Particularmente.',
    vietnamese: 'Nói riêng về. / Đặc biệt là.'
  },
  239: {
    japanese: '特（とく）に。／著（いちじる）しく。',
    chinese: '特别是。(tè bié shì) / 格外。(gé wài)',
    spanish: 'Particularmente. / Especialmente.',
    vietnamese: 'Riêng biệt. / Một cách đặc thù.'
  },
  240: {
    japanese: '具体（ぐたい）的（てき）には。／明確（めいかく）に言（い）えば。',
    chinese: '具体地。(jù tǐ de) / 明确地。(míng què de)',
    spanish: 'Específicamente. / Concretamente.',
    vietnamese: 'Một cách cụ thể. / Rõ ràng là.'
  },
  241: {
    japanese: '具体（ぐたい）的（てき）に言（い）うと。／はっきり言（い）えば。',
    chinese: '具体来说。(jù tǐ lái shuō) / 说准了。(shuō zhǔn le)',
    spanish: 'Para ser específicos. / Concretando.',
    vietnamese: 'Để cho rõ ràng thì. / Nói chính xác ra là.'
  },
  242: {
    japanese: '好（こう）例（れい）。／典型（てんけい）的（てき）な例（れい）。',
    chinese: '佐证。(zuǒ zhèng) / 这是一个典型的例子。(zhè shì yí gè diǎn xíng de lì zi)',
    spanish: 'Un claro ejemplo. / El caso es que...',
    vietnamese: 'Một ví dụ điển hình. / Minh chứng thực tế.'
  },
  243: {
    japanese: '例示（れいじ）として。／説明（せつめい）すると。',
    chinese: '作为说明。(zuò wéi shuō míng) / 例证。(lì zhèng)',
    spanish: 'Como ilustración. / A modo de ejemplo.',
    vietnamese: 'Để minh họa cho điều này. / Như một ví dụ.'
  },
  244: {
    japanese: '例えば（たとえば）〜してみて。／一例（いちれい）を挙げ（あげ）る。',
    chinese: '比如。(bǐ rú) / 拿...来说。(ná... lái shuō)',
    spanish: 'Toma, por ejemplo... / Pon por caso...',
    vietnamese: 'Lấy cái này làm ví dụ. / Thử xem ví dụ này.'
  },
  245: {
    japanese: '〜などを含（ふく）むが、これらに限定（げんてい）されない。／幅広（はばひろ）い。',
    chinese: '包括但不限于。(bāo kuò dàn bù xiàn yú) / 还有其他的。(hái yǒu qí tā de)',
    spanish: 'Incluyendo, pero sin limitarse a... / Entre otros.',
    vietnamese: 'Bao gồm nhưng không giới hạn ở. / Kể cả những cái khác.'
  },
  246: {
    japanese: '特（とく）に。／格別（かくべつ）に。',
    chinese: '格外。(gé wài) / 特别。(tè bié)',
    spanish: 'Especialmente. / Sobre todo.',
    vietnamese: 'Đặc biệt là. / Nhất là.'
  },
  247: {
    japanese: '主（おも）に。／とりわけ。',
    chinese: '主要是。(zhǔ yào shì) / 首要。(shǒu yào)',
    spanish: 'Principalmente. / Mayormente.',
    vietnamese: 'Chủ yếu là. / Phần lớn là.'
  },
  248: {
    japanese: '主（おも）に。／大半（たいはん）は。',
    chinese: '大多。(dà duō) / 主要是。(zhǔ yào shì)',
    spanish: 'Principalmente. / Fundamentalmente.',
    vietnamese: 'Cốt yếu là. / Đa phần.'
  },
  249: {
    japanese: '主（おも）に。／第一（だいいち）に。',
    chinese: '首要地。(shǒu yào de) / 主要是。(zhǔ yào shì)',
    spanish: 'Primordialmente. / En primer lugar.',
    vietnamese: 'Trước tiên là. / Căn bản là.'
  },
  250: {
    japanese: 'ほとんど。／大体（だいたい）。',
    chinese: '大多。(dà duō) / 基本上。(jī běn shàng)',
    spanish: 'Mayormente. / Casi todo.',
    vietnamese: 'Hầu hết. / Chủ yếu.'
  }
};

data.forEach(item => {
  if (batch[item.id]) {
    Object.assign(item, batch[item.id]);
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Batch 201-250 updated.');
