//để anh viết cho nốt rồi cứ theo mẫu này lm
class Bus {

    constructor() {
        this.storage_key = 'tbl_bus';
        this.data = this.load();

        this.status = '';
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
            this.status = this.data[index].status;
            this.ironNumber = this.data[index].ironNumber;
            this.mainPeople = this.data[index].mainPeople;
            this.seccondPeople = this.data[index].seccondPeople;
            return true;
        }
        return false;
    }

    //hàm cập nhật lại dữ liệu
    update(index) {
        this.data[index].status = this.status;
        this.data[index].ironNumber = this.ironNumber;
        this.data[index].mainPeople = this.mainPeople;
        this.data[index].seccondPeople = this.seccondPeople;
        this.save();
    }

    //hàm chức năng thêm
    add() {
        //push thêm phần tử vào biến data
        this.data.push({
            ironNumber: this.ironNumber,
            status: this.status,
            mainPeople: this.mainPeople,
            seccondPeople: this.seccondPeople,
        });
        //tiến hành lưu
        this.save();
    }

    //hàm chức năng lưu vào storage
    save() {
        localStorage.setItem(this.storage_key, JSON.stringify(this.data));
    }

}

function add() {
    let objBus = new Bus;
    objBus.ironNumber = document.querySelector('#add-ironNumber').value;
    objBus.status = document.querySelector('#add-status').value;
    objBus.mainPeople = document.querySelector('#add-mainPeople').value;
    objBus.seccondPeople = document.querySelector('#add-peopleNd').value;
    objBus.add();
    document.querySelector('#add-ironNumber').value = '';
    document.querySelector('#add-status').value = '';
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
    //dựa vào key để lấy ra phần tử
    let objBus = new Bus;
    if (objBus.check(index)) {
        //mở popup edit lên
        document.location.hash = '#edit';
        //giờ add value này vào form edit
        document.querySelector('#edit-ironNumber').value = objBus.ironNumber;
        document.querySelector('#edit-status').value = objBus.status;
        document.querySelector('#edit-mainPeople').value = objBus.mainPeople;
        document.querySelector('#edit-peopleNd').value = objBus.seccondPeople;

        document.querySelector('#btn-edit-bus').setAttribute('data-index', index);
    }

}

function update() {
    // lấy ra vị trí index để thwucj hiện update
    let index = document.querySelector('#btn-edit-bus').getAttribute('data-index');
    let objBus = new Bus;
    if (objBus.check(index)) {
        objBus.ironNumber = document.querySelector('#edit-ironNumber').value;
        objBus.status = document.querySelector('#edit-status').value;
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
        tr += '<td>' + stt + '</td><td>' + bus.ironNumber + '</td><td>' + bus.status + '</td><td>' + bus.mainPeople + '</td><td>' + bus.seccondPeople + '</td>';
        tr += '<td><button type="button" onclick="edit(' + reverse_key + ')" class="btn-edit">Sửa</button><button type="button" onclick="destroy(' + reverse_key + ')" class="btn-delete">Xóa</button></td>';
        tr += '</tr>';
    }
    table.innerHTML = tr;
}

