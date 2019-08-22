import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateAddressQuery } from '../actions/';

class MapInput extends Component {
	render() {
		return (
			<GooglePlacesAutocomplete 
				placeholder='Search for your location'
				minLength={3}
				autoFocus={false}
				query={{
					key: 'AIzaSyAcwn0XXXM1hoSGSDQiF7h9eHMkIo2gDVc',
					language: 'en',
				}}
				styles={{
					textInputContainer: {
						backgroundColor: 'white',
						borderTopWidth: 0,
						borderBottomWidth: 0
					}
				}}
				currentLocation={false}
				onPress={(data) => {
					this.props.renderNewRegionWithAddress(data.description);
					//this.props.updateAddressQuery(data.description);
				}}
				GooglePlacesSearchQuery={{
					rankby: 'distance'
				}}
				debounce={200}
			/>
		);
	}
}

export default connect(null, { updateAddressQuery })(MapInput);
