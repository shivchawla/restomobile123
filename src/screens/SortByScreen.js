import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, 
	Header, 
	Left, 
	Button, 
	Icon, 
	Right, 
	Body, 
	Content,
	Title,
	Text,
	Radio,
	ListItem
} from 'native-base';

import SortByScreenFooter from '../components/SortByScreenFooter';
import { fetchSearchResults, fetchProductByCategoriesSorted } from '../actions';

class SortByScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { itemSelected: null };
	}

	onFilterResults(query = 0, categoryID = 0, sort) {
		if (categoryID === 0) {
			this.props.fetchSearchResults(query, sort);
			this.props.navigation.navigate('SearchResultsScreen');
		} else if (categoryID !== 0) {
			this.props.fetchProductByCategoriesSorted(categoryID, sort);
			this.props.navigation.navigate('CategoriesScreen');
			console.log('conditional works!');
		}
	}

	render() {
		const query = this.props.navigation.getParam('query');
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
						<Title style={{ color: Platform.OS === 'ios' ? '#2077be' : 'white' }}>Sort by</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<ListItem
						onPress={() => this.setState({ itemSelected: 3 })}
						selected={this.state.itemSelected === 3}
					>
						<Left>
							<Text>Highest Price</Text>
						</Left>
						<Right>
							<Radio selected={this.state.itemSelected === 3} />
						</Right>
					</ListItem>

					<ListItem 
						onPress={() => this.setState({ itemSelected: 2 })}
						selected={this.state.itemSelected === 2}
					>
						<Left>
							<Text>Lowest Price</Text>
						</Left>
						<Right>
							<Radio selected={this.state.itemSelected === 2} />
						</Right>
					</ListItem>

					<ListItem 
						onPress={() => this.setState({ itemSelected: 1 })}
						selected={this.state.itemSelected === 1}
					>
						<Left>
							<Text>Newest</Text>
						</Left>
						<Right>
							<Radio selected={this.state.itemSelected === 1} />
						</Right>
					</ListItem>
				</Content>
				<SortByScreenFooter 
					itemSelected={this.state.itemSelected} 
					onFilterResults={this.onFilterResults.bind(this)}
					sort={this.state.itemSelected}
					query={query}
					categoryID={categoryID}
				/>
			</Container>
		);
	}
}

export default connect(null, { fetchSearchResults, fetchProductByCategoriesSorted })(SortByScreen);
