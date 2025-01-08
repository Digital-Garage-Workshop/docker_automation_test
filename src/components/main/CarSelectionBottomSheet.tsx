import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  HStack,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { UseApi } from "@/hooks/useApi";
import { CarBrands as _CarBrands, CarModels, Engine } from "@/services";

import { useDispatch } from "react-redux";
import { setCarDetails } from "@/redux/slices/carSlice";
import { useRouter } from "next/navigation";
import {
  CarBrand,
  CarModel,
  CarChildrenModel,
  CarEngine,
} from "../../../types";

type VehicleSelectionProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedVehiclePath: string;
};

export const VehicleSelectionSheet = ({
  isOpen,
  onClose,
  selectedVehiclePath,
}: VehicleSelectionProps) => {
  const router = useRouter();
  const [
    { data: brand, isLoading: brandIsLoading, error: brandError },
    brandFetch,
  ] = UseApi({
    service: _CarBrands,
  });
  const [
    { data: model, isLoading: modelIsLoading, error: modelError },
    modelFetch,
  ] = UseApi({
    service: CarModels,
  });
  const [{ data: engine, isLoading, error }, fetch] = UseApi({
    service: Engine,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [manu, setManu] = useState<CarBrand>();
  const dispatch = useDispatch();
  const [myModel, setMyModel] = useState<CarModel>();
  const [selectedModel, setSelectedModel] = useState<CarChildrenModel>();
  const [myEngine, setMyEngine] = useState<CarEngine>();

  useEffect(() => {
    brandFetch();
  }, []);

  useEffect(() => {
    if (manu) {
      modelFetch({ id: manu.manuid! });
    }
  }, [manu]);

  useEffect(() => {
    if (manu && selectedModel) {
      fetch({ manuid: manu.manuid, modelid: selectedModel?.modelid });
    }
  }, [manu, selectedModel]);

  // Back button handler
  const handleBack = () => {
    if (myEngine) {
      setMyEngine(undefined);
      setSelectedModel(undefined);
    } else if (selectedModel) {
      setSelectedModel(undefined);
    } else if (myModel) {
      setMyModel(undefined);
    } else if (manu) {
      setManu(undefined);
    } else {
      onClose();
    }
    setSearchTerm(""); // Clear search term on each back navigation
  };

  // Filtered data based on search input
  const filteredBrands = brand?.filter((make: CarBrand) =>
    make.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredModels = model?.filter((mod: CarModel) =>
    mod.groupname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredVariants = myModel?.childrens.filter((variant) =>
    variant.modelname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEngines = engine?.filter((eng: CarEngine) =>
    eng.carname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent mt={20}>
        {/* Header */}
        <DrawerHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={4}
        >
          <IconButton
            bg="#E4E7EC"
            w={"10%"}
            borderRadius={"10px"}
            aria-label="Close"
            icon={<ChevronLeftIcon w="24px" h="24px" color="black" />}
            padding={1}
            onClick={handleBack}
            variant="ghost"
            size={"md"}
            isDisabled={!manu && !myModel && !selectedModel && !myEngine}
          />

          <Text fontSize="lg" fontWeight="bold">
            Модель сонгох
          </Text>
          <Box>
            <IconButton
              bg="#E4E7EC"
              w={"10%"}
              borderRadius={"10px"}
              aria-label="Close"
              icon={<CloseIcon />}
              padding={1}
              onClick={onClose}
              variant="ghost"
              size={"md"}
            />
          </Box>
        </DrawerHeader>

        <DrawerBody p={4} overflowY="auto">
          <Text fontSize="sm" mb={4}>
            {manu?.name} {myModel?.groupname} {selectedModel?.modelname}
          </Text>

          {/* Search Input */}
          <InputGroup mb={4}>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="#667085" />}
            />
            <Input
              pl={8}
              placeholder="Хайх"
              variant="filled"
              value={searchTerm}
              bg="white"
              border="1px solid #D0D5DD"
              _focus={{ bg: "white" }}
              focusBorderColor="#F75B00"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Conditional rendering based on selection level */}
          <VStack align="start" spacing={4} mb={4}>
            {manu == null ? (
              <>
                {filteredBrands?.map((make: CarBrand) => (
                  <HStack
                    onClick={() => {
                      setManu(make);
                      setSearchTerm("");
                    }}
                    key={make.manuid}
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Text fontSize="md">{make.name}</Text>
                    <Text>&gt;</Text>
                  </HStack>
                ))}
              </>
            ) : myModel == null ? (
              <>
                <Text fontSize="xs" fontWeight="bold">
                  MODELS
                </Text>
                {filteredModels?.map((mod: CarModel) => (
                  <HStack
                    onClick={() => {
                      setMyModel(mod);
                      setSearchTerm("");
                    }}
                    key={mod.groupid}
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Text fontSize="md">{mod.groupname}</Text>
                    <Text>&gt;</Text>
                  </HStack>
                ))}
              </>
            ) : selectedModel == null ? (
              <>
                <Text fontSize="xs" fontWeight="bold">
                  MODEL VARIANTS
                </Text>
                {filteredVariants?.map((variant) => (
                  <HStack
                    onClick={() => {
                      setSelectedModel(variant);
                      setSearchTerm("");
                    }}
                    key={variant.modelid}
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Text fontSize="md">{variant.modelname}</Text>
                    <Text>&gt;</Text>
                  </HStack>
                ))}
              </>
            ) : (
              <>
                <Text fontSize="xs" fontWeight="bold">
                  ENGINE OPTIONS
                </Text>
                {filteredEngines?.map((eng: CarEngine) => (
                  <HStack
                    onClick={() => {
                      dispatch(
                        setCarDetails({
                          brandId: manu!.manuid,
                          brandName: manu!.name,
                          modelId: selectedModel?.modelid,
                          modelName: selectedModel?.modelname,
                          carId: eng.carid,
                          carName: eng.carname,
                          plate: "",
                          vin: "",
                          searchedBy: 3,
                        })
                      );
                      onClose();
                      router.push(`/category/${eng.carid}`);
                    }}
                    key={eng.carid}
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Text fontSize="md">{eng.carname}</Text>
                    <Text>&gt;</Text>
                  </HStack>
                ))}
              </>
            )}
          </VStack>

          <Divider />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
