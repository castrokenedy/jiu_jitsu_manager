import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Trophy, Megaphone, BarChart3, LogOut } from "lucide-react";
import StudentsManager from "@/components/admin/StudentsManager";
import AttendanceManager from "@/components/admin/AttendanceManager";
import DevotionalsManager from "@/components/admin/DevotionalsManager";
import CompetitionsManager from "@/components/admin/CompetitionsManager";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";
import StatsOverview from "@/components/admin/StatsOverview";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Você não tem permissão para acessar o painel administrativo.</p>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Alunos</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Presença</span>
            </TabsTrigger>
            <TabsTrigger value="devotionals" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Devocionais</span>
            </TabsTrigger>
            <TabsTrigger value="competitions" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Competições</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Avisos</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentsManager />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceManager />
          </TabsContent>

          <TabsContent value="devotionals" className="space-y-6">
            <DevotionalsManager />
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <CompetitionsManager />
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <AnnouncementsManager />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
