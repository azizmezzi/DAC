**Show Notifications**
----
  Returns json data about all Notifications.

* **URL**

  /Notification

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ idNotification : 2, Notification : "root" ,idUser :2},{ idNotification : 3, Notification : "Notification" ,idUser:3},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete Cow**
----
  delete a single Notification.

* **URL**

  /Notification/delete

* **Method:**

  `delete`
  
*  **URL Params**
 `idNotification=[integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "delete" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**update Notification**
----
  update Notification.

* **URL**

  /Notification/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idNotification = [integer] ,Notification=[string],idUser=[integer] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "success" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`
* ***********************************************************

**Add Notification**
----
  Add single Notification .

* **URL**

  /Notification

* **Method:**

  `POST`
  
*  **URL Params**
 `Notification=[string],idUser=[integer] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : idNotification }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`
