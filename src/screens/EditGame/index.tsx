import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';
import { CreateGameMutationVariables } from '../../api/games/createGameMutation';
import { EditGameMutationVariables } from '../../api/games/editGameMutation';
import { IAgeLimit, ILocation } from '../../api/games/types';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import useAppContext from '../../hooks/useAppContext';
import useNavigation from '../../hooks/useNavigation';
import sharedStyles from '../../sharedStyles';
import { isAndroid, isIOS } from '../../utils/deviceInfo';
import { EditGameForm } from './Form';
import { EditGameBtn } from './Form/buttons/EditGameBtn';
import { NewGameBtn } from './Form/buttons/NewGameBtn';
import { IEditGameState, useEditGameForm } from './Form/useEditGameForm';

export interface IGameEditData {
  dateStart: number;
  dateEnd: number;
  location: ILocation;
  name: string;
  description: string;
  minParticipants?: number;
  maxParticipants?: number;
  ageLimit?: IAgeLimit;
  sportId: number;
  id: string;
}

export function EditGameScreen() {
  const { user } = useAppContext();
  const { getParam } = useNavigation();

  const navigationSportId = getParam('sportId');
  const gameEditData: IGameEditData | undefined = getParam('gameEditData');

  const { formState, dispatch, isValid } = useEditGameForm(gameEditData);

  const gameSportId: number = navigationSportId ? navigationSportId : gameEditData!.sportId;
  const gameId: string | undefined = gameEditData ? gameEditData.id : undefined;

  function renderSubmitButton() {
    return gameId ? (
      <EditGameBtn
        variables={getEditGameVariablesFromState(formState, gameId)}
        disabled={!isValid}
        style={styles.submitButton}
      />
    ) : (
      <NewGameBtn
        variables={getNewGameVariablesFromState(formState, user.id, gameSportId)}
        disabled={!isValid}
        style={styles.submitButton}
      />
    );
  }

  return (
    <View style={[sharedStyles.container]}>
      <KeyboardAwareScrollView
        // contentContainerStyle={{ backgroundColor: 'green' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraHeight={isIOS ? 140 : 75}
        extraScrollHeight={isAndroid ? 120 : 0}
      >
        <SafeAreaView style={[sharedStyles.container]}>
          <EditGameForm {...formState} dispatch={dispatch}>
            {renderSubmitButton()}
          </EditGameForm>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const headerOptions = ({ navigation }: any) => {
  const gameEditData: IGameEditData | undefined = navigation.getParam('gameEditData');

  return {
    title: gameEditData ? 'Редактирование игры' : 'Новая игра',
    ...defaultHeaderOptions,
  };
};

EditGameScreen.navigationOptions = headerOptions;

function getNewGameVariablesFromState(state: IEditGameState, authorId: string, sportId: number) {
  const variables: CreateGameMutationVariables = {
    name: state.name,
    location: state.location!,
    description: state.description,
    sportId,
    dateStart: state.dateStart!,
    dateEnd: state.dateEnd!,
    authorId,
    maxParticipants: state.maxParticipants,
    minParticipants: state.minParticipants,
  };
  return variables;
}

function getEditGameVariablesFromState(state: IEditGameState, gameId: string) {
  const variables: EditGameMutationVariables = {
    gameInput: {
      id: gameId,
      name: state.name,
      location: state.location!,
      description: state.description,
      dateStart: state.dateStart!,
      dateEnd: state.dateEnd!,
      maxParticipants: state.maxParticipants,
      minParticipants: state.minParticipants,
    },
  };
  return variables;
}

const styles = StyleSheet.create({
  submitButton: { borderRadius: 6, marginTop: 24 },
});
