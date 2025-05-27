import { Link } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"




const DashboardHeader = () => {



  const handleLogout = async () => {
    await signOut(auth)
  }


  return (
    <div className="w-full items-center flex h-10 px-4 mb-4 bg-red-500 rounded-lg text-white font-medium gap-4">
      <Link to='/dashboard'>
        Dashboard
      </Link>
      <Link to='/dashboard/new'>
        Cadastrar carro
      </Link>

      <button className="ml-auto cursor-pointer" onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}

export default DashboardHeader