import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { LOCATION_SUCCESS } from '../images';

class RegisterBusinessForm extends Component {
	renderButtonOrCheckmark() {
		const { onCancelButtonPress } = this.props;

		if (typeof this.props.npwp.fileName === 'undefined') {
			return (
				<View>
					<Button 
						bordered 
						success
						onPress={() => this.props.onChoosePhotoButtonPress()}
					>
						<Text>Upload NPWP or KTP</Text>
					</Button>
				</View>
			);
		}
		return (
			<View style={{ alignItems: 'center' }}>
				<Image source={LOCATION_SUCCESS} style={{ height: 50, width: 50 }} />
				<Text>We got your photo!</Text>
				<Button 
					onPress={() => onCancelButtonPress()}
					style={{ alignSelf: 'center', marginTop: 10 }}
				>
					<Text>Cancel</Text>
				</Button>
			</View>
		);
	}

	render() {
		const { 
			onEmailChanged, 
			onPasswordChanged, 
			onFirstNameChanged, 
			onLastNameChanged,
			onRestoNameChanged,
			onCompanyNameChanged,
			onCompanyAddressChanged,
			onProvinceChanged,
			onCityChanged,
			onZipCodeChanged,
			onPositionChanged,
			onMobileNumberChanged,
			onPhoneNumberChanged, 
		} = this.props;

		return (
			<Form>
				<View style={{ paddingVertical: 35, alignItems: 'center' }}>
					{this.renderButtonOrCheckmark()}
				</View>
				<Item stackedLabel>
					<Label>Restaurant Name</Label>
					<Input 
						onChangeText={(text) => onRestoNameChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Company Name</Label>
					<Input 
						onChangeText={(text) => onCompanyNameChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Company Address</Label>
					<Input 
						onChangeText={(text) => onCompanyAddressChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Province</Label>
					<Input 
						onChangeText={(text) => onProvinceChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>City</Label>
					<Input 
						onChangeText={(text) => onCityChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Zip Code</Label>
					<Input 
						onChangeText={(text) => onZipCodeChanged(text)}
						keyboardType='numeric'
					/>
				</Item>
				<Item stackedLabel>
					<Label>Job Position</Label>
					<Input
						onChangeText={(text) => onPositionChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Mobile Number</Label>
					<Input
						onChangeText={(text) => onMobileNumberChanged(text)}
						keyboardType='numeric'
					/>
				</Item>
				<Item stackedLabel>
					<Label>Phone Number</Label>
					<Input
						onChangeText={(text) => onPhoneNumberChanged(text)}
						keyboardType='numeric'
					/>
				</Item>
				<Item stackedLabel>
					<Label>First Name</Label>
					<Input 
						onChangeText={(text) => onFirstNameChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Last Name</Label>
					<Input 
						onChangeText={(text) => onLastNameChanged(text)}
					/>
				</Item>
				<Item stackedLabel>
					<Label>Email</Label>
					<Input 
						onChangeText={(text) => onEmailChanged(text)}
						autoCapitalize='none'
					/>
				</Item>
				<Item stackedLabel>
					<Label>Password</Label>
					<Input 
						onChangeText={(text) => onPasswordChanged(text)}
						autoCapitalize='none'
						secureTextEntry
					/>
				</Item>
			</Form>
		);
	}
}

export default RegisterBusinessForm;
