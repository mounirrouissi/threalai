export type Order = {
    type: "Tshirt" | "Hoodie" | "Frame";
    color: string;
    size: string;
    orderNumber: number;
}

export type OptionType = {
    value: string;
    label: string;
  }