console.log('hello')

const weather = ()=>{
    const address=document.getElementById("searchBox").value;
    console.log()
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(address)).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            document.getElementById("weather").innerHTML = "<b>"+data.location+"</b>" +"<br>"+ data.forecastData
        }
    })
})}