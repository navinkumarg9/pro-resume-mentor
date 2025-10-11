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
        <div className="flex items-center gap-6">
          <img
            src={data.personalInfo.profilePhoto || '/placeholder.svg'}
            alt={`${data.personalInfo.fullName || 'Profile'} photo`}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/50"
            loading="lazy"
          />
          <div className="flex-1">
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

// Executive Template - Sophisticated for senior positions
const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-white text-gray-900 ${className}`}>
    {/* Letterhead Style Header */}
    <div className="border-b-2 border-gray-800 pb-6 mb-8">
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-3">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center space-x-6 text-sm text-gray-700">
          <span className="flex items-center">
            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
            {data.personalInfo.email}
          </span>
          <span className="flex items-center">
            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center">
            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
            {data.personalInfo.location}
          </span>
        </div>
      </div>
    </div>

    {/* Executive Summary */}
    {data.personalInfo.summary && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wider">
          Executive Summary
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
      </div>
    )}

    {/* Professional Experience */}
    {data.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wider">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-medium text-lg">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600 font-medium">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <div className="pl-4 border-l-2 border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-gray-400 mr-2">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education & Core Competencies */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wider">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wider">
            Core Competencies
          </h2>
          <div className="space-y-3">
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-medium text-gray-900 mb-1">{category} Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span key={skill.id} className="text-gray-700 text-sm">
                        {skill.name}
                        {skill !== categorySkills[categorySkills.length - 1] && categorySkills.length > 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Corporate Template - Clean corporate look
const CorporateTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-white text-gray-900 ${className}`}>
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-medium mr-2">Email:</span>
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Phone:</span>
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Location:</span>
            {data.personalInfo.location}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Accomplishments:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-blue-600 mr-2">●</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              Technical Skills
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 gap-4">
                {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
                  const categorySkills = data.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span key={skill.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600 font-semibold">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Legal Template - Conservative for legal/finance
const LegalTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-white text-gray-900 font-serif ${className}`}>
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="flex justify-center space-x-8">
            <span>{data.personalInfo.email}</span>
            <span>{data.personalInfo.phone}</span>
          </div>
          <div>{data.personalInfo.location}</div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase text-center">
            Professional Profile
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                    <p className="font-semibold text-gray-800">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 mb-3 text-justify">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 text-sm">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-800">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-700">Magna Cum Laude, GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm text-gray-700 font-medium">{edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bar Admissions / Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Professional Qualifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{category === 'Technical' ? 'Bar Admissions & Technical Skills' : category}</h3>
                  <ul className="space-y-1">
                    {categorySkills.map((skill) => (
                      <li key={skill.id} className="text-gray-700 text-sm">• {skill.name}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Healthcare Template - For medical professionals
const HealthcareTemplate: React.FC<TemplateProps> = ({ data, className = "" }) => (
  <div className={`max-w-4xl mx-auto bg-white text-gray-900 ${className}`}>
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📧</span>
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📱</span>
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📍</span>
            {data.personalInfo.location}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-600 mr-3 rounded"></span>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg border-l-4 border-green-200">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Clinical Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center">
            <span className="w-2 h-6 bg-green-600 mr-3 rounded"></span>
            Clinical Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-green-200 rounded-lg p-6 bg-green-50/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-green-700 font-semibold text-lg">{exp.company}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities & Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-green-600 mr-2 mt-1">⚕</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-600 mr-3 rounded"></span>
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-green-700 font-semibold">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Certifications */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-600 mr-3 rounded"></span>
              Skills & Certifications
            </h2>
            <div className="space-y-4">
              {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category === 'Technical' ? 'Medical Skills & Certifications' : category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span key={skill.id} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Sales Template - Orange/Yellow theme
export const SalesTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
        {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
        {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
        {data.personalInfo.website && <p>🌐 {data.personalInfo.website}</p>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="border-l-4 border-orange-500 pl-4">
          <h2 className="text-2xl font-bold text-orange-600 mb-3">Professional Summary</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 border-l-2 border-orange-300 pl-4">
              <h3 className="font-bold text-lg">{exp.position}</h3>
              <p className="text-orange-600 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="mt-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-orange-600 mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-orange-600">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-orange-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
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

// Finance Template - Green/Teal theme
export const FinanceTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="border-b-4 border-teal-600 pb-6 mb-6 p-8">
      <h1 className="text-3xl font-bold text-teal-900 mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        {data.personalInfo.email && <span>✉️ {data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>☎️ {data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="px-8 pb-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-teal-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-teal-800 mb-2">Professional Profile</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-teal-800 mb-4 uppercase tracking-wide">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-teal-100">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg text-teal-900">{exp.position}</h3>
                  <p className="text-teal-700 font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-teal-800 mb-3 uppercase tracking-wide">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 bg-teal-50 p-3 rounded">
                <h3 className="font-semibold text-teal-900">{edu.degree}</h3>
                <p className="text-teal-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-teal-800 mb-3 uppercase tracking-wide">Core Competencies</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  <span className="text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Engineering Template - Navy/Cyan theme
export const EngineeringTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-slate-50 text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-slate-800 to-cyan-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-4 text-sm opacity-90">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-cyan-600"></span>
            Technical Summary
          </h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-cyan-600"></span>
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-slate-200 last:border-0">
              <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
              <p className="text-cyan-700 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-none space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-cyan-600">▸</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-600"></span>
              Technical Skills
            </h2>
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <div key={category} className="mb-3">
                  <h3 className="font-semibold text-sm text-slate-700 mb-1">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {categorySkills.map((skill) => (
                      <span key={skill.id} className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {data.education.length > 0 && (
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-600"></span>
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                <p className="text-cyan-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Design Portfolio Template - Vibrant multi-color
export const DesignTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900 ${className}`}>
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          {data.personalInfo.email && <p className="flex items-center gap-2"><span className="text-pink-500">●</span>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p className="flex items-center gap-2"><span className="text-purple-500">●</span>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p className="flex items-center gap-2"><span className="text-blue-500">●</span>{data.personalInfo.location}</p>}
          {data.personalInfo.website && <p className="flex items-center gap-2"><span className="text-indigo-500">●</span>{data.personalInfo.website}</p>}
        </div>
      </div>
      {data.personalInfo.summary && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-gray-200 last:border-0">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  idx % 3 === 0 ? 'bg-pink-500' : idx % 3 === 1 ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className="text-purple-600 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={skill.id} className={`px-3 py-1 rounded-full text-white text-sm ${
                  idx % 3 === 0 ? 'bg-pink-500' : idx % 3 === 1 ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-purple-600">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Consulting Template - Gray/Blue professional
export const ConsultingTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-gray-700 to-blue-700 text-white p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-4 text-sm">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>|</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>|</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="border-l-4 border-blue-700 pl-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                  <p className="text-blue-700 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  {exp.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-6">
        {data.education.length > 0 && (
          <div className="col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">Skills</h2>
            <div className="space-y-1">
              {data.skills.slice(0, 10).map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">• {skill.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Education Template - Warm brown/orange
export const EducationTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-amber-50 text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white p-8">
      <h1 className="text-4xl font-serif font-bold mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {data.personalInfo.email && <p>✉ {data.personalInfo.email}</p>}
        {data.personalInfo.phone && <p>☎ {data.personalInfo.phone}</p>}
        {data.personalInfo.location && <p>⌂ {data.personalInfo.location}</p>}
        {data.personalInfo.website && <p>⊕ {data.personalInfo.website}</p>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-amber-800 mb-3">Teaching Philosophy</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.education.length > 0 && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-amber-800 mb-4">Academic Credentials</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 pb-4 border-b border-amber-200 last:border-0">
              <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
              <p className="text-amber-700 font-semibold">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-amber-800 mb-4">Teaching Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 pb-4 border-b border-amber-200 last:border-0">
              <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
              <p className="text-amber-700 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      {data.skills.length > 0 && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-amber-800 mb-3">Areas of Expertise</h2>
          <div className="grid grid-cols-3 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-amber-100 text-amber-900 px-3 py-2 rounded-md text-center text-sm font-medium">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Nonprofit Template - Earth tones
export const NonprofitTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-3 text-sm">
        {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="border-l-4 border-emerald-600 pl-4 bg-emerald-50 p-4 rounded-r-lg">
          <h2 className="text-xl font-bold text-emerald-800 mb-2">Mission Statement</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-emerald-700 mb-4 pb-2 border-b-2 border-emerald-200">Impact & Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
              <p className="text-emerald-700 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <div className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-2 text-gray-700">
                      <span className="text-emerald-600">✓</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-emerald-700 mb-3 pb-2 border-b-2 border-emerald-200">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 bg-emerald-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-emerald-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-emerald-700 mb-3 pb-2 border-b-2 border-emerald-200">Core Competencies</h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Real Estate Template - Gold/Brown
export const RealEstateTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-yellow-600 to-amber-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-3 tracking-wide">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {data.personalInfo.email && <p>✉ {data.personalInfo.email}</p>}
        {data.personalInfo.phone && <p>☎ {data.personalInfo.phone}</p>}
        {data.personalInfo.location && <p>⌂ {data.personalInfo.location}</p>}
        {data.personalInfo.website && <p>⊕ {data.personalInfo.website}</p>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5">
          <h2 className="text-2xl font-bold text-amber-800 mb-3">Professional Profile</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4 pb-2 border-b-4 border-amber-300">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pl-6 border-l-4 border-amber-300">
              <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
              <p className="text-amber-700 font-bold text-lg">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-none space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-600 font-bold">★</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-amber-800 mb-3 pb-2 border-b-2 border-amber-300">Education & Credentials</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 bg-amber-50 p-3 rounded-lg">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-amber-700 font-semibold">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-amber-800 mb-3 pb-2 border-b-2 border-amber-300">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="bg-amber-200 text-amber-900 px-3 py-1 rounded-md font-semibold text-sm">
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

// Hospitality Template - Burgundy/Cream
export const HospitalityTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-rose-50 text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-rose-800 to-red-700 text-white p-8">
      <h1 className="text-4xl font-serif font-bold mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-4 text-sm opacity-95">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-rose-700">
          <h2 className="text-2xl font-serif font-bold text-rose-800 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-rose-800 mb-4">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-rose-200 last:border-0">
              <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
              <p className="text-rose-700 font-semibold text-lg">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  {exp.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-serif font-bold text-rose-800 mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-rose-700">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-serif font-bold text-rose-800 mb-3">Skills & Expertise</h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-rose-100 text-rose-900 px-3 py-2 rounded-md">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Media Template - Bold colors
export const MediaTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-slate-900 text-white ${className}`}>
    <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 p-8">
      <h1 className="text-5xl font-black mb-3 tracking-tight">{data.personalInfo.fullName || 'YOUR NAME'}</h1>
      <div className="flex flex-wrap gap-3 text-sm font-semibold">
        {data.personalInfo.email && <span className="bg-white/20 px-3 py-1 rounded">{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span className="bg-white/20 px-3 py-1 rounded">{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span className="bg-white/20 px-3 py-1 rounded">{data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-slate-800 rounded-lg p-5 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">ABOUT</h2>
          <p className="text-gray-300 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-5">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">EXPERIENCE</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-slate-700 last:border-0">
              <h3 className="font-bold text-xl text-white">{exp.position}</h3>
              <p className="text-red-400 font-bold text-lg">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-300 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-none space-y-1 text-gray-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-yellow-400">▶</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-5">
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={skill.id} className={`px-3 py-1 rounded font-bold text-sm ${
                  idx % 3 === 0 ? 'bg-red-600' : idx % 3 === 1 ? 'bg-yellow-600' : 'bg-blue-600'
                }`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-5">
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold text-white">{edu.degree}</h3>
                <p className="text-red-400 font-semibold">{edu.institution}</p>
                <p className="text-sm text-gray-400">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Startup Template - Bright modern
export const StartupTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-white text-gray-900 ${className}`}>
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
      <h1 className="text-5xl font-extrabold mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-3 text-sm">
        {data.personalInfo.email && <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">{data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">🚀 About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
            💼 Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-l-4 border-indigo-500">
              <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
              <p className="text-indigo-600 font-bold">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">⚡ Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-purple-700 mb-3">🎓 Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-purple-600 font-semibold">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Data Science Template - Purple/Blue
export const DataScienceTemplate: React.FC<TemplateProps> = ({ data, className = '' }) => (
  <div className={`bg-slate-50 text-gray-900 ${className}`}>
    <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-2 font-mono">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="flex flex-wrap gap-3 text-sm font-mono">
        {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {data.personalInfo.summary && (
        <div className="bg-white rounded-lg p-5 shadow-md border-t-4 border-violet-600">
          <h2 className="text-xl font-bold text-violet-800 mb-3 font-mono">&gt; PROFILE</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-xl font-bold text-violet-800 mb-4 font-mono">&gt; EXPERIENCE</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 pb-5 border-b border-violet-200 last:border-0">
              <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
              <p className="text-violet-700 font-semibold">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2 font-mono">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <div className="bg-violet-50 p-3 rounded mt-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-2 text-gray-700 mb-1">
                      <span className="text-violet-600 font-mono">[+]</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {data.skills.length > 0 && (
          <div className="bg-white rounded-lg p-5 shadow-md border-t-4 border-indigo-600">
            <h2 className="text-xl font-bold text-indigo-800 mb-3 font-mono">&gt; SKILLS</h2>
            {['Technical', 'Soft', 'Language', 'Other'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <div key={category} className="mb-3">
                  <h3 className="font-semibold text-sm text-indigo-700 mb-1 font-mono">{category.toUpperCase()}</h3>
                  <div className="flex flex-wrap gap-1">
                    {categorySkills.map((skill) => (
                      <span key={skill.id} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-mono">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {data.education.length > 0 && (
          <div className="bg-white rounded-lg p-5 shadow-md border-t-4 border-blue-600">
            <h2 className="text-xl font-bold text-blue-800 mb-3 font-mono">&gt; EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 bg-blue-50 p-3 rounded">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-700">{edu.institution}</p>
                <p className="text-sm text-gray-600 font-mono">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export const resumeTemplates = {
  modern: { name: 'Modern', component: ModernTemplate, description: 'Clean and professional for tech roles' },
  classic: { name: 'Classic', component: ClassicTemplate, description: 'Traditional format for conservative industries' },
  minimal: { name: 'Minimal', component: MinimalistTemplate, description: 'Clean and simple design with focus on content' },
  professional: { name: 'Professional', component: CorporateTemplate, description: 'Corporate-friendly layout with structured sections' },
  creative: { name: 'Creative', component: CreativeTemplate, description: 'Colorful and unique for creative roles' },
  executive: { name: 'Executive', component: ExecutiveTemplate, description: 'Sophisticated layout for senior positions' },
  elegant: { name: 'Elegant', component: AcademicTemplate, description: 'Refined and elegant design with subtle styling' },
  corporate: { name: 'Corporate', component: CorporateTemplate, description: 'Professional corporate design with clean structure' },
  legal: { name: 'Legal', component: LegalTemplate, description: 'Conservative template for legal and finance professionals' },
  healthcare: { name: 'Healthcare', component: HealthcareTemplate, description: 'Professional template for medical professionals' },
  contemporary: { name: 'Contemporary', component: TechTemplate, description: 'Modern design with fresh styling elements' },
  academic: { name: 'Academic', component: AcademicTemplate, description: 'Scholarly format for academic and research positions' },
  sales: { name: 'Sales', component: SalesTemplate, description: 'Dynamic orange design for sales and marketing professionals' },
  finance: { name: 'Finance', component: FinanceTemplate, description: 'Professional teal design for finance and banking roles' },
  engineering: { name: 'Engineering', component: EngineeringTemplate, description: 'Technical slate design for engineering professionals' },
  design: { name: 'Design Portfolio', component: DesignTemplate, description: 'Vibrant multi-color template for designers and creatives' },
  consulting: { name: 'Consulting', component: ConsultingTemplate, description: 'Professional gray/blue template for consultants' },
  education: { name: 'Education', component: EducationTemplate, description: 'Warm template for educators and trainers' },
  nonprofit: { name: 'Nonprofit', component: NonprofitTemplate, description: 'Earth-tone template for nonprofit sector' },
  realestate: { name: 'Real Estate', component: RealEstateTemplate, description: 'Luxurious gold template for real estate professionals' },
  hospitality: { name: 'Hospitality', component: HospitalityTemplate, description: 'Elegant burgundy template for hospitality industry' },
  media: { name: 'Media', component: MediaTemplate, description: 'Bold colorful template for media and entertainment' },
  startup: { name: 'Startup', component: StartupTemplate, description: 'Modern gradient template for startup environments' },
  datascience: { name: 'Data Science', component: DataScienceTemplate, description: 'Tech-focused template for data scientists and analysts' },
};