import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  text: { color: "#FFFFFF", fontSize: 24 },
  tab: { margin: 20 },
});

const AppBar = (props) => {
  return (
    <View style={styles.container}>
      {
        <ScrollView horizontal>
          <Pressable style={styles.tab}>
            <Link to="/">
              <Text style={styles.text}>Repositories</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.tab}>
            <Link to="/login">
              <Text style={styles.text}>Sign in</Text>
            </Link>
          </Pressable>
        </ScrollView>
      }
    </View>
  );
};

export default AppBar;
