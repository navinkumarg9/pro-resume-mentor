import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExamplesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const professionalSummaryExamples = [
  {
    role: "Software Developer",
    summary: "Results-driven Software Developer with 5+ years of experience designing and developing user-centered applications. Proficient in JavaScript, React, and Node.js with a track record of improving application performance by 40%. Passionate about clean code and user-centered design with a proven ability to lead development teams to deliver high-quality products on time."
  },
  {
    role: "Marketing Manager",
    summary: "Strategic Marketing Manager with 7+ years of experience developing integrated marketing campaigns that drive business growth. Expertise in digital marketing, brand development, and market analysis with a history of increasing conversion rates by 35% and reducing customer acquisition costs by 25%. Adept at leveraging data analytics to optimize marketing strategies and deliver measurable results."
  },
  {
    role: "Project Manager",
    summary: "Certified Project Manager (PMP) with 8+ years of experience leading cross-functional teams to deliver complex projects on time and under budget. Skilled in Agile methodologies, risk management, and stakeholder communication with a proven track record of reducing project costs by 20% while maintaining quality standards. Experienced in managing projects with budgets exceeding $1M across healthcare and technology sectors."
  },
  {
    role: "Recent Graduate",
    summary: "Motivated Computer Science graduate with strong programming skills and internship experience at a leading tech company. Proficient in Java, Python, and web development with hands-on experience building full-stack applications. Eager to apply technical knowledge and problem-solving abilities to contribute to innovative software solutions."
  },
  {
    role: "Data Scientist",
    summary: "Data-driven scientist with 6+ years of experience leveraging machine learning and statistical analysis to solve complex business problems. Expert in Python, R, and SQL with a proven ability to translate data insights into actionable strategies that increased revenue by 30%. Passionate about building predictive models and data visualizations that drive strategic decision-making."
  },
  {
    role: "UX/UI Designer",
    summary: "Creative UX/UI Designer with 5+ years of experience crafting intuitive and visually appealing digital experiences. Proficient in Figma, Adobe XD, and user research methodologies with a track record of improving user satisfaction scores by 45%. Skilled at collaborating with cross-functional teams to deliver design solutions that balance user needs with business objectives."
  },
  {
    role: "Sales Manager",
    summary: "Dynamic Sales Manager with 10+ years of experience building and leading high-performing sales teams. Proven track record of exceeding revenue targets by 150% and expanding market share by 40%. Expert in consultative selling, relationship management, and sales strategy development with a passion for coaching teams to achieve exceptional results."
  },
  {
    role: "Financial Analyst",
    summary: "Detail-oriented Financial Analyst with 4+ years of experience providing strategic financial insights to drive business growth. Proficient in financial modeling, forecasting, and data analysis with expertise in Excel, SQL, and Tableau. Proven ability to identify cost-saving opportunities resulting in annual savings of $500K+ while supporting executive decision-making."
  }
];

const writingTips = [
  "Keep your summary concise (3-4 sentences) and focused on your most relevant qualifications.",
  "Include your years of experience, key skills, and notable achievements.",
  "Tailor your summary to match the job description of each position you apply for.",
  "Use strong action verbs and industry-specific keywords that will catch a recruiter's attention.",
  "Avoid using first-person pronouns (I, me, my) in your professional summary.",
  "Quantify your achievements with specific numbers and percentages when possible.",
  "Highlight what makes you unique and what value you bring to potential employers.",
  "Focus on your most recent and relevant experience rather than outdated skills."
];

export const ExamplesDialog = ({ open, onOpenChange }: ExamplesDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("examples");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Example has been copied to your clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Professional Summary Examples
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Browse examples to help you write effective content for your resume.
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="tips">Writing Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
            {professionalSummaryExamples.map((example, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-base">{example.role}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(example.summary)}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {example.summary}
                </p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="flex-1 overflow-y-auto mt-4 pr-2">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold text-lg mb-4">Tips for Writing Great Professional Summary</h3>
                <ul className="space-y-3">
                  {writingTips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary font-semibold flex-shrink-0">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
