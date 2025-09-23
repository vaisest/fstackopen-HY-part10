import { View, StyleSheet, Pressable, Text } from "react-native";
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
        <Pressable style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Pressable>
      }
    </View>
  );
};

export default AppBar;
