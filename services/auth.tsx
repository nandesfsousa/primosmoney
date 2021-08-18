import axios, { AxiosResponse } from 'axios';

interface Response {
    token: string;
    user: {
        name: string;
        id: string;
    };
};

interface ErrorResponse {
    message: string;
};

export type UserAuthData = {
    cpf: string;
    password: string;
};

export type RegisterAuthData = {
    cpf: string;
    name: string;
    city: string;
    zap: string;
    phone: string;
    password: string;
    address_line1: string;
    address_line2: string;
    cnpj: string;
    business_name: string;
    business_zap: string;
    business_phone: string;
    business_address_line1: string;
    business_address_line2: string;
};

const client = axios.create({
    baseURL: 'https://primosmoney.online:8080',
    headers: {
        "content-type": "application/json",
        "Accept": "application/json"
    },
});

export function signIn(user: UserAuthData): Promise<Response> {
    return new Promise((resolve, reject) => {
        client.post('/api/auth/signin', user)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .then((data: Response) => {
                resolve(data);
            })
            .catch((err: any) => {
                resolve(err);
            });
    });
};

export function Register(user: RegisterAuthData): Promise<Response> {
    return new Promise((resolve, reject) => {
        client.post('/api/auth/signup', user)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .then((data: Response) => {
                resolve(data);
            })
            .catch((err: any) => {
                resolve(err);
            });
    });
};