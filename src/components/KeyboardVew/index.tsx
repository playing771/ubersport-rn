import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DEFAULT_VERTICAL_OFFSET = 128;

interface IProps extends IDefaultProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
  children: ReactElement | ReactElement[];
  extraScrollHeight?: number;
}

interface IDefaultProps {
  keyboardVerticalOffset: number;
}

export function KeyboardView(props: IProps) {
  const {
    style,
    contentContainerStyle,
    scrollEnabled,
    keyboardVerticalOffset,
    extraScrollHeight,
    children,
  } = props;

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={style}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollEnabled}
      alwaysBounceVertical={false}
      extraHeight={keyboardVerticalOffset}
      enableOnAndroid={true}
      extraScrollHeight={extraScrollHeight}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

KeyboardView.defaultProps = {
  keyboardVerticalOffset: DEFAULT_VERTICAL_OFFSET,
};
