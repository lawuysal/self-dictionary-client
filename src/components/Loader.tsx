import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="item min-h-[calc(100vh-72px)] min-w-fit flex-1 items-center justify-center">
      <BarLoader color="#34D399" />
    </div>
  );
}
