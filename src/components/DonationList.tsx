import { useState } from 'react';
import { DonationItem } from '../types/donation';
import { useDonationStore } from '../store/donationStore';

export function DonationList() {
  const items = useDonationStore((state) => state.items);
  const [selectedCategory, setSelectedCategory] = useState<DonationItem['category'] | 'All'>('All');

  const categories: (DonationItem['category'] | 'All')[] = [
    'All',
    'Books',
    'Clothes',
    'Electronics',
    'School Supplies',
    'Furniture',
    'Other'
  ];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="donations">
      <h2>Available Items</h2>
      
      <div className="category-filter">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as DonationItem['category'] | 'All')}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {filteredItems.length > 0 ? (
        <ul className="donation-list">
          {filteredItems.map((item) => (
            <li key={item.id} className="donation-item">
              <div className="donation-header">
                <span className="item-title">{item.title}</span>
                <span className={`item-condition condition-${item.condition.toLowerCase()}`}>
                  {item.condition}
                </span>
              </div>
              <span className="item-category">{item.category}</span>
              <p className="item-description">{item.description}</p>
              <div className="item-footer">
                <span className="donor-info">
                  Contact: <a href={`mailto:${item.contactInfo}`}>{item.donor}</a>
                </span>
                <span className="donation-date">
                  Listed on {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available in this category. Be the first to donate!</p>
      )}
    </div>
  );
}