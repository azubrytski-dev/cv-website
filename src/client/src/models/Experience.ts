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
            description: "Built FinTech features with a team of 10 engineers, shaping architecture and design while keeping delivery predictable under real product constraints.",
            techStack: ".NET Core, React, MongoDB, RabbitMQ, MSSQL, AWS",
            responsibilities: [
                "Took ownership of architecture decisions that kept the platform scalable and maintainable",
                "Delivered backend and frontend changes end to end inside a 10-person engineering team",
                "Balanced product speed with reliability in a regulated FinTech environment"
            ]
        },
        {
            company: "Intetics",
            role: "Senior Software Engineer / Team Lead",
            startDate: "October 2021",
            endDate: "April 2024",
            description: "Led a healthcare engineering team of 10, translating messy business needs into stable product delivery and clean technical direction.",
            techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, AWS",
            responsibilities: [
                "Led a 10-person team through planning, delivery, and code-quality decisions",
                "Shaped system architecture so the product could evolve without slowing the team down",
                "Kept stakeholders aligned by turning business requirements into clear implementation steps"
            ]
        },
        {
            company: "Aras",
            role: "System Architect",
            startDate: "April 2020",
            endDate: "October 2021",
            description: "Focused on system design and non-functional requirements, helping teams ship software that was fast, resilient, and easier to grow.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps",
            responsibilities: [
                "Improved performance and scalability by designing around non-functional requirements early",
                "Guided multiple teams on architecture, technical tradeoffs, and delivery sequencing",
                "Mentored developers and raised the quality bar through practical coaching"
            ]
        },
        {
            company: "Aras",
            role: "Senior Software Engineer (.NET)",
            startDate: "April 2019",
            endDate: "April 2020",
            description: "Customized platform capabilities and integrated external services so the product could fit complex customer workflows.",
            techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps",
            responsibilities: [
                "Delivered custom product behavior for client-specific business needs",
                "Integrated third-party services into existing systems without disrupting the core platform",
                "Worked across code, integration, and troubleshooting layers to keep releases moving"
            ]
        },
        {
            company: "Disprz",
            role: ".NET Developer/Team Lead",
            startDate: "February 2019",
            endDate: "April 2019",
            description: "Built an MVP chatbot for bank employee onboarding, moving quickly from idea to something real enough for users to start learning from.",
            techStack: "C#, ASP.NET Core, Azure",
            responsibilities: [
                "Turned a short concept cycle into a working onboarding MVP",
                "Led a small team while keeping scope tight and delivery fast",
                "Used rapid iteration to validate the product direction early"
            ]
        },
        {
            company: "Andersen Labs",
            role: ".NET Developer/Team Lead",
            startDate: "June 2017",
            endDate: "April 2019",
            description: "Built E-Commerce platform services and led migrations, giving the team a steadier base for growth and future changes.",
            techStack: "C#, ASP.NET MVC, React, Dapper",
            responsibilities: [
                "Delivered services for a high-traffic E-Commerce platform",
                "Planned and executed migrations with minimal disruption to the product",
                "Worked cross-functionally to keep delivery aligned across teams"
            ]
        },
        {
            company: "Andersen Labs",
            role: "Junior .NET Developer",
            startDate: "December 2016",
            endDate: "June 2017",
            description: "Started on a vehicle insurance system where I built fundamentals, learned delivery discipline, and contributed to production features.",
            techStack: "C#, ASP.NET MVC, JavaScript",
            responsibilities: [
                "Delivered features for a production insurance system",
                "Learned to work inside an experienced team and absorb implementation standards quickly",
                "Built a strong foundation in shipping reliable backend work"
            ]
        }
    ];
