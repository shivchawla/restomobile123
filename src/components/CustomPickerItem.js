import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker } from 'native-base';

class CustomPickerItem extends Component {
	render() {
		const { cost } = this.props;
		return (
			<View>
				<Picker.Item 
					label={this.props.label} 
					value={this.props.value} 
					key={this.props.key} 
				/>
			</View>
		);
	}
}

export default CustomPickerItem;
