/* Story Cards: grammar lessons.
   Each lesson: the rule (clear, book-style) + real talk (how people actually say it) + lines from the stories
   (*stars* mark the grammar point) + a common trap + practice.
   A lesson unlocks when you find an ending in one of its "unlock" stories. */

const GRAMMAR = [
  {id:"g_now", title:"Right now vs. usually", sub:"I'm watching / I watch",
   unlock:["livingroom","kitchen","home"],
   rule:[
     ["Right now, around now", "am / is / are + verb-ing", "I'm watching a movie. · She's working today."],
     ["Usually, always, facts", "verb (+ s with he / she / it)", "I watch movies every Friday. · He works in a bank."]
   ],
   talk:["Always contract: I'm, you're, he's, she's, we're, they're.",
         "“What are you up to?” → “Not much, just chilling.”",
         "Telling a story? People often use the present: “So I walk in, and the waiter says…”"],
   ex:[["livingroom","You're *chilling* in the living room with your friend."],["kitchen","He's *staring* at the cake…"],["breakroom","Your boss *walks* in."]],
   trap:["I am agree. ✗ → I agree. ✓ (agree is a verb)","I'm knowing the answer. ✗ → I know the answer. ✓ (know, like, want: usually no -ing)"],
   practice:[
     ["Shh! I ___ a movie.",["'m watching","watch","watches"]],
     ["She ___ coffee every morning.",["drinks","is drinking","drink"]],
     ["What ___ up to?",["are you","do you","you are"]],
     ["I ___ what you mean.",["know","'m knowing","knowing"]]
   ]},

  {id:"g_gonna", title:"Gonna: plans & predictions", sub:"be going to + verb",
   unlock:["hotel","party","bar"],
   rule:[
     ["A plan you already decided", "am / is / are + going to + verb", "I'm going to call her tonight."],
     ["You can see it coming", "am / is / are + going to + verb", "Look at those clouds. It's going to rain."]
   ],
   talk:["In speech, “going to” + verb becomes “gonna”: “I'm gonna grab a coffee.” “It's gonna be fine.”",
         "Only before a verb! “I'm going to Paris” stays “going to” (Paris isn't a verb).",
         "Write the full form in emails; say “gonna” with friends."],
   ex:[["hotel","It's *gonna* be a long night."],["party","Your friend *is throwing* a party. (planned → present continuous works too)"]],
   trap:["Tomorrow I go see him. ✗ → Tomorrow I'm gonna see him. ✓"],
   practice:[
     ["Look at the sky. It ___ rain.",["'s gonna","will to","rains"]],
     ["I'm ___ the station.",["going to","gonna","go to"]],
     ["Tomorrow I ___ my mom.",["'m gonna call","call","calling"]],
     ["What ___ do tonight?",["are you gonna","you gonna are","do you going"]]
   ]},

  {id:"g_will", title:"I'll…: decide right now", sub:"will / won't",
   unlock:["restaurant","beach","apartment","home"],
   rule:[
     ["You decide at this moment", "will + verb", "I'll have the burger."],
     ["Offers & promises", "will + verb · will not = won't", "I'll help you. · I won't tell anyone."]
   ],
   talk:["Always contracted: I'll, you'll, it'll, we'll.",
         "“The phone's ringing!” → “I'll get it!”",
         "“Don't worry, it'll be fine.” · “I'll make it up to you.”"],
   ex:[["restaurant","*I'll have* the burger."],["beach","Whatever. *I'll build* a new one!"],["home","*I'll make* it up to you."]],
   trap:["I will to go. ✗ → I'll go. ✓","Already planned? Use gonna: “I'm gonna see a movie tonight” (bought tickets)."],
   practice:[
     ["“The doorbell!” “___ get it!”",["I'll","I'm going to","I get"]],
     ["I ___ have the pasta, please.",["'ll","am","will to"]],
     ["Don't worry, it ___ be fine.",["'ll","does","is"]],
     ["I promise I ___ tell anyone.",["won't","don't will","willn't"]]
   ]},

  {id:"g_past", title:"Past simple: what happened", sub:"I forgot · Did you…? · I didn't…",
   unlock:["cafe","bedroom","party","clinic","home"],
   rule:[
     ["Finished action in the past", "regular verb + ed", "I walked home. · We played soccer."],
     ["Irregular verbs: learn them", "go→went · eat→ate · forget→forgot · fall→fell · buy→bought", "I forgot my wallet."],
     ["Questions & negatives", "did / didn't + base verb", "Did you eat my sandwich? · I didn't see it."]
   ],
   talk:["Short answers: “Yeah, I did.” / “Nope, I didn't.”",
         "Stress with did: “I DID tell you!” = I really told you.",
         "Angry question without did: “You ate my sandwich?!”"],
   ex:[["cafe","Oh no, my bad! I *forgot* my wallet."],["bedroom","Her book *fell* on the floor."],["party","We *went* to school together."],["home","*Did* you *eat* my sandwich?"]],
   trap:["Did you ate? ✗ → Did you eat? ✓","Yesterday I have seen him. ✗ → Yesterday I saw him. ✓"],
   practice:[
     ["I ___ my wallet at home.",["forgot","forget","have forgot"]],
     ["___ you see that?",["Did","Do","Have"]],
     ["We ___ to school together.",["went","goed","go"]],
     ["She didn't ___ the email.",["send","sent","sends"]]
   ]},

  {id:"g_got", title:"Have got · Got it", sub:"I've got a sore throat",
   unlock:["clinic","party","supermarket","park"],
   rule:[
     ["Have / possess (things, illness, family)", "have got · has got", "I've got a sore throat. · She's got two kids."],
     ["Questions", "Have you got…? (US: Do you have…?)", "Have you got a pen? · Do you have a pen?"]
   ],
   talk:["Very casual US: “I got a question.” (have disappears)",
         "“Got it.” = I understand / I have it. “You got this!” = you can do it!",
         "“Got a sec?” = Do you have a moment?"],
   ex:[["clinic","*I've got* a sore throat."],["party","*I've got* time."],["park","*Got it!*"]],
   trap:["I have got 25 years. ✗ → I'm 25. ✓ (age uses be)"],
   practice:[
     ["I ___ a headache.",["'ve got","got have","have get"]],
     ["___ you got a minute?",["Have","Do","Are"]],
     ["I ___ 30 years old.",["'m","have","'ve got"]],
     ["“Call me later, okay?” “___”",["Got it.","Got me.","It got."]]
   ]},

  {id:"g_can", title:"Can I get…? Asking nicely", sub:"can · could · mind if",
   unlock:["cafe","restaurant","supermarket","hotel","hallway"],
   rule:[
     ["Asking for something", "Can I / Could I + verb", "Can I get a coffee? · Could I have the check?"],
     ["Asking someone to do something", "Can you / Could you + verb", "Could you pass the salt?"],
     ["Could = a little softer", "", "Could you help me for a sec?"]
   ],
   talk:["To order in the US, people say “Can I get…?”, not “I want…”.",
         "“Mind if I sit here?” = Is it okay if I sit here?",
         "“Can I use your phone?” · “Can we push it to tomorrow?”"],
   ex:[["cafe","*Can I get* a coffee?"],["hallway","*Can I use* your phone?"],["supermarket","*Can I pay* by card?"]],
   trap:["I want a coffee. (sounds rude) → Can I get a coffee? ✓","Can you to help me? ✗ → Can you help me? ✓"],
   practice:[
     ["___ get a latte, please?",["Can I","I can","Do I"]],
     ["Could you ___ me the menu?",["pass","to pass","passing"]],
     ["The nicest way to order:",["Can I get the soup?","I want the soup.","Give me soup."]],
     ["___ if I sit here?",["Mind","Do mind","Care"]]
   ]},

  {id:"g_wanna", title:"Wanna, gonna, gotta, kinda", sub:"How words melt in real speech",
   unlock:["livingroom","restaurant","clinic","theater"],
   rule:[
     ["want to → wanna", "", "Wanna watch a movie?"],
     ["going to → gonna · got to → gotta", "", "I'm gonna be late. · I gotta go."],
     ["kind of → kinda · don't know → dunno · let me → lemme · give me → gimme", "", "I'm kinda nervous. · Lemme check."]
   ],
   talk:["You hear these in every movie and every song.",
         "Say them with friends; write the full form in emails and at work.",
         "“Wanna grab a bite?” = Do you want to get something to eat?"],
   ex:[["livingroom","*Wanna* watch a movie?"],["restaurant","*Wanna* split it?"],["clinic","I just feel *kinda* off."],["theater","*Wanna* get out of here?"]],
   trap:["He wanna go. ✗ → He wants to go. ✓ (wanna doesn't change with he / she)"],
   practice:[
     ["My bus is here, I ___ go!",["gotta","gonna to","gots"]],
     ["Casual for “Do you want to come?”",["Wanna come?","Gonna come?","Gotta come?"]],
     ["I'm ___ be late.",["gonna","wanna","gotta"]],
     ["How should I know? I ___.",["dunno","gonna","lemme"]]
   ]},

  {id:"g_short", title:"Short questions: You coming?", sub:"Dropping the start of a question",
   unlock:["hotel","bar","party","livingroom"],
   rule:[
     ["Full question", "auxiliary + subject + verb", "Are you coming? · Do you want some?"],
     ["Casual question", "drop the start, keep the meaning", "You coming? · Want some? · Checking in?"]
   ],
   talk:["Your voice goes up at the end: that's what makes it a question.",
         "“Coffee?” “More?” “Ready?” One word can be a whole question.",
         "“Got a sec?” “Sound good?” “You okay?”"],
   ex:[["hotel","Hi there! *Checking in?*"],["breakroom","*Got a sec?*"],["cafe","*Anything else?*"]],
   trap:["In writing, keep the full form.","Where you live? ✗ → Where do you live? ✓ (wh-questions keep do)"],
   practice:[
     ["“You coming?” in full:",["Are you coming?","Do you coming?","You are coming?"]],
     ["“Want some?” means:",["Do you want some?","I want some.","You want me?"]],
     ["Where ___ live?",["do you","you","are you"]],
     ["“Ready?” in full:",["Are you ready?","Do you ready?","You ready are?"]]
   ]},

  {id:"g_lets", title:"Let's… · Don't… (instructions)", sub:"Imperatives & suggestions",
   unlock:["livingroom","park","office","diningroom"],
   rule:[
     ["Tell someone to do it", "base verb", "Have a seat. · Take your time."],
     ["Tell someone not to do it", "Don't + base verb", "Don't worry about it."],
     ["Suggest doing it together", "Let's + verb · Let's not + verb", "Let's order pizza! · Let's not go."]
   ],
   talk:["Soften it: “Just pick something!” · “Go ahead!” · “Help yourself!”",
         "Short ones you hear all the time: “Come on!” “Hang on.” “Hold on!” “Watch out!”",
         "“Let me…” = I'll do it: “Let me help!” (casual: “Lemme help!”)"],
   ex:[["livingroom","*Let's order* pizza!"],["office","*Have* a seat."],["diningroom","*Help* yourself! · *Don't worry* about it."]],
   trap:["Let's to go. ✗ → Let's go. ✓","Don't to worry. ✗ → Don't worry. ✓"],
   practice:[
     ["___ order pizza!",["Let's","Let","Let us to"]],
     ["Don't ___ about it.",["worry","to worry","worrying"]],
     ["___ a seat.",["Have","Having","To have"]],
     ["Let's ___ take the bus.",["not","don't","no"]]
   ]},

  {id:"g_some", title:"Some, any, a / an", sub:"Do you have any rooms?",
   unlock:["hotel","clinic","supermarket","cafe"],
   rule:[
     ["Positive sentences", "some", "I need some milk."],
     ["Questions & negatives", "any", "Do you have any rooms? · We don't have any milk."],
     ["Offers", "some", "Want some coffee?"],
     ["One countable thing", "a + consonant sound · an + vowel sound", "a coffee · an apple · an hour"]
   ],
   talk:["“Anything else?” “Nah, I'm good.”",
         "“Any chance of an upgrade?” = Is it possible?",
         "“Got any…?” = Do you have any…?"],
   ex:[["hotel","Do you have *any* rooms available?"],["clinic","Get *some* rest."],["bar","*Another round?*"]],
   trap:["an advice ✗ → some advice ✓ (advice, information, furniture, bread: no a / an, no -s)"],
   practice:[
     ["Do you have ___ rooms?",["any","some","a"]],
     ["Can I give you ___ advice?",["some","an","a"]],
     ["We don't have ___ milk.",["any","some","a"]],
     ["I'd like ___ apple.",["an","a","some"]]
   ]},

  {id:"g_should", title:"Should, have to, gotta", sub:"Advice & obligation",
   unlock:["bar","clinic","apartment","breakroom"],
   rule:[
     ["Good idea / advice", "should + verb", "You should see a doctor."],
     ["Necessary (rules, obligations)", "have to + verb", "I have to work tomorrow."],
     ["Not necessary", "don't have to + verb", "You don't have to pay, it's free."]
   ],
   talk:["“have got to” → “gotta”: “I gotta go!”",
         "“I should get going.” = the polite way to leave.",
         "“You should totally come!” (totally = really)"],
   ex:[["bar","I *should* get going."]],
   trap:["I must to go. ✗ → I must go. / I have to go. ✓","don't have to (not needed) ≠ mustn't (forbidden)"],
   practice:[
     ["You look sick. You ___ see a doctor.",["should","have","gotta to"]],
     ["It's late, I ___ go!",["gotta","should to","must to"]],
     ["It's free, you ___ pay.",["don't have to","mustn't to","shouldn't to"]],
     ["I ___ get going.",["should","should to","gotta to"]]
   ]},

  {id:"g_phrasal", title:"Phrasal verbs for every day", sub:"show up · check out · cheer up",
   unlock:["kitchen","restaurant","apartment","hallway"],
   rule:[
     ["Verb + small word = new meaning", "up · out · in · on · off", "show up (arrive) · check out (look at) · cheer up (make happy)"],
     ["More you'll hear", "", "go off (alarm rings) · hang out (spend time) · head out (leave) · pick up (answer the phone) · turn on / off"],
     ["With it / them", "verb + it + small word", "Turn it on. ✓ (not “Turn on it”)"]
   ],
   talk:["Natives use these more than formal words: arrive → show up, leave → head out, relax → chill (out).",
         "Learn them as one block, like one word."],
   ex:[["kitchen","Who *shows up* next? · How can we *cheer* her *up*?"],["restaurant","You *check out* the menu."],["apartment","Your alarm *goes off*…"]],
   trap:["Turn on it. ✗ → Turn it on. ✓"],
   practice:[
     ["Your alarm ___ at 7.",["goes off","goes out","turns up"]],
     ["The light? ___",["Turn it on.","Turn on it.","Turn it in."]],
     ["He didn't ___ to the party.",["show up","show on","cheer up"]],
     ["Wanna ___ this weekend?",["hang out","hang on","check out"]]
   ]},

  {id:"g_tags", title:"…right? …huh? Me too / Me neither", sub:"Tags & quick reactions",
   unlock:["beach","supermarket","theater","party"],
   rule:[
     ["Positive sentence → negative tag", "…, isn't it? / …, don't you?", "It's cold, isn't it?"],
     ["Negative sentence → positive tag", "…, is it? / …, do you?", "You're not tired, are you?"],
     ["Agreeing", "Me too (+) · Me neither (−)", "“I love it.” “Me too!” · “I don't like it.” “Me neither.”"]
   ],
   talk:["In speech, people mostly just add “right?” or “huh?”: “Pretty cool, huh?” “This is terrible, right?”",
         "“Same here.” = me too. “Same.” works too."],
   ex:[["beach","Pretty cool, *huh*?"],["theater","This is terrible, *right*?"],["supermarket","*Same here.*"]],
   trap:["“I don't drink.” “Me too.” ✗ → “Me neither.” ✓"],
   practice:[
     ["It's cold, ___?",["isn't it","is it","doesn't it"]],
     ["“I don't drink coffee.” “___”",["Me neither.","Me too.","So do I."]],
     ["“I love pizza.” “___”",["Same here!","Me neither.","Neither do I."]],
     ["Pretty cool, ___?",["huh","what","yes"]]
   ]},

  {id:"g_perfect", title:"Have you ever…? I've just…", sub:"Present perfect",
   unlock:["diningroom","home","office"],
   rule:[
     ["Experience (any time until now)", "have / has + past participle", "Have you ever been to London?"],
     ["Something that matters now", "have / has + past participle", "Have you seen my phone? · I've lost my keys."],
     ["just · yet · already", "", "I've just finished. · I haven't eaten yet."]
   ],
   talk:["“We've heard so much about you!” = the classic line when you meet someone's family.",
         "American speech often uses past simple: “Did you eat yet?”",
         "Contract: I've, you've, she's (= she has), we've."],
   ex:[["diningroom","We*'ve heard* so much about you!"],["home","*Have* you *seen* my sandwich?"]],
   trap:["I have seen him yesterday. ✗ → I saw him yesterday. ✓ (finished time = past simple)"],
   practice:[
     ["___ you ever been to London?",["Have","Did","Are"]],
     ["I ___ him yesterday.",["saw","have seen","seen"]],
     ["She's ___ finished, you just missed her.",["just","yet","ever"]],
     ["I haven't eaten ___.",["yet","just","already"]]
   ]},

  {id:"g_best", title:"Better, best, best … ever", sub:"Comparing things",
   unlock:["kitchen","restaurant","theater","beach"],
   rule:[
     ["Short adjectives", "+ er · the + est", "cheap → cheaper → the cheapest"],
     ["Long adjectives", "more · the most", "expensive → more expensive → the most expensive"],
     ["Irregular", "good → better → best · bad → worse → worst", "This is way better."]
   ],
   talk:["“Best party ever!” “Best dinner ever!” (the + best + noun + ever)",
         "Make it stronger: “way better”, “so much better”, “a lot cheaper”.",
         "“Could be worse.” = it's not that bad."],
   ex:[["kitchen","*Best* party *ever*!"],["restaurant","Honestly? *Best* dinner *ever*."],["theater","*Best bad movie ever*"]],
   trap:["more better ✗ → better ✓","the most good ✗ → the best ✓"],
   practice:[
     ["This pizza is ___ than yesterday's.",["better","more good","gooder"]],
     ["Best party ___!",["ever","never","always"]],
     ["It's ___ expensive hotel in town.",["the most","the more","most"]],
     ["Today is ___ than yesterday.",["worse","badder","more bad"]]
   ]}
];

if (typeof module !== "undefined") module.exports = { GRAMMAR };
