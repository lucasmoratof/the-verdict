import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

// We will create the SearchResults page next
const SearchResults = () => <div>Search Results Page</div>; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;