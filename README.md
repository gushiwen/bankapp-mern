## Bank App - MERN

### Description
BankApp is a simple javascript project to simulate ATM functionalities: Login, Deposit, Withdraw;    
Furthermore, it comes with some admin functionalities: Create Account, View All Accounts.    

### Installnation & Start App

#### Download Project
1. Login in GitHub, fork this repository, git clone and download it to local directory “bankapp-mern”    
2. Open terminal, change directory to “bankapp-mern”    
3. Run “npm install” in terminal    

#### Docker & Mongodb
1. Install and run docker on local machine https://www.docker.com/    
2. created and start mongodb on docker by this command “docker run --name bankapp-mern -d -p 27017:27017 mongo”    
3. Install Robo 3T https://robomongo.org/ to visually manage mongodb, add new connection “mongodb://localhost:27017” and connect    
4. Add Database “myProject” for current connection, Add Collection “users” under database “myProject”, insert JSON Document under collection “users”    
{    
    "name" : "admin",    
    "email" : "admin@gmail.com",    
    "password" : "secretsecret",    
    "role" : "admin",    
    "balance" : "0"    
}    

#### Firebase
1. Login in Firebase https://firebase.google.com/ go to console, create project “bankapp-mern”, 
under Project Overview -> Project settings, Add Firebase to Web App “banapp-mern”    
2. Firebase Build Authentication, enable Email/Password Authentication, Add user under Users tag, Email: admin@gmail.com Password: secret secret    
3. Firebase Project Overview -> Project settings -> General, copy the setting for firebaseConfig = { // … }, paste and replace in local file “/bankapp-mern/public/init-firebase.js”    
4. Firebase Project Overview -> Project settings -> Service accounts, under Firebase Admin SDK, Generate new private key for Node.js, paste downloaded file “bankapp-mern-firebase-adminsdk-******.json” to local directory “/bankapp-mern/”, paste and replace file name of private key in “/bankapp-mern/adminauth.js” for serviceAccount = require(“./bankapp-mern-firebase-adminsdk-******.json")    

#### Start App
1. Run “node index.js” in terminal    
2. Open http://localhost:3000/ with admin account to create new customers    

### Screen Shot

#### BankApp-admin    
![](https://raw.githubusercontent.com/gushiwen/bankapp-mern/main/BankApp-admin.gif)    

#### BankApp-customer    
![](https://raw.githubusercontent.com/gushiwen/bankapp-mern/main/BankApp-customer.gif)    

### Technology Stack

#### Front end
HTML, CSS, Javascript, React

#### Back end
Node.js, Express, Mongodb, Docker, Firebase

### Functionalities

#### Administrator
Current: Create Account, View All Data    
Future: Updata Account, Delete Account    

#### Customer
Current: Deposit, Withdraw    
Future: Update Personal Infomation, View Transaction History    

### License
MIT    
