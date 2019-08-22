import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import OrderDetailsListItem from './OrderDetailsListItem';

class OrderDetailsList extends Component {
	renderRow(item) {
		return <OrderDetailsListItem item={item} />;
	}

	render() {
		return (
			<View>
				<FlatList 
					data={this.props.order.items}
					renderItem={({ item }) => this.renderRow(item)}
					keyExtractor={(item) => item.id_checkout_item.toString()}
				/>
			</View>
		);
	}
}

export default OrderDetailsList;
