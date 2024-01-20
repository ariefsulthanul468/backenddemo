const  PetSchema  = require("../models/petmodel")

// Function to create dummy data for PetSchema
const createDummyData = async (req, res) => {
    try {
        //Create a dummy pet
        const dummyPet = await PetSchema.bulkCreate([
          {
            name: "jackie",
            age: 2,
            color: "White",
            gender: "male",
            image_urls:[
              "https://res.cloudinary.com/do3ivllyh/image/upload/v1702016371/image_xb0oei.png",
            ],
            parentId: "482e9fe2-b89a-4515-8595-7f52ed042ec5",
          },
          {
            name: "sam",
            age: 2,
            color: "Yellow",
            gender: "male",
            image_urls:[
              "https://res.cloudinary.com/do3ivllyh/image/upload/v1702016294/image_1_aodcbk.png",
            ],
            parentId: "482e9fe2-b89a-4515-8595-7f52ed042ec5",
          },
          {
            name: "jimmy",
            age: 2,
            color: "black",
            gender: "male",
            image_urls:[
              "https://res.cloudinary.com/do3ivllyh/image/upload/v1702016293/image_2_wuaibk.png",
            ],
            parentId: "482e9fe2-b89a-4515-8595-7f52ed042ec5",
          },
          {
            name: "chotu",
            age: 2,
            color: "yellow",
            gender: "male",
            image_urls:[
              "https://res.cloudinary.com/do3ivllyh/image/upload/v1702016293/image_4_jf8lsy.png",
            ],
            parentId: "482e9fe2-b89a-4515-8595-7f52ed042ec5",
          },
          {
            name: "simba",
            age: 2,
            color: "yellow",
            gender: "male",
            image_urls:[
              "https://res.cloudinary.com/do3ivllyh/image/upload/v1702016371/image_xb0oei.png",
            ],
            parentId: "482e9fe2-b89a-4515-8595-7f52ed042ec5",
          },
        ]);
        console.log('Dummy Pet created:', dummyPet.map(pet => pet.toJSON()));
        res.status(200).json({ Details: dummyPet.map(pet => pet.toJSON()) })
    } catch (error) {
        console.error('Error creating dummy data:', error);
    }
};

createDummyData();
module.exports = { createDummyData }