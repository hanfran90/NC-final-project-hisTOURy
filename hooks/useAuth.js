import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const fnWrapper = (callback = async () => null) => {
    setIsPending(true);
    setError(null);

    callback()
      .then(() => supabase.auth.getUser())
      .then((res) => setUser(res.data.user))
      .catch((e) => setError(e))
      .finally(() => setIsPending(false));
  };

  useEffect(() => {
    fnWrapper();
  }, []);

  const signUp = ({ email, password }) =>
    fnWrapper(() =>
      supabase.auth.signUp({
        email,
        password,
      })
    );

  const signIn = ({ email, password }) =>
    fnWrapper(() =>
      supabase.auth.signInWithPassword({
        email,
        password,
      })
    );

  const signOut = () =>
    fnWrapper(() => supabase.auth.signOut().then(() => setUser(null)));

  return {
    user,
    signUp,
    signIn,
    signOut,
    error,
    isPending,
  };
}
