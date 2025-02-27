export interface Contact {
    birthdate: string;
    name: string;
    title: string;
    avatar: string;
    location: string;
    phone: string;
    skype: string;
    email: string;
    github: string;
}

export const contactDataMock: Contact = {
    name: "Andrei Zubrytski",
    title: "Senior .NET Engineer",
    avatar: "your-avatar-url.jpg",
    birthdate: "30.11.1991",
    location: "Tbilisi, Georgia",
    phone: "+995 591 141 320",
    skype: "live:azubrytski.dev",
    email: "azubrytski.dev@gmail.com",
    github: "azubrytski-dev",
};