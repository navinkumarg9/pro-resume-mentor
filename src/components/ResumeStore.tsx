import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Other';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Beginner';
}

export interface Interest {
  id: string;
  name: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: Interest[];
  customSections?: CustomSection[];
  templateId: string;
}

interface ResumeState {
  resumeData: ResumeData;
  analysisScore: number;
  suggestions: string[];
  isLoading: boolean;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Language }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<Language> } }
  | { type: 'DELETE_LANGUAGE'; payload: string }
  | { type: 'ADD_INTEREST'; payload: Interest }
  | { type: 'UPDATE_INTEREST'; payload: { id: string; data: Partial<Interest> } }
  | { type: 'DELETE_INTEREST'; payload: string }
  | { type: 'ADD_CUSTOM_SECTION'; payload: CustomSection }
  | { type: 'UPDATE_CUSTOM_SECTION'; payload: { id: string; data: Partial<CustomSection> } }
  | { type: 'DELETE_CUSTOM_SECTION'; payload: string }
  | { type: 'CHANGE_TEMPLATE'; payload: string }
  | { type: 'SET_ANALYSIS_SCORE'; payload: number }
  | { type: 'SET_SUGGESTIONS'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: ResumeState = {
  resumeData: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    customSections: [],
    templateId: 'modern',
  },
  analysisScore: 0,
  suggestions: [],
  isLoading: false,
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...action.payload },
        },
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, action.payload],
        },
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          ),
        },
      };
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter(exp => exp.id !== action.payload),
        },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, action.payload],
        },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          ),
        },
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter(edu => edu.id !== action.payload),
        },
      };
    case 'ADD_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: [...state.resumeData.skills, action.payload],
        },
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          ),
        },
      };
    case 'DELETE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter(skill => skill.id !== action.payload),
        },
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: [...state.resumeData.projects, action.payload],
        },
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.map(project =>
            project.id === action.payload.id ? { ...project, ...action.payload.data } : project
          ),
        },
      };
      case 'DELETE_PROJECT':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter(project => project.id !== action.payload),
          },
        };
      case 'ADD_CERTIFICATION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            certifications: [...(state.resumeData.certifications || []), action.payload],
          },
        };
      case 'UPDATE_CERTIFICATION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            certifications: (state.resumeData.certifications || []).map(cert =>
              cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
            ),
          },
        };
      case 'DELETE_CERTIFICATION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            certifications: (state.resumeData.certifications || []).filter(cert => cert.id !== action.payload),
          },
        };
      case 'ADD_LANGUAGE':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            languages: [...(state.resumeData.languages || []), action.payload],
          },
        };
      case 'UPDATE_LANGUAGE':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            languages: (state.resumeData.languages || []).map(lang =>
              lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang
            ),
          },
        };
      case 'DELETE_LANGUAGE':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            languages: (state.resumeData.languages || []).filter(lang => lang.id !== action.payload),
          },
        };
      case 'ADD_INTEREST':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            interests: [...(state.resumeData.interests || []), action.payload],
          },
        };
      case 'UPDATE_INTEREST':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            interests: (state.resumeData.interests || []).map(interest =>
              interest.id === action.payload.id ? { ...interest, ...action.payload.data } : interest
            ),
          },
        };
      case 'DELETE_INTEREST':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            interests: (state.resumeData.interests || []).filter(interest => interest.id !== action.payload),
          },
        };
      case 'ADD_CUSTOM_SECTION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            customSections: [...(state.resumeData.customSections || []), action.payload],
          },
        };
      case 'UPDATE_CUSTOM_SECTION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            customSections: (state.resumeData.customSections || []).map(section =>
              section.id === action.payload.id ? { ...section, ...action.payload.data } : section
            ),
          },
        };
      case 'DELETE_CUSTOM_SECTION':
        return {
          ...state,
          resumeData: {
            ...state.resumeData,
            customSections: (state.resumeData.customSections || []).filter(section => section.id !== action.payload),
          },
        };
      case 'CHANGE_TEMPLATE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          templateId: action.payload,
        },
      };
    case 'SET_ANALYSIS_SCORE':
      return {
        ...state,
        analysisScore: action.payload,
      };
    case 'SET_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  analyzeResume: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const analyzeResume = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simple resume analysis algorithm
    let score = 0;
    const suggestions: string[] = [];
    
    // Personal info completeness (30 points)
    const { personalInfo } = state.resumeData;
    if (personalInfo.fullName) score += 5;
    if (personalInfo.email) score += 5;
    if (personalInfo.phone) score += 5;
    if (personalInfo.location) score += 5;
    if (personalInfo.summary && personalInfo.summary.length > 50) score += 10;
    else suggestions.push("Add a compelling professional summary");
    
    // Experience (40 points)
    if (state.resumeData.experience.length > 0) {
      score += 20;
      const hasAchievements = state.resumeData.experience.some(exp => exp.achievements.length > 0);
      if (hasAchievements) score += 20;
      else suggestions.push("Add specific achievements to your work experience");
    } else {
      suggestions.push("Add your work experience");
    }
    
    // Education (15 points)
    if (state.resumeData.education.length > 0) score += 15;
    else suggestions.push("Add your educational background");
    
    // Skills (15 points)
    if (state.resumeData.skills.length >= 5) score += 15;
    else if (state.resumeData.skills.length > 0) score += 7;
    else suggestions.push("Add relevant skills to showcase your capabilities");
    
    // Bonus points for projects and links
    if (state.resumeData.projects.length > 0) score += 5;
    if (personalInfo.linkedin) score += 2;
    if (personalInfo.github) score += 2;
    if (personalInfo.website) score += 1;
    
    dispatch({ type: 'SET_ANALYSIS_SCORE', payload: score });
    dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <ResumeContext.Provider value={{ state, dispatch, analyzeResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}