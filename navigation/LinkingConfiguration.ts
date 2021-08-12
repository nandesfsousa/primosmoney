/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens:{
          LoginScreen: 'login',
          RegisterScreen: 'register',
          ForgoutPasswordScreen: 'forgoutpassword' 
        }
      },
      Root: {
        screens: {
          Home: {
            screens: {
              
            },
          },
          Clients: {
            screens: {

            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
