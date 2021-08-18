import React, { Children } from "react";
import * as auth from '../services/auth';
import * as SecureStore from 'expo-secure-store';
import { UserAuthData, RegisterAuthData } from '../services/auth'

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(user: UserAuthData): Promise<void>;
    register(user: RegisterAuthData): Promise<void>;
};

type Store = { key: string, value: string };

const AuthContext = React.createContext(React.createContext<AuthContextData>({}));

/**
 * 
 * @param param0 
 * @returns 
 * 
export const AuthProvider: React.FC = ({ children }) => (
    <AuthContext.Provider value={{ signed: false }}>
        {children}
    </AuthContext.Provider>
);
 */

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState({});
    const [signed, setSigned] = React.useState(false)
    async function save(store: Store) {
        await SecureStore.setItemAsync(store.key, store.value);
    };
    async function getValueFor(key: string) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            //console.log("🔐 Here's your value 🔐 \n" + result);
            return result;
        } else {
            //console.log('No values stored under that key.');
            return ('No values stored under that key.')
        };
    };
    React.useEffect(() => {

        async function loadStorageData() {
            const storagedUser = await getValueFor('user_id');
            const storagedName = await getValueFor('user_name');
            const storagedToken = await getValueFor('user_token');

            if (storagedUser && storagedToken) {
                setUser({
                    token: storagedToken,
                    user: {
                        name: storagedName,
                        id: storagedUser
                    }
                });
            };

        };

        loadStorageData();
    });

    async function signIn(userAuthData: UserAuthData) {
        const response = await auth.signIn(userAuthData);
        if (response.token) {
            setUser(response.user);
            save({ key: 'user_id', value: response.user.id });
            save({ key: 'user_name', value: response.user.name });
            save({ key: 'user_token', value: response.token });
            setSigned(true);
        }
        return response;
    }

    async function register(registerAuthData: RegisterAuthData) {
        const response = await auth.Register(registerAuthData);
        if (response.token) {
            setUser(response.user);
            save({ key: 'user_id', value: response.user.id });
            save({ key: 'user_name', value: response.user.name });
            save({ key: 'user_token', value: response.token });
            setSigned(true);
        }
        return response;
    }
    return (
        <AuthContext.Provider value={{ signed, user, signIn, register }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;