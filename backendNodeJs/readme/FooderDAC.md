**Add Fooder in DAC**
----
  add Fodder to the DAC

* **URL**

  /FooderDAC

* **Method:**

  `POST`
  
*  **URL Params**
 `idFooder=[integer] , idDAC = [integer] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data :"success"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`

* ***********************************************************
**Show all Fodders of the DAC**
----
  Returns json data about all Fodder of the DAC.

* **URL**

  /FooderDAC

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ data : result}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`

* ***********************************************************

**delete Cow**
----
  delete a single Fodder of the DAC.

* **URL**

  /FooderDAC/delete

* **Method:**

  `POST`
  
*  **URL Params**
 `idFooder=[integer]`

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
 `post=[data] `

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

