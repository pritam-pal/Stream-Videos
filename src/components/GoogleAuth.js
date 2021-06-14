import React from 'react';
import { connect } from 'react-redux';

import { signIn,signOut } from '../action';
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '417396516943-13ocbv5hn2is4f58ucb6t23ok9eoq5u2.apps.googleusercontent.com',
        scope: 'email',
      }) .then (() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
      });
    })
  };

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
      return (
        <button className="ui button red google" onClick={this.onSignOutClick}>
          <i className="google icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui button blue google" onClick={this.onSignInClick}>
          <i className="google icon"/>
          Sign In
        </button>
      );
    }
  }

  render() {
    return(
      <div className="item">
        {this.renderAuthButton()}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);