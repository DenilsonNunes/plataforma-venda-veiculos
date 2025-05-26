import Container from "../../components/container"


const Home = () => {
  return (
    <Container>
      <section className="w-full max-w-3xl mx-auto p-4 rounded-lg flex justify-center items-center gap-2 bg-white">
        <input className="w-full border-1 border-gray-400 rounded-lg h-9 px-3 outline-none" type="text" placeholder="Digite o nome do carro..." />
        <button 
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
        >
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usuados em todo Brasil</h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white  rounded-lg">

          <img className="w-full rounded-lg mb-2 max-h-80 hover:scale-105 transition-all" src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202505/20250521/bmw-320i-2.0-16v-turbo-flex-m-sport-automatico-wmimagem22095630118.jpg?s=fill&w=1920&h=1440&q=75" alt="Carro" />
          
          <p className="font-bold mt-1 mb-2 px-2">BMW 302i</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
            <strong className="text-black font-medium text-xl">R$ 190.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2">

          </div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">Cuiabá - MT</span>
          </div>

        </section>
      </main>
    </Container>
  )
}

export default Home