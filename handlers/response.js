exports.setResponse=function setResponse(res,statusCode,message,data){
    result={
        data:data,
        message:message,
    }
    res.status(statusCode).send(result)
}

exports.setErrorResponse=function setErrorResponse(res,statusCode=500,message){
   result={
       data:[],
       message:message
   } 
   res.status(statusCode).send(result)
}