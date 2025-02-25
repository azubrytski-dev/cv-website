export interface Technology {
    name: string;
    title: string;
    description: string;
    rate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const technologies: Technology[] = [
    { name: ".NET Core", title: ".NET Core", description: "A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications." },
    { name: "React", title: "React", description: "A JavaScript library for building user interfaces." },
    { name: "MongoDB", title: "MongoDB", description: "A document database with the scalability and flexibility that you want with the querying and indexing that you need." },
    { name: "RabbitMQ", title: "RabbitMQ", description: "An open-source message-broker software that originally implemented the Advanced Message Queuing Protocol (AMQP)." },
    { name: "MSSQL", title: "Microsoft SQL Server", description: "A relational database management system developed by Microsoft." },
    { name: "AWS", title: "Amazon Web Services", description: "A comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally." },
    { name: "CouchDB", title: "CouchDB", description: "An open-source NoSQL document-oriented database." },
    { name: "REST/SOAP", title: "REST/SOAP", description: "Architectural styles for designing networked applications." },
    { name: ".NET", title: ".NET", description: "A free, cross-platform, open-source developer platform for building many different types of applications." },
    { name: "Azure DevOps", title: "Azure DevOps", description: "A set of development tools provided by Microsoft to support software development teams." },
    { name: "C#", title: "C#", description: "A modern, object-oriented, and type-safe programming language." },
    { name: "ASP.NET Core", title: "ASP.NET Core", description: "A cross-platform, high-performance framework for building modern, cloud-based, Internet-connected applications." },
    { name: "Azure", title: "Microsoft Azure", description: "A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers." },
    { name: "ASP.NET MVC", title: "ASP.NET MVC", description: "A web application framework developed by Microsoft, which implements the model–view–controller (MVC) pattern." },
    { name: "Dapper", title: "Dapper", description: "A simple object mapper for .NET." },
    { name: "JavaScript", title: "JavaScript", description: "A programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS." }
];
