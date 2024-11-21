import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "expo-router";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  const fnWrapper = (callback = async () => null) => {
    setIsPending(true);
    setError(null);

    return callback()
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
      supabase.auth
        .signUp({
          email,
          password,
        })
        .then(() => router.replace("/user-profile"))
    );

  const signIn = ({ email, password }) =>
    fnWrapper(() =>
      supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(() => router.replace("/user-profile"))
    );

  const signOut = () =>
    fnWrapper(() => supabase.auth.signOut().then(() => router.replace("/")));

  return {
    user,
    signUp,
    signIn,
    signOut,
    error,
    isPending,
  };
}
