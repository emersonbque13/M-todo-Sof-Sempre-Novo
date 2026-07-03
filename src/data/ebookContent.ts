export interface ModuleSection {
  id: string;
  title: string;
  subtitle?: string;
  objective: string;
  introduction: string;
  explanation: string; // Detalhado e rico em conteúdo profissional
  stepByStep: string[];
  expertTips: string[];
  commonErrors: string[];
  importantAlerts: string[];
  checklist: string[];
  summary: string;
  practicalExercise: string;
  visualSuggestions?: string;
}

export const bookIntro = {
  title: "MÉTODO SOFÁ SEMPRE NOVO®",
  subtitle: "Aprenda a higienizar seu próprio sofá da maneira correta, economizando centenas de reais e evitando erros que podem danificar permanentemente o tecido.",
  author: "Giro Clean - Tenho experiência prática em química têxtil, higienização de estofados e remoção de manchas.",
  copyright: "© 2026 Giro Clean. Todos os direitos reservados. Nenhuma parte deste livro pode ser reproduzida ou transmitida sem autorização expressa por escrito dos detentores dos direitos autorais.",
  disclaimer: "Aviso Legal: As informações contidas neste manual são baseadas na minha prática profissional. Tenho experiência prática em química têxtil, higienização de estofados e remoção de manchas. No entanto, devido à grande variedade de fibras e tratamentos aplicados nos tecidos pelos fabricantes, o autor não assume responsabilidades por danos causados pela má interpretação das instruções ou falhas na execução dos testes de segurança. Sempre execute o teste de toque e absorção antes de aplicar qualquer produto químico em toda a superfície.",
  welcome: {
    title: "Boas-vindas ao Método Sofá Sempre Novo®!",
    content: `Seja muito bem-vindo ao manual definitivo de conservação e higienização têxtil. Se você chegou até aqui, é porque se importa com o seu lar, preza pela saúde da sua família e deseja economizar de verdade, sem depender de visitas frequentes de empresas de limpeza ou de soluções milagrosas de internet que podem arruinar o seu estofado.

Nos próximos capítulos, vou te revelar o que fazemos diariamente para limpar, conservar e revitalizar sofás de todos os tipos. Tenho experiência prática em química têxtil, higienização de estofados e remoção de manchas. Você aprenderá a química simples por trás dos produtos, entenderá a alma de cada tecido e ganhará o superpoder de remover manchas críticas de forma cirúrgica.

Este não é um livro de dicas superficiais de internet. É um treinamento profissional simplificado, direto ao ponto e totalmente prático.`,
    whoIsItFor: [
      "Donos de sofá que querem manter a casa sempre cheirosa e impecável.",
      "Famílias com crianças que derrubam sucos, achocolatados e doces no estofado constantemente.",
      "Tutores de pets que enfrentam pelos, sujeiras de patinhas e acidentes com urina.",
      "Pessoas que desejam economizar centenas de reais todos os anos em serviços profissionais.",
      "Qualquer pessoa com receio de usar receitas caseiras milagrosas e danificar o tecido do sofá."
    ],
    howToUse: "Recomendo que você faça uma primeira leitura completa para entender a lógica química de limpeza. Em seguida, utilize este livro como um guia de consulta rápida: se derramou café, vá direto ao Módulo 5; se o cachorro fez xixi, consulte imediatamente o Módulo 7. Use nossas calculadoras e ferramentas interativas neste aplicativo para calcular diluições precisas e identificar tecidos em segundos!"
  }
};

export const modules: ModuleSection[] = [
  {
    id: "modulo-1",
    title: "MÓDULO 1: DESVENDANDO O TECIDO DO SEU SOFÁ (O CÓDIGO SECRETO)",
    subtitle: "Identificação, Reação à Água e Segurança Química",
    objective: "Aprender a decifrar a etiqueta, o toque e o teste de absorção do seu sofá para eliminar o risco de estragar o tecido com produtos incompatíveis.",
    introduction: "O maior erro cometido por proprietários de sofás é aplicar produtos químicos sem fazer a menor ideia de qual é a fibra do estofado. Aplicar um produto ácido em um tecido alcalino, ou esfregar com força um veludo natural como se fosse um sintético, pode rasgar, queimar ou descolorir o seu móvel para sempre. Vamos acabar com essa roleta russa a partir de hoje.",
    explanation: `### 1. Como Interpretar a Etiqueta de Conservação
A maioria dos sofás fabricados industrialmente possui uma etiqueta de conservação, geralmente localizada na parte inferior da estrutura ou sob as almofadas. Essa etiqueta contém uma letra que indica como o tecido deve ser limpo.

*   **P — Processo Normal**: Indica um tecido resistente. Permite higienização com água e produtos convencionais utilizados na limpeza de estofados. Ideal para: limpeza manual e processos profissionais.
*   **W — Wet Cleaning (Limpeza Úmida)**: Indica que o tecido suporta limpeza com água. Utilize detergentes neutros e produtos à base de água. É uma das classificações mais comuns encontradas nos sofás residenciais.
*   **S — Dry Cleaning (Limpeza a Seco)**: Representa tecidos delicados. A limpeza deve ser realizada apenas com solventes específicos para limpeza a seco. Nunca utilize água diretamente, pois podem ocorrer manchas, encolhimento e deformação das fibras. Muito comum em tecidos de linho natural e seda.
*   **F ou X**: Indica tecidos que exigem limpeza profissional especializada ou apenas aspiração. Evite aplicar água, detergentes, desengordurantes e qualquer produto químico doméstico.
*   **⚠ Atenção**: Ignorar essa recomendação pode causar danos permanentes ao tecido.

### 2. Identificando o Tecido pelo Toque e Pela Aparência
Nem todos os sofás ainda possuem a etiqueta original. Com o tempo ela pode ser removida, rasgada ou perdida. Nesses casos, é possível identificar o tecido utilizando apenas o toque e uma análise visual.

*   **Suede e Microsuede**: Características: toque semelhante à camurça, extremamente macio, muda levemente de tonalidade quando a mão é passada sobre a superfície. Normalmente é produzido em poliéster. Excelente para higienização residencial.
*   **Linho**: Características: textura mais rústica, tramas aparentes, aparência sofisticada. Pode ser Linho Natural ou Linho Sintético. O linho natural exige muito cuidado, pois absorve bastante água e pode apresentar manchas durante a secagem.
*   **Veludo**: Características: pelos curtos, toque extremamente macio, brilho elegante. Sempre realize a escovação respeitando o sentido natural das fibras. Escovar no sentido contrário pode deixar marcas permanentes.
*   **Chenille**: Características: superfície felpuda, relevo perceptível, aparência volumosa. É um tecido bastante absorvente e tende a acumular poeira entre suas fibras. Necessita de uma limpeza mais cuidadosa.
*   **Jacquard**: Características: tecido mais encorpado, desenhos em relevo, tramas fechadas. Normalmente é composto por uma mistura de algodão e poliéster. Apresenta excelente resistência quando higienizado corretamente.
*   **Couro Natural**: Você pode identificá-lo por: temperatura naturalmente fria ao toque, cheiro característico, rugas naturais, alta flexibilidade. Nunca encharque o couro. A limpeza deve ser realizada com produtos específicos e pouca umidade.
*   **Couro Sintético (Corino, Courvin ou PU)**: Características: toque plastificado, aquece rapidamente, aparência semelhante ao couro natural. É fácil de limpar. Entretanto, produtos como álcool, cloro ou solventes agressivos podem ressecar e provocar rachaduras.

### 3. O Teste das 3 Gotas (O Teste de Ouro do Higienizador)
Mesmo identificando o tecido, ainda existe um teste extremamente importante. Ele permite descobrir quanto aquele tecido absorve água. Esse procedimento evita grande parte dos erros cometidos durante uma higienização.

*   **Como fazer**: Escolha uma área escondida do sofá (exemplos: parte traseira, lateral inferior, parte interna do encosto). Pingue exatamente 3 gotas de água limpa. Aguarde alguns segundos. Observe o comportamento da água.
*   **Alta absorção**: Se as gotas desaparecerem in menos de 10 segundos, significa que o tecido possui alta capacidade de absorção. Geralmente ocorre em: algodão, linho natural, viscose e chenille.
*   **⚠ Atenção**: Evite excesso de água. A umidade pode alcançar a espuma e provocar mofo, odor desagradável, manchas marrons (auréolas) e demora na secagem.
*   **Baixa absorção**: Se as gotas permanecerem arredondadas por bastante tempo antes de serem absorvidas, o tecido possui baixa absorção. Isso acontece normalmente em: suede de poliéster, tecidos impermeabilizados e linho sintético. Esses tecidos costumam ser mais seguros para higienização manual.`,
    stepByStep: [
      "Localize a etiqueta na parte de baixo do sofá ou dentro das frestas das almofadas soltas.",
      "Faça o teste do toque para classificar visualmente o tecido (Suede, Linho, Chenille, Couro).",
      "Realize o Teste de Absorção pingando 3 gotas de água em uma área escondida do sofá.",
      "Anote o resultado: se absorver rápido, seu sofá exige um método de umidade controlada extrema (sem encharcar). Se demorar, é mais resistente.",
      "Selecione o produto de acordo com o nível de tolerância do tecido."
    ],
    expertTips: [
      "Nunca comece a limpeza apenas porque encontrou uma receita na internet. Os mesmos produtos que funcionam perfeitamente em um sofá podem causar danos irreversíveis em outro.",
      "Dedicar cinco minutos para identificar corretamente o tecido pode evitar prejuízos de centenas ou até milhares de reais."
    ],
    commonErrors: [
      "Usar escova de cerdas duras (tipo escova de lavar roupas de plástico) em veludo ou suede, o que destrói as fibras e gera o temido aspecto lixado.",
      "Molhar demais o chenille, fazendo a água contaminada penetrar na espuma profunda, trazendo mofo e mau cheiro semanas depois."
    ],
    importantAlerts: [
      "Tecidos com a letra S na etiqueta NUNCA devem receber água pura. Se aplicar água com sabão, eles vão manchar e encolher. Use apenas álcool isopropílico de alta pureza ou solvente seco de mercado.",
      "Misturas de cloro ou água sanitária destroem a pigmentação de tecidos sintéticos e naturais. Nunca use!"
    ],
    checklist: [
      "Identificou o tipo de tecido.",
      "Encontrou ou analisou a etiqueta de conservação.",
      "Fez o teste do toque.",
      "Realizou o Teste das 3 Gotas.",
      "Escolheu os produtos compatíveis com o tecido."
    ],
    summary: "Identificar o tecido é a vacina contra desastres. Tecidos sintéticos (suede, poliéster) são fáceis e amigáveis; tecidos naturais (algodão, linho) exigem pouquíssima água e produtos neutros com pH balanceado.",
    practicalExercise: "Vá até o seu sofá agora. Encontre a etiqueta ou faça o Teste das 3 gotas de água na lateral traseira. Use nossa ferramenta de Identificação de Tecidos ao lado para validar qual é a classificação exata do seu estofado.",
    visualSuggestions: "Infográfico mostrando as letras P, W, S, F e um desenho de uma gota de água flutuando em cima de um tecido de suede sintético vs absorvendo rapidamente no linho."
  },
  {
    id: "modulo-2",
    title: "MÓDULO 2: O ARSENAL BARATO DE LIMPEZA DE MERCADO",
    subtitle: "Química Doméstica Segura e Montagem do Kit Econômico",
    objective: "Substituir produtos profissionais caríssimos por soluções de mercado eficientes, entendendo a química básica de cada um.",
    introduction: "Você não precisa comprar produtos importados de centenas de reais para higienizar seu sofá. O segredo dos profissionais não está na marca do galão, mas sim em dominar o pH e a ação dos agentes químicos simples que você encontra na prateleira do supermercado por menos de R$ 30 no total.",
    explanation: `### 1. Entendendo o pH na Higienização Têxtil
A escala de pH é o conceito químico mais importante que existe na higienização de tecidos. Ela determina se um produto químico é seguro para as fibras ou se causará desbotamento, desgaste químico ou ressecamento das superfícies.

*   **pH Ácido (abaixo de 7)**: Excelente para amaciar as fibras têxteis, fixar pigmentos e neutralizar resíduos químicos ou odores básicos (como a amônia do xixi de pets). O vinagre de álcool branco possui pH em torno de 2.5.
*   **pH Neutro (igual a 7)**: É totalmente seguro para qualquer tipo de fibra ou cor de tecido. Remove sujeiras cotidianas de forma suave sem agredir as superfícies. O detergente neutro incolor de louça possui pH estabilizado em 7.0.
*   **pH Alcalino (acima de 7)**: Age abrindo as fibras para facilitar a remoção de gordura corporal profunda, graxas, poeira sedimentada e óleos acumulados. O bicarbonato de sódio seco possui pH suave em torno de 8.5.

### 2. O Arsenal do Supermercado (Fórmulas Econômicas)
Não gaste fortunas com produtos de grife. O segredo está na ação dos componentes ativos simples e de baixíssimo custo que você compra no supermercado de bairro:

*   **Detergente Neutro de Louça**: É o maior e melhor tensoativo doméstico que existe. Sua principal função é quebrar a tensão superficial da água e encapsular as partículas de gordura e poeira. Use sempre a versão incolor (clear).
*   **Vinagre de Álcool Branco**: Rica fonte natural de ácido acético. Atua desinfetando as fibras, matando bactérias causadoras do mau cheiro, eliminando fungos de mofo e agindo como um amaciante de fibras têxteis de alta performance.
*   **Bicarbonato de Sódio**: Atua por flotação física e neutralização ácida. Suas partículas reagem com a sujeira ácida (como suor e gordura corporal), suspendendo as partículas para a superfície do tecido, além de sugar e neutralizar odores fortes.
*   **Peróxido de Hidrogênio 10 Volumes (Água Oxigenada Líquida)**: Um alvejante seguro para tecidos claros. Ao contato com sujeira orgânica, libera oxigênio ativo que quebra e extrai sangue, urina e corantes naturais, atuando de forma bactericida.

### 3. Ferramentas Indispensáveis do Kit Profissional Caseiro
Uma higienização de sucesso requer o uso correto das ferramentas mecânicas para maximizar os resultados químicos sem agredir o estofado:

*   **Escova de Cerdas Macias**: Utilize apenas escovas de sapateiro de crina natural ou escovas de cabelo infantil. Evite a todo custo escovas plásticas de lavar roupas, que arranham e rasgam o tecido.
*   **Panos de Microfibra Brancos**: Possuem ranhuras microscópicas ideais para sugar a sujeira por capilaridade. Devem ser brancos para eliminar o risco de migração de corante e manchas do pano para o sofá.
*   **Pulverizador Manual**: Essencial para aplicar as misturas sob a forma de névoa uniforme, garantindo o controle total sobre a umidade e evitando o encharcamento da espuma.`,
    stepByStep: [
      "Adquira 1 detergente neutro transparente (versão incolor para eliminar risco de corantes).",
      "Compre vinagre de álcool 100% branco de supermercado (vinagres coloridos mancham!).",
      "Adquira bicarbonato de sódio em pó puro de boa qualidade.",
      "Garanta panos de microfibra de cores claras ou preferencialmente brancos.",
      "Selecione uma escova de cerdas macias testando a flexibilidade diretamente na palma da mão."
    ],
    expertTips: [
      "Sempre use detergente neutro transparente (clear). Evite detergentes amarelos, vermelhos ou verdes, pois o corante químico pode se fixar na fibra do sofá durante a secagem.",
      "Para substituir o vinagre caso você deteste o cheiro (que some após secar), você pode usar ácido cítrico diluído em água (1 colher de sopa para 500ml de água)."
    ],
    commonErrors: [
      "Usar sabão em pó de roupas de alta alcalinidade, o que endurece as fibras e atrai poeira após a secagem.",
      "Utilizar panos coloridos de baixa qualidade que desbotam e transferem pigmentação para o assento do sofá."
    ],
    importantAlerts: [
      "Nunca misture bicarbonato de sódio diretamente com vinagre em um borrifador fechado. A reação química libera gás carbônico imediato, o que anula as propriedades de ambos e pode romper o frasco.",
      "Evite o uso de amaciantes comuns que criam películas gordurosas impermeáveis propensas a reter poeira e mofo."
    ],
    checklist: [
      "Entendeu a escala de pH dos tecidos.",
      "Adquiriu o detergente neutro transparente.",
      "Adquiriu o vinagre de álcool branco puro.",
      "Separou o bicarbonato de sódio seco.",
      "Garantiu os panos de microfibra brancos.",
      "Testou e aprovou a maciez das cerdas da escova."
    ],
    summary: "O kit de mercado profissional é focado em química simples e barata: detergente neutro (tensoativo), bicarbonato (alcalino), vinagre (ácido e desinfetante) e panos de microfibra brancos que sujam em vez de manchar.",
    practicalExercise: "Abra a sua despensa doméstica de limpeza e separe os ingredientes que possui. Use nossa calculadora de diluição ao lado para criar as proporções perfeitas do seu kit econômico.",
    visualSuggestions: "Tabela comparativa mostrando o pH dos produtos de limpeza domésticos (vinagre pH 2.5 ácido, água pH 7 neutro, bicarbonato pH 8.5 alcalino)."
  },
  {
    id: "modulo-3",
    title: "MÓDULO 3: PASSO A PASSO DA HIGIENIZAÇÃO MANUAL (SEM EXTRATORA)",
    subtitle: "Técnica Profissional de Absorção e Escovação",
    objective: "Aprender a higienizar completamente o sofá utilizando apenas escova, borrifador e panos de microfibra, obtendo o mesmo resultado de uma máquina extratora profissional.",
    introduction: "Quem disse que você precisa de uma extratora de R$ 2.000 para limpar um sofá? O segredo das empresas de limpeza está na técnica física de extração por absorção. Se você souber como esfregar e como sugar a sujeira usando a física dos panos de microfibra, seu sofá ficará limpo, seco e revitalizado sem gastar fortunas.",
    explanation: `### 1. A Tríade de Ouro do Higienizador
A higienização têxtil profissional baseia-se em leis da física e química integradas, compostas por três fases fundamentais:
*   **Flotação**: Trazer a sujeira e poeira presas no fundo das tramas têxteis de volta para a superfície por meio do agente tensoativo.
*   **Fricção**: Desprender as partículas de sujeira utilizando movimentos mecânicos circulares suaves com uma escova de cerdas macias.
*   **Extração**: Transferir a sujeira úmida em suspensão para um elemento absorvente (pano de microfibra seco) por pressão mecânica e capilaridade.

### 2. A Fórmula Limpa-Tudo Giro Clean
Prepare no seu borrifador de 500ml a mistura profissional balanceada para higienizar superfícies têxteis encardidas:
*   **350ml de Água Morna**: A temperatura morna (40°C a 45°C) derrete gorduras corporais rapidamente e maximiza a ação do detergente.
*   **1 Colher de Sopa de Detergente Neutro**: O tensoativo básico para quebrar e suspender sujidades leves e pesadas.
*   **100ml de Álcool Líquido 70%**: Ajuda na evaporação e dissolução química, acelerando consideravelmente o tempo de secagem.
*   **1 Colher de Sopa de Vinagre de Álcool Branco**: Desinfeta as superfícies e equilibra o pH para evitar que as fibras fiquem rígidas ou ásperas.

### 3. A Técnica dos Quadrantes de Limpeza e Extração por Pressão
Evite o erro amador de borrifar o sofá por completo de uma só vez. Siga a risca o protocolo dos quadrantes:
*   **Divisão Física**: Divida os assentos e encostos em pequenos quadrantes de 50x50cm. Limpe, escove e extraia um de cada vez antes que a mistura seque e fixe a sujeira novamente nas fibras.
*   **Escovação Uniforme**: Realize movimentos de escovação circulares suaves, no final, alinhe todas as cerdas em um único sentido para garantir um aspecto visual elegante e uniforme.
*   **Extração Mecânica por Pano Seco**: Dobre o pano de microfibra branco seco em quatro partes. Pressione firmemente contra o quadrante limpo e esfregue em movimentos firmes. A sujeira marrom migrará instantaneamente para as ranhuras do pano seco.
*   **Ventilação do Ambiente**: Sempre seque o sofá à sombra em local ventilado (de preferência com ventilador apontado). Nunca exponha ao sol direto, sob risco de queimar e desbotar o estofado por raios ultravioleta.`,
    stepByStep: [
      "**PASSO 1: Aspiração Profunda**: Aspire minuciosamente frestas e superfícies por pelo menos 15 minutos para remover 80% do pó seco antes de molhar.",
      "**PASSO 2: Pulverização Controlada**: Aplique a Fórmula Limpa-Tudo sob a forma de névoa homogênea sobre um quadrante de 50x50cm de cada vez.",
      "**PASSO 3: Escovação Suave**: Use a escova de crina em movimentos circulares sem aplicar força excessiva.",
      "**PASSO 4: Extração por Capilaridade**: Pressione o pano de microfibra seco contra a área úmida e esfregue com firmeza para transferir a sujeira.",
      "**PASSO 5: Enxágue e Alinhamento**: Borrife névoa fina de vinagre de álcool branco com água e passe um pano levemente úmido para remover resíduos de detergente."
    ],
    expertTips: [
      "Divida o seu sofá em partes pequenas (quadrantes) de 50x50cm. Se você borrifar o sofá inteiro de uma vez, o produto vai secar antes que você consiga extrair a sujeira, fixando-a novamente nas fibras.",
      "Use água morna (em torno de 40°C a 45°C) para preparar a mistura. A temperatura amolece as gorduras corporais depositadas nos braços e encostos do sofá com muita facilidade."
    ],
    commonErrors: [
      "Jogar baldes de água no estofado, o que oxida as molas e madeiras e apodrece a espuma interna do chassi do sofá.",
      "Deixar secar sob sol quente, o que encolhe fibras naturais e queima o acabamento dos fios têxteis."
    ],
    importantAlerts: [
      "Nunca utilize o estofado enquanto ele estiver úmido. Sentar no sofá úmido transfere gordura da roupa e deforma a espuma profunda.",
      "Cerdas de plástico duras lixam as fibras do suede e veludo, gerando bolinhas ou desgaste irreparável ao tecido."
    ],
    checklist: [
      "Fez a aspiração mecânica profunda de poeira seca.",
      "Preparou a Fórmula Limpa-Tudo com água morna.",
      "Trabalhou dividindo o estofado em quadrantes pequenos.",
      "Aplicou escovação circular ultra-suave.",
      "Fez a extração mecânica pressionando panos de microfibra secos.",
      "Alinhou o sentido das fibras antes do processo de secagem."
    ],
    summary: "A higienização manual é extremamente simples e eficiente se executada sob a lógica de Flotar, Friccionar e Extrair a sujeira pressionando panos de microfibra limpos e secos, finalizando com secagem ventilada à sombra.",
    practicalExercise: "Limpe apenas um dos braços do seu sofá (área de maior acúmulo de gordura de braços) utilizando o método prático dos quadrantes e compare a diferença brutal com o outro braço.",
    visualSuggestions: "Fluxograma passo a passo ilustrado: Aspirador de Pó -> Borrifador (névoa) -> Escova Macia (movimento circular) -> Pano de Microfibra (pressão constante)."
  },
  {
    id: "modulo-4",
    title: "MÓDULO 4: NEUTRALIZAÇÃO QUÍMICA DE ODORES (SEM MÁSCARAS)",
    subtitle: "Eliminação Científica de Suor, Mofo e Umidade",
    objective: "Aprender a eliminar a causa real do mau cheiro agindo diretamente nas bactérias e fungos, sem usar perfumes que apenas mascaram o odor temporariamente.",
    introduction: "Muitas pessoas tentam resolver o mau cheiro do sofá borrifando desinfetantes perfumados de mercado ou desodorizadores de tecidos comuns. Isso é um erro grave! O perfume mistura-se com o odor original de suor ou gordura e gera um cheiro ainda pior após algumas horas. Para acabar com o cheiro, precisamos de neutralização química.",
    explanation: `### 1. A Origem dos Odores Profundos
Borrife perfumes ou desinfetantes aromáticos comerciais sobre um sofá com mau cheiro é um dos maiores erros de manutenção. O perfume se mistura com as gorduras oxidadas, bactérias e suor, gerando um odor ainda pior após a secagem.

*   **Bactérias e Fungos (Mofo)**: Os odores são compostos químicos gasosos gerados pela proliferação de microorganismos que se alimentam de resíduos orgânicos depositados na espuma e nas fibras do sofá.
*   **Neutralização Física**: Para acabar com os cheiros de uma vez por todas, devemos desintegrar o habitat químico das bactérias ajustando o pH local por meio de ácidos e bases suaves.

### 2. A Química da Neutralização de Odores
Siga as regras de acidez e alcalinidade para quebrar as moléculas que causam o mau cheiro de forma científica:

*   **Odores Alcalinos (Xixi antigo, mofo e umidade)**: Devem ser neutralizados com agentes ácidos suaves como o vinagre de álcool branco (rico em ácido acético). Ele quebra os sais minerais e as aminas do odor na raiz.
*   **Odores Ácidos (Suor corporal, gordura saturada, vômito)**: Devem ser combatidos com agentes alcalinos suaves como o bicarbonato de sódio seco, que transforma gorduras e ácidos graxos em compostos sem cheiro.

### 3. Executando a Desinfecção Seca Localizada
Para pontos de mau cheiro específico (suor nos assentos ou mofo), use a efervescência química localizada e a barreira de extração seca:

*   **Névoa Neutralizadora**: Borrife uma solução homogênea de partes iguais de vinagre de álcool branco, álcool 70% e água morna sobre a área afetada.
*   **Polvilhamento Seco**: Com o tecido úmido, polvilhe uma camada generosa de bicarbonato de sódio seco sobre a mancha. A reação efervescente atuará flotando a umidade e a sujeira profunda.
*   **Cura e Aspiração**: Aguarde de 30 a 45 minutos até o pó secar por completo. Aspire o resíduo do pó branco de bicarbonato com bocal fino: a sujeira e o odor sairão integrados ao pó.`,
    stepByStep: [
      "Aspire profundamente superfícies e cantos para remover ácaros vivos e pele morta.",
      "Misture a solução neutralizadora ácida com vinagre, álcool e água morna.",
      "Borrife uma névoa homogênea e leve sobre os encostos e áreas críticas de maior contato.",
      "Para focos pontuais, polvilhe bicarbonato de sódio sobre a névoa aplicada.",
      "Respeite o tempo de 30 minutos de reação química até o pó secar completamente.",
      "Aspire todo o resíduo de pó com bocal de sucção média/alta do seu aspirador de pó."
    ],
    expertTips: [
      "O vinagre de álcool branco é um desinfetante fantástico, mas seu cheiro de salada assusta no início. Não se preocupe! O ácido acético é altamente volátil e seu cheiro desaparece 100% à medida que o estofado seca.",
      "Se o cheiro de mofo persistir, a causa pode ser a umidade na espuma interna. Coloque o sofá em um cômodo fechado com um desumidificador elétrico ou vários potes de 'evita mofo' de mercado ao lado por 48 horas."
    ],
    commonErrors: [
      "Utilizar amaciantes concentrados na espuma, o que entope os poros e atrai microorganismos causadores de fungos profundos.",
      "Esquecer de aspirar o bicarbonato seco. Se você deixar o pó no estofado, ele vai absorver a umidade do ar e criar crostas brancas duras."
    ],
    importantAlerts: [
      "Nunca realize processos de neutralização de odores em dias de chuva torrencial ou com umidade do ar superior a 85%, para evitar atrasar demasiadamente a secagem interna.",
      "Dê preferência para óleos essenciais puros; essências artificiais baratas contêm bases oleosas de baixa qualidade que mancham tecidos finos."
    ],
    checklist: [
      "Efetuou a aspiração higiênica inicial de pele e ácaros.",
      "Preparou a solução de neutralização de odores na proporção correta.",
      "Aplicou a névoa homogênea focando em áreas de maior suor.",
      "Deixou o bicarbonato seco reagir sobre as áreas críticas por 30 minutos.",
      "Removeu todo o pó residual de bicarbonato com bocal fino do aspirador."
    ],
    summary: "Os odores persistentes são eliminados alterando as características físicas do meio. Uma névoa ácida de vinagre seguida de polvilhamento básico de bicarbonato age quebrando compostos bacterianos e desinfetantes do estofado.",
    practicalExercise: "Borrife a solução de vinagre e álcool com algumas gotas de óleo essencial de lavanda nas almofadas do encosto. Sinta a evaporação e a total refrescância do sofá após a secagem.",
    visualSuggestions: "Gráfico de 'Antes e Depois' mostrando bactérias se multiplicando na fibra do sofá com suor corporal vs sendo desintegradas pela névoa ácida do vinagre com álcool."
  },
  {
    id: "modulo-5",
    title: "MÓDULO 5: PROTOCOLO ESPECIAL ANTIÓLEO E MANCHAS CRÍTICAS",
    subtitle: "Ação Imediata e Remoção Cirúrgica de 10 Tipos de Manchas",
    objective: "Dominar o protocolo químico de remoção de manchas extremamente difíceis (vinho, café, caneta, sangue) sem espalhar a sujeira ou desgastar a fibra do estofado.",
    introduction: "Derrubar algo no sofá gera pânico imediato. A primeira reação da maioria das pessoas é pegar um pano úmido e esfregar com força. Pare imediatamente! Esfregar uma mancha fresca faz o pigmento penetrar ainda mais fundo na trama do tecido, transformando um acidente simples em um dano permanente. Hoje você aprenderá a agir como um verdadeiro perito perito têxtil.",
    explanation: `### 1. Duas Leis Absolutas na Remoção de Manchas
A remoção de manchas requer frieza e lógica química. Agir de forma impulsiva pode transformar manchas superficiais em pigmentações permanentes. Siga estas leis físicas:
*   **Lei da Capilaridade (De fora para dentro)**: Ao escovar ou pressionar o tecido, trabalhe sempre fazendo movimentos circulares concêntricos (das bordas em direção ao centro da mancha). Se esfregar de dentro para fora, você expandirá a sujeira e criará as famosas marcas circulares de contaminação (auréolas).
*   **Lei da Afinidade Química (Semelhante dissolve semelhante)**: Identifique a base do acidente. Manchas oleosas exigem solventes ou pós absorventes. Manchas aquosas ou orgânicas de corantes exigem agentes tensoativos e oxidantes.

### 2. Protocolos de Resgate para Manchas Críticas
Siga estes procedimentos passo a passo conforme a substância derramada:
*   **Vinho Tinto / Sucos de Uva**: Absorva o excesso de líquido na hora com papel toalha (sem esfregar). Polvilhe sal fino ou bicarbonato seco para sugar o líquido restante por capilaridade. Aplique algumas gotas de água oxigenada 10 volumes com detergente neutro e retire pressionando um pano seco de microfibra.
*   **Café e Chá Escuro**: O café possui tanino (forte corante vegetal natural). Aplique imediatamente uma mistura de vinagre de álcool branco e álcool 70% em partes iguais. Friccione com cotonete de fora para dentro e extraia com pano de microfibra seco.
*   **Tinta de Caneta Esferográfica**: Tinta de caneta possui base solvente e resina. Aplique algumas gotas de álcool isopropílico de alta pureza ou leite morno na ponta de um cotonete e pressione diretamente sobre os traços de tinta. O leite morno quebra os aglutinantes do corante. Remova pressionando um pano seco imediatamente. Nunca esfregue!
*   **Sangue Fresco**: Sangue contém proteínas ricas em ferro que cozinham e fixam sob calor. NUNCA use água morna ou quente. Aplique água oxigenada 10 volumes líquida fria pura diretamente sobre a mancha. A efervescência do oxigênio desintegrará a hemoglobina. Remova pressionando um pano limpo.
*   **Gorduras, Molhos e Maionese**: Polvilhe amido de milho (Maizena) ou talco sobre a gordura corporal ou molho oleoso. Aguarde agir por 4 horas para que o pó sugue toda a gordura da fibra. Aspire o pó seco e limpe o resíduo leve com detergente neutro transparente.

### 3. A Técnica Anti-Auréolas
Após limpar localmente uma mancha específica, a área tratada secará de forma mais limpa que o restante do estofado, gerando marcas divisórias visíveis.
*   **Como Evitar**: Logo após remover a mancha com sucesso, borrife uma névoa levíssima de água filtrada com vinagre em todo o quadrante do assento ou almofada. Isso uniformiza os tempos e condições de secagem, impedindo a formação de auréolas.`,
    stepByStep: [
      "**PASSO 1: Absorção Seca Imediata**: Pressione folhas de papel toalha sobre o líquido derramado para sugar o máximo sem espalhar.",
      "**PASSO 2: Diagnóstico Químico**: Determine a natureza da mancha (aquosa, oleosa ou orgânica).",
      "**PASSO 3: Aplicação Cirúrgica**: Aplique a solução química correspondente de forma localizada com um cotonete ou aplicador fino.",
      "**PASSO 4: Movimento Das Bordas Ao Centro**: Friccione o local com escova macia fazendo movimentos circulares concêntricos.",
      "**PASSO 5: Extração e Uniformização**: Pressione o pano de microfibra seco e borrife névoa fina em todo o quadrante para secagem homogênea."
    ],
    expertTips: [
      "Para evitar a temida 'auréola' (mancha circular que fica ao redor da área limpa após secar), umedeça levemente todo o assento ou quadrante onde a mancha estava após removê-la. Isso uniformiza a secagem do tecido.",
      "Se a mancha for antiga e seca, aplique uma névoa de água morna para amolecer a fibra antes de iniciar o protocolo químico específico."
    ],
    commonErrors: [
      "Esfregar a mancha com força usando panos coloridos ou escovas duras. Isso rompe os fios (causando desgaste visual) e espalha o pigmento de forma irreversível.",
      "Usar água quente em manchas de sangue, o que fixa a mancha de forma permanente na fibra do estofado."
    ],
    importantAlerts: [
      "Sempre faça o teste de compatibilidade da água oxigenada ou do álcool isopropílico em uma parte escondida antes de aplicar no centro do assento, pois alguns tecidos de baixíssima qualidade podem desbotar.",
      "Manchas de caneta hidrográfica (marcador permanente) podem não sair 100% dependendo do tipo de fibra (como linhos e algodão puro), necessitando de solvente profissional."
    ],
    checklist: [
      "Excesso sólido ou líquido removido sem esfregar.",
      "Protocolo químico correto selecionado.",
      "Teste de desbotamento feito em área oculta.",
      "Movimento concêntrico de limpeza executado.",
      "Extração e secagem uniforme garantidas."
    ],
    summary: "Manchas devem ser tratadas de forma cirúrgica: absorva imediatamente sem esfregar, use afinidade química (gordura com amido, sangue com água oxigenada fria, caneta com álcool) e limpe sempre de fora para dentro.",
    practicalExercise: "Use nossa ferramenta interativa de Solucionador de Manchas ao lado para simular o tratamento de um acidente comum na sua casa (como derrubar café ou caneta). Memorize os passos para agir rápido no próximo acidente real!",
    visualSuggestions: "Tabela ilustrada de manchas e soluções recomendadas com ícones de cada mancha (vinho, café, caneta, sangue, gordura) e o agente químico ideal."
  },
  {
    id: "modulo-6",
    title: "MÓDULO 6: O SEGREDO PRO DO SOFÁ LIMPO 5X MAIS TEMPO",
    subtitle: "Manutenção Preventiva e Rotina Inteligente para o Lar",
    objective: "Criar um cronograma simples e eficiente de cuidados periódicos para evitar o acúmulo de sujeira profunda, economizando tempo e esforço a longo prazo.",
    introduction: "O verdadeiro higienizador profissional não é aquele que sabe limpar a sujeira mais pesada do mundo, mas sim quem sabe como evitar que essa sujeira chegue a se fixar no tecido. Hoje vou te revelar a rotina de manutenção preventiva que mantém o sofá como se estivesse acabado de sair da loja por anos seguidos.",
    explanation: `### 1. O Inimigo Silencioso: A Poeira Sedimentada
Embora você não consiga enxergar a olho nu, milhares de partículas de poeira fina flutuam no ar e caem no estofado todos os dias. O perigo ocorre quando nos sentamos no sofá:
*   **O Efeito Lixa**: O peso de nosso corpo compacta e empurra a poeira microscópica para as tramas das fibras. Essas partículas agem como micro-lixas minúsculas que, sob atrito, cortam e rompem os fios têxteis aos poucos, gerando o aspecto desgastado e fosco característico de móveis velhos.
*   **A Vacina Semanal**: A aspiração profunda semanal com bocal de escova de escova macia é essencial para prolongar a vida útil do estofado por mais de 10 anos.

### 2. A Fórmula Caseira do Escudo Pro
Crie um escudo antiestático e bactericida quinzenal para amaciar as fibras e repelir poeira acumulada. Misture em seu pulverizador de 500ml:
*   **300ml de Água Filtrada**: Elemento puro de diluição.
*   **150ml de Álcool Líquido 70%**: Agente antisséptico de evaporação rápida.
*   **1 Colher de Sopa de Amaciante Concentrado de Alta Qualidade**: Oferece repelência de estática, impedindo que os pelos e o pó grudem no tecido, além de perfume suave.
*   **1 Colher de Sopa de Vinagre de Álcool Branco**: Agente bactericida e acaricida natural protetor.

### 3. A Rotina Eficiente de 15 Minutos (O Calendário Inteligente)
Organize as tarefas de manutenção de forma rápida e dividida para economizar tempo sem perder a performance estética do lar:
*   **Semanalmente (5 Minutos)**: Aspire frestas, almofadas e costuras profundas para eliminar a poeira sedimentada por completo.
*   **Quinzenalmente (5 Minutos)**: Aplique uma névoa ultraleve e sutil do Escudo Pro Giro Clean em toda a superfície do assento e braços.
*   **Mensalmente (10 Minutos)**: Passe um pano de microfibra branco úmido em solução morna de detergente neutro transparente (3 gotas) apenas nos braços e encostos para remover a gordura corporal de contato.
*   **Anualmente (1 Hora)**: Execute a higienização profunda manual do Módulo 3 para resetar o estofado de ácaros profundos.`,
    stepByStep: [
      "Integre a aspiração do sofá à sua rotina de limpeza do lar aos finais de semana.",
      "Prepare a Fórmula do Escudo Pro respeitando as medidas exatas de diluição.",
      "Pulverize a solução em formato de névoa a 30cm de distância do estofado.",
      "Passe uma escova ultra-suave apenas para alinhar as fibras no sentido natural.",
      "A cada mês, execute o arraste morno de gordura nos braços e encostos de contato."
    ],
    expertTips: [
      "Nunca use espanador de pó no sofá. Ele apenas levanta a poeira para o ar, que volta a cair no estofado minutos depois. Use sempre o aspirador ou pano de microfibra úmido.",
      "Se você tem pets que sobem no sofá, tenha em mãos um rodo de pia pequeno de borracha. Passe o rodo seco sobre o tecido: a eletricidade estática da borracha vai juntar todos os pelos em tufos fáceis de coletar em segundos."
    ],
    commonErrors: [
      "Usar capas de sofá impermeáveis de plástico sem ventilação. O plástico abafa o tecido e acumula umidade por baixo, gerando mofo severo na madeira e na espuma do sofá.",
      "Colocar almofadas úmidas ou sentar com roupas úmidas de piscina/academia no estofado, o que acelera a sedimentação de sujeira."
    ],
    importantAlerts: [
      "Se notar que o tecido do sofá está muito exposto ao sol direto vindo de uma janela, instale uma cortina ou película de proteção solar. O sol queima e enfraquece as fibras sintéticas em menos de 1 ano.",
      "Cuidado com produtos de 'impermeabilização' caseiros inflamáveis de aerosol de mercado. Eles podem ser perigosos se aplicados em ambientes fechados com fontes de faísca (fogão, tomadas)."
    ],
    checklist: [
      "Aspira profundamente todas as frestas e superfícies semanalmente.",
      "Aplica o Escudo Pro para toque macio e repelência de poeira quinzenalmente.",
      "Executa a remoção mensal de gorduras corporais leves nos apoios de braços.",
      "Garante a proteção do estofado contra raios solares ultravioletas diretos."
    ],
    summary: "Manter o sofá limpo exige apenas aspiração semanal para evitar o efeito lixa da poeira, aplicação quinzenal da Fórmula Escudo Pro e limpeza leve de braços mensalmente para remover gordura corporal.",
    practicalExercise: "Monte seu Calendário Anual de Manutenção utilizando a ferramenta interativa ao lado. Defina os dias da semana em que fará a aspiração rápida e o dia do mês para a limpeza de gordura corporal.",
    visualSuggestions: "Calendário ou infográfico interativo com as tarefas semanais, quinzenais, mensais e anuais organizadas em colunas limpas e coloridas."
  },
  {
    id: "modulo-7",
    title: "MÓDULO 7: MANUAL DE SOBREVIVÊNCIA DE XIXI DE PETS",
    subtitle: "Ação nos Primeiros Minutos e Salvamento da Espuma",
    objective: "Neutralizar quimicamente a urina de cães e gatos de forma imediata, impedindo que o ácido úrico penetre na espuma, destrua a madeira e fixe o mau cheiro para sempre.",
    introduction: "Quem tem pet em casa sabe que acidentes acontecem. O xixi de cachorro ou gato no sofá é um dos maiores pesadelos: se limpo de forma incorreta, o odor penetra na espuma profunda e se torna um marcador territorial, fazendo o pet urinar sempre no mesmo local. Hoje você aprenderá o protocolo de emergência definitivo para salvar seu estofado.",
    explanation: `### 1. A Lógica Destrutiva do Ácido Úrico
A urina pet é composta por ureia, pigmentos biológicos e ácido úrico. O maior perigo oculto reside no ácido úrico: ele é totalmente insolúvel em água pura e quando seca, solidifica-se em cristais de sal microscopicamente incrustados nas fibras:
*   **O Efeito Termo-Ativo**: Se você usar apenas pano úmido ou essências aromatizantes, o cheiro parecerá sumir no dia. Porém, nas semanas seguintes, sempre que o tempo ficar úmido, o odor retornará forte, pois a umidade reativa as aminas ácidas do xixi.
*   **O Perigo da Amônia**: Nunca utilize desinfetantes que contenham Amônia. A urina já contém amônia; ao limpar com ela, o cérebro do animal identificará o ponto como marcador de território e ele urinará novamente no local por puro instinto de proteção.

### 2. O Protocolo de Emergência de Cura Efervescente (5 Minutos)
Aja rápido enquanto a urina ainda está concentrada no tecido superior, impedindo que desça para a espuma de poliuretano e para a estrutura interna de madeira:

*   **Absorção Total por Pressão**: Pressione folhas de papel toalha ou panos secos de microfibra contra a poça de xixi usando o peso do seu corpo. Troque os panos até que saiam totalmente secos. Nunca esfregue, o que faria o xixi espalhar horizontalmente pelas fibras.
*   **Fórmula Oxigenante Ativa**: Misture 100ml de Água Oxigenada 10 volumes líquida (farmácia), 100ml de água morna e 1 colher de sopa de detergente neutro transparente. Borrife de forma nítida e abundante sobre a mancha. O oxigênio ativo quebrará as enzimas ácidas da urina na raiz.
*   **Polvilhamento de Bicarbonato**: Com o local abundante em névoa oxigenada, polvilhe uma boa camada de bicarbonato de sódio em pó seco sobre a umidade. Haverá uma reação efervescente intensa que flotará os resíduos de xixi profundos, fixando-os no pó.
*   **Cura Seca e Sucção**: Permita que a efervescência aja e seque naturalmente por 2 a 3 horas até formar uma crosta seca e rígida de bicarbonato. Aspire todo o pó branco com o bocal fino do aspirador. O cheiro sairá integrado ao pó seco.

### 3. Detecção com Luz Negra (UV)
Muitas vezes o xixi secou, você sente o mau cheiro vindo de alguma área do sofá, mas não consegue encontrar o ponto exato da mancha visualmente:
*   **Como Resolver**: Apague as luzes do cômodo e use uma pequena lanterna de luz negra (UV) a poucos centímetros do sofá. A urina pet brilha sob raios UV, revelando exatamente o ponto exato onde você deve concentrar a aplicação da cura efervescente de oxigênio.`,
    stepByStep: [
      "**PASSO 1: Pressão Absorvente**: Absorva a urina fresca comprimindo papel toalha contra o tecido com o peso do corpo até secar.",
      "**PASSO 2: Preparação de Oxigênio**: Misture Água Oxigenada 10 volumes líquida com água morna e detergente transparente.",
      "**PASSO 3: Pulverização Localizada**: Borrife a solução ativamente sobre o local do xixi para desintegrar o ácido úrico.",
      "**PASSO 4: Polvilhamento de Bicarbonato**: Cubra a umidade com bicarbonato de sódio seco para iniciar a efervescência extratora.",
      "**PASSO 5: Aspiração e Restauração**: Após secar (2 a 3 horas), aspire a crosta de pó e aplique névoa leve de vinagre de álcool."
    ],
    expertTips: [
      "Se o xixi for de gato (que possui urina muito mais concentrada e ácida devido à amônia), repita o processo de peróxido e bicarbonato duas vezes consecutivas para garantir a quebra total dos cristais de amônia.",
      "Para descobrir o local exato do xixi antigo que está cheirando mas você não vê visualmente, use uma lanterna de luz negra (UV) no escuro. A urina brilha sob luz UV, permitindo que você aja diretamente no foco do problema."
    ],
    commonErrors: [
      "Utilizar limpa-vidros ou compostos químicos à base de amônia, estimulando instintos de territorialismo no cão ou gato.",
      "Deixar o xixi secar sem tratamento por dias, causando oxidação severa de madeiras e corrosão de molas internas do estofado."
    ],
    importantAlerts: [
      "Use apenas Água Oxigenada 10 Volumes Líquida medicinal de farmácia. Águas oxigenadas cremosas de salão de beleza possuem alto teor de acidez corrosiva que deforma fibras.",
      "Em sofás de couro natural, nunca aplique água oxigenada ou bicarbonato em pó; limpe imediatamente com pano macio seco e passe hidratante."
    ],
    checklist: [
      "Absorveu completamente o excesso de líquido por pressão de papel toalha.",
      "Borrife a mistura oxigenante com água oxigenada 10 volumes líquida pura.",
      "Polvilhou o bicarbonato seco para iniciar a efervescência de flotação reversa.",
      "Respeitou o tempo de cura de 2 a 3 horas até o pó secar por completo.",
      "Aspiro todos os cristais secos de bicarbonato sem deixar resíduos em pó.",
      "Finalizou aplicando névoa fina de vinagre de álcool branco puro."
    ],
    summary: "Xixi de pet exige absorção por pressão imediata (sem esfregar), seguido de aplicação de água oxigenada líquida (quebra o ácido úrico) e bicarbonato de sódio em pó (puxa a umidade por efervescência), finalizando com aspiração profunda.",
    practicalExercise: "Mantenha um pote de bicarbonato e vinagre guardados em local estratégico se tiver filhotes em treinamento sanitário em casa. O tempo de resposta imediato é o que salvará o estofado.",
    visualSuggestions: "Fluxograma de emergência de 5 minutos: 1. Pressionar papel seco -> 2. Borrifar mistura de água oxigenada/detergente -> 3. Cobrir com bicarbonato em pó -> 4. Esperar secar -> 5. Aspirar."
  },
  {
    id: "modulo-8",
    title: "MÓDULO 8: COMUNIDADE VIP DO WHATSAPP (GRUPO DE INTERAÇÃO)",
    subtitle: "A Força do Aprendizado Coletivo",
    objective: "Promover a interação e troca de experiências valiosas entre os participantes do Método, estimulando a comunicação, compartilhamento de dicas de produtos e soluções práticas para o cuidado com estofados.",
    introduction: "Parabéns por chegar até aqui! Você já dominou todas as técnicas do método. Agora é hora de se conectar com outros participantes. Nossa Comunidade VIP no WhatsApp é um grupo aberto focado na troca mútua de experiências, dicas e resultados práticos do dia a dia.",
    explanation: `### 1. Comunidade VIP: Grupo de Interação e Aprendizado Coletivo
A força do método está na nossa comunidade! Ao contrário de canais estritamente formais ou de via única, nosso grupo do WhatsApp é um espaço aberto para que todos os participantes interajam livremente, troquem dicas valiosas e compartilhem suas evoluções reais.

*   **Grupo Aberto e Colaborativo**: Aqui todos os alunos têm voz! Você poderá compartilhar fotos dos seus 'antes e depois', trocar dicas de produtos de supermercado que funcionaram bem e aprender com as dúvidas dos outros membros em tempo real.
*   **Interação entre Participantes**: O maior valor da comunidade está na troca de informações do dia a dia de cada lar. Uma solução que um colega encontrou para um problema pode ser exatamente o que você precisava para resolver o seu.

### 2. O Papel do Produtor e Atualizações de Conteúdo
Embora o grupo seja focado na interação livre e na comunicação aberta entre os membros participantes:

*   **Novas Informações e Conteúdos**: Em momentos estratégicos, o produtor e sua equipe trarão novos testes químicos de produtos, atualizações de fórmulas caseiras e conteúdos adicionais exclusivos diretamente na comunidade.
*   **Esclarecimento de Dúvidas**: O produtor também participa de forma ativa respondendo perguntas complexas, trazendo aquele direcionamento técnico indispensável sempre que necessário para apoiar os membros do grupo.

### 3. Como Participar e Colaborar de Forma Produtiva
Para enriquecer a comunicação com todos os participantes e manter o ambiente saudável e proveitoso:

*   **Mostre Seus Resultados**: Envie fotos e vídeos curtos das suas conquistas na higienização do seu estofado. Isso motiva e inspira outros colegas que estão começando!
*   **Dicas de Marcas Locais**: Se encontrou uma marca excelente de detergente neutro transparente ou uma escova perfeita na sua região, indique no grupo! O compartilhamento de achados locais ajuda demais.
*   **Colabore Respondendo**: Se você já aprendeu uma técnica ou removeu com sucesso uma mancha descrita por outro colega, sinta-se livre para responder e enviar sua experiência!`,
    stepByStep: [
      "Clique no botão de Acesso à Comunidade VIP disponível abaixo nesta página.",
      "Você será direcionado diretamente para o grupo aberto de participantes no WhatsApp.",
      "Ao entrar, envie uma mensagem rápida de apresentação contando de qual cidade você é!",
      "Participe ativamente das discussões, troque dicas de produtos e compartilhe seus resultados com os outros alunos."
    ],
    expertTips: [
      "O grupo é aberto e focado em trocas! Sinta-se totalmente à vontade para compartilhar fotos de 'Antes e Depois' e tirar dúvidas com quem já limpou o mesmo tipo de tecido. A interação mútua é a forma mais rápida de fixar o aprendizado prático!"
    ],
    commonErrors: [
      "Ficar apenas observando o grupo sem interagir. A troca de experiências é o maior benefício que você terá para cuidar bem do seu sofá de forma contínua.",
      "Desviar o foco do grupo enviando conteúdos que não sejam relacionados a cuidados com estofados, limpeza doméstica e conservação do lar."
    ],
    importantAlerts: [
      "A nossa comunidade é um grupo aberto focado em cuidados com estofados. Respeite os demais participantes e evite correntes, política, propagandas ou mensagens fora do tema principal."
    ],
    checklist: [
      "Acessou o link privado de convite da comunidade.",
      "Entrou no grupo aberto de participantes no WhatsApp.",
      "Se apresentou no grupo dizendo sua cidade e o tipo de sofá que possui.",
      "Compartilhou sua primeira dúvida ou foto de resultado com a comunidade."
    ],
    summary: "O coração da nossa comunidade VIP no WhatsApp é a interação livre e proveitosa entre os participantes. Um grupo aberto para troca de experiências, fotos, dicas e resultados práticos, onde o produtor também trará novos conteúdos e esclarecerá dúvidas periodicamente.",
    practicalExercise: "Entre no grupo aberto agora mesmo, se apresente e mande um 'Olá!' para os outros alunos. Compartilhar sua expectativa é o primeiro passo para fazer parte desta rede colaborativa.",
    visualSuggestions: "Botão grande e chamativo em tom de verde vibrante do WhatsApp com efeito pulsante, cercado por depoimentos curtos e nítidos de alunos satisfeitos."
  }
];

export const conclusions = {
  title: "CONCLUSÃO: A TRANSFORMAÇÃO DO SEU LAR",
  content: `Você completou o seu treinamento! Agora, você não é mais um refém de receitas milagrosas e perigosas de internet, e também não precisa gastar centenas de reais contratando empresas de limpeza a cada pequeno acidente.

Você possui o conhecimento técnico de quem tem experiência prática em química têxtil, higienização de estofados e remoção de manchas. Sabe como identificar as fibras do tecido, domina a química simples do pH dos produtos de supermercado, sabe como escovar e extrair a sujeira manualmente sem encharcar a espuma e sabe como agir cirurgicamente nas manchas mais temidas do dia a dia, inclusive o xixi de pet.

Lembre-se sempre: higienizar o sofá é mais do que estética. É sobre a saúde respiratória de quem você ama, é sobre manter o seu lar cheiroso, acolhedor e seguro. É sobre estender a vida útil do seu móvel por 10 ou 15 anos, economizando um dinheiro que você pode investir nas suas férias ou em momentos especiais com a família.

Coloque o método em prática hoje mesmo, comece pequeno limpando uma almofada ou o braço do sofá, sinta o cheirinho de limpeza e venha compartilhar o seu sucesso na nossa Comunidade VIP do WhatsApp!

Desejo a você um sofá sempre novo e um lar incrivelmente acolhedor!

**Com carinho,**
**Equipe Giro Clean**`,
  nextSteps: "Participe ativamente da nossa Comunidade VIP e utilize as calculadoras interativas do Método Sofá Sempre Novo® para facilitar seu dia a dia!"
};

export const bonusContent = [
  {
    title: "BÔNUS 1: TABELA COMPLETA DE DILUIÇÕES",
    description: "As medidas exatas para cada tipo de sujeira e tamanho de borrifador, garantindo eficiência máxima sem desperdício de produto.",
    columns: ["Tipo de Solução", "Água Morna", "Detergente Neutro", "Álcool 70%", "Vinagre de Álcool", "Bicarbonato de Sódio", "Indicação de Uso"],
    rows: [
      ["Manutenção Leve (Escudo Pro)", "350ml", "1 colher de chá", "100ml", "1 colher de sopa", "Não usar", "Poeira leve, pelos e toque semanal rápido"],
      ["Limpeza Geral Pesada (Módulo 3)", "300ml", "1 colher de sopa", "100ml", "2 colheres de sopa", "Não usar diretamente", "Remoção de encardido, braços gordurosos e encostos"],
      ["Neutralização de Odores (Módulo 4)", "200ml", "1 colher de chá", "150ml", "150ml", "1 colher de sopa (lenta)", "Suor, mofo e umidade antiga"],
      ["Oxigenação Urina/Pets (Módulo 7)", "100ml", "1 colher de sopa", "Não usar", "Não usar nesta fase", "Polvilhar pó seco por cima", "Manchas de urina, sucos de uva e sangue fresco"]
    ]
  },
  {
    title: "BÔNUS 2: CHECKLIST PROFISSIONAL DE HIGIENIZAÇÃO",
    description: "Siga este roteiro passo a passo antes, durante e depois de qualquer higienização para garantir que nenhum detalhe seja esquecido.",
    items: [
      "Aspirar todo o estofado (incluindo frestas e almofadas soltas) por pelo menos 15 minutos.",
      "Identificar o tecido do estofado e realizar o Teste de Absorção em local escondido.",
      "Preparar a solução adequada utilizando nossa Calculadora Interativa.",
      "Isolar tapetes de madeira ou pisos laminados ao redor do sofá com panos velhos para não manchar.",
      "Aplicar o produto em pequenos quadrantes de 50x50cm de cada vez.",
      "Realizar escovação circular suave com escova de cerdas de nylon macias.",
      "Extrair a sujeira imediatamente pressionando firmemente um pano de microfibra seco e limpo.",
      "Efetuar o enxágue leve aplicando névoa de vinagre de álcool e passando pano úmido.",
      "Alinhar as cerdas do veludo ou suede escovando levemente no sentido do fio.",
      "Ativar a ventilação do cômodo (ligar ventilador ou abrir janelas) para secagem rápida."
    ]
  },
  {
    title: "BÔNUS 3: TABELA PODE OU NÃO PODE",
    description: "O guia rápido de bolso para você colar na despensa de limpeza e nunca mais cometer erros graves.",
    columns: ["Ingrediente/Ação", "PODE?", "Por que sim / Por que não", "Alternativa Segura"],
    rows: [
      ["Detergente Neutro Transparente", "SIM ✅", "Tensoativo seguro que quebra gordura sem manchar ou agredir fibras têxteis.", "Qualquer marca transparente de boa qualidade"],
      ["Sabão em Pó de Roupas", "NÃO ❌", "Deixa resíduos insolúveis que endurecem as fibras e atraem sujeira após secar.", "Detergente neutro ou shampoo infantil"],
      ["Água Sanitária / Cloro", "NÃO ❌", "Descolore permanentemente tecidos coloridos e corrói fibras naturais.", "Água oxigenada 10 volumes (apenas tecidos claros)"],
      ["Vinagre de Álcool Branco", "SIM ✅", "Desinfeta, amacia as fibras e reequilibra o pH ácido de odores básicos.", "Ácido cítrico diluído em água"],
      ["Amaciante de Roupas Comum", "NÃO ❌", "Cria película gordurosa impermeável que serve de alimento para fungos e mofo.", "Fórmula Escudo Pro (diluição extrema)"],
      ["Esfregar com Força Manchas", "NÃO ❌", "Faz o pigmento penetrar profundamente e danifica permanentemente os fios.", "Pressionar pano seco para transferir a mancha"],
      ["Secar ao Sol Direto", "NÃO ❌", "A radiação ultravioleta oxida produtos químicos residuais e desbota a cor.", "Secar sob sombra com ventilador apontado"]
    ]
  },
  {
    title: "BÔNUS 4: CALENDÁRIO ANUAL DE MANUTENÇÃO DO SOFÁ",
    description: "Organize sua rotina de acordo com a realidade da sua casa (pets, crianças ou uso moderado).",
    schedules: {
      heavy: {
        title: "Rotina Intensa (Com Pets e Crianças)",
        weekly: "Aspiração profunda de frestas e assentos (2x por semana).",
        monthly: "Limpeza leve com microfibra úmida e detergente neutro nos braços e assentos.",
        bimonthly: "Aplicação da Fórmula Neutralizadora de Odores e Escudo Pro.",
        annual: "Higienização manual completa profunda de todo o sofá."
      },
      moderate: {
        title: "Rotina Moderada (Uso Comum do Dia a Dia)",
        weekly: "Aspiração de pó rápida aos finais de semana.",
        monthly: "Névoa rápida com Fórmula Escudo Pro para amaciar fibras.",
        semiannual: "Limpeza leve de braços com água morna e detergente.",
        biennial: "Higienização manual completa profunda."
      }
    }
  },
  {
    title: "BÔNUS 5: EBOOK DIGITAL EM FORMATO PDF",
    description: "A versão digital completa, ricamente diagramada e em alta resolução do livro do Método Sofá Sempre Novo® em formato PDF, pronta para você baixar, imprimir ou salvar no seu celular para consultar offline quando e onde quiser.",
    pdfUrl: "#",
    features: [
      "Leitura Offline Completa",
      "Ilustrações de Alta Definição",
      "Formato Leve e otimizado para Smartphone",
      "Perfeito para Impressão"
    ]
  }
];
