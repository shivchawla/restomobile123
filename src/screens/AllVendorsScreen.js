import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Content, 
	Spinner,
	Icon,
	Button
} from 'native-base';
import VendorList from '../components/VendorList';
import { fetchAllVendors } from '../actions';

class AllVendors extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'All Vendors',
		headerTitleStyle: {
			color: '#2077be'
		},
		headerLeft: (
			<Button
				transparent
				onPress={() => {
					navigation.goBack(null);
				}}
			>
				<Icon name='arrow-back' type='Ionicons' />
			</Button>
		)
	});

	componentDidMount() {
		this.props.fetchAllVendors();
	}

	renderLoadingOrVendorList() {
		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<VendorList vendors={this.props.vendors} />
		);
	}

	render() {
		return (
			<Container>
				<Content>
					{this.renderLoadingOrVendorList()}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		vendors: state.vendor.vendors,
		loading: state.vendor.loading
	};
};

export default connect(mapStateToProps, { fetchAllVendors })(AllVendors);
