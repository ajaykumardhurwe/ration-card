export interface District {
  id: number;
  districtName: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface Block {
  id: number;
  districtId: number;
  blockName: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface GramPanchayat {
  id: number;
  blockId: number;
  gramPanchayatName: string;
  isActive?: boolean;
  createdAt?: string;
}