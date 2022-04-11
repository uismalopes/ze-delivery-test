import { useTypedSelector } from "@hooks/useTypeSelector";
import { CircularProgress } from "react-cssfx-loading/lib";

function Loading() {
  const { loading } = useTypedSelector((state) => state.zeStates);
  return (
    <div
      className={`loading align-items-center justify-content-center ${
        loading ? "d-flex" : "d-none"
      }`}
    >
      <CircularProgress width="100px" color="#ffcc00" />
      <p className="text-primary mt-2">Aguarde um momento...</p>
    </div>
  );
}

export default Loading;
