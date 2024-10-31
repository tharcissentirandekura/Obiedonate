export interface DonationItem {
  id: number;
  title: string;
  category: 'Books' | 'Clothes' | 'Electronics' | 'School Supplies' | 'Furniture' | 'Other';
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  description: string;
  imageUrl?: string;
  donor: string;
  contactInfo: string;
  createdAt: string;
  available: boolean;
}

export interface DonationFormData {
  title: string;
  category: DonationItem['category']; // Donationitem.category;
  condition: DonationItem['condition']; // DonationItem.condition;
  description: string;
  imageUrl?: string;
  donor: string;
  contactInfo: string;
}
