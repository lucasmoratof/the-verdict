import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    // This now navigates to the results page with the search query
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <Navigation />
      <Hero onSearch={handleSearch} />
      <Footer />
    </>
  );
};