import React, { useState } from 'react';

import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import withModal from '../../../components/hocs/WithModal';
import withTouch from '../../../components/hocs/WIthTouch';
import useAppContext from '../../../hooks/useAppContext';
import uploadAvatar from '../../../api/user/uploadAvatar';
import AvatarSelectModal from './Modal';
import ProfileAvatar from './ProfileAvatar';
import getFormData from '../../../other/getFormData';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

interface IProps {
  wrapperStyle?: ViewStyle;
  onChange?: (fileId: string | null) => void;
  value?: string | null;
}

type IMAGE_SOURCE = 'GALLERY' | 'CAMERA';

const PICTURE_SIZE = 150;

const ClickableView = withModal(withTouch(View));

const AvatarSelect = ({ wrapperStyle, onChange, value }: IProps) => {
  const [avatar, setAvatar] = useState<string | undefined | null>(value);
  const { user } = useAppContext();

  const getImageHandle = async (type: IMAGE_SOURCE, closeModal: () => void) => {
    const { status } =
      type === 'GALLERY'
        ? await Permissions.askAsync(Permissions.CAMERA_ROLL)
        : await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need  permissions to make this work!');
    } else {
      pickImage(type, closeModal);
    }
  };

  async function pickImage(type: IMAGE_SOURCE, closeModal: () => void) {
    const result: ImagePicker.ImagePickerResult =
      type === 'CAMERA'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
          });
    if (result.cancelled) {
      return;
    }

    closeModal();
    const localUri = (result as ImageInfo).uri;
    const filename = localUri.split('/').pop();
    setAvatar(localUri);
    const formData = getFormData(localUri, filename);

    const response = await uploadAvatar(formData, user.token);
    if (!response.error) {
      if (onChange) {
        onChange(response.id);
      }
    } else {
      console.warn(response.error);
    }
  }

  const deleteImageHandle = (closeModal: () => void) => {
    closeModal();
    setAvatar(undefined);
    onChange(null);
  };

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <ClickableView
        style={styles.mainContainer}
        modal={({ toggleModal }) => (
          <AvatarSelectModal
            avatar={value ? value : avatar}
            useGaleryHandle={() => getImageHandle('GALLERY', toggleModal)}
            useCameraHandle={() => getImageHandle('CAMERA', toggleModal)}
            deleteImageHandle={() => deleteImageHandle(toggleModal)}
          />
        )}
      >
        <ProfileAvatar avatarSrc={value ? value : avatar} />
        <Text style={styles.text}>Изменить аватар</Text>
      </ClickableView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingTop: 12, backgroundColor: '#F1F1F5' },
  mainContainer: { alignSelf: 'center' },
  avatarContainer: {
    width: PICTURE_SIZE,
    height: PICTURE_SIZE,
    borderRadius: PICTURE_SIZE,
    overflow: 'hidden',
  },
  avatarIcon: { alignSelf: 'center' },
  text: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#56BBBC',
  },
});

export default AvatarSelect;
