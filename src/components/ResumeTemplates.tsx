import React from 'react';
import { ResumeData } from './ResumeStore';

interface TemplateProps {
  data: ResumeData;
  className?: string;
}

// Modern Template
export const ModernTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white text-gray-900 font-inter ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
          </div>
          <div>
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
            {data.personalInfo.website && <p>🌐 {data.personalInfo.website}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-2">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {(project.link || project.github) && (
                      <div className="text-sm space-x-4">
                        {project.link && (
                          <a href={project.link} className="text-blue-600 hover:underline">
                            View Project
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} className="text-blue-600 hover:underline">
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-700 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-700 mb-4">Skills</h2>
              <div className="space-y-4">
                {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
                  const categorySkills = data.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-900 mb-2">{category} Skills</h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="flex justify-between items-center">
                            <span className="text-gray-700">{skill.name}</span>
                            <span className="text-xs text-blue-600 font-medium">{skill.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Classic Template
export const ClassicTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white text-gray-900 font-serif ${className}`}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center space-x-6 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="font-semibold">{exp.company}</p>
                  </div>
                  <p className="text-sm font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="mb-3">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                  <p>{edu.institution}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm font-medium">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-semibold mb-2">{category} Skills</h3>
                  <ul className="space-y-1">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="flex justify-between">
                        <span>{skill.name}</span>
                        <span className="text-sm text-gray-600">({skill.level})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold">{project.name}</h3>
                <p className="mb-2">{project.description}</p>
                <p className="text-sm text-gray-600">
                  Technologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Creative Template
export const CreativeTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900 font-inter ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8 rounded-t-2xl">
        <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {data.personalInfo.email && <p>✉️ {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📞 {data.personalInfo.phone}</p>}
          </div>
          <div className="space-y-1">
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
            {data.personalInfo.website && <p>🌐 {data.personalInfo.website}</p>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-full mr-3"></span>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-full mr-3"></span>
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                      <p className="text-purple-600 font-semibold text-lg">{exp.company}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-start space-x-2">
                              <span className="text-pink-500 mt-1">✨</span>
                              <span className="text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-full mr-3"></span>
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{skill.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-full mr-3"></span>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-full mr-3"></span>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 shadow-md border border-purple-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Executive Template
export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white text-gray-900 font-serif ${className}`}>
      {/* Header */}
      <div className="border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-between items-start">
          <div className="space-y-1 text-sm">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          </div>
          <div className="text-right text-sm">
            {data.personalInfo.linkedin && <p>LinkedIn: {data.personalInfo.linkedin}</p>}
            {data.personalInfo.website && <p>Website: {data.personalInfo.website}</p>}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Executive Summary
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 font-medium">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-lg font-semibold text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-800 mr-2">▪</span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-gray-800 pl-4">
                  <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                  <p className="font-semibold text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    Graduated: {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="border-l-4 border-gray-300 pl-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{category} Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-medium"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Notable Projects */}
      {data.projects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Notable Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-gray-800 pl-6">
                <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {project.startDate} - {project.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Academic Template
export const AcademicTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white text-gray-900 font-serif ${className}`}>
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          <div className="flex justify-center space-x-4">
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
        </div>
      </div>

      {/* Research Interests / Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Research Interests</h2>
          <p className="leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    {edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="italic">{exp.company}</p>
                  </div>
                  <p className="text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <p className="mb-2">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research Projects / Publications */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Research Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm italic mb-2">{project.startDate} - {project.endDate}</p>
                <p className="mb-2">{project.description}</p>
                <p className="text-sm">
                  <strong>Methodologies/Tools:</strong> {project.technologies.join(', ')}
                </p>
                {(project.link || project.github) && (
                  <p className="text-sm mt-1">
                    {project.link && (
                      <span>Publication: <a href={project.link} className="text-blue-600 underline">{project.link}</a></span>
                    )}
                    {project.github && (
                      <span className="ml-4">Code: <a href={project.github} className="text-blue-600 underline">{project.github}</a></span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Technical', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-semibold mb-2">{category === 'Technical' ? 'Technical Skills' : category === 'Language' ? 'Languages' : 'Other Skills'}</h3>
                  <ul className="space-y-1">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="flex justify-between">
                        <span>{skill.name}</span>
                        <span className="text-sm text-gray-600">({skill.level})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

// New Templates
const MinimalistTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg ${className}`}>
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-700 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const TechTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-slate-900 text-white p-8 shadow-lg ${className}`}>
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-blue-100">
          <span>📧 {data.personalInfo.email}</span>
          <span>📱 {data.personalInfo.phone}</span>
          <span>📍 {data.personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">About</h2>
          <p className="text-slate-300">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">💼 Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                  <span className="text-blue-300 text-sm bg-blue-900 px-2 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-blue-300 font-medium mb-2">{exp.company}</p>
                <p className="text-slate-300 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">🛠️ Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-slate-800 p-3 rounded-lg text-center">
                <span className="text-white font-medium">{skill.name}</span>
                <div className="text-xs text-blue-300 mt-1">{skill.level}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const resumeTemplates = {
  modern: { name: 'Modern', component: ModernTemplate, description: 'Clean and professional for tech roles' },
  classic: { name: 'Classic', component: ClassicTemplate, description: 'Traditional format for conservative industries' },
  creative: { name: 'Creative', component: CreativeTemplate, description: 'Colorful and unique for creative roles' },
  executive: { name: 'Executive', component: ExecutiveTemplate, description: 'Sophisticated layout for senior positions' },
  academic: { name: 'Academic', component: AcademicTemplate, description: 'Detailed format for research and education' },
  minimalist: { name: 'Minimalist', component: MinimalistTemplate, description: 'Clean and simple design with focus on content' },
  tech: { name: 'Tech Pro', component: TechTemplate, description: 'Dark theme perfect for developers and tech professionals' },
};