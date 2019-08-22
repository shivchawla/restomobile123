import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import ReviewsListItem from './ReviewsListItem';

class ReviewsList extends Component {
	renderCardItem(review) {
		return <ReviewsListItem restoUser={this.props.restoUser} review={review} />;
	}

	render() {
		return (
			<View>
				<FlatList 
					data={this.props.productReviews}
					renderItem={({ item }) => this.renderCardItem(item)}
					keyExtractor={(review) => review.id.toString()}
				/>
			</View>
		);
	}
}

export default withNavigation(ReviewsList);
