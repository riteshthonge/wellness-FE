import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Login,CowFeed,Contact,UserDashBord,Home,Signup, UpdateProfile,OpenAccountScreen,DailyMilkCount,AddMilkPrice,MilkDailyCard } from './screens/index';
function App() {
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
