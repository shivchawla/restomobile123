import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { 
	Card, 
	Container, 
	Content,
	H2,
	Text,
	Icon,
	Button,
	Spinner
} from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'react-moment';

import ProductList from '../components/ProductList';
import Seperator from '../components/common/Seperator';
import { LOADING_IMAGE } from '../images/';
import { fetchVendor } from '../actions/';

class VendorScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
			title: 'Vendor Information',
			headerTitleStyle: {
				color: '#2077be'
			},
			headerLeft: (
				<Button
					transparent
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Icon name='arrow-back' type='Ionicons' />
				</Button>
			)
	});

	componentDidMount() {
		const vendorId = this.props.navigation.getParam('vendorId');
		this.props.fetchVendor(vendorId);
	}

	renderPageOrLoading() {
		const { 
			linearGradientStyle, 
			vendorLogoStyle, 
			vendorNameTitleContainerStyle,
			vendorNameTitleTextStyle,
			joinDateTextStyle,
			messageVendorButtonStyle,
			descriptionTextStyle,
			vendorInfoSectionStyle,
			vendorInfoSectionItemStyle,
			vendorInfoTitleStyle,
			vendorInfoContentStyle,
			iconStyle,
			titleStyle,
			vendorProductsContainerStyle,
			viewAllButtonStyle
		} = styles;

		const { 
			logo, 
			company_name, 
			company_dt_created, 
			description, 
			total_product, 
			total_transactions, 
			rating_average 
		} = this.props.vendor;
		if (this.props.loading) {
			return <Spinner size='small' />;
		}

		return (
			<View>
				<LinearGradient style={linearGradientStyle} colors={['#2980b9', '#2c3e50']} />
				<Image 
					source={{ uri: `https://s3-ap-southeast-1.amazonaws.com/restodepotbucket/${logo}` }} 
					style={vendorLogoStyle}
					defaultSource={LOADING_IMAGE} 
				/>
				<Card transparent>
					<View style={vendorNameTitleContainerStyle}>
						<H2 style={vendorNameTitleTextStyle}>{company_name}</H2>
						<View style={{ flexDirection: 'row' }}>
							<Text style={joinDateTextStyle}>Joined on </Text>
							<Moment 
								style={joinDateTextStyle} 
								element={Text}
								format="MMM YYYY"
							>
								{company_dt_created}
							</Moment>
						</View>
					</View>
					<Button bordered style={messageVendorButtonStyle}>
						<Text>Message Vendor</Text>
					</Button>
					<Seperator />
					<Text style={descriptionTextStyle}>{description}</Text>
				</Card>
				<Seperator />
				<Card transparent style={vendorInfoSectionStyle}>
					<View style={vendorInfoSectionItemStyle}>
						<Icon 
							name='basket' 
							type='SimpleLineIcons' 
							style={iconStyle} 
						/>
						<Text style={vendorInfoTitleStyle}>Products</Text>
						<Text style={vendorInfoContentStyle}>{total_product}</Text>
					</View>
					<View style={vendorInfoSectionItemStyle}>
						<Icon 
							name='layers' 
							type='SimpleLineIcons' 
							style={iconStyle} 
						/>
						<Text style={vendorInfoTitleStyle}>Transactions</Text>
						<Text style={vendorInfoContentStyle}>{total_transactions}</Text>
					</View>
					<View style={vendorInfoSectionItemStyle}>
						<Icon 
							name='badge' 
							type='SimpleLineIcons' 
							style={iconStyle} 
						/>
						<Text style={vendorInfoTitleStyle}>Rating</Text>
						<Text style={vendorInfoContentStyle}>{`${Math.round(rating_average)}%`}</Text>
					</View>
				</Card>
				<Seperator />
				<View style={vendorProductsContainerStyle}>
					<H2 style={titleStyle}>Products</H2>
					{/*
					<View style={viewAllButtonStyle}>
						<Button transparent>
							<Text style={{ color: 'tomato' }}>View all</Text>
						</Button>
					</View>
					*/}
				</View>
				<ProductList products={this.props.products} />
			</View>
		);
	}

	render() {
		return (
			<Container>
				<Content style={{ flex: 1 }}>
				{this.renderPageOrLoading()}
				</Content>
			</Container>
		);
	}
}

const styles = {
	linearGradientStyle: {
		height: Dimensions.get('window').height / 3,
	},
	vendorLogoStyle: {
		position: 'absolute',
		marginTop: Dimensions.get('window').height / 8,
		alignSelf: 'center',
		width: 140,	
		height: 140,
		resizeMode: 'contain'
	},
	vendorNameTitleContainerStyle: {
		paddingTop: 15,
		paddingBottom: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	vendorNameTitleTextStyle: {
		textAlign: 'center',
	},
	joinDateTextStyle: {
		color: 'gray', 
		fontSize: 12, 
		textAlign: 'center'
	},
	messageVendorButtonStyle: {
		alignSelf: 'center',
		marginBottom: 20
	},
	descriptionTextStyle: {
		fontSize: 14, 
		textAlign: 'center',
		paddingVertical: 15,
		paddingHorizontal: 15
	},
	vendorInfoSectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	iconStyle: {
		fontSize: 18
	},
	vendorInfoSectionItemStyle: {
		alignItems: 'center',
		paddingVertical: 20
	},
	vendorInfoTitleStyle: {
		color: '#444444', 
		fontSize: 14
	},
	vendorInfoContentStyle: {
		fontWeight: '600', 
		fontSize: 14
	},
	titleStyle: {
		paddingTop: 20,
		paddingBottom: 15,
		paddingLeft: 7,
		fontSize: 24,
		fontWeight: 'bold'
	},
	vendorProductsContainerStyle: {
		justifyContent: 'space-between', 
		flexDirection: 'row'
	},
	viewAllButtonStyle: {
		justifyContent: 'center', 
		paddingRight: 10, 
		paddingTop: 5
	},	
};

const mapStateToProps = state => {
	return {
		vendor: state.vendor.vendor,
		loading: state.vendor.loading,
		products: state.vendor.products
	};
};

export default connect(mapStateToProps, { fetchVendor })(VendorScreen);
