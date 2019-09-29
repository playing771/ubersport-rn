import React from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  GestureResponderEvent,
  TextStyle,
  ViewStyle,
  TouchableHighlightProps,
  StyleProp,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shadeBlend from '../../../utils/shadeBlend';

interface IButtonProps extends TouchableHighlightProps, IStyleProps {
  title?: string;
  icon?: string;
  iconSize?: number;
  iconDivider?: boolean;
  iconDividerColor?: string;
  rounded?: boolean;
  circle?: boolean;
  square?: boolean;
  onClickId?: string;
  loading?: boolean;
  onPress?: (e: GestureResponderEvent, onClickId?: string) => void;
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  iconColor?: string;
  iconStyle?: StyleProp<TextStyle>;
  // для того, чтобы работало затемнение при нажатии, цвет кнопки нужно передавать через prop backgroundColor
  backgroundColor?: string;
  underlayColor?: string;
  loadingIndicatorColor?: string;
}

const CIRCLE_SIZE = 45;

const defaultProps = {
  iconSize: 14,
  titleColor: '#f7f5f3',
  iconColor: '#f7f5f3',
  backgroundColor: '#4ca7ff',
  iconDividerColor: '#4ca7ff',
  loading: false,
  rounded: false,
  loadingIndicatorColor: '#2f5378',
  // underlayColor: 'transparent'
  // square: false
};

type State = {
  isVisible: boolean;
};

const initialState: State = {
  isVisible: false,
};

class UButton extends React.Component<IButtonProps, State> {
  static defaultProps = defaultProps;

  state = initialState;
  // TODO: this.props for TouchableHighlightProps

  private _getTextLeftMargin = (): number => {
    return this.props.iconDivider ? OUTER_HOR_PADDING : 0;
  };

  private _onPress = (e: GestureResponderEvent) => {
    if (typeof this.props.onPress !== 'undefined') {
      this.props.onPress(e, this.props.onClickId);
    }
  };

  private renderTitle() {
    const s = _getStyle(this.props.style);
    return !this.props.loading ? (
      <Text
        numberOfLines={1}
        style={[
          s.btnText,
          {
            color: this.props.titleColor,
            marginLeft: this._getTextLeftMargin(),
            paddingVertical: OUTER_HOR_PADDING,
          },
          this.props.textStyle,
          // this.props.disabled ? s.btnTextDisabled : undefined
        ]}
      >
        {this.props.title}
      </Text>
    ) : (
      <ActivityIndicator
        size="small"
        color={this.props.loadingIndicatorColor}
        animating={this.props.loading}
      />
    );
  }

  render() {
    const hasIcon =
      !this.props.loading &&
      (typeof this.props.icon !== 'undefined' || this.props.children !== undefined);
    const hasUnderlayColor = typeof this.props.underlayColor !== 'undefined';
    const undrclr = hasUnderlayColor
      ? this.props.underlayColor
      : shadeBlend(-0.1, this.props.backgroundColor!);

    const hasTitle = typeof this.props.title !== 'undefined';
    const s = _getStyle(this.props.style);

    return (
      <>
        <TouchableHighlight
          style={[
            s.btnOuterContainer,
            { backgroundColor: this.props.backgroundColor },
            this.props.rounded ? { borderRadius: 5 } : { borderRadius: 0 },
            this.props.circle
              ? { borderRadius: 99, width: CIRCLE_SIZE, height: CIRCLE_SIZE }
              : undefined,
            this.props.style,
            // this.props.disabled ? s.btnContainerDisabled : undefined
          ]}
          onPress={this._onPress}
          underlayColor={undrclr}
          disabled={this.props.disabled}
        >
          <>
            {this.props.disabled && <View style={s.disabledWrapper} />}
            <View
              style={[
                s.btnInnerContainer,
                { flexDirection: this.props.square ? 'column' : 'row' },
                this.props.square ? { paddingVertical: OUTER_HOR_PADDING } : undefined,
                {},
              ]}
            >
              {hasIcon ? (
                <View
                  style={[
                    s.iconWrapper,
                    !this.props.square && hasTitle
                      ? { paddingRight: OUTER_HOR_PADDING }
                      : undefined,
                  ]}
                >
                  {this.props.icon ? (
                    <Ionicons
                      size={getIconSize(this.props.iconSize, this.props.circle)}
                      name={this.props.icon}
                      style={[s.btnIcon, { color: this.props.iconColor }, this.props.iconStyle]}
                    />
                  ) : (
                    this.props.children
                  )}
                </View>
              ) : (
                undefined
              )}

              <View
                style={[
                  s.textWrapper,
                  {
                    borderLeftWidth: this.props.iconDivider ? 0.3 : 0,
                    borderLeftColor: this.props.iconDividerColor!,
                  },
                  // !this.props.square ? { height: '100%' } : undefined
                ]}
              >
                {this.renderTitle()}
              </View>
            </View>
          </>
        </TouchableHighlight>
      </>
    );
  }
}

const OUTER_HOR_PADDING = 10;

const _getStyle = (style?: any) => {
  // FIXME: remove any
  return StyleSheet.create({
    btnOuterContainer: {
      borderRadius:
        style &&
        (typeof style.borderTopRightRadius !== 'undefined' ||
          typeof style.borderBottomRightRadius !== 'undefined')
          ? 0
          : 3,
    },
    btnInnerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      // flex: 1,
      paddingHorizontal: 10,
    },
    btnIcon: {
      color: '#f7f5f3',
      textAlign: 'center',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    btnText: {
      fontSize: 14,
      textAlign: 'center',
    },
    textWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#1A5B937E',
      zIndex: 99,
      overflow: 'visible',
    },
  });
};

function getIconSize(iconSize?: number, circle?: boolean) {
  let size: number = 0;

  if (circle) {
    size = CIRCLE_SIZE / 1.75;
    return size;
  }

  if (typeof iconSize !== 'undefined') {
    size = iconSize;
  }

  return size;
}

export default UButton;
