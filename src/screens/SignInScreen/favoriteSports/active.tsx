import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SportsList from '../../../components/SportsList/index';

interface IProps extends IActiveStepInjectedProps {}

const initialState: string[] = [];

const SELECTION_LIMIT = 3;

const favoriteSportsActive = ({ onSubmit, index }: IProps) => {
  const [selected, setSelected] = useState(initialState);

  // const toggleSelection = (id: string) => {
  //   const _selected = [...selected];

  //   const itemIndex = _selected.findIndex(s => s === id);
  //   if (itemIndex > -1) {
  //     _selected.splice(itemIndex, 1);
  //   } else {
  //     _selected.push(id);
  //   }
  //   setSelected(_selected);
  // };s

  const onChangeHandle = (sports: string[]) => {
    setSelected(sports);
  };

  useEffect(() => {
    onSubmit(index, selected);
  }, [selected]);

  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={1100}
        useNativeDriver={true}
        style={[styles.titleContainer, styles.userInfoContainer]}
      >
        <Text style={styles.mainText}>
          Выберите до трех видов спорта, которые вы предпочитаете
        </Text>
        {/* <Text style={styles.subText}>Не более трех видов спорта</Text> */}
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={500}
        delay={100}
      >
        <View style={styles.inputsContainer}>
          <SportsList
            // selectedItems={selected}
            // itemPressHandle={toggleSelection}
            onChange={onChangeHandle}
            style={styles.sportsList}
            itemTextStyle={styles.sportText}
            itemNonSelectedTextStyle={styles.sportTextNonSelected}
            selectionLimit={SELECTION_LIMIT}
          />
        </View>
      </AnimatedView>
    </>
  );
};

export const userInfnoValidateFn = (data: string) => {
  return typeof data === 'string' && data.length >= 6;
};

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  inputsContainer: { marginTop: 6 },
  inputWrapper: { marginTop: 12 },
  input: {
    backgroundColor: 'white',
    height: 42,
    lineHeight: 42,
    // borderRadius: 6,
    // paddingHorizontal: 6,
    color: '#5F6B8D'
  },
  userInfoContainer: { marginTop: 12, paddingRight: 24 },
  sportsList: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  sportText: { color: '#5F6B8D' },
  sportTextNonSelected: { color: '#CBD6F2' }
});

export default favoriteSportsActive;
