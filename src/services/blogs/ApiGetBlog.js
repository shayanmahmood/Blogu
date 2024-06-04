import { useParams } from "react-router-dom";
import { db } from "../../firebase.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc } from "firebase/firestore";



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

