import { useOnboardingStatus } from "../../hooks/useOnboardingStatus";
import OnboardingForm from "./OnboardingForm";

interface WelcomePageProps {
  children?: React.ReactNode;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ children }) => {
  const { data: hasCompleted, isLoading, refetch } = useOnboardingStatus();

  const handleOnboardingComplete = () => {
    refetch(); // Refresh onboarding status
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-foreground text-xl">Loading...</div>
      </div>
    );
  }

  // If user hasn't completed onboarding, show the form
  if (!hasCompleted) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  // If user has completed onboarding, show the main app
  return <div className="h-screen w-screen">{children}</div>;
};

export default WelcomePage;
