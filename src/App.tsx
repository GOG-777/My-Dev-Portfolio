import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PraiseFashion from './pages/PraiseFashion';
import CourseRegistration from './pages/CourseRegistration';
import URLShortener from './pages/URLShortener';
import ScrollToTop from './components/ScrollToTop';
import ThunderStrike from './components/ThunderStrike';
import DepartureModal from './components/DepartureModal';

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <ThunderStrike />
      <DepartureModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/praise-fashion" element={<PraiseFashion />} />
        <Route path="/projects/course-registration" element={<CourseRegistration />} />
        <Route path="/projects/url-shortener" element={<URLShortener />} />
      </Routes>
    </>
  );
};

export default App;
