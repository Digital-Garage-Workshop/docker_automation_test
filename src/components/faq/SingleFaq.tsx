// import { Button, Collapse, Box, useDisclosure } from "@chakra-ui/react";

// export const SingleFaq = () => {
//   const { isOpen, onToggle } = useDisclosure();
//   return (
//     <Box
//       key={index}
//       border="1px solid #E2E8F0"
//       borderRadius="md"
//       w="full"
//       p={4}
//       bg={openIndex === index ? "#F9FAFB" : "white"}
//       onClick={() => handleToggle(index)}
//       cursor="pointer"
//       _hover={{ bg: "#F0F4F8" }}
//       transition="background-color 0.3s"
//     >
//       <HStack justify="space-between" w="full">
//         <Text fontWeight="bold" fontSize="lg">
//           {item.title}
//         </Text>
//         <IconButton
//           aria-label="Expand FAQ"
//           icon={<ChevronDownIcon />}
//           transform={openIndex === index ? "rotate(180deg)" : ""}
//           transition="transform 0.3s"
//         />
//       </HStack>
//       {openIndex === index && (
//         <Box pt={4}>
//           <Text fontSize="md" color="gray.600">
//             {item.content}
//           </Text>
//         </Box>
//       )}
//     </Box>
//   );
// };
