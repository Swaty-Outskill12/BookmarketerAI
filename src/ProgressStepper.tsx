import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressStepperProps {
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

export default function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  const steps: Step[] = [
    { id: 'book-brief', label: 'Book Brief', status: 'upcoming' },
    { id: 'marketing-plan', label: 'Marketing Plan', status: 'upcoming' },
    { id: 'organic-posts', label: 'Organic Posts', status: 'upcoming' },
    { id: 'paid-posts', label: 'Paid Ads', status: 'upcoming' },
    { id: 'facebook-setup', label: 'Setup', status: 'upcoming' },
    { id: 'manage-ads', label: 'Optimize', status: 'upcoming' }
  ];

  let foundCurrent = false;
  const stepsWithStatus = steps.map((step) => {
    if (step.id === currentStep) {
      foundCurrent = true;
      return { ...step, status: 'current' as const };
    } else if (!foundCurrent) {
      return { ...step, status: 'completed' as const };
    }
    return step;
  });

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {stepsWithStatus.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex items-center">
                <button
                  onClick={() => step.status === 'completed' && onStepClick?.(step.id)}
                  disabled={step.status !== 'completed'}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-sm sm:text-base transition-all ${
                    step.status === 'completed'
                      ? 'bg-[#22c9a8] text-white cursor-pointer hover:brightness-110 hover:scale-105'
                      : step.status === 'current'
                      ? 'bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <Check size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <div className="ml-2 sm:ml-3 hidden md:block">
                  <div
                    className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
                      step.status === 'completed'
                        ? 'text-[#22c9a8]'
                        : step.status === 'current'
                        ? 'text-[#0077be]'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {index < stepsWithStatus.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="relative">
                    <div className="h-0.5 sm:h-1 bg-gray-200 rounded-full"></div>
                    <div
                      className={`absolute top-0 left-0 h-0.5 sm:h-1 rounded-full transition-all duration-500 ${
                        step.status === 'completed'
                          ? 'bg-[#22c9a8] w-full'
                          : step.status === 'current'
                          ? 'bg-gradient-to-r from-[#0077be] to-[#22c9a8] w-1/2'
                          : 'w-0'
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-between mt-3 text-xs">
          {stepsWithStatus.map((step) => (
            <div
              key={step.id}
              className={`font-semibold ${
                step.status === 'completed'
                  ? 'text-[#22c9a8]'
                  : step.status === 'current'
                  ? 'text-[#0077be]'
                  : 'text-gray-500'
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
