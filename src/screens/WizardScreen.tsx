import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Icon, Pill, Screen } from '../components/ui';
import { VISA_LIST, WIZARD_QUESTIONS, visaName } from '../data/visas';
import { scoreVisas } from '../lib/match';
import { Nav } from '../navigation';

const QUESTIONS = [
  { titleKey: 'goal', options: WIZARD_QUESTIONS[0].options },
  { titleKey: 'status_label', options: WIZARD_QUESTIONS[1].options },
  { titleKey: 'korean_label', options: WIZARD_QUESTIONS[2].options },
  { titleKey: 'age_label', options: WIZARD_QUESTIONS[3].options },
  { titleKey: 'priority', options: WIZARD_QUESTIONS[4].options },
];
const KEYS = ['goal', 'status', 'korean', 'age', 'priority'];

export default function WizardScreen({ navigation }: { navigation: Nav }) {
  const { t, lang } = useApp();
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => (showResults ? scoreVisas(answers) : []), [showResults, answers]);
  const top = results.slice(0, 4);

  const pick = (value: string) => {
    const key = KEYS[step];
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step === QUESTIONS.length - 1) setShowResults(true);
    else setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: '900', marginTop: 8 }}>{t('results_title')}</Text>
          <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 6, marginBottom: 18 }}>{t('visa_wizard_desc')}</Text>

          {top.map((m, i) => (
            <Animated.View key={m.visa.id} entering={FadeInDown.delay(i * 100).duration(420)}>
              <Card style={{ marginBottom: 12, borderColor: i === 0 ? m.visa.color : theme.border }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${m.visa.color}2E`, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={m.visa.icon} size={20} color={m.visa.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '900', fontSize: 15.5 }}>{m.visa.code} · {visaName(m.visa, lang)}</Text>
                    <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }}>{m.visa.tagline[lang]}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: m.visa.color, fontWeight: '900', fontSize: 19 }}>{m.score}</Text>
                    <Text style={{ color: theme.textFaint, fontSize: 10 }}>{t('match')}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 12 }}>
                  <Bar value={m.score / 100} color={m.visa.color} />
                </View>
                {m.reasons.length > 0 && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ color: theme.textFaint, fontSize: 10.5, fontWeight: '800', textTransform: 'uppercase', marginBottom: 8 }}>{t('why_match')}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
                      {m.reasons.map((r) => (
                        <Pill key={r} label={t(r)} color={m.visa.color} />
                      ))}
                    </View>
                  </View>
                )}
                <View style={{ height: 12 }} />
                <Button
                  title={`${m.visa.code} →`}
                  variant={i === 0 ? 'primary' : 'secondary'}
                  small
                  onPress={() => navigation.navigate('VisaDetail', { id: m.visa.id })}
                />
              </Card>
            </Animated.View>
          ))}

          <Card style={{ marginTop: 6, backgroundColor: theme.surfaceAlt }}>
            <Text style={{ color: theme.textDim, fontSize: 12, lineHeight: 18 }}>{t('est')}</Text>
          </Card>

          <View style={{ height: 14 }} />
          <Button title={t('retry')} icon="refresh" variant="ghost" onPress={restart} />
          <View style={{ height: 10 }} />
          <Button title={t('done')} icon="checkmark" onPress={() => navigation.goBack()} />
        </ScrollView>
      </Screen>
    );
  }

  const q = QUESTIONS[step];
  const selected = answers[KEYS[step]];

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <Pressable onPress={() => (step === 0 ? navigation.goBack() : setStep((s) => s - 1))} hitSlop={10}>
            <Icon name="arrow-back" size={22} color={theme.text} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Bar value={(step + 1) / QUESTIONS.length} />
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12, fontWeight: '700' }}>{step + 1}/{QUESTIONS.length}</Text>
        </View>

        <Animated.View key={step} entering={FadeInDown.duration(280)}>
          <Text style={{ color: theme.text, fontSize: 22, fontWeight: '900', marginTop: 22, lineHeight: 30 }}>{t(q.titleKey)}</Text>
          <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 6, marginBottom: 18 }}>{t('visa_wizard_desc')}</Text>

          {q.options.map((opt) => (
            <Pressable key={opt} onPress={() => pick(opt)} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: selected === opt ? theme.primary : theme.border,
                  backgroundColor: selected === opt ? theme.primarySoft : theme.card,
                }}
              >
                <View style={{ width: 32, height: 32, borderRadius: 11, backgroundColor: selected === opt ? theme.primary : theme.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={selected === opt ? 'checkmark' : 'ellipse-outline'} size={15} color={selected === opt ? '#fff' : theme.textFaint} />
                </View>
                <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: selected === opt ? '800' : '600', flex: 1 }}>{t(opt)}</Text>
              </View>
            </Pressable>
          ))}

          {step === 2 && (
            <Card style={{ marginTop: 8, backgroundColor: theme.surfaceAlt }}>
              <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18 }}>{t('topik_target')}</Text>
            </Card>
          )}
          {step === 0 && (
            <Card style={{ marginTop: 8, backgroundColor: theme.surfaceAlt }}>
              <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18 }}>
                {VISA_LIST.length} {t('visa_matrix').toLowerCase()} · {t('offline_badge')}
              </Text>
            </Card>
          )}
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}
