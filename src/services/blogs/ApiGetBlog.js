import { db } from "../../firebase.js";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
    const docRef = doc(db, 'blogs', `${id}`)
    const blog = await getDoc(docRef)

    if (blog) {
        return { ...blog.data(), id: blog.id }
    } else {
        throw new Error("Canot fetch the blog")
    }
}