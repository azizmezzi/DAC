**Show Users**
----
  Returns json data about all Users.

* **URL**

  /User

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ idUSER : 2, UserName : "root" ,password :"root",Role : 0},{ idUSER : 3, UserName : "user" ,password :"user",Role : 2},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete Cow**
----
  delete a single User.

* **URL**

  /User/delete

* **Method:**

  `delete`
  
*  **URL Params**
 `idUSER=[integer]`

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

**update User**
----
  update User.

* **URL**

  /User/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idUser = [integer] ,UserNamer=[string],password=[string] ,Role =[integer],`

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

**Add User**
----
  Add single User .

* **URL**

  /User

* **Method:**

  `POST`
  
*  **URL Params**
 `UserNamer=[string],password=[string],Role=[integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : idUser }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`
