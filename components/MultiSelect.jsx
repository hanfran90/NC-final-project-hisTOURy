import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import useCategories from "../hooks/useCategories";

export default function MultiDropDown({ onSelectItems }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data, isPending, error } = useCategories();

  useEffect(() => {
    onSelectItems(selectedItems);
  }, [selectedItems]);

  if (isPending) return null;

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        modalWithSafeAreaView={true}
        items={data}
        IconRenderer={MaterialIcons}
        uniqueKey="category_id"
        subKey="items"
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
        selectText="Search by Type and Era"
        searchPlaceholderText="Type or Era"
        modalAnimationType="slide"
        colors={{ primary: "seagreen", cancel: "black" }}
        readOnlyHeadings={true}
        showCancelButton={true}
        styles={{
          searchBar: {
            fontWeight: "bold",
          },
          chipsWrapper: {
            paddingBottom: 10,
          },
          chipText: {
            color: "black",
          },
          chipContainer: {
            borderColor: "seagreen",
          },
          chipIcon: {
            color: "seagreen",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // justifyContent: "center",
  },
});
