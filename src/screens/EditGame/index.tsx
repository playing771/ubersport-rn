import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocationData } from 'expo-location';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { CreateGameMutationVariables } from '../../api/games/createGameMutation';
import { EditGameMutationVariables } from '../../api/games/editGameMutation';
import { IAgeLimit, ILocation } from '../../api/games/types';
import withAdaptiveScreen, {
  IAdaptiveScreenOptions,
} from '../../components/hocs/WithAdaptiveScreen';
import { withModal } from '../../components/hocs/WithModal';
import withTouch from '../../components/hocs/WIthTouch';
import { KeyboardView } from '../../components/KeyboardVew';
import Section from '../../components/Layout/Section';
import useAppContext from '../../hooks/useAppContext';
import { NavigationRoot } from '../../navigation/roots';
import { locationUtils } from '../../utils/location';
import { EditGameBtn } from './EditGameBtn';
import { NewGameBtn } from './NewGameBtn';
import { EditPeopleCount, IRestrictions } from './People';
import EditTimeModal from './Time';
import TimeLabel from './Time/TimeLabel';

const adaptiveScreenOptions: IAdaptiveScreenOptions = {
  transparentHeader: false,
  barStyle: 'dark-content',
};

const SectionItem = Section.Item;
const SectionItemWithBtn = withTouch(SectionItem);
const SectionItemWithModal = withModal(SectionItemWithBtn);

const TIME_PLACE_TITLE = 'ВРЕМЯ И МЕСТО';
const GAME_PARAMS_TITLE = 'ПАРАМЕТРЫ ИГРЫ';

const DEFAULT_TIME_LABLE = 'Дата и время';
const DEFAULT_PLACE_LABLE = 'Место';
const NAME_LABLE = 'Название';
const MIN_PEOPLE = 'Минимум участников';
const MAX_PEOPLE = 'Максимум участников';
const NAME_PLACEHOLDER = 'Название игры (обязательно)';
const DESCRIPTION_PLACEHOLDER = 'Описание игры (опционально)';

const ICON_PARAMS = { color: '#B1B2B4', size: 20 };
const ICON_PARAMS_SM = { color: '#B1B2B4', size: 16 };

const MAX_PEOPLE_COUNT = 99;

interface IProps extends NavigationInjectedProps {}

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

interface IState {
  dateStart?: number;
  dateEnd?: number;
  location?: ILocation;
  name: string;
  description: string;
  minParticipants?: number;
  maxParticipants?: number;
  ageLimit?: IAgeLimit;
}

const initialState: IState = {
  dateStart: undefined,
  dateEnd: undefined,
  location: undefined,
  name: '',
  description: '',
  minParticipants: undefined,
  maxParticipants: undefined,
  ageLimit: { min: 0, max: 0 },
};

function EditGameScreen(props: IProps) {
  const { user } = useAppContext();

  const navigationSportId = props.navigation!.getParam('sportId');
  const gameEditData = props.navigation!.getParam('gameEditData');

  const [formState, setFormState] = React.useState<IState>(
    gameEditData ? gameEditData : initialState
  );

  const sportId: number = navigationSportId ? navigationSportId : gameEditData.sportId;
  const gameId: string | undefined = gameEditData ? gameEditData.id : undefined;

  const saveTime = (dateStart: number, dateEnd: number, cbFn: () => void) => {
    setFormState({ ...formState, dateStart, dateEnd });
    cbFn();
  };

  const goToLocationScreen = () => {
    const mapProps: { onLocationChange: (loction: ILocation) => void; location?: LocationData } = {
      onLocationChange: onChangeLocation,
      location: formState.location
        ? locationUtils.convertLocationToExpoLocation(formState.location)
        : undefined,
    };

    props.navigation!.navigate(NavigationRoot.EditLocation, mapProps);
  };

  const onChangeLocation = (location: ILocation) => {
    setFormState({ ...formState, location });
  };

  const onChangeCountminParticipants = (count: number) => {
    setFormState({ ...formState, minParticipants: count });
  };

  const onChangeCountmaxParticipants = (count: number) => {
    setFormState({ ...formState, maxParticipants: count });
  };

  const setGameName = (name: string) => {
    setFormState({ ...formState, name });
  };

  const setGameDescription = (description: string) => {
    setFormState({ ...formState, description });
  };

  function getminParticipantsRestrictions() {
    const maxP = formState.maxParticipants || 0;
    const restrictions: IRestrictions = {
      min: 0,
      max: maxP === 0 ? Math.max(maxP, MAX_PEOPLE_COUNT) : maxP - 1,
    };
    return restrictions;
  }

  function getmaxParticipantsRestrictions() {
    const minP = formState.minParticipants || 0;
    const restrictions: IRestrictions = {
      min: minP,
      max: MAX_PEOPLE_COUNT,
    };
    return restrictions;
  }

  function getDateStartRestrictions() {
    const dateEnd = formState.dateEnd || 0;
    const restrictions: IRestrictions = {
      min: 0,
      max: dateEnd === 0 ? Math.max(dateEnd, MAX_PEOPLE_COUNT) : dateEnd - 1,
    };
    return restrictions;
  }

  function getDateEndRestrictions() {
    const dateStart = formState.dateStart;
    const restrictions: IRestrictions = {
      min: dateStart!, // TODO: remove "!"
      max: MAX_PEOPLE_COUNT,
    };
    return restrictions;
  }

  const {
    dateStart,
    dateEnd,
    location,
    name,
    description,
    minParticipants,
    maxParticipants,
  } = formState;
  // console.log('dateStart,dateStart', dateStart, dateEnd);

  return (
    <>
      <KeyboardView>
        <ScrollView keyboardDismissMode="interactive" style={styles.container}>
          <Section title={TIME_PLACE_TITLE}>
            <SectionItemWithModal
              icon="ios-calendar"
              // iconParams={ICON_PARAMS}
              bordered={true}
              label={
                dateStart && dateEnd
                  ? () => <TimeLabel dateStart={dateStart} dateEnd={dateEnd} />
                  : DEFAULT_TIME_LABLE
              }
              modal={({ closeModal }) => (
                <EditTimeModal
                  onSave={(dStart: number, dEnd: number) => saveTime(dStart, dEnd, closeModal)}
                  dateStartRestrictions={getDateStartRestrictions()}
                  dateEndRestrictions={getDateEndRestrictions()}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                />
              )}
            />
            <SectionItemWithBtn
              label={
                location
                  ? () => <Text style={styles.mainText}>{location.address}</Text>
                  : DEFAULT_PLACE_LABLE
              }
              icon="ios-pin"
              // iconParams={ICON_PARAMS}
              onPress={goToLocationScreen}
            />
          </Section>
          <Section title={GAME_PARAMS_TITLE}>
            <SectionItem
              bordered={true}
              label={() => (
                <View>
                  <Text style={styles.mainText}>{NAME_LABLE}</Text>
                  <TextInput
                    multiline={true}
                    style={styles.subText}
                    placeholder={NAME_PLACEHOLDER}
                    placeholderTextColor={styles.optionalText.color}
                    onChangeText={setGameName}
                    value={name}
                  />
                </View>
              )}
              icon={<MaterialCommunityIcons name="text-short" {...ICON_PARAMS} />}
            />
            <SectionItemWithModal
              icon="ios-contact"
              // iconParams={ICON_PARAMS}
              labelStyle={styles.optionalText}
              bordered={true}
              label={() => (
                <View>
                  <Text style={styles.optionalText}>{MIN_PEOPLE}</Text>
                  {typeof minParticipants !== 'undefined' && minParticipants > 0 && (
                    <Text style={styles.subText}>{minParticipants}</Text>
                  )}
                </View>
              )}
              modal={api => (
                <EditPeopleCount
                  value={minParticipants}
                  onSave={onChangeCountminParticipants}
                  restrictions={getminParticipantsRestrictions()}
                />
              )}
            />
            <SectionItemWithModal
              icon="ios-contacts"
              label={() => (
                <View>
                  <Text style={styles.optionalText}>{MAX_PEOPLE}</Text>
                  {typeof maxParticipants !== 'undefined' && maxParticipants > 0 && (
                    <Text style={styles.subText}>{maxParticipants}</Text>
                  )}
                </View>
              )}
              // iconParams={ICON_PARAMS}
              labelStyle={styles.optionalText}
              bordered={true}
              modal={api => (
                <EditPeopleCount
                  value={maxParticipants}
                  onSave={onChangeCountmaxParticipants}
                  restrictions={getmaxParticipantsRestrictions()}
                />
              )}
            />
            <SectionItem
              bordered={true}
              label={() => (
                <TextInput
                  multiline={true}
                  style={[styles.subText, styles.noPadding]}
                  placeholder={DESCRIPTION_PLACEHOLDER}
                  placeholderTextColor={styles.optionalText.color}
                  onChangeText={setGameDescription}
                  value={description}
                />
              )}
              icon={<MaterialCommunityIcons name="text" {...ICON_PARAMS_SM} />}
            />
          </Section>
        </ScrollView>
      </KeyboardView>
      {gameId ? (
        <EditGameBtn // TODO: validation!!!
          variables={getEditGameVariablesFromState(formState, gameId)}
        />
      ) : (
        <NewGameBtn // TODO: validation!!!
          variables={getNewGameVariablesFromState(formState, user.id, sportId)}
        />
      )}
    </>
  );
}

function getNewGameVariablesFromState(state: IState, authorId: string, sportId: number) {
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

function getEditGameVariablesFromState(state: IState, gameId: string) {
  const variables: EditGameMutationVariables = {
    gameInput: {
      id: gameId,
      name: state.name,
      location: state.location,
      description: state.description,
      dateStart: state.dateStart!,
      dateEnd: state.dateStart,
      maxParticipants: state.maxParticipants,
      minParticipants: state.minParticipants,
    },
  };
  return variables;
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  mainText: { color: '#5F6B8D', fontWeight: '500' },
  // subTextContainer: { flexDirection: 'row', paddingTop: 5 },
  subText: {
    color: '#636F8F',
    paddingTop: 10,
    marginRight: 70, // FIXME: почему нужен такой большой маржин?
    flex: 1,
  },
  optionalText: {
    color: '#AEBBC4',
    fontWeight: '500',
  },
  noPadding: {
    paddingTop: 0,
  },
});

export default withAdaptiveScreen(EditGameScreen, adaptiveScreenOptions);
