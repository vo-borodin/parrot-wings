import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import Dialog from 'react-bootstrap-dialog'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import { fetchTransactions } from '../../store/transactions/actions'
import { Transaction } from '../../store/transactions/models'
import { GlobalState } from '../../store/models'

import 'react-table/react-table.css'
import './styles.scss'
import { commitTransaction } from '../../store/app/actions'
import { NavBar } from '../../shared'

interface StateProps {
  transactions: Transaction[]
}

interface DispatchProps {
  fetchTransactions: () => void
  commitTransaction: (username: string, amount: number) => void
}

type Props = StateProps & DispatchProps

interface State {
  toRepeat?: {
    name: string
    amount: number
  }
}

class TransactionsPage extends React.Component<Props, State> {
  dialog: any = null

  componentDidMount() {
    this.props.fetchTransactions()
  }

  onRepeatTransaction = (row: any) => {
    const { username: usernameRaw, amount: amountRaw } = row
    const username = usernameRaw as string
    const amount = Number(amountRaw)
    if (amount < 0) {
      this.setState({
        toRepeat: { name: username, amount: Math.abs(amount) }
      })
      this.dialog.show({
        body: `Are you sure you want to send ${Math.abs(
          amount
        )} PW to the user ${username}?`,
        actions: [
          Dialog.CancelAction(),
          Dialog.OKAction(() => {
            this.onConfirm()
          })
        ]
      })
    }
  }

  onConfirm = () => {
    const { toRepeat } = this.state
    if (toRepeat) {
      const { name, amount } = toRepeat
      this.props.commitTransaction(name, amount)
      this.props.fetchTransactions()
    }
  }

  getTitleOfRepeat = (amount: number) => {
    if (amount < 0) {
      return 'You can create a new transaction as a copy of this'
    } else if (amount > 0) {
      return 'You can not repeat transaction in which you receive money'
    } else {
      return
    }
  }

  render() {
    return (
      <div className="container">
        <Dialog
          ref={component => {
            this.dialog = component
          }}
        />
        <NavBar />
        <Typography variant="h6" component="h6" className="paperTitle my-2">
          Transactions History
        </Typography>
        <div className="usersContainer">
          <Card>
            <ReactTable
              data={this.props.transactions || []}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]).includes(filter.value)
              }
              columns={[
                {
                  Header: '',
                  columns: [
                    {
                      Header: 'Id',
                      accessor: 'id',
                      width: 50
                    },
                    {
                      Header: 'Date',
                      accessor: 'date',
                      width: 150
                    },
                    {
                      Header: 'Name',
                      accessor: 'username'
                    },
                    {
                      Header: 'Amount',
                      accessor: 'amount'
                    },
                    {
                      Header: 'Balance',
                      accessor: 'balance'
                    },
                    {
                      Header: '',
                      Cell: row => (
                        <div
                          title={this.getTitleOfRepeat(
                            Number(row.original.amount)
                          )}
                        >
                          <button
                            disabled={Number(row.original.amount) > 0}
                            className="btn btn-link"
                            onClick={() =>
                              this.onRepeatTransaction(row.original)
                            }
                          >
                            Repeat
                          </button>
                        </div>
                      ),
                      filterable: false,
                      sortable: false
                    }
                  ]
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  transactions: state.transactionsState.transactions
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchTransactions: () => dispatch(fetchTransactions()),
  commitTransaction: (username: string, amount: number) =>
    dispatch(commitTransaction(username, amount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsPage)
