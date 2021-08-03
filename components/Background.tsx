import * as React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

export const Background: React.FC = (props) =>{
    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {props.children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
    },
})