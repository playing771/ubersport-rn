import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../../components/GeneralCard';

interface IProps {}

export function EmptyGameCard(props: IProps) {
  return (
    // <Card wrapperStyle={[styles.card, style]} onPress={onPress ? cardPressHandle : undefined}>
    <Card wrapperStyle={styles.card} disabled={true}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons style={styles.icon} name="emoticon-sad" size={60} color="#D1D5DB" />
        <Text style={styles.text}>Сейчас доступных игр нет</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    height: 150,
    borderRadius: 6,
    backgroundColor: '#ffff',
    borderColor: '#CCCCCC',
    overflow: 'hidden',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: { marginTop: 'auto', marginBottom: 'auto' },
  icon: { alignSelf: 'center', marginBottom: 12 },
  text: { fontSize: 16, fontWeight: '500', color: '#9CA0AC' },
});
