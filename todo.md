# Sistema de Gerenciamento de Turma de Jiu-Jitsu - TODO

## Banco de Dados & Schema
- [x] Criar tabela `students` (nome, faixa, telefone, data_entrada, notas, ativo)
- [x] Criar tabela `attendance` (aluno_id, data, presente)
- [x] Criar tabela `devotionals` (aluno_id, dia_semana, data_agendada, realizado)
- [x] Criar tabela `competitions` (nome, data, local, descricao)
- [x] Criar tabela `competition_enrollments` (aluno_id, competition_id, resultado)
- [x] Criar tabela `medals` (aluno_id, competition_id, posicao, descricao)
- [x] Criar tabela `announcements` (titulo, conteudo, data_criacao, ativo)
- [x] Criar tabela `point_logs` (aluno_id, tipo_ponto, valor, data, descricao)
- [x] Executar migrations SQL no banco de dados

## Backend (tRPC Procedures)
- [x] Procedure: listar alunos com ranking de pontos
- [x] Procedure: adicionar/editar aluno
- [x] Procedure: registrar presença
- [x] Procedure: obter histórico de presença (mensal)
- [x] Procedure: registrar ponto (presença, devocional, campeonato, visitante, vitória)
- [x] Procedure: obter ranking geral
- [x] Procedure: agendar devocional
- [x] Procedure: obter escala de devocionais (semanal/mensal)
- [x] Procedure: registrar competição
- [x] Procedure: inscrever aluno em competição
- [x] Procedure: registrar resultado de luta
- [x] Procedure: criar/editar/deletar anúncio
- [ ] Procedure: obter alunos com baixa frequência (alertas)
- [ ] Procedure: obter dados para gráficos de frequência

## Frontend - Dashboard Público
- [x] Página inicial do dashboard público
- [x] Componente: Ranking geral de pontuação (tabela interativa)
- [ ] Componente: Frequência mensal por aluno
- [x] Componente: Próximos eventos agendados
- [x] Componente: Mural de avisos/comunicados
- [ ] Componente: Gráfico de frequência (últimos 3 meses)
- [x] Design elegante e sofisticado com cores e tipografia refinada

## Frontend - Painel Administrativo
- [x] Página de login/autenticação para professores
- [x] Layout dashboard com sidebar navigation
- [x] Página: Gerenciar alunos (CRUD completo)
- [x] Página: Registrar presença (formulário diário)
- [x] Página: Escala de devocionais (agendamento visual)
- [x] Página: Gerenciar competições e inscrições
- [ ] Página: Registrar resultados de lutas
- [x] Página: Gerenciar anúncios
- [ ] Página: Visualizar alertas de frequência
- [ ] Página: Relatórios e estatísticas

## Sistema de Pontuação
- [x] Implementar cálculo automático de pontos
- [x] Criar regras fixas: Presença (+1), Devocional (+3), Campeonato (+5), Visitante (+2), Vitória (+10)
- [x] Gerar ranking em tempo real
- [x] Histórico de pontos por aluno

## Autenticação & Segurança
- [x] Configurar autenticação de professores (múltiplos admins)
- [x] Proteger rotas administrativas
- [x] Validar permissões de acesso

## Testes & Qualidade
- [x] Escrever testes vitest para procedures críticas
- [x] Testar fluxos de presença e pontuação
- [x] Testar autenticação e autorização

## Hospedagem & Deployment
- [ ] Configurar domínio gratuito
- [ ] Preparar para publicação na Manus
- [ ] Criar checkpoint final

## Design & UX
- [x] Refinar paleta de cores (elegante e sofisticado)
- [ ] Aplicar tipografia refinada
- [ ] Adicionar animações suaves
- [x] Garantir responsividade mobile
- [ ] Testar acessibilidade

## Documentação
- [ ] Atualizar README com instruções de uso
- [ ] Documentar estrutura do banco de dados
