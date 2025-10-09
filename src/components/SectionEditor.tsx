import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Sparkles,
  Upload,
  X
} from 'lucide-react';
import { useResume, Experience, Education, Skill, Project } from './ResumeStore';
import { ExamplesDialog } from './ExamplesDialog';

interface SectionEditorProps {
  section: 'personal' | 'experience' | 'education' | 'skills' | 'projects';
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ section }) => {
  const { state, dispatch } = useResume();
  const [examplesOpen, setExamplesOpen] = useState(false);
  
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: [],
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical',
    };
    dispatch({ type: 'ADD_SKILL', payload: newSkill });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: { profilePhoto: reader.result as string }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { profilePhoto: undefined }
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Photo Upload */}
      <div className="space-y-2">
        <Label>Profile Photo</Label>
        <div className="flex items-start gap-4">
          {state.resumeData.personalInfo.profilePhoto ? (
            <div className="relative">
              <img 
                src={state.resumeData.personalInfo.profilePhoto} 
                alt="Profile" 
                className="w-32 h-32 object-cover rounded-lg border-2 border-border"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={removePhoto}
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground text-center px-2">Click to upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Upload a professional headshot for your resume. Recommended size: 300x300px
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={state.resumeData.personalInfo.fullName}
            onChange={(e) => dispatch({
              type: 'UPDATE_PERSONAL_INFO',
              payload: { fullName: e.target.value }
            })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              className="pl-10"
              value={state.resumeData.personalInfo.email}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { email: e.target.value }
              })}
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              className="pl-10"
              value={state.resumeData.personalInfo.phone}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              className="pl-10"
              value={state.resumeData.personalInfo.location}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { location: e.target.value }
              })}
              placeholder="New York, NY"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              className="pl-10"
              value={state.resumeData.personalInfo.website}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { website: e.target.value }
              })}
              placeholder="www.johndoe.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="linkedin"
              className="pl-10"
              value={state.resumeData.personalInfo.linkedin}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { linkedin: e.target.value }
              })}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <div className="relative">
            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="github"
              className="pl-10"
              value={state.resumeData.personalInfo.github}
              onChange={(e) => dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { github: e.target.value }
              })}
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setExamplesOpen(true)}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            See Examples
          </Button>
        </div>
        <Textarea
          id="summary"
          rows={4}
          value={state.resumeData.personalInfo.summary}
          onChange={(e) => dispatch({
            type: 'UPDATE_PERSONAL_INFO',
            payload: { summary: e.target.value }
          })}
          placeholder="Write a compelling 2-3 sentence summary of your professional background, key skills, and career objectives..."
        />
        <p className="text-xs text-muted-foreground">
          {state.resumeData.personalInfo.summary.length}/300 characters recommended
        </p>
      </div>
      
      <ExamplesDialog open={examplesOpen} onOpenChange={setExamplesOpen} />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Professional Experience
        </h3>
        <Button onClick={addExperience} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {state.resumeData.experience.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {state.resumeData.experience.map((exp, index) => (
            <Card key={exp.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Experience #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_EXPERIENCE', payload: exp.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Position Title</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { position: e.target.value } }
                      })}
                      placeholder="Software Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { company: e.target.value } }
                      })}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { startDate: e.target.value } }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { endDate: e.target.value } }
                      })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      checked={exp.current}
                      onCheckedChange={(checked) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { current: checked } }
                      })}
                    />
                    <Label>Current Role</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Job Description</Label>
                    <Textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { description: e.target.value } }
                      })}
                      placeholder="Describe your role and responsibilities..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Key Achievements (one per line)</Label>
                    <Textarea
                      rows={4}
                      value={exp.achievements.join('\n')}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { 
                          id: exp.id, 
                          data: { achievements: e.target.value.split('\n').filter(a => a.trim()) }
                        }
                      })}
                      placeholder="• Increased sales by 25% through improved customer engagement&#10;• Led a team of 5 developers on a critical project&#10;• Implemented new processes that reduced costs by 15%"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Education
        </h3>
        <Button onClick={addEducation} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {state.resumeData.education.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <GraduationCap className="h-12 w-12 mx-auto mb-4" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {state.resumeData.education.map((edu, index) => (
            <Card key={edu.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Education #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_EDUCATION', payload: edu.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { institution: e.target.value } }
                      })}
                      placeholder="University of Technology"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { degree: e.target.value } }
                      })}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { field: e.target.value } }
                      })}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { startDate: e.target.value } }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { endDate: e.target.value } }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Code className="h-5 w-5" />
          Skills
        </h3>
        <Button onClick={addSkill} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {state.resumeData.skills.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Code className="h-12 w-12 mx-auto mb-4" />
          <p>No skills added yet.</p>
          <p className="text-sm">Add skills to showcase your capabilities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.resumeData.skills.map((skill, index) => (
            <Card key={skill.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Skill #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_SKILL', payload: skill.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Skill Name</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_SKILL',
                        payload: { id: skill.id, data: { name: e.target.value } }
                      })}
                      placeholder="JavaScript"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Select
                        value={skill.level}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SKILL',
                          payload: { id: skill.id, data: { level: value as any } }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={skill.category}
                        onValueChange={(value) => dispatch({
                          type: 'UPDATE_SKILL',
                          payload: { id: skill.id, data: { category: value as any } }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Soft">Soft</SelectItem>
                          <SelectItem value="Language">Language</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Projects
        </h3>
        <Button onClick={addProject} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {state.resumeData.projects.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <FolderOpen className="h-12 w-12 mx-auto mb-4" />
          <p>No projects added yet.</p>
          <p className="text-sm">Add projects to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {state.resumeData.projects.map((project, index) => (
            <Card key={project.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Project #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_PROJECT', payload: project.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: project.id, data: { name: e.target.value } }
                      })}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={project.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: project.id, data: { description: e.target.value } }
                      })}
                      placeholder="Brief description of the project..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  switch (section) {
    case 'personal':
      return renderPersonalInfo();
    case 'experience':
      return renderExperience();
    case 'education':
      return renderEducation();
    case 'skills':
      return renderSkills();
    case 'projects':
      return renderProjects();
    default:
      return null;
  }
};