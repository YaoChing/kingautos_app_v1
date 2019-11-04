import Constants from '../configs/Constants';

// 取得資料路由
const _fetchData = async (url: string) => {
  let totalPage = 1;
  let data = [];
  let result: any = await fetch(url, {
    headers: {
      "content-type": "application/json",
      "S-Token": "5058B5BA0FE4006270E990622518B0C8"
    }
  });

  result = await result.json();

  if(result.status) {
    if(result.totalpage) {
      totalPage = result.totalpage
    }

    if(result.data) {
      data = result.data;
    }

    return {
      data, totalPage
    }
  }
}

// 取得類別文章列表
export const getCategoryData = async (cateID: number, page: number) => {
  let url: string = Constants.apiUrl + '/category/' + cateID + '/' + page;
  let result: any = await _fetchData(url);

  return {id: cateID, totalPage: result.totalPage, data: result.data}
}

// 取得作者文章列表
export const getAuthorData = async (authroID: number, page: number) => {
  let url: string = Constants.apiUrl + '/author/' + authroID + '/' + page;
  let result: any = await _fetchData(url);

  return {id: authroID, totalPage: result.totalPage, data: result.data}
}

// 取得關鍵字文章列表
export const getTagData = async (tagName: string, page: number) => {
  let url: string = Constants.apiUrl + '/tag/' + tagName + '/' + page;
  let result: any = await _fetchData(url);

  return {tagName, totalPage: result.totalPage, data: result.data}
}

// 取得熱門關鍵字
export const getHotKeywords = async () => {
  let url: string = Constants.apiUrl + '/hot/keywords';
  let result: any = await _fetchData(url);

  return {data: result.data}
}

// 取得熱門關鍵字
export const getHotLabel = async () => {
  let url: string = Constants.apiUrl + '/hot/tags';
  let result: any = await _fetchData(url);

  return {data: result.data}
}

// 取得單篇文章內文
export const getArticleData = async (articleID: number) => {
  let url: string = Constants.apiUrl + '/single/' + articleID;
  let result: any = await _fetchData(url);

  return {id: articleID, data: result.data}
}