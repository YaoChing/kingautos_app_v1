import analytics from '@react-native-firebase/analytics';

export const pageView = async (data: {name: string, page: number}) => {
  let result = await analytics().logEvent('PageView', {...data});

  console.log(data, result);
}

export const pageEvent = async (data: {action: string, name: string}) => {
  let result = await analytics().logEvent('PageEvent', {...data});

  console.log(data, result);
}