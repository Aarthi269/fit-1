'use server';

import { db } from '@/lib/firestore.jsx';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function createChallenge(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const durationDays = parseInt(formData.get('durationDays'), 10);
  const type = formData.get('type');
  const rules = formData.get('rules');

  await addDoc(collection(db, 'challenges'), {
    title,
    description,
    durationDays,
    type,
    rules,
    isPublic: true,
    creatorId: 'system',
    createdAt: serverTimestamp(),
    predefinedTasks: [],
  });
}
