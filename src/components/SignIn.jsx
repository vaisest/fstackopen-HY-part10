import { Formik } from "formik";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { object, string } from "yup";
import useSignIn from "../hooks/useSignIn";
import { redirect } from "react-router-native";
import { useNavigate } from "react-router-native";

const validationSchema = object({
  username: string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const styles = StyleSheet.create({
  view: {
    padding: 18,
    rowGap: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorLabel: {
    color: theme.colors.error,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 5,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  submitText: {
    textAlign: "center",
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.white,
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log("login errors:", e);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.view}>
          <View>
            <TextInput
              id="username"
              name="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholder="Username"
              style={[styles.input, errors.username && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
            />
            {touched.username && errors.username && (
              <Text style={styles.errorLabel}>{errors.username}</Text>
            )}
          </View>
          <View>
            <TextInput
              id="password"
              name="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              style={[styles.input, errors.password && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorLabel}>{errors.password}</Text>
            )}
          </View>

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
