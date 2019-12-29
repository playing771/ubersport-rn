import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocationData } from 'expo-location';
import React, { Dispatch, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { IAgeLimit, ILocation } from '../../../api/games/types';
import { withModal } from '../../../components/hocs/WithModal';
import withTouch from '../../../components/hocs/WIthTouch';
import Section from '../../../components/Layout/Section';
import useNavigation from '../../../hooks/useNavigation';
import { NavigationRoot } from '../../../navigation/roots';
import sharedStyles from '../../../sharedStyles';
import { locationUtils } from '../../../utils/location';
import { EditPeopleCount, IRestrictions } from './People';
import EditTimeModal from './Time';
import TimeLabel from './Time/TimeLabel';
import { EditGameActions } from './useEditGameForm';

const SectionItem = Section.Item;
const SectionItemWithBtn = withTouch(SectionItem);
const SectionItemWithModal = withModal(SectionItemWithBtn);

const MAX_PEOPLE_COUNT = 99;

const TIME_PLACE_TITLE = 'ВРЕМЯ И МЕСТО';
const GAME_PARAMS_TITLE = 'ПАРАМЕТРЫ ИГРЫ';

const DEFAULT_TIME_LABLE = 'Дата и время';
const DEFAULT_PLACE_LABLE = 'Место';
const NAME_LABLE = 'Название';
const MIN_PEOPLE = 'Минимум участников';
const MAX_PEOPLE = 'Максимум участников';
const NAME_PLACEHOLDER = 'Название игры (обязательно)';
const DESCRIPTION_PLACEHOLDER = 'Описание игры';

const ICON_PARAMS = { color: '#B1B2B4', size: 20 };
const ICON_PARAMS_SM = { color: '#B1B2B4', size: 16 };

type FormDispatch = Dispatch<EditGameActions>;
interface IProps {
  dateStart?: number;
  dateEnd?: number;
  location?: ILocation;
  name: string;
  description: string;
  minParticipants?: number;
  maxParticipants?: number;
  ageLimit?: IAgeLimit;
  dispatch: FormDispatch;
  children?: ReactNode;
}

export function EditGameForm({
  dateStart,
  dateEnd,
  location,
  name,
  description,
  minParticipants,
  maxParticipants,
  dispatch,
  children,
}: IProps) {
  const { navigate } = useNavigation();

  const goToLocationScreen = () => {
    const mapProps: { onLocationChange: Dispatch<EditGameActions>; location?: LocationData } = {
      onLocationChange: dispatch,
      location: location ? locationUtils.convertLocationToExpoLocation(location) : undefined,
    };

    navigate(NavigationRoot.EditLocation, mapProps);
  };

  return (
    <ScrollView
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[sharedStyles.container]}
      keyboardShouldPersistTaps="always"
    >
      <Section title={TIME_PLACE_TITLE}>
        <SectionItemWithModal
          icon="ios-calendar"
          // iconParams={ICON_PARAMS}
          bordered={true}
          label={
            dateStart && dateEnd ? (
              <TimeLabel dateStart={dateStart} dateEnd={dateEnd} />
            ) : (
              DEFAULT_TIME_LABLE
            )
          }
          modal={({ closeModal }) => (
            <EditTimeModal
              onSave={(dateStart: number, dateEnd: number) =>
                dispatch({ type: 'editTime', payload: { dateEnd, dateStart, cbFn: closeModal } })
              }
              // dateStartRestrictions={getDateStartRestrictions(dateEnd)}
              // dateEndRestrictions={getDateEndRestrictions(dateStart)}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
          )}
        />
        <SectionItemWithBtn
          label={
            location ? <Text style={styles.mainText}>{location.address}</Text> : DEFAULT_PLACE_LABLE
          }
          icon="ios-pin"
          // iconParams={ICON_PARAMS}
          onPress={goToLocationScreen}
        />
      </Section>
      <Section title={GAME_PARAMS_TITLE}>
        <SectionItem
          bordered={true}
          label={<NameLable dispatch={dispatch} name={name} />}
          icon={<MaterialCommunityIcons name="text-short" {...ICON_PARAMS} />}
        />
        <SectionItemWithModal
          icon="ios-contact"
          // iconParams={ICON_PARAMS}
          labelStyle={styles.optionalText}
          bordered={true}
          label={
            <View>
              <Text style={styles.optionalText}>{MIN_PEOPLE}</Text>
              <Text style={styles.subText}>
                {!!minParticipants ? minParticipants : 'Без ограничений'}
              </Text>
            </View>
          }
          modal={api => (
            <EditPeopleCount
              value={minParticipants}
              onSave={minParticipants =>
                dispatch({ type: 'editMinParticipants', payload: { minParticipants } })
              }
              restrictions={getminParticipantsRestrictions(maxParticipants)}
            />
          )}
        />
        <SectionItemWithModal
          icon="ios-contacts"
          label={
            <View>
              <Text style={styles.optionalText}>{MAX_PEOPLE}</Text>
              <Text style={styles.subText}>
                {!!maxParticipants ? maxParticipants : 'Без ограничений'}
              </Text>
            </View>
          }
          // iconParams={ICON_PARAMS}
          labelStyle={styles.optionalText}
          bordered={true}
          modal={api => (
            <EditPeopleCount
              value={maxParticipants}
              onSave={maxParticipants =>
                dispatch({ type: 'editMaxParticipants', payload: { maxParticipants } })
              }
              restrictions={getmaxParticipantsRestrictions(minParticipants)}
            />
          )}
        />
        <SectionItem
          bordered={true}
          label={<DescriptionLabel description={description} dispatch={dispatch} />}
          icon={<MaterialCommunityIcons name="text" {...ICON_PARAMS_SM} />}
        />
      </Section>

      <View style={styles.controls}>{children}</View>
    </ScrollView>
  );
}

function DescriptionLabel({
  description,
  dispatch,
}: {
  description: string;
  dispatch: FormDispatch;
}) {
  return (
    <TextInput
      multiline={true}
      style={[styles.description, styles.subText, styles.noPadding]}
      placeholder={DESCRIPTION_PLACEHOLDER}
      placeholderTextColor={styles.optionalText.color}
      onChangeText={gameDescription =>
        dispatch({ type: 'editGameDescription', payload: { gameDescription } })
      }
      value={description}
    />
  );
}

function NameLable({ dispatch, name }: { name: string; dispatch: FormDispatch }) {
  return (
    <View>
      <Text style={styles.mainText}>{NAME_LABLE}</Text>
      <TextInput
        multiline={true}
        style={styles.subText}
        placeholder={NAME_PLACEHOLDER}
        placeholderTextColor={styles.optionalText.color}
        onChangeText={gameName => dispatch({ type: 'editGameName', payload: { gameName } })}
        value={name}
      />
    </View>
  );
}

function getminParticipantsRestrictions(maxParticipants?: number) {
  const maxP = maxParticipants || 0;
  const restrictions: IRestrictions = {
    min: 0,
    max: maxP === 0 ? Math.max(maxP, MAX_PEOPLE_COUNT) : maxP - 1,
  };
  return restrictions;
}

function getmaxParticipantsRestrictions(minParticipants?: number) {
  const minP = minParticipants || 0;
  const restrictions: IRestrictions = {
    min: minP,
    max: MAX_PEOPLE_COUNT,
  };
  return restrictions;
}

// function getDateStartRestrictions(dateEnd?: number) {
//   const dE = dateEnd || 0;
//   const restrictions: IRestrictions = {
//     min: 0,
//     max: dateEnd === 0 ? Math.max(dE, MAX_PEOPLE_COUNT) : dE - 1,
//   };
//   return restrictions;
// }

// function getDateEndRestrictions(dateStart?: number) {
//   const dS = dateStart;
//   const restrictions: IRestrictions = {
//     min: dS!, // TODO: remove "!"
//     max: MAX_PEOPLE_COUNT,
//   };
//   return restrictions;
// }

const styles = StyleSheet.create({
  container: { position: 'relative' },
  mainText: { color: '#5F6B8D', fontWeight: '500' },
  // subTextContainer: { flexDirection: 'row', paddingTop: 5 },
  description: { minHeight: 35, textAlignVertical: 'top' },
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
  controls: { paddingHorizontal: 24 },
});
