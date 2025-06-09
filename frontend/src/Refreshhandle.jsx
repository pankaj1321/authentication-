import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Refreshhandle({setUserAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setUserAuthenticated(true);

            if (location.pathname === '/login' ||
                location.pathname === '/signup' 
            ) {
                navigate('/home', { replace: false });
            }
        }


    }, [location.pathname,token])
    return (
        null
    )
}

export default Refreshhandle