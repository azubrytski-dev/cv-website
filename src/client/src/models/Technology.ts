export interface Technology {
    name: string;
    title: string;
    description: string;
    rate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const technologies: Technology[] = [
    { name: "dotnercore", title: ".NET Core", description: "A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications.", rate: 8 },
    { name: "react", title: "React", description: "A JavaScript library for building user interfaces.", rate: 7 },
    { name: "mongodb", title: "MongoDB", description: "A document database with the scalability and flexibility that you want with the querying and indexing that you need.", rate: 7 },
    { name: "rabbitmq", title: "RabbitMQ", description: "An open-source message-broker software that originally implemented the Advanced Message Queuing Protocol (AMQP).", rate: 7 },
    { name: "mssql", title: "Microsoft SQL Server", description: "A relational database management system developed by Microsoft.", rate: 8 },
    { name: "aws", title: "Amazon Web Services", description: "A comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.", rate: 8 },
    { name: "couchdb", title: "CouchDB", description: "An open-source NoSQL document-oriented database.", rate: 7 },
    { name: "restsoap", title: "REST/SOAP", description: "Architectural styles for designing networked applications.", rate: 7 },
    { name: "dotnet", title: ".NET", description: "A free, cross-platform, open-source developer platform for building many different types of applications.", rate: 8 },
    { name: "azure-devops", title: "Azure DevOps", description: "A set of development tools provided by Microsoft to support software development teams.", rate: 8 },
    { name: "csharp", title: "C#", description: "A modern, object-oriented, and type-safe programming language.", rate: 8 },
    { name: "aspnet-core", title: "ASP.NET Core", description: "A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications.", rate: 8 },
    { name: "azure", title: "Microsoft Azure", description: "A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.", rate: 8 },
    { name: "aspnet-mvc", title: "ASP.NET MVC", description: "A web application framework developed by Microsoft, which implements the model-view-controller (MVC) pattern.", rate: 7 },
    { name: "dappet", title: "Dapper", description: "A simple object mapper for .NET.", rate: 7 },
    { name: "javascript", title: "JavaScript", description: "A programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.", rate: 8 },
    { name: "entity-framework", title: "Entity Framework", description: "An open-source object-relational mapper for ADO.NET, part of the .NET Framework.", rate: 7 }
];
