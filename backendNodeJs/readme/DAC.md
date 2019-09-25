**Add DAC**
----
  add Cow .

* **URL**

  /DAC

* **Method:**

  `POST`
  
*  **URL Params**
 `DACName = [string] ,Quantity = [integer] ,DACstate = [integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data : idDAC}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************
**Show DACs**
----
  Returns json data about all DACs.

* **URL**

  /DAC

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ idDAC : 2, DACName : "DAC1" ,DACstate : 1,Quantity:120 },{ id : 3, DACName : "DAC2" ,DACstate : 2,Quantity:120,},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete DAC**
----
  delete a single DAC.

* **URL**

  /vaches/delete

* **Method:**

  `POST`
  
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

**update DAC**
----
  update DAC with updating fodder in the tube of the DAC.

* **URL**

  /vaches/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idDAC =[integer ], DACName = [string] ,Quantity = [integer] ,DACstate = [integer] , tube1=[integer] , tube2=[integer] ,  tube3=[integer] ,  `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "update" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`
* ***********************************************************

**mobile update tube**
----
  update data in tubes .

* **URL**

  /vaches/updateTube

* **Method:**

  `POST`
  
*  **URL Params**
 `idDAC =[integer ], tube1=[integer] , tube2=[integer] ,  tube3=[integer] ,  `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "success" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`
