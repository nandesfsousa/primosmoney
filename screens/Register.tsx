import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableOpacity, Image } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';

import AuthContext from '../contexts/authenticate'

const RegisterScreen: React.FC = ({ navigation }) => {
    const { signed, signIn, user } = useContext(AuthContext);
    const [screen, setScreen] = useState(0);
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Dados Pessoais</Text>
                <View style={styles.separator} />
                <TextField placeholder="Nome Completo" placeholderTextColor='#ffe002' keyboardType="ascii-capable" />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Cidade" keyboardType="ascii-capable" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <CustomButton title="Proxímo"onPress={()=>{}} color='#ffe002' />
                <View style={styles.separator} />
            </View>
            <View style={styles.separator} />
            <View style={styles.create}>
                <TouchableOpacity onPress={() => navigation.goBack("Login")}>
                    <Text>
                        Já tem uma conta?
                    </Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 20,
        width: '100%',
        elevation: 5,
        shadowColor: '#161415',
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
    forgout_password: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
        paddingTop: 16
    },
    create: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16
    },
    logo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16
    }
});

export default RegisterScreen;