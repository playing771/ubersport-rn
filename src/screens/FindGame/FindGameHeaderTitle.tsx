import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TODOS = gql`
  {
    myLocation @client {
      address
    }
  }
`;

export default function FindGameHeaderTitle() {
  const { data, loading } = useQuery<any>(GET_TODOS);
  if (loading) {
    return <Text>loading</Text>;
  }
  const { myLocation } = data;
  const { address } = myLocation;
  return <Text style={styles.headerTitleStyle}>{address}</Text>;
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20,
  },
});
