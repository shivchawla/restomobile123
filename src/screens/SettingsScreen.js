import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Button } from 'native-base';
import { signOut } from '../actions';
import SettingsListItem from '../components/SettingsListItem';
import deviceStorage from '../services/deviceStorage';


class SettingsScreen extends Component {
	static navigationOptions = {
		title: 'Settings',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	componentDidMount() {
		deviceStorage.loadUserId();
	}

	onLogoutButtonPress() {
		this.props.signOut();
	}

	businessOrPersonal() {
		if (this.props.user_type === '2') {
			return <Text>This is a business account</Text>;
		}
		return <Text>This is a personal account</Text>;
	}
	
	render() {
		console.log(this.props.user_type);
		const { buttonContainerStyle } = styles;
		return (
			<Container>
				{this.businessOrPersonal()}
				<Content contentContainerStyle={{ flex: 1 }}>
					<SettingsListItem iconName='question' destination='ContactUsScreen'>Contact Us</SettingsListItem>
					<SettingsListItem iconName='paper-plane' destination='ShippingAddressScreen'>Shipping Addresses</SettingsListItem>
					{/*
					<SettingsListItem iconName='support' destination='HomeScreen'>Help</SettingsListItem>
					<SettingsListItem iconName='user' destination='HomeScreen'>My Account</SettingsListItem>
					<SettingsListItem iconName='support' destination='HomeScreen'>Apply For Business Account</SettingsListItem>
					*/}
					<View style={buttonContainerStyle}>
						<Button
							onPress={this.onLogoutButtonPress.bind(this)}
							full
							style={{ bottom: 0 }}
						>
							<Text style={{ color: 'white' }}>Logout</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = {
	buttonContainerStyle: {
		flex: 1, 
		justifyContent: 'flex-end'
	}
};

const mapStateToProps = state => {
	return {
		user_type: state.auth.user_type
	};
};

export default connect(mapStateToProps, { signOut })(SettingsScreen);
