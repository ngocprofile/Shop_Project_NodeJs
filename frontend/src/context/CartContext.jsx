import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const refreshCart = useCallback(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setCartCount(0);
            return;
        }

        fetch("http://localhost:5000/api/cart", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // ❗ backend trả về object => phải lấy data.items
                const items = Array.isArray(data.items) ? data.items : [];

                setCartItems(items);
                setCartCount(items.length);
            })
            .catch(() => {
                setCartItems([]);
                setCartCount(0);
            });
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "accessToken") {
                refreshCart();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [refreshCart]);

    useEffect(() => {
        let timeout = null;

        const handleAuthChange = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => refreshCart(), 200);
        };

        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, [refreshCart]);

    const clearCart = () => {
        setCartItems([]);
        setCartCount(0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                refreshCart,
                refreshCartCount: refreshCart, // alias
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
