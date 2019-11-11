import analytics from '@react-native-firebase/analytics';

export const pageView = async (data: {name: string, page: number}) => {
  let result = await analytics().logEvent('product_view', {...data});

  console.log(data, result);
}

export const pageEvent = () => {

}