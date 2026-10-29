import { cvData } from '../data/cv';
import { Contact, contactDataMock } from "../models/Contact";
import { Education } from "../models/Education";
import { Experience } from "../models/Experience";
import { Project, projectDataMock } from "../models/Project";
import { SkillCategory, skillCategoriesDataMock } from "../models/Skill";

export const getContactInfodmation = (): Contact => contactDataMock;
export const getExperienceInformation = (): Experience[] => cvData.experience;
export const getEducationInformation = (): Education[] => cvData.education;
export const getProjectsInformation = (): Project[] => projectDataMock;
export const getSkillCategoriesInformation = (): SkillCategory[] => skillCategoriesDataMock;
