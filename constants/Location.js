import React, { useState } from 'react';
import {  ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import argonTheme from './Theme'
import * as Location from "expo-location";
import { Block } from 'galio-framework';
import { useDispatch } from 'react-redux';
import { Location_Action } from '../redux/reducers/App_Realated/AppActon';

const { width, height } = Dimensions.get("screen");


function GooglePlacesInput  ({navigation,route})  {
  const [location, setlocation] = useState(null)
  const [loading, setloading] = useState(false)
  let from=route.params?.from;
const dispatch = useDispatch();
console.log(from)
const geoCode=async(loc)=>{
  setloading(true)

  let latitude = loc.lat;
    let longitude = loc.lng;

    let obj = {};
    obj = { ...obj, latitude, longitude };
  let LocationIs = await Location.reverseGeocodeAsync(obj);
    let obj2 = await LocationIs[0];
    setlocation(obj2)
    setloading(false)

  }
  console.log(location,"PPPPPP")

  return (
    <Block style={styles.container}>

    <GooglePlacesAutocomplete
    placeholder='Search'
    fetchDetails={true}
    enablePoweredByContainer={false}
    onPress={(data, details ) => {
      geoCode(details.geometry.location)
      // console.log(details.geometry.location)
    }}
    styles={{textInput:{ borderColor: "rgb(242,243,242)",
    borderWidth: .5,elevation:10,marginTop:5}}}
    query={{
      key: 'AIzaSyC8HV-F5sKpS8RKtkzhYsdOjcDIkHv_rXE',
      language: 'en',
    }}
    />
      <TouchableOpacity
        style={styles.btn}
        onPress={()=>{
          if(from==null){
            setloading(true)
            dispatch(Location_Action(location))
            navigation.navigate("ProfileBuilder")
          }else{
            setloading(true)

            dispatch(Location_Action(location))

            navigation.navigate("Profile",{location})

          }
        
        }
        }
      >
        <Text style={{ fontSize: 15, color: "white" }}>{loading==false?"Save":<ActivityIndicator color="white"/>}</Text>
      </TouchableOpacity>
    </Block>
  );
};
const styles = StyleSheet.create({
  container:{flex:1,paddingHorizontal:10,paddingBottom:20},
  btn:{
    alignSelf: "flex-start",
    width:width*.4,height:50,marginLeft: 10,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    justifyContent:"center",alignItems:"center",borderRadius:5
  }
})

export default GooglePlacesInput;
