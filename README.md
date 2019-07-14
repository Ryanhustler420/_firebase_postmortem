# \_firebase_postmortem

firebase scratch board for core functionallity testing

##### start

```
npm install

ng serve

```

```
http://localhost:4200
```

##### firebase setup process

1. Hoff over to firebase console
2. Create a new instence
3. Create a database
4. Grab Your api firebaseConfig Object and put inside `init-db.ts` file

```js
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyewweM_lsdsdsdwrqC8amyB4m_K5zjcf2gg7b-IEr_CA',
  authDomain: 'hello-app.firebaseapp.com',
  databaseURL: 'https://hello-app.firebaseio.com',
  projectId: 'hello-app',
  storageBucket: 'hello-app.appspot.com',
  messagingSenderId: '223698912236',
  appId: '1:917473423866:web:a169e59090eb225f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

5. run this ``npm run init-db``
6. check database in your firebase console
7. ng serve


## generate service

``
ng g service services/courses
``

##### Firestore Persistent Document Reference

``
Create A New Field In Any Document And Set Type to `reference`.
and than paste the full path of any other document. example: 
`/courses/2LVjB3tcSVQ8iYD5pkID`. now copy the path of the document where you inserted the reference. example: `/courses/5SceXGmXKGV757Glmlzs`
and make a request in the client side.
``
