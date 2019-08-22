import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import CartItemProduct from './CartItemProduct';

class CartItemProductList extends Component {
	renderCartItemProduct(item) {
		return (
			<CartItemProduct item={item} onUpdateQuantityItem={this.props.onUpdateQuantityItem} />
		);
	}
	render() {
		return (
			<View>
				<FlatList 
					data={this.props.checkout.items}
					renderItem={({ item }) => this.renderCartItemProduct(item)}
					keyExtractor={(item) => item.id_checkout_item.toString()}
					style={{ paddingBottom: 10 }}
				/>
			</View>
		);
	}
}

export default CartItemProductList;
