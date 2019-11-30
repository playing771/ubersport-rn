import React, { ComponentType } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IParticipant } from '../../api/games/types';

interface IProps extends IDefaultProps {
  style?: StyleProp<ViewStyle>;
  users: IParticipant[];
  styleLast?: StyleProp<ViewStyle>;
  AvatarCmp: ComponentType<any>;
}

interface IDefaultProps {
  limit: number;
  avatarSize: number;
}

const defaultProps = {
  limit: 4,
  avatarSize: 40,
};

export function AvatarsGroup({ style, users, limit, AvatarCmp, styleLast, avatarSize }: IProps) {
  return (
    <View style={[style, s.container]}>
      {users.slice(0, limit).map((user, index) => {
        // const src = getRandomUser();
        // console.log('user.src', user);

        return (
          <AvatarCmp
            key={index}
            src={user.avatar}
            style={index > 0 ? s.avatarCmp : undefined}
            size={avatarSize}
          />
        );
      })}
      {users.length > limit && (
        <AvatarCmp size={40} count={users.length - limit} style={[s.avatarCmp, styleLast]} />
      )}
    </View>
  );
}

interface Style {
  container: ViewStyle;
  avatarCmp: ViewStyle;
}

const s = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
  },
  avatarCmp: {
    marginLeft: -10,
  },
});

AvatarsGroup.defaultProps = defaultProps;
