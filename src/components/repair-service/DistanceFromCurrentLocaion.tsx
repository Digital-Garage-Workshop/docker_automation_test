import { Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type DistanceFromLocationProps = {
  placeLat: number;
  placeLng: number;
  textSize: number;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

const DistanceFromLocation: React.FC<DistanceFromLocationProps> = ({
  placeLat,
  placeLng,
  textSize,
}) => {
  const [distance, setDistance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error: GeolocationPositionError) => reject(error)
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    getCurrentLocation()
      .then((currentLocation: Coordinates) => {
        const dist = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          placeLat,
          placeLng
        );
        setDistance(dist.toFixed(2));
      })
      .catch(() => {
        setError("Unable to retrieve location.");
      });
  }, [placeLat, placeLng]);

  return (
    <Stack>
      {error ? (
        <p>{error}</p>
      ) : (
        <Text fontSize={textSize}>
          {" "}
          {distance ? `${distance} км` : "Calculating..."}
        </Text>
      )}
    </Stack>
  );
};

export default DistanceFromLocation;
