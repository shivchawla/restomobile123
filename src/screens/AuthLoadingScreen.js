import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View
} from 'react-native';
import { connect } from 'react-redux';
import deviceStorage from '../services/deviceStorage';

class AuthLoadingScreen extends Component {
	componentDidMount() {
		deviceStorage.loadUserType();
		deviceStorage.loadJWT().then(() => {
			this.props.navigation.navigate(this.props.jwt ? 'Main' : 'AuthStack');
		});
	}

	render() {
		return (
			<View style={styles.activityIndicatorContainerStyle}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

const styles = {
	activityIndicatorContainerStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
};

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		jwt: state.auth.jwt
	};
};

export default connect(mapStateToProps)(AuthLoadingScreen);
