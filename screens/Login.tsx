import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Erro, Text, View, TouchableOpacity, Image } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';
import { MaskService } from 'react-native-masked-text'
import AuthContext from '../contexts/authenticate'


type InputValue = {
    value: string
};
const LoginScreen: React.FC = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    function cpfMask(value: InputValue) {
        return (MaskService.toMask('cpf', value.value));
    };
    async function handleSignIn() {
        setErro('');
        if (cpf.length > 0 && password.length > 3) {
            const response = await signIn({ cpf: cpf, password: password });
            if(response.response.status === 404){
                setErro('Usuário não cadastrado');
            };
            if(response.response.status === 401){
                setErro('Senha inválida');
            };
        };
        if(cpf.length < 11){
            setErro('CPF inválido');
        };
        if(password.length < 3){
            setErro('Senha inválida');
        };
    };
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <View style={styles.container_erro}>
                <Erro style={styles.erro}>{erro}</Erro>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>ENTRAR</Text>
                <View style={styles.separator} />
                <TextField placeholder="CPF" keyboardType="number-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setCpf(cpfMask({ value: value }))} value={cpf}/>
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Senha" textContentType="password" placeholderTextColor='#ffe002' onChangeText={(value)=>setPassword(value)} value={password}/>
                <View style={styles.separator} />
                <CustomButton title="Entrar" onPress={handleSignIn} color='#ffe002' />
                <View style={styles.separator} />
            </View>
            <View style={styles.forgout_password}>
                <TouchableOpacity onPress={() => navigation.push("ForgoutPassword")}>
                    <Text>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.create}>
                <TouchableOpacity onPress={() => navigation.push("Register")}>
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
    container_erro: {
        width: '100%',
        alignItems: 'center'
    },
    erro: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    logo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16
    }
});

export default LoginScreen;