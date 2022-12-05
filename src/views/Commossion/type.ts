export interface item_details {
  chargeDescription: string;
  code: string;
  department: department;
  departmentId: number;
  description: string;
  id: number;
  isCharge: number;
  itemType: number;
  materialsList: Array<materials_list>;
  name: string;
  transactType: number;
  workObject: number;
}

export interface department {
  description: string;
  id: number | null;
  name: string;
}

export interface materials_list {
  id: number;
  itemId: number;
  materialsServiceApplyModel: null;
  name: string;
  templateLink: string;
}

export interface params_type {
  name: string;
  phone: string;
  commissionId: number | null;
  itemId: number | null;
  type: number | null;
  company: string;
  idCard: string;
  address: string;
  status: number | null;
  materialsServiceApplyList: Array<Array<materials_type>>;
}

export interface materials_type {
  materialsId: string;
  materialsLink: string;
  serviceApplyId: string;
}
export interface commossion_type {
  birthday: string;
  businessLimit: number;
  doThingNumber: number;
  goodAt: string;
  grade: number;
  headPicture: string;
  id: number;
  idCard: string;
  name: string;
  phone: string;
  sex: number;
}
