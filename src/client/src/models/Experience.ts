    export interface Experience {
        company: string;
        role: string;
        description: string;
        techStack: string;
        startDate: string;
        endDate: string;
        responsibilities: string[];
    }

    export const experienceDataMock: Experience[] = [
        {
            company: "Tipalti",
            role: "Senior Software Engineer",
            startDate: "August 2024",
            endDate: "18 November 2026",
            description: "Fintech and AI product development in a 10-person team.",
            techStack: ".NET, React, AWS (Amazon Bedrock), Azure Pipelines, RabbitMQ, MongoDB, PostgreSQL, Snowflake, SQL Server",
            responsibilities: [
                "Owned design and rollout of automated reconciliation for funds transfers.",
                "Integrated an existing Bedrock agent into a customer-facing sales chatbot and shipped the MVP to production in one month.",
                "Mentored engineers and introduced spec-driven development, agent workflows, and AI-assisted code review.",
                "Helped launch a financial service and owned monitoring, incident response, and follow-up fixes."
            ]
        },
        {
            company: "Intetics",
            role: "Senior Software Engineer / Team Lead",
            startDate: "October 2021",
            endDate: "April 2024",
            description: "Progressed from senior engineer to lead of a 10-person healthcare software team.",
            techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, AWS",
            responsibilities: [
                "Scoped, estimated, and designed a medical records system, then led it through launch and initial use.",
                "Extended eligibility and benefits checks to support new insurance coverage rules.",
                "Owned design and production deployments, and resolved urgent incidents with low-risk fixes.",
                "Conducted technical interviews and helped make hiring decisions."
            ]
        },
        {
            company: "Aras",
            role: "System Architect",
            startDate: "April 2020",
            endDate: "October 2021",
            description: "Enterprise integration design and architecture guidance.",
            techStack: "REST/SOAP, .NET, SQL Server, Azure DevOps",
            responsibilities: [
                "Reduced factory data sync delays in an automotive quality-control system with caching and batch writes, keeping the system usable during sync.",
                "Defined the architectural runway for products and iterations, advised teams, and reviewed implementation.",
                "Mentored developers on performance and scalability."
            ]
        },
        {
            company: "Aras",
            role: "Senior Software Engineer (.NET)",
            startDate: "April 2019",
            endDate: "April 2020",
            description: "Customized an enterprise platform for customer workflows.",
            techStack: "REST/SOAP, .NET, SQL Server, Azure DevOps, LDAP",
            responsibilities: [
                "Implemented custom LDAP sign-in using customers’ existing directory credentials.",
                "Delivered agreed customer changes on schedule.",
                "Helped teammates design and troubleshoot changes."
            ]
        },
        {
            company: "Disprz",
            role: ".NET Developer/Team Lead",
            startDate: "February 2019",
            endDate: "April 2019",
            description: "Bank employee onboarding.",
            techStack: "C#, ASP.NET Core, Azure",
            responsibilities: [
                "Delivered a demo-ready MVP of a scripted chatbot for bank employee onboarding.",
                "Led a small team and defined MVP scope."
            ]
        },
        {
            company: "Andersen Labs",
            role: ".NET Developer/Team Lead",
            startDate: "June 2017",
            endDate: "April 2019",
            description: "E-commerce platform development and team leadership.",
            techStack: "C#, ASP.NET MVC, React, OData, Dapper, Redis",
            responsibilities: [
                "Migrated all customers from OData to Dapper and verified behavior with regression tests.",
                "Sped up initial loads for large product catalogs with database indexes and Redis caching.",
                "Led developers and testers, interviewed candidates, and mentored new hires through probation."
            ]
        },
        {
            company: "Andersen Labs",
            role: "Junior .NET Developer",
            startDate: "December 2016",
            endDate: "June 2017",
            description: "Vehicle insurance web application.",
            techStack: "C#, ASP.NET MVC, JavaScript",
            responsibilities: [
                "Added Arabic localization with right-to-left text and interface layouts.",
                "Diagnosed and fixed application bugs."
            ]
        }
    ];
