import { useCallback, useMemo, useState } from "react";

interface StepOutput {
  canGoToNextStep: boolean;
  canGoToPreviousStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  prevSwitchStep: () => void;
  nextSwitchStep: () => void;
}

/**
 * Custom hook to update step motion, multi step form
 * @param {number} maxStep
 * @returns [number, StepOutput]
 */
function useStep(maxStep: number): [number, StepOutput] {
  const [currentStep, setCurrentStep] = useState(0);

  /** Returns a boolean if current step can move forward */
  const canGoToNextStep = useMemo(
    () => currentStep + 1 < maxStep,
    [currentStep, maxStep],
  );

  /** Returns a boolean if current step can move backward */
  const canGoToPreviousStep = useMemo(
    () => currentStep - 1 >= 0,
    [currentStep],
  );

  /** If step can move forward, updates the current step + 1 */
  const nextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep]);

  /** If step can move backward, updates the current step - 1 */
  const previousStep = useCallback(() => {
    if (canGoToPreviousStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPreviousStep]);

  /** Sets the step, if valid number is in range between start and finish */
  const setStep = useCallback(
    (step: number): void => {
      if (!(step >= 0 && step <= maxStep)) {
        throw new Error("Step not valid");
      }

      setCurrentStep(step);
    },
    [maxStep],
  );

  /** Resets step to initial step */
  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const prevSwitchStep = useCallback(() => {
    if (canGoToPreviousStep) {
      setCurrentStep((step) => step - 1);
    } else {
      setStep(maxStep - 1);
    }
  }, [canGoToPreviousStep, setStep, maxStep]);

  const nextSwitchStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    } else {
      reset();
    }
  }, [canGoToNextStep, reset]);

  return [
    currentStep,
    {
      canGoToPreviousStep,
      canGoToNextStep,
      previousStep,
      nextStep,
      reset,
      prevSwitchStep,
      nextSwitchStep,
    },
  ];
}

export default useStep;
