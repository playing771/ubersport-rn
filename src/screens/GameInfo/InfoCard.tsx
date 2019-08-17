import * as React from 'react';
import Card from '../../components/GeneralCard/index';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import EditBtn from '../../components/Buttons/EditButton';
import Right from '../../components/Layout/Right';

// const PARTICIPANT_TEXT = 'Вы участник';
const AUTHOR_TEXT = 'Вы модератор';
interface IProps {
  onPressEditBtn: () => void;
  style?: StyleProp<ViewStyle>;
}

const InfoCard = ({ onPressEditBtn, style }: IProps) => {
  return (
    <Card wrapperStyle={[styles.mainContainer, style]} disabled={true}>
      <View style={styles.content}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          style={styles.icon}
          color="white"
        />

        <Text style={styles.mainText}>{`${AUTHOR_TEXT} !`}</Text>
        {/* <Text style={{ color: '#9FFFC6' }}>Some sub text...</Text> */}

        <Right centered={true}>
          <EditBtn onPress={onPressEditBtn} />
        </Right>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 60,
    backgroundColor: Colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderRadius: 6
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1
  },
  rounded: {
    borderRadius: 7
  },
  mainText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 24,
    alignSelf: 'center'
  },
  icon: { fontSize: 30 }
});

export default InfoCard;
