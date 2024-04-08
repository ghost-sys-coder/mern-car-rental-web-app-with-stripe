import { Link } from "react-router-dom"
import { IFetchRentals } from "types"


const CarCard = ({rental}: {rental: IFetchRentals}) => {
  return (
      <Link
          to={`/cars/${rental._id}`}
          key={rental._id}
          className="w-full h-[200px] rounded-md shadow-sm overflow-hidden relative"
      >
          <img
              src={rental.images[0]}
              alt={rental.title}
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          />
          <div className="w-full z-10 absolute bottom-2 left-2">
              <h2 className="text-white font-bold sm:text-xl">{rental.title}</h2>
          </div>
    </Link>
  )
}

export default CarCard