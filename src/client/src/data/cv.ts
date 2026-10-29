import { experienceDataMock } from '../models/Experience';
import { educationDataMock } from '../models/Education';
import { skillCategoriesDataMock } from '../models/Skill';

const skillTitles = new Map(skillCategoriesDataMock.flatMap(category => category.skills.map(skill => [skill.key, skill.title] as const)));
const groups = [
  { title: 'Backend', keys: ['csharp', 'dotnet', 'aspnet-core', 'python', 'restsoap', 'entity-framework', 'dapper'] },
  { title: 'Data & messaging', keys: ['mssql', 'postgresql', 'mongodb', 'redis', 'rabbitmq', 'couchdb'] },
  { title: 'Frontend', keys: ['react', 'typescript', 'nextjs', 'vuejs', 'javascript'] },
  { title: 'Cloud & delivery', keys: ['aws', 'azure', 'azure-devops'] },
  { title: 'AI & automation', keys: ['agents', 'rag', 'ollama', 'claude-code', 'cursor'], note: 'Ongoing exploration' },
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
  summary: 'I build backend-heavy products across fintech and enterprise systems. I take work from architecture and delivery planning through implementation and release, with a focus on reliable, maintainable software.',
  skills: groups.map(group => ({
    title: group.title,
    note: group.note,
    items: group.keys.map(key => shortNames[key] ?? skillTitles.get(key)).filter((title): title is string => Boolean(title)),
  })),
  experience: experienceDataMock,
  education: [...educationDataMock].sort((a, b) => b.graduatedYear - a.graduatedYear),
};
