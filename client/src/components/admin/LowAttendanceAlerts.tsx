import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

const ATTENDANCE_THRESHOLD = 70; // 70% threshold

export default function LowAttendanceAlerts() {
  const { data: students, isLoading: studentsLoading } = trpc.jiujitsu.getAllStudents.useQuery();
  const currentDate = new Date();
  const [month] = useState(currentDate.getMonth() + 1);
  const [year] = useState(currentDate.getFullYear());

  // Get attendance rates for all students
  const queries = useMemo(
    () =>
      students?.map((student: any) =>
        trpc.jiujitsu.getStudentAttendanceRate.useQuery({
          studentId: student.id,
          year,
          month,
        })
      ) || [],
    [students, year, month]
  );

  const attendanceData = useMemo(() => {
    if (!students) return [];
    return students
      .map((student: any, idx: number) => ({
        student,
        rate: queries[idx]?.data?.rate || 0,
      }))
      .filter((item) => item.rate < ATTENDANCE_THRESHOLD && item.rate > 0)
      .sort((a, b) => a.rate - b.rate);
  }, [students, queries]);

  if (studentsLoading) {
    return <div className="text-center py-8">Carregando alertas...</div>;
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-destructive/10 to-accent/10 border-b">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <div>
            <CardTitle>Alertas de Baixa Frequência</CardTitle>
            <CardDescription>Alunos com frequência abaixo de {ATTENDANCE_THRESHOLD}%</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {attendanceData.length > 0 ? (
          <div className="space-y-3">
            {attendanceData.map(({ student, rate }) => (
              <Alert key={student.id} className="border-l-4 border-l-destructive">
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Frequência: {rate}%
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        rate < 50
                          ? "bg-destructive/20 text-destructive border-destructive"
                          : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500"
                      }
                    >
                      {rate < 50 ? "Crítico" : "Atenção"}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            ✅ Todos os alunos estão com frequência acima de {ATTENDANCE_THRESHOLD}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
