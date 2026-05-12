export interface Skill {
    key: string;
    title: string;
    description: string;
}

export interface SkillCategory {
    key: string;
    title: string;
    description: string;
    skills: Skill[];
}

export const skillCategoriesDataMock: SkillCategory[] = [
    {
        key: "backend",
        title: "Backend",
        description: "Application services, APIs, integration layers, and server-side engineering.",
        skills: [
            {
                key: "dotnet",
                title: ".NET",
                description: "Primary backend platform for building structured services, APIs, and business workflows.",
            },
            {
                key: "aspnet-core",
                title: "ASP.NET Core",
                description: "My go-to framework for modern HTTP APIs, web backends, and clean service boundaries.",
            },
            {
                key: "csharp",
                title: "C#",
                description: "Main language for backend services, domain logic, and strongly typed application code.",
            },
            {
                key: "python",
                title: "Python",
                description: "Useful for automation, scripting, data processing, and AI-oriented tooling.",
            },
            {
                key: "restsoap",
                title: "REST/SOAP",
                description: "Experience designing and integrating service contracts across modern and legacy systems.",
            },
            {
                key: "dapper",
                title: "Dapper",
                description: "Lightweight data access for performance-sensitive database queries and mappings.",
            },
            {
                key: "entity-framework",
                title: "Entity Framework",
                description: "ORM experience for modelling data access in service layers and business applications.",
            },
            {
                key: "rabbitmq",
                title: "RabbitMQ",
                description: "Messaging and asynchronous processing for decoupled backend workflows.",
            },
        ],
    },
    {
        key: "frontend",
        title: "Frontend",
        description: "User interfaces, client-side architecture, and component-driven web apps.",
        skills: [
            {
                key: "react",
                title: "React",
                description: "Primary frontend library for component-driven UIs and reusable interactive views.",
            },
            {
                key: "nextjs",
                title: "Next.js",
                description: "Framework for routing, SSR, and full-stack React applications with a cleaner delivery model.",
            },
            {
                key: "vuejs",
                title: "Vue.js",
                description: "Alternative frontend framework for building reactive interfaces and modular UI components.",
            },
            {
                key: "javascript",
                title: "JavaScript",
                description: "Core language for browser-side logic, interactions, and client experience.",
            },
            {
                key: "typescript",
                title: "TypeScript",
                description: "Strong typing for safer refactors, clearer APIs, and more maintainable frontend code.",
            },
        ],
    },
    {
        key: "databases",
        title: "Databases",
        description: "Relational and document data stores, caching, and persistence strategy.",
        skills: [
            {
                key: "postgresql",
                title: "PostgreSQL",
                description: "Preferred relational database for dependable schema design and transactional data.",
            },
            {
                key: "mongodb",
                title: "MongoDB",
                description: "Document database experience for flexible schemas and application-friendly storage.",
            },
            {
                key: "redis",
                title: "Redis",
                description: "In-memory store for caching, fast lookups, and lightweight state management.",
            },
            {
                key: "mssql",
                title: "Microsoft SQL Server",
                description: "Relational database experience across enterprise systems and reporting-heavy workloads.",
            },
            {
                key: "couchdb",
                title: "CouchDB",
                description: "Document database familiarity for synchronization-friendly data models.",
            },
        ],
    },
    {
        key: "cloud",
        title: "Cloud & DevOps",
        description: "Hosting platforms, delivery pipelines, and infrastructure-oriented tools.",
        skills: [
            {
                key: "aws",
                title: "Amazon Web Services",
                description: "Cloud services for application hosting, storage, messaging, and deployment workflows.",
            },
            {
                key: "azure",
                title: "Microsoft Azure",
                description: "Cloud platform for enterprise services, application delivery, and managed resources.",
            },
            {
                key: "azure-devops",
                title: "Azure DevOps",
                description: "Build and release workflows, work tracking, and CI/CD automation across teams.",
            },
        ],
    },
    {
        key: "ai",
        title: "AI & Automation",
        description: "LLM tooling, agent workflows, retrieval systems, and local model experimentation.",
        skills: [
            {
                key: "claude-code",
                title: "Claude Code",
                description: "Agentic coding workflows for refactoring, implementation, and rapid iteration.",
            },
            {
                key: "cursor",
                title: "Cursor",
                description: "AI-assisted IDE workflows for exploratory development and faster code navigation.",
            },
            {
                key: "ollama",
                title: "Ollama",
                description: "Local model execution for private experimentation and offline LLM workflows.",
            },
            {
                key: "openspec",
                title: "OpenSpec",
                description: "Specification-driven development for keeping implementation aligned with intent.",
            },
            {
                key: "llm-engineering",
                title: "LLM Engineering",
                description: "Prompting, evaluation, integration, and product patterns for LLM-based systems.",
            },
            {
                key: "rag",
                title: "RAG",
                description: "Retrieval-augmented generation patterns for grounded and context-aware assistants.",
            },
            {
                key: "lora",
                title: "LoRA",
                description: "Parameter-efficient fine-tuning approach for adapting models without full retraining.",
            },
            {
                key: "agents",
                title: "Agents",
                description: "Multi-step agent workflows for orchestration, tools, and task decomposition.",
            },
        ],
    },
];
