import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Hero, Icon, Pill, Screen, SectionHeader, StatTile } from '../components/ui';
import { DECKS, QUESTIONS, deckQuestions } from '../data/exam';
import { isDue, isMastered } from '../lib/sm2';
import { Nav } from '../navigation';

export default function ExamScreen({ navigation }: { navigation: Nav }) {
  const { t, lang, state } = useApp();
  const theme = useTheme();
  const { srs, progress } = state;

  const stats = useMemo(() => {
    const reviewed = Object.keys(srs).filter((id) => isDue(srs[id])).length;
    const fresh = QUESTIONS.filter((q) => !srs[q.id]?.seen).length;
    const dueTotal = reviewed + fresh;
    const mastered = Object.keys(srs).filter((id) => isMastered(srs[id])).length;
    const acc = progress.totalAnswers ? Math.round((progress.totalCorrect / progress.totalAnswers) * 100) : 0;
    return { dueTotal, mastered, acc };
  }, [srs, progress]);

  return (
    <Screen>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <FlatList
          data={DECKS}
          keyExtractor={(d) => d.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          ListHeaderComponent={
            <View>
              <Hero
                icon="school"
                title={t('exam_hero')}
                subtitle={t('exam_sub')}
                badges={[t('topik_target'), t('offline_badge')]}
                colors={['#6C35C4', theme.accent]}
              />

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                <StatTile icon="time" label={t('cards_due')} value={`${stats.dueTotal}`} />
                <StatTile icon="flame" label={t('streak')} value={`${progress.streak}`} color={theme.warn} />
              </View>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <StatTile icon="checkmark-done" label={t('accuracy')} value={`${stats.acc}%`} color={theme.success} />
                <StatTile icon="trophy" label={t('mastered')} value={`${stats.mastered}`} color={theme.gold} />
              </View>

              <View style={{ height: 16 }} />
              <Card onPress={() => navigation.navigate('Quiz', { mode: 'mock' })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                  <View style={{ width: 46, height: 46, borderRadius: 15, backgroundColor: theme.dangerSoft, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="stopwatch" size={24} color={theme.danger} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '800', fontSize: 15 }}>{t('mock_exam')}</Text>
                    <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 3 }}>{t('mock_desc')}</Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color={theme.textFaint} />
                </View>
              </Card>

              <SectionHeader title={t('decks')} subtitle={t('sm2_hint')} icon="albums" />
            </View>
          }
          renderItem={({ item, index }) => {
            const qs = deckQuestions(item.id);
            const done = qs.filter((q) => srs[q.id]?.seen).length;
            const mastered = qs.filter((q) => isMastered(srs[q.id])).length;
            const best = progress.best[item.id];
            return (
              <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
                <Card style={{ marginBottom: 12 }} onPress={() => navigation.navigate('Quiz', { deckId: item.id, mode: 'study' })}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${item.color}2E`, alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14.5 }} numberOfLines={1}>
                        {lang === 'my' ? item.titleMy : lang === 'ko' ? item.titleKo : item.titleEn}
                      </Text>
                      <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }} numberOfLines={2}>
                        {lang === 'my' ? item.descMy : item.descEn}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 6 }}>
                      <Pill label={`${qs.length} Q`} color={item.color} />
                      {best !== undefined ? <Pill label={`⭐ ${best}%`} color={theme.gold} /> : null}
                    </View>
                  </View>
                  <View style={{ marginTop: 14 }}>
                    <Bar value={qs.length ? done / qs.length : 0} color={item.color} />
                    <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 7 }}>
                      {done}/{qs.length} · {t('mastered')}: {mastered}
                    </Text>
                  </View>
                  <View style={{ height: 12 }} />
                  <Button
                    title={t('study_now')}
                    icon="play"
                    small
                    variant="secondary"
                    onPress={() => navigation.navigate('Quiz', { deckId: item.id, mode: 'study' })}
                  />
                </Card>
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    </Screen>
  );
}
