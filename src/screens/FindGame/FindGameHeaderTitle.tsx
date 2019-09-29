import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { EvilIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import TextButton from '../../components/buttons/TextButton';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';

interface IProps {
  editGeoHandle: () => void;
}
const GET_ACCOUNT = gql`
  query UserLocation {
    user: getAccount {
      id
      location {
        address
        coordinates
      }
    }
  }
`;
export default function FindGameHeaderTitle(props: IProps) {
  const { editGeoHandle } = props;
  const { data, loading, error } = useQuery<any>(GET_ACCOUNT);

  // if (error) {
  //   return <ErrorGqlCard error={error}></ErrorGqlCard>;
  // }

  // добавил проверку !data.user иначе подает gameInfo если пользователь не авторизован
  if (error || loading || !data.user) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextButton onPress={editGeoHandle}>
            <>
              <Text style={styles.headerTitleStyle}>Укажите свой адресс </Text>
              <Entypo name="location" size={20} color="#dcdcdc" />
            </>
          </TextButton>
        </View>
      </View>
    );
  }

  const { location } = data.user;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextButton onPress={editGeoHandle}>
          <Text style={styles.headerTitleStyle}>{location.address}</Text>
        </TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
  },
});
