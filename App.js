import Main from "./src/components/Main";
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
// adjusted to /react according to apollo getting started guide
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () =>
(<>
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  </NativeRouter>
  <StatusBar barStyle="light-content" />
</>)


export default App;