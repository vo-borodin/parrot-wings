import React from 'react'
import { connect } from 'react-redux'

import { getAllUsers, commitTransaction } from '../../store/app/actions'
import { GlobalState } from '../../store/models'
import { UserSelector, NavBar } from '../../shared'
import { User } from '../../store/app/models'
import { NumberField } from '../../shared'

import './styles.scss'

interface StateProps {
  balance: number
  payees: User[]
  transactionCommiting: boolean
}

interface DispatchProps {
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

  componentDidMount() {
    this.props.getAllUsers()
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
    const { payees } = this.props

    return (
      <div className="container">
        <NavBar />
        <div className="col-4">
          <UserSelector
            className="my-4"
            users={payees.map((item: any) => ({
              label: item.name,
              value: item.id
            }))}
            onSelectItem={this.onSelectPayee}
          />
          <NumberField className="my-4" onSetValue={this.onSetAmount} />
          <button
            className="btn btn-primary my-2"
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
  balance: state.appState.balance,
  payees: state.appState.users,
  transactionCommiting: state.appState.transactionCommiting
})

const mapDispatchToProps = (dispatch: any) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  commitTransaction: (name: string, amount: number) =>
    dispatch(commitTransaction(name, amount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
