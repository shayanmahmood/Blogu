import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 

// Function to search blogs by partial title match
export async function searchBlogsByPartialTitle(partialTitle) {
    const blogsRef = collection(db, "users");
    const q = query(blogsRef, where("firstname", ">=", partialTitle), where("firstname", "<=", partialTitle + '\uf8ff'));

    try {
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });
        return results;
    } catch (error) {
        console.error("Error searching blogs: ", error);
        throw new Error("Error searching blogs");
    }
}
