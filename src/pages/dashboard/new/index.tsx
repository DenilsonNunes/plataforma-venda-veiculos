import { FiUpload } from "react-icons/fi"

import Container from "../../../components/container"
import DashboardHeader from "../../../components/panelheader"
import Input from "../../../components/input"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"




const schema = z.object({

  name: z.string().nonempty('O campo nome é obrigatório'),
  model: z.string().nonempty('O modelo é obrigatório'),
  year: z.string().nonempty('O ano do carro é obrigatório'),
  km: z.string().nonempty('O Km do carro é obrigatório'),
  price: z.string().nonempty('O preço é obrigatório'),
  city: z.string().nonempty('A cidade é obrigatório'),
  whatsapp: z.string().min(1,'O telefone é obrigatório').refine((value) => /^(\d{11,12})$/.test(value), {
    message: 'Numero de telefone inválido'
  }),
  description: z.string().nonempty('A descrição é obrigatória'),

})

type FormData = z.infer<typeof schema>



const New = () => {

  const {register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Container>

      <DashboardHeader/>

      <div className="w-full flex flex-col p-3 sm:flex-row items-center gap-2 bg-white">
        <button 
          className="border-2 w-48  h-32 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000"/>
          </div>
          <div className="cursor-pointer">
            <input className="opacity-0 cursor-pointer" type="file" accept="image/*"/>
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input 
              type="text" 
              register={register} 
              name="name" 
              error={errors.name?.message} 
              placeholder="Ex: Gol 1.0"
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input 
              type="text" 
              register={register} 
              name="model" 
              error={errors.model?.message} 
              placeholder="Ex: Trend"
            />
          </div>

          <div className="w-full flex mb-3 flex-row items-center gap-4">

            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input 
                type="text" 
                register={register} 
                name="year" 
                error={errors.year?.message} 
                placeholder="Ex: 2024"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">KM</p>
              <Input 
                type="text" 
                register={register} 
                name="km" 
                error={errors.km?.message} 
                placeholder="Ex: 25000"
              />
            </div>

          </div>

          <div className="w-full flex mb-3 flex-row items-center gap-4">

            <div className="w-full">
              <p className="mb-2 font-medium">Telefone para contato</p>
              <Input 
                type="text" 
                register={register} 
                name="whatsapp" 
                error={errors.whatsapp?.message} 
                placeholder="Ex: 659999-9999"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input 
                type="text" 
                register={register} 
                name="city" 
                error={errors.city?.message} 
                placeholder="Ex: São Paulo"
              />
            </div>

          </div>

          
          <div className="w-full">
            <p className="mb-2 font-medium">Preço</p>
            <Input 
              type="text" 
              register={register} 
              name="price" 
              error={errors.price?.message} 
              placeholder="Ex: 69.000"
            />
          </div>

          <div className="w-full">
            <p className="mb-2 font-medium">Descição</p>
            <textarea 
              className="w-full border-1 border-slate-300 rounded-md h-24 px-2"
              {...register('description')}
              name='description'
              id='description'
              placeholder="Digite a descrição completa sobre o carro..."
            />
            {errors.description && <p className="text-red-400">{errors.description.message}</p>}
          </div>

          <button type="submit" className="w-full h-10 mt-4 rounded-md bg-zinc-900 text-white font-medium">
            Cadastrar
          </button>

        </form>

      </div>
    </Container>
  )
}

export default New
