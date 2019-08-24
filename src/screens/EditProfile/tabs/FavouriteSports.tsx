import React from 'react';
import SportsList from '../../../components/SportsList';
import { EditProfileFormContainer as FormContainer } from '../FormContainer';
import { StyleSheet, Text } from 'react-native';

interface IProps {
  changeSportsHandle: (selected: number[]) => void;
}

export default function FavouriteSportsTab({ changeSportsHandle }: IProps) {
  return (
    <FormContainer withKeyboard={false}>
      <Text style={styles.sportsListTitle}>Выберите любимые виды спорта</Text>
      <SportsList onChange={changeSportsHandle} style={styles.sportsList} />
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  sportsListTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: '#404F7A',
    paddingBottom: 12,
    paddingTop: 24,
  },
  sportsList: {
    // paddingTop:
  },
});
