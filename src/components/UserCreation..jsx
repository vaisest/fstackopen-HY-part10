import { Formik } from "formik";
import { object, string, ref } from "yup";
import useCreateUser from "../hooks/useCreateUser";
import { styles } from "./SignIn";
import { Pressable, TextInput, View } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const validationSchema = object({
  username: string()
    .required("Username is required")
    .test(
      "len",
      "Username must be 5-30 characters long",
      (val) => val.length >= 5 && val.length <= 30
    ),
  password: string()
    .required("Password is required")
    .test(
      "len",
      "Password must be 5-30 characters long",
      (val) => val.length >= 5 && val.length <= 30
    ),
  passwordConfirmation: string()
    .required("Password confirmation is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});

const UserCreationContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: "",
      }}
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
        <View style={styles.view} testID="signInContainerView">
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
          <View>
            <TextInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              value={values.passwordConfirmation}
              placeholder="Password confirmation"
              style={[
                styles.input,
                errors.passwordConfirmation && styles.inputError,
              ]}
              placeholderTextColor="rgb(175, 175, 175)"
              secureTextEntry
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorLabel}>
                {errors.passwordConfirmation}
              </Text>
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

const UserCreation = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await createUser(values);
    await signIn(values);
    navigate(`/`);
  };
  return <UserCreationContainer onSubmit={onSubmit} />;
};

export default UserCreation;
