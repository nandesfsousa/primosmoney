import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from '../components/Themed';
import { Background } from '../components/Background';
import { TextField } from '../components/TextField';
import { CustomButton } from '../components/CustomButton';

import AuthContext from '../contexts/authenticate'

import * as ImagePicker from 'expo-image-picker';

const RegisterScreen: React.FC = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [zap, setZap] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessZap, setBusinessZap] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [businessAddressLine1, setBusinessAddressLine1] = useState("");
    const [businessAddressLine2, setBusinessAddressLine2] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        const response = await register({
            cpf: cpf,
            password: password,
            name: name,
            city: city,
            zap: zap,
            phone: phone,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            cnpj: cnpj,
            business_name: businessName,
            business_zap: businessZap,
            business_phone: businessPhone,
            business_address_line1: businessAddressLine1,
            business_address_line2: businessAddressLine2
        });
        if (response.token) {

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
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Dados Pessoais</Text>
                <View style={styles.separator} />
                <TextField placeholder="Nome Completo" placeholderTextColor='#ffe002' keyboardType="ascii-capable" />
                <View style={styles.separator} />
                <TextField placeholder="Cidade" keyboardType="ascii-capable" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField placeholder="CPF" keyboardType="number-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField placeholder="Telefone" keyboardType="phone-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField placeholder="Whatsapp" keyboardType="phone-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <Text style={styles.title}>Dados Empresariais</Text>
                <View style={styles.separator} />
                <TextField placeholder="Nome da Empresa" placeholderTextColor='#ffe002' keyboardType="ascii-capable" />
                <View style={styles.separator} />
                <TextField placeholder="CNPJ" keyboardType="number-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField placeholder="Telefone da empresa" keyboardType="phone-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField placeholder="Whatsapp da empresa" keyboardType="phone-pad" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <Text style={styles.title}>Segurança</Text>
                <View style={styles.separator} />
                <TextField placeholder="Email" placeholderTextColor='#ffe002' keyboardType="email-address" />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Senha" keyboardType="ascii-capable" placeholderTextColor='#ffe002' />
                <View style={styles.separator} />
                <TextField secureTextEntry placeholder="Confimar Senha" keyboardType="ascii-capable" placeholderTextColor='#ffe002' />
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