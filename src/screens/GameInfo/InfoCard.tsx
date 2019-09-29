import React from 'react';
import Card from '../../components/GeneralCard/index';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import EditBtn from '../../components/buttons/EditButton';
import Right from '../../components/Layout/Right';
import RoundButton from '../../components/buttons/RoundButton';
import { useLeaveGameMutation } from './gql';
import useAppContext from '../../hooks/useAppContext';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import withSubmitModal from '../../components/hocs/WithSubmitModal';

const PARTICIPANT_TEXT = 'Вы участник';
const AUTHOR_TEXT = 'Вы модератор';
interface IProps {
  isAuthor: boolean;
  onEditBtnPress: () => void;
  style?: StyleProp<ViewStyle>;
  gameId: string;
}

const LeaveGameButton = withSubmitModal(RoundButton);

const InfoCard = ({ onEditBtnPress, style, isAuthor, gameId }: IProps) => {
  const { user } = useAppContext();
  const [leaveGame, { loading, error }] = useLeaveGameMutation();

  const leaveGameHandle = () => {
    leaveGame({ variables: { gameId, userId: user.id } });
  };

  return (
    <>
      {error && <ErrorGqlCard error={error} />}
      <Card wrapperStyle={[styles.mainContainer, style]} disabled={true}>
        <View style={styles.content}>
          <Ionicons name="ios-checkmark-circle-outline" style={styles.icon} color="white" />

          <Text style={styles.mainText}>{`${isAuthor ? AUTHOR_TEXT : PARTICIPANT_TEXT} !`}</Text>
          {/* <Text style={{ color: '#9FFFC6' }}>Some sub text...</Text> */}

          <Right centered={true} style={{ flexDirection: 'row' }}>
            {isAuthor && <EditBtn onPress={onEditBtnPress} />}
            <LeaveGameButton
              backgroundColor="#F7F5F3"
              icon="ios-log-out"
              onSubmit={leaveGameHandle}
              style={styles.leaveGameBtn}
              iconStyle={styles.leaveGameBtnIcon}
              loadingIndicatorColor={Colors.purle}
              loading={loading}
            />
          </Right>
        </View>
      </Card>
    </>
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
    borderRadius: 0,
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
  leaveGameBtn: { marginLeft: 12, width: 36, height: 36, alignSelf: 'center' },
  leaveGameBtnIcon: { color: Colors.purle, fontSize: 20 },
});

export default InfoCard;
