import React from 'react';

interface Meta {
  id: number;
  titulo: string;
  arrecadado: number;
  alvo: number;
  descricao: string;
}

export default function Metas() {
  const metas: Meta[] = [
    { id: 1, titulo: "Compra de Novos Tatames", arrecadado: 1200, alvo: 3000, descricao: "Ampliação do espaço de treino para comportar mais crianças." },
    { id: 2, titulo: "Cestas Básicas Mensais", arrecadado: 850, alvo: 1000, descricao: "Doação para as famílias dos alunos cadastrados em vulnerabilidade." },
    { id: 3, titulo: "Kimonos para Doação", arrecadado: 400, alvo: 1500, descricao: "Compra de armaduras oficiais para quem não tem condições de comprar." }
  ];

  const calcularPorcentagem = (atual: number, total: number) => Math.min((atual / total) * 100, 100);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>🎯 Nossas Metas e Necessidades</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Ajude o nosso projeto social da igreja a continuar crescendo.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {metas.map(meta => {
          const pct = calcularPorcentagem(meta.arrecadado, meta.alvo);
          return (
            <div key={meta.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <h3 style={{ marginTop: 0, color: '#1e3c72' }}>{meta.titulo}</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', minHeight: '40px' }}>{meta.descricao}</p>
              
              <div style={{ margin: '15px 0 5px 0', fontWeight: 'bold', fontSize: '0.95rem' }}>
                R$ {meta.arrecadado} <span style={{ fontWeight: 'normal', color: '#777' }}>de R$ {meta.alvo}</span>
              </div>
              
              <div style={{ width: '100%', backgroundColor: '#e0e0e0', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '15px' }}>
                <div style={{ width: `${pct}%`, backgroundColor: '#28a745', height: '100%', transition: 'width 0.5s ease-in-out' }}></div>
              </div>
              
              <button style={{ width: '100%', padding: '10px', backgroundColor: '#ffcc00', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', color: '#1e3c72' }}>
                Contribuir / Ajudar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}