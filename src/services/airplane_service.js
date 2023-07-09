const { AirplaneRepository } = require("../repository");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-Status-Codes");
const airplaneRepository = new AirplaneRepository();




async function createAirpalne(data) {
  try {
    console.log("inside services");

    const airplane = await airplaneRepository.create(data);
    //   console.log(airplane)

    return airplane;
  } catch (error) {
    console.log("There is some error in airplane create service ");

    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      // console.log(error);
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      // console.log(explanation);

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplane object ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function getAirplanes(){

    try{
           const airplanes=await airplaneRepository.getAll();
           return airplanes;

    }

    catch(error){
      throw new AppError(
        "Cannot Get Airplanes object ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

}




async function getAirplane(id){

  try{
         const airplane=await airplaneRepository.get(id);
         return airplane;

  }

  catch(error){
console.log("hello "+error)
// console.log("hwb "+error.statuscode)
// console.log(StatusCodes.NOT_FOUND)
    if(error.statuscode == StatusCodes.NOT_FOUND){

      throw new AppError("U passed wrong id parameter that is out of limit " , error.statuscodes);
    }

    throw new AppError(
      "Cannot Get Airplane object ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

    
  }

}





module.exports = {
  createAirpalne,
  getAirplanes,
  getAirplane
};