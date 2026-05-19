import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export interface TutorialStep {
  targetId?: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface ChallengeTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip?: () => void;
}

export default function ChallengeTutorial({ steps, onComplete, onSkip }: ChallengeTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  // Stores the final CSS properties (top, left, transform) for the tooltip container
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties | null>(null);
  // Stores the left offset for the arrow so it points to the target correctly
  const [, setArrowStyle] = useState<React.CSSProperties | null>(null);

  const activeStep = steps[currentStep];

  // Update position when step changes or resize
  useEffect(() => {
    const updatePosition = () => {
      // 1. If no target (centered step), clear rects and styles
      if (!activeStep.targetId) {
        setTargetRect(null);
        setTooltipStyle(null);
        setArrowStyle(null);
        return;
      }

      // 2. Find target element
      const element = document.getElementById(activeStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        
        const TOOLTIP_WIDTH = 320; // Matches w-[320px]
        const GAP = 12;
        const VIEWPORT_PADDING = 16;
        
        let newTop = 0;
        let newLeft = 0;
        let transform = '';
        let arrowLeft: string | number = '50%';
        let arrowTop: string | number = '';
        let arrowTransform = 'translateX(-50%) rotate(45deg)'; // Default centered arrow

        // Helper to clamp X position within viewport
        const clampHorizontal = (idealCenterX: number) => {
            const halfWidth = TOOLTIP_WIDTH / 2;
            const minLeft = VIEWPORT_PADDING;
            const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING;
            
            // Calculate strictly where the left edge should be
            let leftEdge = idealCenterX - halfWidth;
            
            // Clamp it
            const clampedEdge = Math.max(minLeft, Math.min(maxLeft, leftEdge));
            
            // Calculate how much we shifted from the ideal center
            // The arrow needs to point to idealCenterX relative to the clampedEdge
            // Arrow position relative to tooltip left edge:
            const relativeArrowX = idealCenterX - clampedEdge;
            
            return { left: clampedEdge, arrowX: relativeArrowX };
        };

        // const { width: vw, height: vh } = { width: window.innerWidth, height: window.innerHeight };

        switch (activeStep.position) {
          case 'top':
            // Position above target
            newTop = rect.top - GAP; 
            transform = 'translateY(-100%)'; 
            
            // Horizontal Logic
            const { left: leftTop, arrowX: arrowXTop } = clampHorizontal(rect.left + rect.width / 2);
            newLeft = leftTop;
            arrowLeft = arrowXTop;
            arrowTransform = 'translateX(-50%) rotate(45deg)'; // Center the arrow on its own anchor point
            break;

          case 'bottom':
            // Position below target
            newTop = rect.bottom + GAP;
            transform = 'translateY(0)';
            
            const { left: leftBot, arrowX: arrowXBot } = clampHorizontal(rect.left + rect.width / 2);
            newLeft = leftBot;
            arrowLeft = arrowXBot;
            arrowTransform = 'translateX(-50%) rotate(45deg)';
            break;

          case 'left':
            // Position to the left of target
            newLeft = rect.left - GAP - TOOLTIP_WIDTH;
            newTop = rect.top + rect.height / 2;
            transform = 'translateY(-50%)';

            // Check if it goes off-screen left
            if (newLeft < VIEWPORT_PADDING) {
                // Flip to right if not enough space on left? 
                // For now, let's just clamp or stick to behavior. 
                // User asked about "cutting off", usually happens on 'top'/'bottom' centering.
                // If 'left' cuts off, it means target is too close to left edge.
                // Ideally we should flip, but simple clamp for Y might be needed too.
            }
            arrowTop = '50%';
            arrowTransform = 'translateY(-50%) rotate(45deg)';
            break;

          case 'right':
            // Position to the right of target
            newLeft = rect.right + GAP;
            newTop = rect.top + rect.height / 2;
            transform = 'translateY(-50%)';
            
            // Check overflow right (optional optimization)
            arrowTop = '50%';
            arrowTransform = 'translateY(-50%) rotate(45deg)';
            break;

          default:
             break;
        }

        setTooltipStyle({
            top: newTop,
            left: newLeft,
            transform: transform
        });
        
        setArrowStyle({
            left: arrowLeft,
            top: arrowTop,
            transform: arrowTransform
        });
      }
    };

    // Use ResizeObserver for more robust sizing detection if needed, but window resize is usually enough
    const timer = setTimeout(updatePosition, 50);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true); // Update on scroll too
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      clearTimeout(timer);
    };
  }, [currentStep, activeStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/80 transition-opacity duration-500 ease-in-out",
          targetRect ? "opacity-0" : "opacity-100"
        )} 
      />
      
      {/* Highlight Box / Spotlight */}
      {targetRect && (
        <div 
          className="absolute border-2 border-indigo-500/80 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] pointer-events-none transition-all duration-300 ease-in-out z-10"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tooltip Card */}
      <div 
        className={cn(
          "absolute z-20 transition-all duration-300 ease-out outline-none",
          !targetRect && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" // Center fallback
        )}
        style={targetRect && tooltipStyle ? tooltipStyle : {}}
      >
        <div className="bg-slate-900 border border-slate-700 text-slate-100 p-6 rounded-xl shadow-2xl max-w-sm w-[320px] relative animate-in fade-in zoom-in-95 duration-300">
          
          {/* Close Button */}
          <button 
            onClick={onSkip}
            className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
            title="Skip Tutorial"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{activeStep.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Arrow Tip
          {targetRect && (
            <div 
              className={cn(
                "absolute w-3 h-3 bg-slate-900 border border-slate-700",
                activeStep.position === 'top' ? "bottom-[-6px] border-t-0 border-l-0" :
                activeStep.position === 'bottom' ? "top-[-6px] border-b-0 border-r-0" :
                activeStep.position === 'left' ? "right-[-6px] border-b-0 border-l-0" :
                activeStep.position === 'right' ? "left-[-6px] border-t-0 border-r-0" : "hidden"
              )}
              style={arrowStyle || {}}
            />
          )} */}

          {/* Footer / Controls */}
          <div className="flex items-center justify-between">
             {currentStep > 0 ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePrev}
                  className="h-8 px-2 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : <div/>} {/* Spacer */}
            
            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    idx === currentStep ? "bg-indigo-500" : "bg-slate-700"
                  )}
                />
              ))}
            </div>

            <Button 
              size="sm" 
              onClick={handleNext}
              className={cn(
                  "h-8 px-3 transition-all",
                  currentStep === steps.length - 1 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
              )}
            >
              {currentStep === steps.length - 1 ? (
                <span className="flex items-center gap-1.5">
                  Paham <Check className="h-3.5 w-3.5" />
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Lanjut <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
