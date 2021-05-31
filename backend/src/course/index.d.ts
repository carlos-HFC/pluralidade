export interface ICreateCourse {
  name: string;
  description: string;
  period: string;
  initDate: string;
  endDate: string;
  spots: number;
  pcd: boolean;
}

export interface IUpdateCourse extends Partial<ICreateCourse> {
  closed?: boolean;
}