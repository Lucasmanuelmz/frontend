export default function About() {
  return (
    <section className="about-container mx-auto mt-10 max-w-3xl rounded-lg bg-gray-200 p-6 dark:bg-gray-800">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Sobre o ACode
      </h1>
      <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        O ACode é uma plataforma criada para desenvolvedores compartilharem seus
        conhecimentos e experiências sobre programação e trabalho remoto.
        Fundada por Lucas M. Alface, desenvolvedor web full-stack, a plataforma
        permite a criação de artigos e troca de opiniões entre os membros da
        comunidade.
      </p>

      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Quem é Lucas M. Alface?
      </h2>
      <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Lucas M. Alface é o fundador do ACode e possui ampla experiência como
        desenvolvedor web, trabalhando principalmente com JavaScript e
        tecnologias relacionadas. Com anos de prática em projetos de diversos
        tipos, ele criou o ACode para ser um ponto de encontro para
        programadores, onde podem aprender, ensinar e compartilhar.
      </p>

      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Missão do ACode
      </h2>
      <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        O ACode tem como missão proporcionar um ambiente seguro e colaborativo,
        onde desenvolvedores podem se conectar, compartilhar seus conhecimentos
        e experiências, e crescer juntos em suas jornadas profissionais.
      </p>

      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        O que oferecemos?
      </h2>
      <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
        <li>
          Artigos de alta qualidade sobre desenvolvimento web e trabalho remoto.
        </li>
        <li>
          Espaço para comentários e discussões construtivas em cada artigo.
        </li>
        <li>
          Regras claras para garantir um ambiente saudável e respeitoso para
          todos os membros.
        </li>
      </ul>
    </section>
  );
}
