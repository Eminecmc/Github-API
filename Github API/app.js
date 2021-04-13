const githubForm = document.getElementById("github-form");
const nameInput  = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListener();

function eventListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}
function getData(e){

    let username = nameInput.value.trim();
    if(username ===""){
        alert ("litfen geçerli bir kullanıcı adı giriniz.");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                //hata mesajı
                ui.showError("kullanıcı bulunamadı.");
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));

    }
    ui.clearInput();  // input temizleme
    e.preventDefault();


}
function clearAllSearched(){  //tüm arananları temizle
     
     if (confirm("Emin misiniz ?")){
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan Temizleme
        ui.clearAllSearchedFromUI();
    }

}
function getAllSearched(){   // Arananları storagedan al ve Uİ ye ekle
    
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`;

    });

    lastUsers.innerHTML = result;

}