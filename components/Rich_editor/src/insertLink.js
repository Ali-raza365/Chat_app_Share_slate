/**
 *
 * @author tangzehua
 * @sine 2020-07-07 20:21
 */

// @flow
import React, { createRef, useEffect, useRef, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

export function InsertLinkModal (onDone,title,url,color, placeholderColor, backgroundColor,Ref,props) {
    // constructor(props) {
        //     super(props);
        //     this.state = {
            //         isModalVisible: false,
            //     };
            //     this.onDone = this.onDone;
            // }
            let ref=useRef();
const [visible, isModalVisible] = useState(false);
const [Title, setTitle] = useState(null);
const [Url, setUrl] = useState(null);
 const setModalVisible=(visible)=> {
        isModalVisible(visible)
    }
    useEffect(() => {
        console.log(ref,"jjjjj")

        // LinkModal.current = useState;
        // props.getRef(LinkModal);
      }, [visible]);
    
//  const   setTITLE=(title)=> {
// setTitle(title)
// }

//   const  setURL=(url)=> {
//        setURL(url)
//     }

  const  onDone_fun=() =>{
        // const title = this.title;
        // const url = this.url;
        setModalVisible(false);
       props?.onDone({Title, Url});
    }

    // render() {
        // const {isModalVisible} = this.state;
        // const {color, placeholderColor, backgroundColor} = this.props;
        return (
            <Modal 
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                coverScreen={false}
                isVisible={visible}
                backdropColor={color}
                backdropOpacity={0.3}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={[styles.dialog, {backgroundColor}]}>
                    <View style={styles.linkTitle}>
                        <Text style={{color}}>Insert Link</Text>
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder={'title'}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder="http(s)://"
                            onChangeText={(text) =>setUrl(text)}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)} >
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onDone_fun}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
// }

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    linkTitle: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#b3b3b3',
    },
    dialog: {
        borderRadius: 8,
        marginHorizontal: 40,
        paddingHorizontal: 10,
    },

    buttonView: {
        flexDirection: 'row',
        height: 36,
        paddingVertical: 4,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#286ab2',
    },
});
