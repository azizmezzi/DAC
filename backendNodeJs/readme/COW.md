**Add Cows**
----
  add Cow .

* **URL**

  /vaches

* **Method:**

  `POST`
  
*  **URL Params**
 `Cow=[data] , CowDiet = [table] , viewDietCow = [boolean]  , group = [integer table]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data : id}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************
**Show Cows**
----
  Returns json data about all Cows.

* **URL**

  /vaches

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : 2, name : "vache1" ,DateCow : "02-02-2018",weight:120,type : "sein",CINCOW : 1278,note:"",Father :1,Mother :Null},{ id : 3, name : "vache2" ,DateCow : "02-03-2018",weight:120,type : "malade",CINCOW : 127888,note:"",Father :3,Mother :2},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete Cow**
----
  delete a single Cow.

* **URL**

  /vaches/delete

* **Method:**

  `delete`
  
*  **URL Params**
 `id=[integer]`

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

**update Cow**
----
  update Cow with Program and affectation.

* **URL**

  /vaches/Edit

* **Method:**

  `POST`
  
*  **URL Params**
 `id=[integer] , CowDiet = [table] , viewDietCow = [boolean]  , group = [integer table]`

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

**mobile update Cow**
----
  update single Cow .

* **URL**

  /vaches/EditCow

* **Method:**

  `POST`
  
*  **URL Params**
 `id=[integer] , Cow=[data]`

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
