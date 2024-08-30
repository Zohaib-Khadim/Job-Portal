import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate , Link} from "react-router-dom";
import { register } from "../store/slices/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import {RiLock2Fill } from "react-icons/ri";
import {clearAllErrors} from "../store/slices/userSlice.js"
const Register = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { user, error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("email", email);
    if (role === "Job Seaker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, message, loading, isAuthenticated]);
  return (
    <>
      <div className="conatiner flex  border ">
        <form action="" onSubmit={handleRegister} className="m-auto">
          <h4 className="text-center font-bold text-2xl mb-3">
            Create A New Account
          </h4>
          <div className="wrapper grid lg:grid-cols-2 md:grid-cols-1 gap-5">
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

            <div className="inputTag">
              <label>UserName </label>
              <div className="mt-2 lg:w-[40vw] flex">
                <input
                  className="border-none rounded-l-lg outline-none w-[38vw] bg-gray-300 p-2"
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                  name=""
                  id=""
                />
                <FaPencilAlt className=" lg:ms-auto w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
          </div>
          <div className="wrapper mt-3 grid lg:grid-cols-2 md:grid-cols-1 gap-5">
            <div className="inputTag">
              <label className="">Email</label>
              <div className="mt-2  lg:w-[40vw] flex ">
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

            <div className="inputTag">
              <label>Phone Number</label>
              <div className="mt-2 lg:w-[40vw] flex">
                <input
                  className="border-none rounded-l-lg outline-none w-[38vw] bg-gray-300 p-2"
                  type="number"
                  value={phoneNumber}
                  placeholder="111-222-333"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name=""
                  id=""
                />
                <FaPhoneFlip className=" lg:ms-auto w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
          </div>
          <div className="wrapper mt-3 grid lg:grid-cols-2 md:grid-cols-1 gap-5">
            <div className="inputTag">
              <label className="">Address</label>
              <div className="mt-2  lg:w-[40vw] flex ">
              <input
                  className="border-none rounded-l-lg outline-none w-[38vw] bg-gray-300 p-2"
                  type="text"
                  value={address}
                  placeholder="Enter Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                  name=""
                  id=""
                />
                <FaAddressBook className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>

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
         
          {
            role === "Job Seaker" && (
              <>
          <div className="wrapper mt-3 grid lg:grid-cols-3 md:grid-cols-1 gap-5">
            <div className="inputTag">
              <label className="">Your First Niche</label>
              <div className="mt-2 lg:w-[26vw]    flex ">
                <select
                  className="border-none outline-none w-[38vw] bg-gray-300 rounded-l-lg h-10"
                  value={firstNiche}
                  onChange={(e) => setFirstNiche(e.target.value)}
                >
                  <option value="">Your Niche</option>
                  {
                    nichesArray.map((element,index)=>(
                      // console.log(element);
                      <option key={index} value={element} >{element}</option>
                    ))}
                </select>
                <MdCategory className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
            <div className="inputTag">
              <label className="">Your Second Niche</label>
              <div className="mt-2 lg:w-[26vw]   flex ">
                <select
                  className="border-none outline-none w-[38vw] bg-gray-300 rounded-l-lg h-10"
                  value={secondNiche}
                  onChange={(e) => setSecondNiche(e.target.value)}
                >
                  <option value="">Your Niche</option>
                  {
                    nichesArray.map((element,index)=>(
                      // console.log(element);
                      <option value={element} key={index}>{element}</option>
                      
                    ))}
                </select>
                <MdCategory className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
            <div className="inputTag">
              <label className="">Your Third Niche</label>
              <div className="mt-2 lg:w-[26vw]  flex ">
                <select
                  className="border-none outline-none w-[38vw] bg-gray-300 rounded-l-lg h-10"
                  value={thirdNiche}
                  onChange={(e) => setThirdNiche(e.target.value)}
                >
                  <option value="">Your Niche</option>
                  {
                    nichesArray.map((element,index)=>(
                      <option value={element} key={index}>{element}</option>
                    ))}
                </select>
                <MdCategory className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" />
              </div>
            </div>
          </div>
          <div className="wrapper mt-3 grid lg:grid-cols-1 md:grid-cols-1 ">
            <div className="inputTag ">
              <label className="">Cover Letter</label>
              <div className="mt-2   ">
              <textarea
                  className="border-none rounded-l-lg outline-none lg:w-full md:w-[44vw] sm:w-[45vw] bg-gray-300 p-2 rounded"
                  value={coverLetter}
                  rows={10} 
                  // placeholder="Enter Your Cover Letter"
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
                {/* <FaAddressBook className="border w-12 h-10 p-2 bg-yellow-500 rounded-r-lg" /> */}
              </div>
            </div>
          </div>
          <div className="wrapper mt-2 grid  lg:grid-cols-1 md:grid-cols-1 ">
            <div className="inputTag ">
              <label className="">Resume</label>
              <div className="mt-2 border bg-gray-300 h-10 rounded flex items-center ">
              <input className="" type="file" name="" id="" onChange={resumeHandler}/>
              </div>
            </div>
          </div>   
              </>
            )
          }
          
         <button disabled={loading} className="border w-full mt-7 py-2 bg-yellow-500 rounded" type="submit">Register</button>
        <div className="border w-full mt-7 py-2 bg-yellow-500 rounded text-center">
        <Link   to={"/login"}>Login Now</Link>
        </div>

        </form>
      </div>
    </>
  );
};

export default Register;
