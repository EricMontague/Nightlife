import { v4 as uuidv4 } from "uuid";
import cityImage from "../../assets/city_life.jpg";

export const fakePlans = [
  {
    id: uuidv4(),
    title: "Plan Title One",
    description:
      "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
    datetime: new Date(),
    image: cityImage,
    placeIds: [uuidv4(), uuidv4(), uuidv4()]
  },
  {
    id: uuidv4(),
    title: "Plan Title Two",
    description:
      "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
    datetime: new Date(),
    image: cityImage,
    placeIds: [uuidv4(), uuidv4(), uuidv4()]
  },
  {
    id: uuidv4(),
    title: "Plan Title Three",
    description:
      "Try reading numbers from left to right. As you go left to right, you insert values in decreasing magnitude: year, month, day, hours, minutes.",
    datetime: new Date(),
    image: cityImage,
    placeIds: [uuidv4(), uuidv4(), uuidv4()]
  }
];


