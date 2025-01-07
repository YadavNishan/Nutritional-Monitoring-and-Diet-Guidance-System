import React from "react";
import OnboardingData from "../../utils/json/onboardingData.json";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const OnBoarding: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const navigate = useNavigate();

  if (currentStep === 4) {
    navigate("/login");
  }

  return (
    <div className="onboarding">
      {OnboardingData.onboarding[currentStep] && (
        <div className="flex h-screen flex-col items-center justify-between">
          <div className="flex h-5/6 w-full flex-col items-baseline justify-center text-center">
            <img
              src={OnboardingData.onboarding[currentStep].asset}
              alt={OnboardingData.onboarding[currentStep].title}
              className="mx-auto w-1/3 object-contain object-center"
            />
            <div className="onboarding-content w-full px-5 pt-5">
              <h1 className="font-dm-sans text-2xl font-bold">
                {OnboardingData.onboarding[currentStep].title}
              </h1>
              <p className="mt-2 font-nunito-sans font-semibold leading-5 text-[#6e7179]">
                {OnboardingData.onboarding[currentStep].subtitle}
              </p>
            </div>
          </div>
          {currentStep <= 2 && (
            <div className="flex w-full items-center justify-between px-5 py-5 font-nunito-sans text-[#6e7179]">
              {currentStep !== 0 ? (
                <button
                  onClick={() =>
                    currentStep > 0 && setCurrentStep(currentStep - 1)
                  }
                  className="hover:text-primary"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="hover:text-primary"
                >
                  Skip
                </button>
              )}

              <button
                className="cursor-pointer rounded-full bg-primary p-5 text-xl text-white"
                onClick={() =>
                  currentStep <= 2 && setCurrentStep(currentStep + 1)
                }
              >
                <FaAngleRight />
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex w-full flex-col items-center justify-center gap-4 px-5 py-5">
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary w-full font-nunito-sans text-lg font-bold text-white"
              >
                Get Started
              </button>
              <div>
                <p className="text-center font-dm-sans text-[#6e7179]">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="px-2 text-primary underline-offset-2 hover:underline"
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnBoarding;
