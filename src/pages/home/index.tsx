import { useEffect, useState } from "react"
import Container from "../../components/container"

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";



interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[]
}


interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}


const Home = () => {


  const [cars, setCars] = useState<CarsProps[]>([])
  const [loadingImages, setLoadImages] = useState<string[]>([])
  const [inputSearchCar, setInputSearchCar] = useState('')


  useEffect(()=> {

    loadCars();

  },[])

  const loadCars = () => {
      const carsRef = collection(db, 'cars')
      const queryRef = query(carsRef, orderBy('created', 'desc'))

      getDocs(queryRef)
      .then((snpashot) => {
        const listCars = [] as CarsProps[];

        snpashot.forEach( doc => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })

        setCars(listCars);

      })
  }



  const handleImageLoad = (id: string) => {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  const handleSearchCar = async () => {


    if(inputSearchCar === '') {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(collection(db, 'cars'), 
      where('name', '>=', inputSearchCar.toUpperCase()),
      where('name', '<=', inputSearchCar.toUpperCase() + '\uf8ff')
    )


    const querySnapshot = await getDocs(q);

    const listCars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid
      })
    })

    console.log('AQUI', listCars)

    setCars(listCars)


  }


  return (
    <Container>
      <section className="w-full max-w-3xl mx-auto p-4 rounded-lg flex justify-center items-center gap-2 bg-white">
        <input 
          className="w-full border-1 border-gray-400 rounded-lg h-9 px-3 outline-none" 
          type="text" 
          placeholder="Digite o nome do carro..." 
          value={inputSearchCar}
          onChange={(e) => setInputSearchCar(e.target.value)}
        />
        <button 
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usuados em todo Brasil</h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section  className="w-full bg-white  rounded-lg">
              
              <div 
                className="w-full h-72 rounded-lg bg-slate-200" 
                style={{ display: loadingImages.includes(car.id) ? 'none' : 'block'}}
              >

              </div>
              

              <img
                alt="Carro"  
                src={car.images[0].url} 
                className="w-full rounded-lg mb-2 max-h-80 hover:scale-105 transition-all" 
                onLoad={()=> handleImageLoad(car.id)} 
                style={{ display: loadingImages.includes(car.id) ? 'block' : 'none'}}
              />
              
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">{car.year} | {car.km} Km</span>
                <strong className="text-black font-medium text-xl">{car.price}</strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>

            </section>
          </Link>
        ))}

      </main>
    </Container>
  )
}

export default Home