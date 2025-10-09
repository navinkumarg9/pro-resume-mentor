import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useResume } from './ResumeStore';
import { resumeTemplates } from './ResumeTemplates';

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ open, onOpenChange }) => {
  const { state, dispatch } = useResume();
  const currentTemplate = state.resumeData.templateId;

  const selectTemplate = (templateId: string) => {
    dispatch({ type: 'CHANGE_TEMPLATE', payload: templateId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose Template</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {Object.entries(resumeTemplates).map(([templateId, template]) => (
            <div 
              key={templateId}
              className={`cursor-pointer transition-all duration-300 border-2 rounded-xl p-4 hover:shadow-lg ${
                currentTemplate === templateId 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => selectTemplate(templateId)}
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-white border border-border rounded-lg p-3 mb-3 relative overflow-hidden">
                {templateId === 'modern' && (
                  <div className="space-y-2">
                    <div className="bg-blue-500 h-8 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-2 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-1 mt-4">
                      <div className="bg-gray-100 h-6 rounded"></div>
                      <div className="bg-gray-100 h-6 rounded"></div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                      <div className="bg-gray-200 h-1 rounded w-3/5"></div>
                    </div>
                  </div>
                )}
                
                {templateId === 'classic' && (
                  <div className="space-y-2">
                    <div className="bg-black h-3 rounded w-2/3 mx-auto"></div>
                    <div className="bg-gray-300 h-px w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4 mx-auto"></div>
                    <div className="space-y-1 mt-4">
                      <div className="bg-black h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                      <div className="bg-gray-200 h-1 rounded w-3/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'minimal' && (
                  <div className="space-y-2">
                    <div className="bg-gray-400 h-3 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-px w-full mt-4"></div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-gray-400 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'professional' && (
                  <div className="space-y-2">
                    <div className="bg-slate-800 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-3 gap-1 mt-3">
                      <div className="bg-slate-200 h-4 rounded"></div>
                      <div className="bg-slate-200 h-4 rounded"></div>
                      <div className="bg-slate-200 h-4 rounded"></div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'creative' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-8 rounded w-full"></div>
                    <div className="bg-purple-100 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-pink-100 h-6 rounded"></div>
                      <div className="bg-purple-100 h-6 rounded"></div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-200 to-pink-200 h-3 rounded w-full mt-3"></div>
                  </div>
                )}

                {templateId === 'executive' && (
                  <div className="space-y-2">
                    <div className="bg-black h-4 rounded w-2/3"></div>
                    <div className="bg-black h-px w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-full"></div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="space-y-1">
                        <div className="bg-gray-200 h-2 rounded w-full"></div>
                        <div className="bg-gray-200 h-2 rounded w-4/5"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="bg-gray-200 h-2 rounded w-full"></div>
                        <div className="bg-gray-200 h-2 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                )}

                {templateId === 'elegant' && (
                  <div className="space-y-2">
                    <div className="bg-gray-600 h-3 rounded w-1/2 mx-auto"></div>
                    <div className="bg-gray-200 h-2 rounded w-2/3 mx-auto"></div>
                    <div className="bg-gray-300 h-px w-3/4 mx-auto mt-4"></div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-gray-600 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'bold' && (
                  <div className="space-y-2">
                    <div className="bg-red-500 h-6 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-red-200 h-4 rounded w-full mt-3"></div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-red-100 h-2 rounded w-2/3"></div>
                    </div>
                  </div>
                )}

                {templateId === 'simple' && (
                  <div className="space-y-2">
                    <div className="bg-black h-3 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="space-y-1 mt-4">
                      <div className="bg-black h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                      <div className="bg-gray-200 h-1 rounded w-3/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'contemporary' && (
                  <div className="space-y-2">
                    <div className="bg-teal-500 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-teal-100 h-8 rounded"></div>
                      <div className="bg-teal-200 h-8 rounded"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'technical' && (
                  <div className="space-y-2">
                    <div className="bg-slate-800 h-5 rounded w-full"></div>
                    <div className="bg-green-400 h-2 rounded w-1/2"></div>
                    <div className="bg-slate-700 h-1 w-full mt-2"></div>
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      <div className="bg-red-400 h-1 rounded"></div>
                      <div className="bg-yellow-400 h-1 rounded"></div>
                      <div className="bg-green-400 h-1 rounded"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-gray-300 h-1 rounded w-full"></div>
                      <div className="bg-gray-300 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'sales' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-6 rounded w-full"></div>
                    <div className="bg-orange-100 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-orange-200 h-6 rounded"></div>
                      <div className="bg-red-200 h-6 rounded"></div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-300 to-red-300 h-2 rounded w-full mt-2"></div>
                  </div>
                )}

                {templateId === 'finance' && (
                  <div className="space-y-2">
                    <div className="bg-emerald-700 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-emerald-600 h-px w-full mt-3"></div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-emerald-200 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                      <div className="bg-gray-200 h-1 rounded w-3/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'engineering' && (
                  <div className="space-y-2">
                    <div className="bg-gray-800 h-4 rounded w-2/3"></div>
                    <div className="bg-blue-500 h-2 rounded w-1/2"></div>
                    <div className="grid grid-cols-4 gap-1 mt-3">
                      <div className="bg-blue-400 h-3 rounded"></div>
                      <div className="bg-gray-400 h-3 rounded"></div>
                      <div className="bg-blue-400 h-3 rounded"></div>
                      <div className="bg-gray-400 h-3 rounded"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-gray-300 h-1 rounded w-full"></div>
                      <div className="bg-gray-300 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'design-portfolio' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 h-7 rounded w-full"></div>
                    <div className="bg-pink-100 h-2 rounded w-2/3"></div>
                    <div className="grid grid-cols-3 gap-1 mt-3">
                      <div className="bg-pink-300 h-8 rounded"></div>
                      <div className="bg-purple-300 h-8 rounded"></div>
                      <div className="bg-indigo-300 h-8 rounded"></div>
                    </div>
                  </div>
                )}

                {templateId === 'consulting' && (
                  <div className="space-y-2">
                    <div className="bg-indigo-600 h-4 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-indigo-500 h-px w-full mt-3"></div>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <div className="bg-indigo-100 h-6 rounded"></div>
                      <div className="bg-indigo-200 h-6 rounded"></div>
                    </div>
                  </div>
                )}

                {templateId === 'education' && (
                  <div className="space-y-2">
                    <div className="bg-amber-500 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-amber-200 h-2 rounded w-full"></div>
                      <div className="bg-amber-100 h-2 rounded w-4/5"></div>
                      <div className="bg-gray-200 h-1 rounded w-3/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'nonprofit' && (
                  <div className="space-y-2">
                    <div className="bg-rose-500 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-rose-200 h-4 rounded w-full mt-3"></div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                      <div className="bg-rose-100 h-2 rounded w-2/3"></div>
                    </div>
                  </div>
                )}

                {templateId === 'real-estate' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 h-6 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-cyan-100 h-7 rounded"></div>
                      <div className="bg-blue-100 h-7 rounded"></div>
                    </div>
                  </div>
                )}

                {templateId === 'hospitality' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-amber-100 h-3 rounded w-full mt-3"></div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-orange-200 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'media' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-6 rounded w-full"></div>
                    <div className="bg-violet-100 h-2 rounded w-2/3"></div>
                    <div className="grid grid-cols-3 gap-1 mt-3">
                      <div className="bg-violet-300 h-6 rounded"></div>
                      <div className="bg-fuchsia-300 h-6 rounded"></div>
                      <div className="bg-violet-200 h-6 rounded"></div>
                    </div>
                  </div>
                )}

                {templateId === 'startup' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-lime-500 to-green-500 h-6 rounded w-full"></div>
                    <div className="bg-lime-100 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-lime-200 h-7 rounded"></div>
                      <div className="bg-green-200 h-7 rounded"></div>
                    </div>
                  </div>
                )}

                {templateId === 'data-science' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-3 gap-1 mt-3">
                      <div className="bg-blue-300 h-4 rounded"></div>
                      <div className="bg-cyan-300 h-4 rounded"></div>
                      <div className="bg-blue-200 h-4 rounded"></div>
                    </div>
                    <div className="bg-cyan-100 h-2 rounded w-full mt-2"></div>
                  </div>
                )}

                {templateId === 'corporate' && (
                  <div className="space-y-2">
                    <div className="bg-gray-700 h-4 rounded w-2/3"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="bg-gray-400 h-px w-full mt-3"></div>
                    <div className="space-y-1 mt-2">
                      <div className="bg-gray-700 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-4/5"></div>
                    </div>
                  </div>
                )}

                {templateId === 'legal' && (
                  <div className="space-y-2">
                    <div className="bg-slate-900 h-3 rounded w-1/2 mx-auto"></div>
                    <div className="bg-gray-800 h-px w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4 mx-auto"></div>
                    <div className="space-y-1 mt-3">
                      <div className="bg-slate-900 h-2 rounded w-full"></div>
                      <div className="bg-gray-200 h-1 rounded w-full"></div>
                    </div>
                  </div>
                )}

                {templateId === 'healthcare' && (
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-600 h-5 rounded w-full"></div>
                    <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                      <div className="bg-cyan-100 h-6 rounded"></div>
                      <div className="bg-teal-100 h-6 rounded"></div>
                    </div>
                  </div>
                )}

                {/* Selected indicator */}
                {currentTemplate === templateId && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-sm">{template.name}</h3>
                {currentTemplate === templateId && (
                  <Badge variant="default" className="mt-1 text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateModal;