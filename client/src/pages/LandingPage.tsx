import React, { useState } from 'react';
import { Shield, Users, Heart, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', idade: '', observacao: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pronto para integração futura com o banco de dados
    console.log('Dados cadastrados do interessado:', formData);
    setEnviado(true);
    setFormData({ nome: '', whatsapp: '', idade: '', observacao: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-gray-800">
      
      {/* NAV / HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold tracking-wider">JIU-JITSU REFORMADO</span>
          </div>
          <nav className="hidden gap-6 md:flex animate-fade-in">
            <a href="#sobre" className="hover:text-amber-400 transition text-sm font-medium">Sobre o Projeto</a>
            <a href="#galeria" className="hover:text-amber-400 transition text-sm font-medium">Arrecadações</a>
            <a href="#cadastro" className="bg-amber-500 text-slate-950 px-4 py-2 rounded font-bold hover:bg-amber-400 transition text-sm">Inscrição</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-slate-900 py-16 text-white md:py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded text-sm font-semibold">
              Igreja Reformada em Vila Velha
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Moldando o corpo, a mente e o <span className="text-amber-400">caráter</span>.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Um projeto social 100% gratuito voltado para o ensino do Jiu-Jitsu clássico com base nos valores bíblicos, disciplina e respeito mútuo.
            </p>
            <div className="pt-2">
              <a href="#cadastro" className="inline-block bg-amber-500 text-slate-950 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-400 transition transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
                Quero me Cadastrar
              </a>
            </div>
          </div>
          
          {/* FOTO OFICIAL DA TURMA (image_5ce545.jpg) */}
          <div className="relative justify-self-center w-full max-w-lg md:max-w-none">
            <div className="overflow-hidden rounded-2xl border-4 border-slate-800 shadow-2xl bg-slate-950">
              <img 
                src="/turma-jiu-jitsu.jpg" 
                alt="Turma Oficial do Jiu-Jitsu Reformado" 
                className="w-full h-[300px] sm:h-[380px] object-cover object-center hover:scale-103 transition duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-slate-950 p-4 rounded-xl shadow-xl hidden sm:block transform rotate-3">
              <p className="text-2xl font-black text-center leading-none">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-center">Gratuito</p>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES DO PROJETO */}
      <section id="sobre" className="py-20 mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900">Mais que um esporte, uma família</h2>
          <p className="text-gray-600">Buscamos o desenvolvimento integral do cidadão unindo os conceitos técnicos do tatame ao acolhimento e instrução familiar.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl w-fit mb-6"><Users className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Comunidade e Integração</h3>
            <p className="text-gray-600">Um ambiente seguro, saudável e fraterno preparado para receber crianças, jovens e adultos.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl w-fit mb-6"><Shield className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Disciplina Absoluta</h3>
            <p className="text-gray-600">Ensino técnico refinado focado no autocontrole, resiliência, respeito às autoridades e constância.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl w-fit mb-6"><Heart className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Valores Sólidos</h3>
            <p className="text-gray-600">Momentos de reflexão devocional baseados em princípios bíblicos para edificação do caráter.</p>
          </div>
        </div>
      </section>

      {/* FOTOS DAS ARRECADAÇÕES */}
      <section id="galeria" className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Nossas Ações e Apoio Social</h2>
            <p className="text-gray-600">O projeto avança através da solidariedade e doações que estruturam a caminhada dos nossos atletas dentro e fora do tatame.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
              <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=500&q=80" alt="Arrecadação de Kimonos" className="h-48 w-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="p-4">
                <h4 className="font-bold text-lg text-slate-900">Kimonos e Armaduras</h4>
                <p className="text-sm text-gray-500">Doações focadas em equipar os alunos que não dispõem de condições para adquirir o uniforme oficial.</p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
              <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=500&q=80" alt="Arrecadação de Alimentos" className="h-48 w-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="p-4">
                <h4 className="font-bold text-lg text-slate-900">Cestas Básicas</h4>
                <p className="text-sm text-gray-500">Ações de arrecadação de alimentos destinadas ao suporte das famílias integradas ao projeto social.</p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">
              <img src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=500&q=80" alt="Expansão do Tatame" className="h-48 w-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="p-4">
                <h4 className="font-bold text-lg text-slate-900">Estrutura e Manutenção</h4>
                <p className="text-sm text-gray-500">Zelo constante com a higienização, expansão e segurança das placas de tatame.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO BÁSICO DE CADASTRO */}
      <section id="cadastro" className="py-20 mx-auto max-w-4xl px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden grid md:grid-cols-5">
          <div className="bg-slate-900 p-8 text-white md:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Faça sua Inscrição</h3>
              <p className="text-slate-300 text-sm leading-relaxed">As vagas são limitadas de acordo com o espaço físico. Preencha os dados ao lado e nossa equipe fará o contato para alinhar os dias e horários de treino.</p>
            </div>
            <div className="space-y-3 pt-8 md:pt-0 text-sm text-slate-400">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-500" /> Treinos Semanais Gratuitos</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-500" /> Nível Iniciante ao Avançado</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-500" /> Masculino e Feminino</div>
            </div>
          </div>

          <div className="p-8 md:col-span-3">
            {enviado ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">✓</div>
                <h4 className="text-xl font-bold text-slate-900">Pré-cadastro Recebido!</h4>
                <p className="text-gray-600 text-sm max-w-xs">Muito obrigado. Entraremos em contato pelo número informado nas próximas horas para validar sua vaga.</p>
                <button onClick={() => setEnviado(false)} className="text-sm text-amber-600 hover:text-amber-700 underline font-medium pt-2">Cadastrar outra pessoa</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Digite seu nome" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (com DDD)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      placeholder="Ex: (27) 99999-9999" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Idade</label>
                    <input 
                      type="number" 
                      required
                      value={formData.idade}
                      onChange={(e) => setFormData({...formData, idade: e.target.value})}
                      placeholder="Ex: 24" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Observações ou Necessidades (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={formData.observacao}
                    onChange={(e) => setFormData({...formData, observacao: e.target.value})}
                    placeholder="Conte se já possui kimono, histórico médico ou experiências anteriores no esporte..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none transition"
                  />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition shadow-md tracking-wide">
                  Solicitar Vaga no Projeto
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
        <p>© 2026 Jiu-Jitsu Reformado. Soli Deo Gloria. Todos os direitos reservados.</p>
        <p className="text-xs text-slate-500 mt-1">Igreja Reformada em Vila Velha / ES</p>
      </footer>

    </div>
  );
}