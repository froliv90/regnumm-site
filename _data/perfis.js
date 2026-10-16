/* Os quatro perfis do Mapa Financeiro: fonte única do texto público.

   Montam as gavetas de /perfis.html e as páginas próprias em /perfis/{slug}/
   (perfil.njk). O texto é o mesmo da tela de resultado gratuito do /mapa;
   mudar aqui muda o site, não o app. Nada do resultado completo (segundo
   perfil, cruzamento, enriquecimentos) entra neste arquivo.

   `chave` é o nome do glifo (glifos.njk) e o sufixo da âncora #perfil-{chave}.
   `tom` é a cor do glifo: warm para os perfis de movimento, cool para os de
   contenção. A ordem é a das gavetas. */

module.exports = [
  {
    chave: "visionario",
    slug: "visionario-sem-estrutura",
    nome: "Visionário sem Estrutura",
    eixo: "Futuro · Movimento",
    tom: "warm",
    seoDescricao: "Visionário sem Estrutura: o perfil financeiro que enxerga a oportunidade antes dos outros e vê a visão crescer mais rápido que a base. Onde trava e o custo.",
    define: "Vive no amanhã. Quando o dinheiro aparece, a mente vai direto para o próximo movimento, a próxima oportunidade, o que aquilo pode virar. Enxerga possibilidade antes dos outros e move o dinheiro em direção ao futuro que vê.",
    forca: "A capacidade de antecipar. Com a estrutura certa, essa visão vira resultado de verdade. Esse perfil raramente fica parado, tem energia e iniciativa.",
    trava: "A visão cresce mais rápido que a base que deveria sustentá-la. A vida financeira vira uma sequência de apostas no futuro, e cada aposta começa do zero em vez de se acumular sobre a anterior.",
    custo: "O patamar não sobe de forma consistente, mesmo com todo esse movimento. Muita energia em direção ao amanhã, pouco chão construído hoje.",
    pergunta: "Quantas oportunidades boas você enxergou antes dos outros, e que nunca viraram um sistema real de crescimento na sua vida?"
  },
  {
    chave: "executor",
    slug: "executor-sem-lastro",
    nome: "Executor sem Lastro",
    eixo: "Presente · Movimento",
    tom: "warm",
    seoDescricao: "Executor sem Lastro: o perfil financeiro que age rápido e resolve o que está na frente, mas fecha ciclos sem deixar base. Onde trava e quanto custa.",
    define: "Vive no hoje. Quando aparece uma decisão financeira, age. Não espera o contexto perfeito, resolve o que está na frente agora, ajusta no caminho.",
    forca: "A capacidade de não travar. Num mundo onde a paralisia é o defeito mais comum, agir é diferencial real. Esse perfil faz acontecer, recupera-se de erro sem catastrofizar.",
    trava: "A velocidade supera a estrutura. Como a atenção está toda no presente, o futuro não entra na conta. A trajetória vira ciclos de avanço e recomeço, porque cada ciclo não deixou base para o seguinte.",
    custo: "A diferença entre muito movimento e pouco acúmulo. Trabalha muito, move muito, mas o patrimônio não reflete o volume que passou pelas mãos. Fez muito hoje, não construiu para amanhã.",
    pergunta: "Se você continuar no mesmo ritmo, daqui a dez anos o dinheiro estará mais estável, ou apenas mais movimentado?"
  },
  {
    chave: "guardiao",
    slug: "guardiao-que-aprisiona",
    nome: "Guardião que Aprisiona",
    eixo: "Presente · Contenção",
    tom: "cool",
    seoDescricao: "Guardião que Aprisiona: o perfil financeiro que protege o que tem com tanta força que a proteção vira prisão. A força, o ponto onde trava e o custo silencioso.",
    define: "Vive protegendo o que tem agora. Para esse perfil, dinheiro significa segurança, não crescimento. Controla, guarda, mantém reserva, evita dívida.",
    forca: "A solidez. Esse perfil raramente sofre grandes perdas, atravessa crise sem pânico, mantém a cabeça fria quando os outros entram em desespero.",
    trava: "A proteção vira prisão. O controle, que existe para dar segurança, passa a impedir qualquer movimento. A aversão à perda se torna aversão ao ganho.",
    custo: "Custo de oportunidade, o mais silencioso de todos, porque nada de errado aconteceu. Apenas deixou de ganhar o que poderia. Protegeu tão bem o presente que aprisionou o futuro.",
    pergunta: "Quanto do seu dinheiro hoje está protegido, mas já não está trabalhando para ampliar a sua vida?"
  },
  {
    chave: "estrategista",
    slug: "estrategista-imovel",
    nome: "Estrategista Imóvel",
    eixo: "Futuro · Contenção",
    tom: "cool",
    seoDescricao: "Estrategista Imóvel: o perfil financeiro que planeja o futuro com rigor, mas não parte. A força do rigor, o ponto onde a análise trava e o custo de esperar.",
    define: "Vive pensando no futuro, mas contém o movimento. Planeja, projeta, estuda, monta o cenário, faz a planilha. Sabe para onde quer ir. Mas não parte.",
    forca: "O rigor. Esse perfil não toma decisão impulsiva, enxerga risco antes que se materialize, planeja com cuidado que poucos têm.",
    trava: "O dado final nunca chega, porque a certeza absoluta não existe. Fica orientado ao futuro mas paralisado no presente, com o plano pronto e a execução sempre adiada.",
    custo: "A distância entre onde está e onde estaria se tivesse agido dois anos antes. Sonhou o futuro em detalhe e nunca deu o primeiro passo em direção a ele.",
    pergunta: "Quanto da sua vida financeira ainda está esperando o momento perfeito que nunca vai chegar?"
  }
];
