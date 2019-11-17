import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DEFAULT_VERTICAL_OFFSET = 128;

interface IProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
  children: ReactElement | ReactElement[];
}

interface IDefaultProps {
  keyboardVerticalOffset: number;
}

export function KeyboardView(props: IProps & IDefaultProps) {
  const { style, contentContainerStyle, scrollEnabled, keyboardVerticalOffset, children } = props;

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="interactive"
      style={style}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollEnabled}
      alwaysBounceVertical={false}
      extraHeight={keyboardVerticalOffset}
      // behavior="position"
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

KeyboardView.defaultProps = {
  keyboardVerticalOffset: DEFAULT_VERTICAL_OFFSET,
};
