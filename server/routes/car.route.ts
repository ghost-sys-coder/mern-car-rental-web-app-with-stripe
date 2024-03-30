import { Router } from "express";
import { checkAdminAcess, checkUser } from "../middleware/authentication";
import { 
    createCar, 
    deleteCar, 
    fetchAllCars, 
    fetchCarsByBrand, 
    fetchFirstEntryByCarBrand, 
    fetchSingleCar, 
    updateCar 
} from "../controls/car.control";


const router = Router();


/**
 * ! Create Car
 * ! METHOD POST
 */
router.post("/create", checkUser, createCar);


/** 
 * ? UPDATE EXISTING CAR
 * ? METHOD PUT
 */
router.put("/:id", checkAdminAcess, updateCar);


/**
 * * DELETE EXISTING CAR
 * * METHOD DELETE
 */
router.delete("/:id", checkAdminAcess, deleteCar);


/**
 * ! FETCH SINGLE CAR
 * ! METHOD GET
 */
router.get("/:id", fetchSingleCar);

/** 
 * ? FETCH ALL CARS
 * ? METHOD GET
 */
router.get("/", fetchAllCars);


/**
 * * FETCH FIRST ENTRY OF EACH CAR  INTO AN ARRAY
 * * METHOD GET
 */
router.get("/fetch/brands", fetchFirstEntryByCarBrand);

/**
 * ! FETCH CARS BY BRAND
 * ! METHOD POST
 */
router.get("/brands/:brand", fetchCarsByBrand)

export default router;


