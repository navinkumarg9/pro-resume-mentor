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

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI resume assistant. I can help you improve your resume, suggest content, and answer questions about best practices. How can I help you today?",
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

  const getResumeAnalysis = () => {
    const { resumeData, analysisScore } = state;
    const sections = {
      personalInfo: resumeData.personalInfo.fullName ? 'complete' : 'incomplete',
      experience: resumeData.experience.length > 0 ? 'complete' : 'missing',
      education: resumeData.education.length > 0 ? 'complete' : 'missing',
      skills: resumeData.skills.length > 0 ? 'complete' : 'missing',
      projects: resumeData.projects.length > 0 ? 'complete' : 'missing',
    };
    
    return { sections, score: analysisScore };
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    const analysis = getResumeAnalysis();
    
    // Job role requirements
    if (lowerMessage.includes('software developer') || lowerMessage.includes('developer') || lowerMessage.includes('programmer')) {
      return `**Software Developer Requirements:**

**Technical Skills:**
• Programming Languages: JavaScript, Python, Java, C#, or C++
• Frontend: HTML, CSS, React, Vue.js, or Angular
• Backend: Node.js, Django, Spring Boot, or .NET
• Databases: SQL (MySQL, PostgreSQL) and NoSQL (MongoDB)
• Version Control: Git and GitHub/GitLab
• Cloud Platforms: AWS, Azure, or Google Cloud

**Experience & Education:**
• Bachelor's degree in Computer Science or related field (or equivalent experience)
• 2-5 years of software development experience
• Portfolio of projects demonstrating coding skills

**Soft Skills:**
• Problem-solving and analytical thinking
• Team collaboration and communication
• Attention to detail and debugging skills
• Continuous learning mindset

**Resume Tips for Developers:**
• Include GitHub profile and live project links
• Quantify achievements (e.g., "Improved performance by 40%")
• List specific technologies and frameworks used
• Show progression from junior to senior responsibilities`;
    }

    if (lowerMessage.includes('data scientist') || lowerMessage.includes('data analyst') || lowerMessage.includes('machine learning')) {
      return `**Data Scientist Requirements:**

**Technical Skills:**
• Programming: Python, R, SQL, Scala
• Machine Learning: Scikit-learn, TensorFlow, PyTorch
• Data Analysis: Pandas, NumPy, Matplotlib, Seaborn
• Statistics: Hypothesis testing, regression analysis
• Big Data: Spark, Hadoop, Kafka
• Visualization: Tableau, Power BI, D3.js

**Education:**
• Master's/PhD in Statistics, Mathematics, Computer Science, or related field
• Strong foundation in statistics and mathematics
• Understanding of machine learning algorithms

**Experience:**
• 3+ years in data analysis or related field
• Experience with large datasets
• Business acumen and domain expertise

**Resume Tips:**
• Highlight specific projects with measurable outcomes
• Include publications or research if applicable
• Show proficiency with statistical methods
• Demonstrate business impact of your analyses`;
    }

    if (lowerMessage.includes('ui designer') || lowerMessage.includes('ux designer') || lowerMessage.includes('product designer')) {
      return `**UI/UX Designer Requirements:**

**Design Skills:**
• Design Tools: Figma, Sketch, Adobe Creative Suite
• Prototyping: InVision, Principle, Framer
• User Research: User interviews, usability testing
• Information Architecture: User flows, wireframing
• Visual Design: Typography, color theory, layout

**Technical Knowledge:**
• HTML/CSS basics for design handoff
• Understanding of responsive design principles
• Accessibility standards (WCAG)
• Design systems and component libraries

**Experience:**
• 2-4 years of design experience
• Portfolio showcasing design process
• Experience with user-centered design methodology

**Soft Skills:**
• Empathy for user needs
• Communication and presentation skills
• Collaboration with developers and stakeholders
• Creative problem-solving

**Resume Tips:**
• Lead with portfolio link
• Show design process, not just final designs
• Include user research and testing results
• Quantify design improvements (conversion rates, user satisfaction)`;
    }

    if (lowerMessage.includes('marketing') || lowerMessage.includes('digital marketing') || lowerMessage.includes('content marketing')) {
      return `**Marketing Specialist Requirements:**

**Digital Marketing Skills:**
• SEO/SEM: Google Analytics, Google Ads, keyword research
• Social Media: Facebook Ads, LinkedIn, Instagram, Twitter
• Email Marketing: Mailchimp, Constant Contact, automation
• Content Creation: Copywriting, video editing, graphic design
• Analytics: Google Analytics, social media insights, A/B testing

**Traditional Marketing:**
• Market research and competitive analysis
• Brand management and positioning
• Campaign planning and execution
• Budget management and ROI analysis

**Tools & Platforms:**
• CRM systems (HubSpot, Salesforce)
• Marketing automation tools
• Design software (Canva, Adobe Creative Suite)
• Project management tools

**Experience:**
• Bachelor's in Marketing, Communications, or related field
• 2-5 years of marketing experience
• Proven track record of successful campaigns

**Resume Tips:**
• Quantify results (CTR, conversion rates, ROI)
• Show multi-channel campaign experience
• Include specific tools and platforms used
• Highlight creative and analytical skills`;
    }

    if (lowerMessage.includes('project manager') || lowerMessage.includes('product manager') || lowerMessage.includes('scrum master')) {
      return `**Project/Product Manager Requirements:**

**Management Skills:**
• Project Planning: Gantt charts, resource allocation
• Agile/Scrum: Sprint planning, backlog management
• Risk Management: Risk assessment and mitigation
• Stakeholder Management: Communication and alignment
• Budget Management: Cost control and forecasting

**Tools & Methodologies:**
• Project Management: Jira, Asana, Monday.com
• Collaboration: Slack, Microsoft Teams, Confluence
• Documentation: Requirements gathering, user stories
• Analytics: Data-driven decision making

**Certifications:**
• PMP (Project Management Professional)
• Certified ScrumMaster (CSM)
• Product Management certifications

**Experience:**
• Bachelor's degree in Business, Engineering, or related field
• 3-7 years of project/product management experience
• Experience leading cross-functional teams

**Resume Tips:**
• Highlight successful project deliveries
• Show budget and timeline management
• Include team size and scope of projects managed
• Demonstrate stakeholder management skills`;
    }

    // Resume analysis request
    if (lowerMessage.includes('analyze') || lowerMessage.includes('score') || lowerMessage.includes('review')) {
      await analyzeResume();
      const scoreText = analysis.score >= 80 ? 'excellent' : analysis.score >= 60 ? 'good' : analysis.score >= 40 ? 'fair' : 'needs improvement';
      return `I've analyzed your resume and it scores ${analysis.score}/100 (${scoreText}). Here are some key observations:

${analysis.sections.personalInfo === 'incomplete' ? '• Complete your personal information section\n' : ''}${analysis.sections.experience === 'missing' ? '• Add your work experience\n' : ''}${analysis.sections.education === 'missing' ? '• Include your educational background\n' : ''}${analysis.sections.skills === 'missing' ? '• List your relevant skills\n' : ''}${analysis.sections.projects === 'missing' ? '• Consider adding projects to showcase your work\n' : ''}
Would you like specific suggestions for any section?`;
    }
    
    // Writing help requests
    if (lowerMessage.includes('summary') || lowerMessage.includes('objective')) {
      return `Here's how to write a compelling professional summary:

• Keep it 2-3 sentences (50-100 words)
• Start with your job title or years of experience
• Highlight your key skills and achievements
• Include industry-specific keywords
• End with your career goal or value proposition

Example: "Experienced Software Developer with 5+ years building scalable web applications. Proficient in React, Node.js, and cloud technologies. Led teams of 3-5 developers and delivered projects 20% ahead of schedule. Seeking to leverage expertise in full-stack development to drive innovation at a forward-thinking tech company."`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work history')) {
      return `For impactful work experience entries:

• Use action verbs (Led, Developed, Implemented, Achieved)
• Include specific metrics and achievements
• Focus on results, not just responsibilities
• Use bullet points for easy scanning
• Tailor content to the job you're applying for

Formula: Action Verb + What you did + Results/Impact
Example: "Developed responsive web applications using React, increasing user engagement by 40% and reducing load times by 25%"`;
    }
    
    if (lowerMessage.includes('skills')) {
      return `When listing skills:

• Organize by categories (Technical, Soft Skills, Languages)
• Include proficiency levels when relevant
• Focus on skills mentioned in job descriptions
• Balance hard and soft skills
• Keep it relevant to your target role

Technical Skills: List programming languages, tools, frameworks
Soft Skills: Leadership, communication, problem-solving
Certifications: Include relevant certifications with dates`;
    }
    
    // Template suggestions
    if (lowerMessage.includes('template') || lowerMessage.includes('design')) {
      return `Choose a template based on your industry:

• **Modern**: Clean, professional design for tech and creative roles
• **Classic**: Traditional format for conservative industries
• **Creative**: Colorful and unique for design and marketing roles
• **Executive**: Sophisticated layout for senior positions
• **Academic**: Detailed format for research and education roles

Your current template (${state.resumeData.templateId}) ${state.resumeData.templateId === 'modern' ? 'is versatile and works well for most industries' : 'has been selected'}. Need help choosing? Tell me about your target role!`;
    }
    
    // Job search advice
    if (lowerMessage.includes('job') || lowerMessage.includes('apply') || lowerMessage.includes('interview')) {
      return `Job search tips:

• Tailor your resume for each application
• Use keywords from the job description
• Keep it to 1-2 pages (unless you're in academia)
• Save as PDF to preserve formatting
• Include a cover letter when possible
• Follow up after applications
• Practice your elevator pitch

Remember: Your resume should tell a story of your career progression and achievements. Focus on value you bring to employers!`;
    }
    
    // General help
    return `I'm here to help with your resume! I can assist with:

• **Job Requirements** - Ask about roles like "software developer", "data scientist", "UI designer"
• **Resume Analysis** - Get a score and improvement suggestions
• **Writing Help** - Craft compelling summaries and descriptions  
• **Template Advice** - Choose the right design for your industry
• **Job Search Tips** - Best practices for applications and interviews

Just ask me something like "software developer requirements" or "analyze my resume" and I'll provide specific guidance!`;
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

    // Simulate typing delay
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
      {/* Chat Toggle Button */}
      <Button
        data-chat-toggle
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 ${isOpen ? 'hidden' : 'flex'} btn-hero`}
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-card border border-border rounded-xl shadow-xl z-50 flex flex-col animate-scale-in">
          {/* Header */}
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

          {/* Messages */}
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
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
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

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your resume..."
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