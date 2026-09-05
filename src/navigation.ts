import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  VisaDetail: { id: string };
  Wizard: undefined;
  Quiz: { deckId?: string; mode: 'study' | 'mock' };
  AddDoc: undefined;
  Employer: undefined;
  Sos: undefined;
  Lawyer: { id: string };
  Settings: undefined;
};

export type Nav = NativeStackNavigationProp<RootStackParamList>;
