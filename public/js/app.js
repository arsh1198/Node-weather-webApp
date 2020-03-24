console.log('hello')

const weather = ()=>{
    const address=document.getElementById("searchBox").value;
    console.log()
    fetch('/weather?address='+encodeURIComponent(address)).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            document.getElementById("weather").innerHTML = "<b>"+data.location+"</b>" +"<br><br>"+ data.forecast
        }
    })
})}