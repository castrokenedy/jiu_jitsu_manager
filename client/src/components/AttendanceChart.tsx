import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AttendanceChartProps {
  studentId: number;
  studentName: string;
}

export default function AttendanceChart({ studentId, studentName }: AttendanceChartProps) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const { data: attendanceRate, isLoading } = trpc.jiujitsu.getStudentAttendanceRate.useQuery({
    studentId,
    year,
    month,
  });

  const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
    new Date(year, month - 1)
  );

  const chartData = [
    {
      name: "Presença",
      value: attendanceRate?.presentDays || 0,
      fill: "oklch(0.65 0.2 265)",
    },
    {
      name: "Ausência",
      value: (attendanceRate?.totalDays || 0) - (attendanceRate?.presentDays || 0),
      fill: "oklch(0.93 0.01 0)",
    },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Frequência de {studentName}</CardTitle>
            <CardDescription>Taxa de presença mensal</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
                      new Date(year, i)
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(3)].map((_, i) => {
                  const y = currentDate.getFullYear() - i;
                  return (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <Skeleton className="h-64" />
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                <p className="text-sm text-muted-foreground mb-1">Presentes</p>
                <p className="text-2xl font-bold text-primary">{attendanceRate?.presentDays || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total de Dias</p>
                <p className="text-2xl font-bold text-foreground">{attendanceRate?.totalDays || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10 text-center">
                <p className="text-sm text-muted-foreground mb-1">Taxa</p>
                <p className="text-2xl font-bold text-accent">{attendanceRate?.rate || 0}%</p>
              </div>
            </div>

            {/* Chart */}
            {attendanceRate && attendanceRate.totalDays > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Nenhum dado de frequência para este período
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
