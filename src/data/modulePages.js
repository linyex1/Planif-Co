import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Calculator,
  FileSearch,
  FileText,
  Landmark,
  LineChart,
  ListChecks,
  Network,
  PieChart,
  ReceiptText,
  Scale,
  Search,
  Target,
  TrendingUp,
  WalletCards,
} from 'lucide-react';

export const modulePages = {
  diagnostic: {
    id: 'diagnostic',
    eyebrow: 'Module Premium',
    title: 'Diagnostic stratégique',
    italic: 'stratégique',
    subtitle:
      'La matrice BCG est un outil d’analyse stratégique développé par le Boston Consulting Group. Elle permet d’optimiser la gestion de portefeuille d’activités d’une entreprise en positionnant chaque Domaine d’Activité Stratégique (DAS) selon leur position concurrentielle et l’attractivité de leur marché.',
    accent: '#D8F3FF',
    darkAccent: '#0A2342',
    icon: BrainCircuit,
    badges: ['Fiche complète', 'Mini-vidéo', 'Cas corrigé', 'Matrice BCG'],
    pdfPath: '/pdfs/diagnostic-strategique.pdf',
    objectivesGridClass: 'md:grid-cols-2 xl:grid-cols-4',
    objectives: [
      'Vedette : leader sur un marché en forte croissance. Génère et consomme beaucoup de liquidités. Conseil : investir pour maintenir la position dominante, potentiel futur vache à lait.',
      'Vache à lait : leader sur un marché mature. Génère des excédents de trésorerie avec peu d’investissements. Conseil : maintenir la position et réinvestir les flux dans les vedettes et dilemmes.',
      'Dilemme : challenger sur un marché en forte croissance. Faible rentabilité malgré la dynamique du marché. Conseil : investir massivement ou se désengager si l’écart est trop grand.',
      'Poid mort : challenger sur un marché à faible croissance. Rentabilité faible ou négative. Conseil : envisager le désengagement progressif ou maintenir si l’activité reste rentable.',
    ],
    ficheTitle: 'La matrice BCG à maîtriser.',
    ficheDescription:
      'La matrice BCG sert à optimiser la gestion d’un portefeuille d’activités en positionnant chaque Domaine d’Activité Stratégique selon sa position concurrentielle et l’attractivité de son marché.',
    concepts: [
      {
        term: 'Stratégie',
        definition:
          'Définition d’objectifs de long terme, choix de politiques et allocation optimale des ressources.',
      },
      {
        term: 'Taux de croissance du marché',
        definition:
          'Axe vertical de la matrice. Il mesure l’attractivité du marché. Exemple : un chiffre de 0,4 révèle que l’entreprise détient une part de marché égale à 40 % de celle détenue par le leader.',
      },
      {
        term: 'Part de marché relative',
        definition:
          'Axe horizontal de la matrice. Elle mesure la position concurrentielle de l’entreprise. Chaque marché a une croissance différente : on adapte les données en conséquence.',
      },
      {
        term: 'Taille des cercles',
        definition:
          'La taille de chaque cercle est proportionnelle à la contribution du DAS au chiffre d’affaires total de l’entreprise.',
      },
    ],
    steps: [
      'Calculer le taux de croissance des DAS de l’entreprise',
      'Calculer la part de marché relative des DAS',
      'Calculer la superficie des DAS',
      'Tracer la matrice BCG',
      'Ajuster l’axe médian de PMR à 1',
      'Ajuster l’axe médian de TC à la moyenne du marché',
      'Placer les DAS sur la matrice BCG',
      'Commenter l’équilibre global et conseiller l’entreprise',
    ],
    formulas: [
      {
        title: 'Taux de croissance',
        value: 'TC = (CA(N) - CA(N-1)) / CA(N-1) x 100.',
        items: ['SI TC > 1 → le marché devient plus attractif.', 'SI TC < 1 → l’activité perd en dynamique.'],
      },
      {
        title: 'Part de marché relative',
        value: 'PMR = CA du DAS de l’entreprise / CA du principal concurrent.',
        items: ['Si PMR > 1 : leader.', 'Si PMR < 1 : challenger.'],
      },
      {
        title: 'Calcul du diamètre des cercles',
        items: [
          'Le DAS avec le CA le plus faible reçoit un cercle de diamètre D₀ = 1 cm (rayon R₀ = 0,5 cm).',
          'Surface de référence : S₀ = π × R₀² = π × (0,5)² ≈ 0,785 cm².',
          'Surface de chaque DAS : S(DASi) = S₀ × [CA(DASi) / CA(DAS₀)].',
          'Rayon : R = √(S / π).',
          'Diamètre : D = 2 × R.',
        ],
      },
    ],
    deepDive: {
      title: 'Approfondissement',
      description:
        'Certains indicateurs permettent d’analyser plus précisément la performance de l’entreprise sous différents prismes.',
      items: [
        {
          title: 'Rentabilité économique',
          formula: 'EBE / Actif total',
          description:
            'Évalue l’efficacité avec laquelle l’entreprise utilise l’ensemble de ses ressources pour générer de la richesse, sans tenir compte de son financement.',
        },
        {
          title: 'Rentabilité commerciale nette',
          formula: 'Résultat net / CA HT',
          description:
            'Indique la proportion des ventes qui se transforme réellement en bénéfice final après déduction des dépenses.',
        },
        {
          title: 'Rentabilité financière',
          formula: 'Résultat net / capitaux propres',
          description:
            'Mesure le rendement de l’argent apporté et investi dans l’entreprise par les actionnaires ou associés.',
        },
        {
          title: 'Capacité d’autofinancement',
          formula: 'Résultat net + dotations aux amortissements',
          description:
            'Représente la richesse financière dégagée par l’activité de l’entreprise pour lui permettre d’investir.',
        },
      ],
    },
    videoTitle: 'Construire une matrice BCG en 4 minutes',
    videoEmbedUrl: 'https://www.youtube.com/embed/7azfWHQmZhE',
    videoDescription:
      'Cette vidéo expliquera comment calculer le taux de croissance, la part de marché relative, la taille des cercles et interpréter les quadrants.',
    exerciseTitle: 'Cas corrigé : matrice BCG du groupe LUMEX',
    exerciseIntro:
      'Le groupe LUMEX, spécialisé dans l’éclairage professionnel et résidentiel, décompose son activité en trois Domaines d’Activité Stratégique (DAS).',
    exerciseFullWidth: true,
    exerciseIntroInStatement: true,
    exerciseContext:
      'Le service stratégique a compilé les données suivantes pour les années N-1 et N (chiffres d’affaires en milliers d’euros) :\n\nOn retiendra un taux de croissance moyen de 10 % pour le marché de l’éclairage.',
    exerciseTables: [
      {
        title: 'Chiffre d’affaires du groupe LUMEX (en k€)',
        columns: ['DAS / Année', 'DAS 1 Éclairage industriel', 'DAS 2 Éclairage résidentiel', 'DAS 3 Éclairage connecté'],
        rows: [
          ['N-1', '48 000', '35 000', '15 000'],
          ['N', '55 200', '36 750', '21 000'],
        ],
      },
      {
        title: 'Chiffre d’affaires des principaux concurrents en N (en k€)',
        columns: ['Concurrent', 'DAS 1', 'DAS 2', 'DAS 3'],
        rows: [
          ['Alpha', '38 000', '50 000', '28 000'],
          ['Beta', '45 000', '30 000', '12 000'],
          ['Gamma', '25 000', '20 000', '6 000'],
        ],
      },
    ],
    exerciseQuestions: [
      'Réaliser la représentation matricielle du portefeuille d’activité du groupe LUMEX.',
      'Analyser et commenter le portefeuille. Quelles recommandations stratégiques formulez-vous pour le groupe LUMEX ?',
    ],
    correctionRows: [],
    bcgCorrection: {
      tables: [
        {
          title: 'Étape 1 : taux de croissance',
          columns: ['Calcul', 'DAS 1', 'DAS 2', 'DAS 3'],
          rows: [
            ['CA(N)', '55 200 k€', '36 750 k€', '21 000 k€'],
            ['CA(N-1)', '48 000 k€', '35 000 k€', '15 000 k€'],
            ['TC', '(55 200 - 48 000) / 48 000 x 100 = 15 %', '(36 750 - 35 000) / 35 000 x 100 = 5 %', '(21 000 - 15 000) / 15 000 x 100 = 40 %'],
          ],
        },
        {
          title: 'Étape 2 : principal concurrent et PMR',
          columns: ['Calcul', 'DAS 1', 'DAS 2', 'DAS 3'],
          rows: [
            ['CA LUMEX (N)', '55 200', '36 750', '21 000'],
            ['Principal concurrent', 'Beta : 45 000', 'Alpha : 50 000', 'Alpha : 28 000'],
            ['PMR', '55 200 / 45 000 = 1,23 ; leader', '36 750 / 50 000 = 0,74 ; challenger', '21 000 / 28 000 = 0,75 ; challenger'],
          ],
        },
        {
          title: 'Étape 3 : superficie et diamètre des cercles',
          columns: ['Calcul', 'DAS 1', 'DAS 2', 'DAS 3'],
          rows: [
            ['Surface S (cm²)', '0,785 × (55 200 / 21 000) = 0,785 × 2,629 = 2,064 cm²', '0,785 × (36 750 / 21 000) = 0,785 × 1,750 = 1,374 cm²', 'π × (0,5)² = 0,785 cm²'],
            ['Rayon R (cm)', '√(2,064 / π) = 0,81 cm', '√(1,374 / π) = 0,66 cm', '√(0,785 / π) = 0,50 cm'],
            ['Diamètre D (cm)', '2 × 0,81 = 1,62 cm', '2 × 0,66 = 1,32 cm', '2 × 0,50 = 1,00 cm'],
          ],
        },
      ],
      matrix: {
        title: 'Matrice BCG',
        subtitle: 'Seuil de croissance retenu : 10 % | Seuil de PMR : 1',
        bubbles: [
          { label: 'DAS 1', detail: 'PMR 1,23 | TC 15 %', x: 34, y: 36, size: '116px', color: '#D7FF4F' },
          { label: 'DAS 3', detail: 'PMR 0,75 | TC 40 %', x: 72, y: 28, size: '88px', color: '#A7A5FF' },
          { label: 'DAS 2', detail: 'PMR 0,74 | TC 5 %', x: 72, y: 70, size: '102px', color: '#FFFFFF' },
        ],
        quadrants: [
          { title: 'Vedette', axis: 'TC élevée / PMR élevée', content: 'DAS 1', detail: 'PMR = 1,23 | TC = 15 %', color: '#D7FF4F' },
          { title: 'Dilemme', axis: 'TC élevée / PMR faible', content: 'DAS 3', detail: 'PMR = 0,75 | TC = 40 %', color: '#A7A5FF' },
          { title: 'Vache à lait', axis: 'TC faible / PMR élevée', content: 'Aucun DAS', detail: 'Le portefeuille manque de générateur de liquidités.', color: '#D8F3FF' },
          { title: 'Poid mort', axis: 'TC faible / PMR faible', content: 'DAS 2', detail: 'PMR = 0,74 | TC = 5 %', color: '#FFB4BE' },
        ],
      },
      analysis: {
        title: 'Question 2 : analyse et recommandations',
        items: [
          'DAS 1 : investir pour conserver et renforcer la position de leader. Ce DAS a vocation à devenir une future vache à lait.',
          'DAS 2 : évaluer la rentabilité réelle. Si elle est positive, maintenir l’activité en récoltant des liquidités ; sinon envisager un désengagement progressif.',
          'DAS 3 : investir massivement pour rattraper le concurrent Alpha et transformer ce DAS en vedette.',
          'LUMEX ne dispose pas de DAS en position de vache à lait : l’enjeu majeur est donc d’investir dans les DAS 1 et 3 afin qu’ils prennent le relais de la génération de cash.',
        ],
      },
    },
    takeaways: [
      ['La matrice analyse la structure du portefeuille d’activités.', PieChart],
      ['La stratégie suppose des choix de ressources.', Landmark],
      ['Sans vache à lait, l’entreprise peut manquer de liquidités stables.', WalletCards],
    ],
    warning:
      'Erreur fréquente : construire la matrice avec une échelle des axes incohérente. Les axes doivent rester proportionnels.',
    preview: {
      type: 'bcgMatrix',
      title: 'Matrice BCG',
      items: [],
    },
  },
  budgets: {
    id: 'budgets',
    eyebrow: 'Module Premium',
    title: 'Budgets & articulation budgétaire',
    italic: 'budgétaire',
    subtitle:
      'Comprendre le système budgétaire de l’entreprise : prévisions opérationnelles, TVA, encaissements, décaissements et trésorerie.',
    accent: '#D7FF4F',
    darkAccent: '#0A2342',
    icon: BarChart3,
    badges: ['Fiche complète', 'Mini-vidéo', 'Exercice corrigé', 'TVA & trésorerie'],
    pdfPath: '/pdfs/budgets-articulation-budgetaire.pdf',
    objectives: [
      'Comprendre la logique de construction des différents budgets.',
      'Identifier les informations nécessaires à chaque budget.',
      'Calculer la TVA collectée, la TVA déductible et la TVA à décaisser.',
      'Construire les budgets d’encaissements, de décaissements et de trésorerie.',
      'Comprendre les documents de synthèse prévisionnels.',
    ],
    concepts: [
      {
        term: 'Articulation budgétaire',
        definition:
          'Ensemble des prévisions établies par l’entreprise : approvisionnements, investissements, production, administration, distribution, encaissements, décaissements et TVA.',
      },
      {
        term: 'Système budgétaire',
        definition:
          'Organisation et mise en forme des différentes prévisions afin d’anticiper les flux de trésorerie et le résultat de l’activité.',
      },
      {
        term: 'Budgets opérationnels',
        definition:
          'Prévisions des ventes, de la production, des achats, des charges et des investissements nécessaires à l’activité.',
      },
      {
        term: 'Budget de TVA',
        definition:
          'Budget qui calcule la TVA collectée, la TVA déductible et la TVA à payer ou à décaisser.',
      },
      {
        term: 'Encaissements et décaissements',
        definition:
          'Prévisions des entrées et sorties d’argent de l’entreprise pour chaque période.',
      },
      {
        term: 'Documents de synthèse',
        definition:
          'Bilan et compte de résultat prévisionnels utilisés pour analyser la situation future de l’entreprise.',
      },
    ],
    steps: [
      'Prévoir les ventes et le chiffre d’affaires prévisionnel',
      'Prévoir les approvisionnements nécessaires',
      'Construire le budget de production',
      'Répartir les charges administratives et de distribution',
      'Calculer le budget de TVA',
      'Identifier les créances clients et les dettes fournisseurs au bilan',
      'Construire les budgets d’encaissements et de décaissements',
      'Établir le budget de trésorerie et les documents prévisionnels',
    ],
    formulas: [
      { title: 'TVA à décaisser', value: 'TVA collectée - TVA déductible' },
      { title: 'Total encaissements', value: 'créances clients du bilan + encaissements sur ventes' },
      { title: 'Total décaissements', value: 'dettes du bilan + dépenses de la période' },
      { title: 'Trésorerie finale', value: 'trésorerie initiale + encaissements - décaissements' },
    ],
    calculationBlocks: [
      {
        title: 'Budget de TVA',
        lines: ['TVA collectée - TVA déductible = TVA à décaisser'],
      },
      {
        title: 'Budget des encaissements',
        lines: ['Créances clients du bilan + encaissements sur ventes = total des encaissements'],
      },
      {
        title: 'Budget des décaissements',
        lines: ['Dettes du bilan + dépenses de la période = total des décaissements'],
      },
      {
        title: 'Budget de trésorerie',
        lines: [
          'Encaissements - décaissements = variation de trésorerie',
          'Variation de trésorerie + trésorerie initiale = trésorerie finale',
        ],
      },
    ],
    videoTitle: 'Comprendre l’articulation budgétaire en 4 minutes',
    videoEmbedUrl: 'https://www.youtube.com/embed/DCdF3vntR9s',
    videoDescription:
      'Cette vidéo montrera comment passer des budgets opérationnels au budget de TVA, aux flux de trésorerie et aux documents prévisionnels.',
    exerciseTitle: 'Cas corrigé : établir les budgets et la trésorerie',
    exerciseIntro:
      'Une entreprise prévoit son activité mensuelle et doit construire les principaux budgets : ventes, production, approvisionnements, TVA, encaissements, décaissements et trésorerie.',
    exerciseRows: [
      { item: 'Ventes', detail: '1 000 unités à 40 € HT, TVA 20 %, 70 % encaissé comptant', method: 'Ventes / encaissements' },
      { item: 'Production', detail: 'Production uniforme de 1 060 unités', method: 'Production' },
      { item: 'Matières premières', detail: '12 720 € HT, TVA 20 %', method: 'Approvisionnements' },
      { item: 'Production', detail: 'Charges fixes 4 000 €, MOD 5 000 €, amortissement 2 000 €', method: 'Budget de production' },
      { item: 'Bilan initial', detail: 'Créances clients 8 000 €, dettes fournisseurs 5 000 €', method: 'Flux de trésorerie' },
      { item: 'Administration', detail: 'Frais administratifs 2 500 € HT, TVA 20 %', method: 'Budget administratif' },
      { item: 'Investissement', detail: 'Achat machine 10 000 € HT, TVA 20 %, payé comptant', method: 'Investissements' },
      { item: 'Trésorerie initiale', detail: '12 000 €', method: 'Budget de trésorerie' },
    ],
    correctionRows: [
      { label: 'Budget des ventes', result: 'CA HT = 1 000 x 40 = 40 000 €. TVA collectée = 40 000 x 20 % = 8 000 €. CA TTC = 48 000 €.' },
      { label: 'Budget de production', result: 'Total HT = 12 720 + 5 000 + 4 000 + 2 000 = 23 720 €. TVA sur frais de production = 4 000 x 20 % = 800 €. Total TTC = 24 520 €.' },
      { label: 'Budget des approvisionnements', result: 'Achats HT = 12 720 €. TVA déductible = 12 720 x 20 % = 2 544 €. Achats TTC = 15 264 €.' },
      { label: 'Budget des investissements', result: 'Achat machine HT = 10 000 €. TVA déductible = 2 000 €. Investissement TTC payé comptant = 12 000 €.' },
      { label: 'Budget des frais administratifs', result: 'Frais administratifs HT = 2 500 €. TVA déductible = 500 €. Total TTC = 3 000 €.' },
      { label: 'Budget de TVA', result: 'TVA déductible totale = 2 544 + 800 + 2 000 + 500 = 5 844 €. TVA à décaisser = 8 000 - 5 844 = 2 156 €.' },
      { label: 'Budget des encaissements', result: 'Encaissements sur ventes = 48 000 x 70 % = 33 600 €. Créances clients = 8 000 €. Total = 41 600 €.' },
      { label: 'Budget des décaissements', result: 'Décaissements = 15 264 + 5 000 + 4 800 + 3 000 + 12 000 + 2 156 + 5 000 = 47 220 €.' },
      { label: 'Budget de trésorerie', result: 'Variation = 41 600 - 47 220 = -5 620 €. Trésorerie finale = -5 620 + 12 000 = 6 380 €.' },
      { label: 'Conclusion', result: 'La trésorerie finale reste positive à 6 380 € malgré les dépenses de production, d’administration et d’investissement.' },
    ],
    takeaways: [
      ['L’articulation budgétaire organise toutes les prévisions.', TrendingUp],
      ['Les calculs HT, TVA et TTC structurent les budgets.', ReceiptText],
      ['Le budget de trésorerie vérifie l’équilibre financier.', WalletCards],
    ],
    warning:
      'Erreur fréquente : oublier que la TVA collectée et la TVA déductible influencent directement les décaissements et donc la trésorerie.',
    preview: {
      title: 'Chaîne budgétaire',
      items: [
        ['Ventes', 'CA + TVA', '#D7FF4F'],
        ['Production', 'Charges', '#D8F3FF'],
        ['TVA', 'À décaisser', '#FFFFFF'],
        ['Trésorerie', '6 380 €', '#A7A5FF'],
      ],
    },
  },
  ecarts: {
    id: 'ecarts',
    eyebrow: 'Module Premium',
    title: 'Contrôle budgétaire & écarts',
    italic: 'écarts',
    subtitle:
      'Comparer le prévisionnel et le réalisé pour suivre la gestion budgétaire, comprendre les causes des écarts et décider des ajustements.',
    accent: '#FFE7EB',
    darkAccent: '#D72638',
    icon: Calculator,
    badges: ['Fiche complète', 'Mini-vidéo', 'Exercice corrigé', 'Pilotage'],
    pdfPath: '/pdfs/controle-budgetaire-ecarts.pdf',
    objectives: [
      'Comprendre le calcul et l’analyse des écarts budgétaires.',
      'Comparer les données prévisionnelles et les données réelles.',
      'Identifier les écarts favorables et défavorables.',
      'Analyser les écarts sur les quantités et les coûts.',
      'Utiliser l’analyse des écarts pour proposer des actions correctives.',
    ],
    concepts: [
      {
        term: 'Contrôle budgétaire',
        definition:
          'Comparaison du prévisionnel et du réalisé afin d’assurer le suivi budgétaire, de comprendre les causes des écarts et de mettre en place des décisions d’ajustement.',
      },
      {
        term: 'Coût prévisionnel',
        definition:
          'Coût estimé avant la période à partir des budgets prévus, en lien avec le chapitre sur l’articulation budgétaire.',
      },
      {
        term: 'Coût constaté',
        definition:
          'Coût réellement observé à la fin de la période.',
      },
      {
        term: 'Écart',
        definition:
          'Différence entre le coût réel et le coût prévisionnel de l’activité. Il peut être favorable ou défavorable.',
      },
      {
        term: 'Analyse des écarts',
        definition:
          'Étude des différences entre coûts réels et coûts prévus afin d’identifier leurs causes.',
      },
      {
        term: 'Gestion par exception',
        definition:
          'Principe consistant à concentrer l’analyse sur les écarts importants ou anormaux.',
      },
      {
        term: 'Action corrective',
        definition:
          'Décision prise après analyse pour corriger un écart ou améliorer le pilotage futur.',
      },
    ],
    steps: [
      'Identifier les quantités et coûts prévisionnels',
      'Identifier les quantités et coûts réels',
      'Calculer la norme élémentaire si nécessaire',
      'Calculer la quantité prévue ajustée à la production réelle',
      'Distinguer les écarts liés aux prix et aux quantités',
      'Identifier les écarts favorables et défavorables',
      'Réaliser le tableau des écarts',
      'Visualiser graphiquement les écarts sur prix et quantités',
      'Calculer l’écart global',
      'Proposer une action corrective',
    ],
    formulas: [
      { title: 'Norme élémentaire', value: 'quantité prévue / production prévue' },
      { title: 'Quantité prévue ajustée', value: 'norme élémentaire x production réelle' },
      { title: 'Écart sur prix', value: '(prix réel - prix prévu) x quantité réelle' },
      { title: 'Écart sur quantité', value: '(quantité réelle - quantité prévue ajustée) x prix prévu' },
      { title: 'Écart global', value: 'coût réel - coût prévu ajusté' },
      { title: 'Vérification', value: 'écart global = écart sur prix + écart sur quantité' },
    ],
    calculationBlocks: [
      {
        title: 'Notations utiles',
        lines: [
          'PR = prix réel ; PP = prix prévu',
          'QR = quantité réelle ; QPj = quantité prévue ajustée',
        ],
      },
      {
        title: 'Écart sur prix',
        lines: [
          '(prix réel - prix prévu) x quantité réelle',
          'Mesure l’effet de la variation du prix réel par rapport au prix prévu.',
        ],
      },
      {
        title: 'Écart sur quantité',
        lines: [
          '(quantité réelle - quantité prévue ajustée) x prix prévu',
          'Mesure l’effet de la consommation réelle par rapport à la quantité prévue ajustée.',
        ],
      },
      {
        title: 'Écart global',
        lines: [
          '(quantité réelle x prix réel) - (quantité prévue ajustée x prix prévu)',
          'Permet de vérifier la somme des écarts sur prix et quantité.',
        ],
      },
      {
        title: 'Tableau des écarts',
        lines: ['Comparer quantité réelle, prix réel, coût réel, quantité prévue ajustée, prix prévu, coût prévu et écart.'],
      },
    ],
    videoTitle: 'Analyser un écart sans se perdre dans les calculs',
    videoEmbedUrl: 'https://www.youtube.com/embed/kKxAIfulHn0',
    videoDescription:
      'Cette vidéo expliquera comment ajuster les quantités prévues, calculer les écarts sur prix et quantité, puis interpréter l’écart global.',
    exerciseTitle: 'Cas corrigé : analyser un écart sur matière',
    exerciseIntro:
      'Une entreprise produit des sacs et souhaite analyser l’écart entre la consommation prévue de matière première et la consommation réellement constatée.',
    exerciseRows: [
      { item: 'Production prévue', detail: '1 000 sacs', method: 'Donnée prévisionnelle' },
      { item: 'Consommation prévue', detail: '500 kg de matière première', method: 'Donnée prévisionnelle' },
      { item: 'Prix standard', detail: '8 € / kg', method: 'Prix prévu' },
      { item: 'Production réelle', detail: '1 100 sacs', method: 'Donnée réelle' },
      { item: 'Quantité réelle consommée', detail: '540 kg', method: 'Quantité réelle' },
      { item: 'Prix réel', detail: '8,50 € / kg', method: 'Prix réel' },
    ],
    correctionRows: [
      { label: 'Norme élémentaire', result: 'Norme élémentaire = quantité prévue / production prévue = 500 / 1 000 = 0,5 kg par sac.' },
      { label: 'Quantité prévue ajustée', result: 'Quantité prévue ajustée = norme élémentaire x production réelle = 0,5 x 1 100 = 550 kg.' },
      { label: 'Coût prévu ajusté', result: 'Coût prévu ajusté = quantité prévue ajustée x prix prévu = 550 x 8 = 4 400 €.' },
      { label: 'Coût réel', result: 'Coût réel = quantité réelle x prix réel = 540 x 8,50 = 4 590 €.' },
      { label: 'Écart global', result: 'Écart global = 4 590 - 4 400 = +190 €. L’écart est défavorable.' },
      { label: 'Écart sur prix', result: 'Écart sur prix = (prix réel - prix prévu) x quantité réelle = (8,50 - 8) x 540 = +270 €. Le prix d’achat réel est supérieur au prix prévu.' },
      { label: 'Écart sur quantité', result: 'Écart sur quantité = (quantité réelle - quantité prévue ajustée) x prix prévu = (540 - 550) x 8 = -80 €. L’entreprise consomme 10 kg de moins que prévu, écart favorable.' },
      { label: 'Vérification', result: 'Écart global = écart sur prix + écart sur quantité = 270 + (-80) = 190 €.' },
      { label: 'Conclusion', result: 'L’écart global défavorable de 190 € provient surtout de la hausse du prix d’achat, malgré une économie sur les quantités consommées. Une négociation fournisseur peut limiter les futurs dépassements.' },
    ],
    correctionTable: {
      title: 'Tableau récapitulatif',
      columns: ['Élément', 'Quantité réelle', 'Prix réel', 'Coût réel', 'Quantité prévue ajustée', 'Prix prévu', 'Coût prévu', 'Écart'],
      rows: [
        ['Matière première', '540 kg', '8,50 €', '4 590 €', '550 kg', '8 €', '4 400 €', '+190 €'],
      ],
    },
    varianceChart: [
      { label: 'Écart sur prix', value: 270, kind: 'bad' },
      { label: 'Écart sur quantité', value: -80, kind: 'good' },
      { label: 'Écart global', value: 190, kind: 'bad' },
    ],
    takeaways: [
      ['Un écart se calcule, puis surtout s’interprète.', Calculator],
      ['Tous les écarts ne méritent pas la même attention.', Scale],
      ['Le contrôle sert à décider, pas seulement à constater.', ListChecks],
    ],
    warning:
      'Erreur fréquente : comparer la quantité réelle à la quantité prévue initiale sans ajuster la quantité prévue à la production réelle.',
    preview: {
      title: 'Tableau des écarts',
      items: [
        ['Prévu ajusté', '4 400 €', '#D8F3FF'],
        ['Réel', '4 590 €', '#FFE7EB'],
        ['Écart global', '+190 €', '#D72638'],
        ['Cause', 'Prix', '#D7FF4F'],
      ],
    },
  },
};
