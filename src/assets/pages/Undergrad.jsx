"use client"

import { Link } from "react-router-dom"

const Undergrad = () => {
  const collegeLogos = [
    {
      id: "CAA",
      path: "/caa-undergrad", // Updated to point to the undergraduate CAA page
      fullName: "COLLEGE OF AGRICULTURE AND AGRI-INDUSTRIES",
      color: "#3E7B31",
      logo: "/images/caa-logo.png",
    },
    {
      id: "CCIS",
      path: "/ccis-undergrad", // Updated to point to the undergraduate CCIS page
      fullName: "COLLEGE OF COMPUTING AND INFORMATION SCIENCES",
      color: "#8B2E00",
      logo: "/images/ccis-logo.png",
    },
    {
      id: "CED",
      path: "/ced-undergrad",
      fullName: "COLLEGE OF EDUCATION",
      color: "#0047AB",
      logo: "/images/ced-logo.png",
    },
    {
      id: "COFES",
      path: "/cofes-undergrad",
      fullName: "COLLEGE OF FORESTRY AND ENVIRONMENTAL SCIENCES",
      color: "#3E7B31",
      logo: "/images/cofes-logo.png",
    },
    {
      id: "CHASS",
      path: "/chass-undergrad",
      fullName: "COLLEGE OF HUMANITIES, ARTS AND SOCIAL SCIENCES",
      color: "#7E3794",
      logo: "/images/chass-logo.png",
    },
    {
      id: "CEGS",
      path: "/cegs-undergrad",
      fullName: "COLLEGE OF ENGINEERING AND GEO-SCIENCES",
      color: "#C45500",
      logo: "/images/cegs-logo.png",
    },
    {
      id: "CMNS",
      path: "/cmns-undergrad",
      fullName: "COLLEGE OF MATHEMATICS AND NATURAL SCIENCES",
      color: "#008080",
      logo: "/images/cmns-logo.png",
    },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Tab Navigation */}
      <div className="mb-10">
        <div className="flex gap-8">
          <button
            className="text-gray-500 text-2xl px-0 hover:text-green-700 transition-colors duration-200"
            onClick={() => (window.location.href = "/colleges")}
          >
            Graduate School
          </button>
          <div className="relative">
            <button className="text-green-700 text-2xl font-bold px-0">Under-Graduate</button>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {collegeLogos.map((college) => (
          <div key={college.id} className="mb-4">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-[350px] flex flex-col items-center justify-between p-6">
              {/* Logo */}
              <div className="flex-1 w-full flex flex-col items-center justify-center mb-4">
                <div className="w-[180px] h-[180px] flex items-center justify-center bg-white rounded-xl mb-5 overflow-hidden">
                  <img
                    src={college.logo || "/placeholder.svg"}
                    alt={`${college.id} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">
                    <span className="text-gray-700">CSU</span>
                    <span style={{ color: college.color }}>{college.id}</span>
                  </h3>
                  <p
                    className="text-xs uppercase tracking-wide text-center mt-2 max-w-[200px] mx-auto font-medium"
                    style={{ color: college.color }}
                  >
                    {college.fullName}
                  </p>
                </div>
              </div>

              {/* View Button */}
              <Link
                to={college.path}
                className="inline-block px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 text-center w-[100px] shadow-sm hover:shadow-md"
              >
                view
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Undergrad

