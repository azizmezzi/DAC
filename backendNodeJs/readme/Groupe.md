**Show Groups**
----
  Returns json data about all Groups.

* **URL**

  /groupe

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ idGroupe : 2, GroupeName : "G1" },{ idGroupe : 3, GroupeName : "G2" },]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`

* ***********************************************************

**delete Cow**
----
  delete a single Cow.

* **URL**

  /groupe/delete

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

**update Groupe**
----
  update Groupe.

* **URL**

  /groupe/update

* **Method:**

  `POST`
  
*  **URL Params**
 `id=[integer] ,group = [integer table], idGroupe_vachesNew = [integer table] , DietCowEdited = [integer table] `

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

**add Groupe**
----
  add Groupe.

* **URL**

  /groupe

* **Method:**

  `POST`
  
*  **URL Params**
 `GroupeName = [string ] , note =[string]`

   **Required:**
 
   None 

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : idGroupe }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "lost connection" }`
* ***********************************************************


