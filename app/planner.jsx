import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import useDeleteAllPlanner from "../hooks/useDeleteAllPlanner";
import useDeleteMarkerPlanner from "../hooks/useDeleteMarkerPlanner";
import useUserPlanner from "../hooks/useUserPlanner";
import useUserPlannerUpdate from "../hooks/useUserPlannerUpdate";

export default function planner() {
  const { data, isPending, error } = useUserPlanner();
  const [plannerData, setPlannerData] = useState([]);
  const { mutate } = useDeleteMarkerPlanner();
  const { mutate: deleteAll } = useDeleteAllPlanner();
  const { mutate: plannerUpdate, error: plannerUpdateError } =
    useUserPlannerUpdate();
  const [routeModified, setRouteModified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data && data[0]?.items) {
      setPlannerData(data[0].items);
      setRouteModified(false);
    }
  }, [data]);

  if (isPending || error || !data) return null;

  const swapItems = (index1, index2) => {
    if (
      index1 < 0 ||
      index2 < 0 ||
      index1 >= plannerData.length ||
      index2 >= plannerData.length
    )
      return;

    setPlannerData((prevList) => {
      const newList = [...prevList];
      [newList[index1], newList[index2]] = [newList[index2], newList[index1]];
      return newList;
    });

    setRouteModified(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={plannerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            className="flex flex-row justify-center place-content-between items-center"
            style={styles.item}
          >
            <Button onPress={() => mutate(item.marker.marker_id)} title="X" />
            <Text>{item.marker.title}</Text>
            <View
              className="flex flex-col"
              style={{
                marginLeft: "auto",
              }}
            >
              <Button
                onPress={() => {
                  swapItems(index, index - 1);
                }}
                title="↑"
              />
              <Button
                onPress={() => {
                  swapItems(index, index + 1);
                }}
                title="↓"
              />
            </View>
          </View>
        )}
      />
      <CustomButton
        color="tertiary"
        onPress={deleteAll}
        title="Empty my planner"
      />
      <CustomButton
        color="primary"
        onPress={() => {
          plannerUpdate(plannerData);
        }}
        title="Save my route"
      />
      <CustomButton
        disabled={routeModified}
        color="secondary"
        onPress={() => router.push("/explore?route=show")}
        title="View my route"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  item: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});
