export interface Project {
    name: string;
    role: string;
    description: string;
    company: string;
    techStack: string;
    startDate: string;
    endDate: string;
}

export const projectDataMock: Project[] = [
    {
        name: "Health Care/Mass Medicine",
        role: "Senior Software Engineer / Team Lead",
        description: "Multiple projects for the network of clinics, billing department, and automation processes.",
        company: "Intetics",
        startDate: "October 2021",
        endDate: "Present",
        techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, Redis, ElasticSearch, Grafana, Jenkins, AWS (EC2, S3, PostgreSQL)"
    },
    {
        name: "Aras Innovator (PLM)",
        role: "System Architect",
        description: "Low-code platform for faster and more flexible deployments and enterprise applications.",
        company: "Aras",
        startDate: "April 2020",
        endDate: "October 2021",
        techStack: "REST/SOAP, .NET, .NET Core, MS SQL, C#, NAnt, Groovy, JavaScript, Node.js, Git, Active Directory, LDAP, SSO, SAP, IIS, Azure DevOps"
    },
    {
        name: "Aras Innovator (PLM)",
        role: "Senior Software Engineer (.NET)",
        description: "Customizing platform solutions and integrating third-party services.",
        company: "Aras",
        startDate: "April 2019",
        endDate: "April 2020",
        techStack: "REST/SOAP, .NET, .NET Core, MS SQL, C#, NAnt, Groovy, JavaScript, Node.js, Git, Active Directory, LDAP, SSO, SAP, IIS, Azure DevOps"
    },
    {
        name: "Chat Bot (MVP)",
        role: ".NET Developer/Team Lead",
        description: "Onboarding chat bot MVP for new bank employees, providing a short course with learning materials and quizzes.",
        company: "Disprz",
        startDate: "February 2019",
        endDate: "April 2019",
        techStack: "C#, ASP.NET Core WebAPI, Azure Bot Framework, Azure Speech Services, Git, Azure DevOps, Azure Pipelines"
    },
    {
        name: "E-Commerce Platform",
        role: ".NET Developer/Team Lead",
        description: "Platform for multi-level marketing companies with services for accounting, document circulation, reporting, and correspondence.",
        company: "Andersen Labs",
        startDate: "June 2017",
        endDate: "April 2019",
        techStack: "C#, ASP.NET MVC, MS SQL, JavaScript, React, jQuery, Dapper, HTML5, SCSS"
    },
    {
        name: "Vehicle Insurance",
        role: "Junior .NET Developer",
        description: "Insurance policy system for collecting customer information, preliminary data analysis, and forecasting potential offers.",
        company: "Andersen Labs",
        startDate: "December 2016",
        endDate: "June 2017",
        techStack: "C#, ASP.NET MVC, ASP.NET Web API, JavaScript, jQuery, T-SQL, Jira, CSS3"
    }
];