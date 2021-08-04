import React, { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

import * as auth from '../services/auth';
import { UserAuthData } from '../services/auth'

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(user: UserAuthData): Promise<void>;
};

type Store = {
    key: string;
    value: string;
};

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<object | null>(null);

    async function save(store: Store) {
        await SecureStore.setItemAsync(store.key, store.value);
    };

    async function getValueFor(key:string){
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            //console.log("🔐 Here's your value 🔐 \n" + result);
            return result;
        } else {
            //console.log('No values stored under that key.');
            return('No values stored under that key.')
        };
    };

    useEffect(() => {

        async function loadStorageData() {
            const storagedUser = await getValueFor('user_id');
            const storagedName = await getValueFor('user_name');
            const storagedToken = await getValueFor('user_token');
            
            if (storagedUser && storagedToken) {
                setUser( {
                    token: storagedToken,
                    user:{
                        name: storagedName,
                        id: storagedUser
                    }
                } );
            };

        };

        loadStorageData();
    });

    

    async function signIn(userAuthData: UserAuthData) {
        const response = await auth.signIn(userAuthData);
        setUser(response.user);
        save( { key:'user_id', value: response.user.id } );
        save( { key:'user_name', value: response.user.name } );
        save( { key:'user_token', value: response.token } );
    }

    return (
        <AuthContext.Provider value={ { signed: !!user, user, signIn } }>
            { children }
        </AuthContext.Provider>
    )
}
export default AuthContext;