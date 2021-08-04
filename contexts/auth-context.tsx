import * as React from "react";
import * as auth from '../services/auth';
import * as SecureStore from 'expo-secure-store';
import { UserAuthData } from '../services/auth'

type Action = { type: 'logout' } | { type: 'login' };
type Dispatch = (action: Action) => void;
type State = { signed: boolean, user: object | null, signIn(user: UserAuthData): Promise<void> };
type AuthProviderProps = { children: React.ReactNode };
type Store = { key: string, value: string };

const AuthStateContext = React.createContext<{ state: State, dispatch: Dispatch } | undefined>(undefined);

function authReducer(state: State, action: Action) {
    switch (action.type) {
        case 'logout':
            return { signed: false };
        case 'login':
            return { signed: true };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        };
    };
};

const initialState = {
    state:{
        signed: false,
        user:{},
        signIn: ()=>{}
    }
};
function AuthProvider(children: AuthProviderProps) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    const value = { state, dispatch };
    const [user, setUser] = React.useState({});
    async function save(store: Store) {
        await SecureStore.setItemAsync(store.key, store.value);
    };
    async function getValueFor(key: string) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            console.log("🔐 Here's your value 🔐 \n" + result);
            return result;
        } else {
            console.log('No values stored under that key.');
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
        setUser(response.user);
        save( { key:'user_id', value: response.user.id } );
        save( { key:'user_name', value: response.user.name } );
        save( { key:'user_token', value: response.token } );
    }

    return (
        <AuthStateContext.Provider value={value}>
            {children}
        </AuthStateContext.Provider>
    );
};

function useAuth() {
    const context = React.createContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useSigned must be used within a AuthProvider')
    }
    return context
};

export { AuthProvider, useAuth };