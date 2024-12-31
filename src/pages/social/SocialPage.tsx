import { Suspense } from "react";
import CreateSocialPostForm from "./components/CreateSocialPostForm";
import MobileSocialMenu from "./components/MobileSocialMenu";
import SocialMenu from "./components/SocialMenu";
import { Outlet } from "react-router-dom";
import Loader from "@/components/Loader";

export default function SocialPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-[92rem] flex-col-reverse justify-center px-4 md:grid md:grid-cols-[1fr_2fr_1fr]">
      <div className="fixed bottom-0 left-0 right-0 z-40 mt-5">
        <MobileSocialMenu />
      </div>
      <div className="mt-5 hidden w-full flex-col items-center md:flex md:pr-4">
        <SocialMenu />
      </div>
      <div className="flex w-full flex-col items-center md:mt-5 md:px-4">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full flex-col items-center md:pl-4">
        <CreateSocialPostForm />
      </div>
    </main>
  );
}
