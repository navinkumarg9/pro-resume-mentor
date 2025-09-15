import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Sparkles, 
  Target, 
  Zap,
  Edit3,
  Eye,
  BarChart3,
  Palette,
  Bot,
  Download,
  Star,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

import { ResumeProvider } from '@/components/ResumeStore';
import ResumeEditor from '@/components/ResumeEditor';
import LivePreview from '@/components/LivePreview';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import TemplateSelector from '@/components/TemplateSelector';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        {/* Header */}
        <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold font-playfair bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ResumeForge
                    </h1>
                    <p className="text-sm text-muted-foreground">Professional Resume Builder</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
                <Button variant="outline" size="sm" className="btn-outline-pro">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center space-y-6">
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold font-playfair">
                Build Your Perfect{' '}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Resume
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create stunning, ATS-friendly resumes with our AI-powered builder. 
                Get real-time suggestions and professional templates.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
              <div className="flex items-center gap-2 text-sm bg-card/50 rounded-full px-4 py-2">
                <Bot className="h-4 w-4 text-primary" />
                AI Assistant
              </div>
              <div className="flex items-center gap-2 text-sm bg-card/50 rounded-full px-4 py-2">
                <Eye className="h-4 w-4 text-accent" />
                Live Preview
              </div>
              <div className="flex items-center gap-2 text-sm bg-card/50 rounded-full px-4 py-2">
                <BarChart3 className="h-4 w-4 text-success" />
                Resume Scoring
              </div>
              <div className="flex items-center gap-2 text-sm bg-card/50 rounded-full px-4 py-2">
                <Palette className="h-4 w-4 text-warning" />
                5+ Templates
              </div>
            </div>
          </div>
        </section>

        {/* Main Application */}
        <main className="container mx-auto px-4 pb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12 bg-card/50 backdrop-blur">
              <TabsTrigger value="editor" className="flex items-center gap-2 font-medium">
                <Edit3 className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2 font-medium">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2 font-medium">
                <Palette className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="analyze" className="flex items-center gap-2 font-medium">
                <BarChart3 className="h-4 w-4" />
                Analyze
              </TabsTrigger>
            </TabsList>

            {/* Resume Editor */}
            <TabsContent value="editor" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResumeEditor />
                </div>
                <div className="space-y-6">
                  <Card className="card-feature">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" />
                        Quick Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Use action verbs to start bullet points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span>Quantify achievements with numbers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                          <span>Tailor content for each job application</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Ask our AI assistant for help</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get personalized suggestions, improve your content, and learn best practices.
                      </p>
                      <Button 
                        size="sm" 
                        className="btn-professional w-full"
                        onClick={() => {
                          // Trigger the chatbot to open by dispatching a custom event
                          const chatToggle = document.querySelector('[data-chat-toggle]') as HTMLElement;
                          if (chatToggle) {
                            chatToggle.click();
                          }
                        }}
                      >
                        <Bot className="h-4 w-4 mr-2" />
                        Chat with AI Assistant
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Live Preview */}
            <TabsContent value="preview" className="animate-fade-in">
              <LivePreview />
            </TabsContent>

            {/* Templates */}
            <TabsContent value="templates" className="animate-fade-in">
              <TemplateSelector />
            </TabsContent>

            {/* Resume Analyzer */}
            <TabsContent value="analyze" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResumeAnalyzer />
                </div>
                <div className="space-y-6">
                  <Card className="card-feature">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-success" />
                        Score Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span>80-100 Points</span>
                          <Badge variant="default" className="score-excellent">Excellent</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>60-79 Points</span>
                          <Badge variant="secondary" className="score-good">Good</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>40-59 Points</span>
                          <Badge variant="outline" className="score-fair">Fair</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>0-39 Points</span>
                          <Badge variant="destructive" className="score-poor">Needs Work</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-success text-success-foreground">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Pro Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm opacity-90">
                        Aim for a score above 80 to ensure your resume passes ATS systems 
                        and catches recruiters' attention.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-playfair mb-4">
                Everything You Need to Create a Winning Resume
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive suite of tools helps you create, optimize, and perfect your resume.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Bot,
                  title: 'AI Assistant',
                  description: 'Get personalized suggestions and content improvements',
                  color: 'text-primary'
                },
                {
                  icon: Eye,
                  title: 'Live Preview',
                  description: 'See changes instantly with real-time preview',
                  color: 'text-accent'
                },
                {
                  icon: BarChart3,
                  title: 'Resume Scoring',
                  description: 'Get detailed analysis and improvement suggestions',
                  color: 'text-success'
                },
                {
                  icon: Palette,
                  title: 'Professional Templates',
                  description: 'Choose from 5+ industry-specific templates',
                  color: 'text-warning'
                }
              ].map((feature, index) => (
                <Card key={index} className="card-feature text-center">
                  <CardContent className="p-6">
                    <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ChatBot */}
        <ChatBot />
      </div>
    </ResumeProvider>
  );
};

export default Index;