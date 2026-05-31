import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2 } from "lucide-react";
import { toast } from "sonner";

const beltColors: Record<string, string> = {
  branca: "bg-slate-200 text-slate-800",
  azul: "bg-blue-200 text-blue-800",
  roxa: "bg-purple-200 text-purple-800",
  marrom: "bg-amber-200 text-amber-800",
  preta: "bg-gray-900 text-white",
};

export default function StudentsManager() {
  const { data: students, isLoading, refetch } = trpc.jiujitsu.getAllStudents.useQuery();
  const createStudentMutation = trpc.jiujitsu.createStudent.useMutation();
  const updateStudentMutation = trpc.jiujitsu.updateStudent.useMutation();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    belt: "branca" as const,
    phone: "",
    entryDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStudentMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("Aluno atualizado com sucesso!");
      } else {
        await createStudentMutation.mutateAsync({
          ...formData,
          entryDate: new Date(formData.entryDate),
        });
        toast.success("Aluno criado com sucesso!");
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        belt: "branca",
        phone: "",
        entryDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar aluno");
    }
  };

  const handleEdit = (student: any) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      belt: student.belt,
      phone: student.phone || "",
      entryDate: student.entryDate,
      notes: student.notes || "",
    });
    setOpen(true);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Alunos</CardTitle>
            <CardDescription>Adicione, edite ou visualize informações dos alunos</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingId(null)}>
                <Plus className="w-4 h-4" />
                Novo Aluno
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar Aluno" : "Novo Aluno"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="belt">Faixa</Label>
                  <Select value={formData.belt} onValueChange={(value: any) => setFormData({ ...formData, belt: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branca">Branca</SelectItem>
                      <SelectItem value="azul">Azul</SelectItem>
                      <SelectItem value="roxa">Roxa</SelectItem>
                      <SelectItem value="marrom">Marrom</SelectItem>
                      <SelectItem value="preta">Preta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="entryDate">Data de Entrada</Label>
                  <Input
                    id="entryDate"
                    type="date"
                    value={formData.entryDate}
                    onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observações sobre o aluno"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? "Atualizar" : "Criar"} Aluno
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : students && students.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Faixa</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <Badge className={beltColors[student.belt]}>
                        {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.phone || "-"}</TableCell>
                    <TableCell>{new Date(student.entryDate).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(student)}
                        className="gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum aluno registrado. Clique em "Novo Aluno" para começar.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
