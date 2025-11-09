const medicines = [
  {
    id: 1,
    name: "Healthkart HK Vitals Calcium + Vitamin D3",
    price: 268.73,
    mrp: 349,
    discount: 23,
    description: "Essential supplement for bone health and immunity.",
    image: "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 101,
        name: "Shelcal 500mg",
        price: 128.47,
        mrp: 159,
        discount: 19
      },
      {
        id: 102,
        name: "Evion 400mg",
        price: 72.10,
        mrp: 87,
        discount: 17
      }
    ]
  },
  {
    id: 2,
    name: "Zincovit Multivitamin Tablets",
    price: 102.00,
    mrp: 130,
    discount: 22,
    description: "Complete multivitamin supplement with minerals for daily health.",
    image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 201,
        name: "Revital H",
        price: 115.50,
        mrp: 136,
        discount: 15
      },
      {
        id: 202,
        name: "Becosules",
        price: 98.00,
        mrp: 109,
        discount: 10
      }
    ]
  },
  {
    id: 3,
    name: "Crocin 500mg Tablet",
    price: 30.00,
    mrp: 40,
    discount: 25,
    description: "Paracetamol tablet for fever and pain relief.",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 301,
        name: "Paracetamol 500mg",
        price: 22.00,
        mrp: 31,
        discount: 30
      },
      {
        id: 302,
        name: "Dolo 650",
        price: 28.00,
        mrp: 35,
        discount: 20
      }
    ]
  },
  {
    id: 4,
    name: "Combiflam Tablet",
    price: 52.00,
    mrp: 65,
    discount: 20,
    description: "Ibuprofen and Paracetamol combination for effective pain relief.",
    image: "https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 401,
        name: "Flexon Tablet",
        price: 48.00,
        mrp: 56,
        discount: 15
      },
      {
        id: 402,
        name: "Ibugesic Plus",
        price: 50.00,
        mrp: 55,
        discount: 10
      }
    ]
  },
  {
    id: 5,
    name: "Azithral 500mg",
    price: 85.00,
    mrp: 100,
    discount: 15,
    description: "Antibiotic for treating bacterial infections.",
    image: "https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 501,
        name: "Azee 500",
        price: 82.00,
        mrp: 95,
        discount: 14
      },
      {
        id: 502,
        name: "Zithrocin 500mg",
        price: 88.00,
        mrp: 98,
        discount: 10
      }
    ]
  },
  {
    id: 6,
    name: "Telmikind 40mg",
    price: 125.00,
    mrp: 150,
    discount: 17,
    description: "Medicine for hypertension and heart failure.",
    image: "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 601,
        name: "Telma 40",
        price: 130.00,
        mrp: 150,
        discount: 13
      },
      {
        id: 602,
        name: "Telsar 40",
        price: 122.00,
        mrp: 140,
        discount: 13
      }
    ]
  },
  {
    id: 7,
    name: "Ecosprin 75mg",
    price: 12.00,
    mrp: 15,
    discount: 20,
    description: "Antiplatelet medicine to prevent heart attacks and strokes.",
    image: "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 701,
        name: "Aspirin 75mg",
        price: 10.00,
        mrp: 12,
        discount: 17
      },
      {
        id: 702,
        name: "Loprin 75",
        price: 11.50,
        mrp: 14,
        discount: 18
      }
    ]
  },
  {
    id: 8,
    name: "Montair 10mg",
    price: 165.00,
    mrp: 195,
    discount: 15,
    description: "For treatment of asthma and allergic rhinitis.",
    image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600",
    alternatives: [
      {
        id: 801,
        name: "Montek LC",
        price: 170.00,
        mrp: 195,
        discount: 13
      },
      {
        id: 802,
        name: "Romilast 10",
        price: 158.00,
        mrp: 180,
        discount: 12
      }
    ]
  }
];

export default medicines;