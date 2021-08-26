import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Erro, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';

import AuthContext from '../contexts/authenticate'

import { MaskService } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker';

type InputValue = {
    value: string
}
const RegisterScreen: React.FC = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [zap, setZap] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessZap, setBusinessZap] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessAddressLine1, setBusinessAddressLine1] = useState('');
    const [businessAddressLine2, setBusinessAddressLine2] = useState('');

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    function cnpjMask(value: InputValue) {
        return (MaskService.toMask('cnpj', value.value));
    };
    function cpfMask(value: InputValue) {
        return (MaskService.toMask('cpf', value.value));
    };
    function phoneMask(value: InputValue) {
        return (MaskService.toMask('cel-phone', value.value, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
        }));
    };
    function getUnMaskedText(value: InputValue) {
        return value.value.replace(/[^\d]+/g, '');
    };
    async function handleRegister() {
        setErro('');
        if (
            password === confirmPassword &&
            password.length > 5 &&
            name.length > 5 &&
            cpf.length > 11 &&
            email.length > 3
        ) {
            const response = await register({
                cpf: cpf,
                email: email,
                password: password,
                name: name,
                zap: zap,
                phone: phone,
                addressLine1: city,
                addressLine2: addressLine2,
                cnpj: cnpj,
                business_name: businessName,
                business_zap: businessZap,
                business_phone: businessPhone,
                business_address_line1: businessAddressLine1,
                business_address_line2: businessAddressLine2
            });
            if(response.response.status === 400){
                setErro('Usuário já cadastrado');
            };
            if(response.response.status === 200){
                //upload da imagem aqui
                navigation.goBack("Login");
            };
        };
        if (password != confirmPassword) {
            setErro('*As senhas não correspodem');
        }
        if (password.length < 8) {
            setErro('*A senha precisa ter 8 ou mais caracteres');
        };
        if (email.length < 3) {
            setErro('*Email inválido');
        };
        if (cpf.length < 11) {
            setErro('*CPF inválido');
        };
    };
    async function pickImage() {
        setLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
        };

        setLoading(false);
    };
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/logo.png')} />
            </View>
            <View style={styles.container_erro}>
                <Erro style={styles.erro}>{erro}</Erro>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Dados Pessoais</Text>
                <View style={styles.separator} />
                <TextField placeholder="Nome Completo" placeholderTextColor='#ffe002' keyboardType="ascii-capable" onChangeText={(value) => setName(value)} value={name} />
                <View style={styles.separator} />
                <TextField placeholder="Cidade" keyboardType="ascii-capable" placeholderTextColor='#ffe002' onChangeText={(value) => setCity(value)} value={city} />
                <View style={styles.separator} />
                <TextField placeholder="CPF" keyboardType="number-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setCpf(cpfMask({ value: value }))} value={cpf} />
                <View style={styles.separator} />
                <TextField placeholder="Telefone" keyboardType="phone-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setPhone(phoneMask({ value: value }))} value={phone} />
                <View style={styles.separator} />
                <TextField placeholder="Whatsapp" keyboardType="phone-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setZap(phoneMask({ value: value }))} value={zap} />
                <View style={styles.separator} />
                <Text style={styles.title}>Dados Empresariais</Text>
                <View style={styles.separator} />
                <TextField placeholder="Nome da Empresa" placeholderTextColor='#ffe002' keyboardType="ascii-capable" onChangeText={(value) => setBusinessName(value)} value={businessName} />
                <View style={styles.separator} />
                <TextField placeholder="CNPJ" keyboardType="number-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setCnpj(cnpjMask({ value: value }))} value={cnpj} />
                <View style={styles.separator} />
                <TextField placeholder="Telefone da empresa" keyboardType="phone-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setBusinessPhone(phoneMask({ value: value }))} value={businessPhone} />
                <View style={styles.separator} />
                <TextField placeholder="Whatsapp da empresa" keyboardType="phone-pad" placeholderTextColor='#ffe002' onChangeText={(value) => setBusinessZap(phoneMask({ value: value }))} value={businessZap} />
                <View style={styles.separator} />
                <Text style={styles.title}>Segurança</Text>
                <View style={styles.separator} />
                <TextField placeholder="Email" placeholderTextColor='#ffe002' keyboardType="email-address" onChangeText={(value) => setEmail(value)} value={email} />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Senha" keyboardType="ascii-capable" placeholderTextColor='#ffe002' onChangeText={(value) => setPassword(value)} value={password} />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Confimar Senha" keyboardType="ascii-capable" placeholderTextColor='#ffe002' onChangeText={(value) => setConfirmPassword(value)} value={confirmPassword} />
                <View style={styles.separator} />
                <Text style={styles.title}>Perfil</Text>
                {loading ? <ActivityIndicator size="small" color='#ffe002' /> :
                    <>
                        {image ? <CustomButton title="Alterar Foto" onPress={pickImage} color='#ffe002' /> : <CustomButton title="Enviar Foto" onPress={pickImage} color='#ffe002' />}
                    </>
                }
                <View style={styles.separator} />
                <CustomButton title="Cadastrar" onPress={handleRegister} color='#ffe002' />
                <View style={styles.separator} />
            </ScrollView>
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
    erro: {
        fontSize: 12,
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
    logo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 16
    }
});

export default RegisterScreen;