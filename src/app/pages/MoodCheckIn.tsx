import { Navigate } from 'react-router';

export default function MoodCheckIn() {
  return <Navigate to="/personal?tab=mood-check" replace />;
}
