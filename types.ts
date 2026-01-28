
import React from 'react';

export type Sector = 'Drug' | 'Cosmetic' | 'Food' | 'Construction' | 'Chemical' | 'Electrical' | 'Mechanical' | 'Textile';
export type Status = 'Review Required' | 'Approved' | 'Rejected';
export type TimeFilter = 'Today' | 'Last Week' | 'Last Month' | 'Last Year' | 'All Time';
export type Language = 'en' | 'ar';

export interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface Attachment {
  type: string;
  name: string;
  url: string;
}

export interface Submission {
  id: string;
  reference: string;
  sector: Sector;
  productNameEn: string;
  productNameAr: string;
  applicant: string;
  status: Status;
  confidenceScore: number;
  date: string;
  details?: {
    manufacturer: string;
    origin: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    lastUpdated: string;
    description: string;
    justification: string;
    attachments: Attachment[];
    timeline: TimelineStep[];
  };
}

export interface KPIData {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type AppView = 'dashboard' | 'company' | 'review' | 'analytics';
export type ReviewSubTab = 'review' | 'applicant';
