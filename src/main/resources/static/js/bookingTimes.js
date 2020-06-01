let params = new URLSearchParams(window.location.search);

    let adultNumber = 0;
    let childNumber = 0;
    let studentNumber = 0;
    let total = 0;

function updateTotal(type){
    let id = "totalPrice";
    document.getElementById(id).className = "section__title";

    if(type === 'adult'){
        let adult = document.getElementById(type);
        adultNumber = adult.options[adult.selectedIndex].value;
    }
    else if(type === 'child'){
        let child = document.getElementById(type);
        childNumber = child.options[child.selectedIndex].value;
    }
    else if(type === 'student'){
        let student = document.getElementById(type);
        studentNumber = student.options[student.selectedIndex].value;
    }

    let subTotal = (adultNumber * 8) + (childNumber * 4) + (studentNumber * 6);

    let timeFactor = params.get('time').split(' ');

    if((timeFactor[1] === "12:30") || (timeFactor[1]) === "15:00"){
        total = subTotal * 0.75;
    }
    else if((timeFactor[1] === "17:30") || (timeFactor[1] === "20:00")){
        total = subTotal;
    }
    else if((timeFactor[1] === "22:30")){
        total = subTotal * 0.75;
    }

    document.getElementById(id).textContent = "£"+ total;

   
}

document.getElementById("movieName").textContent = params.get('title');

document.getElementById("movieTime").textContent = params.get('time');



function dateSelect(dates) {
    let templist = [];
    let bigParent = document.getElementById("accordion");
    let counter = 0;
    for (let i=0;i<dates.length;counter++){
        let day = document.createElement("div")
        day.className="accordion__card"
        let insert ="";
        templist.push(dates[0]);
        dates.splice(0,1);

        for(let j=0; j<dates.length;j++){
            if(dates[j].split(" ")[0]===templist[0].split(" ")[0]){
                templist.push(dates[j]);
                dates.splice(j,1)
            }
        }

        for(let j=0; j<templist.length;j++){
            insert+=
                `<tbody>
                    <tr>
                        <th>${templist[j].split(" ")[1]}<a class="sign__btn1" href="bookings2.html?id=${params.get('id')}&time=${templist[j]}&title=${params.get('title')}">Change</a></th>
                    </tr>
                </tbody>`
        }

        day.innerHTML=
            `<div class="card-header" id="heading${counter}">
                    <button type="button" data-toggle="collapse" data-target="#collapse${counter}" aria-expanded="true" aria-controls="collapse${counter}">
                        <span>${templist[0].split(" ")[0]}</span>
                    </button>
                </div>
        
                   <div id="collapse${counter}" class="collapse show" aria-labelledby="heading${counter}" data-parent="#accordion">
                    <div class="card-body">
                           <table class="accordion__list">`+

                            insert+

                        `</table>
                    </div>
                </div>`;

        bigParent.appendChild(day);
        templist = [];
    }
}

axios.get(`http://localhost:8080/movie/get/${params.get('id')}`).then(
    write => {
        let showTimes = [];

        for (let i =0; i< write.data.showTimes.length; i++){
            showTimes.push(write.data.showTimes[i].time);
        }
        dateSelect(showTimes.sort());
    }
)

function saveStorage(){
    sessionStorage.clear();

    console.log("the storage has been called")

    sessionStorage.setItem("adult", adultNumber);
    sessionStorage.setItem("child", childNumber);
    sessionStorage.setItem("student", studentNumber);
    sessionStorage.setItem("total", total);

    sessionStorage.setItem("name", document.getElementById("customerName").value);
    sessionStorage.setItem("phone", document.getElementById("customerPhone").value);
    sessionStorage.setItem("email", document.getElementById("customerEmail").value);

    sessionStorage.setItem("movieName", params.get('title'));
    sessionStorage.setItem("movieTime", params.get('time'));
}

