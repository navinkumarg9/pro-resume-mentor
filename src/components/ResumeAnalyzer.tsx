import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  Award
} from 'lucide-react';
import { useResume } from './ResumeStore';

const ResumeAnalyzer: React.FC = () => {
  const { state, analyzeResume } = useResume();
  const { analysisScore, suggestions, isLoading } = state;

  useEffect(() => {
    // Auto-analyze when resume data changes
    const timer = setTimeout(() => {
      analyzeResume();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [state.resumeData, analyzeResume]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const completionChecks = [
    {
      label: 'Personal Information',
      completed: state.resumeData.personalInfo.fullName && 
                state.resumeData.personalInfo.email && 
                state.resumeData.personalInfo.phone,
    },
    {
      label: 'Professional Summary',
      completed: state.resumeData.personalInfo.summary && 
                state.resumeData.personalInfo.summary.length > 50,
    },
    {
      label: 'Work Experience',
      completed: state.resumeData.experience.length > 0,
    },
    {
      label: 'Education',
      completed: state.resumeData.education.length > 0,
    },
    {
      label: 'Skills (5+)',
      completed: state.resumeData.skills.length >= 5,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Resume Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Your resume is approximately {analysisScore}% complete with {suggestions.length} suggestions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Analyzing...</span>
            </div>
          ) : (
            <>
              {/* Score Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Resume Completeness</span>
                  <span className={`text-lg font-bold ${getScoreColor(analysisScore)}`}>
                    {analysisScore}%
                  </span>
                </div>
                <Progress value={analysisScore} className="h-2" />
              </div>

              {/* Suggestions Section */}
              {suggestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold text-foreground">Suggestions for Improvement</h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completion Checklist */}
              <div className="space-y-3 pt-2 border-t">
                <h3 className="text-sm font-semibold text-foreground">Completeness Checklist</h3>
                <div className="space-y-2">
                  {completionChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {check.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                        )}
                        <span className={`text-sm ${
                          check.completed 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                        }`}>
                          {check.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={analyzeResume}
                variant="outline"
                size="sm"
                className="w-full mt-4"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Re-analyze Resume
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalyzer;
