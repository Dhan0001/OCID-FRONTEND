const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Statue Background */}
      <div className="relative w-full h-[300px] bg-green-700 flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=940')] bg-right bg-no-repeat opacity-30"></div>
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
              OFFICE OF CURRICULUM AND
              <br />
              INSTRUCTION DEVELOPMENT
            </h1>
            <div className="mt-8">
              <button className="px-6 py-2 bg-white text-green-700 font-medium hover:bg-gray-100 transition-colors duration-300 uppercase text-sm">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statue Image Section */}
      <div className="w-full h-[200px] bg-[url('/placeholder.svg?height=200&width=940')] bg-center bg-cover"></div>

      {/* Content Sections with Cream Background */}
      <div className="bg-[#fffde7] py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Our Vision */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 relative">
              Our Vision
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center max-w-2xl mx-auto text-gray-700 mt-8">
              A socially-engaged digital, innovation, and entrepreneurial university excelling globally in science,
              engineering, and the arts by 2028.
            </p>
          </div>

          {/* Our Mission */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 relative">
              Our Mission
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center max-w-2xl mx-auto text-gray-700 mt-8">
              As a transformative university, CSU is a responsible steward of problem-solvers and value creators who are
              driven to create a sustainable future for the region, the nation, and beyond.
            </p>
          </div>

          {/* General Mandate */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 relative">
              General Mandate
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-gray-700 mt-8">
              Caraga State University shall primarily provide advanced education, higher technological, professional
              instruction and training in the fields of agriculture and environmental studies, fishery, engineering,
              forestry, industrial technology, education, law, medicine and other health related programs, information
              technology, arts and sciences and other related courses. It shall undertake research and extension
              services, and provide progressive leadership in its areas of specialization.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 relative">
              Core Values
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center max-w-2xl mx-auto text-gray-700 mt-8">Competence Service; and Uprightness</p>
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="bg-gray-200 h-[200px] w-full"></div>
    </div>
  )
}

export default Home
