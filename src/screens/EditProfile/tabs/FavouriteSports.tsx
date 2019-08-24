import React from 'react';
import SportsList from '../../../components/SportsList';
import { EditProfileFormContainer as FormContainer } from '../FormContainer';
import { StyleSheet, Text, View } from 'react-native';
import { EDIT_USER_MUTATION } from '../gql';
import { EditProfileSubmitButton as SubmitButton } from '../SubmitButton';

interface IProps {
  changeSportsHandle: (selected: number[]) => void;
}

export default function FavouriteSportsTab({ changeSportsHandle }: IProps) {
  return (
    <FormContainer withKeyboard={false}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#404F7A', borderStyle: 'solid' }}>
        <Text style={styles.sportsListTitle}>Выберите любимые виды спорта</Text>
      </View>
      <SportsList onChange={changeSportsHandle} style={styles.sportsList} />
      <SubmitButton gql={EDIT_USER_MUTATION} variables={{}} style={{ marginTop: 0 }} />
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
    flex: 1,
  },
});
