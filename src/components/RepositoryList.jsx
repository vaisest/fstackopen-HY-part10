import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import theme from "../theme";
import { styles as textStyles } from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingPicker = ({ currentSorting, setSorting }) => (
  <Picker
    selectedValue={currentSorting}
    onValueChange={setSorting}
    style={[textStyles.text, textStyles.fontSizeSubheading]}
  >
    <Picker.Item label="Latest" value="latest" />
    <Picker.Item label="Highest rated repositories" value="highestRatedFirst" />
    <Picker.Item label="Lowest rated repositories" value="lowestRatedFirst" />
  </Picker>
);

export const RepositoryListContainer = ({
  repositories,
  noRouter,
  sorting,
  setSorting,
  search,
  setSearch,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <View style={{ margin: 15 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            style={{ borderRadius: 5, backgroundColor: theme.colors.white }}
            inputStyle={[textStyles.text, textStyles.fontSizeSubheading]}
          />
          <SortingPicker currentSorting={sorting} setSorting={setSorting} />
        </View>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item} noRouter={noRouter}></RepositoryItem>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const { repositories } = useRepositories(sorting, debouncedSearch);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sorting={sorting}
      setSorting={setSorting}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
