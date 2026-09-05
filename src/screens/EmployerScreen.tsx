import React, { useMemo, useState } from 'react';
import { ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { BLACKLIST } from '../data/community';

/** Contract-analyzer rule engine: each missing protection adds risk weight. */
const RISK_ITEMS: { key: string; weight: number }[] = [
  { key: 'rc_contract', weight: 8 },
  { key: 'rc_wage', weight: 14 },
  { key: 'rc_passport', weight: 20 },
  { key: 'rc_fee', weight: 22 },
  { key: 'rc_arc', weight: 8 },
  { key: 'rc_payslip', weight: 10 },
  { key: 'rc_insurance', weight: 8 },
  { key: 'rc_overtime', weight: 5 },
  { key: 'rc_hours', weight: 5 },
  { key: 'rc_broker', weight: 12 },
];

export default function EmployerScreen() {
  const { t, addReport, state } = useApp();
  const theme = useTheme();
  const [company, setCompany] = useState('');
  const [answers, setAnswers] = useState<Record<string, boolean>>(
    Object.fromEntries(RISK_ITEMS.map((r) => [r.key, true]))
  );

  const failed = RISK_ITEMS.filter((r) => !answers[r.key]);
  const baseScore = failed.reduce((sum, r) => sum + r.weight, 0);

  const matches = useMemo(() => {
    const name = company.trim().toLowerCase();
    if (!name) return [];
    return BLACKLIST.filter((b) => {
      const c = b.company.toLowerCase().replace(/\*/g, '');
      return c.length > 2 && (name.includes(c.slice(0, 4)) || c.includes(name.slice(0, 4)));
    });
  }, [company]);

  const matchDelta = matches.reduce((s, m) => s + (m.status === 'confirmed' ? m.riskDelta : Math.round(m.riskDelta / 2)), 0);
  const score = Math.min(100, baseScore + matchDelta);
  const level = score >= 60 ? 'high' : score >= 30 ? 'med' : 'low';
  const color = level === 'high' ? theme.danger : level === 'med' ? theme.warn : theme.success;
  const levelLabel = level === 'high' ? t('risk_high') : level === 'med' ? t('risk_med') : t('risk_low');

  const submit = () => {
    addReport(company.trim() || 'Unknown', failed[0]?.key ?? 'general');
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
        <SectionHeader title={t('analyzer_title')} subtitle={t('analyzer_sub')} icon="analytics" />

        <Card>
          <Text style={{ color: theme.textDim, fontSize: 12, marginBottom: 8 }}>{t('employer_name')}</Text>
          <TextInput
            value={company}
            onChangeText={setCompany}
            placeholder="H** Metal Works / broker name"
            placeholderTextColor={theme.textFaint}
            returnKeyType="search"
            style={{ backgroundColor: theme.surfaceAlt, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: theme.text, fontSize: 15 }}
          />
        </Card>

        <SectionHeader title={t('risk_score')} icon="speedometer" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color, fontSize: 34, fontWeight: '900' }}>{score}</Text>
            <Pill label={levelLabel} color={color} icon={level === 'high' ? 'flame' : level === 'med' ? 'warning' : 'shield-checkmark'} />
          </View>
          <View style={{ height: 12, marginTop: 12 }}>
            <Bar value={score / 100} color={color} height={12} />
          </View>
          <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 10 }}>
            {t('red_flags_l')}: {failed.length}/{RISK_ITEMS.length}
          </Text>
        </Card>

        <SectionHeader title={t('analyze')} icon="list" />
        <Card>
          {RISK_ITEMS.map((r) => (
            <View
              key={r.key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 11,
                borderTopWidth: RISK_ITEMS[0].key === r.key ? 0 : 1,
                borderTopColor: theme.border,
              }}
            >
              <Icon
                name={answers[r.key] ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={answers[r.key] ? theme.success : theme.danger}
              />
              <Text style={{ color: theme.text, fontSize: 13.5, flex: 1 }}>{t(r.key)}</Text>
              <Text style={{ color: theme.textFaint, fontSize: 11 }}>+{r.weight}</Text>
              <Switch
                value={answers[r.key]}
                onValueChange={(v) => setAnswers((a) => ({ ...a, [r.key]: v }))}
                trackColor={{ true: theme.success, false: theme.border }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </Card>

        {failed.length > 0 && (
          <>
            <SectionHeader title={t('red_flags_l')} icon="flag" />
            {failed.map((f) => (
              <Card key={f.key} style={{ marginBottom: 8, borderColor: `${theme.danger}55` }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Icon name="alert-circle" size={17} color={theme.danger} />
                  <Text style={{ color: theme.text, fontSize: 13, flex: 1, lineHeight: 19 }}>{t(f.key)}</Text>
                </View>
              </Card>
            ))}
          </>
        )}

        {matches.length > 0 && (
          <>
            <SectionHeader title={t('reports_l')} icon="document-attach" />
            {matches.map((m) => (
              <Card key={m.id} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Pill label={m.status.toUpperCase()} color={m.status === 'confirmed' ? theme.danger : theme.warn} />
                  <Text style={{ color: theme.textDim, fontSize: 11.5 }}>{m.date}</Text>
                </View>
                <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14, marginTop: 10 }}>{m.company}</Text>
                <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 6, lineHeight: 18 }}>{m.summary}</Text>
              </Card>
            ))}
          </>
        )}

        <View style={{ height: 12 }} />
        <Button title={t('submit_report')} icon="cloud-upload" onPress={submit} disabled={!company.trim()} />
        <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 10, lineHeight: 16 }}>{t('report_saved')}</Text>
        {state.reports.length > 0 && (
          <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 10 }}>
            {t('submit_report')}: {state.reports.length}
          </Text>
        )}
      </ScrollView>
    </Screen>
  );
}
