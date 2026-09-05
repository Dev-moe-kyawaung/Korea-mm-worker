import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Chip, EmptyState, Hero, Icon, Pill, Screen, SectionHeader } from '../components/ui';
import { BLACKLIST, LAWYERS, Thread, THREADS } from '../data/community';
import { Nav } from '../navigation';

type Tab = 'forum' | 'lawyers' | 'blacklist';

const STATUS_COLOR: Record<string, string> = {
  confirmed: '#FF5C5C',
  under_review: '#F7A93B',
  disputed: '#5BC8F5',
};

export default function CommunityScreen({ navigation }: { navigation: Nav }) {
  const { t, lang, settings, patchSettings, addReport } = useApp();
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('forum');
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => setLiked((l) => ({ ...l, [id]: !l[id] }));

  return (
    <Screen>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <FlatList
          data={tab === 'forum' ? THREADS : tab === 'lawyers' ? LAWYERS : BLACKLIST}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          ListHeaderComponent={
            <View>
              <Hero
                icon="people"
                title={t('comm_hero')}
                subtitle={`${t('forum')} · ${t('lawyers')} · ${t('blacklist')}`}
                badges={[settings.autoTranslate ? t('translate_on') : t('translate_off')]}
                colors={['#B03A6E', '#5B2A86']}
              />

              <Card style={{ marginTop: 14, borderColor: `${theme.danger}66` }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: theme.dangerSoft, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="megaphone" size={20} color={theme.danger} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14.5 }}>{t('sos_title')}</Text>
                    <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }}>{t('hotline')}: 1345 · 112 · 119</Text>
                  </View>
                  <Button title="SOS" small variant="danger" style={{ alignSelf: 'center', paddingHorizontal: 16 }} onPress={() => navigation.navigate('Sos')} />
                </View>
              </Card>

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 18, marginBottom: 4 }}>
                <Chip label={t('forum')} active={tab === 'forum'} onPress={() => setTab('forum')} small icon="chatbubbles" />
                <Chip label={t('lawyers')} active={tab === 'lawyers'} onPress={() => setTab('lawyers')} small icon="ribbon" />
                <Chip label={t('blacklist')} active={tab === 'blacklist'} onPress={() => setTab('blacklist')} small icon="alert-circle" />
              </View>

              {tab === 'forum' && (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <Text style={{ color: theme.textDim, fontSize: 12 }}>{THREADS.length} {t('forum').toLowerCase()}</Text>
                  <Pressable onPress={() => patchSettings({ autoTranslate: !settings.autoTranslate })} hitSlop={8}>
                    <Text style={{ color: theme.primary, fontSize: 12, fontWeight: '800' }}>
                      {settings.autoTranslate ? t('translate_on') : t('translate_off')}
                    </Text>
                  </Pressable>
                </View>
              )}

              {tab === 'blacklist' && (
                <Button
                  title={t('check_employer')}
                  icon="search"
                  variant="secondary"
                  small
                  style={{ marginTop: 12 }}
                  onPress={() => navigation.navigate('Employer')}
                />
              )}
            </View>
          }
          ListEmptyComponent={<EmptyState icon="people-outline" title={t('empty_title')} />}
          renderItem={({ item, index }: { item: any; index: number }) => {
            if (tab === 'forum') return <ThreadCard thread={item as Thread} index={index} liked={!!liked[(item as Thread).id]} onLike={() => toggleLike((item as Thread).id)} />;
            if (tab === 'lawyers') {
              const l = item as (typeof LAWYERS)[number];
              return (
                <Animated.View entering={FadeInDown.delay(index * 70).duration(360)}>
                  <Card style={{ marginBottom: 12 }} onPress={() => navigation.navigate('Lawyer', { id: l.id })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <View style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: theme.primary, fontWeight: '900', fontSize: 16 }}>{l.name.charAt(0)}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14.5 }}>{l.name}</Text>
                          <Pill label={t('verified_badge')} color={theme.success} icon="checkmark-circle" />
                        </View>
                        <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 3 }}>{l.region}</Text>
                      </View>
                      <Icon name="chevron-forward" size={19} color={theme.textFaint} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {l.specialties.slice(0, 2).map((s) => (
                        <Pill key={s} label={s} color={theme.info} />
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', gap: 14, marginTop: 12 }}>
                      <Text style={{ color: theme.textDim, fontSize: 11.5 }}>{t('consult_from')}: <Text style={{ color: theme.text, fontWeight: '800' }}>{l.fee}</Text></Text>
                      <Text style={{ color: theme.textDim, fontSize: 11.5 }}>{t('response')}: <Text style={{ color: theme.text, fontWeight: '800' }}>{l.response}</Text></Text>
                    </View>
                  </Card>
                </Animated.View>
              );
            }
            const b = item as (typeof BLACKLIST)[number];
            return (
              <Animated.View entering={FadeInDown.delay(index * 70).duration(360)}>
                <Card style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Pill label={b.category.replace('_', ' ').toUpperCase()} color={STATUS_COLOR[b.status]} />
                    <Pill label={`${b.reports} ${t('reports_l')}`} color={theme.textFaint} />
                  </View>
                  <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14.5, marginTop: 12 }}>{b.company}</Text>
                  <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 3 }}>{b.area} · {b.date}</Text>
                  <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 10, lineHeight: 18 }}>{b.summary}</Text>
                </Card>
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    </Screen>
  );
}

function ThreadCard({ thread, index, liked, onLike }: { thread: Thread; index: number; liked: boolean; onLike: () => void }) {
  const { t, lang, settings, profile } = useApp();
  const theme = useTheme();
  const showTranslated = settings.autoTranslate && lang !== 'my';
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(360)}>
      <Card style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 34, height: 34, borderRadius: 12, backgroundColor: theme.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="person" size={15} color={theme.textDim} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.text, fontSize: 12.5, fontWeight: '700' }}>{thread.author}</Text>
            <Text style={{ color: theme.textFaint, fontSize: 11 }}>{thread.city} · {thread.hoursAgo}h</Text>
          </View>
          <Pill label={thread.tag.toUpperCase()} color={theme.info} />
        </View>
        <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800', marginTop: 12, lineHeight: 20 }}>
          {thread.title[lang]}
        </Text>
        <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 8, lineHeight: 19 }}>
          {showTranslated ? thread.body[lang] : thread.body.my}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 14 }}>
          <Pressable onPress={onLike} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name={liked ? 'heart' : 'heart-outline'} size={17} color={liked ? theme.accent : theme.textFaint} />
            <Text style={{ color: liked ? theme.accent : theme.textFaint, fontSize: 12, fontWeight: '700' }}>{thread.likes + (liked ? 1 : 0)}</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="chatbubble-outline" size={16} color={theme.textFaint} />
            <Text style={{ color: theme.textFaint, fontSize: 12, fontWeight: '700' }}>{thread.replies}</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}
