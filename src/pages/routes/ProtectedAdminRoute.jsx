// import { getAuth } from 'firebase/auth';
// import { Navigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// const ProtectedAdminRoute = ({ children }) => {
//     const auth = getAuth();
//     const adminUid = 'KoxXevbVQEN4Rt3DgkaKqP4Tt0D2';

//     if (auth.currentUser && auth.currentUser.uid === adminUid) {
//         return children;
//     } else {
//         toast.error('You do not have permission to access this page.');
//         return <Navigate to='/home' replace />;
//     }
// };

// export default ProtectedAdminRoute;
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { db } from '../../firebase'; // Import your Firebase configuration
import Spinner from '../../components/Spinner';

const ProtectedAdminRoute = ({ children }) => {
    const auth = getAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const adminsRef = collection(db, 'admin');
                const snapshot = await getDocs(adminsRef);
                const adminDocs = snapshot.docs.map(doc => doc.data());
                const currentUserUid = auth.currentUser.uid;
                const currentUserEmail = auth.currentUser.email;
                
                // Check if either UID or email matches with admin data
                setIsAdmin(adminDocs.some(doc => doc.uid === currentUserUid || doc.email === currentUserEmail));
            } catch (error) {
                console.error('Error fetching admins:', error);
                toast.error('Failed to fetch admin data.');
            } finally {
                setLoading(false);
            }
        };

        if (auth.currentUser) {
            fetchAdmins();
        }
    }, [auth.currentUser]);

    if (loading) {
        // Return loading state
        return <Spinner />;
    }

    if (isAdmin) {
        // Return children if user is admin
        return children;
    } else {
        // Redirect to home if user is not admin
        toast.error('You do not have permission to access this page.');
        return <Navigate to='/home' replace />;
    }
};

export default ProtectedAdminRoute;
