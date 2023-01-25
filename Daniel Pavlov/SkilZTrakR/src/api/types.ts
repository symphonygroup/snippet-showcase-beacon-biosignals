import { URLParams } from '../types/params';

// User
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  role: string,
};
export type UserList = Array<User>;

export type UserSliceState = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  role: string,
  loading: boolean,
  error: any,
}

export enum UserRole {
  Admin = 'ROLE_ADMIN',
  User = 'ROLE_USER',
}

// Skills
export type Skill = {
  name: string;
  levelOfExpertise: number;
  skillGroups: string[];
  assessmentStatus: string;
  comment: string;
};

export type SkillsSliceState = {
  list: Skill[],
  hasMore: boolean,
  loading: boolean,
  params: URLParams,
  error: any,
}


export enum SkillsTabs {
  Pending = 'Pending',
  Completed = 'Completed',
  All = 'All',
}

// Organization
export enum OrganizationTabs {
  Skills = 'Skills',
  SkillGroups = 'Skill groups',
  Employees = 'Employees',
  EmployeeGroups = 'Employee groups',
}

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: string;
  role: string;
  skills: Array<string>;
};
export type EmployeeList = Array<Employee>;
