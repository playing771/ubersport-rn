import * as React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import {
	AppContext,
	IAppContextInjectedProp
} from '../../other/context/sports';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import { gradient } from '../../constants/generalStyles';
import ToggleableItem from '../../components/ToggleableItem';
import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';
import ISport from '../../api/sports/Sport.type';
import withAppContext from '../../components/hocs/WithAppContext';
import SportsList from '../../components/SportsList';

interface IProps extends IAppContextInjectedProp {}

interface IState {
	selected: number[];
}

@withAppContext
class SportFilters extends React.PureComponent<IProps, IState> {
	static navigationOptions = {
		title: 'Информация об игре',
		headerTitleStyle: {
			color: '#fff',
			fontWeight: '400'
		},
		headerTransparent: true // TODO: fix
	};

	state: IState = { selected: [] };

	// private onError = (err: ApolloError) => {
	//   if (err.networkError && (err.networkError as any).error) {
	//     (err.networkError as any).result.errors.forEach((error: any) => {
	//       console.log(error.message);
	//     });
	//   } else {
	//     console.log(err);
	//   }
	// };

	private toggleSelection = (id: number) => {
		console.log(id);

		const selected = [...this.state.selected];
		console.log(selected);

		const itemIndex = selected.findIndex(s => s === id);
		if (itemIndex > -1) {
			selected.splice(itemIndex, 1);
		} else {
			selected.push(id);
		}

		this.setState({ selected });
	};

	private keyExtractor = (item: ISport, index: number) => String(item.id);

	private renderItem = ({ item }: { item: ISport }) => {
		return (
			<ToggleableItem
				key={item.id}
				active={this.isSelected(item.id)}
				style={styles.item}
				textStyle={styles.itemText}
				onPress={this.toggleSelection}
				itemId={item.id}
				indicatorStyle={{ fontSize: 34 }}
			>
				{item.name}
			</ToggleableItem>
		);
	};

	private isSelected(id: number) {
		return this.state.selected.some(s => s === id);
	}

	private toggleSelectionHandle = (sports: number[]) => {
		this.setState({ selected: sports });
	};

	public render() {
		const { favoriteSports } = this.props.ctx.user;
		return (
			<ScrollView style={styles.container}>
				<Header>Избранные виды</Header>
				<FlatList
					data={favoriteSports}
					extraData={this.state.selected}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
				/>
				<Header>Прочие виды</Header>
				<SportsList
					exclude={favoriteSports}
					// selectedItems={this.state.selected}
					// itemPressHandle={this.toggleSelection}
					onChange={this.toggleSelectionHandle}
				/>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FAFAFA',
		// paddingVertical: 12,
		flex: 1,
		paddingHorizontal: 18
	},
	item: {
		minHeight: 50
	},
	itemText: {
		fontSize: 16
	}
});

const screenOptions: IAdaptiveScreenOptions = {
	transparentHeader: true,
	gradient: gradient,
	barStyle: 'light-content'
	// style: styles.mainContainer
};

export default withAdaptiveScreen(SportFilters, screenOptions);
