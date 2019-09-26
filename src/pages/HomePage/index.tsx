import React from 'react'
import { connect } from 'react-redux'

import {
  getUserInfo,
  getAllUsers,
  commitTransaction
} from '../../store/app/actions'
import { GlobalState } from '../../store/models'
import { logout } from '../../store/auth/actions'
import { UserSelector } from '../../shared'
import { User } from '../../store/app/models'
import NumberField from '../../shared/numberField'

import './styles.scss'

interface StateProps {
  user?: User
  balance: number
  payees: User[]
  transactionCommiting: boolean
}

interface DispatchProps {
  logout: () => void
  getUserInfo: () => void
  getAllUsers: () => void
  commitTransaction: (name: string, amount: number) => void
}

type Props = StateProps & DispatchProps

interface State {
  payee?: string
  amount: number
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      amount: 0
    }
  }

  onLogout = () => {
    this.props.logout()
    window.location.reload(true)
  }

  componentDidMount() {
    const { getUserInfo, getAllUsers } = this.props
    getUserInfo()
    getAllUsers()
  }

  onSelectPayee = (item: any) => {
    this.setState({ payee: item.label })
  }

  onSetAmount = (amount: number) => {
    this.setState({ amount })
  }

  onSubmitTransaction = () => {
    const { balance, commitTransaction } = this.props
    const { payee, amount } = this.state
    if (payee && amount > 0 && amount <= balance) {
      commitTransaction(payee, amount)
    }
  }

  get isButtonDisabled(): boolean {
    const { balance, transactionCommiting } = this.props
    const { payee, amount } = this.state
    return (
      (transactionCommiting && !Boolean(payee)) ||
      amount === 0 ||
      amount > balance
    )
  }

  render() {
    const { user, balance, payees } = this.props

    return (
      <div className="home-page">
        <div className="home-page__top-bar">
          <div className="home-page__info">
            <span>{`${user ? user.username : ''} | ${balance} PW`}</span>
          </div>
          <button className="btn btn-link" onClick={this.onLogout}>
            Logout
          </button>
        </div>
        <div className="home-page__form">
          <UserSelector
            users={payees.map((item: any) => ({
              label: item.name,
              value: item.id
            }))}
            onSelectItem={this.onSelectPayee}
          />
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
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.appState.currentUser,
  balance: state.appState.balance,
  payees: state.appState.users,
  transactionCommiting: state.appState.transactionCommiting
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
  getUserInfo: () => dispatch(getUserInfo()),
  getAllUsers: () => dispatch(getAllUsers()),
  commitTransaction: (name: string, amount: number) =>
    dispatch(commitTransaction(name, amount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
