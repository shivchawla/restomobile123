import React, { Component } from 'react';
import { View } from 'react-native';
import CategoryButton from './CategoryButton';

class CategoryTable extends Component {
	render() {
		const { containerStyle } = styles;
		return (
			<View style={containerStyle}>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={1291}
				>
					Food & Beverages
				</CategoryButton>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={1}
				>
					Restaurant Equipment
				</CategoryButton>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={1529}
				>
					Smallwares
				</CategoryButton>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={2333}
				>
					Coffee Supplies
				</CategoryButton>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={877}
				>
					Disposables
				</CategoryButton>
				<CategoryButton 
					buttonColors={['#185F97', '#1f77bd']}
					categoryID={571}
				>
					Tabletop
				</CategoryButton>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingRight: 5,
		paddingLeft: 5,
		paddingBottom: 10
	},
};

export default CategoryTable;
