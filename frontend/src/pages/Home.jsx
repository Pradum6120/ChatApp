import Lhome from './Lhome';
import RHome from './RHome';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  const loginUserLS = localStorage.getItem("loginUser")
  const loginUser = useSelector((state) => state.User.User)

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, [ ]);

 
  

  return (
    <div className="w-screen h-screen bg-[url('./bg.webp')] bg-cover bg-center flex m-0 gap-3 flex-col justify-center items-center">
      <Navbar />
      <div className="w-[95%] h-[84%] flex rounded-3xl border border-whiteshadow-2xl">
         <Lhome/>
        <RHome/>
      </div>
    </div>
  );
}

export default Home;
