import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const DescriptionView = ({ item }) => (
  <View style={{ flexDirection: "row" }}>
    <Image
      source={item.ownerAvatarUrl}
      style={{ width: 50, height: 50, borderRadius: 5 }}
    ></Image>
    <View
      style={{
        marginLeft: 15,
        marginRight: 15,
        rowGap: 8,
        alignItems: "baseline",
        flexShrink: 1,
      }}
    >
      <Text fontWeight="bold" fontSize={"subheading"}>
        {item.fullName}
      </Text>
      <Text color="textSecondary" style={{ flexShrink: 1 }}>
        {item.description}
      </Text>
      <Text
        color="white"
        style={{
          backgroundColor: theme.colors.primary,
          alignSelf: "start",
          borderRadius: 5,
          padding: 5,
        }}
      >
        {item.language}
      </Text>
    </View>
  </View>
);
const Statistic = ({ number, desc }) => {
  return (
    <View style={{ rowGap: 5 }}>
      <Text fontWeight="bold">{number}</Text>
      <Text key={desc} color="textSecondary" fontSize="subheading">
        {desc}
      </Text>
    </View>
  );
};
const StatsView = ({ item }) => {
  let formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const stats = [
    [item.stargazersCount, "Stars"],
    [item.forksCount, "Forks"],
    [item.reviewCount, "Reviews"],
    [item.ratingAverage, "Rating"],
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
      }}
    >
      {stats.map(([number, statDescription]) => (
        <Statistic
          key={statDescription}
          number={formatter.format(number)}
          desc={statDescription}
        />
      ))}
    </View>
  );
};

const RepositoryItem = ({ item }) => (
  <View style={{ backgroundColor: "white", padding: 20, rowGap: 20 }}>
    <DescriptionView item={item} />
    <StatsView item={item} />
  </View>
);
export default RepositoryItem;
