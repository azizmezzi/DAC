**show stats**
----
  show genirique log stat  about DACs.

* **URL**

  /Statistique/stats

* **Method:**

  `GET`
  
*  **URL Params**
 `resultat=[integer] `

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
**show specified stats**
----
  show specified log stat  about DACs , cows and date.

* **URL**

  /Log/stat

* **Method:**

  `GET`
  
*  **URL Params**
 `idDAC=[integer],idCow=[integer],startDate=[date],endDate=[date], `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data : [date ,QtManage ]}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************
**show average weight**
----
  show average weight cows.

* **URL**

  /Statistique/MoyenPoid

* **Method:**

  `GET`
  
*  **URL Params**
   None

   **Required:**
 
   None 

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data :resultat}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************
