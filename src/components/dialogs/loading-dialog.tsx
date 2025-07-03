import { createPortal } from "react-dom";
import { Spinner } from "../ui/spin";

const LoadingDialog = () => {
  return createPortal(
    <div
      className="absolute w-full h-full top-0 left-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <Spinner size="large" />
    </div>,
    document.body
  );
};

export default LoadingDialog;
