import React, { ReactElement, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import EditTimeItemForm from './Form';

interface IProps {
  label: string | ReactElement;
  icon: string;
  extra?: string;
  renderInput?: (api: API) => JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
  touchable?: boolean;
  // onChange: (value: number) => void;
}

interface API {
  expanded: boolean;
}

export function EditableDateItem(props: IProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  function getApi(): API {
    return {
      expanded,
    };
  }

  return (
    <View style={[styles.container, props.style]}>
      <EditTimeItemForm
        label={props.label}
        icon={props.icon}
        extra={props.extra}
        disabled={!props.touchable}
        onPress={props.onPress ? props.onPress : toggleInput}
      />
      {props.renderInput && props.renderInput(getApi())}
    </View>
  );
}

EditableDateItem.defaultProps = {
  touchable: true,
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column', overflow: 'hidden' },
});
