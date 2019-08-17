import * as React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Right from '../../components/Layout/Right';

interface Props {
  title: string;
  subTitle: string;
  style?: StyleProp<ViewStyle>;
}

const ParticipantsHeader: React.FC<Props> = ({ title, subTitle, style }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={_styles.mainText}>{title}</Text>
        <Right>
          <Ionicons
            name="ios-close"
            style={{
              fontSize: 30
            }}
            color="#303030"
          />
        </Right>
      </View>
      <Text style={_styles.subText}>{subTitle}</Text>
      {/* <UButton
        onPress={() => undefined}
        title="Пригласить участников"
        style={{ height: 40, width: "100%", borderRadius: 4, marginTop: 5 }}
        rounded={true}
      /> */}
    </View>
  );
};

const _styles = StyleSheet.create({
  mainText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 30
  },
  subText: {
    color: '#B7B7B7',
    fontWeight: '500',
    paddingVertical: 12
  }
});

export default ParticipantsHeader;
