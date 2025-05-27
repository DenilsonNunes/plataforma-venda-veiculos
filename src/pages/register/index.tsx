import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

import Container from "../../components/container"
import Input from '../../components/input'


import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'




const schema = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  email: z.string().email('Insira um email válido').nonempty('O campo email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').nonempty('O campo senha é obrigatório')
})


type FormData = z.infer<typeof schema>



const Register = () => {

  const navigate = useNavigate();

  const { handleInfoUser } = useContext(AuthContext)



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
  

  const onSubmit = async (data: FormData) => {

    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=> {
      await updateProfile(user.user, {
        displayName: data.name
      })

      handleInfoUser({
        name: data.name,
        email: data.email,
        uid: user.user.uid
      })

      navigate('/dashboard', {replace: true})

    })
    .catch((error) => {

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
              type='text' 
              placeholder='Digite seu nome completo...' 
              name='name'
              error={errors.name?.message}
              register={register}
            />
          </div>

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

          <button type='submit' className='w-full h-10 bg-zinc-900 text-white font-medium rounded-md'>Cadastrar</button>
        
        </form>

        <Link to='/login'>
          Já possui uma conta ? faça o login!
        </Link>

      </div>
    </Container>
  )
}

export default Register