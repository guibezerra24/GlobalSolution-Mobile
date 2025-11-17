// src/types/Track.ts

export type EnrollmentStatus = 'not_enrolled' | 'enrolled' | 'completed';

export type TrackLevel = 'iniciante' | 'intermediario' | 'avancado';

export type Track = {
  id: string;
  title: string;
  description: string;
  level: TrackLevel | string;
  workloadHours: number;
  skills: string[]; // no MockAPI, vamos salvar como array simples
  enrollmentStatus: EnrollmentStatus | string;
  progress: number; // 0 a 100
  createdAt?: string;
  updatedAt?: string;
};
