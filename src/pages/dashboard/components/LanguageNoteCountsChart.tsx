import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const chartData = [
  {
    language: "English",
    noteCount: 22,
  },
  {
    language: "Spanish",
    noteCount: 10,
  },
  {
    language: "French",
    noteCount: 2,
  },
  {
    language: "German",
    noteCount: 5,
  },
];

const chartConfig = {
  noteCount: {
    label: "Note Count",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function LanguageNoteCountsChart() {
  return (
    <Card className="h-fit w-full pt-8">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Language Note Counts</h2>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="noteCount"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${index + 1}))`}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
