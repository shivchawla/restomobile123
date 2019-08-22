import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, StyleProvider, getTheme } from 'native-base';

class SpecificationsSegmentContent extends Component {
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	render() {
		const { product } = this.props;
		const { contentContainerStyle, textStyle, iconStyle } = styles;

		return (
			<View>
				<View style={contentContainerStyle}>
					<StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
						<Icon 
							name="cube"
							style={iconStyle} 
						/>
					</StyleProvider>
					<Text style={textStyle}>
						{`${product.dimension_length}cm (L) x ${product.dimension_width}cm (W) x ${product.dimension_height}cm (H)`}
					</Text>
				</View>

				<View style={contentContainerStyle}>
					<StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
						<Icon 
							name="weight"
							style={iconStyle} 
						/>
					</StyleProvider>
					<Text style={textStyle}>{ `${this.numberWithCommas(product.weight)} grams` }</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	contentContainerStyle: {
		flexDirection: 'row',
		marginBottom: 5
	},
	iconStyle: {
		fontSize: 16
	},
	textStyle: {
		color: '#444444'
	}
};

export default SpecificationsSegmentContent;
