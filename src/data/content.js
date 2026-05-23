import {
  BarChart3,
  BrainCircuit,
  Calculator,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  PlayCircle,
  Route,
  Sparkles,
  Target,
  Trophy,
  Video,
} from 'lucide-react';

export const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Cours', href: '#cours' },
  { label: 'Fiche gratuite', href: '#exercices' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Tutoriel', href: '#tutoriel' },
];

export const modules = [
  {
    id: 'diagnostic',
    title: 'Diagnostic stratégique',
    description:
      'Construire une matrice BCG, positionner les DAS et formuler des recommandations stratégiques.',
    tags: ['fiche', 'vidéo', 'exercice'],
    icon: BrainCircuit,
    accent: 'bg-[#D8F3FF]',
  },
  {
    id: 'budgets',
    title: 'Budgets & articulation budgétaire',
    description:
      'Passer de la stratégie aux budgets : ventes, production, trésorerie, CR et bilan prévisionnel.',
    tags: ['fiche', 'vidéo', 'exercice'],
    icon: BarChart3,
    accent: 'bg-[#D7FF4F]',
  },
  {
    id: 'ecarts',
    title: 'Contrôle budgétaire & écarts',
    description:
      'Analyser les écarts sur charges directes et indirectes pour piloter par exception.',
    tags: ['fiche', 'vidéo', 'exercice'],
    icon: Calculator,
    accent: 'bg-[#FFE7EB]',
  },
];

export const pricingPlans = [
  {
    name: 'Découvrir gratuitement',
    price: '0 €',
    description: 'Une entrée simple pour tester la méthode avant le contrôle.',
    cta: 'Commencer gratuitement',
    href: '#exercices',
    variant: 'light',
    features: [
      'Module Planification de projet / MPM ouvert',
      'Fiche technique complète offerte',
      '1 vidéo explicative de 3 à 4 minutes',
      'Exercice corrigé inclus pour tester la méthode',
    ],
  },
  {
    name: 'Progresser avec Premium',
    price: '30 €/mois',
    description: 'Le parcours complet pour avancer vite sur les chapitres clés.',
    cta: 'Choisir Premium',
    href: '#panier',
    variant: 'dark',
    badge: 'Recommandé',
    features: [
      '3 cours en mini-vidéos',
      'Toutes les fiches techniques',
      'Exercices corrigés en vidéos de 2 à 3 minutes',
      'Parcours de révision',
      'Panier et paiement simulé',
    ],
  },
];

export const premiumProduct = {
  id: 'premium-planifco',
  name: 'Formation Premium Planif&Co',
  subtitle: 'Accès mensuel - Planification & Contrôle',
  price: 30,
  billing: 'par mois',
  features: [
    '3 cours en mini-vidéos',
    'Toutes les fiches techniques',
    'Exercices corrigés en vidéos de 2 à 3 minutes',
    'Parcours de révision Premium',
  ],
};

export const journeySteps = [
  {
    title: 'Je révise la fiche',
    description: 'Une synthèse claire pour poser les définitions, formules et étapes.',
    icon: FileText,
    badge: 'Étape 01',
  },
  {
    title: 'Je regarde la mini-vidéo',
    description: 'Un format court pour comprendre la logique sans perdre le fil.',
    icon: PlayCircle,
    badge: 'Étape 02',
  },
  {
    title: 'Je fais l’exercice corrigé',
    description: 'Un cas type expliqué pour passer du cours à l’application.',
    icon: ClipboardCheck,
    badge: 'Étape 03',
  },
];

export const stats = [
  { value: '4', label: 'chapitres clés', icon: Route },
  { value: '10+', label: 'fiches techniques', icon: FileText },
  { value: '3', label: 'mini-cours Premium', icon: Video },
  { value: '1', label: 'module MPM ouvert', icon: Trophy },
  { value: '30€', label: 'par mois', icon: Sparkles },
];

export const benefits = [
  { title: 'Réviser plus vite', icon: Clock3 },
  { title: 'S’entraîner sur des cas types', icon: Target },
  { title: 'Identifier les points clés du contrôle', icon: GraduationCap },
];

export const courseTopics = [
  'Stratégie, objectifs long terme et allocation des ressources',
  'PESTEL, Harvard, BCG, AD Little et Porter',
  'Projet de budget, consolidation, navette et budgets définitifs',
  'Budgets des ventes, production, achats, trésorerie, CR et bilan',
  'Écarts, coûts prévisionnels, coûts constatés et gestion par exception',
  'MPM, dates au plus tôt/tard, marges et chemin critique',
  'Délai de récupération, VAN, TRI et indice de rentabilité',
];

export const footerLinks = navLinks;
