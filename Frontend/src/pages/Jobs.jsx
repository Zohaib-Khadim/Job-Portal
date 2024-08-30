 import { toast } from "react-toastify";
 import { useState ,useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { clearAllJobsErrors, fetchJobs } from "../store/slices/JobSlice";
 import Spinner from "../components/spinner";
 import {FaSearch} from "react-icons/fa"
 import {Link} from "react-router-dom"

  const Jobs = () => {
   const [city, setCity] = useState("");
   const [selectedCity, setselectedCity] = useState("");
   const [niche, setNiche] = useState("");
   const [selectedNiche, setSelectedNiche] = useState("");
   const [searchKeyword, setSearchKeyword] = useState("");

   const { jobs, loading, error } = useSelector((state) => state.jobs);

   const handleCityChange = (city) => {
     setCity(city);
     setselectedCity(city);
   };

   const handleNicheChange = (niche) => {
     setNiche(niche);
     setSelectedNiche(niche);
   };

   const dispatch = useDispatch();

   useEffect(() => {
     if (error) {
       toast.error(error);
       dispatch(clearAllJobsErrors());
     }
     dispatch(fetchJobs(city, niche, searchKeyword));
   }, [dispatch, error, city, niche]);

   const handleSearch = () => {
     dispatch(fetchJobs(city, niche, searchKeyword));
   };

   const cities = [
     "Karachi",
     "Lahore",
     "Islamabad",
     "Rawalpindi",
     "Faisalabad",
     "Multan",
     "Hyderabad",
     "Quetta",
     "Peshawar",
     "Sialkot",
     "Gujranwala",
     "Sargodha",
     "Bahawalpur",
     "Sukkur",
     "Mardan",
     "Mingora",
     "Sheikhupura",
     "Mandi Bahauddin",
     "Larkana",
     "Nawabshah",
     "Attock",
   ];

   const nichesArray = [
     "Software Development",
     "web development",
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
   return (
     <>
       {loading ? (
         <Spinner/>
       ) : (
         <div className="jobs">
           <div className="search-wrapper border flex  w-96 py-2  mx-auto">
             <input className="outline-none "
               type="text"
               value={searchKeyword}
               onChange={(e) => setSearchKeyword(e.target.value)}
               name=""
               id=""
             />
             {/* <button onClick={handleSearch} className="ms-auto bg-yellow-500 px-2 rounded me-1">Find Job</button> */}
             <FaSearch className="mt-1 ms-auto me-2" onClick={handleSearch}/>
           </div>
    {/* Sidebar Filters (Hidden on Mobile) */}
           <div className="wrapper ms-20 mt-10 flex">
             <div className="filter-bar hidden lg:block">
             <div className="cities">
               <h4>Filter Job By City</h4>
               <hr className="w-80 mt-3 "/>
               {
                 cities.map((city , index)=>(
                   <div key={index}>
                     <input className="mt-5" type="radio" name="city" id={city} value={city} checked={selectedCity ===city} onChange={()=>handleCityChange(city)}/>
                     <label className="ms-3 text-md" htmlFor={city}>{city}</label>
                   </div>
                 ))
               }
             </div>
             <div className="niche mt-5">
               <h4>Filter Job By niche</h4>
               <hr className="w-80 mt-3 "/>
               {
                 nichesArray.map((niche , index)=>(
                   <div key={index}>
                     <input className="mt-5" type="radio" name="niche" id={niche} value={niche} checked={selectedNiche ===niche} onChange={()=>handleNicheChange(niche)}/>
                     <label className="ms-3 text-md" htmlFor={niche}>{niche}</label>
                   </div>
                 ))
               }
             </div>
             </div>
             <div className="container  mt-10">
               {/* Mobile filter */}
               <div className="mobile-filter ms-[-4rem]   block lg:hidden mb-5 text-center">
               <select  value={city} onChange={(e)=>setCity(e.target.value)}>
               <option value="">Filter By City</option>
               {
                 cities.map((city,index)=>(
                   <option value={city} key={index}>{city}</option>
                 ))
               }
               <option value=""></option>
               </select>
               <select className="ms-3" value={niche} onChange={(e)=>setNiche(e.target.value)}>
               <option value="">Filter By Niche</option>
               {
                 nichesArray.map((niche,index)=>(
                   <option value={niche} key={index}>{niche}</option>
                 ))
               }
               </select>
               </div>
               <div className="job-container grid lg:grid-cols-2 md:grid-cols-2  gap-7 ms-7 me-20">
                 {
                   jobs && jobs.map((element)=>{
                     return(
                       <div className="card border  p-5 bg-gray-200" key={element._id}>
                         {element.hiringMultiplrCandidates === "yes" ? (
                           <p className="bg-green-100 w-64 text-green-400 rounded">
                           Hiring Multiple Candidates
                         </p>
                         ):(
                           <p className="bg-blue-100 w-12 text-blue-400 rounded">
                           Hiring
                         </p>
                         )
                         }
                         <p className="title font-bold ">{element.title.toUpperCase()}</p>
                         <p className="company text-gray-500">{element.companyName}</p>
                         <p className="location text-gray-500">{element.location}</p>
                         <p className="salary text-gray-500 font-bold ">
                           <span className="text-black">Salary: Rs.</span>  {element.salary}
                         </p>
                         <p className="Posted-On text-gray-500" ><span className="font-bold text-black">Posted On:</span> {element.jobPostedOn.substring(0,10)}</p>
                         <Link className="lg:text-center" to={`/post/application/${element._id}`}><button className="bg-yellow-500 px-2 py-1 rounded">Apply Now</button> </Link>
                       </div>
                     )
                   })
                 }
               </div>
             </div>
           </div>
         </div>
       )}
     </>
   );
 };

 export default Jobs;


// import { toast } from "react-toastify";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearAllJobsErrors, fetchJobs } from "../store/slices/JobSlice";
// import Spinner from "../components/spinner";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setselectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setselectedCity(city);
//   };

//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobsErrors());
//     }
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, error, city, niche]);

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };

//   const cities = [
//     "Karachi",
//     "Lahore",
//     "Islamabad",
//     // ... more cities
//   ];

//   const nichesArray = [
//     "Software Development",
//     "web development",
//     // ... more niches
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="jobs">
//           <div className="search-wrapper border flex w-96 py-2 mx-auto">
//             <input
//               className="outline-none"
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button
//               onClick={handleSearch}
//               className="ms-auto bg-yellow-500 px-2 rounded me-1"
//             >
//               Find Job
//             </button>
//             {/* <FaSearch className="mt-1"/> */}
//           </div>

//           {/* Mobile filter */}
//           <div className="mobile-filter block lg:hidden">
//             <select value={city} onChange={(e) => setCity(e.target.value)} className="mb-3">
//               <option value="">Filter By City</option>
//               {cities.map((city, index) => (
//                 <option value={city} key={index}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//             <select value={niche} onChange={(e) => setNiche(e.target.value)}>
//               <option value="">Filter By Niche</option>
//               {nichesArray.map((niche, index) => (
//                 <option value={niche} key={index}>
//                   {niche}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="wrapper lg:flex lg:flex-row lg:space-x-5 mt-10">
//             {/* Sidebar filter */}
//             <div className="filter-bar hidden lg:block lg:w-1/4">
//               <div className="cities">
//                 <h4>Filter Job By City</h4>
//                 <hr className="w-80 mt-3" />
//                 {cities.map((city, index) => (
//                   <div key={index}>
//                     <input
//                       className="mt-5"
//                       type="radio"
//                       name="city"
//                       id={city}
//                       value={city}
//                       checked={selectedCity === city}
//                       onChange={() => handleCityChange(city)}
//                     />
//                     <label className="ms-3 text-md" htmlFor={city}>
//                       {city}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               <div className="niche mt-5">
//                 <h4>Filter Job By Niche</h4>
//                 <hr className="w-80 mt-3" />
//                 {nichesArray.map((niche, index) => (
//                   <div key={index}>
//                     <input
//                       className="mt-5"
//                       type="radio"
//                       name="niche"
//                       id={niche}
//                       value={niche}
//                       checked={selectedNiche === niche}
//                       onChange={() => handleNicheChange(niche)}
//                     />
//                     <label className="ms-3 text-md" htmlFor={niche}>
//                       {niche}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="container lg:w-3/4 mt-10">
//               <div className="job-container grid grid-cols-2 gap-7 ms-7 me-20">
//                 {jobs &&
//                   jobs.map((element) => (
//                     <div
//                       className="card border p-5 bg-gray-200"
//                       key={element._id}
//                     >
//                       {element.hiringMultiplrCandidates === "yes" ? (
//                         <p className="bg-green-100 w-64 text-green-400 rounded">
//                           Hiring Multiple Candidates
//                         </p>
//                       ) : (
//                         <p className="bg-blue-100 w-12 text-blue-400 rounded">
//                           Hiring
//                         </p>
//                       )}
//                       <p className="title font-bold">
//                         {element.title.toUpperCase()}
//                       </p>
//                       <p className="company text-gray-500">
//                         {element.companyName}
//                       </p>
//                       <p className="location text-gray-500">
//                         {element.location}
//                       </p>
//                       <p className="salary text-gray-500">
//                         <span>Salary:</span> Rs. {element.salary}
//                       </p>
//                       <p className="Posted-On text-gray-500">
//                         <span className="font-bold text-black">Posted On:</span>{" "}
//                         {element.jobPostedOn.substring(0, 10)}
//                       </p>
//                       <Link
//                         className="ms-60"
//                         to={`/post/application/${element._id}`}
//                       >
//                         <button className="bg-yellow-500 px-2 py-1 rounded">
//                           Apply Now
//                         </button>{" "}
//                       </Link>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Jobs;
