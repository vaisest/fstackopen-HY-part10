import { Formik } from "formik";
import { number, object, string } from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { styles } from "./SignIn";
import { Pressable, TextInput, View } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const validationSchema = object({
  ownerName: string().required("Username is required"),
  repositoryName: string().required("A repository name is required"),
  rating: number("The rating must be a number")
    .required("A rating is required")
    .min(0, "The rating must be in the range 0-100")
    .max(100, "The rating must be in the range 0-100")
    .integer("The rating must be an integer"),
  text: string(),
});

const ReviewCreationContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
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
              id="ownerName"
              name="ownerName"
              onChangeText={handleChange("ownerName")}
              onBlur={handleBlur("ownerName")}
              value={values.ownerName}
              placeholder="Owner name"
              style={[styles.input, errors.ownerName && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={styles.errorLabel}>{errors.ownerName}</Text>
            )}
          </View>
          <View>
            <TextInput
              id="repositoryName"
              name="repositoryName"
              onChangeText={handleChange("repositoryName")}
              onBlur={handleBlur("repositoryName")}
              value={values.repositoryName}
              placeholder="Repository name"
              style={[styles.input, errors.repositoryName && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.errorLabel}>{errors.repositoryName}</Text>
            )}
          </View>
          <View>
            <TextInput
              id="rating"
              name="rating"
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              value={values.rating}
              placeholder="Rating out of 100"
              style={[styles.input, errors.rating && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorLabel}>{errors.rating}</Text>
            )}
          </View>
          <View>
            <TextInput
              id="text"
              name="text"
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
              placeholder="Optional text review"
              style={[styles.input, errors.text && styles.inputError]}
              placeholderTextColor="rgb(175, 175, 175)"
            />
            {touched.text && errors.text && (
              <Text style={styles.errorLabel}>{errors.text}</Text>
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

const ReviewCreation = () => {
  const [createReview, data] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { data } = await createReview({
      ...values,
      rating: parseInt(values.rating, 10),
    });
    const repoId = data.createReview.repositoryId;
    navigate(`/repo/${repoId}`);
  };
  return <ReviewCreationContainer onSubmit={onSubmit} />;
};

export default ReviewCreation;
