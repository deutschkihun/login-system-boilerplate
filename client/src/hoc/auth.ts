import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "../_actions/user_actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent: any,option:Boolean) {

    function AuthenticationCheck(props: any){
         const dispatch = useDispatch();

    useEffect(() => {
        async function authCheck() {
            const response = await dispatch(auth())
            if(!response.payload.isAuth && option) {
                props.history.push('/');
            } else if(response.payload.isAuth && !option){
                props.history.push('/menu')
            }
    }
        authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        SpecificComponent()
    );
    } 
    return AuthenticationCheck
}