import React, { useEffect } from "react";
import { Text } from "react-native";
import { supabase } from "../utils/supabaseClient";

function index() {
  useEffect(() => {
    supabase
      .from("todos")
      .select()
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <Text>Hello World</Text>;
}

export default index;
