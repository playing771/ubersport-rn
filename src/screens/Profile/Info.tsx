import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useQuery } from 'react-apollo';
import { StyleSheet, Text, View } from 'react-native';
import { ISex } from '../../api/user/types';
import {
  GET_USER_INFO_GQL,
  IGetUserInfoResult,
  IGetUserInfoVariables,
} from '../../api/user/withUserInfoQuery';
import UserAvatar from '../../components/AvatarsGroup/UserAvatar';
import ErrorCard from '../../components/ErrorCard';
import ULoader from '../../components/ULoader/index';
import Colors from '../../constants/Colors';
import getAgeFromBirthday from '../../utils/getAgeFromBirthday';

interface IProps {
  id: string;
}

export function ProfileInfo({ id }: IProps) {
  const { data, loading, error } = useQuery<IGetUserInfoResult, IGetUserInfoVariables>(
    GET_USER_INFO_GQL,
    { variables: { id } }
  );

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data) {
    return null;
  }

  const { getUser } = data;

  if (loading || !getUser) {
    return <ULoader loading={loading} />;
  }

  const { nickname, lastName, firstName, dateOfBirth, sex } = getUser;

  return (
    <View style={styles.container}>
      <View style={styles.topInfo}>
        <UserAvatar src={getUser.avatar} size={140} imageBorderWidthRatio={0.95} />
      </View>
      <View style={styles.botInfo}>
        <View style={styles.infoGroup}>
          <Text
            style={styles.subMinText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`@${nickname}`}</Text>
          <SexIcon sex={sex} />
        </View>
        {(!!lastName || !!firstName) && (
          <Text
            style={styles.mainText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`${lastName} ${firstName}`}</Text>
        )}
        {dateOfBirth && <Text style={styles.subText}>{getUserAge(dateOfBirth)}</Text>}
      </View>
      <View style={styles.moreInfo}>{/* <Ionicons name="arrow-forward" size={24} /> */}</View>
    </View>
  );
}

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
  console.log('sex : ', sex);
  return (
    sex !== null && (
      <Ionicons
        name={isMale ? 'ios-male' : 'ios-female'}
        size={18}
        style={[styles.sexicon, { color: isMale ? Colors.active : Colors.purle }]}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topInfo: {
    // flex: 3,
    borderColor: '#f00',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  reliability: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingRight: 20
  },
  rating: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 20
  },
  botInfo: {
    // flex: 6,
    // paddingLeft: 10,
    // flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  infoGroup: {
    flexDirection: 'row',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbfdfc',
    paddingTop: 10,
  },
  moreInfo: {
    flex: 1,
  },
  subText: {
    color: '#cfd9e1',
    marginTop: 5,
  },
  subMinText: { color: '#7B8EA4' },
  sexicon: { fontWeight: '800', marginLeft: 6 },
});
