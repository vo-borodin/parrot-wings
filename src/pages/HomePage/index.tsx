import React from "react";
import { connect } from "react-redux";

class HomePage extends React.Component {
  render() {
    return <div>Home Page</div>;
  }
}

export default connect()(HomePage);
