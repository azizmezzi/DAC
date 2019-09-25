**Show Cows of the Groupe**
----
 Show Cows of a single Groupe

* **URL**

  /GroupCow

* **Method:**

  `GET`
  
*  **URL Params**
 `idGroupe=[integer] `

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data : result}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : err}`

* ***********************************************************
**Show Cows of All Groupes**
----
 Show Cows of all Groupes

* **URL**

  /GroupCow/All

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ data : result},]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error :err }`

* ***********************************************************

**Show Groupes of Cow**
----
Showing groupes of a single cow

* **URL**

  /GroupCow/Cow

* **Method:**

  `GET`
  
*  **URL Params**
 `idCow=[integer]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : result }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{  err }`


