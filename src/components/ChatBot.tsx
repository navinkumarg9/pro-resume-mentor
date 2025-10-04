import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useResume } from './ResumeStore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const getJobRequirements = (role: string): string => {
  const roleKey = role.toLowerCase().replace(/[\s-]/g, '');
  
  const requirements: { [key: string]: string } = {
    'softwaredeveloper': `**Software Developer Requirements:**\n🎯 **Technical Skills:** JavaScript, Python, Java, React/Vue, SQL, Git, AWS\n💼 **Experience:** 2-5 years development, portfolio projects, SDLC knowledge\n📚 **Education:** CS degree, AWS/cloud certifications\n🌟 **Soft Skills:** Problem-solving, teamwork, communication`,
    
    'webdeveloper': `**Web Developer Requirements:**\n🎯 **Technical Skills:** HTML, CSS, JavaScript, React/Angular/Vue, Node.js, responsive design\n💼 **Experience:** 2-4 years web development, cross-browser compatibility\n📚 **Education:** CS degree or bootcamp, web certifications\n🌟 **Soft Skills:** Creativity, attention to detail, client communication`,
    
    'datascientist': `**Data Scientist Requirements:**\n🎯 **Technical Skills:** Python/R, SQL, Machine Learning, TensorFlow, Tableau, Statistics\n💼 **Experience:** 3-6 years data analysis, big data experience, A/B testing\n📚 **Education:** Master's/PhD in Data Science/Statistics, research background\n🌟 **Soft Skills:** Critical thinking, business acumen, presentation skills`,
    
    'dataanalyst': `**Data Analyst Requirements:**\n🎯 **Technical Skills:** Excel, SQL, Python/R, Power BI, Tableau, data visualization\n💼 **Experience:** 2-4 years data analysis, reporting, dashboard creation\n📚 **Education:** Bachelor's in Statistics/Math/Economics\n🌟 **Soft Skills:** Analytical thinking, attention to detail, business understanding`,
    
    'frontenddeveloper': `**Frontend Developer Requirements:**\n🎯 **Technical Skills:** HTML, CSS, JavaScript, React, TypeScript, responsive design, REST APIs\n💼 **Experience:** 2-5 years frontend development, UI/UX collaboration\n📚 **Education:** CS degree or equivalent experience\n🌟 **Soft Skills:** Design sense, user-focused thinking, communication`,
    
    'backenddeveloper': `**Backend Developer Requirements:**\n🎯 **Technical Skills:** Node.js, Python, Java, SQL/NoSQL, REST APIs, microservices, cloud platforms\n💼 **Experience:** 3-6 years backend development, system architecture\n📚 **Education:** CS degree, cloud certifications\n🌟 **Soft Skills:** Problem-solving, scalability mindset, collaboration`,
    
    'fullstackdeveloper': `**Full Stack Developer Requirements:**\n🎯 **Technical Skills:** React/Vue/Angular, Node.js, databases, DevOps, Git, cloud services\n💼 **Experience:** 3-7 years full-stack development, end-to-end project delivery\n📚 **Education:** CS degree, full-stack certifications\n🌟 **Soft Skills:** Versatility, quick learning, project ownership`,
    
    'mobileappdeveloper': `**Mobile App Developer Requirements:**\n🎯 **Technical Skills:** React Native/Flutter or Swift/Kotlin, REST APIs, mobile UI/UX\n💼 **Experience:** 2-5 years mobile app development, App Store/Play Store deployments\n📚 **Education:** CS degree or mobile development certifications\n🌟 **Soft Skills:** User-centric design, performance optimization, adaptability`,
    
    'devopsengineer': `**DevOps Engineer Requirements:**\n🎯 **Technical Skills:** Docker, Kubernetes, Jenkins, AWS/Azure/GCP, CI/CD, scripting (Bash/Python)\n💼 **Experience:** 3-6 years DevOps, infrastructure automation, monitoring\n📚 **Education:** CS degree, AWS/Azure certifications\n🌟 **Soft Skills:** Problem-solving, automation mindset, collaboration`,
    
    'cloudarchitect': `**Cloud Architect Requirements:**\n🎯 **Technical Skills:** AWS/Azure/GCP, cloud architecture, security, networking, IaC (Terraform)\n💼 **Experience:** 5-10 years cloud infrastructure, enterprise architecture\n📚 **Education:** CS degree, cloud architect certifications\n🌟 **Soft Skills:** Strategic thinking, leadership, communication`,
    
    'productmanager': `**Product Manager Requirements:**\n🎯 **Technical Skills:** Product analytics, roadmapping tools, SQL, Agile/Scrum\n💼 **Experience:** 3-7 years product management, product launches, user research\n📚 **Education:** Business/Technical degree, PM certifications\n🌟 **Soft Skills:** Leadership, strategic thinking, stakeholder management`,
    
    'projectmanager': `**Project Manager Requirements:**\n🎯 **Technical Skills:** MS Project, JIRA, Agile/Scrum, risk management, budget planning\n💼 **Experience:** 4-8 years project management, cross-functional team leadership\n📚 **Education:** PMP certification, business degree\n🌟 **Soft Skills:** Leadership, communication, organization, problem-solving`,
    
    'uxuidesigner': `**UX/UI Designer Requirements:**\n🎯 **Technical Skills:** Figma, Adobe XD, Sketch, user research, prototyping, design systems\n💼 **Experience:** 2-5 years UX/UI design, portfolio of design work\n📚 **Education:** Design degree, UX certifications\n🌟 **Soft Skills:** Creativity, empathy, collaboration, visual communication`,
    
    'businessanalyst': `**Business Analyst Requirements:**\n🎯 **Technical Skills:** SQL, Excel, Power BI, requirements gathering, process modeling\n💼 **Experience:** 3-6 years business analysis, documentation, stakeholder management\n📚 **Education:** Business degree, CBAP certification\n🌟 **Soft Skills:** Analytical thinking, communication, problem-solving`,
    
    'marketingmanager': `**Marketing Manager Requirements:**\n🎯 **Technical Skills:** Google Analytics, SEO/SEM, social media platforms, marketing automation\n💼 **Experience:** 3-5 years marketing experience, campaign management\n📚 **Education:** Marketing/Business degree, digital marketing certifications\n🌟 **Soft Skills:** Creativity, analytical thinking, communication, project management`,
    
    'digitalmarketer': `**Digital Marketing Specialist Requirements:**\n🎯 **Technical Skills:** Google Ads, Facebook Ads, SEO, email marketing, content marketing\n💼 **Experience:** 2-4 years digital marketing, campaign optimization\n📚 **Education:** Marketing degree, Google Ads/Analytics certifications\n🌟 **Soft Skills:** Creativity, data-driven thinking, adaptability`,
    
    'contentwriter': `**Content Writer Requirements:**\n🎯 **Technical Skills:** SEO writing, CMS (WordPress), research, editing, content strategy\n💼 **Experience:** 2-4 years content writing, portfolio of published work\n📚 **Education:** English/Journalism/Communications degree\n🌟 **Soft Skills:** Creativity, attention to detail, time management`,
    
    'graphicdesigner': `**Graphic Designer Requirements:**\n🎯 **Technical Skills:** Adobe Creative Suite, Figma, typography, color theory, branding\n💼 **Experience:** 2-5 years graphic design, portfolio demonstrating creativity\n📚 **Education:** Design degree or equivalent portfolio\n🌟 **Soft Skills:** Creativity, visual communication, client collaboration`,
    
    'hrmanager': `**HR Manager Requirements:**\n🎯 **Technical Skills:** HRIS systems, recruitment tools, compliance knowledge, performance management\n💼 **Experience:** 4-7 years HR experience, employee relations, talent acquisition\n📚 **Education:** HR degree, SHRM/PHR certification\n🌟 **Soft Skills:** Interpersonal skills, conflict resolution, leadership`,
    
    'salesmanager': `**Sales Manager Requirements:**\n🎯 **Technical Skills:** CRM (Salesforce), sales analytics, forecasting, pipeline management\n💼 **Experience:** 4-8 years sales experience, team leadership, quota achievement\n📚 **Education:** Business degree, sales certifications\n🌟 **Soft Skills:** Leadership, negotiation, communication, motivation`,
    
    'accountant': `**Accountant Requirements:**\n🎯 **Technical Skills:** QuickBooks, Excel, financial reporting, tax preparation, GAAP knowledge\n💼 **Experience:** 2-5 years accounting, financial analysis, auditing\n📚 **Education:** Accounting degree, CPA certification\n🌟 **Soft Skills:** Attention to detail, analytical thinking, integrity`,
    
    'financialanalyst': `**Financial Analyst Requirements:**\n🎯 **Technical Skills:** Excel, financial modeling, Bloomberg, SQL, forecasting, valuation\n💼 **Experience:** 2-5 years financial analysis, investment analysis\n📚 **Education:** Finance degree, CFA certification preferred\n🌟 **Soft Skills:** Analytical thinking, attention to detail, communication`,
    
    'cybersecurityanalyst': `**Cybersecurity Analyst Requirements:**\n🎯 **Technical Skills:** Network security, SIEM tools, penetration testing, firewall management\n💼 **Experience:** 3-6 years cybersecurity, incident response, vulnerability assessment\n📚 **Education:** CS degree, CISSP/CEH certifications\n🌟 **Soft Skills:** Problem-solving, attention to detail, continuous learning`,
    
    'systemadministrator': `**System Administrator Requirements:**\n🎯 **Technical Skills:** Windows/Linux servers, Active Directory, networking, backup solutions\n💼 **Experience:** 2-5 years system administration, troubleshooting, maintenance\n📚 **Education:** IT degree, Microsoft/Linux certifications\n🌟 **Soft Skills:** Problem-solving, attention to detail, documentation`,
    
    'qaengineer': `**QA Engineer Requirements:**\n🎯 **Technical Skills:** Test automation (Selenium, Cypress), manual testing, bug tracking, API testing\n💼 **Experience:** 2-5 years QA testing, test case creation, automation\n📚 **Education:** CS degree, ISTQB certification\n🌟 **Soft Skills:** Attention to detail, analytical thinking, communication`,
  };

  return requirements[roleKey] || `I can help with requirements for 25+ roles including:\n\n**Tech:** Software Developer, Data Scientist, Frontend/Backend Developer, DevOps, Cloud Architect\n**Design:** UX/UI Designer, Graphic Designer\n**Business:** Product Manager, Business Analyst, Project Manager\n**Marketing:** Marketing Manager, Digital Marketer, Content Writer\n**Other:** HR Manager, Sales Manager, Accountant, QA Engineer\n\nJust ask about any specific role!`;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI resume assistant. I can help you improve your resume, suggest content, and answer questions about job requirements. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state, analyzeResume } = useResume();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Job role requirements - comprehensive matching
    const roleMatches = [
      { keywords: ['software developer', 'software engineer'], role: 'software developer' },
      { keywords: ['web developer', 'web dev'], role: 'web developer' },
      { keywords: ['frontend', 'front-end', 'front end'], role: 'frontend developer' },
      { keywords: ['backend', 'back-end', 'back end'], role: 'backend developer' },
      { keywords: ['full stack', 'fullstack', 'full-stack'], role: 'full stack developer' },
      { keywords: ['mobile', 'app developer', 'ios', 'android'], role: 'mobile app developer' },
      { keywords: ['data scientist', 'data science'], role: 'data scientist' },
      { keywords: ['data analyst', 'data analysis'], role: 'data analyst' },
      { keywords: ['devops', 'dev ops'], role: 'devops engineer' },
      { keywords: ['cloud architect', 'cloud engineer'], role: 'cloud architect' },
      { keywords: ['product manager', 'pm', 'product management'], role: 'product manager' },
      { keywords: ['project manager', 'pmp'], role: 'project manager' },
      { keywords: ['ux', 'ui', 'designer', 'ux/ui'], role: 'ux/ui designer' },
      { keywords: ['business analyst', 'ba'], role: 'business analyst' },
      { keywords: ['marketing manager', 'marketing lead'], role: 'marketing manager' },
      { keywords: ['digital marketing', 'digital marketer'], role: 'digital marketer' },
      { keywords: ['content writer', 'content creator', 'copywriter'], role: 'content writer' },
      { keywords: ['graphic designer', 'graphic design'], role: 'graphic designer' },
      { keywords: ['hr manager', 'human resources'], role: 'hr manager' },
      { keywords: ['sales manager', 'sales lead'], role: 'sales manager' },
      { keywords: ['accountant', 'accounting'], role: 'accountant' },
      { keywords: ['financial analyst', 'finance'], role: 'financial analyst' },
      { keywords: ['cybersecurity', 'security analyst', 'infosec'], role: 'cybersecurity analyst' },
      { keywords: ['system administrator', 'sysadmin', 'sys admin'], role: 'system administrator' },
      { keywords: ['qa engineer', 'qa', 'quality assurance', 'tester'], role: 'qa engineer' },
    ];
    
    for (const match of roleMatches) {
      if (match.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return getJobRequirements(match.role);
      }
    }
    
    // General help
    return `I'm here to help with your resume! I can assist with:

• **Job Requirements** - Ask about 25+ roles like "software developer", "data scientist", "product manager", "ux designer"
• **Resume Analysis** - Get a score and improvement suggestions
• **Writing Help** - Craft compelling summaries and descriptions  
• **Template Advice** - Choose the right design for your industry

Just ask me something like "software developer requirements" and I'll provide specific guidance!`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 ${isOpen ? 'hidden' : 'flex'} btn-hero`}
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-card border border-border rounded-xl shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <h3 className="font-semibold text-primary-foreground">Resume Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about job requirements..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm" className="btn-professional">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;