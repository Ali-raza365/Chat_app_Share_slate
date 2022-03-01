import React from 'react';
import { Text, StyleSheet } from 'react-native';


export default class DigitalTimeString extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time
        }
    };

    str_pad_left = (string, pad, length) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    convertNumberToTime = (total_milli_seconds) => {
        if (total_milli_seconds < 0) {
            return '00:00'
        }
        let total_seconds = total_milli_seconds / 1000;
        total_seconds = Number((total_seconds).toFixed(0));

        let hours = Math.floor(total_seconds / 3600);
        let seconds_left = total_seconds - hours * 3600;
        let minutes = Math.floor(seconds_left / 60);
        let seconds = seconds_left - minutes * 60;

        let finalTime = this.str_pad_left(hours, '0', 2) + ':' + this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
        return finalTime
    }

    render() {
        let time = this.convertNumberToTime(this.props.time);
        return (
            <Text style={[styles.StandardText]}>
                {time}
            </Text>
        )
    }
}

export const standardsStylesObject = {
    backgroundColor: "white",
    borderColor: "grey",
    color: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    fontSizeNormal: 10,
};

const styles = StyleSheet.create({
    StandardText: {
        fontSize: standardsStylesObject.fontSizeNormal,
        padding: 6,
        color: standardsStylesObject.color
    },
    StandardContainer: {
        borderRadius: standardsStylesObject.borderRadius,
        borderWidth: standardsStylesObject.borderWidth,
        borderColor: standardsStylesObject.borderColor,
        backgroundColor: standardsStylesObject.backgroundColor,
        marginLeft: 10,
        marginRight: 10
    },
});
