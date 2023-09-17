import { ProductType } from "@/services/products";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface CartContextType {
    cart: ProductType[]
    addProduct: (product: ProductType) => void
    removeProduct: (productId: number) => void
}

interface ContextProvider {
    children?: ReactNode

}

const CartContext = createContext<CartContextType>({} as CartContextType)

export const CartContextProvider = ({ children }: ContextProvider) => {
    const [cart, setCart] = useState<ProductType[]>([])


    useEffect(() => {
        const storedCart = localStorage.getItem('shopping-cart')

        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    const addProduct = (product: ProductType) => {
        const updatedCart = [...cart, product]
        localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    const removeProduct = (productId: number) =>{
        const productIndex = cart.findIndex(prod => prod.id === productId)

        if (productId !== -1) {
            const updatedCart = [...cart]
            updatedCart.splice(productIndex, 1)
            localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)