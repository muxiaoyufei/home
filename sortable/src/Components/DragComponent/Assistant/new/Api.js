export const  AppListColor = ['#ED8B00', '#963CBD', '#FFC72C', '#7EC4F1', '#BAAC93',
                              '#418FDE', '#CF4747', '#BF398A', '#96E943', '#81EFA5',
                              '#A3C589', '#6542DD', '#ED8B00', '#963CBD', '#FFC72C',
                              '#7EC4F1', '#BAAC93', '#418FDE', '#CF4747', '#BF398A',
                              '#96E943', '#81EFA5', '#A3C589', '#6542DD',]

export const AppListIcon = ['icon-globe', 'icon-group', 'icon-bookmark', 'icon-calendar', 'icon-list-ol',
                            'icon-cloud', 'icon-pencil', 'icon-desktop', 'icon-puzzle-piece', 'icon-folder',
                            'icon-asterisk', 'icon-bell', 'icon-tachometer', 'icon-cube', 'icon-filter',
                            'icon-fire', 'icon-leaf', 'icon-refresh', 'icon-heart', 'icon-sitemap',
                            'icon-coffee', 'icon-star', 'icon-tag', 'icon-random', 'icon-road']

//接口入口
// export const _Base = "http://devcenter.cloudcc.com:30068/";
// export const _Base = "http://devcenter.cloudcc.com:30054/";
export const _Base = "http://117.122.226.252:9997/";
// export const _Base = "http://test.production.cloudcc.com/";

export const end="?binding=E9B3A71EDDC49132022A3FB96F4C89D0";

// export const _Base = "/";
//列表头，列表内容(公共接口)
export const _listGrid = _Base + "api/object/objectInfo/listGrid"

/**
|--------------------------------------------------
| 首次登陆渲染的数据接口
|--------------------------------------------------
*/
//用户信息
export const _userInfo = _Base + "api/common/userInfo/get";

//登陆后，首次渲染页面的数据(系统应用，选项卡)
export const _appList = _Base + "api/app/list";

//视图列表
export const _viewList = _Base + "api/view/list";

//视图操作按钮
export const _viewButtonList = _Base + "api/view/button/list";


/**
|--------------------------------------------------
| 看板数据，看板设置数据
|--------------------------------------------------
*/
//Tab数据
export const _boardTabList = _Base + "api/view/boardTab/list";

//分组与分组下的数据
export const _boardDataList = _Base + "api/view/boardData/list";

//看板设置数据
export const _boardSettingList = _Base + "api/view/boardSetting/list";

//保存看板设置数据
export const _boardSave = _Base + "api/view/boardSetting/save";

//保存拖拽保存
export const _boardDrag = _Base + "api/view/boardData/saveValue";

/**
|--------------------------------------------------
| 高级搜索数据
|--------------------------------------------------
*/
//高级搜索字段数据
export const _searchList = _Base + "api/object/objectInfo/listSearchField";

//高级搜索查找数据
export const _searchFined = _Base + "api/object/objectInfo/listLookupCodeInfo";


/**
|--------------------------------------------------
| 创建视图
|--------------------------------------------------
*/
//第一步数据
export const _Step1 = _Base + "api/view/createStep1";

//第二步数据
export const _Step2 = _Base + "api/view/createStep2";

//第三步数据
export const _Step3 = _Base + "api/view/createStep3";

//删除视图
export const _deleteView = _Base + "api/view/delete";

//保存试图
export const _saveView = _Base + "api/view/save";

//编辑视图
export const _editView =_Base + "api/view/edit";

/**
|--------------------------------------------------
| 数据列表显示自定义
|--------------------------------------------------
*/
export const _sortTable = _Base + "api/sortTable/get";


/**
|--------------------------------------------------
| 详情页，相关列表
|--------------------------------------------------
*/
export const _dataList = _Base + "api/object/dataList/list";

/**
|--------------------------------------------------
| 版本切换
|--------------------------------------------------
*/
export const _version = _Base + "api/common/changePageMode";

/**
|--------------------------------------------------
| 批量删除
|--------------------------------------------------
*/
export const _batchDelete = _Base + "api/object/objectInfo/delete";

/**
|--------------------------------------------------
| 级联数据
|--------------------------------------------------
*/
export const _CascadeData = _Base + "api/object/objectInfo/getCascader";

/**
|--------------------------------------------------
| 获取对象详细信息
|--------------------------------------------------
*/
export const _BodyDetail = _Base + "api/object/objectInfo/getDetail";

/**
|--------------------------------------------------
| 获取对象详细信息
|--------------------------------------------------
*/
export const _BODYSHOW = _Base + "api/object/objectInfo/getBrief";

/**
|--------------------------------------------------
| 获取对象详细信息
|--------------------------------------------------
*/
export const _BODYDETAILSAVE = _Base + "api/object/objectInfo/save";
// 数据对象简要信息
export const BODY_SHOW =_Base+"api/object/objectInfo/getBrief"
//对象详细信息
export const BODY_DETAIL =_Base+"api/object/objectInfo/getDetail";
// 保存对象详细信息，新建保存、编辑保存
export const BODY_DETAILSAVE =_Base+"api/object/objectInfo/save"
//里程碑字段信息
export const MILESTONE =_Base+"api/object/milestones/get"
//相关列表布局
export const LISTS = _Base+"api/object/subObject/list"
//获取微贴列表
export const CHATTER = _Base+"api/chatter/list"
//保存张贴
export const CHATTERPost = _Base+"api/chatter/savePost"
//保存文件
export const CHATTERFile = _Base+"api/chatter/saveFile"
//保存链接
export const CHATTERLink = _Base+"api/chatter/saveLink"
//保存投票
export const CHATTERVote = _Base+"api/chatter/saveVote"
//微贴喜欢或取消喜欢
export const _praiseFeed = _Base+"api/chatter/praiseFeed"
//微贴收藏或取消收藏
export const _favoriteFeed = _Base+"api/chatter/favoriteFeed"
//发布评论
export const _addMicroComment = _Base+"api/chatter/addMicroComment"
//删除评论
export const _removeComment = _Base+"api/chatter/removeComment"
//删除评论
export const _removeFeed = _Base+"api/chatter/removeFeed"
//投票
export const _chatterVote = _Base+"api/chatter/vote"
//活动activity
export const ACTIVITY = _Base+"api/activity/list";
//删除对象del
export const DEL = _Base+"api/object/objectInfo/delete"
//新建任务
export const _saveTask = _Base+"api/activity/saveTask" 
//新建事件
export const _saveEvent = _Base+"api/activity/saveEvent" ;
//记录电话
export const _savePhone = _Base+"api/activity/savePhone"
//发送电子邮件
export const _sendEmail = _Base+"api/activity/sendEmail"
// 提交待审批
export const _submitForApproval = _Base+"api/object/objectInfo/submitForApproval"
// 更改记录类型
export const _getRecordType = _Base+"api/object/objectInfo/getRecordType"
// 查找
export const _lookup = _Base+"api/object/objectInfo/lookup";
// 保存更改所有人
export const _changeOwner = _Base+"api/object/objectInfo/changeOwner"
// 潜在客户里程碑 保存转换潜在客户
export const _leadConvert = _Base+"api/object/objectInfo/leadConvert"
// 获取依赖字段信息
export const _getDependencyFieldInfos = _Base+"api/object/objectInfo/getDependencyFieldInfos"
// 获取页面布局框架
export const _getLayout = _Base+"api/object/objectInfo/getLayout" ;
// 获取相关项所有对象
export const _getObjects = _Base+"api/activity/getObjects" ;
// 获取多语言
export const _multiLanguage =_Base+"api/common/getMultiLang"


