**Add Diet to the Cow**
----
  Add Diet to the Cow

* **URL**

  /DietCow

* **Method:**

  `POST`
  
*  **URL Params**
 `idDiet=[integer] , idCow = [integer] , begin = [date]  , end = [date] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data :""}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`

* ***********************************************************
**Show all Diet of all Cows**
----
  Returns json data about all Diet of all Cows.

* **URL**

  /DietCow/All

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
**Show all Diets of a Cow**
----
  Returns json data about all Diets of a Cow.

* **URL**

  /DietCow

* **Method:**

  `GET`
  
*  **URL Params**
 `idCow = [integer] `

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
  delete a single Diet of the Cow.

* **URL**

  /DietCow/delete

* **Method:**

  `POST`
  
*  **URL Params**
 `ids=[integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "delete" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`

* ***********************************************************

**update Cow**
----
  update Cow with Program of the Groupe.

* **URL**

  /DietCow/Edit

* **Method:**

  `POST`
  
*  **URL Params**

 `DietCowEdited = [data ] ,GroupDiet=[data] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : "update" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`


* ***********************************************************

**compare Diet**
----
   compare between Groupe Diet and Cow Diet

* **URL**

  /DietCow/Compare2

* **Method:**

  `GET`
  
*  **URL Params**

 `groupeId = [integer table ] ,vacheDiet=[data table]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : ResultatFinal }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err }`

