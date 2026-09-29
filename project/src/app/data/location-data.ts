import { District } from '../models/ration-card.model';

export const DISTRICTS: District[] = [
  {
    name: 'Lucknow',
    blocks: [
      { name: 'Sarojini Nagar', gramPanchayats: ['Banthra', 'Itaunja', 'Kakori'] },
      { name: 'Bakshi Ka Talab', gramPanchayats: ['Gosainganj', 'Mohanlalganj', 'Malihabad'] },
    ],
  },
  {
    name: 'Kanpur Nagar',
    blocks: [
      { name: 'Bilhaur', gramPanchayats: ['Bilhaur', 'Dhasian', 'Mandhana'] },
      { name: 'Ghatampur', gramPanchayats: ['Ghatampur', 'Bithoor', 'Rura'] },
    ],
  },
  {
    name: 'Varanasi',
    blocks: [
      { name: 'Harahua', gramPanchayats: ['Harahua', 'Kashi Vidyapeeth', 'Cholapur'] },
      { name: 'Sevapuri', gramPanchayats: ['Sevapuri', 'Araziline', 'Pindra'] },
    ],
  },
  {
    name: 'Prayagraj',
    blocks: [
      { name: 'Phulpur', gramPanchayats: ['Phulpur', 'Mauaima', 'Bahria'] },
      { name: 'Karchhana', gramPanchayats: ['Karchhana', 'Handia', 'Barangaon'] },
    ],
  },
  {
    name: 'Agra',
    blocks: [
      { name: 'Fatehpur Sikri', gramPanchayats: ['Fatehpur Sikri', 'Achhnera', 'Kiraoli'] },
      { name: 'Bah', gramPanchayats: ['Bah', 'Firozabad', 'Pinahat'] },
    ],
  },
];
