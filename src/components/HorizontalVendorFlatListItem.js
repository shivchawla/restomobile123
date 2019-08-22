import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Card, Thumbnail, Text, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import { 
	LOADING_IMAGE, 
	BRONZE_BADGE, 
	SILVER_BADGE, 
	GOLD_BADGE, 
	DIAMOND_BADGE 
} from '../images/';

class HorizontalVendorFlatListItem extends Component {
	onMoreInfoButtonPress() {
		this.props.navigation.navigate('VendorScreen', { vendorId: this.props.vendor.id_vendor });
	}

	renderRatingWithBadge() {
		const { rating_average } = this.props.vendor;
		const { badgeImageStyle } = styles;
		let badge;

		if (rating_average > 95) {
			badge = DIAMOND_BADGE;
		} else if (rating_average > 85) {
			badge = GOLD_BADGE;
		} else if (rating_average > 75) {
			badge = SILVER_BADGE;
		} else if (rating_average < 75) {
			badge = BRONZE_BADGE;
		}

		return (
			<View style={{ flexDirection: 'row' }}>
				<View style={{ paddingHorizontal: 3 }}>
					<Image style={badgeImageStyle} source={badge} />
				</View>
				<Text style={{ fontSize: 12 }}>{`${Math.round(rating_average)}%`}</Text>
			</View>
		);
	}

	render() {
		const { logo, company_name } = this.props.vendor;

		const { 
			cardStyle, 
			contentContainerStyle, 
			logoContainerStyle, 
			textContainerStyle, 
			vendorNameTextStyle, 
			buttonContainerStyle 
		} = styles;
		
		return (
			<Card button style={cardStyle}>
				<View style={contentContainerStyle}>
					<View style={logoContainerStyle}>
						<Thumbnail 
							large 
							square 
							source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${logo}` }} 
							defaultSource={LOADING_IMAGE}
							style={{ resizeMode: 'contain' }}
						/>
					</View>
					<View style={textContainerStyle}>
						<Text numberOfLines={1} style={vendorNameTextStyle}>{company_name}</Text>
						{this.renderRatingWithBadge()}
					</View>
					<View style={buttonContainerStyle}>
						<Button 
							small 
							bordered 
							onPress={() => this.onMoreInfoButtonPress()}
						>
							<Text>More Info</Text>
						</Button>
					</View>
				</View>
			</Card>
		);
	}
}

const styles = {
	cardStyle: {
		width: 160, 
		justifyContent: 'space-around'
	},
	contentContainerStyle: {
		padding: 10, 
		alignItems: 'center'
	},
	logoContainerStyle: {
		paddingBottom: 10
	},
	textContainerStyle: {
		paddingBottom: 10, 
		alignItems: 'center'
	},
	badgeImageStyle: {
		height: 13, 
		width: 9
	},
	vendorNameTextStyle: {
		fontSize: 14, 
		fontWeight: '600', 
		color: '#444444'
	},
	buttonContainerStyle: {
		flex: 1
	}
};

export default withNavigation(HorizontalVendorFlatListItem);
