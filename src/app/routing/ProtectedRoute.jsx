import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ROUTES } from '@/configs/routes'

export default function ProtectedRoute({ guard, children, fallback = ROUTES?.FRONT?.BASE }) {
    const params = useParams()
    const [isAllowed, setIsAllowed] = useState(null)

    useEffect(() => {
        guard(params).then((isAllowed) => setIsAllowed(isAllowed))
    }, [guard, params])


    return isAllowed === null
        ? (<>Chargement...</>)
        : isAllowed
            ? children ?? <Outlet/>
            : <Navigate to={ fallback } replace/>
}