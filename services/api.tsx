import axios, { AxiosResponse } from 'axios';

export type UserAuthData = {
    token: string;
    refreshToken: string;
    id: string;
};


const client = axios.create({
    baseURL: 'https://primosmoney.online:8080',
    headers: {
        "content-type": "application/json",
        "Accept": "application/json",
    },
});

const setAuthorization = (token:string) => {
    client.defaults.headers['x-access-token'] = token;
};


export function getUser(user: UserAuthData, uuid:string): Promise<Response> {
    return new Promise((resolve, reject) => {
        setAuthorization(user.token);
        client.get('/api/user/', {
            params: {
                uuid:uuid
            }
        })
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
