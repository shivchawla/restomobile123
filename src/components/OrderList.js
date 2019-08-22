import React, { Component } from 'react';
import { FlatList } from 'react-native';
import OrderListItem from './OrderListItem';
	
class OrderList extends Component {
	renderOrderListItem(item) {
		return <OrderListItem order={item} />;
	}

	render() {
		return (
			<FlatList 
				data={this.props.orders}
				renderItem={({ item }) => this.renderOrderListItem(item)}
				keyExtractor={(order) => order.id_order}
			/>
		);
	}
}

export default OrderList;
