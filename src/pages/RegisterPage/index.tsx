import React, { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../store/auth/actions'
import { history } from '../../helpers/history'

interface StateProps {
  registering: boolean
}

interface DispatchProps {
  register: (username: string, email: string, password: string) => void
}

type Props = StateProps & DispatchProps

interface State {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  submitted: boolean
}

class RegisterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    this.setState({ submitted: true })
    const { username, email, password, passwordConfirmation } = this.state
    if (username && email && password && password === passwordConfirmation) {
      this.props.register(username, email, password)
      setTimeout(() => {
        history.push('/login')
      }, 3000)
    }
  }

  render() {
    const { registering } = this.props
    const {
      username,
      email,
      password,
      passwordConfirmation,
      submitted
    } = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !username ? ' text-danger' : '')
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <small className="form-text">Username is required</small>
            )}
          </div>
          <div
            className={'form-group' + (submitted && !email ? ' text-danger' : '')}
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <small className="form-text">Password is required</small>
            )}
          </div>
          <div
            className={
              'form-group' +
              (submitted &&
              (!passwordConfirmation ||
                !username ||
                passwordConfirmation !== password)
                ? ' text-danger'
                : '')
            }
          >
            <label htmlFor="passwordConfirmation">Password confirmation</label>
            <input
              type="password"
              className="form-control"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
            {submitted &&
              (!passwordConfirmation ||
                !password ||
                passwordConfirmation !== password) && (
                <small className="form-text">
                  Password is not equal to confirmation
                </small>
              )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering && (
              <img
                alt="Loading..."
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )}
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  registering: state.registration
})

const mapDispatchToProps = (dispatch: any) => ({
  register: (username: string, email: string, password: string) =>
    dispatch(register(username, email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
