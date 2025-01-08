import {
  GoogleMap,
  LoadScript,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import { Stack, useToast } from "@chakra-ui/react"; // Added Toast for notifications
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setMarkerPosition,
  setAddress,
  setZipcode,
  setMap,
} from "../../../redux/slices/googleMapsSlice";

const libraries: Libraries = ["places"];

export const containerStyle = {
  width: "100%",
  height: "670px",
  borderRadius: 8,
  border: "1px solid #D0D5DD",
  outline: "none",
};

export const defaultCenter = {
  lat: 47.918873,
  lng: 106.917517,
};

type GoogleMapType = {};

export const GoogleMapWithSearch = (props: GoogleMapType) => {
  const dispatch = useDispatch();
  const mapRef = useRef<google.maps.Map | null>(null); // Use ref to store map instance
  const toast = useToast(); // Initialize toast for notifications

  const { markerPosition, address, geocoder } = useSelector(
    (state: RootState) => state.map
  );

  const getUserLocation = () => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    if (navigator.geolocation && geocoder) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          dispatch(setMarkerPosition({ lat: userLat, lng: userLng }));
          mapRef.current?.panTo({ lat: userLat, lng: userLng });

          geocoder.geocode(
            { location: { lat: userLat, lng: userLng } },
            (results, status) => {
              if (status === "OK" && results && results.length > 0) {
                const formattedAddress = results[0].formatted_address;
                dispatch(setAddress(formattedAddress));

                const zipcode = results[0].address_components.find(
                  (component) => component.types.includes("postal_code")
                )?.long_name;

                if (zipcode) {
                  dispatch(setZipcode(zipcode));
                }
              } else {
                console.error("Geocoder failed due to: " + status);
                toast({
                  title: "Geocoder Error",
                  description: "Unable to retrieve address.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
            }
          );
        },
        (error) => {
          console.error("Geolocation service failed: ", error);
          dispatch(setMarkerPosition(defaultCenter));
          mapRef.current?.panTo(defaultCenter);
          toast({
            title: "Location Error",
            description: "Unable to retrieve your location.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        geolocationOptions
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast({
        title: "Geolocation Error",
        description: "Geolocation is not supported by your browser.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (geocoder) {
      getUserLocation();
    }
  }, [geocoder]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng && geocoder) {
      const lat = latLng.lat();
      const lng = latLng.lng();

      dispatch(setMarkerPosition({ lat, lng }));

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results) {
          const formattedAddress = results[0].formatted_address;
          dispatch(setAddress(formattedAddress));

          const zipcode = results[0].address_components.find((component) =>
            component.types.includes("postal_code")
          )?.long_name;

          if (zipcode) {
            dispatch(setZipcode(zipcode));
          }
        } else {
          console.error("Geocoder failed due to: " + status);
          toast({
            title: "Geocoder Error",
            description: "Unable to retrieve address.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    }
  };

  return (
    <Stack w="full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition || defaultCenter}
        zoom={18}
        onClick={handleMapClick}
        onLoad={(mapInstance) => {
          dispatch(setMap(mapInstance));
          return undefined;
        }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
        }}
      >
        <Marker position={markerPosition || defaultCenter} />
      </GoogleMap>
    </Stack>
  );
};
