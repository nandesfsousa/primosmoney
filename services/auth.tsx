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