import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";

import "./styles.scss";
import { getUserInfo } from "../../api/users";

interface DispatchProps {
  logout: () => void;
}

type Props = DispatchProps;

interface State {
  user: any;
}

class HomePage extends React.Component<Props, State> {
  state = {
    user: {
      username: "",
      email: "",
      balance: 0.0
    }
  };

  onLogout = () => {
    this.props.logout();
    window.location.reload(true);
  };

  componentWillMount() {
    getUserInfo().then(user => this.setState({ user }));
  }

  render() {
    const { username, balance } = this.state.user;

    return (
      <div className="home-page__top-bar">
        <div className="home-page__info">
          <span>{username}</span>
          <span>{balance}</span>
        </div>
        <button className="btn btn-link" onClick={this.onLogout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);
