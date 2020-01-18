const moviesMock = [
  {
    id: '820ba8c0-f452-403b-99d8-038a9caa83ab',
    title: 'Backwood Philosopher (Havukka-ahon ajattelija)',
    year: 2000,
    cover: 'http://dummyimage.com/204x106.png/5fa2dd/ffffff',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    duration: 2011,
    contentRating: 'PG',
    source: 'http://mayoclinic.com/leo/maecenas/pulvinar.jsp',
    tags: ['Horror|Sci-Fi', 'Drama|Musical|Thriller', 'Horror']
  },
  {
    id: '5ba5762e-2ce6-4136-94d2-7e4822941b0c',
    title: 'Sing Your Song',
    year: 1998,
    cover: 'http://dummyimage.com/163x107.png/5fa2dd/ffffff',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    duration: 1889,
    contentRating: 'PG',
    source: 'https://simplemachines.org/non/velit/donec.json',
    tags: [
      'Comedy|Western',
      'Comedy',
      'Drama|Romance',
      'Horror|Thriller',
      'Comedy|Romance'
    ]
  },
  {
    id: '80e9b8fc-5a6f-4a99-86bf-3c6da87a906d',
    title: "Dante's Inferno: An Animated Epic",
    year: 1996,
    cover: 'http://dummyimage.com/132x214.png/ff4444/ffffff',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    duration: 1948,
    contentRating: 'G',
    source: 'https://phoca.cz/a/libero/nam/dui/proin/leo/odio.js',
    tags: ['Comedy|Horror|Musical', 'Drama']
  },
  {
    id: '66c0030f-0de8-4571-afa8-700170581d15',
    title: 'Gorilla, The',
    year: 1991,
    cover: 'http://dummyimage.com/169x154.bmp/cc0000/ffffff',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    duration: 1904,
    contentRating: 'G',
    source:
      'http://technorati.com/varius/integer/ac/leo/pellentesque/ultrices.xml',
    tags: ['Drama']
  },
  {
    id: 'eed374fe-a597-40c2-afac-2d978e63bee5',
    title: 'Children of the Night',
    year: 2005,
    cover: 'http://dummyimage.com/238x197.bmp/5fa2dd/ffffff',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    duration: 2035,
    contentRating: 'PG',
    source: 'http://umn.edu/ligula.xml',
    tags: ['Comedy|Romance', 'Children|Drama', 'Drama|War', 'Comedy|Romance']
  },
  {
    id: 'e48cab38-5117-4cb1-828b-37cf3411994e',
    title: 'Varg Veum - Fallen Angels (Varg Veum - Falne Engler)',
    year: 1991,
    cover: 'http://dummyimage.com/136x160.jpg/ff4444/ffffff',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    duration: 1910,
    contentRating: 'R',
    source:
      'https://prnewswire.com/mauris/laoreet/ut/rhoncus/aliquet/pulvinar/sed.png',
    tags: ['Drama|Horror|Thriller', 'Comedy']
  },
  {
    id: 'bb3a1418-f815-44d4-aa8e-1e2319c33087',
    title: 'Ultramarathon Man: 50 Marathons, 50 States, 50 Days',
    year: 2001,
    cover: 'http://dummyimage.com/206x215.jpg/ff4444/ffffff',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    duration: 1929,
    contentRating: 'PG',
    source: 'http://google.nl/tellus/semper/interdum/mauris.js',
    tags: ['Action|Adventure|Western', 'Adventure|Comedy', 'Drama|War']
  },
  {
    id: 'a6c77570-2a2d-4375-8c35-cd0199f906ef',
    title: 'Under the Tuscan Sun',
    year: 2005,
    cover: 'http://dummyimage.com/195x155.png/5fa2dd/ffffff',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    duration: 1962,
    contentRating: 'PG',
    source: 'http://youtube.com/integer/a/nibh/in.html',
    tags: ['Drama', 'Children|Fantasy', 'Comedy', 'Drama|Horror']
  },
  {
    id: '31a5cf51-7ad7-4a24-8672-32612feed077',
    title: 'Back Street',
    year: 2009,
    cover: 'http://dummyimage.com/187x108.bmp/5fa2dd/ffffff',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    duration: 2028,
    contentRating: 'NC-17',
    source: 'http://typepad.com/porttitor/pede/justo/eu/massa/donec.html',
    tags: ['Action|Drama|Romance|War']
  },
  {
    id: '9a2cf4ec-d8fd-43a0-a299-dc3bdba1ef31',
    title: 'Rudolph the Red-Nosed Reindeer',
    year: 1993,
    cover: 'http://dummyimage.com/164x120.bmp/5fa2dd/ffffff',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    duration: 1892,
    contentRating: 'PG-13',
    source: 'http://yahoo.co.jp/nisi/eu/orci/mauris/lacinia/sapien/quis.aspx',
    tags: ['Drama', 'Comedy|Romance']
  }
];

//Utilidades para mis test d node.js
function filteredMoviesMock(tag) {
  return moviesMock.filter(movie => movie.tags.includes(tag));
}

class MoviesServiceMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MoviesServiceMock
};
