import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Trophy, Calendar, TrendingUp } from "lucide-react";
import LowAttendanceAlerts from "./LowAttendanceAlerts";

export default function StatsOverview() {
  const { data: ranking, isLoading: rankingLoading } = trpc.jiujitsu.getGeneralRanking.useQuery();
  const { data: students, isLoading: studentsLoading } = trpc.jiujitsu.getAllStudents.useQuery();

  const topStudent = ranking?.[0];
  const totalStudents = students?.length || 0;
  const totalPoints = ranking?.reduce((sum: number, s: any) => sum + (s.totalPoints || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {studentsLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">Alunos ativos</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total Points */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos Totais</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {rankingLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totalPoints}</div>
                <p className="text-xs text-muted-foreground">Pontuação acumulada</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Top Student */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Líder do Ranking</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {rankingLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : topStudent ? (
              <>
                <div className="text-2xl font-bold">{topStudent.name}</div>
                <p className="text-xs text-muted-foreground">{topStudent.totalPoints || 0} pontos</p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">Sem dados</p>
            )}
          </CardContent>
        </Card>

        {/* Average Points */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {rankingLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {ranking && ranking.length > 0 ? Math.round(totalPoints / ranking.length) : 0}
                </div>
                <p className="text-xs text-muted-foreground">Por aluno</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <LowAttendanceAlerts />
    </div>
  );
}
