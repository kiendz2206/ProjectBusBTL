
class Bus {

    constructor() {
        this.storage_key = 'tbl_bus';
        this.data = this.load();

        this.status = 'Chờ xét duyệt';
        this.ironNumber = '';
        this.mainPeople = '';
        this.seccondPeople = '';
    }

    //hàm có chức năng load dư liệu từ stoage
    load() {
        if (localStorage.hasOwnProperty(this.storage_key)) {
            return JSON.parse(localStorage.getItem(this.storage_key));
        }
        return [];
    }

    //hàm có chức năng check key xem có tồn tại trong dữ liệu hay ko
    check(index) {
        if (index in this.data) { 
            this.ironNumber = this.data[index].ironNumber;
            this.mainPeople = this.data[index].mainPeople;
            this.seccondPeople = this.data[index].seccondPeople;
            return true;
        }
        return false;
    }

    update(index) {
        this.data[index].status = this.status
        this.data[index].ironNumber = this.ironNumber;
        this.data[index].mainPeople = this.mainPeople;
        this.data[index].seccondPeople = this.seccondPeople;
        this.save();
    }

    add() {
   
        this.data.push({
            ironNumber: this.ironNumber,
            status: this.status,
            mainPeople: this.mainPeople,
            seccondPeople: this.seccondPeople,
        });
       
        this.save();
    }


    save() {
        localStorage.setItem(this.storage_key, JSON.stringify(this.data));
    }
    delete_all(){
        this.data.splice(0,this.data.length)
    }
   

}

function add() {
    let objBus = new Bus;
    objBus.ironNumber = document.querySelector('#add-ironNumber').value;
  
    objBus.mainPeople = document.querySelector('#add-mainPeople').value;
    objBus.seccondPeople = document.querySelector('#add-peopleNd').value;
    objBus.add();
    document.querySelector('#add-ironNumber').value = '';

    document.querySelector('#add-mainPeople').value = '';
    document.querySelector('#add-peopleNd').value = '';
    document.location.hash = '#finish';
    show();
}

function destroy(index) {
    if(confirm('Bạn có đồng ý xóa không?')){
        let objBus = new Bus;
        if (index > -1) {
            objBus.data.splice(index, 1);
            objBus.save();
            show();
        }
    }
}

function edit(index) {
    
    let objBus = new Bus;
    if (objBus.check(index)) {
    
        document.location.hash = '#edit';
       
        document.querySelector('#edit-ironNumber').value = objBus.ironNumber;
        document.querySelector('#edit-mainPeople').value = objBus.mainPeople;
        document.querySelector('#edit-peopleNd').value = objBus.seccondPeople;
        document.querySelector('#btn-edit-bus').setAttribute('data-index', index);
    }

}

function update() {
   
    let index = document.querySelector('#btn-edit-bus').getAttribute('data-index');
    let objBus = new Bus;
    if (objBus.check(index)) {
        objBus.ironNumber = document.querySelector('#edit-ironNumber').value;
        objBus.mainPeople = document.querySelector('#edit-mainPeople').value;
        objBus.seccondPeople = document.querySelector('#edit-peopleNd').value;
        objBus.update(index);
    }
    document.location.hash = '#finish';
    show();

}

function show() {
    let objBus = new Bus;
    let table = document.querySelector('#tblList tbody');
    let tr = '';
    let stt = 0;
    objBus.data.reverse();
    for (let key in objBus.data) {
        stt++;
        let reverse_key = objBus.data.length - key -1;
        let bus = objBus.data[key];
        tr += '<tr>';
        tr += '<td>' + stt + '</td><td>' + bus.ironNumber + '</td><td>' + bus.mainPeople + '</td><td>' + bus.seccondPeople + '</td><td>' + bus.status + '</td>';
        tr += '<td><button type="button" onclick="edit(' + reverse_key + ')" class="btn-edit">Sửa</button><button type="button" onclick="destroy(' + reverse_key + ')" class="btn-delete">Xóa</button></td>';
        tr += '</tr>';
    }
    table.innerHTML = tr;

}
function delete_all(){
    if(confirm('Bạn có muốn xóa tất cả bus ??')){
    let objBus = new Bus;
    objBus.delete_all();
    objBus.save();
    show();
    }
    
}
function acceptBus(index){
    let objBus = new Bus;
    if(objBus.check(index)){
        objBus.status = 'đang hoạt động'
        objBus.update(index);
    }
    document.location.hash = '#finish';
    showBus_manager();

}


function showBus_manager(){
    
    let objBus = new Bus;
    console.log(objBus.data)
    let tr ='';
    let stt = 0;
    let table = document.querySelector('#acpt-bus #tbl-apct tbody')
    console.log(table)
   
    if(objBus.data != null){
        for(let key in objBus.data){
            stt++
            if(objBus.data[key].status === 'Chờ xét duyệt'){
                tr+= '<tr>';
                tr+= '<td>'+stt+'</td>'+ '<td>'+objBus.data[key].ironNumber+'</td>'+ '<td><button type="button" onclick ="acceptBus('+key+')">accept </button></td>'+ '<td><button type="button" onclick ="acceptBus('+key+')">accept </button></td>';
                tr+= '</tr>';
    
            }
        
        }
        console.log(tr)
        table.innerHTML = tr;
      
    

    } else{
        alert('khong co')
    }
   
}
function findBus(){
    let busFind = document.querySelector('#findBus').value;
    console.log(busFind)
    let objBus = new Bus;
    let tblFind = document.querySelector('#resultFind');
    let div = '';
    for(let key in objBus.data){
        if(objBus.data[key].status == 'đang hoạt động' && objBus.data[key].ironNumber == busFind){
        div = '<div class = "findChild"><div class="col-6 text-center">' + objBus.data[key].ironNumber + '</div> <div class="col-6 text-center">'+objBus.data[key].mainPeople+'</div> </div>'
        tblFind.innerHTML = div;
        }

    }
    
}

