import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Member from '../components/Member'

function About() {

  return (
<>
<Navbar />
<div className="min-h-screen px-4 py-10 mt-20 sm:px-6 lg:px-20 bg-white">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-4xl font-extrabold text-red-600 mb-4">About the team</h1>
    <p className="text-gray-800 text-base leading-relaxed max-w-2xl mb-8">
      We are a team of visionary builders, creating cutting-edge solutions driven by impactful ideas.
      Our mission is to build products that solve real problems and make people's lives easier.
    </p>

    <h2 className="text-2xl font-bold text-red-600 mb-6">Meet the team!</h2>

    {/* Team Members Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Member
        name="Fuzail Mansuri"
        intro="Fuzail is a last year BCA student from SOU. He is into tech since he created his first index.html (in Oct, 2021). Now he is learning AI/ML, and has built several projects. His vision is to build products that help people and make their lives better. He also likes to read books, learn history and write. He believes that you need multiple skills to build a successful business."
        occupation="Team Leader - Backend, DB & ML"
        link="https://fuzailmansuri.com"
        linkText="Website"
      />

      <Member
        name="Abrar Patel"
        intro="Abrar is a BCA student from SOU. He is a very brilliant and collaborative student who believes in teamwork."
        occupation="Co-lead - Backend/Deployment"
        link="https://www.linkedin.com/in/abrar-patel-5b06692a4/"
        linkText="LinkedIn"
      />

<Member
        name="Shahid Mansuri"
        intro="Shahid is a BCA Student from Silver Oak University."
        occupation="UI/UX"
        link="https://www.linkedin.com/in/shahid-mansuri-74386227a/"
        linkText="LinkedIn"
      />
      
      <Member
        name="Sameer Baloch"
        intro="Sameer is a BCA Student from Silver Oak University."
        occupation="Frontend"
        link="https://www.linkedin.com/in/sameer-baloch-9ab93629a/"
        linkText="Linkedin"
      />

   
    </div>
  </div>
</div>
<Footer />

</>
  )
}

export default About