import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Login,CowFeed,Contact,UserDashBord,Home,Signup, UpdateProfile,OpenAccountScreen,DailyMilkCount,AddMilkPrice,MilkDailyCard } from './screens/index';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      easing: 'ease-in-out', // Default easing for animations
      once: false, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div className="page-body">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<UserDashBord/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cow-feed-availability" element={<CowFeed/>} />
        <Route path="/update-profile" element={<UpdateProfile/>} />

        <Route path="/create-account" element={<OpenAccountScreen/>} />
        <Route path="/add-milk-count" element={<DailyMilkCount/>} />

        <Route path="/add-milk-price" element={<AddMilkPrice/>} />

        <Route path="/show-milk" element={<MilkDailyCard/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
