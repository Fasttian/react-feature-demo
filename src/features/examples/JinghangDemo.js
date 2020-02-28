import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button} from 'antd';
import { fetchList } from './redux/actions'

const columns = [
  {
    title: '机构',
    dataIndex: 'schoolName',
    sortDirections: ['descend'],
  },
  {
    title: '更新时间',
    dataIndex: 'timeStamp',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.timeStamp - b.timeStamp,
  },
  {
    title: '排课数',
    dataIndex: 'totalClassNum',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalClassNum - b.totalClassNum,
  },
  {
    title: '正在上课课节数',
    dataIndex: 'inClassNum',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.inClassNum - b.inClassNum,
  },
  {
    title: '预计人数',
    dataIndex: 'totalTargetAttendNum',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalTargetAttendNum - b.totalTargetAttendNum,
  },
  {
    title: '正在上课人数',
    dataIndex: 'totalAttendNum',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalAttendNum - b.totalAttendNum,
  }
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export class JinghangDemo extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchList();
    this.timer = setInterval(() => {
      console.log('dingshizhixing')
      this.props.actions.fetchList();
    }, 600000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleData() {
    const { jingHangList} = this.props.examples;
    if(jingHangList.length !== 0){
      let total = jingHangList.totalInfo;
      total.schoolName = '总计';
      let foodData = jingHangList.allSchoolInfos.concat(total);
      return foodData;
    } else {
      return [];
    }
  }


  render() {
    const { fetchListPending, fetchListError} = this.props.examples;
    const { fetchList } = this.props.actions;

    return (
      <div className="examples-jinghang-demo">
        <Button onClick={fetchList}>{fetchListPending ?  '刷新中……' : '刷新' }</Button>
        <span className="data-status">{fetchListError ? '获取数据出错……' : '数据10分钟自动刷新（查看控制台），或手动刷新'}</span>
        <Table rowKey={record =>record.schoolName} columns={columns} dataSource={this.handleData()} onChange={onChange} className="table"/>

      </div>
    );
  }
}

/* 连接store数据 */
function mapStateToProps(state) {
  return {
    examples: state.examples,
  };
}

/* actions状态改变通知 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JinghangDemo);
