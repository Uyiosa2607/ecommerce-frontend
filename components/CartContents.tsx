'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus } from 'lucide-react'

const initialCartItems = [
  { id: '1', name: 'Smartphone X', price: 799, quantity: 1, image: '/placeholder.svg?height=100&width=100' },
  { id: '2', name: 'Laptop Pro', price: 1299, quantity: 1, image: '/placeholder.svg?height=100&width=100' },
]

export default function CartContents() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-8">
      {cartItems.map(item => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md" />
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-purple-600 font-semibold">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  variant="outline"
                  size="icon"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => removeItem(item.id)}
                variant="ghost"
                size="icon"
                className="ml-4 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
        <p className="text-2xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  )
}

