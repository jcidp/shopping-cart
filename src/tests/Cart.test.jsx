import { act } from "react-dom/test-utils";
import { vi } from "vitest"
import Cart from "../components/Cart";
import { render, screen } from "@testing-library/react";

const {mockedUseOutletContext, mockedUseLocation, mockedLink} = vi.hoisted(() => {
    return {
        mockedUseOutletContext: vi.fn(),
        mockedUseLocation: vi.fn(),
        mockedLink: vi.fn(),
    };
});

vi.mock("react-router-dom", () => {
    return {
        useOutletContext: mockedUseOutletContext,
        useLocation: mockedUseLocation,
        Link: mockedLink,
    };
});

vi.mock("../components/ProductCard.jsx", () => {
    return {
        default: ({product}) => (
            <div>Product with id #{product.id}</div>
        ),
    };
});

describe("Cart", () => {
    it("render error when there's an error", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [],
            error: "error",
            isLoading: false,
        });
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        act(() => {
            render(<Cart />)
        });

        expect(screen.getByRole("heading", {name: "Error loading data"}))
            .toBeInTheDocument();
        expect(screen.getByText("Please try reloading the page.")).toBeInTheDocument();
    });

    it("renders products correctly", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [
                {id: 7, price: 10, cartQuantity: 1},
                {id: 9, price: 20, cartQuantity: 2},
            ],
            error: null,
            isLoading: false,
        });
        mockedUseLocation.mockReturnValue({pathname: "/cart"});
        mockedLink.mockReturnValue(<a role="link">Go to Checkout</a>);

        act(() => {
            render(<Cart />)
        });
        
        expect(screen.getByRole("heading", {name: "Cart total: $50"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Go to Checkout"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(1);
        expect(screen.getAllByText(/^Product with id #\d+/).length).toBe(2);
    });

    it("renders empty state with no products in cart", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [
                {id: 7, price: 10, cartQuantity: 0},
                {id: 9, price: 20, cartQuantity: 0},
            ],
            error: null,
            isLoading: false,
        });
        mockedUseLocation.mockReturnValue({pathname: "/cart"});
        mockedLink.mockReturnValue(<a role="link">Visit Shop</a>)

        act(() => {
            render(<Cart />)
        });

        expect(screen.getByRole("heading", {name: "Your cart is empty!"})).toBeInTheDocument();
        expect(screen.getByText(/Visit our shop and add what you like to your cart/)).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Visit Shop"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(1);
    });

    it("renders loading state", () => {
        mockedUseOutletContext.mockReturnValue({
            products: null,
            error: null,
            isLoading: true,
        });
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        act(() => {
            render(<Cart />)
        });
        
        expect(screen.getByRole("heading", {name: "Loading..."})).toBeInTheDocument();
    });    

    it("renders empty state with special message when in /shop path", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [
                {id: 7, price: 10, cartQuantity: 0},
                {id: 9, price: 20, cartQuantity: 0},
            ],
            error: null,
            isLoading: false,
        });
        mockedUseLocation.mockReturnValue({pathname: "/shop"});

        act(() => {
            render(<Cart />)
        });

        expect(screen.getByText(/Add a product to your cart to see it here/)).toBeInTheDocument();
    });

    it("renders 'Go to Cart' anchor when not in /cart path' and there are products in cart", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [
                {id: 7, price: 10, cartQuantity: 1},
                {id: 9, price: 20, cartQuantity: 0},
            ],
            error: null,
            isLoading: false,
        });
        mockedUseLocation.mockReturnValue({pathname: "/shop"});
        mockedLink.mockReturnValueOnce(<a role="link">Go to Checkout</a>);
        mockedLink.mockReturnValue(<a role="link">Go to Cart</a>);

        act(() => {
            render(<Cart />)
        });

        expect(screen.getByRole("link", {name: "Go to Checkout"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Go to Cart"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(2);
        expect(screen.getByRole("heading", {name: "Cart total: $10"})).toBeInTheDocument();
        expect(screen.getAllByText(/^Product with id #\d+/).length).toBe(1);
    });
});