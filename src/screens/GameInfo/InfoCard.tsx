import React from 'react';
import Card from '../../components/GeneralCard/index';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import EditBtn from '../../components/Buttons/EditButton';
import Right from '../../components/Layout/Right';
import RoundButton from '../../components/Buttons/RoundButton';

const PARTICIPANT_TEXT = 'Вы участник';
const AUTHOR_TEXT = 'Вы модератор';
interface IProps {
  isAuthor: boolean;
  onPressEditBtn: () => void;
  style?: StyleProp<ViewStyle>;
}

const InfoCard = ({ onPressEditBtn, style, isAuthor }: IProps) => {
  return (
    <Card wrapperStyle={[styles.mainContainer, style]} disabled={true}>
      <View style={styles.content}>
        <Ionicons name="ios-checkmark-circle-outline" style={styles.icon} color="white" />

        <Text style={styles.mainText}>{`${isAuthor ? AUTHOR_TEXT : PARTICIPANT_TEXT} !`}</Text>
        {/* <Text style={{ color: '#9FFFC6' }}>Some sub text...</Text> */}

        <Right centered={true} style={{ flexDirection: 'row' }}>
          <EditBtn onPress={onPressEditBtn} />
          <RoundButton
            onPress={() => undefined}
            icon="ios-log-out"
            style={{ marginLeft: 12, width: 36, height: 36, alignSelf: 'center' }}
            backgroundColor="#FFFFFF"
            // backgroundColor={Colors.purle}
            iconStyle={{ color: '#EA3323', fontSize: 20 }}
          />
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
    borderRadius: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
  },
  rounded: {
    borderRadius: 7,
  },
  mainText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 24,
    alignSelf: 'center',
  },
  icon: { fontSize: 30 },
});

export default InfoCard;
