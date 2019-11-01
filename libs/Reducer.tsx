export const initState = {
  isShowSideMenu: false,
  isShowSideBrand: false,
  nowCate: 'all',
  nowArea: 'categoryArea'
};

export const initFunction = (state: any, action: {type: string, data: any}) => {
  switch(action.type) {
    // 右側選單
    case 'SetBrandFromSideBrand':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'brandArea', isShowSideBrand: false});

    // 下側選單
    case 'SetCateFromFooter':
        return Object.assign({}, state, {nowCate: action.data, nowArea: 'categoryArea'});
    
    // 左側選單
    case 'SetTagFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'tagArea', isShowSideMenu: false});
    case 'SetCateFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'categoryArea', isShowSideMenu: false});
    case 'SetAreaFromSideMenu':
        return Object.assign({}, state, {nowCate: action.data, nowArea: action.data + 'Area', isShowSideMenu: false});

    // 設定左右側選單狀態
    case 'SetIsShowSideMenu':
      return Object.assign({}, state, {isShowSideMenu: action.data});
    case 'SetIsShowSideBrand':
        return Object.assign({}, state, {isShowSideBrand: action.data});

    case '':
      return Object.assign({}, state, {});
    default:
      return state;
  }
}