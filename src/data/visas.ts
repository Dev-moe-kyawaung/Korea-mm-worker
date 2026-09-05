/**
 * Visa Intelligence Engine dataset.
 * Policy-sensitive numbers (quotas, income bars) were refreshed for the
 * April/July 2026 standards; each visa links back to its official source.
 */
export interface ChecklistItem {
  id: string; // i18n key
  mandatory: boolean;
}

export interface Visa {
  id: string;
  code: string;
  nameEn: string;
  nameMy: string;
  nameKo: string;
  tagline: { en: string; my: string; ko: string };
  audience: 'new' | 'in-korea' | 'both';
  color: string;
  icon: string;
  stay: string;
  work: string;
  sponsor: string;
  koreanReq: string;
  incomeFloor: string;
  family: string;
  pathF5: string;
  processing: string;
  quota: string;
  requirements: string[];
  risks: string[];
  checklist: ChecklistItem[];
  goals: string[]; // onboarding goal ids it answers
  scoreBoost: Record<string, number>; // wizard answer id -> bonus points
}

export const VISA_LIST: Visa[] = [
  {
    id: 'E9',
    code: 'E-9',
    nameEn: 'Non-professional Employment',
    nameMy: 'အထူးမဟုတ်သော အလုပ် (EPS)',
    nameKo: '비전문취업',
    tagline: {
      en: 'The main factory / shipyard / farm route via the Employment Permit System.',
      my: 'EPS စနစ်ဖြင့် စက်ရုံ၊ သင်္ဘော၊ စိုက်ခန်းအလုပ်သို့ သွားရာ လမ်းကြောင်း။',
      ko: '고용허가제를 통한 공장·조선소·농업 근로자의 주된 경로입니다.',
    },
    audience: 'new',
    color: '#3B7DFF',
    icon: 'construct',
    stay: '4 years 10 months, renewable (transfers limited to 3 employers)',
    work: 'Manufacturing, agriculture, livestock, fisheries, construction — employer-bound',
    sponsor: 'Yes — MOU employer selected through HRD Korea; change needs approval',
    koreanReq: 'EPS-TOPIK Grade 2 (180/300) + basic skill test',
    incomeFloor: 'At least minimum wage; +20% overtime, +50% holiday work',
    family: 'No — family visit visa (H-2/F-3) only in special cases',
    pathF5: 'No direct path; converts via marriage, study (D-2) or professional route (E-7)',
    processing: 'COE ~4–8 weeks → visa stamping ~2 weeks',
    quota: '2026 intake: 80,000 new E-9 entries; 191,000 total non-professional quota',
    requirements: [
      'Passport valid 6+ months',
      'Pass EPS-TOPIK (Grade 2, 180+/300) at the Myanmar test centre',
      'Pass the basic skill test (기초능력평가) at HRD Korea',
      'Medical screening incl. TB and drug test',
      'Government-to-government employment contract (한국어·미얀마어 병기)',
      'Age window announced per intake — Myanmar rounds have targeted 27–39',
    ],
    risks: [
      'Illegal broker fees — only licensed agencies may recruit; keep every receipt',
      'Passport confiscation by employer is a crime — call 1345',
      'Contract switching scams after arrival (새 일자리 강요)',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'eps_result', mandatory: true },
      { id: 'aptitude_test', mandatory: true },
      { id: 'medical', mandatory: true },
      { id: 'coe', mandatory: true },
      { id: 'contract', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'arrival_record', mandatory: false },
      { id: 'arc', mandatory: true },
      { id: 'insurance', mandatory: false },
      { id: 'bank', mandatory: false },
    ],
    goals: ['goal_work_factory'],
    scoreBoost: { status_myanmar: 15, kl_none: 5, kl_basic: 10 },
  },
  {
    id: 'E7',
    code: 'E-7-4',
    nameEn: 'Specific Activity (Professional)',
    nameMy: 'ကျွမ်းကျင်သော အလုပ်',
    nameKo: '특정활동(전문인력)',
    tagline: {
      en: 'Degree + job offer route for engineers, nurses, chefs, designers, IT and more.',
      my: 'ဘွဲ့နှင့် အလုပ်ကမ်းလှမ်းချက် လိုအပ်သော အင်ဂျင်နီယာ၊ သူနာပြု၊ IT စသည့်လမ်းကြောင်း။',
      ko: '학위 + 취업 제안이 필요한 엔지니어·간호사·요리사·IT 등 전문직 경로입니다.',
    },
    audience: 'both',
    color: '#2FD08A',
    icon: 'briefcase',
    stay: '1 → 3 → 5 years (renewable, employer change reportable)',
    work: 'Any job matching the sponsored title; side jobs need approval',
    sponsor: 'Yes — sponsoring company must meet staffing/office criteria',
    koreanReq: 'Not always mandatory; TOPIK 3+ or field Korean helps a lot',
    incomeFloor: 'Many E-7 subtypes require income at or above per-capita GNI',
    family: 'Yes — spouse/children can come on F-3',
    pathF5: 'Yes — 5 years residence (incl. E-7) → F-5-1 application',
    processing: '3–8 weeks (COE via immigration, faster with complete file)',
    quota: 'No fixed quota — employer eligibility decides',
    requirements: [
      "Bachelor's degree or 5+ years verified experience in the field",
      'Employment contract with matching job description (직무기술서)',
      'Company registration, tax and social-insurance records',
      'Degree + criminal record apostilled and translated',
      'TOPIK certificate or documented field-language ability',
    ],
    risks: [
      'Title mismatch (contract says engineer, work is manual) → visa cancellation',
      'Ghost agencies selling fake E-7 offers — verify business registration number',
      'Under-declared wage on the contract lowers your F-5 income record',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'degree', mandatory: true },
      { id: 'criminal', mandatory: true },
      { id: 'contract', mandatory: true },
      { id: 'topik_cert', mandatory: false },
      { id: 'coe', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'arc', mandatory: true },
      { id: 'insurance', mandatory: false },
    ],
    goals: ['goal_professional', 'goal_settle'],
    scoreBoost: { kl_topik2: 20, kl_topik3: 30, status_korea: 10 },
  },
  {
    id: 'E8',
    code: 'E-8',
    nameEn: 'Seasonal Work',
    nameMy: 'ရာသီအလိုက် အလုပ်',
    nameKo: '계절근로',
    tagline: {
      en: 'Short agriculture/fishery seasons — recommended by local governments, up to 8 months.',
      my: 'စိုက်ပျိုး/ငါးဖမ်းရာသီအတွက် — ဒေသအစိုးရမှ အကြံပြုသည်၊ ၈ လအထိ။',
      ko: '지자체 추천형 계절 농업·어업 근로로 최대 8개월 체류합니다.',
    },
    audience: 'both',
    color: '#F5B942',
    icon: 'leaf',
    stay: 'Up to 8 months (5 months + 3-month extension per season)',
    work: 'Designated farm, fisheries or processing site only',
    sponsor: 'Yes — local government recommendation, not an individual application',
    koreanReq: 'Basic spoken Korean strongly preferred; EPS-TOPIK not always mandatory on the in-Korea track',
    incomeFloor: 'Minimum wage or above',
    family: 'No',
    pathF5: 'No direct path — often a bridge to E-9 or study (D-4)',
    processing: '1–2 months via the local government office (시군구)',
    quota: 'Expanded for 2026 inside the 191,000 non-professional total',
    requirements: [
      'Recommendation by a participating local government in Korea',
      'Available to applicants abroad and to people already in Korea on D-1/D-2/D-4/D-10/F-1/F-3',
      'Employment contract with a registered seasonal employer',
      'Medical check and travel documents',
    ],
    risks: [
      'Season ends early (weather/crop) — no guaranteed full 8 months',
      'Unpaid overtime in peak harvest — keep daily time sheets',
      'Return-deportation if you overstay after the season',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'contract', mandatory: true },
      { id: 'coe', mandatory: true },
      { id: 'medical', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'arrival_record', mandatory: false },
      { id: 'bank', mandatory: false },
    ],
    goals: ['goal_seasonal'],
    scoreBoost: { status_korea: 20, status_myanmar: 8 },
  },
  {
    id: 'D4',
    code: 'D-4',
    nameEn: 'General Trainee (Korean language)',
    nameMy: 'ကိုရီးယားစာ သင်တန်းသား',
    nameKo: '일반연수(어학)',
    tagline: {
      en: 'Study Korean at a language institute or university — with legal part-time work after 6 months.',
      my: 'ဘာသာစကားသင်တန်း/တက္ကသိုလ်တွင် ကိုရီးယားစာသင်ယူ — ၆ လနောက်ပိုင်း အချိန်ပိုင်းအလုပ် လုပ်နိုင်သည်။',
      ko: '어학원·대학교에서 한국어를 배우고 6개월 후부터 시간제 근무가 가능합니다.',
    },
    audience: 'new',
    color: '#5BC8F5',
    icon: 'school',
    stay: '6 months → up to 2 years (renewed per semester/1 year)',
    work: 'Up to 20 h/week after 6 months with 80%+ grades; full time in vacations',
    sponsor: 'Yes — admission letter from a certified language institution',
    koreanReq: 'Level test at the school; TOPIK 1+ shortens later steps',
    incomeFloor: 'Proof of funds / sponsor statement required at visa stage',
    family: 'Limited — F-3 for spouse/children in some cases',
    pathF5: 'D-4 → D-2 → E-7 / F-2-7 points track after graduation',
    processing: '3–6 weeks',
    quota: 'No national quota — school admission capacity decides',
    requirements: [
      'Admission certificate from a registered language institute (등록증)',
      'High school diploma + transcript (translated)',
      'Bank statement or sponsor affidavit of support',
      'Medical check and criminal record check',
      'Attendance 90%+ to keep part-time permission',
    ],
    risks: [
      'Unlicensed “academies” sell admission letters — check the school on the immigration list',
      'Working over 20 h/week cancels your student permission',
      'Skipping classes drops you below D-4 attendance rules',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'degree', mandatory: true },
      { id: 'funds_proof', mandatory: true },
      { id: 'criminal', mandatory: true },
      { id: 'medical', mandatory: false },
      { id: 'coe', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'arc', mandatory: true },
    ],
    goals: ['goal_study_korean', 'goal_settle'],
    scoreBoost: { kl_none: 12, status_myanmar: 10 },
  },
  {
    id: 'F27',
    code: 'F-2-7',
    nameEn: 'Points-based Residence',
    nameMy: 'အမှတ်ပေး နေထိုင်ခွင့်',
    nameKo: '포인트제 영주(체류)',
    tagline: {
      en: 'Score 80+ points (age, degree, Korean, income, credits) for a 2–5 year open-work permit.',
      my: 'အသက်၊ ဘွဲ့၊ ကိုရီးယားစာ၊ ဝင်ငွေစသည်ဖြင့် ၈၀ အမှတ်ရရှိပါက ၂-၅ နှစ် အလွတ်အလုပ်လုပ်ခွင့်။',
      ko: '나이·학위·한국어·소득 등 80점 이상이면 2~5년 자유로운 취업이 가능합니다.',
    },
    audience: 'in-korea',
    color: '#B07CFF',
    icon: 'ribbon',
    stay: '2 → 3 → 5 years (longer stay with higher score/income)',
    work: 'Open — change employer freely, both white- and blue-collar',
    sponsor: 'No employer sponsorship needed',
    koreanReq: 'TOPIK 3+ earns major points; TOPIK 5+ nearly secures the visa',
    incomeFloor: '80 points overall; the high-income sub-track accepts 75 points with 2× GNI income',
    family: 'Yes — F-3 dependents',
    pathF5: 'Yes — F-2 holders can apply for F-5 after ~3 years with income and integration proof',
    processing: '4–10 weeks',
    quota: 'No fixed quota',
    requirements: [
      '80+ points: degree, age band, Korean, income, social credits (가점)',
      'Current or offered employment in Korea',
      'Income and pension records (국민연금 납부확인서)',
      'Basic Korean society test (한국사회 이해) or KIIP record',
    ],
    risks: [
      'Point items expire — income and credits are re-checked at renewal',
      'Part-time-only income usually cannot clear the income line',
      'Overstaying even once zeroes out your points history',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'arc', mandatory: true },
      { id: 'topik_cert', mandatory: true },
      { id: 'degree', mandatory: true },
      { id: 'insurance', mandatory: true },
      { id: 'contract', mandatory: false },
      { id: 'kiip', mandatory: false },
    ],
    goals: ['goal_settle', 'goal_professional'],
    scoreBoost: { status_korea: 15, kl_topik2: 20, kl_topik3: 30 },
  },
  {
    id: 'F5',
    code: 'F-5',
    nameEn: 'Permanent Residence',
    nameMy: 'အမြဲတမ်းနေထိုင်ခွင့်',
    nameKo: '영주',
    tagline: {
      en: 'The endpoint: unlimited work, no sponsor, family included — with the highest income bar.',
      my: 'ပန်းတိုင် — အလုပ်လွတ်လပ်ခွင့်၊ မှီခိုမှုမလို၊ မိသားစုပါနိုင် — ဝင်ငွေစည်းမျဉ်း အမြင့်ဆုံး။',
      ko: '무제한 취업·보증인 불필요·가족 동반이 가능한 최종 체류 자격입니다.',
    },
    audience: 'in-korea',
    color: '#F2536B',
    icon: 'home',
    stay: 'Indefinite (renewal card every 10 years)',
    work: 'Unrestricted, including business (D-8/D-9 style activities allowed)',
    sponsor: 'No',
    koreanReq: 'KIIP Level 5 or 통합평가 60+ (or TOPIK 4 on some sub-types)',
    incomeFloor: 'Previous-year income ≥ 2× per-capita GNI — ≈ ₩104,800,000 under the April 2026 standard',
    family: 'Yes — spouse and children on F-3',
    pathF5: 'Is the endpoint; F-6 (marriage) and overseas-Korean tracks also lead here',
    processing: '2–4 months with interview and document review',
    quota: 'No fixed quota',
    requirements: [
      '5 consecutive years on a qualifying visa (shorter on some special tracks)',
      'Income ≥ 2× per-capita GNI (family income can be combined)',
      'KIIP Level 5 or 통합평가 pass',
      'Criminal record (Korea + home country) and medical check',
      'Property/contract proof and stable livelihood (생활능력)',
    ],
    risks: [
      'Income threshold rises with GNI each April — plan years ahead',
      'One Over-stay stamp can end the application',
      'Fake KIIP certificates are prosecuted — verify your KIIP record number',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'arc', mandatory: true },
      { id: 'kiip', mandatory: true },
      { id: 'insurance', mandatory: true },
      { id: 'criminal', mandatory: true },
      { id: 'medical', mandatory: true },
      { id: 'bank', mandatory: true },
      { id: 'contract', mandatory: false },
    ],
    goals: ['goal_settle'],
    scoreBoost: { status_korea: 25, kl_topik3: 20 },
  },
  {
    id: 'H1',
    code: 'H-1',
    nameEn: 'Working Holiday',
    nameMy: 'ဝေးကွာနေထိုင်ခြင်း',
    nameKo: '워킹홀리데이',
    tagline: {
      en: 'One year of work + travel + study for young applicants — small annual quota.',
      my: 'အသက်နှစ်ဆယ်ဝန်းကျင်များအတွက် တစ်နှစ် — အလုပ်၊ ခရီးနှင့် ပညာသင်ခြင်း။',
      ko: '청년을 위한 1년 근무+여행+학습 비자로 쿼터가 제한적입니다.',
    },
    audience: 'new',
    color: '#FF9F45',
    icon: 'airplane',
    stay: '1 year (single entry; limited extensions by agreement)',
    work: 'Any legal job for up to 4 months per employer; study up to 6 months',
    sponsor: 'No',
    koreanReq: 'Not required',
    incomeFloor: 'Proof of funds (~₩3M+) and a return ticket',
    family: 'No',
    pathF5: 'No direct path — switch to D-2/E-7 before expiry if you want to stay',
    processing: '2–4 weeks after the intake opens',
    quota: 'Very small annual Myanmar quota — apply the hour it opens',
    requirements: [
      'Age within the agreement band (typically under 30 at application)',
      'Registered student or recent graduate status',
      'Financial proof and return flight plan',
      'Health insurance covering the stay',
    ],
    risks: [
      'Quota closes within hours — prepare documents in advance',
      '4-month-per-employer rule is strictly enforced',
      'No employer sponsorship means you self-arrange housing and tax filings',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'degree', mandatory: true },
      { id: 'funds_proof', mandatory: true },
      { id: 'insurance', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'bank', mandatory: false },
    ],
    goals: ['goal_holiday'],
    scoreBoost: { status_myanmar: 10 },
  },
  {
    id: 'F1D',
    code: 'F-1-3',
    nameEn: 'Family Sojourn (dependents)',
    nameMy: 'မိသားစု နေထိုင်ခွင့်',
    nameKo: '가족체류',
    tagline: {
      en: 'Join a Korean-national spouse, or dependents of E-7/D-4/F-5 holders — work needs permission.',
      my: 'ကိုရီးယားနိုင်ငံသား ဇနီး/မိန်းမ သို့မဟုတ် E-7/D-4/F-5 ကတ်ပိုင်ရှင်၏ မိသားစု — အလုပ်လုပ်ရန် ခွင့်ပြုချက်လိုအပ်သည်။',
      ko: '한국인 배우자 또는 E-7/D-4/F-5 소지자의 가족이 함께 체류하며, 취업은 허가가 필요합니다.',
    },
    audience: 'both',
    color: '#4FD1C5',
    icon: 'people',
    stay: '1 → 3 years, renewable with the sponsor\'s status',
    work: 'Only with part-time permission (시간외활동) or after converting to E-7',
    sponsor: 'Yes — the Korean national or the working sponsor',
    koreanReq: 'None for the visa itself',
    incomeFloor: 'Sponsor must prove livelihood for the whole household',
    family: 'This IS the family route',
    pathF5: 'Marriage to a Korean national → F-6 → F-5; long residence + income → F-5-1',
    processing: '2–6 weeks',
    quota: 'No quota',
    requirements: [
      'Proof of relationship (marriage / birth certificates, apostilled)',
      'Sponsor\'s ID: Korean ID or ARC copy plus income records',
      'Housing proof or pledge of accommodation',
      'Medical check for long stays',
    ],
    risks: [
      'Domestic-violence victims have protected exit paths — call 1365/112, not the sponsor',
      'Divorce before F-6/F-5 conversion ends the dependent status',
      'Unauthorized work cancels the family status',
    ],
    checklist: [
      { id: 'passport', mandatory: true },
      { id: 'marriage_cert', mandatory: false },
      { id: 'birth_cert', mandatory: false },
      { id: 'sponsor_forms', mandatory: true },
      { id: 'bank', mandatory: true },
      { id: 'visa_page', mandatory: true },
      { id: 'arc', mandatory: true },
      { id: 'medical', mandatory: false },
    ],
    goals: ['goal_family'],
    scoreBoost: { status_myanmar: 6, status_korea: 6 },
  },
];

export function getVisa(id: string): Visa | undefined {
  return VISA_LIST.find((v) => v.id === id);
}

export function visaName(v: Visa, lang: 'en' | 'my' | 'ko'): string {
  if (lang === 'my') return v.nameMy;
  if (lang === 'ko') return v.nameKo;
  return v.nameEn;
}

/** 5-question decision tree scoring: every answer contributes weight per visa. */
export const WIZARD_QUESTIONS = [
  { key: 'goal', options: ['goal_work_factory', 'goal_seasonal', 'goal_professional', 'goal_study_korean', 'goal_settle', 'goal_family', 'goal_holiday'] },
  { key: 'status', options: ['status_myanmar', 'status_korea', 'status_third'] },
  { key: 'korean', options: ['kl_none', 'kl_basic', 'kl_topik2', 'kl_topik3'] },
  { key: 'age', options: ['age_under27', 'age_27_39', 'age_over39'] },
  { key: 'priority', options: ['priority_money', 'priority_permanence', 'priority_speed', 'priority_family'] },
];

export const WIZARD_PRIORITY_BOOST: Record<string, Record<string, number>> = {
  priority_money: { E9: 10, E7: 12, F27: 8 },
  priority_permanence: { F5: 18, F27: 14 },
  priority_speed: { E8: 12, H1: 10, D4: 8 },
  priority_family: { F1D: 16, F5: 10, E7: 6 },
};

export const WIZARD_AGE_BOOST: Record<string, Record<string, number>> = {
  age_under27: { D4: 14, H1: 16, E7: 6 },
  age_27_39: { E9: 16, E7: 10, E8: 8 },
  age_over39: { E7: 10, F5: 8, F27: 8, E9: -20 },
};

/** Compact cells for the side-by-side comparison matrix. */
export interface MatrixCells {
  stay: string;
  work: string;
  sponsor: string;
  korean: string;
  income: string;
  family: string;
  f5: string;
  time: string;
}

export const MATRIX: Record<string, MatrixCells> = {
  E9: { stay: '4y 10m + extend', work: 'Factory / farm / fishery', sponsor: 'Required (MOU)', korean: 'EPS-TOPIK 2 (180+)', income: 'Min. wage or above', family: 'No', f5: 'Indirect only', time: '~2–3 months' },
  E7: { stay: '1 → 3 → 5 yrs', work: 'Profession matching degree', sponsor: 'Required (company)', korean: 'Advantageous, not always mandatory', income: '≈ per-capita GNI', family: 'Yes (F-3)', f5: 'After 5 yrs', time: '3–8 weeks' },
  E8: { stay: 'Up to 8 months', work: 'Seasonal farm / fishery', sponsor: 'Local govt recommendation', korean: 'Basic spoken Korean helps', income: 'Min. wage or above', family: 'No', f5: 'No', time: '1–2 months' },
  D4: { stay: '6 mo → 2 yrs', work: '20 h/wk part-time', sponsor: 'School admission', korean: 'School level test', income: 'Proof of funds', family: 'Limited', f5: 'Via D-2 / E-7', time: '3–6 weeks' },
  F27: { stay: '2 → 5 yrs', work: 'Open, any employer', sponsor: 'Not required', korean: 'TOPIK 3+ earns points', income: '80 points overall', family: 'Yes (F-3)', f5: 'After ~3 yrs', time: '4–10 weeks' },
  F5: { stay: 'Indefinite', work: 'Unrestricted', sponsor: 'Not required', korean: 'KIIP 5 / 통합평가', income: '≈ ₩104.8M (2× GNI)', family: 'Yes', f5: 'Is the endpoint', time: '2–4 months' },
  H1: { stay: '1 year', work: 'Any job, 4 mo per employer', sponsor: 'Not required', korean: 'Not required', income: 'Proof of funds', family: 'No', f5: 'No', time: '2–4 weeks' },
  F1D: { stay: '1 → 3 yrs', work: 'With part-time permission', sponsor: 'Family sponsor', korean: 'Not required', income: 'Sponsor livelihood', family: 'This is the route', f5: 'Via F-6 / 5 yrs', time: '2–6 weeks' },
};

export const MATRIX_ROWS: { labelKey: string; key: keyof MatrixCells }[] = [
  { labelKey: 'stay_len', key: 'stay' },
  { labelKey: 'work_ok', key: 'work' },
  { labelKey: 'sponsor', key: 'sponsor' },
  { labelKey: 'korean_req', key: 'korean' },
  { labelKey: 'income_floor', key: 'income' },
  { labelKey: 'family_ok', key: 'family' },
  { labelKey: 'path_f5', key: 'f5' },
  { labelKey: 'processing', key: 'time' },
];
