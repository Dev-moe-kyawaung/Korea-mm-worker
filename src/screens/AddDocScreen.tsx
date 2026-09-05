import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { useApp } from '../store/AppContext';
import { useTheme } from '../theme';
import { Button, Card, Chip, Icon, Screen, SectionHeader } from '../components/ui';
import { isISODate, todayISO } from '../lib/dates';
import { Nav } from '../navigation';

const TYPES = [
  'passport', 'arc', 'visa_page', 'contract', 'coe', 'eps_result', 'medical',
  'degree', 'criminal', 'photo', 'bank', 'topik_cert', 'kiip', 'insurance',
];

const PRESETS = [
  { label: '1 year', days: 365 },
  { label: '6 months', days: 182 },
  { label: '90 days', days: 90 },
  { label: '30 days', days: 30 },
];

export default function AddDocScreen({ navigation }: { navigation: Nav }) {
  const { t, addDoc } = useApp();
  const theme = useTheme();
  const [type, setType] = useState('passport');
  const [expiry, setExpiry] = useState(todayISO(365));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    if (!isISODate(expiry)) {
      setError('YYYY-MM-DD');
      return;
    }
    addDoc({ type, expiry, notes: notes.trim() });
    navigation.goBack();
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }} keyboardShouldPersistTaps="handled">
          <SectionHeader title={t('add_doc')} subtitle={t('secure_note')} icon="add-circle" />

          <Text style={{ color: theme.textDim, fontSize: 12.5, marginBottom: 10 }}>{t('doc_type')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TYPES.map((ty) => (
              <Chip key={ty} label={t(ty)} active={type === ty} onPress={() => setType(ty)} small />
            ))}
          </View>

          <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 24, marginBottom: 10 }}>{t('expiry')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {PRESETS.map((p) => (
              <Chip
                key={p.label}
                label={`${p.label} (${todayISO(p.days)})`}
                active={expiry === todayISO(p.days)}
                color={theme.accent}
                small
                onPress={() => { setExpiry(todayISO(p.days)); setError(null); }}
              />
            ))}
            <Chip label="∞" active={expiry === ''} color={theme.success} small onPress={() => { setExpiry(''); setError(null); }} />
          </View>
          <TextInput
            value={expiry}
            onChangeText={(v) => { setExpiry(v); setError(null); }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.textFaint}
            autoCapitalize="none"
            keyboardType="numbers-and-punctuation"
            returnKeyType="done"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1.5,
              borderColor: error ? theme.danger : theme.border,
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 13,
              color: theme.text,
              fontSize: 15,
            }}
          />
          {error ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <Icon name="alert-circle" size={14} color={theme.danger} />
              <Text style={{ color: theme.danger, fontSize: 12 }}>{error}</Text>
            </View>
          ) : null}

          <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 24, marginBottom: 10 }}>{t('notes')}</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="e.g. MA****21 · Ansan shipyard"
            placeholderTextColor={theme.textFaint}
            multiline
            returnKeyType="default"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 13,
              color: theme.text,
              fontSize: 15,
              minHeight: 90,
              textAlignVertical: 'top',
            }}
          />

          <Card style={{ marginTop: 20, backgroundColor: theme.surfaceAlt }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Icon name="shield-checkmark" size={18} color={theme.info} />
              <Text style={{ color: theme.textDim, fontSize: 12.5, flex: 1, lineHeight: 18 }}>{t('secure_note')}</Text>
            </View>
          </Card>

          <View style={{ height: 18 }} />
          <Button title={t('save')} icon="save" onPress={save} />
          <View style={{ height: 10 }} />
          <Button title={t('cancel')} variant="ghost" onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
