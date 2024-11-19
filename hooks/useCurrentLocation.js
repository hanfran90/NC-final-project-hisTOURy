import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    Location.requestForegroundPermissionsAsync()
      .then((res) => {
        console.log(res);
        if (res.status !== "granted") return Promise.reject("NO_PERMISSION");

        return Location.watchPositionAsync(
          { accuracy: 6, timeInterval: 5000 },
          ({ coords }) => {
            setLocation(coords);
          }
        );
      })
      .catch((e) => setError(e))
      .finally(() => setIsPending(false));
  }, []);
  return { location, isPending, error };
}
