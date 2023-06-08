import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, Image } from 'react-native';

export default function SplashScreen() {
    const navigation = useNavigation();
    const backgroundFade = useRef(new Animated.Value(0)).current;
    const logoFade = useRef(new Animated.Value(0)).current;
    const logoMovement = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        timer();
    }, [])

    const timer = () => {
        const timout = setTimeout(() => {
            navigation.navigate("Media");
        }, 3500);
        return () => {
            clearTimeout(timout);
        }
    }

    useEffect(() => {
        Animated.timing(backgroundFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        Animated.timing(logoFade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            Animated.timing(logoMovement, {
                toValue: -250,
                duration: 2000,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true,
            }).start();
        }, 2250);

    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            opacity: backgroundFade,
        },
        logo: {
            color: 'white',
            fontSize: 48,
            fontWeight: 'bold',
            opacity: logoFade,
        },
    });
    return (
        <>
            <Animated.View style={styles.container}>
                <Animated.Image style={styles.logo} source={require("../../assets/xeon-logo.png")} />
            </Animated.View>
        </>
    );
}