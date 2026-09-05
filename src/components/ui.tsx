import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

export type IconName = keyof typeof Ionicons.glyphMap;

export function Icon({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  const t = useTheme();
  return <Ionicons name={name as IconName} size={size} color={color ?? t.text} />;
}

export function Card({
  children,
  style,
  onPress,
  padded = true,
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  padded?: boolean;
}) {
  const t = useTheme();
  const base: ViewStyle = {
    backgroundColor: t.card,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.border,
    padding: padded ? 16 : 0,
  };
  if (!onPress) {
    return <View style={[base, t.shadow.card, style]}>{children}</View>;
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] }]}
    >
      <View style={[base, t.shadow.card, style]}>{children}</View>
    </Pressable>
  );
}

export function Hero({
  icon,
  title,
  subtitle,
  badges = [],
  colors,
}: {
  icon: string;
  title: string;
  subtitle: string;
  badges?: string[];
  colors?: [string, string];
}) {
  const t = useTheme();
  const gradient: [string, string] = colors ?? [t.primary, '#6C35C4'];
  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24, padding: 20 }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: 'rgba(255,255,255,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <Icon name={icon} size={24} color="#fff" />
      </View>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', letterSpacing: 0.2 }}>{title}</Text>
      <Text style={{ color: 'rgba(255,255,255,0.88)', fontSize: 13.5, marginTop: 6, lineHeight: 19 }}>{subtitle}</Text>
      {badges.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {badges.map((b) => (
            <View
              key={b}
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11.5, fontWeight: '700' }}>{b}</Text>
            </View>
          ))}
        </View>
      )}
    </LinearGradient>
  );
}

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, marginBottom: 12 }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon ? <Icon name={icon} size={17} color={t.primary} /> : null}
          <Text style={{ color: t.text, fontSize: 17, fontWeight: '800' }}>{title}</Text>
        </View>
        {subtitle ? (
          <Text style={{ color: t.textDim, fontSize: 12.5, marginTop: 3 }}>{subtitle}</Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={{ color: t.primary, fontSize: 13, fontWeight: '700' }}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Chip({
  label,
  active,
  onPress,
  color,
  icon,
  small,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
  icon?: string;
  small?: boolean;
}) {
  const t = useTheme();
  const c = color ?? t.primary;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: small ? 10 : 14,
        paddingVertical: small ? 6 : 9,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: active ? c : t.border,
        backgroundColor: active ? (t.mode === 'dark' ? `${c}2E` : `${c}1A`) : t.surface,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {icon ? <Icon name={icon} size={13} color={active ? c : t.textDim} /> : null}
      <Text style={{ color: active ? c : t.textDim, fontSize: small ? 11.5 : 13, fontWeight: active ? '800' : '600' }}>{label}</Text>
    </Pressable>
  );
}

export function Pill({ label, color, icon }: { label: string; color: string; icon?: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: t.mode === 'dark' ? `${color}2E` : `${color}1A`,
        borderRadius: 999,
        paddingHorizontal: 9,
        paddingVertical: 4,
      }}
    >
      {icon ? <Icon name={icon} size={11} color={color} /> : null}
      <Text style={{ color, fontSize: 11, fontWeight: '800' }}>{label}</Text>
    </View>
  );
}

export function Bar({ value, color, height = 8 }: { value: number; color?: string; height?: number }) {
  const t = useTheme();
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height, borderRadius: 999, backgroundColor: t.surfaceAlt, overflow: 'hidden' }}>
      <View style={{ width: `${pct * 100}%`, height, borderRadius: 999, backgroundColor: color ?? t.primary }} />
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  style,
  small,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle;
  small?: boolean;
}) {
  const t = useTheme();
  const bg =
    variant === 'primary' ? t.primary
    : variant === 'danger' ? t.danger
    : variant === 'gold' ? t.gold
    : variant === 'secondary' ? t.surfaceAlt
    : 'transparent';
  const fg = variant === 'secondary' || variant === 'ghost' ? t.text : '#fff';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: bg,
        borderRadius: 14,
        borderWidth: variant === 'ghost' ? 1.5 : 0,
        borderColor: t.border,
        paddingVertical: small ? 10 : 14,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        alignSelf: 'stretch',
        ...style,
      })}
    >
      {icon ? <Icon name={icon} size={small ? 14 : 17} color={fg} /> : null}
      <Text style={{ color: fg, fontWeight: '800', fontSize: small ? 13 : 15 }}>{title}</Text>
    </Pressable>
  );
}

export function StatTile({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) {
  const t = useTheme();
  const c = color ?? t.primary;
  return (
    <View style={{ flex: 1, backgroundColor: t.card, borderRadius: 16, borderWidth: 1, borderColor: t.border, padding: 13 }}>
      <View style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: t.mode === 'dark' ? `${c}2E` : `${c}1A`, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <Icon name={icon} size={15} color={c} />
      </View>
      <Text style={{ color: t.text, fontSize: 17, fontWeight: '800' }}>{value}</Text>
      <Text style={{ color: t.textDim, fontSize: 11, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const t = useTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24 }}>
      <View style={{ width: 62, height: 62, borderRadius: 22, backgroundColor: t.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Icon name={icon} size={28} color={t.textFaint} />
      </View>
      <Text style={{ color: t.text, fontSize: 15.5, fontWeight: '800', textAlign: 'center' }}>{title}</Text>
      {subtitle ? <Text style={{ color: t.textDim, fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 19 }}>{subtitle}</Text> : null}
      {actionLabel && onAction ? (
        <View style={{ marginTop: 16, alignSelf: 'stretch' }}>
          <Button title={actionLabel} onPress={onAction} variant="secondary" />
        </View>
      ) : null}
    </View>
  );
}

export function Row({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>{children}</View>;
}

export function Fact({ label, value, color }: { label: string; value: string; color?: string }) {
  const t = useTheme();
  return (
    <View style={{ flexBasis: '48%', marginBottom: 14 }}>
      <Text style={{ color: t.textFaint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
      <Text style={{ color: color ?? t.text, fontSize: 13.5, marginTop: 4, lineHeight: 19, fontWeight: '600' }}>{value}</Text>
    </View>
  );
}

export function Screen({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <View style={{ flex: 1, backgroundColor: t.bg }}>{children}</View>;
}
