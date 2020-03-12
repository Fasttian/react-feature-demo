// 初始状态是为功能的Redux store定义所有初始值的地方。
// 随着应用程序的增长，将会有多个reducer文件，整个store管理哪些数据并不直观。
// 因此，将初始状态定义提取到一个单独的模块中，以便可以
// 随时可以快速查看该功能使用的数据。

const initialState = {
  count: 0,
  redditList: [],
  jingHangList:[],
  fetchListPending: false,
  fetchListError: null,
  searchWhat: 'ant-design'
};

export default initialState;
