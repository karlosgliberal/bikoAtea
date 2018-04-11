/**
* Copyright 2016 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or https://puertabiko.firebaseio.coma;greed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Particle = require("particle-api-js");
const serviceAccount = require('./puertaBiko-key.json');

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:"https://puertabiko.firebaseio.com"
});

const db = admin.firestore();

exports.puertaAbierta = functions.https.onRequest((req, res) => {
  const particle = new Particle();
  const deviceId = "1b003e001247343432313031";
  const name = "sound";
  const auth = "18ac8c8ca8c8fc6d0204c1042729b5f90040dc57";
  const token = "vg6PbAimIzWl3yhJfd9fti71m30QVAyJQy0kjWLt";

  if(req.query.auth == token){
    particle
    .getVariable({
      deviceId,
      name,
      auth
    })
    .then(
      data => {
        db
        .collection("puertaBiko")
        .add({ sonido: data.body.result, timestamp: Date.now() })
        .then(() => res.status(200).end());
      },
      err => {
        console.log("An error occurred while getting attrs:", err);
      }
    );
  }else {
    console.log("error token");
  }
});
