// src/screens/Tracks/TracksScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tracks'>;

type SimpleTrack = {
  id: string;
  title: string;
  level: string;
};

const MOCK_TRACKS: SimpleTrack[] = [
  { id: '1', title: 'Fundamentos de IA e Automação', level: 'Intermediário' },
  { id: '2', title: 'Dados e Analytics para Negócios', level: 'Intermediário' },
  { id: '3', title: 'Liderança Digital e Colaboração', level: 'Avançado' },
];

const TracksScreen: React.FC<Props> = ({ navigation }) => {
  const handleOpenTrack = (trackId: string) => {
    navigation.navigate('TrackDetail', { trackId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trilhas recomendadas</Text>
      <Text style={styles.subtitle}>
        Estas trilhas representam caminhos de upskilling e reskilling alinhados
        às demandas do futuro do trabalho.
      </Text>

      <FlatList
        data={MOCK_TRACKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleOpenTrack(item.id)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardLevel}>Nível: {item.level}</Text>
            <Text style={styles.cardHint}>Toque para ver detalhes</Text>
          </Pressable>
        )}
      />
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
    paddingVertical: 16,
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
  listContent: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  cardLevel: {
    fontSize: 13,
    color: MUTED_TEXT_COLOR,
    marginBottom: 8,
  },
  cardHint: {
    fontSize: 12,
    color: MUTED_TEXT_COLOR,
  },
});

export default TracksScreen;
