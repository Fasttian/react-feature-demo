import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SidePanel extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="examples-side-panel">
        <ul>
          <li>
            <Link to="/examples">Welcome</Link>
          </li>
          <li>
            <Link to="/examples/search-github">search github</Link>
          </li>
          <li>
            <Link to="/examples/jinghang-demo">定时获取数据</Link>
          </li>
        </ul>
        <div className="memo">
          导航中的有多个demo，相互独立，方便演示
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
