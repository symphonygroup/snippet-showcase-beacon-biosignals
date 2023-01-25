import axios from 'axios';
import { User, Skill, Employee } from './types';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_PREFIX,
  withCredentials: true,
});

const auth = {
  login: (params: any) => http.get<User>('/login', { params }),
  logout: () => http.post<User>('/logout'),
};

const skills = {
  pending: (params: URLSearchParams) => http.get<Skill[]>('/employee/skills/pending', { params }),
};

const organization = {
  allEmployees: (params: URLSearchParams) =>
    http.get<Employee[]>('/admin/employees/all', { params }),
  allSkillNames: () =>
    http.get<string[]>('/admin/skills/all'),
  createSkill: (data: { skillName: string; infoLink: string }) =>
    http.post('/admin/skills/create', data),
  createSkillGroup: (data: {
    skillGroupName: string;
    skills: [{ value: string; label: string }];
  }) => http.post('/admin/skill/group/create', data),
  inviteEmployees: (emails: { employeeEmails: string[] }) =>
    http.post<{ numberOfValidEmails: number; status: string }>(
      '/admin/employees/invite',
      emails
    ),
};

const api = {
  auth,
  skills,
  organization,
};

export default api;
