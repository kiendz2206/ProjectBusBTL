
class usersx {
    constructor() {
        this.user = [
            {
                userName: 'khoa',
                email: 'khoadepzai@gmail.com',
                password: 'khoa2711',
                date: '27/11/2003',
                gender: 'nam',
                role: 'admin',
            }
        ]

    }
    add(user) {
        this.user.push(user);

    }
    getAllUser() {
        return this.user;

    }

}
let userTest = new usersx;
function register(e) {
    var userName = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var day = document.querySelector('#day').value;
    var month = document.querySelector('#month').value;
    var year = document.querySelector('#year').value;
    var gender = document.querySelector("input[name='sex']").value;
    var oldUser = JSON.parse(window.localStorage.getItem('users'));
    console.log(oldUser);
    var json = JSON.stringify(userTest.getAllUser());
    window.localStorage.setItem('users', json);
    var checkUserName = oldUser.every(function (user) {
        return user.userName == document.querySelector('#name').value;

    })
    console.log(checkUserName)

    if (checkUserName == false) {
        var user = {
            userName: userName,
            email: email,
            password: password,
            date: day + '/' + month + '/' + year,
            gender: gender,
            role: 'member',
        }
        userTest.add(user);
        var json = JSON.stringify(userTest.getAllUser());
        window.localStorage.setItem('users', json);
        alert('đăng ký thành công')
        window.location.href = 'login.html';

    } else {
        alert('tài khoản đã được sử dụng')
    }





}



function login(e) {
    var userName = document.querySelector('#userName').value;
    var password = document.querySelector('#password').value;

    var user = JSON.parse(localStorage.getItem('users'));
    console.log(user)
    if (userName == '' || password == '') {
        alert('nhập tài khoản mật khẩu đê')
    } else {
        var checkUser = user.some(function (user) {
            return user.userName == document.querySelector('#userName').value
                &&
                user.password == document.querySelector('#password').value

        })
        console.log(checkUser)
        if (checkUser == true) {
            for (var key in user) {
                if (user[key].userName == document.querySelector('#userName').value) {
                    sessionStorage.setItem('users', JSON.stringify(user[key]))
                    switch (user[key].role) {
                        case 'member':
                            window.location.href = 'home.html'

                            break;

                        case 'admin':
                            window.location.href = 'admin.html'

                            break;

                        case 'company':
                            alert('chưa làm')

                            break;


                    }
                }
            }

        } else {
            alert('nhập lại mật khẩu đê mở to mắt ra nhìn xem có sai ký tự nào không ?')
        }



    }


}
let user = sessionStorage.getItem('user');
user = JSON.parse(user);
console.log(user)
function permission(role) {
    let users = localStorage.getItem('users');
    users = JSON.parse(users);
    let user = sessionStorage.getItem('users');
    user = JSON.parse(user);
    console.log(user)
    if (user != null ) {
        for (var key in users) {
            if (user.userName == users[key].userName && user.password == users[key].password) {
                if (user.role == role) {
                    return true
                }
                else{
                    return false
                }

            }
        }
    }
    else{ return false;}
   
}
