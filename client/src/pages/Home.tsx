import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Calendar, Zap, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Jiu-Jitsu Reformado</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            {isAuthenticated && user?.role === "admin" ? (
              <Button onClick={() => navigate("/admin")}>Painel Admin</Button>
            ) : (
              <Button onClick={() => window.location.href = getLoginUrl()}>
                Login Professores
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Gerenciamento de Presença e Pontuação Jiu-Jitsu Reformados
            </h2>
            <p className="text-xl text-muted-foreground">
              Controle de presença, ranking de pontuação e gestão completa da sua turma
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              Ver Dashboard Público
              <ArrowRight className="w-4 h-4" />
            </Button>
            {!isAuthenticated && (
              <Button size="lg" variant="outline" onClick={() => window.location.href = getLoginUrl()}>
                Acesso Administrativo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Funcionalidades Principais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                <Trophy className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Ranking de Pontuação</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Sistema gamificado com pontos por presença, devocionais, competições e vitórias
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Controle de Presença</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Registro diário de presença com histórico mensal e taxa de frequência
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Gestão de Alunos</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Cadastro completo com faixa, telefone, data de entrada e observações
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Escala de Devocionais</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Agendamento de quem vai falar cada dia da semana com histórico
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scoring System Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Sistema de Pontuação</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "Presença", points: "+1", color: "bg-blue-100 dark:bg-blue-900" },
              { label: "Devocional", points: "+3", color: "bg-purple-100 dark:bg-purple-900" },
              { label: "Campeonato", points: "+5", color: "bg-amber-100 dark:bg-amber-900" },
              { label: "Visitante", points: "+2", color: "bg-green-100 dark:bg-green-900" },
              { label: "Vitória", points: "+10", color: "bg-accent/20" },
            ].map((item) => (
              <Card key={item.label} className={`${item.color} border-0 text-center`}>
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold text-foreground mb-2">{item.label}</p>
                  <p className="text-3xl font-bold text-primary">{item.points}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h3 className="text-3xl font-bold">Comece Agora</h3>
          <p className="text-lg text-primary-foreground/90">
            Acesse o dashboard público para ver o ranking da sua turma ou faça login para gerenciar todos os dados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              Ver Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
            {!isAuthenticated && (
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-slate-100"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Login para Professores
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2026 Sistema de Gerenciamento de Jiu-Jitsu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
