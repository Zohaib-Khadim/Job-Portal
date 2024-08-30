import { useState ,useEffect } from 'react';
import {  MdOutlineMailOutline } from "react-icons/md";
import {RiLock2Fill } from "react-icons/ri";
import {  FaRegUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearAllErrors } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("")
  const [role , setRole] = useState("")

  const {error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();
    const formData = new FormData ();
    formData.append("role",role)
    formData.append("email",email)
    formData.append("password",password);

    dispatch(login(formData));
  }

  

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);


  return (
    <>
    <div className="container  flex h-[100vh]">
    <form onSubmit={handleLogin} action="" className='m-auto  p-3'>
      <h4 className="text-center font-bold text-2xl my-3">Login Here</h4>
      <div className="wrapper">
        <div className="inputTag">
          <label htmlFor="">Email</label>
          <div className='mt-2  lg:w-[40vw] flex'> 
          <input
                  className="border-none rounded-l-lg outline-none w-[38vw] bg-gray-300 p-2"
                  type="email"
                  value={email}
                  placeholder="youremail@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  id=""
                />
               <MdOutlineMailOutline className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />

          </div>
        </div>
      </div>
      <div className="wrapper">
      <div className="inputTag">
              <label>Password</label>
              <div className="mt-2 lg:w-[40vw] flex">
                <input
                  className="border-none rounded-l-lg outline-none w-[38vw] bg-gray-300 p-2"
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  id=""
                />
                <RiLock2Fill className=" lg:ms-auto w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
      </div>
      <div className="wrapper ">
            <div className="inputTag">
              <label className="">Register As </label>
              <div className="mt-2  lg:w-[40vw] flex ">
                <select
                  className="border-none outline-none w-[38vw] bg-gray-300 rounded-l-lg h-10"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register As Employer</option>
                  <option value="Job Seaker">Register As Job Seaker</option>
                </select>
                <FaRegUser className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
      </div>
      <button disabled={loading} className="border w-full mt-7 py-2 bg-yellow-500 rounded" type="submit">Login</button>
      <div className="border w-full mt-7 py-2 bg-yellow-500 rounded text-center">
        <Link   to={"/register"}>Register Now</Link>
        </div>
    </form>
    </div>
    </>
  )
}

export default Login