import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

export default function AttendanceManager() {
  const { data: students, isLoading: studentsLoading } = trpc.jiujitsu.getAllStudents.useQuery();
  const recordAttendanceMutation = trpc.jiujitsu.recordAttendance.useMutation();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});

  const handleToggleAttendance = (studentId: number) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      for (const [studentId, present] of Object.entries(attendance)) {
        await recordAttendanceMutation.mutateAsync({
          studentId: parseInt(studentId),
          date: new Date(selectedDate),
          present,
        });
      }
      toast.success("Presença registrada com sucesso!");
      setAttendance({});
    } catch (error) {
      toast.error("Erro ao registrar presença");
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Registrar Presença
          </CardTitle>
          <CardDescription>Marque os alunos presentes no dia</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Date Selector */}
          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="max-w-xs"
            />
          </div>

          {/* Students List */}
          {studentsLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : students && students.length > 0 ? (
            <div className="space-y-3">
              {students.map((student: any) => (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={attendance[student.id] || false}
                    onCheckedChange={() => handleToggleAttendance(student.id)}
                  />
                  <Label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.belt}</p>
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum aluno registrado
            </div>
          )}

          {/* Save Button */}
          {Object.keys(attendance).length > 0 && (
            <Button onClick={handleSaveAttendance} className="w-full" size="lg">
              Salvar Presença ({Object.values(attendance).filter(Boolean).length} presentes)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
