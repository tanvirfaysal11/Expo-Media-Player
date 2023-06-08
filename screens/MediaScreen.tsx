import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button, AppState, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { debugPrint } from './utils/systemUtils';
import { Text } from 'galio-framework';
import { AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window')

export default function Media() {
    const video = useRef(null);
    const [status, setStatus] = useState<any>({});
    const appState = useRef(AppState.currentState);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(10000);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (appStateVisible === "active" && formatNumber(status?.positionMillis) > 0) {
            video.current.playAsync()
        }
        if (appStateVisible === "background") {
            video.current.pauseAsync()
        }
    }, [appStateVisible])

    console.log(`The video is ${formatNumber(status?.positionMillis)} seconds long.`);


    const handleVideoTime = () => {
        let ms = status?.positionMillis,
            min = Math.floor((ms / 1000 / 60) << 0),
            sec = Math.floor((ms / 1000) % 60);
        return min + ':' + sec
    };

    function formatNumber(num) {
        if (num >= 1000) {
            const firstDigit = Math.floor(num / 1000);
            return firstDigit * 1000;
        } else {
            return num;
        }
    }

    useEffect(() => {
        if (formatNumber(status?.positionMillis) === timer) {
            setTimer(formatNumber(status?.positionMillis) + 10000)
            video.current.pauseAsync()
            Alert.alert('Alert', 'You want you continue this video?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Continue', onPress: () => video.current.playAsync() },
            ]);
        }
        if (status?.didJustFinish === true) {
            Alert.alert('Alert', 'Video is end', [
                {
                    text: 'Ok',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
        }

    }, [status?.positionMillis])

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: 'https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8' }}
                resizeMode={ResizeMode.COVER}
                isLooping={false}
                // useNativeControls
                volume={1.0}
                audioPan={10}
                onPlaybackStatusUpdate={(status: any) => setStatus(() => status)}
            />

            {!isShow && <View style={styles.buttons}>
                {/* <Button
                    title={status?.isPlaying ? 'Pause' : 'Play'}
                    onPress={() => {
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        // setTimer(Math.floor((status?.positionMillis / 1000) % 60) + 10)
                        setIsShow(true)
                    }}
                /> */}
                <TouchableOpacity onPress={() => {
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    setIsShow(true)
                }}
                >
                    <View style={{ marginVertical: "20%" }}>
                        <AntDesign name="play" size={60} color="#454545" />
                    </View>
                </TouchableOpacity>

            </View>}
            {isShow && <View style={{ alignItems: "center" }}>
                <Text size={18} color='#454545'>Play Time: <Text size={16}>{handleVideoTime()}</Text></Text>
            </View>}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: width,
        height: height / 3.5,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
