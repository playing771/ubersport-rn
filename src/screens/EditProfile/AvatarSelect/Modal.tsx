import React from 'react';
import UModal from '../../../components/UModal/index';
import { StyleSheet } from 'react-native';
import ProfileAvatar from './ProfileAvatar';
import TextButton from '../../../components/Buttons/TextButton';

interface IProps {
  avatar?: string;
  useGaleryHandle: () => void;
  useCameraHandle: () => void;
  deleteImageHandle: () => void;
}

const AVATAR_SIZE = 120;

// const TextBtn = withTouch(Text);

export default function AvatarSelectModal({
  avatar,
  useGaleryHandle,
  useCameraHandle,
  deleteImageHandle
}: IProps) {
  return (
    <UModal style={styles.wrapper}>
      <ProfileAvatar
        avatarSrc={avatar}
        style={styles.avatar}
        size={AVATAR_SIZE}
      />
      <>
        <TextButton onPress={useGaleryHandle} style={styles.text}>
          Загрузить из галереи
        </TextButton>
        <TextButton onPress={useCameraHandle} style={styles.text}>
          Сделать снимок
        </TextButton>
        {avatar ? (
          <TextButton
            type="danger"
            style={styles.text}
            onPress={deleteImageHandle}
          >
            Удалить изображение
          </TextButton>
        ) : null}
      </>
    </UModal>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingTop: 80 },
  text: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#667286',
    fontWeight: '700',
    fontSize: 14
  },
  avatar: { alignSelf: 'center', position: 'absolute', top: -60 },
  deleteBtn: { color: '#F84472' }
  // itemText: {
  //   color: '#6F6F6F',
  //   fontWeight: '700',
  //   fontSize: 14
  // },
  // item: {
  //   height: 45,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 12
  // }
});
