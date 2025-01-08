"use client";
import { FormControl, Select, Box } from "@chakra-ui/react";

export const Selection = (props: {
  data: any[];
  isDisabled?: boolean;
  placeholder: string;
  selection: string;
  setSelected: (value: string, name?: string) => void;
  type?: string;
  isAlert?: boolean;
  isInMain?: boolean;
}) => {
  const {
    data,
    isDisabled,
    placeholder,
    selection,
    setSelected,
    type,
    isAlert,
    isInMain,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    let selectedName = "";

    if (type === "model") {
      data.forEach((item: any) => {
        item.childrens?.forEach((child: any) => {
          // Convert IDs to strings for comparison
          if (String(child.modelid) === String(selectedValue)) {
            selectedName = child.modelname;
          }
        });
      });
    } else if (type === "engine") {
      data.forEach((item: any) => {
        item.childrens?.forEach((child: any) => {
          // Convert IDs to strings for comparison
          if (String(child.modelid) === String(selectedValue)) {
            selectedName = child.carname;
          }
        });
      });
    } else {
      data.forEach((item: any) => {
        // Convert IDs to strings for comparison
        if (String(item.manuid) === String(selectedValue)) {
          selectedName = item.name;
        }
      });
    }

    setSelected(selectedValue, selectedName);
  };

  return (
    <Box w={"full"}>
      <FormControl w="full" bg="#F9F9F9" borderRadius="8px">
        <Select
          // placeholder={placeholder}
          value={selection}
          onChange={handleChange}
          bg="white"
          _hover="none"
          _focus="none"
          _disabled={isInMain ? "none" : "inherit"}
          border={isInMain ? "none" : "1px solid  #E4E7EC"}
          // fontSize={18}
          // fontWeight={700}
          // _placeholder={{
          //   color: "#A0AEC0",
          //   fontSize: "16px",
          //   fontWeight: "400",
          //   fontStyle: "italic",
          // }}
          disabled={isDisabled}
          isRequired={isAlert}
        >
          <option
            value=""
            disabled
            style={{
              color: "#A0AEC0",
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {placeholder}
          </option>
          {data?.map((item: any, index: number) =>
            type === "model" ? (
              item.childrens?.map((child: any, idx: number) => (
                <option
                  key={idx}
                  value={child.modelid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {child.modelname} ({child.yearstart} -{" "}
                  {child.yearend || "..."})
                </option>
              ))
            ) : type === "engine" ? (
              <option
                key={index}
                value={item.carid}
                style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
              >
                {item.carname}
              </option>
            ) : (
              <option
                key={index}
                value={item.manuid}
                style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
              >
                {item.name}
              </option>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
