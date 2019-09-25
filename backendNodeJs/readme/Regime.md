**Show DAC**
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
    **Content:** `[{ id : 2, DACName : 'D1',Quantity : 10,DACstate:2},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************
**update DAC**
----
  update DAC.

* **URL**

  /DAC/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idDAC = [integer] ,DACName=[string],tube1=[integer],tube2=[integer] ,tube3=[integer]   ,`
 

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
