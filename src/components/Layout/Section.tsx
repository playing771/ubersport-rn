import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import UbSectionItem from './SectionItem';
import UbSectionTitle from './SectionTitle';

interface IProps {
  title?: string;
  titleContainerStyles?: StyleProp<ViewStyle>;
  children: ReactElement | ReactElement[];
}

export default function UbSection({ title, titleContainerStyles, children }: IProps) {
  {
    return (
      <View style={styles.mainContainer}>
        {title && (
          <UbSectionTitle
            title={title}
            textStyle={styles.titleText}
            style={[styles.titleContainer, titleContainerStyles]}
          />
        )}
        {children}
      </View>
    );
  }
}

UbSection.Item = UbSectionItem;
UbSection.Title = UbSectionTitle;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'white',
  },
  titleContainer: {
    paddingHorizontal: 24,
    backgroundColor: '#F9F9FA',
    height: 35,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E5E5E7',
    fontWeight: '200',
  },

  titleText: { color: '#ACB9C3', fontSize: 12, paddingTop: 5 },
});
