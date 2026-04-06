import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  padded = true,
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, padded && styles.padded, { backgroundColor: colors.background }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 16,
  },
});