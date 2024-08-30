import React from 'react'

const TopNiches = () => {
    const services = [
        {
          id: 1,
          service: "Software Development",
          description:
            "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
        },
        {
          id: 2,
          service: "Web Development",
          description:
            "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
        },
        {
          id: 3,
          service: "Data Science",
          description:
            "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
        },
        {
          id: 4,
          service: "Cloud Computing",
          description:
            "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
        },
        {
          id: 5,
          service: "DevOps",
          description:
            "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
        },
        {
          id: 6,
          service: "Mobile App Development",
          description:
            "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
        },
      ];
  return (
    <>
    <h3 className='mt-36 text-center font-bold text-2xl text-yellow-500'>TOP NICHES</h3>
    <div className="lg:mx-36 sm:mx-5   mt-10 grid lg:grid-cols-3 md:grid-cols-2  gap-7 ">
        {
            services.map(element=>{
                return(
                    <div className="card border p-3 bg-black text-white rounded hover:bg-yellow-500 hover:text-black hover:shadow-2xl" key={element.id}>
                        <h4 className='font-bold'>{element.service}</h4>
                        <p className='pt-2'>{element.description}</p>
                    </div>
                )
            })
        }
    </div>
    </>
  )
}

export default TopNiches