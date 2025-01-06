import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Discover the Future of Tech</h1>
          <p className="text-xl mb-8 max-w-md mx-auto md:mx-0">Experience cutting-edge phones and laptops that redefine innovation and style.</p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Latest tech devices"
            width={400}
            height={400}
            className="rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  )
}

