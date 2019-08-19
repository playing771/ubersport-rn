import * as React from './node_modules/react';
import { View, StyleSheet } from 'react-native';

interface Props {
	centered?: boolean;
}

const Left: React.SFC<Props> = props => {
	return (
		<View
			style={[
				_styles.container,
				props.centered ? _styles.centered : undefined
			]}
		>
			{props.children}
		</View>
	);
};

const _styles = StyleSheet.create({
	container: { marginRight: 'auto' },
	centered: { alignSelf: 'center' }
});

export default Left;
