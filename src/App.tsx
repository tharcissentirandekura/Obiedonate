import { useState } from 'react';
import { DonationForm } from './components/DonationForm';
import { DonationList } from './components/DonationList';
import { DonationFormData } from './types/donation';
import { useDonationStore } from './store/donationStore';
import './App.css';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addItem = useDonationStore((state) => state.addItem);

  const handleDonation = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      addItem(data);
      alert('Thank you for your donation! Your item has been listed.');
    } catch (error) {
      alert('Failed to list your item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Oberlin Student Donations</h1>
        <p>Share resources with your fellow Oberlin students</p>
      </header>
      <main className="main">
        <DonationList />
        <DonationForm onSubmit={handleDonation} isSubmitting={isSubmitting} />
      </main>
    </div>
  );
}

export default App;