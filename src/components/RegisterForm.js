import React, { Component } from 'react';
import { Form, Item, Label, Input } from 'native-base';

class RegisterForm extends Component {
	render() {
		const { 
			onEmailChanged, 
			onPasswordChanged, 
			onFirstNameChanged, 
			onLastNameChanged 
		} = this.props;

		return (
			<Form>
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

export default RegisterForm;
