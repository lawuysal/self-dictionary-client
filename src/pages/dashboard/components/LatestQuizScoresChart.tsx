import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, YAxis } from "recharts";

const chartData = [
  {
    correctAnswers: 4,
    wrongAnswers: 6,
  },
  {
    correctAnswers: 3,
    wrongAnswers: 7,
  },
  {
    correctAnswers: 8,
    wrongAnswers: 2,
  },
  {
    correctAnswers: 6,
    wrongAnswers: 4,
  },
  {
    correctAnswers: 10,
    wrongAnswers: 0,
  },
  {
    correctAnswers: 5,
    wrongAnswers: 5,
  },
  {
    correctAnswers: 9,
    wrongAnswers: 1,
  },
];

// const minIntensity = Math.min(...chartData.map((data) => data.intensity));

const chartConfig = {
  correctAnswers: {
    label: "Correct Answers",
    color: "hsl(var(--chart-1))",
  },
  wrongAnswers: {
    label: "Wrong Answers",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function LatestQuizScoresChart() {
  return (
    <Card className="h-fit w-full pt-8">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Latest Quiz Scores</h2>
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
              // domain={[minIntensity, "auto"]}
            />
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="correctAnswers"
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
              type={"linear"}
              strokeWidth={2}
            />
            <Line
              dataKey="wrongAnswers"
              fill="hsl(var(--chart-5))"
              stroke="hsl(var(--chart-5))"
              type={"linear"}
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
