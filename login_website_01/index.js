document.addEventListener("DOMContentLoaded", function() {

    // Initialize password_dict and loggedin_users from local storage, if available
    let password_dict = JSON.parse(localStorage.getItem('password_dict')) || {};
    let loggedin_users = JSON.parse(localStorage.getItem('loggedin_users')) || [];
  
    // Login function
    if (document.getElementById("loginButton")) {
      document.getElementById("loginButton").onclick = function() {
        let loggedIn = false;
        let found = false;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let output = document.getElementById("output_login");
  
        for (let user in password_dict) {
            if (username == user) {
                found = true
                if (password == password_dict[user]) {
                    output.innerHTML = "You have selected the correct password and logged in.<br>Welcome, " + username + "!";
                    loggedin_users.push(username);
                    localStorage.setItem('loggedin_users', JSON.stringify(loggedin_users)); 
                    loggedIn = true;
                    break;
                } 
                else {
                    output.innerHTML = "Incorrect password.";
                    break;
                }
            }
        }
          
        if (!found && !loggedIn) {
            output.innerHTML = "Your username was not found, we recommend you signup first.";
          }
          
      }
    }
  
    // Signup function
    if (document.getElementById("signupButton")) {
      document.getElementById("signupButton").onclick = function() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let password_check = document.getElementById("password_check").value;
        let output = document.getElementById("output_signup");
  
        if (password == password_check) {
          for (let user in password_dict) {
            if (username == user) {
              output.innerHTML = "This username already exists, please choose another one.";
              break;
            }
          }
          let dicttemp = {};
          dicttemp[username] = password;
          password_dict = { ...password_dict,
            ...dicttemp
          };
          localStorage.setItem('password_dict', JSON.stringify(password_dict)); 
          output.innerHTML = "You have successfully been registered.";
        } else {
          output.innerHTML = "You have to enter the same password twice to authenticate it.";
        }
        console.log(password_dict);
      }
    }
  
    // Check login function
    if (document.getElementById("checkLoginButton")) {
      document.getElementById("checkLoginButton").onclick = function() {
        let response = document.getElementById("username").value;
        check_if_loggedin(response);
      }
  
      function check_if_loggedin(iUsername) {
        let logged_in = false;
        let output = document.getElementById("output_check");

        for (let i = 0; i < loggedin_users.length; i += 1) {
          if (loggedin_users[i] == iUsername) {
            output.innerHTML = "Good news, " + iUsername + "! It seems like you are logged in.";
            logged_in = true;
            break;
          }
        }
        if (!logged_in) {
            let found = false;
            for( user in password_dict){
                if(user == iUsername){
                    console.log("found user");
                    found = true;
                    break;
                }
            }
            if(found){
            output.innerHTML = "It would seem you are not logged in.";
            }
            else{
            output.innerHTML = "Dear user,<br>You are required to signup first before you can login"
            }
        }
      }
  
      console.log("the code has run")
    }
});
  