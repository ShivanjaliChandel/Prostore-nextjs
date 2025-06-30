'use client'
import { Cart, CartItem } from "@/types"
import Image from "next/image"
import { Button } from "@/components/button"
import { removeItemFromCart, updateItemQuantity, decreaseItemQuantity } from "@/lib/actions/cart.actions"
import { useState } from "react"
import { toast } from "sonner"

const CartTable = ({ cart }: { cart: Cart }) => {
  const [loading, setLoading] = useState<string | null>(null)

  const handleRemoveItem = async (productId: string) => {
    setLoading(productId)
    try {
      const result = await removeItemFromCart(productId)
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to remove item")
    } finally {
      setLoading(null)
    }
  }

  const handleUpdateQuantity = async (productId: string, newQty: number) => {
    setLoading(productId)
    try {
      const result = await updateItemQuantity(productId, newQty)
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update quantity")
    } finally {
      setLoading(null)
    }
  }

  const handleDecreaseQuantity = async (productId: string) => {
    setLoading(productId)
    try {
      const result = await decreaseItemQuantity(productId)
      if (result.success) {
        toast.success(result.message)
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update quantity")
    } finally {
      setLoading(null)
    }
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          
          {cart.items.map((item: CartItem) => (
            <div key={item.productId} className="flex items-center gap-4 py-4 border-b last:border-b-0">
              <div className="w-20 h-20 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecreaseQuantity(item.productId)}
                  disabled={loading === item.productId}
                >
                  -
                </Button>
                
                <span className="w-12 text-center">{item.qty}</span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.productId, item.qty + 1)}
                  disabled={loading === item.productId}
                >
                  +
                </Button>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${(Number(item.price) * item.qty).toFixed(2)}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item.productId)}
                  disabled={loading === item.productId}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items Price:</span>
              <span>${cart.itemsprice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${cart.totalPrice}</span>
            </div>
          </div>
          
          <Button className="w-full mt-4">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartTable