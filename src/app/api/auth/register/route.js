import { db } from '@/lib/firestore';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password, age } = await req.json();

  if (!email || !password || !name || !age) {
    return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
  }

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await addDoc(usersRef, {
    name,
    email,
    age,
    passwordHash,
    enrolledChallengeIds: [],
    badgesEarned: [],
    createdAt: serverTimestamp(),
  });

  return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }

      return new Response(JSON.stringify({ id: userSnap.id, ...userSnap.data() }), { status: 200 });
    } else {
      const snapshot = await getDocs(collection(db, "users"));
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return new Response(JSON.stringify(users), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch user(s)" }), { status: 500 });
  }
}
