import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Spinner } from 'native-base';
import CredentialForm from '../components/CredentialForm';
import ForgetYourPasswordModal from '../components/ForgetYourPasswordModal';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	forgetEmailChanged, 
	resetPasswordEmailSend 
} from '../actions';
import { LOGO } from '../images/';

class LoginScreen extends Component {
	static navigationOptions = {
		title: 'Login',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	constructor() {
		super();
		this.state = { modalVisible: false };
	}

	onDecline() {
		this.setState({ modalVisible: false });
	}

	onAccept() {
		this.props.resetPasswordEmailSend(this.props.forget_email);
		this.setState({ modalVisible: false });
	}

	onEmailChanged(text) {
		this.props.emailChanged(text);
	}

	onPasswordChanged(text) {
		this.props.passwordChanged(text);
	}

	onForgetEmailChanged(text) {
		this.props.forgetEmailChanged(text);
	}

	onLoginButtonPress() {
		this.props.loginUser({ email: this.props.email, password: this.props.password });
	}

	onRegisterButtonPress() {
		this.props.navigation.navigate('RegisterScreen');
	}

	renderLoginButtonOrSpinner() {
		if (this.props.loading) {
			return <Spinner />;
		}
		return ( 
			<Button
				full
				onPress={this.onLoginButtonPress.bind(this)}
			>
				<Text style={{ color: 'white' }}>Login</Text>
			</Button>
		);
	}

	render() {
		const { textStyle, linkTextStyle, logoContainerStyle, logoStyle } = styles;
		return (
			<Container>
				<Content>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={logoContainerStyle}>
							<Image 
								source={LOGO} 
								style={logoStyle} 
								resize='scale'
							/>
						</View>
					</View>
					<CredentialForm 
						onEmailChanged={this.onEmailChanged.bind(this)}
						onPasswordChanged={this.onPasswordChanged.bind(this)}
					/>
					{this.renderLoginButtonOrSpinner()}
					<Text 
						style={linkTextStyle}
						onPress={() => this.setState({ modalVisible: true })}
					>
						Forgot your password?
					</Text>
					<Text style={textStyle}>Don't have an account yet?</Text>
					<Text 
						style={linkTextStyle}
						onPress={this.onRegisterButtonPress.bind(this)}
					>
						Register here
					</Text>
					<ForgetYourPasswordModal 
						modalVisible={this.state.modalVisible}
						onDecline={this.onDecline.bind(this)}
						onAccept={this.onAccept.bind(this)}
						onForgetEmailChanged={this.onForgetEmailChanged.bind(this)} 
					/>
				</Content>
			</Container>
		);
	}
}

const styles = {
	logoContainerStyle: {
		height: 150,
		width: 150,
	},
	logoStyle: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'contain'
	},
	buttonTextStyle: {
		color: 'white'
	},
	textStyle: {
		alignSelf: 'center',
	},
	linkTextStyle: {
		textAlign: 'center',
		color: 'blue',
		paddingTop: 20,
		paddingBottom: 20
	}
};

const mapStateToProps = state => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		forget_email: state.auth.forget_email,
		loading: state.auth.loading,
		error: state.auth.error,
		user: state.auth.user
	};
};

export default connect(mapStateToProps, { 
	emailChanged, 
	passwordChanged, 
	loginUser, 
	forgetEmailChanged,
	resetPasswordEmailSend
})(LoginScreen);
