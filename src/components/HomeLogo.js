import React from 'react';
import { View, Image } from 'react-native';
import { LOGO } from '../images/';

function HomeLogo() {
	const { imageStyle, imageContainerStyle } = styles;
	return (
		<View style={imageContainerStyle}>
			<Image
				source={LOGO}
				style={imageStyle}
			/>
		</View>
	);
}

const styles = {
	imageContainerStyle: {
		paddingTop: 25,
		paddingBottom: 25,
		alignSelf: 'center'
	},
	imageStyle: {
		height: 50,
		width: 200,
	}
};

export default HomeLogo;
