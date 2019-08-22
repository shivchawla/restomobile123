import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';

class MyWebViewComponent extends Component {
	// http://dev.restodepot.id/checkout_thankyou.html?order_id=TR-CH-1907150589&status_code=200&transaction_status=capture (success credit card)
	// http://dev.restodepot.id/checkout_thankyou.html?order_id=TR-CH-1907150591&status_code=201&transaction_status=pending (pending credit card)
	// http://dev.restodepot.id/checkout_thankyou.html?order_id=TR-CH-1907150593&status_code=201&transaction_status=pending (pending bank transfer)
	// gopay deeplink gojek://gopay/merchanttransfer?tref=JJZ3NOVIB7UL4SDHXIUXAWH4&amount=413160&activity=GP:RR
	
	render() {
		return (
			<WebView 
				source={{ uri: this.props.url }} 
				onShouldStartLoadWithRequest={(request) => {
					console.log(request.url);
					if (request.url.includes('pending')) {
						this.props.navigation.navigate('PaymentPendingScreen');
					} else if (request.url.includes('capture')) {
						this.props.navigation.navigate('PaymentThankYouScreen');
					}
					return true;
				}}
			/>
		);
	}
}

export default withNavigation(MyWebViewComponent);
