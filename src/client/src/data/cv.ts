import { experienceDataMock } from '../models/Experience';
import { educationDataMock } from '../models/Education';
import { skillCategoriesDataMock } from '../models/Skill';

const skillTitles = new Map(skillCategoriesDataMock.flatMap(category => category.skills.map(skill => [skill.key, skill.title] as const)));
const groups = [
  {
    title: 'AI Engineering & Automation',
    keys: ['llm-integration', 'bedrock', 'rag', 'llm-usage-cost', 'agent-development', 'agents', 'mcp', 'spec-driven-development', 'ai-code-review'],
  },
  { title: 'Backend', keys: ['csharp', 'dotnet', 'aspnet-core', 'restsoap', 'entity-framework', 'dapper'] },
  { title: 'Data & messaging', keys: ['mssql', 'mongodb', 'rabbitmq', 'postgresql', 'redis', 'couchdb'] },
  { title: 'Frontend', keys: ['react', 'typescript', 'javascript', 'nextjs', 'vuejs'] },
  { title: 'Cloud & delivery', keys: ['aws', 'azure-devops', 'azure-pipelines', 'github-actions'] },
  { title: 'Additional tools', keys: ['claude-code', 'cloud-code', 'codex', 'cursor', 'openspec', 'superpower', 'ollama'], note: 'Ongoing exploration' },
];
const shortNames: Record<string, string> = { mssql: 'SQL Server', aws: 'AWS', azure: 'Azure', agents: 'Agent workflows' };

// Pure, presentation-independent data shared by the website, dialogs and PDF.
export const cvData = {
  contact: {
    name: 'Andrei Zubrytski',
    title: 'Senior Software Engineer',
    location: 'Tbilisi, Georgia',
    birthdate: '30.11.1991',
    skype: 'live:azubrytski.dev',
    email: 'azubrytski.dev@gmail.com',
    github: 'https://github.com/azubrytski-dev',
    linkedin: 'https://www.linkedin.com/in/andrei-zubrytsky/',
  },
  summary: 'I build .NET services, integrations, and React features. My experience spans enterprise architecture, healthcare team leadership, and fintech product development.',
  skills: groups.map(group => ({
    title: group.title,
    note: group.note,
    items: group.keys.map(key => shortNames[key] ?? skillTitles.get(key)).filter((title): title is string => Boolean(title)),
  })),
  experience: experienceDataMock,
  education: [...educationDataMock].sort((a, b) => b.graduatedYear - a.graduatedYear),
};
