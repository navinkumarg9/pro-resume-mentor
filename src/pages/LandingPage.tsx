import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  FileText, 
  Layout, 
  Download,
  Star,
  Users,
  Award,
  Zap,
  Check,
  Eye
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-primary">
                ResumeForge
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('templates')} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Templates
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </button>
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <Button asChild className="btn-professional">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-foreground leading-tight">
              Create professional resumes{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                in minutes
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build stunning resumes with our easy-to-use editor, 10 professional templates, and
              real-time preview.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" asChild className="btn-hero text-lg px-8 py-6">
                <Link to="/login">
                  Create Your Resume
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-sm">Trusted by 50,000+ professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create your professional resume in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">1. Enter Your Details</h3>
                <p className="text-muted-foreground">
                  Fill in your information using our intuitive form editor.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Layout className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">2. Choose a Template</h3>
                <p className="text-muted-foreground">
                  Select from 10 professionally designed templates.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">3. Download Your Resume</h3>
                <p className="text-muted-foreground">
                  Preview in real-time and download your resume as a PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to create a professional resume that gets you hired
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">AI-Powered Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized suggestions and job-specific recommendations from our AI chatbot
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Live Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See your changes instantly as you type with real-time preview
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Resume Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed feedback and scoring to improve your resume quality
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Professional Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from 7+ professionally designed templates for different industries
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">PDF Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download your resume as a high-quality PDF ready for applications
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Job-Specific Content</h3>
                <p className="text-sm text-muted-foreground">
                  Get tailored content suggestions for different job roles and industries
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4">Featured Templates</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our professionally designed templates to make your resume stand out
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
              {/* Modern Template */}
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white space-y-2 w-full px-4">
                      <div className="bg-white/20 h-4 rounded w-3/4"></div>
                      <div className="bg-white/20 h-2 rounded w-1/2"></div>
                      <div className="grid grid-cols-3 gap-1 mt-3">
                        <div className="bg-white/20 h-6 rounded"></div>
                        <div className="bg-white/20 h-6 rounded"></div>
                        <div className="bg-white/20 h-6 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Modern</h3>
                  <p className="text-sm text-muted-foreground mb-3">Clean and professional for tech roles</p>
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>

              {/* Classic Template */}
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-gray-600 to-gray-800 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white space-y-2 w-full px-4">
                      <div className="bg-white/20 h-3 rounded w-2/3 mx-auto"></div>
                      <div className="bg-white/20 h-px w-full"></div>
                      <div className="space-y-1">
                        <div className="bg-white/20 h-2 rounded w-full"></div>
                        <div className="bg-white/20 h-2 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Classic</h3>
                  <p className="text-sm text-muted-foreground mb-3">Traditional format for conservative industries</p>
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>

              {/* Creative Template */}
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white space-y-2 w-full px-4">
                      <div className="bg-gradient-to-r from-white/30 to-white/20 h-4 rounded w-full"></div>
                      <div className="bg-white/20 h-2 rounded w-3/4"></div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="bg-white/20 h-6 rounded"></div>
                        <div className="bg-white/20 h-6 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Creative</h3>
                  <p className="text-sm text-muted-foreground mb-3">Colorful and unique for creative roles</p>
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>

              {/* Tech Pro Template */}
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="p-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-40 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-blue-300 space-y-2 w-full px-4">
                      <div className="bg-blue-600 h-4 rounded w-3/4"></div>
                      <div className="bg-blue-400/20 h-2 rounded w-1/2"></div>
                      <div className="grid grid-cols-3 gap-1 mt-3">
                        <div className="bg-blue-400/20 h-6 rounded"></div>
                        <div className="bg-blue-400/20 h-6 rounded"></div>
                        <div className="bg-blue-400/20 h-6 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Tech Pro</h3>
                  <p className="text-sm text-muted-foreground mb-3">Dark theme for developers and tech professionals</p>
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/login">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-playfair font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Join thousands of professionals who have landed their dream jobs with ResumeForge
          </p>
          <Button size="lg" asChild variant="secondary" className="text-lg px-8 py-6">
            <Link to="/login">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 bg-gradient-primary rounded flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-playfair font-bold text-primary text-lg">ResumeForge</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 ResumeForge. All rights reserved. Build your future, one resume at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;