# B2W Backend Challange

## Dendencies

`mongo`
`node`

## Install

    npm i --save

## Run the app

    npm run start

## Run the tests

Must run the app first

    npm run test

# REST API

The REST API to the example app is described below.

## Create a new planet

### Request

`POST planets/add`

    {
      "name": "Endor",
      "climate": "temperate",
      "terrain": "forests, mountains, lakes"
    }

### Response

    {
        "count": 1,
        "planets": [
            {
                "_id": "6022e39719d3bea7d6e6d939",
                "name": "Endor",
                "climate": "temperate",
                "terrain": "forests, mountains, lakes",
                "appearances": 1
            }
        ],
        "status": {
            "message": "OK",
            "code": 0
        }
    }

## Get a planet by name

### Request

`GET /planets/name/:name`

    curl -i -H 'Accept: application/json' http://localhost:3000/planets/name/Endor

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 184
    ETag: W/"b8-585BJw6TSxk+0Ntsf5FFO20n/Eg"
    Date: Tue, 09 Feb 2021 19:36:28 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    {
        "count": 1,
        "planets": [
            {
                "_id": "6022e39719d3bea7d6e6d939",
                "name": "Endor",
                "climate": "temperate",
                "terrain": "forests, mountains, lakes",
                "appearances": 1
            }
        ],
        "status": {
            "message": "OK",
            "code": 0
        }
    }
    
## Get a planet by ID

### Request

`GET /planets/id/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/planets/id/6022e39719d3bea7d6e6d939
    
### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 184
    ETag: W/"b8-585BJw6TSxk+0Ntsf5FFO20n/Eg"
    Date: Tue, 09 Feb 2021 19:40:49 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    
    {
        "count": 1,
        "planets": [
            {
                "_id": "6022e39719d3bea7d6e6d939",
                "name": "Endor",
                "climate": "temperate",
                "terrain": "forests, mountains, lakes",
                "appearances": 1
            }
        ],
        "status": {
            "message": "OK",
            "code": 0
        }
    }
    
## List planets

### Request

`GET /planets?climate=<climate>&terrain=<terrain>`

    curl -i -H 'Accept: application/json' http://localhost:3000/planets?climate=temperate

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 450
    ETag: W/"1c2-r8/9KZxSq9sXDHLmG8UrBZvZXfQ"
    Date: Tue, 09 Feb 2021 19:43:01 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
        "count": 3,
        "planets": [
            {
                "_id": "6022dfdd3953c3a56de04f0e",
                "name": "Naboo",
                "climate": "temperate",
                "terrain": "grassy hills, swamps, forests, mountains",
                "appearances": 4
            },
            {
                "_id": "6022dfde3953c3a56de04f0f",
                "name": "Coruscant",
                "climate": "temperate",
                "terrain": "cityscape, mountains",
                "appearances": 4
            },
            {
                "_id": "6022e39719d3bea7d6e6d939",
                "name": "Endor",
                "climate": "temperate",
                "terrain": "forests, mountains, lakes",
                "appearances": 1
            }
        ],
        "status": {
            "message": "OK",
            "code": 0
        }
    }

## Delete by name

### Request

`DELETE /planets/name/:name`

    curl -i -X DELETE -H 'Accept: application/json' http://localhost:3000/planets/name/Endor

### Response

      HTTP/1.1 200 OK
      X-Powered-By: Express
      Content-Type: application/json; charset=utf-8
      Content-Length: 184
      ETag: W/"b8-585BJw6TSxk+0Ntsf5FFO20n/Eg"
      Date: Tue, 09 Feb 2021 19:44:44 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5

    {
        "count": 1,
        "planets": [
            {
                "_id": "6022da37307fd99de820c6a4",
                "name": "Endor",
                "climate": "temperate",
                "terrain": "forests, mountains, lakes",
                "appearances": 1
            }
        ],
        "status": {
            "message": "OK",
            "code": 0
        }
    }


## Delete by id

### Request

`DELETE /planets/id/:id`

    curl -i -X DELETE -H 'Accept: application/json' http://localhost:3000/planets/id/6022dfde3953c3a56de04f0f

### Response

      HTTP/1.1 200 OK
      X-Powered-By: Express
      Content-Type: application/json; charset=utf-8
      Content-Length: 183
      ETag: W/"b7-6bIFo3Sc4MaKeG+EY+huUqQGs7c"
      Date: Tue, 09 Feb 2021 19:48:03 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5

      {
          "count": 1,
          "planets": [
              {
                  "_id": "6022dfde3953c3a56de04f0f",
                  "name": "Coruscant",
                  "climate": "temperate",
                  "terrain": "cityscape, mountains",
                  "appearances": 4
              }
          ],
          "status": {
              "message": "OK",
              "code": 0
          }
      }

