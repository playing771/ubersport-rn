import { GestureResponderEvent } from 'react-native';
import { Omit } from 'react-navigation';

export type TouchableHighlightPressHandler = (event: GestureResponderEvent, param?: any) => void;

/**
 * Remove from T the keys that are in common with K
 */
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

export type SimpleCallback = () => void;
export type Callback<V = any> = (value: V) => void;

export type ObjectMap<V = any, K extends string | number = string> = { [key in K]: V };

export type SortType = 'time' | 'distance' | 'date';
export type SortOrdering = 'ASC' | 'DESC';
export interface Sort {
  sort: SortType;
  sortOrder?: SortOrdering;
}
