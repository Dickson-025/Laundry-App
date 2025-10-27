let services = [
    {
        img: "👕",
        service: "Dry Cleaning",
        rate: 200,
        itemAdded: true
    },
    {
        img: "🧦",
        service: "Wash & Fold",
        rate: 100,
        itemAdded: true
    },
    {
        img: "👔",
        service: "Ironing",
        rate: 30,
        itemAdded: true
    },
    {
        img: "✨",
        service: "Stain Removal",
        rate: 500,
        itemAdded: true
    },
    {
        img: "🧥",
        service: "Leather & Suede Cleaning",
        rate: 999,
        itemAdded: true
    },
    {
        img: "👗",
        service: "Wedding Dress Cleaning",
        rate: 2800,
        itemAdded: true
    },
];

let list = [];
let Total = 0;
let navEnable = false;

function renderService(){
    let servicelist = document.getElementById('serviceList');
    servicelist.innerHTML = '';
    services.forEach((item, i)=>{
        servicelist.innerHTML += 
        `<div class="itemList">
            <div class="item">
                <div>${item.img} &nbsp; ${item.service} &nbsp;&bull;&nbsp;  <span>₹ ${(item.rate).toFixed(2)}</span></div>
            </div>
            <div class="item-button ${item.itemAdded ? '' : 'remove'}">
                <button type="button" onclick="AddRemoveItem('${i}')">${item.itemAdded ? 'Add Item ➕' : 'Remove Item ➖'}</button>
            </div>
        </div>`
    })
}

function AddRemoveItem(i) {
    services[i].itemAdded = !services[i].itemAdded;
    renderService();
    renderItemList();
}

function renderItemList(){
    Total = 0;
    let addedList = document.getElementById('addedList');
    let alert = document.getElementById('alert');
    alert.innerHTML = '';
    addedList.innerHTML = '';
    list = services.filter((i)=> i.itemAdded == false)
    list.map((i)=> Total += i.rate)
    if(list.length > 0 ){
        list.forEach((item, i)=>{
            addedList.innerHTML += 
            `<tr>
                <td>${i+1}</td><td>${item.service}</td><td>₹ ${(item.rate).toFixed(2)}</td>
            </tr>`
        })
        let name = document.getElementById('name').readOnly = false;
        let email = document.getElementById('email').readOnly = false;
        let phone = document.getElementById('phone').readOnly = false;
        let button = document.getElementById('submit').disabled = false;
    } else {
        addedList.innerHTML += 
            `<tr><td colspan=3 style="text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="none" stroke="grey" stroke-width="20" width="40px"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>
            </td></tr>
            <tr><td colspan=3 style="text-align: center;"> <h4>No Items Added</h4> </td></tr>
            <tr><td colspan=3 style="text-align: center;"> Add items to the cart from the service bar </td></tr>`;

        let name = document.getElementById('name').readOnly = true;
        let email = document.getElementById('email').readOnly = true;
        let phone = document.getElementById('phone').readOnly = true;
        let button = document.getElementById('submit').disabled = true;
    }
    document.getElementById('totalAmount').innerHTML = '';
    document.getElementById('totalAmount').innerHTML = `<h3>₹ ${(Total).toFixed(2)}</h3>`;

}

function handleClick(event){
    let alert = document.getElementById('alert');
    alert.innerHTML = '';
    if(event){
        let data = {
            name: event.target[0].value,
            email: event.target[1].value,
            phone: event.target[2].value,
            total: Total,
            list: list.map((i)=>({
                service: i.service,
                rate: i.rate
            }))
        }
        console.log(data);
        alert.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" viewBox="0 0 640 640" fill="none" stroke="green" stroke-width="20" width="20px"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" /></svg>
            <span style="color: green">Email Has been sent successfully</span>
        `
        let emailseed = sendEmail(data);
        setTimeout(() => {
            alert.innerHTML = '';
            services.forEach((i)=>i.itemAdded = true);
            console.log(services);
            if(emailseed) {
                let name = document.getElementById('name').value = "";
                let email = document.getElementById('email').value = "";
                let phone = document.getElementById('phone').value = "";
                alert.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" viewBox="0 0 640 640" fill="none" stroke="green" stroke-width="20" width="20px"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" /></svg>
                    <span style="color: green">Email Has been sent successfully</span>
                `
                renderItemList();
                renderService();
            } else {
                alert.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" viewBox="0 0 640 640" fill="none" stroke="red" stroke-width="20" width="20px"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" /></svg>
                    <span style="color: red">Email Failed. Please Try again Later</span>
                `
            }
        }, 1000);
    } else if(list.length <= 0 ){
        alert.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" viewBox="0 0 640 640" fill="none" stroke="red" stroke-width="20" width="20px"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" /></svg>
            <span style="color: red">Add the items to the cart to book</span>
        `
    }
}

async function sendEmail(items = {}) {
    try {
        // const res = await fetch("http://localhost:5000/send-email", {
        const res = await fetch("https://laundry-app-3oqn.onrender.com/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
        });
        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
            return true;
        } else {
            console.error("Email failed:", data.error || "Unknown error");
            return false;
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
    // if(data.success) alert("Email Send Successfully");
    // else alert('Email Failed: ', data.error)
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-mid a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function flipArrow(){
    if(navEnable){
        document.querySelector('.arrow-svg svg').style.transform = 'rotate(0deg)'
        document.querySelector('.nav-mid').style.display = 'none';
        document.querySelector('.nav-right').style.display = 'none';

    }else {
        document.querySelector('.arrow-svg svg').style.transform = 'rotate(180deg)'
        document.querySelector('.nav-mid').style.display = 'flex';
        document.querySelector('.nav-right').style.display = 'block';
    }
    navEnable = !navEnable;
}

document.addEventListener('DOMContentLoaded', function(){
    renderService();
    renderItemList();
});