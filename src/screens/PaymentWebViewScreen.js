import React, { Component } from 'react';
import MyWebViewComponent from '../components/MyWebViewComponent';

class PaymentWebViewScreen extends Component {
	// back should go to orders?
	static navigationOptions = {
		title: 'Payment',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	render() {
		const url = this.props.navigation.getParam('url');
		return (
			<MyWebViewComponent url={url} />
		);
	}
}

export default PaymentWebViewScreen;
