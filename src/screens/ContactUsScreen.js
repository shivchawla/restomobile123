import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, 
	Content, 
	H1, 
	H3, 
	Icon, 
	Form, 
	Item, 
	Label, 
	Input, 
	Button, 
	Text,
	Toast
} from 'native-base';
import { ABOUT_US_COVER_IMAGE } from '../images/';
import Seperator from '../components/common/Seperator';
import { submitFeedback } from '../actions/';

//LINKING NEEDS TO BE TESTED ON DEVICE, DOES NOT WORK IN SIMULATOR

class ContactUsScreen extends Component {
	static navigationOptions = {
		title: 'Contact Us',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	constructor(props) {
		super(props);
		this.state = { name: '', email: '', message: '' };
	}

	onSubmitButtonPress() {
		this.props.submitFeedback(
			this.state.name, 
			this.state.email, 
			this.state.message
		);
		this.props.navigation.navigate('HomeScreen');
		return Toast.show({
			text: 'Thank you for your feedback!',
			duration: 3000,
			buttonText: 'Got it!'
		});
	}

	render() {
		const { 
			titleContainerStyle, 
			customerServiceSectionContainerStyle, 
			phoneNumberContainerStyle, 
			phoneIconStyle,
			coverImageStyle,
			feedBackTitleContainerStyle,
			grayTextStyle,
			boldTextStyle
		} = styles;

		return (
			<Container>
				<Content>
					<Image 
						source={ABOUT_US_COVER_IMAGE} 
						style={coverImageStyle} 
					/>
					<View style={titleContainerStyle}>
						<H1 style={boldTextStyle}>A problem with your order?</H1>
						<Text style={grayTextStyle}>We are here to help you</Text>
					</View>
					<Seperator />
					<TouchableOpacity onPress={() => Linking.openURL('tel://+62818678200')}>
						<View style={customerServiceSectionContainerStyle}>
							<View style={phoneNumberContainerStyle}>
								<Icon 
									name='phone' 
									type='SimpleLineIcons' 
									style={phoneIconStyle} 
								/>
								<H3 style={grayTextStyle}>+62 818 678 200</H3>
							</View>

							<View style={{ marginRight: 10 }}>
								<Text style={grayTextStyle}>Monday-Friday</Text>
								<Text style={grayTextStyle}>8AM - 8PM (WIB)</Text>
							</View>
						</View>
					</TouchableOpacity>
					<Seperator />
					<View>
						<View style={feedBackTitleContainerStyle}>
							<H1 style={boldTextStyle}>Feedback?</H1>
							<Text style={grayTextStyle}>We need your help to improve our app</Text>
						</View>
						<Form>
							<Item stackedLabel>
								<Label>Name</Label>
								<Input 
									onChangeText={(text) => this.setState({ name: text })}
								/>
							</Item>
							<Item stackedLabel>
								<Label>Email</Label>
								<Input 
									onChangeText={(text) => this.setState({ email: text })}
									autoCapitalize='none'
								/>
							</Item>
							<Item stackedLabel>
								<Label>Message</Label>
								<Input 
									onChangeText={(text) => this.setState({ message: text })}
								/>
							</Item>
						</Form>
						<View style={{ paddingTop: 40 }}>
							<Button 
								full
								onPress={() => this.onSubmitButtonPress()}
							>
								<Text>Submit Feedback</Text>
							</Button>
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = {
	titleContainerStyle: {
		paddingVertical: 20, 
		paddingLeft: 10, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	phoneNumberContainerStyle: {
		flexDirection: 'row', 
		justifyContent: 'center',
		alignItems: 'center'
	},
	customerServiceSectionContainerStyle: {
		flexDirection: 'row', 
		paddingVertical: 10, 
		paddingLeft: 10,
		justifyContent: 'space-between',
	},
	phoneIconStyle: {
		fontSize: 17, 
		color: '#444444'
	},
	coverImageStyle: {
		height: 250,
		width: null,
		flex: 1
	},
	feedBackTitleContainerStyle: {
		paddingVertical: 20, 
		justifyContent: 'center', 
		alignItems: 'center' 
	},
	grayTextStyle: {
		color: '#444444'
	},
	boldTextStyle: {
		fontWeight: '600'
	}
};

export default connect(null, { submitFeedback })(ContactUsScreen);
