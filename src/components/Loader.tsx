import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="item flex min-h-[calc(100svh-68px)] min-w-fit flex-1 items-center justify-center md:min-h-[calc(100svh-72px)]">
      <BarLoader color="#34D399" />
    </div>
  );
}
