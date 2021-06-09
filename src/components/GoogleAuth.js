import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '417396516943-13ocbv5hn2is4f58ucb6t23ok9eoq5u2.apps.googleusercontent.com',
        scope: 'email',
      }) .then (() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
      });
    })
  };

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  SignIn = () => {
    this.auth.signIn();
  }

  SignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.state.isSignedIn === null) {
      return null;
    } else if(this.state.isSignedIn) {
      return (
        <button className="ui button red google" onClick={this.SignOut}>
          <i className="google icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui button blue google" onClick={this.SignIn}>
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

export default GoogleAuth;