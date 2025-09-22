import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Save, 
  BarChart3,
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  MoreHorizontal,
  Award,
  Languages,
  Heart,
  Settings,
  Eye,
  Layout
} from 'lucide-react';
import ResumeEditor from '@/components/ResumeEditor';
import LivePreview from '@/components/LivePreview';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import TemplateModal from '@/components/TemplateModal';
import { useResume } from '@/components/ResumeStore';
import { AdditionalSections } from '@/components/AdditionalSections';
import { SectionEditor } from '@/components/SectionEditor';
import ChatBot from '@/components/ChatBot';

const Editor: React.FC = () => {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const { state } = useResume();

  const handleSave = () => {
    // Save resume data
    localStorage.setItem('resumeData', JSON.stringify(state.resumeData));
  };

  const handleDownload = () => {
    // Trigger download from LivePreview component
    const downloadEvent = new CustomEvent('downloadResume');
    window.dispatchEvent(downloadEvent);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-playfair font-bold text-primary">
                ResumeForge
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setTemplateModalOpen(true)}
                className="btn-secondary"
              >
                <Layout className="mr-2 h-4 w-4" />
                Change Template
              </Button>
              <Button className="btn-professional" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Left Column */}
          <div className="space-y-4 overflow-y-auto">
            {/* Resume Analysis */}
            <Collapsible open={analysisOpen} onOpenChange={setAnalysisOpen}>
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-warning" />
                        <CardTitle className="text-lg">Resume Analysis</CardTitle>
                        <Badge variant="secondary" className="ml-2">
                          {state.analysisScore}% Complete
                        </Badge>
                      </div>
                      {analysisOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    {!analysisOpen && (
                      <p className="text-sm text-muted-foreground">
                        Your resume is approximately {state.analysisScore}% complete with {state.suggestions.length} suggestions
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2">
                  <ResumeAnalyzer />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Resume Editor */}
            <Card className="flex-1">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b px-6 py-3">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="personal" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Personal</span>
                      </TabsTrigger>
                      <TabsTrigger value="education" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span className="hidden sm:inline">Education</span>
                      </TabsTrigger>
                      <TabsTrigger value="experience" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="hidden sm:inline">Experience</span>
                      </TabsTrigger>
                      <TabsTrigger value="projects" className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        <span className="hidden sm:inline">Projects</span>
                      </TabsTrigger>
                      <TabsTrigger value="more" className="flex items-center gap-2">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">More</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                    <TabsContent value="personal" className="mt-0">
                      <SectionEditor section="personal" />
                    </TabsContent>
                    <TabsContent value="education" className="mt-0">
                      <SectionEditor section="education" />
                    </TabsContent>
                    <TabsContent value="experience" className="mt-0">
                      <SectionEditor section="experience" />
                    </TabsContent>
                    <TabsContent value="projects" className="mt-0">
                      <SectionEditor section="projects" />
                    </TabsContent>
                    <TabsContent value="more" className="mt-0">
                      <Tabs defaultValue="skills" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="skills">Skills</TabsTrigger>
                          <TabsTrigger value="certifications">
                            <Award className="h-4 w-4 mr-1" />
                            Certs
                          </TabsTrigger>
                          <TabsTrigger value="languages">
                            <Languages className="h-4 w-4 mr-1" />
                            Languages
                          </TabsTrigger>
                          <TabsTrigger value="interests">
                            <Heart className="h-4 w-4 mr-1" />
                            Interests
                          </TabsTrigger>
                          <TabsTrigger value="custom">
                            <Settings className="h-4 w-4 mr-1" />
                            Custom
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="skills" className="mt-4">
                          <SectionEditor section="skills" />
                        </TabsContent>
                        <TabsContent value="certifications" className="mt-4">
                          <AdditionalSections section="certifications" />
                        </TabsContent>
                        <TabsContent value="languages" className="mt-4">
                          <AdditionalSections section="languages" />
                        </TabsContent>
                        <TabsContent value="interests" className="mt-4">
                          <AdditionalSections section="interests" />
                        </TabsContent>
                        <TabsContent value="custom" className="mt-4">
                          <AdditionalSections section="custom" />
                        </TabsContent>
                      </Tabs>
                    </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Live Preview */}
          <div className="bg-card rounded-lg border">
            <div className="p-2">
              <LivePreview />
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Selection Modal */}
      <TemplateModal 
        open={templateModalOpen} 
        onOpenChange={setTemplateModalOpen} 
      />
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Editor;