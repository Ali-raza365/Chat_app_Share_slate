import React, { Component } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Images, argonTheme } from "../constants";
import { ReferMe_action } from '../redux/reducers/ap-user/ap_user_actions';

export default function RadioButton ({PROP}) {
	const [value, setvalue] = useState(null)
	
const dispatch = useDispatch();


		return (
			<View>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									setvalue(
										res.key,
									),
									dispatch(ReferMe_action(res.key))
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
							<Text style={styles.radioText}>{res.text}</Text>

						</View>
					);
				})}
                {/* <Text> Selected: {value} </Text> */}
			</View>
		);
	// }
}

const styles = StyleSheet.create({
	container: {
        marginBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
		// justifyContent: 'space-between',
	},
    radioText: {
        // marginRight: 35,
        marginLeft:10,
        fontSize: 15,
        color: '#000',
        // fontWeight: '500'
    },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 100,
		// borderWidth: 1,
		backgroundColor:"silver",
		// borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor:"rgb(94,175,252)",
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});