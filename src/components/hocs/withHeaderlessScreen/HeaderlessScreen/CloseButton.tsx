import React from 'react';
import withTouch from '../../WIthTouch';
import { Ionicons } from '@expo/vector-icons';

const NonAuthorizedCloseButton = withTouch(() => {
  return <Ionicons name="ios-close" size={38} style={{ fontWeight: '700' }} color="grey" />;
});

export default NonAuthorizedCloseButton;
