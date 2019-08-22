import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import { 
	Container, 
	Content, 
	Header, 
	Left, 
	Right, 
	Button, 
	Icon, 
	Body, 
	Title,
	Text,
	Spinner
} from 'native-base';
import { connect } from 'react-redux';
import ReviewsList from '../components/ReviewsList';
import WriteAReviewModal from '../components/WriteAReviewModal';
import { resetReviewForm, fetchProductReviews, createProductReview } from '../actions/';
import { REVIEWS_EMPTY_STATE_IMAGE } from '../images/';

class ReviewsScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = { 
			modalVisible: false
		};
	}

	componentDidMount() {
		const productId = this.props.navigation.getParam('productId');
		this.props.fetchProductReviews(productId);
	}

	onDecline() {
		this.setState({ modalVisible: false });
		this.props.resetReviewForm();
	}

	onAccept() {
		this.setState({ modalVisible: false });
		const productId = this.props.navigation.getParam('productId');
		this.props.createProductReview({ 
			id_product: productId,
			comments: this.props.review,
			rating: this.props.rating
		});
	}

	renderEmptyStateOrFlatList() {
		console.log(this.props.product_reviews);
		const { containerStyle, imageContainerStyle, imageStyle } = styles;
		if (this.props.loading !== true) {
			if (this.props.product_reviews.length === 0) {
				return (
					<View style={containerStyle}>
						<View style={imageContainerStyle}>
							<Image style={imageStyle} source={REVIEWS_EMPTY_STATE_IMAGE} />
						</View>
						<Text style={{ color: '#444444' }}>This product does not have any reviews yet!</Text>
						<Text style={{ fontWeight: '600' }}>Be the first to review!</Text>
					</View>
				);
			}
		} else {
			return <Spinner size='small' />;
		}
		return (
			<ReviewsList 
				restoUser={this.props.resto_user} 
				productReviews={this.props.product_reviews} 
			/>
		);
	}

	render() {
		const { addReviewButtonContainerStyle } = styles;
		return (
			<Container>
				<Header>
					<Left>
						<Button 
							transparent
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Title style={{ color: Platform.OS === 'ios' ? '#2077be' : 'white' }}>Reviews</Title>
					</Body>
					<Right />
				</Header>
				<Content contentContainerStyle={{ flex: 1 }}>
					{this.renderEmptyStateOrFlatList()}
					<WriteAReviewModal 
						modalVisible={this.state.modalVisible} 
						onDecline={this.onDecline.bind(this)}
						onAccept={this.onAccept.bind(this)}
					/>
				</Content>
				<View style={addReviewButtonContainerStyle}>
					<Button full onPress={() => this.setState({ modalVisible: true })}>
						<Text>Write a review</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	imageContainerStyle: {
		marginBottom: 10
	},
	imageStyle: {
		height: 100, 
		width: 100
	},
	addReviewButtonContainerStyle: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0
	}
};

const mapStateToProps = state => {
	return {
		loading: state.reviews.loading,
		product_reviews: state.reviews.product_reviews,
		rating: state.reviews.rating,
		review: state.reviews.review,
		resto_user: state.reviews.resto_user
	};
};

export default connect(mapStateToProps, { 
	resetReviewForm, 
	fetchProductReviews, 
	createProductReview 
})(ReviewsScreen);
