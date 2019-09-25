**Add Diet to the Groupe**
----
  Add Diet to the Groupe

* **URL**

  /DietGroup

* **Method:**

  `POST`
  
*  **URL Params**
 `idDiet=[integer] , idGroup = [integer] , begin = [date]  , end = [date] `

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
**Show all Diet of all Groupes**
----
  Returns json data about all Diet of all Groupes.

* **URL**

  /DietGroup/All

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
**Show all Diets of a Groupe**
----
  Returns json data about all Diets of a Groupe.

* **URL**

  /DietGroup

* **Method:**

  `GET`
  
*  **URL Params**
 `idGroup = [integer] `

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
  delete a single Diet of the Groupe.

* **URL**

  /DietGroup/delete

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
  update Cow with Program and affectation.

* **URL**

  /DietGroup/update

* **Method:**

  `POST`
  
*  **URL Params**
 `idDiet_Group = [integer ] ,idDiet=[integer] , idGroup = [integer] , begin = [date]  , end = [date] `

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

**Edit Diet of Groupe**
----
  edit specified . 

* **URL**

  /DietGroup/update

* **Method:**

  `POST`
  
*  **URL Params**

 `GroupDietDeleted = [integer table ] ,GroupDiet=[data table] , GroupDietAdd = [data table] , idGroupe = [integer] `

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

