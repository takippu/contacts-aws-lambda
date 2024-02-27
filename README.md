# contacts-aws-lambda

<h2>Assessment for Vimigo</h2>
<h4>Brief Description : </h4>
<p>Contacts-Aws-Lambda is a serverless API Service for Contact Information developed using AWS Lambda, DynamoDB and ApiGateWay. Contact Information has details such as name, gender, phone number and email address. This was built for an assessment test for Vimigo.</p>
<hr/>
<h3>Quick Go Through</h3>
https://www.loom.com/share/a1918805711d4f629b20bea925012548
<hr/>
<h3>API Documentation</h3>
<p>The API features these operations for Contacts Information :</p>
<ol>
  <li>Get All Contacts Information</li>
  <li>Get Specific Contact Information based on ID</li>
  <li>Create a new Contact Information</li>
  <li>Delete a specific Contact Information </li>
  <li>Search for a Contact Information based on its name</li>
  <li>Search for a Contact Information based on its email</li>
  <li>Search for a Contact Information based on its gender</li>
  <li>Get all Contacts Information sorted alphabetically (Ascending and Descending)</li>
  <li>Get latest Contacts Information based on length</li>
</ol>
<span><i>This documentation will provide the POSTMAN link and Examples</i></span>
<br> <br>
<p>The base URL for the API is `https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/`.</p>
<p>POSTMAN links is `https://elements.getpostman.com/redirect?entityId=31793035-ba2820a9-76b7-4915-a1a8-2b09e3273f7d&entityType=collection`</p>

<h4>##Endpoints</h4>
<h6>1. Get All </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts <br>
  Description: Get All Contacts Information. <br>
  Response Example: <br>
</p>
<div>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/12dd325b-5392-460e-9088-154902557b56">
</div>
<h6>2. Get Specific Contact </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/{id} <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/1 <br>
  Description: Get Specific Contact Information based on id <br>
  Response Example: <br>
</p>
<div>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/8260a2e7-d6ac-420b-b0de-9a21982af02f">
</div>
<h6>3. Create a contact </h6>
<p>
  HTTP Method: PUT <br>
  Endpoint URL: /contacts <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts <br>
  Description: Create a new contact information <br>
  
</p>
<div>
  Request Body: (JSON) <br>
  { <br>
      "id": "4", <br>
      "name": "Nancy", <br>
      "gender": "Female", <br>
      "phoneNum": "019919291", <br>
      "email": "nancy@example.com" <br>
  } <br>
</div>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/b20e33c0-b999-4340-93d5-3b720db5f153">
</div>
<h6>4. Delete a contact </h6>
<p>
  HTTP Method: DELETE <br>
  Endpoint URL: /contacts/{id} <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/1 <br>
  Description: Delete a specific Contact Information based on id <br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/06567bb7-ad95-4b4c-8fe2-54f26ed40a3c">
</div>
<h6>5. Search with name </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/search <br>
  Parameter: name <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/search?name=Nancy <br>
  Description: Search for contact information using name<br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/faa1069e-8461-4182-b68e-b026d3879a39">
</div>
<h6>6. Search with email </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/search <br>
  Parameter: email <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/search?email=nancy@example.com <br>
  Description: Search for contact information using email<br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/34752c2d-defc-4791-b479-1e683232929c">
</div>
<h6>7. Search with gender </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/search <br>
  Parameter: gender <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/search?gender=Female <br>
  Description: Search for contact information using gender<br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/f7d5300e-a8f7-49da-b5be-a06fb4da3487">
</div>
<h6>8. Get all contacts sorted alphabetically </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/search <br>
  Parameter: sort<br>
  Value: ASC, DESC<br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/search?sort=DESC <br>
  Description: Get all contacts information sorted alphabetically either ascending or descending<br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/05dad6f5-07f5-402a-8a1f-2f9e2d86098b">
</div>
<h6>9. Get latest contact by length </h6>
<p>
  HTTP Method: GET <br>
  Endpoint URL: /contacts/search <br>
  Parameter: latest <br>
  Value: any length such as 1,2,3,... <br>
  Example: https://nwfhtz0hhi.execute-api.us-east-1.amazonaws.com/contacts/search?latest=3 <br>
  Description: Get latest contact by length that was specified<br>
  
</p>
<div>
  Response Example: <br>
  <img src="https://github.com/takippu/contacts-aws-lambda/assets/70655268/19cbc7a5-8996-4dd9-8cd0-0f38218a2365">
</div>
