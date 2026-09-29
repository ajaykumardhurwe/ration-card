export interface RationCard {
  _id?: string;
  id?: string;
  district: string;
  block: string;
  gramPanchayat: string;
  rationCardName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  totalFamilyMembers: number;
}

export interface District {
  name: string;
  blocks: Block[];
}

export interface Block {
  name: string;
  gramPanchayats: string[];
}
