import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Spinner } from 'native-base';
import RegisterForm from '../components/RegisterForm';
import { 
	firstNameChanged,
	lastNameChanged,
	emailChanged, 
	passwordChanged, 
	registerUser 
} from '../actions';

class RegisterScreen extends Component {
	static navigationOptions = {
		title: 'Register',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

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
		this.props.registerUser({ 
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			email: this.props.email, 
			password: this.props.password,
		});
	}

	isFormValid() {
		if (this.props.firstName === '' || this.props.lastName === '' || this.props.email === '' || this.props.password === '') {
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
		const { linkTextStyle } = styles;
		return (
			<Container>
				<Content>
						<RegisterForm
							onFirstNameChanged={this.onFirstNameChanged.bind(this)}
							onLastNameChanged={this.onLastNameChanged.bind(this)}
							onEmailChanged={this.onEmailChanged.bind(this)}
							onPasswordChanged={this.onPasswordChanged.bind(this)}
						/>
						{this.renderRegisterButtonOrSpinner()}
						<View style={{ paddingTop: 30 }}>
							<Text 
								style={linkTextStyle}
								onPress={() => this.props.navigation.navigate('RegisterBusinessScreen')}
							>
								Want a business account? Apply here!
							</Text>
						</View>
				</Content>
			</Container>
		);
	}
}

const styles = {
	linkTextStyle: {
		textAlign: 'center',
		color: 'blue',
		paddingTop: 20,
		paddingBottom: 20
	}
};

const mapStateToProps = state => {
	return {
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
	registerUser 
})(RegisterScreen);
