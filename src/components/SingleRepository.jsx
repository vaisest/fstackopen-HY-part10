import { useParams } from "react-router-native";
import { FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import { View } from "react-native";
import theme from "../theme";
import { parseISO, format } from "date-fns";

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} isSingleview />;
};

export const ReviewItem = ({ review, noUsername }) => {
  const date = parseISO(review.createdAt);
  const formattedDate = format(date, "d.M.y");
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.white,
        gap: 15,
        marginTop: 15,
        padding: 15,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderColor: theme.colors.primary,
          borderWidth: 2,
          borderStyle: "solid",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.primary,
            fontSize: theme.fontSizes.subheading,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {review.rating}
        </Text>
      </View>

      <View style={{ rowGap: 5, flexShrink: 1 }}>
        <Text
          style={{
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.subheading,
          }}
        >
          {noUsername ? review.repository.fullName : review.user.username}
        </Text>
        <Text
          style={{
            fontWeight: theme.fontWeights.normal,
            fontSize: theme.fontSizes.body,
          }}
        >
          {formattedDate}
        </Text>
        <Text
          style={{
            fontWeight: theme.fontWeights.normal,
            fontSize: theme.fontSizes.body,
          }}
        >
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, loading } = useRepository(id);
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
