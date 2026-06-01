import React from 'react';

interface Atleta {
  id: number;
  nome: string;
  pontos: number;
  faixa: string;
  foto: string;
}

export default function Ranking() {
  const atletas: Atleta[] = [
    { id: 1, nome: "Carlos Silva", pontos: 450, faixa: "Azul", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: 2, nome: "Lucas Souza", pontos: 420, faixa: "Branca", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    { id: 3, nome: "Amanda Costa", pontos: 390, faixa: "Roxa", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🏆 Ranking de Graduação e Destaques</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px' }}>Posição</th>
            <th style={{ padding: '12px' }}>Foto</th>
            <th style={{ padding: '12px' }}>Nome</th>
            <th style={{ padding: '12px' }}>Faixa</th>
            <th style={{ padding: '12px' }}>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {atletas.map((atleta, index) => (
            <tr key={atleta.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{index + 1}º</td>
              <td style={{ padding: '12px' }}>
                <img 
                  src={atleta.foto} 
                  alt={atleta.nome} 
                  style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1e3c72' }} 
                />
              </td>
              <td style={{ padding: '12px', fontWeight: '500' }}>{atleta.nome}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#e0e0e0', fontSize: '0.9rem' }}>{atleta.faixa}</span>
              </td>
              <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{atleta.pontos} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}