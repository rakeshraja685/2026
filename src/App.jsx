import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import ClassYearbook from "./pages/ClassYearbook";
import FarewellMessages from "./pages/FarewellMessages";
import Gallery from "./pages/Gallery";
import Classroom from "./pages/Classroom";
import Videos from "./pages/Videos";

// Scroll-to-top on route change + scroll progress bar
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    // Inject scroll progress bar element
    let bar = document.getElementById("scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "scroll-progress";
      document.body.prepend(bar);
    }

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="yearbook" element={<ClassYearbook />} />
          <Route path="classroom" element={<Classroom />} />
          <Route path="messages" element={<FarewellMessages />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
