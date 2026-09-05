import React, { useState } from 'react';
import { Alert, Linking, ScrollView, Share, Switch, Text, TextInput, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { HOTLINES } from '../data/community';
import { getVisa } from '../data/visas';
import { todayISO } from '../lib/dates';

export default function SosScreen() {
  const { t, profile, state } = useApp();
  const theme = useTheme();
  const [includeStatus, setIncludeStatus] = useState(true);
  const [includeLoc, setIncludeLoc] = useState(true);
  const [loc, setLoc] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const urgentDocs = state.docs
    .filter((d) => d.expiry)
    .map((d) => ({ d, days: Math.round((new Date(d.expiry as string).getTime() - Date.now()) / 86400000) }))
    .filter((x) => x.days <= 30)
    .map((x) => `${t(x.d.type)} (${x.days < 0 ? t('overdue') : x.days + t('days')})`);

  const build = () => {
    const lines: string[] = [];
    lines.push('🆘 SOS — HELP NEEDED');
    lines.push(`Date: ${todayISO(0)}`);
    if (profile.name) lines.push(`Name: ${profile.name}`);
    if (includeStatus) {
      const visa = profile.goal ? getVisa('E9') : null;
      lines.push(`Status: ${profile.status ? t(profile.status) : 'unknown'}${visa ? ` · planned: ${visa.code}` : ''}`);
      const arc = state.docs.find((d) => d.type === 'arc');
      if (arc) lines.push('ARC: ****-****** (masked)');
    }
    if (includeLoc) lines.push(`Location: ${loc.trim() || t('not_loc')}`);
    if (urgentDocs.length > 0) lines.push(`Urgent documents: ${urgentDocs.join(', ')}`);
    lines.push('— sent via Korea Migration Companion');
    setMessage(lines.join('\n'));
  };

  const shareMsg = async () => {
    const text = message ?? '';
    try {
      await Share.share({ message: text });
      Alert.alert(t('sos_copied'));
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  };

  const call = (num: string) => {
    const cleaned = num.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleaned}`).catch(() => Alert.alert(num, t('hotline')));
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
        <SectionHeader title={t('sos_title')} subtitle={t('sos_desc')} icon="megaphone" />

        <Card style={{ borderColor: `${theme.danger}66` }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 15, backgroundColor: theme.dangerSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="warning" size={22} color={theme.danger} />
            </View>
            <Text style={{ color: theme.text, fontSize: 13, flex: 1, lineHeight: 19 }}>{t('not_loc')}</Text>
          </View>
        </Card>

        <SectionHeader title={t('include_status')} icon="options" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 }}>
            <Icon name="card" size={19} color={theme.primary} />
            <Text style={{ color: theme.text, fontSize: 13.5, flex: 1 }}>{t('include_status')}</Text>
            <Switch value={includeStatus} onValueChange={setIncludeStatus} trackColor={{ true: theme.primary, false: theme.border }} thumbColor="#fff" />
          </View>
          <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 10 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Icon name="location" size={19} color={theme.accent} />
            <Text style={{ color: theme.text, fontSize: 13.5, flex: 1 }}>{t('include_loc')}</Text>
            <Switch value={includeLoc} onValueChange={setIncludeLoc} trackColor={{ true: theme.accent, false: theme.border }} thumbColor="#fff" />
          </View>
          {includeLoc && (
            <>
              <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 14, marginBottom: 8 }}>{t('loc_note')}</Text>
              <TextInput
                value={loc}
                onChangeText={setLoc}
                placeholder={t('loc_placeholder')}
                placeholderTextColor={theme.textFaint}
                returnKeyType="done"
                style={{ backgroundColor: theme.surfaceAlt, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: theme.text, fontSize: 14.5 }}
              />
            </>
          )}
        </Card>

        <View style={{ height: 14 }} />
        <Button title={t('gen_sos')} icon="create" variant="danger" onPress={build} />

        {message ? (
          <Card style={{ marginTop: 14 }}>
            <Text style={{ color: theme.textFaint, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 10 }}>SOS</Text>
            <Text style={{ color: theme.text, fontSize: 13, lineHeight: 20 }}>{message}</Text>
            <View style={{ height: 14 }} />
            <Button title={t('sos_copy')} icon="copy" onPress={shareMsg} />
          </Card>
        ) : null}

        <SectionHeader title={t('hotline')} subtitle="24/7" icon="call" />
        {HOTLINES.map((h) => (
          <Card key={h.id} style={{ marginBottom: 10 }} onPress={() => call(h.number)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: theme.successSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="call" size={19} color={theme.success} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14 }}>{h.name}</Text>
                  <Pill label={h.number} color={theme.primary} />
                </View>
                <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 4, lineHeight: 16 }}>{h.note}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}
