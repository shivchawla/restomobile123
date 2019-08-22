import React, { Component } from 'react';
import { ListItem, Text, Body, Right, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loadShippingAddressForm } from '../actions/';

class ShippingAddressItem extends Component {
	render() {
		const { name } = this.props.shippingAddress;
		return (
			<ListItem 
				button 
				onPress={() => {
					this.props.loadShippingAddressForm(this.props.shippingAddress);
					this.props.navigation.navigate(
						'EditShippingAddressScreen', 
						{ id: this.props.shippingAddress.id }
					);
				}}
			>
				<Body>
					<Text>{name}</Text>
				</Body>
				<Right>
					<Icon name="arrow-forward" />
				</Right>
			</ListItem>
		);
	}
}

export default connect(null, { loadShippingAddressForm })(withNavigation(ShippingAddressItem));
