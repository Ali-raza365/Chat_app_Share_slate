import React, { useImperativeHandle ,forwardRef} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';

export const SweetAlert  =()=>  {
  const [visible, setVisible] = React.useState(true);

  //  shows=()=>{
  //  :async()=> React.useCallback(() => {
  //   setVisible(!visible);
  // }, [visible]);
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$")
  return (
    <View>
      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          borderRadius: 50,
          width: '100%',
        }}><Ionicons
        name={Platform.select({ ios: 'checkmark', android: 'md-close' })}
        size={20}
        color="white"
      /></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>Hello there</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>toggleAlert()}>
        <Text style={styles.btnText}>Greate!</Text>
      </TouchableOpacity>
      </FancyAlert>
    </View>
  )}
// }
const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    marginBottom: 16,

    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});


