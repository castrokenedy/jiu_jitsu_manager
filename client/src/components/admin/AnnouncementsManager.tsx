import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AnnouncementsManager() {
  const { data: announcements, isLoading, refetch } = trpc.jiujitsu.getAnnouncements.useQuery();
  const createAnnouncementMutation = trpc.jiujitsu.createAnnouncement.useMutation();
  const updateAnnouncementMutation = trpc.jiujitsu.updateAnnouncement.useMutation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAnnouncementMutation.mutateAsync({
        title: formData.title,
        content: formData.content,
      });
      toast.success("Aviso criado com sucesso!");
      setOpen(false);
      setFormData({ title: "", content: "" });
      refetch();
    } catch (error) {
      toast.error("Erro ao criar aviso");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await updateAnnouncementMutation.mutateAsync({
        id,
        active: false,
      });
      toast.success("Aviso removido");
      refetch();
    } catch (error) {
      toast.error("Erro ao remover aviso");
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Avisos</CardTitle>
            <CardDescription>Crie avisos para o mural público</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Aviso
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Aviso</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título do aviso"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Conteúdo do aviso"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Criar Aviso
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : announcements && announcements.length > 0 ? (
          <div className="space-y-3">
            {announcements.map((announcement: any) => (
              <div key={announcement.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{announcement.content}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(announcement.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum aviso criado ainda
          </div>
        )}
      </CardContent>
    </Card>
  );
}
