import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, ListItem, Left, Body, Right, Thumbnail, Icon, ActionSheet } from 'native-base';
import Moment from 'react-moment';
import { LOADING_IMAGE } from '../images/';
import { deleteProductReview } from '../actions/';

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

// need to only allow delete if product_review.id_resto = loggedin user id
class ReviewsListItem extends Component {
	render() {
		const { 
			comments, 
			author_firstname, 
			author_lastname, 
			dt_created, 
			rating, 
			id_resto 
		} = this.props.review;

		return (
			<ListItem 
				avatar 
				onLongPress={() => {
					if (this.props.restoUser === id_resto) {
						ActionSheet.show(
							{
								options: BUTTONS,
								cancelButtonIndex: CANCEL_INDEX,
								destructiveButtonIndex: DESTRUCTIVE_INDEX,
								title: 'Options'
							},
							buttonIndex => {
								if (buttonIndex === 0) {
									this.props.deleteProductReview(this.props.review.id);
								}
							}
						);
					} 
				}
			}
			>
				<Left>
					<Thumbnail small source={LOADING_IMAGE} />
				</Left>

				<Body>
					<Text style={{ fontSize: 12 }}>{`${author_firstname} ${author_lastname} says:`}</Text>
					<Text note>{comments}</Text>
				</Body>

				<Right>
					<Moment
						style={{ fontSize: 12, color: 'gray' }}
						element={Text}
						format="DD MMM YYYY"
					>
						{dt_created}
					</Moment>
					<View style={{ flexDirection: 'row' }}>
						<Icon name='star' style={{ color: '#FFD700', fontSize: 18 }} />
						<Text style={{ color: '#FFD700' }}> {rating}</Text>
					</View>
				</Right>
			</ListItem>
		);
	}
}

export default connect(null, { deleteProductReview })(ReviewsListItem);
