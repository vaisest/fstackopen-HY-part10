import useMe from "../hooks/useMe";
import { ReviewItem } from "./SingleRepository";
import {
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 5,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  buttonDanger: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    textAlign: "center",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: theme.colors.white,
    paddingBottom: 15,
  },
});

const ReviewView = ({ item, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleViewRepository = () => {
    navigate(`/repo/${item.repository.id}`);
  };
  const handleDeleteReview = async () => {
    if (Platform.OS === "web") {
      const result = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (result) {
        await deleteReview(item.id);
        refetch();
      }
    } else {
      Alert.alert(
        "Review deletion",
        "Are you sure you want to delete this review?",
        [
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deleteReview(item.id);
              refetch();
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };
  return (
    <View>
      <ReviewItem review={item} noUsername />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleViewRepository} style={styles.buttonBase}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          onPress={handleDeleteReview}
          style={[styles.buttonBase, styles.buttonDanger]}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { reviews, refetch } = useMe(true);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewView item={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
