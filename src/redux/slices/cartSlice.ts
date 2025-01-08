import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartState, Product, ShippingMethod, CartItem} from "../../../types";

const initialState: CartState = {
  pickupItems: [],
  deliveryItems: [],
  checkedDelivery: {},
  checkedPickup: {},
  selectedArticles: [],
  total: 0,
};

interface AddToCartPayload {
  product: Product;
  shippingMethod: ShippingMethod;
  quantity: number;
}

interface RemoveFromCartPayload {
  partid: number;
  shippingMethod: ShippingMethod;
}

interface UpdateQuantityPayload {
  partid: number;
  shippingMethod: ShippingMethod;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const {product, shippingMethod, quantity} = action.payload;

      const targetArray =
        shippingMethod === "pickup" ? state.pickupItems : state.deliveryItems;
      const targetTotal =
        shippingMethod === "pickup" ? "pickupTotal" : "deliveryTotal";

      if (!product.branchparts?.length) {
        console.error(
          `Product with articleid ${product.branchparts[0].partid} has no branchparts.`
        );
        return;
      }

      const existingItem = targetArray.find((item) =>
        item.branchparts.some((branchpart) =>
          product.branchparts.some(
            (pBranchPart) => pBranchPart.partid === branchpart.partid
          )
        )
      );

      const price = product.branchparts[0].price;

      if (existingItem) {
        existingItem.quantity += quantity;
        state.total += price * quantity;
      } else {
        targetArray.push({...product, quantity, shippingMethod});
        state.total += price * quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const {partid, shippingMethod} = action.payload;
      const targetArray =
        shippingMethod === "pickup" ? state.pickupItems : state.deliveryItems;

      // Find the index of the item to remove
      const itemIndex = targetArray.findIndex(
        (item) => item.branchparts[0].partid === partid
      );

      if (itemIndex !== -1) {
        const item = targetArray[itemIndex];

        // Adjust the total before removing the item
        const price =
          item.branchparts[0].pricesale ?? item.branchparts[0].price;
        state.total -= price * item.quantity;

        // Remove the item from the target array
        targetArray.splice(itemIndex, 1);

        // Remove the item from selectedArticles
        state.selectedArticles = state.selectedArticles.filter(
          (selectedItem) => selectedItem.branchparts[0].partid !== partid
        );

        // Remove the item's checked state
        if (shippingMethod === "delivery") {
          delete state.checkedDelivery[partid];
        } else {
          delete state.checkedPickup[partid];
        }

        // Recalculate the total price for all items in the cart
        state.total =
          state.pickupItems.reduce((acc, item) => {
            const itemPrice =
              item.branchparts[0].pricesale ?? item.branchparts[0].price;
            return acc + itemPrice * item.quantity;
          }, 0) +
          state.deliveryItems.reduce((acc, item) => {
            const itemPrice =
              item.branchparts[0].pricesale ?? item.branchparts[0].price;
            return acc + itemPrice * item.quantity;
          }, 0);
      }
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const {partid, shippingMethod, quantity} = action.payload;
      const targetArray =
        shippingMethod === "pickup" ? state.pickupItems : state.deliveryItems;

      const item = targetArray.find(
        (item) => item.branchparts[0].partid === partid
      );

      if (item && quantity > 0) {
        item.quantity = quantity;

        const selectedItemIndex = state.selectedArticles.findIndex(
          (selectedItem) => selectedItem.branchparts[0].partid === partid
        );
        if (selectedItemIndex !== -1) {
          state.selectedArticles = state.selectedArticles.map(
            (selectedItem, index) =>
              index === selectedItemIndex
                ? {
                    ...selectedItem,
                    quantity,
                  }
                : selectedItem
          );
        }
      }
    },

    setCheckedState: (
      state,
      action: PayloadAction<{
        itemId: number;
        isChecked: boolean;
        shippingMethod: ShippingMethod;
      }>
    ) => {
      const {itemId, isChecked, shippingMethod} = action.payload;

      if (shippingMethod === "delivery") {
        if (isChecked) {
          state.checkedPickup = {};
        }
        state.checkedDelivery[itemId] = isChecked;
      } else {
        if (isChecked) {
          state.checkedDelivery = {};
        }
        state.checkedPickup[itemId] = isChecked;
      }
    },
    setSelectedArticles: (state, action: PayloadAction<CartItem[]>) => {
      state.selectedArticles = action.payload;

      // Clear previously selected articles that don't match the current shipping method
      state.selectedArticles = state.selectedArticles.filter(
        (item) => item.shippingMethod === action.payload[0]?.shippingMethod
      );

      // Calculate the total based on each item's effective price and quantity
      state.total = state.selectedArticles.reduce((acc, item) => {
        const price = item.branchparts?.[0]?.salepercent
          ? item.branchparts?.[0]?.pricesale
          : item.branchparts?.[0]?.price;

        return acc + (price ?? 0) * item.quantity;
      }, 0);
    },

    clearCart: (state) => {
      state.pickupItems = [];
      state.deliveryItems = [];
      state.checkedDelivery = {};
      state.checkedPickup = {};
      state.selectedArticles = [];
      state.total = 0;
    },

    setCart: (state, action: PayloadAction<CartState>) => {
      state.pickupItems = action.payload.pickupItems;
      state.deliveryItems = action.payload.deliveryItems;
      state.checkedDelivery = action.payload.checkedDelivery;
      state.checkedPickup = action.payload.checkedPickup;
      state.selectedArticles = action.payload.selectedArticles;
      state.total = action.payload.total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCheckedState,
  setSelectedArticles,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
