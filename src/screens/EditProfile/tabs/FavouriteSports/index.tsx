import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ErrorCard from '../../../../components/ErrorCard';
import SportsList from '../../../../components/SportsList';
import ULoader from '../../../../components/ULoader';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { EDIT_PROFILE_MUTATION } from '../../gql';
import { EditProfileSubmitButton as SubmitButton } from '../../SubmitButton';
import { useEditProfileFavouriteSportsQuery } from './gql';

interface IProps {
  userId: string;
}

export default function FavouriteSportsTab({ userId }: IProps) {
  const { data, loading, error } = useEditProfileFavouriteSportsQuery({ id: userId });

  const [newFavoriteSports, setNewFavoriteSports] = useState<number[] | null>(null);

  if (loading) {
    return <ULoader />;
  }

  if (error) {
    return <ErrorCard error={error} />;
  }

  const changeSportsHandle = (sportIds: number[]) => {
    setNewFavoriteSports(sportIds);
  };

  const { favoriteSports } = data.getUserFavouriteSports;

  return (
    <FormContainer withKeyboard={false}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#404F7A', borderStyle: 'solid' }}>
        <Text style={styles.sportsListTitle}>Выберите любимые виды спорта</Text>
      </View>
      <SportsList
        onChange={changeSportsHandle}
        style={styles.sportsList}
        initialValues={favoriteSports.map(fsp => fsp.id)}
        loading={loading}
      />
      <SubmitButton
        gql={EDIT_PROFILE_MUTATION}
        variables={{ id: userId, userInput: { favoriteSports: newFavoriteSports } }}
        style={{ marginTop: 0 }}
        disabled={newFavoriteSports === null}
      />
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
