import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import Section from '../../components/Layout/Section';
import withAdaptiveScreen, {
  IAdaptiveScreenOptions,
} from '../../components/hocs/WithAdaptiveScreen';
import EditTime from './Time';
import withModal from '../../components/hocs/WithModal';
import { NavigationRoot } from '../../navigation/roots';
import { ILocation, IAgeLimit } from '../../api/games/types';
import TimeLabel from './Time/Label';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import withTouch from '../../components/hocs/WIthTouch';
import EditPeopleCount, { IRestrictions } from './People';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CreateGameMutationVariables } from '../../api/games/createGameMutation';
import { AppContext } from '../../other/context/sports';
import ISport from '../../api/sports/Sport.type';
import { EditGameMutationVariables } from '../../api/games/editGameMutation';
import EditGameBtn from './EditGameBtn';
import NewGameBtn from './NewGameBtn';
import withAppContext from '../../components/hocs/WithAppContext';

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

interface IProps extends Partial<NavigationInjectedProps> {
  ctx: AppContext;
}

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

@withAppContext
class EditGameScreen extends React.PureComponent<IProps, IState> {
  private sportId: number;
  private gameId?: string;

  constructor(props: IProps) {
    super(props);
    const sport: ISport | undefined = this.props.navigation!.getParam('sport');
    const gameEditData: IGameEditData | undefined = this.props.navigation!.getParam('gameEditData');
    if (!sport && !gameEditData) {
      throw new Error('sport or gameEditData must be provided in editGame screen ');
    }

    this.sportId = sport ? sport.id : gameEditData!.sportId;
    this.gameId = gameEditData ? gameEditData.id : undefined;
    this.state = { ...initialState, ...gameEditData };
  }

  saveTime = (dateStart: number, dateEnd: number, cbFn: () => void) => {
    this.setState({ dateStart, dateEnd }, cbFn);
  };

  goToLocationScreen = () => {
    this.props.navigation!.navigate(NavigationRoot.EditLocation, {
      onLocationChange: this.onChangeLocation,
    });
  };

  onChangeLocation = (location: ILocation) => {
    this.setState({ location });
  };

  onChangeCountminParticipants = (count: number) => {
    this.setState({ minParticipants: count });
  };

  onChangeCountmaxParticipants = (count: number) => {
    this.setState({ maxParticipants: count });
  };

  setGameName = (name: string) => {
    this.setState({ name });
  };

  setGameDescription = (description: string) => {
    this.setState({ description });
  };

  private getminParticipantsRestrictions() {
    const maxP = this.state.maxParticipants || 0;
    const restrictions: IRestrictions = {
      min: 0,
      max: maxP === 0 ? Math.max(maxP, MAX_PEOPLE_COUNT) : maxP - 1,
    };
    return restrictions;
  }

  private getmaxParticipantsRestrictions() {
    const minP = this.state.minParticipants || 0;
    const restrictions: IRestrictions = {
      min: minP,
      max: MAX_PEOPLE_COUNT,
    };
    return restrictions;
  }

  private getDateStartRestrictions() {
    const dateEnd = this.state.dateEnd || 0;
    const restrictions: IRestrictions = {
      min: 0,
      max: dateEnd === 0 ? Math.max(dateEnd, MAX_PEOPLE_COUNT) : dateEnd - 1,
    };
    return restrictions;
  }

  private getDateEndRestrictions() {
    const dateStart = this.state.dateStart || 0;
    const restrictions: IRestrictions = {
      min: dateStart,
      max: MAX_PEOPLE_COUNT,
    };
    return restrictions;
  }

  public render() {
    const {
      dateStart,
      dateEnd,
      location,
      name,
      description,
      minParticipants,
      maxParticipants,
    } = this.state;
    // console.log('dateStart,dateStart', dateStart, dateEnd);

    return (
      <>
        <KeyboardAwareScrollView extraScrollHeight={40}>
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
                modal={({ toggleModal }) => (
                  <EditTime
                    onSave={(dStart: number, dEnd: number) =>
                      this.saveTime(dStart, dEnd, toggleModal)
                    }
                    dateStartRestrictions={this.getDateStartRestrictions()}
                    dateEndRestrictions={this.getDateEndRestrictions()}
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
                onPress={this.goToLocationScreen}
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
                      onChangeText={this.setGameName}
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
                    onSave={this.onChangeCountminParticipants}
                    restrictions={this.getminParticipantsRestrictions()}
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
                    onSave={this.onChangeCountmaxParticipants}
                    restrictions={this.getmaxParticipantsRestrictions()}
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
                    onChangeText={this.setGameDescription}
                    value={description}
                  />
                )}
                icon={<MaterialCommunityIcons name="text" {...ICON_PARAMS_SM} />}
              />
            </Section>
          </ScrollView>
        </KeyboardAwareScrollView>
        {this.gameId ? (
          <EditGameBtn // TODO: validation!!!
            variables={getEditGameVariablesFromState(
              this.state,
              this.props.ctx.user.id,
              this.gameId,
              this.sportId
            )}
          />
        ) : (
          <NewGameBtn // TODO: validation!!!
            variables={getNewGameVariablesFromState(
              this.state,
              this.props.ctx.user.id,
              this.sportId
            )}
          />
        )}
      </>
    );
  }
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

function getEditGameVariablesFromState(
  state: IState,
  authorId: string,
  gameId: string,
  sportId: number
) {
  const variables: EditGameMutationVariables = {
    gameInput: {
      id: gameId,
      name: state.name,
      location: state.location!,
      description: state.description,
      dateStart: state.dateStart!,
      dateEnd: state.dateStart,
      authorId,
      sportId,
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
