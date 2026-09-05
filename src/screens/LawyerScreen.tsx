import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Fact, Icon, Pill, Screen, SectionHeader, StatTile } from '../components/ui';
import { LAWYERS } from '../data/community';
import { Nav } from '../navigation';

export default function LawyerScreen({ route }: { route: { params: { id: string } }; navigation: Nav }) {
  const { t, settings, patchSettings } = useApp();
  const theme = useTheme();
  const lawyer = LAWYERS.find((l) => l.id === route.params.id) ?? LAWYERS[0];

  const startChat = () => {
    if (!settings.pro) {
      Alert.alert(t('chat_locked'), t('pro_desc'));
      return;
    }
    Alert.alert(lawyer.name, `${t('response')}: ${lawyer.response}`);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 60, height: 60, borderRadius: 20, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: theme.primary, fontWeight: '900', fontSize: 22 }}>{lawyer.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>{lawyer.name}</Text>
              <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 4 }}>{lawyer.region}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <Pill label={t('verified_badge')} color={theme.success} icon="checkmark-circle" />
                <Pill label={lawyer.response} color={theme.info} icon="time" />
              </View>
            </View>
          </View>
          <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 16, lineHeight: 20 }}>{lawyer.bio}</Text>
        </Card>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <StatTile icon="people" label={t('reports_l')} value={`${lawyer.cases}`} />
          <StatTile icon="cash" label={t('consult_from')} value={lawyer.fee.split(' ')[0]} color={theme.gold} />
        </View>

        <SectionHeader title={t('specialties')} icon="ribbon" />
        <Card>
          {lawyer.specialties.map((s, i) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: theme.border }}>
              <Icon name="checkmark-circle" size={17} color={theme.success} />
              <Text style={{ color: theme.text, fontSize: 13.5, flex: 1 }}>{s}</Text>
            </View>
          ))}
        </Card>

        <SectionHeader title={t('language_l')} icon="language" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {lawyer.langs.map((l) => (
            <Pill key={l} label={l} color={theme.primary} />
          ))}
        </View>

        <SectionHeader title={t('pro_l')} icon="star" />
        <Card style={{ borderColor: settings.pro ? theme.success : theme.gold }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Icon name={settings.pro ? 'checkmark-circle' : 'lock-open'} size={20} color={settings.pro ? theme.success : theme.gold} />
            <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14.5, flex: 1 }}>
              {settings.pro ? t('verified_badge') : t('chat_locked')}
            </Text>
            {!settings.pro ? <Pill label={t('pro_badge')} color={theme.gold} /> : null}
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 10, lineHeight: 18 }}>{t('pro_desc')}</Text>
          <View style={{ height: 14 }} />
          <Button
            title={settings.pro ? t('chat_locked') : t('upgrade_pro')}
            variant={settings.pro ? 'secondary' : 'gold'}
            icon={settings.pro ? 'chatbubbles' : 'star'}
            onPress={startChat}
          />
          {!settings.pro ? (
            <>
              <View style={{ height: 10 }} />
              <Button title="Preview Pro (demo)" variant="ghost" small onPress={() => patchSettings({ pro: true })} />
            </>
          ) : null}
        </Card>
      </ScrollView>
    </Screen>
  );
}
