import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Chip, Fact, Hero, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { F5_INCOME_THRESHOLD, F5_SOURCE_NOTE, calculate, remittancePlan } from '../lib/salary';

const fmtKRW = (n: number) => `₩${Math.round(n).toLocaleString('en-US')}`;
const fmtMMK = (n: number) => `${Math.round(n).toLocaleString('en-US')} K`;

export default function MoneyScreen() {
  const { t } = useApp();
  const theme = useTheme();
  const [gross, setGross] = useState('2400000');
  const [dependents, setDependents] = useState(2);
  const [small, setSmall] = useState(false);
  const [rate, setRate] = useState('1.49');
  const [share, setShare] = useState(0.6);
  const [annual, setAnnual] = useState(false);

  const grossNum = Number(gross.replace(/[^0-9.]/g, '')) || 0;
  const rateNum = Number(rate.replace(/[^0-9.]/g, '')) || 1.49;
  const result = useMemo(() => calculate({ monthlyGross: grossNum, dependents, smallWorkplace: small }), [grossNum, dependents, small]);
  const plan = useMemo(() => remittancePlan(result.monthlyNet, share, rateNum), [result.monthlyNet, share, rateNum]);

  const f5Progress = Math.min(1, result.f5Progress);
  const monthsNeeded = grossNum > 0 ? Math.ceil(result.f5Gap / grossNum) : 0;

  const ded = [
    { key: 'pension_l', value: result.pension, color: theme.primary },
    { key: 'health_l', value: result.health, color: theme.info },
    { key: 'employ_l', value: result.employment, color: theme.gold },
    { key: 'income_tax_l', value: result.incomeTax, color: theme.accent },
    { key: 'local_tax_l', value: result.localTax, color: theme.warn },
  ];
  const maxDed = Math.max(1, ...ded.map((d) => d.value));

  return (
    <Screen>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
            <Hero
              icon="cash"
              title={t('money_hero')}
              subtitle={t('money_sub')}
              badges={['KRW ↔ MMK', '4대보험']}
              colors={['#12935C', '#0E7FA8']}
            />

            <SectionHeader title={t('monthly_gross')} icon="wallet" />
            <Card>
              <Text style={{ color: theme.textDim, fontSize: 12, marginBottom: 8 }}>{t('monthly_gross')}</Text>
              <TextInput
                value={gross}
                onChangeText={setGross}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder="2400000"
                placeholderTextColor={theme.textFaint}
                style={{ backgroundColor: theme.surfaceAlt, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: theme.text, fontSize: 20, fontWeight: '800' }}
              />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                {['1800000', '2400000', '3000000', '4000000'].map((v) => (
                  <Chip key={v} label={`${Number(v) / 1000000}M`} active={gross === v} onPress={() => setGross(v)} small />
                ))}
              </View>

              <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 18, marginBottom: 8 }}>{t('dependents')}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <Chip label="−" small onPress={() => setDependents((d) => Math.max(1, d - 1))} />
                <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900', minWidth: 30, textAlign: 'center' }}>{dependents}</Text>
                <Chip label="+" small onPress={() => setDependents((d) => Math.min(8, d + 1))} />
                <View style={{ flex: 1 }} />
                <Chip label={small ? t('yes') : t('no')} active={small} color={theme.gold} small onPress={() => setSmall((s) => !s)} />
              </View>
              <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 8 }}>
                {small ? '고용보험 0.7%' : '고용보험 0.9%'}
              </Text>
            </Card>

            <SectionHeader title={t('net_pay')} icon="trending-down" />
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: theme.textDim, fontSize: 12 }}>{annual ? 'Net / year' : 'Net / month'}</Text>
                  <Text style={{ color: theme.success, fontSize: 26, fontWeight: '900', marginTop: 4 }}>
                    {fmtKRW(annual ? result.annualNet : result.monthlyNet)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Chip label="M" active={!annual} onPress={() => setAnnual(false)} small />
                  <Chip label="Y" active={annual} onPress={() => setAnnual(true)} small />
                </View>
              </View>
              <View style={{ height: 14 }} />
              <Bar value={1 - result.effectiveRate} color={theme.success} />
              <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 8 }}>
                {t('breakdown')}: {(result.effectiveRate * 100).toFixed(1)}% · {fmtKRW(result.totalDeductions)}
              </Text>

              <View style={{ height: 16 }} />
              {ded.map((d) => (
                <View key={d.key} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ color: theme.textDim, fontSize: 12.5 }}>{t(d.key)}</Text>
                    <Text style={{ color: theme.text, fontSize: 12.5, fontWeight: '700' }}>{fmtKRW(d.value)}</Text>
                  </View>
                  <Bar value={d.value / maxDed} color={d.color} height={6} />
                </View>
              ))}

              <View style={{ height: 6 }} />
              <Fact label={t('employer_cost')} value={`${fmtKRW(result.employerMonthlyCost)} / month`} color={theme.gold} />
            </Card>

            <SectionHeader title={t('f5_tracker')} icon="home" />
            <Card>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: theme.textDim, fontSize: 12.5 }}>{t('f5_threshold_l')}</Text>
                <Pill label={fmtKRW(F5_INCOME_THRESHOLD)} color={theme.accent} />
              </View>
              <View style={{ height: 12 }} />
              <Bar value={f5Progress} color={f5Progress >= 1 ? theme.success : theme.accent} height={10} />
              <Text style={{ color: theme.text, fontSize: 13, fontWeight: '800', marginTop: 10 }}>
                {(result.f5Progress * 100).toFixed(0)}% · {fmtKRW(result.annualGross)}
              </Text>
              <Text style={{ color: result.f5Gap > 0 ? theme.warn : theme.success, fontSize: 12.5, marginTop: 6, lineHeight: 18 }}>
                {result.f5Gap > 0
                  ? `${t('f5_off')}: ${fmtKRW(result.f5Gap)}${monthsNeeded > 0 ? ` · ${monthsNeeded} ${t('months')}` : ''}`
                  : t('f5_on')}
              </Text>
              <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 10 }}>{F5_SOURCE_NOTE}</Text>
            </Card>

            <SectionHeader title={t('remittance')} icon="swap-horizontal" />
            <Card>
              <Text style={{ color: theme.textDim, fontSize: 12, marginBottom: 8 }}>{t('exchange_rate_l')}</Text>
              <TextInput
                value={rate}
                onChangeText={setRate}
                keyboardType="decimal-pad"
                returnKeyType="done"
                placeholder="1.49"
                placeholderTextColor={theme.textFaint}
                style={{ backgroundColor: theme.surfaceAlt, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: theme.text, fontSize: 17, fontWeight: '800' }}
              />
              <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 8 }}>{t('rate_hint')}</Text>

              <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 18, marginBottom: 8 }}>{t('send_pct')}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[0.25, 0.5, 0.6, 0.8].map((p) => (
                  <Chip key={p} label={`${Math.round(p * 100)}%`} active={share === p} onPress={() => setShare(p)} small color={theme.success} />
                ))}
              </View>

              <View style={{ height: 16 }} />
              <View style={{ backgroundColor: theme.successSoft, borderRadius: 14, padding: 14 }}>
                <Text style={{ color: theme.success, fontSize: 11.5, fontWeight: '900', letterSpacing: 0.6 }}>{t('best_channel')}</Text>
                <Text style={{ color: theme.text, fontSize: 16, fontWeight: '900', marginTop: 6 }}>{plan.best.channel.name}</Text>
                <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 4 }}>
                  {fmtKRW(plan.amount)} → <Text style={{ color: theme.success, fontWeight: '900' }}>{fmtMMK(plan.best.delivered)}</Text>
                </Text>
                <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 4 }}>
                  {(plan.best.channel.feePct * 100).toFixed(1)}% · {plan.best.channel.speed} · {t('annual_view')}: +{fmtMMK(plan.annualSavingsMMK)}
                </Text>
              </View>

              <View style={{ height: 12 }} />
              {plan.options.map((o) => (
                <View key={o.channel.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: theme.border }}>
                  <Icon name={o.channel.id === plan.best.channel.id ? 'radio-button-on' : 'radio-button-off'} size={17} color={o.channel.id === plan.best.channel.id ? theme.success : theme.textFaint} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '700' }}>{o.channel.name}</Text>
                    <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 2 }}>{(o.channel.feePct * 100).toFixed(1)}% · {o.channel.speed}</Text>
                  </View>
                  <Text style={{ color: theme.text, fontSize: 13, fontWeight: '800' }}>{fmtMMK(o.delivered)}</Text>
                </View>
              ))}
            </Card>

            <Card style={{ marginTop: 14, backgroundColor: theme.surfaceAlt }}>
              <Text style={{ color: theme.textDim, fontSize: 11.5, lineHeight: 17 }}>{t('est')}</Text>
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}
