import React, { Component } from 'react';
import { ListItem, Left, Icon, Body, Text, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

class SettingsListItem extends Component {
	handleClick(destination) {
		this.props.navigation.navigate(destination);
	}

	render() {
		const { destination } = this.props;
		return (
			<ListItem button onPress={() => this.handleClick(destination)} icon>
				<Left>
					<Icon name={this.props.iconName} type='SimpleLineIcons' style={{ fontSize: 20 }} />
				</Left>
				<Body>
					<Text>{this.props.children}</Text>
				</Body>
				<Right>
					<Icon name="arrow-forward" />
				</Right>
			</ListItem>
		);
	}
}

export default withNavigation(SettingsListItem);
