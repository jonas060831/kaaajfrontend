type Region = "northeast" | "midwest" | "south" | "west"

export type StateItem = {
    value: string;
    full: string;
    id: number
}

export type statesType = {
    [key in Region] : StateItem[];
}

const states: statesType = {
"northeast": [
    { "value": "CT", "full": "Connecticut", "id": 7 },
    { "value": "ME", "full": "Maine", "id": 19 },
    { "value": "MA", "full": "Massachusetts", "id": 21 },
    { "value": "NH", "full": "New Hampshire", "id": 29 },
    { "value": "NJ", "full": "New Jersey", "id": 30 },
    { "value": "NY", "full": "New York", "id": 32 },
    { "value": "PA", "full": "Pennsylvania", "id": 38 },
    { "value": "RI", "full": "Rhode Island", "id": 39 },
    { "value": "VT", "full": "Vermont", "id": 45 }
  ],
  "midwest": [
    { "value": "IL", "full": "Illinois", "id": 13 },
    { "value": "IN", "full": "Indiana", "id": 14 },
    { "value": "IA", "full": "Iowa", "id": 15 },
    { "value": "KS", "full": "Kansas", "id": 16 },
    { "value": "MI", "full": "Michigan", "id": 22 },
    { "value": "MN", "full": "Minnesota", "id": 23 },
    { "value": "MO", "full": "Missouri", "id": 24 },
    { "value": "ND", "full": "North Dakota", "id": 33 },
    { "value": "NE", "full": "Nebraska", "id": 26 },
    { "value": "OH", "full": "Ohio", "id": 34 },
    { "value": "SD", "full": "South Dakota", "id": 40 },
    { "value": "WI", "full": "Wisconsin", "id": 48 }
  ],
  "south": [
    { "value": "AL", "full": "Alabama", "id": 1 },
    { "value": "AR", "full": "Arkansas", "id": 4 },
    { "value": "DE", "full": "Delaware", "id": 8 },
    { "value": "FL", "full": "Florida", "id": 9 },
    { "value": "GA", "full": "Georgia", "id": 10 },
    { "value": "KY", "full": "Kentucky", "id": 17 },
    { "value": "LA", "full": "Louisiana", "id": 18 },
    { "value": "MD", "full": "Maryland", "id": 20 },
    { "value": "MS", "full": "Mississippi", "id": 25 },
    { "value": "NC", "full": "North Carolina", "id": 31 },
    { "value": "OK", "full": "Oklahoma", "id": 35 },
    { "value": "SC", "full": "South Carolina", "id": 41 },
    { "value": "TN", "full": "Tennessee", "id": 42 },
    { "value": "TX", "full": "Texas", "id": 43 },
    { "value": "VA", "full": "Virginia", "id": 46 },
    { "value": "WV", "full": "West Virginia", "id": 47 }
  ],
  "west": [
    { "value": "AK", "full": "Alaska", "id": 2 },
    { "value": "AZ", "full": "Arizona", "id": 3 },
    { "value": "CA", "full": "California", "id": 5 },
    { "value": "CO", "full": "Colorado", "id": 6 },
    { "value": "HI", "full": "Hawaii", "id": 11 },
    { "value": "ID", "full": "Idaho", "id": 12 },
    { "value": "MT", "full": "Montana", "id": 27 },
    { "value": "NV", "full": "Nevada", "id": 28 },
    { "value": "NM", "full": "New Mexico", "id": 30 },
    { "value": "OR", "full": "Oregon", "id": 36 },
    { "value": "UT", "full": "Utah", "id": 44 },
    { "value": "WA", "full": "Washington", "id": 49 },
    { "value": "WY", "full": "Wyoming", "id": 50 }
  ]
}

export default states