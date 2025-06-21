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
            endDate: "Present",
            description: "Team Size: 10 developers. Developed architecture and design. FinTech.",
            techStack: ".NET Core, React, MongoDB, RabbitMQ, MSSQL, AWS",
            responsibilities: [
                "Developed system architecture and design for FinTech solutions",
                "Collaborated with a team of 10 developers",
                "Implemented scalable backend and frontend features"
            ]
        },
        {
            company: "Intetics",
            role: "Senior Software Engineer / Team Lead",
            startDate: "October 2021",
            endDate: "April 2024",
            description: "Team Size: 10 developers. Developed architecture and design. Healthcare.",
            techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, AWS",
            responsibilities: [
                "Led a team of 10 developers in healthcare projects",
                "Designed and developed system architecture",
                "Oversaw project delivery and code quality"
            ]
        },
        {
            company: "Aras",
            role: "System Architect",
            startDate: "April 2020",
            endDate: "October 2021",
            description: "Optimized solutions based on non-functional requirements. Led development teams and mentored developers.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps",
            responsibilities: [
                "Optimized solutions for performance and scalability",
                "Led multiple development teams",
                "Mentored and coached developers"
            ]
        },
        {
            company: "Aras",
            role: "Senior Software Engineer (.NET)",
            startDate: "April 2019",
            endDate: "April 2020",
            description: "Customized platform solutions. Integrated third-party services.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps",
            responsibilities: [
                "Customized platform solutions for client needs",
                "Integrated third-party services into existing systems"
            ]
        },
        {
            company: "Disprz",
            role: ".NET Developer/Team Lead",
            startDate: "February 2019",
            endDate: "April 2019",
            description: "Developed MVP chat bot for bank employee onboarding.",
            techStack: "C#, ASP.NET Core, Azure",
            responsibilities: [
                "Developed MVP chatbot for bank employee onboarding",
                "Led a small development team"
            ]
        },
        {
            company: "Andersen Labs",
            role: ".NET Developer/Team Lead",
            startDate: "June 2017",
            endDate: "April 2019",
            description: "Developed E-Commerce platform services. Planned and led migrations.",
            techStack: "C#, ASP.NET MVC, React, Dapper",
            responsibilities: [
                "Developed services for E-Commerce platform",
                "Planned and led system migrations",
                "Coordinated with cross-functional teams"
            ]
        },
        {
            company: "Andersen Labs",
            role: "Junior .NET Developer",
            startDate: "December 2016",
            endDate: "June 2017",
            description: "Developed vehicle insurance system.",
            techStack: "C#, ASP.NET MVC, JavaScript",
            responsibilities: [
                "Developed features for vehicle insurance system",
                "Collaborated with senior developers"
            ]
        }
    ];
