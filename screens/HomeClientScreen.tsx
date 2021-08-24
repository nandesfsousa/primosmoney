import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Erro, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from '../components/Themed';
import { Background } from '../components/Background';

import { MaskService } from 'react-native-masked-text'

type InputValue = {
    value: string
}
const HomeClientScreen: React.FC = ({ navigation }) => {

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
    
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../assets/images/adaptive-icon.png')} />
            </View>
            <View style={styles.container_erro}>
                <Erro style={styles.erro}>{erro}</Erro>
            </View>
            <ScrollView style={styles.container}>
                
            </ScrollView>
            <View style={styles.separator} />
            <View style={styles.create}>
                <TouchableOpacity>
                    <Text>
                        Teste
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

export default HomeClientScreen;