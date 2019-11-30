import { GestureResponderEvent } from 'react-native';
import { Omit } from 'react-navigation';

export type TouchableHighlightPressHandler = (event: GestureResponderEvent, param?: any) => void;

/**
 * Remove from T the keys that are in common with K
 */
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

export type SimpleCallback = () => void;
