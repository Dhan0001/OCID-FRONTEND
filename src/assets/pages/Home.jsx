const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Responsive OCID Banner - Same image for all devices */}
      <div className="relative w-full">
        {/* Single responsive banner for all screen sizes */}
        <div className="w-full overflow-hidden">
          <img
            src="/images/ocid-banner1.png"
            alt="OCID Banner"
            className="w-full h-auto object-cover max-h-[200px] md:max-h-none"
            loading="eager"
          />
        </div>
      </div>

      {/* Statue Image Section - Reduced height on mobile */}
      <div className="w-full h-[80px] sm:h-[120px] md:h-[200px] bg-[url('/placeholder.svg?height=200&width=940')] bg-center bg-cover"></div>

      {/* Content Sections with Cream Background */}
      <div className="bg-[#fffde7] py-6 sm:py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Our Vision */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6 relative">
              Our Vision
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center text-sm md:text-base max-w-2xl mx-auto text-gray-700 mt-6">
              A socially-engaged digital, innovation, and entrepreneurial university excelling globally in science,
              engineering, and the arts by 2028.
            </p>
          </div>

          {/* Our Mission */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6 relative">
              Our Mission
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center text-sm md:text-base max-w-2xl mx-auto text-gray-700 mt-6">
              As a transformative university, CSU is a responsible steward of problem-solvers and value creators who are
              driven to create a sustainable future for the region, the nation, and beyond.
            </p>
          </div>

          {/* General Mandate - Simplified on mobile */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6 relative">
              General Mandate
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center text-sm md:text-base max-w-3xl mx-auto text-gray-700 mt-6">
              Caraga State University provides advanced education in agriculture, environmental studies, engineering,
              technology, arts and sciences. We focus on research, extension services, and leadership in our
              specializations.
            </p>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6 relative">
              Core Values
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-green-700"></span>
            </h2>
            <p className="text-center text-sm md:text-base max-w-2xl mx-auto text-gray-700 mt-6">
              Competence Service; and Uprightness
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Spacer - Reduced height on mobile */}
      <div className="bg-gray-200 h-[60px] sm:h-[100px] md:h-[200px] w-full"></div>
    </div>
  )
}

export default Home
