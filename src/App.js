import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


import { Login,AddSession,UserDashBord,Home,Signup, AllYogaSessions, AllExerciseSessions, AllMeditationSessions, MeditationSessionDetails, YogaSessionDetails, ExerciseSessionDetails } from './screens/index';
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
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<UserDashBord/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        
         <Route path="/add-session" element={<AddSession/>} />
         <Route path="/yoga-session" element={<AllYogaSessions/>} />
         <Route path="/exercise-session" element={<AllExerciseSessions/>} />
         <Route path="/meditation-session" element={<AllMeditationSessions/>} />
        <Route path="/meditation-session-details/:id" element={<MeditationSessionDetails />} />
          <Route path="/yoga-session-details/:id" element={<YogaSessionDetails/>} />
          <Route path="/exercise-session-details/:id" element={<ExerciseSessionDetails/>} />



        
       
       
       
       
       

   
        

        
    
        
        </Routes>
    
    </div>
  );
}

export default App;
