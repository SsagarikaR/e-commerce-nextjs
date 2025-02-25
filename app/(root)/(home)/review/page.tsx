'use client';
import { useSearchParams } from 'next/navigation';
import AddReview from '@/app/components/review/AddReview';

const ProfilePage = () => {
  const searchParams = useSearchParams(); // Access query parameters from URL
  const pid = searchParams.get('pid'); // Get the `pid` query param

  if (!pid) {
    return (
      <div>
        <p>No Product ID (pid) provided.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Product ID: {pid}</h1>
      <AddReview pid={pid} /> {/* Pass pid to AddReview component */}
    </div>
  );
};

export default ProfilePage;
