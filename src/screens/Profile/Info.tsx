import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
import UserAvatar from '../../components/AvatarsGroup/UserAvatar';
import getRandomUser from '../../other/getRandomUser';
import getAgeFromBirthday from '../../other/getAgeFromBirthday';
import { withNavigation } from 'react-navigation';
import { NavigationRoot } from '../../navigation/roots';
import withUserInfoQuery from '../../api/user/withUserInfoQuery';
import ULoader from '../../components/ULoader/index';
import handleApoloError from '../../other/handleApoloError';
import useNavigation from '../../hooks/useNavigation';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ISex } from '../../api/user/types';

// type IProps = {} & Partial<IGetUserResult> & NavigationScreenProps;

const ProfileInfo = withUserInfoQuery(({ data }) => {
  // const { avatar } = this.props;
  // const {n} = data
  // console.log('data', data);

  const { getUser, loading, error } = data;
  const { navigate } = useNavigation();
  console.log('ProfileInfo', getUser, loading);

  const editProfileHandle = () => {
    navigate(NavigationRoot.EditProfile);
  };

  if (error) {
    console.log(handleApoloError(error));
    return <Text>ERORR</Text>;
  }

  if (loading || !getUser) {
    return <ULoader loading={loading} />;
  }

  const { nickname, lastName, firstName, dateOfBirth, sex } = getUser;

  console.log(nickname, lastName, firstName, dateOfBirth);

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <UserAvatar
          src={getRandomUser('large')}
          size={140}
          imageBorderWidthRatio={0.95}
        />
      </View>
      <View style={styles.botInfo}>
        <View style={styles.infoGroup}>
          <Text style={styles.subMinText}>{`@${nickname}`}</Text>
          <SexIcon sex={sex} />
        </View>

        <Text style={styles.mainText}>{`${lastName} ${firstName}`}</Text>
        <Text style={styles.subText}>{getUserAge(dateOfBirth)} - Moscow</Text>
      </View>
      <View style={styles.moreInfo}>
        {/* <Ionicons name="arrow-forward" size={24} /> */}
      </View>
    </View>
  );
});

function getUserAge(birthday?: number): string {
  let age: string;
  if (typeof birthday === 'undefined') {
    age = 'Возраст неизвестен';
  } else {
    age = getAgeFromBirthday(birthday) + ' Лет';
  }
  return age;
}

function SexIcon({ sex }: { sex: ISex }) {
  const isMale = sex !== 'FEMALE';
  return (
    <Ionicons
      name={isMale ? 'ios-male' : 'ios-female'}
      size={18}
      style={[styles.sexicon, { color: isMale ? Colors.active : Colors.purle }]}
    />
  );
}

function FemaleIcon() {
  return (
    <Ionicons
      name="ios-female"
      size={18}
      style={[styles.sexicon, { color: Colors.purle }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topInfo: {
    // flex: 3,
    borderColor: '#f00',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  reliability: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    // paddingRight: 20
  },
  rating: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingLeft: 20
  },
  botInfo: {
    // flex: 6,
    // paddingLeft: 10,
    // flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  infoGroup: {
    flexDirection: 'row'
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbfdfc',
    paddingTop: 10
  },
  moreInfo: {
    flex: 1
  },
  subText: {
    color: '#cfd9e1',
    marginTop: 5
  },
  subMinText: { color: '#7B8EA4' },
  sexicon: { fontWeight: '800', marginLeft: 6 }
});

export default ProfileInfo;
