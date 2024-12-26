import React from "react";
import {
  Shield,
  Truck,
  Code,
  Globe,
  Users,
  TrendingUp,
  Zap,
  Database,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100/25 dark:bg-grid-gray-700/25" />
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              About EcomOrbit
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing online fashion through cutting-edge technology and
              exceptional user experience. We are not just an e-commerce
              platform - we are the future of digital fashion retail.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "100K+" },
              { label: "Products", value: "50K+" },
              { label: "Daily Orders", value: "1000+" },
              { label: "Countries", value: "25+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To revolutionize the fashion e-commerce landscape through
                innovative technology, providing a seamless and personalized
                shopping experience powered by AI and advanced analytics.
              </p>
            </div>
            <div className="space-y-4 p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become the global leader in tech-driven fashion retail,
                setting new standards for digital commerce through continuous
                innovation and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Our Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "AI-Powered Recommendations",
                description:
                  "Machine learning algorithms for personalized shopping experiences",
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Real-time Inventory",
                description:
                  "Advanced inventory management with predictive analytics",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Blockchain Security",
                description:
                  "Secure transactions with advanced cryptographic protection",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Smart CRM",
                description: "AI-driven customer relationship management",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Analytics Dashboard",
                description: "Real-time performance metrics and insights",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Smart Logistics",
                description: "AI-optimized delivery routes and tracking",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
              >
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future of Fashion?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of tech-savvy fashion enthusiasts
          </p>
          <button className="bg-white px-8 py-3 rounded-full font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
