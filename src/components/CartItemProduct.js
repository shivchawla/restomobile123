import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, CardItem, Thumbnail, Spinner } from 'native-base';
import NumericInput from 'react-native-numeric-input';
import { LOADING_IMAGE } from '../images/';
import { numberWithCommas } from '../services/utils';

class CartItemProduct extends Component {
	constructor(props) {
		super(props);
		this.state = { quantity: props.item.quantity };
	}

	renderLoadingOrNumericPicker() {
		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<NumericInput
				value={this.state.quantity}
				initValue={this.state.quantity}
				minValue={this.props.item.product.min_buy_qty}
				totalWidth={75} 
				totalHeight={40}
				rounded 
				textColor='#444444'
				onChange={(quantity) => {
					this.setState({ quantity });
					this.props.onUpdateQuantityItem(this.props.item.id_checkout_item, quantity); 
				}}
			/>
		);
	}

	render() {
		const { textStyle, priceTextStyle, itemTextContainerStyle } = styles;
		const { preview_photo_file } = this.props.item;
		const { name, price_regular } = this.props.item.product;
		return (
			<CardItem bordered style={{ justifyContent: 'space-around' }}>
				<View style={{ justifyContent: 'flex-start' }}>
					<Thumbnail 
						square 
						small
						defaultSource={LOADING_IMAGE} 
						source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${preview_photo_file}` }} 
					/>
				</View>
				<View style={itemTextContainerStyle}>
					<Text 
						style={textStyle} 
						numberOfLines={3}
					>
						{name}
					</Text>
				</View>
				<View>
					{this.renderLoadingOrNumericPicker()}
				</View>
				<View>
					<Text style={priceTextStyle}>{`IDR ${numberWithCommas(price_regular)}`}</Text>
				</View>
			</CardItem>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 12,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 5,
		flexShrink: 1
	},
	itemTextContainerStyle: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 5,
		flex: 0.7
	},
	priceTextStyle: {
		fontSize: 12,
		color: 'tomato',
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 5,
		flexShrink: 1
	}
};

const mapStateToProps = state => {
	return {
		loading: state.cart.loading,
	};
};

export default connect(mapStateToProps, null)(CartItemProduct);
