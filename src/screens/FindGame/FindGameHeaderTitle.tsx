import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { EvilIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import TextButton from '../../components/Buttons/TextButton';

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
  const { data, loading } = useQuery<any>(GET_ACCOUNT);
  if (loading) {
    return <Text>loading</Text>;
  }

  const { location } = data.user;
  return (
    <View style={styles.container}>
      {!location ? (
        <View style={styles.innerContainer}>
          <TextButton onPress={editGeoHandle}>
            <>
              <Text style={styles.headerTitleStyle}>Укажите свой адресс </Text>
              <Entypo name="location" size={20} color="#dcdcdc" />
            </>
          </TextButton>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <TextButton onPress={editGeoHandle}>
            <Text style={styles.headerTitleStyle}>{location.address}</Text>
          </TextButton>
        </View>
      )}
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
