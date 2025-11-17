// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';
import AppButton from '../../components/Button/AppButton';
import InfoCard from '../../components/Card/InfoCard';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'colaborador';

  const handleGoToTracks = () => {
    navigation.navigate('Tracks');
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Olá, {firstName}! Pronto para evoluir hoje?
        </Text>

        <Text style={styles.subtitle}>
          Acompanhe suas trilhas de aprendizado, identifique os próximos passos
          e prepare-se para o futuro do trabalho com apoio da SkillBoost AI.
        </Text>

        <InfoCard
          title="Minha evolução"
          description="Em breve você verá aqui indicadores como trilhas em andamento, horas dedicadas e competências em destaque."
        />

        <InfoCard
          title="Sugestão do dia"
          description="Reserve alguns minutos para avançar em uma trilha estratégica para o seu papel atual ou para a carreira que você deseja atingir."
        />

        <View style={styles.buttons}>
          <AppButton
            label="Explorar trilhas"
            onPress={handleGoToTracks}
            fullWidth
          />

          <AppButton
            label="Meu perfil"
            onPress={handleGoToProfile}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
    flexGrow: 1,
  },
  title: {
    ...typography.titleXL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  buttons: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
});

export default HomeScreen;
