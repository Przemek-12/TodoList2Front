window.addEventListener('load', ()=>{

    document.getElementsByTagName('form')[0].addEventListener('submit', (e)=>{
        e.preventDefault();
    })

    var loginBtn = document.getElementById("loginBtn");
    var registerBtn = document.getElementById("registerBtn");

    var loginInput = document.getElementById("login");
    var passwordInput = document.getElementById("password");

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

    loginBtn.addEventListener('click', ()=>{
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/login',
            data: {
              login: loginInput.value,
              password: passwordInput.value
            }
          })
          .then(response => {
              if(response.status===200){
                localStorage.setItem("userId", response.data.id);
                window.location.href = "valhalla.html";
              }
           })
          .catch(err => console.warn(err));
    })

    registerBtn.addEventListener('click', ()=>{
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/register',
            data: {
              login: loginInput.value,
              password: passwordInput.value
            }
          })
          .then(response => console.log(response.status))
          .catch(err => console.warn(err));
    })

});