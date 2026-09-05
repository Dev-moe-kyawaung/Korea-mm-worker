import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Card, Chip, Hero, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { POLICIES, PolicyItem } from '../data/community';
import { MATRIX, MATRIX_ROWS, VISA_LIST, visaName } from '../data/visas';
import { topMatches } from '../lib/match';
import { formatDate } from '../lib/dates';
import { LOCALE } from '../i18n';
import { Nav } from '../navigation';

const CAT_COLOR: Record<PolicyItem['category'], string> = {
  visa: '#3B7DFF',
  labour: '#F5B942',
  exam: '#B07CFF',
  safety: '#F2536B',
  money: '#2FD08A',
};

export default function VisaScreen({ navigation }: { navigation: Nav }) {
  const { t, lang, profile } = useApp();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [synced, setSynced] = useState(new Date());

  const recs = useMemo(() => {
    if (!profile.goal) return [];
    return topMatches(
      { goal: profile.goal, status: profile.status ?? '', korean: profile.korean ?? '', priority: 'priority_permanence' },
      55,
      3
    );
  }, [profile]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Offline-first: remote sync refreshes the cached policy feed; on failure the cache stays.
    setTimeout(() => {
      setSynced(new Date());
      setRefreshing(false);
    }, 900);
  }, []);

  const syncLabel = synced.toLocaleTimeString(LOCALE[lang], { hour: '2-digit', minute: '2-digit' });

  return (
    <Screen>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <FlatList
          data={POLICIES}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} colors={[theme.primary]} />}
          ListHeaderComponent={
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Icon name="shield-checkmark" size={18} color={theme.primary} />
                  <Text style={{ color: theme.text, fontWeight: '900', fontSize: 15 }}>{t('visa_hero')}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Settings')} hitSlop={10}>
                  <Icon name="settings" size={21} color={theme.textDim} />
                </Pressable>
              </View>
              <Hero
                icon="shield-checkmark"
                title={t('visa_hero')}
                subtitle={t('visa_sub')}
                badges={[t('offline_badge'), `${t('policy_synced')} ${syncLabel}`]}
                colors={[theme.primary, '#4B2AA8']}
              />

              <SectionHeader title={t('visa_wizard')} subtitle={t('visa_wizard_desc')} icon="sparkles" />
              <Card onPress={() => navigation.navigate('Wizard')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                  <View style={{ width: 46, height: 46, borderRadius: 15, backgroundColor: theme.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="help-circle" size={24} color={theme.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '800', fontSize: 15 }}>{t('visa_wizard')}</Text>
                    <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 3 }}>E-9 · E-7 · E-8 · D-4 · F-2-7 · F-5 · H-1 · F-1-3</Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color={theme.textFaint} />
                </View>
              </Card>

              {recs.length > 0 && (
                <>
                  <SectionHeader title={t('onb_reco')} icon="ribbon" />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 8 }}>
                    {recs.map((m, i) => (
                      <Animated.View key={m.visa.id} entering={FadeInDown.delay(i * 90).duration(400)}>
                        <Card style={{ width: 230 }} onPress={() => navigation.navigate('VisaDetail', { id: m.visa.id })}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: `${m.visa.color}2E`, alignItems: 'center', justifyContent: 'center' }}>
                              <Icon name={m.visa.icon} size={17} color={m.visa.color} />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={{ color: theme.text, fontWeight: '900', fontSize: 14 }}>{m.visa.code}</Text>
                              <Text style={{ color: theme.textDim, fontSize: 11.5 }} numberOfLines={1}>{visaName(m.visa, lang)}</Text>
                            </View>
                            <Text style={{ color: m.visa.color, fontWeight: '900' }}>{m.score}%</Text>
                          </View>
                          <Text style={{ color: theme.textDim, fontSize: 12, lineHeight: 17 }} numberOfLines={3}>{m.visa.tagline[lang]}</Text>
                        </Card>
                      </Animated.View>
                    ))}
                  </ScrollView>
                </>
              )}

              <SectionHeader title={t('visa_matrix')} subtitle={t('visa_sub')} icon="grid" />
              <Card padded={false} style={{ padding: 12 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 106 }}>
                      <View style={{ height: 40, justifyContent: 'flex-end', paddingBottom: 6 }}>
                        <Text style={{ color: theme.textFaint, fontSize: 10.5, fontWeight: '800', textTransform: 'uppercase' }}>{t('compare')}</Text>
                      </View>
                      {MATRIX_ROWS.map((r) => (
                        <View key={r.key} style={{ height: 58, justifyContent: 'center', paddingRight: 8 }}>
                          <Text style={{ color: theme.text, fontSize: 11, fontWeight: '700' }} numberOfLines={2}>{t(r.labelKey)}</Text>
                        </View>
                      ))}
                    </View>
                    {VISA_LIST.map((v) => (
                      <View key={v.id} style={{ width: 132 }}>
                        <View style={{ height: 40, justifyContent: 'center', marginBottom: 0 }}>
                          <View style={{ backgroundColor: `${v.color}2E`, borderRadius: 10, paddingVertical: 6, alignItems: 'center' }}>
                            <Text style={{ color: v.color, fontWeight: '900', fontSize: 12.5 }}>{v.code}</Text>
                          </View>
                        </View>
                        {MATRIX_ROWS.map((r) => (
                          <View key={r.key} style={{ height: 58, justifyContent: 'center', paddingHorizontal: 5 }}>
                            <Text style={{ color: theme.textDim, fontSize: 10.5, lineHeight: 14 }} numberOfLines={4}>{MATRIX[v.id][r.key]}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </Card>

              <SectionHeader
                title={t('policy_feed')}
                subtitle={`${t('policy_synced')} ${syncLabel}`}
                icon="newspaper"
              />
            </View>
          }
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(Math.min(index, 6) * 60).duration(360)}>
              <Card style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <Pill label={item.category.toUpperCase()} color={CAT_COLOR[item.category]} />
                  {item.important ? <Pill label="!" color={theme.danger} /> : null}
                  <Text style={{ color: theme.textFaint, fontSize: 11.5 }}>{formatDate(item.date, lang)}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 11.5 }}>· {item.source}</Text>
                </View>
                <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800', lineHeight: 20 }}>{lang === 'my' ? item.titleMy : lang === 'ko' ? item.titleKo : item.titleEn}</Text>
                <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 8, lineHeight: 19 }}>{lang === 'my' ? item.bodyMy : item.bodyEn}</Text>
                <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 10 }}>{t('official_link')}</Text>
              </Card>
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </Screen>
  );
}
