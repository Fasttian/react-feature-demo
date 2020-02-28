import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

export class WelcomePage extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="examples-welcome-page">
        <a href="http://github.com/supnate/rekit">
          <img src={rekitLogo} className="app-logo" alt="logo" />
        </a>
        <h1>Welcome to Recat examples!</h1>
        <p>
          这是一个用react实现的一些小demo，方便查看
        </p>
        
        <p>
          想要更多了解请访问我的github, 代码在:{' '}
          <a href="http://rekit.js.org/docs/get-started.html">项目源代码</a>
        </p>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    examples: state.examples,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
