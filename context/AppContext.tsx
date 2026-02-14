import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead, Project } from '../types';
import { INITIAL_PROJECTS } from '../constants';

interface AppContextType {
  // Data
  projects: Project[];
  leads: Lead[];
  
  // User State
  isLeadCaptured: boolean; // Has the normal user submitted the form?
  userToken: string | null; // Simulating a secure token
  
  // Admin State
  isAdminLoggedIn: boolean;
  
  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'submittedAt'>) => void;
  addProject: (project: Project) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedProjects = localStorage.getItem('luxe_projects');
    const storedLeads = localStorage.getItem('luxe_leads');
    const storedToken = localStorage.getItem('luxe_user_token');
    const storedAdminAuth = localStorage.getItem('luxe_admin_auth');

    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedLeads) setLeads(JSON.parse(storedLeads));
    if (storedToken) {
      setUserToken(storedToken);
      setIsLeadCaptured(true);
    }
    if (storedAdminAuth === 'true') setIsAdminLoggedIn(true);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('luxe_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('luxe_leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData: Omit<Lead, 'id' | 'submittedAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    
    setLeads((prev) => [newLead, ...prev]);
    
    // Generate and store token
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setUserToken(token);
    setIsLeadCaptured(true);
    localStorage.setItem('luxe_user_token', token);
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const loginAdmin = (password: string) => {
    if (password === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('luxe_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('luxe_admin_auth');
  };

  const resetDemo = () => {
    localStorage.clear();
    setProjects(INITIAL_PROJECTS);
    setLeads([]);
    setIsLeadCaptured(false);
    setUserToken(null);
    setIsAdminLoggedIn(false);
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        leads,
        isLeadCaptured,
        userToken,
        isAdminLoggedIn,
        addLead,
        addProject,
        loginAdmin,
        logoutAdmin,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};