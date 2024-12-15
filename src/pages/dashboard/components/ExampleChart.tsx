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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function ExampleChart() {
  return (
    <Card className="h-fit w-full pt-8">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Sales Overview</h2>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
          >
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="desktop"
              fill="hsl(var(--chart-3))"
              stroke="hsl(var(--chart-3))"
              type={"monotone"}
              strokeWidth={2}
            />
            <Line
              dataKey="mobile"
              fill="hsl(var(--chart-4))"
              stroke="hsl(var(--chart-4))"
              type={"monotone"}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
