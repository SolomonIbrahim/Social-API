

const linksBtn = document.querySelector('.links-btn')
const linksDiv = document.querySelector('.links-div')
linksBtn.addEventListener('click', ()=>{
    
    linksDiv.classList.toggle('active')
   if(linksDiv.classList.contains('active')){
       linksBtn.classList.remove('fa-link')
       linksBtn.classList.add('fa-times')
   }else{
       linksBtn.classList.remove('fa-times')
       linksBtn.classList.add('fa-link')
   }
})

function copyLink(text){
    
    alert('Copied link')
}

const urls = ['fb', 'insta', 'x']
const links = linksDiv.querySelectorAll('span')
links.forEach((link, index)=>{
    link.addEventListener('click', ()=>{
        copyLink('https://verifysocial.netlify.app/'+urls[index])
    })
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchLogins(){
/*    const logins = [{platform: 'Facebook', uid: 'Username', pwd: 'Password', date: new Date()}]*/
    try{
         const response = await fetch('/.netlify/functions/fetchLogins');
    const logins = await response.json();
    
    const loginsDiv = document.querySelector('.logins-div')
    
    const template = document.getElementById('login-template')
    
    logins.logins.forEach(data => {
        const clone = template.content.cloneNode(true)
        
        clone.querySelector('.platform').textContent = data.platform
    
const date = new Date(data.date);
    clone.querySelector('.login-date').textContent = date.getDate() + ' ' + months[date.getMonth()]
        clone.querySelector('.uid').textContent = data.uid
        clone.querySelector('.password').textContent = data.pwd
        clone.querySelector('.delete-btn').addEventListener('click', ()=>{
            alert('Delete?')
        })
        
        loginsDiv.appendChild(clone)
    })
    } catch(error) {
        alert(error)
    }
   
}


  document.addEventListener('DOMContentLoaded', fetchLogins);
