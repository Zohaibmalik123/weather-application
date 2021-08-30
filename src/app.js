const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

console.log(__dirname)

 
const app=express()
const port = process.env.PORT || 3000


// define path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partial')

// setup handlesbar engine and view location
app.set('view engine' , 'hbs')
app.set('views' , viewspath)
hbs.registerPartials(partialsPath)


// setup static directory to server 
app.use(express.static(publicDirectoryPath))


app.get('' , (req , res)=>{
    res.render('index' , {
        title:' Weather',
        name:'Muhammad Zohaib'

    } )
})
app.get('/about' , (req , res)=>{
    res.render('About' , {
        title:'About page',
        paragraph:'Lorem ipsum dolor amet consectetur adipisicing elit. Doloremque, architecto.',
        name:'Muhammad Zohaib'

    } )
})

app.get('/help' , (req , res)=>{
    res.render('help' , {
        title:'Help page',
        paragraph:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, architecto.',
        helptext:'this is some helpful text',
        name:'Muhammad Zohaib'

    } )
})


app.get('/Weather' , (req,res)=>{
    if(!req.query.address){
        res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address  , (error , {latitude , longitude , location} = {} ) =>{
        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude ,(error , forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    
 })

 app.get('/products' , (req , res)=>{
     if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
     }

        console.log(req.query.search)
        res.send({
            products:[]
        })
 })

app.get('/help/*' , (req , res)=>{
    res.render('404' , {
        title:'404',
        name:'Muhammad Zohaib',
        errorMessage:'page not found'

    } )
})

app.get('*' , (req , res)=>{
    res.render('404' , {
        title:'404',
        name:'Muhammad Zohaib',
        errorMessage:'page not found'

    } )
})
 

 app.listen(port , ()=>{
     console.log(`Server is up on port ${port}`)
 })