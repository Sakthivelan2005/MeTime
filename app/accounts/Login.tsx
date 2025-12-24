// src/app/index.tsx (or any screen)
import { ThemedText } from '@/components/themed-text';
import { useScale } from '@/hooks/useScale';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { width, height, scale, landscape, tall } = useScale();

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { fontSize: 20 * scale }]}>
        {`w: ${width.toFixed(0)} h: ${height.toFixed(0)}`}
      </ThemedText>

      <View
        style={[
          styles.box,
          landscape ? styles.boxLandscape : styles.boxPortrait,
          tall && styles.boxTallPhone,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 16 },
  box: { backgroundColor: 'tomato' },
  boxPortrait: { width: 200, height: 100 },
  boxLandscape: { width: 300, height: 80 },
  boxTallPhone: { marginTop: 40 },
});
