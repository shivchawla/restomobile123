import React from 'react';
import { View, Text } from 'react-native';
import { CardItem, Left } from 'native-base';
import { numberWithCommas } from '../services/utils';

function CartLineItem({ name, amount, style }) {
	const { nameTextStyle, amountTextStyle } = styles;
	return (
		<CardItem bordered>
			<Left>
				<Text style={nameTextStyle}>{name}</Text>
			</Left>
			<View style={{ paddingRight: 10 }}>
				<Text style={[amountTextStyle, style]}>
					{`IDR ${numberWithCommas(amount)}`}
				</Text>
			</View>
		</CardItem>
	);
}

const styles = {
	nameTextStyle: {
		fontSize: 12,
	},
	amountTextStyle: {
		fontSize: 12,
		color: 'tomato',
		fontWeight: '600'
	}
};

export default CartLineItem;
