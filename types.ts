export interface Configuration {
  type: string; // e.g., "2 BHK"
  size: string; // e.g., "1200 Sq. Ft."
  price: string; // e.g., "₹ 1.5 Cr"
}

export interface Project {
  id: string;
  name: string;
  location: string;
  startingPrice: string;
  image: string;
  description: string;
  amenities: string[];
  configurations: Configuration[];
  isFeatured?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  buyingFor: 'Self' | 'Investment';
  budget: string;
  interestedConfig: string;
  submittedAt: string;
  projectId?: string; // The project they were trying to view
}

export interface AdminStats {
  totalLeads: number;
  totalProjects: number;
  recentLeads: Lead[];
}
