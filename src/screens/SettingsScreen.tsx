import React from 'react';
import { Alert, Linking, ScrollView, Switch, Text, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Chip, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { LANG_LABEL, Lang } from '../i18n';

const LANGS: Lang[] = ['my', 'en', 'ko'];

export default function SettingsScreen() {
  const { t, settings, patchSettings, resetAll, state } = useApp();
  const progress = state.progress;
  const theme = useTheme();

  const confirmReset = () => {
    Alert.alert(t('reset_l'), t('reset_d'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('reset_confirm'), style: 'destructive', onPress: resetAll },
    ]);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <SectionHeader title={t('language_l')} icon="language" />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {LANGS.map((l) => (
            <Chip key={l} label={LANG_LABEL[l]} active={settings.lang === l} onPress={() => patchSettings({ lang: l })} />
          ))}
        </View>

        <SectionHeader title={t('appearance')} icon="color-palette" />
        <Card>
          <Text style={{ color: theme.textDim, fontSize: 12.5, marginBottom: 10 }}>{t('theme_l')}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Chip label={t('theme_system')} active={settings.theme === 'system'} onPress={() => patchSettings({ theme: 'system' })} small />
            <Chip label={t('theme_light')} active={settings.theme === 'light'} onPress={() => patchSettings({ theme: 'light' })} small />
            <Chip label={t('theme_dark')} active={settings.theme === 'dark'} onPress={() => patchSettings({ theme: 'dark' })} small />
          </View>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 16 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="contrast" size={19} color={theme.info} />
            <Text style={{ color: theme.text, fontSize: 13.5, flex: 1 }}>{t('hc_l')}</Text>
            <Switch
              value={settings.highContrast}
              onValueChange={(v) => patchSettings({ highContrast: v })}
              trackColor={{ true: theme.info, false: theme.border }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        <SectionHeader title={t('security_l')} icon="lock-closed" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="finger-print" size={19} color={theme.success} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 13.5 }}>{t('biometric_l')}</Text>
              <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 3 }}>{t('biometric_d')}</Text>
            </View>
            <Switch
              value={settings.biometric}
              onValueChange={(v) => patchSettings({ biometric: v })}
              trackColor={{ true: theme.success, false: theme.border }}
              thumbColor="#fff"
            />
          </View>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 14 }} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pill label="AES-256" color={theme.success} icon="lock-closed" />
            <Pill label="SecureStore" color={theme.info} />
            <Pill label="RLS" color={theme.primary} />
          </View>
        </Card>

        <SectionHeader title={t('pro_l')} icon="star" />
        <Card style={{ borderColor: theme.gold }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ color: theme.text, fontWeight: '900', fontSize: 15, flex: 1 }}>Korea Migration Pro</Text>
            <Pill label={settings.pro ? t('verified_badge') : '$4.99/mo'} color={theme.gold} />
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 10, lineHeight: 18 }}>{t('pro_desc')}</Text>
          <View style={{ height: 14 }} />
          <Button
            title={settings.pro ? t('verified_badge') : t('upgrade_pro')}
            variant={settings.pro ? 'secondary' : 'gold'}
            icon={settings.pro ? 'checkmark-circle' : 'star'}
            onPress={() => patchSettings({ pro: !settings.pro })}
          />
        </Card>

        <SectionHeader title={t('about_l')} icon="information-circle" />
        <Card>
          <Row label={t('idea_credit')} value="Perplexity Nemotron 3 Ultra" />
          <Row label={t('dev_credit')} value="Moe Kyaw Aung" />
          <Row label="Stack" value="Kotlin · Compose · AI/ML · Firebase · CI/CD" />
          <Row label="GitHub" value="github.com/Dev-moe-kyawaung" onPress={() => Linking.openURL('https://github.com/Dev-moe-kyawaung/').catch(() => {})} />
          <Row label="Location" value="Tachileik 🇲🇲 ↔ Bangkok 🇹🇭" />
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 12 }} />
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            <Pill label={`📚 ${progress.totalAnswers} Q`} color={theme.primary} />
            <Pill label={`${t('version')} 1.0.0`} color={theme.textFaint} />
          </View>
        </Card>

        <SectionHeader title={t('privacy_l')} icon="shield-checkmark" />
        <Card style={{ backgroundColor: theme.surfaceAlt }}>
          <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>{t('privacy_d')}</Text>
        </Card>

        <SectionHeader title={t('reset_l')} icon="trash" />
        <Button title={t('reset_l')} icon="trash" variant="danger" onPress={confirmReset} />
        <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 10, lineHeight: 16 }}>{t('reset_d')}</Text>
      </ScrollView>
    </Screen>
  );
}

function Row({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
      <Text style={{ color: theme.textDim, fontSize: 12.5, width: 110 }}>{label}</Text>
      <Text
        onPress={onPress}
        style={{ color: onPress ? theme.primary : theme.text, fontSize: 12.5, fontWeight: '700', flex: 1, textDecorationLine: onPress ? 'underline' : 'none' }}
      >
        {value}
      </Text>
    </View>
  );
}
