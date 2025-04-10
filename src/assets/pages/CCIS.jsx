"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { ChevronDown, ChevronLeft } from "lucide-react"

const CCIS = () => {
  // Graduate programs for CCIS
  const programs = [
    { id: 1, name: "Master of Science in Computer Science (MSCS)" },
    { id: 2, name: "Master of Science in Information Technology (MSIT)" },
    { id: 3, name: "Doctor of Philosophy in Computer Science (PhD CS)" },
  ]

  return (
    <div className="bg-gray-200 min-h-screen pb-12">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center mb-8 text-2xl">
          <Link
            to="/graduate"
            className="flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 mr-2" />
            <span>Graduate School</span>
          </Link>
          <span className="mx-4 text-gray-400">/</span>
          <span className="text-green-700 font-bold border-b-2 border-green-700 pb-1">CCIS</span>
        </div>

        {/* Programs List */}
        <div className="space-y-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ProgramCard = ({ program }) => {
  const [isOpen, setIsOpen] = useState(false)
  const years = ["2019", "2022", "2024"]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-gray-800 font-medium text-lg">{program.name}</h3>

        <div className="flex flex-wrap gap-3">
          <Link
            to="#"
            className="px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 text-center text-sm"
          >
            description
          </Link>
          <Link
            to="#"
            className="px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-all duration-300 text-center text-sm"
          >
            syllabus
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 py-2 rounded-full border border-green-700 text-green-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-1 text-sm"
            >
              curriculum
              <ChevronDown className="h-4 w-4" />
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

export default CCIS

