import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { Link, redirect } from "react-router-native";
import Constants from "expo-constants";
import useAuthStorage from "../hooks/useAuthStorage";
import useMe from "../hooks/useMe";
import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  text: { color: "#FFFFFF", fontSize: 24 },
  tab: { margin: 20 },
});

const AppBar = (props) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const { username } = useMe();

  const logOut = async () => {
    console.log("trying to log out");
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      {
        <ScrollView horizontal>
          <Pressable style={styles.tab}>
            <Link to="/">
              <Text style={styles.text}>Repositories</Text>
            </Link>
          </Pressable>
          {username ? (
            <>
              <Pressable style={styles.tab}>
                <Link to="/review">
                  <Text style={styles.text}>Create a review</Text>
                </Link>
              </Pressable>
              <Pressable style={styles.tab}>
                <Link to="/myreviews">
                  <Text style={styles.text}>My reviews</Text>
                </Link>
              </Pressable>
              <Pressable style={styles.tab} onPress={logOut}>
                <Text style={styles.text}>Log out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.tab}>
                <Link to="/login">
                  <Text style={styles.text}>Sign in</Text>
                </Link>
              </Pressable>
              <Pressable style={styles.tab}>
                <Link to="/register">
                  <Text style={styles.text}>Sign up</Text>
                </Link>
              </Pressable>
            </>
          )}
        </ScrollView>
      }
    </View>
  );
};

export default AppBar;
