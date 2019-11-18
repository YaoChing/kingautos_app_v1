import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Picker,
  TextInput,
  Platform,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export default (props: GProps) => {
  let [pickerValue, setPickerValue] = useState('網站建議');

  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
  }, []);

  return (
    <View
      style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        <ScrollView>  
          <View
            style={{width, height: 35, flexDirection: 'row', padding: 5, margin: 10, alignItems: 'center', borderLeftColor: '#b71d29', borderLeftWidth: 8}}>
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#b71d29', fontWeight: 'bold'}}>聯絡我們</Text>
          </View>
          <View
            style={{flex: 1, margin: 10}}>
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>聯絡事項</Text>
            <View
              style={{borderWidth: 1, marginVertical: 10}}>
              <Picker
                selectedValue={pickerValue}
                mode="dropdown"
                style={{height: 45}}
                onValueChange={(itemValue, itemIndex) => {
                  setPickerValue(itemValue);
                }}
              >
                <Picker.Item label="網站建議" value="key0" />
                <Picker.Item label="廣告洽詢" value="key1" />
                <Picker.Item label="其他聯絡事項" value="key2" />
              </Picker>
            </View>
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>您的姓名</Text>
            <TextInput
              style={{height: 45, marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, fontSize: (Platform.OS === 'ios') ? 16 : 18}} />
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>聯絡Email</Text>
            <TextInput
              style={{height: 45, marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, fontSize: (Platform.OS === 'ios') ? 16 : 18}} />
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>主旨</Text>
            <TextInput
              style={{height: 45, marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, fontSize: (Platform.OS === 'ios') ? 16 : 18}} />
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>內容</Text>
            <TextInput
              numberOfLines={5}
              style={{marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, fontSize: (Platform.OS === 'ios') ? 16 : 18}} />
          </View>
          <View
            style={{flex: 0.1, flexDirection: 'row', margin: 10}}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => true}
              style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', margin: 1, backgroundColor: '#b1090c'}} >
              <Text
                style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#ffffff'}}>
                確定
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => true}
              style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 1, marginRight: 1, backgroundColor: '#888'}} >
              <Text
                style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#ffffff'}}>
                取消
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}