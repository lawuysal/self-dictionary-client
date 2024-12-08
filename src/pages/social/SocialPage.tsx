import CreateSocialPostForm from "./components/CreateSocialPostForm";
import SocialMenu from "./components/SocialMenu";
import { Outlet } from "react-router-dom";

export default function SocialPage() {
  return (
    <main className="mx-auto grid w-full max-w-[92rem] grid-cols-[1fr_2fr_1fr] px-4">
      <div className="mt-5 flex w-full flex-col items-center pr-4">
        <SocialMenu />
      </div>
      <div className="mt-5 flex w-full flex-col items-center px-4">
        <Outlet />
      </div>
      <div className="mt-5 flex w-full flex-col items-center pl-4">
        <CreateSocialPostForm />
      </div>
    </main>
  );
}
