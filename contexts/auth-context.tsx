import * as React from "react";

type Action = { type: 'logout' } | { type: 'login' };
type Dispatch = (action: Action) => void;
type State = { signed: boolean };
type AuthProviderProps = { children: React.ReactNode };

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

function AuthProvider(children: AuthProviderProps) {
    const [state, dispatch] = React.useReducer(authReducer, { signed: false });
    const value = { state, dispatch };
    return (
        <AuthStateContext.Provider value={value}>
            {children}
        </AuthStateContext.Provider>
    );
};

function useSigned() {
    const context = React.createContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useSigned must be used within a AuthProvider')
    }
    return context
};

export {AuthProvider, useSigned};