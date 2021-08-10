//import axios from 'axios';

interface Response{
    token: string;
    user: {
        name: string;
        id: string;
    };
};

export type UserAuthData = {
    cpf: number;
    password: string;
};

export type RegisterAuthData = {
    cpf: number;
    name: string;
    city: string;
    zap: number;
    phone: number;
    password: string;
    address_line1: string;
    address_line2: string;
    cnpj: number;
    business_name: string;
    business_zap: number;
    business_phone: number;
    business_address_line1: string;
    business_address_line2: string;
};

export function signIn(user:UserAuthData): Promise<Response>{
    return new Promise((resolve)=>{
        resolve({
            token:'154KLGK852458ASD87A8S7D8A7SD8',
            user: {
                name: 'Nandes Sousa',
                id: 'nandes1245'
            }
        });
    });
};

export function Register(user:RegisterAuthData): Promise<Response>{
    return new Promise((resolve)=>{
        resolve({
            token:'154KLGK852458ASD87A8S7D8A7SD8',
            user: {
                name: 'Nandes Sousa',
                id: 'nandes1245'
            }
        });
    });
};