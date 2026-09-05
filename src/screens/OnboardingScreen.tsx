import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Chip, Icon, Screen, SectionHeader } from '../components/ui';
import { topMatches } from '../lib/match';
import { visaName } from '../data/visas';
import { Nav } from '../navigation';

const STEPS = ['goal', 'status', 'korean', 'profile', 'consent'] as const;

const GOALS = ['goal_work_factory', 'goal_seasonal', 'goal_professional', 'goal_study_korean', 'goal_settle', 'goal_family', 'goal_holiday'];
const STATUSES = ['status_myanmar', 'status_korea', 'status_third'];
const LEVELS = ['kl_none', 'kl_basic', 'kl_topik2', 'kl_topik3'];
const AGES = ['age_under27', 'age_27_39', 'age_over39'];

export default function OnboardingScreen({ navigation }: { navigation: Nav }) {
  const { t, lang, profile, saveProfile } = useApp();
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(profile.goal);
  const [status, setStatus] = useState<string | null>(profile.status);
  const [korean, setKorean] = useState<string | null>(profile.korean);
  const [age, setAge] = useState<string | null>(null);
  const [name, setName] = useState(profile.name);
  const [done, setDone] = useState(false);

  const answers = useMemo(
    () => ({ goal: goal ?? '', status: status ?? '', korean: korean ?? '', age: age ?? '', priority: 'priority_permanence' }),
    [goal, status, korean, age]
  );
  const matches = useMemo(() => topMatches(answers, 0, 3), [answers]);

  const finish = () => {
    saveProfile({ goal, status, korean, age: age ?? '', name, onboarded: true });
    navigation.replace('Main');
  };

  const titles = [t('goal'), t('status_label'), t('korean_label'), t('age_label'), t('consent_title')];

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={{ paddingHorizontal: 20, paddingTop: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {step > 0 && !done ? (
            <Pressable onPress={() => setStep((s) => Math.max(0, s - 1))} hitSlop={10}>
              <Icon name="arrow-back" size={22} color={theme.text} />
            </Pressable>
          ) : (
            <View style={{ width: 22 }} />
          )}
          <View style={{ flex: 1, height: 6, borderRadius: 999, backgroundColor: theme.surfaceAlt, overflow: 'hidden' }}>
            <View style={{ width: `${((done ? 5 : step + 1) / 5) * 100}%`, height: 6, backgroundColor: theme.primary }} />
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12, fontWeight: '700' }}>{done ? '✓' : `${step + 1}/5`}</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          {done ? (
            <Animated.View entering={FadeIn.duration(320)}>
              <Text style={{ color: theme.text, fontSize: 25, fontWeight: '900', marginTop: 12 }}>{t('onb_done')}</Text>
              <Text style={{ color: theme.textDim, fontSize: 14, marginTop: 8, lineHeight: 21 }}>{t('onb_reco')}</Text>
              {matches.map((m, i) => (
                <Animated.View key={m.visa.id} entering={FadeInDown.delay(120 * i).duration(420)}>
                  <Card style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ width: 40, height: 40, borderRadius: 13, backgroundColor: `${m.visa.color}2E`, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={m.visa.icon} size={19} color={m.visa.color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: theme.text, fontWeight: '800', fontSize: 15 }}>{m.visa.code} · {visaName(m.visa, lang)}</Text>
                        <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }}>{m.visa.tagline.en}</Text>
                      </View>
                      <Text style={{ color: m.visa.color, fontWeight: '900', fontSize: 16 }}>{m.score}%</Text>
                    </View>
                  </Card>
                </Animated.View>
              ))}
              <View style={{ marginTop: 24 }}>
                <Button title={t('consent_accept')} icon="rocket" onPress={finish} />
              </View>
            </Animated.View>
          ) : (
            <Animated.View key={step} entering={FadeInDown.duration(300)}>
              <Text style={{ color: theme.text, fontSize: 24, fontWeight: '900', marginTop: 14, lineHeight: 32 }}>{titles[step]}</Text>
              <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 8, marginBottom: 18, lineHeight: 19 }}>{t('onb_tagline')}</Text>

              {step === 0 && GOALS.map((g) => (
                <SelectableRow key={g} label={t(g)} selected={goal === g} onPress={() => setGoal(g)} icon="flag" />
              ))}

              {step === 1 && STATUSES.map((s) => (
                <SelectableRow key={s} label={t(s)} selected={status === s} onPress={() => setStatus(s)} icon="location" />
              ))}

              {step === 2 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {LEVELS.map((l) => (
                    <Chip key={l} label={t(l)} active={korean === l} onPress={() => setKorean(l)} color={theme.primary} />
                  ))}
                  <View style={{ alignSelf: 'stretch', marginTop: 12 }}>
                    <Card style={{ backgroundColor: theme.surfaceAlt }}>
                      <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>{t('topik_target')}</Text>
                    </Card>
                  </View>
                </View>
              )}

              {step === 3 && (
                <View>
                  <Text style={{ color: theme.textDim, fontSize: 12.5, marginBottom: 10 }}>{t('age_label')}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                    {AGES.map((a) => (
                      <Chip key={a} label={t(a)} active={age === a} onPress={() => setAge(a)} color={theme.accent} />
                    ))}
                  </View>
                  <Text style={{ color: theme.textDim, fontSize: 12.5, marginBottom: 10 }}>{t('onb_name')}</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Ko Naing"
                    placeholderTextColor={theme.textFaint}
                    style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, color: theme.text, fontSize: 15 }}
                    returnKeyType="done"
                  />
                </View>
              )}

              {step === 4 && (
                <View>
                  <Card>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <Icon name="lock-closed" size={20} color={theme.success} />
                      <Text style={{ color: theme.text, fontSize: 13.5, flex: 1, lineHeight: 21 }}>{t('consent_body')}</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: theme.border, marginVertical: 14 }} />
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <Icon name="shield-checkmark" size={20} color={theme.info} />
                      <Text style={{ color: theme.textDim, fontSize: 12.5, flex: 1, lineHeight: 19 }}>{t('consent_pipa')}</Text>
                    </View>
                  </Card>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {[goal, status, korean, age].filter(Boolean).map((a) => (
                      <Chip key={a as string} label={t(a as string)} active small color={theme.primary} />
                    ))}
                  </View>
                </View>
              )}

              <View style={{ marginTop: 28 }}>
                <Button
                  title={step === 4 ? t('continue') : t('next')}
                  icon="arrow-forward"
                  onPress={() => (step === 4 ? setDone(true) : setStep((s) => Math.min(4, s + 1)))}
                  disabled={(step === 0 && !goal) || (step === 1 && !status) || (step === 2 && !korean) || (step === 3 && !age)}
                />
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

function SelectableRow({ label, selected, onPress, icon }: { label: string; selected: boolean; onPress: () => void; icon: string }) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          padding: 16,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: selected ? theme.primary : theme.border,
          backgroundColor: selected ? (theme.mode === 'dark' ? 'rgba(59,125,255,0.14)' : 'rgba(31,95,224,0.07)') : theme.card,
        }}
      >
        <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: selected ? theme.primary : theme.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={selected ? 'checkmark' : icon} size={16} color={selected ? '#fff' : theme.textDim} />
        </View>
        <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: selected ? '800' : '600', flex: 1 }}>{label}</Text>
      </View>
    </Pressable>
  );
}
