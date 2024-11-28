import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";
import useCategories from "../hooks/useCategories";
import { useState } from "react";

export default function MultiDropDown({ onSelectItems }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data, isPending, error } = useCategories();
  if (isPending) return null;

  useEffect(() => {
    onSelectItems(selectedItems);
  }, [selectedItems]);

  return (
    <View style={styles.container}>
      <View>
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
          colors={{ primary: "#c98422" }}
          readOnlyHeadings={true}
          showCancelButton={true}
          // onConfirm={() => {
          //   onSelectItems(selectedItems);
          // }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
