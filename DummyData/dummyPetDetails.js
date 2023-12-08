const { PetSchema } = require("../models/PetModel/petmodel")

// Function to create dummy data for PetSchema
const createDummyData = async (req, res) => {
    try {
        // Create a dummy pet
        const dummyPet = await PetSchema.bulkCreate(
            [
                {
                    name: 'jackie',
                    age: 2,
                    color: 'White',
                    image_url: 'https://res.cloudinary.com/do3ivllyh/image/upload/v1702016371/image_xb0oei.png',
                    parentId: '73021c46-a1db-4183-9a89-b472e54d7739',
                },
                {
                    name: 'sam',
                    age: 2,
                    color: 'Yellow',
                    image_url: 'https://res.cloudinary.com/do3ivllyh/image/upload/v1702016294/image_1_aodcbk.png',
                    parentId: '73021c46-a1db-4183-9a89-b472e54d7739',
                },
                {
                    name: 'jimmy',
                    age: 2,
                    color: 'black',
                    image_url: 'https://res.cloudinary.com/do3ivllyh/image/upload/v1702016293/image_2_wuaibk.png',
                    parentId: '73021c46-a1db-4183-9a89-b472e54d7739',
                },
                {
                    name: 'chotu',
                    age: 2,
                    color: 'yellow',
                    image_url: 'https://res.cloudinary.com/do3ivllyh/image/upload/v1702016293/image_4_jf8lsy.png',
                    parentId: '73021c46-a1db-4183-9a89-b472e54d7739',
                },
                {
                    name: 'simba',
                    age: 2,
                    color: 'yellow',
                    image_url: 'https://res.cloudinary.com/do3ivllyh/image/upload/v1702016371/image_xb0oei.png',
                    parentId: '73021c46-a1db-4183-9a89-b472e54d7739',
                },
            ]
        );

        console.log('Dummy Pet created:', dummyPet.map(pet => pet.toJSON()));
        res.status(200).json({ Details: dummyPet.map(pet => pet.toJSON()) })
    } catch (error) {
        console.error('Error creating dummy data:', error);
    }
};

// Call the function to create dummy data
createDummyData();
module.exports = { createDummyData }