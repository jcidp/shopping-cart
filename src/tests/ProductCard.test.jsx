import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest"
import ProductCard from "../components/ProductCard";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const {mocks} = vi.hoisted(() => {
    return {
        mocks: vi.fn(),
    };
});

vi.mock("react-router-dom", () => {
    return {
        useOutletContext: mocks,
    };
});

describe("ProductCard component", () => {
    mocks.mockReturnValue({
        handleAddToCart: vi.fn(),
        handleRemoveFromCart: vi.fn(),
        setShowCart: vi.fn(),
    });

    it("renders image and text of product", () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
        }

        render(<ProductCard product={product} />);

        expect(screen.getByRole("img", {name: "test"})).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("$10.00")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Add to cart"})).toBeInTheDocument();
    });

    it("calls 'Add to cart' Handler and 'setShowCart' when clicked", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
        }
        const user = userEvent.setup();

        render(<ProductCard product={product} />);
        const btn = screen.getByRole("button", {name: "Add to cart"});

        expect(mocks().handleAddToCart).not.toHaveBeenCalled();
        expect(mocks().setShowCart).not.toHaveBeenCalled();

        await act(async () => {
            await user.click(btn);
        });

        expect(mocks().handleAddToCart).toHaveBeenCalledTimes(1);
        expect(mocks().setShowCart).toHaveBeenCalledTimes(1);
    });

    it("renders 'edit' and 'remove from cart' buttons when inCart is true", () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
        };

        render(<ProductCard product={product} inCart={true} />);
        
        expect(screen.getByRole("img", {name: "test"})).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("$10.00")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Remove from cart"})).toBeInTheDocument();
    });

    it("calls 'handleRemoveFromCart' when button clicked", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
        };
        const user = userEvent.setup();

        render(<ProductCard product={product} inCart={true} />);
        const btn = screen.getByRole("button", {name: "Remove from cart"});

        expect(mocks().handleRemoveFromCart).not.toHaveBeenCalled();

        await act(async () => {
            await user.click(btn);
        });

        expect(mocks().handleRemoveFromCart).toHaveBeenCalledTimes(1);
    });

    it("handles clicks on 'edit' and 'cancel' correctly, including rendering the different paths", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
        };
        const user = userEvent.setup();

        render(<ProductCard product={product} inCart={true} />);
        const btn = screen.getByRole("button", {name: "Edit"});

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.queryByLabelText("Quantity:")).toBeNull();
        expect(screen.queryByRole("button", {name: "Cancel"})).toBeNull();
        expect(screen.queryByRole("button", {name: "Confirm"})).toBeNull();
        
        await act(async () => {
            await user.click(btn);
        });

        expect(screen.getByLabelText("Quantity:")).toBeInTheDocument();
        expect(screen.queryByText("1")).toBeNull();
        expect(screen.getByRole("button", {name: "Confirm"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
        
        const cancel = screen.getByRole("button", {name: "Cancel"});

        await act(async () => {
            await user.click(cancel);
        });

        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
    });
});