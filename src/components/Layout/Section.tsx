import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import UbSectionItem from './SectionItem';
import UbSectionTitle from './SectionTitle';

interface IProps {
	title?: string;
	titleContainerStyles?: StyleProp<ViewStyle>;
}

class UbSection extends React.Component<IProps> {
	static Item = UbSectionItem;
	static Title = UbSectionTitle;

	render() {
		return (
			<View style={styles.mainContainer}>
				{this.props.title && (
					<UbSectionTitle
						title={this.props.title}
						textStyle={styles.titleText}
						style={[
							styles.titleContainer,
							this.props.titleContainerStyles
						]}
					/>
				)}
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		// backgroundColor: 'white',
	},
	titleContainer: {
		paddingHorizontal: 24,
		backgroundColor: '#F9F9FA',
		height: 35,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: '#E5E5E7',
		fontWeight: '200'
	},

	titleText: { color: '#ACB9C3', fontSize: 12, paddingTop: 5 }
});

export default UbSection;
