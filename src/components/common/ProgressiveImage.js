import React, { Component } from 'react';
import { View, Image } from 'react-native';

class ProgressiveImage extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image {...this.props} />
			</View>
		);
	}
}

const styles = {
	container: {
		backgroundColor: '#e1e4e8',
		flex: 1
	},
};

export default ProgressiveImage;
