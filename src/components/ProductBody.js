import React, { Component } from 'react';
import { Card, Accordion } from 'native-base';

const dataArray = [
		{ title: 'Description', content: 'This is a product description. This is an amazing product fit for a king! This cheese is expensive. These cookies are expensive' },
		{ title: 'Specifications', content: 'Lorem ipsum dolor sit amet' },
		{ title: 'Reviews', content: 'Lorem ipsum dolor sit amet' }
	];

class ProductBody extends Component {
	render() {
		const { cardStyle } = styles;
		return (
			<Card 
				transparent 
				style={cardStyle}
			>
				<Accordion dataArray={dataArray} expanded={0} />
			</Card>
		);
	}
}

const styles = {
	cardStyle: {
		padding: 5,
		borderWidth: 1,
	}
};

export default ProductBody;
