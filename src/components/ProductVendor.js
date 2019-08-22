import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Card, Thumbnail, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { LOADING_IMAGE } from '../images/';

class ProductVendor extends Component {
	render() {
		const { cardStyle, vendorNameSectionStyle, vendorLogoContainerStyle } = styles;
		const product = this.props.navigation.getParam('product');
		
		return (
			<Card 
				transparent
				style={cardStyle}
			>
				<View style={vendorLogoContainerStyle}>
					<View>
						<Thumbnail 
							square
							defaultSource={LOADING_IMAGE}
							source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${product.vendor_logo}` }}
							style={{ resizeMode: 'contain' }} 
						/>
					</View>
					<View style={vendorNameSectionStyle}>
						<Text note>Sold By</Text>
						<Text style={{ fontSize: 14 }}>{product.vendor_name}</Text>
					</View>
					<View style={{ justifyContent: 'center' }}>
						<Button 
							small 
							bordered 
							onPress={() => this.props.navigation.navigate('VendorScreen', { vendorId: product.id_vendor })}
						>
							<Text>View Vendor</Text>
						</Button>
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
	vendorLogoContainerStyle: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	vendorNameSectionStyle: {
		justifyContent: 'space-around', 
		flexShrink: 1, 
		paddingHorizontal: 5
	}
};

export default withNavigation(ProductVendor);
