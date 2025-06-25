import { FaUser, FaBullseye, FaUtensils, FaChartLine } from "react-icons/fa";
function HowItWorks() {
  const steps = [
    {
      icon: FaUser,
      title: "Share Your Profile",
      description:
        "Tell us about your age, weight, height, activity level, and health goals.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FaBullseye,
      title: "Set Your Goals",
      description:
        "Choose your dietary preferences, restrictions, and fitness objectives.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: FaUtensils,
      title: "Get Your Plan",
      description:
        "Receive a personalized meal plan crafted by our AI nutrition expert.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FaChartLine,
      title: "Track Progress",
      description:
        "Monitor your journey and adjust your plan as you reach new milestones.",
      color: "bg-orange-100 text-orange-600",
    },
  ];
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your personalized diet plan in four simple steps. Our AI
            analyzes your unique profile to create the perfect nutrition
            strategy for your goals.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0">
                  <div className="h-full bg-green-500 w-0 group-hover:w-full transition-all duration-1000 delay-300"></div>
                </div>
              )}
              {/* Step Card */}
              <div className="relative z-10 text-center group-hover:scale-105 transition-transform duration-300">
                {/* Icon */}
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
                >
                  <step.icon className="h-10 w-10" />
                </div>
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
