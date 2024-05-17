/* eslint-disable implicit-arrow-linebreak */
import http from '@/utils/http';
// import axios from 'axios';

// 管理员登

export const loginApi = (params) => http.post('/login', params);
export const captchaImageAPi = () => http.get('/captchaImage');
// header 头
export const adminInfo = () => http.get('/getInfo');
// 路由消息
export const adminMenu = () => http.get('/getRouters');

// 部门
export const getlist = () => http.get('/system/dept/list');
// 下拉树列表
export const gettreeselect = () => http.get('/system/dept/treeselect');
// 新增部门
export const newdept = (params) => http.post('/system/dept', params);
// 修改
export const newdeptxg = (params) => http.put('/system/dept', params);
// 删除
export const sysdeptId = (deptId) => http.delete(`/system/dept/${deptId}`);

// 用户管理
export const getuserlist = () => http.get('/system/user/list');
export const editadd = (params) => http.post('/system/user/edit', params);

export const getuserid = (userId) => http.get(`/system/user/${userId}`);

export const deletuserid = (userId) => http.delete(`/system/user/${userId}`);
// 角色管理
export const sysRolelist = () => http.get('/system/role/list');
// 角色管理 新增
export const sysRoleEdit = (params) => http.post('/system/role/edit', params);
// 角色管理 删除
export const sysRoleId = (userId) => http.delete(`/system/role/${userId}`);
// 角色管理 修改
export const sysRoleEditP = (params) => http.put('/system/role/edit', params);

// 角色信息
export const rolexx = (userId) => http.get(`/system/role/${userId}`);
// 有授权的
export const fenUserRole = (data) => http.get(`system/userRole/get/${data}`);
// 未分配的角色
export const wfprole = (params) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  http.get('/system/userRole/GetExcludeUsers', { params });
// 添加授权的
export const addwfprole = (params) => http.post('/system/role/create', params);

// 登录日志 查询登录日志
export const loglist = () => http.get('/monitor/logininfor/list');
// 登录日志 删除登录日志
export const logdelete = (infolds) => http.delete(`/system/role/${infolds}`);
// 操作日志
export const getrolelist = () => http.get('/monitor/operlog/list');

// 菜单列表
export const sysMenulist = () => http.get('/system/menu/list');
// 菜单列表下拉树
export const sysMenutreeS = () => http.get('/system/menu/treeSelect');

export const sysMenuId = (menuId) => http.get(`/system/menu/${menuId}`);
// 菜单列表下拉树(id)
export const sysMenutreeSelect = (roleId) => http.get(`/system/menu/roleMenuTreeselect/${roleId}`);
// 菜单添加
export const sysMenuadd = (data) => http.put('/system/menu/add', data);
// 菜单删除
export const sysMenudelete = (menuId) => http.delete(`/system/menu/${menuId}`);

export const sysMenuedit = (params) => http.post('/system/menu/edit', params);

// 登录日志
export const monitorLogininfor = () => http.get('/monitor/logininfor/list');
// 删除登录日志
export const deletemonitorLogininfor = () => http.delete('/monitor/logininfor/clean');

// 操作日志
export const monitorOperlog = () => http.get('/monitor/operlog/list');

// 订单明细
export const payOrderlist = () => http.get('/business/payorder/list');
// 获取订单详情
export const payOrderId = (Transactionid) => http.get(`/business/Payorder/${Transactionid}`);

// 科室管理列表
export const Deptlist = () => http.get('/business/Dept/list');
// 科室管理列表(下拉框)
export const Deptalllist = () => http.get('/business/Dept/alllist');
// 科室管理列表详情(Id)
export const DeptalllistId = (Id) => http.get(`/business/Dept/${Id}`);
// 添加科室管理
export const DeptallNew = (data) => http.post('/business/Dept', data);
// 更新科室管理
export const DeptallEdit = (data) => http.put('/business/Dept', data);
// 删除科室管理
export const DeptdeleteId = (Id) => http.delete(`/business/Dept/${Id}`);

// 楼层管理
export const Foordatalist = () => http.get('/business/Foordata/list');

// 身体部位
export const Bodyparts = () => http.get('/business/Bodyparts/list');
// 添加身体部位
export const BodypartsNew = (data) => http.post('/business/Bodyparts', data);
// 删除
export const Bodypartsdelete = (id) => http.delete(`/business/Bodyparts/${id}`);

// 就诊卡列表
export const BodyCardslist = () => http.get('/business/Cards/list');

// 意见反馈列表
export const Feedbacklist = () => http.get('/business/Feedback/list');

// 意见反馈详情
export const FeedbackID = (id) => http.get(`/business/Feedback/${id}`);

// 意见反馈删除
export const FeedbackDeleteID = (id) => http.delete(`/business/Feedback/${id}`);

// 症状管理
export const Symptomslist = () => http.get('/business/Symptoms/list');


// 伴随症状列表
export const Concomitants = () => http.get('/business/Concomitants/list');

// 医生列表
export const Doctorlist = () => http.get('/business/Doctor/list');
// 医生添加
export const DoctorPost = (data) => http.post('/business/Doctor', data);
// 医生更新
export const DoctorPut = (data) => http.put('/business/Doctor', data);
// 医生删除
export const Doctordelete = (id) => http.delete(`/business/Doctor/${id}`);

// 问卷调查表
export const Surveyslist = () => http.get('/business/Surveys/list');
// 查询问卷调查列表详情
export const SurveysID = (id) => http.get(`/business/Surveys/${id}`);
