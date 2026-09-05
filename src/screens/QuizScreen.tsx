import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Icon, Pill, Screen, SectionHeader, StatTile } from '../components/ui';
import { Q, pickSession } from '../data/exam';
import { Rating } from '../lib/sm2';
import { Nav } from '../navigation';

const SESSION_SIZE = 10;
const RATING_COLOR: Record<Rating, string> = {
  again: '#FF5C5C',
  hard: '#F7A93B',
  good: '#3B7DFF',
  easy: '#2FD08A',
};

export default function QuizScreen({ route, navigation }: { route: { params: { deckId?: string; mode: 'study' | 'mock' } }; navigation: Nav }) {
  const { t, lang, state, gradeCard, recordQuiz } = useApp();
  const theme = useTheme();
  const { deckId, mode } = route.params;

  const session = useMemo<Q[]>(() => pickSession(deckId ?? null, SESSION_SIZE, state.srs), [deckId, state.srs]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState<Q[]>([]);
  const [finished, setFinished] = useState(false);

  if (session.length === 0) {
    return (
      <Screen>
        <View style={{ padding: 24, alignItems: 'center', marginTop: 60 }}>
          <Icon name="sparkles" size={40} color={theme.success} />
          <Text style={{ color: theme.text, fontSize: 17, fontWeight: '800', marginTop: 14 }}>{t('no_cards')}</Text>
          <View style={{ alignSelf: 'stretch', marginTop: 22 }}>
            <Button title={t('done')} onPress={() => navigation.goBack()} />
          </View>
        </View>
      </Screen>
    );
  }

  if (finished) {
    const pct = Math.round((correct / session.length) * 100);
    const passed = pct >= 60;
    return (
      <Screen>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
          <Animated.View entering={FadeIn.duration(360)}>
            <Card style={{ alignItems: 'center', paddingVertical: 28, borderColor: passed ? theme.success : theme.warn }}>
              <View style={{ width: 76, height: 76, borderRadius: 30, backgroundColor: passed ? theme.successSoft : theme.warnSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={passed ? 'trophy' : 'refresh'} size={36} color={passed ? theme.success : theme.warn} />
              </View>
              <Text style={{ color: theme.text, fontSize: 30, fontWeight: '900', marginTop: 16 }}>{pct}%</Text>
              <Text style={{ color: passed ? theme.success : theme.warn, fontSize: 14, fontWeight: '900', letterSpacing: 1.5, marginTop: 6 }}>
                {passed ? t('passed') : t('failed')}
              </Text>
              <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 10 }}>
                {correct}/{session.length} · {mode === 'mock' ? t('mock_exam') : t('decks')}
              </Text>
            </Card>
          </Animated.View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <StatTile icon="checkmark-circle" label={t('correct')} value={`${correct}`} color={theme.success} />
            <StatTile icon="close-circle" label={t('incorrect')} value={`${session.length - correct}`} color={theme.danger} />
          </View>

          {missed.length > 0 && (
            <>
              <SectionHeader title={t('incorrect')} icon="book" />
              {missed.map((q) => (
                <Card key={q.id} style={{ marginBottom: 10 }}>
                  <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '700' }}>{q.ko}</Text>
                  <Text style={{ color: theme.success, fontSize: 13, marginTop: 8 }}>✓ {q.options[q.answer]}</Text>
                  <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 8, lineHeight: 18 }}>{q.why}</Text>
                </Card>
              ))}
            </>
          )}

          <View style={{ height: 16 }} />
          <Button title={t('retry')} icon="refresh" onPress={() => {
            setIndex(0); setSelected(null); setRevealed(false); setCorrect(0); setMissed([]); setFinished(false);
          }} />
          <View style={{ height: 10 }} />
          <Button title={t('done')} icon="checkmark" variant="ghost" onPress={() => navigation.goBack()} />
        </ScrollView>
      </Screen>
    );
  }

  const q = session[index];
  const isCorrect = selected === q.answer;

  const submit = () => {
    if (selected === null) return;
    setRevealed(true);
    if (selected === q.answer) setCorrect((c) => c + 1);
    else setMissed((m) => [...m, q]);
  };

  const next = (rating?: Rating) => {
    if (mode === 'study' && rating) gradeCard(q.id, rating);
    const last = index >= session.length - 1;
    if (last) {
      recordQuiz(deckId ?? 'mixed', correct, session.length);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Icon name="close" size={24} color={theme.text} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Bar value={(index + (revealed ? 1 : 0)) / session.length} color={theme.primary} />
          </View>
          <Text style={{ color: theme.textDim, fontSize: 12, fontWeight: '700' }}>{index + 1}/{session.length}</Text>
        </View>

        <Animated.View key={q.id} entering={FadeInDown.duration(300)} exiting={FadeOut.duration(120)}>
          <Card style={{ marginTop: 18, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Pill label={mode === 'mock' ? t('mock_exam') : t('decks')} color={theme.primary} />
              <Text style={{ color: theme.textFaint, fontSize: 11.5 }}>{t('q_of')} {index + 1}</Text>
            </View>
            <Text style={{ color: theme.text, fontSize: 17, fontWeight: '700', lineHeight: 26 }}>{q.ko}</Text>
            <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 10, lineHeight: 19 }}>{lang === 'my' ? q.my : q.prompt}</Text>
          </Card>

          <View style={{ marginTop: 14 }}>
            {q.options.map((opt, i) => {
              const chosen = selected === i;
              const right = i === q.answer;
              const showColors = revealed;
              const borderColor = showColors ? (right ? theme.success : chosen ? theme.danger : theme.border) : chosen ? theme.primary : theme.border;
              return (
                <Pressable key={opt} disabled={revealed} onPress={() => setSelected(i)} style={{ marginBottom: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      padding: 16,
                      borderRadius: 15,
                      borderWidth: 1.5,
                      borderColor,
                      backgroundColor: showColors
                        ? right
                          ? theme.successSoft
                          : chosen
                          ? theme.dangerSoft
                          : theme.card
                        : chosen
                        ? theme.primarySoft
                        : theme.card,
                    }}
                  >
                    <View style={{ width: 28, height: 28, borderRadius: 10, backgroundColor: theme.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: theme.textDim, fontWeight: '800', fontSize: 12 }}>{String.fromCharCode(65 + i)}</Text>
                    </View>
                    <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: chosen || (showColors && right) ? '800' : '600', flex: 1 }}>{opt}</Text>
                    {showColors && right ? <Icon name="checkmark-circle" size={20} color={theme.success} /> : null}
                    {showColors && chosen && !right ? <Icon name="close-circle" size={20} color={theme.danger} /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {!revealed ? (
          <Button title={t('submit')} icon="checkmark" disabled={selected === null} onPress={submit} style={{ marginTop: 10 }} />
        ) : (
          <Animated.View entering={FadeIn.duration(240)}>
            <Card style={{ marginTop: 6, borderColor: isCorrect ? theme.success : theme.danger }}>
              <Text style={{ color: isCorrect ? theme.success : theme.danger, fontSize: 15, fontWeight: '900' }}>
                {isCorrect ? t('correct') : t('incorrect')}
              </Text>
              {!isCorrect ? (
                <Text style={{ color: theme.text, fontSize: 13.5, marginTop: 8 }}>✓ {q.options[q.answer]}</Text>
              ) : null}
              <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 8, lineHeight: 18 }}>{q.why}</Text>
            </Card>

            {mode === 'study' ? (
              <View>
                <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 14, marginBottom: 8 }}>{t('sm2_hint')}</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {(['again', 'hard', 'good', 'easy'] as Rating[]).map((r) => (
                    <Pressable
                      key={r}
                      onPress={() => next(r)}
                      style={{
                        flex: 1,
                        paddingVertical: 14,
                        borderRadius: 14,
                        alignItems: 'center',
                        backgroundColor: RATING_COLOR[r],
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '900', fontSize: 12.5 }}>{t(r)}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : (
              <View style={{ marginTop: 14 }}>
                <Button
                  title={index >= session.length - 1 ? t('finish') : t('next_q')}
                  icon="arrow-forward"
                  onPress={() => next()}
                />
              </View>
            )}
          </Animated.View>
        )}
      </ScrollView>
    </Screen>
  );
}
