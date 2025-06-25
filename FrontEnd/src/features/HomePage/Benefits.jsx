import {
  FaBuilding,
  FaBolt,
  FaChartPie,
  FaUsers,
  FaMobileAlt,
  FaUserMd,
} from "react-icons/fa";
function Benefits() {
  const benefits = [
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: "Smart Nutrition Tracking",
      description:
        "Effortlessly monitor your daily nutrition intake with our intelligent tracking system that learns from your habits.",
    },
    {
      icon: <FaBolt className="w-8 h-8" />,
      title: "Personalized Goals",
      description:
        "Set and achieve your health goals with customized recommendations tailored to your lifestyle and preferences.",
    },
    {
      icon: <FaChartPie className="w-8 h-8" />,
      title: "Progress Insights",
      description:
        "Track your journey with detailed analytics and insights that help you understand your eating patterns.",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community Support",
      description:
        "Connect with like-minded individuals on similar health journeys and share your success stories.",
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: "Mobile Friendly",
      description:
        "Access your nutrition data anywhere, anytime with our responsive design that works on all devices.",
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Expert Guidance",
      description:
        "Get access to nutrition tips and guidance from certified dietitians and health professionals.",
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E8F5E9] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose DietCraft?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make DietCraft the perfect companion for
            your <span className="text-green-600 font-semibold">health</span>{" "}
            journey
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-lg mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
