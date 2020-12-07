window.addEventListener('load', ()=>{

    var table = document.getElementById('table1');

    var todoId;

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    getListRequest()


      document.getElementById("addTodoBtn").addEventListener('click', (e)=>{
        e.preventDefault();
        addToDoRequest();
      })

      document.getElementById("updateTodoBtn").addEventListener('click', (e)=>{
        e.preventDefault();
        updateRequest();
        document.getElementById('editForm').style.display="none";
      })

      function getListRequest(){
        axios({
            method: 'get',
            url: 'https://acvalhallaapp.herokuapp.com/todo',
            params: {
              userId: localStorage.getItem('userId')
            }
          })
          .then(response => {
              if(response.status===200){
                console.log(response.data)
                dispList(response.data);
              }
           })
          .catch(err => console.warn(err));
      }

      function addToDoRequest(){
        axios({
            method: 'post',
            url: 'https://acvalhallaapp.herokuapp.com/todo',
            data: {
                date: document.getElementById("date").value,
                text: document.getElementById("text").value,
                user:{
                    id: localStorage.getItem('userId')
                }
            }
          })
          .then(response => {
              if(response.status===200){
                console.log(response.data)
                dispList(response.data);
              }
           })
          .catch(err => console.warn(err));
      }

      function dispList(data){
        deleteAllFromList()
        data.forEach(element => {
            addToList(element)
        });
      }

      function deleteAllFromList(){
          const rows = table.rows.length;
          for(var i=rows-1; i>0; i--){
              console.log(rows)
            table.deleteRow(i)
          }
      }

      function addToList(element){    
        var row = table.insertRow(table.rows.length);
        row.id=element.id;
        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');
        deleteBtn.innerHTML = "delete";
        editBtn.innerHTML = "edit";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.class="td2";
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = element.date;
        cell2.innerHTML = element.text;
        cell3.appendChild(deleteBtn);
        cell4.appendChild(editBtn);

        deleteBtn.addEventListener('click', ()=>{
            deleteRequest(element.id);
        })
        editBtn.addEventListener('click', ()=>{
            todoId = element.id;
            
            update(document.getElementById(element.id).cells[0].innerHTML, 
            document.getElementById(element.id).cells[1].innerHTML);

        })
      }

      function deleteRequest(todoId){
        axios({
            method: 'delete',
            url: 'https://acvalhallaapp.herokuapp.com/todo',
            params: {
                userId: localStorage.getItem('userId'),
                todoId: todoId
              }
          })
          .then(response => {
              if(response.status===200){
                console.log(response.data)
                dispList(response.data);
              }
           })
          .catch(err => console.warn(err));
      }

      function update(date, text){
          console.log(text + date)
            document.getElementById('editForm').style.display="flex";
            document.getElementById('editDate').value = date;
            document.getElementById('editText').value = text;

      }

      function updateRequest(){
        axios({
            method: 'put',
            url: 'https://acvalhallaapp.herokuapp.com/todo',
            data: {
                id: todoId,
                date: document.getElementById("editDate").value,
                text: document.getElementById("editText").value,
                user:{
                    id: localStorage.getItem('userId')
                }
            }
          })
          .then(response => {
              if(response.status===200){
                console.log(response.data)
                dispList(response.data);
              }
           })
          .catch(err => console.warn(err));
      }
});