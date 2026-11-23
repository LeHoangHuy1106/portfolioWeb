export type Language = 'vi' | 'en';
export type Localized = {vi:string;en:string};
export type MiniGame = {id:string;name:string;type?:string;description?:Localized;image?:string};
export type ProjectFeature = {
  id:string;title:Localized;description:Localized;image:string;imageType?:'illustration'|'screenshot';
};
export type Project = {
  id:string;name:string;year:string;kind:'flagship'|'archive';status:'in-development'|'released'|'prototype'|'archived';
  category:Localized;description:Localized;summary:Localized;cover:string;gallery:string[];technologies:string[];
  link:string;featured:boolean;miniGames:MiniGame[];
  features?:ProjectFeature[];displayMode?:'phone'|'wide';
};
export type SkillGroup = {id:string;name:Localized;description:Localized;items:string[]};
export type Social = {id:string;label:string;url:string};
export type Experience = {id:string;period:string;role:Localized;company:string;description:Localized};
export type PortfolioData={
  site:{brand:string;logo:string;email:string;heroImage:string;headline:Localized;intro:Localized;subline:Localized};
  about:{lead:Localized;bio:Localized;location:Localized;education:Localized;cv?:string};
  projects:Project[];skills:SkillGroup[];socials:Social[];experience:Experience[];
};
