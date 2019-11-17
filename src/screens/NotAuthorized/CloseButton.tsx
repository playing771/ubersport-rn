import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import withTouch from '../../components/hocs/WIthTouch';

const NonAuthorizedCloseButton = withTouch(() => {
  return <Ionicons name="ios-close" size={38} style={{ fontWeight: '700' }} color="grey" />;
});

export default NonAuthorizedCloseButton;
