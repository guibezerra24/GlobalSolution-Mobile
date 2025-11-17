// src/screens/Tracks/TrackFormScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';
import { tracksService } from '../../services/tracksService';
import { Track } from '../../types/Track';
import { useMutation } from '../../hooks/useMutation';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackForm'>;

const TrackFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const isEditing = Boolean(route.params?.trackId);
  const trackId = route.params?.trackId;

  const [loadingTrack, setLoadingTrack] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('intermediario');
  const [workloadHours, setWorkloadHours] = useState('8');
  const [skills, setSkills] = useState('IA, Automação, Dados');

  const { mutate: saveTrack, loading: saving } = useMutation<
    Omit<Track, 'id' | 'createdAt' | 'updatedAt'>,
    Track
  >(async (payload) => {
    if (isEditing && trackId) {
      return tracksService.update(trackId, payload);
    }
    return tracksService.create(payload);
  });

  useEffect(() => {
    if (isEditing && trackId) {
      const load = async () => {
        try {
          setLoadingTrack(true);
          const track = await tracksService.getById(trackId);
          setTitle(track.title);
          setDescription(track.description);
          setLevel(track.level || 'intermediario');
          setWorkloadHours(String(track.workloadHours ?? 8));
          setSkills(track.skills?.join(', ') ?? '');
        } catch (err) {
          console.error(err);
          Alert.alert(
            'Erro',
            'Não foi possível carregar os dados da trilha. Tente novamente.',
          );
        } finally {
          setLoadingTrack(false);
        }
      };

      void load();
    }
  }, [isEditing, trackId]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Atenção', 'Título e descrição são obrigatórios.');
      return;
    }

    const parsedWorkload = Number(workloadHours);
    if (Number.isNaN(parsedWorkload) || parsedWorkload <= 0) {
      Alert.alert(
        'Atenção',
        'Carga horária deve ser um número maior que zero.',
      );
      return;
    }

    const skillsArray = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Omit<Track, 'id' | 'createdAt' | 'updatedAt'> = {
      title: title.trim(),
      description: description.trim(),
      level,
      workloadHours: parsedWorkload,
      skills: skillsArray,
      enrollmentStatus: 'not_enrolled',
      progress: 0,
    };

    await saveTrack(payload, () => {
      Alert.alert(
        'Sucesso',
        isEditing ? 'Trilha atualizada com sucesso.' : 'Trilha criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Tracks');
            },
          },
        ],
      );
    });
  };

  if (loadingTrack) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando dados da trilha...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {isEditing ? 'Editar trilha' : 'Criar nova trilha'}
      </Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Fundamentos de IA e Automação"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Ex.: Trilha focada em IA, automação e machine learning aplicada ao dia a dia."
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Nível</Text>
      <TextInput
        style={styles.input}
        placeholder="iniciante | intermediario | avancado"
        placeholderTextColor={colors.textSecondary}
        value={level}
        onChangeText={setLevel}
      />

      <Text style={styles.label}>Carga horária (horas)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={workloadHours}
        onChangeText={setWorkloadHours}
      />

      <Text style={styles.label}>Habilidades (separadas por vírgula)</Text>
      <TextInput
        style={styles.input}
        placeholder="IA, Automação, Dados"
        placeholderTextColor={colors.textSecondary}
        value={skills}
        onChangeText={setSkills}
      />

      <AppButton
        label={saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar trilha'}
        onPress={handleSubmit}
        fullWidth
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.titleL,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  multiline: {
    textAlignVertical: 'top',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});

export default TrackFormScreen;
