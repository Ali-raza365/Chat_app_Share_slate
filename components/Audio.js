import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import AudioSlider from "../components/audioPlayer/AudioSlider";

export default function App() {
    const [recording, setRecording] = React.useState();
    const [sound, setSound] = React.useState();

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }
    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/pal.mp3')
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            <View style={{}}>
                <Button title="Play Sound" onPress={playSound} />
            </View>
            <View style={{
                // backgroundColor: "red",
                // height: 100,
                // position: "absolute",
                // top: 30,
                // zIndex: 23
            }}>
                <Text>dfsdfsd</Text>
                <AudioSlider audio={require('../assets/pal.mp3')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
});
