//接口入口
export const BASE = "http://117.122.226.252:9997/";

/**
|--------------------------------------------------
| @const 组件
|--------------------------------------------------
*/
// 任务列表
export const TASKLIST = BASE + "api/component/task/list";

// 任务状态
export const TASKLISTSTATE = BASE + "api/component/task/listState";

// 任务状态保存
export const TASKSAVE = BASE + "api/component/task/save";

// 最近记录
export const RECENTRECORDLIST= BASE +"api/component/recent/list"

//即将进行的事件
export const IMMEDIATEEVENTLIST= BASE +"api/component/event/list"

// 销售业绩
export const PERFORMANCELIST= BASE +"api/component/salesDashboard/list" 

// 热门交易列表
export const HOTDEALLIST = BASE + "api/component/hotdeal/list";

// 助理
export const ASSISTANT = BASE + "api/component/helper/list";

// 页面布局列表
export const PAGELAYOUTLIST = BASE + "api/pageCreator/pageInfo/list";

// 页面布局详情

export const PAGEDETAIL = BASE + "api/pageCreator/pageInfo/get";

/**
|--------------------------------------------------
| @const 详情页
|--------------------------------------------------
*/
// 高亮区
export const HIGHLIGHT = BASE + "api/object/objectInfo/getBrief";

// 阶段
export const STAGE = BASE + "api/object/milestones/get";

// 查找所有人
export const LOOKUP = BASE + "api/object/objectInfo/lookup";

// 更改记录类型
export const RECORDTYPE = BASE + "api/object/objectInfo/getRecordType";

// 简要信息
export const BRIEFLYINFO = BASE + "api/object/objectInfo/getBrief";

// 保存张贴
export const SAVEPOSTS = BASE + "api/chatter/savePost";

// 保存文件
export const SAVEFILE = BASE + "api/chatter/saveFile";

// 保存投票
export const SAVEVOTE = BASE + "api/chatter/saveVote";

// 保存链接
export const SAVELINK = BASE + "api/chatter/saveLink";

//获取微贴列表
export const CHATTER = BASE +"api/chatter/list";

// 获取相关项所有对象
export const RELEVANTOBJECT = BASE + "api/activity/getObjects";

//新建事件
export const NEWEVENT = BASE + "api/activity/saveEvent";

//活动activity
export const ACTIVITY = BASE + "api/activity/list";

//新建任务
export const NEWTASK = BASE + "api/activity/saveTask";

//发送电子邮件
export const SENDEMAIL = BASE + "api/activity/sendEmail";

//记录电话
export const RECORDPHONE = BASE + "api/activity/savePhone";

//删除对象del
export const DELETEOBJ = BASE + "api/object/objectInfo/delete";

//获取对象详细信息
export const OBJDETAIL = BASE + "api/object/objectInfo/getDetail";

//相关列表布局
export const LISTS = BASE + "api/object/subObject/list";

//级联数据
export const LEVELDATA = BASE + "api/object/objectInfo/getCascader";

// 保存对象详细信息，新建保存、编辑保存
export const BODY_DETAILSAVE = BASE +"api/object/objectInfo/save"

// 获取依赖字段信息
export const DEPENDENCYFIELDINFOS = BASE +"api/object/objectInfo/getDependencyFieldInfos";

// 保存更改所有人
export const CHANGEOWNER = BASE + "api/object/objectInfo/changeOwner";
// 视图操作按钮
export const VIEWBTN = BASE + "api/view/button/list";

// 视图列表
export const VIEWLIST = BASE + "api/view/list";