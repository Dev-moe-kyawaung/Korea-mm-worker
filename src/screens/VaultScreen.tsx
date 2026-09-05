import React, { useMemo, useState } from 'react';
import { Alert, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp, VaultDoc } from '../store/AppContext';
import { useTheme } from '../theme';
import { Bar, Button, Card, Chip, EmptyState, Hero, Icon, Pill, Screen, SectionHeader, StatTile } from '../components/ui';
import { VISA_LIST } from '../data/visas';
import { daysUntil, formatDate, urgencyFor } from '../lib/dates';
import { Nav } from '../navigation';

const URGENCY_COLOR = (u: ReturnType<typeof urgencyFor>, mode: 'light' | 'dark') => {
  switch (u) {
    case 'expired': return '#FF5C5C';
    case 'u7': return '#FF5C5C';
    case 'u30': return '#F7A93B';
    case 'u60': return '#F5B942';
    case 'u90': return '#5BC8F5';
    default: return mode === 'dark' ? '#9DAAC6' : '#4E5D7A';
  }
};

export default function VaultScreen({ navigation }: { navigation: Nav }) {
  const { t, lang, state, removeDoc, toggleCheck } = useApp();
  const theme = useTheme();
  const [visaId, setVisaId] = useState('E9');
  const [refreshing, setRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  const docs = state.docs;
  const expiring = useMemo(
    () =>
      docs
        .filter((d) => d.expiry)
        .map((d) => ({ doc: d, days: daysUntil(d.expiry as string) }))
        .filter((x) => x.days <= 90)
        .sort((a, b) => a.days - b.days),
    [docs]
  );

  const visa = VISA_LIST.find((v) => v.id === visaId) ?? VISA_LIST[0];
  const checked = state.checklist[visa.id] ?? [];
  const mandatory = visa.checklist.filter((c) => c.mandatory);
  const mandatoryDone = mandatory.filter((c) => checked.includes(c.id)).length;
  const progress = mandatory.length ? mandatoryDone / mandatory.length : 0;

  const confirmDelete = (doc: VaultDoc) => {
    Alert.alert(t('delete_doc'), t('confirm_delete'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete_doc'), style: 'destructive', onPress: () => removeDoc(doc.id) },
    ]);
  };

  const buildPacket = () => {
    const ready = docs.filter((d) => !d.expiry || daysUntil(d.expiry) >= 0).length;
    Alert.alert(t('share_packet'), `${t('packet_ready')}\n\n${ready}/${docs.length} · AES-256`);
  };

  return (
    <Screen>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <FlatList
          data={docs}
          keyExtractor={(d) => d.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={theme.primary}
              colors={[theme.primary]}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => { setLastSync(new Date()); setRefreshing(false); }, 800);
              }}
            />
          }
          ListHeaderComponent={
            <View>
              <Hero
                icon="folder-open"
                title={t('vault_hero')}
                subtitle={t('vault_sub')}
                badges={['AES-256', t('offline_badge')]}
                colors={['#0E7FA8', theme.primary]}
              />

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                <StatTile icon="time" label={t('expiring_soon')} value={`${expiring.length}`} color={theme.warn} />
                <StatTile icon="document" label={t('active_docs')} value={`${docs.length}`} />
              </View>

              <SectionHeader title={t('expiring_soon')} subtitle={`${t('policy_synced')} ${lastSync.toLocaleTimeString()}`} icon="alert-circle" />
              {expiring.length === 0 ? (
                <Card style={{ backgroundColor: theme.surfaceAlt }}>
                  <Text style={{ color: theme.textDim, fontSize: 13 }}>{t('empty_title')}</Text>
                </Card>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 8 }}>
                  {expiring.map(({ doc, days }, i) => {
                    const color = URGENCY_COLOR(urgencyFor(days), theme.mode);
                    return (
                      <Animated.View key={doc.id} entering={FadeInDown.delay(i * 80).duration(380)}>
                        <Card style={{ width: 190 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Pill label={days < 0 ? t('overdue') : `${days} ${t('days')}`} color={color} icon="hourglass" />
                          </View>
                          <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14, marginTop: 12 }} numberOfLines={2}>{t(doc.type)}</Text>
                          <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 6 }}>
                            {t('valid_until')} {doc.expiry ? formatDate(doc.expiry, lang) : '—'}
                          </Text>
                        </Card>
                      </Animated.View>
                    );
                  })}
                </ScrollView>
              )}

              <SectionHeader
                title={t('my_docs')}
                actionLabel={t('add_doc')}
                onAction={() => navigation.navigate('AddDoc')}
                icon="document-text"
              />
            </View>
          }
          ListEmptyComponent={<EmptyState icon="document-outline" title={t('vault_empty')} actionLabel={t('add_doc')} onAction={() => navigation.navigate('AddDoc')} />}
          renderItem={({ item }) => {
            const days = item.expiry ? daysUntil(item.expiry) : null;
            const color = days === null ? theme.textFaint : URGENCY_COLOR(urgencyFor(days), theme.mode);
            return (
              <Card style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: theme.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="document" size={19} color={color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: '800', fontSize: 14 }}>{t(item.type)}</Text>
                    <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 3 }} numberOfLines={1}>{item.notes}</Text>
                  </View>
                  {days === null ? (
                    <Pill label="∞" color={theme.success} />
                  ) : (
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ color, fontWeight: '900', fontSize: 15 }}>{days < 0 ? t('overdue') : days}</Text>
                      <Text style={{ color: theme.textFaint, fontSize: 10 }}>{days < 0 ? '' : t('days')}</Text>
                    </View>
                  )}
                </View>
                {item.expiry ? (
                  <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 10 }}>
                    {t('valid_until')} {formatDate(item.expiry, lang)}
                  </Text>
                ) : null}
              </Card>
            );
          }}
          ListFooterComponent={
            <View>
              <SectionHeader title={t('gen_checklist')} subtitle={visa.code} icon="checkbox" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 14 }}>
                {VISA_LIST.map((v) => (
                  <Chip key={v.id} label={v.code} active={visaId === v.id} color={v.color} onPress={() => setVisaId(v.id)} small />
                ))}
              </ScrollView>
              <Card>
                <View style={{ marginBottom: 12 }}>
                  <Bar value={progress} color={progress >= 1 ? theme.success : theme.primary} />
                  <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 8 }}>
                    {t('complete')}: {mandatoryDone}/{mandatory.length} · {t('missing')}: {visa.checklist.length - checked.length}
                  </Text>
                </View>
                {visa.checklist.map((c) => {
                  const on = checked.includes(c.id);
                  return (
                    <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderTopWidth: 1, borderTopColor: theme.border }}>
                      <Icon name={on ? 'checkbox' : 'square-outline'} size={20} color={on ? theme.success : theme.textFaint} />
                      <Text style={{ color: theme.text, fontSize: 13.5, flex: 1, textDecorationLine: on ? 'line-through' : 'none' }}>{t(c.id)}</Text>
                      {c.mandatory ? <Pill label="*" color={theme.accent} /> : null}
                    </View>
                  );
                })}
                <View style={{ height: 14 }} />
                <Button title={t('share_packet')} icon="share" variant="secondary" onPress={buildPacket} />
              </Card>

              <Card style={{ marginTop: 14, backgroundColor: theme.surfaceAlt }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Icon name="lock-closed" size={18} color={theme.success} />
                  <Text style={{ color: theme.textDim, fontSize: 12.5, flex: 1, lineHeight: 18 }}>{t('secure_note')}</Text>
                </View>
              </Card>
            </View>
          }
        />
      </SafeAreaView>
    </Screen>
  );
}
