import { Request, Response } from "express";
import { connectToDB } from "../database/mongodb";
import Car from "../models/car.model";
import { ICar } from "../types";

/**
 * ! Create Car
 * ! METHOD POST
 */
const createCar = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  const {
    title,
    description,
    rentalPrice,
    brand,
    purchasePrice,
    mileage,
    engine,
    transmissionType,
    images,
    creator
    } = await req.body.item;


  try {
    const newCar = await Car.create({
      title,
      description,
      rentalPrice,
      brand,
      purchasePrice,
      mileage,
      engine,
      transmissionType,
      images,
      creator
    });

    return res.status(200).json({
      message: "A new car has been added to the database!",
      success: true,
      newCar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * ? UPDATE EXISTING CAR
 * ? METHOD PUT
 */
const updateCar = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  try {
    const { id } = req.params;

    const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      multi: true,
    });

    return res
      .status(200)
      .json({
        message: "The car has been updated!",
        success: true,
        updatedCar,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * * DELETE EXISTING CAR
 * * METHOD DELETE
 */
const deleteCar = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  try {
    const { id } = req.params;

    await Car.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Car has successfully been deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * ! FETCH SINGLE CAR
 * ! METHOD GET
 */
const fetchSingleCar = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    return res.status(200).json(car);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * ? FETCH ALL CARS
 * ? METHOD GET
 */
const fetchAllCars = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  try {
    const cars = await Car.find();
    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


/**
 * * FETCH FIRST ENTRY OF EACH CAR  INTO AN ARRAY
 * * METHOD GET
 */
const fetchFirstEntryByCarBrand = async (req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  try {
    // Aggregate pipeline to group by brand and get the first document for each brand
    const cars = await Car.aggregate([
      {
        $group: {
          _id: '$brand', // Group by brand
          car: { $first: '$$ROOT' }, // Get the first document for each brand
        },
      },
      {
        $replaceRoot: { newRoot: '$car' }, // Replace the root with the first document
      },
    ]);

    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

/**
 * ! FETCH CARS BY BRAND
 * ! METHOD POST
 */
const fetchCarsByBrand = async(req: Request, res: Response) => {
  /** await mongodb connection */
  await connectToDB();

  const { brand } = req.params;

  try {

    /** check if we need all brands */
    if (brand === "All" || !brand) {
      const cars = await Car.find({});
      return res.status(200).json(cars)
    } else {
      const cars = await Car.find({ brand });
      return res.status(200).json(cars);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}


export { createCar, 
  updateCar, 
  deleteCar, 
  fetchSingleCar, 
  fetchAllCars, 
  fetchFirstEntryByCarBrand,
  fetchCarsByBrand
};
