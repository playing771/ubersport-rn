import React, { useState } from 'react';

import { Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import withModal from '../../../components/hocs/WithModal';
import withTouch from '../../../components/hocs/WIthTouch';
import useAppContext from '../../../hooks/useAppContext';
import uploadAvatar from '../../../api/user/uploadAvatar';
import AvatarSelectModal from './Modal';
import ProfileAvatar from './ProfileAvatar';
import getFormData from '../../../other/getFormData';

interface IProps {
  // onPress:()=>void≥
}

type IMAGE_SOURCE = 'GALLERY' | 'CAMERA';

const PICTURE_SIZE = 150;

const ClickableView = withModal(withTouch(View));

const AvatarSelect = (props: IProps) => {
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const { user } = useAppContext();

  const getImageHandle = async (type: IMAGE_SOURCE, closeModal: () => void) => {
    const { status } =
      type === 'GALLERY'
        ? await Permissions.askAsync(Permissions.CAMERA_ROLL)
        : await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
          );
    if (status !== 'granted') {
      alert('Sorry, we need  permissions to make this work!');
    } else {
      pickImage(type, closeModal);
    }
  };

  async function pickImage(type: IMAGE_SOURCE, closeModal: () => void) {
    const result =
      type === 'CAMERA'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
          });

    if (!result.cancelled) {
      closeModal();
      const localUri = result.uri;
      const filename = localUri.split('/').pop();
      setAvatar(localUri);
      const formData = getFormData(localUri, filename);

      const response = await uploadAvatar(formData, user.token);
      console.log('RRESPONSE', response);
    }
  }

  const deleteImageHandle = (closeModal: () => void) => {
    closeModal();
    setAvatar(undefined);
  };

  return (
    <ClickableView
      style={styles.mainContainer}
      modal={({ toggleModal }) => (
        <AvatarSelectModal
          avatar={avatar}
          useGaleryHandle={() => getImageHandle('GALLERY', toggleModal)}
          useCameraHandle={() => getImageHandle('CAMERA', toggleModal)}
          deleteImageHandle={() => deleteImageHandle(toggleModal)}
        />
      )}
    >
      <ProfileAvatar avatarSrc={avatar} />
      <Text style={styles.text}>Изменить аватар</Text>
    </ClickableView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { alignSelf: 'center' },
  avatarContainer: {
    backgroundColor: '#D2D5DB',
    width: PICTURE_SIZE,
    height: PICTURE_SIZE,
    borderRadius: PICTURE_SIZE,
    overflow: 'hidden'
  },
  avatarIcon: { alignSelf: 'center' },
  text: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#56BBBC'
  }
});

export default AvatarSelect;
