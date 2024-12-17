import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import DashboardSidebar from "./components/DashboardSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ExampleChart from "./components/ExampleChart";
import { cn } from "@/lib/utils";
import AverageIntensityChart from "./components/AverageIntensityChart";
import LatestQuizScoresChart from "./components/LatestQuizScoresChart";
import LanguageNoteCountsChart from "./components/LanguageNoteCountsChart";

export default function DashboardPage() {
  const { currentPath } = useSelector((state: RootState) => state.navigation);
  return (
    <div className="relative flex min-h-[calc(100svh-56px)] max-w-[92rem] flex-col transition-all duration-300 ease-in-out md:mx-auto md:px-4">
      <DashboardSidebar />

      {/* May add ml-[50px] and min-w-[calc(100%-50px)] for different centering */}
      <div
        className={cn(
          "flex min-h-[calc(100svh-56px)] w-full justify-center transition-all duration-200 ease-in-out md:ml-[40px] md:w-fit md:min-w-[calc(100%-40px)] md:max-w-[calc(100%-40px)] md:rounded-tr-xl",
          !currentPath.split("/")[2] ? "bg-muted/40" : "",
        )}
      >
        {currentPath.split("/")[2] ? (
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        ) : (
          <main className="mx-3 mt-2 flex w-full flex-col justify-start gap-4 md:mx-9 md:mt-5">
            <div className="ml-6 mt-5 flex h-fit w-fit items-start justify-start">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <section className="grid w-full grid-cols-1 items-start justify-center gap-4 md:grid-cols-2">
              <AverageIntensityChart />
              <LatestQuizScoresChart />
              <LanguageNoteCountsChart />
              <ExampleChart />
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
