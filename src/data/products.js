import cheekyLine from "../assets/images/cheeky-line.png";
import orangeCrush from "../assets/images/orange-crush.png";
import organgeFruit from "../assets/images/orange.png";
import strawberryYum from "../assets/images/strawberry-yum.png";
import blackberryBlast from "../assets/images/blackberry-blast.png";
import blackberryFruit from "../assets/images/blackberry.png";

export const products = [
  {
    id: "1",
    title: "Cheeky lime",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#30A100",
    image: cheekyLine,
    type: "green",
    cardCircleColor: "#A1CD57",
    backgroundColor: "#CFCF8D4D",
    heroSlideCircleColor: "#A1CD57",
    slideCanCapacity: ["500 ML", "100 ML", "125 ML"],
  },
  {
    id: "2",
    title: "Orange Crush",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    slideDescription:
      "Discover a world of vibrant flavors with our premium juice selection. At Fresh & Juicy, we believe in the power of nature’s finest ingredients to bring you delicious",
    numberColor: "#FF960D",
    image: orangeCrush,
    type: "orange",
    flavourImage: organgeFruit,
    cardCircleColor: "#FF960D",
    backgroundColor: "#DEBE6E4A",
    pageHeroBackground:
      "radial-gradient(45.03% 45.03% at 50% 50%, #FFDEBA 0%, #F38B03 100%)",
    heroSlideCircleColor: "#BF700A",
    slideCanCapacity: ["500 ML", "100 ML", "125 ML"],
  },
  {
    id: "3",
    title: "Strawberry Yum",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#CD2520",
    image: strawberryYum,
    type: "strawberry",
    cardCircleColor: "#CD2520",
    backgroundColor: "#DC8D764A",
    heroSlideCircleColor: "#CD2520",
    slideCanCapacity: ["500 ML", "100 ML", "125 ML"],
  },
  {
    id: "4",
    title: "Blackberry Blast",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    slideDescription:
      "Discover a world of vibrant flavors with our premium juice selection. At Fresh & Juicy, we believe in the power of nature’s finest ingredients to bring you delicious",
    numberColor: "#60449B",
    image: blackberryBlast,
    type: "blackberry",
    flavourImage: blackberryFruit,
    cardCircleColor: "#60449B",
    backgroundColor: "#947FBE4D",
    pageHeroBackground:
      "radial-gradient(50% 50% at 50% 50%, #AA93E3 0%, #7547E5 100%)",
    heroSlideCircleColor: "#623DBE",
    slideCanCapacity: ["500 ML", "100 ML", "125 ML"],
  },
];
