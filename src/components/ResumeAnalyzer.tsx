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
    <div className="space-y-3">
      {/* Main Score Card */}
      <Card className="card-gradient border-primary/20">
        <CardHeader className="text-center pb-2 pt-4">
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Resume Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-3 pb-4">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Analyzing...</span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getScoreColor(analysisScore)}`}>
                  {analysisScore}
                  <span className="text-xl text-muted-foreground">/100</span>
                </div>
                <Badge 
                  variant={getScoreBadgeVariant(analysisScore)}
                  className="text-sm px-3 py-1"
                >
                  {getScoreLabel(analysisScore)}
                </Badge>
                <Progress value={analysisScore} className="w-full h-2" />
              </div>
              
              <Button 
                onClick={analyzeResume}
                variant="outline"
                size="sm"
                className="btn-outline-pro h-8 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Re-analyze
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Completion Checklist */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Completeness
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            {completionChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`rounded-full p-0.5 ${
                  check.completed 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <check.icon className="h-3 w-3" />
                </div>
                <span className={`flex-1 text-sm ${
                  check.completed 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {check.label}
                </span>
                {check.completed ? (
                  <CheckCircle2 className="h-3 w-3 text-success" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-accent" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-accent/10 rounded-md">
                  <AlertCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Breakdown */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">Criteria:</h4>
                <ul className="space-y-0.5 text-muted-foreground">
                  <li>• Personal: 30 pts</li>
                  <li>• Experience: 40 pts</li>
                  <li>• Education: 15 pts</li>
                  <li>• Skills: 15 pts</li>
                </ul>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">Bonus:</h4>
                <ul className="space-y-0.5 text-muted-foreground">
                  <li>• Projects: +5</li>
                  <li>• LinkedIn: +2</li>
                  <li>• GitHub: +2</li>
                  <li>• Website: +1</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                {analysisScore >= 80 ? 'Ready for applications!' :
                 analysisScore >= 60 ? 'Good, minor improvements needed.' :
                 analysisScore >= 40 ? 'Several areas need attention.' :
                 'Improvements required before applying.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalyzer;