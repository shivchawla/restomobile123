import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { updateLongitudeAndLatitude, updateAddressQuery } from '../actions/';
import { PIN_MARKER } from '../images/';
import MapInput from '../components/MapInput';

const axios = require('axios');

class PinLocationMapScreen extends Component {
	static navigationOptions = {
		title: 'Pin Location',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	constructor(props) {
		super(props);
		this.state = { 
			region: { 
				latitude: -6.21462,
				longitude: 106.84513,
				latitudeDelta: 0.0421,
				longitudeDelta: 0.0421, 
			},
			loading: false
		};
	}

	onPinLocationButtonPress(longitude, latitude) {
		this.props.updateLongitudeAndLatitude({ 
			longitude: longitude,
			latitude: latitude
		});
		this.props.navigation.goBack();
	}

	renderNewRegionWithAddress(address) {
		const GEOCODE_API_KEY = 'AIzaSyAcwn0XXXM1hoSGSDQiF7h9eHMkIo2gDVc';
		const parsed_address = address.split(' ').join('+');
		let response;

		this.setState({ loading: true });

		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsed_address}&key=${GEOCODE_API_KEY}`)
			.then(res => {
				console.log(res);
				response = res;
			})
			.catch((error) => console.log(error))
			.then(() => this.setState({ 
				region: { 
					latitude: response.data.results[0].geometry.location.lat,
					longitude: response.data.results[0].geometry.location.lng,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				},
				loading: false 
			}))
			.catch((error) => {
				console.log(error);
				this.setState({ loading: false });
			});
	}

	renderSpinnerOrSearchButton() {
		if (this.state.loading) {
			return (
				<ActivityIndicator 
					style={{ 
						paddingRight: 15,
					}} 
				/>
			);
		}
		return (
			<Button 
				transparent
				onPress={() => this.renderNewRegionWithAddress(this.props.address_query)}
			>
				<Icon name='search' style={{ color: '#2077be' }} />
			</Button>
		);
	}

	render() {
		//final longitude and latitude to be used, different than the one stored in state
		let longitude = this.props.longitude;
		let latitude = this.props.latitude;
		return (
			<Container>
				<Content contentContainerStyle={{ flex: 1 }}>
					<View style={{ flexDirection: 'row' }}>
						<MapInput 
							renderNewRegionWithAddress={this.renderNewRegionWithAddress.bind(this)} 
						/>
						<View style={{ justifyContent: 'center' }}>
							{this.renderSpinnerOrSearchButton()}
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<MapView
							style={{ flex: 1 }}
							region={this.state.region}
							onRegionChangeComplete={(region) => {
								latitude = region.latitude;
								longitude = region.longitude;
							}}
						/>
						<View style={styles.markerFixed}>
							<Image style={styles.marker} source={PIN_MARKER} />
							<TouchableOpacity 
								style={styles.buttonStyle}
								onPress={() => this.onPinLocationButtonPress(longitude, latitude)}
							>
								<Text style={styles.buttonTextStyle}>Pin this location</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = {
	markerFixed: {
		left: '50%',
		marginLeft: -24,
		marginTop: -48,
		position: 'absolute',
		top: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	marker: {
		height: 24,
		width: 24
	},
	buttonStyle: {
		backgroundColor: 'white', 
		padding: 5, 
		borderWidth: 0.2, 
		borderColor: 'black',
		marginTop: 5
	},
	buttonTextStyle: {
		color: '#444444',
		fontSize: 12
	}
};

const mapStateToProps = (state) => {
	const { longitude, latitude, address_query } = state.shippingAddressForm;
	return { longitude, latitude, address_query };
};

export default connect(mapStateToProps, { 
	updateLongitudeAndLatitude, 
	updateAddressQuery,
})(PinLocationMapScreen);
