import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { AppProvider, useApp } from './src/store/AppContext';
import { useTheme } from './src/theme';
import { RootStackParamList } from './src/navigation';
import { getVisa } from './src/data/visas';

import OnboardingScreen from './src/screens/OnboardingScreen';
import VisaScreen from './src/screens/VisaScreen';
import VisaDetailScreen from './src/screens/VisaDetailScreen';
import WizardScreen from './src/screens/WizardScreen';
import ExamScreen from './src/screens/ExamScreen';
import QuizScreen from './src/screens/QuizScreen';
import VaultScreen from './src/screens/VaultScreen';
import AddDocScreen from './src/screens/AddDocScreen';
import MoneyScreen from './src/screens/MoneyScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import EmployerScreen from './src/screens/EmployerScreen';
import SosScreen from './src/screens/SosScreen';
import LawyerScreen from './src/screens/LawyerScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  VisaTab: 'shield-checkmark',
  ExamTab: 'school',
  VaultTab: 'folder-open',
  MoneyTab: 'cash',
  CommunityTab: 'people',
};

function HeaderLabel({ label, code }: { label?: string; code?: string }) {
  const { t } = useApp();
  const theme = useTheme();
  return (
    <Text style={{ color: theme.text, fontWeight: '800', fontSize: 16 }} numberOfLines={1}>
      {code ?? (label ? t(label) : '')}
    </Text>
  );
}

function MainTabs() {
  const { t } = useApp();
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textFaint,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '700' },
        tabBarIcon: ({ color }) => (
          <Ionicons name={TAB_ICONS[route.name] as keyof typeof Ionicons.glyphMap} size={21} color={color} />
        ),
      })}
    >
      <Tab.Screen name="VisaTab" component={VisaScreen} options={{ title: t('tab_visa') }} />
      <Tab.Screen name="ExamTab" component={ExamScreen} options={{ title: t('tab_exam') }} />
      <Tab.Screen name="VaultTab" component={VaultScreen} options={{ title: t('tab_vault') }} />
      <Tab.Screen name="MoneyTab" component={MoneyScreen} options={{ title: t('tab_money') }} />
      <Tab.Screen name="CommunityTab" component={CommunityScreen} options={{ title: t('tab_community') }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { hydrated, profile } = useApp();
  const theme = useTheme();

  const navTheme: NavTheme = {
    dark: theme.mode === 'dark',
    colors: {
      primary: theme.primary,
      background: theme.bg,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      notification: theme.accent,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '900' },
    },
  };

  if (!hydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: 74,
            height: 74,
            borderRadius: 26,
            backgroundColor: theme.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="shield-checkmark" size={36} color={theme.primary} />
        </View>
        <Text style={{ color: theme.text, fontWeight: '900', fontSize: 16, marginTop: 18 }}>
          Korea Migration Companion
        </Text>
        <ActivityIndicator color={theme.primary} style={{ marginTop: 16 }} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName={profile.onboarded ? 'Main' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          headerStyle: { backgroundColor: theme.bg },
          headerTintColor: theme.primary,
          headerTitleStyle: { color: theme.text },
          contentStyle: { backgroundColor: theme.bg },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="VisaDetail"
          component={VisaDetailScreen}
          options={({ route }) => ({
            headerShown: true,
            headerTitle: () => <HeaderLabel code={`${getVisa(route.params.id)?.code ?? ''}`} />,
            headerBackTitle: 'Back',
          })}
        />
        <Stack.Screen
          name="Wizard"
          component={WizardScreen}
          options={{ headerShown: true, headerTitle: () => <HeaderLabel label="visa_wizard" /> }}
        />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen
          name="AddDoc"
          component={AddDocScreen}
          options={{ headerShown: true, presentation: 'modal', headerTitle: () => <HeaderLabel label="add_doc" /> }}
        />
        <Stack.Screen
          name="Employer"
          component={EmployerScreen}
          options={{ headerShown: true, presentation: 'modal', headerTitle: () => <HeaderLabel label="analyzer_title" /> }}
        />
        <Stack.Screen
          name="Sos"
          component={SosScreen}
          options={{ headerShown: true, presentation: 'modal', headerTitle: () => <HeaderLabel label="sos_title" /> }}
        />
        <Stack.Screen
          name="Lawyer"
          component={LawyerScreen}
          options={{ headerShown: true, headerTitle: () => <HeaderLabel label="lawyers" /> }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true, headerTitle: () => <HeaderLabel label="settings" /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBarWrapper />
        <RootNavigator />
        <SpeedInsights />
      </AppProvider>
    </SafeAreaProvider>
  );
}

function StatusBarWrapper() {
  const theme = useTheme();
  return <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />;
}
