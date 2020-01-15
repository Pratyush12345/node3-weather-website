const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoicHJhdHl1c2gyMDAwIiwiYSI6ImNrNHpqY3ljeTBhem0zb21zajZ2ZXdtNTYifQ.pS9LsrGpguYuHrg60N6_SA&limit=1'
    request({url,json:true},(error,{body})=>{        
            if(error){
                callback('Unable to connect to weather service!',undefined)
            }
            else if(body.features==null){
                callback('Unable to find loaction. Try another Search',undefined)
            }
            else{
            callback(undefined,
                {Latitude: body.features[0].center[1],
                 Longitude: body.features[0].center[0],
                 Location: body.features[0].place_name
                })
            }
    })
}

module.exports=geocode