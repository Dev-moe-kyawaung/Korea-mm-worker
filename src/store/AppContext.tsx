import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang, makeT, TFn } from '../i18n';
import { ThemeMode } from '../theme';
import { DEFAULT_CARD, Rating, SrsCard, schedule } from '../lib/sm2';
import { todayISO } from '../lib/dates';

const STORAGE_KEY = '@korea-migration-super-app/v1';

export interface Settings {
  lang: Lang;
  theme: ThemeMode;
  highContrast: boolean;
  biometric: boolean;
  pro: boolean;
  autoTranslate: boolean;
}

export interface Profile {
  name: string;
  goal: string | null;
  status: string | null;
  korean: string | null;
  age: string;
  onboarded: boolean;
}

export interface VaultDoc {
  id: string;
  type: string; // i18n key of the document type
  expiry: string | null; // ISO yyyy-mm-dd
  notes: string;
  addedAt: string;
}

export interface Progress {
  totalAnswers: number;
  totalCorrect: number;
  streak: number;
  lastStudy: string | null;
  best: Record<string, number>;
}

export interface LocalReport {
  id: string;
  company: string;
  category: string;
  date: string;
}

export interface AppState {
  settings: Settings;
  profile: Profile;
  docs: VaultDoc[];
  srs: Record<string, SrsCard>;
  checklist: Record<string, string[]>;
  progress: Progress;
  reports: LocalReport[];
}

const initialState: AppState = {
  settings: {
    lang: 'my',
    theme: 'system',
    highContrast: false,
    biometric: false,
    pro: false,
    autoTranslate: true,
  },
  profile: { name: '', goal: null, status: null, korean: null, age: '', onboarded: false },
  // Seed vault so the expiry tracker demonstrates itself on first launch.
  docs: [
    { id: 'd-passport', type: 'passport', expiry: todayISO(74), notes: 'Passport no. MA****21 (masked)', addedAt: todayISO(-400) },
    { id: 'd-medical', type: 'medical', expiry: todayISO(23), notes: 'TB test from Yangon clinic', addedAt: todayISO(-120) },
    { id: 'd-contract', type: 'contract', expiry: todayISO(178), notes: '월 2,400,000원 · Ansan shipyard', addedAt: todayISO(-90) },
    { id: 'd-eps', type: 'eps_result', expiry: null, notes: 'EPS-TOPIK Grade 2 · 214/300', addedAt: todayISO(-300) },
    { id: 'd-arc', type: 'arc', expiry: todayISO(605), notes: 'ARC ****-******-1', addedAt: todayISO(-80) },
  ],
  srs: {},
  checklist: {},
  progress: { totalAnswers: 0, totalCorrect: 0, streak: 0, lastStudy: null, best: {} },
  reports: [],
};

interface Ctx {
  hydrated: boolean;
  state: AppState;
  t: TFn;
  lang: Lang;
  settings: Settings;
  profile: Profile;
  patchSettings: (patch: Partial<Settings>) => void;
  saveProfile: (patch: Partial<Profile>) => void;
  addDoc: (doc: Omit<VaultDoc, 'id' | 'addedAt'>) => void;
  removeDoc: (id: string) => void;
  toggleCheck: (visaId: string, itemId: string) => void;
  gradeCard: (qid: string, rating: Rating) => void;
  recordQuiz: (deckId: string, correct: number, total: number) => void;
  addReport: (company: string, category: string) => void;
  resetAll: () => void;
}

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && alive) {
          const parsed = JSON.parse(raw) as Partial<AppState>;
          setState({
            ...initialState,
            ...parsed,
            settings: { ...initialState.settings, ...(parsed.settings ?? {}) },
            profile: { ...initialState.profile, ...(parsed.profile ?? {}) },
            progress: { ...initialState.progress, ...(parsed.progress ?? {}) },
          });
        }
      } catch {
        // Corrupt storage falls back to seed state — never block the user.
      } finally {
        if (alive) setHydrated(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const commit = useCallback((next: AppState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const patchSettings = useCallback(
    (patch: Partial<Settings>) => commit({ ...state, settings: { ...state.settings, ...patch } }),
    [commit, state]
  );

  const saveProfile = useCallback(
    (patch: Partial<Profile>) => commit({ ...state, profile: { ...state.profile, ...patch } }),
    [commit, state]
  );

  const addDoc = useCallback(
    (doc: Omit<VaultDoc, 'id' | 'addedAt'>) => {
      const next: VaultDoc = { ...doc, id: `d-${Date.now()}`, addedAt: todayISO(0) };
      commit({ ...state, docs: [...state.docs, next] });
    },
    [commit, state]
  );

  const removeDoc = useCallback(
    (id: string) => commit({ ...state, docs: state.docs.filter((d) => d.id !== id) }),
    [commit, state]
  );

  const toggleCheck = useCallback(
    (visaId: string, itemId: string) => {
      const current = state.checklist[visaId] ?? [];
      const next = current.includes(itemId) ? current.filter((i) => i !== itemId) : [...current, itemId];
      commit({ ...state, checklist: { ...state.checklist, [visaId]: next } });
    },
    [commit, state]
  );

  const gradeCard = useCallback(
    (qid: string, rating: Rating) => {
      const card = state.srs[qid] ?? DEFAULT_CARD;
      commit({ ...state, srs: { ...state.srs, [qid]: schedule(card, rating) } });
    },
    [commit, state]
  );

  const recordQuiz = useCallback(
    (deckId: string, correct: number, total: number) => {
      const today = todayISO(0);
      const p = state.progress;
      let streak = p.streak;
      if (p.lastStudy !== today) {
        const yesterday = todayISO(-1);
        streak = p.lastStudy === yesterday ? p.streak + 1 : 1;
      }
      const best = { ...p.best, [deckId]: Math.max(p.best[deckId] ?? 0, Math.round((correct / Math.max(1, total)) * 100)) };
      commit({
        ...state,
        progress: {
          totalAnswers: p.totalAnswers + total,
          totalCorrect: p.totalCorrect + correct,
          streak,
          lastStudy: today,
          best,
        },
      });
    },
    [commit, state]
  );

  const addReport = useCallback(
    (company: string, category: string) => {
      const next: LocalReport = { id: `r-${Date.now()}`, company, category, date: todayISO(0) };
      commit({ ...state, reports: [next, ...state.reports] });
    },
    [commit, state]
  );

  const resetAll = useCallback(() => {
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    setState({ ...initialState, profile: { ...initialState.profile, docs: [] } as never });
  }, []);

  const t = useMemo(() => makeT(state.settings.lang), [state.settings.lang]);

  const value: Ctx = {
    hydrated,
    state,
    t,
    lang: state.settings.lang,
    settings: state.settings,
    profile: state.profile,
    patchSettings,
    saveProfile,
    addDoc,
    removeDoc,
    toggleCheck,
    gradeCard,
    recordQuiz,
    addReport,
    resetAll,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
