    export interface Experience {
        company: string;
        role: string;
        description: string;
        techStack: string;
        startDate: string;
        endDate: string;
    }

    export const experienceDataMock: Experience[] = [
        {
            company: "Tipalti",
            role: "Senior Software Engineer / Team Lead",
            startDate: "August 2024",
            endDate: "Present",
            description: "Team Size: 10 developers. Developed architecture and design. FinTech.",
            techStack: ".NET Core, React, MongoDB, RabbitMQ, MSSQL, AWS"
        },
        {
            company: "Intetics",
            role: "Senior Software Engineer / Team Lead",
            startDate: "October 2021",
            endDate: "April 2024",
            description: "Team Size: 10 developers. Developed architecture and design. Healthcare.",
            techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, AWS"
        },
        {
            company: "Aras",
            role: "System Architect",
            startDate: "April 2020",
            endDate: "October 2021",
            description: "Optimized solutions based on non-functional requirements. Led development teams and mentored developers.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps"
        },
        {
            company: "Aras",
            role: "Senior Software Engineer (.NET)",
            startDate: "April 2019",
            endDate: "April 2020",
            description: "Customized platform solutions. Integrated third-party services.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps"
        },
        {
            company: "Disprz",
            role: ".NET Developer/Team Lead",
            startDate: "February 2019",
            endDate: "April 2019",
            description: "Developed MVP chat bot for bank employee onboarding.",
            techStack: "C#, ASP.NET Core, Azure"
        },
        {
            company: "Andersen Labs",
            role: ".NET Developer/Team Lead",
            startDate: "June 2017",
            endDate: "April 2019",
            description: "Developed E-Commerce platform services. Planned and led migrations.",
            techStack: "C#, ASP.NET MVC, React, Dapper"
        },
        {
            company: "Andersen Labs",
            role: "Junior .NET Developer",
            startDate: "December 2016",
            endDate: "June 2017",
            description: "Developed vehicle insurance system.",
            techStack: "C#, ASP.NET MVC, JavaScript"
        }
    ];
