import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Spinner } from 'native-base';
import HorizontalProductFlatListItem from './HorizontalProductFlatListItem';

class HorizontalProductFlatList extends Component {
	renderCardItem(product) {
		return <HorizontalProductFlatListItem product={product} />;
	}

	renderFlatListOrSpinner() {
		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<View>
				<FlatList 
					data={this.props.products}
					renderItem={({ item }) => this.renderCardItem(item)}
					horizontal
					keyExtractor={(product) => product.id.toString()}
					style={{ paddingBottom: 10 }}
				/>
			</View>
		);
	}

	render() {
		return this.renderFlatListOrSpinner();
	}
}

export default HorizontalProductFlatList;
