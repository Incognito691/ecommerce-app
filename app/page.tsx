import Link from "next/link";
import { ShoppingBag, Truck, Shield, Clock } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-blue-400">EcomOrbit</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Discover a universe of premium fashion and trending styles. Your
              one-stop destination for all things fashion.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-md font-semibold backdrop-blur-sm transition-all duration-300"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: "Secure Shopping",
                description: "Safe and encrypted transactions",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Free delivery on orders above $50",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Money Back",
                description: "30-day return guarantee",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Round the clock assistance",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Arrivals",
                image:
                  "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7",
                link: "#",
              },
              {
                title: "Trending Now",
                image:
                  "https://images.unsplash.com/photo-1445205170230-053b83016050",
                link: "#",
              },
              {
                title: "Best Sellers",
                image:
                  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2",
                link: "#",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
