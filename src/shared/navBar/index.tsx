import React from 'react'
import { connect } from 'react-redux'
import { User } from '../../store/app/models'
import { GlobalState } from '../../store/models'
import { logout } from '../../store/auth/actions'
import { getUserInfo } from '../../store/app/actions'
import { Link } from 'react-router-dom'

interface StateProps {
  user?: User
  balance: number
}

interface DispatchProps {
  logout: () => void
  getUserInfo: () => void
}

type Props = StateProps & DispatchProps

class NavBar extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserInfo()
  }

  onLogout = () => {
    this.props.logout()
    window.location.reload(true)
  }

  render() {
    const { user, balance } = this.props

    return (
      <nav className="navbar navbar-light bg-light text-uppercase">
        <a href="/" className="navbar-brand">{`${
          user ? user.username : ''
        } | ${balance} PW`}</a>
        <div className="float-right d-flex align-items-center">
          <Link className="px-3" to="/">
            Home
          </Link>
          <Link className="px-3" to="/transactions">
            Transactions
          </Link>
          <button
            className="btn btn-link text-uppercase"
            onClick={this.onLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.appState.currentUser,
  balance: state.appState.balance
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
  getUserInfo: () => dispatch(getUserInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
