import { db } from '@/lib/firestore';
import {collection, getDocs,} from 'firebase/firestore';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'challenges'));
    const challenges = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(challenges);
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch challenges' }), { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const docRef = await addDoc(collection(db, 'challenges'), body);

    return new Response(JSON.stringify({ id: docRef.id, ...body }), { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return new Response(JSON.stringify({ error: 'Failed to add challenge' }), { status: 500 });
  }
}



