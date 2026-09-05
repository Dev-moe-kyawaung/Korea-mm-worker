/**
 * Community + Legal Aid datasets: policy feed, verified lawyers, peer forum,
 * employer blacklist reports and emergency hotlines.
 * Policy items reference the official bodies so users can re-verify.
 */
export interface PolicyItem {
  id: string;
  date: string;
  category: 'visa' | 'labour' | 'exam' | 'safety' | 'money';
  source: string;
  titleEn: string;
  titleMy: string;
  titleKo: string;
  bodyEn: string;
  bodyMy: string;
  important: boolean;
}

export const POLICIES: PolicyItem[] = [
  {
    id: 'p1', date: '2026-07-15', category: 'visa', source: 'MOEL / HRD Korea', important: true,
    titleEn: 'E-9 new-entry quota cut to 80,000 for 2026',
    titleMy: '၂၀၂၆ ခုနှစ် E-9 အသစ်ဝင်ရောက်မှု ၈၀,၀၀၀ သို့ လျှော့ချ',
    titleKo: '2026년 E-9 신규入境 인원 8만 명으로 감축',
    bodyEn: 'New E-9 entries fall from about 130,000 (2025) to 80,000 in 2026 while the overall non-professional ceiling stays at 191,000 as E-8 seasonal intake expands. Myanmar applicants should book EPS-TOPIK seats early and keep skill-test documents ready.',
    bodyMy: 'E-9 အသစ်ဝင်ရောက်မှု ၂၀၂၅ ခုနှစ်က ၁၃၀,၀၀၀ ခန့်မှ ၂၀၂၆ တွင် ၈၀,၀၀၀ သို့ လျှော့ချခံရပြီး၊ E-8 ရာသီအလိုက်တိုးချဲ့မှုကြောင့် စုစုပေါင်း ၁၉၁,၀၀၀ အတွင်း ရှိနေဆဲဖြစ်သည်။',
  },
  {
    id: 'p2', date: '2026-04-01', category: 'money', source: 'Ministry of Justice', important: true,
    titleEn: 'GNI-based income standards updated from 1 April 2026',
    titleMy: '၂၀၂၆ ဧပြီ ၁ ရက်မှစ၍ GNI အခြေခံ ဝင်ငွေစည်းမျဉ်း အသစ်ပြင်ဆင်',
    titleKo: '2026년 4월 1일부터 GNI 기준 소득요건 적용',
    bodyEn: 'Every visa category that uses per-capita GNI as an income test moved to the new standard. The F-5 permanent-residence bar sits at roughly twice per-capita GNI, about ₩104.8 million of previous-year income (family income can be combined).',
    bodyMy: 'GNI တစ်ဦးချင်းကို ဝင်ငွေစစ်ဆေးရာတွင် အသုံးပြုသော ဗီဇာအားလုံး အသစ်စည်းမျဉ်းအတိုင်း ပြောင်းလဲပြီး၊ F-5 ဝင်ငွေအနည်းဆုံးသည် GNI ၏ နှစ်ဆခန့် (ယခင်နှစ် ဝင်ငွေ ၁၀၄.၈ သန်းကျပ်ခန့်) ဖြစ်သည်။',
  },
  {
    id: 'p3', date: '2026-05-20', category: 'exam', source: 'HRD Korea', important: false,
    titleEn: 'EPS-TOPIK Grade 2 (180+/300) remains the pass line',
    titleMy: 'EPS-TOPIK အဆင့် ၂ (၁၈၀+) သည် ဆက်လက်အောင်မြင်မှုစည်းမျဉ်းအဖြစ် ရှိဆဲ',
    titleKo: 'EPS-TOPIK 2급(180점 이상) 합격 기준 유지',
    bodyEn: 'Grade 2 with at least 180/300 is still the requirement for E-9 issuance, and results are valid for two years. Listening makes up half the paper — practise dictation with the Exam tab daily.',
    bodyMy: 'E-9 ထုတ်ပေးရာတွင် ၁၈၀/၃၀၀ အထက် အဆင့် ၂ ရရှိရန် လိုအပ်ဆဲဖြစ်ပြီး ရလဒ်သက်တမ်းမှာ ၂ နှစ်ဖြစ်သည်။',
  },
  {
    id: 'p4', date: '2026-03-02', category: 'visa', source: 'MOEL', important: false,
    titleEn: 'E-8 seasonal track widens for people already in Korea',
    titleMy: 'ကိုရီးယားတွင် ရှိပြီးသူများအတွက် E-8 ရာသီအလိုက်လမ်းကြောင်း တိုးချဲ့',
    titleKo: '국내 체류 외국인 대상 E-8 계절근로 확대',
    bodyEn: 'Local governments can now recommend seasonal workers who already hold D-1, D-2, D-4, D-10, F-1 or F-3 status — a realistic bridge for students between semesters and for dependents who want legal short-term work.',
    bodyMy: 'ဒေသအစိုးရမှ D-1/D-2/D-4/D-10/F-1/F-3 ကတ်ပိုင်ရှင်များကို ရာသီအလိုက်အလုပ်အတွက် အကြံပြုနိုင်ပြီဖြစ်သည်။',
  },
  {
    id: 'p5', date: '2026-02-10', category: 'safety', source: 'HiKorea / 1345', important: false,
    titleEn: '1345 now offers Myanmar-language interpretation around the clock',
    titleMy: '၁၃၅၄ (1345) သည် မြန်မာဘာသာဖြင့် ၂၄ နာရီ အကူအညီပေးနေ',
    titleKo: '1345, 미얀마어 상담 24시간 운영',
    bodyEn: 'The immigration contact center (1345) covers Burmese, Vietnamese, Thai, Indonesian and more. Use it before paying any “fixer” — overstay regularisation, employer abuse and ARC losses are all handled here.',
    bodyMy: 'နေထိုင်ခွင်းဌာနအကူအညီဖုန်း 1345 သည် မြန်မာဘာသာဖြင့် ၂၄ နာရီ အကူအညီပေးသည်။ “ဖြေရှင်းခ” ငွေမပေးမီ ဤဖုန်းကို အရင်ဆက်သင့်သည်။',
  },
  {
    id: 'p6', date: '2026-01-08', category: 'labour', source: 'HiKorea', important: false,
    titleEn: 'Address changes must be reported within 15 days',
    titleMy: 'လိပ်စာပြောင်းလျှင် ၁၅ ရက်အတွင်း အကြောင်းကြားရန်လို',
    titleKo: '전입신고, 15일 이내 신고 의무',
    bodyEn: 'Failing to report your new address (전입신고) within 15 days can cost a fine and complicates every later visa step. It can be done online at HiKorea or at the local 주민센터 with your ARC.',
    bodyMy: 'နေထိုင်ရာလိပ်စာ ၁၅ ရက်အတွင်း မအကြောင်းကြားပါက ဒဏ်ရိုက်ခြင်းနှင့် နောက်ပိုင်းဗီဇာဆောင်ရွက်ရာတွင် အခက်အခဲ ဖြစ်နိုင်သည်။',
  },
];

export interface Lawyer {
  id: string;
  name: string;
  region: string;
  specialties: string[];
  langs: string[];
  fee: string;
  response: string;
  cases: number;
  bio: string;
}

export const LAWYERS: Lawyer[] = [
  {
    id: 'l1', name: 'Aye Chan Ko', region: 'Ansan (시화) · Seoul',
    specialties: ['E-9 labour disputes', 'Wage claims', 'Workplace injury (산재)'],
    langs: ['Myanmar', '한국어', 'English'], fee: '₩80,000 / 30 min', response: '~4 h', cases: 1240,
    bio: 'Represents EPS workers in Gyeonggi factories. Runs free Saturday clinics at the Myanmar workers’ centre in Ansan.',
  },
  {
    id: 'l2', name: 'Kang Ji-yeon', region: 'Seoul · Yeouido',
    specialties: ['F-5 / F-2-7 points strategy', 'Family (F-3) petitions', 'Overstay regularisation'],
    langs: ['한국어', 'English'], fee: '₩120,000 / 40 min', response: '~8 h', cases: 860,
    bio: 'Immigration attorney for 12 years. Specialises in income-evidence strategy for the 2× GNI threshold.',
  },
  {
    id: 'l3', name: 'Myo Thu Htay', region: 'Busan · Geumjeong',
    specialties: ['Shipyard contracts', 'Broker fraud', 'Visa transfer (이직)'],
    langs: ['Myanmar', '한국어'], fee: '₩70,000 / 30 min', response: '~3 h', cases: 540,
    bio: 'Former EPS interpreter turned lawyer. Handles broker-fee recovery and illegal transfer cases across Busan ports.',
  },
  {
    id: 'l4', name: 'Park Seo-jin', region: 'Gimhae · Changwon',
    specialties: ['E-7 professional visas', 'Degree apostille', 'Company registration checks'],
    langs: ['한국어', 'English', '中文'], fee: '₩100,000 / 30 min', response: '~6 h', cases: 410,
    bio: 'Advises engineers and nurses moving from D-4/E-9 to E-7-4 with complete document audits.',
  },
  {
    id: 'l5', name: 'Sanda Lin', region: 'Gumi · Cheongju',
    specialties: ['Family reunification', 'Domestic violence support', 'Child schooling rights'],
    langs: ['Myanmar', '한국어', 'English'], fee: 'Pro members: free 20 min', response: '~2 h', cases: 300,
    bio: 'Works with the Korean Red Cross on emergency shelter referrals for migrant spouses and their children.',
  },
];

export interface Thread {
  id: string;
  author: string;
  city: string;
  tag: 'visa' | 'work' | 'housing' | 'exam' | 'money';
  hoursAgo: number;
  replies: number;
  likes: number;
  title: { en: string; my: string; ko: string };
  body: { en: string; my: string; ko: string };
}

export const THREADS: Thread[] = [
  {
    id: 't1', author: 'Ko Naing', city: 'Ansan', tag: 'work', hoursAgo: 3, replies: 24, likes: 61,
    title: { en: 'Factory suddenly cut my overtime — what can I do?', my: 'စက်ရုံက အချိန်ပိုင်း ဖြတ်တယ် — ဘာလုပ်ရမလဲ။', ko: '야근이 갑자기 줄었어요 — 어떻게 하나요?' },
    body: {
      en: 'My contract lists 2,400,000원 base plus overtime, but since last month they only pay the base. 210 hours of overtime vanished from the slip.',
      my: 'စာချုပ်တွင် ၂,၄၀၀,၀၀၀ ကျပ် အခြေခံနှင့် အချိန်ပိုင်းပါသည်။ ပြီးခဲ့သောလမှစ၍ အခြေခံသာ ရသည်။ အချိန်ပို ၂၁၀ နာရီ ပျောက်နေသည်။',
      ko: '계약서에는 기본 240만 원 + 수당이 있는데 지난달부터 기본만 줘요. 210시간 야근이 명세서에서 사라졌어요.',
    },
  },
  {
    id: 't2', author: 'Su Myat Noe', city: 'Seoul', tag: 'visa', hoursAgo: 9, replies: 41, likes: 120,
    title: { en: 'D-4 → E-7 switch: which documents actually matter?', my: 'D-4 မှ E-7 ပြောင်းရာတွင် ဘယ်စာရွက်များ အရေးကြီးလဲ။', ko: 'D-4→E-7 전환, 어떤 서류가 진짜 중요하나요?' },
    body: {
      en: 'Immigration asked for the company org chart and my job description twice. Degree alone was not enough — bring the 직무기술서 printed and stamped.',
      my: 'မိုင်းဂျိုင်းရုံ (HiKorea) မှ ကုမ္ပဏီ အဖွဲ့စည်းပုံနှင့် လုပ်ငန်းဖော်ပြချက် တောင်းသည်။ ဘွဲ့လက်မှတ်တစ်ခုတည်း မလုံလောက်ပါ။',
      ko: '회사 조직도랑 직무기술서를 두 번이나 요구했어요. 학위증만으로는 부족합니다.',
    },
  },
  {
    id: 't3', author: 'Htet Aung', city: 'Gimhae', tag: 'housing', hoursAgo: 20, replies: 18, likes: 44,
    title: { en: 'Goshiwon deposit returned? My checklist after moving out', my: 'ဂိုရှီဝန် အာမခံငွေ ပြန်ရလား — ထွက်ပြီးနောက် စာရင်း', ko: '고시원 보증금 돌려받기 — 퇴실 후 체크리스트' },
    body: {
      en: 'Photograph every wall before you leave, keep the 계약서, and send the account number by text the same day. Mine came back in 6 days once I had photos.',
      my: 'မထွက်ခင် နံရံတိုင်းကို ဓာတ်ပုံရိုက်၊ စာချုပ်သိမ်း၊ ထွက်သည့်နေ့တွင် အကောင့်နံပါတ် စာဖြင့်ပို့ပါ။',
      ko: '퇴실 전 벽마다 사진, 계약서 보관, 당일 계좌번호 문자 — 사진 있으니 6일 만에 받았어요.',
    },
  },
  {
    id: 't4', author: 'May Zin', city: 'Cheonan', tag: 'exam', hoursAgo: 30, replies: 66, likes: 210,
    title: { en: '214/300 on EPS-TOPIK — my 6-week plan (listening is half!)', my: 'EPS-TOPIK ၂၁၄/၃၀၀ — ၆ ပတ် အစီအစဉ် (နားထောင်ခြင်းက ဝက်ဖြစ်!)', ko: 'EPS-TOPIK 214점 — 6주 계획 공유합니다' },
    body: {
      en: 'I failed twice at 140. What changed: 30 minutes of dictation every morning using this app’s safety deck, then flashcards on the bus. Grade 2 is realistic in 6 weeks.',
      my: 'တစ်ကြိမ်နှစ်ကြိမ် ၁၄၀ ဂိမ်းဖြင့် ကျရှုံးဖူးသည်။ နံနက်တိုင်း နားဆင်ရေး ၃၀ မိနစ်နှင့် ဘတ်စ်ကားတွင် flashcard — ၆ ပတ်အတွင်း အဆင့် ၂ ရနိုင်သည်။',
      ko: '140점에서 두 번 떨어졌어요. 매일 아침 30분.dictation + 지하철에서 플래시카드. 6주면 2급 충분합니다.',
    },
  },
  {
    id: 't5', author: 'Zaw Lwin', city: 'Busan', tag: 'money', hoursAgo: 48, replies: 33, likes: 88,
    title: { en: 'Sending money home: app vs bank — I compared the fees', my: 'ငွေလွှဲခြင်း — app နှင့် ဘဏ် ကုန်ကျစရိတ် နှိုင်းယှဉ်ကြည့်သည်', ko: '송금 수수료: 앱 vs 은행 비교해봤어요' },
    body: {
      en: 'On 1.8M won net the app took 0.7% and the bank 3% plus a fixed fee. That is about 78,000 kyat difference per month — same-day arrival too.',
      my: 'လက်ကျန် ၁.၈ သန်းကျပ်အတွက် app က ၀.၇% နှင့် ဘဏ်က ၃% ယူသည်။ တစ်လလျှင် ကျပ် ၇၈,၀၀၀ ခန့် ကွာခြားသည်။',
      ko: '실수령 180만 원 기준 앱 0.7% vs 은행 3%. 한 달에 78,000키타 차이가 나요.',
    },
  },
  {
    id: 't6', author: 'Thiri', city: 'Seoul', tag: 'visa', hoursAgo: 72, replies: 12, likes: 35,
    title: { en: 'F-5 income evidence: which paperwork counted for me', my: 'F-5 ဝင်ငွေအထောက်အထား — ကျွန်မအတွက် အသုံးဝင်ခဲ့သောစာရွက်များ', ko: 'F-5 소득 증빙: 저에게 통한 서류' },
    body: {
      en: '근로소득원천징수영수증 + 국민연금 납부확인서 + 토익/TOPIK. They checked the GNI multiple against last year’s announced figure, so timing your filing after the April update matters.',
      my: 'ဝင်ငွေခွန် နှင့် ပင်စုမြစ် ထောက်ခံစာ အတူတကွ တင်သည်။ GNI နှစ်ဆ စည်းမျဉ်းကို ဧပြီအသစ်ပြင်ဆင်ချိန်နှင့် ကိုက်ညီအောင် လျှောက်ထားခြင်း အရေးကြီးသည်။',
      ko: '원천징수영수증+연금 납부확인서+어학성적. GNI 배수 기준은 4월 개편 후 figures를 봐야 해요.',
    },
  },
];

export interface BlacklistEntry {
  id: string;
  company: string;
  area: string;
  category: 'wage_theft' | 'passport_confiscation' | 'broker_fee' | 'fake_offer' | 'injury_denial';
  date: string;
  status: 'confirmed' | 'under_review' | 'disputed';
  reports: number;
  summary: string;
  riskDelta: number;
}

export const BLACKLIST: BlacklistEntry[] = [
  { id: 'b1', company: 'H** Metal Works', area: 'Ansan Danwon', category: 'passport_confiscation', date: '2026-06-18', status: 'confirmed', reports: 7, summary: 'Keeps passports “for safekeeping” and charges ₩900,000 in illegal placement fees.', riskDelta: 35 },
  { id: 'b2', company: 'S*** Fisheries', area: 'Busan Yeongdo', category: 'wage_theft', date: '2026-05-02', status: 'confirmed', reports: 4, summary: 'Pays only ₩1.6M of contracted ₩2.4M; payslips never issued for 3 months.', riskDelta: 30 },
  { id: 'b3', company: 'JJ* Personnel (broker)', area: 'Seoul Guro', category: 'broker_fee', date: '2026-04-27', status: 'under_review', reports: 3, summary: 'Demands ₩2.5M “processing fee” before a COE is issued — no licensed agency number.', riskDelta: 25 },
  { id: 'b4', company: 'T*** Agriculture', area: 'Gimhae', category: 'injury_denial', date: '2026-03-11', status: 'confirmed', reports: 5, summary: 'Tells injured workers to see a private clinic instead of filing 산재 (workplace injury) claims.', riskDelta: 28 },
  { id: 'b5', company: 'K**** HR Group', area: 'Anyang', category: 'fake_offer', date: '2026-02-20', status: 'disputed', reports: 2, summary: 'Sells “guaranteed E-7” offers without a registered sponsoring company.', riskDelta: 22 },
];

export interface Hotline {
  id: string;
  name: string;
  number: string;
  note: string;
}

export const HOTLINES: Hotline[] = [
  { id: 'h1', name: 'Korea Immigration (1345)', number: '1345', note: 'Myanmar-language interpretation · 24/7 · overstay, ARC, transfers' },
  { id: 'h2', name: 'Police (112)', number: '112', note: 'Crime, violence, passport confiscation — ask for foreigner assistance' },
  { id: 'h3', name: 'Fire & Ambulance (119)', number: '119', note: 'Press 2 for foreign-language emergency dispatch' },
  { id: 'h4', name: 'MOEL labour hotline', number: '1577-0075', note: 'Unpaid wages, illegal dismissal, forced transfers' },
  { id: 'h5', name: 'Workers’ compensation (근로복지공단)', number: '1588-3377', note: 'Workplace injury claims even if the employer refuses' },
  { id: 'h6', name: 'Myanmar Embassy, Seoul', number: '+82-2-792-2537', note: 'Passport replacement, citizen registry — verify the current number on the embassy site' },
];
