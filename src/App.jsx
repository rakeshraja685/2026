import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import ClassYearbook from "./pages/ClassYearbook";
import FarewellMessages from "./pages/FarewellMessages";
import Gallery from "./pages/Gallery";
import Timeline from "./pages/Timeline";
import Videos from "./pages/Videos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="yearbook" element={<ClassYearbook />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="messages" element={<FarewellMessages />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
