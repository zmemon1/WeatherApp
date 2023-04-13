const LOCATION = "London";
let width = window.innerWidth
// Function --------------------------------------------
if (navigator.geolocation) {
    navigator.permissions.query({ name: 'geolocation' }).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                var apiKey = '0d388719065744a08a63adb47df046f9'; 
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    var cityName = data.results[0].components.city;
                    wholeProcess(cityName);
                })
                .catch(error => {
                    wholeProcess(LOCATION);
                });
            });
        } else if (permissionStatus.state === 'prompt') {
            wholeProcess(LOCATION);
        } else if (permissionStatus.state === 'denied') {
            wholeProcess(LOCATION);
        }
    });
}

function wholeProcess(t_city="") {
    $(".loader").css('display','flex');
    $(".main_container").css('display','none');
    let city = $("#search-area").val();
    if(t_city != ""){
        city = t_city;
    }
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.weatherapi.com/v1/forecast.json?key=41be6a7b4f7e49beba460248221206&q=${city}&aqi=yes`,
        "method": "GET"
    };
    let data;

    $.ajax(settings).done(function (response) {
        $("#forcastRow").html("");

        data = response
        let forecast = data.forecast;
        let fhour = forecast.forecastday[0].hour;
        
        let airquality = data.current.air_quality;
        let AirQuality = {
            1 : "Good",
            2 : "Moderate",
            3 : "Unhealthy",
            4 : "Unhealthy",
            5 : "Very Unhealthy",
            6 : "Hazardous",
        }
        let AirColor = {
            1 : "#1be59a78",
            2 : "#20c28691",
            3 : "#d05a1391",
            4 : "#d05a1391",
            5 : "#c324248c",
            6 : "#f703038c",
        }
        // AirQuality
        let co = airquality.co.toFixed(2);
        let no2 = airquality.no2.toFixed(2);
        let o3 = airquality.o3.toFixed(2);
        let pm2_5 = airquality.pm2_5.toFixed(2);
        let pm10 = airquality.pm10.toFixed(2);
        let so2 = airquality.so2.toFixed(2);
        let us_epa_index = airquality['us-epa-index'];
        let gb_defra_index = airquality['gb-defra-index'];
        let air_quality = AirQuality[us_epa_index];
        let air_color = AirColor[us_epa_index];
      
        // ___________________________________________________________

        wh_location_country = data.location.country
        wh_local_time = data.location.localtime
        wh_area_name = data.location.name
        
        let temp = $('.checkbox').prop('checked');
        if(temp == true){
            temperature = data.current.temp_f + "°";
            temp_t = data.current.temp_f
        }else{
            temperature = data.current.temp_c + "°";
            temp_t = data.current.temp_c
        }


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
        
        date = sp_dt[2]
        let dayName = new Date(wh_local_time).toLocaleString('en-US', { weekday: 'long' });
        let MonthName = new Date(wh_local_time).toLocaleString('en-US', { month: 'long' });

        Final_date = dayName + ", " + date + ' ' + MonthName

        time = String(fn) + ":" + String(mints) + " " + sec

        const main = time +' - '+Final_date;
        
        $('.desc').text(weather)
        $('.local').text(wh_area_name)
        $('.configuration').text(main)
        $('.temp').text(temperature)
        $('.temp').attr('aria-label', temp_t);
        $('.time').text(time)
        $('.time2').text(Final_date)
        $('.location2').text(wh_area_name)
        $('.airquality').text(air_quality)
        $('.AirQualityItem').css("background-color",air_color);
        $('.IconImage').attr('src', img);

        humidity = data.current.humidity+" %"
        wind_direction = data.current.wind_dir
        wind_speed = data.current.wind_kph + ' Kph'
        Visibility = data.current.vis_km+' km'
        cloud = data.current.cloud+" %"
        lat = data.location.lat
        long = data.location.lon
        gust_speed = data.current.gust_kph + ' Kph'

        $('.humidityValue').text(humidity)
        $('.WindDirectionValue').text(wind_direction)
        $('.WindSpeedValue').text(wind_speed)
        $('.VisibilityValue').text(Visibility)
        $('.CloudValue').text(cloud)
        $('.GustSpeedValue').text(gust_speed)
        $('.LatitudeValue').text(lat)
        $('.LongitudeValue').text(long)
        $('.co-value').text(co);
        $('.ozone-value').text(o3);
        $('.no2-value').text(no2);
        $('.so2-value').text(so2);
        $('.pm25-value').text(pm2_5);
        $('.pm10-value').text(pm10);
        fhour.forEach(element => {
            const now = new Date(element.time);
            let hour = now.getHours();
            let amPm = hour < 12 ? "AM" : "PM";
            hour = hour % 12 || 12; 
            MainHour = hour+ ":00 " + amPm
            fIcon = element.condition.icon;
            let temps = $('.checkbox').prop('checked');
            if(temps == true){
                temp = element.temp_f;
                Ctemp = temp+"°F";
            }else{
                temp = element.temp_c;
                Ctemp = temp+"°C";
            }
            let sHTML = `
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="row justify-content-center d-flex mainTempBox">
                        <div class="col-12 text-center fTime"> ${MainHour} </div>
                        <div class="col-12 text-center fImg"> <img src="${fIcon}" alt="" width="70px"> </div>
                        <div class="col-12 text-center fTemp" aria-label="${temp}"> ${Ctemp} </div>
                    </div>
                </div>            
            `;
            $("#forcastRow").append(sHTML);

        });
        $(".loader").css('display','none');
        $(".main_container").css('display','block');
    });
    
}
// -------------------------------Ended-----------------------------------------------
// Calling Using Search Buttons ------------
$(document).on('click','.WeatherSearchButton',function(){
    wholeProcess()
    if(width <= 1030){
        CloseButton()
    }
})
$(document).on('keypress','#search-area', function(event) {
    if (event.which === 13) { 
        wholeProcess()
        if(width <= 1030){
            CloseButton()
        }
    }
});

$(document).on('click','.is-right',function(){
    $('#forcastRow').animate({
        scrollLeft: $('#forcastRow').scrollLeft() + $('#forcastRow').width()
      }, 500);    
})
$(document).on('click','.is-left',function(){
    $('#forcastRow').animate({
        scrollLeft: $('#forcastRow').scrollLeft() - $('#forcastRow').width()
      }, 500);  
})
// ------------------------------------------
$(document).on('change','.checkbox', function(){
    let temp = $('.checkbox').prop('checked');
    let degree = $('.temp').attr('aria-label');
    let forArea = $(".fTemp");
    for(var i = 0; i < forArea.length; i++){
        let deg = forArea.eq(i).attr('aria-label');

        if(temp == true){
            let farenheit = celsiusToFahrenheit(deg).toFixed(1);
            $(forArea.eq(i)).text(farenheit+"°F");
            $(forArea.eq(i)).attr('aria-label', farenheit);
        }else{
            let calcius = fahrenheitToCelsius(deg).toFixed(1);
            $(forArea.eq(i)).text(calcius+"°C");
            $(forArea.eq(i)).attr('aria-label', calcius);
        }
    }
    if(temp == true){
        let farenheit = celsiusToFahrenheit(degree).toFixed();
        $('.temp').text(farenheit+"°");
        $('.temp').attr('aria-label', farenheit);
    }else{
        let calcius = fahrenheitToCelsius(degree).toFixed();
        $('.temp').text(calcius+"°");
        $('.temp').attr('aria-label', calcius);
    }
})
function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}  
function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5/9;
    return celsius;
}
$(".LocationDetails span").on('click',function(){
    wholeProcess($(this).text());
    if(width <= 1030){
        CloseButton()
    }
})

function CloseButton(){
    $(".sideArea").css('width', '0px');
    $(".mainSideArea").css('display', 'none');
    $(".hamburger").css('display', 'block');
    setTimeout(() => {
        $("#mainContainer").addClass('col-12');
        $("#mainContainer").removeClass('col-8');
        $(".sideArea").css('display', 'none');

        // if(width>1100){
        //     $("#forcastRow").children().each(function(){
        //         $(this).addClass('col-2');
        //         $(this).removeClass('col-3');
        //     });
        // }else{
        //     $("#forcastRow").children().each(function(){
        //         $(this).addClass('col-3');
        //         $(this).removeClass('col-2');
        //     })
        // }
    }, 300);    
}
$(".hamburger").click(function(){
    $(".hamburger").css('display', 'none');
    $(".sideArea").css('width', '');
    $(".mainSideArea").css('display', 'flex');
    $("#mainContainer").addClass('col-8');
    $("#mainContainer").removeClass('col-12');
    $(".sideArea").css('display', 'block');

    // if(width <= 1100){
    //     $("#forcastRow").children().each(function(){
    //         $(this).addClass('col-3');
    //         $(this).removeClass('col-2');
    //     })
    // }
   
});



$(document).ready(function () {
    if( width <= 1120){
        CloseButton();
        $("#forcastRow").children().each(function(){
            $(this).addClass('col-3');
            $(this).removeClass('col-2');
        })   
    }
    if(width <= 780){
        $(".ForcastArea").addClass('col-12');
        $(".ForcastArea").removeClass('col-11');
    }
    
});