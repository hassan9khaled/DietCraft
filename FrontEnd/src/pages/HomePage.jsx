import NavBar from "../ui/NavBar";
import Hero from "../features/HomePage/Hero";
import HowItWorks from "../features/HomePage/HowItWorks";
import Benefits from "../features/HomePage/Benefits";
import Footer from "../features/HomePage/Footer";

const Homepage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Footer />
    </>
  );
};

export default Homepage;
