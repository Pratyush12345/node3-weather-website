const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/latlong.js')
const forecast=require('./utils/weather-data')

const app=express()

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/partials')

//Setup Handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:'Pratyush Gupta'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:'Pratyush Gupta'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpfulText:'this is some helpful text',
        title:"Help",
        name:'Pratyush Gupta'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(Latitude,Longitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:data,
                Location,
                address: req.query.address +" is the location"
            })
            
        })
    })


    
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help Error not Found',
        name:"Pratyush Gupta"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page Not Found',
        name:"Pratyush Gupta"
    })
})


app.listen(3000,()=>{
    console.log('Server is up and running') 
})