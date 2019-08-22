import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Container, Content, Button, Spinner } from 'native-base';
import RegisterBusinessForm from '../components/RegisterBusinessForm';
import { 
	firstNameChanged,
	lastNameChanged,
	emailChanged, 
	passwordChanged,
	registerBusinessUser,
	restoNameChanged,
	companyNameChanged,
	companyAddressChanged,
	provinceChanged,
	cityChanged,
	zipCodeChanged,
	positionChanged,
	mobileNumberChanged,
	phoneNumberChanged,
	npwpChanged,
	removeNPWP 
} from '../actions';

class RegisterBusinessScreen extends Component {
	static navigationOptions = {
		title: 'Register Business Account',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	onRestoNameChanged(text) {
		this.props.restoNameChanged(text);
	}

	onCompanyNameChanged(text) {
		this.props.companyNameChanged(text);
	}

	onCompanyAddressChanged(text) {
		this.props.companyAddressChanged(text);
	}

	onProvinceChanged(text) {
		this.props.provinceChanged(text);
	}

	onCityChanged(text) {
		this.props.cityChanged(text);
	}

	onZipCodeChanged(text) {
		this.props.zipCodeChanged(text);
	}

	onPositionChanged(text) {
		this.props.positionChanged(text);
	}

	onMobileNumberChanged(text) {
		this.props.mobileNumberChanged(text);
	}

	onPhoneNumberChanged(text) {
		this.props.phoneNumberChanged(text);
	}

	onFirstNameChanged(text) {
		this.props.firstNameChanged(text);
	}
	
	onLastNameChanged(text) {
		this.props.lastNameChanged(text);
	}

	onEmailChanged(text) {
		this.props.emailChanged(text);
	}

	onPasswordChanged(text) {
		this.props.passwordChanged(text);
	}

	onRegisterButtonPress() {
		this.props.registerBusinessUser({
			rest_name: this.props.rest_name,
			company_name: this.props.company_name,
			company_address: this.props.company_address,
			province: this.props.province,
			city: this.props.city,
			zipcode: this.props.zipcode,
			position: this.props.position,
			mobile_number: this.props.mobile_number,
			phone_number: this.props.phone_number,
			npwp: this.props.npwp, 
			firstname: this.props.firstName,
			lastname: this.props.lastName,
			email: this.props.email, 
			password: this.props.password,
		});
	}

	onChoosePhotoButtonPress() {
		const options = {
			noData: true,
		};

		ImagePicker.launchImageLibrary(options, response => {
			if (response.uri) {
				this.props.npwpChanged(response);
			}
		});
	}

	onCancelButtonPress() {
		this.props.removeNPWP();
	}

	isFormValid() {
		if (
			this.props.rest_name === '' ||
			this.props.company_name === '' ||
			this.props.company_address === '' ||
			this.props.province === '' ||
			this.props.city === '' ||
			this.props.zipcode === '' ||
			this.props.position === '' ||
			this.props.mobile_number === '' ||
			this.props.phone_number === '' ||
			this.props.firstName === '' || 
			this.props.lastName === '' || 
			this.props.email === '' || 
			this.props.password === ''
		) {
			return false;
		}
		return true;
	}

	renderRegisterButtonOrSpinner() {
		if (this.props.loading) {
			return <Spinner />;
		}
		return (
			<Button 
				full
				onPress={this.onRegisterButtonPress.bind(this)}
				disabled={this.isFormValid() ? false : true}
			>
				<Text style={{ color: 'white' }}>Register</Text>
			</Button>
		);
	}

	render() {
		return (
			<Container>
				<Content>
						<RegisterBusinessForm
							onRestoNameChanged={this.onRestoNameChanged.bind(this)}
							onFirstNameChanged={this.onFirstNameChanged.bind(this)}
							onLastNameChanged={this.onLastNameChanged.bind(this)}
							onEmailChanged={this.onEmailChanged.bind(this)}
							onPasswordChanged={this.onPasswordChanged.bind(this)}
							onCompanyNameChanged={this.onCompanyNameChanged.bind(this)}
							onCompanyAddressChanged={this.onCompanyAddressChanged.bind(this)}
							onProvinceChanged={this.onProvinceChanged.bind(this)}
							onCityChanged={this.onCityChanged.bind(this)}
							onZipCodeChanged={this.onZipCodeChanged.bind(this)}
							onPositionChanged={this.onPositionChanged.bind(this)}
							onMobileNumberChanged={this.onMobileNumberChanged.bind(this)}
							onPhoneNumberChanged={this.onPhoneNumberChanged.bind(this)}
							onChoosePhotoButtonPress={this.onChoosePhotoButtonPress.bind(this)}
							npwp={this.props.npwp}
							onCancelButtonPress={this.onCancelButtonPress.bind(this)}
						/>
						{this.renderRegisterButtonOrSpinner()}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		rest_name: state.auth.rest_name,
		company_name: state.auth.company_name,
		company_address: state.auth.company_address,
		province: state.auth.province,
		city: state.auth.city,
		zipcode: state.auth.zipcode,
		position: state.auth.position,
		mobile_number: state.auth.mobile_number,
		phone_number: state.auth.phone_number,
		npwp: state.auth.npwp,
		firstName: state.auth.firstName,
		lastName: state.auth.lastName,
		email: state.auth.email,
		password: state.auth.password,
		loading: state.auth.loading,
		error: state.auth.error,
		user: state.auth.user
	};
};

export default connect(mapStateToProps, { 
	firstNameChanged,
	lastNameChanged,
	emailChanged, 
	passwordChanged,
	registerBusinessUser,
	restoNameChanged,
	companyNameChanged,
	companyAddressChanged,
	provinceChanged,
	cityChanged,
	zipCodeChanged,
	positionChanged,
	mobileNumberChanged,
	phoneNumberChanged,
	npwpChanged,
	removeNPWP
})(RegisterBusinessScreen);
