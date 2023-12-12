let singleRoomCost = 25000;
let doubleRoomCost = 35000;
let tripleRoomCost = 40000;
let extraBedCost = 8000;
let mealsCost = 5000;
let lpoints=0;

let totalHotelCost = 0; // Declare totalHotelCost variable

const nam = document.getElementById("input-nam");
const mobile = document.getElementById("input-mob");
const email = document.getElementById("input-mail");
const checkin = document.getElementById("input-checkin");
const checkout = document.getElementById("input-checkout");
const adults = document.getElementById("input-adults");
const kids = document.getElementById("input-nokid");
const singleRooms = document.getElementById("SingleRooms");
const doubleRooms = document.getElementById("DoubleRooms");
const tripleRooms = document.getElementById("TripleRooms");
const extraBed = document.getElementById("extrabed");
const meals = document.getElementById("Meals");
const wifi = document.getElementById("Wifi");
const poolView = document.getElementById("pool-view");
const gardenView = document.getElementById("garden-view");
const btnBookNow = document.getElementById("submit-btn");
const promo = document.getElementById("input-promo");
const roomInput = document.getElementById("form-group");
const allRoomInputs = document.querySelectorAll("#form-group inputs")

const loyaltyButton = document.getElementById("loyal");
    




function calculateHotelCost() {
    let single = parseInt(singleRooms.value);
    let double = parseInt(doubleRooms.value);
    let triple = parseInt(tripleRooms.value);
    let bed = parseInt(extraBed.value);
    let food = parseInt(meals.value);

    let daysForTheStay = (new Date(checkout.value) - new Date(checkin.value)) / (24 * 60 * 60 * 1000);

    let singleCost = single * singleRoomCost * daysForTheStay;
    let doubleCost = double * doubleRoomCost * daysForTheStay;
    let tripleCost = triple * tripleRoomCost * daysForTheStay;

    // Fix the calculation of totalHotelCost
    totalHotelCost = singleCost + doubleCost + tripleCost + (bed * extraBedCost) + (food * mealsCost);

    let allRooms = single + double + triple;

    if (allRooms>3){
        lpoints=allRooms*20;
    }
}


loyaltyButton.addEventListener("click",showpoints);
//function for loyalpoints
function showpoints(event){
    event.preventDefault();

    savePointstolocal(lpoints);
    alert(`You Have Eaned ${lpoints}Loyal Points`);
}

//save points to local storage
function savePointstolocal(points){
    localStorage.setItem('loualty Points', points.toString());
}

// Add event listeners to input fields
nam.addEventListener("input", updateRoomSummaryTable);
mobile.addEventListener("input", updateRoomSummaryTable);
email.addEventListener("input", updateRoomSummaryTable);
checkin.addEventListener("change", updateRoomSummaryTable);
checkout.addEventListener("change", updateRoomSummaryTable);
adults.addEventListener("input", updateRoomSummaryTable);
kids.addEventListener("input", updateRoomSummaryTable);
singleRooms.addEventListener("input", updateRoomSummaryTable);
doubleRooms.addEventListener("input", updateRoomSummaryTable);
tripleRooms.addEventListener("input", updateRoomSummaryTable);
extraBed.addEventListener("input", updateRoomSummaryTable);
meals.addEventListener("input", updateRoomSummaryTable);
wifi.addEventListener("change", updateRoomSummaryTable);
poolView.addEventListener("change", updateRoomSummaryTable);
gardenView.addEventListener("change", updateRoomSummaryTable);
promo.addEventListener("input", updateRoomSummaryTable);



function updateRoomSummaryTable() {
    // Get values from input fields
    const nameValue = nam.value;
    const mobileValue = mobile.value;
    const emailValue = email.value;
    const checkinValue = checkin.value;
    const checkoutValue = checkout.value;
    const adultsValue = adults.value;
    const kidsValue = kids.value;
    const singleRoomsValue = parseInt(singleRooms.value);
    const doubleRoomsValue = parseInt(doubleRooms.value);
    const tripleRoomsValue = parseInt(tripleRooms.value);
    const extraBedValue = parseInt(extraBed.value);
    const mealsValue = parseInt(meals.value);
    const wifiValue = wifi.checked;
    const poolViewValue = poolView.checked;
    const gardenViewValue = gardenView.checked;
    const promoValue = promo.value;

   

    // Calculate the number of days for the stay
    const daysForTheStay = (new Date(checkoutValue) - new Date(checkinValue)) / (24 * 60 * 60 * 1000);

    // Calculate the cost for each room type
    const singleCost = singleRoomsValue * singleRoomCost * daysForTheStay;
    const doubleCost = doubleRoomsValue * doubleRoomCost * daysForTheStay;
    const tripleCost = tripleRoomsValue * tripleRoomCost * daysForTheStay;

    // Calculate the total cost
    totalHotelCost = singleCost + doubleCost + tripleCost + (extraBedValue * extraBedCost) + (mealsValue * mealsCost);

     // calculation to promo code
     if(promoValue==="Promo123"){
        totalHotelCost = (totalHotelCost*0.95);
    
    }

    // Update the summary table with the values from the form
    document.getElementById("tableName").innerText = nameValue;
    document.getElementById("tableMobile").innerText = mobileValue;
    document.getElementById("tableEmail").innerText = emailValue;
    document.getElementById("tableDate").innerText = checkinValue;
    document.getElementById("tableDays").innerText = daysForTheStay;
    document.getElementById("tableSingleRooms").innerText = singleRoomsValue;
    document.getElementById("tableDoubleRooms").innerText = doubleRoomsValue;
    document.getElementById("tableTripleRooms").innerText = tripleRoomsValue;
    document.getElementById("tableAdults").innerText = adultsValue;
    document.getElementById("tableKids").innerText = kidsValue;
    document.getElementById("tableExtraBed").innerText = extraBedValue;
    document.getElementById("tableMeals").innerText = mealsValue;
    document.getElementById("tableWifi").innerText = wifiValue ? "Yes" : "No";
    document.getElementById("tablePool").innerText = poolViewValue ? "Yes" : "No";
    document.getElementById("tableDardenView").innerText = gardenViewValue ? "Yes" : "No";

    // Update the hotel cost in the summary table
    document.getElementById("hotelCost").innerText = "Hotel Booking Cost: " + totalHotelCost + " LKR";
}

function overallTable(){
   

    document.getElementById("hotelTotalCost").innerText = "Hotel Booking Cost: " + totalHotelCost + " LKR";
    document.getElementById("hotelTotalCost").innerText = "Hotel Booking Cost: " + totalHotelCost + " LKR";
}

btnBookNow.addEventListener("click",roomButton);

function roomButton(event) {
    // Prevent the form from submitting and page reloading
    event.preventDefault();
  

    // Check if the form is valid
    if (roomInput.checkValidity()) {
        // Calculate the room cost and update the current room booking
        calculateHotelCost();
        updateRoomSummaryTable();
    
        alert(
        `Your Booking has been Confirmed.
         Check your Total in the OverAll Booking Table 
        Thank You `)

        // Update the overall booking details
        overallTable();
        
        

        // Clear the form
        roomInput.reset();

        //clear the current booking table
        document.getElementById("tableName").innerText = "";
        document.getElementById("tableMobile").innerText = "";
        document.getElementById("tableEmail").innerText = "";
        document.getElementById("tableDate").innerText = "";
        document.getElementById("tableDays").innerText = "";
        document.getElementById("tableSingleRooms").innerText = "";
        document.getElementById("tableDoubleRooms").innerText = "";
        document.getElementById("tableTripleRooms").innerText = "";
        document.getElementById("tableAdults").innerText = "";
        document.getElementById("tableKids").innerText = "";
        document.getElementById("tableExtraBed").innerText = "";
        document.getElementById("tableMeals").innerText = "";
        document.getElementById("tableWifi").innerText = "";
        document.getElementById("tablePool").innerText = "";
        document.getElementById("tableDardenView").innerText = "";
    
        // Update the hotel cost in the summary table
        document.getElementById("hotelCost").innerText = "";

        

}
}


let localAdultsCost = 5000;
let localKidsCost = 2000;
let foreignAdultsCost = 10000;
let foreignKidsCost = 5000;
let kidguider = 500;
let adultguider = 1000;


let totalAdventureCost = 0;


const localAdult = document.getElementById("numlocaladults");
const localKid = document.getElementById("numlocalkids");
const foreignAdult = document.getElementById("numforeignadults");
const foreignKid = document.getElementById("numforeignkids");
const guideForAdult = document.getElementById("AdultguideAdventure");
const guideForKid = document.getElementById("KidsguideAdventure");
const AdvBookNow= document.getElementById("Adv-submit");
const AdvInput = document.getElementById("advenBook");
const Diving=document.getElementById("adventureType");
const FavBtn=document.getElementById("")




function calculateAdventureCost() {
    let localA = parseInt(localAdult.value) || 0;
    let localK = parseInt(localKid.value) || 0;
    let foreignA = parseInt(foreignAdult.value) || 0;
    let foreignK = parseInt(foreignKid.value) || 0;
    let guidA = guideForAdult.checked ? 1 : 0;
    let guidK = guideForKid.checked ? 1 : 0;

    let localACost = localA * localAdultsCost;
    let localKCost = localK * localKidsCost;
    let foreignACost = foreignA * foreignAdultsCost;
    let foreignKCost = foreignK * foreignKidsCost;
    let guidACost = guidA * adultguider;
    let guidKCost = guidK * kidguider;

    totalAdventureCost = localACost + localKCost + foreignACost + foreignKCost + guidACost + guidKCost;
}



//add evnt listeners to input fields
localAdult.addEventListener("input",updateAdventureSummaryTable);
localKid.addEventListener("input",updateAdventureSummaryTable);
foreignAdult.addEventListener("input",updateAdventureSummaryTable);
foreignKid.addEventListener("input",updateAdventureSummaryTable);
guideForAdult.addEventListener("change",updateAdventureSummaryTable);
guideForKid.addEventListener("change",updateAdventureSummaryTable);

function updateAdventureSummaryTable(){

    calculateAdventureCost();
    const localadultValue = localAdult.value;
    const localkidsValue = localKid.value;
    const foreignadultValue = foreignAdult.value;
    const foreingkidValue = foreignKid.value;
    const guideadultValue = guideForAdult.checked;
    const guidkidsValue = guideForKid.checked;



document.getElementById("tableLocalAdult").innerText=localadultValue;
document.getElementById("tableHoursLocalAdult").innerText=localadultValue*1;
document.getElementById("tableLocalKid").innerText=localkidsValue;
document.getElementById("tableForeignAdult").innerText=foreignadultValue;
document.getElementById("tableForeignKid").innerText=foreingkidValue;
document.getElementById("tableGuideAdult").innerText=guideadultValue ? "Yes" : "No";
document.getElementById("tableGuideKid").innerText=guidkidsValue ? "Yes" : "No";

//// Update the Adventure cost in the summary table
document.getElementById("adventureCost").innerText="Adventure Booking Cost: "+ totalAdventureCost+ "LKR";

}

AdvBookNow.addEventListener('click', function (event){
    event.preventDefault();
    if(AdvInput.checkValidity()){

        calculateAdventureCost();
        updateAdventureSummaryTable();

        //alart
        alert(`Hey,
        Thank you for reserving your tickets for adventure
        \tAdventure Name: Diving
        No of Adults: ${localAdult.value}
        No of Kids:${localKid.value}
        No of Foreign Adults:${foreignAdult.value}
        No of Foreign Kids: ${foreignKid.value}
        Total Adventure Cost: ${totalAdventureCost}`)

        AdvInput.reset();

    }
    document.getElementById("tableLocalAdult").innerText="";
    document.getElementById("tableHoursLocalAdult").innerText="";
    document.getElementById("tableLocalKid").innerText="";
    document.getElementById("tableForeignAdult").innerText="";
    document.getElementById("tableForeignKid").innerText="";
    document.getElementById("tableGuideAdult").innerText="" ? "Yes" : "No";
    document.getElementById("tableGuideKid").innerText="" ? "Yes" : "No";


});

/*function adventureButton(event){
    

    //check if the form is valid
    if (AdvInput.checkValidity()){

        calculateAdventureCost();
        updateAdventureSummaryTable();

        alert(`Hey,
        thank you for reserving your tickets for adventure
        \tAdventure name ${Diving}
        `)
        
        //Clean the form
        AdvInput.reset();
        event.preventDefault();


        


document.getElementById("tableLocalAdult").innerText="";
document.getElementById("tableHoursLocalAdult").innerText="";
document.getElementById("tableLocalKid").innerText="";
document.getElementById("tableForeignAdult").innerText="";
document.getElementById("tableForeignKid").innerText="";
document.getElementById("tableGuideAdult").innerText="";
document.getElementById("tableGuideKid").innerText="";

document.getElementById("adventureCost").innerText="";
    }
}*/

//add to FAV
const btnFav = document.getElementById("Fav-btn");
btnFav.addEventListener("click", addToFavorites);

function addToFavorites(evnt) {

    evnt.preventDefault();

    localStorage.setItem("favInfo",JSON.stringify(favInfo));

    alert('Added to Favorites!');

    // Add the current room booking details to favorites
}
    function addToFavorites(){
    const favInfo = {
        name: nam.value,
        mobile: mobile.value,
        email: email.value,
        checkin: checkin.value,
        checkout: checkout.value,
        adults: adults.value,
        kids: kids.value,
        singleRooms: singleRooms.value,
        doubleRooms: doubleRooms.value,
        tripleRooms: tripleRooms.value,
        extraBed: extraBed.value,
        meals:meals.value,
        wifi: wifi.checked,
        poolView: poolView.checked,
        gardenView: gardenView.checked,
        totalHotelCost: totalHotelCost,
    };
    localStorage.setItem('favInfo',JSON.stringify(favInfo));

    alert('Added to Favorites!');
}

    



