import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button, Icon } from 'native-base';
import Moment from 'react-moment';
import { withNavigation } from 'react-navigation';
import { LOADING_IMAGE } from '../images/';

class OrderListItem extends Component {
	renderOrderItemsText() {
		const { order } = this.props;
		const { productNameTextStyle } = styles;
		if (order.items.length > 1) {
			return (
				<Text 
					numberOfLines={2}
					style={productNameTextStyle}
				>
						{`${order.items[0].product.name} and ${order.items.length - 1} more items`}
				</Text>
			);
		}
		return (
			<Text 
				numberOfLines={2}
				style={productNameTextStyle}
			>
					{order.items[0].product.name}
			</Text>
		);
	}

	renderDeliveryStatusText() {
		const { order } = this.props;
		let orderStatusText;
		switch (order.status_delivery) {
			case 0:
				orderStatusText = 'Incomplete';
				break;
			case 1:
				orderStatusText = 'Order Processing';
				break;
			case 2:
				orderStatusText = 'Finding Driver';
				break;
			case 3:
				orderStatusText = 'Driver Picking Up Your Order';
				break;
			case 4:
				orderStatusText = 'Driver Out For Delivery';
				break;
			case 5:
				orderStatusText = 'Order Completed';
				break;
			default:
				orderStatusText = 'Error';
		}
		return <Text note numberOfLines={1}>{orderStatusText}</Text>;
	}

	renderStatusPaymentText() {
		const { dateTextStyle } = styles;
		const { order } = this.props;
		if (order.status_payment === 2) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Icon 
						name='ios-checkmark-circle' 
						style={{ fontSize: 16, color: 'green', marginRight: 5 }} 
					/>
					<Text style={dateTextStyle}>Paid on</Text>
					<Moment 
						style={dateTextStyle} 
						element={Text}
						format="D MMM YYYY"
					>
						{order.dt_created}
					</Moment>
				</View>
			);
		} else if (order.status_payment === 3) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Icon 
						name='ios-close-circle' 
						style={{ fontSize: 16, color: 'tomato', marginRight: 5 }} 
					/>
					<Text style={dateTextStyle}>Failed</Text>
				</View>
			);
		} else if (order.status_payment === 4) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Icon 
						name='ios-close-circle' 
						style={{ fontSize: 16, color: 'red', marginRight: 5 }} 
					/>
					<Text style={dateTextStyle}>Pending</Text>
				</View>
			);
		} else if (order.status_payment === 9) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Icon 
						name='ios-close-circle' 
						style={{ fontSize: 16, color: 'yellow', marginRight: 5 }} 
					/>
					<Text style={dateTextStyle}>Pay Later</Text>
				</View>
			);
		}
		
		return (
			<View style={{ flexDirection: 'row' }}>
				<Icon 
					name='ios-close-circle' 
					style={{ fontSize: 16, color: 'red', marginRight: 5 }} 
				/>
				<Text style={dateTextStyle}>Not Paid</Text>
			</View>
		);
	}

	render() {
		const { order } = this.props;
		const { orderTextStyle } = styles;

		return (
			<ListItem thumbnail>
				<Left>
					<Thumbnail 
						square
						large
						defaultSource={LOADING_IMAGE} 
						source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${order.vendor.logo}` }} 
					/>
				</Left>
				<Body>
					<Text style={orderTextStyle}>
						{`Order #${order.id_order}`}
					</Text>
					{this.renderOrderItemsText()}
					{this.renderStatusPaymentText()}
					{this.renderDeliveryStatusText()}
				</Body>
				<Right>
					<Button 
						transparent
						onPress={() => 
							this.props.navigation.navigate('OrderDetailsScreen', { order: order })}
					>
						<Text>View</Text>
					</Button>
				</Right>
			</ListItem>
		);
	}
}

const styles = {
	orderTextStyle: {
		fontSize: 12
	},
	productNameTextStyle: {
		fontSize: 14,
		fontWeight: '600'
	},
	dateTextStyle: {
		fontSize: 14,
		color: '#444444',
		marginRight: 3
	}
};

export default withNavigation(OrderListItem);
