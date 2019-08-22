import React, { Component } from 'react';
import { Container, Content, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import ShippingAddressForm from '../components/ShippingAddressForm';
import HeaderBackButton from '../components/common/HeaderBackButton';
import { createShippingAddress } from '../actions';


class AddShippingAddressScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Add Shipping Address',
		headerLeft: <HeaderBackButton navigation={navigation} />,
		headerTitleStyle: {
			color: '#2077be',
		},
	});

	addAddressButtonPress() {
		this.props.createShippingAddress({
			id_resto: 87,
			title: this.props.title,
			address: this.props.address,
			province: this.props.province,
			city: this.props.city,
			postal_code: this.props.postal_code,
			pic: this.props.pic,
			pic_phone: this.props.pic_phone_number,
			lat: this.props.latitude,
			lng: this.props.longitude
		});
	}
	//test this
	renderButtonOrSpinner() {
		if (this.props.loading) {
			return <Spinner />;
		}
		return (
			<Button 
				full 
				success
				onPress={() => this.addAddressButtonPress()}
				style={{ marginTop: 50 }}
			>
				<Text>Add Address</Text>
			</Button>
		);
	}

	render() {
		return (
			<Container>
				<Content>
					<ShippingAddressForm />
					{this.renderButtonOrSpinner()}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	const { 
		title, 
		address, 
		province, 
		city, 
		postal_code, 
		pic, 
		pic_phone_number,
		error,
		longitude,
		latitude,
		loading
	} = state.shippingAddressForm;
	
	const { jwt } = state.auth;
	
	return { 
		title, 
		address, 
		province, 
		city, 
		postal_code, 
		pic, 
		pic_phone_number, 
		error, 
		longitude, 
		latitude,
		loading,
		jwt
	};
};

export default connect(mapStateToProps, { createShippingAddress })(AddShippingAddressScreen);
