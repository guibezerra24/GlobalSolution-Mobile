// src/App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

const App: React.FC = () => {
  const handlePress = () => {
    // Por enquanto só um console.log pra testar interação
    console.log('SkillBoost AI - Vamos impulsionar suas habilidades 🚀');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.logo}>SkillBoost AI</Text>

        <Text style={styles.subtitle}>
          Plataforma inteligente de upskilling e reskilling
        </Text>

        <Text style={styles.description}>
          Aqui você vai acompanhar trilhas personalizadas, evoluir suas
          competências e se preparar para o futuro do trabalho.
        </Text>

        <Pressable style={styles.primaryButton} onPress={handlePress}>
          <Text style={styles.primaryButtonText}>Começar jornada</Text>
        </Pressable>

        <Text style={styles.footer}>
          Versão demo • Projeto Global Solution 2025
        </Text>
      </View>
    </SafeAreaView>
  );
};

const PRIMARY_COLOR = '#4C6FFF';
const BACKGROUND_COLOR = '#050817';
const TEXT_COLOR = '#FFFFFF';
const MUTED_TEXT_COLOR = '#A1A5B7';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: BACKGROUND_COLOR,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: MUTED_TEXT_COLOR,
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: TEXT_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    fontSize: 12,
    color: MUTED_TEXT_COLOR,
  },
});

export default App;
