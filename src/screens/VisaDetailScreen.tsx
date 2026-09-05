import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Chip, Fact, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { getVisa, visaName } from '../data/visas';
import { Nav } from '../navigation';

export default function VisaDetailScreen({ route, navigation }: { route: { params: { id: string } }; navigation: Nav }) {
  const { t, lang, state, toggleCheck } = useApp();
  const theme = useTheme();
  const visa = getVisa(route.params.id);

  if (!visa) {
    return (
      <Screen>
        <Text style={{ color: theme.text, padding: 24 }}>Not found</Text>
      </Screen>
    );
  }

  const done = state.checklist[visa.id] ?? [];
  const mandatory = visa.checklist.filter((c) => c.mandatory);
  const mandatoryDone = mandatory.filter((c) => done.includes(c.id)).length;
  const progress = mandatory.length ? mandatoryDone / mandatory.length : 0;

  const buildPacket = () => {
    const ready = visa.checklist.filter((c) => done.includes(c.id)).length;
    Alert.alert(t('share_packet'), `${t('packet_ready')}

${ready}/${visa.checklist.length} ${t('docs_needed')}`);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <Card style={{ borderColor: `${visa.color}66` }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 52, height: 52, borderRadius: 17, backgroundColor: `${visa.color}2E`, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={visa.icon} size={25} color={visa.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: visa.color, fontWeight: '900', fontSize: 18 }}>{visa.code}</Text>
              <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '700', marginTop: 2 }}>{visaName(visa, lang)}</Text>
            </View>
            <Pill label={visa.audience === 'new' ? t('new_tab') : visa.audience === 'in-korea' ? t('in_korea_tab') : t('all')} color={visa.color} />
          </View>
          <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 14, lineHeight: 20 }}>{visa.tagline[lang]}</Text>
        </Card>

        <SectionHeader title={t('reqs')} icon="list" />
        <Card>
          <Fact label={t('stay_len')} value={visa.stay} />
          <Fact label={t('work_ok')} value={visa.work} />
          <Fact label={t('sponsor')} value={visa.sponsor} />
          <Fact label={t('korean_req')} value={visa.koreanReq} />
          <Fact label={t('income_floor')} value={visa.incomeFloor} />
          <Fact label={t('family_ok')} value={visa.family} />
          <Fact label={t('path_f5')} value={visa.pathF5} />
          <Fact label={t('processing')} value={visa.processing} />
          <Fact label={t('quota')} value={visa.quota} />
        </Card>

        <SectionHeader title={t('reqs')} subtitle={t('visa_matrix')} icon="documents" />
        {visa.requirements.map((r, i) => (
          <View key={r} style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <View style={{ width: 26, height: 26, borderRadius: 9, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: theme.primary, fontWeight: '900', fontSize: 12 }}>{i + 1}</Text>
            </View>
            <Text style={{ color: theme.text, fontSize: 13.5, flex: 1, lineHeight: 20 }}>{r}</Text>
          </View>
        ))}

        <SectionHeader title={t('risk_note')} icon="warning" />
        {visa.risks.map((r) => (
          <Card key={r} style={{ marginBottom: 10, borderColor: `${theme.danger}55` }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Icon name="alert-circle" size={18} color={theme.danger} />
              <Text style={{ color: theme.text, fontSize: 13, flex: 1, lineHeight: 19 }}>{r}</Text>
            </View>
          </Card>
        ))}

        <SectionHeader title={t('docs_needed')} subtitle={`${mandatoryDone}/${mandatory.length} ${t('complete')}`} icon="folder-open" />
        <Card>
          <View style={{ marginBottom: 14 }}>
            <Bar value={progress} color={progress >= 1 ? theme.success : theme.primary} />
            <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 8 }}>
              {Math.round(progress * 100)}% · {t('missing')}: {visa.checklist.length - done.length}
            </Text>
          </View>
          {visa.checklist.map((c) => {
            const checked = done.includes(c.id);
            return (
              <View
                key={c.id}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderTopWidth: 1, borderTopColor: theme.border }}
              >
                <Icon
                  name={checked ? 'checkbox' : 'square-outline'}
                  size={20}
                  color={checked ? theme.success : theme.textFaint}
                />
                <Text style={{ color: theme.text, fontSize: 13.5, flex: 1, textDecorationLine: checked ? 'line-through' : 'none' }}>
                  {t(c.id)}
                </Text>
                {c.mandatory ? <Chip label="*" active small color={theme.accent} /> : null}
              </View>
            );
          })}
          <View style={{ height: 14 }} />
          <Button title={t('share_packet')} icon="share" variant="secondary" onPress={buildPacket} />
          <View style={{ height: 10 }} />
          <Button title={t('add_doc')} icon="add" onPress={() => navigation.navigate('AddDoc')} />
        </Card>

        <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 16, lineHeight: 16 }}>{t('official_link')} · {t('est')}</Text>
      </ScrollView>
    </Screen>
  );
}
