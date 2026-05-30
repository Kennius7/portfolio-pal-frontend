import { Loader2 } from "lucide-react";

const LoadingComponent = ({
  loadingText = "Loading...",
}: {
  loadingText?: string;
}) => {
  return (
    <section>
      <div className="flex items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="animate-spin h-5 w-5 text-gray-700" />
        <p className="text-white">{loadingText}</p>
      </div>
    </section>
  );
};

export default LoadingComponent;
