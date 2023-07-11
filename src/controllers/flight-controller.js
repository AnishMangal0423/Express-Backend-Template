const { flight_service } = require("../services");
const { Error_Res, Correct_Res } = require("../utils/common");
const { StatusCodes } = require("http-Status-Codes");


async function MakeFlights(req , res){

     try {
      
        const flight= await flight_service.CreateFlights({
  
           flightNumber:req.body.flightNumber,
           airplaneId:req.body.airplaneId,
           departureAirportId:req.body.departureAirportId,
           arrivalAirportId:req.body.arrivalAirportId,
           arrivalTime:req.body.arrivalTime,
           departureTime:req.body.departureTime,
           price:req.body.price,
           boardingGates:req.body.boardingGates,
           totalSeats:req.body.totalSeats,
           
          
        })

        Correct_Res.data = flight;

        return res.json({
          Correct_Res,
        });
        
     } catch (error) {
        Error_Res.message = " Something went wrong .. ";
        // Error_Res.message=
    
        Error_Res.Error.description = error.message;
    
        return res.status(404).json({
          Error_Res,
        });
     }

}




module.exports={

   MakeFlights,
  
}