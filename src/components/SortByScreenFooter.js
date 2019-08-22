import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

class SortByScreenFooter extends Component {
	render() {
		const { buttonContainerStyle, buttonTextStyle } = styles;
		const { query, sort, categoryID } = this.props;

		return (
			<View style={buttonContainerStyle}>
				<Button 
					full 
					onPress={() => {
						this.props.onFilterResults(query, categoryID, sort);		
					}}
				>
					<Text style={buttonTextStyle}>Filter Results</Text>
				</Button>
			</View>
		);
	}
}

const styles = {
	buttonContainerStyle: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
	},
	buttonTextStyle: {
		color: 'white'
	}
};

export default withNavigation(SortByScreenFooter);
