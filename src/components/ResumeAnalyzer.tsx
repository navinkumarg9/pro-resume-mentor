import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb,
  RefreshCw,
  Target,
  FileText,
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
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    if (score >= 40) return 'outline';
    return 'destructive';
  };

  const completionChecks = [
    {
      label: 'Personal Information',
      completed: state.resumeData.personalInfo.fullName && 
                state.resumeData.personalInfo.email && 
                state.resumeData.personalInfo.phone,
      icon: FileText,
    },
    {
      label: 'Professional Summary',
      completed: state.resumeData.personalInfo.summary && 
                state.resumeData.personalInfo.summary.length > 50,
      icon: Target,
    },
    {
      label: 'Work Experience',
      completed: state.resumeData.experience.length > 0,
      icon: Award,
    },
    {
      label: 'Education',
      completed: state.resumeData.education.length > 0,
      icon: CheckCircle2,
    },
    {
      label: 'Skills (5+)',
      completed: state.resumeData.skills.length >= 5,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <Card className="card-gradient border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Award className="h-6 w-6 text-primary" />
            Resume Analysis Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">Analyzing your resume...</span>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(analysisScore)}`}>
                  {analysisScore}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <Badge 
                  variant={getScoreBadgeVariant(analysisScore)}
                  className="text-lg px-4 py-2"
                >
                  {getScoreLabel(analysisScore)}
                </Badge>
                <Progress value={analysisScore} className="w-full h-3" />
              </div>
              
              <Button 
                onClick={analyzeResume}
                variant="outline"
                size="sm"
                className="btn-outline-pro"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Re-analyze
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Completion Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Resume Completeness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completionChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`rounded-full p-1 ${
                  check.completed 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <check.icon className="h-4 w-4" />
                </div>
                <span className={`flex-1 ${
                  check.completed 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {check.label}
                </span>
                {check.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-accent/10 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Scoring Criteria:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Personal Info: 30 points</li>
                  <li>• Work Experience: 40 points</li>
                  <li>• Education: 15 points</li>
                  <li>• Skills: 15 points</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Bonus Points:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Projects: +5 points</li>
                  <li>• LinkedIn: +2 points</li>
                  <li>• GitHub: +2 points</li>
                  <li>• Website: +1 point</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {analysisScore >= 80 ? 'Your resume is ready for applications!' :
                   analysisScore >= 60 ? 'Good foundation, minor improvements needed.' :
                   analysisScore >= 40 ? 'Several areas need attention.' :
                   'Significant improvements required before applying.'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalyzer;