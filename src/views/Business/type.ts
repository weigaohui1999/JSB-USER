export interface department_list {
  description: string;
  id: number;
  name: string;
}

export interface item_list {
  chargeDescription: string;
  code: string;
  department: object | null;
  departmentId: number;
  description: string;
  id: number;
  isCharge: number;
  itemType: number;
  materialsList: Array<object> | null;
  name: string;
  transactType: number;
  workObject: number;
}
