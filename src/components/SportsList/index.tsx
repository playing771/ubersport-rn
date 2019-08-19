import React, { useState } from 'react';
import withAvaliableSportsQuery from '../../api/sports/withAvaliableSportsQuery';
import { FlatList } from 'react-native-gesture-handler';
import onlyUniqFromArrays from '../../other/onlyUniqsFromArrays';
import {
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TextStyle,
	View
} from 'react-native';
import ISport from '../../api/sports/Sport.type';
import ToggleableItem from '../ToggleableItem';
import ULoader from '../ULoader/index';

interface IStyleProps {
	style?: StyleProp<ViewStyle>;
	itemStyle?: StyleProp<ViewStyle>;
	itemTextStyle?: StyleProp<TextStyle>;
	itemNonSelectedTextStyle?: StyleProp<TextStyle>;
	selectionLimit?: number;
}

export interface ISportsFilterListProps extends IStyleProps {
	exclude?: ISport[];
	// selectedItems: string[];
	onChange: (selected: number[]) => void;
}

const SportsList = withAvaliableSportsQuery(
	({
		data: { error, loading, sports },
		// selectedItems,
		onChange,
		exclude,
		style,
		itemStyle,
		itemTextStyle,
		itemNonSelectedTextStyle,
		selectionLimit
	}) => {
		const [selectedSports, setSports] = useState<number[]>([]);

		const onChangeHandle = (selectedId: number) => {
			const selected = [...selectedSports];

			const itemIndex = selected.findIndex(sel => sel === selectedId);
			if (itemIndex > -1) {
				selected.splice(itemIndex, 1);
			} else {
				selected.push(selectedId);
			}
			setSports(selected);
			onChange(selected);
		};

		const renderItem = ({ item }: { item: ISport }) => {
			const active = selectedSports.some(si => item.id === si);
			const exceedMaximum =
				selectionLimit && selectionLimit === selectedSports.length;

			const onPressHandle = (itemId: number) => {
				// отменяем, если превышен selection-лимит
				// активные элементы всегда нажимаются
				if (exceedMaximum && !active) {
					return;
				} else {
					onChangeHandle(itemId);
				}
			};

			function getStyle() {
				const _styles = [styles.itemText, itemTextStyle];
				// если элемент неактивен и лимит превышен, применяем стиль itemNonSelectedTextStyle

				if (!active && exceedMaximum) {
					_styles.push(itemNonSelectedTextStyle);
				}
				return _styles;
			}

			return (
				<ToggleableItem
					key={item.id}
					active={active}
					style={[styles.item, itemStyle]}
					textStyle={getStyle()}
					onPress={onPressHandle}
					itemId={item.id}
					indicatorStyle={styles.indicator}
				>
					{item.name}
				</ToggleableItem>
			);
		};

		if (error) {
			return <Text>{error.message}(</Text>;
		}

		return sports && !loading ? (
			<FlatList
				style={style}
				data={exclude ? onlyUniqFromArrays(sports, exclude) : sports}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
			/>
		) : (
			<View style={[style, styles.loader]}>
				<ULoader color="#667286" size="small" />
			</View>
		);
	}
);

const keyExtractor = (item: ISport, index: number) => String(item.id);

const styles = StyleSheet.create({
	item: {
		minHeight: 50
	},
	itemText: {
		fontSize: 16
	},
	indicator: { fontSize: 28 },
	loader: { minHeight: 350, alignItems: 'center' }
});

export default SportsList;
