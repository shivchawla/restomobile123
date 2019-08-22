import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Card, Form, Textarea } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { addReviewFormUpdate } from '../actions';

class WriteAReview extends Component {
	onStarRatingPress(rating) {
		this.props.addReviewFormUpdate({ prop: 'rating', value: rating });
	}

	render() {
		const { 
				containerStyle, 
				textStyle, 
				cardStyle,
				formInputContainerStyle,
				buttonContainerStyle,
				buttonStyle, 
				buttonTextStyle,
				cancelButtonTextStyle 
			} = styles;

		return (
			<Modal
				visible={this.props.modalVisible}
				transparent
				animationType='slide'
				onRequestClose={() => {}}
			>
				<View style={containerStyle}>
					<Card style={cardStyle}>
						<View style={formInputContainerStyle}>
							<Text style={textStyle}>What did you think about this product?</Text>
						</View>
						<View>
							<Form>
								<View style={formInputContainerStyle}>
									<StarRating
										disabled={false}
										maxStars={5}
										halfStarEnabled
										fullStarColor={'#FFD700'}
										emptyStarColor={'#FFD700'}
										halfStarColor={'#FFD700'}
										rating={this.props.rating}
										selectedStar={(rating) => this.onStarRatingPress(rating)}
									/>
								</View>
								<View style={formInputContainerStyle}>
									<Text>Review</Text>
									<Textarea 
										rowSpan={5} 
										bordered placeholder="Please provide as many details as possible"
										onChangeText={(text) => this.props.addReviewFormUpdate({ prop: 'review', value: text })} 
									/>
								</View>
							</Form>
						</View>
						<View style={buttonContainerStyle}>
							<Button 
								bordered 
								danger 
								style={buttonStyle} 
								onPress={this.props.onDecline}
							>
								<Text style={cancelButtonTextStyle}>Cancel</Text>
							</Button>
							<Button
								success 
								style={buttonStyle} 
								onPress={this.props.onAccept}
							>
								<Text style={buttonTextStyle}>Confirm</Text>
							</Button>
						</View>
					</Card>
				</View>
			</Modal>
		);
	}
}

const styles = {
	cardStyle: {
		backgroundColor: 'white',
		flex: 1,
	},
	textStyle: {
		fontSize: 18,
		textAlign: 'center',
		paddingTop: 20,
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	},
	formInputContainerStyle: {
		paddingHorizontal: 20, 
		marginBottom: 20
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		flex: 0.5,
		justifyContent: 'space-around'
	},
	buttonStyle: {
		alignSelf: 'center',
		paddingRight: 15,
		paddingLeft: 15
	},
	buttonTextStyle: {
		color: 'white'
	},
	cancelButtonTextStyle: {
		color: 'red'
	}
};

const mapStateToProps = (state) => {
	const { rating, review } = state.reviews;
	return { rating, review };
};

export default connect(mapStateToProps, { addReviewFormUpdate })(WriteAReview);
