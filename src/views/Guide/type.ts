export interface commossionModels {
  id: number;
  birthday: string;
  sex: number;
  grade: number;
  number: string;
  doThingNumber: number;
  businessLimit: number;
  departmentId: number;
  idCard: string;
  phone: string;
  goodAt: string;
  address: string;
  name: null;
  status: null;
  headPicture: null;
  token: null;
  password: null;
  department: null;
  account: null;
}

export interface guideModel {
  id: number;
  itemId: number;
  promiseTime: string;
  officeAddress: string;
  addressPhone: string;
  approvalBasis: string;
  processingTime: string;
  guideQuestion: null;
}

export interface itemModel {
  id: number;
  name: string;
  code: string;
  description: string;
  isCharge: number;
  workObject: number;
  itemType: number;
  chargeDescription: string;
  departmentId: number;
  transactType: number;
  materialsList: null;
  department: null;
}
