// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoToTracks = () => {
    navigation.navigate('Tracks');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, colaborador!</Text>
      <Text style={styles.subtitle}>
        Acompanhe suas trilhas de aprendizado e prepare-se para o futuro do
        trabalho.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Minha evolução</Text>
        <Text style={styles.cardText}>
          Em breve você verá aqui o seu progresso nas trilhas de upskilling e
          reskilling.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={handleGoToTracks}>
        <Text style={styles.buttonText}>Ver trilhas recomendadas</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleGoToProfile}>
        <Text style={styles.secondaryButtonText}>Ver meu perfil</Text>
      </Pressable>
    </View>
  );
};

const PRIMARY_COLOR = '#4C6FFF';
const BACKGROUND_COLOR = '#050817';
const TEXT_COLOR = '#FFFFFF';
const MUTED_TEXT_COLOR = '#A1A5B7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: MUTED_TEXT_COLOR,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0B1022',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    color: MUTED_TEXT_COLOR,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: TEXT_COLOR,
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    alignSelf: 'flex-start',
  },
  secondaryButtonText: {
    color: PRIMARY_COLOR,
    fontWeight: '500',
    fontSize: 14,
  },
});

export default HomeScreen;
