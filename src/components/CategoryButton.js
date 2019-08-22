import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { 
	COFFEE_SUPPLIES, 
	DISPOSABLES, 
	FOOD_BEVERAGES, 
	KITCHEN_EQUIPMENT, 
	SMALLWARES, 
	TABLETOP 
} from '../images';

class CategoryButton extends Component {
	renderButtonImage() {
		const { children } = this.props;
		const { buttonImageStyle } = styles;
		let imageName;

		switch (children) {
			case 'Food & Beverages':
				imageName = FOOD_BEVERAGES;
				break;
			case 'Restaurant Equipment':
				imageName = KITCHEN_EQUIPMENT;
				break;
			case 'Smallwares':
				imageName = SMALLWARES;
				break;
			case 'Coffee Supplies':
				imageName = COFFEE_SUPPLIES;
				break;
			case 'Disposables':
				imageName = DISPOSABLES;
				break;
			case 'Tabletop':
				imageName = TABLETOP;
				break;
			default: 
				imageName = FOOD_BEVERAGES;
		}

		return (
			<Image 
				source={imageName} 
				style={buttonImageStyle} 
			/>
		);
	}

	render() {
		const { children, style, onPress, categoryID } = this.props;
		const { containerStyle, textStyle, imageContainerStyle } = styles;
		return (
			<TouchableOpacity 
				onPress={onPress} 
				style={[containerStyle, style]}
				onPress={() => this.props.navigation.navigate('CategoriesStack', { categoryID: categoryID })}
			>
				<View style={imageContainerStyle}>
					{this.renderButtonImage()}
				</View>	
				<View style={{ marginVertical: 5 }}>				
					<Text style={textStyle}>{children}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	containerStyle: {
		width: '49%',
		marginBottom: 10,
		marginRight: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonImageStyle: {
		height: 40,
		width: 40
	},
	imageContainerStyle: {
		marginTop: 10
	},
	textStyle: {
		textAlign: 'center'
	}
};

export default withNavigation(CategoryButton);
