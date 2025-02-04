import React from 'react';

const Headline: React.FC = () => {
  const titleLine1 = "VOCÊ ACABA DE GANHAR UMA LIMPEZA GRATUITA";
  const titleLine2 = "DO SEU APARELHO COM OS NOSSOS ESPECIALISTAS";
  const subtitle =
    "Assista ao Vídeo e Veja Como Agendar uma Limpeza Gratuita no Marllon Celulares";

  return (
    <div className="text-center my-8">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        <span className="text-yellow block font-bold">{titleLine1}</span>
        <span className="text-yellow block">{titleLine2}</span>
      </h1>
      <p className="text-lg text-white">{subtitle}</p>
    </div>
  );
};

export default Headline;
