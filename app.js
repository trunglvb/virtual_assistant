const searchInput = document.querySelector('.search-input')
const APP_ID = `11faa26773955381d77c64833fd90d30` ;
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const temparature = document.querySelector('.temperature')
const weatherIcon = document.querySelector('.weather-icon')
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const DEFAULT_VALUE = '--'
searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then( async res => {
            const data = await res.json();
            console.log(data);
            cityName.innerHTML = data.name  || DEFAULT_VALUE;
            weatherState.innerHTML= data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            temparature.innerHTML =Math.round(data.main.temp) || DEFAULT_VALUE; 
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed* 3.6).toFixed(2) || DEFAULT_VALUE;

        })
})
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth= window.speechSynthesis;
const speak =(text) => {
	if(synth.speaking){
		console.error('Buysy...Speaking')
		return;
	}
	const utter = new SpeechSynthesisUtterance(text);
	utter.onedn =() => {
		console.log('SpeechSynthesisUtterance.onend');
	}
	utter.onerror = (err) => {
		console.error('SpeechSynthesisUtterance.onerror', err)
	}
	synth.speak(utter);
}
recognition.lang = 'vi-VI';
recognition.continouus = false;
const microphone = document.querySelector('.microphone');

const handleVoice = (text) => {
	console.log('text:', text);
	const handledText = text.toLowerCase();
	if(handledText.includes('th???i ti???t t???i')){
		const location= handledText.split('t???i')[1].trim();
		console.log('location:', location);
		searchInput.value = location;
		const changeEvent = new Event('change')
		searchInput.dispatchEvent(changeEvent);
		return;
	}
	if(handledText.includes('thay ?????i m??u n???n')){
		const color = handledText.split('m??u n???n')[1].trim();
		const container = document.querySelector('.container');
		container.style.background = color;
		return;
	}
	if(handledText.includes('m??u n???n m???c ?????nh')){
		const container = document.querySelector('.container');
		container.style.background = ``;
	}
	if(handledText.includes('m???y gi???')){
		const textToSpeech = `${moment().hours()} hours ${moment().minutes()} minutes `
		speak(textToSpeech);
		return
	}
	speak('Try Again')
}
microphone.addEventListener('click', (e) => {
	e.preventDefault();
	recognition.start();
	microphone.classList.add('recording')
})

recognition.onspeechend = () => {
	recognition.stop();
	microphone.classList.remove('recording')
}

recognition.onerror = (err) => {
	console.log(err)
}

recognition.onresult = (e) => {
	console.log('onresult', e)
	const text = e.results[0][0].transcript;
	handleVoice(text);
}



// searchInput.addEventListener('change', (e) => {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
//        .then(function(res){
// 		   return res.json();
// 	   })
// 	   .then(function(data) {
// 			console.log(data);
// 			cityName.innerHTML = data.name  || DEFAULT_VALUE;
// 			weatherState.innerHTML= data.weather[0].description || DEFAULT_VALUE;
// 			weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
// 			temparature.innerHTML =Math.round(data.main.temp) || DEFAULT_VALUE; 
// 			sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
// 			sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
// 			humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
// 			windSpeed.innerHTML = (data.wind.speed* 3.6).toFixed(2) || DEFAULT_VALUE;
// 	   }) 
			
// })
