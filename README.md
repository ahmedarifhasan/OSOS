**INTRODUCTION : 
	A Geolocation based application that passes the order of a customer/user to the nearest delivery Guy using the $near operator of the mongo Database.
	Backend using Node.js, Express.js. Other Technologies such as EJS templating engine, express-session, BootStrap etc. 


**ROUTES :**
1. /user/login            -->   User Login ID   : **arif**                    
					  -User Password   : **123456**

2. /user/register         -->	 Register a user 

3. /delivery/login        -->	 Delivery Guy Login ID : **jmCmN**         
					  -Delivery Password   : **abc**

4. /delivery/register     -->	 Register a Delivery Guy

5. MongoDB Link	   -->  "mongodb+srv://arif:arif@cluster0.7cgsl.gcp.mongodb.net/geonear"


**FEATURES : 
1. Session based Web Application using (express-session) dependency.
2. Login feature for User.
3. Login feature for Delivery Guy.
4. Uses TomTom Maps API (Alternative to gmaps).
5. Shows Current User Location on the Map.
6. Shows Delivery Guys' (more than one) Location on the Map.
7. Gives the option of the user to change the current location with click of a button, if clicked / updated location the info is also changed on the Database.
8. A 'Dummy Order' Button that passes the delivery onto the nearest Delivery guy to the users current location.
9. The users order is updated onto the Database and included into the Database of the nearest delivery guys 'to-deliver' list.


Note : You can check the Database for the storage of User Info, Delivery Guy Info, Orders Info etc. Also, The Project is not complete, there are features pending and are on hold for now, There Could be bugs but this is just a demonstration of what could be done. 
**Note : Another IMPORTANT thing i wanted to mention is that I used data-type 'Number' in JS to store the coordinates for simplicity.**  

Check MongoDB for Storage of new users, new delivery guys, Orders etc.

// This Application is not Yet Complete I was supposed to complete it but because the role I was applying for wasn't vacant, I stopped it here for now.
