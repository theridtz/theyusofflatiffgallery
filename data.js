// THE PORTRAIT GALLERY — rooms and the built-in collection.
// The live collection is read from the artifact database (collection "portraits");
// this file is the offline / signed-out fallback and the seed for that database.

export const ROOMS = [
  { id: 'foyer', numeral: '', name: 'The Grand Foyer', short: 'Foyer', blurb: 'The entrance hall, where featured portraits greet each visitor.', wall: '#3a1d25', trim: '#c4a46a', floor: 'marble', collection: false },
  { id: 'pioneers', numeral: 'I', name: 'The Pioneers', short: 'Pioneers', blurb: 'Singaporeans who went first, and opened the way for others.', wall: '#351B24', trim: '#c4a46a', floor: 'oak' },
  { id: 'gamechangers', numeral: 'II', name: 'Singapore Game-Changers', short: 'Game-Changers', blurb: 'Singaporeans who changed the game at home and on the world stage.', wall: '#152822', trim: '#c4a46a', floor: 'walnut' },
  { id: 'heroes', numeral: 'III', name: 'Our Everyday Heroes', short: 'Everyday Heroes', blurb: 'The people who quietly make life better for everyone around them.', wall: '#1a2233', trim: '#b89a63', floor: 'oak' },
  { id: 'monuments', numeral: 'IV', name: 'Monuments That Stand the Test of Time', short: 'Monuments', blurb: 'Landmarks that have watched Singapore grow up.', wall: '#3b2a1a', trim: '#c4a46a', floor: 'walnut' },
  { id: 'beautiful', numeral: 'V', name: 'Beautiful Singapore', short: 'Beautiful Singapore', blurb: 'The island at its loveliest: gardens, waterfronts and city light.', wall: '#2b1b2f', trim: '#c9a86b', floor: 'oak' },
  { id: 'peranakan', numeral: 'VI', name: 'Peranakan Houses', short: 'Peranakan Houses', blurb: 'The ornate terrace houses of the Peranakans: tiles, shutters, pintu pagar and plasterwork.', wall: '#173a35', trim: '#c9a86b', floor: 'tile' },
  { id: 'secret', numeral: '', name: "The Curator's Cabinet", short: 'Cabinet', blurb: 'A hidden room of portraits selected by the museum curator.', wall: '#14110f', trim: '#c4a46a', floor: 'ebony', hidden: true }
];

// Rooms from the first version of the gallery, mapped to their new homes.
export const LEGACY_ROOMS = { visionaries: 'pioneers', creators: 'heroes', changemakers: 'gamechangers', legends: 'beautiful' };

// Rooms that hold places rather than people (their placeholders show scenes, not sitters).
export const PLACE_ROOMS = ['monuments', 'beautiful', 'peranakan'];

const P = (o) => ({ orient: 'portrait', asideTitle: '', aside: '', quote: '', quoteBy: '', published: true, focusX: .5, focusY: .4, zoom: 1, demo: false, ...o });

const VISWA = P({
  id: 'viswa-sadasivan',
  name: 'Viswa Sadasivan',
  dates: 'Nominated MP · 2009–2011',
  descriptor: 'Broadcaster, Strategist & Nominated MP',
  identity: 'Broadcaster, communications strategist and former Nominated Member of Parliament',
  period: 'Nominated Member of Parliament, 2009–2011',
  opening: 'He spent a career putting questions to the nation, then stood in Parliament and asked it to live up to its own Pledge.',
  story: [
    'Viswa Sadasivan learned early that a good question can move a country. A Rafflesian who read Political Science at the National University of Singapore, he joined the Singapore Broadcasting Corporation as a presenter and producer of current affairs programmes such as Feedback, Talking Point and Today in Parliament, rising to become SBC’s Senior Controller of Current Affairs.',
    'An SBC scholarship took him to Harvard University’s John F. Kennedy School of Government for a Master’s in Public Administration. He went on to Singapore Press Holdings as Senior Manager for corporate planning and business development, and then to UTV International as its chief executive.',
    'In 1997 he co-founded Right Angle Group, later renamed Strategic Moves Pte Ltd, a television production, training and strategic consultancy that he now leads as CEO. Alongside it ran a long record of public service: chairman of the Political Development Feedback Group, Vice-President of SINDA, and seats on the board of the Media Development Authority, Singapore’s Economic Review Committee, Remembering Singapore and the National Youth Achievement Council. In 2003 he was conferred the Spirit of Enterprise Award.'
  ].join('\n\n'),
  moment: 'In his maiden speech as a Nominated Member of Parliament, Viswa tabled a motion asking the House to reaffirm its commitment to the National Pledge and its promise of one united people, regardless of race, language or religion. He went further, questioning the government’s practice of racial categorisation through ethnic-based self-help groups.\n\nIn one of those rare occasions, Minister Mentor Lee Kuan Yew rose to rebut him, saying he would bring the House back to earth and calling the argument “false and flawed”. The House adopted Viswa’s motion all the same, amended to describe the Pledge as an inspiration rather than an ideology.',
  asideTitle: 'A Story He Tells',
  aside: 'On 3 September 2022 he spoke on “Forging the Singaporean Identity” at a National Day talk organised by the Puan Nor Aishah Inter-Cultural Institute at MKAC, Telok Kurau. He recalled commanding NSmen on a rated exercise in Taiwan during the fasting month, in 40-degree heat that could melt the soles of boots. He offered the Muslim soldiers a lighter load: take part only on the first and sixth days.\n\nThey declined. It would be unfair, they said, for their comrades to carry their burden. The non-Muslim soldiers answered by choosing to fast alongside them.',
  legacy: 'Singapore, he has argued, has achieved considerable success on meritocracy and pragmatism, but the pursuit of it has brought an erosion of compassion and a lack of humanity, along with a lasting need to strengthen inter-racial relations.\n\nThrough Strategic Moves, a strategic and crisis communications practice specialising in public policy issues, he provides training and coaching to government agencies, medium-sized enterprises and Fortune 500 companies.',
  rooms: ['gamechangers'], frame: 'gold', order: 1,
  alt: 'Watercolour portrait of Viswa Sadasivan, smiling, with greying hair and a grey goatee, wearing a light-blue mandarin-collar shirt against a warm orange wash.',
  image: 'assets/viswa.jpg', focusY: .42,
  credit: 'Watercolour on paper, signed by the artist, 2022.'
});

const ALAMI = P({
  id: 'alami-musa',
  name: 'Alami Musa',
  dates: 'Born 1956',
  descriptor: 'Community Builder, Scholar & Diplomat',
  identity: 'Engineer, community leader, scholar and diplomat who has served Singapore’s Malay-Muslim community for more than five decades',
  period: 'President of MUIS, 2003–2013',
  opening: 'At thirteen he was listening in on community meetings at his father’s house. He has been shaping those conversations ever since.',
  story: [
    'Mohammad Alami Musa was drawn into community life early. When he was 13, his late father, Haji Musa Yusoff, was MUIS’s first secretary, and the young Alami listened in on meetings held at the family home, old enough to discuss the issues and defend his father’s position.',
    'He trained as an engineer, earning a Bachelor of Engineering in 1979 and a Master of Science in Civil Engineering in 1987 from the National University of Singapore, and joined the civil service in 1981 at the Ministry of the Environment before moving to the PUB.',
    'In the 1990s, as a confident, forward-looking Malay middle class emerged, he co-founded the Association of Muslim Professionals, a ground-up initiative that complemented Mendaki’s work with government support. As chairman he steered AMP towards concrete programmes to close the community’s educational, social and economic gaps, working with public institutions while guarding its independence and non-partisanship: the era of “critical collaboration”.',
    'As President of MUIS from 2003 to 2013, he introduced a full-time Chief Executive and made the presidency non-executive, as in any statutory board. He reformed religious education through the Joint Madrasah System and the MUIS Academy, refreshed mosques as centres of community life and helped forge the Singapore Muslim Identity. In 2009 the Singapore Islamic Hub brought MUIS headquarters, Masjid Muhajirin and Madrasah Irsyad Zuhri together at Braddell Road.'
  ].join('\n\n'),
  moment: 'In the early 1970s, Alami and fellow undergraduates petitioned the then Defence Minister, Dr Goh Keng Swee, over the exclusion of Malay youths from full-time National Service. Without NS, young Malay men could not be offered permanent jobs, and some ended up as drug addicts. He was interrogated, but nothing incriminating or subversive was found, and he raised the issue again at a regional student conference in Indonesia despite being warned not to.\n\nToday Malay Singaporeans serve across the armed forces, as fighter pilots and as generals.',
  asideTitle: 'Bridges Between Faiths',
  aside: 'He has long championed inter-faith engagement and launched the Harmony Circle. As Adjunct Senior Fellow at the S. Rajaratnam School of International Studies at NTU from 2013 to 2023, he was Head of Studies in Inter-Religious Relations in Plural Societies. He has also served as Singapore’s Non-Resident Ambassador to Algeria since 2013.',
  legacy: 'He credits the establishment of Mendaki with lifting Malay students’ PSLE results from a low of 40 per cent to today, when 90 per cent of them go on to post-secondary education. His service has been recognised with the Public Administration Medal (2010), the Meritorious Service Medal (2015) and the Berita Harian Anugerah Jauhari (2015).\n\nOn 16 October 2025 he launched Ascent Towards Pinnacle, which chronicles his 55-year journey with the Malay-Muslim community and proposes new ideals for Singapore in terms of his own coining: “Sacred Secularism”, “Polymorphic Meritocracy” and “Enclave-less Multiculturalism”.',
  rooms: ['gamechangers'], frame: 'gold', order: 2,
  alt: 'Watercolour portrait of Alami Musa, smiling broadly, with short dark hair, wearing a navy suit, white shirt and red tie against a golden-yellow wash.',
  image: 'assets/alami.jpg', focusY: .38,
  credit: 'Watercolour on paper, signed by the artist.'
});

const KISHORE = P({
  id: 'kishore-mahbubani',
  name: 'Kishore Mahbubani',
  dates: 'UN Ambassador · 1984–89, 1998–2004',
  descriptor: 'Diplomat, Thinker & Author',
  identity: 'Singapore’s diplomat extraordinaire, geopolitical thinker and author',
  period: 'Permanent Representative to the United Nations, 1984–1989 and 1998–2004',
  opening: 'Who would have imagined that a boy raised poor on Onan Road would become one of the world’s most respected envoys?',
  story: [
    'Kishore Mahbubani was born into a Sindhi-speaking family and grew up poor in the Onan Road neighbourhood. He attended Tanjong Katong Secondary School and St Andrew’s before winning the President’s Scholarship to the University of Singapore, graduating with first-class honours in Philosophy. He earned a Master’s in Philosophy from Dalhousie University in 1976, which later conferred an honorary doctorate on him in 1995.',
    'He might have become a typical Sindhi businessman. Instead he was recruited into the Foreign Service, with postings to Cambodia, Malaysia and the United States, and rose to Permanent Secretary of the Ministry of Foreign Affairs, serving Singapore with distinction for 33 years.',
    'A prolific writer, he has set out his arguments in Can Asians Think?, Beyond the Age of Innocence, The New Asian Hemisphere, The Great Convergence, Can Singapore Survive?, The ASEAN Miracle, Has the West Lost It? and Has China Won?. His open-access The Asian 21st Century has been downloaded 3.4 million times, and his memoir, Living the Asian Century, holds the reader with no pictures or illustrations at all.',
    'He became the founding Dean of the Lee Kuan Yew School of Public Policy at NUS, serving until 2017, and continues his work as a thinker and researcher as a Distinguished Fellow at NUS’s Asia Research Institute.'
  ].join('\n\n'),
  moment: 'He was twice Singapore’s Permanent Representative to the United Nations, from 1984 to 1989 and again from 1998 to 2004, equalling a feat achieved by Professor Tommy Koh. During Singapore’s term on the Security Council in 2001–02, he also served as its President.',
  asideTitle: 'A Curator’s Note',
  aside: 'I met him on his brisk walking break in our Siglap neighbourhood. It was an opportune moment to approach and talk with this esteemed diplomat, who has helped our tiny Red Dot earn an acclaimed place in the community of nations.',
  legacy: 'He has observed that the world has seen more positive change in the last 30 years than in the previous 300, and has prescribed pragmatic solutions for improving the global order. His views have earned him places on the Yale President’s Council on International Activities, the Indian Prime Minister’s Global Advisory Council, the World Economic Forum’s Global Agenda Council on China and the Lee Kuan Yew World City Prize nominating committee, and in 2019 he was elected to the American Academy of Arts and Sciences.\n\nHe was awarded the Public Administration Medal (Gold) in 1998. The Foreign Policy Association, in awarding him its medal, described him as “a gifted diplomat, a student of history and philosophy, a provocative writer and an intuitive thinker”. Publications have listed him among the world’s top 100 public intellectuals and top 50 world thinkers: a statesman’s stature, achieved without a politician’s career.',
  rooms: ['gamechangers'], frame: 'bronze', order: 3,
  alt: 'Watercolour portrait of Kishore Mahbubani, smiling, with swept-back silver hair and dark eyebrows, wearing a navy suit, white shirt and red tie against an orange wash.',
  image: 'assets/kishore.jpg', focusY: .4,
  credit: 'Watercolour on paper, signed by the artist.'
});

const AKMAL = P({
  id: 'akmal-anuar',
  name: 'Akmal Anuar',
  dates: 'Anugerah Jauhari 2024',
  descriptor: 'Chef & Restaurateur',
  identity: 'Self-taught chef and restaurateur with restaurants in Singapore, the UAE and New York',
  period: 'Berita Harian Anugerah Jauhari, 2024',
  opening: 'He learned to cook at his parents’ nasi padang stall in Teck Whye, and carried that kitchen all the way to a Michelin star.',
  story: [
    'Akmal Anuar’s first kitchen was his parents’ nasi padang stall in Teck Whye, where he helped out from the age of 10 in 1992. Formal schooling never held his interest: he completed his N-levels and dropped out of Shatec. With no formal training, he went to work under Chef Justin Quek at the French restaurant Les Amis, then at the Pacific Casino Hotel in the Solomon Islands and at St Pierre at One Fullerton. In 2006 he met his mentor, Ignatius Chan, owner of Iggy’s, and became its head chef.',
    'In 2013 he headed for Dubai with his wife and business partner, Inez Tantyanna. He sold his HDB flat for $500,000 to help establish 3 Fils, and although its location was poor, it earned a place among the World’s 50 Best Discovery restaurants before Covid-19 forced him to give it up. Through their consultancy, White Rice Co., he began again with Goldfish Sushi & Yakitori, which marked the start of his rising fortunes.',
    'Today his restaurants number ten: three in Dubai, two in Abu Dhabi, two in Sharjah, one in New York and two in Singapore. In November 2023 he came home to open Harummanis at Sultan Gate, a modern Malay fine-dining restaurant named after his parents’ stall.'
  ].join('\n\n'),
  moment: 'His Dubai restaurant 11 Woodfire was awarded one Michelin star in 2022, and his Japanese concepts Goldfish Sushi & Yakitori in Dubai and Otoro in Abu Dhabi earned Bib Gourmands, the Michelin Guide’s recognition for excellent cooking at moderate prices.',
  legacy: 'In 2024 he received the Berita Harian Anugerah Jauhari, the Malay daily’s annual award for achievers in the Malay-Muslim community. His success shows that a Malay chef can excel at home and internationally, and he is proud that his fine-dining restaurants are halal and still succeed.\n\nAt the presentation ceremony, guest-of-honour Health Minister Ong Ye Kung spoke of the resilience and hard work behind the awardees’ achievements, supported by help from others, and of upholding respect for every trade and profession as part of how we define achievement.',
  rooms: ['gamechangers'], frame: 'wood', order: 4,
  alt: 'Watercolour portrait of chef Akmal Anuar, smiling, with shoulder-length swept-back grey and black hair and a goatee, in a white chef’s jacket embroidered with his name, against a deep red wash.',
  image: 'assets/akmal.jpg', focusY: .42,
  credit: 'Watercolour on paper, signed by the artist, 2024, and inscribed “Berita Harian Anugerah Jauhari 2024”.'
});

const TELOK_KURAU = P({
  id: 'telok-kurau-primary-school',
  name: 'Telok Kurau English School',
  dates: 'Established 1926',
  descriptor: 'Alma mater of two prime ministers',
  identity: 'The original Telok Kurau English School at Lorong J, founded in 1926 and today’s Telok Kurau Primary School, now a hundred years old',
  period: '1926 to the present · Centennial 2026',
  opening: 'A wooden schoolhouse among the coconut palms of Telok Kurau taught two boys who would go on to lead two nations.',
  story: [
    'Telok Kurau English School opened in 1926 as a two-storey wooden building amid a vast coconut plantation at Lorong J, Telok Kurau, a district whose Malay name means “mango fish bay”. It began as a school for boys.',
    'As the Telok Kurau and Joo Chiat estates grew, two more schools took the district’s name: Telok Kurau Malay Girls’ School in 1960 and Telok Kurau West School in 1962. The original school became Telok Kurau East School, and in time its timber classrooms gave way to a modern brick building.',
    'In 1983 the Malay Girls’ School merged with Telok Kurau West, and in 1985 that school joined Telok Kurau East to become Telok Kurau Primary School. In 2001 it merged with Bedok Town Primary School and moved to more modern premises at Bedok Reservoir Road, where Eunos Primary School joined it in 2023.',
    'Like many Singapore schools, it has moved as the population shifted while keeping the name of the place it came from. Telok Kurau Primary now stands in Bedok, carrying its old neighbourhood with it.'
  ].join('\n\n'),
  moment: 'Among its early pupils were two future prime ministers. Lee Kuan Yew, Singapore’s founding Prime Minister, enrolled in January 1930, and Hussein Onn, who would become Malaysia’s third Prime Minister, followed in January 1931.',
  asideTitle: 'The Painter’s Note',
  aside: 'As an alumnus of the school from 1954 to 1959, I painted this view of the old Telok Kurau English School to commemorate its centennial.',
  legacy: 'A century on, the school’s story mirrors Singapore’s own: from a plantation schoolhouse to a modern campus that gathers the traditions of the Telok Kurau schools, Bedok Town and Eunos under one name. It celebrated its 100th anniversary on 28 May 2026, with President Tharman Shanmugaratnam as guest of honour.',
  rooms: ['monuments', 'secret'], frame: 'gold', orient: 'landscape', order: 1,
  alt: 'Sepia watercolour of the old Telok Kurau English School: a long two-storey timber building with tiled hip roofs and covered verandahs, rows of pupils in white shirts and dark shorts along the walkway, and a flagpole on the field in front.',
  image: 'assets/telok-kurau.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist and inscribed “Telok Kurau English School, Lorong J Telok Kurau, Estab. 1926”. Painted by an alumnus (1954–1959) for the school’s centennial.'
});

const WAK_SUMANG = P({
  id: 'wak-sumang-goes-to-sit',
  name: 'Wak Sumang Goes to S.I.T.',
  dates: 'APAD “Cipta” · SG60, 2025',
  descriptor: 'A celebration of Punggol',
  identity: 'A watercolour journey through time, from Kampong Wak Sumang to the Punggol Digital District',
  period: 'Punggol, from the mid-1800s to today',
  opening: 'Imagine the founder of a Punggol fishing village stepping out of a time tunnel, nearly two hundred years later.',
  story: [
    'Wak Sumang came from Daik, a talented, violin-playing official in the court of Sultan Mahmud Muzaffar Shah of Lingga (r. 1841–57). The story goes that his music attracted the attention of a princess, and to avoid a scandal he left for Singapura, where he founded a kampong on the Punggol coast.',
    'Kampong Wak Sumang prospered. Its residents earned a living as fishermen and farmers, Wak Sumang owned land and a fruit orchard, and the arrival of Chinese mixed farmers brought further prosperity. He died in the late 1800s.',
    'This painting imagines him carried by a time tunnel nearly 200 years ahead. Passing along Sumang Walk and Sumang Link, he is mesmerised to find his once tranquil village transformed into an ultra-modern township. A sign reads “Punggol Digital District”, and behind it rises the gleaming glass façade of the Singapore Institute of Technology, a university that works with the industries and businesses around it on research, invention, innovation and automation.',
    'He remembers Sungai Punggol and Sungai Serangoon bordering his coastal village, and is surprised by a new waterway at Punggol, its terraced, landscaped banks nestling homes amid lush greenery. What a paradise on earth Punggol has become, Wak Sumang ponders.'
  ].join('\n\n'),
  moment: 'All of this is the centrepiece of Punggol 21, the HDB town that brings together a business park, a university, and communication and transport infrastructure. It is powered by smart-city and digital technology, and aims to use resources in ways that are eco-friendly and sustainable. Punggol is honoured to have been chosen as the site of this most modern university.',
  asideTitle: 'About the Painting',
  aside: 'This painting was my participation in “Cipta”, APAD’s annual exhibition commemorating SG60, held at the School of the Arts (SOTA) from 1 to 5 August 2025. It measures 100 cm by 70 cm and now graces the lobby of Punggol Regional Library, on Level 4.',
  legacy: 'The kampong itself is gone. Its residents moved out in the 1980s to make way for the new estate, but its founder’s name lives on across Punggol in Sumang Walk, Sumang Lane, Sumang Link, Sumang Crescent and Sumang LRT station.',
  rooms: ['beautiful'], frame: 'gold', orient: 'landscape', order: 1,
  alt: 'Watercolour collage of Punggol past and present: Wak Sumang in a white headcloth and blue baju playing the violin; wooden kampong houses beside a “Kg Wak Sumang” sign; the glass tower of the Singapore Institute of Technology; and a footbridge over the Punggol Waterway with flats behind.',
  image: 'assets/wak-sumang.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, 100 × 70 cm, signed by the artist. Exhibited at APAD’s “Cipta” (SG60), SOTA, 1–5 August 2025; now in the lobby of Punggol Regional Library, Level 4.'
});

const RAFFLES = P({
  id: 'raffles-hotel',
  name: 'Raffles Hotel',
  dates: 'Opened 1887 · National Monument 1987',
  descriptor: 'The grande dame of Singapore hotels',
  identity: 'Singapore’s most celebrated hotel, at 1 Beach Road',
  period: '1887 to the present',
  opening: 'A seaside bungalow on Beach Road became one of the most famous hotels in the world.',
  story: [
    'Raffles Hotel began as the Beach House, a private bungalow on Beach Road built in the early 1830s. It later served as Emmerson’s Hotel and then as a boarding house for boys from the nearby Raffles Institution. In 1887 the Armenian Sarkies brothers, led by Martin and Tigran, leased it from its owner, the wealthy Arab merchant Syed Mohamed Alsagoff, and on 1 December opened the 10-room Raffles Hotel.',
    'From the start the emphasis was on high standards of service and accommodation, and the hotel became a favourite of the wealthy. A two-storey wing followed in 1890 and the Palm Court in 1894, and by 1899 a new main building stood on the site of the original beach house, with the most modern comforts of the day: ceiling fans and electric lights. Further wings, ballrooms, bars and billiard rooms followed.',
    'The Great Depression brought the Sarkies brothers to bankruptcy in 1931, and in 1933 a public company, Raffles Hotel Ltd, took over. During the Japanese Occupation the hotel was renamed Syonan Ryokan.',
    'Somerset Maugham, Joseph Conrad, Rudyard Kipling, Noël Coward, Charlie Chaplin and Elizabeth Taylor were among the famous names who chose Raffles during their sojourns in Singapore, and the hotel has served as a setting for films, novels and television series.'
  ].join('\n\n'),
  moment: 'In 1987 Raffles Hotel was given the status of a National Monument. Two years later, in 1989, it closed for a major restoration costing $160 million.',
  asideTitle: 'The Singapore Sling',
  aside: 'The hotel’s Long Bar is the birthplace of the Singapore Sling, the cocktail invented there by bartender Ngiam Tong Boon.',
  legacy: 'After a series of changes in ownership and a public listing, Raffles is now the flagship of Raffles Hotels & Resorts, managed by Accor and owned by Qatar’s government-owned Katara Hospitality. More than a century on, it remains a byword for colonial-era elegance and one of Singapore’s best-loved landmarks.',
  rooms: ['monuments'], frame: 'gold', orient: 'landscape', order: 2,
  alt: 'Watercolour of the white façade of Raffles Hotel under a blue sky: three storeys of arched windows, a red-tiled roof with a central pediment reading “Raffles Hotel”, the Singapore flag above, palms at either side, and cars and three people in the forecourt.',
  image: 'assets/raffles.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist.'
});

const RASHID = P({
  id: 'rashid-hussain',
  name: 'Tan Sri Rashid Hussain',
  dates: 'Born 1946',
  descriptor: 'Founder of RHB Group',
  identity: 'Banker and entrepreneur: a former Singaporean who built one of Malaysia’s largest financial groups',
  period: 'Chairman of Lembaga Tabung Haji since December 2023',
  opening: 'A Raffles Institution schoolboy who argued politics and economics with his teacher went on to build one of Malaysia’s largest banks.',
  story: [
    'Abdul Rashid Hussain was born in 1946 and studied at the old Raffles Institution on Bras Basah Road, in the class of ’63. He was remembered as mature far beyond his years, able to argue his views on politics and economics with their late Cikgu. After his O-levels he headed to London to prepare for the Bar, and soon began a career with Strauss Turnbull, one of the leading stockbroking firms there.',
    'Returning in 1975, he moved to Kuala Lumpur to head Bumiputra Merchant Bankers, but left in 1983 to set up Rashid Hussain Securities, which became one of Malaysia’s leading stockbrokers. In the mid-1990s he developed the vast RHB Vision City in partnership with Daewoo. He chaired the executive committee of Khazanah Nasional from 1994 to 1998 and Putrajaya Holdings from 1995 to 2000.',
    'In December 2023 he was appointed chairman of Lembaga Tabung Haji, Malaysia’s pilgrims fund.'
  ].join('\n\n'),
  moment: 'In 1996 he acquired a 75 per cent stake in Kwong Yik Bank and in 1997 merged it with DCB Bank to form RHB Bank, the country’s biggest banking merger at the time. Sime Bank later joined the group, and in Singapore the former UMBC also became RHB. In little more than a decade he had built a financial conglomerate spanning stockbroking, consumer and merchant banking, and finance under RHB.',
  asideTitle: 'A Chance Meeting',
  aside: 'What a serendipity. Leaving Kampung Siglap Mosque after my Eid prayers on 31 March 2025, I bumped into this ex-schoolmate of mine from the old Raffles Institution, 62 years after we last met.\n\nI remember a recent news report of him building three mosques: one in Langkawi as a tribute to his late mother, one in Seremban as a tribute to his late father, and another in Sendayan, also in Negeri Sembilan.',
  legacy: 'He has been described as one of the most capable Muslim entrepreneurs of his generation. We are proud that a former Singaporean has contributed so remarkably to the development of the financial industry in our neighbouring country.',
  rooms: ['gamechangers', 'secret'], frame: 'gold', order: 5,
  alt: 'Watercolour portrait of Tan Sri Rashid Hussain, smiling, with white hair and rimless glasses, wearing a cream mandarin-collar shirt against a deep red wash.',
  image: 'assets/rashid.jpg', focusY: .4,
  credit: 'Watercolour on paper, signed by the artist.'
});

const TANJONG_KATONG = P({
  id: 'tanjong-katong',
  name: 'Tanjong Katong',
  dates: 'Seni Kita 2024',
  descriptor: 'Truly My Kampong II',
  identity: 'A sepia memory of the old Tanjong Katong beach, about a hundred years ago',
  period: 'Tanjong Katong, around the 1920s',
  opening: 'Swaying palms, a fisherman home from the sea, and an Austin 7 stopping by for the freshly landed catch.',
  story: [
    'Truly My Kampong II is the artist’s second painting of the old, nostalgic beach at Tanjong Katong, imagined as it was about a hundred years ago and rendered in sepia tones.',
    'The kampong houses here stand on stilts and have a distinctive square plan beneath high thatched attap roofs, unlike the usual rectangular kampong house. They were probably the homes of settlers from one particular Malay sub-ethnic group. Because of the breezy coastal location, the houses have no huge windows or large ventilation openings beneath their roofs.',
    'Swaying coconut palms, a fisherman returning from the sea and laundry drying in the yard all stir a yearning for the good old days. The beach lives on in the popular Malay folk song “Tanjong Katong”, whose pantun chorus sings of its blue waters.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'As usual, my grandfather, in his Austin 7, would stop by the beach, looking for freshly landed fish.\n\nThis painting was my entry for Seni Kita 2024, the annual community art exhibition at Kamal’s Art Gallery, Wisma Geylang Serai, from 16 November to 1 December 2024. It measures 75 cm by 56 cm.',
  legacy: 'The kampong by the sea is long gone, but the painting keeps alive a Tanjong Katong that older residents still remember: palms, stilt houses and the sea at the doorstep.',
  rooms: ['beautiful', 'secret'], frame: 'wood', orient: 'landscape', order: 2,
  alt: 'Sepia watercolour of a kampong on the old Tanjong Katong beach: square stilt houses with high attap roofs under tall coconut palms, laundry drying beneath, a fisherman pulling a boat ashore, and a vintage Austin 7 with a man at the wheel on the sandy road.',
  image: 'assets/tanjong-katong.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, 75 × 56 cm, signed by the artist. Exhibited at Seni Kita 2024, Kamal’s Art Gallery, Wisma Geylang Serai.'
});

const NOORSIAH = P({
  id: 'noorsiah-ibrahim', name: 'Noorsiah Ibrahim', dates: 'Mim’s Spices · Marine Terrace', descriptor: 'Spice blender & market stallholder',
  identity: 'Stallholder who, with her husband Juraimee A. Hamid, runs Mim’s Spices at Marine Terrace Market, probably the only Indian spice stall run by a Malay',
  period: 'At the stall since her mother opened it in 1995',
  opening: 'Every morning, a granite pestle imported from India grinds a family’s recipe into the curries of Marine Terrace.',
  story: [
    'It all started with Noorsiah’s mother, Narimah Mohd Noor, who as a teenager worked at Raju’s at Circuit Road Market and wanted to blend Indian spices to suit the Malay palate. Her eldest son soon secured a stall for her at Marine Terrace Market in 1995.',
    'Noorsiah, the only girl in the family, learned the ropes from her mother and took over the stall, which she now runs with her husband. Like most stalls there it opens for half a day, yet her earnings have been enough to put her three daughters through university, while her husband takes on delivery work after noon.',
    'Besides the wet spice blends, she sells pre-packed garam masala as paste and powder, and individual spices from cloves, cardamom and cinnamon to cumin, fennel, fenugreek and saffron. Alongside regular market-goers, the Malay food stalls of Marine Terrace are among her most reliable customers.'
  ].join('\n\n'),
  moment: 'The stall’s most fascinating feature is its electric grinder: a large stainless-steel drum in which a granite pestle, driven by a motorised arm, grinds the spices at an angle in a granite mortar at its base. The machine is specially imported from India.\n\nIn the old days, mothers used the batu giling, a flat granite bed with a granite roller, or for small quantities the batu lesung, a granite pestle and mortar. Today most homes simply use an electric blender.',
  asideTitle: 'The Painter’s Note',
  aside: 'My late maternal grandma, brought up in a Tamil family, was fastidious with her spices. She bought the individual ingredients and dried them in the sun before her daughters blended them on the batu giling. We grandchildren enjoyed picking and chewing the fennel that sprouted from seeds dropped on the sand as they were winnowed in the wind. Do drop by to see this interesting spice stall.',
  legacy: 'A family business built on one woman’s idea of blending Indian spices for Malay kitchens has now carried a second generation, and three university degrees, from a half-day market stall.',
  rooms: ['heroes'], frame: 'wood', order: 1, focusX: .62, focusY: .45, image: 'assets/noorsiah-ibrahim.jpg',
  alt: 'Watercolour of Noorsiah Ibrahim smiling in a navy tudung, glasses and a green apron, at her Mim’s Spices stall, with shelves of spices and jars behind her and the motorised granite spice grinder in the foreground', credit: 'Watercolour on paper, signed by the artist.'
});

const MEL_DEAN = P({
  id: 'chef-mel-dean', name: 'Chef Mel Dean', dates: 'Culinary Director, Permata', descriptor: 'Celebrity chef & culinary storyteller',
  identity: 'Celebrity chef, food columnist, consultant, author and speaker; Culinary Director of Permata Singapore at Gedung Kuning',
  period: 'In Singapore’s culinary scene for 29 years',
  opening: '“Kapowww!” is his word for awesome, and the name of his brand.',
  story: [
    'Hailing from Kelantan, Chef Mel Dean has been a familiar face in Singapore’s culinary scene for 29 years. Besides his late grandmother and father, he drew inspiration from Gordon Ramsay, Jamie Oliver and Chef Wan, and built his skills through private cooking workshops in Singapore and overseas. In 1993 he ran a café and catering business serving fusion food.',
    'Today, as Culinary Director of Permata at Gedung Kuning in Kampong Gelam, he sets out not to compete with the popular Malay and nasi padang restaurants around him but to “complement each other”. He introduces Nusantara dishes rarely found in Singapore: Ikan Sambuko from Timor-Leste, Ayam Palumera from Sulawesi, Filet Mignon Lemak Cili Api from Negeri Sembilan, Rawon Risotto, Botok-botok Halibut, his grandmother’s Nasi Ulam Cakerawala, and Cek Mek Molek, the fried sweet-potato snack of his home state.',
    'Permata, meaning jewel, takes its name from the gemstone trade in the area in the 1920s. Its buffet showcases flavours from Singapore, Indonesia, Malaysia, Brunei, Thailand and beyond, changing regularly to highlight a region, an ethnicity, a taste or a single ingredient.'
  ].join('\n\n'),
  moment: 'His mission is to revive lost dishes and promote underrated ones, for to him every dish is steeped in history. At Permata he has every chance to do so.',
  asideTitle: 'A Childhood on Screen',
  aside: 'In the early 1970s, at the age of three, he appeared on television, guided by his mother, actress and scriptwriter Nik Fatimah Ismail. At seven he starred in weekly SBC Malay children’s programmes such as Timang Tinggi-tinggi and Datuk Harimau, alongside Bobo, Md Saufi (Mamat), Indra Shahril and Zakir Hamid, all trained by Mak Nona and Yusnor Ef. He also acted in TV dramas and commercials with Mat Sentul and Jorah Ahmad. Those days as Kamarulzaman are a memory now; today he entertains the palate instead.\n\nOn seeing this portrait, he shouted “Kapowww!”',
  legacy: 'With his signature smile and vibrant personality, he has always had a way with people, and he now uses it to keep the forgotten flavours of the Nusantara on Singapore’s tables.',
  rooms: ['gamechangers'], frame: 'gold', order: 6, image: 'assets/chef-mel-dean.jpg',
  alt: 'Watercolour portrait of Chef Mel Dean grinning, in a grey flat cap and thick black-rimmed glasses, wearing white chef’s whites with a Permata badge, against a deep red wash', credit: 'Watercolour on paper, signed by the artist.'
});

const FARHANNA = P({
  id: 'farhanna-farid', name: 'Farhanna Farid', dates: 'Anugerah Jauhari 2026', descriptor: 'Powerlifter & world record holder',
  identity: 'Singapore powerlifter and former pharmacist, world record holder in the women’s under-52 kg deadlift',
  period: 'Powerlifting since 2017',
  opening: 'A pharmacist who took up powerlifting in 2017 has now rewritten the world deadlift record fourteen times.',
  story: [
    'Farhanna Farid graduated from the National University of Singapore in 2015 and worked as a pharmacist before taking up powerlifting in 2017. In her first attempt she set four national records and became national champion.',
    'Competing internationally from 2018 in the under-52 kg class, she broke Asian records and won Asian titles. In 2022 she set her first world record in the deadlift, lifting 200.5 kg at the IPF World Championships in South Africa, and she has kept raising the mark since, including a 208 kg lift at the Asian Classic Powerlifting Championships in Johor Bahru in December 2023.'
  ].join('\n\n'),
  moment: 'On 14 June 2026, at the IPF World Classic Open Powerlifting Championships in Druskininkai, Lithuania, she set her 14th world record with a 220.5 kg deadlift, winning gold in the event and making an international name as Singapore’s world champion in powerlifting.',
  legacy: 'On 6 November 2026 she received the Berita Harian Anugerah Jauhari, the Malay daily’s Achiever of the Year award. She has become an inspiration far beyond the sport, proof of how far determination can carry a Singaporean on the world stage.',
  rooms: ['gamechangers'], frame: 'gold', order: 7, focusY: .36, image: 'assets/farhanna-farid.jpg',
  alt: 'Watercolour portrait of powerlifter Farhanna Farid, arms crossed and gaze level, with long auburn hair, in a navy singlet over a white T-shirt against an orange wash.', credit: 'Watercolour on paper, signed by the artist and inscribed “Farhanna Farid, Berita Harian Anugerah Jauhari 2026”.'
});

const HUSSAINI = P({
  id: 'hussaini-abdullah', name: 'Haji Hussaini Abdullah', dates: 'Community leader since 1968', descriptor: 'Community leader & social activist',
  identity: 'Recently retired community leader and social activist, long-serving President of Pertapis',
  period: 'President of Pertapis, 2009–2023',
  opening: 'A banker by day, he spent more than four decades giving his evenings to his community.',
  story: [
    'Haji Hussaini Abdullah began his career in 1968, two years after obtaining his Cambridge School Certificate. After serving as an Auxiliary Police Officer with the then Malaysia-Singapore Airlines, he joined OUB Bank in 1977. Always striving to improve himself, he obtained a Diploma in Business Administration from PSB Academy in 1997 and rose to Senior Bank Officer in corporate banking.',
    'Throughout his working life he was active in voluntary and grassroots work: Treasurer of the Masjid Darul Ghufran building fund in Tampines (1983–93), member of the Tampines West Community Club Management Committee (1990–2015), Honorary Secretary of the Tampines GRC Anti-Drug Committee (1992–2002), Chairman of the Tampines West CC Senior Citizens Executive Committee (1995–2015), Vice-Chairman of Maulana Mohamed Ali Mosque (2014–22) and President of Persekutuan Kebajikan Islam Telok Kurau (2010–24).'
  ].join('\n\n'),
  moment: 'In 2011 Pertapis, as an Institution of Public Character receiving public funds, could no longer run religious classes or a religious school. Under his leadership it set up Pertapis Community Services Ltd, a company limited by guarantee, to continue its religious classes and madrasah, with him as Director and President until his retirement in 2025. In all, he helped lead Pertapis through 34 years of growth and transformation.',
  asideTitle: 'Honours',
  aside: 'In July 2011 he was one of nine Muslim leaders sponsored by the US State Department for a visit to the United States, including the Pentagon, Yale University’s Muslim Chaplain’s Office, the Pew Forum on Religion and Public Life and the United Nations headquarters. On his return MUIS conferred on him the Pingat Jasa Bakti, and in 2013 he performed the Hajj as a VIP guest of Saudi Arabia’s King Abdullah.',
  legacy: 'His varied and tireless involvement in community causes is an inspiration to the younger generation, and he has always credited his peers and supporters for their trust and collaboration.',
  rooms: ['gamechangers'], frame: 'bronze', order: 22, image: 'assets/hussaini-abdullah.jpg',
  alt: 'Watercolour portrait of Haji Hussaini Abdullah, smiling broadly, with white hair, in a navy blazer and pale-blue shirt against a golden wash', credit: 'Watercolour on paper, signed by the artist.'
});

const KALILOOL = P({
  id: 'kalilool-abdul-wahab', name: 'Kalilool Abdul Wahab', dates: 'Islamic Restaurant · since 1921', descriptor: 'Third-generation restaurateur',
  identity: 'Third-generation owner of Islamic Restaurant at 738 North Bridge Road, grandson of its founder',
  period: 'Islamic Restaurant, established 1921',
  opening: 'His grandfather cooked biryani for the Alsagoff household. A century later, the family still serves it on North Bridge Road.',
  story: [
    'Islamic Restaurant was founded in 1921 by M. Abdul Rahiman, who had served as master chef to the Alsagoff household and was an expert in the cherished nasi biryani. The restaurant flourished, feasting notable figures and royalty, and for a long time its only rival was Jubilee Restaurant a few doors away.',
    'Biryani is a mixed rice dish of long-grain basmati, spices and meat, believed to have Persian roots and refined in the kitchens of the Mughals. In its most elaborate dum style, layers of meat and partly cooked rice are infused with spices, saffron and caramelised onions and slow-cooked in a sealed pot. Once the staple of rich Muslim households, it is now as ubiquitous in Singapore as chicken rice.',
    'Today Kalilool maintains the original restaurant and has expanded into catering, home delivery and a cooking academy. Dining there is like stepping into a museum of the past, surrounded by vintage paintings, prints, posters, photographs, plaques and curios.'
  ].join('\n\n'),
  moment: 'For ordinary families of the past, biryani was a luxury reserved for the weddings of the well-to-do and for the annual Prophet’s birthday celebration. Most Malay families made do with a humbler version, nasi minyak, so much so that asking someone “When are you going to treat me to nasi minyak?” meant “When are you getting married?”',
  asideTitle: 'The Painter’s Note',
  aside: 'As a boy I remember that on the Prophet’s birthday, lorries would ferry us along Changi Road to Jamiyah at Lorong 12 Geylang, or to major mosques like Masjid Sultan or even as far as Telok Blangah, to feast on this delectable dish. For the love of all things art, Mr Kalilool has even asked me to redo a faded full-length portrait of a maharajah.\n\nThe best biryani I have relished so far: Mukmin in Bedok, Cahaya Timur at Changi Village, the late Hj Alauddin’s at Masjid Khalid, Hj Farouk’s at Masjid Aleem Siddique, and the longest queue, at Geylang Biryani in Geylang Serai Market.',
  legacy: 'More than a century on, Islamic Restaurant is visited not just for nostalgia but for a living recipe, kept by the grandson of the chef who made it famous.',
  rooms: ['gamechangers'], frame: 'bronze', order: 8, image: 'assets/kalilool-abdul-wahab.jpg',
  alt: 'Watercolour portrait of Kalilool Abdul Wahab, with dark swept-back hair and a moustache, in a white patterned shirt against a yellow and orange wash', credit: 'Watercolour on paper, signed by the artist.'
});

const HAWAZI = P({
  id: 'hawazi-daipi', name: 'Hawazi Daipi', dates: 'MP 1996–2015', descriptor: 'Teacher, journalist, MP & envoy',
  identity: 'Former teacher, journalist, Member of Parliament and Senior Parliamentary Secretary; Singapore’s Representative to the Palestinian Authority',
  period: 'Member of Parliament for Sembawang GRC, 1996–2015',
  opening: 'From a Telok Kurau classroom to the Palestinian Authority: a career spent in service.',
  story: [
    'Hawazi Daipi graduated with an honours degree in Economics and Geography from the University of Singapore in 1978. He taught until 1983, then joined Singapore Press Holdings as a journalist, rising to Special Assistant Editor at Berita Harian.',
    'Elected Member of Parliament for Sembawang GRC in 1996, he was re-elected in 2001, 2006 and 2011. He spent five years at the NTUC as Director of International Affairs and was Executive Secretary of four trade unions. He served as Senior Parliamentary Secretary for Manpower (2004–15), Health (2008–11) and Education (2011–15). At community level he chaired the Malay Language Council and the Sembawang-Nee Soon Town Council.'
  ].join('\n\n'),
  moment: 'After retiring from politics, he was appointed Singapore’s Non-Resident Representative to the Palestinian Authority in November 2016 and Non-Resident High Commissioner to Ghana in December 2016. On 11 June 2024 he attended the “Call for Action: Urgent Humanitarian Response for Gaza” conference in Jordan as the Foreign Minister’s Special Envoy. Singapore has worked with Egypt and Jordan to deliver humanitarian aid to Gaza, and Singaporeans have given generously through relief organisations.',
  asideTitle: 'The Painter’s Note',
  aside: 'Hawazi was a student of mine at Telok Kurau Secondary School in 1968, and like me he read Geography and Economics. In one of his regular visits to Palestine in 2020, he presented a portrait he had commissioned from me, of the then Prime Minister of Palestine, Dr Mohammad Shtayyeh, against the Palestinian flag.',
  legacy: 'Across teaching, journalism, Parliament and diplomacy, his career has been one of steady public service, at home and in some of the world’s most difficult places.',
  rooms: ['gamechangers'], frame: 'gold', order: 9, image: 'assets/hawazi-daipi.jpg',
  alt: 'Watercolour portrait of Hawazi Daipi, smiling broadly, with white hair and rimless glasses, in a navy blazer, white shirt and red-and-blue striped tie against an orange wash', credit: 'Watercolour on paper, signed by the artist.'
});

const RON = P({
  id: 'ron-kaufman', name: 'Ron Kaufman', dates: 'Singapore citizen since 2013', descriptor: 'Service-excellence educator & author',
  identity: 'American-born service-excellence educator and author, a Singapore citizen since 2013',
  period: 'Living in Singapore for 34 years',
  opening: 'He teaches the world to serve better, and on his morning walks he picks up the litter in our park.',
  story: [
    'Since graduating from Brown University, Ron Kaufman has spent some 40 years on a mission to make everyone empowered and inspired to excel in service: not only to customers, but to colleagues, partners, employees and the community. He calls it “Uplifting Service”: taking action to create value for someone we care about.',
    'He has worked with businesses, schools, governments and associations, developing courses, running bootcamps, delivering speeches and writing 15 books, among them Uplifting Service, which appeared on the New York Times and USA Today bestseller lists. His clients have included Changi Airport, Marina Bay Sands, SPH, Citibank, the Civil Service College, NTUC Income and Temasek Polytechnic.'
  ].join('\n\n'),
  moment: 'In 1990 the National Productivity Board and Singapore Airlines invited him to help launch a national curriculum for innovation and service excellence. A small nation with no natural resources, whose greatest asset is its people, went on to build world-class airline, airport, port, hospitality, finance, medical and logistics services. Whether lecturing at Stanford or to chief executives in Dubai, he holds up Singapore as the epitome of service excellence.',
  asideTitle: 'The Painter’s Note',
  aside: 'Two weeks ago, while pottering in my two roadside garden patches, I met Ron on his walk along the linear park, picking up litter with his gleaming stainless-steel picker and dropping it into the nearest bin. In a small way he is walking the talk, serving the community he has adopted as his own. This portrait is a token of appreciation for his passion and dedication to service excellence.',
  legacy: 'His work has helped make service a point of national pride, and he continues to carry Singapore’s example to cities around the world.',
  rooms: ['gamechangers'], frame: 'bronze', order: 10, image: 'assets/ron-kaufman.jpg',
  alt: 'Watercolour portrait of Ron Kaufman, smiling broadly, with close-cropped hair, in a dark suit and pale-blue shirt against a golden wash', credit: 'Watercolour on paper, signed by the artist.'
});

const SALLEH = P({
  id: 'salleh-marican', name: 'Salleh Marican', dates: 'Second Chance · listed 1997', descriptor: 'Entrepreneur & philanthropist',
  identity: 'Founder and CEO of Second Chance Properties, the first Malay/Muslim-owned company listed on the Singapore Exchange',
  period: 'In business since 1974',
  opening: 'His first business failed. He named the next one Second Chance.',
  story: [
    'Mohamed Salleh Marican’s father, Kadir Marican, originally from Nagore, died when Salleh was 15, forcing him to drop out before his A-level examinations.',
    'He went into men’s tailoring in 1974. When that failed, he started the aptly named menswear label Second Chance, which grew to 25 outlets in Singapore and Malaysia. By 1992 he had diversified into the Malay women’s fashion brand First Lady and the jewellery business Golden Chance, and later into property investment.',
    'His awards include the inaugural SMCC/Berita Harian Businessman of the Year (1988), the Entrepreneurship Excellence award from Lianhe Zaobao and NTU’s Entrepreneurship Development Centre (1996), Berita Harian Achiever of the Year (2011), Ernst & Young Entrepreneur of the Year (2012) and Best CEO at the Singapore Corporate Awards (2013).'
  ].join('\n\n'),
  moment: 'In 1997 Second Chance Properties was listed on the Singapore stock exchange, the first company owned by a Malay/Muslim to be listed.',
  asideTitle: 'The Lucky Number Two',
  aside: 'With $100 million in hand, he faced a choice between a Good Class Bungalow on Nassim Road and a charitable foundation. He chose the foundation: the Salleh Marican Foundation was born on 18 November 2021 and has given generously to education, healthcare and social welfare. Because the number 2 has been lucky for him, his Golden Chance lucky draws give away sums like $2,222 and $22,222, and he gives the same amounts to the Tabung Amal Aidilfitri and other causes.',
  legacy: 'His journey from humble beginnings to successful entrepreneur and philanthropist is an inspiration to many. On 20 June 2024 the Muslim Kidney Action Association (MKAC) presented him with its inaugural Luminary Award.',
  rooms: ['gamechangers'], frame: 'gold', order: 20, focusY: .38, image: 'assets/salleh-marican.jpg',
  alt: 'Watercolour portrait of Salleh Marican, smiling and looking upward, with swept-back grey hair and glasses, in a navy shirt against a golden wash', credit: 'Watercolour on paper, signed by the artist and inscribed “Mohd Salleh Marican, MKAC Luminary Award 2024”.'
});

const DOLLAH = P({
  id: 'abdolah-lamat', name: 'Cikgu Abdolah Lamat', dates: 'Educator for 50 years', descriptor: 'Malay language teacher & composer',
  identity: 'Veteran Malay-language educator with more than 50 years in primary schools, and composer of songs for the classroom',
  period: 'Teaching for more than five decades',
  opening: 'Taught piano by the composer of our national anthem, he has spent fifty years teaching children Malay through song.',
  story: [
    'Cikgu Abdolah Lamat, known to many as Cikgu Dollah, has taught the Malay language in primary schools for more than 50 years. Trained in piano by the late Zubir Said, composer of Singapore’s national anthem, he is well known for non-commercial inspirational songs and for songs used in the Ministry of Education curriculum.',
    'Malay is Singapore’s national language. In the past almost everyone had a working knowledge of bazaar Malay, and civil servants had to pass Standard One Malay to be confirmed in their posts. Today it is spoken mainly within the Malay/Muslim community, and the annual Bulan Bahasa, organised by the Malay Language Council with like-minded bodies, works to keep it alive.',
    'Believing that music is an effective vehicle for language, he has also written children’s books, among them Nyanyi dan Baca Bersama Datuk dan Nenek (Singing and Reading with Grandpa and Grandma).'
  ].join('\n\n'),
  moment: 'His best-known work is the signature song of Bulan Bahasa, the annual Malay Language Month: “Bahasa Menjunjung Budaya” (Language Upholds Culture), with lyrics by the late Dr Muhammad Ariff Ahmad. The two also collaborated on the theme song of the Pusat Bahasa Melayu (Malay Language Centre).',
  asideTitle: 'A Musical Family',
  aside: 'Cikgu Abdolah’s elder brother was the late Kassim Selamat, the 1960s pop yeh-yeh singer whose Baweanese-language song “La-A-Obe” rose to the top of the Malay pop charts in Singapore and Malaysia. Ask Cikgu for a jamming session today and he is ready: he sings as well.',
  legacy: 'Through half a century of lessons and songs, he has helped generations of children not only learn Malay but enjoy it.',
  rooms: ['gamechangers'], frame: 'wood', order: 21, image: 'assets/abdolah-lamat.jpg',
  alt: 'Watercolour portrait of Cikgu Abdolah Lamat, smiling gently, in a black songkok and a blue baju Melayu against a pale-yellow wash', credit: 'Watercolour on paper, signed by the artist.'
});

const SULTAN_MOSQUE = P({
  id: 'sultan-mosque', name: 'Sultan Mosque', dates: '1824 · rebuilt 1932', descriptor: 'Masjid Sultan, Kampong Gelam',
  identity: 'Singapore’s best-known mosque, seen from the busy junction of North Bridge Road and Arab Street',
  period: 'National Monument since 1975',
  opening: 'Two hundred years after it was founded, its golden domes still anchor Kampong Gelam.',
  story: [
    'The first Sultan Mosque was built beside the palace of Sultan Hussein Shah between 1824 and 1826, a modest building with a tiered Nusantara roof. As it fell into disrepair, the community resolved to build anew, and between 1924 and 1932 the present Indo-Saracenic mosque rose to a design by Denis Santry of Swan & Maclaren, funded by donations from Muslims of every community.',
    'It was gazetted a National Monument in 1975, and in 2024 it marked its 200th anniversary with the publication of a commemorative book.'
  ].join('\n\n'),
  moment: 'At this junction stand Singapore’s most famous murtabak restaurants, Zam Zam and Victory, later joined by Tasneem, whose staff vie energetically for every passing pedestrian and driver. Malaysian visitors remember to buy murtabak here before heading home, choosing from chicken, mutton, sardine and even venison. Indonesian visitors know murtabak as something else entirely: a sweet, peanut-filled folded pancake.',
  asideTitle: 'The Painter’s Note',
  aside: 'The consolation of eating in here is hearing the azan and Quranic recitations pervading the air from the mosque, said to be the only one in Singapore allowed to face its speakers outwards, with an ambience reminiscent of the holy cities of Mecca and Medina.',
  legacy: 'Formerly the royal mosque of the Sultan of Johor, it remains a symbol of the unity of Singapore’s Muslims and one of the city’s most loved landmarks.',
  rooms: ['monuments'], frame: 'gold', orient: 'landscape', order: 3, image: 'assets/sultan-mosque.jpg',
  alt: 'Watercolour of Sultan Mosque seen from the street: the great golden onion dome and a tall minaret above a cream-and-ochre facade with pointed arched windows and iron gates, cars parked in front and trees to the right under a bright blue sky', credit: 'Watercolour on paper, signed by the artist.'
});

const AL_HUDA = P({
  id: 'masjid-al-huda', name: 'Masjid Al-Huda', dates: '1925 · rebuilt 1966', descriptor: 'The mosque of Kampong Tempe',
  identity: 'The mosque on Jalan Haji Alias, Bukit Timah, last physical reminder of the Malay village of Kampong Tempe',
  period: 'Centenary, 12 July 2025',
  opening: 'The village is gone. Its mosque, and its people, keep coming back.',
  story: [
    'Decades ago a Malay village, unofficially named Kampong Tempe, stood in the heart of Bukit Timah, around Coronation Road, Sixth Avenue, Jalan Haji Alias and Jalan Lim Tai See. Javanese and other settlers from Indonesia built kampong houses there among Chinese and Indian neighbours, and some Javanese families found their niche making tempe and distributing it across Singapore.',
    'The land was set aside as wakaf in 1905 and a small prayer house built. By 1925, as more settlers arrived, the trustees built a larger wooden mosque in the Javanese style, with a two-tiered roof, named Masjid Kampong Coronation; part of its land was donated by a Hindu landowner, Narainan Chitty. In 1966 it was rebuilt as the concrete mosque seen today, and in 1971 it was renamed Masjid Al-Huda.',
    'By the 1980s the village had ceased to exist. Kampong houses were deemed temporary structures, and most residents sold their land and moved out of what is now a private estate of bungalows, terraces and condominiums.'
  ].join('\n\n'),
  moment: 'Former villagers still return faithfully for daily, Friday and Hari Raya prayers, lectures and activities, finding peace and serenity in a mosque set amid a largely non-Muslim neighbourhood. On spare wakaf land, the mosque and Warees Investments, a MUIS subsidiary, built residential units known as Alias Villas to provide income for the wakaf fund.',
  asideTitle: 'The Painter’s Note',
  aside: 'Encik Ahmad Farid, the mosque’s vice-chairman, asked me to do two paintings of the mosque for its centenary celebration on 12 July 2025, as part of a fund-raising project for religious classes for underserved youngsters. Both paintings have been acquired by former residents of Kampong Tempe. Each measures 74 cm by 55 cm. To know more about the village, read Kampong Tempe, by the prolific local writer Hidayah Amin and former resident Yahya Sanusi.',
  legacy: 'A hundred years on, Masjid Al-Huda stands as the living memory of Kampong Tempe, a village that exists now only in the hearts of those who return.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 4, image: 'assets/masjid-al-huda.jpg',
  alt: 'Watercolour of Masjid Al-Huda on Jalan Haji Alias: a low mosque with a green roof and golden domes, a white minaret with a golden cupola, arched blue windows, a front staircase, and the mosque’s signboard and flowerbeds by the gate', credit: 'Watercolour on paper, 74 × 55 cm, signed by the artist. Painted for the mosque’s centenary, 2025.'
});

const YUSOF_ISHAK = P({
  id: 'masjid-yusof-ishak-orchid', name: 'Dendrobium Masjid Yusof Ishak', dates: 'Hybridised 2018', descriptor: 'An orchid for a mosque',
  identity: 'The orchid hybrid named in honour of Masjid Yusof Ishak in Woodlands',
  period: 'Masjid Yusof Ishak, opened April 2017',
  opening: 'A mosque that blends tradition with Nusantara heritage, honoured with an orchid of its own.',
  story: [
    'Dendrobium Masjid Yusof Ishak was hybridised by renowned orchidologist Syed Yusof Alsagoff to commemorate the first anniversary of the mosque in April 2018. Syed Yusof, who with Dr Tan Wee Kiat, former chairman of NParks, helped establish the National Orchid Garden at the Singapore Botanic Gardens, presented saplings of the hybrid to the mosque garden.',
    'Opened in April 2017, Masjid Yusof Ishak in Woodlands has a unique design that blends traditional mosque requirements with Nusantara heritage. It was the 26th mosque built through the Mosque Building and Mendaki Fund, through which Muslim workers contribute monthly via the Central Provident Fund.'
  ].join('\n\n'),
  moment: 'The mosque is named after Singapore’s first President, Encik Yusof bin Ishak, who became Yang di-Pertuan Negara in 1959 and President on Singapore’s independence in 1965. He passed away in 1970 and lies at Kranji State Cemetery.',
  asideTitle: 'The Painter’s Note',
  aside: 'Yours sincerely painted the orchid so that visitors to the mosque can picture the hybrid that honours it, even when the plant is not in bloom.',
  legacy: 'In a garden city famous for naming orchids after its guests, this one honours a mosque and, through it, the nation’s first President.',
  rooms: ['monuments'], frame: 'gold', order: 5, focusY: .4, image: 'assets/masjid-yusof-ishak-orchid.jpg',
  alt: 'Watercolour of the Dendrobium Masjid Yusof Ishak orchid: a tall spray of pink-magenta blooms above green leaves against a deep teal background, inscribed with the hybrid’s name and “Hybridised by Syed Yusof Alsagoff”', credit: 'Watercolour on paper, signed by the artist and dated 2018, inscribed “Dendrobium Masjid Yusof Ishak, Hybridised by Syed Yusof Alsagof”.'
});

const KAMPONG_DURIAN = P({
  id: 'kampong-durian-ubin', name: 'Kampong Sungai Durian, Pulau Ubin', dates: 'Ubin Day 2024', descriptor: 'A family house on Pulau Ubin',
  identity: 'The family home at 760D Kampong Sungai Durian, Pulau Ubin, at least a century old',
  period: 'Painted after Ubin Day, 22 June 2024',
  opening: 'Her ancestors built a house on this spot 150 years ago. Her family still gathers here every Hari Raya.',
  story: [
    '760D Kampong Sungai Durian was the family home of Cik Kamariah Abdullah and her parents. Her ancestors built a house on the site some 150 years ago, and the present house is at least a century old. On Ubin Day, 22 June 2024, her family was there as usual, as at their annual Hari Raya gathering, proudly showing relatives and visitors their heritage home.',
    'Pulau Ubin, originally Pulau Batu Jubin, was quarried for granite until the 1970s, and once farmed coffee, nutmeg, durian, tobacco, coconut, pineapple and rubber. Its population has fallen from about 2,000 in the 1950s to a few dozen villagers, and only around 70 kampong houses remain, many dilapidated.',
    'The house is a rumah panggung, a Malay house on stilts, with the layout of the Rumah Limas found in Palembang, Johor and Selangor: the visitor climbs from the anjung, the porch, to the serambi where guests are received, then the ibu rumah with its bedrooms, and finally, a step lower, the dapur, the kitchen.'
  ].join('\n\n'),
  moment: 'NParks is restoring the island’s remaining vacant houses, starting with five for community and commercial use. Dr Imran bin Tajudeen of NUS has been commissioned to document their architecture and recommend how to conserve or rebuild them to their original design, down to the type of wood.',
  asideTitle: 'The Painter’s Note',
  aside: 'Encik Rahmat Yusoff, a former resident of 788M Kampong Sungai Durian whom I met on Ubin Day, returns to his kampong house almost every week with his family, even though he now pays rent to NParks, bringing diesel for his well pump and generator. Syazwan Abdul Majid, whose parents lived at 818K Kampong Surau, leads tours through his Wan’s Ubin Journal, and gave us a demonstration of the azan to help us imagine the village surau in the old days. The painting measures 74 cm by 55 cm.',
  legacy: 'The Friends of Ubin Network, with MND and NParks, is working to keep the island’s rustic charm, planting trees, protecting vulnerable species and surveying the mangroves, so that Ubin remains Singapore’s last memorable rural retreat.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 6, image: 'assets/kampong-durian-ubin.jpg',
  alt: 'Watercolour of the timber kampong house at 760D Kampong Sungai Durian, Pulau Ubin: a pale-yellow stilt house with zinc roofs, shuttered windows with blue curtains and a small front porch, shaded by trees and fronted by pink and purple bougainvillea', credit: 'Watercolour on paper, 74 × 55 cm, signed by the artist and inscribed “760D Kampong Sungai Durian, Pulau Ubin”.'
});

// Clearly-labelled demo placeholders. No real people or places, no invented history.
const HANI = P({
  id: 'hani-isnin-racine', name: 'Hani Isnin-Racine', dates: 'The $2.50 Shop · Jalan Kukoh', descriptor: 'Hawker & community feeder',
  identity: 'Law and Economics graduate of the National University of Singapore who runs The $2.50 Shop at Kukoh 21 Food Centre with her parents; finalist, The Straits Times Singaporean of the Year 2023',
  period: 'Feeding Jalan Kukoh since 2019',
  opening: 'When prices everywhere went up, she brought hers down.',
  story: [
    'Hani Isnin-Racine graduated from the National University of Singapore with a double degree in Law and Economics. Since young, her parents, themselves hawkers, had urged her to study hard and find a well-paid job rather than follow them behind a stall. After graduation she joined the corporate world, but it lasted only a few months. She left to run a school canteen, happy to serve affordable food to children, even as her parents felt she had wasted her degree.',
    'Some years later it was time to help her elderly parents run their stall at Jalan Kukoh, an old HDB neighbourhood in Chinatown of one-room, two-room and rental flats, where many residents are elderly, on low incomes or living alone. While most hawkers raised prices to keep pace with the cost of ingredients, wages and GST, Hani did the opposite. Seeing neighbours who sat in front of the stall unable to afford a meal, the family cut almost every dish to $2.50 and renamed the stall The $2.50 Shop.',
    'Her day begins in the small hours: the stall opens at 3.30am to catch night-shift workers on their way home. Customers who still cannot pay give what they can, and Hani accepts it, because feeding the needy is her passion. The portions and quality stay the same: mee soto, lontong, nasi lemak, mee rebus, tahu goreng, mee goreng, with nasi padang dishes for those who can pay more, still cheaper than elsewhere.'
  ].join('\n\n'),
  moment: 'The family takes home a much smaller income, getting by on past savings and her husband’s salary. Yet Hani is confident the model is sustainable, and has spoken of opening more such stalls elsewhere in Singapore.',
  asideTitle: 'The Painter’s Note',
  aside: 'Being a finalist is already a win. The Straits Times Singaporean of the Year 2023 went jointly to Ronita Paul and Geraldine Lee, who founded Arc Children’s Centre to support children battling cancer and other critical illnesses.\n\nThe portrait is in the possession of Hani Isnin-Racine.',
  legacy: 'In one of Singapore’s poorest neighbourhoods, a university graduate chose the hawker’s life her parents wanted to spare her, and made a $2.50 plate a promise to her neighbours.',
  rooms: ['heroes'], frame: 'wood', order: 2, focusY: .4, image: 'assets/hani-isnin-racine.jpg',
  alt: 'Watercolour portrait of Hani Isnin-Racine laughing, her cheek resting on her fist, in a royal-blue tudung and blouse, gold-rimmed glasses and a gold bangle, against a golden-yellow wash',
  credit: 'Watercolour on paper, signed by the artist and inscribed “ST Singaporean of the Year Finalist 2023”. Collection of Hani Isnin-Racine.'
});

const CLARKE_QUAY = P({
  id: 'clarke-quay',
  name: 'Clarke Quay',
  dates: 'Singapore River',
  descriptor: 'From godowns to festival village',
  identity: 'The colourful restored warehouses and shophouses of Clarke Quay on the Singapore River, with a river taxi passing beneath the bridge',
  period: 'Conservation area since 1989',
  opening: 'Once a drab line of godowns where coolies unloaded the tongkangs, now the river’s brightest façade.',
  story: [
    'Clarke Quay is named after Sir Andrew Clarke, Governor of the Straits Settlements, who presided over the Pangkor Treaty of 1874, under which the Malay sultans of the peninsula accepted British Residents as advisors.',
    'For generations it was a drab and dingy row of commercial houses, shophouses and warehouses, with docks where coolies loaded and unloaded cargo from the tongkangs and twakows. After the clean-up of the Singapore River, the 1985 Singapore River Concept Plan marked Clarke Quay as a festival village of shops and entertainment, and the whole area was gazetted for conservation in 1989.',
    'DBS Land won the tender for the entire site and restored five blocks of some sixty shophouses and warehouses, laying promenades and pedestrianising the streets. Clarke Quay Festival Village opened in December 1993, with river cruises, two tongkangs turned into floating restaurants and buskers performing on Read Bridge.'
  ].join('\n\n'),
  moment: 'The redevelopment made Clarke Quay livelier and commercially viable, but some felt it eroded the identity of the place and turned it into a generic tourist zone. In 2000 DBS Land merged with Pidemco Land to form CapitaLand, which later commissioned a major revamp, reopened in 2006, aimed at young professionals and tourists: huge overhead canopies, pod-like riverside dining platforms and giant fans so visitors could enjoy the quay in any weather. To some of us these additions look garish and outlandish, denigrating the authentic look of the landscape.',
  asideTitle: 'The Painter’s Note',
  aside: 'I have omitted the overhead canopies in this painting, and given this colourful scene a rendition in a subdued California style of watercolour.',
  legacy: 'Behind the canopies and neon, the old godowns of the Singapore River still stand, restored, repainted and full of life.',
  rooms: ['beautiful'], frame: 'wood', orient: 'landscape', order: 3,
  alt: 'Watercolour of Clarke Quay: a row of restored shophouses painted pink, orange, yellow and blue under orange tiled roofs, beside Read Bridge, with white pod-like dining canopies and a green-hulled river taxi with passengers crossing the Singapore River under a deep blue sky',
  image: 'assets/clarke-quay.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist.'
});

const GT_LYE = P({
  id: 'gt-lye', name: 'Baba G. T. Lye', dates: 'Steward of Intangible Cultural Heritage, 2020', descriptor: 'Wayang Peranakan actor & dondang sayang exponent',
  identity: 'Baba Gwee Thian Lye, known as G. T. Lye: actor, scriptwriter, director and dialogue coach whose name is synonymous with Wayang Peranakan and dondang sayang',
  period: 'On stage since 1984',
  opening: 'For forty years, the most convincing nyonya matriarch on the Peranakan stage has been a man.',
  story: [
    'In pre-war Singapore of the 1930s, the Malays had Bangsawan, a Malay-language opera performed by a troupe with music and dance, in court language and drawn mainly from tales of nobility and royalty. The Baba Peranakans devised their own theatre, Wayang Peranakan, performed in Baba Malay and depicting the rich social and cultural life of the community. It faded, made a comeback in the 1950s, and faded again.',
    'Its next revival came in 1984 with Pileh Menantu (Choosing a Daughter-in-Law), staged by the Gunong Sayang Association, in which G. T. Lye, a true-blue Peranakan in his mid-forties, made his stage debut. The association could not find a suitable actress to play the matriarch, and male actors had traditionally taken such roles, so G. T. was perfect for the part. He went on to play her again in Buang Keroh Pungot Jerneh (Let Bygones Be Bygones) in 1985 and in many plays after, while also writing scripts, co-directing and coaching the dialogue.',
    'Even in his debut he cared about every detail that showed the truthful face of Peranakan heritage: the tight sanggul bun of the matriarch, the baju panjang, the kasut manek, the jewellery, and the lilting speech and mannerisms of the bibiks. Growing up Peranakan had given him a mountain of memories of every kind of Peranakan life, the poor and the rich, the good, the bad and even the scandalous, and all of it fed the domestic scenes at the heart of the plays.'
  ].join('\n\n'),
  moment: 'Wayang Peranakan and dondang sayang are performed in Baba Malay, a blend of Malay with Hokkien and other Chinese dialects, and demand great fluency and quick wit for their light-hearted sparring and repartee. Through such music, poetry and literary texts, Malays and Peranakans have long been close to one another.\n\nOver some forty years G. T. has appeared in 23 Wayang Peranakan productions in Singapore and the region. The Singapore Tourism Board has chosen him to showcase Peranakan culture on overseas missions, and he has mentored younger performers such as Ivan Heng, himself a Peranakan and the founder of W!LD RICE.',
  asideTitle: 'The Painter’s Note',
  aside: 'This was my first portrait of the new year, of Baba G. T. Lye at 83. My first chance to meet him in person came when my old friend, retired district judge Abdul Rahim Jalil, invited us to see his incredible collection of Peranakan furniture and artefacts at his home in Koon Seng Road.',
  legacy: 'As someone who has lived the culture, G. T. is one of the last remaining experts in the customs, traditions and practices of the Peranakans’ bygone era, and a guide for the young who are rediscovering their heritage. In 2020 the National Heritage Board named him a Steward of Intangible Cultural Heritage.',
  rooms: ['gamechangers'], frame: 'gold', order: 11, focusY: .38, image: 'assets/gt-lye.jpg',
  alt: 'Watercolour portrait of Baba G. T. Lye smiling, with gold-rimmed glasses and wisps of white hair, in a vivid green, yellow, orange and red floral shirt against a deep blue wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const OSMAN = P({
  id: 'osman-abdul-hamid', name: 'Osman Abdul Hamid', dates: 'Cultural Medallion 2023', descriptor: 'Malay dance choreographer & director',
  identity: 'Dancer, choreographer, director and educator; founder of Teater Tari Era and artistic director of Era Dance Theatre',
  period: 'Dancing since 1977',
  opening: 'A schoolboy footballer who thought dance would make him less macho became Singapore’s leading champion of Malay dance.',
  story: [
    'In his schooldays at Upper Serangoon Technical School, Osman Abdul Hamid was an avid footballer, hockey and basketball player and athlete, and later played football for Tampines Rovers from 1978 to 1981. He never thought of becoming a dancer. But his first dance teacher, Encik Salleh Buang, convinced him in 1977 that dance could be as athletic as any sport: rehearsals included circuit training, crawling, frog jumps, duck walks and silat exercises.',
    'He went on to study under dance doyens such as Cultural Medallion recipient Som Said, Nongchik Ghani, founder of Sriwana, Singapore’s first Malay dance troupe, and Tom Ibnur of Indonesia, while mastering Chinese, Indian, Balinese, Javanese and Minang styles. His vision of bringing wushu and silat into conventional Malay dance, with acrobatic moves and inter-cultural choreography, drew critics, but he hoped that pushing the boundaries would give traditional Malay dance a new lease of life. To that end he founded Teater Tari Era in 1996 as part of People’s Association Talents, and contributes to the PA’s Malay dance performances at Chingay each year.',
    'In 2001 he directed Perjalanan: An Inner Odyssey, weaving regional music and dance with Minangkabau randai, a folk theatre of song, dance, drama, music and silat. He has been active in Gentarasa since it began in 2002 to showcase Malay dance, silat, dikir barat and literature. In 2005, for a Singapore Chinese Orchestra concert, he choreographed the royal wedding of Melaka’s Sultan Mansur Shah and the Ming princess Hang Li Po, setting Malay dance to Chinese orchestral music. With Apsaras Arts he worked on Angkor: An Untold Story and Anjaneyan: Hanuman’s Ramayana, synthesising Javanese and Indian elements.'
  ].join('\n\n'),
  moment: 'Osman believes that a strong foundation in Malay dance ensures it will remain Malay dance, even when infused with other elements. He teaches in schools, whose groups perform well at the Singapore Youth Festival; was resident choreographer of the NUS dance group Ilsa Tari from 1995 to 2023; works on talent development through the Singapore Malay Dance Committee, which he founded; and directs the Muara Dance Festival, which showcases the best of Malay dance from Singapore and the region.',
  asideTitle: 'Honours',
  aside: 'He received the Young Artist Award in 1993 and the Public Service Medal in 2018 for his contributions to the National Arts Council. In 2023 he was conferred the Cultural Medallion, the first Malay dancer so honoured since Som Said in 1987.\n\nInterest in Malay dance is growing, he believes, even if paying audiences are not always encouraging. Two of his five children dance with his company. We look forward to many more of his initiatives to promote and sustain Malay dance.',
  legacy: 'By grounding every experiment in tradition, he has kept Malay dance both rooted and alive for a new generation of dancers and audiences.',
  rooms: ['gamechangers'], frame: 'gold', order: 12, focusY: .36, image: 'assets/osman-abdul-hamid.jpg',
  alt: 'Watercolour portrait of Osman Abdul Hamid with arms folded, swept white hair and a white goatee, in a blue baju Melayu and a dark wristwatch, against an ochre wash',
  credit: 'Watercolour on paper, signed by the artist and inscribed “Cultural Medallion 2023”.'
});

const YIP = P({
  id: 'yip-yew-chong', name: 'Yip Yew Chong', dates: 'Full-time artist since 2018', descriptor: 'Streetscape muralist',
  identity: 'Singapore’s most prolific streetscape artist, a former accountant whose murals of old Singapore line the walls of Chinatown, Kampong Gelam, Tiong Bahru and beyond',
  period: 'Painting murals since 2015',
  opening: 'To him there is no heritage once the buildings have vanished, so he paints them back onto the walls.',
  story: [
    'Yip Yew Chong has been doodling and sketching since his schooldays at Pearl’s Hill Primary, Raffles Institution and Raffles Junior College. An accountancy graduate of Nanyang Technological University, he spent 25 years in the profession, painting part-time, before leaping into art full-time in 2018. He works in murals, canvas, sketches, installations, digital art, photography and video, but his best-known works are the public murals on Singapore’s streets: intricately detailed, nostalgic stories of his childhood, of bygone eras and demolished places, sometimes mixing past and present in a whimsical way.',
    'Growing up in a Chinatown shophouse full of tenants and characters gave him a treasure box of memories. At 30 Temple Street he painted an epic three-storey mural of Chinatown life in 24 days, operating scissor and boom lifts to reach the top of the wall. He paints quickly to beat the weather, and builds in scenes where onlookers can pose as part of the picture, so his murals are full of photo opportunities.',
    'Remarkably, he works without a preliminary sketch, glancing only now and then at his phone for details. Even while painting he finds time to chat with the crowd, study hundreds of old photographs, share stories on social media and consult people in the area, sometimes adjusting a scene. Relative locations may not be historically exact; what matters to him is the ambience, the memories and the feeling.'
  ].join('\n\n'),
  moment: 'His exhibition I Paint my Singapore, a 60-metre painting of 27 scenes of everyday Singapore in the 1970s and 1980s, drew a constant stream of visitors to the Raffles City Convention Centre from 30 November 2023, with demonstrations and signings of his book I Paint my Singapore and of The Art of Joy, Woon Tai Ho’s book on his journey. Its run was extended to 1 February 2024.',
  asideTitle: 'The Painter’s Note',
  aside: 'When I met him painting his murals at Kampong Gelam, where he never lived, he came out with vivid details: the rattan basketry, the name of a Muslim undertaker of the past, the teh tarik stall of yesteryear and much more. He had done his homework, consulting past residents and those in the know. To us his streetscapes are heritage; to him they are a way of sharing fond memories of old Singapore. Do go and enjoy his unique street art.',
  legacy: 'Wall by wall, a former accountant has given Singapore back the streets it lost, and invited everyone passing by to step into them.',
  rooms: ['gamechangers'], frame: 'gold', order: 13, focusY: .42, image: 'assets/yip-yew-chong.jpg',
  alt: 'Watercolour portrait of Yip Yew Chong smiling, in a brown wide-brimmed hat, glasses and a checked scarf over his head and shoulders, against a sketched Kampong Gelam street of shophouses, a lamp post, a stop sign and arches',
  credit: 'Watercolour on paper, signed by the artist and inscribed “Yip Yew Chong, Prolific Streetscape Artist”.'
});

const ROSSMAN = P({
  id: 'rossman-ithnain', name: 'Rossman Ithnain', dates: 'Collector, docent & forager', descriptor: 'Nature and culture vulture',
  identity: 'Retired lawyer and trade official, collector of Malay and Peranakan heritage, docent and writer on Malay embroidery, jewellery and foraging',
  period: 'Twenty-seven years in the civil service',
  opening: 'He calls himself a wondering wanderer. His friends call him a nature and culture vulture.',
  story: [
    'After Raffles Institution and Hwa Chong Junior College, Rossman Ithnain read law at the National University of Singapore and took his LLM at Fitzwilliam College, Cambridge. He practised law for two years and briefly joined the Civil Aviation Authority as Director (International Relations), then spent 27 years in the civil service with IE Singapore and the Ministry of Trade and Industry, with postings to Geneva, Washington and Jakarta. He took part in Singapore’s free trade negotiations with countries including the United States, India, Australia and Japan.',
    'Married with three children, he says his multicultural upbringing coloured his life and outlook, and it shows in his collection of Malay, Peranakan and Singapore memorabilia and artefacts. He lent pieces to the Malay Heritage Centre’s exhibition Cerita, and for Gaya Kebaya in November 2023 he served as a docent and lent his kerosang and other accessories. Berita Mediacorp featured his Malay jewellery collection in its documentary Hilang in 2021 and 2022, and he has written on Malay embroidery, jewellery and foraging for Passage, the magazine of the Friends of the Museums Singapore.',
    'Retirement has freed him to follow his curiosity: history and heritage, art and painting, kayaking, stand-up paddleboarding, scuba diving and hiking. He has climbed Mount Kinabalu and the Semeru volcano, trekked to the Pinnacles of Gunung Mulu, Ujung Kulon, Royal Belum and Lenggong, and visited the Baduy of Banten. In the Riau archipelago he sought out lesser-known traditions such as masked mak yong, kelingkan embroidery and songket.'
  ].join('\n\n'),
  moment: 'Back home, his love of the sea takes him walking the intertidal zone, documenting what he finds. He forages too, meramu, a word revived by Khir Johari in The Food of Singapore Malays, along the shore and the fringes of parks and marshes, gathering ingredients to cook as the kampong Malays once did.',
  asideTitle: 'The Painter’s Note',
  aside: 'Last week we were together at Rahim Jalil’s Peranakan house with Baba G. T. Lye and another Peranakan gentleman, viewing the retired district judge’s collection of furniture and artefacts. Do savour Rossman’s zest for life in the posts that accompany his escapades. I particularly like his ethnic attire at every function: a floral or batik shirt with a sarong of pelikat or songket, or dungarees, finished with a traditionally crafted silver belt or, at times, the green haji belt-cum-wallet.',
  legacy: 'A life spent representing Singapore abroad has become a retirement spent rediscovering the Malay world, one artefact, island and shoreline at a time.',
  rooms: ['heroes'], frame: 'wood', order: 3, focusY: .38, image: 'assets/rossman-ithnain.jpg',
  alt: 'Watercolour portrait of Rossman Ithnain laughing, with swept-back white hair and a white moustache and goatee, in a white shirt with a lilac floral print against a deep blue wash', credit: 'Watercolour on paper, signed by the artist.'
});

const HABIB_NOH = P({
  id: 'habib-noh-shrine',
  name: 'Habib Noh Shrine',
  dates: 'SeniLukis III, 2023',
  descriptor: 'Maqam Habib Noh, Palmer Road',
  identity: 'The shrine of Habib Noh on its hillock above Masjid Haji Muhammad Salleh, painted in sepia',
  period: 'Habib Noh buried here in 1866; mausoleum built 1890',
  opening: 'Forty-nine steps up a small hill, a saint’s shrine has watched over Singapore’s harbour for more than a century and a half.',
  story: [
    'This is the artist’s second painting of Habib Noh Shrine, from a different angle and in sepia. Standing on a hillock reached by 49 steps, it towers above Masjid Haji Muhammad Salleh at its base. Habib Noh was buried here in 1866, and ever since the hill has stood like a beacon over Tanjong Pagar, Singapore’s global port. The mausoleum was built in 1890 by the philanthropist Syed Mohamed Alsagoff, and the steps a few years later.',
    'Habib Noh, Syed Noh bin Syed Ahmad Alhabsyi, came to Singapore in 1819. He was one of the Arabs of Hadhramaut in Yemen who migrated to the Nusantara from the mid-18th century onwards, seeking trade and spreading the Islamic faith. Muslim traders had come to the region in search of spices as early as the 7th century; by the 12th some had settled and blended with local people, and by the time the Portuguese conquered Melaka in 1511, Islam was well established across most of the Nusantara.',
    'In Singapore, Yemeni Arab families such as the Alsagoffs, Aljunieds, Alkaffs and Alhabsyis, whose names carry the honorific Sayyid, are said to be descended from the Prophet Muhammad. They and other Arab families such as the Bamadhaj, Basharahil, Bentalib and Mattar prospered in trade while founding mosques, madrasahs, orphanages and community works.'
  ].join('\n\n'),
  moment: 'Habib Noh was known across the region as a preacher of compassion, generosity and harmony regardless of faith or race, and as a philanthropist. He was also believed to possess karamah, the spiritual gift of Muslim saints, foretelling events and healing the sick in unusual ways. More than a century and a half after his death, locals, non-Muslims among them, and visitors from across the region still climb to his shrine at Palmer Road to pay their respects and ask the imam to offer prayers.',
  asideTitle: 'The Painter’s Note',
  aside: 'This painting was one of my two works exhibited at SeniLukis III, the Kamal Arts group exhibition at Wisma Geylang Serai, from 8 to 17 December 2023.',
  legacy: 'Above the port that made Singapore, the shrine remains a place where people of every background come to remember a man of compassion.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 7,
  alt: 'Sepia watercolour of Habib Noh Shrine on its hillock: the domed mausoleum with finials, arched windows and lanterns, reached by long flights of railed steps rising through tall grass, a tree and a pitched roof to the right',
  image: 'assets/habib-noh-shrine.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist. Exhibited at SeniLukis III, Kamal Arts, Wisma Geylang Serai, December 2023.'
});

const KAMAR = P({
  id: 'kamar-lim', name: 'Kamar Lim', dates: 'St John Ambulance Brigade · Darul Arqam', descriptor: 'Educator & lifelong volunteer',
  identity: 'Educator, Assistant Superintendent of the St John Ambulance Brigade, and for more than 30 years Secretary of Darul Arqam, the Muslim Converts’ Association of Singapore',
  period: 'Volunteering for more than half a century',
  opening: 'Wherever there was a crowd in the 1960s and 70s, the St John Ambulance men were there, and Kamar Lim was among them.',
  story: [
    'Kamar Lim’s parents, the late Baba Puteh and Bibik Wanteh, were true-blue Peranakans living in Kembangan, a Malay heartland, and great lovers of Peranakan culture, dondang sayang and joget, all popular in the 1960s.',
    'As the eldest child and a busy educator, Kamar led his family through the hard years of the 1960s and 70s, yet still gave his time and energy to the St John Ambulance Brigade, the voluntary organisation that teaches first aid, home nursing and life-saving skills. Many will remember its familiar ambulances and uniformed members standing by at public events, ready to attend to the injured.',
    'He roped in his younger siblings, Hashim Lim (Ee Tam) and the late Hawa Lim and Adam Lim. Together they helped set up the brigade as a co-curricular activity in schools, training and assessing thousands of young men and women. In nearly 30 years of service, Kamar rose to Assistant Superintendent and served as Secretary of the Sri Temasek Corps.'
  ].join('\n\n'),
  moment: 'He was equally devoted to Darul Arqam, the Muslim Converts’ Association of Singapore, serving on its executive committee and as its Secretary for more than 30 years. He saw it through its struggle over a piece of land on Changi Road to the establishment of its headquarters at The Galaxy in the heart of Geylang Serai, where it now inducts some 500 to 600 converts a year. He also gave 20 years to Madrasah Alsagoff as an adjunct mathematics teacher and committee member.',
  asideTitle: 'The Painter’s Note',
  aside: 'Kamar is an old friend whom I have known for more than 50 years. On his 80th birthday, all my prayers for his long life, good health and continued happiness.',
  legacy: 'Quietly, over decades, he has trained thousands to save lives and helped thousands more find a home in a new faith.',
  rooms: ['heroes'], frame: 'wood', order: 4, focusY: .4, image: 'assets/kamar-lim.jpg',
  alt: 'Watercolour portrait of Kamar Lim laughing broadly, bald with thin-rimmed glasses, in a maroon, white and gold striped polo shirt against a turquoise wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const SHAHRIN = P({
  id: 'shahrin-abdol-salam', name: 'Shahrin Abdol Salam', dates: 'Anugerah Jauhari 2023', descriptor: 'Rail engineer & transport leader',
  identity: 'Former Managing Director of SMRT TEL and Senior Vice President, Strategic Relations, SMRT Corporation; recipient of the Berita Harian Anugerah Jauhari 2023',
  period: 'In rail since 1998',
  opening: 'He joined SMRT as a maintenance engineer and went on to run Singapore’s newest MRT line.',
  story: [
    'Shahrin Abdol Salam joined SMRT as a maintenance engineer in 1998 and rose rapidly through the ranks. He holds a Bachelor of Engineering (Electrical) with honours from the Royal Melbourne Institute of Technology and a Master of Science (Management and Technology) from the National University of Singapore.',
    'From September 2008 to October 2010 he was seconded to Dubai as Managing Director of SMRT Engineering Middle East. After leadership roles in rail operations back home, he left in 2012 to join Dubai’s Roads and Transport Authority, working on the Dubai Metro. In 2014 he became Chief Engineer, Rail Operations, and helped inaugurate the Dubai Tram; his last role there was Rail Expert and Advisor to the CEO of the Rail Agency.',
    'In 2016 he was invited back to SMRT. At the time of his award he led a team of 1,200 operating the Thomson–East Coast Line, Singapore’s sixth and newest MRT line, and was involved in developing the first cross-border rail link between Singapore and Johor Bahru.'
  ].join('\n\n'),
  moment: 'A Fellow of the Chartered Institution of Railway Operators (UK), Chairman of the UITP Asia-Pacific Urban Rail Committee and a Chartered Engineer in Railway Technology and Systems, he was part of the push to improve MRT reliability. In 2016 trains travelled about 174,000 km between delays; then Transport Minister Khaw Boon Wan set a target of one million, which was reached in 2019, the year Shahrin received the Public Service Medal.',
  asideTitle: 'The Painter’s Note',
  aside: 'The TEL serves the East Coast enclaves of Katong, Siglap, Marine Parade and Joo Chiat, and with the cross-border link may one day ease the jams at the Causeway and Second Link. As an artist I look forward to attractive artworks in its station lobbies, though commuters hardly have time to look. Marine Parade, nearest to the Peranakan heartland of Katong, should have works depicting Peranakan shophouses, my favourite subject, or Peranakan culture. This may just be wishful thinking.\n\nBusy as he is, he also chairs the Ayer Rajah Community Club Management Committee and sits on the board of MINDS, the Movement for the Intellectually Disabled of Singapore.',
  legacy: 'A beacon of excellence and a role model for the younger generation, he has kept Singapore’s trains, and its people, moving.',
  rooms: ['gamechangers'], frame: 'gold', order: 14, focusY: .38, image: 'assets/shahrin-abdol-salam.jpg',
  alt: 'Watercolour portrait of Shahrin Abdol Salam smiling broadly, with swept-back dark grey hair and rimless glasses, in a navy suit, white shirt and red tie against an orange wash',
  credit: 'Watercolour on paper, signed by the artist and inscribed “Berita Harian Anugerah Jauhari 2023”.'
});

const BAMADHAJ = P({
  id: 'bamadhaj-brothers',
  name: 'Bamadhaj Brothers, Arab Street',
  dates: 'Kampong Gelam',
  descriptor: 'Fine fabrics at No. 97',
  identity: 'The fabric shop of Yaacob Osman Bamadhaj at 97 Arab Street, one of Kampong Gelam’s traditional trades',
  period: 'A family business, passed from father to son',
  opening: 'Swiss voile, lace, chiffon, brocade, silk and velvet: for generations, the ladies came to Arab Street for the finest cloth.',
  story: [
    'Yaacob Osman Bamadhaj long ago inherited the business his late father started, retailing exquisite fabrics: Swiss voile (kasa rubiah), lace, chiffon, brocade, silk, velvet and fine cotton. It was among the traditional trades featured in a recent Kampong Gelam citizen engagement project by the URA and the National Heritage Board, in which trained volunteers interviewed traders and gathered the stories of crafts that have shaped the district’s cultural identity.',
    'The shop stands prominently on Arab Street. A few doors away, Basharahil Brothers specialises in fine Indonesian batik; next door, Toko Aljunied sells nyonya kebaya, batik cloth, shirts and even honey from Hadhramaut in Yemen. There must once have been many more Arab traders to give the street its name. With the Sindhi and a few Chinese cloth merchants, they serve Malaysian and Bruneian royalty, the families of datuks, affluent Indonesians, European tourists and locals.',
    'Older Singaporeans remember the ladies flocking to Kampong Jawa, as they called Kampong Gelam, for the best fabrics to make baju kebaya and baju kurung for Hari Raya, weddings and other celebrations.'
  ].join('\n\n'),
  moment: 'Today Kampong Gelam is gentrifying, with hipster joints, fusion food and lifestyle outlets. It is no longer the sleepy enclave after five but packed with crowds, especially at weekends, and soaring rents have forced some traditional traders out.',
  asideTitle: 'The Painter’s Note',
  aside: 'Yaacob was my student in Economics class 50 years ago.\n\nI lament the passing of the spice shop just across the road. It supplied Kampong Gelam’s kitchens with spices, condiments, cereals, grains and nuts, scooped from open gunny sacks, tins and tubs, and in one corner a Malay lady sold fresh herbs and bunga rampai, sliced pandan potpourri infused with rose water and scented with cempaka, kenanga and jasmine. Walking down this stretch of Arab Street you savoured attar, gaharu, spices and bunga rampai while the azan and Quranic recitation floated across from Sultan Mosque. You felt you were in a town in the Middle East. Let us hope the traditional trades not only survive but prosper, and keep giving Kampong Gelam its unique character.\n\nThe painting is in the possession of Yaacob Osman Bamadhaj.',
  legacy: 'Shops like this one are why Arab Street still feels like Arab Street.',
  rooms: ['monuments'], frame: 'wood', order: 8, focusX: .5, focusY: .55,
  alt: 'Watercolour of the Bamadhaj Brothers shophouse at 97 Arab Street: a pale-blue upper storey with tall windows under orange tiled roofs, and below, an open shopfront with a wooden signboard, stacks of folded fabric, racks of colourful cloth, two shop assistants with a customer in a yellow tudung, and a moustached man in a mustard shirt at the door',
  image: 'assets/bamadhaj-brothers.jpg',
  credit: 'Watercolour on paper, signed by the artist. Collection of Yaacob Osman Bamadhaj.'
});

const ALKAFF = P({
  id: 'alkaff-mansion',
  name: 'Alkaff Mansion',
  dates: 'Telok Blangah Green',
  descriptor: 'A hilltop mansion of 1918',
  identity: 'The European-style hilltop mansion built by the wealthy Arab Alkaff family on what was once Mount Washington',
  period: 'Built 1918',
  opening: 'At the end of a one-kilometre driveway up Mount Washington, a merchant family built a mansion to entertain the “crazy rich Asians” of its day.',
  story: [
    'Alkaff Mansion stands on a hill once known as Mount Washington, reached by a sloping driveway about a kilometre long from the end of Telok Blangah Green. It was part of a sprawling estate of the wealthy Arab Alkaff family, and was built around 1918 in a European style as a family home and a place to entertain their European and towkay friends, the “crazy rich Asians” of that era.',
    'As the Alkaffs’ fortunes dwindled after the Second World War, the mansion was abandoned and changed hands until the government acquired it, and it was later conserved.',
    'With its balustrades, stairways, canopies, expansive porches, gazebos, cosy outdoor corners and water features, all set in verdant greenery with views of Sentosa and the sea, it makes a natural venue for fine dining, weddings and other grand occasions. The Singapore Land Authority tenders it out periodically, and it has changed hands several times.'
  ].join('\n\n'),
  moment: 'Its latest tenants are UNA, a refined Spanish restaurant; Wildseed Café, in an informal outdoor setting on the ground floor; and the 1918 Heritage Bar, named for the year the mansion was built.',
  asideTitle: '',
  aside: '',
  legacy: 'A century on, the Alkaffs’ hilltop house is still a place where people gather to dine and celebrate.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 9,
  alt: 'Watercolour of Alkaff Mansion: a white two-storey building with a red-edged roof and a square clock tower, arched entrances up a short flight of steps, a tiered fountain on the left, and diners under ochre umbrellas on the terrace',
  image: 'assets/alkaff-mansion.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist.'
});

const KEBUN_BARU = P({
  id: 'kebun-baru-birdsinging',
  name: 'Kebun Baru Birdsinging Club',
  dates: 'Ang Mo Kio Town Garden West',
  descriptor: 'A pageant of songbirds',
  identity: 'The birdsinging arena of the Kebun Baru Birdsinging Club near Block 159 Ang Mo Kio Avenue 5, the largest of its kind in Singapore',
  period: 'Established 1987',
  opening: 'Twenty feet up, ornate cages sway in the breeze while the birds inside sing for their owners, and for the judges.',
  story: [
    'The Kebun Baru Birdsinging Club, at Ang Mo Kio Town Garden West near Block 159 Ang Mo Kio Avenue 5, has what is said to be the largest birdsinging arena in Southeast Asia, a forest of 20-foot poles that can hold more than a thousand cages. When the birds are gathered it is like a pageant: ornate cages swaying gently in the wind as the birds chirp and sing in a joyous cacophony.',
    'Zebra doves (merbuk), red-whiskered bulbuls, white-eyes (mata putih), white-rumped shamas, magpie robins, hwamei and skylarks fill the air with their repertoire, and a special corner displays parrots, macaws and cockatoos.',
    'On competition days a big crowd gathers. Judges with clipboards, heads tilted upwards, pace slowly between the rows of cages, scoring each bird on the volume, frequency and duration of its song, the beauty of its melody, its plumage and how lively it is. On other days, members bring their birds to train, daily or weekly, because the birds sing best in the company of their own kind. “It is like a singing school,” says the competition organiser, Robin Chua.'
  ].join('\n\n'),
  moment: 'Conservation ornithologist Jessica Lee of Wildlife Reserves Singapore notes that songbird keeping is a heritage that began centuries ago in Southeast Asia, and one that brings enthusiasts together. Most keep captive-bred birds, but wild songbirds are still caught and sold, and she works with conservationists to steer enthusiasts away from wild-caught birds, which some claim are easier to train. A small group concentrates on breeding and rearing, feeding their birds a regulated diet of vegetables, fruit and vitamin-enriched water. Scientists believe Southeast Asia’s songbirds evolved complex repertoires of calls to communicate in the thick tropical forest; those melodies have endeared them to keepers for generations.',
  asideTitle: 'The Painter’s Note',
  aside: 'This painting also accompanies Tim Clark’s piece on the “Black and White Minstrel”, the magpie robin, in Issue III of Passage, 2023, the magazine of the Friends of the Museums Singapore.',
  legacy: 'In a corner of Ang Mo Kio, a kampong pastime carries on, one song at a time.',
  rooms: ['beautiful'], frame: 'wood', orient: 'landscape', order: 4,
  alt: 'Watercolour of the Kebun Baru birdsinging ground: tall curved poles hung with ornate birdcages against a blue sky, men hoisting cages on cords, others holding cages aloft, and a family with children seated on the grass beside a cage',
  image: 'assets/kebun-baru-birdsinging.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist. Published in Passage, Issue III, 2023.'
});

const TANJONG_KATONG_I = P({
  id: 'tanjong-katong-i',
  name: 'Tanjong Katong, Truly My Kampong I',
  dates: 'Homeland, Maya Gallery, 2023',
  descriptor: 'Truly My Kampong I',
  identity: 'The first of the artist’s sepia memories of the old Tanjong Katong shore, where four generations of his family found their homes and their loves',
  period: 'Tanjong Katong, about 120 years ago',
  opening: 'Blue water, fair maidens, and a family story that begins on this beach.',
  story: [
    'Tanjong Katong’s blue waters and the fair maidens who lived by them are celebrated in “Di Tanjong Katong”, perhaps Singapore’s best-loved Malay folk song, composed by Ahmad Patek (Muhamad bin Ahmad), who died in 1943 at the age of 35.',
    'This was the scene when the artist’s late paternal grandfather, Kassim Mah, landed in Singapore about 120 years ago. He found his pretty maiden, Tik binte Agah, a Bugis, and they settled at Ipoh Lane, where the artist’s father was born. His father in turn found his pretty maiden at Rose Lane, where the artist was born, and the artist found his own, a girl who went to school in Tanjong Katong. Ipoh Lane and Rose Lane are both side roads off Tanjong Katong Road.',
    'His maternal grandfather, Samad Thamby, appears in the painting in his Austin 7, arriving at the beach of the serene coastal village to look for freshly landed fish.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'This painting, in watercolour with a sepia effect, was my submission for the Homeland exhibition by Maya Gallery at 57 Genting Lane, from 5 to 18 August 2023. Because of its nostalgic value, it hangs in my home.',
  legacy: 'Four generations, one stretch of coast: for this family, Tanjong Katong really is the kampong.',
  rooms: ['beautiful'], frame: 'wood', orient: 'landscape', order: 3, 
  alt: 'Sepia watercolour of the old Tanjong Katong shore: an attap-roofed kampong house on stilts beneath tall coconut palms, a vintage Austin 7 with registration S.3933 parked in front with two men inside, fishermen in conical hats unloading a sampan on the sand, and a long attap shed on stilts over the water',
  image: 'assets/tanjong-katong-i.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, 73 × 45 cm, sepia, signed by the artist. Exhibited at Homeland, Maya Gallery, August 2023. Collection of the artist.'
});

const HOSSAM = P({
  id: 'hossam-fahmy', name: 'Hossam Saeed Mohamed Fahmy', dates: 'From Alexandria to Singapore', descriptor: 'A new Singapore family',
  identity: 'Egyptian-born son-in-law of the artist’s frame maker, Abdul Latib, married to a Singaporean and raising their son here',
  period: 'A transnational marriage',
  opening: 'He met his wife online, courted her across continents, and came from Alexandria to marry her.',
  story: [
    'Hossam Saeed Mohamed Fahmy, from Alexandria in Egypt, is the son-in-law of the artist’s frame maker, Abdul Latib. He met his wife, Zariffah, online and, after a long courtship, came to Singapore to marry her. A graduate in Tourism and Hotel Management, he now works as a supervisor with Burger King, and the couple have a baby son, Zeyad Hossam Saeed.',
    'Transnational marriages, between a Singapore citizen and a non-citizen, made up 29 per cent of citizen marriages in 2021, a dip during the Covid years; in most years the share is more than a third. Most are between Singaporean men and foreign brides, but the number of Singaporean women marrying foreign grooms has grown markedly over the past two decades.',
    'In cosmopolitan Singapore, inter-ethnic and transnational marriages are both rising, as more foreigners come to work here and social media lets people meet across borders. The trend reaches every community, including the generally more conservative Malays.'
  ].join('\n\n'),
  moment: 'Ask any Malay, the artist says, and he can name at least ten such marriages among the daughters of friends, relatives, neighbours and colleagues. In his own circle alone there are husbands from France, England, Scotland, the Netherlands, the United States, New Zealand and Australia, grandchildren growing up from Kuala Lumpur to Scotland, and a former student now happily married in Denmark. He also knows of local men who have brought home wives from America and Morocco, and another Egyptian, a tenant at Eastern Lagoon, who is married to a local Malay woman.',
  asideTitle: 'The Painter’s Note',
  aside: 'The Malaysian preacher Ustaz Azhar Idrus once remarked that urban Malays come in many looks: Malays who look Chinese, Indian, Arab or Eurasian. With transnational marriages on the rise, the Malay diaspora here will surely show an even greater variety.',
  legacy: 'One family’s love story is part of a larger one: a Singapore whose faces, and families, keep growing more varied.',
  rooms: ['heroes'], frame: 'wood', order: 5, focusY: .4, image: 'assets/hossam-fahmy.jpg',
  alt: 'Watercolour portrait of Hossam Saeed Mohamed Fahmy smiling, with short curly dark hair and a trimmed beard, in a navy crew-neck top against an orange wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const TAHIRAH = P({
  id: 'tahirah-mohamed', name: 'Tahirah Mohamed', dates: 'Parent advocate', descriptor: 'Special needs & mental health parent advocate',
  identity: 'Mother of nine, seven of them with disability, and an advocate for special needs and mental health parents',
  period: 'A mother first, then an advocate',
  opening: 'Raising nine children, seven of them with disability, she chose to speak up for other parents too.',
  story: [
    'Tahirah Mohamed, the daughter of the artist’s cousin, is a mother of nine, seven of them with disability. Rather than limit herself to mentoring and guiding her own children, she has become an advocate for parents of children with special needs and for parents facing mental health challenges, sharing what she has learned so that other families do not walk the road alone.'
  ].join('\n\n'),
  moment: '',
  asideTitle: '',
  aside: '',
  legacy: 'From the hardest of journeys, she has made a path that other parents can follow.',
  rooms: ['heroes'], frame: 'wood', orient: 'landscape', order: 6, focusX: .5, focusY: .45, image: 'assets/tahirah-mohamed.jpg',
  alt: 'Watercolour portrait of Tahirah Mohamed in a grey tudung beside a young child with tousled dark hair in a blue and green batik top, against an orange wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const HAIDER = P({
  id: 'haider-sithawala', name: 'Haider Mohamedaly Sithawala', dates: 'Anugerah Sanjungan Budi 2022', descriptor: 'Businessman, diplomat & community builder',
  identity: 'Executive director of KSP Investments, former deputy chairman of Mendaki Holdings, long-time chairman of Mendaki’s Education Trust Fund, and former High Commissioner to Mauritius, Zimbabwe and Tanzania',
  period: 'Seventeen years at the helm of Mendaki’s Education Trust Fund',
  opening: 'For nearly two decades he steered a fund that put Malay/Muslim students through school.',
  story: [
    'On 1 October 2022, at Mendaki’s 40th anniversary celebration, Haider Mohamedaly Sithawala, then 89, was conferred the Anugerah Sanjungan Budi, Mendaki’s Distinguished Service Award.',
    'Executive director of KSP Investments, he was deputy chairman of Mendaki Holdings from 2003 to 2005 and chairman of Mendaki’s Education Trust Fund from 2002 to 2019. He also served Singapore as High Commissioner to Mauritius, Zimbabwe and Tanzania.',
    'Mendaki, the Council for the Development of the Malay/Muslim Community, was founded in 1982 as Singapore’s pioneer self-help group, set up to empower the community through excellence in education within a multiracial, multi-religious Singapore.'
  ].join('\n\n'),
  moment: 'At the anniversary event, Prime Minister Lee Hsien Loong said the community had made great progress but should now aim higher. He announced that the government would match, dollar for dollar up to $20 million, the funds Mendaki raised towards its $40 million plan to strengthen existing programmes and launch new ones.',
  asideTitle: '',
  aside: '',
  legacy: 'Behind many a Malay/Muslim graduate stands the quiet work of people like him, who gave decades to make education within reach.',
  rooms: ['gamechangers'], frame: 'gold', order: 15, focusY: .38, image: 'assets/haider-sithawala.jpg',
  alt: 'Watercolour portrait of Haider Mohamedaly Sithawala, smiling gently and looking upward, with swept-back grey hair and rectangular glasses, in a khaki shirt against a red, orange and yellow wash',
  credit: 'Watercolour on paper, signed by the artist and dated ’22.'
});

const HIDAYAH = P({
  id: 'hidayah-abdullah', name: 'Hidayah Abdullah', dates: 'Siti’s Flower Stall · Geylang Serai Market', descriptor: 'Jamu stall keeper',
  identity: 'Helping her sister-in-law Siti Norhuda Salleh, a fourth-generation jamu seller, at one of the two Malay herbal stalls in Geylang Serai Market',
  period: 'Four generations of jamu',
  opening: 'Ginger, turmeric, temu lawak and sireh: at this market stall, the herbal lore of the Malay world is still sold by the handful.',
  story: [
    'This is one of the two Malay jamu (herbal) stalls at Geylang Serai Market. Hidayah Abdullah helps her sister-in-law, Siti Norhuda Salleh, a fourth-generation jamu seller specialising in fresh rhizomes such as ginger and turmeric as well as processed herbal products. These herbs belong to the ethnobotany of the Nusantara: anyone with a health or beauty concern might visit a jamu seller, and in the Javanese countryside the jamu lady still peddles her wares from door to door.',
    'In Hidayah’s hands are sireh (betel) leaves, central to Malay ceremony. Two or three leaves are folded into a cone and filled with bunga rampai, a fragrant potpourri of finely sliced pandan leaves infused with rose water, shavings of kaffir lime rind and cananga, cempaka and jasmine flowers. At traditional Malay weddings these sireh rampai are arranged into a pyramid bouquet, the sireh dara, at one front corner of the bridal dais, with the bunga pahar, a cone of turmeric-yellow glutinous rice decked with red-dyed eggs, at the other. They are given to guests after the solemnisation, who carry home the lingering scent of the happy day.',
    'The stall’s fresh herbs include garlic, ginger, sand ginger, halia bara, kayu sepang, temu kunci, temu lawak, lempoyang, turmeric and akar sintok, nearly all labelled with their botanical names so that today’s customers can look up the research on them. Bottles of chilled fresh turmeric juice sell quickly. On the shelves are processed herbal products in powders and capsules, among them tongkat ali (Eurycoma longifolia), long valued in folk medicine and now also sold as an energy drink.'
  ].join('\n\n'),
  moment: 'The artist’s old friend Zainal Rahman, a science graduate and president of the Society of Malay Heritage Medicine, describes the many traditional uses of sireh: pounded with turmeric as a face mask for a glowing complexion, or warmed over a fire and laid on a colicky baby’s tummy. Chewing sireh with areca nut, lime and gambier was once a gesture of hospitality among Malays and Indians, though the habit has largely been abandoned for its harmful effects. For the Malays of Singapore and Malaysia, the spices of curries and biryanis and their own herbal cooking traditions share one idea: food is medicine and medicine is food.',
  asideTitle: 'The Painter’s Note',
  aside: 'With the advent of Western medicine, much traditional Malay medicine has been ignored or forgotten. In the 1950s my late grandmother would grind ginger, turmeric, garlic, cloves, cinnamon and more into a paste and simmer it in coconut oil for a whole day to make minyak urat, a herbal oil for wounds, swellings, sprains and massage. Sadly no one inherited her recipe. She also recommended lempoyang juice for children with poor appetite.\n\nI hope Zainal and his team will research and document the vast range of Malay herbal medicine so it can be preserved, and perhaps one day gain recognition as a complementary practice, as traditional Chinese medicine has in Singapore. This painting, with a version of this story, also appeared in Passage, the magazine of the Friends of the Museums Singapore, Issue IV, October 2022.',
  legacy: 'At a single market stall, four generations of knowledge about the plants of the Malay world are still being handed across the counter.',
  rooms: ['heroes'], frame: 'wood', order: 7, focusX: .5, focusY: .4, image: 'assets/hidayah-abdullah.jpg',
  alt: 'Watercolour of Hidayah Abdullah in a black tudung at Siti’s Flower Stall, holding sireh leaves, behind trays of labelled herbs and rhizomes, bottles of turmeric juice, bunga rampai and a weighing scale',
  credit: 'Watercolour on paper, signed by the artist and dated ’22. Published in Passage, Issue IV, October 2022.'
});

const PERANAKAN_HOUSE = P({
  id: 'peranakan-house',
  name: 'Peranakan House, Rumah Baba Fred',
  dates: 'SeniKita II, 2022',
  descriptor: 'Kebangkitan: Re-emergence',
  identity: 'The restored 1927 Peranakan terrace house of Baba Fred Lam, recreated inside and out in the authentic style of yesteryear',
  period: 'Built 1927, lovingly restored',
  opening: 'Behind the pintu pagar of this 1927 terrace house, a Baba has brought a whole culture back to life.',
  story: [
    'The re-emergence of Peranakan culture shows not only in the extensive renovation of this house, inside and out, to recreate the rich, authentic Peranakan décor of yesteryear, but also in the museum-like tours and talks that Baba Fred conducts for visitors, and in the sumptuous Peranakan food he cooks for family, friends and culture lovers.',
    'Baba Fred Lam, whose family hails from Batu Berendam in Melaka, spent more than $300,000 on the house, engaging craftsmen from Melaka and scouting for original materials and artefacts to bring his dream to life: the ornamented façade with its floral plasterwork and shuttered windows, the carved pintu pagar half-doors, the lanterns and the red door hanging.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'This painting was exhibited at SeniKita II, Kamal’s Gallery, Wisma Geylang Serai, from 18 November to 31 December 2022. The theme of the exhibition was Kebangkitan (Re-emergence).',
  legacy: 'One Baba’s labour of love has turned a terrace house into a living museum of Peranakan life.',
  rooms: ['peranakan'], frame: 'wood', order: 2, focusX: .5, focusY: .5,
  alt: 'Watercolour of Rumah Baba Fred, a 1927 Peranakan terrace house with an orange tiled roof, a pale-green ornamented upper storey with three shuttered windows and floral plaster panels, a signboard over carved gilded half-doors with a red door hanging, two lanterns, potted plants and a red picket fence',
  image: 'assets/peranakan-house.jpg',
  credit: 'Watercolour on paper, signed by the artist and dated ’22. Exhibited at SeniKita II, Kamal’s Gallery, Wisma Geylang Serai, 2022.'
});

const IBRAHIM_TAHIR = P({
  id: 'ibrahim-tahir', name: 'Ibrahim Tahir', dates: 'Wardah Books · Bussorah Street', descriptor: 'Bookseller',
  identity: 'Owner of Wardah Books at 58 Bussorah Street, Kampong Gelam, grandson of Singapore’s first Attorney-General, Dr Ahmad Ibrahim',
  period: 'Bookselling for two decades',
  opening: '“Books are still the gold standard when it comes to learning.”',
  story: [
    'Ibrahim Tahir owns Wardah Books at 58 Bussorah Street, in the heart of Kampong Gelam. He comes from a distinguished family: his grandfather was the late Dr Ahmad Ibrahim, Singapore’s first Attorney-General (1965–67), and his father is the veteran eye surgeon Dr S. M. Tahir.',
    'His bookshop, now two decades old, was recently renovated to welcome the Malay/Muslim readers who frequent it. Books on the Quran, hadith, Sharia, Islamic practice and Sufism predominate, but the neat shelves hold a wide range of other subjects, and a generous space is set aside for children. The shop combines a physical store with an online business, and runs a Silent Book Club, a traditional book club, Reading Aloud sessions for children and author events; the latest saw Khir Johari speak to a packed house about The Food of Singapore Malays.',
    'Books, Ibrahim insists, remain the gold standard for learning, while social media offers only short-term, emotional and less constructive engagement.'
  ].join('\n\n'),
  moment: 'Since the 1880s Kampong Gelam has been a literary centre for Singapore and Malaya, its presses producing manuscripts, newspapers, magazines and books in Rumi and Jawi. Sulaiman Mar’ie and his family printed the Quran and religious works for the Nusantara at 60 Bussorah Street, and Haji Muhammad Said Haji Arshad, from Semarang, published more than 200 Malay books between 1873 and 1918. The Ahmadiah Press, the Al-Latiffia Press, the Royal Press (later Malaysia Press), which printed the Sinar Baru and Chahaya Baru readers, HARMY, founded by Harun Aminurrashid and Raja Muhamad Yusoff to publish magazines such as Mutiara and Mastika, and Pustaka Nasional, still in business, all flourished nearby, and Yusof Ishak ran the Jawi newspaper Utusan Melayu on Queen Street. By the 1980s the trade had declined; even Toko Haji Hashim, the premier Malay bookshop on Arab Street, closed in the 1970s.',
  asideTitle: 'The Painter’s Note',
  aside: 'Ibrahim remembers me as his teacher at Temasek Secondary School. On my visit the shop was busy, and my pick, Islamonomics, was the last copy on the shelf. I would suggest he also stock current and popular Singapore titles to draw a wider circle of readers. Madrasah Aljunied and Madrasah Alsagoff, whose students are trilingual in Malay, Arabic and English, have long benefited from the booksellers and publishers of this quarter. Wardah Books reminds us of the rich literary heritage for which Kampong Gelam is known.',
  legacy: 'On a street once lined with presses, his shop keeps Kampong Gelam’s literary flame alight.',
  rooms: ['gamechangers'], frame: 'gold', order: 16, focusY: .38, image: 'assets/ibrahim-tahir.jpg',
  alt: 'Watercolour portrait of Ibrahim Tahir grinning broadly, with tousled dark hair and round wire-rimmed glasses, in a light-blue shirt against an orange wash',
  credit: 'Watercolour on paper, signed by the artist and dated ’22.'
});

const MALIK = P({
  id: 'abdul-malik-hassan', name: 'Dr Abdul Malik Hassan', dates: 'Selera Rasa · Crave', descriptor: 'Singapore’s Nasi Lemak King',
  identity: 'Third-generation steward of Selera Rasa Nasi Lemak at Adam Road and founder of the Crave nasi lemak chain; nominee, Singaporean of the Year 2021',
  period: 'Selera Rasa since 1998',
  opening: '“If you are going to be a pilot, who is going to pilot my stall?”',
  story: [
    'As a boy in Jalan Sempadan, Siglap, Abdul Malik Hassan peddled his mother’s goreng pisang from a basket on his arm, calling out in a lilting sing-song through the neighbouring villages, sometimes with his family’s nasi lemak, packed tight in pyramids of banana leaf. In the kampong days the best nasi lemak was made by mothers with fresh santan, chilli pounded on the batu giling and sambal simmered for hours over charcoal, and the scent of coconut and pandan rice drifted through the village.',
    'His late father, Haji Hassan Abdul Kadir, took such packets to his colleagues at the Grand Hyatt hotel, owned by the Brunei Investment Agency. The Sultan of Brunei tasted one and urged him to sell it, and in 1998 Haji Hassan and his wife opened Selera Rasa at Adam Road Food Centre. The Sultan still has it brought to him whenever he is in Singapore; the stall won The Straits Times Readers’ Choice award in 2008, and in November 2014 Prime Minister Lee Hsien Loong served it to Indonesian President Joko Widodo for breakfast.',
    'Growing up under the planes of the eastern sky, Malik dreamed of flying. He earned an Industrial Technician Certificate, a Singapore Polytechnic diploma in mechanical engineering and a degree from Nanyang Technological University, and passed his first SIA pilot interview. But his father asked who would pilot the stall, and Malik could not bear to disappoint him.'
  ].join('\n\n'),
  moment: 'Taking over, he led his siblings in streamlining and mechanising the processes and refining the family recipe, served on fluffy basmati rice, with a hint, some say, of the finesse of his half-Japanese grandmother. In 2015 he and a partner set up a central kitchen and launched Crave, which grew to some 45 outlets across Singapore, often paired with Pezzo Pizza and Stuff’d. With a doctorate in business, he now mentors small businesses on manpower and financing, and is a partner in the Kaaakis food concept and the Kiosks Collective, where brand owners keep their recipes and share in the returns.',
  asideTitle: 'The Painter’s Note',
  aside: 'When I asked Malik whether he would give extra sambal tumis, he said he was happy to oblige on the first and second requests, but would charge 50 cents for the next. That’s fair, since some aficionados like to drown their rice in it. I know of one seller in Katong who will sell you a whole kilo of sambal when you ask for more!',
  legacy: 'From a kampong boy’s basket to dozens of outlets across the island, he has carried his mother’s nasi lemak to all of Singapore.',
  rooms: ['gamechangers'], frame: 'gold', order: 17, focusY: .38, image: 'assets/abdul-malik-hassan.jpg',
  alt: 'Watercolour portrait of Dr Abdul Malik Hassan smiling, with a dark side-parted quiff, in a royal-blue T-shirt against a peach wash',
  credit: 'Watercolour on paper, signed by the artist and dated ’22, inscribed “Singapore’s Nasi Lemak King”.'
});

const BABA_FRED = P({
  id: 'baba-fred-lam', name: 'Baba Fred Lam', dates: 'Rumah Baba Fred', descriptor: 'Champion of Peranakan heritage',
  identity: 'Peranakan heritage champion whose restored terrace house, Rumah Baba Fred, is a living museum of Peranakan life',
  period: 'Roots in Batu Berendam, Melaka',
  opening: 'He spent $300,000 so that visitors could step straight into a Peranakan home of a century ago.',
  story: [
    'Baba Fred Lam is a champion of Peranakan heritage who traces his ancestry to his family in Batu Berendam, Melaka. His terrace house, refurbished at a cost of some $300,000, is a veritable museum of Peranakan living, fully furnished with Peranakan furniture, artefacts, antiques, porcelain and décor that recall the heyday of the 19th and 20th centuries. For authenticity he brought in skilled craftsmen from Melaka to restore the interior and sourced floor tiles as close to the originals as he could find.',
    'Visitors hear his talk on Peranakan history, culture and beliefs, then tour the house and its world. Afterwards they may stay for a meal cooked and hosted by Baba Fred himself at the tok panjang in the dining room: quintessential Nyonya dishes such as ayam buah keluak, bakwan kepiting and babi pongteh, followed by desserts like pulot hitam.'
  ].join('\n\n'),
  moment: 'The house is easy to spot: a metre or so from the pintu pagar stands a small British-red pillar box, a souvenir from London, which serves as his letter box.',
  asideTitle: 'The Painter’s Note',
  aside: 'As I sat on an antique rosewood chair inlaid with mother-of-pearl, I gazed at the airwell and the open courtyard at the rear, where Baba Fred has his kitchen. It is commendable that he has kept the beautiful spiral staircase against the rear wall. His house also hangs in this gallery, in the Peranakan Houses room.',
  legacy: 'Through his home, his table and his stories, he keeps the Peranakan world alive for anyone who walks through his door.',
  rooms: ['gamechangers'], frame: 'gold', order: 18, focusY: .38, image: 'assets/baba-fred-lam.jpg',
  alt: 'Watercolour portrait of Baba Fred Lam smiling, with slicked-back greying hair and tortoiseshell glasses, in an ornate gold, brown and green batik shirt against a sky-blue wash',
  credit: 'Watercolour on paper, signed by the artist and dated ’22.'
});

const JIA_LI = P({
  id: 'jia-li-koon-seng',
  name: 'Jia Li, Koon Seng Road',
  dates: 'APAD Annual Exhibition, 2026',
  descriptor: 'Abode of Peace',
  identity: 'A Peranakan terrace house on Koon Seng Road belonging to the artist’s old friend, a retired Malay district judge',
  period: 'Koon Seng Road, Joo Chiat',
  opening: 'A Chinese name that echoes a Malay father’s, and a blessing in Arabic and Mandarin on the gate.',
  story: [
    'This is another Koon Seng Road Peranakan terrace house, which the artist has painted before in a different colour scheme. It belongs to his old friend, a retired Malay district judge.',
    'The signboard above the door reads Jia Li, the Chinese name nearest in sound to Jalil, the name of the owner’s father. On the gate hangs a smaller sign in Arabic meaning Abode of Peace, with its Mandarin equivalent beneath: one house, three scripts, and a Peranakan façade of fluted pilasters, shuttered windows, coloured fanlights and floral tiles.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'This painting is my entry for the APAD annual exhibition at Telok Studios, from 18 to 30 October 2026.',
  legacy: 'On a street of Peranakan houses, one home speaks Malay, Chinese and Arabic at once, a small portrait of Singapore itself.',
  rooms: ['peranakan'], frame: 'wood', order: 1, focusX: .5, focusY: .5,
  alt: 'Watercolour of a Peranakan terrace house on Koon Seng Road: a cream façade with fluted pilasters, red shuttered windows under coloured glass fanlights and bands of green and yellow floral tiles, a black signboard with the Chinese characters Jia Li, an ornate white iron gate with a small red sign in Arabic and Chinese, potted bougainvillea, and a woman in a yellow kebaya and sarong standing at the gate',
  image: 'assets/jia-li-koon-seng.jpg',
  credit: 'Watercolour on paper, signed by the artist. APAD annual exhibition, Telok Studios, October 2026.'
});

const KOON_SENG_10 = P({
  id: '10-koon-seng-road',
  name: '10 Koon Seng Road',
  dates: 'Kontemporari 2017',
  descriptor: 'A week of painstaking detail',
  identity: 'No. 10 Koon Seng Road, one of the celebrated Peranakan terrace houses of Joo Chiat',
  period: 'Painted 2017',
  opening: 'Every pilaster, plaster swag and shutter slat, rendered in watercolour over a full week.',
  story: [
    'Another Peranakan house: No. 10 Koon Seng Road, with its fluted pilasters, ornamental plaster garlands, pale-green shuttered windows and decorated fascia boards, behind a pastel gate flanked by bougainvillea.',
    'Measuring 75 × 56 cm, the painting was exhibited at APAD’s Kontemporari 2017 exhibition at ION Art Gallery, ION Orchard, from 22 December 2017 to 1 January 2018.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'It took me one painstaking week to complete. That is why very few watercolourists would want to paint it in such great detail.',
  legacy: 'Patience made visible: a façade built by craftsmen a century ago, rebuilt stroke by stroke on paper.',
  rooms: ['peranakan'], frame: 'wood', order: 3, focusX: .5, focusY: .5,
  alt: 'Watercolour of 10 Koon Seng Road: a Peranakan terrace house with an orange tiled roof and patterned fascia, a pale-green façade with fluted pilasters, plaster garlands and three shuttered windows, and a light-blue gate with pillars flanked by orange bougainvillea',
  image: 'assets/10-koon-seng-road.jpg',
  credit: 'Watercolour on paper, 75 × 56 cm, signed by the artist and dated 2017. Exhibited at APAD Kontemporari 2017, ION Art Gallery.'
});

const PERANAKAN_PINK = P({
  id: 'peranakan-house-pink',
  name: 'Peranakan House in Pink',
  dates: 'Singapore Watercolour Society, 2017',
  descriptor: 'A friendship found again',
  identity: 'A pink Peranakan terrace house with green shutters and a lattice gate, painted for the Singapore Watercolour Society’s 48th Annual Exhibition',
  period: 'Painted 2017',
  opening: 'Finished just in time for the exhibition, and bought by a schoolfriend the artist had not seen in sixty years.',
  story: [
    'This painting of a Peranakan house was completed just in time for the Singapore Watercolour Society’s 48th Annual Exhibition, held from 6 to 10 October 2017 at the Ngee Ann Cultural Centre, 97 Tank Road. At 76 × 56 cm, it is large enough to show the house’s elaborate details: green shutters under coloured fanlights, bands of floral tiles, fluted pilasters and a lime-green lattice gate.'
  ].join('\n\n'),
  moment: '',
  asideTitle: 'The Painter’s Note',
  aside: 'The painting was acquired by Shabbir Hassanbhai, a primary school friend whom I had not met for 60 years, rediscovered. He also bought two other paintings of Peranakan houses.',
  legacy: 'A painting that brought two old classmates back together after six decades.',
  rooms: ['peranakan'], frame: 'wood', order: 4, focusX: .5, focusY: .5,
  alt: 'Watercolour of a pink Peranakan terrace house with an orange tiled roof, green shutters under coloured glass fanlights, bands of floral tiles, fluted pilasters and a lime-green lattice gate, between a blue house and a teal house',
  image: 'assets/peranakan-house-pink.jpg',
  credit: 'Watercolour on paper, 76 × 56 cm, signed by the artist. Exhibited at the Singapore Watercolour Society 48th Annual Exhibition, 2017. Collection of Shabbir Hassanbhai.'
});

const WALID = P({
  id: 'walid-jumblatt-abdullah', name: 'Dr Walid Jumblatt Abdullah', dates: 'Teh Tarik with Walid', descriptor: 'Political scientist & podcaster',
  identity: 'Academic at Nanyang Technological University’s School of Social Sciences and host of the podcast Teh Tarik with Walid',
  period: 'Podcasting since 2020',
  opening: 'Singapore politics, explained over a cup of teh tarik.',
  story: [
    'Dr Walid Jumblatt Abdullah is a political scientist whose research covers state–Islam relations and political parties and elections, with a particular focus on Singapore and Malaysia.',
    'Since 2020 he has hosted Teh Tarik with Walid, billed as “Singapore politics for beginners”, a podcast of candid conversations with academics, politicians across the spectrum, writers and ordinary Singaporeans, now running to well over a hundred episodes.'
  ].join('\n\n'),
  moment: '',
  asideTitle: '',
  aside: '',
  legacy: 'By making politics conversational, he has opened up Singapore’s public debate to a new generation of listeners.',
  rooms: ['gamechangers'], frame: 'gold', order: 19, focusY: .38, image: 'assets/walid-jumblatt-abdullah.jpg',
  alt: 'Watercolour portrait of Dr Walid Jumblatt Abdullah looking straight out, mid-speech, with swept-back black hair, in a pale lavender shirt against an ochre wash; inscribed “Teh Tarik with Walid”',
  credit: 'Watercolour on paper, signed by the artist and inscribed “Teh Tarik with Walid”.'
});

const ENRIQUE = P({
  id: 'enrique-of-malacca', name: 'Enrique the Malaccan', dates: 'Magellan’s voyage, 1519–1521', descriptor: 'Interpreter & voyager',
  identity: 'The Malay interpreter, known as Enrique of Malacca, who sailed with Ferdinand Magellan and is often called the first person to circle the globe',
  period: 'Sixteenth century',
  opening: 'When Magellan’s ships reached the islands of the East, the man who spoke for them was a Malay from Melaka.',
  story: [
    'Enrique, as the Portuguese baptised him, was taken from the Malay world by Ferdinand Magellan after the Portuguese conquest of Melaka in 1511. He served Magellan as servant and interpreter, travelled with him to Portugal and Spain, and in 1519 sailed with him again on the Spanish expedition westward across the Atlantic and the Pacific.',
    'In 1521, when the fleet reached the islands of the present-day Philippines, Enrique found that the local people understood his Malay. Because he had already reached the region from the west before travelling east to Europe, many have argued that he, rather than any European, was the first person to come full circle around the world.',
    'After Magellan was killed at Mactan in April 1521, Enrique left the expedition at Cebu, and history loses sight of him.'
  ].join('\n\n'),
  moment: 'His story has fired the Malay imagination. The writer Harun Aminurrashid reimagined him as the Malay seaman Panglima Awang in his celebrated historical novel of the same name.',
  asideTitle: '',
  aside: '',
  legacy: 'A man of the Malay world whose voyage closed the circle around the globe, long before the history books gave him his due.',
  rooms: ['pioneers'], frame: 'gold', orient: 'landscape', order: 0, focusX: .5, focusY: .45, image: 'assets/enrique-of-malacca.jpg',
  alt: 'Watercolour of Enrique the Malaccan, with long dark hair and a moustache, in a green headcloth and teal baju, fist clenched at his chest, beside a sixteenth-century carrack under full sail on a choppy sea at dusk',
  credit: 'Watercolour on paper, signed by the artist and dated 2019.'
});

const ADNAN = P({
  id: 'adnan-saidi', name: 'Lieutenant Adnan Saidi', dates: '1915 – 1942', descriptor: 'Hero of Bukit Chandu',
  identity: 'Officer of the 1st Battalion, Malay Regiment, who led the defence of Pasir Panjang Ridge in the last days of the Battle of Singapore',
  period: 'Battle of Pasir Panjang, February 1942',
  opening: 'Outnumbered on Bukit Chandu, he told his men to fight to the last.',
  story: [
    'Adnan bin Saidi was born in 1915 in Kajang, Selangor. A trainee teacher who chose a soldier’s life, he joined the Malay Regiment in 1933, stood out as a recruit and rose quickly through the ranks to be commissioned as a second lieutenant.',
    'In February 1942, as the Japanese army closed in on Singapore, Adnan commanded C Company of the 1st Battalion, Malay Regiment, holding Pasir Panjang Ridge at Bukit Chandu, Opium Hill. Heavily outnumbered and running short of ammunition, he and his men held their ground for two days, fighting hand to hand when the bullets ran out, and famously saw through an enemy attempt to approach disguised as Punjabi soldiers.',
    'When the position finally fell on 14 February 1942, Adnan, wounded, was captured and killed by the Japanese. Singapore surrendered the following day.'
  ].join('\n\n'),
  moment: 'His courage made the Battle of Pasir Panjang one of the most celebrated stands of the Malayan Campaign. The former colonial bungalow near the battle site is now Reflections at Bukit Chandu, a museum that tells the story of the Malay Regiment and its last stand.',
  asideTitle: '',
  aside: '',
  legacy: 'He is remembered in Singapore and Malaysia alike as a symbol of loyalty and courage, a young officer who gave everything in the defence of the island.',
  rooms: ['pioneers'], frame: 'gold', order: 1, focusY: .35, image: 'assets/adnan-saidi.jpg',
  alt: 'Watercolour portrait of Lieutenant Adnan Saidi in a black songkok-style cap with a gold badge and red band, chin strap, khaki uniform with gold collar badges, a red sash and a medal, against an orange wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const P_RAMLEE = P({
  id: 'p-ramlee', name: 'P. Ramlee', dates: '1929 – 1973', descriptor: 'Icon of Malay film and music',
  identity: 'Actor, singer, musician, composer, comedian and film director, born Teuku Zakaria bin Teuku Nyak Puteh in Penang',
  period: 'Jalan Ampas, 1948 – 1964',
  opening: 'From a studio on Jalan Ampas, he gave the Malay world its laughter, its songs and its conscience.',
  story: [
    'P. Ramlee was born Teuku Zakaria bin Teuku Nyak Puteh on 22 March 1929 in Penang. He made his acting debut in Singapore in 1948 and went on to star in or work on 66 films and compose hundreds of songs. He is loved for comedies such as the Bujang Lapok series, Do Re Mi, Tiga Abdul and Nujum Pak Belalang, while his serious films took on the social issues of the day: Ibu Mertua-ku, Penarek Becha, Antara Dua Darjat, Anakku Sazali and Sergeant Hassan among them. Many won awards at regional film festivals.',
    'His success owed much to Shaw Brothers’ Malay Film Productions studio at Jalan Ampas, a trailblazer that brought in directors from India, Hong Kong and Indonesia and kept a reliable technical crew and a corps of composers, musicians and choreographers. Jalan Ampas was the mecca of Malay filmmaking, nurturing talents from across the Malay world, from Maria Menado, Normadiah and Shariff Medan of Indonesia to Sarimah of Pahang and Dollah Sarawak. Its rival was Cathay-Keris on East Coast Road.',
    'In 1964 he moved to Merdeka Film Studio in Kuala Lumpur. Without the support he had known at Jalan Ampas, his later films did not find the success he hoped for; recognition faded, and he died in disappointment on 29 May 1973, aged 44.'
  ].join('\n\n'),
  moment: 'His death stirred remorse in the industry and the public alike that he had not been given his due. He was honoured posthumously, finally with the title Tan Sri, and roads, schools and cultural centres were named after him, while his homes in Kuala Lumpur and Penang became memorials. Malay film has advanced by leaps and bounds since, but no one quite like P. Ramlee has emerged.',
  asideTitle: 'The Painter’s Note',
  aside: 'Al-Fatihah to the late P. Ramlee. Ustaz Badlishah of Malaysia has noted that the Sultan Mosque in Singapore includes the name Ramli bin Puteh, P. Ramlee, among those remembered with the Al-Fatihah in its weekly Friday prayers. May his soul rest in peace.',
  legacy: 'Half a century on, his songs are still sung and his films still watched across the Malay world.',
  rooms: ['pioneers'], frame: 'gold', order: 2, focusY: .38, image: 'assets/p-ramlee.jpg',
  alt: 'Watercolour portrait of P. Ramlee smiling and glancing sideways, with curly black hair and a thin moustache, in a dark suit, white shirt and red tie against a turquoise wash',
  credit: 'Watercolour on paper, signed by the artist.'
});

const FANDI = P({
  id: 'fandi-ahmad', name: 'Fandi Ahmad', dates: '101 caps · 55 goals', descriptor: 'Singapore’s football legend',
  identity: 'Singapore’s football icon: national captain, Malaysia Cup champion, the first Singaporean to play professionally in Europe, and coach',
  period: 'Playing and coaching since the 1970s',
  opening: 'A kampong boy who scored past Boca Juniors and played in the Dutch league, and stayed humble through it all.',
  story: [
    'The son of Ahmad Wartam, Singapore’s goalkeeper of the 1950s, Fandi Ahmad first made his name in a formidable midfield partnership with his good friend Malek Awab. He played for the national youth team that won the Lion City Cup in 1976 and 1977 and joined the Singapore FA in 1979, moving from midfield to striker. In the 1980 Malaysia Cup he scored eight goals, including the winner in the final against Selangor, and was named FAS Footballer of the Year in 1981. In 1982, guesting for Selangor, he scored against Maradona’s Boca Juniors in a 2–1 defeat.',
    'In 1983, having turned down Ajax two years earlier, he signed for FC Groningen in the Netherlands, scoring 10 goals in 29 games in his first season as the club climbed from ninth to fifth. Back in the region he won the Malaysia Cup with Kuala Lumpur in 1987, 1988 and 1989, the Malaysia Cup and league with Pahang in 1992, and, back with Singapore, the Malaysia Cup and league double in 1994, the year he received the Pingat Bakti Masyarakat. When Singapore launched its own professional league in 1996 he captained Geylang United to the title as top scorer, and he finished his playing days at SAFFC. He won 101 caps and scored 55 goals for Singapore.',
    'As a coach he was Coach of the Year in 2000 with SAFFC, assistant to Radojko Avramović when Singapore won the 2004 Tiger Cup, and later managed Pelita Jaya in Indonesia and Johor Darul Ta’zim, and led LionsXII to the Malaysia FA Cup in 2015.'
  ].join('\n\n'),
  moment: 'In 2011 he founded the Fandi Ahmad Academy to groom young players, and more recently the Fandi Rules four-a-side street football competition for under-10s and under-12s. Football runs in the family: his sons Irfan, Ikhsan and Ilhan have all played professionally, while his daughter Iman has pursued singing and modelling like her mother, Wendy Jacobs. His 60th birthday in 2022 was marked by a second biography, Honour and Sacrifice by Durga Poonambalan, after Wilfred Yeo’s The Fandi Ahmad Story of 1993.',
  asideTitle: 'The Painter’s Note',
  aside: 'For all he has achieved, Fandi remains the humble, unassuming, down-to-earth man he was in the kampong days.',
  legacy: 'No Singaporean footballer has meant more to the nation, on the pitch or on the touchline.',
  rooms: ['gamechangers'], frame: 'gold', order: 23, focusY: .38, image: 'assets/fandi-ahmad.jpg',
  alt: 'Watercolour portrait of Fandi Ahmad laughing, with short dark hair, in a royal-blue collared shirt against an orange and red wash',
  credit: 'Watercolour on paper, signed by the artist and dated ’22.'
});

const BLUE_KAMPONG = P({
  id: 'blue-kampong-house',
  name: 'The Blue Kampong House',
  dates: 'Still Road',
  descriptor: 'Imagined in its heyday',
  identity: 'A Malay kampong bungalow on concrete stilts at Still Road, painted as it might have looked in its prime',
  period: 'Awaiting restoration',
  opening: 'Behind a gaping hole in a caving roof, the artist saw a house full of light and colour.',
  story: [
    'This Malay kampong house at Still Road stands obscured from view, dilapidated and almost collapsing, a gaping hole in its caving roof the first thing passers-by notice. The artist painted it as he imagined it in its heyday, full of flamboyance, with the evening sun pouring through the stained glass of the upper façade and lighting the verandah and living room with a brilliant glow. The abundant glass reflected the owners’ trade: they were successful glass dealers and picture-frame makers.',
    'The flared concrete staircase, with its balustrades and embellishments, lends an air of opulence reminiscent of the bungalows of the wealthy in colonial times, and the blue-and-white diamond tracery of the full-length windows is unlike any other. In the past, only the affluent could build a tropical bungalow like this, raised on concrete stilts beneath a clay-tiled roof.',
    'Sadly, an inheritance dispute left the house abandoned, crumbling and uninhabitable for nearly fifteen years.'
  ].join('\n\n'),
  moment: 'The artist’s good friend at the mosque in Telok Kurau, Haji Ibrahim Osman, who lives back to back with the house, says his in-laws’ family has now resolved the question of ownership. The family also own four other houses along the same stretch, two terraced and two modest kampong houses, all kept in fine condition. It would be easy to demolish the old bungalow and build anew, but the family seem keen to repair and renovate it and restore it to its former grandeur.',
  asideTitle: '',
  aside: '',
  legacy: 'A house that waited fifteen years may yet glow again, just as the painting imagines it.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 10,
  alt: 'Watercolour of a Malay kampong bungalow on white concrete stilts with an orange clay-tiled roof, blue-and-white diamond-patterned full-length windows, a band of blue and turquoise stained glass, a pink door, coloured hanging lights on the verandah and a flared blue-and-white balustraded staircase, with trees and a block of flats behind',
  image: 'assets/blue-kampong-house.jpg', focusX: .5, focusY: .55,
  credit: 'Watercolour on paper, signed by the artist.'
});

const MURTABAK = P({
  id: 'murtabak-rivalry',
  name: 'The Great Murtabak Rivalry',
  dates: 'Arab Street & North Bridge Road',
  descriptor: 'Zam Zam and Victory',
  identity: 'The neighbouring Indian Muslim restaurants Singapore Zam Zam and Victory at the corner of Arab Street and North Bridge Road, Kampong Gelam',
  period: 'Kampong Gelam today',
  opening: 'Two restaurants, one corner, and a friendly war fought one murtabak at a time.',
  story: [
    'At this prominent corner of Arab Street and North Bridge Road, the focus is the great murtabak rivalry between two Indian Muslim restaurants. Besides the usual nasi biryani, roti prata, fried noodles and rice, mutton chop and fusion dishes, all eyes are on how each tries to outdo the other in enticing customers to buy or dine on murtabak.',
    'The scene is like a competing drive-in. Staff beckon to drivers as well as to pedestrians on the walkway, despite signs prohibiting touting in Kampong Gelam, while traffic cameras on the nearest lamp post wait to catch motorists who stop to order.',
    'Murtabak is a paper-thin pancake stuffed with spiced minced meat (mutton, chicken, even venison), sliced onions and beaten egg, then fried on a griddle. Behind glass at the shopfront, the cooks hurl and flip the dough in the air until it is paper-thin before laying it down and adding the filling, a spectacle in itself.'
  ].join('\n\n'),
  moment: 'This is the murtabak Singapore is known for, and Malaysian visitors make a point of taking some home. To Indonesians, though, martabak usually means martabak manis, a thick, fluffy pancake cooked in a mould, sprinkled with crushed peanuts and sugar (today also chocolate, kaya or banana) and folded in half. Singaporeans and Malaysians call that apam balik.',
  asideTitle: '',
  aside: '',
  legacy: 'Two shophouse restaurants, side by side for generations, keep one of Kampong Gelam’s liveliest street scenes going every evening.',
  rooms: ['monuments'], frame: 'wood', orient: 'landscape', order: 11,
  alt: 'Watercolour of two pairs of shophouses at the corner of Arab Street and North Bridge Road: the green Singapore Zam Zam Restaurant and the white Victory Restaurant with teal awnings, diners at tables, staff in yellow shirts waving at passing cars, a blue van and a yellow taxi, and a red SG60 banner on a lamp post',
  image: 'assets/murtabak-rivalry.jpg', focusX: .5, focusY: .5,
  credit: 'Watercolour on paper, signed by the artist.'
});

const ONG_KIM_SENG = P({
  id: 'ong-kim-seng', name: 'Ong Kim Seng', dates: 'b. 1945 · Cultural Medallion 1990', descriptor: 'Singapore’s master watercolourist',
  identity: 'Self-taught watercolourist, Cultural Medallion recipient and the most internationally decorated painter of Singapore watercolour',
  period: 'Painting since the 1960s',
  opening: 'The son of a washerwoman from Tiong Bahru became the most decorated watercolourist Singapore has produced.',
  story: [
    'Ong Kim Seng was born in Singapore on 10 June 1945 and grew up in Tiong Bahru, the only son of a washerwoman and single mother. Largely self-taught, he sold his first painting in 1962 for $120 and went on to become one of Singapore’s best-loved artists. His streets, shophouses and heartlands, and the mountain villages of Nepal and the landscapes of Bali, are rendered in a naturalist, impressionistic style celebrated for its mastery of light and shade.',
    'International recognition came early. In 1983 he won the Paul B. Remmy Memorial Award from the American Watercolor Society, the first of many AWS honours, and in 1990 he became the society’s first Asian member. That same year he received Singapore’s Cultural Medallion for the visual arts. In 2000 the AWS named him a Dolphin Fellow for winning its awards more than five times; he remains the only Dolphin Fellow from outside the United States, and the only Singaporean to win nine AWS awards.',
    'At home he led the Singapore Watercolour Society as president from 1991 to 2001 and is now its honorary president. In 1993 his painting Bhaktapur became the first Singapore watercolour sold by Sotheby’s, and his works are in collections around the world, including that of Queen Elizabeth II.'
  ].join('\n\n'),
  moment: 'He counts among his friends and contemporaries the international masters of watercolour: John Salminen, Joseph Zbukvic, Thomas Schaller, Alvaro Castagnet, Atanur Doğan, Liu Yi, Stanisław Żółądź and others.',
  asideTitle: 'The Painter’s Note',
  aside: 'It is a privilege to have been given the chance to paint the portrait of Singapore’s most prominent watercolourist, an artist who has won more international accolades than any other.',
  legacy: 'Through his brush, generations have learned to see Singapore, and the wider world, in light and water.',
  rooms: ['pioneers'], frame: 'gold', order: 3, focusY: .38, image: 'assets/ong-kim-seng.jpg',
  alt: 'Watercolour portrait of Ong Kim Seng, smiling slightly, with swept dark hair, in a navy blazer, white shirt and patterned burgundy tie against a soft yellow, peach and pink wash',
  credit: 'Watercolour on paper, signed by the artist and dated 2011.'
});

const HJ_LATIFF = P({
  id: 'abdul-latiff-kassim', name: 'Haji Abdul Latiff bin Haji Kassim', dates: '1912 – 2018', descriptor: 'The painter’s father',
  identity: 'The artist’s father, a gentle kampong farmer, packer, gardener and mosque volunteer who lived to the age of 106',
  period: 'Tanjong Katong · Kampong Ubi · Al-Ansar Mosque',
  opening: 'He never raised his voice, and he spent a lifetime making things grow.',
  story: [
    'Haji Abdul Latiff bin Haji Kassim was the third son of Haji Kassim Mah, from Yunnan, and Tik binte Agah, a Bugis woman, and grew up in Tanjong Katong. During the Japanese Occupation he joined the Javanese farmers brought in to plant tapioca, each on an allotted acre of the Malay Farm, later renamed Kampong Ubi, where Block 29 Eunos Crescent stands today. Rice was scarce and people survived on tapioca; being reserved, he never spoke of it, but his wife later revealed that he gave tapioca away to the many hungry people who came to the farm. He rose at 4.30 every morning, bathed with water from the well, and after the dawn prayer began planting tapioca and vegetables.',
    'In 1950 a kampong house replaced the old farmhouse. The road in front, later Jalan Penggaga, ran on the raised bed of a railway that once carried earth from the hills of Kampong Batak to reclaim land for Kallang Airport, and beneath it flowed a clear stream full of sepat, haruan, keli, freshwater snails and eels. The artist spent his childhood frolicking on the farm and wading in the parit. After the war, settlers came, the farms gave way and the stream grew polluted, yet the kampong stayed serene, with its own charms and its own ghost stories, until it was cleared for redevelopment in 1975.',
    'In the year the artist was born, his father found work as a packer at Whiteaway Laidlaw, the British department store at Raffles Place, a modest job because the war had cut short his education. Retrenched sixteen years later in the lean early 1960s, the family survived on the foresight of his wife, who had kept one lot of the old farmland: he engaged two Javanese carpenters to build a row of four wooden terrace houses to rent out, and the meagre rent sustained a family of five children. He went on to work as a gardener at the Magnolia factory in Bukit Timah, riding there on a 50cc Honda Cub, and in his seventies as a cleaner at Changi Airport for some ten years.'
  ].join('\n\n'),
  moment: 'Then he became a volunteer gardener at the old Al-Ansar Mosque, and over 25 years he happily toiled to turn its grounds into a garden, planting a long hedge of cananga whose fragrance mosque-goers enjoyed as they rested on the concrete ledge beside it. He read the Quran and the Berita Harian every day to the end. He passed away on 29 November 2018 at the age of 106. The next day his remains were brought to Al-Ansar so that the large Friday congregation could offer funeral prayers for him, the mosque’s way of thanking him; the old folks say that one buried on a Friday will have a bright and spacious grave.',
  asideTitle: 'The Painter’s Note',
  aside: 'As a father he never raised his voice at us. At most he would rebuke us gently, and only after some urging from my mother. A grandson who went with him to the mosque said that whenever someone began to speak ill of another person, he would move away on the pretext of watering his plants.\n\nI inherited his love of nature: in my 16 years at Temasek Secondary School I landscaped the school quadrangle with bougainvilleas in a riot of colours. Two years before he passed, I planted a cananga behind the signboard of the new Al-Ansar Mosque, in memory of the hedges he planted there. May Allah bless his soul and place him among the exalted in Al-Jannah.',
  legacy: 'A quiet life of hard work, generosity and gardens, remembered in the fragrance of the cananga.',
  rooms: ['pioneers'], frame: 'gold', order: 4, focusY: .4, image: 'assets/abdul-latiff-kassim.jpg',
  alt: 'Watercolour portrait of Haji Abdul Latiff bin Haji Kassim in old age, with white hair and eyebrows and wire-rimmed glasses, in a brown baju Melayu against a deep blue wash',
  credit: 'Watercolour on paper, signed by the artist and dated 2017.'
});

const FAIROZ = P({
  id: 'fairoz-hassan', name: 'Brigadier-General Fairoz Hassan', dates: 'Anugerah Jauhari 2025', descriptor: 'Soldier & commander',
  identity: 'Commander of the 9th Singapore Division and Chief Infantry Officer; the second Malay/Muslim officer to reach the rank of Brigadier-General in the SAF',
  period: 'In uniform for nearly three decades',
  opening: 'He joined the army to pay for his education. It became his calling.',
  story: [
    'Fairoz Hassan joined the Singapore Armed Forces to support his university education, and over nearly three decades found in it a career of purpose. In July 2025 the Commander of the 9th Singapore Division and Chief Infantry Officer became only the second Malay/Muslim officer to attain the rank of Brigadier-General in the SAF, and that year he received the Berita Harian Achiever of the Year award, the Anugerah Jauhari.',
    'His career has taken him far beyond the parade square. After the 2004 tsunami he served as a UN liaison officer in the relief effort in Banda Aceh, bringing the UN, non-governmental organisations and foreign militaries together to help the people on the ground, and after the 2015 Nepal earthquake he helped coordinate multinational relief. At home he has managed operations and security for National Day Parades. He holds an MBA from Nanyang Business School at NTU and has attended executive programmes at Georgetown University and elsewhere.'
  ].join('\n\n'),
  moment: '2025 was a year of firsts and bests for Malay servicemen in the SAF. In October, 3WO Zulkifli Juremi topped his class at a US Marine Corps course; at the National Day Parade, LTC Muhammad Iskandar Dzulfadli led the aerial display in his F-15SG, and the parade was commanded by LTC Firdaus Ghazali. At the award ceremony, Minister Chan Chun Sing described such achievements as a reflection of Singapore’s values of meritocracy, fairness and openness.',
  asideTitle: 'The Painter’s Note',
  aside: 'This is a far cry from fifty years ago, when Malays were not called up for full-time National Service, and, even after that changed, no Malay could be trained as a fighter pilot in the SAF. Singapore has certainly matured since then.',
  legacy: 'From a cadet who never meant to sign on to a general who leads a division, his career shows how far opportunity in Singapore has come.',
  rooms: ['gamechangers'], frame: 'gold', order: 24, focusY: .36, image: 'assets/fairoz-hassan.jpg',
  alt: 'Watercolour portrait of Brigadier-General Fairoz Hassan smiling broadly, in a green beret with a gold badge and a pale green uniform with a one-star epaulette, parachute wings, ribbons and a name tag, against an orange wash',
  credit: 'Watercolour on paper, signed by the artist and inscribed “Berita Harian Anugerah Jauhari 2025”.'
});

const DEMO = []; // placeholders removed: every frame now holds a real painting

const THEME = {
  foyer: 'someone whose generosity opened these doors',
  pioneers: 'helped lay the foundations of modern Singapore',
  gamechangers: 'changed the game for Singapore',
  heroes: 'quietly makes everyday life better for the people around them',
  monuments: 'has stood the test of time',
  beautiful: 'shows Singapore at its most beautiful',
  secret: 'the curator could not leave out'
};

function demo([room, role, frame], i) {
  const place = PLACE_ROOMS.includes(room);
  const noun = role.replace(/^(The|A) /, '');
  const lower = noun.toLowerCase();
  const art = /^[aeiou]/i.test(noun) ? 'an' : 'a';
  return P({
    id: 'demo-' + lower.replace(/[^a-z]+/g, '-').replace(/^-+|-+$/g, ''),
    name: role,
    dates: place ? 'Demo · Date to follow' : 'Demo · Dates to follow',
    descriptor: place ? 'Placeholder image' : 'Placeholder portrait',
    identity: place ? `Demo content: a placeholder for ${art} ${lower} that ${THEME[room]}.` : `Demo content: a placeholder for ${art} ${lower} who ${THEME[room]}.`,
    period: 'To be confirmed',
    opening: place ? `This frame is waiting for a photograph, and for the story of a place that ${THEME[room]}.` : `This frame is waiting for a face, and for the story of someone who ${THEME[room]}.`,
    story: place
      ? `This is demo content. The photograph and story for this frame have not been installed yet.\n\nWhen they are, this page will hold a 150 to 250 word narrative: when the place came to be, who built or tended it, how it has changed, and why Singaporeans still return to it.`
      : `This is demo content. The portrait and biography for this frame have not been installed yet.\n\nWhen they are, this page will hold a 150 to 250 word narrative: where the subject came from, what they wanted, what stood in their way, and the choices that made them worth remembering. It should read like a page from an exhibition catalogue rather than an encyclopedia entry.`,
    moment: place ? 'Placeholder. A turning point in the life of this place will be told here: its opening, a restoration, or a day it became part of the nation’s memory.' : 'Placeholder. The turning point in the subject’s life will be told here: the experiment, voyage, performance or decision after which nothing was quite the same.',
    legacy: place ? 'Placeholder. What this place means to Singaporeans today, and how a visitor might experience it.' : 'Placeholder. How the subject’s ideas, work or actions continue to matter today, and where a visitor might still see their influence.',
    rooms: [room], frame, order: 10 + i,
    alt: place ? `Placeholder painting for the demo entry “${role}”. No real place is depicted.` : `Placeholder silhouette for the demo portrait “${role}”. No real person is depicted.`,
    image: '',
    credit: 'Demo placeholder artwork generated by the gallery.',
    demo: true, seed: i + 3
  });
}

export const DEFAULT_PORTRAITS = [VISWA, ALAMI, KISHORE, AKMAL, TELOK_KURAU, WAK_SUMANG, RAFFLES, RASHID, TANJONG_KATONG, NOORSIAH, MEL_DEAN, FARHANNA, HUSSAINI, KALILOOL, HAWAZI, RON, SALLEH, DOLLAH, SULTAN_MOSQUE, AL_HUDA, YUSOF_ISHAK, KAMPONG_DURIAN, HANI, CLARKE_QUAY, GT_LYE, OSMAN, YIP, ROSSMAN, HABIB_NOH, KAMAR, SHAHRIN, BAMADHAJ, ALKAFF, KEBUN_BARU, TANJONG_KATONG_I, HOSSAM, TAHIRAH, HAIDER, HIDAYAH, PERANAKAN_HOUSE, IBRAHIM_TAHIR, MALIK, BABA_FRED, JIA_LI, KOON_SENG_10, PERANAKAN_PINK, WALID, ENRIQUE, ADNAN, P_RAMLEE, FANDI, BLUE_KAMPONG, MURTABAK, ONG_KIM_SENG, HJ_LATIFF, FAIROZ, ...DEMO.map(demo)];

export const TOUR = ['viswa-sadasivan', 'salleh-marican', 'kishore-mahbubani', 'farhanna-farid', 'noorsiah-ibrahim', 'sultan-mosque', 'telok-kurau-primary-school', 'wak-sumang-goes-to-sit'];
