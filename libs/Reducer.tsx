export const initState = {
  isShowSideMenu: false,
  isShowSideBrand: false,
  isShowSearch: false,
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
    case 'SetTagFromFooter':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'tagArea'});
    case 'SetFqaFromFooter':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'fqaArea'});
    
    // 左側選單
    case 'SetWallpaperFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'wallpaperArea', isShowSideMenu: false});
    case 'SetFqaFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'fqaArea', isShowSideMenu: false});
    case 'SetTagFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'tagArea', isShowSideMenu: false});
    case 'SetCateFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'categoryArea', isShowSideMenu: false});
    case 'SetAreaFromSideMenu':
      return Object.assign({}, state, {nowCate: action.data, nowArea: action.data + 'Area', isShowSideMenu: false});
    
    // 搜尋選單
    case 'SetCateFromSearch':
      return Object.assign({}, state, {nowCate: action.data, nowArea: 'searchArea', isShowSearch: false});

    // 設定左右側選單狀態
    case 'SetIsShowSideMenu':
      return Object.assign({}, state, {isShowSideMenu: action.data, isShowSearch: false});
    case 'SetIsShowSideBrand':
        return Object.assign({}, state, {isShowSideBrand: action.data});
    case 'SetIsShowSearch':
      return Object.assign({}, state, {isShowSearch: action.data});

    case '':
      return Object.assign({}, state, {});
    default:
      return state;
  }
}