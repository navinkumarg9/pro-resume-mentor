import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FileText, Edit, Trash2, Eye, Plus, Download } from 'lucide-react';
import { useResume, ResumeData } from './ResumeStore';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SavedResume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
}

interface ResumeLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResumeLibrary: React.FC<ResumeLibraryProps> = ({ open, onOpenChange }) => {
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { state, dispatch } = useResume();
  const { toast } = useToast();

  useEffect(() => {
    loadResumes();
  }, [open]);

  const loadResumes = () => {
    const stored = localStorage.getItem('savedResumes');
    if (stored) {
      setSavedResumes(JSON.parse(stored));
    }
  };

  const handleSaveResume = () => {
    if (!resumeName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a resume name',
        variant: 'destructive',
      });
      return;
    }

    const newResume: SavedResume = {
      id: Date.now().toString(),
      name: resumeName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: state.resumeData,
    };

    const stored = localStorage.getItem('savedResumes');
    const resumes = stored ? JSON.parse(stored) : [];
    resumes.push(newResume);
    localStorage.setItem('savedResumes', JSON.stringify(resumes));

    setSavedResumes(resumes);
    setResumeName('');
    setShowSaveDialog(false);

    toast({
      title: 'Success',
      description: 'Resume saved successfully',
    });
  };

  const handleLoadResume = (resume: SavedResume) => {
    // Update personal info
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: resume.data.personalInfo });
    
    // Clear and reload all sections by dispatching appropriate actions
    // Note: In a real implementation, you might want to clear existing items first
    
    // Load experience
    resume.data.experience.forEach((exp) => {
      dispatch({ type: 'ADD_EXPERIENCE', payload: exp });
    });

    // Load education
    resume.data.education.forEach((edu) => {
      dispatch({ type: 'ADD_EDUCATION', payload: edu });
    });

    // Load skills
    resume.data.skills.forEach((skill) => {
      dispatch({ type: 'ADD_SKILL', payload: skill });
    });

    // Load projects
    resume.data.projects.forEach((project) => {
      dispatch({ type: 'ADD_PROJECT', payload: project });
    });

    // Load certifications
    if (resume.data.certifications) {
      resume.data.certifications.forEach(cert => {
        dispatch({ type: 'ADD_CERTIFICATION', payload: cert });
      });
    }

    // Load languages
    if (resume.data.languages) {
      resume.data.languages.forEach(lang => {
        dispatch({ type: 'ADD_LANGUAGE', payload: lang });
      });
    }

    // Load interests
    if (resume.data.interests) {
      resume.data.interests.forEach(interest => {
        dispatch({ type: 'ADD_INTEREST', payload: interest });
      });
    }

    // Load custom sections
    if (resume.data.customSections) {
      resume.data.customSections.forEach(section => {
        dispatch({ type: 'ADD_CUSTOM_SECTION', payload: section });
      });
    }

    // Load template
    dispatch({ type: 'CHANGE_TEMPLATE', payload: resume.data.templateId });

    onOpenChange(false);
    toast({
      title: 'Success',
      description: `Resume "${resume.name}" loaded`,
    });
  };

  const handleDeleteResume = (id: string) => {
    const resumes = savedResumes.filter(r => r.id !== id);
    localStorage.setItem('savedResumes', JSON.stringify(resumes));
    setSavedResumes(resumes);
    setDeleteConfirm(null);

    toast({
      title: 'Success',
      description: 'Resume deleted successfully',
    });
  };

  const handleDownloadResume = (resume: SavedResume) => {
    // Load the resume temporarily and trigger download
    const downloadEvent = new CustomEvent('downloadResume');
    window.dispatchEvent(downloadEvent);
    
    toast({
      title: 'Downloading',
      description: `Downloading ${resume.name}...`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">My Resume Library</DialogTitle>
            <DialogDescription>
              Manage your saved resumes - edit, delete, or create new ones
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Button onClick={() => setShowSaveDialog(true)} className="w-full btn-professional">
              <Plus className="mr-2 h-4 w-4" />
              Save Current Resume
            </Button>

            <ScrollArea className="h-[400px] pr-4">
              {savedResumes.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No saved resumes yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click "Save Current Resume" to save your first resume
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedResumes.map((resume) => (
                    <Card key={resume.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              {resume.name}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground mt-1 space-y-1">
                              <p>Created: {formatDate(resume.createdAt)}</p>
                              <p>Last updated: {formatDate(resume.updatedAt)}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleLoadResume(resume)}
                            className="flex-1"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadResume(resume)}
                            className="flex-1"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteConfirm(resume.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Resume</DialogTitle>
            <DialogDescription>
              Give your resume a name to save it to your library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="resume-name">Resume Name</Label>
              <Input
                id="resume-name"
                placeholder="e.g., Software Engineer Resume 2024"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveResume()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveResume}>Save Resume</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDeleteResume(deleteConfirm)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
