import { Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface CustomInputProps extends InputProps {
  placeholder: string;
  name: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder, name, ...props }, ref) => {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        borderRadius="8px"
        bg="#F1F2F3"
        textAlign="center"
        fontSize="20px"
        fontWeight="bold"
        border="none"
        padding="10px 18px"
        _focus={{
          borderColor: "#F75B00",
        }}
        {...props}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
