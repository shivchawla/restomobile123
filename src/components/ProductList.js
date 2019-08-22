import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Spinner } from 'native-base';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
	renderCardItem(item) {
		return <ProductListItem product={item} />;
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
					keyExtractor={(product) => product.id.toString()}
					style={{ paddingBottom: 10 }}
					numColumns={2}
					columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
					initialNumToRender={10}
				/>
			</View>
		);
	}

	render() {
		return this.renderFlatListOrSpinner();
	}
}

export default ProductList;
