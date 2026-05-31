import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Trophy } from "lucide-react";

const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export default function DevotionalsManager() {
  const { data: students, isLoading: studentsLoading } = trpc.jiujitsu.getAllStudents.useQuery();
  const scheduleDevotionalMutation = trpc.jiujitsu.scheduleDevotional.useMutation();

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  const handleSchedule = async () => {
    if (!selectedStudent) {
      toast.error("Selecione um aluno");
      return;
    }

    try {
      await scheduleDevotionalMutation.mutateAsync({
        studentId: parseInt(selectedStudent),
        dayOfWeek: selectedDay,
      });
      toast.success("Devocional agendado com sucesso!");
      setSelectedStudent("");
    } catch (error) {
      toast.error("Erro ao agendar devocional");
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Escala de Devocionais
          </CardTitle>
          <CardDescription>Agende quem vai falar cada dia da semana</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Day Selector */}
          <div>
            <Label htmlFor="day">Dia da Semana</Label>
            <Select value={selectedDay.toString()} onValueChange={(v) => setSelectedDay(parseInt(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Student Selector */}
          <div>
            <Label htmlFor="student">Aluno</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent>
                {studentsLoading ? (
                  <div className="p-2 text-sm text-muted-foreground">Carregando...</div>
                ) : students && students.length > 0 ? (
                  students.map((student: any) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground">Nenhum aluno disponível</div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Schedule Button */}
          <Button onClick={handleSchedule} className="w-full" size="lg">
            Agendar Devocional
          </Button>

          {/* Info */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Dia selecionado:</strong> {daysOfWeek[selectedDay]}
            </p>
            {selectedStudent && students && (
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Aluno:</strong> {students.find((s: any) => s.id === parseInt(selectedStudent))?.name}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
