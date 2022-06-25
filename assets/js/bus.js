// form {
//     STT 
//     Biển số 
//     Trạng thái
//     lái chính
//     lại phụ
// }
class bus {
    constructor() {
        this.bus = [
            

        ]
    }
    getAllBus() {
        return this.bus;
    }
    addBus(e) {
        this.bus.push(e);
    }
    remove(ironNumberNd) {
        for (var key in this.bus) {
            if (ironNumberNd == this.bus[key].ironNumber) {
                this.bus.splice(key+1,1);
                break;
            }
        }
    }
    //sửa thông tin xe
    edit(check, statusNd, mainPeopleNd, seccondPeopleNd) {
        for (var key in this.bus) {
            if (this.bus[key].ironNumber == check) {

                if (statusNd != null) {
                    this.bus[key].status = statusNd;
                }
                if (mainPeopleNd != null) {
                    this.bus[key].mainPeople = mainPeopleNd;
                }
                if (seccondPeopleNd != null) {
                    this.bus[key].seccondPeople = seccondPeopleNd;
                }
            }else{
                alert('check lại biển số hộ cái rất lôm côm')
            }
        }
    }

}
let newBus = new bus;
function add() {

    var ironNumber = document.querySelector('#add-ironNumber').value;
    var status = document.querySelector('#add-status').value;
    var mainPeople = document.querySelector('#add-mainPeople').value;
    var seccondPeople = document.querySelector('#add-peopleNd').value;
    var aBus = {
        ironNumber: ironNumber,
        status: status,
        mainPeople: mainPeople,
        seccondPeople: seccondPeople,
    }
    newBus.addBus(aBus)

    localStorage.setItem('theBus', JSON.stringify(newBus.getAllBus()));
    alert('thêm xe thành công')
    document.querySelector('#add-ironNumber').value = '';
    document.querySelector('#add-status').value = '';
    document.querySelector('#add-mainPeople').value= '';
    document.querySelector('#add-peopleNd').value = '';

}
function edit() {
    var ironNumber = document.querySelector('#add-ironNumber').value;
    var status = document.querySelector('#add-status').value;
    var mainPeople = document.querySelector('#add-mainPeople').value;
    var seccondPeople = document.querySelector('#add-peopleNd').value;

    newBus.edit(ironNumber, status, mainPeople, seccondPeople)
    localStorage.setItem('theBus', JSON.stringify(newBus.getAllBus()));
    alert('sửa xe thành công')
}
function remove() {
    var ironNumber = document.querySelector('#add-ironNumber').value;
    newBus.remove(ironNumber);
    localStorage.setItem('theBus', JSON.stringify(newBus.getAllBus()))
    alert('đã xóa xe')

}
