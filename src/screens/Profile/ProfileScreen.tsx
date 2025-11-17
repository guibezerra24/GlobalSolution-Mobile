// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.subtitle}>
        Em breve você poderá acompanhar aqui seu progresso nas trilhas,
        certificados conquistados e habilidades em desenvolvimento.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Nome do colaborador</Text>
        <Text style={styles.cardValue}>Colaborador SkillBoost (demo)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Trilhas ativas</Text>
        <Text style={styles.cardValue}>Em breve</Text>
      </View>
    </View>
  );
};

const BACKGROUND_COLOR = '#050817';
const TEXT_COLOR = '#FFFFFF';
const MUTED_TEXT_COLOR = '#A1A5B7';
const CARD_BACKGROUND = '#0B1022';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: MUTED_TEXT_COLOR,
    marginBottom: 16,
  },
  card: {
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    color: MUTED_TEXT_COLOR,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontWeight: '500',
  },
});

export default ProfileScreen;
