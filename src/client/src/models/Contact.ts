import profilePhoto from "../shared/img/profile-photo.jpeg";
import { cvData } from "../data/cv";

export interface Contact {
    birthdate: string;
    name: string;
    title: string;
    avatar: string;
    location: string;
    skype: string;
    email: string;
    github: string;
    linkedin: string;
}

export const contactDataMock: Contact = {
    ...cvData.contact,
    avatar: profilePhoto.src,
};
