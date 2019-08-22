import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { 
	BANNER_SUPPLIER_ONLINE, 
	BANNER_FREE_SHIPPING, 
	BANNER_BETA_PHASE 
} from '../images';


class BannerCarousel extends Component {
	render() {
		const { containerStyle, slide1Style, slide2Style, slide3Style } = styles;
		return (
			<Swiper 
				style={containerStyle}  
				autoplay
				autoplayTimeout={5}
			>
				<View style={slide1Style}>
					<Image source={BANNER_SUPPLIER_ONLINE} />
				</View>
				<View style={slide2Style}>
					<Image source={BANNER_FREE_SHIPPING} />
				</View>
				<View style={slide3Style}>
					<Image source={BANNER_BETA_PHASE} />
				</View>
			</Swiper>
	);
  }
}

const styles = {
	containerStyle: {
		height: 200
	},
	slide1Style: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2Style: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
	},
	slide3Style: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	}
};

export default BannerCarousel;
