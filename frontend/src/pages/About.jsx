import React from 'react';

function About() {
  return (
    <div className="container mx-auto my-16 px-4 lg:px-32">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8">About</h1>

      {/* About Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          This is Akhil K, a proficient full stack developer with a robust skill set spanning both front-end and back-end technologies. With a passion for building dynamic, responsive, and user-friendly web applications, Akhil excels in crafting seamless digital experiences.
        </p>

        {/* Technical Expertise Section */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Technical Expertise:</h2>
        <p className="text-lg text-gray-700 mb-8">
          Front-End: Adept in modern JavaScript frameworks and libraries such as React.js, Angular, and Vue.js. Skilled in HTML5, CSS3, and responsive design principles to create intuitive and visually appealing interfaces.
          <br />
          Back-End: Proficient in server-side technologies including Node.js, Express.js, and Django. Experienced with database management using SQL and NoSQL databases like MySQL, PostgreSQL, and MongoDB.
          <br />
          DevOps: Knowledgeable in containerization and orchestration tools such as Docker and Kubernetes. Familiar with continuous integration and deployment (CI/CD) pipelines.
          <br />
          Cloud Services: Experience with cloud platforms like AWS, Azure, and Google Cloud, enabling scalable and reliable application deployment.
        </p>

        {/* Professional Highlights Section */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Professional Highlights:</h2>
        <p className="text-lg text-gray-700 mb-8">
          Successfully developed and deployed numerous full-stack applications, demonstrating strong problem-solving skills and a keen eye for detail. Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.
          <br />
          Continuously learning and adapting to emerging technologies and industry trends to stay ahead in the fast-evolving tech landscape.
        </p>

        {/* Personal Interests Section */}
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Personal Interests and Inspiration:</h2>
        <p className="text-lg text-gray-700">
          Beyond his professional achievements, Akhil is a big fan of cricket and holds immense admiration for King Kohli. His favorite person and biggest inspiration is his twin brother, Ankush. Their friendly rivalry and deep bond have significantly shaped Akhil’s journey.
          <br />
          Ankush is not only a great competitor but also a steadfast friend, constantly motivating Akhil to strive for excellence.
        </p>
      </div>

     
    </div>
  );
}

export default About;
