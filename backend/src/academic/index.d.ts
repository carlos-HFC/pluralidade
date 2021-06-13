export type CreateAcademic = {
  name: string;
  institution: string;
  initDate: string;
  endDate: string;
  grade: string;
  finished: boolean;
  userId: number;
};

export type UpdateAcademic = Partial<CreateAcademic>;