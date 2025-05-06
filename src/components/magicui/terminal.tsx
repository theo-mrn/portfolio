"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-sm font-normal tracking-tight", className)}
    {...props}
  >
    {children}
  </motion.div>
);

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

export interface QuizQuestion {
  id: number | string;
  text: string;
  answer: string;
  status: "unanswered" | "correct";
}

interface TerminalProps {
  className?: string;
  questions?: QuizQuestion[];
  completionMessage?: string;
  onComplete?: () => void;
}

export const Terminal = ({
  className,
  questions = [],
  completionMessage = "Quiz terminé ! Toutes les réponses sont correctes.",
  onComplete,
}: TerminalProps) => {
  const initialQuizState = useMemo(() => 
    questions.map((q) => ({ ...q, status: "unanswered" as const }))
  , [questions]);

  const [quizState, setQuizState] = useState<QuizQuestion[]>(initialQuizState);
  const [inputValue, setInputValue] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuizState(initialQuizState);
    setInputValue("");
    setFeedback(null);
  }, [initialQuizState]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (feedback) {
      setFeedback(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      
      // Find the first unanswered question
      const currentQuestionIndex = quizState.findIndex(q => q.status === "unanswered");
      if (currentQuestionIndex === -1) return; // All questions answered
      
      const currentQuestion = quizState[currentQuestionIndex];

      if (currentInput === currentQuestion.answer.toLowerCase()) {
        const updatedState = [...quizState];
        updatedState[currentQuestionIndex] = {
          ...currentQuestion,
          status: "correct",
        };
        setQuizState(updatedState);
        setFeedback("Correct !");
        setInputValue("");

        // Check if all questions are answered
        if (updatedState.every(q => q.status === "correct")) {
          setFeedback(completionMessage);
          onComplete?.();
        }
      } else {
        setFeedback("Faux");
        setInputValue("");
      }
    }
  };

  const isQuizComplete = quizState.every(q => q.status === "correct");

  return (
    <div
      className={cn(
        "h-full min-h-[300px] w-full min-w-4xl mx-auto rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="h-full overflow-y-auto p-6">
        <code className="grid gap-y-4">
          {quizState.map((q, index) => (
            <motion.div 
              key={q.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className={cn(
                "whitespace-normal break-words text-lg",
                q.status === "correct" ? "text-green-500" : "text-white"
              )}
            > 
              <span>Q{index + 1}: {q.text}</span>
            </motion.div>
          ))}

          {!isQuizComplete && (
            <div className="mt-4 flex items-center gap-x-2">
              <span className="text-primary text-lg">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={cn(
                  "flex-1 bg-transparent text-inherit outline-none focus:ring-0 text-lg",
                )}
                aria-label="Réponse"
                autoFocus
                disabled={isQuizComplete}
              />
            </div>
          )}

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
              className={cn(
                "mt-2 text-base whitespace-normal break-words",
                feedback === "Correct !" ? "text-green-600" : "text-red-600",
              )}
            >
              {feedback}
            </motion.div>
          )}
        </code>
      </pre>
    </div>
  );
};
