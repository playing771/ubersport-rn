import React, { useState } from 'react';
import SportsList from '../../../../components/SportsList';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { StyleSheet, Text, View } from 'react-native';
import { EDIT_PROFILE_MUTATION } from '../../gql';
import { EditProfileSubmitButton as SubmitButton } from '../../SubmitButton';
import { useEditProfileFavouriteSportsQuery } from './gql';
import ULoader from '../../../../components/ULoader';
import ErrorGqlCard from '../../../../components/ErrorCard/ErrorGqlCard';

interface IProps {
  userId: string;
}

export default function FavouriteSportsTab({ userId }: IProps) {
  const { data, loading, error } = useEditProfileFavouriteSportsQuery({ id: userId });
  const [favoriteSports, setFavoriteSports] = useState<number[]>([]);

  if (loading) {
    return <ULoader />;
  }

  if (error) {
    return <ErrorGqlCard error={error} />;
  }

  const changeSportsHandle = (sportIds: number[]) => {
    setFavoriteSports(sportIds);
  };

  const { favouriteSports } = data.getUserFavouriteSports;

  return (
    <FormContainer withKeyboard={false}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#404F7A', borderStyle: 'solid' }}>
        <Text style={styles.sportsListTitle}>Выберите любимые виды спорта</Text>
      </View>
      <SportsList
        onChange={changeSportsHandle}
        style={styles.sportsList}
        initialValues={favouriteSports}
        loading={loading}
      />
      <SubmitButton
        gql={EDIT_PROFILE_MUTATION}
        variables={{ id: userId, userInput: { favoriteSports } }}
        style={{ marginTop: 0 }}
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
