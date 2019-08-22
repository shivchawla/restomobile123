import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ShippingAddressItem from './ShippingAddressItem';

class ShippingAddressList extends Component {
	renderRow(shippingAddress) {
		return <ShippingAddressItem shippingAddress={shippingAddress} />;
	}

	render() {
		return (
			<View>
				<FlatList 
					data={this.props.shippingAddresses}
					renderItem={({ item }) => this.renderRow(item)}
					keyExtractor={(shippingAddress) => shippingAddress.id.toString()}
				/>
			</View>
		);
	}
}

export default ShippingAddressList;
