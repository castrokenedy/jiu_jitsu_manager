import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Trophy, Users, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const beltColors: Record<string, string> = {
  branca: "bg-slate-200 text-slate-800",
  azul: "bg-blue-200 text-blue-800",
  roxa: "bg-purple-200 text-purple-800",
  marrom: "bg-amber-200 text-amber-800",
  preta: "bg-gray-900 text-white",
};

export default function PublicDashboard() {
  const { data: ranking, isLoading: rankingLoading } = trpc.jiujitsu.getGeneralRanking.useQuery();
  const { data: announcements, isLoading: announcementsLoading } = trpc.jiujitsu.getAnnouncements.useQuery();
  const { data: competitions, isLoading: competitionsLoading } = trpc.jiujitsu.getUpcomingCompetitions.useQuery();
  const { data: devotionals, isLoading: devotionalsLoading } = trpc.jiujitsu.getDevotionalsSchedule.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Academia de Jiu-Jitsu</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Dashboard de Desempenho da Equipe</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ranking and Announcements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ranking */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <div>
                    <CardTitle>Ranking Geral da Equipe</CardTitle>
                    <CardDescription>Pontuação total acumulada</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {rankingLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                  </div>
                ) : ranking && ranking.length > 0 ? (
                  <div className="space-y-2">
                    {ranking.map((student: any, index: number) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{student.name}</p>
                            <Badge className={`${beltColors[student.belt]} text-xs`}>
                              {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{student.totalPoints || 0}</p>
                          <p className="text-xs text-muted-foreground">pontos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum aluno registrado ainda</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Announcements */}
            {announcements && announcements.length > 0 && (
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b">
                  <CardTitle>Mural de Avisos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {announcementsLoading ? (
                    <div className="space-y-3">
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-20" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {announcements.map((announcement: any) => (
                        <Alert key={announcement.id} className="border-l-4 border-l-accent">
                          <AlertCircle className="h-4 w-4 text-accent" />
                          <AlertDescription>
                            <p className="font-semibold text-foreground">{announcement.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Events and Schedule */}
          <div className="space-y-6">
            {/* Upcoming Competitions */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Próximos Eventos</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {competitionsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : competitions && competitions.length > 0 ? (
                  <div className="space-y-3">
                    {competitions.map((comp: any) => (
                      <div key={comp.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border">
                        <p className="font-semibold text-sm text-foreground">{comp.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(comp.date).toLocaleDateString("pt-BR")}
                        </p>
                        {comp.location && (
                          <p className="text-xs text-muted-foreground">{comp.location}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-6">Nenhum evento agendado</p>
                )}
              </CardContent>
            </Card>

            {/* Devotionals Schedule */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b">
                <CardTitle className="text-lg">Escala de Devocionais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {devotionalsLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-8" />
                    ))}
                  </div>
                ) : devotionals ? (
                  <div className="space-y-2">
                    {devotionals.slice(1, 6).map((day: any) => (
                      <div key={day.day} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
                        <p className="text-sm font-medium text-foreground">{day.dayName}</p>
                        {day.devotionals && day.devotionals.length > 0 ? (
                          <p className="text-xs text-muted-foreground">
                            {day.devotionals.length} agendado{day.devotionals.length > 1 ? "s" : ""}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">-</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
