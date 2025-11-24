import { Loader2Icon } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f0f0f0e0] dark:bg-[#18181be0] z-50">
      <Loader2Icon className={"animate-spin"} height={40} width={40} />
    </div>
  );
}
