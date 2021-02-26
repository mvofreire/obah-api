const data = [
  {
    id:1,
    name:'Name 1',
    image:'image1'
  },
  {
    id:2,
    name:'Name 2',
    image:'image2'
  },
  {
    id:3,
    name:'Name 3',
    image:'image3'
  },
  {
    id:4,
    name:'Name 4',
    image:'image4'
  },
  {
    id:5,
    name:'Name 5',
    image:'image5'
  },
  {
    id:6,
    name:'Name 6',
    image:'image1'
  },
]
const loadStores = async (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  loadStores
};