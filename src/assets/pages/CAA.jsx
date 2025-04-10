"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const CAA = () => {
  const programs = [
    { id: 1, name: "Bachelor of Science in Computer Science (BSCS)" },
    { id: 2, name: "Bachelor of Science in Information Technology (BSIT)" },
    { id: 3, name: "Bachelor of Science in Information System (BSIS)" },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-wrap mb-10">
        <div className="switch">
          <div className="flex gap-8">
            <button
              className="text-gray-500 text-2xl px-0 flex items-center hover:text-green-700 transition-colors duration-200"
              onClick={() => (window.location.href = "/colleges")}
            >
              <span className="inline-block mr-2">←</span>
              Graduate School
            </button>
            <div className="relative">
              <button className="text-green-700 text-2xl font-bold px-0">CAA</button>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-5">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}

const ProgramCard = ({ program }) => {
  const [isOpen, setIsOpen] = useState(false)
  const years = ["2019", "2022", "2024"]

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="container flex flex-col md:flex-row md:justify-end gap-3 p-5 relative">
        <div className="text-container md:absolute md:left-6 md:top-1/2 md:transform md:-translate-y-1/2 font-bold mb-4 md:mb-0 text-gray-800">
          <p>{program.name}</p>
        </div>
        <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-3 md:ml-auto">
          <Link
            to="#"
            className="inline-block px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 text-center shadow-sm hover:shadow-md"
          >
            description
          </Link>
          <Link
            to="#"
            className="inline-block px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 text-center shadow-sm hover:shadow-md"
          >
            syllabus
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full md:w-[120px] h-[40px] flex items-center justify-center px-4 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Curriculum
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg">
                <ul className="py-1">
                  {years.map((year) => (
                    <li key={year}>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {year}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CAA

