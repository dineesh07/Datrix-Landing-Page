export interface Feature {
  index: number;
  title: string;
  description: string;
  badge: string | null;
  span: "wide" | "normal";
  icon: string;
}

export const FEATURES: Feature[] = [
  {
    index: 0,
    title: "Real-Time Data Matrix",
    description: "Process millions of events per second with zero-latency pipelines. Datrix's streaming core transforms raw inputs into structured intelligence before your next breath.",
    badge: "Core Engine",
    span: "wide",
    icon: "arrow-path.svg",
  },
  {
    index: 1,
    title: "Autonomous Workflow Engine",
    description: "Build complex multi-step automations visually. Datrix handles branching logic, error recovery, and retry orchestration — no code required.",
    badge: null,
    span: "normal",
    icon: "cog-8-tooth.svg",
  },
  {
    index: 2,
    title: "Universal Connector Hub",
    description: "Plug into 200+ data sources in one click. REST, GraphQL, webhooks, databases, cloud storage — Datrix speaks every protocol natively.",
    badge: "200+ Integrations",
    span: "normal",
    icon: "link.svg",
  },
  {
    index: 3,
    title: "Predictive Intelligence Layer",
    description: "Don't just move data — understand it. Datrix surfaces anomalies, forecasts trends, and flags issues before they become incidents.",
    badge: "AI-Powered",
    span: "normal",
    icon: "arrow-trending-up.svg",
  },
  {
    index: 4,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II certified. End-to-end encryption, role-based access control, audit logs, and GDPR compliance built into every layer.",
    badge: "SOC 2 Certified",
    span: "normal",
    icon: "cube-16-solid.svg",
  },
  {
    index: 5,
    title: "Infinite Scale Architecture",
    description: "Start with one workflow. Grow to a billion events. Datrix auto-scales horizontally with no configuration, no downtime, no ceiling.",
    badge: null,
    span: "wide",
    icon: "chart-pie.svg",
  },
];
