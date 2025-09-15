import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Palette } from 'lucide-react';
import { useResume } from './ResumeStore';
import { resumeTemplates } from './ResumeTemplates';

const TemplateSelector: React.FC = () => {
  const { state, dispatch } = useResume();
  const currentTemplate = state.resumeData.templateId;

  const selectTemplate = (templateId: string) => {
    dispatch({ type: 'CHANGE_TEMPLATE', payload: templateId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Choose Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(resumeTemplates).map(([templateId, template]) => (
            <Card 
              key={templateId}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentTemplate === templateId 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => selectTemplate(templateId)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  {currentTemplate === templateId && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Active
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                
                {/* Template Preview */}
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <div className="space-y-2 text-xs">
                    {templateId === 'modern' && (
                      <div className="space-y-1">
                        <div className="bg-primary h-6 rounded w-full"></div>
                        <div className="bg-background h-3 rounded w-3/4"></div>
                        <div className="bg-background h-2 rounded w-1/2"></div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="bg-background h-8 rounded"></div>
                          <div className="bg-background h-8 rounded"></div>
                          <div className="bg-background h-8 rounded"></div>
                        </div>
                      </div>
                    )}
                    
                    {templateId === 'classic' && (
                      <div className="space-y-1">
                        <div className="bg-foreground h-3 rounded w-2/3 mx-auto"></div>
                        <div className="bg-border h-px w-full"></div>
                        <div className="bg-background h-2 rounded w-3/4"></div>
                        <div className="space-y-1">
                          <div className="bg-background h-2 rounded w-full"></div>
                          <div className="bg-background h-2 rounded w-4/5"></div>
                          <div className="bg-background h-2 rounded w-3/5"></div>
                        </div>
                      </div>
                    )}
                    
                    {templateId === 'creative' && (
                      <div className="space-y-1">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded w-full"></div>
                        <div className="bg-purple-100 h-3 rounded w-3/4"></div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="bg-pink-100 h-6 rounded"></div>
                          <div className="bg-purple-100 h-6 rounded"></div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-200 to-pink-200 h-4 rounded w-full"></div>
                      </div>
                    )}
                    
                    {templateId === 'executive' && (
                      <div className="space-y-1">
                        <div className="bg-foreground h-4 rounded w-2/3"></div>
                        <div className="bg-foreground h-px w-full"></div>
                        <div className="bg-background h-3 rounded w-full"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <div className="bg-background h-2 rounded w-full"></div>
                            <div className="bg-background h-2 rounded w-4/5"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="bg-background h-2 rounded w-full"></div>
                            <div className="bg-background h-2 rounded w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {templateId === 'academic' && (
                      <div className="space-y-1">
                        <div className="bg-foreground h-3 rounded w-1/2 mx-auto"></div>
                        <div className="bg-muted-foreground h-px w-full"></div>
                        <div className="bg-background h-2 rounded w-4/5"></div>
                        <div className="space-y-1">
                          <div className="bg-border h-px w-3/4"></div>
                          <div className="bg-background h-2 rounded w-full"></div>
                          <div className="bg-background h-2 rounded w-5/6"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant={currentTemplate === templateId ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectTemplate(templateId);
                  }}
                >
                  {currentTemplate === templateId ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    'Select Template'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Template Guidelines:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Modern:</strong> Best for tech, startups, and creative roles</li>
            <li>• <strong>Classic:</strong> Perfect for traditional industries like finance, law</li>
            <li>• <strong>Creative:</strong> Ideal for design, marketing, and artistic positions</li>
            <li>• <strong>Executive:</strong> Suitable for senior management and C-level roles</li>
            <li>• <strong>Academic:</strong> Designed for research, education, and academic positions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;