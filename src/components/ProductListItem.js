import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { 
	Card, 
	CardItem,
	Text,
	Body
} from 'native-base';
import { withNavigation } from 'react-navigation';
import { LOADING_IMAGE } from '../images/';

class ProductListItem extends Component {
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	render() {
		const { brand, product_photo, name, price_regular, productPhotos } = this.props.product;

		const { 
			cardStyle, 
			imageStyle, 
			vendorNameTextStyle, 
			productNameTextStyle, 
			priceTextStyle 
		} = styles;

		return (
			<TouchableOpacity 
				onPress={() => 
					this.props.navigation.navigate('ProductDetailScreen', { product: this.props.product })}
			>
				<Card style={cardStyle}>
					<CardItem cardBody>
						<Image 
							source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${product_photo === null ? productPhotos[0].file : product_photo}` }} 
							style={imageStyle}
							defaultSource={LOADING_IMAGE} 
						/>
					</CardItem>
					<CardItem>
						<Body>
							<Text 
								style={vendorNameTextStyle}
								numberOfLines={1}
							>
								{brand}
							</Text>
							<Text 
								style={productNameTextStyle}
								numberOfLines={1}
							>
								{name}
							</Text>
							<Text 
								style={priceTextStyle}
								numberOfLines={1}
							>
								{`IDR ${this.numberWithCommas(price_regular)}`}
							</Text>
						</Body>
					</CardItem>
				</Card>
			</TouchableOpacity>
		);
	}
}

const styles = {
	cardStyle: {
		width: (Dimensions.get('window').width / 2.1),
	},
	imageStyle: {
		height: 200, 
		width: null, 
		flex: 1
	},
	vendorNameTextStyle: {
		fontSize: 12,
		color: 'gray'
	},
	productNameTextStyle: {
		fontSize: 14
	},
	priceTextStyle: {
		fontSize: 14,
		color: 'tomato',
		paddingTop: 10
	}
};

export default withNavigation(ProductListItem);
