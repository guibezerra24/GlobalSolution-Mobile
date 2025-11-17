// src/screens/TrackDetail/TrackDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackDetail'>;

const TrackDetailScreen: React.FC<Props> = ({ route }) => {
  const { trackId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhe da trilha</Text>
      <Text style={styles.subtitle}>
        Aqui futuramente teremos as informações completas da trilha selecionada,
        como carga horária, competências desenvolvidas e plano de estudos.
      </Text>

      <Text style={styles.info}>ID da trilha selecionada: {trackId}</Text>

      <Text style={styles.placeholder}>
        Na próxima etapa vamos conectar esta tela à API e mostrar os dados
        reais vindos do backend.
      </Text>
    </View>
  );
};

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
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: MUTED_TEXT_COLOR,
    marginBottom: 16,
  },
  info: {
    fontSize: 14,
    color: TEXT_COLOR,
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 13,
    color: MUTED_TEXT_COLOR,
  },
});

export default TrackDetailScreen;
