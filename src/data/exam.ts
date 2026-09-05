/**
 * Offline question bank for the Exam Prep Engine.
 * Format mirrors EPS-TOPIK II: Korean prompt, four options, answer key and a
 * short rationale. Burmese glosses help first-generation test takers.
 */
export interface Q {
  id: string;
  deck: string;
  prompt: string; // English gloss of what is being asked
  my: string; // Burmese gloss
  ko: string; // Korean stimulus sentence
  options: string[];
  answer: number;
  why: string;
}

export interface Deck {
  id: string;
  titleEn: string;
  titleMy: string;
  titleKo: string;
  color: string;
  icon: string;
  descEn: string;
  descMy: string;
}

export const DECKS: Deck[] = [
  {
    id: 'eps_vocab',
    titleEn: 'EPS-TOPIK Vocabulary',
    titleMy: 'EPS-TOPIK ဝေါဟာရ',
    titleKo: 'EPS-TOPIK 어휘',
    color: '#3B7DFF',
    icon: 'book',
    descEn: 'Workplace nouns and verbs that appear on every EPS paper.',
    descMy: 'EPS စာမေးပွဲတွင် အမြဲတွေ့ရသော အလုပ်ခုံး ဝေါဟာရများ။',
  },
  {
    id: 'daily_life',
    titleEn: 'Daily life expressions',
    titleMy: 'နေ့စဉ်ဘဝ စကားပြော',
    titleKo: '일상생활 표현',
    color: '#2FD08A',
    icon: 'chatbubbles',
    descEn: 'Bank, hospital, housing and transport phrases for your first month.',
    descMy: 'ပထမတစ်လအတွက် ဘဏ်၊ ဆေးရုံ၊ အိမ်ငှားနှင့် သယ်ယူပို့ဆောင်ရေး စကားများ။',
  },
  {
    id: 'safety_work',
    titleEn: 'Workplace safety',
    titleMy: 'အလုပ်ခုံး ဘေးကင်းရေး',
    titleKo: '산업안전',
    color: '#F2536B',
    icon: 'warning',
    descEn: 'Emergency numbers, protective gear and accident vocabulary.',
    descMy: 'အရေးပေါ်ဖုန်းနံပါတ်များ၊ ကာကွယ်ရေးပစ္စည်းများနှင့် မတော်တဆမှု ဝေါဟာရများ။',
  },
  {
    id: 'kiip_life',
    titleEn: 'KIIP society & rights',
    titleMy: 'KIIP လူမှုဘဝနှင့်အခွင့်အရေး',
    titleKo: 'KIIP 사회 이해',
    color: '#B07CFF',
    icon: 'library',
    descEn: 'Immigration rules, worker rights and multicultural society basics.',
    descMy: 'နေထိုင်ခွင့်စည်းမျဉ်း၊ အလုပ်သမားအခွင့်အရေးနှင့် လူမှုဘုံသဘော။',
  },
];

export const QUESTIONS: Q[] = [
  // ---------- eps_vocab ----------
  {
    id: 'q1', deck: 'eps_vocab',
    prompt: 'Choose the word for “factory”.',
    my: '“မီးရုံး/စက်ရုံ” ဟူသော ဝေါဟာရကို ရွေးပါ။',
    ko: '회사 ___ 에서 일합니다.',
    options: ['공장', '농장', '시장', '학교'], answer: 0,
    why: '공장(gongjang) = factory. 농장 = farm, 시장 = market, 학교 = school.',
  },
  {
    id: 'q2', deck: 'eps_vocab',
    prompt: 'You arrive at 8 a.m. Which greeting fits a supervisor?',
    my: 'နံနက် ၈ နာရီ။ လက်နှိုင်းကို ဘယ်လိုနှုတ်ဆက်မလဲ။',
    ko: '___(인사말) — 아침에 만날 때 쓰는 인사',
    options: ['안녕하세요', '안녕히 가세요', '고맙습니다', '잠시만요'], answer: 0,
    why: '안녕하세요 is the all-purpose greeting. 안녕히 가세요 = “go in peace” (said to someone leaving).',
  },
  {
    id: 'q3', deck: 'eps_vocab',
    prompt: 'Which particle means “to (a place)”?',
    my: '“သွားသည်/ရောက်သည်” အတွက် သက်ဆိုင်သော ကောင်းကို ရွေးပါ။',
    ko: '회사 ___ 에 가요.',
    options: ['를', '에', '에서', '와'], answer: 1,
    why: '에 marks destination. 에서 marks where an action happens. 을/를 marks the object.',
  },
  {
    id: 'q4', deck: 'eps_vocab',
    prompt: 'Ask about the price at the market.',
    my: 'ဈေးနှုန်းကိုမေးရာတွင် ဘယ်သို့မေးမလဲ။',
    ko: '___ ? (How much is it?)',
    options: ['몇 명이에요?', '얼마예요?', '어디예요?', '무엇이에요?'], answer: 1,
    why: '얼마예요? = “How much is it?” 몇 명이에요? = “How many people?”',
  },
  {
    id: 'q5', deck: 'eps_vocab',
    prompt: 'Which word means “start work / commute in”?',
    my: '“အလုပ်စတင်/တက်ရောက်” ဟူသော ဝေါဟာရကို ရွေးပါ။',
    ko: '매일 8시에 ___ 해요.',
    options: ['출근', '퇴근', '야근', '조퇴'], answer: 0,
    why: '출근 = commuting in, 퇴근 = leaving work, 야근 = night overtime, 조퇴 = leaving early.',
  },
  {
    id: 'q6', deck: 'eps_vocab',
    prompt: 'Your contract says “월 2,400,000원”. What is this?',
    my: 'စာချုပ်တွင် “월 2,400,000원” ဟုရေးထားသည်။ အဓိပ္ပာယ်ကဘာလဲ။',
    ko: '___ 2,400,000원 — 매달 받는 돈',
    options: ['월급 (monthly wage)', '보증금 (deposit)', '연금 (pension)', '벌금 (fine)'], answer: 0,
    why: '월(月) = month, 급(給) = pay. 꼭 월급인지 매월 날짜와 계좌를 계약서에 확인하세요.',
  },
  {
    id: 'q7', deck: 'eps_vocab',
    prompt: 'Which word is “bankbook / account”?',
    my: 'ဘဏ်စာအုပ်/အကောင့် ဟူသောဝေါဟာရကို ရွေးပါ။',
    ko: '___ 을 만들어 주세요. (Please open one for me.)',
    options: ['통장', '여권', '사진', '계약서'], answer: 0,
    why: '통장 = bankbook. 급여 계좌는 반드시 본인 이름으로 개설해야 합니다 (이름不符 급여 미지급 위험).',
  },
  {
    id: 'q8', deck: 'eps_vocab',
    prompt: 'Complete: “I want to rest.”',
    my: '“အနားယူချင်တယ်” ကို ပြည့်စုံအောင်ရေးပါ။',
    ko: '___ 싶어요.',
    options: ['쉬다', '쉬고', '쉬는', '쉬어'], answer: 0,
    why: 'Desire pattern: verb stem + 고 싶다. 쉬다 → 쉬고 싶어요. In the blank form the dictionary form 쉬다 fits.',
  },

  // ---------- daily_life ----------
  {
    id: 'q9', deck: 'daily_life',
    prompt: 'You feel sick. What do you say?',
    my: 'နေမကောင်းဖြစ်နေသည်။ ဘယ်လိုပြောမလဲ။',
    ko: '___ 에 가요. (I am going to the hospital.)',
    options: ['병원', '은행', '공장', '역'], answer: 0,
    why: '병원 = hospital. 은행 = bank, 역 = station. 병원에 가다 = to go to hospital.',
  },
  {
    id: 'q10', deck: 'daily_life',
    prompt: 'The subway announcement says “이번 역은 수원, 수원역입니다.” Where are you?',
    my: 'မြေအောက်ရထားကြေညာချက် — ဘယ်ဘူတာရောက်နေပြီလဲ။',
    ko: '___ 역 — 경기도의 도시',
    options: ['수원', '서울', '부산', '인천'], answer: 0,
    why: '수원(水原) is in Gyeonggi-do and hosts a large industrial complex — many E-9 workers live there.',
  },
  {
    id: 'q11', deck: 'daily_life',
    prompt: 'Complete: “Please give me a receipt.”',
    my: '“အချက်အလက်ပြန်တောင်းခံလိုသည်” ကို ပြည့်စုံအောင်ရေးပါ။',
    ko: '___ 주세요.',
    options: ['영수증', '지하철', '휴가', '가족'], answer: 0,
    why: '영수증 = receipt. Always keep wage receipts (영수증/급여명세서) as evidence.',
  },
  {
    id: 'q12', deck: 'daily_life',
    prompt: 'Which word means “nationality”?',
    my: '“နိုင်ငံသား/နိုင်ငံ” ဟူသောဝေါဟာရကို ရွေးပါ။',
    ko: '___ 을 여권에 씁니다.',
    options: ['국적', '직업', '주소', '나이'], answer: 0,
    why: '국적 = nationality, 직업 = job, 주소 = address, 나이 = age.',
  },
  {
    id: 'q13', deck: 'daily_life',
    prompt: 'Which day is Thursday?',
    my: 'ကြာသပတေးနေ့ ဘယ်ဟုတ်လဲ။',
    ko: '___ 요일에 쉬어요. (I rest on Thursday.)',
    options: ['목요일', '화요일', '수요일', '일요일'], answer: 0,
    why: '목요일 = Thursday. 화 Tuesday, 수 Wednesday, 일 Sunday/Sunday-off day in contracts.',
  },
  {
    id: 'q14', deck: 'daily_life',
    prompt: 'Your landlord asks for “보증금”. What is it?',
    my: 'အိမ်ရှင်က “보증금” ဟုတောင်းသည်။ အဓိပ္ပာယ်ကဘာလဲ။',
    ko: '___ 을 계좌로 보냈습니다. (I sent the money to your account.)',
    options: ['deposit (key money)', 'monthly rent', 'utility bill', 'tax'], answer: 0,
    why: '보증금 = deposit, 월세 = monthly rent. Deposit disputes are a top complaint — get a written 계약서.',
  },

  // ---------- safety_work ----------
  {
    id: 'q15', deck: 'safety_work',
    prompt: 'A coworker shouts “화재예요! 119에 전화하세요!” What do you do?',
    my: '“မီးလောင်နေတယ်! 119 ကို ဖုန်းဆက်!” ဟုအော်သည်။ ဘာလုပ်မလဲ။',
    ko: '화재예요! 119에 전화하세요!',
    options: ['Call 119 (fire/ambulance)', 'Call 112 (police)', 'Call 1345 (immigration)', 'Keep working'], answer: 0,
    why: '119 = fire & ambulance (interpretation available), 112 = police, 1345 = immigration contact center.',
  },
  {
    id: 'q16', deck: 'safety_work',
    prompt: 'Which word means “safety helmet”?',
    my: '“ခေါင်းအုံးကာကွယ်ရေးဦးထုပ်” ဟူသောဝေါဟာရကို ရွေးပါ။',
    ko: '___ 을 쓰고 들어가세요. (Wear it before you enter.)',
    options: ['안전모', '안전화', '안전벨트', '장갑'], answer: 0,
    why: '안전모 = helmet, 안전화 = safety shoes, 안전벨트 = seat/safety belt, 장갑 = gloves.',
  },
  {
    id: 'q17', deck: 'safety_work',
    prompt: 'What does “긴급출구” mark?',
    my: '“긴급출구” ဟုရေးထားသည့် နေရာ၏ အဓိပ္ပာယ်။',
    ko: '___ 쪽으로 나가세요.',
    options: ['Emergency exit', 'Main entrance', 'Elevator', 'Canteen'], answer: 0,
    why: '긴급 = urgent/emergency, 출구 = exit. 통로에 물건을 쌓아 두는 것은 위반 행위입니다.',
  },
  {
    id: 'q18', deck: 'safety_work',
    prompt: 'Which sentence means “You must not do this”?',
    my: '“ဤအရာကို လုပ်၍မရပါ” ဟူသော ဝါကျကို ရွေးပါ။',
    ko: '___ 하면 안 됩니다.',
    options: ['이렇게', '조금', '빨리', '나중에'], answer: 0,
    why: '이렇게 하면 안 됩니다 = “You must not do it this way.” 안 되다 = not allowed.',
  },
  {
    id: 'q19', deck: 'safety_work',
    prompt: 'You got injured. Which sentence is right?',
    my: 'ဒဏ်ရာရသည်။ မှန်ကန်သော ဝါကျကို ရွေးပါ။',
    ko: '___ 에서 다쳤어요.',
    options: ['작업장', '휴게실', '주방', '버스'], answer: 0,
    why: '작업장 = workplace. 산재(산업재해) 신고는 사업주가 거부해도 근로복지공단(1588-3377)에 가능합니다.',
  },
  {
    id: 'q20', deck: 'safety_work',
    prompt: 'Which means “dangerous”?',
    my: '“အန္တရာယ်ရှိသည်” ဟူသော ဝေါဟာရကို ရွေးပါ။',
    ko: '여기는 ___ 요. (This place is …)',
    options: ['위험해요', '안전해요', '조용해요', '넓어요'], answer: 0,
    why: '위험 = danger, 안전 = safety. If a machine guard is missing, report it: 위험해서 못 하겠습니다.',
  },

  // ---------- kiip_life ----------
  {
    id: 'q21', deck: 'kiip_life',
    prompt: 'How long must you report a change of address?',
    my: 'နေထိုင်ရာ လိပ်စာပြောင်းလျှင် ဘယ်နှစ်ရက်အတွင်း အကြောင်းကြားရမလဲ။',
    ko: '이사를 하면 15일 안에 ___ 해야 합니다.',
    options: ['전입신고', '퇴사신고', '결혼신고', '출국신고'], answer: 0,
    why: '전입신고 (address change) is due within 15 days — do it online on HiKorea or at 주민센터.',
  },
  {
    id: 'q22', deck: 'kiip_life',
    prompt: 'Who enforces wage payment for you?',
    my: 'လုပ်ခလစာ မရရှိပါက ဘယ်သူ့ကို အကူအညီတောင်းရမလဲ။',
    ko: '___ 에 전화하면 도와줍니다. (Call … for help.)',
    options: ['고용노동부 1577-0075', '114', '119', '1330'], answer: 0,
    why: 'MOEL labor hotline 1577-0075 handles unpaid wages; 1345 is immigration; 1330 is tourist interpretation.',
  },
  {
    id: 'q23', deck: 'kiip_life',
    prompt: 'Which document proves you are registered to live in Korea?',
    my: 'ကိုရီးယားတွင် နေထိုင်ခွင့်အထောက်အထား ဘယ်သည်လဲ။',
    ko: '___ 카드를 지참하세요.',
    options: ['외국인등록증', '체류자격', '국적', '여권번호'], answer: 0,
    why: '외국인등록증 (ARC) must be carried; losing it requires 신분증 재발급 신고 within 14 days.',
  },
  {
    id: 'q24', deck: 'kiip_life',
    prompt: 'What does “연차휴가” mean?',
    my: '“연차휴가” ၏ အဓိပ္ပာယ်ကဘာလဲ။',
    ko: '1년에 ___ 일 (25일 이상 근무 시 15일)',
    options: ['paid annual leave', 'unpaid leave', 'maternity leave', 'lunch break'], answer: 0,
    why: '연차휴가 = paid annual leave: 15 days after 1 year / 80% attendance. Unused days convert to pay after 2 years.',
  },
  {
    id: 'q25', deck: 'kiip_life',
    prompt: 'Where do you check your official immigration status?',
    my: 'နေထိုင်ခွင့်အခြေအနေကို ဘယ်တွင်စစ်ရမလဲ။',
    ko: '___ 에서 체류자격을 확인합니다.',
    options: ['HiKorea', '블로그', '카페', '중고나라'], answer: 0,
    why: 'HiKorea (hi Korea) is the official immigration portal — appointments, prints of 자격증명서, overstay checks.',
  },
];

export function deckQuestions(deckId: string): Q[] {
  return QUESTIONS.filter((q) => q.deck === deckId);
}

export function getQuestion(id: string): Q | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

export function pickSession(deckId: string | null, size: number, srs: Record<string, { due: string; seen: boolean }>): Q[] {
  const pool = (deckId ? deckQuestions(deckId) : QUESTIONS).slice();
  const today = new Date().toISOString().slice(0, 10);
  const due = pool.filter((q) => {
    const c = srs[q.id];
    return !c || !c.seen || c.due <= today;
  });
  const source = due.length > 0 ? due : pool;
  // Simple deterministic-ish shuffle so re-takes differ between attempts.
  return source
    .map((q) => ({ q, k: Math.sin(Date.now() + q.id.charCodeAt(1) * 997) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, Math.min(size, source.length))
    .map((x) => x.q);
}
