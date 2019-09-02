import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';
import { ComponentType } from 'react';
import getRandomUser from '../../other/getRandomUser';
import { IParticipant } from '../../api/games/types';

type AvatarGroupProps = {
  style?: StyleProp<ViewStyle>;
  users: IParticipant[];
  limit?: number;
  styleLast?: StyleProp<ViewStyle>;
  AvatarCmp: ComponentType<any>;
} & typeof defaultProps;

const defaultProps = {
  limit: 4,
  avatarSize: 40,
};

const AvatarsGroup: React.SFC<AvatarGroupProps> = ({
  style,
  users,
  limit,
  AvatarCmp,
  styleLast,
  avatarSize,
}) => {
  return (
    <View style={[style, s.container]}>
      {users.slice(0, limit).map((user, index) => {
        // const src = getRandomUser();
        console.log('user.src', user);

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
};

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

type OuterProps = Pick<
  AvatarGroupProps,
  Exclude<keyof AvatarGroupProps, keyof typeof defaultProps>
> &
  Partial<typeof defaultProps>;

export default AvatarsGroup as React.SFC<OuterProps>;
