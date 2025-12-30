const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/heroy/COL_ENG/sources/opical_ready.json';
const data = require(filePath);

const updates = {
    "How’s it going? (어떻게 지내?)": {
        primary: "How’s it going?",
        meaning: "요즘 어때? 잘 지내? (가벼운 인사)",
        similar: [
            "What's good?",
            "How's life treating you?",
            "What's the word?",
            "How ya been?",
            "What's poppin'?"
        ],
        examples: [
            "A: Yo, long time no see. How's it going?",
            "B: Pretty chill. Just grinding at work. You?",
            "A: Same old, same old. Just trying to survive this heat.",
            "B: Tell me about it. We should grab a drink soon.",
            "A: For sure. Hit me up later.",
            "B: Bet. Catch you later."
        ]
    },
    "I’m down for that. (난 그거 좋아)": {
        primary: "I’m down for that",
        meaning: "나 완전 콜이야. 좋아.",
        similar: [
            "I'm game.",
            "Count me in.",
            "Sounds like a plan.",
            "I'm with it.",
            "Let's do it."
        ],
        examples: [
            "A: Thinking about hitting that new rooftop bar tonight.",
            "B: Oh word? I heard the view is crazy.",
            "A: Yeah, drinks are pricey but the vibe is unmatched.",
            "B: Say less. I'm down for that.",
            "A: Cool, I'll send you the address.",
            "B: Perfect. See you there around 9."
        ]
    },
    "I can’t make it. (난 못 갈 것 같아)": {
        primary: "I can’t make it",
        meaning: "아쉽지만 나 못 가. 일이 생겼어.",
        similar: [
            "I'm gonna have to pass.",
            "Can't do it this time.",
            "Something came up.",
            "I'm tied up.",
            "Not gonna happen today."
        ],
        examples: [
            "A: You still coming to the dinner tonight?",
            "B: Ah man, I can't make it. My boss just dumped a pile of work on me.",
            "A: That sucks. We were all looking forward to seeing you.",
            "B: I know, I specifically cleared my schedule too. Ugh.",
            "A: No worries. Just catch us next time.",
            "B: Definitely. Drink one for me."
        ]
    },
    "I’ll take a rain check. (다음에 할게)": {
        primary: "I’ll take a rain check",
        meaning: "다음에 하자. 이번엔 패스할게.",
        similar: [
            "Maybe next time.",
            "Let's reschedule.",
            "Can we push it back?",
            "Another time?",
            "I gotta bail this time."
        ],
        examples: [
            "A: Hey, wanna grab some tacos after work?",
            "B: I'd love to, but I'm beat. I'll take a rain check.",
            "A: All good. You look exhausted anyway.",
            "B: Yeah, this week has been brutal.",
            "A: Go home and crash. We'll go next week.",
            "B: Thanks for understanding. Next week is on me."
        ]
    },
    "It’s up to you. (네가 결정해)": {
        primary: "It’s up to you",
        meaning: "네 맘대로 해. 네가 골라.",
        similar: [
            "Your call.",
            "Whatever you feel like.",
            "Ball's in your court.",
            "You decide.",
            "I'm easy."
        ],
        examples: [
            "A: Should we get sushi or pizza?",
            "B: Honestly, I'm starving so anything works. It's up to you.",
            "A: Pizza might be faster.",
            "B: Pizza it is then. Where should we order from?",
            "A: Joe's? Or that new spot on 5th?",
            "B: Your call. I trust your taste."
        ]
    },
    "When is boarding? (탑승은 언제 시작하나요?)": {
        primary: "When is boarding?",
        meaning: "탑승 언제 시작해요?",
        similar: [
            "What time do we board?",
            "When do they start letting people on?",
            "Is boarding starting soon?",
            "How long till we board?",
            "What's the boarding time?"
        ],
        examples: [
            "A: Excuse me, when is boarding for flight 202?",
            "B: We should be starting in about 15 minutes.",
            "A: Okay, cool. Just wanted to grab a coffee real quick.",
            "B: You have time, but don't go too far.",
            "A: Got it. Is the gate still B5?",
            "B: Yes, B5. Listen for the announcement."
        ]
    },
    "Is the flight on time? (비행기가 제시간에 출발하나요?)": {
        primary: "Is the flight on time?",
        meaning: "비행기 제시간에 뜨나요? (지연 없나요?)",
        similar: [
            "Any delays?",
            "Are we leaving on schedule?",
            "Is everything running on time?",
            "Are we delayed?",
            "Expected departure time still the same?"
        ],
        examples: [
            "A: Checking the board... Is the flight on time?",
            "B: Looks like it. No red text yet.",
            "A: Thank god. I have a tight connection.",
            "B: You should be fine. The weather looks clear.",
            "A: Fingers crossed. Hate missing connections.",
            "B: Yean, sleeping in the airport is not the vibe."
        ]
    },
    "Can I get a window seat? (창가 자리를 받을 수 있을까요?)": {
        primary: "Can I get a window seat?",
        meaning: "창가 자리로 주실 수 있나요?",
        similar: [
            "Is a window seat available?",
            "Any chance for a window spot?",
            "Could check if there's a window open?",
            "I'd prefer a window if possible.",
            "Put me by the window please."
        ],
        examples: [
            "A: Checking in for JFK. Can I get a window seat?",
            "B: Let me check... Yeah, 14A is open.",
            "A: Perfect. I need to lean against the wall to sleep.",
            "B: I feel that. Aisle seats are too busy.",
            "A: Exactly. Getting bumped by the cart is the worst.",
            "B: Here's your boarding pass. Enjoy the view."
        ]
    },
    "How long is the flight? (비행 시간은 얼마나 걸리나요?)": {
        primary: "How long is the flight?",
        meaning: "비행 시간 얼마나 걸려요?",
        similar: [
            "What's the flight time?",
            "How many hours are we looking at?",
            "Is it a long haul?",
            "Duration of the flight?",
            "How long are we in the air?"
        ],
        examples: [
            "A: How long is the flight to Tokyo?",
            "B: It's a beast. About 14 hours.",
            "A: Oof. Need to download a lot of movies.",
            "B: Seriously. And bring a neck pillow.",
            "A: Way ahead of you. I got the memory foam one.",
            "B: Smart move. 14 hours in economy is no joke."
        ]
    },
    "Where is the nearest restroom? (가장 가까운 화장실은 어디에 있나요?)": {
        primary: "Where is the nearest restroom?",
        meaning: "가장 가까운 화장실 어디에요?",
        similar: [
            "Where's the bathroom?",
            "Closest restroom?",
            "Where can I find the loo?",
            "Is there a washroom nearby?",
            "Where's the men's/ladies' room?"
        ],
        examples: [
            "A: Excuse me, where is the nearest restroom?",
            "B: Just down the hall, to your left.",
            "A: Thanks. Is it past the security checkpoint?",
            "B: Yeah, right after you go through.",
            "A: Great. I've been holding it since the cab ride.",
            "B: Go for it. It's pretty clean too."
        ]
    }
};

let matchCount = 0;

const newData = data.map(item => {
    // Check if this item is one of our targets
    const update = updates[item.primary];
    if (update) {
        matchCount++;
        return {
            ...item,
            primary: update.primary,
            meaning: update.meaning,
            similar: update.similar,
            examples: update.examples
        };
    }
    return item;
});

console.log(`Updated ${matchCount} items.`);
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
