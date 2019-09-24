import React, { FormEvent } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";
import { getUserInfo, getAll } from "../../api";
import { UserSelector } from "../../shared";
import NumberField from "../../shared/numberField";

import "./styles.scss";

interface DispatchProps {
  logout: () => void;
}

type Props = DispatchProps;

interface State {
  user: any;
  payees: any[];
  payeeId?: number;
}

class HomePage extends React.Component<Props, State> {
  state = {
    user: {
      username: "",
      email: "",
      balance: 0.0
    },
    payees: []
  };

  onLogout = () => {
    this.props.logout();
    window.location.reload(true);
  };

  componentDidMount() {
    getUserInfo().then(user => this.setState({ user }));
    getAll().then(items =>
      this.setState({
        payees: items.map((item: any) => ({
          label: item.name,
          value: item.id
        }))
      })
    );
  }

  onSelectPayee = (item: any) => {
    this.setState({ payeeId: item.value });
  };

  onSetAmount = (amount: number) => {};

  onSubmitTransaction = (event: FormEvent) => {};

  render() {
    const {
      user: { username, balance },
      payees
    } = this.state;

    return (
      <div className="home-page">
        <div className="home-page__top-bar">
          <div className="home-page__info">
            <span>{`${username} | ${balance} PW`}</span>
          </div>
          <button className="btn btn-link" onClick={this.onLogout}>
            Logout
          </button>
        </div>
        <div>
          <form className="home-page__form" onSubmit={this.onSubmitTransaction}>
            <UserSelector users={payees} onSelectItem={this.onSelectPayee} />
            <NumberField onSetValue={this.onSetAmount} />
            <button className="btn btn-primary">Send money</button>
          </form>
        </div>
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
