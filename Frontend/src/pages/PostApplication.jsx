import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postApplication, resetApplicationSlice, clearAllApplicationErrors } from '../store/slices/application';
import { toast } from 'react-toastify';
import { fetchSingleJob } from '../store/slices/JobSlice';
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector(state => state.jobs);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { loading, error, message } = useSelector(state => state.applications);

  const { jobId } = useParams();

  const [name, setName] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddress] = useState(user ? user.address : '');
  const [phone, setPhone] = useState(user ? user.phoneNumber : '');
  const [coverLetter, setCoverLetter] = useState(user ? user.coverLetter : '');
  const [resume, setResume] = useState(user && user.resume ? user.resume.url : '');

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(postApplication(formData, jobId));
  }

  useEffect(() => {
    
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];

  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(".");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(".");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(".");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  }
  // console.log("User Object: ", user);
  // console.log("Is Authenticated: ", isAuthenticated)
  // console.log("User Role: ", user?.role)
  // console.log("User State: ", useSelector(state => state.user));


  return (
    <>
    
      <article className='mt-24 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-7 lg:mx-24 md:mx-auto sm:mx-auto'>
        {
          
          user && (
            <form className=" mb-6">
              <h3 className="grid grid-cols-1 gap-2 w-[42vw] mx-auto mb-5 text-2xl font-bold">Application Form</h3>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label htmlFor="">Job Title</label>
                <input className='border py-2 ps-1 w-full rounded' type="text" name="" id="" placeholder={singleJob.title} disabled />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Name</label>
                <input className='border py-2 ps-1 w-full rounded' type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Email</label>
                <input className='border py-2 ps-1 w-full rounded' type="text" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Phone Number</label>
                <input className='border py-2 ps-1 w-full rounded' type="number" name="" id="" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Address</label>
                <input className='border py-2 ps-1 w-full rounded' type="text" name="" id="" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Cover Letter</label>
                <textarea className='border py-2 ps-1 w-full rounded' value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={10} />
              </div>
              <div className="grid grid-cols-1 gap-2 w-[42vw] mx-auto">
                <label>Your Resume</label>
                <input className='mt-3' type="file" name="" id="" onChange={resumeHandler} />
              </div>
              {isAuthenticated && user.role === "Job Seaker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
            </form>
          )
        }

        <div className='lg:mx-2 md:mx-auto sm:mx-auto lg:w-full mb-5'>
          <header className='mb-3'>
            <h3 className='text-2xl font-semibold'>{singleJob.title}</h3>
            {
              singleJob.personalWebsite && (
                <Link className='text-gray-400' to={singleJob.personalWebsite}>{singleJob.personalWebsite}</Link>
              )
            }
            <p className='text-gray-400 text-sm leading-6'>{singleJob.location}</p>
            <p className='text-gray-400 text-sm leading-6'>Rs. {singleJob.salary} a month</p>
          </header>
          <hr className='border' />
          <section>
            <div className="wrapper my-4">
              <h3 className='text-xl font-medium'>Job Details</h3>
              <div>
                <div className="flex text-sm">
                  <IoMdCash className='mt-1' />
                  <span className='ms-2 text-gray-400 leading-6'>Pay</span>
                </div>
                <div>
                  <span className='ms-5 text-gray-400 text-sm leading-6'>{singleJob.salary} a month</span>
                </div>
              </div>
              <div className=''>
                <div className="flex text-sm leading-6">
                  <FaToolbox className='mt-1' />
                  <span className='ms-2 text-gray-400'>Job Type</span>
                </div>
                <div>
                  <span className='ms-6 text-gray-400 text-sm leading-6'>{singleJob.jobType}</span>
                </div>
              </div>
            </div>

            <hr className='border' />

            <div className="wrapper my-4">
              <h3 className='text-xl font-medium'>Location</h3>
              <div className='flex text-gray-400 text-sm leading-6'>
                <FaLocationDot className='mt-1' />
                <span className='ms-2'>{singleJob.location}</span>
              </div>
            </div>

            <hr className='border' />

            <div className="wrapper my-4">
              <h3 className='text-xl font-medium'>Full Job Description</h3>
              <p className='text-gray-400 text-sm leading-6'>{singleJob.introduction}</p>
              {
                singleJob.qualifications && (
                  <div className="mt-2">
                    <h4 className='text-xl font-medium'>Qualifications</h4>
                    <ul>
                      {
                        qualifications.map((element) => (
                          <li key={element} className="ms-5 list-disc text-gray-400 text-sm leading-6">
                            {element}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
              {
                singleJob.responsibilities && (
                  <div className="mt-2">
                    <h4 className='text-xl font-medium'>Responsibilities</h4>
                    <ul>
                      {
                        responsibilities.map((element) => (
                          <li key={element} className="ms-5 list-disc text-gray-400 text-sm leading-6">
                            {element}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
              {
                singleJob.offers && (
                  <div className="mt-2">
                    <h4 className='text-xl font-medium'>What we are offering</h4>
                    <ul>
                      {
                        offering.map((element) => (
                          <li key={element} className="ms-5 list-disc text-gray-400 text-sm leading-6">
                            {element}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default PostApplication;
