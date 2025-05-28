import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

import Container from "../../components/container"
import { db } from "../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";




interface CarsProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  whatsapp: string;
  images: CarImageProps[]
}


interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}




const CarDetail = () => {

  const {id} = useParams();
  const [car, setCar] = useState<CarsProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2)
  const navigate = useNavigate();



  useEffect(() => {

    const loadCar = async () =>{
      if(!id) return;

      const docRef = doc(db, 'cars', id)
      getDoc(docRef)
      .then((snpashot)=> {

        if(!snpashot.data()){
          navigate('/')
        }

        setCar({
          id: snpashot.id,
          name: snpashot.data()?.name,
          year: snpashot.data()?.year,
          city: snpashot.data()?.city,
          model: snpashot.data()?.model,
          uid: snpashot.data()?.uid,
          description: snpashot.data()?.description,
          created: snpashot.data()?.created,
          whatsapp: snpashot.data()?.whatsapp,
          price: snpashot.data()?.price,
          km: snpashot.data()?.km,
          owner: snpashot.data()?.owner,
          images: snpashot.data()?.images,
        })
      })

    }

    loadCar()

  },[id, navigate])


  useEffect(()=> {

    const handleResize = () => {
      if(window.innerWidth < 720) {
        setSliderPerView(1)
      } else {
        setSliderPerView(2)
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])


  return (
    <Container>

      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true}}
          navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide>
              <img src={image.url} className="w-full h-80 object-cover"/>
            </SwiperSlide>
          ))}

        </Swiper>
      )}


      { car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">

          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl">{car?.name}</h1>
            <h1 className="font-bold text-3xl">R$ {car?.price}</h1>
          </div>

          <p>{car?.model}</p>
          
          <div className="flex w-full gap-6 my-4">

            <div className="flex flex-col gap-4">

              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>

              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>

            </div>

            <div className="flex flex-col gap-4">

              <div>
                <p>Km</p>
                <strong>{car?.km}</strong>
              </div>

            </div>

          </div>
          
          <strong>Descrição:</strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone / WhatsApp</strong>
          <p className="mb-4">{car?.whatsapp}</p>

          <a 
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse anuncio no WebCarros`} 
            target="_blank"
            className="w-full flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium bg-green-500 text-white">
            Conversar com vendedor
            <FaWhatsapp size={26} color="#fff"/>
          </a>

        </main>
      )}
    </Container>
  )
}

export default CarDetail