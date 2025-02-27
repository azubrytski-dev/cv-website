import { Contact, contactDataMock } from "../models/Contact";
import { Education, educationDataMock } from "../models/Education";
import { Experience, experienceDataMock } from "../models/Experience";
import { Project, projectDataMock } from "../models/Project";

export const getContactInfodmation = (): Contact => contactDataMock;
export const getExperienceInformation = (): Experience[] => experienceDataMock;
export const getEducationInformation = (): Education[] => educationDataMock;
export const getProjectsInformation = (): Project[] => projectDataMock;