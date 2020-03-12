import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Input } from 'antd';
import  GithubGraphqlApiPage from './GithubGraphqlApiPage'

export class SearchGithubPage extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    value: this.props.examples.searchWhat,
    organizationName: this.props.examples.searchWhat
  }

  componentDidMount(){
    console.log("mounted");
  }
  
  onchange = event =>{
      // console.log('onchanges event',event.targat.value)
      this.setState({value: event.target.value})
  }

  fetchData= () => {
    const organizationName = this.state.value;
    if(organizationName !== '') this.setState({organizationName: organizationName})
  }

  //防抖
  debounce(func, wait){
    let timer = null;
    return function(){
      var context = this;
      var args = arguments;
      
      clearTimeout(timer);
      timer = setTimeout(function(){
        func.apply(context, args);
      }, wait);
    }
  }


  render() {
    const { value, organizationName } = this.state

    return (
      <div className="examples-search-github-page">
        <p>搜索github上公司或组织的repo:</p>
        <Input
          value={value}
          placeholder="输入公司或组织名称"
          className="mb-100"
          type="text"
          onChange = {this.onchange}
          onKeyUp={ this.debounce(this.fetchData, 2000) }
        />
        <GithubGraphqlApiPage 
          searchKeyWord={organizationName}
        />
    {/* <p>ssss{examples.searchWhat}</p> */}
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGithubPage);
