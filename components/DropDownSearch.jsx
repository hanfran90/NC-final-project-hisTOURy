import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const DropdownSearch = ({ options, onOptionSelected }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const filterOptions = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setFilteredOptions(options);
      setShowOptions(false);
    }
  };

  const onOptionPress = (option) => {
    setSearchText(option);
    onOptionSelected(option);
    setShowOptions(false);
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredOptions(options);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 8 }}
        />
        <TextInput
          style={styles.input}
          value={searchText}
          onFocus={() => setShowOptions(false)}
          onChangeText={filterOptions}
          placeholder="Option Search"
        />
        {searchText ? (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ marginRight: 8 }}
            onPress={clearSearch}
          />
        ) : null}
      </View>
      {showOptions && (
        <FlatList
          nestedScrollEnabled={true}
          data={filteredOptions}
          style={styles.optionsContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onOptionPress(item)}
              style={styles.option}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: "90%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    padding: 10,
  },
  input: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
    overflow: "hidden",
    maxHeight: 100,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default DropdownSearch;
