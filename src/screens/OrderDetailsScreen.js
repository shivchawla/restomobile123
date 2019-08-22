import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { 
	Card, 
	Container, 
	Content,
	H2,
	Text,
	Icon,
	Button 
} from 'native-base';
import Moment from 'react-moment';
import OrderDetailsList from '../components/OrderDetailsList';
import OrderDetailsPriceTotal from '../components/OrderDetailsPriceTotal';
import Seperator from '../components/common/Seperator';
import { 
	ORDER_STATUS_1, 
	ORDER_STATUS_2, 
	ORDER_STATUS_3, 
	ORDER_STATUS_4,
	LOADING_IMAGE, 
} from '../images';
import { payMidtransSingle } from '../actions/';

class OrderDetailsScreen extends Component {
	static navigationOptions = {
		title: 'Order Details',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	onPayNowButtonPress() {
		const order = this.props.navigation.getParam('order');
		this.props.payMidtransSingle(order.id_checkout);
	}

	calculateDeliveryDuration() {
		let deliveryDuration;
		const order = this.props.navigation.getParam('order');
		switch (order.shipping_name) {
			case 'Go-Jek Same Day':
				deliveryDuration = 1;
				break;
			case 'Go-Jek Instant':
				deliveryDuration = 1;
				break;
			case 'Ninja Van':
				deliveryDuration = 3;
				break;
			case 'Vendor Shipping':
				deliveryDuration = 3;
				break;
			case 'Mr. Speedy':
				deliveryDuration = 1;
				break;
			default:
				deliveryDuration = 2;
		}
		return deliveryDuration;
	}

	renderPaidOrNotPaid() {
		const order = this.props.navigation.getParam('order');
		const { paidStatusText } = styles;
		if (order.status_payment === 2) {
			return (
				<View style={{ paddingTop: 20 }}>
					<Text style={paidStatusText}>
						Paid
					</Text>
				</View>
			);
		} else if (order.status_payment === 3) {
			return (
				<View style={{ paddingTop: 20 }}>
					<Text style={paidStatusText}>
						Failed
					</Text>
				</View>
			);
		} else if (order.status_payment === 4) {
			return (
				<View style={{ paddingTop: 20 }}>
					<Text style={paidStatusText}>
						Pending
					</Text>
				</View>
			);
		}
		return (
			<View style={{ paddingTop: 20 }}>
				<Button 
					danger
					onPress={() => this.onPayNowButtonPress()}
				>
					<Text style={{ color: 'white' }}>Not Paid, Tap to Pay Now</Text>
				</Button>
			</View>
		);
	}

	renderOrderStatusImage() {
		const order = this.props.navigation.getParam('order');
		const { orderStatusTextStyle, statusImageContainerStyle } = styles;
		let imageName;
		let orderStatus;
		switch (order.status_delivery) {
			case 0:
				imageName = ORDER_STATUS_1;
				orderStatus = 'Incomplete';
				break;
			case 1:
				imageName = ORDER_STATUS_1;
				orderStatus = 'Order Processing';
				break;
			case 2:
				imageName = ORDER_STATUS_2;
				orderStatus = 'Finding Driver';
				break;
			case 3:
				imageName = ORDER_STATUS_3;
				orderStatus = 'Driver Picking Up Your Order';
				break;
			case 4:
				imageName = ORDER_STATUS_4;
				orderStatus = 'Driver Out For Delivery';
				break;
			case 5:
				imageName = ORDER_STATUS_4;
				orderStatus = 'Order Completed';
				break;
			default:
				return null;
		}
		return (
			<View>
				<View style={statusImageContainerStyle}>
					<Image 
						source={imageName} 
						style={{ flex: 1 }}
						resizeMode='center'
					/>
				</View>
				<H2 style={orderStatusTextStyle}>
					{orderStatus}
				</H2>
			</View>
		);
	}

	render() {
		const order = this.props.navigation.getParam('order');
		console.log(order);
		const { 
			orderTitleSectionStyle, 
			vendorLogoContainerStyle, 
			vendorLogoImageStyle, 
			vendorTitleStyle, 
			orderDeliverySectionStyle, 
			orderDeliveryDateSectionStyle, 
			subHeaderTextStyle,
			textStyle,
			orderDeliveryDestinationSectionStyle,
			iconStyle 
		} = styles;

		return (
			<Container>
				<Content>
					<Card transparent style={orderTitleSectionStyle}>
						<View style={vendorLogoContainerStyle}>
							<Image 
								style={vendorLogoImageStyle} 
								source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${order.vendor.logo}` }}
								defaultSource={LOADING_IMAGE} 
							/>
						</View>
						<H2 style={vendorTitleStyle}>{order.vendor.company_name}</H2>
						<Text>{`Order #${order.checkout_id_transaction}`}</Text>
						<Moment  
							element={Text}
							format='D MMM YYYY'
						>
							{order.dt_created}
						</Moment>
						{this.renderPaidOrNotPaid()}
					</Card>
					<Seperator />
					<Card transparent>
						{this.renderOrderStatusImage()}
					</Card>
					<Seperator />
					<Card transparent style={orderDeliverySectionStyle}>
						<View style={orderDeliveryDestinationSectionStyle}>
							<Icon 
								name='paper-plane' 
								type='SimpleLineIcons' 
								style={iconStyle} 
							/>
							<Text style={subHeaderTextStyle}>Delivered By</Text>
							<Text style={textStyle}>{order.shipping_name}</Text>
						</View>
						<View style={orderDeliveryDateSectionStyle}>
							<Icon 
								name='calendar' 
								type='SimpleLineIcons' 
								style={iconStyle} 
							/>
							<Text style={subHeaderTextStyle}>Delivery Date</Text>
							<Moment
								style={textStyle} 
								element={Text}
								format='D MMM YYYY'
								add={{ days: this.calculateDeliveryDuration(order.shipping_name) }}
							>
								{order.dt_created}
							</Moment>
						</View>
						<View style={orderDeliveryDestinationSectionStyle}>
							<Icon 
								name='location-pin' 
								type='SimpleLineIcons' 
								style={iconStyle} 
							/>
							<Text style={subHeaderTextStyle}>Delivered To</Text>
							<Text style={textStyle}>{order.shippingAddress.name}</Text>
						</View>
					</Card>
					<Seperator />
					<OrderDetailsList order={order} />
					<OrderDetailsPriceTotal order={order} />
				</Content>
			</Container>
		);
	}
}

const styles = {
	statusImageContainerStyle: {
		flexDirection: 'row', 
		flex: 1,
		paddingHorizontal: 10 
	},
	orderTitleSectionStyle: {
		alignItems: 'center',
		paddingVertical: 20
	},
	vendorLogoContainerStyle: {
		paddingBottom: 15 
	},
	// change this fixed dimensions
	vendorLogoImageStyle: {
		height: 100, 
		width: 100
	},
	vendorTitleStyle: {
		paddingVertical: 10,
		fontWeight: '600'
	},
	orderDeliverySectionStyle: {
		flexDirection: 'row', 
		justifyContent: 'space-around',
		paddingVertical: 20
	},
	orderDeliveryDateSectionStyle: {
		alignItems: 'center'
	},
	orderDeliveryDestinationSectionStyle: {
		alignItems: 'center'
	},
	iconStyle: {
		fontSize: 18
	},
	subHeaderTextStyle: {
		color: '#444444', 
		fontSize: 14
	},
	textStyle: {
		fontWeight: '600', 
		fontSize: 14
	},
	paidStatusText: {
		backgroundColor: 'green', 
		color: 'white', 
		padding: 15 
	},
	orderStatusTextStyle: {
		textAlign: 'center', 
		fontWeight: '600', 
		paddingBottom: 20
	}
};

export default connect(null, { payMidtransSingle })(OrderDetailsScreen);
