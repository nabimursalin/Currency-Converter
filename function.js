const url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_mLrK9LxIjb5PVyV7PzQRiYBtC8MiOQ4auK43WlLP";

const option = document.querySelectorAll("select");
const button = document.querySelector("button");


for(let get of option){
    for(currency_code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currency_code;
        newOption.value = currency_code;
        if(get.name==="us" && currency_code==="USD"){
            newOption.selected = true;
        }else if(get.name === "bd"&& currency_code ==="BDT"){
            newOption.selected = true;
        }
        
        get.append(newOption);
        
        
    }
    get.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

function updateflag(element){
    let crrcode = element.value;
    let country_code= countryList[crrcode];
    let flag = element.parentElement.querySelector("img");
    flag.src = `https://flagsapi.com/${country_code}/flat/64.png`;
  
}

button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount");
    let val = amount.value;
    if (val===""|| val <1){
        val = 1;
        amount.value = "1";
    }
   
});

button.addEventListener("click",async (evt)=>{
  evt.preventDefault();

  let money = document.querySelector(".amount");
  let val = parseFloat(money.value);
  if(isNaN (val) || val < 1){
    val = 1;
    money.value = "1";
  }
  const fromoption = document.querySelector(".from select").value;
const tooption = document.querySelector(".to select").value;
  const fetchUrl = `${url}&base_currency=${fromoption}`;
  try{
    const response = await fetch(fetchUrl);
    const data = await response.json();
    const rate = data.data[tooption];
    const converted = (val * rate).toFixed(2);
    document.querySelector(".result").innerText = `${converted} ${tooption}`;
  }
  catch(error){
    console.error("Error fetching exchange rate:",error);
  }



});
