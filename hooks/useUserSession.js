import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export default function useUserSession() {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const hookWrapper = (callback) => {
    setIsPending(true);

    callback();
  };

  const signUpUser = ({ email, password }) =>
    supabase.auth.signUp({
      email,
      password,
    });

  const retrieveUser = () =>
    supabase.auth.getUser().then((res) => setUserData(res));

  return {
    signUpUser,
    error,
    isPending,
  };
}
