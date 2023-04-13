// Function --------------------------------------------
function wholeProcess() {
    let city = document.querySelector('.search-wh').value

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.weatherapi.com/v1/current.json?key=41be6a7b4f7e49beba460248221206&q=${city}&aqi=no    `,
        "method": "GET"
       
    };
    let data
    $.ajax(settings).done(function (response) {
        data = response
        wh_location_country = data.location.country
        wh_local_time = data.location.localtime
        wh_area_name = data.location.name
        temperature_c = data.current.temp_c + "°C"
        img = data.current.condition.icon
        weather = data.current.condition.text
        sp_dt = wh_local_time.split(' ')[0].split('-')
        hour = wh_local_time.split(' ')[1].split(":")[0]
        mints = wh_local_time.split(' ')[1].split(":")[1]
        let sec;
        if (hour > 12) {
            sec = 'PM'
            st = hour.charAt(0)
            x = hour.charAt(1)

            tw = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            tw2 = [3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4]
            ind = tw2.indexOf(Number(x))
            if (ind < 9) {
                fn = String(tw[ind])
            } else {
                fn = String(st) + String(tw[ind])
            }
        } else {
            sec = "AM"
            fn = hour
        }
        year = sp_dt[0]
        mont = sp_dt[1]
        date = sp_dt[2]
        mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        month = mon[Number(mont)]
        day_sht = Date(sp_dt).split(' ')[0]
        Final_date = day_sht + ", " + date + ' ' + month + ' ' + year

        time = String(fn) + ":" + String(mints) + " " + sec
        $('.desc').text(weather)
        $('.location').text(wh_location_country)
        $('.temp').text(temperature_c)
        $('.time').text(time)
        $('.time2').text(Final_date)
        $('.location2').text(wh_area_name)
        $('.icn').attr('src', img);


        
        humidity = data.current.humidity+" %"
        wind_direction = data.current.wind_dir
        wind_speed = data.current.wind_kph + ' Kph'
        Visibility = data.current.vis_km+' km'
        cloud = data.current.cloud+" %"
        lat = data.location.lat
        long = data.location.lon
        gust_speed = data.current.gust_kph + ' Kph'

        $('.humid').text(humidity)
        $('.wind_direction').text(wind_direction)
        $('.wind_speed').text(wind_speed)
        $('.visi').text(Visibility)
        $('.cloud').text(cloud)
        $('.gsy').text(gust_speed)
        $('.lat').text(lat)
        $('.long').text(long)
        renderItem(weather)
    });
}
// -------------------------------Ended-----------------------------------------------
wholeProcess()

// Calling Using Search Buttons ------------
let button = document.querySelector('.btn-sbm')
button.addEventListener('click', function () {
    wholeProcess()
})
// ------------------------------------------

function renderItem(tags){
    fetch(`https://source.unsplash.com/1600x900/?${tags},weather,atmosphere,forest,day,night`).then((response) => { 
        $(document).ready(function () {

            $('body').css("background-image",`url(${response.url})`)

        });
    }) 
  }
  

let width = window.innerWidth
$(document).ready(function () {
    if( width <= 1103){
        $('.weath-box').removeClass('col-3');    
        $('.weath-box').addClass('col-4');    
    }
    if( width <= 1046){
        $('.detaildiv').removeClass('col-7');    
        $('.detaildiv').addClass('col-11'); 
        $('.weath-box').removeClass('col-7');    
        $('.weath-box').addClass('col-11');      
    }
    if( width <= 849){    
        $('.sfd').removeClass('col-5');      
        $('.sfd').addClass('col-md-6');      
    }
    
    
});