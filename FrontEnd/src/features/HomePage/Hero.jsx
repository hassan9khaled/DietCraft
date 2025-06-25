import { Link } from "react-router-dom";
import Button from "../../ui/Button";
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#E8F5E9] to-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your <span className="text-[#4CAF50]">Perfect Diet Plan</span>{" "}
              Awaits
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get personalized meal recommendations powered by AI. Based on your
              age, weight, goals, and lifestyle - achieve your fitness dreams
              with science-backed nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button>
                <Link to="/signup">Start Your Journey</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop"
                alt="Healthy meal preparation"
                className="w-full h-80 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Personalized meal plans just for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
