import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Input, Tag} from 'antd';
import  GithubGraphqlApiPage from './GithubGraphqlApiPage'
const { CheckableTag } = Tag
export class SearchGithubPage extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    value: this.props.examples.searchWhat,
    organizationName: this.props.examples.searchWhat,
    searchHistory: ['facebook','ant-design']
  }

  componentDidMount(){
    console.log("mounted");
  }
  
  onchange = event =>{
    this.setState({value: event.target.value})
  }

  //获取数据
  fetchData= () => {
    const organizationName = this.state.value;
    const { searchHistory } = this.state

    if(organizationName !== '') {
      this.setState({organizationName: organizationName});
      
      //更新搜索历史
      const hasSearchHistory = searchHistory.includes(organizationName)
      if (!hasSearchHistory) {
        const nextSearchHistory =  [...searchHistory, organizationName] 
        this.setState({searchHistory: nextSearchHistory})
      }
    }
  }

  //防抖，键入停止时触发请求
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

  handleSearchHistory(tag,checkd){
    console.log('tag,checkd',tag,this)
    this.setState({ organizationName: tag});
    this.setState({ value: tag});    
  }


  render() {
    const { value, organizationName, searchHistory } = this.state

    return (
      <div className="examples-search-github-page">
        <p style={{textAlign:"center", marginBottom:30}}>搜索github上公司或组织的repo</p>
        <Input
          value={value}
          placeholder="输入公司或组织名称"
          className="mb-20"
          type="text"
          onChange = {this.onchange}
          onKeyUp={ this.debounce(this.fetchData, 2000) }
        />
        <div className="mb-80">
          <span style={{ marginRight: 8 }}>搜索历史:</span>
          {searchHistory.map(tag => (
            <CheckableTag
              key={tag}
              onChange={checked => this.handleSearchHistory(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>
        <GithubGraphqlApiPage
          searchKeyWord={organizationName}
        />
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
