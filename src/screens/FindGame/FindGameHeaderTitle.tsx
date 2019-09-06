import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { EvilIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import TextButton from '../../components/Buttons/TextButton';

interface IProps {
  editGeoHandle: () => void;
}

const GET_TODOS = gql`
  {
    myLocation @client {
      address
    }
  }
`;

export default function FindGameHeaderTitle(props: IProps) {
  const { editGeoHandle } = props;
  const { data, loading } = useQuery<any>(GET_TODOS);
  if (loading) {
    return <Text>loading</Text>;
  }
  const { myLocation } = data;
  const { address } = myLocation;
  return (
    <View style={styles.container}>
      {!address ? (
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
          <Text style={styles.headerTitleStyle}>{address}</Text>
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
