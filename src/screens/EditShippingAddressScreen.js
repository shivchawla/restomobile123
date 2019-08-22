import React, { Component } from 'react';
import { Platform } from 'react-native';
import { 
	Icon, 
	Container, 
	Content, 
	Button, 
	Text, 
	Header, 
	Left, 
	Right, 
	Body, 
	Title,
	Spinner 
} from 'native-base';
import { connect } from 'react-redux';
import ShippingAddressForm from '../components/ShippingAddressForm';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { deleteShippingAddress, updateShippingAddress } from '../actions/';


class EditShippingAddressScreen extends Component {
	static navigationOptions = {
		title: 'Edit Shipping Address',
		headerTitleStyle: {
			color: '#2077be',
		},
		header: null,
	};

	constructor() {
		super();
		this.state = { modalVisible: false };
	}

	onAccept() {
		const shippingAddressId = this.props.navigation.getParam('id');
		this.props.deleteShippingAddress(shippingAddressId);
		this.setState({ modalVisible: false });
	}

	onDecline() {
		this.setState({ modalVisible: false });
	}

	onSaveChangesButtonPress() {
		const shippingAddressId = this.props.navigation.getParam('id');
		this.props.updateShippingAddress({
			id: shippingAddressId,
			title: this.props.title,
			address: this.props.address,
			province: this.props.province,
			city: this.props.province,
			postal_code: this.props.postal_code,
			pic_name: this.props.pic,
			pic_phone: this.props.pic_phone_number,
			lat: this.props.latitude,
			lng: this.props.longitude,
		});
	}

	renderDeleteButtonOrSpinner() {
		if (this.props.loading) {
			return <Spinner />;
		}
		return (
			<Button 
				transparent
				onPress={() => this.setState({ modalVisible: true })}
			>
				<Icon name='trash' style={{ fontSize: 24 }} />
			</Button>
		);
	}

	renderSaveChangesOrSpinner() {
		if (this.props.loading) {
			return <Spinner />;
		}
		return (
			<Button 
				full 
				success
				onPress={() => this.onSaveChangesButtonPress()}
			>
				<Text>Save Changes</Text>
			</Button>
		);
	}

	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button 
							transparent
							onPress={() => this.props.navigation.goBack(null)}
						>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Title style={{ color: Platform.OS === 'ios' ? '#2077be' : 'white' }}>Edit Address</Title>
					</Body>
					<Right>
						{this.renderDeleteButtonOrSpinner()}
					</Right>
				</Header>
				<Content>
					<ShippingAddressForm />
					{this.renderSaveChangesOrSpinner()}
				<ConfirmDeleteModal 
					modalVisible={this.state.modalVisible}
					onAccept={this.onAccept.bind(this)} 
					onDecline={this.onDecline.bind(this)}
				/>
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
		shipping_addresses,
		loading
	} = state.shippingAddressForm;
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
		loading, 
		latitude,
		shipping_addresses
	};
};

export default connect(mapStateToProps, { 
	deleteShippingAddress, 
	updateShippingAddress 
})(EditShippingAddressScreen);
