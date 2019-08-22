import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, H1, Text, Icon } from 'native-base';

class ProductTitle extends Component {
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	render() {
		const { 
			cardStyle, 
			containerStyle, 
			productTextStyle,
			priceContainerStyle, 
			priceTextStyle, 
			deliveredTextStyle,
			ratingContainerStyle, 
			starIconStyle, 
			reviewsTextStyle 
		} = styles;
		const { brand, name, price_regular, rating_average, rating_total } = this.props.product;
		
		return (
			<Card 
				transparent 
				style={cardStyle}
			>
				<View style={containerStyle}>
					<Text note>{brand}</Text>
					<H1 style={productTextStyle}>{name}</H1>
					<View style={priceContainerStyle}>
						<Text style={priceTextStyle}>
							{`IDR ${this.numberWithCommas(price_regular)}`}
						</Text>
						<Text note style={deliveredTextStyle}>
							Delivered in 1 business day
						</Text>
					</View>
					<View style={ratingContainerStyle}>
						<Icon name='star' style={starIconStyle} />
						<Text style={{ color: '#FFD700' }}> {rating_average}</Text>
						<Text style={reviewsTextStyle}>  {`${rating_total} Reviews`}</Text>
					</View>
				</View>
			</Card>
		);
	}
}

const styles = {
	cardStyle: {
		padding: 5,
		borderWidth: 1,
	},
	containerStyle: {
		paddingLeft: 5, 
		paddingTop: 10, 
		paddingBottom: 10, 
		justifyContent: 'space-around'		
	},
	productTextStyle: {
		fontWeight: '600', 
		color: '#444444'
	},
	priceContainerStyle: {
		flex: 1, 
		paddingTop: 10
	},
	priceTextStyle: {
		color: 'tomato', 
		fontSize: 20, 
		fontWeight: '600', 
		textAlign: 'right'
	},
	deliveredTextStyle: {
		textAlign: 'right', 
		fontSize: 12 
	},
	ratingContainerStyle: {
		flexDirection: 'row', 
		paddingTop: 10
	},
	starIconStyle: {
		fontSize: 18, 
		color: '#FFD700'
	},
	reviewsTextStyle: {
		fontSize: 14, 
		color: '#333333', 
		fontStyle: 'italic',
		lineHeight: 20
	}
};

export default ProductTitle;
