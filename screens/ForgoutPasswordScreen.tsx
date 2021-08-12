import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableOpacity, Image } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';

import AuthContext from '../contexts/authenticate'

const ForgoutPasswordScreen: React.FC = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(0);
    const [sentCode, setSentCode] = useState(false);
    async function handleSentCode() {
      if(true) {
          /* Fazer requiçisão aqui */
          setSentCode(true);
      }  
    };
    async function handleVerify() {
        if (true) {
            // const response = await signIn({ cpf: cpf, code: code });
            console.log(sentCode)
        };
    };

    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Recuperar senha</Text>
                <View style={styles.separator} />
                <TextField placeholder="E-mail" placeholderTextColor='#ffe002' keyboardType="email-address" />
                <View style={styles.separator} />
                <TextField placeholder="Código" keyboardType="decimal-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                    {sentCode ? <CustomButton title="Verificar" onPress={handleVerify} color='#ffe002' /> : <CustomButton title="Enviar Código" onPress={handleSentCode} color='#ffe002' />}
    
                <View style={styles.separator} />
            </View>
            
            <View style={styles.separator} />
            <View style={styles.create}>
                <TouchableOpacity onPress={() => navigation.goBack("Login")}>
                    <Text>
                        Voltar
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

export default ForgoutPasswordScreen;