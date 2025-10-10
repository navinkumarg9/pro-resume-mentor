import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Download, 
  FileText,
  Printer,
  X
} from 'lucide-react';
import { useResume } from './ResumeStore';
import { resumeTemplates } from './ResumeTemplates';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const LivePreview: React.FC = () => {
  const { state } = useResume();
  const [isZoomed, setIsZoomed] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = resumeTemplates[state.resumeData.templateId as keyof typeof resumeTemplates];
  const TemplateComponent = currentTemplate.component;

  const handleDownloadPDF = async () => {
    if (previewRef.current) {
      try {
        // Create canvas from HTML element
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth; // Fit to A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Additional pages
        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // shift up remaining content
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Download the PDF
        const fileName = `${state.resumeData.personalInfo.fullName || 'Resume'}.pdf`;
        pdf.save(fileName);
        
        // Auto-save to library after download
        const resumeName = state.resumeData.personalInfo.fullName || 'My Resume';
        const stored = localStorage.getItem('savedResumes');
        const resumes = stored ? JSON.parse(stored) : [];
        
        // Check if resume with same name exists
        const existingIndex = resumes.findIndex((r: any) => r.name === resumeName);
        
        if (existingIndex >= 0) {
          // Update existing resume
          resumes[existingIndex] = {
            ...resumes[existingIndex],
            updatedAt: new Date().toISOString(),
            data: state.resumeData,
          };
        } else {
          // Add new resume
          resumes.push({
            id: Date.now().toString(),
            name: resumeName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            data: state.resumeData,
          });
        }
        
        localStorage.setItem('savedResumes', JSON.stringify(resumes));
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      }
    }
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${state.resumeData.personalInfo.fullName || 'Resume'}</title>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                @media print { body { margin: 0; padding: 0; } }
              </style>
            </head>
            <body>
              ${previewRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleResumeClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Resume Preview</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              {currentTemplate.name}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>

        {/* Resume Preview Container - Scaled to fit */}
        <div 
          className="flex-1 overflow-auto bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex items-start justify-center p-2"
          onClick={handleResumeClick}
        >
          <div 
            ref={previewRef}
            className="bg-white shadow-lg"
            style={{ 
              width: '210mm',
              minHeight: '297mm',
              padding: '20mm',
              boxSizing: 'border-box',
              transform: 'scale(0.45)',
              transformOrigin: 'top center',
              marginBottom: '-150mm'
            }}
          >
            <TemplateComponent 
              data={state.resumeData} 
              className="h-full"
            />
          </div>
        </div>

        {/* Preview Tips */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Click on the resume to view it larger
          </p>
        </div>
      </div>

      {/* Zoomed View Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          onClick={handleCloseZoom}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={handleCloseZoom}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div 
            className="overflow-auto max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="bg-white shadow-2xl"
              style={{ 
                width: '210mm',
                minHeight: '297mm',
                padding: '20mm',
                boxSizing: 'border-box'
              }}
            >
              <TemplateComponent 
                data={state.resumeData} 
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LivePreview;