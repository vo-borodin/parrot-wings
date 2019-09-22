import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout, login } from "../../store/auth/actions";

interface StateProps {
  loggingIn: boolean;
}

interface DispatchProps {
  login: (username: string, password: string) => void;
  logout: () => void;
}

type Props = StateProps & DispatchProps;

interface State {
  username: string;
  password: string;
  submitted: boolean;
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.props.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false
    };
  }

  handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ username: value });
  };

  handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ password: value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  };

  render() {
    const { username, password, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChangeUsername}
            />
            {submitted && !username && (
              <div className="help-block">E-mail is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChangePassword}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loggingIn: state.authentication
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (username: string, password: string) =>
    dispatch(login(username, password)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
