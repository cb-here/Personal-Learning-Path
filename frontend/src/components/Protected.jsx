import {Navigate} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { userProfile } from '../../services/api';

function Protected({children}) {
    const token = localStorage.getItem("token")

    const {isError} = useQuery({
        queryKey: ['userProfile'],
        queryFn: userProfile,
        enabled: !!token,
        retry: false
    })
    if (!token || isError) {
        return <Navigate to="/login" replace />;
    }

    return children
}

export default Protected