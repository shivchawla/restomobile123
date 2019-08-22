import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

class FilterBar extends Component {
	render() {
		const { containerStyle, buttonStyle, textStyle } = styles;
		return (
			<View style={containerStyle}>
				<Button 
					rounded 
					style={buttonStyle}
					onPress={() => this.props.navigation.navigate(
						'SortByScreen', 
						{ 
							query: this.props.query, 
							categoryID: this.props.categoryID
						}
					)}
				>
					<Text style={textStyle}>Sort by</Text>
				</Button>
				<Button 
					disabled 
					rounded 
					style={{ paddingHorizontal: 15 }}
				>
					<Text style={textStyle}>Filter</Text>
				</Button>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flexDirection: 'row', 
		justifyContent: 'space-around',
		paddingVertical: 10,
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
	},
	buttonStyle: {
		paddingHorizontal: 15
	},
	textStyle: {
		color: 'white'
	}
};

export default withNavigation(FilterBar);
