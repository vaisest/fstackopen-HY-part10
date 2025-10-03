import Main from "./src/components/Main";
import { NativeRouter } from 'react-router-native';
// adjusted to /react according to apollo getting started guide
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';

import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (<>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  </>);
}


export default App;