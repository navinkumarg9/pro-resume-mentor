import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Award, Languages, Heart, Settings } from 'lucide-react';
import { useResume } from './ResumeStore';

interface AdditionalSectionsProps {
  section: 'certifications' | 'languages' | 'interests' | 'custom';
}

export const AdditionalSections: React.FC<AdditionalSectionsProps> = ({ section }) => {
  const { state, dispatch } = useResume();

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: '',
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate' as const,
    };
    dispatch({ type: 'ADD_LANGUAGE', payload: newLanguage });
  };

  const addInterest = () => {
    const newInterest = {
      id: Date.now().toString(),
      name: '',
      description: '',
    };
    dispatch({ type: 'ADD_INTEREST', payload: newInterest });
  };

  const addCustomSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: '',
      content: '',
      type: 'text' as const,
    };
    dispatch({ type: 'ADD_CUSTOM_SECTION', payload: newSection });
  };

  const renderCertifications = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Certifications</h3>
        </div>
        <Button onClick={addCertification} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {state.resumeData.certifications?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Award className="h-12 w-12 mx-auto mb-4" />
          <p>No certifications added yet.</p>
          <p className="text-sm">Add professional certifications to showcase your expertise.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {state.resumeData.certifications?.map((cert, index) => (
            <Card key={cert.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Certification #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_CERTIFICATION', payload: cert.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { name: e.target.value } }
                      })}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { issuer: e.target.value } }
                      })}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date Earned</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { date: e.target.value } }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credential ID (Optional)</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { credentialId: e.target.value } }
                      })}
                      placeholder="ABC123DEF456"
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

  const renderLanguages = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Languages</h3>
        </div>
        <Button onClick={addLanguage} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>

      {state.resumeData.languages?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Languages className="h-12 w-12 mx-auto mb-4" />
          <p>No languages added yet.</p>
          <p className="text-sm">Add languages to showcase your communication abilities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.resumeData.languages?.map((language, index) => (
            <Card key={language.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Language #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_LANGUAGE', payload: language.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input
                      value={language.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_LANGUAGE',
                        payload: { id: language.id, data: { name: e.target.value } }
                      })}
                      placeholder="Spanish"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proficiency Level</Label>
                    <Select
                      value={language.proficiency}
                      onValueChange={(value) => dispatch({
                        type: 'UPDATE_LANGUAGE',
                        payload: { id: language.id, data: { proficiency: value as any } }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Native">Native</SelectItem>
                        <SelectItem value="Fluent">Fluent</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Interests & Hobbies</h3>
        </div>
        <Button onClick={addInterest} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Interest
        </Button>
      </div>

      {state.resumeData.interests?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <p>No interests added yet.</p>
          <p className="text-sm">Add interests to show your personality and cultural fit.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.resumeData.interests?.map((interest, index) => (
            <Card key={interest.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Interest #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_INTEREST', payload: interest.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Interest/Hobby</Label>
                    <Input
                      value={interest.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_INTEREST',
                        payload: { id: interest.id, data: { name: e.target.value } }
                      })}
                      placeholder="Photography, Travel, Coding"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea
                      rows={2}
                      value={interest.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_INTEREST',
                        payload: { id: interest.id, data: { description: e.target.value } }
                      })}
                      placeholder="Brief description of your involvement or passion..."
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

  const renderCustom = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Custom Sections</h3>
        </div>
        <Button onClick={addCustomSection} size="sm" className="btn-professional">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {state.resumeData.customSections?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Settings className="h-12 w-12 mx-auto mb-4" />
          <p>No custom sections added yet.</p>
          <p className="text-sm">Add custom sections for awards, publications, or other relevant information.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {state.resumeData.customSections?.map((section, index) => (
            <Card key={section.id} className="card-pro">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Section #{index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: 'DELETE_CUSTOM_SECTION', payload: section.id })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CUSTOM_SECTION',
                        payload: { id: section.id, data: { title: e.target.value } }
                      })}
                      placeholder="Awards, Publications, Volunteer Work"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      rows={4}
                      value={section.content}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CUSTOM_SECTION',
                        payload: { id: section.id, data: { content: e.target.value } }
                      })}
                      placeholder="Add your content here..."
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
    case 'certifications':
      return renderCertifications();
    case 'languages':
      return renderLanguages();
    case 'interests':
      return renderInterests();
    case 'custom':
      return renderCustom();
    default:
      return null;
  }
};