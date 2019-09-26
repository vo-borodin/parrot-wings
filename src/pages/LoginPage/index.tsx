import React, { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout, login } from '../../store/auth/actions'
import { GlobalState } from '../../store/models'
import { history } from '../../helpers/history'

interface StateProps {
  authenticating: boolean
}

interface DispatchProps {
  login: (email: string, password: string) => void
  logout: () => void
}

type Props = StateProps & DispatchProps

interface State {
  email: string
  password: string
  submitted: boolean
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.props.logout()

    this.state = {
      email: '',
      password: '',
      submitted: false
    }
  }

  handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    this.setState({ email: value })
  }

  handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    this.setState({ password: value })
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    this.setState({ submitted: true })
    const { email, password } = this.state
    if (email && password) {
      this.props.login(email, password)
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }

  render() {
    const { email, password, submitted } = this.state
    const { authenticating } = this.props

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Parrot Wings</h1>
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !email ? ' text-danger' : '')
            }
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChangeEmail}
            />
            {submitted && !email && (
              <small className="form-text">E-mail is required</small>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !password ? ' text-danger' : '')
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
              <small className="form-text">Password is required</small>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {authenticating && (
              <img
                alt="Authenticating..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )}
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  authenticating: state.authState.authenticating
})

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) => dispatch(login(email, password)),
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
