import React from "react";
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
  payee?: string;
  amount: number;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        balance: 0.0
      },
      payees: [],
      amount: 0
    };
  }

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
    this.setState({ payee: item.label });
  };

  onSetAmount = (amount: number) => {
    this.setState({ amount });
  };

  onSubmitTransaction = () => {
    const {
      user: { balance },
      payee,
      amount
    } = this.state;
    if (Boolean(payee) && amount > 0 && amount <= balance) {
    }
  };

  get isButtonDisabled(): boolean {
    const {
      user: { balance },
      payee,
      amount
    } = this.state;
    return !Boolean(payee) || amount === 0 || amount > balance;
  }

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
        <div className="home-page__form">
          <UserSelector users={payees} onSelectItem={this.onSelectPayee} />
          <NumberField onSetValue={this.onSetAmount} />
          <button
            className="btn btn-primary"
            disabled={this.isButtonDisabled}
            onClick={this.onSubmitTransaction}
          >
            Send money
          </button>
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
