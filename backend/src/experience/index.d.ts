export type CreateExperience = {
  company: string;
  office: string;
  initDate: string;
  endDate: string;
  current: boolean;
  volunteer: boolean;
  userId: number;
};

export type UpdateExperience = Partial<CreateExperience>;