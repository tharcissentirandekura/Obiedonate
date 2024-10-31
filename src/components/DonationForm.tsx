import { useState } from 'react';
import { DonationFormData } from '../types/donation';

interface Props {
  onSubmit: (data: DonationFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function DonationForm({ onSubmit, isSubmitting }: Props) {
  const [formData, setFormData] = useState<DonationFormData>({
    title: '',
    category: 'Books',
    condition: 'Good',
    description: '',
    donor: '',
    contactInfo: '',
  });

  const categories: DonationFormData['category'][] = [
    'Books',
    'Clothes',
    'Electronics',
    'School Supplies',
    'Furniture',
    'Other',
  ];

  const conditions: DonationFormData['condition'][] = [
    'New',
    'Like New',
    'Good',
    'Fair',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      category: 'Books',
      condition: 'Good',
      description: '',
      donor: '',
      contactInfo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h2>Donate an Item</h2>
      <div className="form-group">
        <label htmlFor="title">Item Name</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="e.g., Calculus Textbook"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value as DonationFormData['category'],
            })
          }
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <select
          id="condition"
          value={formData.condition}
          onChange={(e) =>
            setFormData({
              ...formData,
              condition: e.target.value as DonationFormData['condition'],
            })
          }
          required
        >
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          required
          placeholder="Describe the item, including any relevant details..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="donor">Your Name</label>
        <input
          type="text"
          id="donor"
          value={formData.donor}
          onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactInfo">
          Contact Info (Oberlin Email or OPL ID)
        </label>
        <input
          type="email"
          id="contactInfo"
          value={formData.contactInfo}
          onChange={(e) =>
            setFormData({ ...formData, contactInfo: e.target.value })
          }
          required
          pattern=".+@oberlin\.edu"
          placeholder="youremail@oberlin.edu"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'List Item for Donation'}
      </button>
    </form>
  );
}
