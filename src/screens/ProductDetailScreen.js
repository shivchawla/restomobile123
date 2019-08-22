import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { 
	Container, 
	Content, 
	Text, 
	Button, 
	Segment, 
	Header, 
	Left, 
	Body, 
	Title, 
	Icon,
	Right,
	Toast
} from 'native-base';
import { withNavigation } from 'react-navigation';
import ProductImage from '../components/ProductImage';
import ProductTitle from '../components/ProductTitle';
import ProductVendor from '../components/ProductVendor';
import ConfirmAddToCart from '../components/ConfirmAddToCart';
import ReviewsList from '../components/ReviewsList';
import Seperator from '../components/common/Seperator';
import SpecificationsSegmentContent from '../components/SpecificationsSegmentContent';
import { REVIEWS_EMPTY_STATE_IMAGE } from '../images/';

import { addCheckout } from '../actions/';
	
class ProductDetailScreen extends Component {
	static navigationOptions = {
		title: 'Product Detail Screen',
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = { 
			page: 1,
			descriptionSegmentActive: true,
			specsSegmentActive: false,
			reviewsSegmentActive: false,
			modalVisible: false
		};
	}

	onDecline() {
		this.setState({
			modalVisible: false
		});
	}

	onAccept(idProduct, quantity) {
		this.props.addCheckout(idProduct, quantity).then(() => {
			console.log(`Product added to cart! --> ${idProduct}`);
		});

		this.setState({ modalVisible: false });
		return Toast.show({
			text: 'Added to cart!',
			duration: 3000,
			buttonText: 'Got it!'
		});
	}

	showDescription() {
		this.setState({
			page: 1,
			descriptionSegmentActive: true,
			specsSegmentActive: false,
			reviewsSegmentActive: false,
			modalVisible: false
		});
	}

	showSpecifications() {
		this.setState({
			page: 2,
			descriptionSegmentActive: false,
			specsSegmentActive: true,
			reviewsSegmentActive: false,
			modalVisible: false
		});
	}
	/* Not using this
	showReviews() {
		this.setState({
			page: 3,
			descriptionSegmentActive: false,
			specsSegmentActive: false,
			reviewsSegmentActive: true,
			modalVisible: false
		});
	}
	*/

	renderButtonOrEmptyStockWarning() {
		const product = this.props.navigation.getParam('product');
		if (product.stock > 0) {
			return (
				<Button full onPress={() => this.setState({ modalVisible: true })}>
					<Text>Add To Cart</Text>
				</Button>
			);
		}
		return (
			<View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center' }}>
				<Text style={{ color: 'white', fontSize: 16, paddingVertical: 12 }}>Out of Stock!</Text>
			</View>
		);
	}

	renderEmptyStateOrReviews() {
		const product = this.props.navigation.getParam('product');
		const { emptyStateContainerStyle, imageStyle } = styles;
		if (product.reviews.length === 0) {
			return (
				<View style={emptyStateContainerStyle}>
					<Image style={imageStyle} source={REVIEWS_EMPTY_STATE_IMAGE} />
					<Text style={{ color: '#444444' }}>This product does not have any reviews yet!</Text>
					<Text style={{ fontWeight: '600' }}>Be the first to review!</Text>
				</View>
			);
		}
		return <ReviewsList productReviews={product.reviews} />;
	}

	render() {
		const product = this.props.navigation.getParam('product');
		const { 
			contentContainerStyle, 
			addToCartButtonContainerStyle, 
			segmentContentStyle,
		} = styles;
		const page = this.state.page;

		let segmentContent = null;
		if (page === 1) {
			segmentContent = (
				<View style={segmentContentStyle}>
					<Text style={{ color: '#444444' }}>
						{product.description}
					</Text>
				</View>
			);
		} else if (page === 2) {
			segmentContent = (
				<View style={segmentContentStyle}>
					<SpecificationsSegmentContent product={product} />
				</View>
			);
		} 
		/* else if (page === 3) {
			segmentContent = (
				<View>
					{this.renderEmptyStateOrReviews()}
					<View style={{ paddingVertical: 10 }}>
						<Button 
							bordered 
							style={{ alignSelf: 'center' }}
							onPress={() => 
								this.props.navigation.navigate('ReviewsScreen', { productId: product.id })
							}
						>
							<Text>View all reviews</Text>
						</Button>
					</View>
				</View>
			);
		} */
		
		return (
			<Container>
				<Header hasSegment style={{ height: 70 }}>
					<Left>
						<Button 
							transparent
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body>
						<Title style={{ color: Platform.OS === 'ios' ? '#2077be' : '#ffffff' }}>Product Details</Title>
					</Body>
					<Right />
				</Header>
				<Content style={{ flex: 1 }}>
					<View style={contentContainerStyle}>
						<ProductImage product={product} />
						<ProductTitle product={product} />
						<Seperator />
						<ProductVendor product={product} />
						<Seperator />
						<View style={{ marginTop: 10, backgroundColor: Platform.OS === 'ios' ? '' : '#3f51b5' }}>
							<Segment>
								<Button 
									first 
									active={this.state.descriptionSegmentActive}
									onPress={this.showDescription.bind(this)}
								>
									<Text>Description</Text>
								</Button>
								<Button 
									active={this.state.specsSegmentActive}
									onPress={this.showSpecifications.bind(this)}
								>
									<Text>Specifications</Text>
								</Button>
								<Button 
									last active={this.state.reviewsSegmentActive}
									onPress={() => 
										this.props.navigation.navigate('ReviewsScreen', { productId: product.id })
									}
								>
									<Text>Reviews</Text>
								</Button>
							</Segment>
						</View>
						{segmentContent}
					</View>
				</Content>
				<View style={addToCartButtonContainerStyle}>
					{this.renderButtonOrEmptyStockWarning()}
				</View>
				<ConfirmAddToCart 
					modalVisible={this.state.modalVisible}
					onDecline={this.onDecline.bind(this)}
					onAccept={this.onAccept.bind(this)}
					product={product}
				/>
			</Container>
		);
	}
}

const styles = {
	segmentContentStyle: {
		paddingTop: 10, 
		paddingBottom: 30,
		paddingHorizontal: 10
	},
	contentContainerStyle: {
		flex: 1, 
		paddingBottom: 40
	},
	addToCartButtonContainerStyle: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0
	},
	emptyStateContainerStyle: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
		paddingTop: 10
	},
	imageStyle: {
		height: 100, 
		width: 100
	},
};

export default connect(null, { addCheckout })(withNavigation(ProductDetailScreen));
