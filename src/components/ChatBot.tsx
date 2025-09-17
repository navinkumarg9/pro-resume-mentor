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
    'softwaredeveloper': `**Software Developer Requirements:**\n🎯 **Technical Skills:** JavaScript, Python, Java, React/Vue, SQL, Git\n💼 **Experience:** 2-5 years development, portfolio projects, SDLC knowledge\n📚 **Education:** CS degree, AWS/cloud certifications\n🌟 **Soft Skills:** Problem-solving, teamwork, communication`,
    'webdeveloper': `**Web Developer Requirements:**\n🎯 **Technical Skills:** HTML, CSS, JavaScript, React/Angular/Vue, Node.js, responsive design\n💼 **Experience:** 2-4 years web development, cross-browser compatibility\n📚 **Education:** CS degree or bootcamp, web certifications\n🌟 **Soft Skills:** Creativity, attention to detail, client communication`,
    'datascientist': `**Data Scientist Requirements:**\n🎯 **Technical Skills:** Python/R, SQL, Machine Learning, TensorFlow, Tableau, Statistics\n💼 **Experience:** 3-6 years data analysis, big data experience, A/B testing\n📚 **Education:** Master's/PhD in Data Science/Statistics, research background\n🌟 **Soft Skills:** Critical thinking, business acumen, presentation skills`,
    'marketingmanager': `**Marketing Manager Requirements:**\n🎯 **Technical Skills:** Google Analytics, SEO/SEM, social media platforms, marketing automation\n💼 **Experience:** 3-5 years marketing experience, campaign management\n📚 **Education:** Marketing/Business degree, digital marketing certifications\n🌟 **Soft Skills:** Creativity, analytical thinking, communication, project management`,
  };

  return requirements[roleKey] || `I can help with requirements for various roles including: Software Developer, Web Developer, Data Scientist, Marketing Manager, and more! What specific role interests you?`;
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
    
    // Job role requirements - check for various job roles
    if (lowerMessage.includes('software developer') || lowerMessage.includes('developer')) {
      return getJobRequirements('software developer');
    }
    if (lowerMessage.includes('data scientist') || lowerMessage.includes('data')) {
      return getJobRequirements('data scientist');
    }
    if (lowerMessage.includes('marketing')) {
      return getJobRequirements('marketing manager');
    }
    if (lowerMessage.includes('web developer')) {
      return getJobRequirements('web developer');
    }
    
    // General help
    return `I'm here to help with your resume! I can assist with:

• **Job Requirements** - Ask about roles like "software developer", "data scientist", "marketing manager"
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