import React, { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../store/auth/actions'

interface StateProps {
  registering: boolean
}

interface DispatchProps {
  register: (user: any) => void
}

type Props = StateProps & DispatchProps

interface State {
  user: any
  passwordConfirmation: string
  submitted: boolean
}

class RegisterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      user: {
        username: '',
        email: '',
        password: ''
      },
      passwordConfirmation: '',
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleChangePwdConfirmation = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({
      passwordConfirmation: value
    })
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    this.setState({ submitted: true })
    const { user } = this.state
    if (user.username && user.email && user.password) {
      this.props.register(user)
    }
  }

  render() {
    const { registering } = this.props
    const { user, passwordConfirmation, submitted } = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !user.username ? ' has-error' : '')
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.email ? ' has-error' : '')
            }
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
            {submitted && !user.email && (
              <div className="help-block">E-mail is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.password ? ' has-error' : '')
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div
            className={
              'form-group' +
              (submitted &&
              (!passwordConfirmation ||
                !user.username ||
                passwordConfirmation === user.username)
                ? ' has-error'
                : '')
            }
          >
            <label htmlFor="passwordConfirmation">Password confirmation</label>
            <input
              type="password"
              className="form-control"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.handleChangePwdConfirmation}
            />
            {submitted &&
              (!passwordConfirmation ||
                !user.username ||
                passwordConfirmation === user.username) && (
                <div className="help-block">
                  Password is not equal to confirmation
                </div>
              )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering && (
              <img
                alt="loading..."
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
  register: (user: any) => dispatch(register(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
