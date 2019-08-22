import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, 
	Header, 
	Left, 
	Button, 
	Icon, 
	Body, 
	Title, 
	Right, 
	Content, 
	Spinner,
} from 'native-base';
import ProductList from '../components/ProductList';
import FilterBar from '../components/common/FilterBar';
import { fetchProducts } from '../actions/';

class CategoriesScreen extends Component {
	componentDidMount() {
		const categoryID = this.props.navigation.getParam('categoryID');
		this.props.fetchProducts(categoryID);
	}

	renderContent() {
		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<ProductList products={this.props.products} />
		);
	}

	render() {
		const categoryID = this.props.navigation.getParam('categoryID');
		return (
			<Container>
				<Header>
					<Left>
						<Button 
							transparent
							onPress={() => this.props.navigation.goBack(null)}
						>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Title style={{ color: Platform.OS === 'ios' ? '#2077be' : '#ffffff' }}>
							Products
						</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					{this.renderContent()}
				</Content>
				<FilterBar categoryID={categoryID} />
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.home.loading,
		products: state.home.category_products
	};
};

export default connect(mapStateToProps, { fetchProducts })(CategoriesScreen);
