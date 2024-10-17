import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardPage() {
  return (
    <div className="relative flex min-h-[calc(100svh-56px)] max-w-[92rem] flex-col transition-all duration-300 ease-in-out md:mx-auto md:px-4">
      <DashboardSidebar />

      {/* May add ml-[50px] and min-w-[calc(100%-50px)] for different centering */}
      <div className="flex min-h-[calc(100svh-56px)] w-full justify-center bg-muted/40 transition-all duration-200 ease-in-out md:ml-[40px] md:w-fit md:min-w-[calc(100%-50px)] md:rounded-tr-xl">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
