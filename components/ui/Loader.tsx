import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin h-5 w-5 text-foreground" />
    </div>
  );
};
