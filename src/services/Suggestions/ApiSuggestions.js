import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
export async function SetSuggestion({ name, email, suggestion }) {
    if (!name || !email || !suggestion) {
        throw new Error('Missing required parameters');
    }

    try {
        const collectionRef = collection(db, 'Suggestions');
        await addDoc(collectionRef, {
            name: name,
            email: email,
            suggestion: suggestion,
            timeStamp: serverTimestamp()
        });
    } catch (error) {
        throw new Error(`Cannot add the suggestion: ${error.message}`);
    }
}


export async function getSuggestions() {
    try {
        const collectionRef = collection(db, 'Suggestions');
        const querySnapshot = await getDocs(collectionRef);

        const suggestions = [];
        querySnapshot.forEach((doc) => {
            suggestions.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return suggestions;
    } catch (error) {
        throw new Error(`Cannot fetch suggestions: ${error.message}`);
    }
}