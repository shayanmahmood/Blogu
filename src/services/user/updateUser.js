import { db, auth, storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function updateUser({ userid, userName, firstname, lastname, bio, img, existingImage }) {
    console.log('hi');
    console.log({ userid, userName, firstname, lastname, bio, img, existingImage });

    if (!userid || !firstname || !lastname || !bio) {
        throw new Error('Missing required parameters');
    }

    try {
        let downloadURL = existingImage;

        // If a new image is provided, upload it to Firebase Storage
        if (img) {
            // Create a reference to the new image storage location
            const storageRef = ref(storage, `images/${img.name}`); // Adjust the path as needed

            // Upload the new image
            const snapshot = await uploadBytes(storageRef, img);

            // Get the download URL of the new image
            downloadURL = await getDownloadURL(snapshot.ref);

            // Delete the old image if an existing image URL is provided
            if (existingImage) {
                const oldImageRef = ref(storage, existingImage);
                try {
                    await deleteObject(oldImageRef);
                    console.log(`Deleted old image at ${existingImage}`);
                } catch (deleteError) {
                    console.warn(`Failed to delete old image: ${deleteError.message}`);
                }
            }
        }

        console.log(`New image URL: ${downloadURL}`);
        // Ensure downloadURL is a string
        if (typeof downloadURL !== 'string') {
            throw new Error('Invalid image URL');
        }

        // Update the user in Firestore
        const userRef = doc(db, 'users', userid);
        await updateDoc(userRef, {
            bio,
            firstname,
            lastname,
            userName,
            image: downloadURL
        });

        // Update the current user profile
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: downloadURL
            });
        }

    } catch (error) {
        throw new Error(`Cannot update the user: ${error.message}`);
    }
}
