import React from 'react'

import LoginPage from './pages/LoginPage'
import { Route, Router } from 'react-router-dom'
import { history } from './helpers/history'
import RegisterPage from './pages/RegisterPage'
import { clear } from './store/alert/actions'
import { PrivateRoute } from './shared'
import HomePage from './pages/HomePage'
import { connect } from 'react-redux'
import { GlobalState } from './store/models'
import { Alert } from './store/alert/models'

import './App.css'

interface StateProps {
  alert?: Alert
}

interface DispatchProps {
  clear: () => void
}

type Props = StateProps & DispatchProps

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    history.listen((location, action) => {
      this.props.clear()
    })
  }

  render() {
    const { alert } = this.props
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <Router history={history}>
              <>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </>
            </Router>
            {alert && (
              <div className={`alert ${alert.alertType}`}>{alert.message}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  alert: state.alertState.alert
})

const mapDispatchToProps = (dispatch: any) => ({
  clear: () => dispatch(clear())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
