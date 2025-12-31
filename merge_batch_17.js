const fs = require('fs');
const path = 'c:/Users/heroy/COL_ENG/sources/뉴욕구어체학습25.02.json';

const mergeEnrichedData = (batchData) => {
  try {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    batchData.forEach(enrichedItem => {
      const index = data.findIndex(item => item.primary === enrichedItem.primary);
      if (index !== -1) {
        data[index] = { ...data[index], ...enrichedItem };
      }
    });
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Success: Merged ${batchData.length} items.`);
  } catch (err) {
    console.error('Error during merge:', err);
    process.exit(1);
  }
};

// Batch 17 data (Items 180-213) - Final set
const batch17 = [
  {
    "primary": "Not a chance.",
    "meaning": "전혀 가망 없어. (어림도 없지)",
    "similar": ["No way.", "Forget it.", "Ain't gonna happen.", "Zero percent.", "Zero chance."],
    "example": "A: You think the Knicks are gonna win the championship this year?\nB: Not a chance, deadass. They're highkey trippin' right now.\nA: No cap? I thought they had a solid squad.\nB: For real, but the competition is way too stiff, no cap.\nA: Facts, maybe next year then.\nB: Word."
  },
  {
    "primary": "It depends.",
    "meaning": "상황에 따라 달라. (그때그때 달라요)",
    "similar": ["Subject to change.", "Not sure yet.", "Varies.", "Case by case.", "Conditional."],
    "example": "A: Are you coming to the party tonight?\nB: It depends, deadass. If I finish this project early, I'm down.\nA: No cap? You've been working on that forever.\nB: For real, it's a whole struggle, deadass.\nA: Facts, hope you make it out.\nB: Word, I'll hit you up."
  },
  {
    "primary": "You never know.",
    "meaning": "사람 일은 모르는 거야. (혹시 모르지)",
    "similar": ["Anything's possible.", "Wait and see.", "Who knows.", "Maybe.", "Unpredictable."],
    "example": "A: I don't think I'll get the job.\nB: You never know, deadass. They might just be taking their time.\nA: No cap? I felt like the interview was lowkey awkward.\nB: For real, sometimes that's just their vibe, deadass.\nA: I guess so. Fingers crossed, no cap.\nB: Word."
  },
  {
    "primary": "I'll let you know.",
    "meaning": "내가 알려줄게. (나중에 말해줄게)",
    "similar": ["I'll update you.", "Hit you back.", "Stay posted.", "Wait for my signal.", "Contacting later."],
    "example": "A: Tryna grab a vertical drink later?\nB: I'll let you know, deadass. I gotta see how my schedule looks.\nA: No cap, don't leave me hanging.\nB: For real, I'll hit you up by 6, deadass.\nA: Say less, I'll be waiting.\nB: Bet."
  },
  {
    "primary": "Hope that helps.",
    "meaning": "도움이 됐으면 좋겠네.",
    "similar": ["Hope it's useful.", "Preciate it.", "Good luck with that.", "Take care.", "Word."],
    "example": "A: Yo, thanks for the directions to the subway.\nB: No worries, hope that helps, deadass. It's a bit of a walk.\nA: No cap, I was straight lost for a minute.\nB: For real, this city is a whole maze, deadass.\nA: Facts, thanks again.\nB: Word, stay safe."
  },
  {
    "primary": "I appreciate it.",
    "meaning": "고마워. (정말 감사해)",
    "similar": ["Thanks a lot.", "Preciate you.", "Much love.", "Thank you.", "Big ups."],
    "example": "A: I brought you some coffee from that fire spot.\nB: Yo, I appreciate it, deadass! I really needed this.\nA: No cap, I know you've been grinding all morning.\nB: For real, you're a real one for that, deadass.\nA: Facts, enjoy your brew.\nB: Word."
  },
  {
    "primary": "That's the plan.",
    "meaning": "그게 내 계획이야.",
    "similar": ["That's the move.", "Goal set.", "Intention.", "Final decision.", "Strategy."],
    "example": "A: So we're meeting at 8 then?\nB: That's the plan, deadass. Don't be late, no cap.\nA: For real, I'm already setting my alarm.\nB: Facts, we gotta catch the happy hour vibes.\nA: Say less, I'm there.\nB: Word."
  },
  {
    "primary": "Time will tell.",
    "meaning": "시간이 지나면 알게 되겠지. (두고 보자고)",
    "similar": ["Wait and see.", "Uncertain.", "Result pending.", "Future knows.", "Check later."],
    "example": "A: You think this relationship will last?\nB: Honestly? Time will tell, deadass. They're still in the honeymoon phase.\nA: No cap? They look so obsessed with each other.\nB: For real, but levels change, no cap.\nA: Facts, we'll see where they are in six months.\nB: Word."
  },
  {
    "primary": "It's worth a try.",
    "meaning": "한번 해볼 만해. (밑져야 본전이지)",
    "similar": ["Give it a shot.", "No harm in trying.", "Test it out.", "Attempt it.", "Worth the gamble."],
    "example": "A: Should I ask for a 20% raise?\nB: Facts, it's worth a try, deadass. The worst they can say is no.\nA: No cap? I'm lowkey nervous about it.\nB: For real, you've been killing it lately. Level up, man.\nA: Word, I'm doing it tomorrow.\nB: Bet."
  },
  {
    "primary": "Let's get started.",
    "meaning": "시작하자! (해치우자구)",
    "similar": ["Begin.", "Kick off.", "Start now.", "Jump in.", "Launch."],
    "example": "A: Is everyone here for the meeting?\nB: Facts, let's get started, deadass. We got a lot to cover.\nA: No cap, I tryna be out of here by 5.\nB: For real, stay focused and we'll crush it.\nA: Say less, let's go.\nB: Bet."
  },
  {
    "primary": "That reminds me...",
    "meaning": "생각난 건데... (갑자기 떠올랐어)",
    "similar": ["On that note...", "Speaking of...", "Oh yeah...", "Actually...", "Lowkey..."],
    "example": "A: I saw a dog wearing a sweater today.\nB: Facts, that reminds me... I gotta buy a coat for my cat, no cap.\nA: Deadass? Your cat wears clothes?\nB: For real, he's highkey a fashion icon, deadass.\nA: That's hilarious, post a pic on IG.\nB: Word, I got you."
  },
  {
    "primary": "I'll get back to you.",
    "meaning": "나중에 다시 연락할게. (답변을 미룰 때)",
    "similar": ["Circle back.", "Reply later.", "Hit you up shortly.", "Hold on.", "Checking facts."],
    "example": "A: Can you come to my BBQ next Saturday?\nB: I'll get back to you, deadass. I gotta check my work schedule.\nA: No cap? Don't leave me hanging, for real.\nB: For real, I'll let you know by tomorrow night, no cap.\nA: Say less, hope you can make it.\nB: Bet."
  },
  {
    "primary": "It's out of my hands.",
    "meaning": "내가 어떻게 할 수 있는 일이 아냐. (내 권한 밖이야)",
    "similar": ["Beyond my control.", "Not my decision.", "Unable to help.", "Closed choice.", "Out of reach."],
    "example": "A: Can you give me a discount on these shoes?\nB: Honestly? It's out of my hands, deadass. The manager sets the price.\nA: No cap? You usually hook me up.\nB: For real, they're being real strict lately, no cap.\nA: Facts, I'll just pay the full price then.\nB: Preciate the understanding, man."
  },
  {
    "primary": "Speak of the devil.",
    "meaning": "호랑이도 제 말 하면 온다더니. (말하는 중에 나타남)",
    "similar": ["Look who's here.", "Perfect timing.", "Talk of the town.", "Arrived just now.", "Right on cue."],
    "example": "A: I was just saying how much I missed Mark.\nB: Yo, speak of the devil! He's walking in right now, deadass.\nA: No way! What's up, man?\nB: For real, we were just vibing about you, no cap.\nA: Facts, great to see you.\nB: Word."
  },
  {
    "primary": "Keep me posted.",
    "meaning": "계속 상황을 알려줘. (어떻게 되는지 말해줘)",
    "similar": ["Stay updated.", "Notify me.", "Hit me up with news.", "Keep in touch.", "Word."],
    "example": "A: I'm heading to the interview now.\nB: Word, keep me posted, deadass! I hope you crush it.\nA: Preciate the love, I'll hit you up after, no cap.\nB: For real, fingers crossed for you, man.\nA: Facts, let's get it.\nB: Bet."
  },
  {
    "primary": "Let me know.",
    "meaning": "알려줘. (연락해)",
    "similar": ["Tell me.", "Contact me.", "Update me.", "Hit me up.", "Word."],
    "example": "A: I'm not sure if I'm coming yet.\nB: All good, just let me know, deadass. I gotta order the food.\nA: No cap, I'll tell you by EOD for sure.\nB: For real, don't leave me hanging, deadass.\nA: Facts, catch you later.\nB: Word."
  },
  {
    "primary": "No doubt about it.",
    "meaning": "의심의 여지가 없지. (당연하지)",
    "similar": ["For sure.", "Definitely.", "Facts.", "No question.", "Guaranteed."],
    "example": "A: You think that new pizza spot is the best in NYC?\nB: No doubt about it, deadass. Their crust is fire, no cap.\nA: Facts, I've heard everyone raving about it.\nB: For real, you gotta try the spicy honey one, deadass.\nA: Say less, let's go today.\nB: Bet."
  },
  {
    "primary": "Long story short, ...",
    "meaning": "긴 말 할 것 없이, (간단히 말해서)",
    "similar": ["Basically...", "In short...", "To summarize...", "Main point is...", "Word..."],
    "example": "A: So what happened with the landlord?\nB: Long story short, deadass, he's finally fixing the roof next week.\nA: No cap? It about time, for real.\nB: For real, I had to threaten to move out, deadass.\nA: Facts, that always works with these guys.\nB: Word."
  },
  {
    "primary": "LOL",
    "meaning": "ㅋㅋㅋ (크게 웃음)",
    "similar": ["LMAO.", "Rolling.", "Ded.", "Hilarious.", "Funny AF."],
    "example": "A: I just tripped over my own feet in front of my crush.\nB: LOL! Deadass? That's straight comedy, no cap.\nA: For real, I just wanted the ground to swallow me up, deadass.\nB: Facts, hope you recovered well though.\nA: I just laughed it off, no cap.\nB: Word."
  },
  {
    "primary": "OMG",
    "meaning": "세상에! (놀람)",
    "similar": ["Word?!", "No way!", "Insane.", "Crazy vibes.", "Wow."],
    "example": "A: Guess who I just saw at the deli? Beyoncé!\nB: OMG! Deadass? You're trippin', no cap.\nA: For real, she was just buying a bottle of water, deadass.\nB: No way, I would've fainted on the spot, for real.\nA: Facts, I was lowkey shaking.\nB: Word."
  },
  {
    "primary": "BRB",
    "meaning": "금방 올게.",
    "similar": ["Coming back.", "AFK.", "Quick break.", "Be right there.", "Stay put."],
    "example": "A: Yo, you still there?\nB: BRB, deadass. Just grabbing a snack from the kitchen.\nA: Word, don't take forever, no cap.\nB: For real, I'm already on my way back, deadass.\nA: Say less, I'm waiting.\nB: Bet."
  },
  {
    "primary": "TTYL",
    "meaning": "나중에 얘기해.",
    "similar": ["Catch you later.", "Talk later.", "Peace.", "Bailing.", "Hit you back."],
    "example": "A: I gotta jump on a work call right now.\nB: Word, TTYL, deadass. Stay safe out there.\nA: Preciate it, no cap. Catch you tonight.\nB: For real, peace.\nB: Peace."
  },
  {
    "primary": "IDK",
    "meaning": "몰라.",
    "similar": ["I don't know.", "No clue.", "Trippin'.", "Beyond me.", "Not sure."],
    "example": "A: What time is the concert starting?\nB: IDK, deadass. Let me check the ticket real quick.\nA: No cap, I thought you already knew.\nB: For real, everything is blending together today, deadass.\nA: Facts, take your time.\nB: Word."
  },
  {
    "primary": "FYI",
    "meaning": "참고로 말하자면.",
    "similar": ["Just so you know.", "For your info.", "Heads up.", "By the way.", "Word."],
    "example": "A: I'm heading to the store, you need anything?\nB: FYI, deadass, they're closed for renovations today.\nA: No way! Preciate the heads up, no cap.\nB: For real, I almost made the same mistake, deadass.\nA: Facts, saved me a trip.\nB: Word."
  },
  {
    "primary": "My bad.",
    "meaning": "내 실수야. (미안해)",
    "similar": ["Sorry.", "Apologies.", "My mistake.", "I'm trippin'.", "Oops."],
    "example": "A: Yo, you forgot to lock the door again.\nB: My bad, deadass. I was in a rush this morning.\nA: No cap, we can't have random people walking in.\nB: For real, I'll be more careful next time, deadass.\nA: Preciate the accountability, man.\nB: Word."
  },
  {
    "primary": "That sucks.",
    "meaning": "안됐네. (진짜 별로다)",
    "similar": ["Bummer.", "That's terrible.", "Straight garbage.", "Tough luck.", "Sorry to hear."],
    "example": "A: I just found out my vacation got canceled.\nB: Man, that sucks, deadass. You were so hyped for it.\nA: No cap, I already bought all my beach gear.\nB: For real, that's straight garbage, deadass.\nA: Facts, hope they refund my money at least.\nB: Word."
  },
  {
    "primary": "Cont",
    "meaning": "계속해서. (이어짐)",
    "similar": ["Continued.", "Next part.", "Follow-up.", "Moving on.", "To be continued."],
    "example": "A: What happened next in the story?\nB: Cont, deadass... so then she realized she had the wrong keys.\nA: No way! That's straight comedy, no cap.\nB: For real, she was standing there for like 10 minutes, deadass.\nA: Facts, I would've been so annoyed.\nB: Word."
  },
  {
    "primary": "Hands down",
    "meaning": "단언컨대. (확실히)",
    "similar": ["Without a doubt.", "Easily.", "By far.", "Facts.", "Guaranteed."],
    "example": "A: You think Jordan is the GOAT?\nB: Hands down, deadass. No cap, his stats speak for themselves.\nA: Facts, nobody else even comes close, for real.\nB: For real, he's a whole legend, deadass.\nA: No cap, absolute dominance.\nB: Word."
  },
  {
    "primary": "Walk in the park",
    "meaning": "식은 죽 먹기지. (아주 쉬워)",
    "similar": ["Easy peasy.", "Piece of cake.", "No sweat.", "Breeze.", "Snap."],
    "example": "A: You think you can finish that coding challenge in an hour?\nB: Facts, it's a walk in the park, deadass. I've done it a hundred times.\nA: No cap? Show off then, man.\nB: For real, just watch how fast I crush this, deadass.\nA: Say less, I'm recording.\nB: Word."
  },
  {
    "primary": "What are the odds?",
    "meaning": "이럴 확률이 얼마나 되겠어? (정말 신기하네)",
    "similar": ["Unbelievable.", "Crazy coincidence.", "Insane.", "Small world vibes.", "Luck of the draw."],
    "example": "A: I just ran into my high school teacher in the middle of Times Square.\nB: What are the odds? Deadass? That's a whole crazy story, no cap.\nA: For real, I haven't seen her in like 10 years, deadass.\nB: For real, NYC is literally a whole village sometimes, no cap.\nA: Facts, I'm still shook.\nB: Word."
  },
  {
    "primary": "Show up, turn up",
    "meaning": "나타나다, 흥겹게 놀다. (파티 등에 가다)",
    "similar": ["Arrive.", "Get lit.", "Match the vibe.", "Pull up.", "Join the fun."],
    "example": "A: You coming to the party tonight?\nB: Facts, I'm tryna show up and turn up, deadass.\nA: No cap? It's gonna be fire, for real.\nB: For real, I already got the speaker and the vibes ready, deadass.\nA: Say less, I'll see you there around 10.\nB: Bet."
  },
  {
    "primary": "Odds and ends",
    "meaning": "잡동사니들. (자잘한 것들)",
    "similar": ["Random stuff.", "Miscellanea.", "Small bits.", "Bits and pieces.", "Leftovers."],
    "example": "A: What's in this drawer?\nB: Just some odds and ends, deadass. Old chargers and stuff, no cap.\nA: For real? I was looking for my USB drive.\nB: Facts, it might be in there somewhere, deadass.\nA: I'll check later, it's a whole mess in there.\nB: Word."
  },
  {
    "primary": "I'm losing it",
    "meaning": "(미칠 지경이야) 정신줄 놓겠어.",
    "similar": ["Going crazy.", "Stressed AF.", "Trippin' hard.", "Losing my mind.", "Mental breakdown vibes."],
    "example": "A: Yo, why are you screaming at your laptop?\nB: Honestly? I'm losing it, deadass! This code keeps crashing for no reason.\nA: No cap? Take a breath, man, for real.\nB: For real, I've been at this for six hours, deadass.\nA: Facts, let's go grab a coffee and chill.\nB: Word, I need to decompress."
  },
  {
    "primary": "Same here.",
    "meaning": "나도 그래. (동감이야)",
    "similar": ["I second that.", "Ditto.", "Me too.", "Likewise.", "Matched vibes."],
    "example": "A: I'm highkey ready for the weekend.\nB: Same here, deadass! This work week was straight garbage, no cap.\nA: For real, I'm just tryna sleep for 12 hours straight, deadass.\nB: Facts, I might join you on that vibe, no cap.\nA: Word, stay safe till then.\nB: Peace."
  }
];

mergeEnrichedData(batch17);
