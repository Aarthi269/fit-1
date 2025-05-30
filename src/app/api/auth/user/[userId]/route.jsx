
import { db } from '@/lib/firestore';
import { doc, getDoc,updateDoc , arrayUnion } from 'firebase/firestore';

export async function GET(req, { params }) {
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
    });
  }
    
  try {
    const ref = doc(db, 'users', userId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ id: snap.id, ...snap.data() }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(request, { params }) {
  const { userId } = params;
  const { challengeId } = await request.json();

  console.log("PATCH request received for userId:", userId, "with challengeId:", challengeId);

  const userRef = doc(db, 'users', userId);

  try {
    await updateDoc(userRef, {
      enrolledChallengeIds: arrayUnion(challengeId),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user challenge list:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}