import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button } from 'native-base';
import { signOut, fetchHome, fetchProductSuggestions, clearProductSuggestions } from '../actions';

import HorizontalProductFlatList from '../components/HorizontalProductFlatList';
import HorizontalVendorFlatList from '../components/HorizontalVendorFlatList';
import BannerCarousel from '../components/BannerCarousel';
import CategoryTable from '../components/CategoryTable';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Seperator from '../components/common/Seperator';
import SearchAutocompleteList from '../components/SearchAutocompleteList';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'RestoDepot'
	};

	async componentDidMount() {
		await this.props.fetchHome(this.props.jwt);
	}

	onSearchChangeText(text) {
		this.props.fetchProductSuggestions(text);
	}

	onSearchCloseIconPress() {
		this.props.clearProductSuggestions();
	}

	render() {
		const { 
			titleContainerStyle, 
			titleTextStyle, 
			buttonContainerStyle, 
			buttonTextStyle 
		} = styles;
		
		return (
			<Container>
				<SearchBar
					productSuggestionsLoading={this.props.product_suggestions_loading} 
					onSearchChangeText={this.onSearchChangeText.bind(this)} 
					onSearchCloseIconPress={this.onSearchCloseIconPress.bind(this)}
					navigation={this.props.navigation}
				/>
				<Content>
					<SearchAutocompleteList 
						productSuggestions={this.props.product_suggestions} 
						navigation={this.props.navigation}
						onSearchCloseIconPress={this.onSearchCloseIconPress.bind(this)}
					/>
					<BannerCarousel />
					<Seperator />
					<Text style={titleTextStyle}>Categories</Text>
					<CategoryTable />
					<Seperator />
					<View style={titleContainerStyle}>
						<Text style={titleTextStyle}>Best Sellers</Text>
						<View style={buttonContainerStyle}>
							<Button 
								transparent 
								onPress={() => 
									this.props.navigation.navigate(
										'QVStack', 
										{ 
											qv: {
												products: this.props.best_sellers,
												title: 'Best Sellers'
											} 
										}
									)}
							>
								<Text style={buttonTextStyle}>View All</Text>
							</Button>
						</View>
					</View>
					<HorizontalProductFlatList 
						products={this.props.best_sellers} 
						navigation={this.props.navigation}
						loading={this.props.loading}
					/>
					<Seperator />
					<View style={titleContainerStyle}>
						<Text style={titleTextStyle}>RestoDepot Approved</Text>
						<View style={buttonContainerStyle}>
							<Button 
								transparent 
								onPress={() => 
									this.props.navigation.navigate(
										'QVStack', 
										{ 
											qv: {
												products: this.props.rd_approved,
												title: 'RestoDepot Approved' 
											}
										}
									)}
							>
								<Text style={buttonTextStyle}>View All</Text>
							</Button>
						</View>
					</View>
					<HorizontalProductFlatList 
						products={this.props.rd_approved}
						navigation={this.props.navigation} 
						loading={this.props.loading}
					/>
					<Seperator />
					<View style={titleContainerStyle}>
						<Text style={titleTextStyle}>Best Deals</Text>
						<View style={buttonContainerStyle}>
							<Button 
								transparent 
								onPress={() => 
									this.props.navigation.navigate(
										'QVStack', 
										{ 
											qv: {
												products: this.props.best_deals,
												title: 'Best Deals'
											}
										}
									)}
							>
								<Text style={buttonTextStyle}>View All</Text>
							</Button>
						</View>
					</View>
					<HorizontalProductFlatList 
						products={this.props.best_deals} 
						navigation={this.props.navigation}
						loading={this.props.loading}
					/>
					<Seperator />
					<View style={titleContainerStyle}>
						<Text style={titleTextStyle}>Vendors</Text>
						<View style={buttonContainerStyle}>
							<Button 
								transparent
								onPress={() => this.props.navigation.navigate('AllVendorsScreen')}
							>
								<Text style={buttonTextStyle}>View All</Text>
							</Button>
						</View>
					</View>
					<HorizontalVendorFlatList 
						vendors={this.props.featured_vendors} 
						loading={this.props.loading}
					/>
					<Seperator />
					<View style={titleContainerStyle}>
						<Text style={titleTextStyle}>Products</Text>
						<View style={buttonContainerStyle}>
							<Button 
								transparent
								onPress={() => 
									this.props.navigation.navigate(
										'AllProductsStack', 
										{ 
											qv: { 
												products: this.props.products, 
												title: 'All Products' 
											}
										}
									)}
							>
								<Text style={buttonTextStyle}>View All</Text>
							</Button>
						</View>
					</View>
					<ProductList 
						products={this.props.products} 
						loading={this.props.loading}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = {
	titleContainerStyle: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	titleTextStyle: {
		paddingTop: 20,
		paddingBottom: 15,
		paddingLeft: 7,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#444444'
	},
	buttonContainerStyle: {
		justifyContent: 'center', 
		paddingRight: 20, 
		paddingTop: 8
	},
	buttonTextStyle: {
		color: 'tomato'
	}
};

const mapStateToProps = state => {
	return {
		featured_vendors: state.home.featured_vendors,
		best_sellers: state.home.best_sellers,
		best_deals: state.home.best_deals,
		rd_approved: state.home.rd_approved,
		products: state.home.products,
		jwt: state.auth.jwt,
		loading: state.home.loading,
		product_suggestions: state.home.product_suggestions,
		product_suggestions_loading: state.home.product_suggestions_loading,
	};
};

export default connect(mapStateToProps, { 
	signOut, 
	fetchHome, 
	fetchProductSuggestions,
	clearProductSuggestions 
})(HomeScreen);
