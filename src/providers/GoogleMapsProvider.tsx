import {setGeocoder} from "@/redux/slices/googleMapsSlice";
import {Libraries, LoadScript} from "@react-google-maps/api";
import {ReactNode} from "react";
import {useDispatch} from "react-redux";

type Prop = {
  children: ReactNode;
};

const GoogleMapsProvider = ({children}: Prop) => {
  const libraries: Libraries = ["places"];
  const dispatch = useDispatch();

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      libraries={libraries}
      onLoad={() => {
        const geocoder = new google.maps.Geocoder();
        dispatch(setGeocoder(geocoder));
      }}
      loadingElement={<div style={{height: "100%"}} />}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
