import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import HorizontalVendorFlatListItem from './HorizontalVendorFlatListItem';

class VendorList extends Component {
	renderCardItem(vendor) {
		return <HorizontalVendorFlatListItem vendor={vendor} />;
	}

	render() {
		return (
			<View>
				<FlatList 
					data={this.props.vendors}
					renderItem={({ item }) => this.renderCardItem(item)}
					keyExtractor={(vendor) => vendor.id_vendor.toString()}
					style={{ paddingBottom: 10 }}
					numColumns={2}
					columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
				/>
			</View>
		);
	}
}

export default VendorList;
