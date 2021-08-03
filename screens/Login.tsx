import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableOpacity, Image } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';

import AuthContext from '../contexts/auth'

const LoginScreen:React.FC = ()=> {
    const { signed, signIn, user } = useContext(AuthContext);

    async function handleSignIn() {
        const response = await signIn({cpf:123456789, password:'123456789'});
    };

    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>ENTRAR</Text>
                <View style={styles.separator} />
                <TextField placeholder="CPF" placeholderTextColor='#ffe002' keyboardType="decimal-pad" />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Senha" textContentType="password" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <CustomButton title="Entrar" onPress={handleSignIn} color='#ffe002' />
                <View style={styles.separator} />
            </View>
            <View style={styles.forgout_password}>
                <TouchableOpacity>
                    <Text>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.create}>
                <TouchableOpacity>
                    <Text>
                        Criar conta!
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

export default LoginScreen;