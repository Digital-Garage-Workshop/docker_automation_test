"use client";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { Formik, Field, Form, useFormik } from "formik";
import { UseApi } from "@/hooks/useApi";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { PostUserAddress } from "@/services/user/postUserAddress";
import { useCustomToast } from "@/hooks/useCustomToast";
import * as Yup from "yup";

type AddUserLocation = {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (value: any) => void;
};

export const defaultCenter = {
  lat: 47.918873,
  lng: 106.917517,
};

export const containerStyle = {
  width: "full",
  height: "442px",
  borderRadius: 8,
  border: "none",
  outline: "none",
};

export const AddUserLocation = (props: AddUserLocation) => {
  const { isOpen, onClose, onAddAddress } = props;
  const showToast = useCustomToast();
  const [
    {
      data: registerOrderdata,
      isLoading: registerIsLoading,
      error: registerError,
    },
    registerFetch,
  ] = UseApi({
    service: PostUserAddress,
    useAuth: true,
  });

  const [zipcode, setZipcode] = useState<any>("");
  const [markerPosition, setMarkerPosition] = useState<any>(defaultCenter);
  const [map, setMap] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [address, setAddress] = useState<any>("");

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phone: "",
      apartmentNumber: "",
      entranceAndDoorNumber: "",
      additionalInfo: "",
    },
    validationSchema: Yup.object({
      phone: Yup.number().required("Утасны дугаар шаардлагатай"),
      apartmentNumber: Yup.string().required(
        "Байрны дугаар | Гудамжны дугаар шаардлагатай"
      ),
      entranceAndDoorNumber: Yup.string().required(
        "Орц & Хаалга дугаар шаардлагатай"
      ),
      additionalInfo: Yup.string(),
    }),
    onSubmit: (values) => {
      registerFetch({
        zipcode: parseInt(zipcode),
        phone: parseInt(values.phone),
        lang: markerPosition.lat.toString(),
        long: markerPosition.lng.toString(),
        address: address,
        apartmentnumber: values.apartmentNumber,
        doornumber: values.entranceAndDoorNumber,
      });

      onClose();
    },
  });

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

          setMarkerPosition({ lat: userLat, lng: userLng });
          map?.panTo({ lat: userLat, lng: userLng });

          geocoder.geocode(
            { location: { lat: userLat, lng: userLng } },
            (results: any, status: any) => {
              if (status === "OK" && results && results.length > 0) {
                const formattedAddress = results[0].formatted_address;
                setAddress(formattedAddress);

                const zipcode = results[0].address_components.find(
                  (component: any) => component.types.includes("postal_code")
                )?.long_name;

                if (zipcode) {
                  setZipcode(zipcode);
                }
              } else {
                console.error("Geocoder failed due to: " + status);
              }
            }
          );
        },
        (error) => {
          console.error("Geolocation service failed: ", error);
          setMarkerPosition(defaultCenter);
          map?.panTo(defaultCenter);
        },
        geolocationOptions
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (geocoder) {
      getUserLocation();
    }
  }, [geocoder, map]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng && geocoder) {
      const lat = latLng.lat();
      const lng = latLng.lng();

      setMarkerPosition({ lat, lng });

      geocoder.geocode(
        { location: { lat, lng } },
        (results: any, status: any) => {
          if (status === "OK" && results) {
            const formattedAddress = results[0].formatted_address;
            setAddress(formattedAddress);

            const zipcode = results[0].address_components.find(
              (component: any) => component.types.includes("postal_code")
            )?.long_name;

            if (zipcode) {
              setZipcode(zipcode);
            }
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (registerOrderdata) {
      showToast({
        type: "success",
        title: "Амжилттай нэмэгдлээ",
        description: "Шинэ хаяг амжилттай нэмэгдлээ.",
      });
      onAddAddress({
        zipcode: parseInt(zipcode),
        phone: parseInt(values.phone),
        lang: markerPosition.lat.toString(),
        long: markerPosition.lng.toString(),
        address: address,
        apartmentnumber: values.apartmentNumber,
        doornumber: values.entranceAndDoorNumber,
      });
    }
  }, [registerOrderdata && typeof registerOrderdata === "object"]);

  useEffect(() => {
    if (registerError) {
      showToast({
        type: "error",
        title: "Амжилтгүй",
        description: "Та дахин оролдоно уу.",
      });
    }
  }, [registerError && typeof registerError === "object"]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={{
          base: "full",
          sm: "full",
          md: "full",
          lg: "1216px",
          xl: "1216px",
        }}
        mt={{ base: "40px", sm: "40px", md: "40px", lg: 40, xl: 40 }}
      >
        <Stack
          p="32px 24px"
          gap="24px"
          bg="white"
          borderRadius={8}
          w="full"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          }}
        >
          <Stack
            w={{ base: "full", sm: "full", md: "full", lg: "50%", xl: "50%" }}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "full",
                height: "442px",
                borderRadius: 8,
                border: "none",
                outline: "none",
              }}
              center={markerPosition || defaultCenter}
              zoom={18}
              onClick={handleMapClick} // Handle clicks to set marker
              onLoad={(mapInstance) => {
                setMap(mapInstance);
                setGeocoder(new google.maps.Geocoder()); // Initialize Geocoder when the map loads
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
          {/* 
          <Formik
            initialValues={{
              phone: "",
              apartmentNumber: "",
              entranceAndDoorNumber: "",
              additionalInfo: "",
            }}
            onSubmit={async (values) => {
              const data = await registerFetch({
                zipcode: parseInt(zipcode),
                phone: parseInt(values.phone),
                lang: markerPosition.lat.toString(),
                long: markerPosition.lng.toString(),
                address: address,
                apartmentnumber: values.apartmentNumber,
                doornumber: values.entranceAndDoorNumber,
              });

              onClose();
            }}
          >
            {({ handleSubmit, setFieldValue }) => ( */}
          {/* <Form onSubmit={handleSubmit} style={{ width: "50%", padding: 0 }}> */}
          <VStack gap={6} w="50%" p={0}>
            <Stack gap={"8px"} w="full">
              <Text fontWeight={700} fontSize={20} color="#1E1E1E">
                Таны байршил {zipcode}
              </Text>
              <Text fontSize={16} color="#1E1E1E">
                Нэмэлт мэдээлэлээ оруулснаар бид илүү хурдан ажиллах болно
              </Text>
            </Stack>

            <VStack gap={4} w="full">
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Утасны дугаар
                </FormLabel>
                <InputGroup>
                  {/* <Field name="phone">
                      {({ field }: any) => ( */}
                  <Input
                    // {...field}
                    name="phone"
                    value={values.phone}
                    placeholder="Утасны дугаар"
                    focusBorderColor="#F75B00"
                    onChange={handleChange}
                    maxLength={8}
                  />
                  {/* )}
                    </Field> */}
                </InputGroup>
              </FormControl>
              <Stack
                gap={6}
                w="full"
                flexDirection={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                }}
              >
                <FormControl w="full">
                  <FormLabel fontSize={14} fontWeight={600}>
                    Байрны дугаар | Гудамжны дугаар
                  </FormLabel>
                  <InputGroup>
                    {/* <Field name="apartmentNumber">
                        {({ field }: any) => ( */}
                    <Input
                      // {...field}
                      name="apartmentNumber"
                      value={values.apartmentNumber}
                      placeholder="Байрны дугаар"
                      focusBorderColor="#F75B00"
                      borderColor="#CFCFCF"
                      onChange={handleChange}
                    />
                    {/* )}
                      </Field> */}
                  </InputGroup>
                </FormControl>
                <FormControl w="full">
                  <FormLabel fontSize={14} fontWeight={600}>
                    Орц & Хаалга дугаар
                  </FormLabel>
                  <InputGroup>
                    {/* <Field name="entranceAndDoorNumber">
                        {({ field }: any) => ( */}
                    <Input
                      // {...field}
                      name="entranceAndDoorNumber"
                      value={values.entranceAndDoorNumber}
                      placeholder="Орц & Хаалга дугаар"
                      focusBorderColor="#F75B00"
                      borderColor="#CFCFCF"
                      onChange={handleChange}
                    />
                    {/* )}
                      </Field> */}
                  </InputGroup>
                </FormControl>
              </Stack>
              <FormControl w="full">
                <FormLabel fontSize={14} fontWeight={600}>
                  Нэмэлт мэдээлэл
                </FormLabel>
                <InputGroup>
                  {/* <Field name="additionalInfo">
                      {({ field }: any) => ( */}
                  <Textarea
                    // {...field}
                    name="additionalInfo"
                    value={values.additionalInfo}
                    placeholder="Нэмэлт мэдээлэл"
                    focusBorderColor="#F75B00"
                    borderColor="#CFCFCF"
                    h="88px"
                    onChange={handleChange}
                  />
                  {/* )}
                    </Field> */}
                </InputGroup>
              </FormControl>
            </VStack>
            <HStack w="full">
              <Button variant={"outline"} onClick={onClose}>
                Буцах
              </Button>
              <Button
                isLoading={registerIsLoading}
                type="submit"
                onClick={() => handleSubmit()}
              >
                Хаяг нэмэх
              </Button>
            </HStack>
          </VStack>
          {/* </Form> */}
          {/* )}
          </Formik> */}
        </Stack>
      </ModalContent>
    </Modal>
  );
};
