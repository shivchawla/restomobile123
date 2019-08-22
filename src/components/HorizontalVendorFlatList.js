import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Spinner } from 'native-base';
import HorizontalVendorFlatListItem from './HorizontalVendorFlatListItem';

class HorizontalVendorFlatList extends Component {
	renderCardItem(vendor) {
		return <HorizontalVendorFlatListItem vendor={vendor} />;
	}

	renderFlatListOrSpinner() {
		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<View>
				<FlatList 
					data={this.props.vendors.slice(0, 10)}
					renderItem={({ item }) => this.renderCardItem(item)}
					horizontal
					keyExtractor={(vendor) => vendor.id_vendor.toString()}
					style={{ paddingBottom: 10 }}
				/>
			</View>
		);
	}

	render() {
		return this.renderFlatListOrSpinner();
	}
}

export default HorizontalVendorFlatList;
