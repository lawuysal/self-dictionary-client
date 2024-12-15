import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { Share2 } from "lucide-react";

const chartData = [
  {
    month: format(new Date("2024-10-25 19:37:12.968"), "dd/MM"),
    intensity: 23,
  },
  {
    month: format(new Date("2024-10-26 19:37:12.968"), "dd/MM"),
    intensity: 24,
  },
  {
    month: format(new Date("2024-10-27 19:37:12.968"), "dd/MM"),
    intensity: 24,
  },
  {
    month: format(new Date("2024-10-28 19:37:12.968"), "dd/MM"),
    intensity: 26,
  },
  {
    month: format(new Date("2024-10-29 19:37:12.968"), "dd/MM"),
    intensity: 27,
  },
  {
    month: format(new Date("2024-10-30 19:37:12.968"), "dd/MM"),
    intensity: 26,
  },
  {
    month: format(new Date("2024-11-1 19:37:12.968"), "dd/MM"),
    intensity: 27,
  },
];

const minIntensity = Math.min(...chartData.map((data) => data.intensity));

const chartConfig = {
  intensity: {
    label: "Intensity",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function AverageIntensityChart() {
  return (
    <Card className="h-fit w-full pt-8">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Average Note Intensity</h2>
          <Share2 />
        </div>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 0, left: -20 }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              domain={[minIntensity, "auto"]}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="intensity"
              fill="hsl(var(--chart-3))"
              stroke="hsl(var(--chart-3))"
              type={"monotone"}
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
