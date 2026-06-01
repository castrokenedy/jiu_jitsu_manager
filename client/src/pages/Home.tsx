// src/pages/Home.jsx
import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ nome: '', telefone: '', idade: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você integrará com seu banco de dados ou API
    alert(`Obrigado pelo interesse, ${formData.nome}! Entraremos em contato em breve.`);
    setFormData({ nome: '', telefone: '', idade: '' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9' }}>
      {/* Hero Section */}
      <section style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Projeto Jiu-Jitsu Para Todos</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Transformando vidas através do esporte de forma 100% gratuita. Uma iniciativa da nossa comunidade/igreja.</p>
        <a href="#cadastro" style={{ padding: '12px 24px', backgroundColor: '#ffcc00', color: '#1e3c72', fontWeight: 'bold', borderRadius: '5px', textDecoration: 'none' }}>Quero Participar</a>
      </section>

      {/* Sobre o Projeto */}
      <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Sobre a Nossa Missão</h2>
        <p>Acreditamos que o Jiu-Jitsu molda o caráter, traz disciplina e saúde. Nossas aulas são totalmente gratuitas e voltadas para o desenvolvimento físico, mental e espiritual de jovens e adultos da nossa comunidade.</p>
      </section>

      {/* Formulário de Interesse */}
      <section id="cadastro" style={{ padding: '40px 20px', backgroundColor: '#fff', maxWidth: '500px', margin: '40px auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Demonstre seu Interesse</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Seu Nome Completo" 
            required 
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="tel" 
            placeholder="WhatsApp / Telefone" 
            required 
            value={formData.telefone}
            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="number" 
            placeholder="Sua Idade" 
            required 
            value={formData.idade}
            onChange={(e) => setFormData({...formData, idade: e.target.value})}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Enviar Cadastro
          </button>
        </form>
      </section>
    </div>
  );
}