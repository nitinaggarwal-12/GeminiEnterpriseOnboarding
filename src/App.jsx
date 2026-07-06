import React, { useState, useEffect } from 'react';
import { 
  Check, Play, ArrowRight, Info, AlertTriangle, AlertCircle, Sparkles, BookOpen, 
  Terminal, Code, Search, RefreshCw, BarChart2, CheckCircle2, Copy, FileText, 
  Globe, Shield, Database, Users, Briefcase, Award, Zap, HelpCircle, HardDrive,
  Eye, ChevronRight, CheckSquare, Settings, ArrowUpRight, X, ArrowLeft, Send,
  Plus, MessageSquare, ChevronDown, Sliders, CornerDownLeft
} from 'lucide-react';
import usecasesData from './data/usecases.json';

import uc1_s1 from './assets/real_uc1_step1_navigation.png';
import uc1_s2 from './assets/real_uc1_step2_configuration.png';
import uc1_s3 from './assets/real_uc1_step3_execution.png';
import uc1_s4 from './assets/real_uc1_step4_output.png';

import uc2_s1 from './assets/real_uc2_step1_gem.png';
import uc2_s2 from './assets/real_uc2_step2_prompt.png';
import uc2_s3 from './assets/real_uc2_step3_output.png';

import uc8_s1 from './assets/real_uc8_step1_notebooklm.png';
import uc8_s2 from './assets/real_uc8_step2_upload.png';
import uc8_s3 from './assets/real_uc8_step3_prompt.png';
import uc8_s4 from './assets/real_uc8_step4_output.png';

import uc14_s1 from './assets/real_uc14_step1_deepresearch.png';
import uc14_s2 from './assets/real_uc14_step2_prompt.png';
import uc14_s3 from './assets/real_uc14_step3_output.png';

// Define simplified 3-step full-screen tour configurations for all 17 workflows
const TOUR_STEPS = {
  "1. Improve Language & Readability": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click the 'New Chat' button in the sidebar to open a clean conversational workspace inside Gemini.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Configure & Send Prompt",
      instruction: "Review the pre-filled prompt parameters in the input box, then click the Send button (paper airplane icon) or press the physical 'Enter' key to execute.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify GxP Output & Metrics",
      instruction: "Review the verified regulatory text and safety grounding metrics. The response confirms the context is GxP compliant.",
      targetId: "gemini-response-bubble"
    }
  ],
  "2. Consistent Voice Copywriting": [
    {
      title: "Load Pinned Brand Gem",
      instruction: "Click the 'Idea Generation' agent Gem in the sidebar to inherit pre-configured copywriting voice guidelines.",
      targetId: "gemini-sidebar-gem"
    },
    {
      title: "Configure & Send Prompt",
      instruction: "Review the target copy parameters in the input box, then click the Send button or press Enter to generate copy.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Output Copy",
      instruction: "Verify that the generated marketing copy conforms to brand guidelines.",
      targetId: "gemini-response-bubble"
    }
  ],
  "3. Document Summarization": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean workspace in Gemini.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload PDF & Send Prompt",
      instruction: "Review the FDA guidance document attachment and summary query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Table Output",
      instruction: "Review the structured table containing regulatory milestones and compliance owners.",
      targetId: "gemini-response-bubble"
    }
  ],
  "4. Meeting Minutes Memory": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click the 'New Chat' button in the sidebar to open a fresh conversational thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Transcript & Send",
      instruction: "Review the attached meeting audio transcript, then click the Send button or press Enter to extract action items.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Review Extracted Actions",
      instruction: "Review the compiled list of owners and copy the follow-up email draft directly to your clipboard.",
      targetId: "gemini-response-bubble"
    }
  ],
  "5. Digital Marketing & SEO": [
    {
      title: "Load Pinned Brand Gem",
      instruction: "Click the 'Idea Generation' agent Gem in the sidebar to inherit pre-approved marketing guidelines.",
      targetId: "gemini-sidebar-gem"
    },
    {
      title: "Configure & Send Prompt",
      instruction: "Review the ad copy generation prompt in the input box, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Target Copy Variants",
      instruction: "Verify the generated LinkedIn ad variations align with corporate marketing tone policies.",
      targetId: "gemini-response-bubble"
    }
  ],
  "6. HR & Recruitment Support": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean workspace.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Resumes & Send",
      instruction: "Review the attached candidate resumes and comparative query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Candidate Evaluation Grid",
      instruction: "Review the comparison grid. Candidate qualifications matching GxP guidelines are highlighted.",
      targetId: "gemini-response-bubble"
    }
  ],
  "7. Expense & Budget Reporting": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to start a clean thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Excel & Send",
      instruction: "Review the budget spreadsheet attachment and audit query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Review Expense Anomaly Report",
      instruction: "Review travel expense anomalies exceeding the $5,000 threshold in the output table.",
      targetId: "gemini-response-bubble"
    }
  ],
  "8. Onboarding Repositories": [
    {
      title: "Navigate to NotebookLM Workspace",
      instruction: "Click the 'NotebookLM' agent link in the sidebar to open the secure knowledge repository hub.",
      targetId: "gemini-sidebar-notebooklm"
    },
    {
      title: "Configure & Send Prompt",
      instruction: "Review the onboarding guide attachment and query, then click the Send button or press Enter to search.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Grounded Output",
      instruction: "Review the response stability testing specifications complete with citations linked to the manual.",
      targetId: "gemini-response-bubble"
    }
  ],
  "9. Localizing Marketing Materials": [
    {
      title: "Load Pinned Brand Gem",
      instruction: "Click the 'Idea Generation' agent Gem in the sidebar to inherit translation tone parameters.",
      targetId: "gemini-sidebar-gem"
    },
    {
      title: "Upload English Brochure & Send",
      instruction: "Review the Spanish translation query and attached brochure, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Spanish Translation",
      instruction: "Verify Spanish translation medical terminology aligns with LATAM local guidelines.",
      targetId: "gemini-response-bubble"
    }
  ],
  "10. Product Discovery": [
    {
      title: "Load Pinned Brand Gem",
      instruction: "Click the 'Idea Generation' agent Gem in the sidebar to load the brainstorming template.",
      targetId: "gemini-sidebar-gem"
    },
    {
      title: "Configure & Send Prompt",
      instruction: "Review the portal feature ideation query in the input box, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Investigator Site Feature Concepts",
      instruction: "Review features, focusing on OCR scanners and investigator dashboard mocks.",
      targetId: "gemini-response-bubble"
    }
  ],
  "11. Developer Problem Solving": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean developer workspace.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Input Python Code & Send",
      instruction: "Review the pasted Python parsing script and performance check query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Code Suggestions",
      instruction: "Review code refactoring blocks and recommended GxP audit logging code edits.",
      targetId: "gemini-response-bubble"
    }
  ],
  "12. Grant & Portfolio Management": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Proposal PDFs & Send",
      instruction: "Review the attached research proposals and evaluation query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Ranking Table",
      instruction: "Review proposal ranking metrics and recommended allocations sorted in a comparison table.",
      targetId: "gemini-response-bubble"
    }
  ],
  "13. Workflow & Task Automation": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Enter Template Prompt & Send",
      instruction: "Review the task template definition prompt in the input box, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify PR & Jira Templates",
      instruction: "Review the generated pull request and documentation description templates.",
      targetId: "gemini-response-bubble"
    }
  ],
  "14. Researcher Literature Review": [
    {
      title: "Open Deep Research Pipeline",
      instruction: "Click on 'Deep Research' in the sidebar to trigger search grounding and Vector DB parsing.",
      targetId: "gemini-sidebar-deepresearch"
    },
    {
      title: "Configure Search & Send",
      instruction: "Review the literature review parameters and target PDF files, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Audit Extracted Tables",
      instruction: "Review the vector data matching tables and compliance flags for complex scientific charts.",
      targetId: "gemini-response-bubble"
    }
  ],
  "15. Compliance & Safety Auditing": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to open a clean thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Draft SOP & Send",
      instruction: "Review the SOP document attachment and OSHA compliance query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify OSHA Compliance Report",
      instruction: "Review safety guidelines reports and highlighted compliance gaps.",
      targetId: "gemini-response-bubble"
    }
  ],
  "16. Customer Support Helper": [
    {
      title: "Load Pinned Brand Gem",
      instruction: "Click the 'Idea Generation' agent Gem in the sidebar to load support voice guidelines.",
      targetId: "gemini-sidebar-gem"
    },
    {
      title: "Enter Response Prompt & Send",
      instruction: "Review the support message template prompt in the input box, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Response Draft",
      instruction: "Review the generated email draft. Key parameters like security links are pre-verified.",
      targetId: "gemini-response-bubble"
    }
  ],
  "17. Competitive Intelligence": [
    {
      title: "Initialize Chat Thread",
      instruction: "Click 'New Chat' in the sidebar to start a clean thread.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Upload Competitor Releases & Send",
      instruction: "Review attached press releases and pipeline timelines query, then click the Send button or press Enter.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Pipeline Comparison Report",
      instruction: "Review competitor approval timelines compared directly against Compound Alpha release dates.",
      targetId: "gemini-response-bubble"
    }
  ],
  "18. Orchestrator Intent Routing Diagnostic": [
    {
      title: "Initialize Diagnostic Probe",
      instruction: "Click 'New Chat' in the sidebar to open the clean console workspace.",
      targetId: "gemini-new-chat-btn"
    },
    {
      title: "Send Routing Test Ping",
      instruction: "Review the system diagnostic query in the input box, then click Send to dispatch latency probes to all spokes.",
      targetId: "gemini-send-btn"
    },
    {
      title: "Verify Router Latencies",
      instruction: "Review the test results output and GxP safety validation checks to verify router operational health.",
      targetId: "gemini-response-bubble"
    }
  ]
};

const REAL_WALKTHROUGH_IMAGES = {
  "1. Improve Language & Readability": [uc1_s1, uc1_s2, uc1_s3, uc1_s4],
  "2. Consistent Voice Copywriting": [uc2_s1, uc2_s2, uc2_s3],
  "8. Onboarding Repositories": [uc8_s1, uc8_s2, uc8_s3, uc8_s4],
  "14. Researcher Literature Review": [uc14_s1, uc14_s2, uc14_s3]
};

const REAL_ENVIRONMENT_URLS = {
  "1. Improve Language & Readability": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "2. Consistent Voice Copywriting": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/ideaforge/-?hl=en_US",
  "3. Document Summarization": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "4. Meeting Minutes Memory": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "5. Digital Marketing & SEO": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/image-and-video?hl=en_US",
  "6. HR & Recruitment Support": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "7. Expense & Budget Reporting": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "8. Onboarding Repositories": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/notebook?hl=en_US",
  "9. Localizing Marketing Materials": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/image-and-video?hl=en_US",
  "10. Product Discovery": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/notebook?hl=en_US",
  "11. Developer Problem Solving": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "12. Grant & Portfolio Management": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/notebook?hl=en_US",
  "13. Workflow & Task Automation": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "14. Researcher Literature Review": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e/r/notebook?hl=en_US",
  "15. ITRMS & EU AI Act Compliance": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "16. Contract Review & Analysis": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "17. Predictive Modeling & EDA": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US",
  "18. Orchestrator Intent Routing Diagnostic": "https://vertexaisearch.cloud.google.com/home/cid/d0f8d75e-4a29-460f-8bcf-6a56d33ede4e?hl=en_US"
};

function App() {
  const [activeWorkflowId, setActiveWorkflowId] = useState(null); // null means picker dashboard
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedWorkflows, setCompletedWorkflows] = useState({});
  const [isPromptFocused, setIsPromptFocused] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [logsList, setLogsList] = useState([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showRationaleTab, setShowRationaleTab] = useState(false);
  const [isTourMinimized, setIsTourMinimized] = useState(false);
  const [highlightCoords, setHighlightCoords] = useState(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [liveAnswer, setLiveAnswer] = useState('');
  const [liveQuestions, setLiveQuestions] = useState([]);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const [selectedAgentFilter, setSelectedAgentFilter] = useState(null);
  const [selectedPatternFilter, setSelectedPatternFilter] = useState(null);
  const [showModelArmorSpecs, setShowModelArmorSpecs] = useState(false);
  const [traceLogs, setTraceLogs] = useState(["System Initialized. Listening on port 8002..."]);

  useEffect(() => {
    const logs = [
      "Coordinator: intercepting prompt query...",
      "Model Armor: scanning input for GxP compliance...",
      "Model Armor: input verified (0 policy violations)",
      "Router: routing query to RAG Grounding Spoke...",
      "RAG Spoke: querying Enterprise SOP vector index...",
      "RAG Spoke: retrieved 3 relevant passages",
      "Coordinator: compiling grounded response...",
      "Model Armor: scanning output for hallucinations...",
      "Model Armor: output verified. Delivering payload.",
      "Coordinator: system idle. Monitoring ports..."
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setTraceLogs(prev => {
        const next = [...prev, logs[idx]];
        idx = (idx + 1) % logs.length;
        if (next.length > 5) next.shift();
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);


  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

  const fetchGeminiResponse = async (promptText) => {
    setIsLiveLoading(true);
    setLiveAnswer('');
    
    const systemPrompt = `You are a Gemini Enterprise AI assistant. 
Analyze the user query in a pharmaceutical compliance context (grounding, GxP standards, FDA parameters where relevant).
Format your output as a JSON object matching this schema:
{
  "answer": "markdown formatted string containing your GxP-grounded compliance response. Use clean bold headings and bullet points.",
  "suggestedQuestions": ["follow-up question 1", "follow-up question 2", "follow-up question 3"]
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              { parts: [{ text: `${systemPrompt}\n\nUser Query: ${promptText}` }] }
            ],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(rawText);
      
      setLiveAnswer(parsed.answer);
      setLiveQuestions(parsed.suggestedQuestions);
    } catch (e) {
      console.error("Gemini API Error or Timeout, falling back to local mocks:", e);
    } finally {
      setIsLiveLoading(false);
    }
  };
  const handleMouseDown = (e) => {
    if (e.target.closest('.tour-tooltip-header')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - cardPos.x, y: e.clientY - cardPos.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setCardPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, cardPos]);

  useEffect(() => {
    const updateCoords = () => {
      if (!activeWorkflowId || isTourMinimized) {
        setHighlightCoords(null);
        return;
      }
      if (currentStep && currentStep.targetId) {
        // Add a micro-timeout to wait for transitions to finish rendering
        setTimeout(() => {
          const el = document.getElementById(currentStep.targetId);
          if (el) {
            const rect = el.getBoundingClientRect();
            setHighlightCoords({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            });
          } else {
            setHighlightCoords(null);
          }
        }, 100);
      } else {
        setHighlightCoords(null);
      }
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
    };
  }, [currentStepIndex, activeWorkflowId, isTourMinimized, simulationActive, simulationDone]);

  useEffect(() => {
    const saved = localStorage.getItem('enterprise_gemini_adoption_completed_workflows');
    if (saved) {
      try { setCompletedWorkflows(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveCompletion = (newCompleted) => {
    setCompletedWorkflows(newCompleted);
    localStorage.setItem('enterprise_gemini_adoption_completed_workflows', JSON.stringify(newCompleted));
  };

  const handleSelectWorkflow = (name) => {
    setActiveWorkflowId(name);
    setCurrentStepIndex(0);
    setSimulationDone(false);
    setSimulationActive(false);
    setLogsList([]);
    setCustomPrompt('');
    setShowRationaleTab(false);
    setIsTourMinimized(false);
    setCardPos({ x: 0, y: 0 });
    setLiveAnswer('');
    setLiveQuestions([]);
    setSelectedAgentFilter(null);
    setSelectedPatternFilter(null);
  };

  const activeUseCase = usecasesData.find(uc => uc["Use Case Name"] === activeWorkflowId) || usecasesData[0];
  const activeSteps = TOUR_STEPS[activeWorkflowId] || [];
  const currentStep = activeSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex === 1 && !simulationDone) {
      // Trigger live API fetch in parallel
      const promptToRun = getDynamicPrompt();
      fetchGeminiResponse(promptToRun);

      // Simulate running logs console on Step 2 (Configure & Send)
      const userKeywords = customPrompt.trim() 
        ? `"${customPrompt.trim().substring(0, 30)}${customPrompt.trim().length > 30 ? '...' : ''}"` 
        : `default scoping parameters`;
      const targetAgentId = (getAgentForUseCase(activeUseCase["Use Case Name"]) || 'rag').toUpperCase();

      setSimulationActive(true);
      const tempLogs = [
        `[Coordinator Agent]➔ Intent parsed for ${userKeywords}.`,
        `[Coordinator Agent]➔ Routing payload to specialized ${targetAgentId} Spoke.`,
        `[System]➔ Dispatching live GxP check request to Gemini API...`,
        `[${targetAgentId} Agent]➔ Executing compliance validation on GxP grounding data.`,
        `[System]➔ Live response stream parsed (Status: 200 OK).`,
        `[Model Armor]➔ Output compliance check: 0 GxP safety violations.`,
        `[System]➔ Process complete. Renders UI bubble.`
      ];
      let idx = 0;
      setLogsList([]);
      const interval = setInterval(() => {
        if (idx < tempLogs.length) {
          setLogsList(prev => [...prev, tempLogs[idx]]);
          idx++;
        } else {
          clearInterval(interval);
          setSimulationActive(false);
          setSimulationDone(true);
          setCurrentStepIndex(prev => prev + 1);
          setCardPos({ x: 0, y: 0 });
        }
      }, 700);
    } else if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setCardPos({ x: 0, y: 0 });
    } else {
      // Final Step completed
      const newCompleted = { ...completedWorkflows, [activeWorkflowId]: true };
      saveCompletion(newCompleted);
      setActiveWorkflowId(null); // return to picker
      setCardPos({ x: 0, y: 0 });
    }
  };

  const handleBackStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setCardPos({ x: 0, y: 0 });
    }
  };

  const USECASE_METADATA_MAP = {
    "1. Improve Language & Readability": { agentId: "copywriter", patternId: "Parallel Chain" },
    "2. Consistent Voice Copywriting": { agentId: "copywriter", patternId: "Parallel Chain" },
    "3. Document Summarization": { agentId: "rag", patternId: "ReAct Loop" },
    "4. Meeting Minutes Memory": { agentId: "rag", patternId: "ReAct Loop" },
    "5. Digital Marketing & SEO": { agentId: "copywriter", patternId: "Parallel Chain" },
    "6. HR & Recruitment Support": { agentId: "rag", patternId: "Router Handoff" },
    "7. Expense & Budget Reporting": { agentId: "docai", patternId: "ReAct Loop" },
    "8. Onboarding Repositories": { agentId: "rag", patternId: "ReAct Loop" },
    "9. Localizing Marketing Materials": { agentId: "copywriter", patternId: "Parallel Chain" },
    "10. Product Discovery": { agentId: "rag", patternId: "Router Handoff" },
    "11. Developer Problem Solving": { agentId: "developer", patternId: "Router Handoff" },
    "12. Grant & Portfolio Management": { agentId: "rag", patternId: "ReAct Loop" },
    "13. Workflow & Task Automation": { agentId: "developer", patternId: "Router Handoff" },
    "14. Researcher Literature Review": { agentId: "docai", patternId: "Router Handoff" },
    "15. ITRMS & EU AI Act Compliance": { agentId: "compliance", patternId: "Parallel Chain" },
    "16. Contract Review & Analysis": { agentId: "compliance", patternId: "Parallel Chain" },
    "17. Predictive Modeling & EDA": { agentId: "developer", patternId: "Router Handoff" },
    "18. Orchestrator Intent Routing Diagnostic": { agentId: "coordinator", patternId: "Router Handoff" }
  };

  const getPatternForUseCase = (name) => {
    return USECASE_METADATA_MAP[name]?.patternId || "Router Handoff";
  };

  const getAgentForUseCase = (name) => {
    return USECASE_METADATA_MAP[name]?.agentId || null;
  };

  const filteredUseCases = usecasesData.filter(uc => {
    const matchesSearch = uc["Use Case Name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uc["Business Objective"].toLowerCase().includes(searchQuery.toLowerCase());
    
    const pattern = getPatternForUseCase(uc["Use Case Name"]);
    const matchesPattern = !selectedPatternFilter || pattern === selectedPatternFilter;
    
    const agent = getAgentForUseCase(uc["Use Case Name"]);
    const matchesAgent = !selectedAgentFilter || agent === selectedAgentFilter;

    return matchesSearch && matchesPattern && matchesAgent;
  });

  const completedCount = Object.keys(completedWorkflows).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / usecasesData.length) * 100);

  const getTourDockSide = () => {
    if (highlightCoords) {
      const targetMidpoint = highlightCoords.left + highlightCoords.width / 2;
      const screenMidpoint = window.innerWidth / 2;
      if (targetMidpoint > screenMidpoint) {
        return { left: '24px', right: 'auto' };
      }
    }
    return { right: '24px', left: 'auto' };
  };

  const getLandingSuggestedCards = () => {
    if (activeWorkflowId?.includes("Improve Language")) {
      return [
        'Refine chemical description of Compound Alpha using Strict Corporate Medical Voice guidelines: "We need to sync on the deliverables for our chemical dossier ASAP."',
        'Verify GxP compliance on Compound Alpha chemical regulatory dossier logs',
        'Summarize formulation stability testing release parameters for Compound Alpha'
      ];
    }
    if (activeWorkflowId?.includes("Consistent Voice")) {
      return [
        'Evaluate R&D marketing draft for Compound Alpha against strict brand guidelines. Ensure clear, patient-centric metrics.',
        'Generate compliant LinkedIn ad variants for Vaccine-X line',
        'Refine marketing brochure tone to match FDA patient-centric guidelines'
      ];
    }
    if (activeWorkflowId?.includes("Onboarding Repositories")) {
      return [
        'Summarize chemical formulation stability testing rules for Compound Alpha from the uploaded onboarding file.',
        'Verify source citations for formulation stability testing parameters',
        'Identify temperature and storage bounds in chemical knowledge manuals'
      ];
    }
    if (activeWorkflowId?.includes("Intent Routing")) {
      return [
        'TEST_ROUTING: Trigger end-to-end latency checks for all active spokes.',
        'Ping Document Parsing Spoke to verify OCR parsing latency',
        'Verify Model Armor security interceptor response time'
      ];
    }
    return [
      `Extract clinical trial potency matrix values for Compound Alpha from search grounded Vector database entries.`,
      `List safety warning flags for active compound Compound Alpha in clinical trials`,
      `Identify table cell anomalies in lot release trial spreadsheets`
    ];
  };

  const getDynamicPrompt = () => {
    if (customPrompt) return customPrompt;
    if (currentStepIndex === 0) return '';
    
    // Extract prompt from step guidelines
    const promptStep = activeSteps.find(s => s.instruction.includes("Type: '"));
    if (promptStep) {
      const match = promptStep.instruction.match(/Type: '([^']+)'/);
      if (match && match[1]) return match[1];
    }
    const defaultPrompts = {
      "1. Improve Language & Readability": 'Refine this description of Compound Alpha using Strict Corporate Medical Voice guidelines: "We need to sync on the deliverables for our chemical dossier ASAP."',
      "2. Consistent Voice Copywriting": "Evaluate this R&D marketing draft for Compound Alpha against strict brand guidelines. Ensure clear, patient-centric metrics.",
      "8. Onboarding Repositories": "Summarize the chemical formulation stability testing rules for Compound Alpha from the uploaded onboarding file.",
      "14. Researcher Literature Review": "Extract clinical trial potency matrix values for Compound Alpha from search grounded Vector database entries.",
      "18. Orchestrator Intent Routing Diagnostic": "TEST_ROUTING: Trigger end-to-end latency checks for all active spokes."
    };
    return defaultPrompts[activeWorkflowId] || `Analyze compliance parameters for ${activeWorkflowId}.`;
  };

  const getDynamicOutputText = () => {
    if (isLiveLoading) {
      return `[LIVE GEMINI INFERENCE] Connecting to Vertex AI secure endpoints... Analyzing prompt parameters and grounding with reference compliance guidelines. Please wait...`;
    }
    if (liveAnswer) return liveAnswer;

    if (activeWorkflowId?.includes("Improve Language")) {
      return `[VERIFIED MEDICAL PROSE] Symmetrical review schedules for clinical lot potency trials targeting Compound Alpha have been successfully compiled in alignment with FDA guidelines.\n\n- Tone: Medical Voice (Advisory)\n- GxP check: Passed`;
    }
    if (activeWorkflowId?.includes("Consistent Voice")) {
      return `[VERIFIED PATIENT VOICE] We are reviewing the clinical trials of Compound Alpha to make sure it is safe and reliable for our patients.\n\n- Tone: Brand Copywriting Approved`;
    }
    if (activeWorkflowId?.includes("Onboarding Repositories")) {
      return `[NotebookLM Grounded Summary] Based on "SOP_902.pdf", the formulation testing specifications for Compound Alpha require a potency release range bounded tightly between 95.0% to 105.0% of labeled initial concentrations stored below 25°C.`;
    }
    if (activeWorkflowId?.includes("Literature Review")) {
      return `[Deep Research Extracted Table] Active substance identified: Compound Alpha.\n- Ingestion Method: Vector DB Index\n- OCR Parser: Document AI Optical Lens\n- Risk Warning: AI identified 2 complex charts requiring manual HITL validation.`;
    }
    
    // Fallback outcomes based on workflow name
    if (activeWorkflowId?.includes("Summarization")) {
      return `[Grounded Summarization Outcome] FDA draft guidance summary details:\n1. Symmetrical testing is mandated for clinical lot releases.\n2. Potency bounds tightly restricted to 95-105% release parameters.\n3. Anomaly warnings flagged for lot values below 90%.`;
    }
    if (activeWorkflowId?.includes("Minutes")) {
      return `[Minutes Memory Outcome] Meeting Summary extracted:\n- Action Item: Senior Director GxP compliance reviews (Owner: Dr. Nitin)\n- Decision: Approved proposal 3 for immunological trials.\n- Timeline: Q3 lot submission date locked.`;
    }
    if (activeWorkflowId?.includes("Marketing")) {
      return `[Digital Copy Variants] Pre-approved marketing variations:\nOption 1: "Simplifying Vaccine-X onboarding. Join clinical trials."\nOption 2: "Accelerate Vaccine-X clinical research pipelines with digital Onboarding."`;
    }
    if (activeWorkflowId?.includes("HR")) {
      return `[Resume Comparison Grid] Candidate metrics audit:\n1. Resume 1: GxP qualified (8 years experience). Recommended.\n2. Resume 2: QA auditor (4 years experience). Advisory panel.`;
    }
    if (activeWorkflowId?.includes("Expense")) {
      return `[Travel Audit Outcome] Budget Audit details:\n- Alert: Line item travel expenses for flight LOT-901 exceed $5,000 limit ($6,200 total).\n- Action: Flagged for director approval.`;
    }
    if (activeWorkflowId?.includes("Intent Routing")) {
      return `[SYSTEM ROUTER DIAGNOSTIC] Diagnostic ping successful.\n- Spoke Latencies:\n  * RAG Grounding Spoke: 120ms (Nominal)\n  * Document AI Spoke: 340ms (Nominal)\n  * Model Armor Interceptor: 45ms (Nominal)\n  * Developer Assistant Spoke: 180ms (Nominal)\n\n- Overall Health: 100% Operational\n- Route classification: Intent matches System Diagnostics. Verified GxP safe.`;
    }

    return `[System Agent Response] Simulation succeeded for active compound Compound Alpha.\nParameters verified. Model context has been secure sandboxed.`;
  };

  const getSuggestedQuestions = () => {
    if (liveQuestions && liveQuestions.length > 0) return liveQuestions;

    if (activeWorkflowId?.includes("Improve Language")) {
      return [
        "How does GxP apply to AI in pharma?",
        "What is 21 CFR Part 11?",
        "What are the audit requirements for GxP?"
      ];
    }
    if (activeWorkflowId?.includes("Consistent Voice")) {
      return [
        "Show marketing variations for Vaccine-X",
        "How does the brand Gem enforce FDA guidelines?",
        "What is the brand's editorial policy?"
      ];
    }
    if (activeWorkflowId?.includes("Onboarding Repositories")) {
      return [
        "List stability testing parameters for lot releases",
        "Show PDF source citations for formulation SOP",
        "How do I add a new PDF reference guide?"
      ];
    }
    if (activeWorkflowId?.includes("Intent Routing")) {
      return [
        "Show latency metrics by spoke agent",
        "Generate route accuracy test reports",
        "Export GxP latency audit logs"
      ];
    }
    return [
      "Show parsing charts warnings",
      "Verify data extraction values for lot release trials",
      "What parser was used for complex tables?"
    ];
  };

  return (
    <div className="app-container">
      {activeWorkflowId === null ? (
        // Premium GxP Multi-Agent Command Portal Dashboard
        <div className="workflow-overlay-container command-portal-bg">
          <div style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
            
            {/* Header branding bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="command-status-pill pulse">Orchestrator System Status: Active</span>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '12px', background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                  GxP AGENTIC COMMAND PORTAL
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '6px' }}>
                  Select an orchestrated GxP training lifecycle thread below to interface with the Gemini Enterprise router console.
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>Enablement Track</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#a5b4fc', marginTop: '2px' }}>{progressPercent}% Complete</div>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2.5px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.15)', fontSize: '0.9rem', fontWeight: '800' }}>
                  {completedCount}/{usecasesData.length}
                </div>
              </div>
            </div>
            <div className="glass-command-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '20px' }}>
              <div style={{ flex: '1.2', minWidth: '280px' }}>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#a5b4fc', fontWeight: 'bold' }}>Architectural Overview</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', marginTop: '6px' }}>ADK Router-Spoke Orchestrator</h2>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '10px', lineHeight: '1.5' }}>
                  Your queries are dynamically intercepted by a central <strong>Coordinator Agent</strong>, verified via <strong>Model Armor</strong> guardrails, and routed to specialized spoke engines (RAG Search, Document AI parsing, and Brand Copywriters).
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="card-pattern-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }}>✓ GxP Grounded</span>
                  <span className="card-pattern-badge">💡 Strategic Workaround</span>
                  <span className="card-pattern-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#fca5a5' }}>🛡️ Model Armor Interceptor</span>
                </div>
              </div>

              {/* Dynamic Live Trace Monospace Console */}
              <div style={{ flex: '0.9', minWidth: '240px', backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px', height: '148px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'monospace', fontSize: '0.68rem', boxSizing: 'border-box' }}>
                <div style={{ color: '#10b981', borderBottom: '1px solid rgba(16,185,129,0.15)', paddingBottom: '4px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📡 LIVE ROUTER TRACE</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(traceLogs.join('\n'));
                        alert("Live trace logs copied!");
                      }} 
                      style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '0.6rem', textDecoration: 'underline', padding: 0 }}
                    >
                      [Copy]
                    </button>
                  </span>
                  <span className="pulse" style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                </div>
                {traceLogs.map((log, i) => (
                  <div key={i} style={{ color: log.includes("verified") ? '#34d399' : log.includes("scanning") ? '#fbbf24' : '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    &gt; {log}
                  </div>
                ))}
              </div>

              {/* Orbiting Constellation Graphic */}
              <div className="orbit-container" style={{ width: '480px', flexShrink: 0 }}>
                <svg width="480" height="220" viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
                  {/* Connecting lines */}
                  <line x1="240" y1="110" x2="80" y2="50" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="110" x2="400" y2="50" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="110" x2="120" y2="170" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="110" x2="360" y2="170" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="240" y1="110" x2="240" y2="30" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
                  
                  {/* Central Hub (Coordinator) - Clicking resets filters */}
                  <circle 
                    cx="240" 
                    cy="110" 
                    r="28" 
                    fill="url(#hubGlow)" 
                    stroke={!selectedAgentFilter && !selectedPatternFilter ? "#6366f1" : "rgba(99, 102, 241, 0.4)"} 
                    strokeWidth="2" 
                    style={{ cursor: 'pointer', filter: !selectedAgentFilter && !selectedPatternFilter ? 'drop-shadow(0 0 12px rgba(99,102,241,0.6))' : 'none' }} 
                    onClick={() => { setSelectedAgentFilter(null); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="240" 
                    y="113" 
                    fill="white" 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    COORDINATOR
                  </text>
                  
                  {/* Spokes with labels positioned outside to avoid clipping */}
                  {/* RAG SEARCH */}
                  <circle 
                    cx="80" 
                    cy="50" 
                    r="18" 
                    fill={selectedAgentFilter === 'rag' ? 'rgba(59, 130, 246, 0.25)' : '#1e293b'} 
                    stroke={selectedAgentFilter === 'rag' ? '#60a5fa' : 'rgba(255,255,255,0.15)'} 
                    strokeWidth={selectedAgentFilter === 'rag' ? 2.5 : 1.5} 
                    style={{ cursor: 'pointer', filter: selectedAgentFilter === 'rag' ? 'drop-shadow(0 0 10px #60a5fa)' : 'none' }}
                    onClick={() => { setSelectedAgentFilter(selectedAgentFilter === 'rag' ? null : 'rag'); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="80" 
                    y="80" 
                    fill={selectedAgentFilter === 'rag' ? '#60a5fa' : '#a5b4fc'} 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    RAG SEARCH
                  </text>
                  
                  {/* DOC AI */}
                  <circle 
                    cx="400" 
                    cy="50" 
                    r="18" 
                    fill={selectedAgentFilter === 'docai' ? 'rgba(139, 92, 246, 0.25)' : '#1e293b'} 
                    stroke={selectedAgentFilter === 'docai' ? '#a78bfa' : 'rgba(255,255,255,0.15)'} 
                    strokeWidth={selectedAgentFilter === 'docai' ? 2.5 : 1.5} 
                    style={{ cursor: 'pointer', filter: selectedAgentFilter === 'docai' ? 'drop-shadow(0 0 10px #a78bfa)' : 'none' }}
                    onClick={() => { setSelectedAgentFilter(selectedAgentFilter === 'docai' ? null : 'docai'); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="400" 
                    y="80" 
                    fill={selectedAgentFilter === 'docai' ? '#a78bfa' : '#a5b4fc'} 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    DOC AI
                  </text>
                  
                  {/* COPYWRITER */}
                  <circle 
                    cx="120" 
                    cy="170" 
                    r="18" 
                    fill={selectedAgentFilter === 'copywriter' ? 'rgba(236, 72, 153, 0.25)' : '#1e293b'} 
                    stroke={selectedAgentFilter === 'copywriter' ? '#f472b6' : 'rgba(255,255,255,0.15)'} 
                    strokeWidth={selectedAgentFilter === 'copywriter' ? 2.5 : 1.5} 
                    style={{ cursor: 'pointer', filter: selectedAgentFilter === 'copywriter' ? 'drop-shadow(0 0 10px #f472b6)' : 'none' }}
                    onClick={() => { setSelectedAgentFilter(selectedAgentFilter === 'copywriter' ? null : 'copywriter'); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="120" 
                    y="200" 
                    fill={selectedAgentFilter === 'copywriter' ? '#f472b6' : '#a5b4fc'} 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    COPYWRITER
                  </text>
                  
                  {/* DEVELOPER */}
                  <circle 
                    cx="360" 
                    cy="170" 
                    r="18" 
                    fill={selectedAgentFilter === 'developer' ? 'rgba(245, 158, 11, 0.25)' : '#1e293b'} 
                    stroke={selectedAgentFilter === 'developer' ? '#fbbf24' : 'rgba(255,255,255,0.15)'} 
                    strokeWidth={selectedAgentFilter === 'developer' ? 2.5 : 1.5} 
                    style={{ cursor: 'pointer', filter: selectedAgentFilter === 'developer' ? 'drop-shadow(0 0 10px #fbbf24)' : 'none' }}
                    onClick={() => { setSelectedAgentFilter(selectedAgentFilter === 'developer' ? null : 'developer'); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="360" 
                    y="200" 
                    fill={selectedAgentFilter === 'developer' ? '#fbbf24' : '#a5b4fc'} 
                    fontSize="8" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    DEVELOPER
                  </text>
                  
                  {/* Model Armor Shield */}
                  <circle 
                    cx="240" 
                    cy="30" 
                    r="14" 
                    fill={selectedAgentFilter === 'compliance' ? 'rgba(16, 185, 129, 0.25)' : '#064e3b'} 
                    stroke={selectedAgentFilter === 'compliance' ? '#34d399' : '#10b981'} 
                    strokeWidth={selectedAgentFilter === 'compliance' ? 2.5 : 1.5} 
                    style={{ cursor: 'pointer', filter: selectedAgentFilter === 'compliance' ? 'drop-shadow(0 0 10px #34d399)' : 'none' }}
                    onClick={() => { setSelectedAgentFilter(selectedAgentFilter === 'compliance' ? null : 'compliance'); setSelectedPatternFilter(null); }}
                  />
                  <text 
                    x="240" 
                    y="12" 
                    fill={selectedAgentFilter === 'compliance' ? '#34d399' : '#10b981'} 
                    fontSize="8" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    style={{ pointerEvents: 'none' }}
                  >
                    MODEL ARMOR
                  </text>
 
                  <defs>
                    <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#4338ca" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Console HUD Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
              <div className="glass-command-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: 'none', boxShadow: 'inset 0 0 12px rgba(16, 185, 129, 0.05), 0 4px 20px rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                <div className="radar-sweep-indicator" style={{ flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold' }}>Model Armor Guardrail</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981', marginTop: '2px', letterSpacing: '-0.3px' }}>SHIELD ACTIVE</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>GxP Compliance Verified</div>
                </div>
              </div>
              <div className="glass-command-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: 'none', boxShadow: 'inset 0 0 12px rgba(59, 130, 246, 0.05), 0 4px 20px rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                  <Database size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold' }}>Enterprise Search</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3b82f6', marginTop: '2px', letterSpacing: '-0.3px' }}>VECTOR CONNECTED</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>Enterprise SOP Index Synced</div>
                </div>
              </div>
              <div className="glass-command-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: 'none', boxShadow: 'inset 0 0 12px rgba(139, 92, 246, 0.05), 0 4px 20px rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold' }}>Agent Orchestrator</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b5cf6', marginTop: '2px', letterSpacing: '-0.3px' }}>6 ACTIVE SPOKES</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>Orchestrated via ADK</div>
                </div>
              </div>
            </div>

            {/* Majestic System Blueprint & Multi-Agent Registry */}
            <div style={{ marginTop: '40px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'white', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={20} style={{ color: '#6366f1' }} /> SYSTEM BLUEPRINT & MULTI-AGENT REGISTRY
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>
                Operational specifications for the Vertex AI Agent SDK orchestrator and Model Armor compliance gates.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr', gap: '24px', marginBottom: '40px' }}>
              
              {/* Column 1: Coordinated Agent Registry */}
              <div className="glass-command-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  1. Coordinated Agent Inventory
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { id: "coordinator", name: "Coordinator Agent (The Hub)", role: "Coordinator Router", desc: "Intersects user prompts, evaluates intent, splits tasks, and orchestrates worker spokes." },
                    { id: "rag", name: "Search Grounding Agent (RAG Spoke)", role: "Vector DB Grounding", desc: "Queries Enterprise SOP vectors, FDA regulations, and manuals for citation mapping." },
                    { id: "docai", name: "Document Parsing Agent (DocAI Spoke)", role: "Document Processing", desc: "OCR extracts data from PDF lot releases, chemical charts, and budget sheets." },
                    { id: "compliance", name: "Compliance & Guardrail Agent (Model Armor)", role: "GxP Security Interceptor", desc: "Blocks prompt injections, formula leaks, and audits outputs for hallucinations." },
                    { id: "copywriter", name: "Brand Copywriting Agent (Marketing Spoke)", role: "Marketing Guidelines", desc: "Enforces pre-approved editorial tone and FDA marketing constraints." },
                    { id: "developer", name: "Developer Assistant Agent (Code Spoke)", role: "Developer Assistant", desc: "Reviews compliance changes, generates GxP logs, and structures audit trails." }
                  ].map((agent, idx) => {
                    const isSelected = selectedAgentFilter === agent.id;
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: '12px', 
                          borderRadius: '12px', 
                          background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)', 
                          border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.05)', 
                          boxShadow: isSelected ? '0 0 12px rgba(99, 102, 241, 0.3)' : 'none',
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                        onClick={() => {
                          setSelectedAgentFilter(isSelected ? null : agent.id);
                          setSelectedPatternFilter(null);
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isSelected ? '#a5b4fc' : 'white' }}>{agent.name}</span>
                          <span className="card-pattern-badge" style={{ fontSize: '0.58rem', padding: '1px 6px' }}>{agent.role}</span>
                        </div>
                        <span style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.4' }}>{agent.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Agentic Pattern Blueprints */}
              <div className="glass-command-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  2. Agentic Pattern Blueprints
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { id: "Parallel Chain", pattern: "Parallel/Chain Pattern", type: "Generation ➔ Safety Audit", goal: "Tone & compliance edit check.", how: "Input goes to generator spoke, then filters through Model Armor.", cases: "Use Cases 1, 2, 5, 9, 15, 16" },
                    { id: "ReAct Loop", pattern: "ReAct Pattern", type: "Reasoning + Tool Use Loop", goal: "Multi-step database searches & math checks.", how: "Agent evaluates query, calls Vector DB search, reasons, and compiles.", cases: "Use Cases 3, 4, 7, 8, 12" },
                    { id: "Router Handoff", pattern: "Router Pattern", type: "Specialized Classification", goal: "Direct highly distinct tasks to experts.", how: "Router classifies prompt and hands off execution to specialized spokes.", cases: "Use Cases 6, 10, 11, 13, 14, 17" }
                  ].map((pat, idx) => {
                    const isSelected = selectedPatternFilter === pat.id;
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: '12px', 
                          borderRadius: '12px', 
                          background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.03)', 
                          border: isSelected ? '1px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.08)', 
                          boxShadow: isSelected ? '0 0 12px rgba(99, 102, 241, 0.3)' : 'none',
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                        onClick={() => {
                          setSelectedPatternFilter(isSelected ? null : pat.id);
                          setSelectedAgentFilter(null);
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isSelected ? '#a5b4fc' : 'white' }}>{pat.pattern}</span>
                          <span style={{ fontSize: '0.58rem', color: '#a5b4fc', fontWeight: 'bold' }}>{pat.type}</span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                          <div><strong>Goal:</strong> {pat.goal}</div>
                          <div style={{ marginTop: '2px' }}><strong>How it works:</strong> {pat.how}</div>
                        </div>
                        <div style={{ marginTop: '6px', fontSize: '0.68rem', color: '#94a3b8', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                          <strong>Applies to:</strong> {pat.cases}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Target Use Case Threads Directory */}
              <div className="glass-command-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                    3. Lifecycle Threads ({filteredUseCases.length})
                  </h3>
                  
                  {/* Small inline search box */}
                  <div className="search-input-wrapper" style={{ width: '130px', margin: 0, padding: '4px 8px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Search size={12} className="search-icon-svg" style={{ color: '#64748b' }} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Filter..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ color: 'white', fontSize: '0.7rem' }}
                    />
                  </div>
                </div>

                {/* Scrollable list of use cases */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '350px', paddingRight: '4px', flex: 1 }}>
                  {filteredUseCases.map((uc) => {
                    const isDone = completedWorkflows[uc["Use Case Name"]];
                    const cardPattern = getPatternForUseCase(uc["Use Case Name"]);

                    return (
                      <div 
                        key={uc["Use Case Name"]}
                        className="glass-workflow-card"
                        style={{ 
                          padding: '10px 12px', 
                          margin: 0, 
                          cursor: 'pointer',
                          border: '1px solid rgba(255,255,255,0.06)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                        onClick={() => handleSelectWorkflow(uc["Use Case Name"])}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span className="card-pattern-badge" style={{ fontSize: '0.52rem', padding: '1px 4px' }}>{cardPattern}</span>
                          {isDone && (
                            <span style={{ fontSize: '0.58rem', color: '#34d399', fontWeight: 'bold' }}>
                              ✓ VERIFIED
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white', marginBottom: '3px' }}>
                          {uc["Use Case Name"]}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#cbd5e1', lineHeight: '1.3' }}>
                          {uc["Business Objective"]}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px' }}>
                          <span style={{ fontSize: '0.6rem', color: '#64748b' }}>3 Steps</span>
                          <span style={{ fontSize: '0.68rem', color: '#818cf8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            {isDone ? "Review Journey" : "Launch Thread"} <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {filteredUseCases.length === 0 && (
                    <div style={{ padding: '24px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <span>No matching threads found.</span>
                      <button 
                        onClick={() => { setSelectedAgentFilter(null); setSelectedPatternFilter(null); setSearchQuery(''); }}
                        style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '0.7rem', textDecoration: 'underline', padding: 0 }}
                      >
                        Reset Search & Filters
                      </button>
                    </div>
                  )}
              </div>

              {/* Collapsible Model Armor specs at the bottom of Column 3 */}
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button 
                  onClick={() => setShowModelArmorSpecs(!showModelArmorSpecs)}
                  style={{ 
                    width: '100%', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '4px 0',
                    color: showModelArmorSpecs ? '#fca5a5' : '#cbd5e1',
                    fontSize: '0.74rem',
                    fontWeight: 'bold',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span>🛡️ Model Armor GxP Specs</span>
                  <span style={{ fontSize: '0.65rem' }}>{showModelArmorSpecs ? 'Hide ▲' : 'Show ▼'}</span>
                </button>
                {showModelArmorSpecs && (
                  <div className="glass-command-panel" style={{ padding: '12px 14px', marginTop: '8px', borderLeft: '3px solid #ef4444', background: 'rgba(239, 68, 68, 0.02)', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                      <strong>Input Filtering:</strong> Blocks prompt injections, proprietary chemical formulas, or patient PII.
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                      <strong>Output Audits:</strong> Blocks or flags answers not explicitly cited in reference SOP documents.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
            
            {/* Clear progress */}
            <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => saveCompletion({})} 
                className="btn-secondary" 
                style={{ fontSize: '0.72rem', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                Reset Command Session History
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Full Screen Gemini Enterprise Replica Workspace
        <div className="gemini-ui-mock" style={{ gridTemplateColumns: '240px 1fr', width: '100%', height: '100vh', display: 'grid' }}>
          
          {/* Sidebar */}
          <div className="gemini-mock-sidebar">
            <button 
              id="gemini-new-chat-btn"
              className={`gemini-sidebar-header-btn ${currentStep?.targetId === 'gemini-new-chat-btn' ? 'pulsing-focus' : ''}`}
              onClick={() => { if (currentStepIndex === 0) handleNextStep(); }}
            >
              <Plus size={16} /> New chat
            </button>
            
            <div className="gemini-sidebar-item">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={16} /> Search
              </span>
            </div>
            <div className="gemini-sidebar-item">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} /> Library
              </span>
            </div>

            <div style={{ marginTop: '8px' }}>
              <div className="gemini-sidebar-label">Agents</div>
              <div 
                id="gemini-sidebar-notebooklm" 
                className={`gemini-sidebar-item ${currentStep?.targetId === 'gemini-sidebar-notebooklm' ? 'pulsing-focus' : ''}`}
                onClick={() => {
                  if (currentStep?.targetId === 'gemini-sidebar-notebooklm' && currentStepIndex === 0) {
                    handleNextStep();
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={14} /> NotebookLM
                </span>
              </div>
              <div 
                id="gemini-sidebar-gem" 
                className={`gemini-sidebar-item ${currentStep?.targetId === 'gemini-sidebar-gem' ? 'pulsing-focus' : ''}`}
                onClick={() => {
                  if (currentStep?.targetId === 'gemini-sidebar-gem' && currentStepIndex === 0) {
                    handleNextStep();
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={14} /> Idea Generation
                </span>
                <span className="gemini-agent-pill-preview">Preview</span>
              </div>
              <div 
                id="gemini-sidebar-deepresearch" 
                className={`gemini-sidebar-item ${currentStep?.targetId === 'gemini-sidebar-deepresearch' ? 'pulsing-focus' : ''}`}
                onClick={() => {
                  if (currentStep?.targetId === 'gemini-sidebar-deepresearch' && currentStepIndex === 0) {
                    handleNextStep();
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={14} /> Deep Research
                </span>
              </div>
            </div>

            <div style={{ marginTop: '8px', flex: 1 }}>
              <div className="gemini-sidebar-label">Chats</div>
              <div className="gemini-chat-history-list">
                <div className="gemini-chat-history-item">Greetings</div>
                <div className="gemini-chat-history-item">a2ui template for RWE report</div>
                <div className="gemini-chat-history-item">Enterprise Moonshot Project Ideas</div>
                <div className="gemini-chat-history-item">Cloud Storage eCTD scan</div>
              </div>
            </div>

            <div className="gemini-sidebar-item" style={{ borderTop: '1px solid var(--gemini-border)', borderRadius: '0', paddingTop: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={16} /> Settings & help
              </span>
            </div>
          </div>

          {/* Main Chat Panel */}
          <div className="gemini-mock-chat-panel">
            <div className="gemini-mock-chat-header">
              <div className="gemini-app-title">
                Gemini Enterprise
                <span className="gemini-enterprise-badge">Plus</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button 
                  onClick={() => setActiveWorkflowId(null)}
                  className="btn-secondary"
                  style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ArrowLeft size={14} /> Exit Onboarding
                </button>
                <div className="gemini-user-avatar">S</div>
              </div>
            </div>

            <div className="gemini-mock-chat-body">
              {currentStepIndex < 2 ? (
                // Landing view
                <div className="gemini-landing-prompt-state">
                  <div className="gemini-welcome-sparkle-row">
                    <div className="gemini-sparkle-gradient-icon">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div className="gemini-welcome-title-line">Hello, Super</div>
                      <div className="gemini-welcome-subtitle-line">Let's get some work done!</div>
                    </div>
                  </div>

                  {/* Suggested Question Cards Grid */}
                  <div className="gemini-landing-card-grid">
                    {getLandingSuggestedCards().map((q, idx) => (
                      <div 
                        key={idx}
                        className="gemini-landing-card"
                        onClick={() => {
                          if (currentStepIndex === 1) {
                            setCustomPrompt(q);
                          }
                        }}
                        style={{
                          opacity: currentStepIndex === 0 ? 0.5 : 1,
                          pointerEvents: currentStepIndex === 0 ? 'none' : 'auto',
                          border: customPrompt === q ? '2px solid #3b82f6' : '1px solid #e2e8f0'
                        }}
                      >
                        <div className="gemini-landing-card-title">{q}</div>
                        <div className="gemini-landing-card-action">
                          <span>Pre-fill query</span> ➔
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Prompter Panel */}
                  <div className={`gemini-prompter-panel ${isPromptFocused ? 'focus' : ''}`}>
                    <div className="gemini-prompt-input-area-line">
                      <Shield size={16} className="gemini-shield-verified-icon" />
                      <textarea 
                        id="gemini-prompt-textarea"
                        className={`gemini-input-textarea-element ${currentStep?.targetId === 'gemini-prompt-textarea' ? 'pulsing-focus' : ''}`}
                        rows={3}
                        value={getDynamicPrompt()}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (currentStepIndex === 1) {
                              handleNextStep();
                            }
                          }
                        }}
                        onFocus={() => setIsPromptFocused(true)}
                        onBlur={() => setIsPromptFocused(false)}
                        placeholder="Ask anything, search your data, @mention or /tools"
                      />
                    </div>

                    <div className="gemini-prompter-toolbar">
                      <div className="gemini-toolbar-left-group">
                        <button className="gemini-toolbar-btn" id="gemini-upload-file">
                          <Plus size={16} />
                        </button>
                        <button className="gemini-toolbar-btn">
                          <Sliders size={16} />
                        </button>
                        <button className="gemini-toolbar-btn">
                          <Database size={16} />
                        </button>
                      </div>
                      <button 
                        id="gemini-send-btn"
                        className={`gemini-send-action-btn ${currentStep?.targetId === 'gemini-send-btn' ? 'pulsing-focus' : ''}`} 
                        disabled={currentStepIndex < 1}
                        onClick={() => { if (currentStepIndex === 1) handleNextStep(); }}
                      >
                        <Send size={14} style={{ color: 'white' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Active chat thread response view
                <div className="gemini-chat-thread-container" style={{ padding: '20px 40px 100px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', height: '100%' }}>
                  
                  {/* User Prompt Message Bubble (Clean gray capsule on the right) */}
                  <div className="gemini-message-bubble user-bubble" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <div className="gemini-bubble-content" style={{ backgroundColor: '#f1f5f9', border: 'none', borderRadius: '18px', padding: '10px 20px', maxWidth: '70%', color: '#1e293b', fontSize: '0.9rem', fontWeight: '400' }}>
                      <p style={{ margin: 0 }}>{getDynamicPrompt()}</p>
                    </div>
                  </div>
                  
                  {/* Assistant response (Clean, borderless white canvas with left Sparkle icon) */}
                  <div className="gemini-message-bubble assistant-bubble" style={{ display: 'flex', gap: '16px', width: '100%', alignItems: 'flex-start' }}>
                    <div className="gemini-sparkle-gradient-icon" style={{ width: '32px', height: '32px', fontSize: '0.8rem', flexShrink: 0, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      G
                    </div>
                    <div id="gemini-response-bubble" className={`gemini-bubble-content ${currentStep?.targetId === 'gemini-response-bubble' ? 'pulsing-focus' : ''}`} style={{ border: 'none', background: 'none', padding: 0, boxShadow: 'none', flex: 1, color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 16px' }}>
                        {getDynamicOutputText()}
                      </p>
                      
                      <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                        <span>✓ Grounding check: verified</span>
                        <span>• Compliance: GxP safe</span>
                      </div>

                      {/* Suggested Follow-up Questions Pills */}
                      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {getSuggestedQuestions().map((q, idx) => (
                          <button 
                            key={idx}
                            className="gemini-follow-up-pill"
                            onClick={() => {
                              setCustomPrompt(q);
                              setSimulationDone(false);
                              setCurrentStepIndex(1);
                            }}
                          >
                            <CornerDownLeft size={12} className="rotate-arrow-icon" />
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Floating Onboarding Tour Card Overlay */}
          {currentStep && (
            <div 
              className={`tour-floating-tooltip ${isTourMinimized ? 'minimized' : ''}`}
              style={{
                transform: `translate(${cardPos.x}px, ${cardPos.y}px)`,
                cursor: isDragging ? 'grabbing' : 'default',
                top: '80px',
                ...getTourDockSide()
              }}
            >
              {isTourMinimized ? (
                <div 
                  onClick={() => setIsTourMinimized(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '700', color: 'white' }}
                >
                  <Sparkles size={14} style={{ color: 'var(--color-secondary)' }} />
                  <span>Tour: Step {currentStepIndex + 1} (Expand)</span>
                </div>
              ) : (
                <>
                  <div 
                    className="tour-tooltip-header"
                    style={{ cursor: 'grab', userSelect: 'none' }}
                    onMouseDown={handleMouseDown}
                  >
                    <span className="tour-tooltip-workflow-title">Workflow Guided Tour</span>
                    <button 
                      onClick={() => setIsTourMinimized(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', padding: '0 4px', outline: 'none', lineHeight: '1' }}
                      title="Minimize Tour Guide"
                    >
                      －
                    </button>
                  </div>
                  <div className="tour-tooltip-title">{currentStep.title}</div>
                  <div className="tour-tooltip-body">{currentStep.instruction}</div>
                  
                  {/* Collapsible Design Breakdown inside the floating card */}
                  <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                    <button 
                      onClick={() => setShowRationaleTab(!showRationaleTab)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'var(--color-secondary)', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
                    >
                      <span>{showRationaleTab ? '▼ Hide' : '▶ Show'} GxP Design Breakdown</span>
                      <Sliders size={12} />
                    </button>
                    
                    {showRationaleTab && (
                      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.45', textAlign: 'left' }}>
                        <div>
                          <strong>Rationale:</strong>
                          <p style={{ color: 'var(--text-main)', marginTop: '2px' }}>{activeUseCase["Gemini Enterprise Approach"]}</p>
                        </div>
                        <div>
                          <strong style={{ color: '#fca5a5' }}>⚠️ Platform Gap:</strong>
                          <p style={{ color: '#fca5a5', marginTop: '2px' }}>{activeUseCase["Platform Feature Gaps"]}</p>
                        </div>
                        <div>
                          <strong style={{ color: '#a7f3d0' }}>💡 Workaround:</strong>
                          <p style={{ color: '#a7f3d0', marginTop: '2px' }}>{activeUseCase["Strategic Workaround"]}</p>
                        </div>
                        
                        {/* Real Environment Launch Link */}
                        {(() => {
                          const envUrl = REAL_ENVIRONMENT_URLS[activeWorkflowId];
                          if (envUrl) {
                            return (
                              <div style={{ marginTop: '4px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                                <a 
                                  href={envUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#60a5fa', textDecoration: 'underline', fontWeight: '700', fontSize: '0.7rem' }}
                                >
                                  <span>🔗 Launch Real Vertex AI Environment</span>
                                  <ArrowUpRight size={10} />
                                </a>
                              </div>
                            );
                          }
                          return null;
                        })()}
                        
                        {/* Real Product Walkthrough Screenshot display */}
                        {(() => {
                          const activeWalkthroughList = REAL_WALKTHROUGH_IMAGES[activeWorkflowId] || [];
                          const currentStepScreenshot = activeWalkthroughList[currentStepIndex];
                          if (currentStepScreenshot) {
                            return (
                              <div style={{ marginTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                                <strong style={{ color: 'var(--color-secondary)', display: 'block', marginBottom: '6px', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📸 Real Product Screenshot:</strong>
                                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <img 
                                    src={currentStepScreenshot} 
                                    alt={`Walkthrough Step ${currentStepIndex + 1}`} 
                                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '180px', objectFit: 'contain' }} 
                                  />
                                  <div style={{ padding: '6px 8px', fontSize: '0.62rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%', textAlign: 'center', backgroundColor: '#0b1329' }}>
                                    Real application screen for this step
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Background ADK Router Logs (integrated inside tour guide card) */}
                  {logsList.length > 0 && (
                    <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Terminal size={12} /> Background ADK Router Logs</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(logsList.join('\n'));
                            alert("Tracer logs copied!");
                          }} 
                          style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '0.62rem', textDecoration: 'underline', padding: 0 }}
                        >
                          [Copy Logs]
                        </button>
                      </div>
                      <div className="inspector-console" style={{ width: '100%', maxHeight: '100px', fontSize: '0.65rem', padding: '6px 10px', backgroundColor: '#020617' }}>
                        {logsList.map((log, idx) => (
                          <div key={idx} style={{ marginBottom: '2px', fontFamily: 'monospace' }}>{log}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="tour-tooltip-footer" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    {currentStepIndex === activeSteps.length - 1 ? (
                      <button 
                        id="tour-next-btn"
                        onClick={handleNextStep}
                        className="tour-tooltip-next-btn"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Finish Tour & Return
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic', width: '100%', textAlign: 'center' }}>
                        ➔ Perform highlighted action on screen to advance
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Spotlight Highlight Overlay */}
          {highlightCoords && (
            <div 
              className="tour-target-highlight"
              style={{
                top: `${highlightCoords.top - 4}px`,
                left: `${highlightCoords.left - 4}px`,
                width: `${highlightCoords.width + 8}px`,
                height: `${highlightCoords.height + 8}px`
              }}
            />
          )}

        </div>
      )}
    </div>
  );

  function handleInputChange(key, val) {
    // Playground State fallback hook
  }
}

export default App;
