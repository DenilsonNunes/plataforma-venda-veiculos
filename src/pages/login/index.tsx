import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

import Container from "../../components/container"
import Input from '../../components/input'


import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'
import { useEffect } from 'react'
import toast from 'react-hot-toast'




const schema = z.object({
  email: z.string().email('Insira um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório')
})


type FormData = z.infer<typeof schema>



const Login = () => {

  const navigate = useNavigate();


  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    const handleLogout = async () => {
      await signOut(auth)
    }

    handleLogout();
  }, [])




  const onSubmit = (data: FormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) => {
      toast.success('Logado com sucesso!')
      navigate('/dashboard', {replace: true})
    })
    .catch((error) => {
      toast.error('Erro ao fazer login')
    }) 
  }


  return (
    <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        <Link to='/' className='mb-6 w-full max-w-sm'>
          <img src={logoImg} alt="Logo do site" className='w-full'/>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} 
          className='w-full max-w-xl p-4 rounded-lg flex flex-col bg-white'
        >
          <div className='mb-3'>
            <Input 
              type='email' 
              placeholder='Digite seu email...' 
              name='email'
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className='mb-3'>
            <Input 
              type='password' 
              placeholder='Digite sua senha...' 
              name='password'
              error={errors.password?.message}
              register={register}
            />
          </div>
          <button type='submit' className='w-full h-10 bg-zinc-900 text-white font-medium rounded-md'>Acessar</button>
        </form>

        <Link to='/register'>
          Ainda não possui uma conta ? Cadastre-se
        </Link>

      </div>
    </Container>
  )
}

export default Login