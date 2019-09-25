**Show Fodders**
----
  Returns json data about all Fodders.

* **URL**

  /fooder

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : 2, FooderName : "F1" ,density :10},{ id : 2, FooderName : "F1" ,density :10},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete Cow**
----
  delete a single Fodder.

* **URL**

  /fooder/delete

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

**update Fodder**
----
  update Fodder.

* **URL**

  /fooder/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idFooder = [integer] ,FooderNamer=[string],density=[integer]  ,`

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

**Add Fodder**
----
  Add single Fodder .

* **URL**

  /vaches

* **Method:**

  `POST`
  
*  **URL Params**
 `FooderNamer=[string],density=[integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : idFooder }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`
