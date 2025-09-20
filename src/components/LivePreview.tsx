import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  FileText,
  Printer
} from 'lucide-react';
import { useResume } from './ResumeStore';
import { resumeTemplates } from './ResumeTemplates';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const LivePreview: React.FC = () => {
  const { state } = useResume();
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = resumeTemplates[state.resumeData.templateId as keyof typeof resumeTemplates];
  const TemplateComponent = currentTemplate.component;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownloadPDF = async () => {
    if (previewRef.current) {
      try {
        // Create canvas from HTML element
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: 794, // A4 width in pixels at 96 DPI
          height: 1123, // A4 height in pixels at 96 DPI
        });

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Download the PDF
        const fileName = `${state.resumeData.personalInfo.fullName || 'Resume'}.pdf`;
        pdf.save(fileName);
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
      <CardHeader className="pb-3">
        {/* Top Row - Resume Preview Title and Full Preview Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <span className="text-lg font-semibold">Resume Preview</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Full Preview
          </Button>
        </div>

        {/* Bottom Row - Live Preview with Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5" />
            <span className="text-xl font-bold">Live Preview</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Template Badge */}
            <Badge variant="outline" className="px-3 py-1">
              {currentTemplate.name}
            </Badge>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2 min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4"
            >
              <Download className="h-4 w-4" />
              PDF
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`${isFullscreen ? 'h-[calc(100vh-5rem)] overflow-auto' : ''}`}>
        {/* Resume Preview Container */}
        <div className="border border-border rounded-lg overflow-hidden bg-white shadow-lg">
          <div 
            className="overflow-auto flex justify-center items-start"
            style={{ 
              height: isFullscreen ? 'calc(100vh - 10rem)' : '800px',
              backgroundColor: '#f8f9fa',
              padding: '20px'
            }}
          >
            <div 
              className="bg-white shadow-xl overflow-hidden"
              style={{ 
                width: zoom === 100 ? '100%' : `${zoom}%`,
                maxWidth: '800px',
                minHeight: '1000px',
                transform: zoom !== 100 ? `scale(${zoom / 100})` : 'none',
                transformOrigin: 'top center'
              }}
            >
              <div ref={previewRef} className="p-8">
                <TemplateComponent 
                  data={state.resumeData} 
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!state.resumeData.personalInfo.fullName && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Start Building Your Resume</h3>
                <p className="text-muted-foreground">
                  Add your personal information to see a live preview of your resume.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Preview Tips */}
        {!isFullscreen && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview Tips:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Changes are reflected in real-time as you edit</li>
              <li>• Use zoom controls to adjust the view</li>
              <li>• Click fullscreen for a better editing experience</li>
              <li>• Print or download PDF when you're ready</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LivePreview;