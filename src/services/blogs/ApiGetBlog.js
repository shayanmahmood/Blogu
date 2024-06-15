import { db } from "../../firebase.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export async function getBlogs() {
    let blogs = []
    const docRef = collection(db, 'blogs')
    const docsSnap = await getDocs(docRef)

    if (docsSnap) {
        docsSnap.forEach(doc => {
            blogs.push({ ...doc.data(), id: doc.id })
        })
        return blogs
    } else {
        return false
    }
}

export async function getBlog(id) {
    const comments = []
    const docRef = doc(db, 'blogs', `${id}`)
    const blog = await getDoc(docRef)

    const commentsRef = collection(db, 'blogs', `${id}`, 'comments');

    const querySnapshot = await getDocs(commentsRef);

    querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
    });


    if (blog) {
        return { ...blog.data(), id: blog.id, comments }
    } else {
        throw new Error("Canot fetch the blog")
    }
}



export async function setBlog({ desc, userId, userName, category, img, title }) {
    if (!desc || !userId || !userName || !category || !img || !title) {
        throw new Error('Missing required parameters');
    }

    try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${img.name}`); // Adjust the path as needed

        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, img);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Add the blog to Firestore
        const collectionRef = collection(db, 'blogs');
        await addDoc(collectionRef, {
            Blog: desc,
            autherId: userId,
            author: userName,
            category: category,
            created_at: serverTimestamp(),
            image: downloadURL,
            title: title
        });
    } catch (error) {
        throw new Error(`Cannot add the blog: ${error.message}`);
    }
}




export async function updateBlog({ blogid, desc, userId, userName, category, img, title, existingImageURL }) {
    if (!blogid || !desc || !userId || !userName || !category || !title) {
        throw new Error('Missing required parameters');
    }

    try {
        let downloadURL = existingImageURL;

        // If a new image is provided, upload it to Firebase Storage
        if (img) {
            const storage = getStorage();
            // Create a reference to the new image storage location
            const storageRef = ref(storage, `images/${img.name}`); // Adjust the path as needed

            // Upload the new image
            const snapshot = await uploadBytes(storageRef, img);

            // Get the download URL of the new image
            downloadURL = await getDownloadURL(snapshot.ref);

            // Delete the old image if an existing image URL is provided
            if (existingImageURL) {
                const oldImageRef = ref(storage, existingImageURL);
                try {
                    await deleteObject(oldImageRef);
                    console.log(`Deleted old image at ${existingImageURL}`);
                } catch (deleteError) {
                    console.warn(`Failed to delete old image: ${deleteError.message}`);
                }
            }
        }

        console.log(`New image URL: ${downloadURL}`);

        // Update the blog in Firestore
        const blogRef = doc(db, 'blogs', blogid);
        await updateDoc(blogRef, {
            Blog: desc,
            authorId: userId,
            author: userName,
            category: category,
            updated_at: serverTimestamp(),
            image: downloadURL,
            title: title
        });
    } catch (error) {
        throw new Error(`Cannot update the blog: ${error.message}`);
    }
}



export async function deleteBlog(id) {
    const docRef = doc(db, 'blogs', id);
    await deleteDoc(docRef)
}

export async function AddComments({ blogId, userId, name, comment, }) {
    console.log(blogId)
    const commentsCollectionRef = collection(db, 'blogs', `${blogId}`, 'comments');
    await addDoc(commentsCollectionRef, {
        author: name,
        comment: comment,
        created_at: serverTimestamp(),
        userId: userId
    });
}

export async function deleteComment({ blogid, commentId }) {
    const commentRef = doc(db, 'blogs', blogid, 'comments', commentId);
    await deleteDoc(commentRef);
}




export async function getBlogsByUserId(id) {
    let blogs = [];
    try {
        const docRef = collection(db, 'blogs');
        const q = query(docRef, where('autherId', '==', id));
        const docsSnap = await getDocs(q);

        if (!docsSnap.empty) {
            docsSnap.forEach(doc => {
                blogs.push({ ...doc.data(), id: doc.id });
            });
            return blogs;
        } else {
            console.log('No blogs found for the specified authorId.');
            return false;
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return false;
    }
}
