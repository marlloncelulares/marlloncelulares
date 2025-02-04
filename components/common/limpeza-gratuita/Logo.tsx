import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center my-4">
      <Image
        src="/images/logo.png"
        alt="Logo da Empresa"
        width={200} // Ajuste o tamanho conforme necessário
        height={7} // Ajuste o tamanho conforme necessário
        priority
      />
    </div>
  );
};

export default Logo;
