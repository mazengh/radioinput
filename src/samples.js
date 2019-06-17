export const pizzaCrust = {
  groupLabel: {
    id: "crust_label",
    text: "Pizza Crust"
  },
  radios: [
    {
      position: "afterLabel",
      value: "crust1",
      label: "Deep dish"
    },
    {
      position: "afterLabel",
      value: "crust2",
      label: "Thick"
    },
    {
      position: "afterLabel",
      value: "crust3",
      label: "Thin"
    }
  ]
};

export const paymentMethod = {
  groupLabel: {
    id: "payment_label",
    text: "Payment Method"
  },
  radios: [
    {
      value: "payment1",
      label: "Cash on delivery"
    },
    {
      value: "payment2",
      label: "Credit Card"
    },
    {
      value: "delivery3",
      label: "Disabled",
      disabled: true
    }
  ]
};

export const fruits = {
  groupLabel: {
    id: "fruits_label",
    text: "Select Fruit"
  },
  radios: [
    {
      value: "apple",
      label: "Apple",
      position: "aboveLabel"
    },
    {
      value: "banana",
      label: "Banana",
      position: "aboveLabel"
    },
    {
      value: "mango",
      label: "Mango",
      position: "aboveLabel"
    },
    {
      value: "watermelon",
      label: "Watermelon",
      position: "aboveLabel"
    }
  ]
};

export const position = {
  groupLabel: {
    id: "position_label",
    text: "Select Left, Middle or Right"
  },
  radios: [
    {
      value: "left"
    },
    {
      value: "middle"
    },
    {
      value: "right"
    }
  ]
};

export const colors = {
  groupLabel: {
    id: "colors_label",
    text: "Select color"
  },
  radios: [
    {
      value: "red",
      label: "Red"
    },
    {
      value: "blue",
      label: "Blue"
    },
    {
      value: "green",
      label: "Green"
    }
  ]
};
