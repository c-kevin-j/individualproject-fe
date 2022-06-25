import { useRouter } from 'next/router';
import CardResetPass from '../../../Components/Login/ResetPass'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { token }=router.query;
  
  return(
    <CardResetPass token={token}/>
  )
}

export default ResetPasswordPage
