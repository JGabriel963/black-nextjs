"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { EntrieType } from "@/schema"
import { BudgetItem } from "../page"
import { useMemo } from "react"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface BarChartDahsboardProps {
    data: BudgetItem[]
}

export function BarChartDahsboard({ data }: BarChartDahsboardProps) {
    const dataList = useMemo(() => data.map((item) => ({ budget: item.name, total: item.totalSpend })), [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ganhos</CardTitle>
        <CardDescription>Análise das entradas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dataList}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="budget"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel  />}
            />
            <Bar dataKey="total"  fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


