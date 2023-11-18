import { render, screen } from "@testing-library/react";
import { ProductsView } from "./ProductsView";

const mockedProducts = [
  {
    id: 0,
    title: "Product 1",
    price: 0,
    quantity: 0,
    total: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    thumbnail: "",
  },
  {
    id: 1,
    title: "Product 2",
    price: 0,
    quantity: 0,
    total: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    thumbnail: "",
  },
];

jest.mock("./useProductView", () => ({
  useProductView: jest.fn(() => ({
    error: null,
    isLoading: false,
    filteredData: mockedProducts,
    data: mockedProducts,
    onSearch: jest.fn(),
  })),
}));

describe("ProductsView", () => {
  it("renders the component correctly", () => {
    render(<ProductsView />);

    expect(screen.getByPlaceholderText("Search product")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
